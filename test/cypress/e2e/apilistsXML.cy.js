// generated from local/apilistsXML.xqm

it("GET /api/manuscripts/list/xml", () => {
	cy.request({ url: "/api/manuscripts/list/xml", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/manuscripts/list/xml responded with ${res.status}`).to.be.lessThan(500);
	});
});

// see #41: no coverage existed for the "works" collection specifically -
// Documentation#2122 reported this one broken on production
it("GET /api/works/list/xml", () => {
	cy.request({ url: "/api/works/list/xml", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/works/list/xml responded with ${res.status}`).to.eq(200);
		const total = Cypress.$(res.body).find("total").text();
		expect(Number(total), "total should be a positive number").to.be.greaterThan(0);
		expect(Cypress.$(res.body).find("item").length, "at least one item").to.be.greaterThan(0);
	});
});
