// Response-shape contracts for the list endpoints, checked against the live
// database. The generated smoke specs only assert `status < 500`, so nothing
// else guards the two properties clients actually depend on:
//
//   1. a list-valued key is a JSON array, never a single bare object, so a
//      consumer can index it without a special case for a one-item result;
//   2. a search response is bounded, but reports the true total plus
//      `returned`/`truncated` so a caller can never mistake a truncated page
//      for a complete one.
//
// (1) is asserted conditionally: it only bites when an endpoint actually
// happens to return exactly one element, which the dev corpus does not
// currently contain for every endpoint. The assertion is kept anyway so that
// such a record cannot silently reshape the contract later.

const MAX_HITS = 100;

const asArray = (value) => (Array.isArray(value) ? value : value === undefined || value === null ? [] : [value]);

// Asserts `key` is always a JSON array — including the empty case, which must
// serialise as `[]` rather than `null` or an omitted key, so that a consumer
// never has to branch on it.
const expectArrayKey = (body, key, label) => {
	expect(body, `${label}: a response must always include ${key}`).to.have.property(key);
	expect(body[key], `${label}: ${key} must be a JSON array so it can be indexed`).to.be.an("array");
	expect(body[key].length, `${label}: ${key} should agree with the reported total`).to.equal(body.total);
};

// Asserts the bounded-search envelope.
const expectBoundedEnvelope = (body, label) => {
	expect(body, `${label}: expected an object envelope`).to.be.an("object");
	expect(body, `${label}: items must be a JSON array`).to.have.property("items").that.is.an("array");
	expect(body, `${label}: must report how many items it actually sent`).to.have.property("returned");
	expect(body, `${label}: must report whether the result set was cut short`).to.have.property("truncated");

	expect(body.items.length, `${label}: items must not exceed the response cap`).to.be.at.most(MAX_HITS);
	expect(body.items.length, `${label}: returned must describe the items actually sent`).to.equal(body.returned);
	expect(body.total, `${label}: total must remain the true match count`).to.be.at.least(body.returned);
	expect(body.truncated, `${label}: truncated must be true exactly when items were dropped`).to.equal(
		body.total > body.returned,
	);
};

describe("bounded search envelopes", () => {
	it("GET /api/search caps the item list but keeps the true total", () => {
		// q=e matches well over the cap in the dev corpus.
		cy.request({ url: "/api/search?collection=all&q=e", timeout: 120000, failOnStatusCode: false }).then((res) => {
			expect(res.status, `/api/search responded with ${res.status}`).to.be.lessThan(500);
			expectBoundedEnvelope(res.body, "/api/search");
			expect(res.body.truncated, "a broad /api/search query must report truncation").to.equal(true);
		});
	});

	it("GET /api/kwicsearch caps the item list but keeps the true total", () => {
		cy.request({ url: "/api/kwicsearch?q=e", timeout: 120000, failOnStatusCode: false }).then((res) => {
			expect(res.status, `/api/kwicsearch responded with ${res.status}`).to.be.lessThan(500);
			expectBoundedEnvelope(res.body, "/api/kwicsearch");
			expect(res.body.truncated, "a broad /api/kwicsearch query must report truncation").to.equal(true);
		});
	});
});

describe("list-valued keys are always arrays", () => {
	it("GET /api/hasrole/{role} returns hits as an array", () => {
		cy.request({ url: "/api/hasrole/scribe", timeout: 60000, failOnStatusCode: false }).then((res) => {
			expect(res.status, `/api/hasrole/scribe responded with ${res.status}`).to.be.lessThan(500);
			expectArrayKey(res.body, "hits", "/api/hasrole");
		});
	});

	it("GET /api/attestations/{type}/{id} returns results and result as arrays", () => {
		cy.request({ url: "/api/attestations/work/LIT1367Exodus", timeout: 60000, failOnStatusCode: false }).then((res) => {
			expect(res.status, `attestations responded with ${res.status}`).to.be.lessThan(500);
			const results = asArray(res.body.results);
			expect(results.length, "expected at least one attestation group to assert on").to.be.greaterThan(0);
			results.forEach((group, i) => {
				expect(group.result, `results[${i}].result must be an array`).to.be.an("array");
			});
		});
	});

	it("GET /api/manuscripts/{repo}/list/ids/json returns items as an array", () => {
		cy.request({ url: "/api/manuscripts/test/list/ids/json", timeout: 60000, failOnStatusCode: false }).then((res) => {
			expect(res.status, `list/ids/json responded with ${res.status}`).to.be.lessThan(500);
			expectArrayKey(res.body, "items", "list/ids/json");
		});
	});

	it("GET /api/sharedKeyword/{keyword} returns hits as an array", () => {
		cy.request({ url: "/api/sharedKeyword/test", timeout: 60000, failOnStatusCode: false }).then((res) => {
			expect(res.status, `sharedKeyword responded with ${res.status}`).to.be.lessThan(500);
			expectArrayKey(res.body, "hits", "sharedKeyword");
		});
	});

	it("GET /api/SPARQL/versions/{id}/{chapterID} returns versions as an array", () => {
		cy.request({ url: "/api/SPARQL/versions/LIT1367Exodus/1", timeout: 60000, failOnStatusCode: false }).then((res) => {
			expect(res.status, `versions responded with ${res.status}`).to.be.lessThan(500);
			// A SPARQL-backed endpoint needs a reachable Fuseki; without one the
			// request degrades to an "info" message upstream of any response shape
			// we can assert on.
			const total = res.body && res.body.total;
			if (res.status !== 200 || typeof total !== "number" || total === 0) return;
			expect(res.body.versions, "versions must be a JSON array").to.be.an("array");
			expect(res.body.versions.length, "versions should agree with the reported total").to.equal(total);
		});
	});
});
