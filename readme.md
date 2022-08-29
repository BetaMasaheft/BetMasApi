# BetMasApi

[![exist-db CI](https://github.com/BetaMasaheft/BetMasApi/actions/workflows/exist.yml/badge.svg)](https://github.com/BetaMasaheft/BetMasApi/actions/workflows/exist.yml)

API for [Beta maṣāḥǝft](https://www.betamasaheft.eu): Manuscripts of Ethiopia and Eritrea

## Requirements

* [exist-db](http://exist-db.org/exist/apps/homepage/index.html) version: `5.2.0` or greater
* [ant](http://ant.apache.org) version: `1.10.12` \(for building from source\)

## Compiling from Source

1. Download, fork or clone this GitHub repository
2. Calling `ant` in your CLI will build a `.xar` file:
  
```bash
ant
```

If you see `BUILD SUCCESSFUL` ant has generated a `BetMasApi-X.X.X.xar` file in the `build/` folder. To install it, follow the instructions [below](#installation).

## Installation

1. Download  the `BetMasApi-X.X.X.xar` file from GitHub [releases](https://github.com/BetaMasaHeft/BetMasApi/releases) page.
2. Open the [dashboard](http://localhost:8080/exist/apps/dashboard/index.html) of your eXist-db instance and click on `package manager`.
    1. Click on the `add package` symbol in the upper left corner and select the `.xar` file you just downloaded.
3. You have successfully installed BetMasApi into exist.