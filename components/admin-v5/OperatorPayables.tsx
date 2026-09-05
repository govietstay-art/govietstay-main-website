"use client";
// GVS-OPERATOR-MOBILE-QUICK-ADD-V2

import { useEffect, useMemo, useState } from "react";
import "./operator-payables.css";

type Props = { supabase:any };

type Summary = {
  total_payable_vnd?:number;
  paid_vnd?:number;
  outstanding_vnd?:number;
  overdue_vnd?:number;
  open_items?:number;
  operators_with_balance?:number;
};

type Supplier = {
  id:string;
  name:string;
  contact_name:string|null;
  phone:string|null;
  whatsapp:string|null;
  payment_terms_days:number;
  settlement_mode:string;
  active:boolean;
};

type Tour = {
  id:string;
  slug:string;
  name:string;
  destination:string|null;
};

type Rate = {
  id:string;
  supplier_id:string;
  tour_id:string;
  adult_net_vnd:number;
  child_net_vnd:number;
  flat_fee_vnd:number;
  valid_from:string;
  valid_to:string|null;
  active:boolean;
  notes:string|null;
};

type Booking = {
  id:string;
  booking_code:string|null;
  tour_date:string|null;
  tour_id:string|null;
  custom_tour_name:string|null;
  adults:number;
  children:number;
  pax:number;
  status:string;
  operator_supplier_id:string|null;
  operator_rate_id:string|null;
  operator_cost_override_vnd:number|null;
  operator_payable_auto:boolean;
};

type Payable = {
  payable_id:string;
  booking_id:string;
  booking_code:string|null;
  tour_date:string|null;
  tour_name:string;
  supplier_id:string;
  supplier_name:string;
  adults:number;
  children:number;
  pax:number;
  amount_vnd:number;
  paid_vnd:number;
  outstanding_vnd:number;
  due_date:string|null;
  payment_state:string;
  rate_id:string|null;
  auto_managed:boolean;
};

type OperatorSummary = {
  supplier_id:string;
  supplier_name:string;
  bookings:number;
  pax:number;
  total_vnd:number;
  paid_vnd:number;
  outstanding_vnd:number;
};

function monthNow(){
  const d=new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
}
function monthBounds(month:string){
  const [y,m]=month.split("-").map(Number);
  const start=`${y}-${String(m).padStart(2,"0")}-01`;
  const next=new Date(y,m,1);
  const end=`${next.getFullYear()}-${String(next.getMonth()+1).padStart(2,"0")}-01`;
  return {start,end};
}
function money(v:any){return new Intl.NumberFormat("vi-VN").format(Number(v||0))+" ₫";}
function parseMoney(v:any){return Math.max(0,Number(String(v||"0").replace(/[^0-9]/g,""))||0);}
function isoToday(){return new Date().toISOString().slice(0,10);}
function addDaysISO(days:number){
  const d=new Date(); d.setDate(d.getDate()+days);
  return d.toISOString().slice(0,10);
}

