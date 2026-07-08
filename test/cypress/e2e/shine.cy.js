// generated from specifications/shine.xqm

it("GET /shine/api/collections", () => {
	cy.request({ url: "/shine/api/collections", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/shine/api/collections responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /shine/api/collections/test/resources", () => {
	cy.request({ url: "/shine/api/collections/test/resources", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/shine/api/collections/test/resources responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /shine/api/resources/test/metadata", () => {
	cy.request({ url: "/shine/api/resources/test/metadata", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/shine/api/resources/test/metadata responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /shine/api/resources/test/sections", () => {
	cy.request({ url: "/shine/api/resources/test/sections", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/shine/api/resources/test/sections responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /shine/api/sections/test/content_units", () => {
	cy.request({ url: "/shine/api/sections/test/content_units", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/shine/api/sections/test/content_units responded with ${res.status}`).to.be.lessThan(500);
	});
});
