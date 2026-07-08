// generated from specifications/dts.xqm

it("GET /api/dts", () => {
	cy.request({ url: "/api/dts", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/collections", () => {
	cy.request({ url: "/api/dts/collections", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/collections responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/document", () => {
	cy.request({ url: "/api/dts/document", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/document responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/navigation", () => {
	cy.request({ url: "/api/dts/navigation", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/navigation responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/collections/template", () => {
	cy.request({ url: "/api/dts/collections/template", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/collections/template responded with ${res.status}`).to.be.lessThan(500);
	});
});
