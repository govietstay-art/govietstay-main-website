"use client";

import { useEffect, useMemo, useState } from "react";

type PartnerRow = {
  partner_id:string; partner_name:string; ref_code:string; partner_type:string; contact_name:string|null; contact:string|null;
  landing_url:string|null; dashboard_token:string; guest_discount_rate:number; market:string|null; onboarding_language:string|null;
  start_date:string|null; onboarding_status:string|null; terms_version:string|null; terms_accepted_at:string|null; terms_accepted_name:string|null;
  visits:number; visitors:number; whatsapp_clicks:number; leads:number; bookings:number; pax:number; revenue_vnd:number;
  month_pax:number; base_salary_vnd:number; tour_commission_vnd:number; total_earning_vnd:number;
};

function money(v:any){return new Intl.NumberFormat("vi-VN").format(Number(v||0))+" ₫";}
function dashboardUrl(r:PartnerRow){return "https://www.govietstay.com/partner?token="+encodeURIComponent(r.dashboard_token);}
function cleanRef(v:any){return String(v||"").trim().toUpperCase().replace(/[^A-Z0-9_-]/g,"").slice(0,60);}
function suggestRef(name:string){
  const base=String(name||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^A-Za-z0-9]/g,"").toUpperCase().slice(0,10) || "PARTNER";
  return base+"01";
}

