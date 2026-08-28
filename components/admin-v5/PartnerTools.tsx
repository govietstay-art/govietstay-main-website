"use client";

import { useEffect, useMemo, useState } from "react";

type PartnerRow = {
  partner_id:string;
  partner_name:string;
  ref_code:string;
  partner_type:string;
  contact_name:string|null;
  contact:string|null;
  landing_url:string|null;
  dashboard_token:string;
  guest_discount_rate:number;
  visits:number;
  visitors:number;
  whatsapp_clicks:number;
  leads:number;
  bookings:number;
  pax:number;
  revenue_vnd:number;
  month_pax:number;
  base_salary_vnd:number;
  tour_commission_vnd:number;
  total_earning_vnd:number;
};

function money(v:any){ return new Intl.NumberFormat("vi-VN").format(Number(v||0))+" ₫"; }
function pct(v:any){ return Math.round(Number(v||0)*10000)/100+"%"; }
function cleanRef(v:any){
  return String(v||"").trim().toUpperCase().replace(/[^A-Z0-9_-]/g,"").slice(0,80);
}
function slug(v:any){
  return String(v||"").trim().toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d")
    .replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"").slice(0,80);
}
function buildLink(landing:string,ref:string){
  const base="https://www.govietstay.com";
  let u:URL;
  try{
    const raw=(landing||"/ru").trim();
    u=/^https?:\/\//i.test(raw)?new URL(raw):new URL(raw.startsWith("/")?raw:"/"+raw,base);
  }catch{ u=new URL("/ru",base); }
  u.searchParams.set("ref",cleanRef(ref));
  u.searchParams.set("utm_source","partner");
  u.searchParams.set("utm_medium","qr");
  u.searchParams.set("utm_campaign",slug(ref)||"partner");
  return u.toString();
}
function qr(link:string,download=false){
  return "/api/qr?data="+encodeURIComponent(link)+(download?"&download=1":"");
}

