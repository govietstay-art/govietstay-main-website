"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./admin-v5.css";
import "./operations-v1.css";

const SUPABASE_URL = "https://vscffgnxaexestnayvae.supabase.co";
const SUPABASE_KEY = "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

type Staff = { id: string; display_name: string; role: string; active: boolean; auth_user_id: string | null };
type Tour = { id: string; name: string; destination: string | null; adult_price_vnd: number | null; active: boolean };
type Guide = {
  id: string;
  full_name: string;
  phone: string | null;
  whatsapp: string | null;
  zalo: string | null;
  languages: string[];
  service_areas: string[];
  half_day_rate_vnd: number;
  full_day_rate_vnd: number;
  overtime_rate_vnd: number;
  license_status: string;
  rating: number | null;
  notes: string | null;
  active: boolean;
};
type Availability = {
  id: string;
  guide_id: string;
  work_date: string;
  start_time: string;
  end_time: string;
  status: "available" | "unavailable";
  notes: string | null;
};
type Booking = {
  id: string;
  booking_code: string | null;
  contact_id: string | null;
  tour_id: string | null;
  tour_date: string | null;
  adults: number;
  children: number;
  pax: number | null;
  gross_revenue_vnd: number;
  net_revenue_vnd: number | null;
  status: string;
  payment_status: string;
  pickup_time: string | null;
  start_time: string | null;
  end_time: string | null;
  hotel: string | null;
  room: string | null;
  notes: string | null;
  guide_language: string | null;
  booking_mode: "catalog" | "custom";
  custom_tour_name: string | null;
  custom_destination: string | null;
  custom_itinerary: string | null;
  created_at: string;
};
type Contact = { id: string; full_name: string | null; whatsapp: string | null; country: string | null; preferred_language: string | null };
type Assignment = { id: string; booking_id: string; guide_id: string; status: string; agreed_fee_vnd: number; notes: string | null };
type BookingCost = { id: string; booking_id: string; cost_type: string; description: string | null; amount_vnd: number };
type Modal = null | "guide" | "availability" | "booking" | "cost";

const LANGUAGES = [
  ["it", "🇮🇹 Italian"],
  ["ru", "🇷🇺 Russian"],
  ["en", "🇬🇧 English"],
  ["ko", "🇰🇷 Korean"],
  ["zh", "🇨🇳 Chinese"],
  ["tr", "🇹🇷 Turkish"],
  ["he", "🇮🇱 Hebrew"],
  ["vi", "🇻🇳 Vietnamese"],
] as const;

