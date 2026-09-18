"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import QRCode from "qrcode";

export default function AdminQrPage(){
 const [link,setLink]=useState("https://www.govietstay.com/ru");
 const [png,setPng]=useState("");
 const [svg,setSvg]=useState("");
 const [error,setError]=useState("");
 useEffect(()=>{
  let alive=true;
  async function draw(){
   setPng("");setSvg("");setError("");
   try{
    const url=new URL(link.trim(),"https://www.govietstay.com");
    if(!["govietstay.com","www.govietstay.com"].includes(url.hostname.toLowerCase())||!["https:","http:"].includes(url.protocol))throw new Error("Chỉ hỗ trợ link GoVietStay chính thức.");
    url.protocol="https:";
    const [p,s]=await Promise.all([QRCode.toDataURL(url.toString(),{width:720,margin:4,errorCorrectionLevel:"M"}),QRCode.toString(url.toString(),{type:"svg",margin:4,errorCorrectionLevel:"M"})]);
    if(alive){setPng(p);setSvg(s);}
   }catch(e:any){if(alive)setError(e?.message||"Không tạo được QR.");}
  }
  void draw();return()=>{alive=false;};
 },[link]);
 function save(href:string,name:string){const a=document.createElement("a");a.href=href;a.download=name;document.body.appendChild(a);a.click();a.remove();}
 function saveSvg(){const url=URL.createObjectURL(new Blob([svg],{type:"image/svg+xml;charset=utf-8"}));save(url,"GoVietStay-QR.svg");setTimeout(()=>URL.revokeObjectURL(url),10000);}
 return <main style={{padding:24,maxWidth:720,margin:"auto"}}><Link href="/admin">← Admin</Link><h1>Tạo QR GoVietStay</h1><p>Dán link bán hàng / link đối tác có mã ref để giữ tracking.</p><label>Link QR<input aria-label="Link QR" style={{display:"block",width:"100%",padding:12,margin:"12px 0"}} value={link} onChange={e=>setLink(e.target.value)}/></label>{error&&<p role="alert" style={{color:"#b91c1c"}}>{error}</p>}{png?<><img src={png} alt="GoVietStay QR" style={{width:300,maxWidth:"100%",display:"block"}}/><button onClick={()=>save(png,"GoVietStay-QR.png")}>Tải PNG</button><button onClick={saveSvg}>Tải SVG</button></>:!error&&<p>Đang tạo QR…</p>}</main>;
}
