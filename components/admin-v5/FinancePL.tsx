"use client";
// GVS-FINANCE-ONE-CLICK-FINALIZE-V1

import { Fragment, useEffect, useMemo, useState } from "react";
import "./finance-pl.css";
import {downloadFinanceXlsx} from "./finance-xlsx";
import type {FinanceSheet} from "./finance-xlsx";

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
  finance_finalized:boolean;
};

type PackageRevenueTarget = {
  id:string;
  booking_code:string|null;
  tour_date:string|null;
  net_revenue_vnd:number;
  status:string;
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
type CancellationSummary = {count:number;supplier_fees_vnd:number;recovered_vnd:number;net_loss_vnd:number;paid_vnd:number;payable_vnd:number};
type CancellationRow = {booking_id:string;cancelled_at:string;reason:string;supplier_fee_vnd:number;customer_fee_due_vnd:number;customer_recovery_vnd:number;fee_paid_vnd:number;bookings?:{booking_code:string;custom_tour_name:string|null;pax:number}|null};

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
function isFinanceClosed(row:BookingRow){return ["completed","closed"].includes(String(row.status||"").toLowerCase())&&row.finance_finalized;}
function localTodayVN(){return new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Ho_Chi_Minh",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());}
function pastThreeDays(date:string|null){
 if(!date)return false;
 const today=Date.parse(localTodayVN()+"T00:00:00Z"),tour=Date.parse(date+"T00:00:00Z");
 return Number.isFinite(tour)&&today-tour>3*86400000;
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
  const [depositsByBooking,setDepositsByBooking]=useState<Record<string,{received:number;pending:number;ledgerReceived:number}>>({});
  const [bookingView,setBookingView]=useState<"active"|"archive"|"reconcile"|"all">("active");
  const [adminHiddenIds,setAdminHiddenIds]=useState<string[]>([]);
  const [canOverride,setCanOverride]=useState(false);
  const [expenses,setExpenses]=useState<Expense[]>([]);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [exporting,setExporting]=useState(false);
  const [error,setError]=useState("");
  const [message,setMessage]=useState("");
  const [closeFeedback,setCloseFeedback]=useState<{id:string;text:string;failed:boolean}|null>(null);
  const [editBooking,setEditBooking]=useState<BookingRow|null>(null);
  const [expenseOpen,setExpenseOpen]=useState(false);
  const [payablesOpen,setPayablesOpen]=useState(false);
  const [cancelBooking,setCancelBooking]=useState<BookingRow|null>(null);
  const [zeroBooking,setZeroBooking]=useState<BookingRow|null>(null);
  const [zeroTargets,setZeroTargets]=useState<PackageRevenueTarget[]>([]);
  const [zeroRevenueSource,setZeroRevenueSource]=useState("");
  const [cancellationSummary,setCancellationSummary]=useState<CancellationSummary>({count:0,supplier_fees_vnd:0,recovered_vnd:0,net_loss_vnd:0,paid_vnd:0,payable_vnd:0});
  const [cancellations,setCancellations]=useState<CancellationRow[]>([]);
  const cancellationRevenue=Number(cancellationSummary.recovered_vnd||0);
  const cancellationCost=Number(cancellationSummary.supplier_fees_vnd||0);
  const cancellationProfit=cancellationRevenue-cancellationCost;
  const totalActualRevenue=Number(summary.revenue_vnd||0)+cancellationRevenue;
  const totalDirectCosts=Number(summary.direct_costs_vnd||0)+cancellationCost;
  const totalGrossProfit=totalActualRevenue-totalDirectCosts;
  const totalNetProfit=totalGrossProfit-Number(summary.opex_vnd||0);

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
          .order("expense_date",{ascending:false}).order("created_at",{ascending:false}),
        supabase.rpc("admin_monthly_cancellation_summary",{p_month:pMonth}),
        supabase.from("booking_cancellations").select("booking_id,cancelled_at,reason,supplier_fee_vnd,customer_fee_due_vnd,customer_recovery_vnd,fee_paid_vnd,bookings(booking_code,custom_tour_name,pax)")
          .gte("cancelled_at",start).lt("cancelled_at",end).order("cancelled_at",{ascending:false})
      ]);
      for(const r of results) if(r.error) throw r.error;
      setSummary((results[0].data||{}) as Summary);
      const next:Record<string,Breakdown[]>={destination:[],product:[],source:[],partner:[]};
      dims.forEach((d,i)=>next[d]=(results[i+1].data||[]) as Breakdown[]);
      setBreakdowns(next);
      const bookingRows=(results[5].data||[]) as BookingRow[];
       setBookings(bookingRows);
       // Deposit is read from payments and never re-created in P&L.
       const nextDeposits:Record<string,{received:number;pending:number;ledgerReceived:number}>={};
       const ids=bookingRows.map(row=>row.booking_id);
       for(let offset=0;offset<ids.length;offset+=100){
         const {data:paymentRows,error:paymentError}=await supabase.from("payments")
           .select("booking_id,amount_vnd,status,payment_type")
           .in("booking_id",ids.slice(offset,offset+100));
         if(paymentError)throw paymentError;
         for(const p of paymentRows||[]){
           const entry=nextDeposits[p.booking_id]||(nextDeposits[p.booking_id]={received:0,pending:0,ledgerReceived:0});
           if(p.status==="received"){
             const signed=String(p.payment_type)==="refund"?-1:1;
             entry.ledgerReceived+=signed*Number(p.amount_vnd||0);
             if(p.payment_type==="deposit")entry.received+=Number(p.amount_vnd||0);
           }else if(p.status==="pending"&&p.payment_type==="deposit")entry.pending+=Number(p.amount_vnd||0);
         }
       }
       setDepositsByBooking(nextDeposits);
      const [hiddenResult,ownerResult]=await Promise.all([
        supabase.from("booking_financials").select("booking_id").not("admin_hidden_at","is",null),
        supabase.rpc("govietstay_can_admin_override")
      ]);
      if(hiddenResult.error)throw hiddenResult.error;
      if(ownerResult.error)throw ownerResult.error;
      setAdminHiddenIds((hiddenResult.data||[]).map((x:{booking_id:string})=>x.booking_id));
      setCanOverride(!!ownerResult.data);
      setExpenses((results[6].data||[]) as Expense[]);
      setCancellationSummary((results[7].data||{}) as CancellationSummary);
      setCancellations((results[8].data||[]) as CancellationRow[]);
    }catch(e:any){
      setError(e?.message||"Không tải được P&L tháng.");
    }finally{setLoading(false)}
  }

  useEffect(()=>{load();},[month]);

  const actualRows=useMemo(()=>bookings.filter(x=>x.recognized),[bookings]);
  const pendingRows=useMemo(()=>bookings.filter(x=>!x.recognized),[bookings]);
  const visibleBookings=useMemo(()=>{
    const archived=(b:BookingRow)=>adminHiddenIds.includes(b.booking_id)||pastThreeDays(b.tour_date)||(b.recognized&&b.finance_finalized);
    if(bookingView==="all")return bookings;
    if(bookingView==="archive")return bookings.filter(archived);
    if(bookingView==="reconcile")return bookings.filter(b=>Number(b.balance_vnd||0)>0||Number(b.direct_cost_payable_vnd||0)>0||(b.recognized&&!b.finance_finalized)||!b.finance_record);
    return bookings.filter(b=>!archived(b));
  },[bookings,bookingView,adminHiddenIds]);
  const bestProduct=breakdowns.product?.[0];
  const lowestMargin=useMemo(()=>{
    return [...(breakdowns.product||[])].filter(x=>Number(x.revenue_vnd)>0).sort((a,b)=>Number(a.margin_pct)-Number(b.margin_pct))[0];
  },[breakdowns.product]);

  async function exportExcel(){
    if(exporting||saving)return;
    setExporting(true);setError("");setMessage("");
    const exportMonth=month;
    const n=(v:any)=>Number(v||0);
    const sum=(rows:any[],key:string)=>rows.reduce((a,b)=>a+n(b[key]),0);
    const F=(formula:string,value:number)=>({formula,value});
    const range=(name:string,column:string,len:number)=>"'" + name + "'!"+column+"2:"+column+Math.max(2,len+1);
    const SUM=(name:string,column:string,len:number)=>"SUM("+range(name,column,len)+")";
    async function allRows(factory:()=>any):Promise<any[]>{
      const rows:any[]=[];
      for(let offset=0;;offset+=500){
        const {data,error}=await factory().range(offset,offset+499);
        if(error)throw error;
        const batch=data||[];
        rows.push(...batch);
        if(batch.length<500)return rows;
      }
    }
    try{
      const {start,end}=monthBounds(exportMonth);
      const pMonth=exportMonth+"-01";
      // Same monthly RPCs used by the on-screen report; include archived bookings.
      const sr=await supabase.rpc("admin_monthly_pl",{p_month:pMonth});
      if(sr.error)throw sr.error;
      const cs=await supabase.rpc("admin_monthly_cancellation_summary",{p_month:pMonth});
      if(cs.error)throw cs.error;
      const sm=sr.data||{}, cm=cs.data||{};
      const [bs,es,cc]=await Promise.all([
        allRows(()=>supabase.rpc("admin_monthly_pl_bookings",{p_month:pMonth}).order("booking_id")),
        allRows(()=>supabase.from("monthly_operating_expenses").select("id,expense_date,category,description,amount_vnd,payment_method,notes").gte("expense_date",start).lt("expense_date",end).order("id")),
        allRows(()=>supabase.from("booking_cancellations").select("booking_id,cancelled_at,reason,supplier_fee_vnd,customer_fee_due_vnd,customer_recovery_vnd,fee_paid_vnd,bookings(booking_code,custom_tour_name,pax)").gte("cancelled_at",start).lt("cancelled_at",end).order("booking_id"))
      ]);
      if(bs.length!==n(sm.bookings_all)||cc.length!==n(cm.count))throw new Error("Số booking chi tiết không khớp tổng hợp. Vui lòng làm mới P&L và thử lại.");
      const ids=Array.from(new Set([...bs,...cc].map(x=>x.booking_id)));
      const payments:any[]=[],fin:any[]=[];
      for(let i=0;i<ids.length;i+=100){
        const chunk=ids.slice(i,i+100);
        const [pr,fr]=await Promise.all([
          allRows(()=>supabase.from("payments").select("id,booking_id,amount_vnd,payment_type,status,method,paid_at,created_at,external_reference").in("booking_id",chunk).order("id")),
          allRows(()=>supabase.from("booking_financials").select("booking_id,revenue_recorded_in_booking_id,staff_commission_vnd").in("booking_id",chunk).order("booking_id"))
        ]);
        payments.push(...pr);fin.push(...fr);
      }
      const byId=new Map<string,any>(bs.map(b=>[b.booking_id,b]));
      const byFin=new Map<string,any>(fin.map(f=>[f.booking_id,f]));
      const cancelCode=new Map<string,string>(cc.map(c=>[c.booking_id,c.bookings?.booking_code||""]));
      const ledger=new Map<string,{deposit:number;received:number}>();
      for(const p of payments){
        if(p.status!=="received")continue;
        const e=ledger.get(p.booking_id)||{deposit:0,received:0};
        e.received+=(p.payment_type==="refund"?-1:1)*n(p.amount_vnd);
        if(p.payment_type==="deposit")e.deposit+=n(p.amount_vnd);
        ledger.set(p.booking_id,e);
      }
      const parentCode=(b:any)=>{
        const pid=byFin.get(b.booking_id)?.revenue_recorded_in_booking_id;
        return pid?(byId.get(pid)?.booking_code||"Ngoài tháng: "+pid):"";
      };
      const bRows:FinanceSheet["rows"]=[["Mã booking","Ngày tour","Khách","Tour","Điểm đến","Trạng thái tour","Actual (1/0)","Đã chốt","Pax","Giá bán gộp","Giảm giá","Doanh thu thuần","Cọc đã nhận","Payments thực nhận","P&L đã thu","Chênh lệch thu","Khách còn nợ","Direct cost (gồm HH nhân sự)","Đã trả NCC","Còn trả NCC","Lợi nhuận","Đối soát","Booking doanh thu gói","Nguồn","Đối tác","Ghi chú","Supplier","Guide","Driver","Tickets","Meals","Boat","Hotel","HH đối tác","Phí thanh toán","Refund recovery","Chi phí khác","HH nhân sự"]];
      const recRows:FinanceSheet["rows"]=[["Mã booking","Ngày tour","Khách","Doanh thu","Đã thu P&L","Còn phải thu","Chênh lệch Payments"]];
      const payRows:FinanceSheet["rows"]=[["Mã booking","Ngày tour","Loại giao dịch","Trạng thái","Hình thức","Số tiền","Thực nhận ròng","Ngày thanh toán","Ngày ghi nhận","Tham chiếu","ID giao dịch"]];
      const payableRows:FinanceSheet["rows"]=[["Mã booking","Ngày tour","Tour","Direct cost (gồm HH nhân sự)","Đã trả NCC","Còn trả NCC"]];
      for(const b of bs){
        const i=bRows.length+1, e=ledger.get(b.booking_id)||{deposit:0,received:0};
        const received=Math.max(0,e.received), diff=n(b.amount_received_vnd)-received;
        const status=diff!==0?"CHÊNH LỆCH":!b.finance_record?"THIẾU DỮ LIỆU":!b.finance_finalized?"CHƯA CHỐT":n(b.balance_vnd)>0||n(b.direct_cost_payable_vnd)>0?"CÒN CÔNG NỢ":"KHỚP";
        bRows.push([b.booking_code||b.booking_id,b.tour_date||"",b.guest_name||"",b.product||"",b.destination||"",b.status||"",b.recognized?1:0,b.finance_finalized?"Có":"Không",n(b.pax),n(b.gross_revenue_vnd),n(b.discount_vnd),n(b.revenue_vnd),e.deposit,received,n(b.amount_received_vnd),F("O"+i+"-N"+i,diff),F("MAX(0,L"+i+"-O"+i+")",n(b.balance_vnd)),n(b.total_direct_cost_vnd),n(b.direct_cost_paid_vnd),n(b.direct_cost_payable_vnd),F("L"+i+"-R"+i,n(b.gross_profit_vnd)),status,parentCode(b),b.source||"",b.partner||"",b.finance_notes||"",n(b.supplier_cost_vnd),n(b.guide_cost_vnd),n(b.driver_cost_vnd),n(b.tickets_cost_vnd),n(b.meals_cost_vnd),n(b.boat_cost_vnd),n(b.hotel_cost_vnd),n(b.partner_commission_vnd),n(b.payment_fee_vnd),n(b.refund_recovery_vnd),n(b.other_cost_vnd),n(byFin.get(b.booking_id)?.staff_commission_vnd)]);
        if(n(b.balance_vnd)>0||diff!==0)recRows.push([b.booking_code||b.booking_id,b.tour_date||"",b.guest_name||"",n(b.revenue_vnd),n(b.amount_received_vnd),n(b.balance_vnd),diff]);
        if(n(b.direct_cost_payable_vnd)>0)payableRows.push([b.booking_code||b.booking_id,b.tour_date||"",b.product||"",n(b.total_direct_cost_vnd),n(b.direct_cost_paid_vnd),n(b.direct_cost_payable_vnd)]);
      }
      for(const p of payments){
        const b=byId.get(p.booking_id);
        payRows.push([b?.booking_code||cancelCode.get(p.booking_id)||p.booking_id,b?.tour_date||"",p.payment_type||"",p.status||"",p.method||"",n(p.amount_vnd),p.status==="received"?(p.payment_type==="refund"?-1:1)*n(p.amount_vnd):0,p.paid_at||"",p.created_at||"",p.external_reference||"",p.id]);
      }
      const oRows:FinanceSheet["rows"]=[["Ngày","Nhóm chi phí","Nội dung","Số tiền","Hình thức","Ghi chú"]];
      for(const e of es)oRows.push([e.expense_date,e.category||"",e.description||"",n(e.amount_vnd),e.payment_method||"",e.notes||""]);
      oRows.push([exportMonth,"STAFF OPEX","Lương cơ bản + điều chỉnh hoa hồng + thưởng - khấu trừ",n(sm.staff_opex_vnd),"","Tổng hợp từ payroll; không cộng trùng direct cost"]);
      const cRows:FinanceSheet["rows"]=[["Mã booking","Ngày hủy","Tour","Lý do","Phí NCC","Phí khách phải trả","Phí đã thu","Đã trả NCC","Còn phải trả NCC","Lãi/lỗ phí hủy"]];
      for(const c of cc){
        const i=cRows.length+1;
        cRows.push([c.bookings?.booking_code||c.booking_id,c.cancelled_at,c.bookings?.custom_tour_name||"",c.reason||"",n(c.supplier_fee_vnd),n(c.customer_fee_due_vnd),n(c.customer_recovery_vnd),n(c.fee_paid_vnd),F("E"+i+"-H"+i,n(c.supplier_fee_vnd)-n(c.fee_paid_vnd)),F("G"+i+"-E"+i,n(c.customer_recovery_vnd)-n(c.supplier_fee_vnd))]);
      }
      const groups=new Map<string,any[]>();
      const parents=new Set(fin.filter(f=>f.revenue_recorded_in_booking_id).map(f=>f.revenue_recorded_in_booking_id));
      for(const b of bs){
        const pid=byFin.get(b.booking_id)?.revenue_recorded_in_booking_id;
        if(!pid&&!parents.has(b.booking_id))continue;
        const key=pid||b.booking_id; const group=groups.get(key)||[];group.push(b);groups.set(key,group);
      }
      const gRows:FinanceSheet["rows"]=[["Booking doanh thu gói","Khách","Số booking trong tháng","Doanh thu actual","Chi phí actual","Lợi nhuận actual","Ghi chú"]];
      for(const [id,rows] of groups){
        const a=rows.filter(b=>b.recognized), i=gRows.length+1, rev=sum(a,"revenue_vnd"), cost=sum(a,"total_direct_cost_vnd");
        gRows.push([byId.get(id)?.booking_code||id,rows[0]?.guest_name||"",rows.length,rev,cost,F("D"+i+"-E"+i,rev-cost),byId.has(id)?"Chỉ các ngày thuộc tháng xuất; không cộng lại vào Summary":"Booking doanh thu chính ngoài tháng; không phải tổng cả gói"]);
      }
      const actual=bs.filter(b=>b.recognized), ar=sum(actual,"revenue_vnd"), ac=sum(actual,"total_direct_cost_vnd"), cr=sum(cc,"customer_recovery_vnd"), cCost=sum(cc,"supplier_fee_vnd"), op=sum(es,"amount_vnd")+n(sm.staff_opex_vnd);
      const actualFormula=(column:string)=>"SUMIF("+range("02 Bookings","G",bs.length)+",1,"+range("02 Bookings",column,bs.length)+")";
      const summaryRows:FinanceSheet["rows"]=[["Chỉ tiêu (VND)","Tính từ Excel","P&L hệ thống","Chênh lệch","Ghi chú"]];
      function metric(label:string,formula:string,value:number,system:number,note=""){
        const i=summaryRows.length+1;
        summaryRows.push([label,F(formula,value),system,F("B"+i+"-C"+i,value-system),note]);
      }
      metric("Doanh thu tour actual",actualFormula("L"),ar,n(sm.revenue_vnd));
      metric("Phí hủy đã thu",SUM("07 Cancellations","G",cc.length),cr,n(cm.recovered_vnd));
      metric("Tổng doanh thu","B2+B3",ar+cr,n(sm.revenue_vnd)+n(cm.recovered_vnd));
      metric("Direct cost tour",actualFormula("R"),ac,n(sm.direct_costs_vnd));
      metric("Phí hủy NCC",SUM("07 Cancellations","E",cc.length),cCost,n(cm.supplier_fees_vnd));
      metric("Tổng direct cost","B5+B6",ac+cCost,n(sm.direct_costs_vnd)+n(cm.supplier_fees_vnd));
      metric("Gross profit","B4-B7",ar+cr-ac-cCost,n(sm.revenue_vnd)+n(cm.recovered_vnd)-n(sm.direct_costs_vnd)-n(cm.supplier_fees_vnd));
      metric("OPEX",SUM("06 OPEX","D",es.length+1),op,n(sm.opex_vnd),"Gồm chi phí nhập tay và staff OPEX");
      metric("Net operating profit","B8-B9",ar+cr-ac-cCost-op,n(sm.revenue_vnd)+n(cm.recovered_vnd)-n(sm.direct_costs_vnd)-n(cm.supplier_fees_vnd)-n(sm.opex_vnd));
      metric("Đã thu booking (lũy kế)",SUM("02 Bookings","O",bs.length),sum(bs,"amount_received_vnd"),n(sm.amount_received_vnd),"Không phải dòng tiền thu riêng trong tháng");
      metric("Khách còn phải thu",SUM("02 Bookings","Q",bs.length),sum(bs,"balance_vnd"),n(sm.receivable_vnd));
      metric("Còn trả NCC tour",SUM("02 Bookings","T",bs.length),sum(bs,"direct_cost_payable_vnd"),n(sm.direct_cost_payable_vnd));
      metric("Còn trả phí hủy NCC",SUM("07 Cancellations","I",cc.length),sum(cc,"supplier_fee_vnd")-sum(cc,"fee_paid_vnd"),n(cm.payable_vnd));
      summaryRows.push(["Kỳ báo cáo",exportMonth,"","","Theo ngày tour; hủy theo ngày hủy"],["Nguồn","GoVietStay Admin / P&L","","","https://govietstay.com/admin"],["Thời điểm xuất",new Date().toISOString(),"","","UTC"],["Phạm vi Payments","Giao dịch của booking thuộc kỳ","","","Bao gồm giao dịch trước/sau tháng; không phải báo cáo dòng tiền theo ngày thu"],["Booking chưa hoàn tất tài chính",n(sm.missing_finance_count),"","","Theo P&L hệ thống"],["Lưu ý","Chênh lệch cột D khác 0 cần kiểm tra","","","File đối soát; sửa Excel không cập nhật database"]);
      const sheets:FinanceSheet[]=[
        {name:"01 Summary",rows:summaryRows,widths:[32,24,22,20,64]},
        {name:"02 Bookings",rows:bRows,widths:[24,14,28,42,20,18,14,14,10,20,16,20,18,22,20,20,20,26,20,20,20,22,28,18,22,56],statusColumn:21},
        {name:"03 Payments",rows:payRows,widths:[24,14,18,16,18,20,20,28,28,36,40]},
        {name:"04 Receivables",rows:recRows,widths:[24,14,28,20,20,20,24]},
        {name:"05 Payables",rows:payableRows,widths:[24,14,42,28,20,20]},
        {name:"06 OPEX",rows:oRows,widths:[18,22,60,20,20,48]},
        {name:"07 Cancellations",rows:cRows,widths:[24,28,40,48,20,20,20,20,22,22]},
        {name:"08 Packages",rows:gRows,widths:[30,28,20,20,20,20,68]}
      ];
      downloadFinanceXlsx(sheets,exportMonth);
      setMessage("Đã xuất Excel P&L "+exportMonth+" ("+bs.length+" booking). Kiểm tra chênh lệch trong file.");
    }catch(e:any){setError(e?.message||"Không xuất được Excel P&L.");}
    finally{setExporting(false);}
  }

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
        notes:String(vals.notes||"").trim()||null,
        finance_finalized:vals.finance_finalized==="on"
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

  async function openZeroRevenueFinalize(row:BookingRow){
    setSaving(true);setError("");setMessage("");
    try{
      const {data:booking,error:bookingError}=await supabase.from("bookings")
        .select("contact_id").eq("id",row.booking_id).single();
      if(bookingError)throw bookingError;
      if(!booking?.contact_id)throw new Error("Booking chưa có hồ sơ khách hàng, không thể liên kết doanh thu.");

      const {data:possible,error:sourceError}=await supabase.from("bookings")
        .select("id,booking_code,tour_date,net_revenue_vnd,status")
        .eq("contact_id",booking.contact_id)
        .gt("net_revenue_vnd",0)
        .order("tour_date",{ascending:false}).limit(100);
      if(sourceError)throw sourceError;
      const candidates=((possible||[]) as PackageRevenueTarget[]).filter(item=>{
        if(item.id===row.booking_id||["cancelled","refunded"].includes(String(item.status||"").toLowerCase()))return false;
        if(row.tour_date&&item.tour_date){
          const difference=Math.abs(new Date(row.tour_date+"T00:00:00Z").getTime()-new Date(item.tour_date+"T00:00:00Z").getTime())/86400000;
          if(difference>31)return false;
        }
        return true;
      });
      if(!candidates.length)throw new Error("Không tìm thấy booking cùng khách có doanh thu lớn hơn 0 trong vòng 31 ngày. Kiểm tra booking chính trước khi chốt.");
      setZeroTargets(candidates);
      setZeroRevenueSource(candidates.length===1?candidates[0].id:"");
      setEditBooking(null);
      setZeroBooking(row);
    }catch(e:any){setError(e?.message||"Không tải được booking ghi nhận doanh thu.");}
    finally{setSaving(false);}
  }

  async function finalizeZeroRevenueBooking(){
    if(!zeroBooking||!zeroRevenueSource)return;
    const source=zeroTargets.find(item=>item.id===zeroRevenueSource);
    if(!source)return;
    if(!window.confirm(`Chốt ${zeroBooking.booking_code||"booking"} với doanh thu 0đ?\n\nDoanh thu gói được ghi ở ${source.booking_code||"booking chính"} (${money(source.net_revenue_vnd)}).\nBooking hiện tại sẽ Completed, Paid (0đ phải thu) và Finance Finalized.\nKHÔNG ghi thêm doanh thu, không ghi thêm tiền khách đã trả, không chốt thanh toán booking chính.\nChi phí trực tiếp và công nợ nhà cung cấp vẫn giữ nguyên.`))return;
    setSaving(true);setError("");setMessage("");
    try{
      const {data,error}=await supabase.rpc("admin_finalize_zero_revenue_booking",{
        p_booking_id:zeroBooking.booking_id,p_revenue_booking_id:zeroRevenueSource
      });
      if(error)throw error;
      setZeroBooking(null);
      setZeroTargets([]);
      setZeroRevenueSource("");
      const costWarning=data?.warning==="NO_DIRECT_COST"?" Lưu ý: booking này chưa có direct cost riêng.":"";
      setMessage(`${data?.booking_code||"Booking"} đã chốt doanh thu 0đ, liên kết với ${data?.revenue_booking_code||source.booking_code||"booking chính"}. Không cộng trùng doanh thu hoặc thay đổi tiền đã thu ở booking chính.${costWarning}`);
      await load();
    }catch(e:any){setError(e?.message||"Không chốt được booking doanh thu 0đ.");}
    finally{setSaving(false);}
  }

  async function adminOverride(row:BookingRow){
    if(!canOverride)return;
    setCloseFeedback(null);
    const reason=window.prompt("Lý do chốt đặc biệt (ít nhất 8 ký tự). Không xác nhận tiền đã thu:","");
    if(reason===null)return;
    if(reason.trim().length<8){setCloseFeedback({id:row.booking_id,text:"Vui lòng nhập lý do rõ ràng, ít nhất 8 ký tự.",failed:true});return;}
    const future=!row.tour_date||row.tour_date>localTodayVN();
    const serviceCompleted=!future&&window.confirm("Tour đã thực sự hoàn thành?\\nOK = Xác nhận hoàn thành dịch vụ.\\nCancel = Chỉ ẩn hồ sơ, KHÔNG xác nhận tour đã đi.");
    if(!window.confirm("Xác nhận quyền Owner: "+(serviceCompleted?"ĐÁNH DẤU TOUR ĐÃ HOÀN THÀNH":"CHỈ ẨN HỒ SƠ")+"?\\n\\nSố đã thu, Paid, chi phí và công nợ giữ nguyên. Có lưu nhật ký."))return;
    setSaving(true);setError("");setMessage("");
    try{
      const {error}=await supabase.rpc("admin_override_close_booking",{p_booking_id:row.booking_id,p_reason:reason.trim(),p_service_completed:serviceCompleted});
      if(error)throw error;
      setMessage("Đã xử lý đặc biệt "+(row.booking_code||"booking")+". Công nợ giữ nguyên; tra cứu trong Booking cũ / Đã ẩn.");
      await load();
      setCloseFeedback({id:row.booking_id,text:"Đã xử lý đặc biệt. Công nợ và trạng thái kết sổ giữ nguyên.",failed:false});
    }catch(e:any){setError(e?.message||"Không thể xử lý đặc biệt.");setCloseFeedback({id:row.booking_id,text:e?.message||"Không thể xử lý đặc biệt.",failed:true});}
    finally{setSaving(false);}
  }
  async function finalizeBookingOneClick(row:BookingRow){
    setCloseFeedback(null);
    if(isFinanceClosed(row)){setCloseFeedback({id:row.booking_id,text:"Đã chốt P&L; công nợ vẫn theo dõi riêng.",failed:false});return;}
    if(Number(row.revenue_vnd||0)===0){
      await openZeroRevenueFinalize(row);
      return;
    }
    if(!row.finance_record){
      setError("Booking chưa có phiếu P&L. Hãy lưu chi phí thực tế trước khi chốt.");
      return;
    }
    const ledgerReceived=Number(depositsByBooking[row.booking_id]?.ledgerReceived||0);
    if(!window.confirm(`Xác nhận tour ${row.booking_code||"booking"} đã hoàn thành và khách đã thanh toán đủ?\n\nGiá bán: ${money(row.revenue_vnd)}\nĐã ghi nhận Payments: ${money(ledgerReceived)}\nGhi nhận thêm: ${money(Math.max(0,Number(row.revenue_vnd)-ledgerReceived))}\nChi phí: ${money(row.total_direct_cost_vnd)}\n\nKhông cộng trùng cọc. Công nợ NCC giữ nguyên. Chỉ xác nhận nếu khách đã trả đủ.`))return;
    setSaving(true);setError("");setMessage("");
    try{
      const {data,error}=await supabase.rpc("admin_finalize_booking_confirm_full_payment",{p_booking_id:row.booking_id});
      if(error)throw error;
      setEditBooking(null);
      const warning=data?.warning==="NO_DIRECT_COST"?" ⚠ Chưa có direct cost; anh có thể bổ sung sau.":"";
      setMessage(`✓ ${data?.booking_code||row.booking_code||"Booking"} đã chốt hoàn tất.${warning}`);
      await load();
    }catch(e:any){setError(e?.message||"Không chốt được booking.");setCloseFeedback({id:row.booking_id,text:e?.message||"Không chốt được booking.",failed:true});}
    finally{setSaving(false)}
  }

  async function submitCancellation(e:any){
    e.preventDefault(); if(!cancelBooking)return;
    const vals=Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string,string>;
    const fee=parseMoney(vals.supplier_fee_vnd), paid=parseMoney(vals.fee_paid_vnd), due=parseMoney(vals.customer_fee_due_vnd);
    if(paid>fee){setError("Số đã trả không thể vượt phí nhà cung cấp.");return;}
    if(!window.confirm(`Xác nhận hủy ${cancelBooking.booking_code||"booking"}? Phí nhà cung cấp ${money(fee)}, phí phải thu khách ${money(due)}. Chưa mặc định khách đã thanh toán.`))return;
    setSaving(true);setError("");setMessage("");
    try{
      const {error}=await supabase.rpc("admin_save_cancellation_details",{p_booking_id:cancelBooking.booking_id,p_reason:vals.reason.trim(),p_supplier_fee_vnd:fee,p_customer_fee_due_vnd:due,p_fee_paid_vnd:paid});
      if(error)throw error;
      setCancelBooking(null);setMessage("Đã hủy booking; phí phải thu khách được theo dõi riêng, chưa tính là tiền đã thu.");await load();
    }catch(e:any){setError(e?.message||"Không thể hủy booking.");}finally{setSaving(false);}
  }
  async function updateCancellationPayment(row:CancellationRow){
    const input=window.prompt(`Đã thanh toán nhà cung cấp cho ${row.bookings?.booking_code||row.booking_id} (VND):`,String(row.fee_paid_vnd));
    if(input===null)return;
    const amount=parseMoney(input);
    if(amount>row.supplier_fee_vnd){setError("Số đã trả vượt quá phí hủy.");return;}
    setSaving(true);setError("");setMessage("");
    try{
      const {error}=await supabase.rpc("admin_update_cancellation_payment",{p_booking_id:row.booking_id,p_fee_paid_vnd:amount});
      if(error)throw error;
      setMessage("Đã cập nhật số đã trả, không tạo thêm chi phí P&L.");await load();
    }catch(e:any){setError(e?.message||"Không cập nhật được thanh toán phí hủy.");}finally{setSaving(false);}
  }
  async function updateCancellationRecovery(row:CancellationRow){
    const input=window.prompt(`TỔNG tiền phí hủy đã thực thu từ khách cho ${row.bookings?.booking_code||row.booking_id} (VND):`,String(row.customer_recovery_vnd));
    if(input===null)return;
    const received=parseMoney(input);
    if(received>row.customer_fee_due_vnd){setError("Tiền đã thu không được vượt phí hủy phải thu.");return;}
    if(!window.confirm(`Xác nhận tổng tiền phí hủy THỰC NHẬN từ khách là ${money(received)}? Không nhập số tiền khách chỉ hứa trả.`))return;
    setSaving(true);setError("");setMessage("");
    try{
      const {error}=await supabase.rpc("admin_record_cancellation_recovery",{p_booking_id:row.booking_id,p_received_total_vnd:received});
      if(error)throw error;
      setMessage("Đã ghi nhận tổng tiền phí hủy thực thu.");await load();
    }catch(e:any){setError(e?.message||"Không lưu được tiền phí hủy thực thu.");}finally{setSaving(false);}
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
        <p>Doanh thu gồm tour <b>COMPLETED/CLOSED</b> và phí hủy thực thu trong tháng. Phí hủy khách còn nợ được theo dõi riêng, chưa tính vào doanh thu.</p>
      </div>
      <div className="gvs-finance-head-actions">
        <input className="gva-input" type="month" value={month} onChange={e=>setMonth(e.target.value)} />
        <button className="gva-btn secondary" onClick={load} disabled={loading}>{loading?"Đang tải…":"Làm mới"}</button>
        <button type="button" className="gva-btn" style={{background:"#167345",color:"white"}} disabled={loading||saving||exporting||!month} onClick={()=>void exportExcel()}>{exporting?"Đang xuất Excel…":"↓ Xuất Excel (.xlsx)"}</button>
        <button className="gva-btn" onClick={()=>setExpenseOpen(true)}>+ OPEX</button>
      </div>
    </div>

    {error&&<div className="gva-msg err">{error}</div>}
    {message&&<div className="gva-msg">{message}</div>}

    <div className="gvs-pl-kpis">
      <PLCard label="Total Revenue" value={money(totalActualRevenue)} hint={`Tour ${money(summary.revenue_vnd)} + phí hủy đã thu ${money(cancellationRevenue)}`} />
      <PLCard label="Total Direct Cost" value={money(totalDirectCosts)} hint={`Chi phí tour ${money(summary.direct_costs_vnd)} + phí hủy NCC ${money(cancellationCost)}`} />
      <PLCard label="Gross Profit" value={money(totalGrossProfit)} hint={`Lãi/lỗ phí hủy ${cancellationProfit>=0?"+":"−"}${money(Math.abs(cancellationProfit))}`} tone={totalGrossProfit>=0?"good":"bad"} />
      <PLCard label="Operating Expenses" value={money(summary.opex_vnd)} hint="Manual OPEX / Ads / Office / Software / Other (no sales base salary)" />
      <PLCard label="Net Operating Profit" value={money(totalNetProfit)} hint="Đã cộng doanh thu phí hủy thực thu và trừ chi phí hủy" tone={totalNetProfit>=0?"good":"bad"} strong />
    </div>

    <div className="gvs-finance-note">
      <b>Actual P&amp;L:</b> (Doanh thu tour + phí hủy đã thu) − (chi phí tour + phí nhà cung cấp khi hủy) = Gross Profit; Gross Profit − OPEX = Net Operating Profit.
      {(summary.missing_finance_count||0)>0&&<span className="warn"> ⚠ {summary.missing_finance_count} completed booking chưa có finance record; lợi nhuận có thể đang bị tính cao.</span>}
    </div>

    <div className="gvs-finance-balance-grid">
      <MiniStat label="Booked revenue" value={money(summary.booked_revenue_vnd)} hint={`${summary.bookings_all||0} bookings trong tháng`} />
      <MiniStat label="Received on these bookings" value={money(summary.amount_received_vnd)} hint="Số đã thu lũy kế của booking tháng này" />
      <MiniStat label="Receivable" value={money(summary.receivable_vnd)} hint="Khách còn phải trả" />
      <MiniStat label="Direct cost committed" value={money(summary.committed_direct_cost_vnd)} hint="Chi phí đã nhập" />
      <MiniStat label="Direct cost paid" value={money(summary.direct_cost_paid_vnd)} hint="Đã thanh toán" />
      <MiniStat label="Direct cost payable" value={money(summary.direct_cost_payable_vnd)} hint="Còn phải trả · Bấm để xem chi tiết" onClick={()=>setPayablesOpen(true)} />
      <MiniStat label="Cancellation payable" value={money(cancellationSummary.payable_vnd)} hint={`${cancellationSummary.count||0} booking hủy · Lãi/lỗ ${money(cancellationProfit)}`} />
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
      <div style={{display:"flex",gap:8,flexWrap:"wrap",margin:"12px 0"}}>
        {([["active","Đang xử lý"],["archive","Booking cũ / Đã ẩn"],["reconcile","Công nợ & Đối soát"],["all","Xem tất cả"]] as const).map(([key,label])=><button key={key} className={"gva-btn "+(bookingView===key?"":"secondary")} onClick={()=>setBookingView(key)}>{label}</button>)}
      </div>
      <div className="gva-mini" style={{marginBottom:10}}>Mặc định ẩn tour quá 3 ngày và hồ sơ đã chốt. Chỉ ẩn khỏi danh sách, không xóa dữ liệu hoặc tự chốt. Công nợ vẫn ở tab đối soát.</div>
      <div className="gvs-finance-bookings">
        {visibleBookings.map(row=><div className="gvs-booking-row" key={row.booking_id}>
          <div className="gvs-booking-top">
            <div>
              <div className="gvs-booking-code">{row.booking_code||"Booking"} <span className={`gvs-state ${statusClass(row)}`}>{row.recognized?"ACTUAL":"FORECAST"}</span></div>
              <div className="gvs-booking-name">{row.product||"—"}</div>
              <div className="gva-mini">{row.tour_date||"—"} · {row.guest_name||"—"} · {row.pax||0} pax · {row.destination||"—"}</div>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <button className="gva-btn secondary" onClick={()=>setEditBooking(row)}>Edit P&amp;L</button>
              <button className="gva-btn secondary" disabled={saving||row.recognized} onClick={()=>setCancelBooking(row)}>Hủy booking</button>
              {canOverride&&!isFinanceClosed(row)&&<button className="gva-btn secondary" disabled={saving||["cancelled","refunded"].includes(String(row.status||"").toLowerCase())} onClick={()=>adminOverride(row)} title="Chỉ Owner: đóng hồ sơ có lý do, giữ nguyên công nợ và lưu nhật ký">Chốt đặc biệt</button>}
              {isFinanceClosed(row)
                ? <button className="gva-btn secondary" disabled>✓ Đã chốt P&amp;L</button>
                : <button className="gva-btn" disabled={saving||!row.finance_record||!row.tour_date||row.tour_date>localTodayVN()||["cancelled","refunded"].includes(String(row.status||"").toLowerCase())} title={!row.finance_record?"Lưu P&L trước khi chốt":!row.tour_date||row.tour_date>localTodayVN()?"Chưa tới ngày thực hiện":undefined} onClick={()=>finalizeBookingOneClick(row)}>✓ Hoàn tất & chốt</button>}
            </div>
          </div>
          <div className="gva-mini" style={{margin:"8px 0",fontWeight:650}}>
            Deposit đã nhận: {money(depositsByBooking[row.booking_id]?.received||0)}
            {(depositsByBooking[row.booking_id]?.pending||0)>0&&<> · Cọc chờ xác nhận: {money(depositsByBooking[row.booking_id].pending)}</>}
            {" · "}Tổng đã thu (P&L): {money(row.amount_received_vnd)}
            {Math.round((depositsByBooking[row.booking_id]?.ledgerReceived||0)-Number(row.amount_received_vnd||0))!==0&&
              <span style={{color:"#b42318"}}> · Chưa khớp Payments: {money(depositsByBooking[row.booking_id]?.ledgerReceived||0)} (không tự cộng trùng)</span>}
          </div>
          <div className="gvs-booking-numbers">
            <span><small>Revenue</small><b>{money(row.revenue_vnd)}</b></span>
            <span><small>Direct cost</small><b>{money(row.total_direct_cost_vnd)}</b></span>
            <span><small>Profit</small><b className={row.gross_profit_vnd>=0?"positive":"negative"}>{money(row.gross_profit_vnd)}</b></span>
            <span><small>Margin</small><b>{Number(row.margin_pct||0).toFixed(1)}%</b></span>
            <span><small>Deposit đã thu</small><b>{money(depositsByBooking[row.booking_id]?.received||0)}</b></span>
            <span><small>Balance</small><b>{money(row.balance_vnd)}</b></span>
            <span><small>Cost payable</small><b>{money(row.direct_cost_payable_vnd)}</b></span>
          </div>
          {isFinanceClosed(row)&&<div className="gva-mini">Đã hoàn thành và kết sổ P&amp;L. {Number(row.balance_vnd||0)>0||Number(row.direct_cost_payable_vnd||0)>0?"Còn công nợ — theo dõi tại Công nợ & Đối soát.":"Không còn công nợ."}</div>}
          {closeFeedback?.id===row.booking_id&&<div className={closeFeedback.failed?"gvs-row-warning":"gva-mini"} role={closeFeedback.failed?"alert":"status"}>{closeFeedback.text}</div>}
          {!row.finance_record&&<div className="gvs-row-warning">⚠ Chưa nhập finance record cho booking này.</div>}
          {Number(row.revenue_vnd||0)===0&&row.finance_notes?.includes("Package day - revenue recorded under booking")&&
            <div className="gva-mini">{row.finance_notes.split("\n").find(x=>x.includes("Package day - revenue recorded under booking"))}</div>}
        </div>)}
        {!visibleBookings.length&&<div className="gva-empty">Không có booking trong nhóm này.</div>}
      </div>
    </div>

    <div className="gva-card gvs-finance-section">
      <div className="gva-section-head"><div><h2>Cancellation Finance</h2><div className="gva-mini">Phí phải thu khách là công nợ; chỉ số Recovered phản ánh số đã thu hồi, không mặc định bằng số phải thu.</div></div></div>
      <div className="gvs-finance-balance-grid">
        <MiniStat label="Supplier cancellation fees" value={money(cancellationSummary.supplier_fees_vnd)} />
        <MiniStat label="Customer recovery" value={money(cancellationSummary.recovered_vnd)} />
        <MiniStat label="Net gain / loss" value={money(cancellationProfit)} />
        <MiniStat label="Fee paid" value={money(cancellationSummary.paid_vnd)} />
        <MiniStat label="Fee payable" value={money(cancellationSummary.payable_vnd)} />
      </div>
      <div className="gva-table-wrap"><table className="gva-table"><thead><tr><th>Cancelled</th><th>Booking</th><th>Reason</th><th>Supplier fee</th><th>Phải thu khách</th><th>Đã thu hồi</th><th>Còn phải thu</th><th>Lãi / lỗ hủy</th><th>Supplier payable</th><th></th></tr></thead><tbody>
        {cancellations.map(x=><tr key={x.booking_id}><td>{x.cancelled_at.slice(0,10)}</td><td>{x.bookings?.booking_code||x.booking_id}</td><td>{x.reason}</td><td>{money(x.supplier_fee_vnd)}</td><td>{money(x.customer_fee_due_vnd)}</td><td>{money(x.customer_recovery_vnd)}</td><td>{money(Math.max(0,x.customer_fee_due_vnd-x.customer_recovery_vnd))}</td><td><b style={{color:x.customer_recovery_vnd>=x.supplier_fee_vnd?"#067647":"#b42318"}}>{money(x.customer_recovery_vnd-x.supplier_fee_vnd)}</b></td><td>{money(x.supplier_fee_vnd-x.fee_paid_vnd)}</td><td><div style={{display:"flex",gap:5,flexWrap:"wrap"}}><button className="gva-btn secondary" disabled={saving} onClick={()=>updateCancellationRecovery(x)}>Thu khách</button><button className="gva-btn secondary" disabled={saving} onClick={()=>updateCancellationPayment(x)}>Trả NCC</button></div></td></tr>)}
        {!cancellations.length&&<tr><td colSpan={10}>Chưa có booking hủy trong tháng.</td></tr>}
      </tbody></table></div>
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

    {zeroBooking&&<div className="gva-modal-bg">
      <div className="gva-modal gvs-finance-modal" role="dialog" aria-modal="true" aria-labelledby="gvs-zero-finalize-title">
        <div className="gva-modal-head">
          <div><h3 id="gvs-zero-finalize-title">Chốt booking doanh thu 0đ</h3>
            <div className="gva-mini">{zeroBooking.booking_code||"Booking"} · {zeroBooking.tour_date||"—"} · {zeroBooking.product||"—"}</div></div>
          <button type="button" className="gva-close" onClick={()=>setZeroBooking(null)} disabled={saving} aria-label="Đóng">✕</button>
        </div>
        <p>Ngày này nằm trong gói nhiều ngày. Chọn booking chính đã ghi toàn bộ doanh thu của cùng khách hàng. Hệ thống chỉ chốt ngày dịch vụ này; không cộng thêm doanh thu hay tiền đã thu, và không thay đổi công nợ booking chính.</p>
        <div className="gva-form-grid">
          <Field label="Booking ghi nhận doanh thu gói" wide>
            <select className="gva-select" value={zeroRevenueSource} onChange={e=>setZeroRevenueSource(e.target.value)}>
              <option value="">Chọn booking chính</option>
              {zeroTargets.map(item=><option key={item.id} value={item.id}>{item.booking_code||"Booking"} · {item.tour_date||"—"} · {money(item.net_revenue_vnd)}</option>)}
            </select>
          </Field>
        </div>
        <div className="gvs-finance-note compact">Booking doanh thu 0đ vẫn được tính là tour đã hoàn thành. Hãy kiểm tra chi phí và công nợ nhà cung cấp trước khi chốt; khoản chưa trả không được tự động đánh dấu đã thanh toán.</div>
        {error&&<div className="gvs-row-warning" role="alert">{error}</div>}
        <div className="gvs-modal-actions">
          <button type="button" className="gva-btn secondary" onClick={()=>setZeroBooking(null)} disabled={saving}>Quay lại</button>
          <button type="button" className="gva-btn" onClick={finalizeZeroRevenueBooking} disabled={saving||!zeroRevenueSource}>{saving?"Đang chốt…":"Xác nhận hoàn tất & chốt"}</button>
        </div>
      </div>
    </div>}
    {editBooking&&<FinanceModal row={editBooking} deposit={depositsByBooking[editBooking.booking_id]} saving={saving} onClose={()=>setEditBooking(null)} onSubmit={saveBookingFinance} onFinalize={()=>finalizeBookingOneClick(editBooking)}/>}    
    {cancelBooking&&<div className="gva-modal-bg"><form className="gva-modal" onSubmit={submitCancellation}>
      <div className="gva-modal-head"><h3>Hủy booking · {cancelBooking.booking_code}</h3><button type="button" className="gva-close" onClick={()=>setCancelBooking(null)}>✕</button></div>
      <p>{cancelBooking.product} · {cancelBooking.pax} khách. Không xóa booking và không ghi doanh thu tour.</p>
      <div className="gva-form-grid">
        <Field label="Lý do hủy" wide><textarea className="gva-input" name="reason" required rows={2} placeholder="Khách hủy sát giờ, chưa đặt cọc…"/></Field>
        <MoneyField name="supplier_fee_vnd" label="Phí nhà cung cấp (VND)" value={0}/>
        <MoneyField name="customer_fee_due_vnd" label="Phí hủy phải thu khách (VND)" value={0}/>
        <MoneyField name="fee_paid_vnd" label="Đã trả nhà cung cấp (VND)" value={0}/>
      </div>
      <div className="gvs-modal-actions"><button type="button" className="gva-btn secondary" onClick={()=>setCancelBooking(null)}>Quay lại</button><button className="gva-btn" disabled={saving}>{saving?"Đang lưu…":"Xác nhận hủy & ghi lỗ"}</button></div>
    </form></div>}
    {expenseOpen&&<ExpenseModal month={month} saving={saving} onClose={()=>setExpenseOpen(false)} onSubmit={addExpense}/>}
    {payablesOpen&&<PayablesDrilldown month={month} rows={bookings} summaryTotal={Number(summary.direct_cost_payable_vnd||0)} onClose={()=>setPayablesOpen(false)} onEdit={(row:BookingRow)=>{setPayablesOpen(false);setEditBooking(row);}}/>}    
  </div>;
}

