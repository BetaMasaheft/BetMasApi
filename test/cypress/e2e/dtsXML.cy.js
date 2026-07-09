// generated from specifications/dtsXML.xqm

it("GET /api/dts/collections/LIT1367Exodus", () => {
	cy.request({ url: "/api/dts/collections/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/dts/text/LIT1367Exodus", () => {
	cy.request({ url: "/api/dts/text/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/dts/text/LIT1367Exodus/1", () => {
	cy.request({ url: "/api/dts/text/LIT1367Exodus/1", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/dts/text/LIT1367Exodus/1/1", () => {
	cy.request({ url: "/api/dts/text/LIT1367Exodus/1/1", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/dts/text/LIT1367Exodus/1/1/1", () => {
	cy.request({ url: "/api/dts/text/LIT1367Exodus/1/1/1", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});