export default function OperatorPayables({supabase}:Props){
  const [month,setMonth]=useState(monthNow());
  const [summary,setSummary]=useState<Summary>({});
  const [suppliers,setSuppliers]=useState<Supplier[]>([]);
  const [tours,setTours]=useState<Tour[]>([]);
  const [rates,setRates]=useState<Rate[]>([]);
  const [bookings,setBookings]=useState<Booking[]>([]);
  const [payables,setPayables]=useState<Payable[]>([]);
  const [operatorSummary,setOperatorSummary]=useState<OperatorSummary[]>([]);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState("");
  const [message,setMessage]=useState("");
  const [operatorOpen,setOperatorOpen]=useState(false);
  const [rateOpen,setRateOpen]=useState(false);
  const [settle,setSettle]=useState<OperatorSummary|null>(null);
  const [quickBooking,setQuickBooking]=useState<Booking|null>(null);

  const supplierMap=useMemo(()=>Object.fromEntries(suppliers.map(x=>[x.id,x])),[suppliers]);
  const tourMap=useMemo(()=>Object.fromEntries(tours.map(x=>[x.id,x])),[tours]);
  const rateMap=useMemo(()=>Object.fromEntries(rates.map(x=>[x.id,x])),[rates]);

  async function load(){
    setLoading(true); setError("");
    try{
      const {start,end}=monthBounds(month);
      const pMonth=month+"-01";
      const results=await Promise.all([
        supabase.rpc("admin_operator_payables_summary",{p_month:pMonth}),
        supabase.rpc("admin_operator_summary_by_supplier",{p_month:pMonth}),
        supabase.rpc("admin_operator_payables",{p_month:pMonth,p_supplier_id:null}),
        supabase.from("suppliers")
          .select("id,name,contact_name,phone,whatsapp,payment_terms_days,settlement_mode,active")
          .eq("supplier_type","group_tour_operator").eq("active",true).order("name"),
        supabase.from("tours").select("id,slug,name,destination").eq("active",true).order("name"),
        supabase.from("operator_tour_rates")
          .select("id,supplier_id,tour_id,adult_net_vnd,child_net_vnd,flat_fee_vnd,valid_from,valid_to,active,notes")
          .eq("active",true).order("valid_from",{ascending:false}),
        supabase.from("bookings")
          .select("id,booking_code,tour_date,tour_id,custom_tour_name,adults,children,pax,status,operator_supplier_id,operator_rate_id,operator_cost_override_vnd,operator_payable_auto")
          .gte("tour_date",start).lt("tour_date",end).order("tour_date",{ascending:true})
      ]);
      for(const r of results) if(r.error) throw r.error;
      setSummary(results[0].data||{});
      setOperatorSummary(results[1].data||[]);
      setPayables(results[2].data||[]);
      setSuppliers(results[3].data||[]);
      setTours(results[4].data||[]);
      setRates(results[5].data||[]);
      setBookings((results[6].data||[]).filter((b:any)=>!String(b.status||"").toLowerCase().includes("cancel")));
    }catch(e:any){setError(e?.message||"Không tải được công nợ tour ghép.");}
    finally{setLoading(false);}
  }

  useEffect(()=>{load();},[month]);

  function ratesFor(supplierId:string,tourId:string|null){
    return rates.filter(r=>r.supplier_id===supplierId && (!tourId || r.tour_id===tourId));
  }

  function previewCost(b:Booking,supplierId:string,rateId:string){
    if(!supplierId) return 0;
    const r=rateMap[rateId] || ratesFor(supplierId,b.tour_id)[0];
    if(!r) return 0;
    return Number(b.adults||0)*Number(r.adult_net_vnd||0)
      + Number(b.children||0)*Number(r.child_net_vnd||0)
      + Number(r.flat_fee_vnd||0);
  }

  async function assignOperator(b:Booking,supplierId:string,rateId:string,overrideText:string){
    setSaving(true);setError("");setMessage("");
    try{
      const payload:any={
        operator_supplier_id:supplierId||null,
        operator_rate_id:rateId||null,
        operator_payable_auto:!!supplierId
      };
      const ov=String(overrideText||"").trim();
      payload.operator_cost_override_vnd=ov===""?null:parseMoney(ov);
      const {error}=await supabase.from("bookings").update(payload).eq("id",b.id);
      if(error) throw error;
      setMessage(supplierId
        ? `Đã gán nhà tổ chức cho ${b.booking_code||"booking"} — công nợ được tạo/cập nhật tự động.`
        : `Đã bỏ nhà tổ chức khỏi ${b.booking_code||"booking"} — công nợ tự động được void.`);
      await load();
    }catch(e:any){setError(e?.message||"Không cập nhật được nhà tổ chức.");}
    finally{setSaving(false);}
  }

  async function createOperator(e:any){
    e.preventDefault(); setSaving(true);setError("");setMessage("");
    try{
      const f=new FormData(e.currentTarget); const v=Object.fromEntries(f.entries()) as any;
      const {error}=await supabase.from("suppliers").insert({
        name:String(v.name||"").trim(),
        contact_name:String(v.contact_name||"").trim()||null,
        phone:String(v.phone||"").trim()||null,
        whatsapp:String(v.whatsapp||"").trim()||null,
        service_area:String(v.service_area||"").trim()||null,
        payment_terms_days:Math.max(0,Number(v.payment_terms_days||0)),
        settlement_mode:String(v.settlement_mode||"after_tour"),
        supplier_type:"group_tour_operator",
        active:true
      });
      if(error) throw error;
      setOperatorOpen(false); setMessage("Đã thêm nhà tổ chức tour ghép."); await load();
    }catch(e:any){setError(e?.message||"Không thêm được nhà tổ chức.");}
    finally{setSaving(false);}
  }

  async function createRate(e:any){
    e.preventDefault(); setSaving(true);setError("");setMessage("");
    try{
      const f=new FormData(e.currentTarget); const v=Object.fromEntries(f.entries()) as any;
      const {error}=await supabase.from("operator_tour_rates").insert({
        supplier_id:v.supplier_id,
        tour_id:v.tour_id,
        adult_net_vnd:parseMoney(v.adult_net_vnd),
        child_net_vnd:parseMoney(v.child_net_vnd),
        flat_fee_vnd:parseMoney(v.flat_fee_vnd),
        valid_from:v.valid_from||isoToday(),
        valid_to:v.valid_to||null,
        notes:String(v.notes||"").trim()||null,
        active:true
      });
      if(error) throw error;
      setRateOpen(false); setMessage("Đã lưu giá net. Booking mới/cập nhật sẽ tự tính công nợ."); await load();
    }catch(e:any){setError(e?.message||"Không lưu được giá net.");}
    finally{setSaving(false);}
  }

  async function quickCreateSupplierRate(e:any){
    e.preventDefault(); if(!quickBooking)return;
    setSaving(true);setError("");setMessage("");
    try{
      if(!quickBooking.tour_id) throw new Error("Booking custom chưa có Tour ID. Hãy dùng giá tự nhập với một nhà cung cấp đã có.");
      const f=new FormData(e.currentTarget); const v=Object.fromEntries(f.entries()) as any;
      const name=String(v.name||"").trim();
      if(!name) throw new Error("Cần tên nhà cung cấp.");
      const {data:supplier,error:sErr}=await supabase.from("suppliers").insert({
        name,
        contact_name:String(v.contact_name||"").trim()||null,
        phone:String(v.phone||"").trim()||null,
        whatsapp:String(v.whatsapp||"").trim()||null,
        service_area:String(v.service_area||"").trim()||null,
        payment_terms_days:Math.max(0,Number(v.payment_terms_days||0)),
        settlement_mode:"after_tour",
        supplier_type:"group_tour_operator",
        active:true,
        notes:"Quick added from Booking → Operator"
      }).select("id,name").single();
      if(sErr) throw sErr;

      const adult=parseMoney(v.adult_net_vnd);
      const child=parseMoney(v.child_net_vnd);
      const flat=parseMoney(v.flat_fee_vnd);
      const {data:rate,error:rErr}=await supabase.from("operator_tour_rates").insert({
        supplier_id:supplier.id,
        tour_id:quickBooking.tour_id,
        adult_net_vnd:adult,
        child_net_vnd:child,
        flat_fee_vnd:flat,
        valid_from:isoToday(),
        active:true,
        notes:String(v.notes||"").trim()||null
      }).select("id").single();
      if(rErr) throw rErr;

      const {error:bErr}=await supabase.from("bookings").update({
        operator_supplier_id:supplier.id,
        operator_rate_id:rate.id,
        operator_cost_override_vnd:null,
        operator_payable_auto:true
      }).eq("id",quickBooking.id);
      if(bErr) throw bErr;

      setQuickBooking(null);
      setMessage(`✓ Đã thêm ${supplier.name}, lưu giá net và gán luôn vào ${quickBooking.booking_code||"booking"}. Công nợ tự chạy.`);
      await load();
    }catch(e:any){setError(e?.message||"Không thêm được nhà cung cấp + giá net.");}
    finally{setSaving(false);}
  }

  async function settleOperator(e:any){
    e.preventDefault(); if(!settle)return;
    setSaving(true);setError("");setMessage("");
    try{
      const f=new FormData(e.currentTarget); const v=Object.fromEntries(f.entries()) as any;
      const {data,error}=await supabase.rpc("admin_settle_operator_through_date",{
        p_supplier_id:settle.supplier_id,
        p_through_date:v.through_date,
        p_payment_method:String(v.payment_method||"VietQR"),
        p_reference:String(v.reference||"").trim()||null,
        p_notes:String(v.notes||"").trim()||null
      });
      if(error) throw error;
      setSettle(null);
      setMessage(`Đã settlement ${data?.items||0} booking · ${money(data?.total_vnd||0)}.`);
      await load();
    }catch(e:any){setError(e?.message||"Không settlement được công nợ.");}
    finally{setSaving(false);}
  }

  return <div className="gvs-op">
    <div className="gvs-op-head">
      <div>
        <h2>Công nợ nhà tổ chức tour ghép</h2>
        <p>Booking → chọn Operator → lấy giá net theo pax → tự sinh công nợ → gom theo Operator → Settlement. Không nhập payable thủ công.</p>
      </div>
      <div className="gvs-op-actions">
        <input className="gva-input" type="month" value={month} onChange={e=>setMonth(e.target.value)}/>
        <button className="gva-btn secondary" onClick={load} disabled={loading}>{loading?"Đang tải…":"Làm mới"}</button>
        <button className="gva-btn secondary" onClick={()=>setOperatorOpen(true)}>+ Operator</button>
        <button className="gva-btn" onClick={()=>setRateOpen(true)}>+ Giá net</button>
      </div>
    </div>

    {error&&<div className="gva-msg err">{error}</div>}
    {message&&<div className="gva-msg">{message}</div>}

    <div className="gvs-op-kpis">
      <K label="Tổng phải trả" value={money(summary.total_payable_vnd)} hint="Giá vốn operator của booking tháng"/>
      <K label="Đã trả" value={money(summary.paid_vnd)} hint="Supplier settlements"/>
      <K label="Còn công nợ" value={money(summary.outstanding_vnd)} hint={`${summary.open_items||0} khoản đang mở`} strong/>
      <K label="Quá hạn" value={money(summary.overdue_vnd)} hint={`${summary.operators_with_balance||0} operator còn balance`} bad={Number(summary.overdue_vnd||0)>0}/>
    </div>

    <section className="gva-card gvs-op-section">
      <div className="gva-section-head">
        <div><h2>Operator Summary</h2><div className="gva-mini">Gom toàn bộ booking theo nhà tổ chức. Bấm Settlement để thanh toán một lần cho nhiều booking.</div></div>
      </div>
      <div className="gvs-op-summary-grid">
        {operatorSummary.map(x=><article className="gvs-op-summary" key={x.supplier_id}>
          <div className="gvs-op-summary-title"><div><h3>{x.supplier_name}</h3><small>{x.bookings} bookings · {x.pax} pax</small></div><button className="gva-btn secondary" disabled={Number(x.outstanding_vnd)<=0} onClick={()=>setSettle(x)}>Settlement</button></div>
          <div className="gvs-op-summary-numbers">
            <span><small>Total</small><b>{money(x.total_vnd)}</b></span>
            <span><small>Paid</small><b>{money(x.paid_vnd)}</b></span>
            <span><small>Outstanding</small><b>{money(x.outstanding_vnd)}</b></span>
          </div>
        </article>)}
        {!operatorSummary.length&&<div className="gva-empty">Chưa có công nợ operator trong tháng.</div>}
      </div>
    </section>

    <section className="gva-card gvs-op-section">
      <div className="gva-section-head">
        <div>
          <h2>Booking → Operator</h2>
          <div className="gva-mini">Chọn NCC đã lưu → giá net tự lên. Hoặc nhập giá thủ công. Nếu chưa có NCC, bấm “+ NCC” ngay tại booking để thêm và lưu bằng điện thoại.</div>
        </div>
      </div>
      <div className="gvs-op-bookings">
        {bookings.map(b=><BookingAssignRow key={b.id} b={b} suppliers={suppliers} tours={tours} rates={rates} supplierMap={supplierMap} tourMap={tourMap} previewCost={previewCost} ratesFor={ratesFor} onSave={assignOperator} onQuickAdd={()=>setQuickBooking(b)} saving={saving}/>)}
        {!bookings.length&&<div className="gva-empty">Không có booking trong tháng này.</div>}
      </div>
    </section>

    <section className="gva-card gvs-op-section">
      <div className="gva-section-head">
        <div><h2>Open Payables</h2><div className="gva-mini">Chi tiết để đối chiếu khi cần. Không tạo công nợ bằng tay tại đây.</div></div>
      </div>
      <div className="gva-table-wrap"><table className="gva-table">
        <thead><tr><th>Tour date</th><th>Operator</th><th>Booking</th><th>Tour / Pax</th><th>Payable</th><th>Paid</th><th>Outstanding</th><th>Due</th><th>Status</th></tr></thead>
        <tbody>
          {payables.map(p=><tr key={p.payable_id}>
            <td>{p.tour_date||"—"}</td><td><b>{p.supplier_name}</b></td><td>{p.booking_code||"—"}</td>
            <td>{p.tour_name}<div className="gva-mini">{p.adults}A · {p.children}C · {p.pax} pax</div></td>
            <td>{money(p.amount_vnd)}</td><td>{money(p.paid_vnd)}</td><td><b>{money(p.outstanding_vnd)}</b></td>
            <td>{p.due_date||"—"}</td><td><span className={`gva-pill ${p.outstanding_vnd>0?"":"ok"}`}>{p.payment_state}</span></td>
          </tr>)}
          {!payables.length&&<tr><td colSpan={9}><div className="gva-empty">Chưa có payable tự động.</div></td></tr>}
        </tbody>
      </table></div>
    </section>

    <section className="gva-card gvs-op-section">
      <div className="gva-section-head">
        <div><h2>Operator Rate Cards</h2><div className="gva-mini">Nhập giá net một lần. Booking dùng rate có hiệu lực tại ngày tour.</div></div>
        <button className="gva-btn" onClick={()=>setRateOpen(true)}>+ Thêm giá net</button>
      </div>
      <div className="gva-table-wrap"><table className="gva-table">
        <thead><tr><th>Operator</th><th>Tour</th><th>Adult net</th><th>Child net</th><th>Flat fee</th><th>Valid from</th><th>Valid to</th></tr></thead>
        <tbody>
          {rates.map(r=><tr key={r.id}><td><b>{supplierMap[r.supplier_id]?.name||"—"}</b></td><td>{tourMap[r.tour_id]?.name||"—"}</td><td>{money(r.adult_net_vnd)}</td><td>{money(r.child_net_vnd)}</td><td>{money(r.flat_fee_vnd)}</td><td>{r.valid_from}</td><td>{r.valid_to||"Open"}</td></tr>)}
          {!rates.length&&<tr><td colSpan={7}><div className="gva-empty">Chưa có rate card. Thêm operator và giá net trước.</div></td></tr>}
        </tbody>
      </table></div>
    </section>

    {quickBooking&&<QuickSupplierRateModal booking={quickBooking} tourName={quickBooking.custom_tour_name||tourMap[quickBooking.tour_id||""]?.name||"Tour"} saving={saving} onClose={()=>setQuickBooking(null)} onSubmit={quickCreateSupplierRate}/>}
    {operatorOpen&&<OperatorModal saving={saving} onClose={()=>setOperatorOpen(false)} onSubmit={createOperator}/>}
    {rateOpen&&<RateModal saving={saving} suppliers={suppliers} tours={tours} onClose={()=>setRateOpen(false)} onSubmit={createRate}/>}
    {settle&&<SettlementModal row={settle} saving={saving} onClose={()=>setSettle(null)} onSubmit={settleOperator}/>}
  </div>;
}

