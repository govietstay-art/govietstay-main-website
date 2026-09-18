"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const db=createClient("https://vscffgnxaexestnayvae.supabase.co","sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV",{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});

export default function OwnerPermissionsShortcut(){
  const [role,setRole]=useState<"owner"|"admin"|null>(null);
  useEffect(()=>{
    let alive=true;
    async function refresh(){
      const {data:{user},error}=await db.auth.getUser();
      if(!alive)return;
      if(error||!user){setRole(null);return;}
      const result=await db.from("staff_profiles").select("role,active").eq("auth_user_id",user.id).maybeSingle();
      if(alive)setRole(!result.error&&result.data?.active===true&&["owner","admin"].includes(result.data?.role)?result.data.role as "owner"|"admin":null);
    }
    void refresh();
    const {data:subscription}=db.auth.onAuthStateChange(()=>{setTimeout(()=>{void refresh();},0);});
    return()=>{alive=false;subscription.subscription.unsubscribe();};
  },[]);
  if(!role)return null;
  const style:React.CSSProperties={background:"#006d61",color:"white",padding:"12px 16px",borderRadius:999,boxShadow:"0 5px 18px rgba(0,40,38,.24)",fontWeight:800,textDecoration:"none",fontSize:14,whiteSpace:"nowrap"};
  return <nav aria-label="Công cụ quản trị nhanh" style={{position:"fixed",right:18,bottom:18,zIndex:60,display:"flex",flexWrap:"wrap",justifyContent:"flex-end",gap:8,maxWidth:"calc(100vw - 32px)"}}>
    <Link href="/admin/qr" style={{...style,background:"#184b7c"}} aria-label="Mở công cụ tạo mã QR">▦ Tạo QR</Link>
    {role==="owner"&&<Link href="/admin/permissions" style={style} aria-label="Mở quản lý nhân sự và phân quyền">🔐 Nhân sự & Phân quyền</Link>}
  </nav>;
}
