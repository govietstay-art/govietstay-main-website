"use client";
// GVS-UNIFIED-SALES-COMMISSION-12PCT-V1
// GVS-STAFF-AUTO-ONBOARDING-V3
// GVS-ONE-CLICK-FINALIZE-V1

import { useEffect, useMemo, useState } from "react";
import "./staff-sales-team.css";
import PublicInquiryPanel from "./PublicInquiryPanel";

type Props={supabase:any;adminStaff:any};
type Staff={id:string;display_name:string;sales_code:string;role:string;compensation_plan_code:string;allow_booking_portal:boolean;sales_page:string|null};
type Payroll={staff_id:string;display_name:string;sales_code:string;plan_code:string;eligible_bookings:number;pax:number;revenue_vnd:number;commissionable_profit_vnd:number;base_salary_vnd:number;commission_rate:number;commission_vnd:number;commission_adjustment_vnd:number;bonus_vnd:number;deduction_vnd:number;advance_paid_vnd:number;total_compensation_vnd:number;payable_vnd:number;override_notes:string|null};
type Intake={id:string;submitted_at:string;sales_code:string;staff_id:string;booking_code:string;guest_name:string;phone:string|null;tour_date:string;pickup_time:string|null;hotel:string|null;region:string|null;tour_name:string|null;variant_name:string|null;language:string|null;adults:number;children:number;infants:number;gross_revenue_vnd:number;discount_vnd:number;deposit_vnd:number;notes:string|null;status:string;admin_notes:string|null};
type SalesBooking={booking_id:string;booking_code:string;tour_date:string;staff_id:string;staff_name:string;guest_name:string|null;product:string;status:string;payment_status:string;pax:number;revenue_vnd:number;amount_received_vnd:number;profit_before_staff_commission_vnd:number;staff_commission_vnd:number;commission_eligible:boolean;commission_base_override_vnd:number|null;commission_amount_override_vnd:number|null;override_notes:string|null};

function money(v:any){return new Intl.NumberFormat("vi-VN").format(Number(v||0))+" ₫";}
function monthNow(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;}
function parseMoney(v:any){return Math.max(0,Number(String(v||"0").replace(/[^0-9]/g,""))||0);}
function parseSignedMoney(v:any){const s=String(v||"0").trim();const neg=s.startsWith("-");const n=Number(s.replace(/[^0-9]/g,""))||0;return neg?-n:n;}
function num(v:any){return Number(v||0);}

