// generated from local/apilistsXML.xqm

it("GET /api/manuscripts/list/xml", () => {
	cy.request({ url: "/api/manuscripts/list/xml", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/manuscripts/list/xml responded with ${res.status}`).to.be.lessThan(500);
	});
});
