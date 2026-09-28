import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {readFile} from "node:fs/promises";
const source=await readFile("lib/italySeoPages.ts","utf8");
for(const phrase of ["Vietnam centrale: cosa vedere in 5–7 giorni?","Cosa vedere a Da Nang fai da te?","Cosa vedere a Phu Quoc fai da te?","Quanto costa un tour privato da Da Nang?"])
 assert.ok(source.includes(phrase),"Missing answer in IT data: "+phrase);
const origin="http://127.0.0.1:4006";
const child=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--port","4006"],{detached:true,stdio:["ignore","pipe","pipe"],env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"}});
let stderr="";child.stderr.on("data",x=>stderr=(stderr+x.toString()).slice(-1700));
const sleep=n=>new Promise(resolve=>setTimeout(resolve,n));
try{
 let ready=false;
 for(let i=0;i<75;i++){if(child.exitCode!==null)throw Error("Next exited: "+stderr);try{const r=await fetch(origin+"/it/da-nang-fai-da-te",{signal:AbortSignal.timeout(2300)});if(r.ok){ready=true;break;}}catch{}await sleep(500);}
 assert.ok(ready,"IT preview not ready: "+stderr);
 const pages=[
  ["/it/vietnam-centrale-fai-da-te",["Vietnam centrale fai da te: cosa vedere","Hue e passo Hai Van","Vietnam centrale: cosa vedere in 5–7 giorni?","/it/itinerario-vietnam-centrale"]],
  ["/it/da-nang-fai-da-te",["Da Nang fai da te: mare","Dove dormire a Da Nang","Cosa vedere a Da Nang fai da te?","/it/transfer-aeroporto-da-nang"]],
  ["/it/phu-quoc-fai-da-te",["Phu Quoc fai da te: dove dormire","Nord di Phu Quoc","Cosa vedere a Phu Quoc fai da te?","/it/tour-3-isole-phu-quoc"]],
  ["/it/tour-privato-da-nang",["Tour privato a Da Nang: itinerari","Hue privata da Da Nang","Quanto costa un tour privato da Da Nang?","/it/guida-in-italiano-vietnam-centrale"]]
 ];
 for(const [path,phrases] of pages){
  const response=await fetch(origin+path,{signal:AbortSignal.timeout(30000)});
  assert.equal(response.status,200,"Route unavailable: "+path);
  const html=await response.text();
  for(const phrase of phrases)assert.ok(html.includes(phrase),"Missing IT rendered content at "+path+": "+phrase);
  assert.ok(html.includes('href="https://www.govietstay.com'+path+'"'),"Bad canonical: "+path);
  const scripts=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>{try{return JSON.parse(m[1]);}catch{return null;}}).filter(Boolean);
  const faq=scripts.flatMap(x=>x["@graph"]??[x]).find(x=>x["@type"]==="FAQPage");
  assert.ok(faq&&faq.mainEntity.length===6,"FAQ schema not aligned to six visible answers: "+path);
 }
 for(const path of ["/it/itinerario-vietnam-centrale","/it/transfer-aeroporto-da-nang","/it/tour-3-isole-phu-quoc","/it/guida-in-italiano-vietnam-centrale"]){
  const r=await fetch(origin+path,{signal:AbortSignal.timeout(30000)});assert.equal(r.status,200,"Broken related link "+path);
 }
 const xml=await(await fetch(origin+"/sitemap.xml")).text();
 for(const [path] of pages){let i=xml.indexOf("<loc>https://www.govietstay.com"+path+"</loc>");assert.ok(i>=0&&xml.slice(i,i+500).includes("<lastmod>2026-09-28"),"Missing updated sitemap entry "+path);}
 console.log("PASS: four Italian DIY/private landings, 24 visible/schema FAQs, related routes, canonicals and selective sitemap updates.");
}catch(e){console.error(e);console.error(stderr);process.exitCode=1;}
finally{try{if(child.pid)process.kill(-child.pid,"SIGTERM");}catch{child.kill("SIGTERM");}child.stdout.destroy();child.stderr.destroy();}
