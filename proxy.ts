import {NextRequest,NextResponse} from "next/server";
import {getPageLocale} from "./lib/seo/locales";
const SOURCES:Record<string,string>={
 threads:"threads",instagram:"instagram",x:"x",facebook:"facebook",
 tiktok:"tiktok",telegram:"telegram",zalo:"zalo",maps:"google_maps",googlemaps:"google_maps",
};
export function proxy(request:NextRequest){
 const pathname=request.nextUrl.pathname,parts=pathname.split("/").filter(Boolean);
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
 // HTML only. Exclude API routes, static assets, XML sitemaps and robots.
 matcher:["/((?!api/|_next/|favicon.ico|robots.txt|.*\\..*).*)"],
};
