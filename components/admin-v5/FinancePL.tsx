"use client";

import { useEffect, useMemo, useState } from "react";
import "./finance-pl.css";

type Props = { supabase:any };

type Summary = {
  month_start?:string;
  month_end?:string;
  bookings_completed?:number;
  pax_completed?:number;
  revenue_vnd?:number;
  direct_costs_vnd?:number;
  gross_profit_vnd?:number;
  gross_margin_pct?:number;
  opex_vnd?:number;
  net_profit_vnd?:number;
  net_margin_pct?:number;
  missing_finance_count?:number;
  bookings_all?:number;
  booked_revenue_vnd?:number;
  amount_received_vnd?:number;
  receivable_vnd?:number;
  committed_direct_cost_vnd?:number;
  direct_cost_paid_vnd?:number;
  direct_cost_payable_vnd?:number;
};

type Breakdown = {
  label:string;
  bookings:number;
  pax:number;
  revenue_vnd:number;
  direct_costs_vnd:number;
  gross_profit_vnd:number;
  margin_pct:number;
};

type BookingRow = {
  booking_id:string;
  booking_code:string|null;
  tour_date:string|null;
  status:string|null;
  guest_name:string|null;
  product:string|null;
  destination:string|null;
  source:string|null;
  partner:string|null;
  pax:number;
  gross_revenue_vnd:number;
  discount_vnd:number;
  revenue_vnd:number;
  amount_received_vnd:number;
  balance_vnd:number;
  supplier_cost_vnd:number;
  guide_cost_vnd:number;
  driver_cost_vnd:number;
  tickets_cost_vnd:number;
  meals_cost_vnd:number;
  boat_cost_vnd:number;
  hotel_cost_vnd:number;
  partner_commission_vnd:number;
  payment_fee_vnd:number;
  refund_recovery_vnd:number;
  other_cost_vnd:number;
  total_direct_cost_vnd:number;
  direct_cost_paid_vnd:number;
  direct_cost_payable_vnd:number;
  gross_profit_vnd:number;
  margin_pct:number;
  finance_record:boolean;
  recognized:boolean;
  finance_notes:string|null;
};

type Expense = {
  id:string;
  expense_date:string;
  category:string;
  description:string;
  amount_vnd:number;
  payment_method:string|null;
  notes:string|null;
};