function K({label,value,hint,strong,bad}:any){
  return <div className={`gva-card gvs-op-kpi ${strong?"strong":""} ${bad?"bad":""}`}><div className="gvs-op-label">{label}</div><div className="gvs-op-value">{value}</div><div className="gva-mini">{hint}</div></div>;
}

function BookingAssignRow({b,suppliers,tourMap,rates,previewCost,ratesFor,onSave,onQuickAdd,saving}:any){
  const [supplierId,setSupplierId]=useState(b.operator_supplier_id||"");
  const matching=ratesFor(supplierId,b.tour_id);
  const [rateId,setRateId]=useState(b.operator_rate_id||"");
  const [override,setOverride]=useState(b.operator_cost_override_vnd==null?"":String(b.operator_cost_override_vnd));
  useEffect(()=>{
    setSupplierId(b.operator_supplier_id||"");
    setRateId(b.operator_rate_id||"");
    setOverride(b.operator_cost_override_vnd==null?"":String(b.operator_cost_override_vnd));
  },[b.operator_supplier_id,b.operator_rate_id,b.operator_cost_override_vnd]);

  useEffect(()=>{
    if(supplierId && !matching.find((x:any)=>x.id===rateId)) setRateId(matching[0]?.id||"");
    if(!supplierId) setRateId("");
  },[supplierId]);

  const expected=override.trim()?parseMoney(override):previewCost(b,supplierId,rateId);
  const tourName=b.custom_tour_name||tourMap[b.tour_id||""]?.name||"Tour";
  const recommendedSupplierIds=new Set(rates.filter((r:any)=>r.tour_id===b.tour_id).map((r:any)=>r.supplier_id));
  const orderedSuppliers=[...suppliers].sort((a:any,bx:any)=>Number(recommendedSupplierIds.has(bx.id))-Number(recommendedSupplierIds.has(a.id)));
  const selectedRate=matching.find((x:any)=>x.id===rateId)||matching[0];
  const childRateMissing=Number(b.children||0)>0 && !!supplierId && !!selectedRate && Number(selectedRate.child_net_vnd||0)===0 && !override.trim();

  return <div className={`gvs-op-booking ${supplierId?"assigned":"needs"}`}>
    <div><b>{b.booking_code||"Booking"}</b><small>{b.tour_date||"—"} · {b.status}</small></div>
    <div><strong>{tourName}</strong><small>{b.adults}A · {b.children}C · {b.pax} pax</small></div>
    <div style={{display:"flex",gap:6,minWidth:0}}>
      <select className="gva-select" style={{minWidth:0,flex:1}} value={supplierId} onChange={e=>setSupplierId(e.target.value)}>
        <option value="">— Chọn nhà cung cấp —</option>
        {orderedSuppliers.map((s:any)=><option value={s.id} key={s.id}>{recommendedSupplierIds.has(s.id)?"★ ":""}{s.name}</option>)}
      </select>
      <button type="button" className="gva-btn secondary" style={{whiteSpace:"nowrap",padding:"8px 10px"}} onClick={onQuickAdd}>+ NCC</button>
    </div>
    <select className="gva-select" value={rateId} onChange={e=>setRateId(e.target.value)} disabled={!supplierId}>
      <option value="">Auto rate theo ngày tour</option>
      {matching.map((r:any)=><option value={r.id} key={r.id}>{money(r.adult_net_vnd)} A · {money(r.child_net_vnd)} C · từ {r.valid_from}</option>)}
    </select>
    <input className="gva-input" value={override} onChange={e=>setOverride(e.target.value)} inputMode="numeric" placeholder="Giá net tự nhập (tuỳ chọn)"/>
    <div className="gvs-op-expected"><small>{override.trim()?"Giá tự nhập":"Công nợ dự kiến"}</small><b>{money(expected)}</b>{childRateMissing&&<small style={{color:"#b45309"}}>Thiếu giá trẻ em → nhập giá net tự nhập</small>}</div>
    <button className="gva-btn" disabled={saving || (!!supplierId && !rateId && !matching.length && !override.trim())} onClick={()=>onSave(b,supplierId,rateId,override)}>
      {supplierId?"Lưu công nợ":"Bỏ NCC"}
    </button>
  </div>;
}

