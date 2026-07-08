// generated from specifications/persistentiiif.xqm

it("GET /permanent/deadbeef/api/iiif/LIT1367Exodus/manifest", () => {
	cy.request({ url: "/permanent/deadbeef/api/iiif/LIT1367Exodus/manifest", failOnStatusCode: false }).then((res) => {
		expect(
			res.status,
			`/permanent/deadbeef/api/iiif/LIT1367Exodus/manifest responded with ${res.status}`,
		).to.be.lessThan(500);
	});
});

it("GET /permanent/deadbeef/api/iiif/LIT1367Exodus/sequence/normal", () => {
	cy.request({ url: "/permanent/deadbeef/api/iiif/LIT1367Exodus/sequence/normal", failOnStatusCode: false }).then(
		(res) => {
			expect(
				res.status,
				`/permanent/deadbeef/api/iiif/LIT1367Exodus/sequence/normal responded with ${res.status}`,
			).to.be.lessThan(500);
		},
	);
});

it("GET /permanent/deadbeef/api/iiif/LIT1367Exodus/canvas/p1", () => {
	cy.request({ url: "/permanent/deadbeef/api/iiif/LIT1367Exodus/canvas/p1", failOnStatusCode: false }).then((res) => {
		expect(
			res.status,
			`/permanent/deadbeef/api/iiif/LIT1367Exodus/canvas/p1 responded with ${res.status}`,
		).to.be.lessThan(500);
	});
});
