// generated from local/apiText.xqm

it("GET /api/xml/LIT1367Exodus/1", () => {
	cy.request({ url: "/api/xml/LIT1367Exodus/1", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/xml/LIT1367Exodus/1 responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/xml/LIT1367Exodus/1/1", () => {
	cy.request({ url: "/api/xml/LIT1367Exodus/1/1", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/xml/LIT1367Exodus/1/1 responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/xml/LIT1367Exodus/1/1/1", () => {
	cy.request({ url: "/api/xml/LIT1367Exodus/1/1/1", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/xml/LIT1367Exodus/1/1/1 responded with ${res.status}`).to.be.lessThan(500);
	});
});
