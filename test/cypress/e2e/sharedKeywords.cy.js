// generated from local/sharedKeywords.xqm

it("GET /api/sharedKeyword/test", () => {
	cy.request({ url: "/api/sharedKeyword/test", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/sharedKeyword/test responded with ${res.status}`).to.be.lessThan(500);
	});
});
