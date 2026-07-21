// generated from local/rest.xqm
// happy-path checks target real corpus records (manuscript BAVet1, work LIT1367Exodus) - no fixture upload, see Dockerfile

it("GET /api/loadmsItems/BAVet1/m1", () => {
	cy.request({ url: "/api/loadmsItems/BAVet1/ms_i1", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
		expect(res.body.msitems.join("")).to.include("BAVet1");
	});
});

it("GET /api/listRepositoriesName", () => {
	cy.request({ url: "/api/listRepositoriesName", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/cataloguesZotero", () => {
	cy.request({ url: "/api/cataloguesZotero", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/witnessesOfContainer/LIT1367Exodus", () => {
	cy.request({ url: "/api/witnessesOfContainer/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/count", () => {
	cy.request({ url: "/api/count", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
		expect(res.body).to.have.property("totalWorks");
		expect(res.body).to.have.property("totalMS");
	});
});

it("GET /api/latest", () => {
	cy.request({ url: "/api/latest", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
		expect(res.body).to.be.an("array").that.is.not.empty;
	});
});

it("GET /api/string/LIT1367Exodus", () => {
	cy.request({ url: "/api/string/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/xmlpart/LIT1367Exodus", () => {
	cy.request({ url: "/api/xmlpart/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/LIT1367Exodus/work/a1", () => {
	cy.request({ url: "/api/LIT1367Exodus/work/a1", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/LIT1367Exodus/work/a1 responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/additions/LIT1367Exodus/addition/a1", () => {
	cy.request({ url: "/api/additions/LIT1367Exodus/addition/a1", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/LIT1367Exodus/author", () => {
	cy.request({ url: "/api/LIT1367Exodus/author", failOnStatusCode: false }).then((res) => {
		// Exodus has no author relation in the source TEI, so this is the documented "no info" case
		expect(res.status).to.eq(400);
	});
});

it("GET /api/otherMssText/LIT1367Exodus/a1", () => {
	cy.request({ url: "/api/otherMssText/LIT1367Exodus/a1", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/xml/LIT1367Exodus", () => {
	cy.request({ url: "/api/xml/LIT1367Exodus", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
		expect(res.body).to.include("<work>");
	});
});

it("GET /api/LIT1367Exodus/tei", () => {
	cy.request({ url: "/api/LIT1367Exodus/tei", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
		expect(res.body).to.include("Exodus");
	});
});

it("GET /api/post/LIT1367Exodus/tei", () => {
	cy.request({ url: "/api/post/LIT1367Exodus/tei", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/LIT1367Exodus/json", () => {
	cy.request({ url: "/api/LIT1367Exodus/json", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
		expect(res.body.TEI["xml:id"]).to.eq("LIT1367Exodus");
	});
});
