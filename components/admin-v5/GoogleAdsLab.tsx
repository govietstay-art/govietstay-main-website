"use client";
// @ts-nocheck

import { useEffect, useMemo, useState } from "react";

type AdsLabItem = {
  id:number;
  section:"setup"|"research"|"launch";
  item_key:string;
  title:string;
  status:"todo"|"doing"|"done"|"blocked"|"waiting";
  notes:string|null;
  sort_order:number;
  updated_at:string;
};

const STATUS_OPTIONS = [
  ["todo","Chưa làm"],
  ["doing","Đang làm"],
  ["waiting","Đang chờ"],
  ["blocked","Bị chặn"],
  ["done","Đã xong"],
] as const;

const STATUS_LABEL:Record<string,string> = Object.fromEntries(STATUS_OPTIONS as any);

function money(v:number){
  return new Intl.NumberFormat("vi-VN").format(v)+" ₫";
}

export default function GoogleAdsLab({supabase}:any){
  const [items,setItems]=useState<AdsLabItem[]>([]);
  const [loading,setLoading]=useState(true);
  const [savingId,setSavingId]=useState<number|null>(null);
  const [error,setError]=useState("");
  const [message,setMessage]=useState("");
  const [newTitle,setNewTitle]=useState("");

  async function load(){
    setLoading(true); setError("");
    const {data,error}=await supabase
      .from("google_ads_lab_items")
      .select("id,section,item_key,title,status,notes,sort_order,updated_at")
      .order("sort_order",{ascending:true});
    if(error) setError(error.message);
    else setItems((data||[]) as AdsLabItem[]);
    setLoading(false);
  }

  useEffect(()=>{ load(); },[]);

  function patchLocal(id:number,patch:Partial<AdsLabItem>){
    setItems(prev=>prev.map(x=>x.id===id?{...x,...patch}:x));
  }

  async function saveItem(item:AdsLabItem){
    setSavingId(item.id); setError(""); setMessage("");
    const {error}=await supabase
      .from("google_ads_lab_items")
      .update({status:item.status,notes:item.notes||null,updated_at:new Date().toISOString()})
      .eq("id",item.id);
    if(error) setError(error.message);
    else setMessage("Đã lưu Google Ads Lab.");
    setSavingId(null);
  }

  async function addResearchItem(){
    const title=newTitle.trim();
    if(!title)return;
    setError(""); setMessage("");
    const maxSort=Math.max(180,...items.filter(x=>x.section==="research").map(x=>x.sort_order||0));
    const {error}=await supabase.from("google_ads_lab_items").insert({
      section:"research",
      item_key:"manual_"+Date.now(),
      title,
      status:"todo",
      notes:null,
      sort_order:maxSort+10,
    });
    if(error) return setError(error.message);
    setNewTitle("");
    setMessage("Đã thêm việc nghiên cứu.");
    await load();
  }

  const setup=useMemo(()=>items.filter(x=>x.section==="setup"),[items]);
  const research=useMemo(()=>items.filter(x=>x.section==="research"),[items]);
  const launch=useMemo(()=>items.filter(x=>x.section==="launch"),[items]);
  const researchDone=research.length>0&&research.every(x=>x.status==="done");
  const researchDoneCount=research.filter(x=>x.status==="done").length;

  const legacy={
    campaigns:2,
    impressions:2722,
    clicks:216,
    cpc:3143,
    spend:678832,
  };
  const ctr=((legacy.clicks/legacy.impressions)*100).toFixed(2)+"%";

  return <>
    <div className="gva-analytics-note">
      Google Ads Lab là khu vực nghiên cứu và kiểm soát trước khi chạy tiền. Module này chỉ thêm dữ liệu mới;
      không thay đổi Booking, Leads, partner attribution, Supabase tracking, Yandex, SEO Intelligence hay các campaign cũ.
    </div>

    <div className="gva-kpis">
      <K label="Ads account" value="322-701-5278" hint="Tài khoản Google Ads cũ"/>
      <K label="Legacy campaigns" value={legacy.campaigns} hint="Baseline để mổ lại"/>
      <K label="Impressions cũ" value={legacy.impressions.toLocaleString("vi-VN")} hint="Lịch sử tài khoản"/>
      <K label="Clicks cũ" value={legacy.clicks} hint={"CTR "+ctr}/>
      <K label="Avg CPC cũ" value={money(legacy.cpc)} hint="Chưa đánh giá chất lượng traffic"/>
      <K label="Spend cũ" value={money(legacy.spend)} hint="Trước tracking mới"/>
      <K label="Research" value={researchDoneCount+"/"+research.length} hint="Checklist đã hoàn tất"/>
      <K label="Launch gate" value={researchDone?"READY":"HOLD"} hint={researchDone?"Có thể sang bước duyệt launch":"Chưa nạp tiền / chưa bật campaign"}/>
    </div>

    <div className="gva-card" style={{marginTop:15}}>
      <div className="gva-section-head">
        <div>
          <h2>Tracking & Conversion Stack</h2>
          <div className="gva-mini">Giữ nguyên những gì đã chạy đúng. Không cài thêm tag nếu chưa có lý do rõ ràng.</div>
        </div>
        <button className="gva-btn secondary" onClick={load} disabled={loading}>{loading?"Đang tải…":"Làm mới"}</button>
      </div>
      {error&&<div className="gva-msg err">{error}</div>}
      {message&&<div className="gva-msg">{message}</div>}
      <LabTable items={setup} savingId={savingId} patchLocal={patchLocal} saveItem={saveItem}/>
    </div>

    <div className="gva-card" style={{marginTop:15}}>
      <div className="gva-section-head">
        <div>
          <h2>Campaign Research Board</h2>
          <div className="gva-mini">Mổ campaign cũ trước, sau đó mới thiết kế Search campaign mới. AI Max chỉ test sau khi có baseline sạch.</div>
        </div>
        <span className="gva-pill">{researchDone?"READY FOR REVIEW":"RESEARCH FIRST"}</span>
      </div>
      <LabTable items={research} savingId={savingId} patchLocal={patchLocal} saveItem={saveItem}/>
      <div style={{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"}}>
        <input
          className="gva-input"
          style={{maxWidth:520}}
          value={newTitle}
          onChange={e=>setNewTitle(e.target.value)}
          placeholder="Thêm việc nghiên cứu mới..."
          onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addResearchItem();}}}
        />
        <button className="gva-btn secondary" type="button" onClick={addResearchItem}>+ Thêm việc</button>
      </div>
    </div>

    <div className="gva-card" style={{marginTop:15}}>
      <div className="gva-section-head">
        <div>
          <h2>Launch Guardrails</h2>
          <div className="gva-mini">Các điều kiện phải kiểm tra trước khi nạp tiền hoặc bật campaign.</div>
        </div>
      </div>
      <LabTable items={launch} savingId={savingId} patchLocal={patchLocal} saveItem={saveItem}/>
    </div>

    <div className="gva-grid2" style={{marginTop:15}}>
      <div className="gva-card">
        <h3>Conversion architecture hiện tại</h3>
        <div className="gva-mini" style={{lineHeight:1.8}}>
          <b>Website</b> → GTM-WRPCZ9X3 → <b>GA4 G-XPW64VRT5J</b> → Google Ads 322-701-5278<br/>
          <b>whatsapp_click</b>: GA4 Key event · Google Ads <b>Secondary / chỉ quan sát</b><br/>
          Primary tương lai: <b>qualified lead / confirmed booking</b>, không phải click WhatsApp.
        </div>
      </div>
      <div className="gva-card">
        <h3>Chuẩn tracking khi chạy quảng cáo</h3>
        <div className="gva-mini" style={{lineHeight:1.8}}>
          Landing phải đúng sản phẩm/ngôn ngữ, không dồn về homepage.<br/>
          UTM chuẩn: <b>utm_source=google</b> · <b>utm_medium=cpc</b> · utm_campaign · utm_content.<br/>
          Dữ liệu UTM tiếp tục chảy vào tracking hiện tại để đối chiếu WhatsApp, Lead, Booking và Revenue.
        </div>
      </div>
    </div>
  </>;
}

