import assert from "node:assert/strict";
import {spawn} from "node:child_process";
const port=3987,origin=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--port",String(port)],{
  env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"},
  stdio:["ignore","pipe","pipe"],
  detached:true,
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
 const validPairs=[["/de/da-nang","/travel/da-nang-travel-guide"],["/de/phu-quoc/beste-reisezeit","/travel/best-time-to-visit-phu-quoc"],["/de/phu-quoc/3-oder-4-inseln","/travel/phu-quoc-3-islands-vs-4-islands"],["/de/phu-quoc/mit-kindern","/travel/phu-quoc-with-family"],["/de/phu-quoc/wo-uebernachten","/travel/where-to-stay-phu-quoc"]];
 for (const [german,english] of validPairs) {
   const [deHtml,enHtml]=await Promise.all([check(german,"de-DE","ltr"),check(english,"en","ltr")]);
   for (const [p,s] of [[german,deHtml],[english,enHtml]]) {
     for (const [code,target] of [["de-DE",german],["en",english]]) {
       assert.ok(s.includes('hrefLang="'+code+'" href="https://www.govietstay.com'+target+'"'),p+": missing reciprocal "+code+" -> "+target);
     }
   }
 }
 const food=await check("/local-food","en","ltr");
 assert.ok(food.includes("og:image"),"Local food social preview is missing");
 for (const path of ["/ar","/cn","/tr","/ph","/mn","/il"]) {
   const source=html[routes.findIndex(row=>row[0]===path)];
   assert.ok(source.includes('rel="canonical" href="https://www.govietstay.com'+path+'"'),path+": missing self canonical");
   assert.ok(source.includes('property="og:image"'),path+": missing share image");
 }
 for (const slug of ["/ar","/ar/halal-travel-vietnam","/ar/vietnam-family-private-tour","/ar/phu-quoc-tours"]) {
   assert.ok(xml.includes('https://www.govietstay.com'+slug+"</loc>"),"Sitemap missing Arabic route "+slug);
 }
 for (const [path,otherLang] of [["/cn","zh-TW"],["/ko","ru"],["/tr","en"],["/ph","en"]]) {
   const source=html[routes.findIndex(row=>row[0]===path)];
   assert.ok(!source.includes('hrefLang="'+otherLang+'"'),path+": nonreciprocal "+otherLang+" alternate still declared");
 }
 console.log(`PASS: ${routes.length} server-rendered locale routes, canonical, sitemap and local food OG.`);
}catch(error){console.error(error);console.error("Server tail: "+output.slice(-2000));process.exitCode=1;
}finally{
  // Kill the whole process group so detached Next workers cannot keep CI alive.
  try{if(server.pid)process.kill(-server.pid,"SIGTERM");}catch{server.kill("SIGTERM");}
  server.stdout.destroy();server.stderr.destroy();
}