function PLCard({label,value,hint,tone,strong}:any){
  return <div className={`gva-card gvs-pl-card ${tone||""} ${strong?"strong":""}`}><div className="gvs-label">{label}</div><div className="gvs-pl-value">{value}</div><div className="gva-mini">{hint}</div></div>;
}
function MiniStat({label,value,hint,onClick}:any){
  const content=<><div className="gvs-label">{label}</div><b>{value}</b><div className="gva-mini">{hint}</div></>;
  return onClick
    ? <button type="button" className="gva-card gvs-mini-stat gvs-mini-stat-click" onClick={onClick} aria-label={label+": "+value+". Xem chi tiết."}>{content}</button>
    : <div className="gva-card gvs-mini-stat">{content}</div>;
}

const FINANCE_COST_CATEGORIES:{key:keyof BookingRow;label:string}[]=[
  {key:"supplier_cost_vnd",label:"Nhà cung cấp / Operator"},
  {key:"guide_cost_vnd",label:"Hướng dẫn viên"},
  {key:"driver_cost_vnd",label:"Xe / Tài xế"},
  {key:"tickets_cost_vnd",label:"Vé tham quan"},
  {key:"meals_cost_vnd",label:"Ăn uống"},
  {key:"boat_cost_vnd",label:"Thuyền / Cano"},
  {key:"hotel_cost_vnd",label:"Khách sạn"},
  {key:"partner_commission_vnd",label:"Hoa hồng đối tác"},
  {key:"payment_fee_vnd",label:"Phí thanh toán"},
  {key:"refund_recovery_vnd",label:"Hoàn tiền / Xử lý sự cố"},
  {key:"other_cost_vnd",label:"Chi phí khác"}
];

