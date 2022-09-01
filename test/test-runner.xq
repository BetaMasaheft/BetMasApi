xquery version "3.1";

(:~ This library runs the XQSuite unit tests for the BetMasApi.
 : TODO(DP): untested scaffold  here to collect pre-existing test code
 :
 : @author Duncan Paterson
 : @version 1.0.0-Alpha
 : @see http://www.exist-db.org/exist/apps/doc/xqsuite
 :)
import module namespace test = "http://exist-db.org/xquery/xqsuite" at "resource:org/exist/xquery/lib/xqsuite/xqsuite.xql";
import module namespace apiT = "https://www.betamasaheft.uni-hamburg.de/BetMasApi/apiTexts" at '../local/apiText.xqm';
import module namespace att = "https://www.betamasaheft.uni-hamburg.de/BetMasWebApi/att" at '../local/attestations.xqm';
import module namespace api = "https://www.betamasaheft.uni-hamburg.de/BetMasApi/api" at '../local/rest.xqm';
import module namespace roles = "https://www.betamasaheft.uni-hamburg.de/BetMasApi/roles" at '../local/roles.xqm';
import module namespace WC = "https://www.betamasaheft.uni-hamburg.de/BetMasApi/WC" at '../local/wordCount.xqm';

declare namespace output="http://www.w3.org/2010/xslt-xquery-serialization";
declare option output:method "json";
declare option output:media-type "application/json";


test:suite(
  (
    inspect:module-functions(xs:anyURI("apiText.xqm")),
    inspect:module-functions(xs:anyURI("attestations.xqm")),
    inspect:module-functions(xs:anyURI("rest.xqm")),
    inspect:module-functions(xs:anyURI("roles.xqm")),
    inspect:module-functions(xs:anyURI("wordCount.xqm"))
  )
)