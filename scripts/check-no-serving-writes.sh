#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

# Explicit non-serving allow-list: image overlay setup only. Request handlers
# must remain writer-free.
allowed='^(\./)?docker/overlay-api\.xq$'

# Tracked exceptions: modules that still write but are not OpenAPI-served.
# Each entry must be documented in docs/NO_WRITES.md. Reported, not failed.
#
#   local/places.xqm - places:pelagiosDump() uses xmldb:store for a manual
#   Pelagios TTL export (run from eXide/admin), not an OpenAPI operation.
tracked='^(\./)?local/places\.xqm$'

if ! command -v rg >/dev/null 2>&1; then
	printf 'ERROR: ripgrep (rg) is required for the no-serving-writes gate\n' >&2
	exit 2
fi

# ripgrep: 0 = matches, 1 = no matches, >=2 = error. Never treat error as clean.
matches="$(mktemp)"
trap 'rm -f "${matches}"' EXIT
set +e
rg -lU 'update[[:space:]]+(insert|value|delete|replace|rename)\b|xmldb:store' \
	--glob '*.xq' --glob '*.xql' --glob '*.xqm' . >"${matches}"
rg_status=$?
set -e
if [ "${rg_status}" -gt 1 ]; then
	printf 'ERROR: ripgrep failed while scanning for serving writes (exit %s)\n' "${rg_status}" >&2
	exit "${rg_status}"
fi

status=0

while IFS= read -r file; do
	[ -n "${file}" ] || continue
	if [[ "$file" =~ $allowed ]]; then
		continue
	fi
	if [[ "$file" =~ $tracked ]]; then
		printf 'Tracked write exception (not OpenAPI-served): %s\n' "$file" >&2
		continue
	fi
	printf 'Disallowed database write in serving module: %s\n' "$file" >&2
	status=1
done <"${matches}"

exit "$status"