function PayablesDrilldown({month,rows,summaryTotal,onClose,onEdit}:{month:string;rows:BookingRow[];summaryTotal:number;onClose:()=>void;onEdit:(row:BookingRow)=>void}){
  const [search,setSearch]=useState("");
  const [expanded,setExpanded]=useState<string|null>(null);
  const payableRows=[...rows].filter(row=>Number(row.direct_cost_payable_vnd||0)>0).sort((a,b)=>Number(b.direct_cost_payable_vnd||0)-Number(a.direct_cost_payable_vnd||0));
  const detailTotal=payableRows.reduce((sum,row)=>sum+Number(row.direct_cost_payable_vnd||0),0);
  const paidTotal=payableRows.reduce((sum,row)=>sum+Number(row.direct_cost_paid_vnd||0),0);
  const difference=Math.round((summaryTotal-detailTotal)*100)/100;
  const query=search.trim().toLowerCase();
  const filtered=payableRows.filter(row=>[row.booking_code,row.product,row.guest_name,row.destination,row.status].some(value=>String(value||"").toLowerCase().includes(query)));
  return <div className="gva-modal-bg">
    <div className="gva-modal gvs-payables-modal" role="dialog" aria-modal="true" aria-labelledby="gvs-payables-title">
      <div className="gva-modal-head">
        <div><h3 id="gvs-payables-title">Chi tiết Direct Cost Payable · {monthLabel(month)}</h3><div className="gva-mini">Số liệu theo từng booking thuộc tháng đang chọn; chỉ xem, không tự ghi thanh toán.</div></div>
        <button type="button" className="gva-close" onClick={onClose} aria-label="Đóng chi tiết công nợ">✕</button>
      </div>
      <div className="gvs-payables-overview">
        <span><small>Tổng P&amp;L</small><b>{money(summaryTotal)}</b></span>
        <span><small>Cộng từ booking</small><b>{money(detailTotal)}</b></span>
        <span><small>Booking còn nợ</small><b>{payableRows.length}</b></span>
        <span><small>Đã trả trên các booking này</small><b>{money(paidTotal)}</b></span>
      </div>
      {difference!==0&&<div className="gvs-payables-warning" role="alert">⚠ Chênh lệch {money(Math.abs(difference))} giữa chỉ số tổng hợp và danh sách booking. Cần kiểm tra phạm vi dữ liệu và quy tắc tính trước khi quyết toán.</div>}
      <p className="gvs-payables-explain">Mỗi dòng là công nợ <b>cấp booking</b>. Bấm <b>Xem hạng mục</b> để biết chi phí đã nhập vào đâu. Số đã trả hiện được lưu chung cho booking, <b>chưa phân bổ đến từng nhà cung cấp/hạng mục</b>; tên người nhận, chứng từ và hạn thanh toán cần theo dõi ở sổ công nợ chi tiết.</p>
      <input className="gva-input gvs-payables-search" type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Tìm mã booking, tour, khách, điểm đến…" aria-label="Tìm kiếm công nợ"/>
      <div className="gva-table-wrap">
        <table className="gva-table gvs-payables-table">
          <thead><tr><th>Booking / Dịch vụ</th><th>Ngày tour</th><th>Đã ghi chi phí</th><th>Đã trả</th><th>Còn phải trả</th><th>Chi tiết</th></tr></thead>
          <tbody>
            {filtered.map(row=><Fragment key={row.booking_id}>
              <tr>
                <td><b>{row.booking_code||row.booking_id}</b><div className="gva-mini">{row.product||"Chưa có tên dịch vụ"} · {row.destination||"—"}</div>{!row.finance_record&&<div className="gvs-payables-flag">Chưa có phiếu P&amp;L</div>}</td>
                <td>{row.tour_date||"—"}</td>
                <td>{money(row.total_direct_cost_vnd)}</td>
                <td>{money(row.direct_cost_paid_vnd)}</td>
                <td><b>{money(row.direct_cost_payable_vnd)}</b></td>
                <td><button type="button" className="gva-btn secondary" aria-expanded={expanded===row.booking_id} onClick={()=>setExpanded(current=>current===row.booking_id?null:row.booking_id)}>{expanded===row.booking_id?"Thu gọn":"Xem hạng mục"}</button></td>
              </tr>
              {expanded===row.booking_id&&<tr className="gvs-payables-expanded"><td colSpan={6}>
                <b>Hạng mục chi phí đã ghi nhận</b>
                <div className="gvs-payables-categories">
                  {FINANCE_COST_CATEGORIES.filter(part=>Number(row[part.key]||0)>0).map(part=><span key={part.key}><small>{part.label}</small><b>{money(row[part.key])}</b></span>)}
                  {!FINANCE_COST_CATEGORIES.some(part=>Number(row[part.key]||0)>0)&&<span>Chưa có chi tiết hạng mục được nhập.</span>}
                </div>
                {row.finance_notes&&<p className="gva-mini">Ghi chú P&amp;L: {row.finance_notes}</p>}
                <div className="gvs-payables-row-actions"><small>Số đã thanh toán {money(row.direct_cost_paid_vnd)} là tổng của booking, chưa xác định hạng mục nào đã được trả.</small><button type="button" className="gva-btn secondary" onClick={()=>onEdit(row)}>Mở Edit P&amp;L</button></div>
              </td></tr>}
            </Fragment>)}
            {!filtered.length&&<tr><td colSpan={6}><div className="gva-empty">{query?"Không tìm thấy booking phù hợp.":"Không có booking nào còn Direct Cost Payable trong tháng."}</div></td></tr>}
          </tbody>
        </table>
      </div>
      <div className="gvs-modal-actions"><button type="button" className="gva-btn secondary" onClick={onClose}>Đóng</button></div>
    </div>
  </div>;
}

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

