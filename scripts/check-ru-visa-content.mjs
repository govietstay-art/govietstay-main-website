import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {readFile} from "node:fs/promises";

const src=await readFile("lib/russian-seo-landings.ts","utf8");
const block=src.slice(src.indexOf('"slug": "visa-vietnam"'));
assert.ok(block.includes("виза во вьетнам на 90 дней для казахстанцев"),"Observed Kazakhstan visa query missing");
assert.ok(src.includes("export const russianSeoIndexableLandings = russianSeoLandings;"),"Visa missing from sitemap/static param inventory");
for(const u of ["https://evisa.gov.vn/","https://web.mofa.gov.vn/"])assert.ok(block.includes(u),"Official source missing: "+u);
const origin="http://127.0.0.1:4000";
const child=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--port","4000"],{detached:true,stdio:["ignore","pipe","pipe"],env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"}});
let stderr="";child.stderr.on("data",x=>stderr=(stderr+x.toString()).slice(-1600));
const sleep=n=>new Promise(r=>setTimeout(r,n));
try{
 let ready=false;
 for(let i=0;i<75;i++){
   if(child.exitCode!==null)throw Error("Server exited: "+stderr);
   try{let r=await fetch(origin+"/ru/visa-vietnam",{signal:AbortSignal.timeout(2400)});if(r.ok){ready=true;break;}}catch{}
   await sleep(500);
 }
 assert.ok(ready,"RU visa server not ready: "+stderr);
 const r=await fetch(origin+"/ru/visa-vietnam",{signal:AbortSignal.timeout(30000)});
 assert.equal(r.status,200);
 const html=await r.text();
 for(const phrase of ["Нужна ли гражданам Казахстана виза во Вьетнам","Можно ли гражданину Казахстана получить визу","90 дней в течение","https://evisa.gov.vn/","FAQPage","https://wa.me/"])
   assert.ok(html.includes(phrase),"Missing visa claim/FAQ/source: "+phrase);
 assert.ok(html.includes('href="https://www.govietstay.com/ru/visa-vietnam"'),"Visa canonical missing");
 const ld=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
   .map(m=>{try{return JSON.parse(m[1]);}catch{return null;}}).filter(Boolean);
 const faq=ld.flatMap(x=>x["@graph"]??[x]).find(x=>x["@type"]==="FAQPage");
 assert.ok(faq && faq.mainEntity.length>=8,"Eight visible/schema FAQs expected");
 assert.ok(faq.mainEntity.some(x=>x.name==="Нужна ли казахстанцам виза во Вьетнам?"),"Kazakhstan FAQ not in JSON-LD");
 const map=await (await fetch(origin+"/sitemap.xml")).text();
 const needle="<loc>https://www.govietstay.com/ru/visa-vietnam</loc>";
 const ix=map.indexOf(needle);
 assert.ok(ix>=0 && map.slice(ix,ix+220).includes("<lastmod>2026-09-28"),"Visa sitemap indexing/date missing");
 console.log("PASS: RU Kazakhstan visa 30/90-180 + e-visa official citations, eight FAQ JSON-LD, canonical, sitemap and WhatsApp.");
}catch(e){console.error(e);console.error(stderr);process.exitCode=1;}
finally{try{if(child.pid)process.kill(-child.pid,"SIGTERM");}catch{child.kill("SIGTERM");}child.stdout.destroy();child.stderr.destroy();}
