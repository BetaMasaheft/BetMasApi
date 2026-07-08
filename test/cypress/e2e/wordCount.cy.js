// generated from local/wordCount.xqm

it("GET /api/WordCount/test/LIT1367Exodus", () => {
	cy.request({ url: "/api/WordCount/test/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/WordCount/test/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});
