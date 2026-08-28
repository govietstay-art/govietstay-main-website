"use client";

import { useEffect, useState } from "react";

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

function money(v:any){
  return new Intl.NumberFormat("vi-VN").format(Number(v||0))+" ₫";
}
function pct(v:any){
  return Math.round(Number(v||0)*10000)/100+"%";
}
function cleanRef(v:any){
  return String(v||"").trim().toUpperCase().replace(/[^A-Z0-9_-]/g,"").slice(0,80);
}

export default function PartnerTools({supabase,days}:any){
  const [rows,setRows]=useState<PartnerRow[]>([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [copied,setCopied]=useState("");

  async function loadRows(){
    setLoading(true); setError("");
    try{
      const {data,error}=await supabase.rpc("admin_partner_performance",{p_days:days});
      if(error) throw error;
      setRows((data||[]) as PartnerRow[]);
    }catch(e:any){
      setError(e?.message||"Không tải được Partner Tracking.");
      setRows([]);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{loadRows();},[days]);

  async function copy(value:string,key:string){
    try{
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(()=>setCopied(""),1500);
    }catch{
      setError("Không copy tự động được.");
    }
  }

  return <>
    <div className="gva-card" style={{marginTop:15}}>
      <div className="gva-section-head">
        <div>
          <h2>Partner / QR Tracking</h2>
          <div className="gva-mini">QR → traffic → lead → booking → PAX → lương cơ bản + hoa hồng/pax.</div>
        </div>
        <button type="button" className="gva-btn secondary" onClick={loadRows} disabled={loading}>
          {loading?"Đang tải…":"Cập nhật"}
        </button>
      </div>
      {error&&<div className="gva-msg err">{error}</div>}

      <div className="gva-table-wrap">
        <table className="gva-table">
          <thead>
            <tr>
              <th>Partner</th>
              <th>Traffic</th>
              <th>Leads</th>
              <th>Booking</th>
              <th>PAX kỳ xem</th>
              <th>Revenue</th>
              <th>PAX tháng</th>
              <th>Basic Salary</th>
              <th>Tour Commission</th>
              <th>Total Earning</th>
              <th>Dashboard</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r=>{
              const dash="https://www.govietstay.com/partner?token="+encodeURIComponent(r.dashboard_token);
              return <tr key={r.partner_id}>
                <td>
                  <b>{r.partner_name}</b><br/>
                  <span className="gva-mini">{r.ref_code}</span><br/>
                  <span className="gva-mini">{r.contact_name||""} {r.contact||""}</span><br/>
                  <span className="gva-mini">Guest discount: {pct(r.guest_discount_rate)}</span>
                </td>
                <td>{r.visits||0}<div className="gva-mini">{r.visitors||0} visitor · {r.whatsapp_clicks||0} WA</div></td>
                <td>{r.leads||0}</td>
                <td><b>{r.bookings||0}</b></td>
                <td>{r.pax||0}</td>
                <td>{money(r.revenue_vnd)}</td>
                <td><b>{r.month_pax||0}</b></td>
                <td>{money(r.base_salary_vnd)}</td>
                <td>{money(r.tour_commission_vnd)}</td>
                <td><b>{money(r.total_earning_vnd)}</b></td>
                <td>
                  <button type="button" className="gva-btn secondary" onClick={()=>copy(dash,"dash-"+r.partner_id)}>
                    {copied==="dash-"+r.partner_id?"Đã copy ✓":"Copy dashboard"}
                  </button>
                  <button type="button" className="gva-btn secondary" style={{marginTop:6}} onClick={()=>window.open(dash,"_blank","noopener,noreferrer")}>
                    Mở dashboard
                  </button>
                </td>
              </tr>;
            })}
            {!rows.length&&!loading&&<tr><td colSpan={11}><div className="gva-empty">Chưa có partner.</div></td></tr>}
          </tbody>
        </table>
      </div>
    </div>

    <div className="gva-card" style={{marginTop:15}}>
      <h3>Cách tính thu nhập partner</h3>
      <div className="gva-mini" style={{lineHeight:1.7}}>
        <b>Tour = PAX.</b> Tổng PAX trong tháng quyết định Basic Salary và bậc Commission.
        Commission của từng booking = PAX × mức tiền/PAX theo Tour + Guide EN/RU.
        Không còn dùng % doanh thu 7–10%.
      </div>
    </div>
  </>;
}