function localISO(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function addDays(value: string, days: number) {
  const d = new Date(`${value}T12:00:00`);
  d.setDate(d.getDate() + days);
  return localISO(d);
}
function money(v: any) {
  return new Intl.NumberFormat("vi-VN").format(Number(v || 0)) + " ₫";
}
function langLabel(code?: string | null) {
  return LANGUAGES.find(([x]) => x === code)?.[1] || (code ? code.toUpperCase() : "—");
}
function csv(value: any) {
  return String(value || "").split(",").map((x) => x.trim().toLowerCase()).filter(Boolean);
}
function code() {
  return "GVS-" + new Date().toISOString().slice(2, 10).replace(/-/g, "") + "-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}
function timeShort(v: string | null) {
  return v ? String(v).slice(0, 5) : "—";
}

const COST_TYPES = [
  ["transport", "Xe / Transport"],
  ["ticket", "Vé / Ticket"],
  ["meal", "Ăn uống / Meal"],
  ["supplier", "Supplier / Operator"],
  ["guide", "HDV bổ sung"],
  ["other", "Khác"],
] as const;
function costTypeLabel(value: string) {
  return COST_TYPES.find(([code]) => code === value)?.[1] || value;
}
function numberOnly(value: any) {
  return Math.max(0, Number(String(value || 0).replace(/\D/g, "")));
}

export default function OperationsCenter() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [staff, setStaff] = useState<Staff | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [view, setView] = useState<"dispatch" | "guides" | "bookings">("dispatch");
  const [focusDate, setFocusDate] = useState(localISO());
  const [languageFilter, setLanguageFilter] = useState("all");

  const [tours, setTours] = useState<Tour[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [costs, setCosts] = useState<BookingCost[]>([]);

  const tourMap = useMemo(() => Object.fromEntries(tours.map((x) => [x.id, x])), [tours]);
  const guideMap = useMemo(() => Object.fromEntries(guides.map((x) => [x.id, x])), [guides]);
  const contactMap = useMemo(() => Object.fromEntries(contacts.map((x) => [x.id, x])), [contacts]);

  useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!alive) return;
      setSession(data.session);
      if (data.session?.user?.id) await resolveStaff(data.session.user.id);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      setError("");
      if (nextSession?.user?.id) await resolveStaff(nextSession.user.id);
      else setStaff(null);
    });
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (staff && (staff.role === "owner" || staff.role === "admin")) loadAll();
  }, [staff]);

  async function resolveStaff(userId: string) {
    const { data, error: staffError } = await supabase
      .from("staff_profiles")
      .select("id,display_name,role,active,auth_user_id")
      .eq("auth_user_id", userId)
      .eq("active", true)
      .maybeSingle();
    if (staffError) return setError(staffError.message);
    setStaff((data as Staff) || null);
  }

  async function login(e: any) {
    e.preventDefault();
    setError("");
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) setError(loginError.message);
  }

  async function loadAll() {
    setError("");
    const today = localISO();
    const from = addDays(today, -1);
    const to = addDays(today, 60);
    try {
      const results = await Promise.all([
        supabase.from("tours").select("id,name,destination,adult_price_vnd,active").eq("active", true).order("name"),
        supabase.from("guides").select("*").order("active", { ascending: false }).order("full_name"),
        supabase.from("guide_availability").select("*").gte("work_date", from).lte("work_date", to).order("work_date"),
        supabase.from("bookings")
          .select("id,booking_code,contact_id,tour_id,tour_date,adults,children,pax,gross_revenue_vnd,net_revenue_vnd,status,payment_status,pickup_time,start_time,end_time,hotel,room,notes,guide_language,booking_mode,custom_tour_name,custom_destination,custom_itinerary,created_at")
          .gte("tour_date", from).lte("tour_date", to).order("tour_date", { ascending: true }).order("start_time", { ascending: true }),
        supabase.from("contacts").select("id,full_name,whatsapp,country,preferred_language").order("created_at", { ascending: false }).limit(1000),
        supabase.from("booking_guides").select("id,booking_id,guide_id,status,agreed_fee_vnd,notes").limit(2000),
        supabase.from("booking_costs").select("id,booking_id,cost_type,description,amount_vnd").limit(3000),
      ]);
      for (const r of results) if (r.error) throw r.error;
      setTours((results[0].data || []) as Tour[]);
      setGuides((results[1].data || []) as Guide[]);
      setAvailability((results[2].data || []) as Availability[]);
      setBookings((results[3].data || []) as Booking[]);
      setContacts((results[4].data || []) as Contact[]);
      setAssignments((results[5].data || []) as Assignment[]);
      setCosts((results[6].data || []) as BookingCost[]);
    } catch (e: any) {
      setError(e.message || "Không tải được Operations Center.");
    }
  }

  function bookingName(b: Booking) {
    return b.booking_mode === "custom" ? b.custom_tour_name || "Custom Tour" : tourMap[b.tour_id || ""]?.name || "Tour chưa xác định";
  }
  function activeAssignments(bookingId: string) {
    return assignments.filter((x) => x.booking_id === bookingId && x.status !== "cancelled");
  }
  function guideStatus(guideId: string, date: string) {
    const guideAssignments = assignments.filter((a) => {
      if (a.guide_id !== guideId || a.status === "cancelled") return false;
      const b = bookings.find((x) => x.id === a.booking_id);
      return b?.tour_date === date;
    });
    if (guideAssignments.some((x) => x.status === "confirmed" || x.status === "completed")) return "booked";
    if (guideAssignments.some((x) => x.status === "pending")) return "pending";
    const rows = availability.filter((x) => x.guide_id === guideId && x.work_date === date);
    if (rows.some((x) => x.status === "unavailable")) return "unavailable";
    if (rows.some((x) => x.status === "available")) return "available";
    return "unknown";
  }
  function statusText(status: string) {
    return status === "available" ? "🟢 Available" :
      status === "pending" ? "🟡 Pending" :
      status === "booked" ? "🔴 Booked" :
      status === "unavailable" ? "⚫ Unavailable" : "⚪ Chưa cập nhật";
  }

  const focusBookings = useMemo(
    () => bookings.filter((b) => b.tour_date === focusDate && b.status !== "cancelled" && (languageFilter === "all" || b.guide_language === languageFilter)),
    [bookings, focusDate, languageFilter]
  );
  const focusGuides = useMemo(
    () => guides.filter((g) => g.active && (languageFilter === "all" || (g.languages || []).includes(languageFilter))),
    [guides, languageFilter]
  );
  const sevenDayBookings = useMemo(() => {
    const start = localISO();
    const end = addDays(start, 6);
    return bookings.filter((b) => b.tour_date && b.tour_date >= start && b.tour_date <= end && b.status !== "cancelled");
  }, [bookings]);
  const needGuide = sevenDayBookings.filter((b) => b.guide_language && activeAssignments(b.id).length === 0).length;
  const sevenDayPax = sevenDayBookings.reduce((sum, b) => sum + Number(b.pax ?? b.adults + b.children), 0);
  const customCount = sevenDayBookings.filter((b) => b.booking_mode === "custom").length;

  async function createGuide(e: any) {
    e.preventDefault();
    setSaving(true); setError("");
    const v = Object.fromEntries(new FormData(e.currentTarget).entries()) as any;
    try {
      const { error: insertError } = await supabase.from("guides").insert({
        full_name: String(v.full_name || "").trim(),
        phone: String(v.phone || "").trim() || null,
        whatsapp: String(v.whatsapp || "").trim() || null,
        zalo: String(v.zalo || "").trim() || null,
        languages: csv(v.languages),
        service_areas: csv(v.service_areas),
        half_day_rate_vnd: Number(String(v.half_day_rate_vnd || 0).replace(/\D/g, "")),
        full_day_rate_vnd: Number(String(v.full_day_rate_vnd || 0).replace(/\D/g, "")),
        overtime_rate_vnd: Number(String(v.overtime_rate_vnd || 0).replace(/\D/g, "")),
        license_status: v.license_status || "unknown",
        notes: String(v.notes || "").trim() || null,
        active: true,
      });
      if (insertError) throw insertError;
      setModal(null); setMessage("Đã thêm hướng dẫn viên."); await loadAll();
    } catch (e: any) { setError(e.message); } finally { setSaving(false); }
  }

  async function createAvailability(e: any) {
    e.preventDefault();
    setSaving(true); setError("");
    const v = Object.fromEntries(new FormData(e.currentTarget).entries()) as any;
    try {
      const { error: upsertError } = await supabase.from("guide_availability").upsert({
        guide_id: v.guide_id,
        work_date: v.work_date,
        start_time: v.start_time || "00:00",
        end_time: v.end_time || "23:59",
        status: v.status || "available",
        notes: String(v.notes || "").trim() || null,
      }, { onConflict: "guide_id,work_date,start_time,end_time" });
      if (upsertError) throw upsertError;
      setFocusDate(v.work_date || focusDate); setModal(null); setMessage("Đã cập nhật lịch hướng dẫn viên."); await loadAll();
    } catch (e: any) { setError(e.message); } finally { setSaving(false); }
  }

  async function createContact(values: any) {
    const { data, error: insertError } = await supabase.from("contacts").insert({
      full_name: String(values.full_name || "").trim(),
      whatsapp: String(values.whatsapp || "").trim() || null,
      country: String(values.country || "").trim() || null,
      preferred_language: values.preferred_language || null,
      first_source: "manual",
    }).select("id").single();
    if (insertError) throw insertError;
    return data.id as string;
  }

  async function createBooking(e: any) {
    e.preventDefault();
    setSaving(true); setError("");
    const v = Object.fromEntries(new FormData(e.currentTarget).entries()) as any;
    try {
      const mode = v.booking_mode === "custom" ? "custom" : "catalog";
      if (mode === "catalog" && !v.tour_id) throw new Error("Hãy chọn tour GoVietStay.");
      if (mode === "custom" && !String(v.custom_tour_name || "").trim()) throw new Error("Hãy nhập tên tour thủ công.");
      const adults = Math.max(0, Number(v.adults || 0));
      const children = Math.max(0, Number(v.children || 0));
      const revenue = Math.max(0, Number(String(v.revenue || 0).replace(/\D/g, "")));
      const contactId = await createContact(v);
      const { error: insertError } = await supabase.from("bookings").insert({
        booking_code: code(),
        contact_id: contactId,
        tour_id: mode === "catalog" ? v.tour_id : null,
        staff_id: staff?.id || null,
        tour_date: v.tour_date,
        adults, children,
        gross_revenue_vnd: revenue,
        discount_vnd: 0, deposit_required_vnd: 0,
        status: v.status || "confirmed", payment_status: "unpaid",
        pickup_time: v.pickup_time || null,
        start_time: v.start_time || null,
        end_time: v.end_time || null,
        hotel: String(v.hotel || "").trim() || null,
        notes: String(v.notes || "").trim() || null,
        source: "manual", created_via: "operations_v1",
        guide_language: v.guide_language || null,
        booking_mode: mode,
        custom_tour_name: mode === "custom" ? String(v.custom_tour_name || "").trim() : null,
        custom_destination: mode === "custom" ? String(v.custom_destination || "").trim() || null : null,
        custom_itinerary: mode === "custom" ? String(v.custom_itinerary || "").trim() || null : null,
      });
      if (insertError) throw insertError;
      setFocusDate(v.tour_date || focusDate); setModal(null); setView("dispatch");
      setMessage("Đã tạo booking. Có thể gán HDV ngay trên bảng điều phối."); await loadAll();
    } catch (e: any) { setError(e.message); } finally { setSaving(false); }
  }

  function suggestedFee(guide: Guide, booking: Booking) {
    if (booking.start_time && booking.end_time) {
      const [sh, sm] = booking.start_time.split(":").map(Number);
      const [eh, em] = booking.end_time.split(":").map(Number);
      const hours = eh + em / 60 - (sh + sm / 60);
      if (hours > 0 && hours <= 5) return guide.half_day_rate_vnd || 0;
    }
    return guide.full_day_rate_vnd || 0;
  }

  async function assignGuide(bookingId: string, guideId: string) {
    if (!guideId) return;
    const booking = bookings.find((x) => x.id === bookingId);
    const guide = guides.find((x) => x.id === guideId);
    if (!booking || !guide) return;
    setSaving(true); setError("");
    try {
      const { error: insertError } = await supabase.from("booking_guides").insert({
        booking_id: bookingId, guide_id: guideId, status: "confirmed",
        agreed_fee_vnd: suggestedFee(guide, booking), assigned_by: staff?.id || null,
      });
      if (insertError) throw insertError;
      setMessage(`Đã gán ${guide.full_name} cho ${booking.booking_code || "booking"}.`); await loadAll();
    } catch (e: any) { setError(e.message); } finally { setSaving(false); }
  }

  async function updateAssignment(id: string, status: string) {
    setSaving(true); setError("");
    const { error: updateError } = await supabase.from("booking_guides").update({ status }).eq("id", id);
    if (updateError) setError(updateError.message); else await loadAll();
    setSaving(false);
  }

  async function createCost(e: any) {
    e.preventDefault();
    if (!selectedBooking) return;
    setSaving(true); setError("");
    const form = e.currentTarget as HTMLFormElement;
    const v = Object.fromEntries(new FormData(form).entries()) as any;
    try {
      const amount = numberOnly(v.amount_vnd);
      if (!amount) throw new Error("Số tiền chi phí phải lớn hơn 0.");
      const { error: insertError } = await supabase.from("booking_costs").insert({
        booking_id: selectedBooking,
        cost_type: v.cost_type,
        description: String(v.description || "").trim() || null,
        amount_vnd: amount,
        created_by: staff?.id || null,
      });
      if (insertError) throw insertError;
      form.reset();
      setMessage("Đã thêm chi phí. Tổng chi và lãi gộp đã cập nhật.");
      await loadAll();
    } catch (e: any) { setError(e.message); } finally { setSaving(false); }
  }

  async function updateCost(id: string, values: { cost_type: string; description: string; amount_vnd: number }) {
    setSaving(true); setError("");
    try {
      const amount = numberOnly(values.amount_vnd);
      if (!amount) throw new Error("Số tiền chi phí phải lớn hơn 0.");
      const { error: updateError } = await supabase.from("booking_costs").update({
        cost_type: values.cost_type,
        description: values.description.trim() || null,
        amount_vnd: amount,
      }).eq("id", id);
      if (updateError) throw updateError;
      setMessage("Đã điều chỉnh chi phí.");
      await loadAll();
    } catch (e: any) { setError(e.message); } finally { setSaving(false); }
  }

  async function deleteCost(id: string) {
    if (!window.confirm("Xóa khoản chi phí này? Tổng chi và lãi gộp sẽ được tính lại.")) return;
    setSaving(true); setError("");
    try {
      const { error: deleteError } = await supabase.from("booking_costs").delete().eq("id", id);
      if (deleteError) throw deleteError;
      setMessage("Đã xóa khoản chi phí.");
      await loadAll();
    } catch (e: any) { setError(e.message); } finally { setSaving(false); }
  }

  async function updateGuideFee(id: string, amountValue: number) {
    setSaving(true); setError("");
    try {
      const amount = numberOnly(amountValue);
      const { error: updateError } = await supabase.from("booking_guides").update({ agreed_fee_vnd: amount }).eq("id", id);
      if (updateError) throw updateError;
      setMessage("Đã điều chỉnh phí hướng dẫn viên.");
      await loadAll();
    } catch (e: any) { setError(e.message); } finally { setSaving(false); }
  }

  function totalCost(bookingId: string) {
    const extra = costs.filter((x) => x.booking_id === bookingId).reduce((sum, x) => sum + Number(x.amount_vnd || 0), 0);
    const guideFees = activeAssignments(bookingId).reduce((sum, x) => sum + Number(x.agreed_fee_vnd || 0), 0);
    return extra + guideFees;
  }

  if (loading) return <div className="gvo-login"><div className="gvo-login-card">Đang mở Operations Center…</div></div>;

  if (!session) return <div className="gvo-login"><form className="gvo-login-card" onSubmit={login}>
    <div className="gvo-brand">GoVietStay Operations</div>
    <p>Dùng cùng tài khoản Owner/Admin hiện tại.</p>
    {error && <div className="gva-msg err">{error}</div>}
    <label>Email</label><input className="gva-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    <label>Mật khẩu</label><input className="gva-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    <button className="gva-btn" style={{ width: "100%", marginTop: 12 }}>Đăng nhập</button>
    <a className="gvo-back-link" href="/admin">← Quay lại Admin</a>
  </form></div>;

  if (!staff || !(staff.role === "owner" || staff.role === "admin")) {
    return <div className="gvo-login"><div className="gvo-login-card">Tài khoản này chưa có quyền Owner/Admin. <a href="/admin">Quay lại Admin</a>.</div></div>;
  }

  return <div className="gvo-shell">
    <header className="gvo-header">
      <div>
        <div className="gvo-eyebrow">GoVietStay · Operations Center V1</div>
        <h1>Điều phối tour & hướng dẫn viên</h1>
        <p>{staff.display_name} · dữ liệu vận hành thật từ Supabase</p>
      </div>
      <div className="gvo-header-actions">
        <a className="gva-btn secondary" href="/admin">← Admin chính</a>
        <button className="gva-btn secondary" onClick={loadAll}>Làm mới</button>
      </div>
    </header>

    {error && <div className="gva-msg err">{error}</div>}
    {message && <div className="gva-msg">{message}</div>}

    <section className="gvo-kpis">
      <MiniKPI label="Tours 7 ngày" value={sevenDayBookings.length} hint="Không tính cancelled" />
      <MiniKPI label="Khách 7 ngày" value={sevenDayPax} hint="Tổng pax" />
      <MiniKPI label="Cần HDV" value={needGuide} hint="Ưu tiên xử lý" warn={needGuide > 0} />
      <MiniKPI label="Custom tours" value={customCount} hint="Tour nhập thủ công" />
    </section>

    <nav className="gvo-tabs">
      <button className={view === "dispatch" ? "active" : ""} onClick={() => setView("dispatch")}>Điều phối</button>
      <button className={view === "guides" ? "active" : ""} onClick={() => setView("guides")}>Hướng dẫn viên</button>
      <button className={view === "bookings" ? "active" : ""} onClick={() => setView("bookings")}>Bookings</button>
    </nav>

    {view === "dispatch" && <>
      <section className="gvo-toolbar">
        <div className="gvo-date-nav">
          <button onClick={() => setFocusDate(addDays(focusDate, -1))}>‹</button>
          <input type="date" className="gva-input" value={focusDate} onChange={(e) => setFocusDate(e.target.value)} />
          <button onClick={() => setFocusDate(addDays(focusDate, 1))}>›</button>
          <button className="today" onClick={() => setFocusDate(localISO())}>Hôm nay</button>
        </div>
        <select className="gva-select" value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)}>
          <option value="all">Tất cả ngôn ngữ</option>
          {LANGUAGES.map(([v, label]) => <option key={v} value={v}>{label}</option>)}
        </select>
        <div className="gvo-spacer" />
        <button className="gva-btn secondary" onClick={() => setModal("availability")}>+ Lịch HDV</button>
        <button className="gva-btn" onClick={() => setModal("booking")}>+ Booking</button>
      </section>

      <div className="gvo-grid2">
        <section className="gvo-card">
          <div className="gvo-card-head"><div><h2>Tour ngày {focusDate}</h2><p>{focusBookings.length} booking</p></div></div>
          <div className="gvo-stack">
            {focusBookings.map((b) => {
              const ass = activeAssignments(b.id);
              const cost = totalCost(b.id);
              const revenue = Number(b.net_revenue_vnd ?? b.gross_revenue_vnd ?? 0);
              const eligibleGuides = guides.filter((g) =>
                g.active &&
                (!b.guide_language || (g.languages || []).includes(b.guide_language)) &&
                guideStatus(g.id, focusDate) !== "unavailable" &&
                guideStatus(g.id, focusDate) !== "booked"
              );
              return <article className="gvo-booking" key={b.id}>
                <div className="gvo-booking-top">
                  <div><b>{b.booking_code || "Booking"}</b><span className={`gvo-mode ${b.booking_mode}`}>{b.booking_mode === "custom" ? "CUSTOM" : "CATALOG"}</span></div>
                  <span className="gvo-pill">{b.status}</span>
                </div>
                <h3>{bookingName(b)}</h3>
                <div className="gvo-booking-meta">
                  <span>👤 {contactMap[b.contact_id || ""]?.full_name || "—"}</span>
                  <span>👥 {b.pax ?? b.adults + b.children}</span>
                  <span>{langLabel(b.guide_language)}</span>
                  <span>🕘 {timeShort(b.start_time || b.pickup_time)}–{timeShort(b.end_time)}</span>
                  <span>🏨 {b.hotel || "—"}</span>
                </div>
                {b.booking_mode === "custom" && b.custom_itinerary && <div className="gvo-itinerary">{b.custom_itinerary}</div>}
                <div className="gvo-assignment">
                  {ass.length ? ass.map((a) => <div className="gvo-assigned" key={a.id}>
                    <span>HDV: <b>{guideMap[a.guide_id]?.full_name || "—"}</b> · {money(a.agreed_fee_vnd)}</span>
                    <select className="gva-select" value={a.status} onChange={(e) => updateAssignment(a.id, e.target.value)} disabled={saving}>
                      <option value="pending">pending</option><option value="confirmed">confirmed</option><option value="completed">completed</option><option value="cancelled">cancelled</option>
                    </select>
                  </div>) : <div className="gvo-need-guide">⚠️ Chưa gán hướng dẫn viên</div>}
                  {!ass.length && <div className="gvo-assign-row">
                    <select className="gva-select" defaultValue="" onChange={(e) => { if (e.target.value) assignGuide(b.id, e.target.value); }} disabled={saving}>
                      <option value="">Chọn HDV phù hợp…</option>
                      {eligibleGuides.map((g) => <option key={g.id} value={g.id}>{g.full_name} · {statusText(guideStatus(g.id, focusDate))} · {money(suggestedFee(g, b))}</option>)}
                    </select>
                  </div>}
                </div>
                <div className="gvo-finance-row">
                  <span>Thu: <b>{money(revenue)}</b></span><span>Chi: <b>{money(cost)}</b></span><span>Lãi gộp: <b>{money(revenue - cost)}</b></span>
                  <button className="gvo-text-btn" onClick={() => { setSelectedBooking(b.id); setModal("cost"); }}>Quản lý chi phí</button>
                </div>
              </article>;
            })}
            {!focusBookings.length && <div className="gvo-empty">Không có tour trong ngày này.</div>}
          </div>
        </section>

        <section className="gvo-card">
          <div className="gvo-card-head"><div><h2>HDV ngày {focusDate}</h2><p>Trạng thái = lịch rảnh + booking đã gán</p></div></div>
          <div className="gvo-guide-list">
            {focusGuides.map((g) => {
              const s = guideStatus(g.id, focusDate);
              return <div className={`gvo-guide-row status-${s}`} key={g.id}>
                <div><b>{g.full_name}</b><div className="gvo-small">{(g.languages || []).map(langLabel).join(" · ") || "Chưa có ngôn ngữ"}</div></div>
                <div className="gvo-small">{(g.service_areas || []).join(" · ") || "—"}</div>
                <div><b>{statusText(s)}</b><div className="gvo-small">Nửa ngày {money(g.half_day_rate_vnd)} · Cả ngày {money(g.full_day_rate_vnd)}</div></div>
              </div>;
            })}
            {!focusGuides.length && <div className="gvo-empty">Chưa có HDV phù hợp bộ lọc.</div>}
          </div>
        </section>
      </div>
    </>}

    {view === "guides" && <section className="gvo-card">
      <div className="gvo-card-head"><div><h2>Database hướng dẫn viên</h2><p>Mỗi HDV một hồ sơ; lịch rảnh lưu riêng theo ngày/khung giờ.</p></div><button className="gva-btn" onClick={() => setModal("guide")}>+ Thêm HDV</button></div>
      <div className="gvo-table-wrap"><table className="gvo-table"><thead><tr><th>HDV</th><th>Ngôn ngữ</th><th>Khu vực</th><th>Liên hệ</th><th>Nửa ngày</th><th>Cả ngày</th><th>License</th></tr></thead><tbody>
        {guides.map((g) => <tr key={g.id}><td><b>{g.full_name}</b>{!g.active && <div className="gvo-small">inactive</div>}</td><td>{(g.languages || []).map(langLabel).join(", ") || "—"}</td><td>{(g.service_areas || []).join(", ") || "—"}</td><td>{g.whatsapp || g.phone || g.zalo || "—"}</td><td>{money(g.half_day_rate_vnd)}</td><td>{money(g.full_day_rate_vnd)}</td><td>{g.license_status}</td></tr>)}
        {!guides.length && <tr><td colSpan={7}><div className="gvo-empty">Chưa có hướng dẫn viên. Hãy thêm hồ sơ đầu tiên.</div></td></tr>}
      </tbody></table></div>
    </section>}

    {view === "bookings" && <section className="gvo-card">
      <div className="gvo-card-head"><div><h2>Booking vận hành 60 ngày</h2><p>Tour chuẩn và tour nhập thủ công dùng chung một booking master.</p></div><button className="gva-btn" onClick={() => setModal("booking")}>+ Booking</button></div>
      <div className="gvo-table-wrap"><table className="gvo-table"><thead><tr><th>Ngày</th><th>Code</th><th>Tour</th><th>Khách</th><th>Ngôn ngữ</th><th>HDV</th><th>Thu</th><th>Chi</th><th>Lãi gộp</th></tr></thead><tbody>
        {bookings.filter((b) => b.status !== "cancelled").map((b) => {
          const cost = totalCost(b.id);
          const revenue = Number(b.net_revenue_vnd ?? b.gross_revenue_vnd ?? 0);
          return <tr key={b.id}>
            <td>{b.tour_date || "—"}<div className="gvo-small">{timeShort(b.start_time)}</div></td>
            <td><b>{b.booking_code || "—"}</b></td>
            <td>{bookingName(b)}{b.booking_mode === "custom" && <div className="gvo-small">Custom</div>}</td>
            <td>{contactMap[b.contact_id || ""]?.full_name || "—"}</td>
            <td>{langLabel(b.guide_language)}</td>
            <td>{activeAssignments(b.id).map((a) => guideMap[a.guide_id]?.full_name).filter(Boolean).join(", ") || "⚠️ Chưa gán"}</td>
            <td>{money(revenue)}</td>
            <td>
              <b>{money(cost)}</b>
              <div><button type="button" className="gvo-cost-btn" onClick={() => { setSelectedBooking(b.id); setModal("cost"); }}>Điều chỉnh</button></div>
            </td>
            <td><b>{money(revenue - cost)}</b></td>
          </tr>;
        })}
        {!bookings.length && <tr><td colSpan={9}><div className="gvo-empty">Chưa có booking.</div></td></tr>}
      </tbody></table></div>
    </section>}

    {modal === "guide" && <ModalFrame title="Thêm hướng dẫn viên" onClose={() => setModal(null)}><form onSubmit={createGuide} className="gvo-form-grid">
      <Field label="Tên HDV"><input name="full_name" className="gva-input" required /></Field>
      <Field label="WhatsApp"><input name="whatsapp" className="gva-input" /></Field>
      <Field label="Phone"><input name="phone" className="gva-input" /></Field>
      <Field label="Zalo"><input name="zalo" className="gva-input" /></Field>
      <Field label="Ngôn ngữ (mã, cách nhau dấu phẩy)"><input name="languages" className="gva-input" placeholder="it,en" required /></Field>
      <Field label="Khu vực"><input name="service_areas" className="gva-input" placeholder="Da Nang,Hoi An,Hue" /></Field>
      <Field label="Giá nửa ngày"><input name="half_day_rate_vnd" className="gva-input" inputMode="numeric" placeholder="600000" /></Field>
      <Field label="Giá cả ngày"><input name="full_day_rate_vnd" className="gva-input" inputMode="numeric" placeholder="900000" /></Field>
      <Field label="Overtime/giờ"><input name="overtime_rate_vnd" className="gva-input" inputMode="numeric" /></Field>
      <Field label="License"><select name="license_status" className="gva-select"><option value="unknown">Chưa kiểm tra</option><option value="valid">Valid</option><option value="expired">Expired</option><option value="not_required">Not required</option></select></Field>
      <Field label="Ghi chú" wide><textarea name="notes" className="gva-input" rows={3} /></Field>
      <ModalActions saving={saving} onClose={() => setModal(null)} label="Lưu HDV" />
    </form></ModalFrame>}

    {modal === "availability" && <ModalFrame title="Cập nhật lịch HDV" onClose={() => setModal(null)}><form onSubmit={createAvailability} className="gvo-form-grid">
      <Field label="Hướng dẫn viên"><select name="guide_id" className="gva-select" required><option value="">Chọn HDV</option>{guides.filter((g) => g.active).map((g) => <option key={g.id} value={g.id}>{g.full_name} · {(g.languages || []).map(langLabel).join(", ")}</option>)}</select></Field>
      <Field label="Ngày"><input name="work_date" type="date" className="gva-input" defaultValue={focusDate} required /></Field>
      <Field label="Từ giờ"><input name="start_time" type="time" className="gva-input" defaultValue="00:00" required /></Field>
      <Field label="Đến giờ"><input name="end_time" type="time" className="gva-input" defaultValue="23:59" required /></Field>
      <Field label="Trạng thái"><select name="status" className="gva-select"><option value="available">Available</option><option value="unavailable">Unavailable</option></select></Field>
      <Field label="Ghi chú" wide><textarea name="notes" className="gva-input" rows={3} /></Field>
      <ModalActions saving={saving} onClose={() => setModal(null)} label="Lưu lịch" />
    </form></ModalFrame>}

    {modal === "booking" && <BookingModal tours={tours} saving={saving} onClose={() => setModal(null)} onSubmit={createBooking} />}

    {modal === "cost" && selectedBooking && <CostManagerModal
      booking={bookings.find((b) => b.id === selectedBooking)}
      bookingName={bookingName}
      revenue={Number(bookings.find((b) => b.id === selectedBooking)?.net_revenue_vnd ?? bookings.find((b) => b.id === selectedBooking)?.gross_revenue_vnd ?? 0)}
      total={totalCost(selectedBooking)}
      bookingCosts={costs.filter((x) => x.booking_id === selectedBooking)}
      guideAssignments={activeAssignments(selectedBooking)}
      guideMap={guideMap}
      saving={saving}
      onAdd={createCost}
      onUpdateCost={updateCost}
      onDeleteCost={deleteCost}
      onUpdateGuideFee={updateGuideFee}
      onClose={() => { setModal(null); setSelectedBooking(null); }}
    />}
  </div>;
}

