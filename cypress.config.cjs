const { defineConfig } = require("cypress");

module.exports = defineConfig({
	e2e: {
		// hit BetMasApi's own roaster router directly rather than through
		// BetMasWeb's controller.xql, which has content-negotiation-dependent
		// redirects for some paths
		baseUrl: "http://localhost:8080/exist/apps/BetMasApi",
		supportFile: false,
		allowCypressEnv: false,
		specPattern: "test/cypress/e2e/**/*.cy.js",
		screenshotsFolder: "test/cypress/screenshots",
		videosFolder: "test/cypress/videos",
		fixturesFolder: "test/cypress/fixtures",
		trashAssetsBeforeRuns: true,
	},
});
