"use client";

import { useEffect, useMemo, useState } from "react";

type CatalogRow = {
  merchant_code:string; merchant_name:string; merchant_visibility:string; merchant_visible_on_pi:boolean;
  offer_id:string; offer_code:string; offer_name:string; category:string|null; price_vnd:number|null;
  commission_type:string; commission_rate:number|null; fixed_commission_vnd:number|null;
  destination_url:string; attribution_days:number; visible_on_pi:boolean; active:boolean;
};

function codeify(value:string,max=24){
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase()
    .replace(/[^A-Z0-9]+/g,"_").replace(/^_+|_+$/g,"").slice(0,max);
}
function money(v:any){return new Intl.NumberFormat("vi-VN").format(Number(v||0))+" ₫";}
function commission(r:CatalogRow){
  return r.commission_type==="fixed" ? money(r.fixed_commission_vnd) :
    `${(Number(r.commission_rate||0)*100).toFixed((Number(r.commission_rate||0)*100)%1===0?0:1)}%`;
}

export default function MerchantOnboardingForm({supabase,onCreated}:{supabase:any;onCreated?:()=>void}){
  const [busy,setBusy]=useState(false);
  const [msg,setMsg]=useState("");
  const [err,setErr]=useState("");
  const [catalog,setCatalog]=useState<CatalogRow[]>([]);
  const [merchantName,setMerchantName]=useState("");
  const [merchantCode,setMerchantCode]=useState("");
  const [offerName,setOfferName]=useState("");
  const [offerCode,setOfferCode]=useState("");

  async function loadCatalog(){
    const {data,error}=await supabase.rpc("admin_merchant_offer_catalog");
    if(!error)setCatalog((data||[]) as CatalogRow[]);
  }
  useEffect(()=>{void loadCatalog()},[]);

  const merchants=useMemo(()=>{
    const seen=new Set<string>();const out:{code:string;name:string}[]=[];
    for(const r of catalog)if(!seen.has(r.merchant_code)){seen.add(r.merchant_code);out.push({code:r.merchant_code,name:r.merchant_name})}
    return out;
  },[catalog]);

  async function createMerchant(e:any){
    e.preventDefault();setBusy(true);setErr("");setMsg("");
    const f=new FormData(e.currentTarget);
    try{
      const type=String(f.get("commission_type")||"percentage");
      const rate=type==="percentage"?Math.max(0,Number(f.get("commission")||0))/100:0;
      const fixed=type==="fixed"?Math.max(0,Number(f.get("fixed_commission")||0)):null;
      const visibility=String(f.get("visibility")||"private");
      const destination=String(f.get("destination_url")||"").trim();
      const {data,error}=await supabase.rpc("admin_create_merchant_full",{
        p_name:String(f.get("name")||"").trim(),
        p_merchant_code:codeify(String(f.get("merchant_code")||merchantCode)),
        p_merchant_type:String(f.get("merchant_type")||"business"),
        p_website_url:String(f.get("website_url")||"").trim()||null,
        p_logo_url:String(f.get("logo_url")||"").trim()||null,
        p_contact_name:String(f.get("contact_name")||"").trim()||null,
        p_contact:String(f.get("contact")||"").trim()||null,
        p_description:String(f.get("description")||"").trim()||null,
        p_country:String(f.get("country")||"").trim()||null,
        p_city:String(f.get("city")||"").trim()||null,
        p_visibility:visibility,
        p_default_attribution_days:Number(f.get("attribution_days")||90),
        p_default_commission_type:type,
        p_default_commission_rate:rate,
        p_default_fixed_commission_vnd:fixed,
        p_campaign_name:String(f.get("campaign_name")||"General Partner Program").trim(),
        p_campaign_code:codeify(String(f.get("campaign_code")||""),40)||null,
        p_destination_url:destination
      });
      if(error)throw error;

      const firstOffer=String(f.get("first_offer_name")||"").trim();
      if(firstOffer){
        const offerType=String(f.get("first_offer_commission_type")||type);
        const offerRate=offerType==="percentage"?Math.max(0,Number(f.get("first_offer_commission")||f.get("commission")||0))/100:null;
        const offerFixed=offerType==="fixed"?Math.max(0,Number(f.get("first_offer_fixed")||f.get("fixed_commission")||0)):null;
        const add=await supabase.rpc("admin_create_merchant_offer",{
          p_merchant_code:data?.merchant_code||merchantCode,
          p_offer_code:codeify(String(f.get("first_offer_code")||firstOffer),48),
          p_name:firstOffer,
          p_category:String(f.get("first_offer_category")||"").trim()||null,
          p_description:String(f.get("first_offer_description")||"").trim()||null,
          p_image_url:String(f.get("first_offer_image")||"").trim()||null,
          p_price_vnd:Number(f.get("first_offer_price")||0)||null,
          p_commission_type:offerType,
          p_commission_rate:offerRate,
          p_fixed_commission_vnd:offerFixed,
          p_destination_url:String(f.get("first_offer_url")||destination).trim(),
          p_attribution_days:Number(f.get("attribution_days")||90),
          p_visible_on_pi:visibility==="public",
          p_valid_from:null,p_valid_until:null
        });
        if(add.error)throw add.error;
      }

      setMsg(`Đã tạo Merchant ${data?.merchant_code||merchantCode}. ${visibility==="public"?"Đã bật hiển thị trên Pi Marketplace.":"Chưa public trên Pi Marketplace."}`);
      e.currentTarget.reset();setMerchantName("");setMerchantCode("");setOfferName("");setOfferCode("");
      await loadCatalog();onCreated?.();
    }catch(x:any){setErr(x?.message||"Không tạo được Merchant.")}
    finally{setBusy(false)}
  }

  async function addOffer(e:any){
    e.preventDefault();setBusy(true);setErr("");setMsg("");
    const f=new FormData(e.currentTarget);
    try{
      const type=String(f.get("commission_type")||"percentage");
      const {error}=await supabase.rpc("admin_create_merchant_offer",{
        p_merchant_code:String(f.get("merchant_code")||""),
        p_offer_code:codeify(String(f.get("offer_code")||offerCode),48),
        p_name:String(f.get("name")||"").trim(),
        p_category:String(f.get("category")||"").trim()||null,
        p_description:String(f.get("description")||"").trim()||null,
        p_image_url:String(f.get("image_url")||"").trim()||null,
        p_price_vnd:Number(f.get("price_vnd")||0)||null,
        p_commission_type:type,
        p_commission_rate:type==="percentage"?Math.max(0,Number(f.get("commission")||0))/100:null,
        p_fixed_commission_vnd:type==="fixed"?Math.max(0,Number(f.get("fixed_commission")||0)):null,
        p_destination_url:String(f.get("destination_url")||"").trim(),
        p_attribution_days:Number(f.get("attribution_days")||90),
        p_visible_on_pi:String(f.get("visible_on_pi")||"yes")==="yes",
        p_valid_from:null,p_valid_until:null
      });
      if(error)throw error;
      setMsg("Đã thêm Offer/Product. Pi Marketplace sẽ dùng đúng commission của sản phẩm này.");
      e.currentTarget.reset();setOfferName("");setOfferCode("");await loadCatalog();onCreated?.();
    }catch(x:any){setErr(x?.message||"Không thêm được Offer.")}
    finally{setBusy(false)}
  }

  return <div style={{display:"grid",gap:15,marginBottom:15}}>
    <div className="gva-card">
      <div className="gva-section-head"><div><h2>+ Tạo Merchant</h2><div className="gva-mini">Anh chỉ điền form. Merchant ID, campaign, visibility và Partner Marketplace được hệ thống chuẩn hoá tự động.</div></div><span className="gva-pill">Partner Platform V1</span></div>
      {err&&<div className="gva-msg err">{err}</div>}{msg&&<div className="gva-msg">{msg}</div>}
      <form onSubmit={createMerchant}>
        <div className="gva-form-grid">
          <div className="gva-field"><label>Tên doanh nghiệp</label><input required className="gva-input" name="name" value={merchantName} onChange={e=>{setMerchantName(e.target.value);setMerchantCode(codeify(e.target.value))}} placeholder="Lotus Spa Phu Quoc"/></div>
          <div className="gva-field"><label>Merchant Code</label><input required className="gva-input" name="merchant_code" value={merchantCode} onChange={e=>setMerchantCode(codeify(e.target.value))} placeholder="LOTUSSPA"/></div>
          <div className="gva-field"><label>Loại hình</label><select className="gva-select" name="merchant_type"><option value="travel">Travel</option><option value="spa">Spa / Wellness</option><option value="hotel">Hotel</option><option value="restaurant">Restaurant / Cafe</option><option value="retail">Retail</option><option value="service">Service</option><option value="business">Other Business</option></select></div>
          <div className="gva-field"><label>Website</label><input className="gva-input" name="website_url" placeholder="https://merchant.com"/></div>
          <div className="gva-field"><label>Landing / booking URL</label><input required className="gva-input" name="destination_url" placeholder="https://merchant.com/book"/></div>
          <div className="gva-field"><label>Logo URL</label><input className="gva-input" name="logo_url" placeholder="https://.../logo.png"/></div>
          <div className="gva-field"><label>Người liên hệ</label><input className="gva-input" name="contact_name"/></div>
          <div className="gva-field"><label>Phone / WhatsApp / Email</label><input className="gva-input" name="contact"/></div>
          <div className="gva-field"><label>Quốc gia</label><input className="gva-input" name="country" defaultValue="Vietnam"/></div>
          <div className="gva-field"><label>Thành phố</label><input className="gva-input" name="city" placeholder="Phu Quoc"/></div>
          <div className="gva-field wide"><label>Mô tả ngắn cho Pioneer</label><textarea className="gva-input" name="description" rows={2} placeholder="Merchant này bán gì, khách nhận được gì..."/></div>
          <div className="gva-field"><label>Commission mặc định</label><select className="gva-select" name="commission_type"><option value="percentage">% phần trăm</option><option value="fixed">Số tiền cố định</option></select></div>
          <div className="gva-field"><label>% commission</label><input className="gva-input" name="commission" type="number" min="0" max="100" step="0.1" defaultValue="10"/></div>
          <div className="gva-field"><label>Fixed commission (VND)</label><input className="gva-input" name="fixed_commission" type="number" min="0" defaultValue="0"/></div>
          <div className="gva-field"><label>Attribution</label><input className="gva-input" name="attribution_days" type="number" min="1" max="3650" defaultValue="30"/></div>
          <div className="gva-field"><label>Hiển thị trên Pi</label><select className="gva-select" name="visibility" defaultValue="private"><option value="private">Private / OFF</option><option value="public">Public / ON</option><option value="invite">Invite only</option></select></div>
          <div className="gva-field"><label>Tên chương trình</label><input className="gva-input" name="campaign_name" defaultValue="General Partner Program"/></div>
          <div className="gva-field"><label>Campaign Code (tuỳ chọn)</label><input className="gva-input" name="campaign_code" placeholder="WINTER2026"/></div>
        </div>

        <div style={{borderTop:"1px solid #e1e9f2",marginTop:16,paddingTop:14}}>
          <b>Sản phẩm đầu tiên (tuỳ chọn)</b><div className="gva-mini" style={{margin:"4px 0 10px"}}>Có thể tạo Merchant trước rồi thêm nhiều Offer bên dưới.</div>
          <div className="gva-form-grid">
            <div className="gva-field"><label>Tên sản phẩm</label><input className="gva-input" name="first_offer_name" placeholder="Massage 90 Minutes"/></div>
            <div className="gva-field"><label>Offer Code</label><input className="gva-input" name="first_offer_code" placeholder="MASSAGE90"/></div>
            <div className="gva-field"><label>Category</label><input className="gva-input" name="first_offer_category" placeholder="Massage"/></div>
            <div className="gva-field"><label>Giá bán VND</label><input className="gva-input" name="first_offer_price" type="number" min="0"/></div>
            <div className="gva-field"><label>Commission sản phẩm</label><select className="gva-select" name="first_offer_commission_type"><option value="percentage">% phần trăm</option><option value="fixed">Số tiền cố định</option></select></div>
            <div className="gva-field"><label>%</label><input className="gva-input" name="first_offer_commission" type="number" min="0" max="100" step="0.1"/></div>
            <div className="gva-field"><label>Fixed VND</label><input className="gva-input" name="first_offer_fixed" type="number" min="0"/></div>
            <div className="gva-field"><label>Offer URL</label><input className="gva-input" name="first_offer_url" placeholder="Để trống = Landing URL merchant"/></div>
            <div className="gva-field"><label>Image URL</label><input className="gva-input" name="first_offer_image"/></div>
            <div className="gva-field wide"><label>Mô tả sản phẩm</label><input className="gva-input" name="first_offer_description"/></div>
          </div>
        </div>
        <button className="gva-btn" disabled={busy} style={{marginTop:14}}>{busy?"Đang tạo…":"Create & Publish Merchant"}</button>
      </form>
    </div>

    <div className="gva-card">
      <div className="gva-section-head"><div><h2>+ Thêm Product / Offer</h2><div className="gva-mini">Mỗi sản phẩm có giá, commission, link và visibility riêng.</div></div></div>
      <form onSubmit={addOffer}>
        <div className="gva-form-grid">
          <div className="gva-field"><label>Merchant</label><select required className="gva-select" name="merchant_code"><option value="">Chọn merchant</option>{merchants.map(m=><option key={m.code} value={m.code}>{m.name} · {m.code}</option>)}</select></div>
          <div className="gva-field"><label>Tên sản phẩm</label><input required className="gva-input" name="name" value={offerName} onChange={e=>{setOfferName(e.target.value);setOfferCode(codeify(e.target.value,48))}}/></div>
          <div className="gva-field"><label>Offer Code</label><input required className="gva-input" name="offer_code" value={offerCode} onChange={e=>setOfferCode(codeify(e.target.value,48))}/></div>
          <div className="gva-field"><label>Category</label><input className="gva-input" name="category"/></div>
          <div className="gva-field"><label>Giá VND</label><input className="gva-input" name="price_vnd" type="number" min="0"/></div>
          <div className="gva-field"><label>Commission type</label><select className="gva-select" name="commission_type"><option value="percentage">%</option><option value="fixed">Fixed VND</option></select></div>
          <div className="gva-field"><label>% commission</label><input className="gva-input" name="commission" type="number" min="0" max="100" step="0.1" defaultValue="10"/></div>
          <div className="gva-field"><label>Fixed VND</label><input className="gva-input" name="fixed_commission" type="number" min="0"/></div>
          <div className="gva-field"><label>Attribution days</label><input className="gva-input" name="attribution_days" type="number" min="1" max="3650" defaultValue="30"/></div>
          <div className="gva-field"><label>Visible on Pi</label><select className="gva-select" name="visible_on_pi"><option value="yes">Yes</option><option value="no">No</option></select></div>
          <div className="gva-field wide"><label>Destination URL</label><input required className="gva-input" name="destination_url" placeholder="https://merchant.com/product"/></div>
          <div className="gva-field"><label>Image URL</label><input className="gva-input" name="image_url"/></div>
          <div className="gva-field wide"><label>Mô tả</label><input className="gva-input" name="description"/></div>
        </div>
        <button className="gva-btn" disabled={busy} style={{marginTop:14}}>{busy?"Đang lưu…":"Add Offer"}</button>
      </form>
    </div>

    <div className="gva-card">
      <div className="gva-section-head"><div><h2>Offer Catalog</h2><div className="gva-mini">{catalog.length} sản phẩm/dịch vụ đang được cấu hình.</div></div><button className="gva-btn secondary" onClick={loadCatalog}>Cập nhật</button></div>
      <div className="gva-table-wrap"><table className="gva-table"><thead><tr><th>Merchant</th><th>Offer</th><th>Price</th><th>Commission</th><th>Attribution</th><th>Pi</th></tr></thead><tbody>
        {catalog.map(r=><tr key={r.offer_id}><td><b>{r.merchant_name}</b><div className="gva-mini">{r.merchant_code}</div></td><td><b>{r.offer_name}</b><div className="gva-mini">{r.offer_code} · {r.category||"—"}</div></td><td>{r.price_vnd?money(r.price_vnd):"Contact"}</td><td><b>{commission(r)}</b></td><td>{r.attribution_days} days</td><td><span className="gva-pill" style={{background:r.visible_on_pi?"#e8fff3":"#eef2f7",color:r.visible_on_pi?"#087443":"#5d6b7a"}}>{r.visible_on_pi?"VISIBLE":"HIDDEN"}</span></td></tr>)}
        {!catalog.length&&<tr><td colSpan={6}><div className="gva-empty">Chưa có Offer.</div></td></tr>}
      </tbody></table></div>
    </div>
  </div>;
}
