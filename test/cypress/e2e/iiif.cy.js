// generated from specifications/iiif.xqm

it("GET /api/iiif/collections", () => {
	cy.request({ url: "/api/iiif/collections", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/iiif/collections responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/iiif/collection/test", () => {
	cy.request({ url: "/api/iiif/collection/test", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/iiif/collection/test responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/iiif/witnesses/LIT1367Exodus", () => {
	cy.request({ url: "/api/iiif/witnesses/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/iiif/witnesses/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/iiif/LIT1367Exodus/manifest", () => {
	cy.request({ url: "/api/iiif/LIT1367Exodus/manifest", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/iiif/LIT1367Exodus/manifest responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/iiif/LIT1367Exodus/range/1", () => {
	cy.request({ url: "/api/iiif/LIT1367Exodus/range/1", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/iiif/LIT1367Exodus/range/1 responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/iiif/LIT1367Exodus/sequence/normal", () => {
	cy.request({ url: "/api/iiif/LIT1367Exodus/sequence/normal", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/iiif/LIT1367Exodus/sequence/normal responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/iiif/LIT1367Exodus/canvas/p1", () => {
	cy.request({ url: "/api/iiif/LIT1367Exodus/canvas/p1", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/iiif/LIT1367Exodus/canvas/p1 responded with ${res.status}`).to.be.lessThan(500);
	});
});
