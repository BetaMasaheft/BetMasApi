#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

# Explicit non-serving allow-list: image overlay setup and the manually
# invoked Pelagios export job. Request handlers must remain writer-free.
allowed='^(\./)?(docker/overlay-api\.xq|local/places\.xqm)$'
status=0

while IFS= read -r file; do
	if [[ ! "$file" =~ $allowed ]]; then
		printf 'Disallowed database write in serving module: %s\n' "$file" >&2
		status=1
	fi
done < <(rg -l 'update[[:space:]]+(insert|value|delete)|xmldb:store' --glob '*.xq' --glob '*.xql' --glob '*.xqm' . || true)

exit "$status"
