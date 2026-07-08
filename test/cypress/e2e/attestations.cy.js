// generated from local/attestations.xqm

it("GET /api/attestations/work/LIT1367Exodus", () => {
	cy.request({ url: "/api/attestations/work/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/attestations/work/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});
