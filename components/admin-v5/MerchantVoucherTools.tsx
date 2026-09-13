"use client";

import { useEffect, useMemo, useState } from "react";

type Merchant = { merchant_code:string; merchant_name:string };
type VoucherRow = {
  voucher_id:string; merchant_code:string; merchant_name:string; offer_code:string|null; offer_name:string|null;
  voucher_code:string; title:string; description:string|null; benefit_type:string; discount_rate:number|null;
  discount_vnd:number|null; benefit_text:string|null; terms_text:string|null; visible_on_pi:boolean; active:boolean;
  valid_from:string|null; valid_until:string|null; max_claims:number|null; claimed_count:number; redeemed_count:number;
};

function codeify(value:string,max=48){
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase()
    .replace(/[^A-Z0-9]+/g,"_").replace(/^_+|_+$/g,"").slice(0,max);
}
function money(v:any){return new Intl.NumberFormat("vi-VN").format(Number(v||0))+" ₫";}
function benefit(v:VoucherRow){
  if(v.benefit_type==="percentage")return `${(Number(v.discount_rate||0)*100).toFixed((Number(v.discount_rate||0)*100)%1===0?0:1)}% OFF`;
  if(v.benefit_type==="fixed")return `${money(v.discount_vnd)} OFF`;
  return v.benefit_text||v.benefit_type.toUpperCase();
}

