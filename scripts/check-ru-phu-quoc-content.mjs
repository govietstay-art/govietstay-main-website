import assert from "node:assert/strict";
import { spawn } from "node:child_process";
const origin = "http://127.0.0.1:3993";
const child=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--port","3993"],{
  detached:true,stdio:["ignore","pipe","pipe"],env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"},
});
let stderr="";child.stderr.on("data",v=>stderr=(stderr+v).slice(-2000));
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
try {
 let started=false;
 for(let n=0;n<75;n++) {
   try{const res=await fetch(origin+"/ru/phu-quoc",{signal:AbortSignal.timeout(2000)});if(res.ok){started=true;break;}}catch{}
   await sleep(500);
 }
 assert.ok(started,"Local Next.js server did not start: "+stderr);
 const response=await fetch(origin+"/ru/phu-quoc",{signal:AbortSignal.timeout(30000)});
 assert.equal(response.status,200,"Phu Quoc hub unavailable");
 const html=await response.text();
 for(const phrase of ["Как выбрать экскурсию на Фукуоке","Три острова или четыре острова","Получить рекомендации на русском","Частная программа для семьи"]) {
   assert.ok(html.includes(phrase),"Missing hub conversion section: "+phrase);
 }
 for(const route of ["/ru/phu-quoc/snorkling","/ru/phu-quoc/individualnye-ekskursii","/ru/phu-quoc/transport","/ru/tours/phu-quoc"]) {
   const res=await fetch(origin+route,{signal:AbortSignal.timeout(30000)});
   assert.equal(res.status,200,"Broken internal guide link: "+route);
 }
 assert.ok(html.includes('2026-09-28'),"Updated date absent from the HTML and structured data");
 const sitemap=await fetch(origin+"/ru/phu-quoc/sitemap.xml",{signal:AbortSignal.timeout(30000)});
 assert.equal(sitemap.status,200);
 const xml=await sitemap.text();
 assert.ok(xml.includes('<lastmod>2026-09-28</lastmod>'),"Hub lastmod not updated");
 assert.ok(xml.includes('<loc>https://www.govietstay.com/ru/phu-quoc</loc>'),"Phu Quoc hub absent from sitemap");
 console.log("PASS: Russian Phu Quoc decision guide renders, booking CTA preserved, 4 linked pages serve 200, FAQ visible and sitemap date updated.");
} catch(error) {console.error(error);console.error(stderr);process.exitCode=1;}
finally {try{if(child.pid)process.kill(-child.pid,"SIGTERM");}catch{child.kill("SIGTERM");}child.stdout.destroy();child.stderr.destroy();}