function F({label,children,wide}:any){return <div className={`gva-field ${wide?"wide":""}`}><label>{label}</label>{children}</div>}

function QuickSupplierRateModal({booking,tourName,saving,onClose,onSubmit}:any){
  return <div className="gva-modal-bg"><form className="gva-modal" onSubmit={onSubmit}>
    <div className="gva-modal-head"><div><h3>+ Nhà cung cấp & giá net</h3><div className="gva-mini">{booking.booking_code||"Booking"} · {tourName}</div></div><button type="button" className="gva-close" onClick={onClose}>✕</button></div>
    <div style={{padding:"10px 12px",background:"#f6f8fb",borderRadius:10,fontSize:13,lineHeight:1.5,marginBottom:12}}><b>Lưu 1 lần:</b> NCC + giá net sẽ được lưu dùng cho các booking sau và gán luôn cho booking này.</div>
    <div className="gva-form-grid">
      <F label="Tên nhà cung cấp" wide><input className="gva-input" name="name" required autoFocus placeholder="VD: Ms Trinh / S-Tour"/></F>
      <F label="Giá net người lớn"><input className="gva-input" name="adult_net_vnd" inputMode="numeric" required placeholder="530000"/></F>
      <F label="Giá net trẻ em"><input className="gva-input" name="child_net_vnd" inputMode="numeric" placeholder="0 nếu chưa có"/></F>
      <F label="Flat fee / booking"><input className="gva-input" name="flat_fee_vnd" inputMode="numeric" placeholder="0"/></F>
      <F label="Người liên hệ"><input className="gva-input" name="contact_name"/></F>
      <F label="WhatsApp / Phone"><input className="gva-input" name="whatsapp" inputMode="tel"/></F>
      <F label="Khu vực"><input className="gva-input" name="service_area" placeholder="Da Nang / Hoi An"/></F>
      <F label="Số ngày công nợ"><input className="gva-input" type="number" min="0" name="payment_terms_days" defaultValue="0"/></F>
      <F label="Ghi chú" wide><textarea className="gva-input" name="notes" rows={2} placeholder="Điều kiện giá / trẻ em / phụ thu..."/></F>
    </div>
    <div className="gvs-op-modal-actions"><button type="button" className="gva-btn secondary" onClick={onClose}>Hủy</button><button className="gva-btn" disabled={saving}>{saving?"Đang lưu…":"Lưu NCC + giá + gán booking"}</button></div>
  </form></div>
}

