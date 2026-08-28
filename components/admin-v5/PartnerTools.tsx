"use client";

import { useEffect, useState } from "react";

type PartnerRow = {
  partner_id:string; partner_name:string; ref_code:string; partner_type:string; contact_name:string|null; contact:string|null;
  landing_url:string|null; dashboard_token:string; guest_discount_rate:number; market:string|null; onboarding_language:string|null;
  start_date:string|null; onboarding_status:string|null; terms_version:string|null; terms_accepted_at:string|null; terms_accepted_name:string|null;
  visits:number; visitors:number; whatsapp_clicks:number; leads:number; bookings:number; pax:number; revenue_vnd:number;
  month_pax:number; base_salary_vnd:number; tour_commission_vnd:number; total_earning_vnd:number;
};

function money(v:any){return new Intl.NumberFormat("vi-VN").format(Number(v||0))+" ₫";}
function dashboardUrl(r:PartnerRow){return "https://www.govietstay.com/partner?token="+encodeURIComponent(r.dashboard_token);}

export default function PartnerTools({supabase,days}:any){
  const [rows,setRows]=useState<PartnerRow[]>([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [copied,setCopied]=useState("");

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

  return <div className="gva-card">
    <div className="gva-section-head">
      <div><h2>Partner Control Center</h2><div className="gva-mini">Theo dõi vận hành + điều khoản + trạng thái chấp thuận của từng đối tác.</div></div>
      <button type="button" className="gva-btn secondary" onClick={loadRows}>{loading?"Đang tải…":"Cập nhật"}</button>
    </div>
    {error&&<div className="gva-msg err">{error}</div>}
    <div className="gva-table-wrap">
      <table className="gva-table">
        <thead><tr>
          <th>Partner</th><th>Terms</th><th>Traffic</th><th>Lead</th><th>Booking</th><th>PAX tháng</th>
          <th>Basic</th><th>Commission</th><th>Total</th><th>Portal</th>
        </tr></thead>
        <tbody>
        {rows.map(r=><tr key={r.partner_id}>
          <td><b>{r.partner_name}</b><br/><span className="gva-mini">{r.ref_code} · {r.market||"—"}</span></td>
          <td>
            {r.terms_accepted_at
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
}
