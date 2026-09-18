"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const db=createClient("https://vscffgnxaexestnayvae.supabase.co","sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV",{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});

export default function OwnerPermissionsShortcut(){
  const [owner,setOwner]=useState(false);
  useEffect(()=>{
    let alive=true;
    async function refresh(){
      const {data:{user},error}=await db.auth.getUser();
      if(!alive)return;
      if(error||!user){setOwner(false);return;}
      const result=await db.from("staff_profiles").select("role,active").eq("auth_user_id",user.id).maybeSingle();
      if(alive)setOwner(!result.error&&result.data?.role==="owner"&&result.data?.active===true);
    }
    void refresh();
    const {data:subscription}=db.auth.onAuthStateChange(()=>{setTimeout(()=>{void refresh();},0);});
    return()=>{alive=false;subscription.subscription.unsubscribe();};
  },[]);
  if(!owner)return null;
  return <Link href="/admin/permissions" style={{position:"fixed",right:18,bottom:18,zIndex:60,background:"#006d61",color:"white",padding:"12px 18px",borderRadius:999,boxShadow:"0 5px 18px rgba(0,40,38,.24)",fontWeight:800,textDecoration:"none",fontSize:14}} aria-label="Mở quản lý nhân sự và phân quyền">🔐 Nhân sự & Phân quyền</Link>;
}
