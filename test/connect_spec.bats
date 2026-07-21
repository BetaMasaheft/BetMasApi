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
# it was deployed once at image build time and persisted (exist.yml). Either
# way, exactly one of these two lines - not a bare URI count, which a fresh
# install also inflates via one "depends on <this URI>" line per dependency.
@test "logs show package deployment" {
  result=$(docker logs exist | grep -ocE 'Deploying package https://betamasaheft\.eu/BetMasApi|Application package https://betamasaheft\.eu/BetMasApi already installed')
  [ "$result" -eq 1 ]
}

@test "logs are error free" {
  result=$(docker logs exist | grep -ow -c 'ERROR' || true)
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
