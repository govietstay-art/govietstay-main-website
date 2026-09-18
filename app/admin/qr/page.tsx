"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import QRCode from "qrcode";
import {db} from "../../../components/admin-v5/OwnerPermissionsShortcut";

type Partner={partner_id:string;partner_name:string;ref_code:string;landing_url:string|null};
const inputStyle:React.CSSProperties={boxSizing:"border-box",display:"block",width:"100%",padding:12,margin:"10px 0 16px",border:"1px solid #acc7c3",borderRadius:9,fontSize:15};
const buttonStyle:React.CSSProperties={border:0,borderRadius:10,padding:"12px 16px",background:"#006d61",color:"white",fontWeight:800,cursor:"pointer",margin:"4px 8px 4px 0"};

export default function AdminQrPage(){
 const [checking,setChecking]=useState(true);
 const [allowed,setAllowed]=useState(false);
 const [partners,setPartners]=useState<Partner[]>([]);
 const [partnerId,setPartnerId]=useState("");
 const [link,setLink]=useState("https://www.govietstay.com/ru");
 const [png,setPng]=useState("");
 const [svg,setSvg]=useState("");
 const [error,setError]=useState("");
 const [loadingError,setLoadingError]=useState("");
 const [busy,setBusy]=useState(false);
 const selected=partners.find(p=>p.partner_id===partnerId);
 useEffect(()=>{
  let alive=true;
  async function authorize(){
   try{
    const {data:{user},error:authError}=await db.auth.getUser();
    if(authError||!user)throw new Error("Anh cần đăng nhập Admin trước.");
    const me=await db.from("staff_profiles").select("role,active").eq("auth_user_id",user.id).maybeSingle();
    if(me.error)throw me.error;
    if(!me.data?.active||!["owner","admin"].includes(me.data.role))throw new Error("Chỉ Owner hoặc Admin được sử dụng công cụ này.");
    if(alive)setAllowed(true);
    const result=await db.rpc("admin_partner_performance",{p_days:30});
    if(result.error)throw result.error;
    if(alive)setPartners((result.data||[]) as Partner[]);
   }catch(e:any){if(alive)setLoadingError(e?.message||"Không tải được danh sách đối tác.");}
   finally{if(alive)setChecking(false);}
  }
  void authorize();return()=>{alive=false;};
 },[]);
 useEffect(()=>{
  let alive=true;
  setPng("");setSvg("");setError("");
  if(!allowed||!link.trim()){setBusy(false);return;}
  async function draw(){
   setBusy(true);
   try{
    const url=new URL(link.trim(),"https://www.govietstay.com");
    if(!["govietstay.com","www.govietstay.com"].includes(url.hostname.toLowerCase())||!["https:","http:"].includes(url.protocol))throw new Error("Chỉ hỗ trợ link GoVietStay chính thức.");
    url.protocol="https:";
    const [p,s]=await Promise.all([QRCode.toDataURL(url.toString(),{width:720,margin:4,errorCorrectionLevel:"M"}),QRCode.toString(url.toString(),{type:"svg",margin:4,errorCorrectionLevel:"M"})]);
    if(alive){setPng(p);setSvg(s);}
   }catch(e:any){if(alive)setError(e?.message||"Không tạo được QR.");}
   finally{if(alive)setBusy(false);}
  }
  void draw();return()=>{alive=false;};
 },[link,allowed]);
 function save(href:string,name:string){const a=document.createElement("a");a.href=href;a.download=name;document.body.appendChild(a);a.click();a.remove();}
 const code=(selected?.ref_code||"DIRECT").replace(/[^a-zA-Z0-9_-]/g,"").slice(0,48);
 function saveSvg(){const url=URL.createObjectURL(new Blob([svg],{type:"image/svg+xml;charset=utf-8"}));save(url,`GVS_${code}_QR.svg`);setTimeout(()=>URL.revokeObjectURL(url),10000);}
 return <main style={{minHeight:"100vh",boxSizing:"border-box",padding:"clamp(16px,4vw,36px)",background:"#f2f7f6",color:"#153a37"}}><div style={{maxWidth:760,margin:"auto"}}>
 <Link href="/admin" style={{color:"#006d61",fontWeight:800}}>← Admin</Link><h1 style={{fontSize:"clamp(26px,4vw,38px)"}}>Tạo mã QR GoVietStay</h1><p>Tạo QR độc lập, không phụ thuộc bộ tạo poster. Chọn đối tác để giữ nguyên mã giới thiệu hoặc nhập landing page của GoVietStay.</p>
 {checking?<p role="status">Đang xác minh tài khoản…</p>:!allowed?<p role="alert" style={{color:"#b91c1c"}}>{loadingError||"Không có quyền truy cập."}</p>:<>
 {loadingError&&<p role="alert" style={{color:"#b91c1c"}}>Danh sách đối tác chưa tải được: {loadingError}. Anh vẫn có thể nhập link thủ công.</p>}
 <section style={{padding:20,background:"white",borderRadius:16,margin:"16px 0",boxShadow:"0 2px 14px #153a3710"}}>
 <label style={{fontWeight:800}}>1. Chọn đối tác</label><select style={inputStyle} value={partnerId} onChange={e=>{const id=e.target.value;setPartnerId(id);const p=partners.find(x=>x.partner_id===id);if(p)setLink(p.landing_url||"");}}><option value="">Không chọn · dùng link tự nhập</option>{partners.map(p=><option key={p.partner_id} value={p.partner_id}>{p.partner_name} · {p.ref_code}</option>)}</select>
 <label style={{fontWeight:800}}>2. Link sẽ được mã hóa trong QR</label><input aria-label="Link QR" style={inputStyle} value={link} onChange={e=>{setPartnerId("");setLink(e.target.value);}} placeholder="https://www.govietstay.com/ru/phu-quoc"/><p style={{fontSize:13,color:"#58706b"}}>Nếu chọn đối tác, hệ thống lấy đúng sales link có attribution. Sửa link thủ công sẽ bỏ lựa chọn đối tác.</p>
 </section>
 <section style={{padding:20,background:"white",borderRadius:16,boxShadow:"0 2px 14px #153a3710"}}><h2 style={{marginTop:0}}>3. QR & tải ảnh</h2>{error&&<p role="alert" style={{color:"#b91c1c"}}>{error}</p>}{busy?<p role="status">Đang tạo QR…</p>:png?<><img src={png} alt={`GoVietStay QR ${selected?.ref_code||"direct"}`} style={{width:300,maxWidth:"100%",height:"auto",display:"block",margin:"0 auto 15px"}}/><button style={buttonStyle} type="button" onClick={()=>save(png,`GVS_${code}_QR.png`)}>↓ Tải PNG</button><button style={{...buttonStyle,background:"#1d4c7d"}} type="button" onClick={saveSvg}>↓ Tải SVG (in nét)</button></>:!error&&<p>Nhập link để tạo QR.</p>}</section>
 </>}
 </div></main>;
}
