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

it("GET /api/dts/indexes", () => {
	cy.request({ url: "/api/dts/indexes", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/indexes responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/annotations", () => {
	cy.request({ url: "/api/dts/annotations", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/annotations responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/annotations/test", () => {
	cy.request({ url: "/api/dts/annotations/test", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/annotations/test responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/annotations/test/test", () => {
	cy.request({ url: "/api/dts/annotations/test/test", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/annotations/test/test responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/annotations/test/items/test", () => {
	cy.request({ url: "/api/dts/annotations/test/items/test", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/annotations/test/items/test responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/dts/annotations/test/items/test/test", () => {
	cy.request({ url: "/api/dts/annotations/test/items/test/test", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/dts/annotations/test/items/test/test responded with ${res.status}`).to.be.lessThan(500);
	});
});
