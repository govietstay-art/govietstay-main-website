"use client";

import { useEffect, useMemo, useState } from "react";
import MerchantOnboardingForm from "./MerchantOnboardingForm";
import MerchantVoucherTools from "./MerchantVoucherTools";
import QRCode from "qrcode";

type MerchantRow = {
  merchant_id:string; merchant_code:string; merchant_name:string; merchant_type:string; website_url:string|null;
  is_demo:boolean; active:boolean; default_attribution_days:number; default_commission_rate:number;
  partners:number; campaigns:number; scans:number; bookings:number; revenue_vnd:number;
};

type MatrixRow = {
  merchant_code:string; merchant_name:string; merchant_is_demo:boolean;
  partner_id:string; partner_name:string; partner_code:string; partner_market:string|null;
  relationship_status:string; commission_type:string; commission_rate:number|null; fixed_commission_vnd:number|null;
  joined_at:string; campaign_code:string|null; campaign_name:string|null; destination_url:string|null; attribution_days:number|null;
};

function money(v:any){return new Intl.NumberFormat("vi-VN").format(Number(v||0))+" ₫";}
function pct(v:any){return (Number(v||0)*100).toFixed(Number(v||0)*100%1===0?0:1)+"%";}
function bridgeUrl(r:MatrixRow){
  if(!r.campaign_code)return "";
  const origin=typeof window!=="undefined"?window.location.origin:"https://www.govietstay.com";
  return `${origin}/m/${encodeURIComponent(r.merchant_code)}/c/${encodeURIComponent(r.campaign_code)}/p/${encodeURIComponent(r.partner_code)}`;
}

function DemoQr({row}:{row:MatrixRow}){
  const [src,setSrc]=useState("");
  useEffect(()=>{
    let live=true;const url=bridgeUrl(row);if(!url){setSrc("");return;}
    QRCode.toDataURL(url,{width:280,margin:2,errorCorrectionLevel:"M"}).then(x=>{if(live)setSrc(x)}).catch(()=>{if(live)setSrc("")});
    return()=>{live=false};
  },[row.merchant_code,row.campaign_code,row.partner_code]);
  if(!src)return <span className="gva-mini">—</span>;
  return <img src={src} alt="Merchant QR" width={58} height={58} style={{display:"block",borderRadius:8,border:"1px solid #dbe5f1"}}/>;
}

