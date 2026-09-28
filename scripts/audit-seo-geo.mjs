import {spawn} from "node:child_process";
import {readdir,mkdir,writeFile,appendFile} from "node:fs/promises";
import path from "node:path";

const origin="http://127.0.0.1:3988", base="https://www.govietstay.com";
const knownLocales={
 ru:"ru",kz:"ru-KZ",it:"it",vi:"vi",cn:"zh-CN",tw:"zh-TW",
 ko:"ko-KR",fr:"fr-FR",de:"de-DE",il:"he-IL",ar:"ar",
 tr:"tr-TR",ph:"en-PH",in:"en-IN",mn:"mn",en:"en",
};
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--port","3988"],{
 env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"},stdio:["ignore","pipe","pipe"],detached:true,
});
let serverLog="";
for(const stream of [server.stdout,server.stderr]){
 stream.on("data",chunk=>{serverLog=(serverLog+chunk.toString()).slice(-2500);});
}
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function attr(tag,name){
 const result=tag.match(new RegExp("\\b"+name+"=[\"']([^\"']+)[\"']","i"));
 return result?.[1]??null;
}
function selfPath(value,source="/"){
 try{const u=new URL(value,base+source);return u.origin===base?(u.pathname.replace(/\/+$/,"")||"/"):null;}
 catch{return null;}
}
function expected(pathname){
 const prefix=pathname.split("/").filter(Boolean)[0]??"";
 return knownLocales[prefix]??"en";
}
async function fetchLocal(urlPath){
 const res=await fetch(origin+urlPath,{signal:AbortSignal.timeout(30000)});
 return {status:res.status,body:await res.text()};
}
function htmlFacts(raw,urlPath,status){
 const head=raw.split(/<\/head>/i)[0]||raw.slice(0,150000);
 const htmlTag=raw.match(/<html\b[^>]*>/i)?.[0]??"";
 const linkTags=head.match(/<link\b[^>]*>/gi)??[];
 const metas=head.match(/<meta\b[^>]*>/gi)??[];
 const canonicalTag=linkTags.find(t=>attr(t,"rel")==="canonical");
 const altTags=linkTags.filter(t=>attr(t,"rel")==="alternate"&&attr(t,"hrefLang"));
 const alternates=Object.fromEntries(altTags.map(t=>[attr(t,"hrefLang"),attr(t,"href")]));
 const title=(head.match(/<title>([\s\S]*?)<\/title>/i)?.[1]??"").replaceAll("&amp;","&").replaceAll("&#x27;","'");
 const ogTag=metas.find(t=>attr(t,"property")==="og:image");
 const robots=metas.find(t=>attr(t,"name")==="robots")??"";
 const anchors=raw.match(/<a\b[^>]*>/gi)??[];
 const outbound=[...new Set(anchors.map(t=>selfPath(attr(t,"href")||"",urlPath)).filter(Boolean))];
 const ldjson=[...raw.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].flatMap(m=>{
  try{const obj=JSON.parse(m[1]);return Array.isArray(obj)?obj:[obj];}catch{return[];}
 });
 const nodes=ldjson.flatMap(obj=>obj["@graph"]??[obj]);
 const orgDefs=nodes.filter(node=>node["@id"]===base+"/#organization").length;
 const websiteDefs=nodes.filter(node=>node["@id"]===base+"/#website").length;
 const main=raw.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]??"";
 const plain=main.replace(/<script\b[\s\S]*?<\/script>/gi," ").replace(/<style\b[\s\S]*?<\/style>/gi," ").replace(/<[^>]*>/g," ").replace(/&[^;\s]{1,10};/g," ").replace(/\s+/g," ").trim();
 const locale=attr(htmlTag,"lang")??"";
 const segmenter=new Intl.Segmenter(locale||"en",{granularity:"word"});
 const words=[...segmenter.segment(plain)].filter(x=>x.isWordLike).length;
 return {path:urlPath,status,title,titleLength:[...title].length,lang:locale,expectedLang:expected(urlPath),canonical:selfPath(attr(canonicalTag||"","href")||"",urlPath),
  ogImage:attr(ogTag||"","content"),robotsNoindex:/noindex/i.test(robots),hreflang:alternates,h1:(raw.match(/<h1\b/gi)||[]).length,
  words,outbound,orgDefs,websiteDefs};
}
async function findStatic(dir,segments=[]){
 const files=await readdir(dir,{withFileTypes:true}),out=[];
 for(const f of files){
  if(f.isDirectory()){
   if(!f.name.startsWith("_"))out.push(...await findStatic(path.join(dir,f.name),[...segments,f.name]));
  }else if(/^page\.(tsx|jsx|ts|js)$/.test(f.name)){
   const bits=segments.filter(x=>!x.startsWith("(")&&!x.startsWith("@"));
   if(bits.some(x=>x.startsWith("[")||x==="api"||x==="admin"||x==="pay"||x==="partners"||x==="partner"||x==="go"))continue;
   if(bits.length===0||knownLocales[bits[0]]||["travel","local-food","secret","visa","tours","group-deals","pi-network-vietnam"].includes(bits[0])){
    out.push("/"+bits.join("/"));
   }
  }
 }
 return out;
}
async function run(){
 for(let i=0;i<60;i++){
  if(server.exitCode!==null)throw new Error("Next server stopped: "+serverLog);
  try{const r=await fetch(origin+"/",{signal:AbortSignal.timeout(2500)});if(r.ok)break;}catch{}
  if(i===59)throw new Error("Next server failed to start: "+serverLog);
  await sleep(500);
 }
 const robot=await fetchLocal("/robots.txt");
 const sitemapUrls=[...robot.body.matchAll(/^Sitemap:\s*(https?:\/\/\S+)/gim)].map(m=>selfPath(m[1])).filter(Boolean);
 if(!sitemapUrls.includes("/sitemap.xml"))sitemapUrls.unshift("/sitemap.xml");
 const sitemapMissing=[],sitemapPageCounts={},seen=new Map();
 for(const s of sitemapUrls){
  try{
   const r=await fetchLocal(s);
   if(r.status!==200){sitemapMissing.push({path:s,status:r.status});continue;}
   const urls=[...r.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>selfPath(m[1])).filter(Boolean);
   sitemapPageCounts[s]=urls.length;
   for(const u of urls)seen.set(u,[...(seen.get(u)??[]),s]);
  }catch(e){sitemapMissing.push({path:s,error:String(e)});}
 }
 const staticUrls=await findStatic("app");
 const paths=[...new Set([...seen.keys(),...staticUrls])].sort().slice(0,800);
 const facts=[],errors=[];let counter=0;
 async function worker(){
  while(counter<paths.length){
   const p=paths[counter++];
   try{const r=await fetchLocal(p);if(r.status===200)facts.push(htmlFacts(r.body,p,r.status));
    else errors.push({path:p,status:r.status});}
   catch(e){errors.push({path:p,error:String(e).slice(0,200)});}
  }
 }
 await Promise.all(Array.from({length:9},worker));
 const lookup=new Map(facts.map(f=>[f.path,f])),inbound=new Map(facts.map(f=>[f.path,0]));
 for(const f of facts){for(const href of f.outbound){if(href!==f.path&&inbound.has(href))inbound.set(href,inbound.get(href)+1);}}
 const reciprocity=[];
 for(const f of facts){
  for(const [lang,target] of Object.entries(f.hreflang)){
   if(lang==="x-default")continue;
   const p=selfPath(target);if(!p||p===f.path)continue;
   const t=lookup.get(p);
   if(!t){reciprocity.push({path:f.path,lang,target:p,issue:"target-not-audited"});continue;}
   if(!Object.values(t.hreflang).some(v=>selfPath(v)===f.path)){
    reciprocity.push({path:f.path,lang,target:p,issue:"missing-return-link"});
   }
  }
 }
 const indexable=facts.filter(f=>!f.robotsNoindex),badLang=indexable.filter(f=>f.lang!==f.expectedLang),missingCanonical=indexable.filter(f=>f.canonical!==f.path),
  missingOG=indexable.filter(f=>!f.ogImage),verboseTitle=indexable.filter(f=>f.titleLength>75),
  duplicatedBrand=indexable.filter(f=>/govietstay\s*[|—\-]\s*govietstay/i.test(f.title)),
  thinReview=indexable.filter(f=>f.words<180),orphan=indexable.filter(f=>seen.has(f.path)&&!inbound.get(f.path)&&f.path!=="/"),
  duplicateSitemap=[...seen].filter(([p,s])=>s.length>1).map(([p,s])=>({path:p,in:s}));
 const results={auditedAt:new Date().toISOString(),note:"Automated editorial signals are review queues, not Google ranking scores.",site:base,sitemapPageCounts,sitemapMissing,summary:{
  uniqueSitemapUrls:seen.size,staticRouteCount:staticUrls.length,scanned:facts.length,httpErrors:errors.length,
  langMismatch:badLang.length,missingOrIncorrectCanonical:missingCanonical.length,
  missingOgImage:missingOG.length,longTitlesForReview:verboseTitle.length,duplicatedBrandTitles:duplicatedBrand.length,
  thinContentForReview:thinReview.length,orphanSitemapUrls:orphan.length,
  nonreciprocalOrUnverifiedHreflang:reciprocity.length,duplicateSitemapEntries:duplicateSitemap.length,
  conflictingOrganizationNodes:facts.filter(f=>f.orgDefs>1).length,
 },issues:{
  httpErrors:errors,sitemapMissing,langMismatch:badLang.map(f=>({path:f.path,lang:f.lang,expected:f.expectedLang})),
  canonical:missingCanonical.map(f=>({path:f.path,canonical:f.canonical})),
  og:missingOG.map(f=>f.path),
  titles:verboseTitle.map(f=>({path:f.path,title:f.title,length:f.titleLength})),
  duplicatedBrand:duplicatedBrand.map(f=>({path:f.path,title:f.title})),
  thinReview:thinReview.map(f=>({path:f.path,words:f.words})),
  orphan:orphan.map(f=>f.path),hreflang:reciprocity,duplicateSitemap,
  schemaDuplicates:facts.filter(f=>f.orgDefs>1).map(f=>({path:f.path,nodes:f.orgDefs})),
 },pages:facts.map(({outbound,...rest})=>({...rest,inbound:inbound.get(rest.path)??0}))};
 await mkdir("seo-audit",{recursive:true});
 await writeFile("seo-audit/seo-geo-audit.json",JSON.stringify(results,null,2));
 const summary="# GoVietStay multilingual SEO / GEO crawl\n\n"+Object.entries(results.summary).map(([k,v])=>"- "+k+": "+v).join("\n")+"\n\nSitemaps: "+JSON.stringify(sitemapPageCounts)+"\n";
 await writeFile("seo-audit/summary.md",summary);
 if(process.env.GITHUB_STEP_SUMMARY)await appendFile(process.env.GITHUB_STEP_SUMMARY,summary);
 console.log(summary);
 console.log("Top orphan URLs: "+JSON.stringify(results.issues.orphan.slice(0,15)));
 console.log("Top hreflang findings: "+JSON.stringify(results.issues.hreflang.slice(0,12)));
}
try{await run();}catch(e){console.error(e);process.exitCode=1;}finally{
 try{if(server.pid)process.kill(-server.pid,"SIGTERM");}catch{server.kill("SIGTERM");}
 server.stdout.destroy();server.stderr.destroy();
}
