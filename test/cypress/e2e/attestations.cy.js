// generated from local/attestations.xqm

it("GET /api/attestations/work/LIT1367Exodus", () => {
	cy.request({ url: "/api/attestations/work/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
		expect(res.body.query).to.eq("LIT1367Exodus");
	});
});
