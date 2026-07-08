// generated from local/clavis.xqm

it("GET /api/clavis/LIT1367Exodus", () => {
	cy.request({ url: "/api/clavis/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/clavis/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/clavis/all", () => {
	cy.request({ url: "/api/clavis/all", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/clavis/all responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/clavis", () => {
	cy.request({ url: "/api/clavis", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/clavis responded with ${res.status}`).to.be.lessThan(500);
	});
});