function MiniKPI({ label, value, hint, warn }: any) {
  return <div className={`gvo-kpi ${warn ? "warn" : ""}`}><div>{label}</div><strong>{value}</strong><span>{hint}</span></div>;
}
function ModalFrame({ title, onClose, children }: any) {
  return <div className="gvo-modal-bg"><div className="gvo-modal"><div className="gvo-modal-head"><h2>{title}</h2><button type="button" onClick={onClose}>✕</button></div>{children}</div></div>;
}
function Field({ label, children, wide }: any) {
  return <label className={wide ? "gvo-field wide" : "gvo-field"}><span>{label}</span>{children}</label>;
}
function ModalActions({ saving, onClose, label }: any) {
  return <div className="gvo-modal-actions"><button type="button" className="gva-btn secondary" onClick={onClose}>Hủy</button><button className="gva-btn" disabled={saving}>{saving ? "Đang lưu…" : label}</button></div>;
}

function CostManagerModal({ booking, bookingName, revenue, total, bookingCosts, guideAssignments, guideMap, saving, onAdd, onUpdateCost, onDeleteCost, onUpdateGuideFee, onClose }: any) {
  if (!booking) return null;
  const profit = Number(revenue || 0) - Number(total || 0);
  return <ModalFrame title="Quản lý chi phí booking" onClose={onClose}>
    <div className="gvo-cost-summary">
      <div><span>Booking</span><b>{booking.booking_code || "—"}</b><small>{bookingName(booking)}</small></div>
      <div><span>Thu</span><b>{money(revenue)}</b></div>
      <div><span>Chi hiện tại</span><b>{money(total)}</b></div>
      <div className={profit < 0 ? "loss" : ""}><span>Lãi gộp</span><b>{money(profit)}</b></div>
    </div>

    <div className="gvo-cost-section">
      <h3>Phí hướng dẫn viên đã gán</h3>
      {guideAssignments.length ? guideAssignments.map((a: Assignment) => <GuideFeeEditor
        key={a.id}
        assignment={a}
        guideName={guideMap[a.guide_id]?.full_name || "HDV"}
        saving={saving}
        onSave={onUpdateGuideFee}
      />) : <div className="gvo-cost-empty">Booking này chưa có HDV được gán.</div>}
    </div>

    <div className="gvo-cost-section">
      <h3>Các khoản chi phí khác</h3>
      {bookingCosts.length ? bookingCosts.map((c: BookingCost) => <CostEditorRow
        key={c.id}
        item={c}
        saving={saving}
        onSave={onUpdateCost}
        onDelete={onDeleteCost}
      />) : <div className="gvo-cost-empty">Chưa có khoản chi phí bổ sung.</div>}
    </div>

    <div className="gvo-cost-section add">
      <h3>+ Thêm khoản chi phí</h3>
      <form onSubmit={onAdd} className="gvo-form-grid">
        <Field label="Loại chi phí"><select name="cost_type" className="gva-select" defaultValue="transport">{COST_TYPES.map(([v,l]) => <option key={v} value={v}>{l}</option>)}</select></Field>
        <Field label="Số tiền"><input name="amount_vnd" className="gva-input" inputMode="numeric" placeholder="700000" required /></Field>
        <Field label="Mô tả" wide><input name="description" className="gva-input" placeholder="VD: Xe riêng 4 chỗ / vé / phụ thu..." /></Field>
        <div className="gvo-cost-add-actions"><button className="gva-btn" disabled={saving}>{saving ? "Đang lưu…" : "+ Thêm chi phí"}</button></div>
      </form>
    </div>
    <div className="gvo-cost-footer"><button type="button" className="gva-btn secondary" onClick={onClose}>Đóng</button></div>
  </ModalFrame>;
}

