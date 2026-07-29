// generated from specifications/dts.xqm

it("GET /api/dts", () => {
	cy.request({ url: "/api/dts", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/collections", () => {
	cy.request({ url: "/api/dts/collections", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/collections responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/document", () => {
	cy.request({ url: "/api/dts/document", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/document responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/navigation", () => {
	cy.request({ url: "/api/dts/navigation", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/navigation responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/collections/template", () => {
	cy.request({ url: "/api/dts/collections/template", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/collections/template responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/indexes", () => {
	cy.request({ url: "/api/dts/indexes", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/indexes responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/annotations", () => {
	cy.request({ url: "/api/dts/annotations", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/annotations responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/annotations/test", () => {
	cy.request({ url: "/api/dts/annotations/test", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/annotations/test responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/annotations/test/test", () => {
	cy.request({ url: "/api/dts/annotations/test/test", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/annotations/test/test responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/annotations/test/items/test", () => {
	cy.request({ url: "/api/dts/annotations/test/items/test", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/annotations/test/items/test responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/annotations/test/items/test/test", () => {
	cy.request({ url: "/api/dts/annotations/test/items/test/test", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/annotations/test/items/test/test responded with ${res.status}`).to.be.lessThan(500);
	});
});

describe("dtslib response-wrapper regression", () => {
	it("GET /api/dts/collections?id=<unknown> (dtslib:CollMember 400) returns a plain object, not an array", () => {
		cy.request({
			url: "/api/dts/collections",
			qs: { id: "https://betamasaheft.eu/NonExistentTestId000" },
			failOnStatusCode: false,
		}).then((res) => {
			expect(res.status).to.eq(400);
			expect(res.body).to.be.an("object").and.not.be.an("array");
			expect(res.body).to.have.property("@context");
			expect(res.body).to.have.property("statusCode", 400);
		});
	});

	it("GET /api/dts/collections?id=<real item> (dtslib:CollMember 200) returns a plain object", () => {
		cy.request({
			url: "/api/dts/collections",
			qs: { id: "https://betamasaheft.eu/EMIP01859" },
		}).then((res) => {
			expect(res.status).to.eq(200);
			expect(res.body).to.be.an("object").and.not.be.an("array");
			expect(res.body).to.have.property("@id", "https://betamasaheft.eu/EMIP01859");
			expect(res.body).to.have.property("member").that.is.an("array");
		});
	});

	it("GET /api/dts/collections?id=<item with no editions> (dtslib:member) returns 204, not a 500", () => {
		cy.request({
			url: "/api/dts/collections",
			qs: { id: "https://betamasaheft.eu/ArmaghP001947393" },
			failOnStatusCode: false,
		}).then((res) => {
			expect(res.status).to.eq(204);
		});
	});

	it("GET /api/dts/document?ref=&start= together (dtslib:docs 400) returns a plain <error>, not an array", () => {
		cy.request({
			url: "/api/dts/document",
			qs: { id: "https://betamasaheft.eu/EMIP01859", ref: "1", start: "1" },
			failOnStatusCode: false,
		}).then((res) => {
			expect(res.status).to.eq(400);
			expect(res.headers["content-type"]).to.include("xml");
			expect(res.body).to.include("<error");
			expect(res.body).not.to.include("rest:response");
		});
	});

	it("GET /api/dts/document with disjunct start/end (dtslib:docs 400) returns a plain <error>", () => {
		cy.request({
			url: "/api/dts/document",
			qs: { id: "https://betamasaheft.eu/EMIP01859", start: "1", end: "" },
			failOnStatusCode: false,
		}).then((res) => {
			expect(res.status).to.eq(400);
			expect(res.body).to.include("<error");
			expect(res.body).not.to.include("rest:response");
		});
	});

	it("GET /api/dts/document?id=<real item> (dtslib:docs 200) doesn't leak the rest:response wrapper into the body", () => {
		cy.request({
			url: "/api/dts/document",
			qs: { id: "https://betamasaheft.eu/EMIP01859" },
		}).then((res) => {
			expect(res.status).to.eq(200);
			expect(res.headers["content-type"]).to.include("tei+xml");
			expect(res.body).not.to.include("rest:response");
			expect(res.body).to.include("EMIP01859");
		});
	});
});
