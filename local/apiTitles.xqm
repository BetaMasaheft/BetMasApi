xquery version "3.1" encoding "UTF-8";

(:~
 : titles from API
 :
 : @author Pietro Liuzzo
 :)

module namespace apiTit = "https://www.betamasaheft.uni-hamburg.de/BetMasApi/apiTitles";

(: namespaces of data used :)
declare namespace t = "http://www.tei-c.org/ns/1.0";
(: For REST annotations :)
declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";

import module namespace catalog = "https://www.betamasaheft.uni-hamburg.de/BetMasWeb/catalog" at "xmldb:exist:///db/apps/BetMasWeb/modules/catalog.xqm";

declare variable $apiTit:backend := catalog:backend("api-titles");

(:~
 : given the file id, returns the main title
 :)
declare function apiTit:get-FormattedTitle($request as map(*)) {
	let $id as xs:string := $request?parameters?id
	return (
		let $id := replace($id, "_", ":")

		return if (not(contains($id, ":"))) then
			normalize-space(string-join(catalog:label($id, $apiTit:backend)))
		else if (
			starts-with($id, "wd:") or starts-with($id, "pleaides:") or starts-with($id, "sdc:") or starts-with($id, "gn:")
		) then
			normalize-space(catalog:label($id, $apiTit:backend))
		else
			$id
	)
};

(:~
 : given the file id, returns the main title
 :)
declare function apiTit:get-FormattedTitleJson($request as map(*)) {
	let $id as xs:string := $request?parameters?id
	return (
		let $id := replace($id, "_", ":")
		let $titletext := if (not(contains($id, ":"))) then
			normalize-space(string-join(catalog:label($id, $apiTit:backend)))
		else if (
			starts-with($id, "wd:") or starts-with($id, "pleaides:") or starts-with($id, "sdc:") or starts-with($id, "gn:")
		) then
			normalize-space(catalog:label($id, $apiTit:backend))
		else
			$id

		return map {"title": $titletext}
	)
};

(:~
 : given the file id and an anchor, returns the formatted main title and the title of the reffered section
 :)
declare function apiTit:get-FormattedTitleandID($request as map(*)) {
	let $id as xs:string := $request?parameters?id
	let $SUBid as xs:string := $request?parameters?SUBid
	return (
		let $fullid := ($id || "#" || $SUBid)
		let $known := catalog:textparts($fullid, $apiTit:backend)[@corresp = $fullid]
		return if ($known) then (
			$known/node()
		) else (
			catalog:label($fullid, $apiTit:backend)
		)
	)
};
