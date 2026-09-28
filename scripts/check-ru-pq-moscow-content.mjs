import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {readFile} from "node:fs/promises";

const s=await readFile("lib/russian-phu-quoc-cluster.ts","utf8");
const block=s.slice(s.indexOf('"slug": "from-moscow"'),s.indexOf('"slug": "from-almaty"'));
for(const q of ["москва фукуок прямой рейс", "сколько лететь из москвы до фукуока", "Аэрофлот", "https://t.me/s/aeroflot/1118"]) assert.ok(block.toLowerCase().includes(q.toLowerCase()),"Missing observed/direct source intent: "+q);
const origin="http://127.0.0.1:4002";
const p=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--port","4002"],{detached:true,stdio:["ignore","pipe","pipe"],env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"}});
let stderr="";p.stderr.on("data",x=>stderr=(stderr+x.toString()).slice(-1700));
const sleep=n=>new Promise(r=>setTimeout(r,n));
try{
 let ready=false;
 for(let i=0;i<75;i++){if(p.exitCode!==null)throw Error(stderr);try{const r=await fetch(origin+"/ru/phu-quoc/from-moscow",{signal:AbortSignal.timeout(2400)});if(r.ok){ready=true;break;}}catch{}await sleep(500);}
 assert.ok(ready,"Moscow route not ready: "+stderr);
 const res=await fetch(origin+"/ru/phu-quoc/from-moscow",{signal:AbortSignal.timeout(30000)});assert.equal(res.status,200);
 const h=await res.text();
 for(const q of ["Москва — Фукуок: прямой рейс", "Сколько лететь из Москвы на Фукуок", "Как добраться из аэропорта Фукуок", "Нужна ли россиянам виза", "FAQPage", "https://t.me/s/aeroflot/1118", "/ru/phu-quoc/aeroport-transfer"])
  assert.ok(h.includes(q),"Missing Moscow Q/A/link: "+q);
 assert.ok(h.includes('href="https://www.govietstay.com/ru/phu-quoc/from-moscow"'),"Canonical missing");
 for(const path of ["/ru/phu-quoc/aeroport-transfer","/ru/phu-quoc/chto-posmotret","/ru/visa-vietnam"]){
  const r=await fetch(origin+path,{signal:AbortSignal.timeout(30000)});assert.equal(r.status,200,"Moscow related route broken: "+path);
 }
 const ld=[...h.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>{try{return JSON.parse(m[1]);}catch{return null;}}).filter(Boolean);
 const faq=ld.flatMap(x=>x["@graph"]??[x]).find(x=>x["@type"]==="FAQPage");
 assert.ok(faq && faq.mainEntity.length>=8,"Expected eight Moscow FAQ schema answers");
 assert.ok(faq.mainEntity.some(x=>x.name==="Сколько лететь из Москвы на Фукуок прямым рейсом?"),"Duration question missing");
 const xml=await (await fetch(origin+"/ru/phu-quoc/sitemap.xml")).text();
 const i=xml.indexOf("<loc>https://www.govietstay.com/ru/phu-quoc/from-moscow</loc>");
 assert.ok(i>=0&&xml.slice(i,i+220).includes("<lastmod>2026-09-28</lastmod>"),"Moscow sitemap date missing");
 console.log("PASS: RU Moscow flight announcement, buyer questions, 8 FAQ schema items, 3 linked pages, canonical and sitemap.");
}catch(e){console.error(e);console.error(stderr);process.exitCode=1;}
finally{try{if(p.pid)process.kill(-p.pid,"SIGTERM");}catch{p.kill("SIGTERM");}p.stdout.destroy();p.stderr.destroy();}