export default function PartnerTools({supabase,days}:any){
  const [rows,setRows]=useState<PartnerRow[]>([]);
  const [loading,setLoading]=useState(false);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState("");
  const [msg,setMsg]=useState("");
  const [copied,setCopied]=useState("");
  const [name,setName]=useState("");
  const [ref,setRef]=useState("");

  async function loadRows(){
    setLoading(true);setError("");
    try{
      const {data,error}=await supabase.rpc("admin_partner_performance",{p_days:days});
      if(error)throw error;
      setRows((data||[]) as PartnerRow[]);
    }catch(e:any){setError(e?.message||"Không tải được Partner Tracking.");setRows([])}
    finally{setLoading(false)}
  }
  useEffect(()=>{loadRows()},[days]);

  async function copy(v:string,k:string){
    try{await navigator.clipboard.writeText(v);setCopied(k);setTimeout(()=>setCopied(""),1600)}
    catch{setError("Không copy được")}
  }

  async function createPartner(e:any){
    e.preventDefault();
    const form=e.currentTarget as HTMLFormElement;
    setSaving(true);setError("");setMsg("");
    const f=new FormData(form);
    try{
      const partnerName=String(f.get("name")||"").trim();
      const code=cleanRef(f.get("ref_code"));
      const discountPct=Math.max(0,Math.min(100,Number(f.get("discount")||0)));
      const {data,error}=await supabase.rpc("admin_create_partner",{
        p_name:partnerName,
        p_ref_code:code,
        p_contact_name:String(f.get("contact_name")||"").trim()||null,
        p_contact:String(f.get("contact")||"").trim()||null,
        p_partner_type:String(f.get("partner_type")||"referral"),
        p_landing_path:String(f.get("landing")||"/ru"),
        p_market:String(f.get("market")||"Russian-speaking travelers"),
        p_onboarding_language:"ru",
        p_start_date:String(f.get("start_date")||"")||null,
        p_guest_discount:discountPct/100
      });
      if(error)throw error;
      setMsg("Đã tạo đối tác "+code+". Hệ thống đã sinh link tracking + portal riêng.");
      form.reset();
      setName("");setRef("");
      await loadRows();
    }catch(e:any){setError(e?.message||"Không tạo được partner.")}
    finally{setSaving(false)}
  }

  return <>
    <div className="gva-card" style={{marginBottom:15}}>
      <div className="gva-section-head">
        <div>
          <h2>+ Tạo đối tác mới</h2>
          <div className="gva-mini">Mỗi đối tác mới sẽ tự có mã riêng, link tracking, QR và Partner Portal tiếng Nga.</div>
        </div>
      </div>

      {error&&<div className="gva-msg err">{error}</div>}
      {msg&&<div className="gva-msg">{msg}</div>}

      <form onSubmit={createPartner}>
        <div className="gva-form-grid">
          <div className="gva-field">
            <label>Tên đối tác / Website</label>
            <input className="gva-input" name="name" value={name} onChange={e=>{
              setName(e.target.value);
              if(!ref)setRef(suggestRef(e.target.value));
            }} placeholder="Vietved.com Pavel" required/>
          </div>
          <div className="gva-field">
            <label>Mã đối tác</label>
            <input className="gva-input" name="ref_code" value={ref} onChange={e=>setRef(cleanRef(e.target.value))} placeholder="PAVEL01" required/>
          </div>
          <div className="gva-field"><label>Tên liên hệ</label><input className="gva-input" name="contact_name" placeholder="Павел"/></div>
          <div className="gva-field"><label>Điện thoại / WhatsApp</label><input className="gva-input" name="contact" placeholder="+84..."/></div>
          <div className="gva-field">
            <label>Loại đối tác</label>
            <select className="gva-select" name="partner_type" defaultValue="referral">
              <option value="referral">Referral / Online</option><option value="creator">Website / Creator</option>
              <option value="hotel">Hotel</option><option value="bar">Bar</option><option value="restaurant">Restaurant</option>
              <option value="desk">Tour Desk</option><option value="agent">Agent</option><option value="other">Other</option>
            </select>
          </div>
          <div className="gva-field"><label>Thị trường</label><input className="gva-input" name="market" defaultValue="Russian-speaking travelers"/></div>
          <div className="gva-field"><label>Landing page</label><input className="gva-input" name="landing" defaultValue="/ru"/></div>
          <div className="gva-field"><label>Ưu đãi khách (%)</label><input className="gva-input" name="discount" type="number" min="0" max="100" step="0.1" defaultValue="0"/><div className="gva-mini" style={{marginTop:5}}>Mặc định 0%. Chỉ nhập khi GoVietStay duyệt ưu đãi riêng cho partner.</div></div>
          <div className="gva-field"><label>Ngày bắt đầu</label><input className="gva-input" name="start_date" type="date"/></div>
        </div>
        <button className="gva-btn" style={{marginTop:12}} disabled={saving}>{saving?"Đang tạo…":"Tạo mã + Portal đối tác"}</button>
      </form>
    </div>

    <div className="gva-card">
      <div className="gva-section-head">
        <div><h2>Partner Control Center</h2><div className="gva-mini">Theo dõi vận hành + điều khoản + trạng thái chấp thuận của từng đối tác.</div></div>
        <button type="button" className="gva-btn secondary" onClick={loadRows}>{loading?"Đang tải…":"Cập nhật"}</button>
      </div>
      <div className="gva-table-wrap">
        <table className="gva-table">
          <thead><tr>
            <th>Partner</th><th>Terms</th><th>Traffic</th><th>Lead</th><th>Booking</th><th>PAX tháng</th>
            <th>Basic</th><th>Commission</th><th>Total</th><th>Portal</th>
          </tr></thead>
          <tbody>
          {rows.map(r=><tr key={r.partner_id}>
            <td><b>{r.partner_name}</b><br/><span className="gva-mini">{r.ref_code} · {r.market||"—"}</span></td>
            <td>{r.terms_accepted_at
              ? <><span className="gva-pill">Accepted v{r.terms_version||"1.0"}</span><div className="gva-mini" style={{marginTop:5}}>{r.terms_accepted_name}<br/>{new Date(r.terms_accepted_at).toLocaleString("vi-VN")}</div></>
              : <span className="gva-pill" style={{background:"#fff3d8"}}>Pending acceptance</span>}
            </td>
            <td>{r.visits||0}<div className="gva-mini">{r.whatsapp_clicks||0} WA</div></td>
            <td>{r.leads||0}</td><td><b>{r.bookings||0}</b></td><td><b>{r.month_pax||0}</b></td>
            <td>{money(r.base_salary_vnd)}</td><td>{money(r.tour_commission_vnd)}</td><td><b>{money(r.total_earning_vnd)}</b></td>
            <td>
              <button className="gva-btn secondary" type="button" onClick={()=>window.open(dashboardUrl(r),"_blank","noopener,noreferrer")}>Mở portal</button>
              <button className="gva-btn secondary" style={{marginTop:6}} type="button" onClick={()=>copy(dashboardUrl(r),"d"+r.partner_id)}>{copied==="d"+r.partner_id?"Đã copy ✓":"Copy link"}</button>
            </td>
          </tr>)}
          {!rows.length&&!loading&&<tr><td colSpan={10}><div className="gva-empty">Chưa có partner.</div></td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  </>;
}

