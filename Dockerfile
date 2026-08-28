# syntax=docker/dockerfile:1
# Local/CI image: the published BetMas app image + this repo's own package.
# `docker compose up --build` should serve without a cold package install.
#
# BetMasWeb/BetMasService/data are NOT built from source here anymore - they
# are already published, indexed and tested in BETMAS_APP_IMAGE (BetMas's own
# CI publishes it in minutes: BetaMasaheft/BetMas#124). This repo only builds
# its own xar; roaster is already pinned >= 1.12.1 in the base, so there is
# nothing left to resolve here either. Point BETMAS_APP_IMAGE at a local tag
# to test against an unpublished base image.
#
# Base image is distroless (no shell). All exist-stage RUNs use exec form.
#
#   docker compose up --build

ARG BETMAS_APP_IMAGE=ghcr.io/betamasaheft/betamasaheft:release-expanded
ARG BUILDER_IMAGE=ghcr.io/eeditiones/builder:latest

# ---- build this repo's xar ----
FROM ${BUILDER_IMAGE} AS build-stage

WORKDIR /src/BetMasApi
COPY . .
RUN ant && mv build/*.xar build/BetMasApi.xar

# ---- the published app image + this repo's package ----
FROM ${BETMAS_APP_IMAGE}

# Not autodeploy: exist-db/exist#5579 skips already-installed package names
# even when the xar version is newer (enforceDeps=false). Overlay via repo:*
# in overlay-api.xq after the admin account exists (repo.xml permissions).
COPY --from=build-stage /src/BetMasApi/build/BetMasApi.xar /exist/overlay/BetMasApi.xar
COPY docker/overlay-api.xq /exist/overlay/overlay-api.xq

# seed.xq (admin password) is a build secret. CI writes it from SEED_XQ;
# it is not this overlay script.
#
# No fixture upload: the base already ships the real corpus (betmas-data's
# expanded.xar), and test/fixtures/ are trimmed copies of real records under
# the same IDs (LIT1367Exodus, BAVet1, ...) - uploading them on top produced
# two documents with the same xml:id at different collection paths (the real
# corpus nests by ID range, e.g. works/1001-2000/..., the fixture uploader
# does not), breaking every id()-based lookup. The real corpus already
# satisfies what the fixtures were standing in for.
RUN --mount=type=secret,id=seed,target=/run/secrets/seed.xq,required=true ["java", "org.exist.start.Main", "client", "--no-gui", "-l", "-u", "admin", "-P", "", "-F", "/run/secrets/seed.xq"]
RUN ["java", "org.exist.start.Main", "client", "--no-gui", "-l", "-u", "admin", "-P", "", "-F", "/exist/overlay/overlay-api.xq"]
