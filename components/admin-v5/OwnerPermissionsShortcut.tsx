"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import UnifiedSeoCenter from "./UnifiedSeoCenter";

export const db=createClient("https://vscffgnxaexestnayvae.supabase.co","sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV",{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});

/** Mounts a single unified SEO tab into the existing Admin V7 chrome without replacing
 * its booking, finance or partner components. The original SEO / Yandex screens
 * remain in source for safe rollback, but are hidden from this authorized navigation. */
export default function OwnerPermissionsShortcut(){
  const [role,setRole]=useState<"owner"|"admin"|null>(null);
  const [sidebar,setSidebar]=useState<HTMLElement|null>(null);
  const [main,setMain]=useState<HTMLElement|null>(null);
  const [seoOpen,setSeoOpen]=useState(false);

  useEffect(()=>{
    let alive=true;
    async function refresh(){
      const {data:{user},error}=await db.auth.getUser();
      if(!alive)return;
      if(error||!user){setRole(null);setSeoOpen(false);return;}
      const result=await db.from("staff_profiles").select("role,active").eq("auth_user_id",user.id).maybeSingle();
      if(!alive)return;
      const next=!result.error&&result.data?.active===true&&["owner","admin"].includes(result.data?.role)
        ? result.data.role as "owner"|"admin" : null;
      setRole(next);
      if(!next)setSeoOpen(false);
    }
    void refresh();
    const {data:subscription}=db.auth.onAuthStateChange(()=>{setTimeout(()=>{void refresh();},0);});
    return()=>{alive=false;subscription.subscription.unsubscribe();};
  },[]);

  useEffect(()=>{
    if(!role){setSidebar(null);setMain(null);return;}
    const find=()=>{
      const nav=document.querySelector<HTMLElement>(".gva-layout > .gva-side .gva-nav");
      const content=document.querySelector<HTMLElement>(".gva-layout > .gva-main");
      if(nav&&content){setSidebar(nav);setMain(content);observer.disconnect();}
    };
    const observer=new MutationObserver(find);
    observer.observe(document.body,{childList:true,subtree:true});
    find();
    return()=>observer.disconnect();
  },[role]);

  useEffect(()=>{
    if(!role)return;
    const closeSeoOnOtherTab=(event:MouseEvent)=>{
      const target=event.target;
      if(!(target instanceof Element))return;
      const button=target.closest(".gva-nav > button");
      if(button&&!button.classList.contains("gva-unified-seo-button"))setSeoOpen(false);
    };
    document.addEventListener("click",closeSeoOnOtherTab,true);
    return()=>document.removeEventListener("click",closeSeoOnOtherTab,true);
  },[role]);

  if(!role)return null;
  const style:React.CSSProperties={background:"#006d61",color:"white",padding:"12px 16px",borderRadius:999,boxShadow:"0 5px 18px rgba(0,40,38,.24)",fontWeight:800,textDecoration:"none",fontSize:14,whiteSpace:"nowrap"};
  return <>
    <style>{`
      /* One SEO entry in the original Admin menu: Google + Bing + Yandex. */
      .gva-layout > .gva-side .gva-nav {display:flex;flex-direction:column}
      .gva-layout > .gva-side .gva-nav > button:nth-child(7),
      .gva-layout > .gva-side .gva-nav > button:nth-child(8){display:none!important}
      .gva-layout > .gva-side .gva-nav > button:nth-child(n+9){order:2}
      .gva-nav > .gva-unified-seo-button{order:1;width:100%;text-align:left;margin:5px 0;background:transparent;border:0;color:#dbe5f5;padding:11px 12px;border-radius:9px;font-weight:700;cursor:pointer}
      .gva-nav > .gva-unified-seo-button:hover,.gva-nav > .gva-unified-seo-button.active{background:#1d3f70;color:#fff}
      .gva-layout > .gva-main:has(> .gva-seo-embedded-root) > :not(.gva-seo-embedded-root){display:none!important}
      .gva-seo-embedded-root .gva-shell{min-height:auto;background:transparent}
      .gva-seo-embedded-root .gva-main{padding:0;max-width:none!important;margin:0!important}
      .gva-seo-embedded-root .gva-login{min-height:280px;border-radius:14px}
      @media(max-width:760px){.gva-layout > .gva-side .gva-nav{flex-direction:row}.gva-nav > .gva-unified-seo-button{min-width:160px;white-space:nowrap}}
    `}</style>
    {sidebar&&createPortal(
      <button type="button" className={`gva-unified-seo-button${seoOpen?" active":""}`} aria-current={seoOpen?"page":undefined} onClick={()=>setSeoOpen(true)}>
        SEO Center · Google / Bing / Yandex
      </button>,sidebar
    )}
    {seoOpen&&main&&createPortal(<div className="gva-seo-embedded-root"><UnifiedSeoCenter/></div>,main)}
    <nav aria-label="Công cụ quản trị nhanh" style={{position:"fixed",right:18,bottom:18,zIndex:60,display:"flex",flexWrap:"wrap",justifyContent:"flex-end",gap:8,maxWidth:"calc(100vw - 32px)"}}>
      <Link href="/admin/qr" style={{...style,background:"#184b7c"}} aria-label="Mở công cụ tạo mã QR">▦ Tạo QR</Link>
      {role==="owner"&&<Link href="/admin/permissions" style={style} aria-label="Mở quản lý nhân sự và phân quyền">🔐 Nhân sự & Phân quyền</Link>}
    </nav>
  </>;
}