function GuideFeeEditor({ assignment, guideName, saving, onSave }: any) {
  const [amount, setAmount] = useState(String(assignment.agreed_fee_vnd || 0));
  useEffect(() => setAmount(String(assignment.agreed_fee_vnd || 0)), [assignment.agreed_fee_vnd]);
  return <div className="gvo-cost-edit-row guide">
    <div className="gvo-cost-kind"><b>HDV · {guideName}</b><span>{assignment.status}</span></div>
    <div className="gvo-cost-grow">Phí HDV của booking này</div>
    <input className="gva-input gvo-money-input" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} />
    <button type="button" className="gvo-save-cost" disabled={saving} onClick={() => onSave(assignment.id, numberOnly(amount))}>Lưu</button>
  </div>;
}

function CostEditorRow({ item, saving, onSave, onDelete }: any) {
  const [type, setType] = useState(item.cost_type);
  const [description, setDescription] = useState(item.description || "");
  const [amount, setAmount] = useState(String(item.amount_vnd || 0));
  useEffect(() => {
    setType(item.cost_type); setDescription(item.description || ""); setAmount(String(item.amount_vnd || 0));
  }, [item.cost_type, item.description, item.amount_vnd]);
  return <div className="gvo-cost-edit-row">
    <select className="gva-select gvo-cost-type" value={type} onChange={(e) => setType(e.target.value)}>{COST_TYPES.map(([v,l]) => <option key={v} value={v}>{l}</option>)}</select>
    <input className="gva-input gvo-cost-grow" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={costTypeLabel(type)} />
    <input className="gva-input gvo-money-input" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} />
    <button type="button" className="gvo-save-cost" disabled={saving} onClick={() => onSave(item.id, { cost_type: type, description, amount_vnd: numberOnly(amount) })}>Lưu</button>
    <button type="button" className="gvo-delete-cost" disabled={saving} onClick={() => onDelete(item.id)}>Xóa</button>
  </div>;
}

