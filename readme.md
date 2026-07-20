# BetMasApi

[![exist-db CI](https://github.com/BetaMasaheft/BetMasApi/actions/workflows/exist.yml/badge.svg)](https://github.com/BetaMasaheft/BetMasApi/actions/workflows/exist.yml)

API for [Beta maṣāḥǝft](https://www.betamasaheft.eu): Manuscripts of Ethiopia and Eritrea

## Requirements

- [exist-db](http://exist-db.org/exist/apps/homepage/index.html) version: `6.4.0` or greater
- [ant](http://ant.apache.org) version: `1.10.12` \(for building from source\)
- For the Docker stack: [Docker](https://docs.docker.com/get-docker/) with Compose v2

## Local development (Docker)

The Compose stack builds on top of the published BetMas app image
(`BETMAS_APP_IMAGE`, default `ghcr.io/betamasaheft/betamasaheft:release-expanded`
— published by [BetaMasaheft/BetMas](https://github.com/BetaMasaheft/BetMas)'s
own CI) and layers only this repo's own package on top. BetMasWeb and
BetMasService are **not** built from source here; they, and the real
Beta maṣāḥǝft corpus, already ship in the base image.

### Seed file (required)

`docker/seed.xq` creates the `BetaMasaheftAdmin` account: this repo's
`repo.xml` declares it as the owner of `/db/apps/BetMasApi`, and the base
image does not create it. It is **not** committed (it contains a password).
It is passed into the image build as a [BuildKit secret](https://docs.docker.com/build/building/secrets/)
and is not left as a file in the image.

```bash
cp docker/seed.xq.example docker/seed.xq
# edit the password in sm:create-account(...)
```

### Start the stack

```bash
docker compose up --build
```

eXist is on [http://localhost:8080](http://localhost:8080). Fuseki is proxied for SPARQL as expected by the app.

To build the image without Compose:

```bash
docker build --secret id=seed,src=docker/seed.xq -t betmasapi-exist:local .
```

To build against a locally-built app image instead of the published one (e.g.
while iterating on BetMasWeb), pass `BETMAS_APP_IMAGE`:

```bash
docker build --secret id=seed,src=docker/seed.xq --build-arg BETMAS_APP_IMAGE=betamasaheft:local -t betmasapi-exist:local .
```

### Redeploying after a source edit

Once the stack is up, `npm run deploy:dev` builds the xar and installs it
into the already-running container over HTTP (no image rebuild needed):

```bash
npm run deploy:dev
```

### CI

GitHub Actions writes `docker/seed.xq` from the repository secret **`SEED_XQ`** (full file contents, same shape as `docker/seed.xq.example`) before building the image. Configure it under **Settings → Secrets and variables → Actions**.

## Compiling from Source

1. Download, fork or clone this GitHub repository
2. Calling `ant` in your CLI will build a `.xar` file:

```bash
ant
```

If you see `BUILD SUCCESSFUL` ant has generated a `BetMasApi-X.X.X.xar` file in the `build/` folder. To install it, follow the instructions [below](#installation).

## Installation

1. Download the `BetMasApi-X.X.X.xar` file from GitHub [releases](https://github.com/BetaMasaHeft/BetMasApi/releases) page.
2. Open the [dashboard](http://localhost:8080/exist/apps/dashboard/index.html) of your eXist-db instance and click on `package manager`.
   1. Click on the `add package` symbol in the upper left corner and select the `.xar` file you just downloaded.
3. You have successfully installed BetMasApi into exist.
