# No writes in OpenAPI-serving modules

CI runs `scripts/check-no-serving-writes.sh` (also `npm run gate:no-writes`) on
every push and pull request. It scans `*.xq`, `*.xql`, and `*.xqm` for
`update insert|value|delete|replace|rename` and `xmldb:store`.

## Allow-list (non-serving)

| Path                    | Reason                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `docker/overlay-api.xq` | Docker image build: stores the app XAR into the container database during overlay setup, not during HTTP requests. |

## Tracked exceptions (warn only)

These modules still contain writes. They are **not** registered as OpenAPI
operations and are not invoked by normal API traffic. The gate prints a warning
but does not fail CI.

| Path               | Write                                                         | Why it remains                                                                                                                                                |
| ------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `local/places.xqm` | `places:pelagiosDump()` → `xmldb:store` under `/db/apps/ttl/` | Manual Pelagios gazetteer export (run from eXide/admin, validate externally). OpenAPI-served handlers in the same module (`places:json`, etc.) are read-only. |

When adding or removing an exception, update the `tracked` / `allowed` patterns
in `scripts/check-no-serving-writes.sh` and this file together.