function LabTable({items,savingId,patchLocal,saveItem}:any){
  return <div className="gva-table-wrap"><table className="gva-table">
    <thead><tr><th>Hạng mục</th><th>Trạng thái</th><th>Ghi chú / quyết định</th><th>Cập nhật</th></tr></thead>
    <tbody>
      {(items||[]).map((item:AdsLabItem)=><tr key={item.id}>
        <td style={{minWidth:210}}><b>{item.title}</b><div className="gva-mini">{item.item_key}</div></td>
        <td style={{minWidth:135}}>
          <select className="gva-select" value={item.status} onChange={e=>patchLocal(item.id,{status:e.target.value})}>
            {STATUS_OPTIONS.map(([v,l])=><option key={v} value={v}>{l}</option>)}
          </select>
        </td>
        <td style={{minWidth:360}}>
          <textarea
            className="gva-input"
            rows={2}
            value={item.notes||""}
            onChange={e=>patchLocal(item.id,{notes:e.target.value})}
          />
        </td>
        <td style={{whiteSpace:"nowrap"}}>
          <button className="gva-btn secondary" type="button" onClick={()=>saveItem(item)} disabled={savingId===item.id}>
            {savingId===item.id?"Đang lưu…":"Lưu"}
          </button>
          <div className="gva-mini" style={{marginTop:6}}>{STATUS_LABEL[item.status]||item.status}</div>
        </td>
      </tr>)}
      {!items?.length&&<tr><td colSpan={4}><div className="gva-empty">Chưa có dữ liệu Google Ads Lab.</div></td></tr>}
    </tbody>
  </table></div>;
}

function K({label,value,hint}:any){
  return <div className="gva-card gva-kpi">
    <div className="label">{label}</div>
    <div className="value">{value}</div>
    <div className="hint">{hint}</div>
  </div>;
}