export default function MerchantNetworkTools({supabase,days}:any){
  const [merchants,setMerchants]=useState<MerchantRow[]>([]);
  const [matrix,setMatrix]=useState<MatrixRow[]>([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [copied,setCopied]=useState("");

  async function load(){
    setLoading(true);setError("");
    try{
      const [a,b]=await Promise.all([
        supabase.rpc("admin_merchant_network_overview",{p_days:days}),
        supabase.rpc("admin_merchant_partner_matrix")
      ]);
      if(a.error)throw a.error;if(b.error)throw b.error;
      setMerchants((a.data||[]) as MerchantRow[]);setMatrix((b.data||[]) as MatrixRow[]);
    }catch(e:any){setError(e?.message||"Không tải được Merchant Network.");}
    finally{setLoading(false)}
  }
  useEffect(()=>{void load()},[days]);

  const totals=useMemo(()=>merchants.reduce((x,m)=>({partners:x.partners+Number(m.partners||0),scans:x.scans+Number(m.scans||0),bookings:x.bookings+Number(m.bookings||0),revenue:x.revenue+Number(m.revenue_vnd||0)}),{partners:0,scans:0,bookings:0,revenue:0}),[merchants]);

  async function copy(v:string,k:string){try{await navigator.clipboard.writeText(v);setCopied(k);setTimeout(()=>setCopied(""),1500)}catch{setError("Không copy được link.")}}

  return <>
    <MerchantOnboardingForm supabase={supabase} onCreated={load}/>
    <MerchantVoucherTools supabase={supabase}/>
    {error&&<div className="gva-msg err">{error}</div>}
    <div className="gva-analytics-note" style={{marginBottom:15}}>
      <b>Multi-Merchant Lab:</b> cùng một Pi Partner ID có thể tham gia nhiều doanh nghiệp. GoVietStay là Merchant thật đầu tiên; <b>Demo Lotus Spa (Sandbox)</b> chỉ để chứng minh kiến trúc và không phải doanh nghiệp thật.
    </div>

    <div className="gva-kpis">
      <div className="gva-card gva-kpi"><div className="label">Merchants</div><div className="value">{merchants.length}</div><div className="hint">Business programs</div></div>
      <div className="gva-card gva-kpi"><div className="label">Partner links</div><div className="value">{totals.partners}</div><div className="hint">Merchant ↔ Partner relations</div></div>
      <div className="gva-card gva-kpi"><div className="label">Merchant scans</div><div className="value">{totals.scans}</div><div className="hint">Multi-merchant bridge events</div></div>
      <div className="gva-card gva-kpi"><div className="label">Bookings</div><div className="value">{totals.bookings}</div><div className="hint">Merchant-tagged bookings</div></div>
      <div className="gva-card gva-kpi"><div className="label">Revenue</div><div className="value" style={{fontSize:24}}>{money(totals.revenue)}</div><div className="hint">Merchant-tagged revenue</div></div>
    </div>

    <div className="gva-grid2" style={{marginBottom:15}}>
      {merchants.map(m=><div className="gva-card" key={m.merchant_id}>
        <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"flex-start"}}>
          <div><div className="gva-mini">{m.merchant_code} · {m.merchant_type}</div><h3 style={{margin:"5px 0 0"}}>{m.merchant_name}</h3></div>
          <span className="gva-pill" style={{background:m.is_demo?"#fff3d8":"#e8fff3",color:m.is_demo?"#8a5a00":"#087443"}}>{m.is_demo?"SANDBOX":"LIVE"}</span>
        </div>
        <div className="gva-mini" style={{marginTop:10}}>Default commission <b>{pct(m.default_commission_rate)}</b> · attribution <b>{m.default_attribution_days} days</b></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginTop:12}}>
          <div><b>{m.partners}</b><div className="gva-mini">Partners</div></div><div><b>{m.campaigns}</b><div className="gva-mini">Campaigns</div></div><div><b>{m.scans}</b><div className="gva-mini">Scans</div></div>
        </div>
      </div>)}
    </div>

    <div className="gva-card">
      <div className="gva-section-head"><div><h2>Merchant ↔ Partner Matrix</h2><div className="gva-mini">Một Pioneer, nhiều merchant, commission và campaign tách riêng.</div></div><button className="gva-btn secondary" onClick={load}>{loading?"Đang tải…":"Cập nhật"}</button></div>
      <div className="gva-table-wrap"><table className="gva-table">
        <thead><tr><th>Partner</th><th>Merchant</th><th>Campaign</th><th>Commission</th><th>Attribution</th><th>QR</th><th>Test link</th></tr></thead>
        <tbody>
          {matrix.map((r,i)=>{const url=bridgeUrl(r);return <tr key={r.merchant_code+"|"+r.partner_code+"|"+String(i)}>
            <td><b>{r.partner_name}</b><div className="gva-mini">{r.partner_code}</div></td>
            <td><b>{r.merchant_name}</b><div className="gva-mini">{r.merchant_code} {r.merchant_is_demo?"· SANDBOX":"· LIVE"}</div></td>
            <td>{r.campaign_name||"—"}<div className="gva-mini">{r.campaign_code||"—"}</div></td>
            <td><b>{r.commission_type==="percentage"?pct(r.commission_rate):money(r.fixed_commission_vnd)}</b></td>
            <td>{r.attribution_days||0} days</td>
            <td><DemoQr row={r}/></td>
            <td>{url?<><button className="gva-btn secondary" onClick={()=>window.open(url,"_blank","noopener,noreferrer")}>Test</button><button className="gva-btn secondary" style={{marginTop:6}} onClick={()=>copy(url,"u"+i)}>{copied==="u"+i?"Đã copy ✓":"Copy link"}</button></>:"—"}</td>
          </tr>})}
          {!matrix.length&&!loading&&<tr><td colSpan={7}><div className="gva-empty">Chưa có Merchant Partner relation.</div></td></tr>}
        </tbody>
      </table></div>
    </div>
  </>;
}
