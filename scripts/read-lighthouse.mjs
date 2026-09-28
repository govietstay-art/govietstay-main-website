import {readFile} from "node:fs/promises";
for(const filename of process.argv.slice(2)){
 try{
  const d=JSON.parse(await readFile(filename,"utf8"));
  const a=d.audits??{};
  const perf=d.categories?.performance?.score;
  console.log("=== "+filename+" ===");
  console.log(JSON.stringify({
    requestedUrl:d.requestedUrl,finalUrl:d.finalUrl,
    score:perf==null?null:Math.round(perf*100),
    lcp:a["largest-contentful-paint"]?.displayValue,tti:a["interactive"]?.displayValue,
    fcp:a["first-contentful-paint"]?.displayValue,blocking:a["total-blocking-time"]?.displayValue,
    totalBytes:a["total-byte-weight"]?.numericValue,
    unusedJavascript:a["unused-javascript"]?.numericValue,
    redirects:a["redirects"]?.details?.items,
    topUnusedJavascript:(a["unused-javascript"]?.details?.items??[])
      .map(x=>({url:x.url,totalBytes:x.totalBytes,wastedBytes:x.wastedBytes,wastedPercent:x.wastedPercent}))
      .sort((x,y)=>(y.wastedBytes??0)-(x.wastedBytes??0)).slice(0,20),
    largestScripts:(a["network-requests"]?.details?.items??[])
      .filter(x=>x.resourceType==="Script")
      .map(x=>({url:x.url,transferSize:x.transferSize,resourceSize:x.resourceSize}))
      .sort((x,y)=>(y.transferSize??0)-(x.transferSize??0)).slice(0,18),
  },null,2));
 }catch(e){console.error("Cannot parse "+filename+": "+e);}
}
