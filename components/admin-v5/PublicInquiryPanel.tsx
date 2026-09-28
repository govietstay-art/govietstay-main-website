"use client";
import {useCallback,useEffect,useState} from "react";

type Inquiry={
 id:string;inquiry_code:string;created_at:string;source_page:string;product_name:string;
 full_name:string;whatsapp:string;email:string|null;tour_date:string|null;
 adults:number;children:number;language:string;hotel:string|null;details:string|null;status:string;
};
export default function PublicInquiryPanel({supabase}:{supabase:any}){
 const [items,setItems]=useState<Inquiry[]>([]);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState("");
 const [saving,setSaving]=useState("");
 const load=useCallback(async()=>{
  setLoading(true);setError("");
  const {data,error:err}=await supabase.from("gvs_public_inquiries")
    .select("id,inquiry_code,created_at,source_page,product_name,full_name,whatsapp,email,tour_date,adults,children,language,hotel,details,status")
    .order("created_at",{ascending:false}).limit(100);
  if(err)setError(err.message||"Không tải được yêu cầu từ website");
  else setItems((data||[]) as Inquiry[]);
  setLoading(false);
 },[supabase]);
 useEffect(()=>{void load();},[load]);
 const pending=items.filter(x=>x.status==="pending");
 async function change(id:string,status:"contacted"|"rejected"){
  setSaving(id);setError("");
  const {error:err}=await supabase.from("gvs_public_inquiries")
   .update({status,updated_at:new Date().toISOString()}).eq("id",id).eq("status","pending");
  if(err)setError(err.message||"Không cập nhật được yêu cầu");
  else await load();
  setSaving("");
 }
 return <section className="gva-card gvs-team-section">
  <div className="gva-section-head"><div>
   <h2>Yêu cầu từ website · {pending.length} chờ xử lý</h2>
   <div className="gva-mini">Tour, Group Deals và các biểu mẫu online. Đây là yêu cầu kiểm tra chỗ, chưa phải booking được xác nhận.</div>
  </div><button type="button" className="gva-btn secondary" disabled={loading} onClick={()=>void load()}>Làm mới</button></div>
  {error&&<div className="gva-msg err" role="alert">{error}</div>}
  {loading?<p>Đang tải yêu cầu…</p>:pending.length===0?<div className="gva-empty">Không có yêu cầu website mới.</div>:(
   <div className="gvs-request-list">{pending.map(x=>{
    const wa="https://wa.me/"+x.whatsapp.replace(/\D/g,"")+"?text="+encodeURIComponent("GoVietStay: "+x.inquiry_code);
    return <article key={x.id} className="gvs-request">
     <div><b>{x.inquiry_code}</b><span>{x.source_page}</span></div>
     <div><strong>{x.full_name}</strong>
       <small>{x.product_name} · {x.tour_date||"Chưa chọn ngày"} · {x.adults+x.children} khách</small>
       <small>{x.hotel||"Chưa có khách sạn"} · {x.language}</small>
       {x.details&&<p className="text-sm">{x.details}</p>}
     </div>
     <div><strong>{x.whatsapp}</strong><small>{x.email||""}</small></div>
     <div className="gvs-request-actions">
      <a className="gva-btn" href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
      <button type="button" className="gva-btn secondary" disabled={saving===x.id} onClick={()=>void change(x.id,"contacted")}>Đã liên hệ</button>
      <button type="button" className="gvs-danger" disabled={saving===x.id} onClick={()=>void change(x.id,"rejected")}>Bỏ qua</button>
     </div>
    </article>;
   })}</div>
  )}
 </section>;
}