function OperatorModal({saving,onClose,onSubmit}:any){
  return <div className="gva-modal-bg"><form className="gva-modal" onSubmit={onSubmit}>
    <div className="gva-modal-head"><div><h3>Thêm nhà tổ chức tour ghép</h3><div className="gva-mini">Chỉ setup một lần, sau đó dùng cho mọi booking.</div></div><button type="button" className="gva-close" onClick={onClose}>✕</button></div>
    <div className="gva-form-grid">
      <F label="Tên Operator"><input className="gva-input" name="name" required placeholder="Ví dụ: ABC Travel"/></F>
      <F label="Người liên hệ"><input className="gva-input" name="contact_name"/></F>
      <F label="Phone"><input className="gva-input" name="phone"/></F>
      <F label="WhatsApp"><input className="gva-input" name="whatsapp"/></F>
      <F label="Khu vực"><input className="gva-input" name="service_area" placeholder="Da Nang / Hoi An"/></F>
      <F label="Thanh toán sau tour (ngày)"><input className="gva-input" name="payment_terms_days" type="number" min="0" defaultValue="0"/></F>
      <F label="Settlement mode"><select className="gva-select" name="settlement_mode"><option value="after_tour">Sau tour</option><option value="daily">Cuối ngày</option><option value="weekly">Cuối tuần</option><option value="monthly">Cuối tháng</option></select></F>
    </div>
    <div className="gvs-op-modal-actions"><button type="button" className="gva-btn secondary" onClick={onClose}>Hủy</button><button className="gva-btn" disabled={saving}>{saving?"Đang lưu…":"Lưu Operator"}</button></div>
  </form></div>;
}

