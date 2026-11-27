// generated from local/clavis.xqm

it("GET /api/clavis/LIT1367Exodus", () => {
	cy.request({
		url: "/api/clavis/LIT1367Exodus",
		failOnStatusCode: false,
	}).then((res) => {
		expect(res.status).to.eq(200);
		expect(res.body.CAe).to.eq("LIT1367Exodus");
	});
});

it("GET /api/clavis/all", () => {
	cy.request({ url: "/api/clavis/all", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
		expect(res.body).to.have.property("total");
	});
});

it("GET /api/clavis/all?type=... filters by type", () => {
	cy.request({ url: "/api/clavis/all?type=CPG", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
		expect(res.body).to.have.property("total");
	});
});

it("GET /api/clavis/all?type=... with a quote does not break the query", () => {
	// type is matched via a variable now instead of being spliced into a
	// util:eval string, so a quote in it should not cause a syntax error
	cy.request({ url: "/api/clavis/all?type=CPG%27", failOnStatusCode: false }).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("GET /api/clavis", () => {
	cy.request({
		url: "/api/clavis?q=LIT1367Exodus",
		failOnStatusCode: false,
	}).then((res) => {
		expect(res.status, `/api/clavis responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/clavis?q=... reaches the wildcard guard with the actual parameter value", () => {
	// q used to be spliced into a util:eval string; a leftover from that
	// refactor made q a dead literal that ft:query never saw. Assert q is
	// live via the shared Lucene wildcard gate (BetMasWeb all.xqm): a leading
	// * is rejected before ft:query. Ignoring q would return empty hits with
	// no error. Pre-#320 this asserted Lucene 500/WildcardQuery instead.
	cy.request({
		url: "/api/clavis?q=%2Afoo",
		failOnStatusCode: false,
	}).then((res) => {
		expect(res.status).to.eq(200);
		expect(res.body).to.have.property("error");
		expect(String(res.body.error)).to.match(/too broad|Leading \*|wildcard/i);
		expect(res.body.total).to.eq(0);
	});
});
