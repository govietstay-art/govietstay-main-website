import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {readFile} from "node:fs/promises";

const src=await readFile("lib/italySeoPages.ts","utf8");
const prices=await readFile("lib/italyMarketConfig.ts","utf8");
for(const q of ["Quanto costa una guida italiana in Vietnam?","Cosa vedere in Vietnam in 7 giorni?","Dove si trova la foresta di cocco di Hoi An?"])assert.ok(src.includes(q),"Missing Italian observed-intent FAQ "+q);
for(const q of ['baNa.adultPrice','cham.adultPrice','PHU_QUOC_PUBLISHED_RATES["TRIP 3"].adult','PHU_QUOC_PUBLISHED_RATES["CABLE CAR TRIP"].adult'])assert.ok(prices.includes(q),"Italian tariff not tied to verified source "+q);
const origin="http://127.0.0.1:4005";
const child=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--port","4005"],{detached:true,stdio:["ignore","pipe","pipe"],env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"}});
let stderr="";child.stderr.on("data",x=>stderr=(stderr+x.toString()).slice(-1800));
const sleep=n=>new Promise(resolve=>setTimeout(resolve,n));
try{
 let ready=false;
 for(let i=0;i<75;i++){
  if(child.exitCode!==null)throw Error("Next exited: "+stderr);
  try{const r=await fetch(origin+"/it/guida-in-italiano-vietnam-centrale",{signal:AbortSignal.timeout(2200)});if(r.ok){ready=true;break;}}catch{}
  await sleep(500);
 }
 assert.ok(ready,"Italian server failed: "+stderr);
 const pages=[
  ["/it/guida-in-italiano-vietnam-centrale",["Guida italiana in Vietnam: disponibilità","Quanto costa una guida italiana in Vietnam?","Guida italiana, autista e assistenza","/it/hue-da-da-nang"],6],
  ["/it/itinerario-vietnam-centrale",["Vietnam centrale in 7 giorni","Giorno 3: foresta di cocco e Hoi An","Cosa vedere in Vietnam in 7 giorni?","/it/foresta-di-cocco-hoi-an"],6],
  ["/it/foresta-di-cocco-hoi-an",["Foresta di cocco Hoi An","Dove si trova la foresta di cocco di Hoi An?","Basket boat: si può evitare","/it/hoi-an-in-un-giorno"],6],
  ["/it/tour-3-isole-phu-quoc",["820.000 VND","John’s Tours","Quanto costa il tour 3 isole"],4],
  ["/it/tour-4-isole-hon-thom",["1.700.000 VND","CABLE CAR TRIP","La funivia di Hon Thom"],4]
 ];
 for(const [path,needles,faqCount] of pages){
  const r=await fetch(origin+path,{signal:AbortSignal.timeout(30000)});assert.equal(r.status,200,"Italian page unreachable "+path);
  const html=await r.text();
  for(const q of needles)assert.ok(html.includes(q),"Missing Italian SEO content at "+path+": "+q);
  assert.ok(html.includes('href="https://www.govietstay.com'+path+'"'),"Canonical not self-referential "+path);
  const scripts=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>{try{return JSON.parse(m[1]);}catch{return null;}}).filter(Boolean);
  const faq=scripts.flatMap(x=>x["@graph"]??[x]).find(x=>x["@type"]==="FAQPage");
  assert.ok(faq&&faq.mainEntity.length>=faqCount,"Missing visible-aligned FAQ schema at "+path);
 }
 const xml=await(await fetch(origin+"/sitemap.xml")).text();
 for(const slug of ["guida-in-italiano-vietnam-centrale","itinerario-vietnam-centrale","foresta-di-cocco-hoi-an","tour-3-isole-phu-quoc","tour-4-isole-hon-thom"]){
  const i=xml.indexOf("<loc>https://www.govietstay.com/it/"+slug+"</loc>");
  assert.ok(i>=0&&xml.slice(i,i+210).includes("2026-09-28"),"Updated Italian sitemap date missing "+slug);
 }
 console.log("PASS: five Italian landings render specific visible answers, source-backed tour prices, valid FAQ schema, internal links, canonical and fresh sitemap.");
}catch(e){console.error(e);console.error(stderr);process.exitCode=1;}
finally{try{if(child.pid)process.kill(-child.pid,"SIGTERM");}catch{child.kill("SIGTERM");}child.stdout.destroy();child.stderr.destroy();}
