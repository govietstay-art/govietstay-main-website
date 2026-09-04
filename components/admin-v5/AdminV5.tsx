"use client";
// GVS-LANGUAGE-MATRIX-V3
// GVS_MARKETING_FUNNEL_V7
// GVS_MARKETING_LINK_GENERATOR_V8

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./admin-v5.css";
import MarketingTools from "./MarketingTools";
import ReviewRequestTools from "./ReviewRequestTools";
import PartnerTools from "./PartnerTools";
import FinancePL from "./FinancePL";
import OperatorPayables from "./OperatorPayables";
import StaffSalesTeam from "./StaffSalesTeam";

const SUPABASE_URL = "https://vscffgnxaexestnayvae.supabase.co";
const SUPABASE_KEY = "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

type Staff = { id:string; display_name:string; role:string; active:boolean; auth_user_id:string|null };
type Tour = { id:string; name:string; destination:string|null; adult_price_vnd:number|null; active:boolean };
type Partner = { id:string; name:string; ref_code:string; active:boolean };
type Contact = { id:string; full_name:string|null; whatsapp:string|null; country:string|null; preferred_language:string|null };
type Lead = { id:string; contact_id:string|null; interested_tour_id:string|null; partner_id:string|null; status:string; source:string|null; message:string|null; created_at:string };
type Booking = { id:string; booking_code:string|null; contact_id:string|null; tour_id:string|null; partner_id:string|null; status:string; payment_status:string; tour_date:string|null; pax:number; net_revenue_vnd:number; source:string|null; created_at:string };

function money(v:any) { return new Intl.NumberFormat("vi-VN").format(Number(v || 0)) + " ₫"; }
function d(v:string|null) { return v ? new Date(v).toLocaleString("vi-VN") : "—"; }
function code() { return "GVS-" + new Date().toISOString().slice(2,10).replace(/-/g,"") + "-" + Math.random().toString(36).slice(2,7).toUpperCase(); }

const GVS_BOOKING_LANGUAGES = [
  ["", "—"],
  ["en", "English"],
  ["ru", "Russian"],
  ["ko", "Korean"],
  ["it", "Italian"],
  ["zh", "Chinese / 中文"],
  ["tr", "Turkish"],
  ["he", "Hebrew"],
  ["ar", "Arabic / العربية"],
  ["vi", "Vietnamese"],
] as const;

