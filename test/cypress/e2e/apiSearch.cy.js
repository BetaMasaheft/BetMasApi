// generated from local/apiSearch.xqm

it("GET /api/titleTest", () => {
	cy.request({ url: "/api/titleTest", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/titleTest responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/kwicsearch", () => {
	cy.request({ url: "/api/kwicsearch", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/kwicsearch responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/search", () => {
	cy.request({ url: "/api/search", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/search responded with ${res.status}`).to.be.lessThan(500);
	});
});
