// generated from specifications/json.xqm

it("GET /json/api/LIT1367Exodus", () => {
	cy.request({ url: "/json/api/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/json/api/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});
