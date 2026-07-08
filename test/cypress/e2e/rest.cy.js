// generated from local/rest.xqm

it("GET /api/loadmsItems/BAVet1/m1", () => {
	cy.request({ url: "/api/loadmsItems/BAVet1/m1", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/loadmsItems/BAVet1/m1 responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/listRepositoriesName", () => {
	cy.request({ url: "/api/listRepositoriesName", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/listRepositoriesName responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/cataloguesZotero", () => {
	cy.request({ url: "/api/cataloguesZotero", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/cataloguesZotero responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/count", () => {
	cy.request({ url: "/api/count", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/count responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/latest", () => {
	cy.request({ url: "/api/latest", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/latest responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/string/LIT1367Exodus", () => {
	cy.request({ url: "/api/string/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/string/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/xmlpart/LIT1367Exodus", () => {
	cy.request({ url: "/api/xmlpart/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/xmlpart/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/LIT1367Exodus/work/a1", () => {
	cy.request({ url: "/api/LIT1367Exodus/work/a1", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/LIT1367Exodus/work/a1 responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/additions/LIT1367Exodus/addition/a1", () => {
	cy.request({ url: "/api/additions/LIT1367Exodus/addition/a1", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/additions/LIT1367Exodus/addition/a1 responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/otherMssText/LIT1367Exodus/a1", () => {
	cy.request({ url: "/api/otherMssText/LIT1367Exodus/a1", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/otherMssText/LIT1367Exodus/a1 responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/xml/LIT1367Exodus", () => {
	cy.request({ url: "/api/xml/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/xml/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/LIT1367Exodus/tei", () => {
	cy.request({ url: "/api/LIT1367Exodus/tei", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/LIT1367Exodus/tei responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/post/LIT1367Exodus/tei", () => {
	cy.request({ url: "/api/post/LIT1367Exodus/tei", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/post/LIT1367Exodus/tei responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/LIT1367Exodus/json", () => {
	cy.request({ url: "/api/LIT1367Exodus/json", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/LIT1367Exodus/json responded with ${res.status}`).to.be.lessThan(500);
	});
});
