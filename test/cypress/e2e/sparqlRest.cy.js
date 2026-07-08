// generated from local/sparqlRest.xqm

it("GET /BetMasWeb/LIT1367Exodus/rdf", () => {
	cy.request({ url: "/BetMasWeb/LIT1367Exodus/rdf", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/BetMasWeb/LIT1367Exodus/rdf responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /BetMasWeb/LIT1367Exodus/test/a1/rdf", () => {
	cy.request({ url: "/BetMasWeb/LIT1367Exodus/test/a1/rdf", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/BetMasWeb/LIT1367Exodus/test/a1/rdf responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /BetMasWeb/LIT1367Exodus/test/annotation/1/rdf", () => {
	cy.request({ url: "/BetMasWeb/LIT1367Exodus/test/annotation/1/rdf", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/BetMasWeb/LIT1367Exodus/test/annotation/1/rdf responded with ${res.status}`).to.be.lessThan(
			500,
		);
	});
});

it("GET /BetMasWeb/bond/b1/rdf", () => {
	cy.request({ url: "/BetMasWeb/bond/b1/rdf", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/BetMasWeb/bond/b1/rdf responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/SPARQL", () => {
	cy.request({ url: "/api/SPARQL", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/SPARQL responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/RDFXML/manuscripts/LIT1367Exodus", () => {
	cy.request({ url: "/api/RDFXML/manuscripts/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/RDFXML/manuscripts/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/RDFJSON/manuscripts/LIT1367Exodus", () => {
	cy.request({ url: "/api/RDFJSON/manuscripts/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/RDFJSON/manuscripts/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/SPARQL/json", () => {
	cy.request({ url: "/api/SPARQL/json", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/SPARQL/json responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/SPARQL/relations/LIT1367Exodus", () => {
	cy.request({ url: "/api/SPARQL/relations/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/SPARQL/relations/LIT1367Exodus responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/SPARQL/SdCunits/work", () => {
	cy.request({ url: "/api/SPARQL/SdCunits/work", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/SPARQL/SdCunits/work responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/SPARQL/versions/LIT1367Exodus/1", () => {
	cy.request({ url: "/api/SPARQL/versions/LIT1367Exodus/1", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/SPARQL/versions/LIT1367Exodus/1 responded with ${res.status}`).to.be.lessThan(500);
	});
});
