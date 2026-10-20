"use client";

import { useEffect, useMemo, useState } from "react";

type MarketingRow = {
  channel:string;
  campaign:string;
  content:string;
  visitors:number;
  views:number;
  whatsapp_clicks:number;
  leads:number;
  bookings:number;
  pax:number;
  revenue_vnd:number;
};

const CHANNELS = [
  ["threads","Threads"],
  ["instagram","Instagram"],
  ["x","X"],
  ["google_maps","Google Maps"],
] as const;

// IDs and UTM come from the approved GoVietStay Google Search campaign.
// Platform delivery, spend and approval state must never be inferred from website events.
const TRAVEL_KIT_ADS_CAMPAIGN = "gvs_travel_kit_esim_oct2026";
const TRAVEL_KIT_ADS_URL = "https://ads.google.com/aw/campaigns?campaignId=24369230297&ocid=3227015278";

const CHANNEL_LABELS:Record<string,string> = {
  threads:"Threads", instagram:"Instagram", x:"X", google_maps:"Google Maps",
  facebook:"Facebook", tiktok:"TikTok", telegram:"Telegram", zalo:"Zalo",
  google:"Google", chatgpt:"ChatGPT", partner:"Partner", referral:"Referral",
  direct:"Direct", unknown:"Unknown"
};

function slug(value:any){
  return String(value||"")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/đ/g,"d")
    .replace(/[^a-z0-9]+/g,"_")
    .replace(/^_+|_+$/g,"")
    .slice(0,100);
}

function postCode(){
  const d=new Date();
  const stamp=[
    d.getFullYear(),
    String(d.getMonth()+1).padStart(2,"0"),
    String(d.getDate()).padStart(2,"0")
  ].join("");
  return "post_"+stamp+"_01";
}

function money(value:any){
  return new Intl.NumberFormat("vi-VN").format(Number(value||0))+" ₫";
}