export default function MerchantVoucherTools({supabase}:any){
  const [rows,setRows]=useState<VoucherRow[]>([]);
  const [merchants,setMerchants]=useState<Merchant[]>([]);
  const [busy,setBusy]=useState(false);
  const [msg,setMsg]=useState("");
  const [err,setErr]=useState("");
  const [title,setTitle]=useState("");
  const [code,setCode]=useState("");

  async function load(){
    setErr("");
    try{
      const [v,m]=await Promise.all([
        supabase.rpc("admin_pioneer_voucher_catalog"),
        supabase.rpc("admin_merchant_network_overview",{p_days:30})
      ]);
      if(v.error)throw v.error;if(m.error)throw m.error;
      setRows((v.data||[]) as VoucherRow[]);
      setMerchants((m.data||[]).map((x:any)=>({merchant_code:x.merchant_code,merchant_name:x.merchant_name})));
    }catch(e:any){setErr(e?.message||"Không tải được Pioneer Benefits.");}
  }
  useEffect(()=>{void load()},[]);

  const totals=useMemo(()=>rows.reduce((a,r)=>({claims:a.claims+Number(r.claimed_count||0),redeemed:a.redeemed+Number(r.redeemed_count||0)}),{claims:0,redeemed:0}),[rows]);

  async function createVoucher(e:any){
    e.preventDefault();setBusy(true);setErr("");setMsg("");
    const f=new FormData(e.currentTarget);
    try{
      const type=String(f.get("benefit_type")||"percentage");
      const {data,error}=await supabase.rpc("admin_create_pioneer_voucher",{
        p_merchant_code:String(f.get("merchant_code")||""),
        p_voucher_code:codeify(String(f.get("voucher_code")||code)),
        p_title:String(f.get("title")||"").trim(),
        p_description:String(f.get("description")||"").trim()||null,
        p_offer_code:String(f.get("offer_code")||"").trim()||null,
        p_benefit_type:type,
        p_discount_rate:type==="percentage"?Math.max(0,Number(f.get("discount_percent")||0))/100:null,
        p_discount_vnd:type==="fixed"?Math.max(0,Number(f.get("discount_vnd")||0)):null,
        p_benefit_text:String(f.get("benefit_text")||"").trim()||null,
        p_terms_text:String(f.get("terms_text")||"").trim()||null,
        p_image_url:String(f.get("image_url")||"").trim()||null,
        p_visible_on_pi:String(f.get("visible_on_pi")||"yes")==="yes",
        p_max_claims:Number(f.get("max_claims")||0)||null,
        p_valid_from:null,
        p_valid_until:String(f.get("valid_until")||"").trim()||null
      });
      if(error)throw error;
      setMsg(`Đã tạo Pioneer Voucher ${data?.voucher_code||code}.`);
      e.currentTarget.reset();setTitle("");setCode("");await load();
    }catch(e:any){setErr(e?.message||"Không tạo được voucher.");}
    finally{setBusy(false)}
  }

  async function redeem(e:any){
    e.preventDefault();setBusy(true);setErr("");setMsg("");
    const f=new FormData(e.currentTarget);
    try{
      const claim=String(f.get("claim_code")||"").trim();
      const {data,error}=await supabase.rpc("admin_redeem_pioneer_voucher",{
        p_claim_code:claim,
        p_order_value_vnd:Number(f.get("order_value_vnd")||0)||null,
        p_discount_value_vnd:Number(f.get("discount_value_vnd")||0)||null
      });
      if(error)throw error;
      setMsg(data?.already_redeemed?`Voucher ${claim} đã được sử dụng trước đó.`:`Đã redeem ${claim}.`);
      e.currentTarget.reset();await load();
    }catch(e:any){setErr(e?.message||"Không redeem được voucher.");}
    finally{setBusy(false)}
  }

  return <div style={{display:"grid",gap:15,margin:"15px 0"}}>
    <div className="gva-card">
      <div className="gva-section-head"><div><h2>Pioneer Benefits / Vouchers</h2><div className="gva-mini">Tặng ưu đãi trực tiếp cho Pioneer đã xác minh. Phần này độc lập với commission: Pioneer vừa có thể kiếm tiền, vừa có thể nhận quyền lợi.</div></div><span className="gva-pill">Benefits V1</span></div>
      {err&&<div className="gva-msg err">{err}</div>}{msg&&<div className="gva-msg">{msg}</div>}
      <div className="gva-kpis" style={{marginBottom:14}}>
        <div className="gva-card gva-kpi"><div className="label">Vouchers</div><div className="value">{rows.length}</div><div className="hint">Configured benefits</div></div>
        <div className="gva-card gva-kpi"><div className="label">Claimed</div><div className="value">{totals.claims}</div><div className="hint">Pioneer claims</div></div>
        <div className="gva-card gva-kpi"><div className="label">Redeemed</div><div className="value">{totals.redeemed}</div><div className="hint">Used at merchant</div></div>
      </div>

      <form onSubmit={createVoucher}>
        <div className="gva-form-grid">
          <div className="gva-field"><label>Merchant</label><select required className="gva-select" name="merchant_code"><option value="">Chọn merchant</option>{merchants.map(m=><option key={m.merchant_code} value={m.merchant_code}>{m.merchant_name} · {m.merchant_code}</option>)}</select></div>
          <div className="gva-field"><label>Tên voucher</label><input required className="gva-input" name="title" value={title} onChange={e=>{setTitle(e.target.value);setCode(codeify(e.target.value))}} placeholder="Pioneer Welcome 15%"/></div>
          <div className="gva-field"><label>Voucher Code</label><input required className="gva-input" name="voucher_code" value={code} onChange={e=>setCode(codeify(e.target.value))} placeholder="WELCOME15"/></div>
          <div className="gva-field"><label>Gắn với Offer Code (tuỳ chọn)</label><input className="gva-input" name="offer_code" placeholder="MASSAGE90"/></div>
          <div className="gva-field"><label>Loại quyền lợi</label><select className="gva-select" name="benefit_type"><option value="percentage">Giảm theo %</option><option value="fixed">Giảm số tiền cố định</option><option value="gift">Quà tặng</option><option value="perk">Quyền lợi đặc biệt</option></select></div>
          <div className="gva-field"><label>Giảm %</label><input className="gva-input" name="discount_percent" type="number" min="0" max="100" step="0.1" defaultValue="10"/></div>
          <div className="gva-field"><label>Giảm VND</label><input className="gva-input" name="discount_vnd" type="number" min="0"/></div>
          <div className="gva-field"><label>Giới hạn tổng lượt claim</label><input className="gva-input" name="max_claims" type="number" min="0" placeholder="Để trống = không giới hạn"/></div>
          <div className="gva-field"><label>Hết hạn</label><input className="gva-input" name="valid_until" type="datetime-local"/></div>
          <div className="gva-field"><label>Hiển thị trên Pi</label><select className="gva-select" name="visible_on_pi"><option value="yes">Yes</option><option value="no">No</option></select></div>
          <div className="gva-field wide"><label>Quyền lợi hiển thị</label><input className="gva-input" name="benefit_text" placeholder="10% off / Free drink / Room upgrade..."/></div>
          <div className="gva-field wide"><label>Mô tả</label><input className="gva-input" name="description" placeholder="Mô tả ngắn để Pioneer hiểu voucher"/></div>
          <div className="gva-field wide"><label>Điều kiện sử dụng</label><input className="gva-input" name="terms_text" placeholder="1 lần/Pioneer, áp dụng dịch vụ đủ điều kiện..."/></div>
          <div className="gva-field wide"><label>Image URL</label><input className="gva-input" name="image_url"/></div>
        </div>
        <button className="gva-btn" disabled={busy} style={{marginTop:14}}>{busy?"Đang lưu…":"Create Pioneer Voucher"}</button>
      </form>
    </div>

    <div className="gva-card">
      <div className="gva-section-head"><div><h2>Voucher Catalog</h2><div className="gva-mini">Theo dõi claim và redeem của từng quyền lợi.</div></div><button className="gva-btn secondary" onClick={load}>Cập nhật</button></div>
      <div className="gva-table-wrap"><table className="gva-table"><thead><tr><th>Merchant</th><th>Voucher</th><th>Benefit</th><th>Offer</th><th>Pi</th><th>Claimed</th><th>Redeemed</th></tr></thead><tbody>
        {rows.map(r=><tr key={r.voucher_id}><td><b>{r.merchant_name}</b><div className="gva-mini">{r.merchant_code}</div></td><td><b>{r.title}</b><div className="gva-mini">{r.voucher_code}</div></td><td><b>{benefit(r)}</b><div className="gva-mini">{r.benefit_text||"—"}</div></td><td>{r.offer_name||"All eligible services"}<div className="gva-mini">{r.offer_code||"—"}</div></td><td><span className="gva-pill" style={{background:r.visible_on_pi?"#e8fff3":"#eef2f7",color:r.visible_on_pi?"#087443":"#5d6b7a"}}>{r.visible_on_pi?"VISIBLE":"HIDDEN"}</span></td><td>{r.claimed_count}</td><td>{r.redeemed_count}</td></tr>)}
        {!rows.length&&<tr><td colSpan={7}><div className="gva-empty">Chưa có Pioneer Voucher.</div></td></tr>}
      </tbody></table></div>
    </div>

    <div className="gva-card">
      <div className="gva-section-head"><div><h2>Redeem Voucher</h2><div className="gva-mini">Nhập Claim Code mà Pioneer đưa cho doanh nghiệp. Merchant portal riêng sẽ được tách ở giai đoạn sau.</div></div></div>
      <form onSubmit={redeem}><div className="gva-form-grid">
        <div className="gva-field"><label>Claim Code</label><input required className="gva-input" name="claim_code" placeholder="PV-GVS001-PIONEER1-XXXXXXXX"/></div>
        <div className="gva-field"><label>Giá trị đơn hàng VND</label><input className="gva-input" name="order_value_vnd" type="number" min="0"/></div>
        <div className="gva-field"><label>Giá trị giảm VND</label><input className="gva-input" name="discount_value_vnd" type="number" min="0"/></div>
      </div><button className="gva-btn" disabled={busy} style={{marginTop:14}}>{busy?"Đang xử lý…":"Redeem"}</button></form>
    </div>
  </div>;
}
