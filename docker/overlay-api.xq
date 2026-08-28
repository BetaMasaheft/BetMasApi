xquery version "3.1";

(: Replace BETMAS_APP_IMAGE's BetMasApi with this build's xar.
   exist-db/exist#5579: AutoDeploymentTrigger skips already-installed names
   (enforceDeps=false). repo:install-and-deploy-from-db sets enforceDeps=true.

   Runs in the same client -F as the admin seed: eval SEED_XQ from the build
   secret first (repo.xml permissions user="BetaMasaheftAdmin"), then overlay.
   Errors if the deployed package is still the base image's copy. :)

declare variable $local:pkg := "https://betamasaheft.eu/BetMasApi";

declare variable $local:xar := "/exist/overlay/BetMasApi.xar";

declare variable $local:want := string(parse-xml(file:read("/exist/overlay/expath-pkg.xml"))/*:package/@version);

util:eval(file:read("/run/secrets/seed.xq")),
if (repo:list() = $local:pkg) then (
	repo:undeploy($local:pkg), repo:remove($local:pkg)
) else (
),
let $col := if (xmldb:collection-available("/db/tmp")) then
	"/db/tmp"
else
	xmldb:create-collection("/db", "tmp")
let $stored := xmldb:store($col, "BetMasApi.xar", file:read-binary($local:xar))
let $status := repo:install-and-deploy-from-db($stored)
let $_ := xmldb:remove($col, "BetMasApi.xar")
let $got := string(doc("/db/apps/BetMasApi/expath-pkg.xml")/*:package/@version)
let $src := util:binary-to-string(util:binary-doc("/db/apps/BetMasApi/local/apiTitles.xqm"))
return if ($got ne $local:want) then
	error(xs:QName("local:overlay-stale"), "BetMasApi overlay deployed " || $got || ", expected " || $local:want)
else if (contains($src, "modules/titles.xqm")) then
	error(xs:QName("local:overlay-stale"), "BetMasApi overlay still imports BetMasWeb/modules/titles.xqm")
else
	$status
