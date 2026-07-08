// generated from local/quotations.xqm

it("GET /api/quotations/test/1", () => {
	cy.request({ url: "/api/quotations/test/1", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/quotations/test/1 responded with ${res.status}`).to.be.lessThan(500);
	});
});