export default function AdminV5() {
  const [loading,setLoading]=useState(true);
  const [session,setSession]=useState<any>(null);
  const [staff,setStaff]=useState<Staff|null>(null);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [authMode,setAuthMode]=useState<"login"|"signup">("login");
  const [bootstrap,setBootstrap]=useState("");
  const [msg,setMsg]=useState("");
  const [err,setErr]=useState("");
  const [tab,setTab]=useState<"dashboard"|"analytics"|"marketing"|"partners"|"seo"|"leads"|"bookings"|"reviews"|"finance"|"team"|"operator_payables">("dashboard");
  const [days,setDays]=useState(7);
  const [metrics,setMetrics]=useState<any>(null);
  const [breakdown,setBreakdown]=useState<any[]>([]);

  const [marketing,setMarketing]=useState<any[]>([]);
  const [analytics,setAnalytics]=useState<Record<string,any[]>>({
    country:[], city:[], source:[], device:[], browser:[], os:[], locale:[], landing:[]
  });
  const [tours,setTours]=useState<Tour[]>([]);
  const [partners,setPartners]=useState<Partner[]>([]);
  const [contacts,setContacts]=useState<Contact[]>([]);
  const [leads,setLeads]=useState<Lead[]>([]);
  const [bookings,setBookings]=useState<Booking[]>([]);
  const [seoOverview,setSeoOverview]=useState<any>(null);
  const [seoPages,setSeoPages]=useState<any[]>([]);
  const [seoQueries,setSeoQueries]=useState<any[]>([]);
  const [seoCountries,setSeoCountries]=useState<any[]>([]);
  const [seoOpportunities,setSeoOpportunities]=useState<any[]>([]);
  const [seoLastSync,setSeoLastSync]=useState<any>(null);
  const [syncingSeo,setSyncingSeo]=useState(false);
  const [modal,setModal]=useState<null|"lead"|"booking">(null);
  const [saving,setSaving]=useState(false);

  const contactMap=useMemo(()=>Object.fromEntries(contacts.map(x=>[x.id,x])),[contacts]);
  const tourMap=useMemo(()=>Object.fromEntries(tours.map(x=>[x.id,x])),[tours]);
  const partnerMap=useMemo(()=>Object.fromEntries(partners.map(x=>[x.id,x])),[partners]);

  async function resolveStaff(userId:string) {
    const {data,error}=await supabase.from("staff_profiles").select("id,display_name,role,active,auth_user_id").eq("auth_user_id",userId).eq("active",true).maybeSingle();
    if(error) throw error;
    setStaff(data as any || null);
    return data as any || null;
  }

  useEffect(()=>{
    let alive=true;
    supabase.auth.getSession().then(async ({data})=>{
      if(!alive)return;
      setSession(data.session);
      if(data.session?.user?.id) {
        try { await resolveStaff(data.session.user.id); } catch(e:any) { setErr(e.message); }
      }
      setLoading(false);
    });
    const {data:sub}=supabase.auth.onAuthStateChange(async (_event,s)=>{
      setSession(s); setErr(""); setMsg("");
      if(s?.user?.id) { try{await resolveStaff(s.user.id)}catch(e:any){setErr(e.message)} }
      else setStaff(null);
    });
    return()=>{alive=false;sub.subscription.unsubscribe();};
  },[]);

  useEffect(()=>{ if(staff && (staff.role==="owner"||staff.role==="admin")) loadAll(); },[staff,days]);

  async function loadAll() {
    setErr("");
    try {
      const dims = ["country","city","source","device","browser","os","locale","landing"];
      const dimPromises = dims.map(dimension =>
        supabase.rpc("admin_analytics_dimension",{p_days:days,p_dimension:dimension})
      );
      const seoPromises = [
        supabase.rpc("admin_seo_overview",{p_days:days}),
        supabase.rpc("admin_seo_pages",{p_days:days,p_limit:50}),
        supabase.rpc("admin_seo_queries",{p_days:days,p_limit:100}),
        supabase.rpc("admin_seo_countries",{p_days:days,p_limit:50}),
        supabase.rpc("admin_seo_opportunities",{p_days:days,p_limit:50}),
        supabase.from("search_console_sync_runs").select("id,started_at,completed_at,start_date,end_date,rows_received,rows_upserted,status,error_message").order("started_at",{ascending:false}).limit(1).maybeSingle()
      ];

      const results = await Promise.all([
        supabase.rpc("admin_dashboard_metrics",{p_days:days}),
        supabase.rpc("admin_tracking_breakdown",{p_days:days}),

        supabase.rpc("admin_marketing_funnel",{p_days:days}),
        supabase.from("tours").select("id,name,destination,adult_price_vnd,active").eq("active",true).order("name"),
        supabase.from("partners").select("id,name,ref_code,active").eq("active",true).order("name"),
        supabase.from("contacts").select("id,full_name,whatsapp,country,preferred_language").order("created_at",{ascending:false}).limit(300),
        supabase.from("leads").select("id,contact_id,interested_tour_id,partner_id,status,source,message,created_at").order("created_at",{ascending:false}).limit(100),
        supabase.from("bookings").select("id,booking_code,contact_id,tour_id,partner_id,status,payment_status,tour_date,pax,net_revenue_vnd,source,created_at").order("created_at",{ascending:false}).limit(100),
        ...dimPromises,
        ...seoPromises
      ]);

      for(const r of results) if(r.error) throw r.error;
      const [m,b,mk,t,p,c,l,bo,...rest] = results;
      setMetrics(m.data);
      setBreakdown((b.data||[]) as any);

      setMarketing((mk.data||[]) as any);
      setTours((t.data||[]) as any);
      setPartners((p.data||[]) as any);
      setContacts((c.data||[]) as any);
      setLeads((l.data||[]) as any);
      setBookings((bo.data||[]) as any);

      const dimResults = rest.slice(0,dims.length);
      const seoResults = rest.slice(dims.length);
      const nextAnalytics:Record<string,any[]> = {};
      dims.forEach((dimension,i)=> nextAnalytics[dimension] = (dimResults[i].data||[]) as any[]);
      setAnalytics(nextAnalytics);

      setSeoOverview(seoResults[0].data||null);
      setSeoPages((seoResults[1].data||[]) as any[]);
      setSeoQueries((seoResults[2].data||[]) as any[]);
      setSeoCountries((seoResults[3].data||[]) as any[]);
      setSeoOpportunities((seoResults[4].data||[]) as any[]);
      setSeoLastSync(seoResults[5].data||null);
    } catch(e:any) { setErr(e.message||"Không tải được dữ liệu"); }
  }

  async function syncSearchConsole() {
    setSyncingSeo(true); setErr(""); setMsg("");
    try {
      const {data:{session:currentSession}} = await supabase.auth.getSession();
      if(!currentSession?.access_token) throw new Error("Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại.");
      const initialDays = seoLastSync?.status==="success" ? 14 : 90;
      const response = await fetch("/api/admin/search-console/sync",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer "+currentSession.access_token
        },
        body:JSON.stringify({days:initialDays})
      });
      const data = await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(data?.error||"Không đồng bộ được Search Console.");
      setMsg(`Search Console đã đồng bộ ${data.rows_upserted||0} dòng (${data.start_date} → ${data.end_date}).`);
      await loadAll();
    } catch(e:any) {
      setErr(e.message||"Không đồng bộ được Search Console");
    } finally {
      setSyncingSeo(false);
    }
  }

  async function authSubmit(e:any) {
    e.preventDefault(); setErr("");setMsg("");
    if(authMode==="signup") {
      const {data,error}=await supabase.auth.signUp({email,password,options:{emailRedirectTo:window.location.origin+"/admin"}});
      if(error) return setErr(error.message);
      if(data.session) setMsg("Tài khoản đã tạo. Bây giờ nhập mã OWNER để kích hoạt.");
      else setMsg("Đã tạo tài khoản. Hãy kiểm tra email xác nhận, rồi quay lại đăng nhập.");
    } else {
      const {error}=await supabase.auth.signInWithPassword({email,password});
      if(error) setErr(error.message);
    }
  }

  async function claimOwner() {
    setErr("");setMsg("");
    const {data,error}=await supabase.rpc("claim_govietstay_owner",{p_code:bootstrap.trim()});
    if(error) return setErr(error.message);
    setMsg("Đã kích hoạt quyền Owner.");
    if(session?.user?.id) await resolveStaff(session.user.id);
  }

  async function logout() { await supabase.auth.signOut(); }

  async function createContact(values:any) {
    const {data,error}=await supabase.from("contacts").insert({
      full_name:values.full_name.trim(), whatsapp:values.whatsapp.trim()||null, country:values.country.trim()||null,
      preferred_language:values.preferred_language||null, first_source:values.source||null,
      first_partner_ref:values.ref_code||null
    }).select("id").single();
    if(error) throw error;
    return data.id as string;
  }

  async function addLead(e:any) {
    e.preventDefault(); setSaving(true);setErr("");
    const f=new FormData(e.currentTarget);
    try {
      const vals=Object.fromEntries(f.entries()) as any;
      const partner=partners.find(x=>x.id===vals.partner_id);
      const contactId=await createContact({...vals,ref_code:partner?.ref_code||""});
      const {error}=await supabase.from("leads").insert({
        contact_id:contactId, assigned_staff_id:staff?.id, partner_id:vals.partner_id||null,
        interested_tour_id:vals.tour_id||null, status:"new", source:vals.source||"manual",
        source_detail:"admin_v5", ref_code:partner?.ref_code||null, message:vals.message||null
      });
      if(error) throw error;
      setModal(null); await loadAll();
    } catch(e:any){setErr(e.message)} finally{setSaving(false)}
  }

  async function addBooking(e:any) {
    e.preventDefault();setSaving(true);setErr("");
    const f=new FormData(e.currentTarget);
    try {
      const vals=Object.fromEntries(f.entries()) as any;
      const partner=partners.find(x=>x.id===vals.partner_id);
      const contactId=await createContact({...vals,ref_code:partner?.ref_code||""});
      const adults=Math.max(0,Number(vals.adults||0)), children=Math.max(0,Number(vals.children||0));
      const revenue=Math.max(0,Number(String(vals.revenue||"0").replace(/[^0-9]/g,"")));
      const {error}=await supabase.from("bookings").insert({
        booking_code:code(), contact_id:contactId, tour_id:vals.tour_id||null, partner_id:vals.partner_id||null,
        staff_id:staff?.id, tour_date:vals.tour_date||null, adults, children, gross_revenue_vnd:revenue, guide_language:vals.guide_language||null,
        discount_vnd:0, deposit_required_vnd:0, status:"confirmed", payment_status:"unpaid",
        hotel:vals.hotel||null, notes:vals.notes||null, source:vals.source||"manual", ref_code:partner?.ref_code||null
      });
      if(error) throw error;
      setModal(null); await loadAll();
    }catch(e:any){setErr(e.message)}finally{setSaving(false)}
  }

  async function changeLeadStatus(id:string,status:string) {
    const {error}=await supabase.from("leads").update({status}).eq("id",id);
    if(error)setErr(error.message); else loadAll();
  }

  if(loading) return <div className="gva-login"><div className="gva-login-card">Đang mở GoVietStay Admin…</div></div>;

  if(!session) return <div className="gva-login"><form className="gva-login-card" onSubmit={authSubmit}>
    <div className="gva-brand">GoVietStay Admin V7</div>
    <div className="gva-sub">Login bảo mật bằng Supabase Auth. Dashboard chỉ hiển thị dữ liệu thật.</div>
    {err&&<div className="gva-msg err">{err}</div>}{msg&&<div className="gva-msg">{msg}</div>}
    <div className="gva-field"><label>Email</label><input className="gva-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
    <div className="gva-field"><label>Mật khẩu</label><input className="gva-input" type="password" minLength={8} value={password} onChange={e=>setPassword(e.target.value)} required /></div>
    <button className="gva-btn" style={{width:"100%",marginTop:8}}>{authMode==="login"?"Đăng nhập":"Tạo tài khoản Owner"}</button>
    <button type="button" className="gva-btn secondary" style={{width:"100%",marginTop:8}} onClick={()=>setAuthMode(authMode==="login"?"signup":"login")}>
      {authMode==="login"?"Lần đầu? Tạo tài khoản Owner":"Đã có tài khoản? Đăng nhập"}
    </button>
  </form></div>;

  if(!staff) return <div className="gva-login"><div className="gva-login-card">
    <div className="gva-brand">Kích hoạt Owner</div>
    <div className="gva-sub">Tài khoản đã đăng nhập nhưng chưa được cấp quyền GoVietStay. Nhập mã Owner một lần duy nhất từ file cài đặt V5.</div>
    {err&&<div className="gva-msg err">{err}</div>}{msg&&<div className="gva-msg">{msg}</div>}
    <div className="gva-field"><label>Owner bootstrap code</label><input className="gva-input" value={bootstrap} onChange={e=>setBootstrap(e.target.value)} /></div>
    <button className="gva-btn" onClick={claimOwner}>Kích hoạt quyền Owner</button>
    <button className="gva-btn secondary" style={{marginLeft:8}} onClick={logout}>Đăng xuất</button>
  </div></div>;

  if(!(staff.role==="owner"||staff.role==="admin")) return <div className="gva-login"><div className="gva-login-card">
    <div className="gva-brand">Chưa có quyền Admin</div><div className="gva-sub">Tài khoản này có role {staff.role}. V7 hiện chỉ mở cho Owner/Admin.</div>
    <button className="gva-btn" onClick={logout}>Đăng xuất</button>
  </div></div>;

  return <div className="gva-shell"><div className="gva-layout">
    <aside className="gva-side">
      <div className="logo">GoVietStay</div><div className="small">Admin V7 · SEO Intelligence</div>
      <div className="gva-nav">
        <button className={tab==="dashboard"?"active":""} onClick={()=>setTab("dashboard")}>Tổng quan</button>
        <button className={tab==="analytics"?"active":""} onClick={()=>setTab("analytics")}>Analytics</button>

        <button className={tab==="marketing"?"active":""} onClick={()=>setTab("marketing")}>Marketing</button>
        <button className={tab==="partners"?"active":""} onClick={()=>setTab("partners")}>Partners / QR</button>
        <button className={tab==="seo"?"active":""} onClick={()=>setTab("seo")}>SEO Intelligence</button>
        <button className={tab==="leads"?"active":""} onClick={()=>setTab("leads")}>Leads</button>
        <button className={tab==="bookings"?"active":""} onClick={()=>setTab("bookings")}>Bookings</button>
        <button className={tab=="team"?"active":""} onClick={()=>setTab("team")}>Sales Team / Payroll</button>
        <button className={tab=="operator_payables"?"active":""} onClick={()=>setTab("operator_payables")}>Công nợ Tour Ghép</button>
        <button className={tab=="finance"?"active":""} onClick={()=>setTab("finance")}>P&L / Finance</button>
        <button className={tab==="reviews"?"active":""} onClick={()=>setTab("reviews")}>Reviews</button>
      </div>
    </aside>
    <main className="gva-main">
      <div className="gva-top">
        <div className="gva-title"><h1>{adminPageTitle(tab)}</h1><p>{staff.display_name} · {staff.role} · dữ liệu từ Supabase</p></div>
        <div className="gva-top-actions">
          <select className="gva-select" value={days} onChange={e=>setDays(Number(e.target.value))}><option value={1}>Hôm nay</option><option value={7}>7 ngày</option><option value={28}>28 ngày</option><option value={30}>30 ngày</option><option value={90}>90 ngày</option></select>
          <button className="gva-btn secondary" onClick={loadAll}>Làm mới</button><button className="gva-btn secondary" onClick={logout}>Đăng xuất</button>
        </div>
      </div>
      {err&&<div className="gva-msg err">{err}</div>}

      {tab==="dashboard"&&<>
        <div className="gva-kpis">
          <KPI label="Page views" value={metrics?.page_views||0} hint="Website thật"/>
          <KPI label="Visitors" value={metrics?.visitors||0} hint="Visitor ID duy nhất"/>
          <KPI label="WhatsApp Click" value={metrics?.whatsapp_clicks||0} hint="Click thật"/>
          <KPI label="Leads" value={metrics?.leads||0} hint="CRM Supabase"/>
          <KPI label="Bookings" value={metrics?.bookings||0} hint="Không tính cancelled"/>
          <KPI label="Pax" value={metrics?.pax||0} hint="Khách đã booking"/>
          <KPI label="Revenue" value={money(metrics?.revenue_vnd)} hint="Net revenue"/>
          <KPI label="Partner visits" value={metrics?.partner_visits||0} hint="?ref= partner"/>
          <KPI label="Partner WA" value={metrics?.partner_whatsapp_clicks||0} hint="Partner → WhatsApp"/>
          <KPI label="Conversion" value={(metrics?.conversion_rate||0)+"%"} hint="Booking / WhatsApp"/>
          <KPI label="New visitors" value={metrics?.new_visitors||0} hint="Lần đầu"/>
          <KPI label="Returning" value={metrics?.returning_visitors||0} hint="Quay lại"/>
          <KPI label="Countries" value={metrics?.countries_tracked||0} hint="Có geo từ V6"/>
        </div>
        <div className="gva-grid2">
          <div className="gva-card"><h3>Trang đang tạo traffic</h3><div className="gva-table-wrap"><table className="gva-table"><thead><tr><th>Path</th><th>Views</th><th>WA</th><th>Partner</th></tr></thead><tbody>
            {breakdown.length?breakdown.map((r:any)=><tr key={r.path}><td>{r.path}</td><td>{r.page_views}</td><td>{r.whatsapp_clicks}</td><td>{r.partner_visits}</td></tr>):<tr><td colSpan={4}><div className="gva-empty">Chưa có dữ liệu tracking trong kỳ.</div></td></tr>}
          </tbody></table></div></div>
          <div className="gva-card"><h3>Booking mới nhất</h3><div className="gva-table-wrap"><table className="gva-table"><thead><tr><th>Khách</th><th>Tour</th><th>Pax</th><th>Revenue</th></tr></thead><tbody>
            {bookings.slice(0,8).map(b=><tr key={b.id}><td>{contactMap[b.contact_id||""]?.full_name||"—"}</td><td>{tourMap[b.tour_id||""]?.name||"—"}</td><td>{b.pax}</td><td>{money(b.net_revenue_vnd)}</td></tr>)}
            {!bookings.length&&<tr><td colSpan={4}><div className="gva-empty">Chưa có booking thật.</div></td></tr>}
          </tbody></table></div></div>
        </div>
      </>}


      {tab==="analytics"&&<>
        <div className="gva-analytics-note">
          Dữ liệu quốc gia/thành phố bắt đầu thu từ thời điểm V6 được deploy. Dữ liệu cũ vẫn giữ source/device/landing nếu có, nhưng không thể suy ngược quốc gia vì hệ thống không lưu IP.
        </div>
        <div className="gva-analytics-grid">
          <AnalyticsCard title="Quốc gia" rows={analytics.country} labelTitle="Country" />
          <AnalyticsCard title="Nguồn traffic" rows={analytics.source} labelTitle="Source" />
          <AnalyticsCard title="Thiết bị" rows={analytics.device} labelTitle="Device" />
          <AnalyticsCard title="Thành phố" rows={analytics.city} labelTitle="City" />
          <AnalyticsCard title="Landing pages" rows={analytics.landing} labelTitle="Landing" />
          <AnalyticsCard title="Browser" rows={analytics.browser} labelTitle="Browser" />
          <AnalyticsCard title="Hệ điều hành" rows={analytics.os} labelTitle="OS" />
          <AnalyticsCard title="Ngôn ngữ" rows={analytics.locale} labelTitle="Locale" />
        </div>
      </>}


      {tab==="marketing"&&<>



        <div className="gva-analytics-note">



          Theo dõi hiệu quả từng nguồn: Threads, Instagram, X, Facebook, Google Maps, TikTok, Telegram, Zalo, Google, ChatGPT, Partner, Referral và Direct.



        </div>



        <div className="gva-card">



          <div className="gva-section-head">



            <div>



              <h2>Marketing Funnel</h2>



              <div className="gva-mini">Visitors → Views → WhatsApp → Leads → Bookings → Pax → Revenue</div>



            </div>



          </div>



          <div className="gva-table-wrap">



            <table className="gva-table">



              <thead>



                <tr><th>Channel</th><th>Visitors</th><th>Views</th><th>WA</th><th>Leads</th><th>Booking</th><th>Pax</th><th>Revenue</th></tr>



              </thead>



              <tbody>



                {marketing.map((r:any)=><tr key={r.channel}>



                  <td><b>{r.display_name}</b></td>



                  <td>{r.visitors||0}</td>



                  <td>{r.views||0}</td>



                  <td><b>{r.whatsapp_clicks||0}</b></td>



                  <td>{r.leads||0}</td>



                  <td>{r.bookings||0}</td>



                  <td>{r.pax||0}</td>



                  <td>{money(r.revenue_vnd||0)}</td>



                </tr>)}



                {!marketing.length&&<tr><td colSpan={8}><div className="gva-empty">Chưa có dữ liệu marketing trong kỳ.</div></td></tr>}



              </tbody>



            </table>



          </div>



        </div>



              <MarketingTools supabase={supabase} days={days}/>
      </>}




      {tab==="partners"&&<PartnerTools supabase={supabase} days={days}/>}

      {tab==="seo"&&<>
        <div className="gva-section-head">
          <div>
            <h2>Google Search Console → Landing Page → WhatsApp</h2>
            <div className="gva-mini">
              {seoLastSync?.completed_at
                ? <>Lần đồng bộ gần nhất: <b>{d(seoLastSync.completed_at)}</b> · {seoLastSync.rows_upserted||0} dòng</>
                : <>Chưa đồng bộ Search Console lần đầu.</>}
            </div>
          </div>
          <button className="gva-btn" onClick={syncSearchConsole} disabled={syncingSeo}>
            {syncingSeo?"Đang lấy dữ liệu Google…":seoLastSync?"Cập nhật Search Console":"Đồng bộ Search Console lần đầu"}
          </button>
        </div>

        <div className="gva-analytics-note">
          Search Console thường chậm khoảng 2–3 ngày. V7 ghép dữ liệu Google Search với tracking website để ưu tiên đúng landing page đang có cơ hội SEO.
        </div>

        <div className="gva-kpis">
          <KPI label="Google Clicks" value={seoOverview?.clicks||0} hint="Search Console"/>
          <KPI label="Impressions" value={seoOverview?.impressions||0} hint="Google Search"/>
          <KPI label="CTR" value={(seoOverview?.ctr||0)+"%"} hint="Clicks / Impressions"/>
          <KPI label="Avg Position" value={Number(seoOverview?.avg_position||0).toFixed(1)} hint="Vị trí trung bình"/>
          <KPI label="Queries" value={seoOverview?.queries||0} hint="Từ khóa Google"/>
          <KPI label="SEO Pages" value={seoOverview?.pages||0} hint="Landing pages có dữ liệu"/>
        </div>

        <div className="gva-card gva-seo-opportunity">
          <div className="gva-section-head"><h2>Cơ hội SEO ưu tiên</h2><div className="gva-mini">Impression cao + vị trí 4–20 + CTR còn thấp</div></div>
          <div className="gva-table-wrap"><table className="gva-table">
            <thead><tr><th>Query</th><th>Landing page</th><th>Imp.</th><th>Clicks</th><th>CTR</th><th>Pos.</th><th>Score</th></tr></thead>
            <tbody>
              {seoOpportunities.slice(0,20).map((r:any,i:number)=><tr key={r.query+"|"+r.page+"|"+i}>
                <td><b>{r.query}</b></td>
                <td title={r.page}>{shortPage(r.page)}</td>
                <td>{r.impressions}</td><td>{r.clicks}</td><td>{Number(r.ctr||0).toFixed(1)}%</td>
                <td><span className="gva-pill">{Number(r.position||0).toFixed(1)}</span></td>
                <td><b>{Number(r.opportunity_score||0).toFixed(0)}</b></td>
              </tr>)}
              {!seoOpportunities.length&&<tr><td colSpan={7}><div className="gva-empty">Chưa có dữ liệu. Bấm “Đồng bộ Search Console”.</div></td></tr>}
            </tbody>
          </table></div>
        </div>

        <div className="gva-grid2 gva-seo-grid">
          <div className="gva-card"><h3>Landing pages trên Google</h3><div className="gva-table-wrap"><table className="gva-table">
            <thead><tr><th>Page</th><th>Clicks</th><th>Imp.</th><th>CTR</th><th>Pos.</th><th>Visitors</th><th>WA</th></tr></thead>
            <tbody>
              {seoPages.slice(0,25).map((r:any,i:number)=><tr key={r.page+"|"+i}>
                <td title={r.page}><b>{shortPage(r.page)}</b></td><td>{r.clicks}</td><td>{r.impressions}</td>
                <td>{Number(r.ctr||0).toFixed(1)}%</td><td>{Number(r.position||0).toFixed(1)}</td>
                <td>{r.visitors||0}</td><td><b>{r.whatsapp_clicks||0}</b></td>
              </tr>)}
              {!seoPages.length&&<tr><td colSpan={7}><div className="gva-empty">Chưa có dữ liệu Search Console.</div></td></tr>}
            </tbody>
          </table></div></div>

          <div className="gva-card"><h3>Top Google Queries</h3><div className="gva-table-wrap"><table className="gva-table">
            <thead><tr><th>Query</th><th>Clicks</th><th>Imp.</th><th>CTR</th><th>Pos.</th></tr></thead>
            <tbody>
              {seoQueries.slice(0,30).map((r:any,i:number)=><tr key={r.query+"|"+i}>
                <td><b>{r.query}</b></td><td>{r.clicks}</td><td>{r.impressions}</td>
                <td>{Number(r.ctr||0).toFixed(1)}%</td><td>{Number(r.position||0).toFixed(1)}</td>
              </tr>)}
              {!seoQueries.length&&<tr><td colSpan={5}><div className="gva-empty">Chưa có query từ Google.</div></td></tr>}
            </tbody>
          </table></div></div>
        </div>

        <div className="gva-card" style={{marginTop:15}}><h3>Google Search theo quốc gia</h3><div className="gva-table-wrap"><table className="gva-table">
          <thead><tr><th>Country</th><th>Clicks</th><th>Impressions</th><th>CTR</th><th>Position</th></tr></thead>
          <tbody>
            {seoCountries.slice(0,30).map((r:any,i:number)=><tr key={r.country+"|"+i}>
              <td><b>{countryLabel(r.country)}</b></td><td>{r.clicks}</td><td>{r.impressions}</td>
              <td>{Number(r.ctr||0).toFixed(1)}%</td><td>{Number(r.position||0).toFixed(1)}</td>
            </tr>)}
            {!seoCountries.length&&<tr><td colSpan={5}><div className="gva-empty">Chưa có dữ liệu quốc gia từ Search Console.</div></td></tr>}
          </tbody>
        </table></div></div>
      </>}

      {tab==="leads"&&<>
        <div className="gva-section-head"><h2>Leads</h2><button className="gva-btn" onClick={()=>setModal("lead")}>+ Tạo Lead</button></div>
        <div className="gva-card"><div className="gva-table-wrap"><table className="gva-table"><thead><tr><th>Ngày</th><th>Khách</th><th>WhatsApp</th><th>Nguồn</th><th>Tour</th><th>Partner</th><th>Status</th></tr></thead><tbody>
          {leads.map(l=><tr key={l.id}><td>{d(l.created_at)}</td><td><b>{contactMap[l.contact_id||""]?.full_name||"—"}</b><div className="gva-mini">{contactMap[l.contact_id||""]?.country||""}</div></td><td>{contactMap[l.contact_id||""]?.whatsapp||"—"}</td><td>{l.source||"—"}</td><td>{tourMap[l.interested_tour_id||""]?.name||"—"}</td><td>{partnerMap[l.partner_id||""]?.ref_code||"—"}</td><td><select className="gva-select" value={l.status} onChange={e=>changeLeadStatus(l.id,e.target.value)}><option>new</option><option>contacted</option><option>quoted</option><option>follow_up</option><option>won</option><option>lost</option><option>spam</option></select></td></tr>)}
          {!leads.length&&<tr><td colSpan={7}><div className="gva-empty">Chưa có Lead thật. Bấm “Tạo Lead”.</div></td></tr>}
        </tbody></table></div></div>
      </>}

      {tab==="bookings"&&<>
        <div className="gva-section-head"><h2>Bookings</h2><button className="gva-btn" onClick={()=>setModal("booking")}>+ Tạo Booking</button></div>
        <div className="gva-card"><div className="gva-table-wrap"><table className="gva-table"><thead><tr><th>Code</th><th>Ngày tour</th><th>Khách</th><th>Tour</th><th>Pax</th><th>Revenue</th><th>Payment</th><th>Status</th></tr></thead><tbody>
          {bookings.map(b=><tr key={b.id}><td><b>{b.booking_code||"—"}</b></td><td>{b.tour_date||"—"}</td><td>{contactMap[b.contact_id||""]?.full_name||"—"}</td><td>{tourMap[b.tour_id||""]?.name||"—"}</td><td>{b.pax}</td><td>{money(b.net_revenue_vnd)}</td><td><span className="gva-pill">{b.payment_status}</span></td><td><span className="gva-pill">{b.status}</span></td></tr>)}
          {!bookings.length&&<tr><td colSpan={8}><div className="gva-empty">Chưa có Booking thật.</div></td></tr>}
        </tbody></table></div></div>
      </>}


            {tab==="team"&&<StaffSalesTeam supabase={supabase} adminStaff={staff}/>}
            {tab=="operator_payables"&&<OperatorPayables supabase={supabase}/>}
            {tab==="finance"&&<FinancePL supabase={supabase}/>} 

      {/* GVS_REVIEW_WHATSAPP_V1 */}
      {tab==="reviews"&&<>
        <ReviewRequestTools bookings={bookings} contactMap={contactMap} tourMap={tourMap}/>
      </>}
    </main>
    {modal==="lead"&&<LeadModal tours={tours} partners={partners} onClose={()=>setModal(null)} onSubmit={addLead} saving={saving}/>}
    {modal==="booking"&&<BookingModal tours={tours} partners={partners} onClose={()=>setModal(null)} onSubmit={addBooking} saving={saving}/>}
  </div></div>
}



