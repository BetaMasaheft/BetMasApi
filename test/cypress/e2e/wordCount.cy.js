// generated from local/wordCount.xqm

it("GET /api/WordCount/test/LIT1367Exodus", () => {
	cy.request({ url: "/api/WordCount/test/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});
