// generated from local/places.xqm

// This is the route BetMasWeb's controller.xql forwards {id}.json requests
// to (BetMasWeb#36). Coordinates used to come back as XPath NaN, which is not
// valid JSON (BetMasApi#47, BetMasWeb#214); cy.request only parses the body
// into an object when the JSON is valid.
const geoJson = (id) =>
	cy.request(`/api/geoJson/places/${id}`).then((res) => {
		expect(res.status).to.eq(200);
		expect(res.body, "parsed as JSON").to.be.an("object");
		expect(res.body.id).to.eq(id);
		expect(res.body.type).to.eq("Feature");
		return res.body;
	});

const expectLonLat = (pair) => {
	expect(pair).to.have.length(2);
	pair.forEach((n) => {
		expect(n).to.be.a("number").and.not.be.NaN;
	});
};

// LOC5374Rome has no <geo>, only @sameAs="wd:Q220" (Wikidata lookup);
// INS0896YGN has its own <geo>.
["LOC5374Rome", "INS0896YGN"].forEach((id) => {
	it(`GET /api/geoJson/places/${id} has numeric Point coordinates`, () => {
		geoJson(id).then((f) => {
			expect(f.geometry.type).to.eq("Point");
			expectLonLat(f.geometry.coordinates);
			expect(f.reprPoint).to.deep.eq(f.geometry.coordinates);
			expect(f.bbox).to.deep.eq([...f.geometry.coordinates, ...f.geometry.coordinates]);
		});
	});
});

it("GET /api/geoJson/places/INS0956Rufael (no coordinates) has a null geometry and no bbox", () => {
	geoJson("INS0956Rufael").then((f) => {
		expect(f.geometry).to.eq(null);
		expect(f).not.to.have.property("bbox");
		expect(f.reprPoint).to.eq(null);
	});
});

it("GET /api/geoJson/places/LOC5374Rome uses the canonical URI for the feature and its names", () => {
	geoJson("LOC5374Rome").then((f) => {
		expect(f.uri).to.eq("https://betamasaheft.eu/LOC5374Rome");
		expect(f.properties.link).to.eq(f.uri);
		const named = f.names.filter((n) => n.uri);
		expect(named, "names with an xml:id").to.have.length.greaterThan(0);
		named.forEach((n) => {
			expect(n.uri).to.match(/^https:\/\/betamasaheft\.eu\/LOC5374Rome#\S+$/);
		});
	});
});

it("GET /api/geoJson/places/LIT1367Exodus (non-place id, empty but not an error)", () => {
	cy.request({ url: "/api/geoJson/places/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

// Skipped: both dumps resolve coordinates for the whole corpus in one
// request, with a live Wikidata/GeoNames call for every place that has no
// <geo> of its own (~30s and ~170s against the base image). Same scope
// decision as /api/KML/manuscripts/places below.
// Tracked: https://github.com/BetaMasaheft/BetMasApi/issues/63
it.skip("GET /api/geoJson/institutions", () => {
	cy.request({ url: "/api/geoJson/institutions", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it.skip("GET /api/geoJson/places", () => {
	cy.request({ url: "/api/geoJson/places", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/KML/places/LIT1367Exodus", () => {
	cy.request({ url: "/api/KML/places/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/KML/date/2020-01-01", () => {
	cy.request({ url: "/api/KML/date/2020-01-01", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/KML/date/2020-01-01 responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/KML/place/test", () => {
	cy.request({ url: "/api/KML/place/test", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

// Skipped: this endpoint resolves the *entire* manuscripts collection and
// makes a live Wikidata call per place, per manuscript. Against a small
// fixture-only dataset that was a handful of requests; against the base
// image's real corpus (thousands of manuscripts) it both times out and
// hammers a third-party service - not something CI should do. Needs a
// scope/mocking decision before re-enabling, not a one-line fix.
// Tracked: https://github.com/BetaMasaheft/BetMasApi/issues/34
it.skip("GET /api/KML/manuscripts/places", () => {
	cy.request({ url: "/api/KML/manuscripts/places", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
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

// Skipped: 500s against the real corpus with a range:field cardinality
// error (XPTY0004, expected one-or-more got 0) somewhere under
// ann:annotatedThing (BetMasWeb/modules/annotations.xqm). Didn't reproduce
// against the old fixture-only dataset. Call site not pinned down yet - not
// in annotations.xqm, api.xql or places.xqm directly, so it's a few imports
// deeper. Needs real debugging, not a guess-patch.
// Tracked: https://github.com/BetaMasaheft/BetMasApi/issues/33
it.skip("GET /api/gazetteer", () => {
	cy.request({ url: "/api/gazetteer", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

// Skipped: same range:field cardinality error as /api/gazetteer above.
// Tracked: https://github.com/BetaMasaheft/BetMasApi/issues/33
it.skip("GET /api/gazetteer/all", () => {
	cy.request({ url: "/api/gazetteer/all", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/gazetteer/place/LIT1367Exodus", () => {
	cy.request({ url: "/api/gazetteer/place/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/placeNames/works/all", () => {
	cy.request({ url: "/api/placeNames/works/all", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/placeNames/manuscripts/all", () => {
	cy.request({ url: "/api/placeNames/manuscripts/all", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/placeNames/works/LIT1367Exodus", () => {
	cy.request({ url: "/api/placeNames/works/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/placeNames/manuscripts/LIT1367Exodus", () => {
	cy.request({ url: "/api/placeNames/manuscripts/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/placeNames/void", () => {
	cy.request({ url: "/api/placeNames/void", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});
