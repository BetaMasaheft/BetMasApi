#!/usr/bin/env node
/**
 * Validate api.json against the OpenAPI 3.0 meta-schema (draft-04).
 * Schema: schema/openapi-3.0.json — vendored from
 * https://spec.openapis.org/oas/3.0/schema/2021-09-28
 */
const fs = require("node:fs");
const path = require("node:path");
const Ajv4 = require("ajv-draft-04");
const addFormats = require("ajv-formats");

const root = path.join(__dirname, "..");
const schemaId = "https://spec.openapis.org/oas/3.0/schema/2021-09-28";
const specPath = path.resolve(root, process.argv[2] || "api.json");
const schemaPath = path.join(root, "schema", "openapi-3.0.json");

const ajv = new Ajv4({ allErrors: true, strict: false });
addFormats(ajv);
ajv.addSchema(JSON.parse(fs.readFileSync(schemaPath, "utf8")), schemaId);

const validate = ajv.getSchema(schemaId);
const data = JSON.parse(fs.readFileSync(specPath, "utf8"));
const rel = path.relative(root, specPath) || specPath;

if (validate(data)) {
	console.log(`OK: ${rel} is a valid OpenAPI 3.0 document`);
	process.exit(0);
}

const errors = (validate.errors || []).map((error) => ({
	path: error.instancePath || "/",
	message: error.message,
	keyword: error.keyword,
	params: error.params,
}));

console.error(`FAIL: ${rel} does not validate against OpenAPI 3.0`);
console.error(JSON.stringify(errors, null, 2));
process.exit(1);