function FinanceModal({row,deposit,saving,onClose,onSubmit,onFinalize}:any){
  const deposited=Number(deposit?.received||0);
  const pending=Number(deposit?.pending||0);
  const ledgerReceived=Number(deposit?.ledgerReceived||0);
  const recorded=Number(row.amount_received_vnd||0);
  const gap=Math.round(ledgerReceived-recorded);
  return <div className="gva-modal-bg"><form className="gva-modal gvs-finance-modal" onSubmit={onSubmit}>
    <div className="gva-modal-head"><div><h3>P&amp;L · {row.booking_code||"Booking"}</h3><div className="gva-mini">{row.product} · {row.tour_date} · {row.guest_name||"—"}</div></div><button type="button" className="gva-close" onClick={onClose}>✕</button></div>
    <div className="gvs-finance-note compact" style={{display:"grid",gap:6}}>
      <b>Đối soát tiền khách trước khi kết sổ</b>
      <span>Deposit đã nhận (Payments): <b>{money(deposited)}</b>{pending>0&&<> · Cọc chờ xác nhận: {money(pending)}</>}</span>
      <span>Tổng thực nhận từ Payments (sau hoàn tiền): <b>{money(ledgerReceived)}</b></span>
      <span>Đã thu ghi ở P&amp;L: <b>{money(recorded)}</b> · Còn phải thu theo P&amp;L: <b>{money(row.balance_vnd)}</b></span>
      {gap!==0&&<span style={{color:"#b42318",fontWeight:700}}>Chênh lệch Payments/P&amp;L: {money(Math.abs(gap))}. Kiểm tra giao dịch trước khi chốt; không nhập khoản deposit hai lần.</span>}
      <small>Deposit đã nhận là một phần của tổng đã thu, không phải doanh thu cộng thêm. Chỉ giao dịch có trạng thái received mới tính là tiền thực nhận.</small>
    </div>
    <div className="gvs-finance-note compact">Không nhập trùng chi phí. Ví dụ supplier package đã bao gồm vé/meal thì không nhập lại vé/meal lần nữa.</div>
    <div className="gva-form-grid">
      <MoneyField name="gross_revenue_vnd" label="Gross selling price" value={row.gross_revenue_vnd}/>
      <MoneyField name="discount_vnd" label="Discount" value={row.discount_vnd}/>
      <Field label="Amount received · tự đồng bộ Payments">
        <div className="gva-input" style={{background:"#f1f5f9",fontWeight:700}}>{money(row.amount_received_vnd)}</div>
        <a href={`/admin/payments?q=${encodeURIComponent(row.booking_code||"")}`} target="_blank" rel="noopener noreferrer" style={{fontSize:12}}>Ghi nhận / đối soát tại Payment Center</a>
      </Field>
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
      <Field label="Finance finalized" wide><label style={{display:"flex",gap:8,alignItems:"center",fontWeight:700}}><input type="checkbox" name="finance_finalized" defaultChecked={!!row.finance_finalized}/> Costs checked · payment/revenue reviewed · allow staff commission calculation</label></Field>
      <Field label="Finance notes" wide><textarea className="gva-input" name="notes" rows={3} defaultValue={row.finance_notes||""}/></Field>
    </div>
    <div className="gvs-modal-summary"><span>Current revenue <b>{money(row.revenue_vnd)}</b></span><span>Direct cost <b>{money(row.total_direct_cost_vnd)}</b></span><span>Profit <b>{money(row.gross_profit_vnd)}</b></span></div>
    <div className="gvs-modal-actions"><button type="button" className="gva-btn secondary" onClick={onClose}>Hủy</button><button type="button" className="gva-btn" disabled={saving||isFinanceClosed(row)||!row.finance_record||!row.tour_date||row.tour_date>localTodayVN()||["cancelled","refunded"].includes(String(row.status||"").toLowerCase())} title={!row.finance_record?"Lưu P&L trước khi chốt":undefined} onClick={onFinalize}>{isFinanceClosed(row)?"✓ Đã chốt P&L":"✓ Hoàn tất & chốt"}</button><button className="gva-btn secondary" disabled={saving}>{saving?"Đang lưu…":"Lưu P&L"}</button></div>
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