function RateModal({saving,suppliers,tours,onClose,onSubmit}:any){
  return <div className="gva-modal-bg"><form className="gva-modal" onSubmit={onSubmit}>
    <div className="gva-modal-head"><div><h3>Thêm giá net tour ghép</h3><div className="gva-mini">Giá này là giá GoVietStay phải trả nhà tổ chức.</div></div><button type="button" className="gva-close" onClick={onClose}>✕</button></div>
    <div className="gva-form-grid">
      <F label="Operator"><select className="gva-select" name="supplier_id" required><option value="">Chọn Operator</option>{suppliers.map((s:any)=><option key={s.id} value={s.id}>{s.name}</option>)}</select></F>
      <F label="Tour"><select className="gva-select" name="tour_id" required><option value="">Chọn tour</option>{tours.map((t:any)=><option key={t.id} value={t.id}>{t.name}</option>)}</select></F>
      <F label="Adult net / pax"><input className="gva-input" name="adult_net_vnd" inputMode="numeric" required placeholder="1200000"/></F>
      <F label="Child net / pax"><input className="gva-input" name="child_net_vnd" inputMode="numeric" defaultValue="0"/></F>
      <F label="Flat fee / booking"><input className="gva-input" name="flat_fee_vnd" inputMode="numeric" defaultValue="0"/></F>
      <F label="Có hiệu lực từ"><input className="gva-input" type="date" name="valid_from" defaultValue={isoToday()} required/></F>
      <F label="Có hiệu lực đến"><input className="gva-input" type="date" name="valid_to"/></F>
      <F label="Notes" wide><textarea className="gva-input" name="notes" rows={3} placeholder="Phụ thu lễ/Tết hoặc điều kiện đặc biệt"/></F>
    </div>
    <div className="gvs-op-modal-actions"><button type="button" className="gva-btn secondary" onClick={onClose}>Hủy</button><button className="gva-btn" disabled={saving}>{saving?"Đang lưu…":"Lưu giá net"}</button></div>
  </form></div>;
}

