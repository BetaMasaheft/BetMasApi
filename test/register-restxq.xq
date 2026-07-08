xquery version "3.1";

(:
 : CI-only helper: registers this package's RestXQ modules with eXist's
 : RestXqServiceRegistry. In production this happens as a side effect of
 : BetMasWeb/BetMasService's own deployment scripts, which we don't install
 : in this repo's test pipeline, so we do it explicitly here instead.
 :)

import module namespace xmldb = "http://exist-db.org/xquery/xmldb";

for $collection in ("/db/apps/BetMasApi/local", "/db/apps/BetMasApi/specifications")
for $resource in xmldb:get-child-resources($collection)
where ends-with($resource, ".xqm")
let $uri := xs:anyURI($collection || "/" || $resource)
return (try { exrest:deregister-module($uri) } catch * { () }, try { exrest:register-module($uri) } catch * { () })
