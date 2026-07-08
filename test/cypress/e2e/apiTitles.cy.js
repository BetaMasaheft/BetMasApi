// generated from local/apiTitles.xqm

it("GET /api/LIT1367Exodus/title", () => {
	cy.request({ url: "/api/LIT1367Exodus/title", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/LIT1367Exodus/title responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/LIT1367Exodus/title/json", () => {
	cy.request({ url: "/api/LIT1367Exodus/title/json", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/LIT1367Exodus/title/json responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/LIT1367Exodus/a1/title", () => {
	cy.request({ url: "/api/LIT1367Exodus/a1/title", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/LIT1367Exodus/a1/title responded with ${res.status}`).to.be.lessThan(500);
	});
});