function SettlementModal({row,saving,onClose,onSubmit}:any){
  return <div className="gva-modal-bg"><form className="gva-modal" onSubmit={onSubmit}>
    <div className="gva-modal-head"><div><h3>Settlement · {row.supplier_name}</h3><div className="gva-mini">Còn nợ hiện tại: {money(row.outstanding_vnd)}</div></div><button type="button" className="gva-close" onClick={onClose}>✕</button></div>
    <div className="gva-form-grid">
      <F label="Thanh toán các tour đến ngày"><input className="gva-input" name="through_date" type="date" defaultValue={isoToday()} required/></F>
      <F label="Payment method"><select className="gva-select" name="payment_method"><option>VietQR</option><option>Bank Transfer</option><option>Cash</option><option>Other</option></select></F>
      <F label="Reference"><input className="gva-input" name="reference" placeholder="Mã giao dịch / nội dung CK"/></F>
      <F label="Notes" wide><textarea className="gva-input" name="notes" rows={3}/></F>
    </div>
    <div className="gvs-op-settle-note">Hệ thống sẽ tự chọn toàn bộ payable đang mở của Operator có tour date ≤ ngày trên và ghi payment cho từng booking.</div>
    <div className="gvs-op-modal-actions"><button type="button" className="gva-btn secondary" onClick={onClose}>Hủy</button><button className="gva-btn" disabled={saving}>{saving?"Đang settlement…":"Xác nhận đã thanh toán"}</button></div>
  </form></div>;
}
