import assert from "node:assert/strict";
import {getPageLocale,isKnownLocale,isRtlLocale} from "../lib/seo/locales.ts";

const cases={
  "/":"en","/travel/local-experiences/night-bites":"en","/go/threads":"ru",
  "/ru":"ru","/ru/cruise-port-shore-excursions":"ru",
  "/kz/tour":"ru-KZ","/it":"it","/vi/food":"vi","/cn":"zh-CN",
  "/tw/place":"zh-TW","/ko":"ko-KR","/fr":"fr-FR",
  "/de":"de-DE","/il":"he-IL","/ar":"ar","/tr":"tr-TR",
  "/ph":"en-PH","/in":"en-IN","/mn":"mn",
};
for(const [path,want] of Object.entries(cases)){
  assert.equal(getPageLocale(path),want,`Wrong locale for ${path}`);
  assert.equal(isKnownLocale(want),true);
}
assert.equal(isRtlLocale("he-IL"),true);
assert.equal(isRtlLocale("ar"),true);
assert.equal(isRtlLocale("ru"),false);
assert.equal(isKnownLocale(null),false);
console.log(`PASS: ${Object.keys(cases).length} locale routes; RTL and fallback.`);
