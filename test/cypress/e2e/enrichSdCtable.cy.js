// generated from local/enrichSdCtable.xqm

it("GET /api/enrichMe/LIT1367Exodus/a1", () => {
	cy.request({ url: "/api/enrichMe/LIT1367Exodus/a1", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/enrichMe/LIT1367Exodus/a1 responded with ${res.status}`).to.be.lessThan(500);
	});
});
