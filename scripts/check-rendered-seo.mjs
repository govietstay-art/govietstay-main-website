import assert from "node:assert/strict";
import {spawn} from "node:child_process";
const port=3987,origin=`http://127.0.0.1:${port}`;
const server=spawn("npm",["run","start","--","--port",String(port)],{
  env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"},
  stdio:["ignore","pipe","pipe"],
});
let output="";
server.stdout.on("data",chunk=>{output+=chunk.toString();});
server.stderr.on("data",chunk=>{output+=chunk.toString();});
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function ready(){
  for(let attempt=0;attempt<60;attempt++){
    if(server.exitCode!==null)throw new Error("Next server exited: "+output.slice(-2000));
    try{const response=await fetch(origin+"/",{signal:AbortSignal.timeout(2500)});
      if(response.status===200)return;
    }catch{}
    await sleep(500);
  }
  throw new Error("Next server not ready: "+output.slice(-2500));
}
async function check(path,lang,dir){
 const response=await fetch(origin+path,{headers:{accept:"text/html"},signal:AbortSignal.timeout(20000)});
 assert.equal(response.status,200,`${path}: HTTP ${response.status}`);
 const html=await response.text();
 const tag=html.match(/<html\b[^>]*>/i)?.[0]||"";
 assert.ok(tag.includes(`lang="${lang}"`),`${path}: expected lang=${lang}, got ${tag}`);
 assert.ok(tag.includes(`dir="${dir}"`),`${path}: expected dir=${dir}, got ${tag}`);
 return html;
}
try{
 await ready();
 const routes=[
  ["/","en","ltr"],["/ru","ru","ltr"],["/it","it","ltr"],
  ["/il","he-IL","rtl"],["/ar","ar","rtl"],
  ["/cn","zh-CN","ltr"],["/tw","zh-TW","ltr"],["/ko","ko-KR","ltr"],
  ["/kz","ru-KZ","ltr"],["/fr","fr-FR","ltr"],["/de","de-DE","ltr"],
  ["/tr","tr-TR","ltr"],["/ph","en-PH","ltr"],["/in","en-IN","ltr"],
  ["/mn","mn","ltr"],["/go/threads","ru","ltr"],
 ];
 const html=await Promise.all(routes.map(([path,lang,dir])=>check(path,lang,dir)));
 for(const [path,canonical] of [["/","https://www.govietstay.com"],["/ru","https://www.govietstay.com/ru"],["/it","https://www.govietstay.com/it"]]){
  const source=html[routes.findIndex(row=>row[0]===path)];
  assert.ok(source.includes(`href="${canonical}"`),`${path}: canonical missing`);
 }
 const sitemap=await fetch(origin+"/sitemap.xml",{signal:AbortSignal.timeout(20000)});
 assert.equal(sitemap.status,200,"sitemap.xml inaccessible");
 const xml=await sitemap.text();
 for(const slug of ["/local-food","/group-deals","/ru/group-deals","/ru/cruise-port-shore-excursions"]){
  assert.ok(xml.includes(`https://www.govietstay.com${slug}`),`sitemap missing ${slug}`);
 }
 const food=await check("/local-food","en","ltr");
 assert.ok(food.includes("og:image"),"Local food social preview is missing");
 console.log(`PASS: ${routes.length} server-rendered locale routes, canonical, sitemap and local food OG.`);
}catch(error){console.error(error);console.error("Server tail: "+output.slice(-2000));process.exitCode=1;
}finally{server.kill("SIGTERM");}