export default function PartnerTools({supabase,days}:any){
  const [rows,setRows]=useState<PartnerRow[]>([]);
  const [loading,setLoading]=useState(false);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState("");
  const [msg,setMsg]=useState("");
  const [copied,setCopied]=useState("");

  async function loadRows(){
    setLoading(true);setError("");
    try{
      const {data,error}=await supabase.rpc("admin_partner_performance",{p_days:days});
      if(error)throw error;
      setRows((data||[]) as PartnerRow[]);
    }catch(e:any){
      setError(e?.message||"Không tải được Partner Tracking.");
      setRows([]);
    }finally{ setLoading(false); }
  }
  useEffect(()=>{loadRows();},[days]);

  async function copy(value:string,key:string){
    try{
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(()=>setCopied(""),1500);
    }catch{ setError("Không copy tự động được."); }
  }

  async function createPartner(e:any){
    e.preventDefault();
    setSaving(true);setError("");setMsg("");
    const f=new FormData(e.currentTarget);
    try{
      const name=String(f.get("name")||"").trim();
      const ref=cleanRef(f.get("ref_code"));
      const landing=String(f.get("landing")||"/ru").trim()||"/ru";
      if(!name)throw new Error("Hãy nhập tên đối tác.");
      if(ref.length<2)throw new Error("Partner code chưa hợp lệ.");
      const payload={
        name,
        ref_code:ref,
        partner_type:String(f.get("partner_type")||"referral"),
        contact_name:String(f.get("contact_name")||"").trim()||null,
        contact:String(f.get("contact")||"").trim()||null,
        guest_discount_rate:Math.max(0,Math.min(100,Number(f.get("discount")||0)))/100,
        landing_url:buildLink(landing,ref),
        active:true
      };
      const {error}=await supabase.from("partners").insert(payload);
      if(error)throw error;
      setMsg("Đã tạo partner "+ref+" + link tracking + QR.");
      e.currentTarget.reset();
      await loadRows();
    }catch(e:any){ setError(e?.message||"Không tạo được partner."); }
    finally{ setSaving(false); }
  }

  return <>
    <div className="gva-card">
      <div className="gva-section-head">
        <div>
          <h2>Tạo Partner / QR</h2>
          <div className="gva-mini">Tạo mã riêng cho hotel, bar, restaurant, freelancer, agent hoặc website partner.</div>
        </div>
      </div>
      {error&&<div className="gva-msg err">{error}</div>}
      {msg&&<div className="gva-msg">{msg}</div>}

      <form onSubmit={createPartner}>
        <div className="gva-form-grid">
          <div className="gva-field"><label>Tên đối tác</label><input name="name" className="gva-input" placeholder="Vietved.com Павел" required/></div>
          <div className="gva-field"><label>Partner code</label><input name="ref_code" className="gva-input" placeholder="PAVEL01" required/></div>
          <div className="gva-field"><label>Tên liên hệ</label><input name="contact_name" className="gva-input" placeholder="Павел"/></div>
          <div className="gva-field"><label>Điện thoại / WhatsApp</label><input name="contact" className="gva-input" placeholder="+84..."/></div>
          <div className="gva-field">
            <label>Loại partner</label>
            <select name="partner_type" className="gva-select" defaultValue="referral">
              <option value="referral">Referral</option><option value="hotel">Hotel</option>
              <option value="restaurant">Restaurant</option><option value="bar">Bar</option>
              <option value="desk">Tour Desk</option><option value="agent">Agent</option>
              <option value="creator">Creator / Website</option><option value="other">Other</option>
            </select>
          </div>
          <div className="gva-field"><label>Landing page</label><input name="landing" className="gva-input" defaultValue="/ru"/></div>
          <div className="gva-field"><label>Giảm cho khách (%)</label><input name="discount" className="gva-input" type="number" min="0" max="100" step="0.1" defaultValue="5"/></div>
        </div>
        <button className="gva-btn" style={{marginTop:12}} disabled={saving}>{saving?"Đang tạo…":"Tạo Partner + QR"}</button>
      </form>
    </div>

    <div className="gva-card" style={{marginTop:15}}>
      <div className="gva-section-head">
        <div>
          <h2>Partner Performance</h2>
          <div className="gva-mini">QR → Website → WhatsApp → Lead → Booking → PAX → Basic Salary + Commission/PAX.</div>
        </div>
        <button type="button" className="gva-btn secondary" onClick={loadRows} disabled={loading}>{loading?"Đang tải…":"Cập nhật"}</button>
      </div>

      <div className="gva-table-wrap">
        <table className="gva-table">
          <thead><tr>
            <th>Partner</th><th>QR / Link</th><th>Traffic</th><th>Lead</th><th>Booking</th>
            <th>PAX tháng</th><th>Basic Salary</th><th>Tour Commission</th><th>Total Earning</th><th>Dashboard</th>
          </tr></thead>
          <tbody>
          {rows.map(r=>{
            const link=r.landing_url||buildLink("/ru",r.ref_code);
            const dash="https://www.govietstay.com/partner?token="+encodeURIComponent(r.dashboard_token);
            return <tr key={r.partner_id}>
              <td><b>{r.partner_name}</b><br/><span className="gva-mini">{r.ref_code}</span><br/><span className="gva-mini">{r.contact_name||""} {r.contact||""}</span></td>
              <td style={{minWidth:190}}>
                <img src={qr(link)} alt={"QR "+r.ref_code} width={90} height={90} style={{background:"#fff",padding:4,border:"1px solid #dde5ee",borderRadius:8}}/>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:6}}>
                  <button type="button" className="gva-btn secondary" onClick={()=>copy(link,"l"+r.partner_id)}>{copied==="l"+r.partner_id?"Đã copy ✓":"Copy link"}</button>
                  <a className="gva-btn secondary" href={qr(link,true)}>Tải QR</a>
                </div>
              </td>
              <td>{r.visits||0}<div className="gva-mini">{r.visitors||0} visitor · {r.whatsapp_clicks||0} WA</div></td>
              <td>{r.leads||0}</td>
              <td><b>{r.bookings||0}</b></td>
              <td><b>{r.month_pax||0}</b></td>
              <td>{money(r.base_salary_vnd)}</td>
              <td>{money(r.tour_commission_vnd)}</td>
              <td><b>{money(r.total_earning_vnd)}</b></td>
              <td>
                <button type="button" className="gva-btn secondary" onClick={()=>copy(dash,"d"+r.partner_id)}>{copied==="d"+r.partner_id?"Đã copy ✓":"Copy dashboard"}</button>
                <button type="button" className="gva-btn secondary" style={{marginTop:6}} onClick={()=>window.open(dash,"_blank","noopener,noreferrer")}>Mở dashboard</button>
              </td>
            </tr>
          })}
          {!rows.length&&!loading&&<tr><td colSpan={10}><div className="gva-empty">Chưa có partner.</div></td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  </>;
}
