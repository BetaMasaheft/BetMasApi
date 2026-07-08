// generated from specifications/void.xqm

it("GET /api/void", () => {
	cy.request({ url: "/api/void", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/void responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/void/LIT1367Exodus", () => {
	cy.request({ url: "/api/void/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/void/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dcat", () => {
	cy.request({ url: "/api/dcat", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dcat responded with ${res.status}`).to.be.lessThan(500);
	});
});
