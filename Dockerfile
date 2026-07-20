# syntax=docker/dockerfile:1
# Local/CI image: eXist with BetMasWeb + BetMasService + BetMasApi pre-installed.
# `docker compose up --build` should serve without a cold package install.
#
# Cache layout (slow → fast):
#   1. build XARs + fetch registry deps
#   2. seed DB with deps + Service + Web (own layer — expensive, rarely invalidates)
#   3. install BetMasApi + store fixtures (own layer — invalidates on this-repo edits)
#
# Base image is distroless (no shell). All exist-stage RUNs use exec form.
# shared-resources is frozen — direct xar download. roaster is resolved via public-repo
# find (same as xst), using processor + semver-min from expath-pkg.xml.
#
#   docker compose up --build

ARG EXISTDB_VERSION=6.4.1
ARG BUILDER_IMAGE=ghcr.io/eeditiones/builder:latest
ARG BETMASWEB_REF=main
ARG BETMAS_REF=master

# ---- build XARs + fetch registry deps ----
FROM ${BUILDER_IMAGE} AS build-stage

ARG BETMASWEB_REF
ARG BETMAS_REF

WORKDIR /src

RUN mkdir -p deps \
 && curl -fsSL -o deps/00-shared-resources.xar \
      https://exist-db.org/exist/apps/public-repo/public/shared-resources-0.9.1.xar

RUN git clone --depth 1 --branch "${BETMASWEB_REF}" \
      https://github.com/BetaMasaheft/BetMasWeb.git BetMasWeb \
 && ant -f BetMasWeb/build.xml

RUN git clone --depth 1 --branch "${BETMAS_REF}" \
      https://github.com/BetaMasaheft/BetMas.git BetMas \
 && ant -f BetMas/db/apps/BetMasService/build.xml

WORKDIR /src/BetMasApi
COPY . .
RUN PROC=$(sed -n 's/.*processor="http:\/\/exist-db.org"[^>]*semver-min="\([^"]*\)".*/\1/p' expath-pkg.xml) \
 && SEMVER_MIN=$(sed -n 's/.*e-editiones.org\/roaster[^>]*semver-min="\([^"]*\)".*/\1/p' expath-pkg.xml) \
 && test -n "$PROC" && test -n "$SEMVER_MIN" \
 && echo "resolving roaster for processor ${PROC} (semver-min ${SEMVER_MIN})…" \
 && curl -fsSL -o /src/deps/01-roaster.xar \
      "https://exist-db.org/exist/apps/public-repo/find?abbrev=roaster&processor=${PROC}&semver-min=${SEMVER_MIN}"
RUN ant

# ---- eXist, packages installed into the image ----
FROM duncdrum/existdb:${EXISTDB_VERSION}

# Pre-extract eXist jars into their own cached layer (common exist-docker pattern)
RUN ["java", "org.exist.start.Main", "client", "--no-gui", "-l", "-u", "admin", "-P", "", "-x", "'HelloWorld!'"]

COPY --from=build-stage /src/deps/*.xar /exist/autodeploy/
COPY --from=build-stage /src/BetMas/db/apps/BetMasService/build/*.xar /exist/autodeploy/
COPY --from=build-stage /src/BetMasWeb/build/*.xar /exist/autodeploy/

# First client boot: autodeploy deps + Service + Web, create admin user and
# /db/apps/expanded collections. Kept as its own layer so edits to BetMasApi
# or test fixtures do not redo this (the expensive part).
# seed.xq (admin password) is a build secret.
RUN --mount=type=secret,id=seed,target=/run/secrets/seed.xq,required=true ["java", "org.exist.start.Main", "client", "--no-gui", "-l", "-u", "admin", "-P", "", "-F", "/run/secrets/seed.xq"]

# Second client boot: autodeploy BetMasApi, then store TEI fixtures under
# /db/apps/expanded for CI/Cypress. Same RUN as Api — fixtures do not need the
# package installed to be stored, but both change with this repo so they share
# a layer. Could merge into the seed RUN above for simplicity at the cost of
# cache (any Api/fixture change would re-seed Service/Web).
COPY --from=build-stage /src/BetMasApi/build/*.xar /exist/autodeploy/
COPY test/fixtures /install/fixtures
RUN ["java", "org.exist.start.Main", "client", "--no-gui", "-l", "-u", "admin", "-P", "", "-d", "-c", "/db/apps/expanded", "-p", "/install/fixtures"]
