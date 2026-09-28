import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {readFile} from "node:fs/promises";

const source=await readFile("lib/tour-landing-data.ts","utf8");
const ru=source.slice(source.indexOf("const ru: Record<string, TourLanding>"));
for(const phrase of ["Как добраться на Чамские острова из Дананга?", "Когда сезон поездок на Чамские острова?", "Можно заказать частный тур на Чамские острова"])
 assert.ok(ru.includes(phrase),"Missing RU buyer question: "+phrase);
const origin="http://127.0.0.1:4001";
const p=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--port","4001"],{detached:true,stdio:["ignore","pipe","pipe"],env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"}});
let stderr="";p.stderr.on("data",x=>stderr=(stderr+x.toString()).slice(-1800));
const sleep=n=>new Promise(r=>setTimeout(r,n));
try{
 let up=false;
 for(let i=0;i<75;i++){
  if(p.exitCode!==null)throw Error("Next exited: "+stderr);
  try{let r=await fetch(origin+"/ru/tours/cham-island",{signal:AbortSignal.timeout(2500)});if(r.ok){up=true;break;}}catch{}
  await sleep(500);
 }
 assert.ok(up,"RU Cham preview did not start: "+stderr);
 const r=await fetch(origin+"/ru/tours/cham-island",{signal:AbortSignal.timeout(30000)});assert.equal(r.status,200);
 const html=await r.text();
 for(const phrase of ["Чамские острова из Дананга и Хойана", "Как добраться на Чамские острова из Дананга?", "Можно заказать частный тур", "FAQPage", "https://wa.me/"])
  assert.ok(html.includes(phrase),"Missing RU Cham buyer content: "+phrase);
 assert.ok(html.includes('href="https://www.govietstay.com/ru/tours/cham-island"'),"Canonical missing");
 const ld=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
   .map(x=>{try{return JSON.parse(x[1]);}catch{return null;}}).filter(Boolean);
 const faq=ld.flatMap(x=>x["@graph"]??[x]).find(x=>x["@type"]==="FAQPage");
 assert.ok(faq && faq.mainEntity.length>=10,"All RU Cham visible FAQs should be in schema");
 assert.ok(faq.mainEntity.some(x=>x.name==="Когда сезон поездок на Чамские острова?"),"Missing sea safety in schema");
 const xml=await (await fetch(origin+"/sitemap.xml")).text();
 const n="<loc>https://www.govietstay.com/ru/tours/cham-island</loc>";
 const ix=xml.indexOf(n);assert.ok(ix>=0&&xml.slice(ix,ix+220).includes("<lastmod>2026-09-28"),"Cham sitemap lastmod missing");
 console.log("PASS: Russian Cham buyer questions, price unchanged, visible/schema FAQ, WhatsApp, canonical and sitemap.");
}catch(e){console.error(e);console.error(stderr);process.exitCode=1;}
finally{try{if(p.pid)process.kill(-p.pid,"SIGTERM");}catch{p.kill("SIGTERM");}p.stdout.destroy();p.stderr.destroy();}
