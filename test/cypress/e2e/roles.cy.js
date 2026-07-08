// generated from local/roles.xqm

it("GET /api/RoleAttestations", () => {
	cy.request({ url: "/api/RoleAttestations", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/RoleAttestations responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/hasrole/test", () => {
	cy.request({ url: "/api/hasrole/test", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/hasrole/test responded with ${res.status}`).to.be.lessThan(500);
	});
});

it("GET /api/hasrole/test/test", () => {
	cy.request({ url: "/api/hasrole/test/test", failOnStatusCode: false }).then((res) => {
		expect(res.status, `/api/hasrole/test/test responded with ${res.status}`).to.be.lessThan(500);
	});
});
