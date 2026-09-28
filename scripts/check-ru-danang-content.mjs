import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {readFile} from "node:fs/promises";

const landingSrc=await readFile("lib/russian-seo-landings.ts","utf8");
const danang=landingSrc.slice(landingSrc.indexOf('slug: "danang"'),landingSrc.indexOf('slug: "hoi-an"'));
assert.ok(danang.includes('weatherScenarios: ['),"Weather scenario data is missing");
assert.ok(danang.includes("что делать в дананге в дождь"),"Observed Yandex intent missing");
const origin="http://127.0.0.1:3997";
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--port","3997"],{
 detached:true,stdio:["ignore","pipe","pipe"],env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"}
});
let log="";server.stderr.on("data",d=>log=(log+d.toString()).slice(-1800));
const sleep=n=>new Promise(r=>setTimeout(r,n));
try{
 let ready=false;
 for(let i=0;i<75;i++){
  if(server.exitCode!==null)throw Error("Next.js failed: "+log);
  try{const r=await fetch(origin+"/ru/danang",{signal:AbortSignal.timeout(2500)});if(r.ok){ready=true;break;}}catch{}
  await sleep(500);
 }
 assert.ok(ready,"Preview not ready: "+log);
 const r=await fetch(origin+"/ru/danang",{signal:AbortSignal.timeout(30000)});
 assert.equal(r.status,200);
 const h=await r.text();
 const phrases=[
  "Экскурсии в Дананге на русском: маршруты и план на дождь",
  "Дананг в дождь: три сценария на день",
  "Куда сходить в Дананге в дождь",
  "Стоит ли ехать на Бана Хиллс, если завтра обещают дождь?",
  "Работает ли канатная дорога Бана Хиллс во время дождя?",
  "Можно ли перенести экскурсию из Дананга из-за ливня?",
  "Что делать в Дананге в дождь?",
  "FAQPage",
  "partner-assets/hero-danang-pavel-standard.jpg",
  "wa.me/84937762607",
 ];
 for(const phrase of phrases)assert.ok(h.includes(phrase),"Da Nang landing lost content: "+phrase);
 assert.ok(h.includes('href="https://www.govietstay.com/ru/danang"'),"Canonical missing");
 for(const p of ["/ru/tours/ba-na-hills","/ru/aktualno/bana-hills-in-rain","/ru/tours/hoi-an-coconut-forest","/ru/hue"]){
  const v=await fetch(origin+p,{signal:AbortSignal.timeout(30000)});
  assert.equal(v.status,200,"Internal tour/guide link broken: "+p);
 }
 const schema=[...h.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
   .map(m=>{try{return JSON.parse(m[1]);}catch{return null;}}).filter(Boolean);
 const faq=schema.flatMap(x=>x["@graph"]??[x]).find(x=>x["@type"]==="FAQPage");
 assert.ok(faq&&faq.mainEntity.length>=9,"Expected 9+ FAQ answers in JSON-LD");
 assert.ok(faq.mainEntity.some(x=>x.name==="Что делать в Дананге в дождь?"),"Yandex question is not in FAQ schema");
 const sitemap=await fetch(origin+"/sitemap.xml",{signal:AbortSignal.timeout(30000)});
 assert.equal(sitemap.status,200);
 const xml=await sitemap.text();
 assert.match(xml,/<loc>https:\/\/www\.govietstay\.com\/ru\/danang<\/loc>[\s\S]{0,500}<lastmod>2026-09-28<\/lastmod>/);
 console.log("PASS: RU Da Nang weather decisions, actual search questions, FAQ schema, 4 internal routes, optimized hero, canonical and selective sitemap date.");
}catch(error){console.error(error);console.error(log);process.exitCode=1;}
finally{try{if(server.pid)process.kill(-server.pid,"SIGTERM");}catch{server.kill("SIGTERM");}server.stdout.destroy();server.stderr.destroy();}
