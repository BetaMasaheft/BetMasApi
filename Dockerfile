# Local dev image: eXist + BetMasWeb + BetMasService + this package, all
# pre-installed at build time so `docker run` serves immediately.
#
# Staged slow-to-fast so editing BetMasApi source only invalidates the last
# two steps - BetMasWeb/BetMasService stay cached.
#
#   docker compose up --build
#

ARG EXISTDB_VERSION=6.4.1

# ---- build xars from source (needs ant, not present in the eXist image) ----
FROM node:latest AS build-stage
RUN apt-get update && apt-get install -y --no-install-recommends ant && rm -rf /var/lib/apt/lists/*

ADD https://github.com/BetaMasaheft/BetMasWeb.git /src/BetMasWeb
RUN ant -f /src/BetMasWeb/build.xml

ADD https://github.com/BetaMasaheft/BetMas.git /src/BetMas
RUN ant -f /src/BetMas/db/apps/BetMasService/build.xml

WORKDIR /src/BetMasApi
COPY . .
RUN ant

# ---- eXist, with everything installed ----
FROM existdb/existdb:${EXISTDB_VERSION}-DEBUG

RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates && \
    curl -fsSL https://deb.nodesource.com/setup_26.x | bash - && \
    apt-get install -y --no-install-recommends nodejs && \
    npm install --global @existdb/xst@4 && \
    rm -rf /var/lib/apt/lists/*

ENV EXISTDB_SERVER=http://localhost:8080 \
    EXISTDB_USER=admin \
    EXISTDB_PASS=

# explode: pre-extract jars into their own cached layer
RUN [ "java", "org.exist.start.Main", "client", "--no-gui", "-l", "-u", "admin", "-P", "", "-x", "'HelloWorld!'" ]

# slow-changing deps: shared-resources, BetMasService, BetMasWeb
COPY --from=build-stage /src/BetMasWeb/build/*.xar /install/BetMasWeb/
COPY --from=build-stage /src/BetMas/db/apps/BetMasService/build/*.xar /install/BetMasService/

RUN java org.exist.start.Main jetty & \
    EXIST_PID=$! && \
    timeout 120 bash -c 'until curl -sf http://localhost:8080/exist/rest/ > /dev/null 2>&1; do echo "Waiting..."; sleep 3; done' && \
    xst package install from-registry shared-resources && \
    xst execute "if (sm:user-exists('BetaMasaHeftAdmin')) then () else sm:create-account('BetaMasaHeftAdmin', 'test', 'dba')" && \
    xst execute "if (xmldb:collection-available('/db/apps/expanded')) then () else xmldb:create-collection('/db/apps', 'expanded')" && \
    xst execute "for \$c in ('authority-files','manuscripts','institutions','narratives','persons','places','studies','works') where not(xmldb:collection-available('/db/apps/expanded/' || \$c)) return xmldb:create-collection('/db/apps/expanded', \$c)" && \
    xst package install local-files /install/BetMasService/*.xar && \
    xst package install local-files /install/BetMasWeb/*.xar && \
    kill $EXIST_PID && \
    wait $EXIST_PID; true

# this package: rebuilds fast on every local change
COPY --from=build-stage /src/BetMasApi/build/*.xar /install/BetMasApi/
COPY test/register-restxq.xq /install/register-restxq.xq

RUN java org.exist.start.Main jetty & \
    EXIST_PID=$! && \
    timeout 120 bash -c 'until curl -sf http://localhost:8080/exist/rest/ > /dev/null 2>&1; do echo "Waiting..."; sleep 3; done' && \
    xst package install local-files /install/BetMasApi/*.xar && \
    xst execute --file /install/register-restxq.xq && \
    kill $EXIST_PID && \
    wait $EXIST_PID; true
