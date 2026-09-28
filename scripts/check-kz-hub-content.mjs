import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {readFile} from "node:fs/promises";
const source=await readFile("lib/kazakhstanSeoPages.ts","utf8");
const block=source.slice(source.indexOf('"slug": "vietnam-from-kazakhstan"'),source.indexOf('"slug": "danang-from-almaty"'));
for(const text of ["Вьетнам из Казахстана: что проверить до вылета","Куда из Казахстана поехать: Дананг или Фукуок?","90 дней за 180 дней"]) assert.ok(block.includes(text),"Country guide missing "+text);
const prices=await readFile("lib/kazakhstanPrices.ts","utf8");
const ru=await readFile("lib/tour-landing-data.ts","utf8");
for(const phrase of ['fmt(baNa.adultPrice)', 'fmt(cham.adultPrice)', 'fmt(PHU_QUOC_PUBLISHED_RATES["TRIP 3"].adult)', 'fmt(PHU_QUOC_PUBLISHED_RATES["CABLE CAR TRIP"].adult)'])
 assert.ok(prices.includes(phrase),"KZ price must derive from verified shared source: "+phrase);
const origin="http://127.0.0.1:4004";
const child=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--port","4004"],{detached:true,stdio:["ignore","pipe","pipe"],env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"}});
let log="";child.stderr.on("data",x=>log=(log+x.toString()).slice(-1400));const sleep=n=>new Promise(r=>setTimeout(r,n));
try{
 let ready=false;
 for(let i=0;i<75;i++){if(child.exitCode!==null)throw Error("Next exited: "+log);try{let r=await fetch(origin+"/kz",{signal:AbortSignal.timeout(2400)});if(r.ok){ready=true;break;}}catch{}await sleep(500);}
 assert.ok(ready,"KZ hub not ready: "+log);
 for(const [url,phrases] of [["/kz",["Вьетнам из Казахстана: ответы перед бронированием","Нужна ли виза казахстанцам?","Дананг или Фукуок?","FAQPage"]],["/kz/vietnam-from-kazakhstan",["Вьетнам из Казахстана: что проверить до вылета","Какие услуги можно заказать отдельно","Куда из Казахстана поехать: Дананг или Фукуок?","FAQPage"]]]){
  const r=await fetch(origin+url,{signal:AbortSignal.timeout(30000)});assert.equal(r.status,200,"Route failed "+url);const html=await r.text();
  for(const p of phrases)assert.ok(html.includes(p),"Missing "+p+" from "+url);
  assert.ok(html.includes('href="https://www.govietstay.com'+url+'"'),"Missing canonical "+url);
 }
 const xml=await (await fetch(origin+"/sitemap.xml")).text();
 for(const u of ["/kz","/kz/vietnam-from-kazakhstan"]){const n="<loc>https://www.govietstay.com"+u+"</loc>",i=xml.indexOf(n);assert.ok(i>=0&&xml.slice(i,i+220).includes("<lastmod>2026-09-28"),"Missing selective sitemap date "+u);}
 console.log("PASS: KZ homepage and country guide rendered, intent-specific FAQs, two verified existing base rates and current sitemap dates.");
}catch(e){console.error(e);console.error(log);process.exitCode=1;}finally{try{if(child.pid)process.kill(-child.pid,"SIGTERM");}catch{child.kill("SIGTERM");}child.stdout.destroy();child.stderr.destroy();}