function adminPageTitle(tab:any){
  return tab=="operator_payables"?"Công nợ nhà tổ chức tour ghép":tab==="team"?"Sales Team / Payroll":tab==="finance"?"Monthly P&L":tab==="dashboard"?"Dashboard thật":tab==="analytics"?"Analytics khách truy cập":tab==="marketing"?"Marketing Funnel":tab==="partners"?"Partners / QR":tab==="seo"?"SEO Intelligence":tab==="leads"?"Quản lý Leads":tab==="reviews"?"Review WhatsApp":"Quản lý Bookings";
}

function shortPage(value:any){
  try{
    const u=new URL(String(value||""));
    return (u.pathname||"/")+(u.search||"");
  }catch{
    return String(value||"—").replace(/^https?:\/\/[^/]+/,"")||"/";
  }
}
function countryLabel(value:any){
  const c=String(value||"").toLowerCase();
  const names:Record<string,string>={
    kor:"South Korea (KR)",rus:"Russia (RU)",kaz:"Kazakhstan (KZ)",vnm:"Vietnam (VN)",
    mng:"Mongolia (MN)",uzb:"Uzbekistan (UZ)",usa:"United States (US)",gbr:"United Kingdom (GB)",
    aus:"Australia (AU)",can:"Canada (CA)",ind:"India (IN)",jpn:"Japan (JP)",chn:"China (CN)"
  };
  return names[c]||String(value||"Unknown").toUpperCase();
}