export default function MarketingTools({supabase,days}:any){
  const [source,setSource]=useState("threads");
  const [landing,setLanding]=useState("/ru");
  const [campaign,setCampaign]=useState("ru_danang");
  const [content,setContent]=useState(()=>postCode());
  const [rows,setRows]=useState<MarketingRow[]>([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [copied,setCopied]=useState(false);

  const trackingLink=useMemo(()=>{
    const base="https://www.govietstay.com";
    let u:URL;
    try{
      const raw=landing.trim()||"/ru";
      if(/^https?:\/\//i.test(raw)){
        const incoming=new URL(raw);
        u=new URL((incoming.pathname||"/")+(incoming.search||""),base);
      }else{
        u=new URL(raw.startsWith("/")?raw:"/"+raw,base);
      }
    }catch{
      u=new URL("/ru",base);
    }
    u.searchParams.set("utm_source",source);
    u.searchParams.set("utm_medium","organic");
    u.searchParams.set("utm_campaign",slug(campaign)||"general");
    const c=slug(content);
    if(c)u.searchParams.set("utm_content",c);
    else u.searchParams.delete("utm_content");
    return u.toString();
  },[source,landing,campaign,content]);

  async function loadRows(){
    setLoading(true); setError("");
    try{
      const {data,error}=await supabase.rpc("admin_marketing_content",{p_days:days});
      if(error)throw error;
      setRows((data||[]) as MarketingRow[]);
    }catch(e:any){
      setError(e?.message||"Không tải được dữ liệu từng bài.");
      setRows([]);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{ loadRows(); },[days]);

  const attributedRows=useMemo(
    ()=>rows.filter(r=>r.campaign!=="(none)"||r.content!=="(none)"),
    [rows]
  );

  // Website-side attribution only. These numbers are NOT Google Ads platform metrics.
  const travelKitRows=useMemo(
    ()=>rows.filter(r=>
      String(r.campaign||"").toLowerCase()===TRAVEL_KIT_ADS_CAMPAIGN &&
      ["google","google_ads"].includes(String(r.channel||"").toLowerCase())
    ),
    [rows]
  );
  const travelKitMetrics=useMemo(()=>{
    const total={visitors:0,views:0,whatsapp_clicks:0,leads:0,bookings:0,pax:0,revenue_vnd:0};
    for(const row of travelKitRows){
      for(const key of Object.keys(total) as (keyof typeof total)[]){
        total[key]+=Number(row[key]||0);
      }
    }
    return total;
  },[travelKitRows]);

  async function copyLink(){
    try{
      await navigator.clipboard.writeText(trackingLink);
      setCopied(true);
      setTimeout(()=>setCopied(false),1800);
    }catch{
      setError("Không copy tự động được. Hãy chọn link và nhấn Ctrl+C.");
    }
  }

  return <>

    <div className="gva-card" style={{marginTop:15}}>
      <div className="gva-section-head">
        <div>
          <h2>Google Ads · Travel Kit + Free eSIM</h2>
          <div className="gva-mini">Theo dõi kết quả từ khách truy cập website qua UTM của đúng chiến dịch, trong {days} ngày gần nhất.</div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button type="button" className="gva-btn secondary" onClick={loadRows} disabled={loading}>{loading?"Đang cập nhật…":"Làm mới"}</button>
          <a className="gva-btn secondary" href={TRAVEL_KIT_ADS_URL} target="_blank" rel="noopener noreferrer">Xem Google Ads ↗</a>
        </div>
      </div>
      <div className="gva-analytics-note" style={{marginTop:0}}>
        Tài khoản <b>322-701-5278</b> · Campaign <b>24369230297</b> · ngân sách đã cấu hình <b>15.000 ₫/ngày (trung bình)</b>.
        Trạng thái và ngân sách này là thông tin cấu hình đã kiểm tra ngày 20/10/2026, <b>không phải dữ liệu đồng bộ trực tiếp</b>.
        Google Ads có thể chi hơn ngân sách trung bình trong một ngày.
      </div>
      {error ? <div className="gva-msg err">Không thể tải dữ liệu website: {error}</div> : null}
      {loading ? <div className="gva-mini">Đang đọc dữ liệu website theo UTM…</div> : !error ? <>
        <div className="gva-kpis">
          <div className="gva-card gva-kpi"><div className="label">Website visitors</div><div className="value">{travelKitMetrics.visitors.toLocaleString("vi-VN")}</div><div className="hint">Đến từ UTM chiến dịch</div></div>
          <div className="gva-card gva-kpi"><div className="label">Page views</div><div className="value">{travelKitMetrics.views.toLocaleString("vi-VN")}</div><div className="hint">Lượt xem trang</div></div>
          <div className="gva-card gva-kpi"><div className="label">WhatsApp clicks</div><div className="value">{travelKitMetrics.whatsapp_clicks.toLocaleString("vi-VN")}</div><div className="hint">Bấm nút liên hệ</div></div>
          <div className="gva-card gva-kpi"><div className="label">Leads / Bookings</div><div className="value">{travelKitMetrics.leads} / {travelKitMetrics.bookings}</div><div className="hint">Phân bổ từ website / CRM</div></div>
          <div className="gva-card gva-kpi"><div className="label">Doanh thu ghi nhận</div><div className="value">{money(travelKitMetrics.revenue_vnd)}</div><div className="hint">{travelKitMetrics.pax} pax · theo UTM</div></div>
        </div>
        {!travelKitRows.length && <div className="gva-mini" style={{marginTop:9}}>Chưa có sự kiện website/CRM được gắn đúng UTM chiến dịch trong kỳ. Điều này không chứng minh quảng cáo chưa hiển thị.</div>}
      </> : null}
      <div className="gva-mini" style={{marginTop:12,lineHeight:1.8}}>
        <b>Chưa kết nối Google Ads API:</b> Impressions, lượt nhấp quảng cáo, CPC và chi phí thực tế chưa có trong admin; xem trực tiếp tại Google Ads phía trên.
        Các lượt truy cập từ UTM không tương đương clicks tính phí của Google. Nếu một người được ghi nhận ở nhiều utm_content, tổng visitors theo từng nội dung có thể trùng.
        <div>UTM: <code>utm_source=google&amp;utm_medium=cpc&amp;utm_campaign={TRAVEL_KIT_ADS_CAMPAIGN}</code></div>
      </div>
    </div>
    <div className="gva-card" style={{marginTop:15}}>
      <div className="gva-section-head">
        <div>
          <h2>Tạo Tracking Link</h2>
          <div className="gva-mini">Chọn nền tảng + landing page + campaign + tên bài. UTM được tạo tự động.</div>
        </div>
      </div>

      <div className="gva-form-grid">
        <div className="gva-field">
          <label>Nền tảng</label>
          <select className="gva-select" value={source} onChange={e=>setSource(e.target.value)}>
            {CHANNELS.map(([value,label])=><option key={value} value={value}>{label}</option>)}
          </select>
        </div>

        <div className="gva-field">
          <label>Landing page</label>
          <input className="gva-input" list="gvs-marketing-landings" value={landing} onChange={e=>setLanding(e.target.value)} placeholder="/ru/tours/cham-island"/>
          <datalist id="gvs-marketing-landings">
            <option value="/ru"/>
            <option value="/ru/tours/cham-island"/>
            <option value="/ko"/>
            <option value="/ko/cham-island-tour"/>
            <option value="/travel/things-to-do-in-da-nang"/>
            <option value="/"/>
          </datalist>
        </div>

        <div className="gva-field">
          <label>Campaign</label>
          <input className="gva-input" list="gvs-marketing-campaigns" value={campaign} onChange={e=>setCampaign(e.target.value)} placeholder="ru_cham"/>
          <datalist id="gvs-marketing-campaigns">
            <option value="ru_danang"/>
            <option value="ru_cham"/>
            <option value="ru_dragon_bridge"/>
            <option value="ko_cham"/>
            <option value="en_danang"/>
            <option value="vi_danang"/>
          </datalist>
        </div>

        <div className="gva-field">
          <label>Tên / mã bài</label>
          <input className="gva-input" value={content} onChange={e=>setContent(e.target.value)} placeholder="Dragon Bridge 27-08 Post 01"/>
        </div>

        <div className="gva-field wide">
          <label>Link đã gắn tracking</label>
          <input className="gva-input" value={trackingLink} readOnly onFocus={e=>e.currentTarget.select()}/>
        </div>
      </div>

      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}>
        <button type="button" className="gva-btn" onClick={copyLink}>{copied?"Đã copy ✓":"Copy link"}</button>
        <button type="button" className="gva-btn secondary" onClick={()=>window.open(trackingLink,"_blank","noopener,noreferrer")}>Mở thử link</button>
      </div>
    </div>

    <div className="gva-card" style={{marginTop:15}}>
      <div className="gva-section-head">
        <div>
          <h2>Hiệu quả từng bài / campaign</h2>
          <div className="gva-mini">Dữ liệu thật theo utm_source + utm_campaign + utm_content.</div>
        </div>
        <button type="button" className="gva-btn secondary" onClick={loadRows} disabled={loading}>{loading?"Đang tải…":"Cập nhật"}</button>
      </div>

      {error&&<div className="gva-msg err">{error}</div>}
      <div className="gva-table-wrap">
        <table className="gva-table">
          <thead>
            <tr>
              <th>Channel</th><th>Campaign</th><th>Content</th><th>Visitors</th><th>Views</th>
              <th>WA</th><th>Leads</th><th>Booking</th><th>Pax</th><th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {attributedRows.slice(0,50).map((r:any,i:number)=><tr key={r.channel+"|"+r.campaign+"|"+r.content+"|"+i}>
              <td><b>{CHANNEL_LABELS[r.channel]||r.channel}</b></td>
              <td>{r.campaign}</td>
              <td>{r.content}</td>
              <td>{r.visitors||0}</td>
              <td>{r.views||0}</td>
              <td><b>{r.whatsapp_clicks||0}</b></td>
              <td>{r.leads||0}</td>
              <td>{r.bookings||0}</td>
              <td>{r.pax||0}</td>
              <td>{money(r.revenue_vnd||0)}</td>
            </tr>)}
            {!attributedRows.length&&<tr><td colSpan={10}><div className="gva-empty">Chưa có traffic từ link UTM mới. Hãy tạo một link phía trên và dùng link đó khi đăng bài.</div></td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  </>;
}