export default function StaffSalesTeam({supabase,adminStaff}:Props){
  const [month,setMonth]=useState(monthNow());
  const [staff,setStaff]=useState<Staff[]>([]);
  const [pinStatus,setPinStatus]=useState<Record<string,boolean>>({});
  const [payroll,setPayroll]=useState<Payroll[]>([]);
  const [intake,setIntake]=useState<Intake[]>([]);
  const [bookings,setBookings]=useState<SalesBooking[]>([]);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState("");
  const [message,setMessage]=useState("");
  const [editRequest,setEditRequest]=useState<Intake|null>(null);
  const [editPayroll,setEditPayroll]=useState<Payroll|null>(null);
  const [editBooking,setEditBooking]=useState<SalesBooking|null>(null);
  const [newStaffOpen,setNewStaffOpen]=useState(false);

  const staffMap=useMemo(()=>Object.fromEntries(staff.map(x=>[x.id,x])),[staff]);
  const pending=intake.filter(x=>x.status==="pending");
  const totalPayroll=payroll.reduce((s,x)=>s+num(x.total_compensation_vnd),0);
  const totalPayable=payroll.reduce((s,x)=>s+num(x.payable_vnd),0);
  const totalCommission=payroll.reduce((s,x)=>s+num(x.commission_vnd)+num(x.commission_adjustment_vnd),0);

  async function load(){
    setLoading(true);setError("");
    try{
      const pMonth=month+"-01";
      const results=await Promise.all([
        supabase.from("staff_profiles").select("id,display_name,sales_code,role,compensation_plan_code,allow_booking_portal,sales_page").not("sales_code","is",null).order("display_name"),
        supabase.rpc("admin_staff_payroll",{p_month:pMonth}),
        supabase.from("staff_booking_intake").select("id,submitted_at,sales_code,staff_id,booking_code,guest_name,phone,tour_date,pickup_time,hotel,region,tour_name,variant_name,language,adults,children,infants,gross_revenue_vnd,discount_vnd,deposit_vnd,notes,status,admin_notes").order("submitted_at",{ascending:false}).limit(100),
        supabase.rpc("admin_staff_sales_bookings",{p_month:pMonth,p_staff_id:null}),
        supabase.rpc("admin_staff_pin_status")
      ]);
      for(const r of results) if(r.error) throw r.error;
      setStaff((results[0].data||[]) as Staff[]);
      setPinStatus(Object.fromEntries(((results[4].data||[]) as Array<{staff_id:string;pin_configured:boolean}>).map(x=>[x.staff_id,x.pin_configured])));
      setPayroll((results[1].data||[]) as Payroll[]);
      setIntake((results[2].data||[]) as Intake[]);
      setBookings((results[3].data||[]) as SalesBooking[]);
    }catch(e:any){setError(e?.message||"Không tải được Sales Team.");}
    finally{setLoading(false)}
  }
  useEffect(()=>{load();},[month]);

  async function approveRequest(id:string){
    if(!window.confirm("Duyệt request này vào Booking Master?"))return;
    setSaving(true);setError("");setMessage("");
    try{
      const {data,error}=await supabase.rpc("admin_approve_staff_booking_request",{p_request_id:id});
      if(error)throw error;
      setMessage(`Đã tạo booking ${data?.booking_code||""} trong Admin. Hoa hồng sẽ được tính 12% trên giá bán thực tế khi Completed + Paid + Finance Finalized.`);
      await load();
    }catch(e:any){setError(e?.message||"Không duyệt được request.");}finally{setSaving(false)}
  }
  async function rejectRequest(id:string){
    const note=window.prompt("Lý do từ chối / ghi chú nội bộ:","");if(note===null)return;
    setSaving(true);setError("");setMessage("");
    try{const {error}=await supabase.rpc("admin_reject_staff_booking_request",{p_request_id:id,p_note:note});if(error)throw error;setMessage("Đã từ chối request.");await load();}
    catch(e:any){setError(e?.message||"Không từ chối được request.");}finally{setSaving(false)}
  }
  async function saveRequest(e:any){
    e.preventDefault();if(!editRequest)return;setSaving(true);setError("");setMessage("");
    try{
      const f=new FormData(e.currentTarget);const v=Object.fromEntries(f.entries()) as any;
      const payload={
        staff_id:v.staff_id,sales_code:staffMap[v.staff_id]?.sales_code||editRequest.sales_code,guest_name:String(v.guest_name||"").trim(),phone:String(v.phone||"").trim()||null,tour_date:v.tour_date,pickup_time:String(v.pickup_time||"").trim()||null,hotel:String(v.hotel||"").trim()||null,
        region:String(v.region||"").trim()||null,tour_name:String(v.tour_name||"").trim()||null,variant_name:String(v.variant_name||"").trim()||null,language:String(v.language||"").trim()||null,
        adults:Math.max(0,Number(v.adults||0)),children:Math.max(0,Number(v.children||0)),infants:Math.max(0,Number(v.infants||0)),gross_revenue_vnd:parseMoney(v.gross_revenue_vnd),discount_vnd:parseMoney(v.discount_vnd),deposit_vnd:parseMoney(v.deposit_vnd),notes:String(v.notes||"").trim()||null,updated_at:new Date().toISOString()
      };
      const {error}=await supabase.from("staff_booking_intake").update(payload).eq("id",editRequest.id).eq("status","pending");if(error)throw error;
      setEditRequest(null);setMessage("Đã sửa request trước khi duyệt.");await load();
    }catch(e:any){setError(e?.message||"Không lưu được request.");}finally{setSaving(false)}
  }
  async function savePayrollOverride(e:any){
    e.preventDefault();if(!editPayroll)return;setSaving(true);setError("");setMessage("");
    try{
      const f=new FormData(e.currentTarget);const v=Object.fromEntries(f.entries()) as any;
      const baseRaw=String(v.base_salary_override_vnd||"").trim();
      const payload={staff_id:editPayroll.staff_id,month_start:month+"-01",base_salary_override_vnd:baseRaw===""?null:parseMoney(baseRaw),commission_adjustment_vnd:parseSignedMoney(v.commission_adjustment_vnd),bonus_vnd:parseMoney(v.bonus_vnd),deduction_vnd:parseMoney(v.deduction_vnd),advance_paid_vnd:parseMoney(v.advance_paid_vnd),notes:String(v.notes||"").trim()||null,updated_by:adminStaff?.id||null,updated_at:new Date().toISOString()};
      const {error}=await supabase.from("staff_payroll_overrides").upsert(payload,{onConflict:"staff_id,month_start"});if(error)throw error;
      setEditPayroll(null);setMessage("Đã lưu điều chỉnh payroll.");await load();
    }catch(e:any){setError(e?.message||"Không lưu được payroll.");}finally{setSaving(false)}
  }
  async function saveBookingControl(e:any){
    e.preventDefault();if(!editBooking)return;setSaving(true);setError("");setMessage("");
    try{
      const f=new FormData(e.currentTarget);const v=Object.fromEntries(f.entries()) as any;
      const [br,ov]=await Promise.all([
        supabase.from("bookings").update({staff_id:v.staff_id,ref_code:staffMap[v.staff_id]?.sales_code||null,status:v.status,payment_status:v.payment_status}).eq("id",editBooking.booking_id),
        supabase.from("staff_booking_commission_overrides").upsert({booking_id:editBooking.booking_id,commission_eligible:v.commission_eligible==="yes",commission_base_override_vnd:null,commission_amount_override_vnd:String(v.commission_amount_override_vnd||"").trim()===""?null:parseMoney(v.commission_amount_override_vnd),notes:String(v.override_notes||"").trim()||null,updated_by:adminStaff?.id||null,updated_at:new Date().toISOString()},{onConflict:"booking_id"})
      ]);
      if(br.error)throw br.error;if(ov.error)throw ov.error;
      await supabase.rpc("admin_recalculate_staff_compensation",{p_month:month+"-01"});
      setEditBooking(null);setMessage("Đã cập nhật booking và hoa hồng.");await load();
    }catch(e:any){setError(e?.message||"Không lưu được booking control.");}finally{setSaving(false)}
  }
  async function finalizeBookingOneClick(b:SalesBooking){
    if(!window.confirm(`Hoàn tất & chốt ${b.booking_code}?\n\nHệ thống sẽ tự:\n• status = completed\n• payment = paid\n• Amount Received = ${money(b.revenue_vnd)}\n• Finance Finalized = ON\n• tính lại Payroll\n\nChi phí đã nhập sẽ được giữ nguyên.`))return;
    setSaving(true);setError("");setMessage("");
    try{
      const {data,error}=await supabase.rpc("admin_finalize_booking_one_click",{p_booking_id:b.booking_id});
      if(error)throw error;
      const warning=data?.warning==="NO_DIRECT_COST"?" ⚠ Booking chưa có direct cost; có thể bổ sung chi phí sau nếu cần.":"";
      setMessage(`✓ ${data?.booking_code||b.booking_code} đã Completed + Paid + Finance Finalized. Payroll đã tính lại.${warning}`);
      await load();
    }catch(e:any){setError(e?.message||"Không chốt được booking.");}
    finally{setSaving(false)}
  }

  async function createSalesStaff(e:any){
    e.preventDefault();setSaving(true);setError("");setMessage("");
    try{
      const f=new FormData(e.currentTarget);const v=Object.fromEntries(f.entries()) as any;
      const {data,error}=await supabase.rpc("admin_create_sales_staff",{
        p_display_name:String(v.display_name||"").trim(),
        p_market_code:String(v.market_code||"RU").trim().toUpperCase(),
        p_sales_page:String(v.sales_page||"").trim()||null,
        p_notes:String(v.notes||"").trim()||null
      });
      if(error)throw error;
      setNewStaffOpen(false);
      setMessage(`Đã tạo ${data?.display_name||"nhân viên"} · ${data?.sales_code||""}. Payroll + Booking Portal đã tự liên kết.`);
      await load();
    }catch(e:any){setError(e?.message||"Không tạo được nhân viên sales.");}
    finally{setSaving(false)}
  }

  async function configureStaffPin(person:Staff){
    const pin=window.prompt("Thiết lập PIN riêng (6–12 chữ số) cho "+person.display_name+":");
    if(pin===null)return;
    if(!/^\d{6,12}$/.test(pin)){
      setError("PIN phải có 6–12 chữ số, riêng cho từng nhân viên.");return;
    }
    setSaving(true);setError("");setMessage("");
    try {
      const {data,error}=await supabase.rpc("admin_set_staff_sales_pin",{p_staff_id:person.id,p_pin:pin});
      if(error||data!==true)throw error||new Error("Không đặt được PIN");
      setPinStatus(prev=>({...prev,[person.id]:true}));
      setMessage("Đã lưu PIN riêng cho "+person.display_name+". Chia sẻ PIN với nhân viên qua kênh riêng; không đăng công khai.");
    }catch(e:any){setError(e?.message||"Không thể đặt PIN nhân viên.");}
    finally{setSaving(false);}
  }
  return <div className="gvs-team">
    <div className="gvs-team-head">
      <div><h2>Sales Team · Commission 12%</h2><p>Booking từ 16/10/2026: <b>12% trên giá bán thực tế sau giảm giá</b>, gồm cả tour custom/private. Không lương căn bản, không tier PAX, không khác biệt theo hướng dẫn viên. Hoa hồng earned khi Completed + Paid + Finance Finalized.</p></div>
      <div className="gvs-team-actions"><button className="gva-btn" onClick={()=>setNewStaffOpen(true)}>+ Sales Staff</button><input className="gva-input" type="month" value={month} onChange={e=>setMonth(e.target.value)}/><button className="gva-btn secondary" onClick={load} disabled={loading}>{loading?"Đang tải…":"Làm mới"}</button></div>
    </div>
    {error&&<div className="gva-msg err">{error}</div>}{message&&<div className="gva-msg">{message}</div>}

    <div className="gvs-team-kpis">
      <K label="Pending staff requests" value={pending.length} hint="Cần kiểm tra trước khi vào Booking Master"/>
      <K label="Commission earned" value={money(totalCommission)} hint="Completed + payment reconciled"/>
      <K label="Total compensation" value={money(totalPayroll)} hint="12% + adjustments (không lương cơ bản)"/>
      <K label="Payroll payable" value={money(totalPayable)} hint="Sau khi trừ advance" strong/>
    </div>

    <section className="gva-card gvs-team-section">
      <div className="gva-section-head"><div><h2>Sales Staff · Auto Linked</h2><div className="gva-mini">Tạo một lần → Sales Code + sales_pax_v1 + Booking Portal + Monthly Payroll tự có. Không cần tạo Payroll thủ công.</div></div><button className="gva-btn" onClick={()=>setNewStaffOpen(true)}>+ Thêm nhân viên</button></div>
      <div className="gva-table-wrap"><table className="gva-table"><thead><tr><th>Nhân viên</th><th>Sales Code</th><th>Trang booking</th><th>Payroll plan</th><th>Portal</th><th>PIN bảo mật</th></tr></thead><tbody>
        {staff.map(s=><tr key={s.id}><td><b>{s.display_name}</b></td><td><b>{s.sales_code}</b></td><td>{s.sales_page||"—"}</td><td>{s.compensation_plan_code==="sales_pax_v1"?"✓ sales_pax_v1":s.compensation_plan_code||"—"}</td><td>{s.allow_booking_portal?(pinStatus[s.id]?"✓ Sẵn sàng":"Cần đặt PIN"):"—"}</td><td><button className="gva-btn secondary" disabled={saving||!s.allow_booking_portal} onClick={()=>configureStaffPin(s)}>{pinStatus[s.id]?"Đổi PIN":"Đặt PIN riêng"}</button></td></tr>)}
        {!staff.length&&<tr><td colSpan={6}><div className="gva-empty">Chưa có sales staff.</div></td></tr>}
      </tbody></table></div>
    </section>

    <PublicInquiryPanel supabase={supabase}/>

    <section className="gva-card gvs-team-section">
      <div className="gva-section-head"><div><h2>Staff Booking Requests</h2><div className="gva-mini">Booking Request từ bất kỳ trang nhân viên nào đều vào Pending tại đây → Admin Approve → Booking Master → Operations → Finance → Payroll.</div></div></div>
      <div className="gvs-request-list">
        {pending.map(r=><div className="gvs-request" key={r.id}>
          <div><b>{r.booking_code}</b><span>{staffMap[r.staff_id]?.display_name||r.sales_code}</span></div>
          <div><strong>{r.guest_name}</strong><small>{r.tour_date} · {r.tour_name||"Tour"} · {r.adults+r.children+r.infants} pax</small></div>
          <div><strong>{money(num(r.gross_revenue_vnd)-num(r.discount_vnd))}</strong><small>Deposit {money(r.deposit_vnd)}</small></div>
          <div className="gvs-request-actions"><button className="gva-btn secondary" onClick={()=>setEditRequest(r)}>Sửa</button><button className="gva-btn" onClick={()=>approveRequest(r.id)} disabled={saving}>Duyệt</button><button className="gvs-danger" onClick={()=>rejectRequest(r.id)} disabled={saving}>Từ chối</button></div>
        </div>)}
        {!pending.length&&<div className="gva-empty">Không có booking request đang chờ.</div>}
      </div>
    </section>

    <section className="gva-card gvs-team-section">
      <div className="gva-section-head"><div><h2>Monthly Payroll</h2><div className="gva-mini">Hoa hồng chỉ earned khi tour Completed/Closed và payment đã reconcile.</div></div></div>
      <div className="gvs-payroll-grid">
        {payroll.map(p=><article className="gvs-payroll-card" key={p.staff_id}>
          <div className="gvs-payroll-title"><div><h3>{p.display_name}</h3><span>{p.sales_code}</span></div><button className="gva-btn secondary" onClick={()=>setEditPayroll(p)}>Điều chỉnh</button></div>
          <div className="gvs-payroll-stats"><span><small>Completed tours</small><b>{p.eligible_bookings}</b></span><span><small>Total pax</small><b>{p.pax}</b></span><span><small>Revenue</small><b>{money(p.revenue_vnd)}</b></span><span><small>Commission total</small><b>{money(p.commission_vnd)}</b></span><span><small>Commission rate</small><b>12% (new bookings)</b></span></div>
          <div className="gvs-payroll-total"><span>Total compensation</span><strong>{money(p.total_compensation_vnd)}</strong></div>
          <div className="gvs-payroll-payable"><span>PAYABLE</span><strong>{money(p.payable_vnd)}</strong></div>
          {(p.commission_adjustment_vnd||p.bonus_vnd||p.deduction_vnd||p.advance_paid_vnd)?<div className="gva-mini">Adj {money(p.commission_adjustment_vnd)} · Bonus {money(p.bonus_vnd)} · Deduction {money(p.deduction_vnd)} · Advance {money(p.advance_paid_vnd)}</div>:null}
        </article>)}
      </div>
    </section>
    <section className="gva-card gvs-team-section">
      <div className="gva-section-head"><div><h2>Chính sách hoa hồng thống nhất · 12%</h2><div className="gva-mini">Tất cả các tour niêm yết và custom quote đều được tính trên giá bán thực tế sau discount (không tính trên giá vốn). Ví dụ Cham Island 950.000 ₫ / pax → 114.000 ₫; private tour 13.900.000 ₫ / 5 pax → 1.668.000 ₫ cho cả booking. Giữ nguyên chính sách cũ cho booking đã tạo trước 16/10/2026.</div></div></div>
    </section>

    <section className="gva-card gvs-team-section">
      <div className="gva-section-head"><div><h2>Staff Booking Economics</h2><div className="gva-mini">Commission tự tính bằng 12% × doanh thu booking sau giảm giá, kể cả custom tour. Dùng “Hoàn tất & chốt” để Completed + Paid + Finance Finalized trong 1 lần.</div></div></div>
      <div className="gva-table-wrap"><table className="gva-table"><thead><tr><th>Booking</th><th>Staff</th><th>Guest / Tour</th><th>Status</th><th>Revenue</th><th>Profit base</th><th>Commission</th><th></th></tr></thead><tbody>
        {bookings.map(b=><tr key={b.booking_id}><td><b>{b.booking_code}</b><div className="gva-mini">{b.tour_date}</div></td><td>{b.staff_name}</td><td><b>{b.guest_name||"—"}</b><div className="gva-mini">{b.product} · {b.pax} pax</div></td><td><span className="gva-pill">{b.status}</span><div className="gva-mini">{b.payment_status}</div></td><td>{money(b.revenue_vnd)}</td><td>{money(b.profit_before_staff_commission_vnd)}</td><td><b>{money(b.staff_commission_vnd)}</b>{!b.commission_eligible&&<div className="gva-mini">Not eligible</div>}</td><td><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><button className="gva-btn secondary" onClick={()=>setEditBooking(b)}>Edit</button><button className="gva-btn" disabled={saving||b.status==="cancelled"} onClick={()=>finalizeBookingOneClick(b)}>{b.status==="completed"&&b.payment_status==="paid"&&num(b.amount_received_vnd)>=num(b.revenue_vnd)?"✓ Chốt lại":"✓ Hoàn tất & chốt"}</button></div></td></tr>)}
        {!bookings.length&&<tr><td colSpan={8}><div className="gva-empty">Chưa có staff booking trong tháng này.</div></td></tr>}
      </tbody></table></div>
    </section>

    {newStaffOpen&&<NewSalesStaffModal saving={saving} onClose={()=>setNewStaffOpen(false)} onSubmit={createSalesStaff}/>}
    {editRequest&&<RequestModal row={editRequest} staff={staff} saving={saving} onClose={()=>setEditRequest(null)} onSubmit={saveRequest}/>} 
    {editPayroll&&<PayrollModal row={editPayroll} saving={saving} onClose={()=>setEditPayroll(null)} onSubmit={savePayrollOverride}/>} 
    {editBooking&&<BookingControlModal row={editBooking} staff={staff} saving={saving} onClose={()=>setEditBooking(null)} onSubmit={saveBookingControl}/>} 
  </div>;
}

