// generated from local/apilists.xqm

it("GET /api/manuscripts/list/json", () => {
	cy.request({ url: "/api/manuscripts/list/json", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/manuscripts/list/json responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/manuscripts/test/list/ids/json", () => {
	cy.request({ url: "/api/manuscripts/test/list/ids/json", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/manuscripts/test/list/ids/json responded with ${res.status}`).to.be.lessThan(500);
	});
});
