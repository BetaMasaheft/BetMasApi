// generated from local/places.xqm

it("GET /api/geoJson/places/LIT1367Exodus", () => {
	cy.request({ url: "/api/geoJson/places/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/geoJson/places/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/geoJson/institutions", () => {
	cy.request({ url: "/api/geoJson/institutions", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/geoJson/institutions responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/geoJson/places", () => {
	cy.request({ url: "/api/geoJson/places", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/geoJson/places responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/KML/places/LIT1367Exodus", () => {
	cy.request({ url: "/api/KML/places/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/KML/places/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/KML/date/2020-01-01", () => {
	cy.request({ url: "/api/KML/date/2020-01-01", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/KML/date/2020-01-01 responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/KML/place/test", () => {
	cy.request({ url: "/api/KML/place/test", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/KML/place/test responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/KML/manuscripts/places", () => {
	cy.request({ url: "/api/KML/manuscripts/places", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/KML/manuscripts/places responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/KML/manuscripts/origPlaces", () => {
	cy.request({ url: "/api/KML/manuscripts/origPlaces", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/KML/manuscripts/origPlaces responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/KML/datePlace/LIT1367Exodus", () => {
	cy.request({ url: "/api/KML/datePlace/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/KML/datePlace/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/KML/manuscripts/datePlace", () => {
	cy.request({ url: "/api/KML/manuscripts/datePlace", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/KML/manuscripts/datePlace responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/gazetteer", () => {
	cy.request({ url: "/api/gazetteer", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/gazetteer responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/gazetteer/all", () => {
	cy.request({ url: "/api/gazetteer/all", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/gazetteer/all responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/gazetteer/place/LIT1367Exodus", () => {
	cy.request({ url: "/api/gazetteer/place/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/gazetteer/place/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/placeNames/works/all", () => {
	cy.request({ url: "/api/placeNames/works/all", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/placeNames/works/all responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/placeNames/manuscripts/all", () => {
	cy.request({ url: "/api/placeNames/manuscripts/all", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/placeNames/manuscripts/all responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/placeNames/works/LIT1367Exodus", () => {
	cy.request({ url: "/api/placeNames/works/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/placeNames/works/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/placeNames/manuscripts/LIT1367Exodus", () => {
	cy.request({ url: "/api/placeNames/manuscripts/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/placeNames/manuscripts/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/placeNames/void", () => {
	cy.request({ url: "/api/placeNames/void", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/placeNames/void responded with ${res.status}`).to.be.lessThan(500);
	});
});
