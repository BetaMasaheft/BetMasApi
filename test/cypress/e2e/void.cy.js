// generated from specifications/void.xqm

it("GET /api/void", () => {
	cy.request({ url: "/api/void", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/void/LIT1367Exodus", () => {
	cy.request({ url: "/api/void/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
		expect(res.body).to.include("LIT1367Exodus");
	});
});

it("GET /api/dcat", () => {
	cy.request({ url: "/api/dcat", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});