function BookingModal({ tours, saving, onClose, onSubmit }: any) {
  const [mode, setMode] = useState<"catalog" | "custom">("catalog");
  return <ModalFrame title="Tạo booking vận hành" onClose={onClose}><form onSubmit={onSubmit} className="gvo-form-grid">
    <Field label="Loại booking" wide><div className="gvo-mode-switch">
      <label><input type="radio" name="booking_mode" value="catalog" checked={mode === "catalog"} onChange={() => setMode("catalog")} /> Tour GoVietStay</label>
      <label><input type="radio" name="booking_mode" value="custom" checked={mode === "custom"} onChange={() => setMode("custom")} /> Tour nhập thủ công</label>
    </div></Field>
    <Field label="Tên khách"><input name="full_name" className="gva-input" required /></Field>
    <Field label="WhatsApp / Phone"><input name="whatsapp" className="gva-input" /></Field>
    <Field label="Quốc gia"><input name="country" className="gva-input" /></Field>
    <Field label="Ngôn ngữ khách"><select name="preferred_language" className="gva-select"><option value="">—</option>{LANGUAGES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></Field>
    {mode === "catalog" ? <Field label="Tour GoVietStay" wide><select name="tour_id" className="gva-select" required><option value="">Chọn tour</option>{tours.map((t: Tour) => <option key={t.id} value={t.id}>{t.name}{t.destination ? ` · ${t.destination}` : ""}</option>)}</select></Field> : <>
      <Field label="Tên tour thủ công" wide><input name="custom_tour_name" className="gva-input" placeholder="Private Marble Mountains + Linh Ung" required /></Field>
      <Field label="Điểm đến"><input name="custom_destination" className="gva-input" placeholder="Da Nang" /></Field>
      <Field label="Lịch trình" wide><textarea name="custom_itinerary" className="gva-input" rows={4} placeholder="08:00 đón khách..." /></Field>
    </>}
    <Field label="Ngày tour"><input name="tour_date" type="date" className="gva-input" defaultValue={localISO()} required /></Field>
    <Field label="Trạng thái"><select name="status" className="gva-select"><option value="confirmed">confirmed</option><option value="pending">pending</option></select></Field>
    <Field label="Giờ bắt đầu"><input name="start_time" type="time" className="gva-input" /></Field>
    <Field label="Giờ kết thúc"><input name="end_time" type="time" className="gva-input" /></Field>
    <Field label="Pickup time"><input name="pickup_time" type="time" className="gva-input" /></Field>
    <Field label="Khách sạn"><input name="hotel" className="gva-input" /></Field>
    <Field label="Adults"><input name="adults" type="number" min="0" defaultValue="1" className="gva-input" /></Field>
    <Field label="Children"><input name="children" type="number" min="0" defaultValue="0" className="gva-input" /></Field>
    <Field label="Ngôn ngữ HDV"><select name="guide_language" className="gva-select"><option value="">Không cần / chưa xác định</option>{LANGUAGES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></Field>
    <Field label="Giá bán VND"><input name="revenue" inputMode="numeric" className="gva-input" placeholder="3200000" required /></Field>
    <Field label="Ghi chú" wide><textarea name="notes" className="gva-input" rows={3} /></Field>
    <ModalActions saving={saving} onClose={onClose} label="Lưu booking" />
  </form></ModalFrame>;
}
