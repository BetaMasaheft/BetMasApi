// generated from specifications/persistentdts.xqm

it("GET /permanent/deadbeef/api/dts", () => {
	cy.request({ url: "/permanent/deadbeef/api/dts", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/permanent/deadbeef/api/dts responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /permanent/deadbeef/api/dts/collections", () => {
	cy.request({ url: "/permanent/deadbeef/api/dts/collections", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/permanent/deadbeef/api/dts/collections responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /permanent/deadbeef/api/dts/document", () => {
	cy.request({ url: "/permanent/deadbeef/api/dts/document", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/permanent/deadbeef/api/dts/document responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /permanent/deadbeef/api/dts/navigation", () => {
	cy.request({ url: "/permanent/deadbeef/api/dts/navigation", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/permanent/deadbeef/api/dts/navigation responded with ${res.status}`).to.be.lessThan(500);
	});
});
