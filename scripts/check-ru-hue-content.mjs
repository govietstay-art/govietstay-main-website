import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";

const src = await readFile("lib/russian-seo-landings.ts", "utf8");
const start = src.indexOf('"slug": "hue"');
const end = src.indexOf('slug: "transfer-danang"', start);
assert.ok(start > 0 && end > start, "RU Hue source block missing");
const block = src.slice(start, end);
for (const phrase of [
  "экскурсия в хюэ из дананга",
  "из дананга в хюэ как добраться",
  "перевал Хайван",
  "Русскоговорящий",
]) assert.ok(block.toLowerCase().includes(phrase.toLowerCase()), "Missing search-intent answer: " + phrase);

const origin = "http://127.0.0.1:3998";
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--port", "3998"], {
  detached: true, stdio: ["ignore", "pipe", "pipe"],
  env: {...process.env, NEXT_TELEMETRY_DISABLED: "1"},
});
let stderr = "";
server.stderr.on("data", chunk => stderr = (stderr + chunk.toString()).slice(-1800));
const sleep = n => new Promise(resolve => setTimeout(resolve, n));
try {
  let ready = false;
  for (let n=0; n<75; n++) {
    if (server.exitCode !== null) throw Error("Next.js exited: " + stderr);
    try { const r=await fetch(origin+"/ru/hue", {signal: AbortSignal.timeout(2500)}); if(r.ok){ready=true;break;} } catch {}
    await sleep(500);
  }
  assert.ok(ready, "RU Hue preview did not start: "+stderr);
  const r=await fetch(origin+"/ru/hue", {signal:AbortSignal.timeout(30000)});
  assert.equal(r.status,200);
  const html=await r.text();
  for(const phrase of [
    "Экскурсия из Дананга в Хюэ на один день",
    "Из Дананга в Хюэ: как добраться",
    "Перевал Хайван или тоннель",
    "Сколько стоит частная экскурсия в Хюэ из Дананга?",
    "Есть ли экскурсия в Хюэ с русскоговорящим гидом?",
    "https://wa.me/",
    "FAQPage",
  ]) assert.ok(html.includes(phrase), "Missing RU Hue visible/schema/CTA: "+phrase);
  assert.ok(html.includes('href="https://www.govietstay.com/ru/hue"'), "Canonical missing");
  for(const p of ["/ru/danang", "/ru/transfer-danang", "/ru/hoi-an", "/ru/aktualno/russian-or-english-guide"]) {
    const x=await fetch(origin+p,{signal:AbortSignal.timeout(30000)});
    assert.equal(x.status,200,"Broken linked route: "+p);
  }
  const scripts=[...html.matchAll(/<script[^>]*type="application\\/ld\\+json"[^>]*>([\\s\\S]*?)<\\/script>/gi)]
    .map(x=>{try{return JSON.parse(x[1]);}catch{return null;}}).filter(Boolean);
  const faq=scripts.flatMap(x=>x["@graph"]??[x]).find(x=>x["@type"]==="FAQPage");
  assert.ok(faq && faq.mainEntity.length>=8,"Expected 8 visible-aligned FAQ entities");
  assert.ok(faq.mainEntity.some(x=>x.name==="Как добраться из Дананга в Хюэ самостоятельно?"),"Search-intent FAQ missing from JSON-LD");
  const map=await fetch(origin+"/sitemap.xml",{signal:AbortSignal.timeout(30000)});
  assert.equal(map.status,200);
  assert.match(await map.text(),/<loc>https:\\/\\/www\\.govietstay\\.com\\/ru\\/hue<\\/loc>[\\s\\S]{0,500}<lastmod>2026-09-28/);
  console.log("PASS: RU Hue rendered answers, 8 FAQ schema items, canonical, WhatsApp, 4 linked pages and selective sitemap date.");
} catch(error) {console.error(error);console.error(stderr);process.exitCode=1;}
finally {try{if(server.pid)process.kill(-server.pid,"SIGTERM");}catch{server.kill("SIGTERM");}server.stdout.destroy();server.stderr.destroy();}
