// generated from specifications/json.xqm

it("GET /json/api/LIT1367Exodus", () => {
	cy.request({ url: "/json/api/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
		expect(res.body.data[0].id).to.eq("LIT1367Exodus");
	});
});