function AnalyticsCard({title,rows,labelTitle}:any){
  return <div className="gva-card">
    <h3>{title}</h3>
    <div className="gva-table-wrap">
      <table className="gva-table">
        <thead><tr><th>{labelTitle}</th><th>Visitors</th><th>Views</th><th>WA</th></tr></thead>
        <tbody>
          {(rows||[]).slice(0,12).map((r:any)=><tr key={String(r.label)}>
            <td><b>{r.label||"Unknown"}</b></td>
            <td>{r.visitors||0}</td>
            <td>{r.page_views||0}</td>
            <td>{r.whatsapp_clicks||0}</td>
          </tr>)}
          {!(rows||[]).length&&<tr><td colSpan={4}><div className="gva-empty">Chưa có dữ liệu trong kỳ.</div></td></tr>}
        </tbody>
      </table>
    </div>
  </div>
}

function KPI({label,value,hint}:any){return <div className="gva-card gva-kpi"><div className="label">{label}</div><div className="value">{value}</div><div className="hint">{hint}</div></div>}

function LeadModal({tours,partners,onClose,onSubmit,saving}:any){return <div className="gva-modal-bg"><form className="gva-modal" onSubmit={onSubmit}><div className="gva-modal-head"><h3>Tạo Lead thật</h3><button type="button" className="gva-close" onClick={onClose}>✕</button></div><div className="gva-form-grid">
  <F label="Tên khách"><input name="full_name" className="gva-input" required /></F><F label="WhatsApp / Phone"><input name="whatsapp" className="gva-input" /></F>
  <F label="Quốc gia"><input name="country" className="gva-input" /></F><F label="Ngôn ngữ"><select name="preferred_language" className="gva-select">
    {GVS_BOOKING_LANGUAGES.map(([value,label])=><option key={value||"none"} value={value}>{label}</option>)}
  </select></F>
  <F label="Nguồn"><select name="source" className="gva-select"><option>whatsapp</option><option>website</option><option>google_maps</option><option>google</option><option>naver</option><option>tiktok</option><option>facebook</option><option>partner_qr</option><option>desk</option><option>direct</option></select></F>
  <F label="Tour"><select name="tour_id" className="gva-select"><option value="">Chưa xác định</option>{tours.map((x:any)=><option value={x.id} key={x.id}>{x.name}</option>)}</select></F>
  <F label="Partner"><select name="partner_id" className="gva-select"><option value="">Không có</option>{partners.map((x:any)=><option value={x.id} key={x.id}>{x.name} · {x.ref_code}</option>)}</select></F>
  <F label="Ghi chú" wide><textarea name="message" className="gva-input" rows={3} /></F>
</div><div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16}}><button type="button" className="gva-btn secondary" onClick={onClose}>Hủy</button><button className="gva-btn" disabled={saving}>{saving?"Đang lưu…":"Lưu Lead"}</button></div></form></div>}

