import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { stat } from "node:fs/promises";

const origin="http://127.0.0.1:3992";
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--port","3992"],{
  env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"}, stdio:["ignore","pipe","pipe"], detached:true,
});
let output="";
for(const stream of [server.stdout,server.stderr])stream.on("data",x=>{output=(output+x.toString()).slice(-3000);});
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function request(p){const r=await fetch(origin+p,{signal:AbortSignal.timeout(30000)});return{status:r.status,body:await r.text(),headers:r.headers};}
async function wait(){
 for(let i=0;i<70;i++){
  if(server.exitCode!==null)throw Error("Next exited: "+output);
  try{const x=await fetch(origin+"/",{signal:AbortSignal.timeout(1500)});if(x.ok)return;}catch{}
  await sleep(500);
 }
 throw Error("Next not ready: "+output);
}
try{
 await wait();
 const png=await stat("public/hero-hoian-new.png");
 const webp=await stat("public/ar-assets/hero-hoian.webp");
 assert.ok(webp.size<png.size/8,"Optimized WebP is not substantially smaller than old PNG");
 for (const p of ["/","/ru"]){
   const r=await request(p);
   assert.equal(r.status,200,p+": page unavailable");
   const preloads=(r.body.match(/<link[^>]+(?:rel="preload"|rel='preload')[^>]*>/gi)||[])
     .filter(tag=>/(?:imagesrcset|as="image")/.test(tag));
   const heroPreloads=preloads.filter(tag=>tag.includes("hero-hoian.webp"));
   assert.equal(heroPreloads.length,1,p+": expected one optimized hero image preload, got "+JSON.stringify(preloads));
   assert.ok(!preloads.some(tag=>tag.includes("hero-hoian-new.png")),p+": heavy PNG still preloaded");
   assert.ok(r.body.includes('sizes="100vw"'),p+": responsive hero sizes missing");
   assert.ok(!r.body.includes("/govietstay-partner-portal-v2.js"),p+": partner-only JS loaded on homepage");
   assert.ok(r.body.includes("/govietstay-partner-tracking.js"),p+": WhatsApp attribution missing");
   assert.ok(r.body.includes("GTM-WRPCZ9X3"),p+": GTM missing");
 }
 const portal=await request("/partner");
 assert.equal(portal.status,200,"Partner page failed");
 assert.ok(portal.body.includes("/govietstay-partner-portal-v2.js"),"Partner portal bundle missing from partner page");
 const image=await fetch(origin+"/ar-assets/hero-hoian.webp",{signal:AbortSignal.timeout(10000)});
 assert.equal(image.status,200,"Optimized hero is missing");
 assert.ok(image.headers.get("content-type")?.includes("image/webp"),"Wrong image MIME type");
 assert.ok(image.headers.get("cache-control")?.includes("max-age=604800"),"Browser caching missing");
 console.log("PASS: EN/RU hero preload, responsive image, partner isolation, GTM/WA and cache. Source bytes: "+png.size+" -> "+webp.size);
}catch(e){console.error(e);console.error("Server tail: "+output);process.exitCode=1;}finally{
 try{if(server.pid)process.kill(-server.pid,"SIGTERM");}catch{server.kill("SIGTERM");}
 server.stdout.destroy();server.stderr.destroy();
}