function NewSalesStaffModal({saving,onClose,onSubmit}:any){return <div className="gva-modal-bg"><form className="gva-modal" onSubmit={onSubmit}><div className="gva-modal-head"><div><h3>Thêm Sales Staff</h3><div className="gva-mini">Hệ thống tự tạo Sales Code, gắn sales_pax_v1, bật Booking Portal và đưa vào Payroll ngay.</div></div><button type="button" className="gva-close" onClick={onClose}>✕</button></div><div className="gva-form-grid">
  <F label="Tên nhân viên"><input className="gva-input" name="display_name" placeholder="VD: Anna" required/></F>
  <F label="Market code"><select className="gva-select" name="market_code" defaultValue="RU"><option value="RU">RU · Russian</option><option value="EN">EN · English</option><option value="KO">KO · Korean</option><option value="CN">CN · Chinese</option><option value="IT">IT · Italian</option><option value="TR">TR · Turkish</option><option value="IL">IL · Hebrew / Israel</option><option value="AR">AR · Arabic</option><option value="VI">VI · Vietnamese</option></select></F>
  <F label="Trang booking (tuỳ chọn)" wide><input className="gva-input" name="sales_page" placeholder="Để trống = hệ thống tự tạo đường dẫn, VD /ru/anna"/></F>
  <F label="Ghi chú" wide><textarea className="gva-input" name="notes" rows={3} placeholder="Khu vực phụ trách / ghi chú nội bộ"/></F>
</div><div style={{padding:"10px 12px",background:"#f6f8fb",borderRadius:10,fontSize:13,lineHeight:1.5}}><b>Sau khi tạo:</b> nhân viên xuất hiện ngay trong Monthly Payroll. Booking mang Sales Code của người này sẽ tự giữ staff_id xuyên suốt đến Payroll.</div><div className="gvs-team-modal-actions"><button type="button" className="gva-btn secondary" onClick={onClose}>Hủy</button><button className="gva-btn" disabled={saving}>{saving?"Đang tạo…":"Tạo & liên kết tự động"}</button></div></form></div>}
function K({label,value,hint,strong}:any){return <div className={`gva-card gvs-team-kpi ${strong?"strong":""}`}><div className="gvs-team-label">{label}</div><div className="gvs-team-value">{value}</div><div className="gva-mini">{hint}</div></div>}
function F({label,children,wide}:any){return <div className={`gva-field ${wide?"wide":""}`}><label>{label}</label>{children}</div>}
function RequestModal({row,staff,saving,onClose,onSubmit}:any){return <div className="gva-modal-bg"><form className="gva-modal" onSubmit={onSubmit}><div className="gva-modal-head"><div><h3>Sửa Staff Request</h3><div className="gva-mini">{row.booking_code}</div></div><button type="button" className="gva-close" onClick={onClose}>✕</button></div><div className="gva-form-grid">
  <F label="Sales owner"><select className="gva-select" name="staff_id" defaultValue={row.staff_id}>{staff.map((s:any)=><option value={s.id} key={s.id}>{s.display_name}</option>)}</select></F><F label="Guest"><input className="gva-input" name="guest_name" defaultValue={row.guest_name} required/></F>
  <F label="WhatsApp"><input className="gva-input" name="phone" defaultValue={row.phone||""}/></F><F label="Tour date"><input className="gva-input" type="date" name="tour_date" defaultValue={row.tour_date} required/></F>
  <F label="Pickup time"><input className="gva-input" name="pickup_time" defaultValue={row.pickup_time||""}/></F><F label="Hotel"><input className="gva-input" name="hotel" defaultValue={row.hotel||""}/></F>
  <F label="Destination"><input className="gva-input" name="region" defaultValue={row.region||""}/></F><F label="Tour"><input className="gva-input" name="tour_name" defaultValue={row.tour_name||""}/></F>
  <F label="Package"><input className="gva-input" name="variant_name" defaultValue={row.variant_name||""}/></F><F label="Language"><input className="gva-input" name="language" defaultValue={row.language||""}/></F>
  <F label="Adults"><input className="gva-input" name="adults" type="number" min="0" defaultValue={row.adults}/></F><F label="Children"><input className="gva-input" name="children" type="number" min="0" defaultValue={row.children}/></F>
  <F label="Infants"><input className="gva-input" name="infants" type="number" min="0" defaultValue={row.infants}/></F><F label="Gross selling price"><input className="gva-input" name="gross_revenue_vnd" defaultValue={row.gross_revenue_vnd}/></F>
  <F label="Discount"><input className="gva-input" name="discount_vnd" defaultValue={row.discount_vnd}/></F><F label="Deposit received"><input className="gva-input" name="deposit_vnd" defaultValue={row.deposit_vnd}/></F>
  <F label="Notes" wide><textarea className="gva-input" name="notes" rows={3} defaultValue={row.notes||""}/></F>
</div><div className="gvs-team-modal-actions"><button type="button" className="gva-btn secondary" onClick={onClose}>Hủy</button><button className="gva-btn" disabled={saving}>{saving?"Đang lưu…":"Lưu sửa đổi"}</button></div></form></div>}
function PayrollModal({row,saving,onClose,onSubmit}:any){return <div className="gva-modal-bg"><form className="gva-modal" onSubmit={onSubmit}><div className="gva-modal-head"><div><h3>Payroll Override · {row.display_name}</h3><div className="gva-mini">Hoa hồng mới = 12% giá bán thực tế. Không áp dụng base salary từ tháng 10/2026.</div></div><button type="button" className="gva-close" onClick={onClose}>✕</button></div><div className="gva-form-grid">
  <F label="Commission adjustment (+/-)"><input className="gva-input" name="commission_adjustment_vnd" defaultValue={row.commission_adjustment_vnd||0}/></F>
  <F label="Bonus"><input className="gva-input" name="bonus_vnd" defaultValue={row.bonus_vnd||0}/></F><F label="Deduction"><input className="gva-input" name="deduction_vnd" defaultValue={row.deduction_vnd||0}/></F>
  <F label="Advance already paid"><input className="gva-input" name="advance_paid_vnd" defaultValue={row.advance_paid_vnd||0}/></F><F label="Notes" wide><textarea className="gva-input" name="notes" rows={3} defaultValue={row.override_notes||""}/></F>
</div><div className="gvs-team-modal-actions"><button type="button" className="gva-btn secondary" onClick={onClose}>Hủy</button><button className="gva-btn" disabled={saving}>{saving?"Đang lưu…":"Lưu payroll"}</button></div></form></div>}
function BookingControlModal({row,staff,saving,onClose,onSubmit}:any){return <div className="gva-modal-bg"><form className="gva-modal" onSubmit={onSubmit}><div className="gva-modal-head"><div><h3>Booking Control · {row.booking_code}</h3><div className="gva-mini">Commission = 12% của giá bán tour thực tế cho booking mới. Chỉ override số tiền khi thật sự cần.</div></div><button type="button" className="gva-close" onClick={onClose}>✕</button></div><div className="gva-form-grid">
  <F label="Sales owner"><select className="gva-select" name="staff_id" defaultValue={row.staff_id}>{staff.map((s:any)=><option value={s.id} key={s.id}>{s.display_name}</option>)}</select></F>
  <F label="Booking status"><select className="gva-select" name="status" defaultValue={row.status}><option value="pending">pending</option><option value="confirmed">confirmed</option><option value="ready">ready</option><option value="in_progress">in_progress</option><option value="completed">completed</option><option value="closed">closed</option><option value="cancelled">cancelled</option></select></F>
  <F label="Payment status"><select className="gva-select" name="payment_status" defaultValue={row.payment_status}><option value="unpaid">unpaid</option><option value="deposit">deposit</option><option value="paid">paid</option><option value="refunded">refunded</option></select></F>
  <F label="Commission eligible"><select className="gva-select" name="commission_eligible" defaultValue={row.commission_eligible?"yes":"no"}><option value="yes">Yes</option><option value="no">No</option></select></F>
  <F label="Commission amount override"><input className="gva-input" name="commission_amount_override_vnd" placeholder="Để trống = tự tính 12% trên giá bán thực tế" defaultValue={row.commission_amount_override_vnd??""}/></F>
  <F label="Override reason" wide><textarea className="gva-input" name="override_notes" rows={3} defaultValue={row.override_notes||""}/></F>
</div><div className="gvs-team-modal-actions"><button type="button" className="gva-btn secondary" onClick={onClose}>Hủy</button><button className="gva-btn" disabled={saving}>{saving?"Đang lưu…":"Lưu + tính lại"}</button></div></form></div>}