function BookingModal({tours,partners,onClose,onSubmit,saving}:any){return <div className="gva-modal-bg"><form className="gva-modal" onSubmit={onSubmit}><div className="gva-modal-head"><h3>Tạo Booking thật</h3><button type="button" className="gva-close" onClick={onClose}>✕</button></div><div className="gva-form-grid">
  <F label="Tên khách"><input name="full_name" className="gva-input" required /></F><F label="WhatsApp"><input name="whatsapp" className="gva-input" /></F>
  <F label="Quốc gia"><input name="country" className="gva-input" /></F><F label="Ngôn ngữ"><select name="preferred_language" className="gva-select">
    {GVS_BOOKING_LANGUAGES.map(([value,label])=><option key={value||"none"} value={value}>{label}</option>)}
  </select></F>
  <F label="Tour"><select name="tour_id" className="gva-select" required><option value="">Chọn tour</option>{tours.map((x:any)=><option value={x.id} key={x.id}>{x.name}</option>)}</select></F><F label="Ngày đi"><input name="tour_date" type="date" className="gva-input" required /></F>
  <F label="Adults"><input name="adults" type="number" min="0" defaultValue="1" className="gva-input" /></F><F label="Children"><input name="children" type="number" min="0" defaultValue="0" className="gva-input" /></F>
  <F label="Revenue VND"><input name="revenue" inputMode="numeric" className="gva-input" placeholder="1900000" required /></F><F label="Guide language"><select name="guide_language" className="gva-select" required>
    <option value="">Chọn guide</option>
    {GVS_BOOKING_LANGUAGES.filter(([value])=>value).map(([value,label])=><option key={value} value={value}>{label} Guide</option>)}
  </select></F><F label="Nguồn"><select name="source" className="gva-select"><option>whatsapp</option><option>website</option><option>google_maps</option><option>partner_qr</option><option>desk</option><option>direct</option></select></F>
  <F label="Partner"><select name="partner_id" className="gva-select"><option value="">Không có</option>{partners.map((x:any)=><option value={x.id} key={x.id}>{x.name} · {x.ref_code}</option>)}</select></F><F label="Khách sạn"><input name="hotel" className="gva-input" /></F>
  <F label="Ghi chú" wide><textarea name="notes" className="gva-input" rows={3} /></F>
</div><div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16}}><button type="button" className="gva-btn secondary" onClick={onClose}>Hủy</button><button className="gva-btn" disabled={saving}>{saving?"Đang lưu…":"Lưu Booking"}</button></div></form></div>}

function F({label,children,wide}:any){return <div className={"gva-field "+(wide?"wide":"")}><label>{label}</label>{children}</div>}


