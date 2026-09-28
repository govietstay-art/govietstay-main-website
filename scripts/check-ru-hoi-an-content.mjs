import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
const src=await readFile("lib/russian-seo-landings.ts","utf8");
const block=src.slice(src.indexOf('slug: "hoi-an"'),src.indexOf('slug: "hue"',src.indexOf('slug: "hoi-an"')));
assert.ok(block.includes("Сколько стоит прогулка по Кокосовому лесу"),"Missing source-backed visitor cost question");
assert.ok(block.includes("хойан что посмотреть за 1 день"),"Missing actual Google query phrase");
const origin="http://127.0.0.1:3996";
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--port","3996"],{detached:true,stdio:["ignore","pipe","pipe"],env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"}});
let log="";server.stderr.on("data",d=>log=(log+d).slice(-2200));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
try{
 let ready=false;
 for(let i=0;i<70;i++){if(server.exitCode!==null)throw Error("Server exited "+log);try{let r=await fetch(origin+"/ru/hoi-an",{signal:AbortSignal.timeout(2300)});if(r.ok){ready=true;break;}}catch{}await sleep(500);}
 assert.ok(ready,"Server not ready: "+log);
 let r=await fetch(origin+"/ru/hoi-an",{signal:AbortSignal.timeout(30000)});assert.equal(r.status,200);
 const html=await r.text();
 for(const phrase of ["Что посмотреть в Хойане за один день","Сколько стоит прогулка по Кокосовому лесу","Можно ли заказать экскурсию из Дананга в Хойан с русскоговорящим гидом?","Кокосовый лес","FAQPage"])assert.ok(html.includes(phrase),"Missing visible or structured Hoi An content: "+phrase);
 for(const path of ["/ru/tours/hoi-an-coconut-forest","/ru/aktualno/hoi-an-two-experiences"]){let r=await fetch(origin+path,{signal:AbortSignal.timeout(30000)});assert.equal(r.status,200,"Related URL failed "+path);}
 assert.ok(html.includes("https://wa.me/"),"WhatsApp CTA missing");
 console.log("PASS: RU Hoi An landing answers real Google/Yandex visitor questions, includes optional 1-day route and valid tour/coconut links, preserves visible/schema FAQ and WA.");
}catch(error){console.error(error);console.error(log);process.exitCode=1;}finally{try{if(server.pid)process.kill(-server.pid,"SIGTERM");}catch{server.kill("SIGTERM");}server.stdout.destroy();server.stderr.destroy();}
