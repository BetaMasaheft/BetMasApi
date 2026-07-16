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

it("GET /api/clavis?q=... reaches ft:query with the actual parameter value", () => {
	// q used to be spliced into a util:eval string; a leftover from that
	// refactor made q a dead literal that ft:query never saw. Assert q is
	// live by sending Lucene syntax invalid only when actually parsed
	// (leading wildcard) - a query engine that ignores q would return 200.
	cy.request({
		url: "/api/clavis?q=%2Afoo",
		failOnStatusCode: false,
	}).then((res) => {
		expect(res.status).to.eq(500);
		expect(JSON.stringify(res.body)).to.match(/WildcardQuery/);
	});
});
