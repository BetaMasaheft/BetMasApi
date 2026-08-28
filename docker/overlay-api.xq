xquery version "3.1";

(: Replace BETMAS_APP_IMAGE's BetMasApi with this build's xar.
   exist-db/exist#5579: AutoDeploymentTrigger calls Deployment#installAndDeploy
   with enforceDeps=false, so a newer xar in autodeploy is skipped whenever
   the package name is already installed. repo:install-and-deploy-from-db
   sets enforceDeps=true and actually overlays it.

   Not part of seed.xq: CI overwrites that file from the SEED_XQ secret. :)

declare variable $local:pkg := "https://betamasaheft.eu/BetMasApi";

declare variable $local:xar := "/exist/overlay/BetMasApi.xar";

if (repo:list() = $local:pkg) then (
	repo:undeploy($local:pkg), repo:remove($local:pkg)
) else (
),
let $col := if (xmldb:collection-available("/db/tmp")) then
	"/db/tmp"
else
	xmldb:create-collection("/db", "tmp")
let $stored := xmldb:store($col, "BetMasApi.xar", file:read-binary($local:xar))
return repo:install-and-deploy-from-db($stored)
