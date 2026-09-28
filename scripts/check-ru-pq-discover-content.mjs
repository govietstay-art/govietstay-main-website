import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {readFile} from "node:fs/promises";

const source=await readFile("lib/russian-phu-quoc-cluster.ts","utf8");
const block=source.slice(source.indexOf('"slug": "chto-posmotret"'),source.indexOf('"slug": "kuda-poehat"'));
for(const phrase of ["фукуок что посмотреть", "фукуок что посмотреть самостоятельно", "Что посмотреть на Фукуоке за 7 дней"])
  assert.ok(block.toLowerCase().includes(phrase.toLowerCase()),"Missing actual discovery intent: "+phrase);
const origin="http://127.0.0.1:3999";
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--port","3999"],{
  detached:true,stdio:["ignore","pipe","pipe"],env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"}
});
let stderr="";server.stderr.on("data",x=>stderr=(stderr+x.toString()).slice(-1800));
const sleep=n=>new Promise(r=>setTimeout(r,n));
try{
  let ready=false;
  for(let i=0;i<75;i++){
    if(server.exitCode!==null)throw Error("Server exited: "+stderr);
    try{const r=await fetch(origin+"/ru/phu-quoc/chto-posmotret",{signal:AbortSignal.timeout(2500)});if(r.ok){ready=true;break;}}catch{}
    await sleep(500);
  }
  assert.ok(ready,"No RU Phu Quoc preview: "+stderr);
  const response=await fetch(origin+"/ru/phu-quoc/chto-posmotret",{signal:AbortSignal.timeout(30000)});
  assert.equal(response.status,200);
  const html=await response.text();
  for(const phrase of ["Что посмотреть на Фукуоке самостоятельно", "Что посмотреть на Фукуоке за 7 дней", "Что посмотреть на Фукуоке за 3 дня?", "FAQPage", "/ru/phu-quoc/sunset-town", "/ru/phu-quoc/hon-thom"])
    assert.ok(html.includes(phrase),"Missing visible answer/schema/link: "+phrase);
  assert.ok(html.includes('href="https://www.govietstay.com/ru/phu-quoc/chto-posmotret"'),"Canonical missing");
  for(const p of ["/ru/phu-quoc/s-detmi","/ru/phu-quoc/hon-thom","/ru/phu-quoc/7-dney","/ru/tours/phu-quoc"]){
    const r=await fetch(origin+p,{signal:AbortSignal.timeout(30000)});
    assert.equal(r.status,200,"Broken discovery link: "+p);
  }
  const ld=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map(x=>{try{return JSON.parse(x[1]);}catch{return null;}}).filter(Boolean);
  const faq=ld.flatMap(x=>x["@graph"]??[x]).find(x=>x["@type"]==="FAQPage");
  assert.ok(faq && faq.mainEntity.length>=8,"Expected eight FAQ schema answers");
  assert.ok(faq.mainEntity.some(x=>x.name==="Что посмотреть на Фукуоке самостоятельно без экскурсии?"),"FAQ schema not aligned to visible answer");
  const xml=await (await fetch(origin+"/ru/phu-quoc/sitemap.xml")).text();
  const start=xml.indexOf("<loc>https://www.govietstay.com/ru/phu-quoc/chto-posmotret</loc>");
  assert.ok(start>=0 && xml.slice(start,start+220).includes("<lastmod>2026-09-28</lastmod>"),"Selective sitemap date missing");
  console.log("PASS: RU Phu Quoc discovery 3–7 day guide, independent/family intents, FAQ schema, canonical, 4 internal pages and updated sitemap.");
}catch(e){console.error(e);console.error(stderr);process.exitCode=1;}
finally{try{if(server.pid)process.kill(-server.pid,"SIGTERM");}catch{server.kill("SIGTERM");}server.stdout.destroy();server.stderr.destroy();}
