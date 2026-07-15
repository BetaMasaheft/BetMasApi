// generated from local/apiTitles.xqm

describe("apiTitles.xqm", () => {
	it("GET /api/LIT1367Exodus/title", () => {
		cy.request({
			url: "/api/LIT1367Exodus/title",
			failOnStatusCode: false,
		}).then((res) => {
			expect(res.status, `/api/LIT1367Exodus/title responded with ${res.status}`).to.be.lessThan(
				500,
				"The endpoint should not respond with a server error",
			);
			expect(res.status).to.not.equal(
				405,
				"The endpoint should not respond with a 405: indicating it is not found in some way",
			);
		});
	});

	it("GET /api/LIT1367Exodus/title/json", () => {
		cy.request({
			url: "/api/LIT1367Exodus/title/json",
			failOnStatusCode: false,
		}).then((res) => {
			expect(res.status, `/api/LIT1367Exodus/title/json responded with ${res.status}`).to.be.lessThan(
				500,
				"The endpoint should not respond with a server error",
			);
			expect(res.status).to.not.equal(
				405,
				"The endpoint should not respond with a 405: indicating it is not found in some way",
			);
		});
	});

	it("GET /api/LIT1367Exodus/a1/title", () => {
		cy.request({
			url: "/api/LIT1367Exodus/a1/title",
			failOnStatusCode: false,
		}).then((res) => {
			expect(res.status, `/api/LIT1367Exodus/a1/title responded with ${res.status}`).to.be.lessThan(
				500,
				"The endpoint should not respond with a server error",
			);
			expect(res.status).to.not.equal(
				405,
				"The endpoint should not respond with a 405: indicating it is not found in some way",
			);
		});
	});
});
