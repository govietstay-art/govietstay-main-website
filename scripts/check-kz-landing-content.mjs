import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {readFile} from "node:fs/promises";
const source=await readFile("lib/kazakhstanSeoPages.ts","utf8");
for(const phrase of ["Нужна ли виза во Вьетнам для казахстанцев в 2026 году?","Как заказать трансфер из аэропорта Дананга после рейса из Алматы?","Есть ли прямой рейс Астана — Дананг?","vnembassy-astana.mofa.gov.vn","https://evisa.gov.vn/"])
 assert.ok(source.includes(phrase),"Missing Kazakhstan search answer/source: "+phrase);
const origin="http://127.0.0.1:4003";
const p=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--port","4003"],{detached:true,stdio:["ignore","pipe","pipe"],env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"}});
let err="";p.stderr.on("data",x=>err=(err+x.toString()).slice(-1600));
const sleep=n=>new Promise(r=>setTimeout(r,n));
try{
 let up=false;
 for(let i=0;i<75;i++){if(p.exitCode!==null)throw Error("Server exited: "+err);try{let r=await fetch(origin+"/kz/vietnam-visa-free-kazakhstan",{signal:AbortSignal.timeout(2200)});if(r.ok){up=true;break;}}catch{}await sleep(500);}
 assert.ok(up,"KZ preview not ready: "+err);
 for(const [route,phrases,minFaq] of [
  ["/kz/vietnam-visa-free-kazakhstan",["Нужна ли казахстанцам виза во Вьетнам?","90 дней в течение 180","evisa.gov.vn","FAQPage"],6],
  ["/kz/danang-from-almaty",["Из Алматы в Дананг","Как заказать трансфер из аэропорта Дананга","FAQPage"],4],
  ["/kz/danang-from-astana",["Из Астаны в Дананг","Есть ли прямой рейс Астана","FAQPage"],3]
 ]){
  let r=await fetch(origin+route,{signal:AbortSignal.timeout(30000)});assert.equal(r.status,200,"Route failed: "+route);
  let html=await r.text();
  for(const phrase of phrases)assert.ok(html.includes(phrase),"Missing "+phrase+" at "+route);
  assert.ok(html.includes('href="https://www.govietstay.com'+route+'"'),"Missing canonical: "+route);
  let scripts=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>{try{return JSON.parse(m[1]);}catch{return null;}}).filter(Boolean);
  const faq=scripts.flatMap(x=>x["@graph"]??[x]).find(x=>x["@type"]==="FAQPage");
  assert.ok(faq && faq.mainEntity.length>=minFaq,"Missing source-aligned FAQ JSON-LD: "+route);
 }
 let sitemap=await (await fetch(origin+"/sitemap.xml")).text();
 for(const slug of ["vietnam-visa-free-kazakhstan","danang-from-almaty","danang-from-astana"]){
  let i=sitemap.indexOf("<loc>https://www.govietstay.com/kz/"+slug+"</loc>");
  assert.ok(i>=0&&sitemap.slice(i,i+230).includes("<lastmod>2026-09-28"),"Sitemap date missing "+slug);
 }
 console.log("PASS: 3 KZ pages with relevant answers, official visa sources, visible + JSON-LD FAQs, canonical URLs and updated sitemap.");
}catch(e){console.error(e);console.error(err);process.exitCode=1;}
finally{try{if(p.pid)process.kill(-p.pid,"SIGTERM");}catch{p.kill("SIGTERM");}p.stdout.destroy();p.stderr.destroy();}
