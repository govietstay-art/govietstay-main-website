"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
import {getPageLocale,isRtlLocale} from "../lib/seo/locales";
export default function HtmlLanguageSync(){
 const pathname=usePathname();
 useEffect(()=>{
  const locale=getPageLocale(pathname);
  document.documentElement.lang=locale;
  document.documentElement.dir=isRtlLocale(locale)?"rtl":"ltr";
 },[pathname]);
 return null;
}
