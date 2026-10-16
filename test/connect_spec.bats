#!/usr/bin/env bats

# Basic start-up and connection smoke tests
# Adapted from https://github.com/eeditiones/jinks/blob/main/test/01-smoke.bats

@test "container jvm responds from client" {
  run docker exec exist java -version
  [ "$status" -eq 0 ]
}

@test "container can be reached via http" {
  result=$(curl -Is http://127.0.0.1:8080/ | grep -o 'Jetty')
  [ "$result" == 'Jetty' ]
}

@test "container reports healthy to docker" {
  result=$(docker ps | grep -c '(healthy)')
  [ "$result" -eq 1 ]
}

@test "logs show clean start" {
  result=$(docker logs exist | grep -o 'Server has started')
  [ "$result" == 'Server has started' ]
}

# Make sure the package has been deployed. Two valid signals depending on
# when install happened: a fresh deploy (smoke.yml, xst installs after the
# container is already running) or "already installed" at this boot because
# it was deployed once at image build time and persisted (exist.yml). At
# least one of these two lines - not a bare URI count, which a fresh install
# also inflates via one "depends on <this URI>" line per dependency. Not
# exactly one either: AutoDeploymentTrigger's scan has been observed logging
# the same package's "already installed" line twice in a single boot.
@test "logs show package deployment" {
  result=$(docker logs exist | grep -ocE 'Deploying package https://betamasaheft\.eu/BetMasApi|Application package https://betamasaheft\.eu/BetMasApi already installed')
  [ "$result" -ge 1 ]
}

@test "logs are error free" {
  # BetMas 3b2ec76 dropped shared-resources from betmas-data while
  # guidelinesApp (19-guidelinesApp.xar in release-expanded) still depends on
  # http://exist-db.org/apps/shared — AutoDeploymentTrigger ERROR on every
  # boot until BetMas restores shared or guidelines drops the dep. Ignore
  # that one known line so Api CI is not blocked on upstream image skew.
  result=$(
    docker logs exist 2>&1 \
      | grep -E '\] ERROR \(' \
      | grep -vF '19-guidelinesApp.xar: Missing dependency: package http://exist-db.org/apps/shared could not be resolved.' \
      | wc -l \
      | tr -d ' '
  )
  [ "$result" -eq 0 ]
}

@test "no fatalities in logs" {
  result=$(docker logs exist | grep -ow -c 'FATAL' || true)
  [ "$result" -eq 0 ]
}

# Check for cgroup config warning
@test "check logs for cgroup file warning" {
  result=$(docker logs exist | grep -ow -c 'Unable to open cgroup memory limit file' || true)
  [ "$result" -eq 0 ]
}
