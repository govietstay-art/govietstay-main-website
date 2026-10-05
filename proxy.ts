import {NextRequest,NextResponse} from "next/server";
import {getPageLocale} from "./lib/seo/locales";

const SOURCES:Record<string,string>={
 threads:"threads",instagram:"instagram",x:"x",facebook:"facebook",
 tiktok:"tiktok",telegram:"telegram",zalo:"zalo",maps:"google_maps",googlemaps:"google_maps",
};

const LOCAL_ROOTS:Record<string,string>={
 "hotram.govietstay.com":"/ho-tram",
};

export function proxy(request:NextRequest){
 const pathname=request.nextUrl.pathname,parts=pathname.split("/").filter(Boolean);
 const hostname=request.nextUrl.hostname.toLowerCase();
 const localRoot=LOCAL_ROOTS[hostname];

 if(localRoot){
  // One codebase, separate local-root origin. Public URLs stay clean on the subdomain.
  if(pathname===localRoot||pathname.startsWith(`${localRoot}/`)){
   const clean=pathname.slice(localRoot.length)||"/";
   return NextResponse.redirect(new URL(clean+request.nextUrl.search,`https://${hostname}`),308);
  }

  const destination=request.nextUrl.clone();
  if(pathname==="/robots.txt")destination.pathname=`${localRoot}/robots.txt`;
  else if(pathname==="/sitemap.xml")destination.pathname=`${localRoot}/sitemap.xml`;
  else if(pathname==="/llms.txt")destination.pathname=`${localRoot}/llms.txt`;
  else destination.pathname=`${localRoot}${pathname==="/"?"":pathname}`;

  const requestHeaders=new Headers(request.headers);
  requestHeaders.set("x-govietstay-locale",getPageLocale(pathname));
  requestHeaders.set("x-govietstay-local-root","ho-tram");
  return NextResponse.rewrite(destination,{request:{headers:requestHeaders}});
 }

 if(parts[0]==="go"){
  // Preserve the established marketing-attribution route.
  const source=SOURCES[String(parts[1]||"").toLowerCase()];
  if(!source)return NextResponse.redirect(new URL("/ru",request.url),307);
  const destination=request.nextUrl.clone();
  destination.pathname="/ru";destination.search="";
  const requestHeaders=new Headers(request.headers);
  requestHeaders.set("x-govietstay-locale","ru");
  const response=NextResponse.rewrite(destination,{request:{headers:requestHeaders}});
  response.cookies.set("gvs_marketing_attribution_v1",
    `${source}|organic|ru_profile|profile_link`,
    {path:"/",maxAge:60*60*24*7,sameSite:"lax",secure:true,httpOnly:false});
  return response;
 }

 const requestHeaders=new Headers(request.headers);
 requestHeaders.set("x-govietstay-locale",getPageLocale(pathname));
 return NextResponse.next({request:{headers:requestHeaders}});
}

export const config={
 // Local-root discovery files are routed by host; other dotted assets bypass the proxy.
 matcher:[
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/((?!api/|_next/|favicon.ico|.*\\..*).*)",
 ],
};
