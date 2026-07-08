// generated from local/chojnacki.xqm

it("GET /api/Chojnacki/LIT1367Exodus", () => {
	cy.request({ url: "/api/Chojnacki/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/Chojnacki/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});
