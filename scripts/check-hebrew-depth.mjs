import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const source=await readFile("lib/israelSeoEditorial.ts","utf8");
const pages=["phu-quoc-guide-israelis","phu-quoc-family","phu-quoc-private-car","danang-private-tour","hoi-an-private-evening","hue-day-trip"];
for(const slug of pages){
 const start=source.indexOf('"' +slug+'": {');
 const end=source.indexOf('\n  "',start+slug.length+5);
 assert.ok(start>=0&&end>start,"Hebrew editorial missing "+slug);
 const entry=JSON.parse("{"+source.slice(start,end).replace(/,\s*$/,"")+"}");
 const value=entry[slug];
 assert.equal(value.updated,"2026-10-12","Stale date "+slug);
 assert.ok(value.sections.length>=7,"Need unique practical sections "+slug);
 assert.ok(value.faqs.length>=6,"Need practical buyer FAQ "+slug);
 const combined=value.sections.map(x=>x.body).join(" ");
 assert.ok(combined.length>1500,"Page too short for buyer decisions: "+slug);
 assert.equal(new Set(value.sections.map(x=>x.title)).size,value.sections.length,"Duplicate heading "+slug);
 assert.equal(new Set(value.faqs.map(x=>x.q)).size,value.faqs.length,"Duplicate FAQ "+slug);
}
const rendered=await readFile("app/il/_seo/IsraelPage.tsx","utf8");
assert.ok(rendered.includes('"@type":"FAQPage"'),"Missing FAQ structured data");
assert.ok(rendered.includes("editorial.faqs.map"),"Visible questions must use same source as FAQ schema");
console.log("PASS: six unique Hebrew decision guides with 42+ sections and 36+ visible/schema FAQs.");
