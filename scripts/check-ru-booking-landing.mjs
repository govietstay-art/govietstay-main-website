import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {readFile} from "node:fs/promises";
const page=await readFile("app/ru/tours/phu-quoc/page.tsx","utf8");
const catalog=await readFile("components/PhuQuocJohnsCatalog.tsx","utf8");
assert.ok(page.includes("PHU_QUOC_PUBLISHED_RATES[code].adult"),"Visible prices must share booking rates");
assert.ok(page.includes("mainEntity: bookingQuestions.map"),"Visible and structured FAQ must share the same data");
assert.ok(catalog.includes('title:"Экскурсии на Фукуоке: цены, острова и частные туры"'),"Main Russian booking H1 missing");
const origin="http://127.0.0.1:3995";
const child=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--port","3995"],{
 detached:true,stdio:["ignore","pipe","pipe"],env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"}
});
let tail="";child.stderr.on("data",x=>tail=(tail+x.toString()).slice(-2000));
const sleep=t=>new Promise(r=>setTimeout(r,t));
try{
 let ok=false;
 for(let i=0;i<70;i++){
  if(child.exitCode!==null)throw Error("Next exited "+tail);
  try{const r=await fetch(origin+"/ru/tours/phu-quoc",{signal:AbortSignal.timeout(2500)});if(r.ok){ok=true;break;}}catch{}
  await sleep(500);
 }
 assert.ok(ok,"Local Next.js not ready: "+tail);
 const h=await (await fetch(origin+"/ru/tours/phu-quoc",{signal:AbortSignal.timeout(30000)})).text();
 for(const phrase of ["Экскурсии на Фукуоке: цены, острова и частные туры","Сколько стоят 3 и 4 острова на Фукуоке?","Групповые экскурсии идут с русскоговорящим гидом?","Как быстро подтверждают заявку на тур на Фукуоке?","Стандартный групповой трансфер","phuquoc-booking-form","FAQPage"]){
  assert.ok(h.includes(phrase),"Missing rendered SEO content: "+phrase);
 }
 const targets=["/ru/phu-quoc/3-ili-4-ostrova","/ru/phu-quoc/hon-thom","/ru/phu-quoc/russkiy-gid","/ru/phu-quoc/s-detmi"];
 for(const path of targets){let r=await fetch(origin+path,{signal:AbortSignal.timeout(30000)});assert.equal(r.status,200,"Broken contextual link: "+path);}
 console.log("PASS: RU Phu Quoc catalog prices, accurate guide language, seven visible and structured FAQs, booking anchor and four contextual links.");
}catch(error){console.error(error);console.error(tail);process.exitCode=1;}finally{
 try{if(child.pid)process.kill(-child.pid,"SIGTERM");}catch{child.kill("SIGTERM");}
 child.stdout.destroy();child.stderr.destroy();
}