function money(v:any){
  return new Intl.NumberFormat("vi-VN").format(Number(v||0))+" ₫";
}
function numberInput(v:any){ return String(Math.max(0,Number(v||0))); }
function parseMoney(v:any){ return Math.max(0,Number(String(v||"0").replace(/[^0-9]/g,""))||0); }
function monthNow(){
  const d=new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
}
function monthBounds(month:string){
  const [y,m]=month.split("-").map(Number);
  const start=`${y}-${String(m).padStart(2,"0")}-01`;
  const n=new Date(y,m,1);
  const end=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-01`;
  return {start,end};
}
function monthLabel(month:string){
  const [y,m]=month.split("-").map(Number);
  return new Intl.DateTimeFormat("en",{month:"long",year:"numeric"}).format(new Date(y,m-1,1));
}
function statusClass(row:BookingRow){
  if(row.recognized) return "actual";
  if(String(row.status||"").toLowerCase().includes("cancel")) return "cancel";
  return "forecast";
}

export default function FinancePL({supabase}:Props){
  const [month,setMonth]=useState(monthNow());
  const [summary,setSummary]=useState<Summary>({});
  const [breakdowns,setBreakdowns]=useState<Record<string,Breakdown[]>>({destination:[],product:[],source:[],partner:[]});
  const [bookings,setBookings]=useState<BookingRow[]>([]);
  const [expenses,setExpenses]=useState<Expense[]>([]);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState("");
  const [message,setMessage]=useState("");
  const [editBooking,setEditBooking]=useState<BookingRow|null>(null);
  const [expenseOpen,setExpenseOpen]=useState(false);

  async function load(){
    setLoading(true); setError("");
    try{
      const pMonth=month+"-01";
      const {start,end}=monthBounds(month);
      const dims=["destination","product","source","partner"];
      const results=await Promise.all([
        supabase.rpc("admin_monthly_pl",{p_month:pMonth}),
        ...dims.map(x=>supabase.rpc("admin_monthly_pl_breakdown",{p_month:pMonth,p_dimension:x})),
        supabase.rpc("admin_monthly_pl_bookings",{p_month:pMonth}),
        supabase.from("monthly_operating_expenses")
          .select("id,expense_date,category,description,amount_vnd,payment_method,notes")
          .gte("expense_date",start).lt("expense_date",end)
          .order("expense_date",{ascending:false}).order("created_at",{ascending:false})
      ]);
      for(const r of results) if(r.error) throw r.error;
      setSummary((results[0].data||{}) as Summary);
      const next:Record<string,Breakdown[]>={destination:[],product:[],source:[],partner:[]};
      dims.forEach((d,i)=>next[d]=(results[i+1].data||[]) as Breakdown[]);
      setBreakdowns(next);
      setBookings((results[5].data||[]) as BookingRow[]);
      setExpenses((results[6].data||[]) as Expense[]);
    }catch(e:any){
      setError(e?.message||"Không tải được P&L tháng.");
    }finally{setLoading(false)}
  }

  useEffect(()=>{load();},[month]);

  const actualRows=useMemo(()=>bookings.filter(x=>x.recognized),[bookings]);
  const pendingRows=useMemo(()=>bookings.filter(x=>!x.recognized),[bookings]);
  const bestProduct=breakdowns.product?.[0];
  const lowestMargin=useMemo(()=>{
    return [...(breakdowns.product||[])].filter(x=>Number(x.revenue_vnd)>0).sort((a,b)=>Number(a.margin_pct)-Number(b.margin_pct))[0];
  },[breakdowns.product]);

  async function saveBookingFinance(e:any){
    e.preventDefault();
    if(!editBooking) return;
    setSaving(true); setError(""); setMessage("");
    try{
      const f=new FormData(e.currentTarget);
      const vals=Object.fromEntries(f.entries()) as any;
      const gross=parseMoney(vals.gross_revenue_vnd);
      const discount=parseMoney(vals.discount_vnd);
      const payload={
        booking_id:editBooking.booking_id,
        amount_received_vnd:parseMoney(vals.amount_received_vnd),
        supplier_cost_vnd:parseMoney(vals.supplier_cost_vnd),
        guide_cost_vnd:parseMoney(vals.guide_cost_vnd),
        driver_cost_vnd:parseMoney(vals.driver_cost_vnd),
        tickets_cost_vnd:parseMoney(vals.tickets_cost_vnd),
        meals_cost_vnd:parseMoney(vals.meals_cost_vnd),
        boat_cost_vnd:parseMoney(vals.boat_cost_vnd),
        hotel_cost_vnd:parseMoney(vals.hotel_cost_vnd),
        partner_commission_vnd:parseMoney(vals.partner_commission_vnd),
        payment_fee_vnd:parseMoney(vals.payment_fee_vnd),
        refund_recovery_vnd:parseMoney(vals.refund_recovery_vnd),
        other_cost_vnd:parseMoney(vals.other_cost_vnd),
        direct_cost_paid_vnd:parseMoney(vals.direct_cost_paid_vnd),
        notes:String(vals.notes||"").trim()||null
      };
      const [b,fres]=await Promise.all([
        supabase.from("bookings").update({gross_revenue_vnd:gross,discount_vnd:discount}).eq("id",editBooking.booking_id),
        supabase.from("booking_financials").upsert(payload,{onConflict:"booking_id"})
      ]);
      if(b.error) throw b.error;
      if(fres.error) throw fres.error;
      setEditBooking(null);
      setMessage("Đã cập nhật P&L booking.");
      await load();
    }catch(e:any){setError(e?.message||"Không lưu được P&L booking.");}
    finally{setSaving(false)}
  }

  async function addExpense(e:any){
    e.preventDefault(); setSaving(true); setError(""); setMessage("");
    try{
      const f=new FormData(e.currentTarget);
      const vals=Object.fromEntries(f.entries()) as any;
      const {error}=await supabase.from("monthly_operating_expenses").insert({
        expense_date:vals.expense_date,
        category:vals.category||"other",
        description:String(vals.description||"").trim(),
        amount_vnd:parseMoney(vals.amount_vnd),
        payment_method:String(vals.payment_method||"").trim()||null,
        notes:String(vals.notes||"").trim()||null
      });
      if(error) throw error;
      setExpenseOpen(false); setMessage("Đã thêm chi phí vận hành."); await load();
    }catch(e:any){setError(e?.message||"Không thêm được chi phí.");}
    finally{setSaving(false)}
  }

  async function removeExpense(id:string){
    if(!window.confirm("Xóa khoản chi phí này?")) return;
    setError(""); setMessage("");
    const {error}=await supabase.from("monthly_operating_expenses").delete().eq("id",id);
    if(error) setError(error.message); else {setMessage("Đã xóa chi phí."); await load();}
  }

  return <div className="gvs-finance">
    <div className="gvs-finance-head">
      <div>
        <h2>Monthly P&amp;L · {monthLabel(month)}</h2>
        <p>Doanh thu thực tế chỉ ghi nhận booking <b>COMPLETED/CLOSED</b>. Booking đã xác nhận nhưng chưa đi tour được giữ ở phần Forecast.</p>
      </div>
      <div className="gvs-finance-head-actions">
        <input className="gva-input" type="month" value={month} onChange={e=>setMonth(e.target.value)} />
        <button className="gva-btn secondary" onClick={load} disabled={loading}>{loading?"Đang tải…":"Làm mới"}</button>
        <button className="gva-btn" onClick={()=>setExpenseOpen(true)}>+ OPEX</button>
      </div>
    </div>

    {error&&<div className="gva-msg err">{error}</div>}
    {message&&<div className="gva-msg">{message}</div>}

    <div className="gvs-pl-kpis">
      <PLCard label="Revenue" value={money(summary.revenue_vnd)} hint={`${summary.bookings_completed||0} completed bookings · ${summary.pax_completed||0} pax`} />
      <PLCard label="Direct Cost" value={money(summary.direct_costs_vnd)} hint="Supplier + guide + driver + tickets + meals + commissions…" />
      <PLCard label="Gross Profit" value={money(summary.gross_profit_vnd)} hint={`Gross margin ${Number(summary.gross_margin_pct||0).toFixed(1)}%`} tone={(summary.gross_profit_vnd||0)>=0?"good":"bad"} />
      <PLCard label="Operating Expenses" value={money(summary.opex_vnd)} hint="Salary / Ads / Office / Software / Other" />
      <PLCard label="Net Operating Profit" value={money(summary.net_profit_vnd)} hint={`Net margin ${Number(summary.net_margin_pct||0).toFixed(1)}%`} tone={(summary.net_profit_vnd||0)>=0?"good":"bad"} strong />
    </div>

    <div className="gvs-finance-note">
      <b>Actual P&amp;L:</b> Revenue − Direct Cost = Gross Profit; Gross Profit − OPEX = Net Operating Profit.
      {(summary.missing_finance_count||0)>0&&<span className="warn"> ⚠ {summary.missing_finance_count} completed booking chưa có finance record; lợi nhuận có thể đang bị tính cao.</span>}
    </div>

    <div className="gvs-finance-balance-grid">
      <MiniStat label="Booked revenue" value={money(summary.booked_revenue_vnd)} hint={`${summary.bookings_all||0} bookings trong tháng`} />
      <MiniStat label="Received on these bookings" value={money(summary.amount_received_vnd)} hint="Số đã thu lũy kế của booking tháng này" />
      <MiniStat label="Receivable" value={money(summary.receivable_vnd)} hint="Khách còn phải trả" />
      <MiniStat label="Direct cost committed" value={money(summary.committed_direct_cost_vnd)} hint="Chi phí đã nhập" />
      <MiniStat label="Direct cost paid" value={money(summary.direct_cost_paid_vnd)} hint="Đã thanh toán" />
      <MiniStat label="Direct cost payable" value={money(summary.direct_cost_payable_vnd)} hint="Còn phải trả" />
    </div>

    <div className="gvs-finance-insights">
      <div className="gva-card"><div className="gvs-label">Most profitable product</div><div className="gvs-insight-main">{bestProduct?.label||"—"}</div><div className="gva-mini">{bestProduct?`${money(bestProduct.gross_profit_vnd)} profit · ${Number(bestProduct.margin_pct||0).toFixed(1)}% margin`:"Chưa có completed booking"}</div></div>
      <div className="gva-card"><div className="gvs-label">Lowest product margin</div><div className="gvs-insight-main">{lowestMargin?.label||"—"}</div><div className="gva-mini">{lowestMargin?`${Number(lowestMargin.margin_pct||0).toFixed(1)}% · ${money(lowestMargin.gross_profit_vnd)} profit`:"Chưa có dữ liệu"}</div></div>
      <div className="gva-card"><div className="gvs-label">Forecast not recognized</div><div className="gvs-insight-main">{pendingRows.length} bookings</div><div className="gva-mini">Chưa vào Actual P&amp;L cho tới khi COMPLETED/CLOSED</div></div>
    </div>

    <div className="gvs-finance-grid2">
      <BreakdownCard title="By Destination" rows={breakdowns.destination}/>
      <BreakdownCard title="By Product" rows={breakdowns.product}/>
      <BreakdownCard title="By Source" rows={breakdowns.source}/>
      <BreakdownCard title="By Partner" rows={breakdowns.partner}/>
    </div>

    <div className="gva-card gvs-finance-section">
      <div className="gva-section-head">
        <div><h2>Booking Economics</h2><div className="gva-mini">Bấm Edit để nhập tiền đã thu và toàn bộ direct cost của từng booking.</div></div>
      </div>
      <div className="gvs-finance-bookings">
        {bookings.map(row=><div className="gvs-booking-row" key={row.booking_id}>
          <div className="gvs-booking-top">
            <div>
              <div className="gvs-booking-code">{row.booking_code||"Booking"} <span className={`gvs-state ${statusClass(row)}`}>{row.recognized?"ACTUAL":"FORECAST"}</span></div>
              <div className="gvs-booking-name">{row.product||"—"}</div>
              <div className="gva-mini">{row.tour_date||"—"} · {row.guest_name||"—"} · {row.pax||0} pax · {row.destination||"—"}</div>
            </div>
            <button className="gva-btn secondary" onClick={()=>setEditBooking(row)}>Edit P&amp;L</button>
          </div>
          <div className="gvs-booking-numbers">
            <span><small>Revenue</small><b>{money(row.revenue_vnd)}</b></span>
            <span><small>Direct cost</small><b>{money(row.total_direct_cost_vnd)}</b></span>
            <span><small>Profit</small><b className={row.gross_profit_vnd>=0?"positive":"negative"}>{money(row.gross_profit_vnd)}</b></span>
            <span><small>Margin</small><b>{Number(row.margin_pct||0).toFixed(1)}%</b></span>
            <span><small>Balance</small><b>{money(row.balance_vnd)}</b></span>
            <span><small>Cost payable</small><b>{money(row.direct_cost_payable_vnd)}</b></span>
          </div>
          {!row.finance_record&&<div className="gvs-row-warning">⚠ Chưa nhập finance record cho booking này.</div>}
        </div>)}
        {!bookings.length&&<div className="gva-empty">Không có booking trong tháng này.</div>}
      </div>
    </div>

    <div className="gva-card gvs-finance-section">
      <div className="gva-section-head">
        <div><h2>Operating Expenses (OPEX)</h2><div className="gva-mini">Chi phí công ty không gắn riêng với một booking.</div></div>
        <button className="gva-btn" onClick={()=>setExpenseOpen(true)}>+ Thêm chi phí</button>
      </div>
      <div className="gva-table-wrap"><table className="gva-table">
        <thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th><th></th></tr></thead>
        <tbody>
          {expenses.map(x=><tr key={x.id}><td>{x.expense_date}</td><td><span className="gva-pill">{expenseLabel(x.category)}</span></td><td><b>{x.description}</b>{x.notes&&<div className="gva-mini">{x.notes}</div>}</td><td><b>{money(x.amount_vnd)}</b></td><td><button className="gvs-link-danger" onClick={()=>removeExpense(x.id)}>Xóa</button></td></tr>)}
          {!expenses.length&&<tr><td colSpan={5}><div className="gva-empty">Chưa có OPEX trong tháng này.</div></td></tr>}
        </tbody>
      </table></div>
    </div>

    {editBooking&&<FinanceModal row={editBooking} saving={saving} onClose={()=>setEditBooking(null)} onSubmit={saveBookingFinance}/>}    
    {expenseOpen&&<ExpenseModal month={month} saving={saving} onClose={()=>setExpenseOpen(false)} onSubmit={addExpense}/>}    
  </div>;
}

function PLCard({label,value,hint,tone,strong}:any){
  return <div className={`gva-card gvs-pl-card ${tone||""} ${strong?"strong":""}`}><div className="gvs-label">{label}</div><div className="gvs-pl-value">{value}</div><div className="gva-mini">{hint}</div></div>;
}
function MiniStat({label,value,hint}:any){return <div className="gva-card gvs-mini-stat"><div className="gvs-label">{label}</div><b>{value}</b><div className="gva-mini">{hint}</div></div>}
function BreakdownCard({title,rows}:any){
  return <div className="gva-card"><h3>{title}</h3><div className="gva-table-wrap"><table className="gva-table">
    <thead><tr><th>Name</th><th>Bookings</th><th>Revenue</th><th>Profit</th><th>Margin</th></tr></thead>
    <tbody>{(rows||[]).slice(0,15).map((r:Breakdown)=><tr key={r.label}><td><b>{r.label}</b></td><td>{r.bookings}</td><td>{money(r.revenue_vnd)}</td><td><b>{money(r.gross_profit_vnd)}</b></td><td>{Number(r.margin_pct||0).toFixed(1)}%</td></tr>)}
    {!(rows||[]).length&&<tr><td colSpan={5}><div className="gva-empty">Chưa có completed booking.</div></td></tr>}</tbody>
  </table></div></div>;
}
function expenseLabel(v:string){
  const m:Record<string,string>={salary:"Salary",ads:"Marketing / Ads",office:"Office / Desk",software:"Software",phone_internet:"Phone / Internet",transport:"Transport",content:"Content / Design",bank_fee:"Bank / Payment",other:"Other"};
  return m[v]||v||"Other";
}
function Field({label,children,wide}:any){return <div className={`gva-field ${wide?"wide":""}`}><label>{label}</label>{children}</div>}
function MoneyField({name,label,value}:any){return <Field label={label}><input className="gva-input" name={name} inputMode="numeric" defaultValue={numberInput(value)} /></Field>}

function FinanceModal({row,saving,onClose,onSubmit}:any){
  return <div className="gva-modal-bg"><form className="gva-modal gvs-finance-modal" onSubmit={onSubmit}>
    <div className="gva-modal-head"><div><h3>P&amp;L · {row.booking_code||"Booking"}</h3><div className="gva-mini">{row.product} · {row.tour_date} · {row.guest_name||"—"}</div></div><button type="button" className="gva-close" onClick={onClose}>✕</button></div>
    <div className="gvs-finance-note compact">Không nhập trùng chi phí. Ví dụ supplier package đã bao gồm vé/meal thì không nhập lại vé/meal lần nữa.</div>
    <div className="gva-form-grid">
      <MoneyField name="gross_revenue_vnd" label="Gross selling price" value={row.gross_revenue_vnd}/>
      <MoneyField name="discount_vnd" label="Discount" value={row.discount_vnd}/>
      <MoneyField name="amount_received_vnd" label="Amount received" value={row.amount_received_vnd}/>
      <MoneyField name="direct_cost_paid_vnd" label="Direct cost already paid" value={row.direct_cost_paid_vnd}/>
      <MoneyField name="supplier_cost_vnd" label="Supplier / operator" value={row.supplier_cost_vnd}/>
      <MoneyField name="guide_cost_vnd" label="Guide" value={row.guide_cost_vnd}/>
      <MoneyField name="driver_cost_vnd" label="Driver / vehicle" value={row.driver_cost_vnd}/>
      <MoneyField name="tickets_cost_vnd" label="Tickets" value={row.tickets_cost_vnd}/>
      <MoneyField name="meals_cost_vnd" label="Meals" value={row.meals_cost_vnd}/>
      <MoneyField name="boat_cost_vnd" label="Boat / cruise" value={row.boat_cost_vnd}/>
      <MoneyField name="hotel_cost_vnd" label="Hotel / room" value={row.hotel_cost_vnd}/>
      <MoneyField name="partner_commission_vnd" label="Partner / sales commission" value={row.partner_commission_vnd}/>
      <MoneyField name="payment_fee_vnd" label="Payment / platform fee" value={row.payment_fee_vnd}/>
      <MoneyField name="refund_recovery_vnd" label="Refund / service recovery" value={row.refund_recovery_vnd}/>
      <MoneyField name="other_cost_vnd" label="Other direct cost" value={row.other_cost_vnd}/>
      <Field label="Finance notes" wide><textarea className="gva-input" name="notes" rows={3} defaultValue={row.finance_notes||""}/></Field>
    </div>
    <div className="gvs-modal-summary"><span>Current revenue <b>{money(row.revenue_vnd)}</b></span><span>Direct cost <b>{money(row.total_direct_cost_vnd)}</b></span><span>Profit <b>{money(row.gross_profit_vnd)}</b></span></div>
    <div className="gvs-modal-actions"><button type="button" className="gva-btn secondary" onClick={onClose}>Hủy</button><button className="gva-btn" disabled={saving}>{saving?"Đang lưu…":"Lưu P&L"}</button></div>
  </form></div>;
}

function ExpenseModal({month,saving,onClose,onSubmit}:any){
  const today=month===monthNow()?new Date().toISOString().slice(0,10):month+"-01";
  return <div className="gva-modal-bg"><form className="gva-modal" onSubmit={onSubmit}>
    <div className="gva-modal-head"><h3>Thêm Operating Expense</h3><button type="button" className="gva-close" onClick={onClose}>✕</button></div>
    <div className="gva-form-grid">
      <Field label="Date"><input className="gva-input" name="expense_date" type="date" defaultValue={today} required/></Field>
      <Field label="Category"><select className="gva-select" name="category" defaultValue="other"><option value="salary">Salary</option><option value="ads">Marketing / Ads</option><option value="office">Office / Desk</option><option value="software">Software</option><option value="phone_internet">Phone / Internet</option><option value="transport">Transport</option><option value="content">Content / Design</option><option value="bank_fee">Bank / Payment</option><option value="other">Other</option></select></Field>
      <Field label="Description"><input className="gva-input" name="description" required placeholder="Ví dụ: Facebook Ads September"/></Field>
      <Field label="Amount VND"><input className="gva-input" name="amount_vnd" inputMode="numeric" required placeholder="5000000"/></Field>
      <Field label="Payment method"><input className="gva-input" name="payment_method" placeholder="Cash / VietQR / Card"/></Field>
      <Field label="Notes" wide><textarea className="gva-input" name="notes" rows={3}/></Field>
    </div>
    <div className="gvs-modal-actions"><button type="button" className="gva-btn secondary" onClick={onClose}>Hủy</button><button className="gva-btn" disabled={saving}>{saving?"Đang lưu…":"Lưu chi phí"}</button></div>
  </form></div>;
}
