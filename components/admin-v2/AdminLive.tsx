"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./admin-live.css";

// Existing public Supabase project configuration; no service-role key in browser.
const db = createClient(
  "https://vscffgnxaexestnayvae.supabase.co",
  "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV",
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);

type Booking = { id: string; booking_code: string | null; contact_id: string | null; tour_id: string | null; custom_tour_name: string | null; tour_date: string | null; status: string; pax: number | null; adults: number; children: number };
type Customer = { id: string; full_name: string | null; phone: string | null; whatsapp: string | null; email: string | null; country: string | null; preferred_language: string | null; notes: string | null };
type Tour = { id: string; name: string };
type Period = "day" | "week" | "month";

function todayVN(): string {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const get = (key: string) => parts.find(p => p.type === key)?.value || "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}
function periodStart(today: string, period: Period): string {
  if (period === "day") return today;
  if (period === "month") return `${today.slice(0, 7)}-01`;
  const date = new Date(`${today}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
  return date.toISOString().slice(0, 10);
}
function shortDate(value: string | null) { return value ? value.split("-").reverse().join("/") : "Chưa xác định"; }
function people(b: Booking): number { return b.pax ?? (b.adults + b.children); }
function labelStatus(status: string): string {
  return ({ pending: "Chờ xác nhận", confirmed: "Đã xác nhận", completed: "Hoàn thành", closed: "Đã đóng", cancelled: "Đã hủy" } as Record<string, string>)[status] || status;
}
export default function AdminLive() {
  const [phase, setPhase] = useState<"loading" | "denied" | "ready" | "error">("loading");
  const [staffName, setStaffName] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"overview" | "customers">("overview");
  const [period, setPeriod] = useState<Period>("week");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [asOf, setAsOf] = useState("");

  async function load(userId?: string) {
    setBusy(true);
    try {
      const user = userId ? { id: userId } : (await db.auth.getUser()).data.user;
      if (!user) { setPhase("denied"); return; }
      const profile = await db.from("staff_profiles").select("id,display_name,role,active")
        .eq("auth_user_id", user.id).eq("active", true).maybeSingle();
      if (profile.error || !profile.data || !["owner", "admin"].includes(profile.data.role)) {
        setPhase("denied"); return;
      }
      setStaffName(profile.data.display_name);
      // Only existing tables and existing RLS. Never update or insert any production data.
      const [b, c, t] = await Promise.all([
        db.from("bookings").select("id,booking_code,contact_id,tour_id,custom_tour_name,tour_date,status,pax,adults,children").order("tour_date", { ascending: false }).range(0, 1999),
        db.from("contacts").select("id,full_name,phone,whatsapp,email,country,preferred_language,notes").order("full_name", { ascending: true }).range(0, 1999),
        db.from("tours").select("id,name").range(0, 1999)
      ]);
      if (b.error || c.error || t.error) throw new Error("Không thể tải dữ liệu theo quyền hiện tại. Kiểm tra tài khoản Admin và thử lại.");
      if ((b.data?.length || 0) >= 2000 || (c.data?.length || 0) >= 2000) throw new Error("Dữ liệu đã vượt giới hạn bản V2 hiện tại; không hiển thị số liệu thiếu. Hãy dùng Admin cũ và nâng cấp phân trang.");
      setBookings((b.data || []) as Booking[]);
      setCustomers((c.data || []) as Customer[]);
      setTours((t.data || []) as Tour[]);
      setAsOf(new Intl.DateTimeFormat("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", dateStyle: "short", timeStyle: "short" }).format(new Date()));
      setError(""); setPhase("ready");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể tải dữ liệu."); setPhase("error");
    } finally { setBusy(false); }
  }

  useEffect(() => {
    void load();
    const { data: listener } = db.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") { setBookings([]); setCustomers([]); setPhase("denied"); }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const today = todayVN();
  const start = periodStart(today, period);
  const current = useMemo(() => bookings.filter(b => b.tour_date && b.tour_date >= start && b.tour_date <= today), [bookings, start, today]);
  const totalPax = current.filter(b => b.status !== "cancelled").reduce((sum, b) => sum + people(b), 0);
  const tourName = (b: Booking) => b.custom_tour_name?.trim() || tours.find(t => t.id === b.tour_id)?.name || "Tour tùy chỉnh";
  const normalized = search.toLocaleLowerCase("vi-VN").trim();
  const matches = customers.filter(c => !normalized || `${c.full_name || ""} ${c.phone || ""} ${c.whatsapp || ""} ${c.country || ""}`.toLocaleLowerCase("vi-VN").includes(normalized));
  const selected = customers.find(c => c.id === selectedId) || null;
  const history = selected ? bookings.filter(b => b.contact_id === selected.id).sort((a, b) => (b.tour_date || "").localeCompare(a.tour_date || "")) : [];
  const daily = [...new Set(current.map(b => b.tour_date).filter(Boolean))].sort() as string[];

  if (phase !== "ready") return <div className="gvl-gate"><section className="gvl-panel"><img src="/govietstay-logo.jpg" alt="GoVietStay" className="gvl-gate-logo" /><h1>GoVietStay · Admin V2</h1>
    {phase === "loading" ? <p>Đang xác thực và tải dữ liệu…</p> : <><p>{phase === "denied" ? "Bản dữ liệu thật hiện chỉ dành cho tài khoản Owner/Admin đã đăng nhập. Sales và Desk tiếp tục sử dụng Admin hiện tại." : error}</p><a href="/admin">Về Admin hiện tại →</a>{phase === "error" && <button onClick={() => void load()} disabled={busy}>Thử lại</button>}</>}
  </section></div>;

  return <div className="gvl-shell"><aside className="gvl-side">
    <div className="gvl-brand"><img src="/govietstay-logo.jpg" alt="Logo GoVietStay" /><div><b>GoVietStay</b><span>Trusted Local Support</span></div></div>
    <div className="gvl-live">● LIVE · DỮ LIỆU THẬT · CHỈ ĐỌC</div>
    <nav aria-label="Điều hướng Admin V2"><button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}>▦ Tổng quan booking</button><button className={tab === "customers" ? "active" : ""} onClick={() => setTab("customers")}>♙ Hồ sơ khách hàng</button></nav>
    <div className="gvl-spacer" />
    <p>Chức năng cũ vẫn hoạt động: Booking Master, Operations, Finance, Payments, Partners và SEO.</p><a href="/admin">↗ Về Admin hiện tại</a>
  </aside><main className="gvl-main">
    <header className="gvl-header"><div><small>GOVIETSTAY · ADMIN V2</small><h1>{tab === "overview" ? "Tình hình booking" : "Khách hàng & lịch sử booking"}</h1><p>Xin chào {staffName} · Đồng bộ lúc {asOf} (giờ Việt Nam)</p></div><div className="gvl-actions"><span className="gvl-tag">DỮ LIỆU THẬT · CHỈ ĐỌC</span><button disabled={busy} onClick={() => void load()}>{busy ? "Đang tải…" : "↻ Làm mới"}</button></div></header>
    <div className="gvl-notice">Đợt phát hành an toàn: dữ liệu lấy từ database hiện có; không tạo/sửa booking, không gửi WhatsApp và không thay đổi quyền truy cập. Chăm sóc khách một năm và ghi nhận đồng ý tiếp thị chỉ được mở sau khi có bản sao lưu và kiểm thử migration.</div>
    {error && <p className="gvl-error" role="alert">{error}</p>}
    {tab === "overview" ? <>
      <div className="gvl-period" aria-label="Khoảng thời gian">{(["day", "week", "month"] as Period[]).map(p => <button key={p} className={period === p ? "active" : ""} onClick={() => setPeriod(p)}>{p === "day" ? "Hôm nay" : p === "week" ? "Tuần này" : "Tháng này"}</button>)}<span>Theo ngày khởi hành · {shortDate(start)} – {shortDate(today)}</span></div>
      <div className="gvl-stats">{[["Tổng booking", current.length], ["Số khách (PAX)", totalPax], ["Hoàn thành", current.filter(b => ["completed", "closed"].includes(b.status)).length], ["Chờ xác nhận", current.filter(b => b.status === "pending").length], ["Đã hủy", current.filter(b => b.status === "cancelled").length]].map(([key, value]) => <section className="gvl-panel" key={key}><small>{key}</small><strong>{value}</strong></section>)}</div>
      <section className="gvl-panel"><h2>Booking theo ngày</h2><div className="gvl-days">{daily.map(day => <div key={day}><span>{shortDate(day)}</span><b>{current.filter(b => b.tour_date === day).length} booking</b><small>{current.filter(b => b.tour_date === day && b.status !== "cancelled").reduce((s,b) => s + people(b),0)} PAX</small></div>)}{daily.length === 0 && <p>Không có booking theo ngày khởi hành trong kỳ.</p>}</div></section>
      <section className="gvl-panel"><h2>Booking trong kỳ</h2><div className="gvl-table"><table><thead><tr><th>Mã booking</th><th>Ngày</th><th>Tour</th><th>PAX</th><th>Trạng thái</th></tr></thead><tbody>{current.map(b => <tr key={b.id}><td>{b.booking_code || "—"}</td><td>{shortDate(b.tour_date)}</td><td>{tourName(b)}</td><td>{people(b)}</td><td>{labelStatus(b.status)}</td></tr>)}{current.length === 0 && <tr><td colSpan={5}>Chưa có booking trong kỳ.</td></tr>}</tbody></table></div></section>
    </> : <>
      <div className="gvl-search"><input aria-label="Tìm hồ sơ khách" value={search} onChange={event => setSearch(event.target.value)} placeholder="Tìm tên, số điện thoại hoặc quốc gia…"/><span>{matches.length} hồ sơ</span></div>
      <div className="gvl-columns"><section className="gvl-panel"><h2>Danh sách khách hàng</h2><p>Một hồ sơ có thể có nhiều booking. Không tự gộp khách trùng điện thoại.</p>{matches.map(c => <button className={selected?.id === c.id ? "selected" : ""} key={c.id} onClick={() => setSelectedId(c.id)}><b>{c.full_name || "Chưa đặt tên"}</b><span>{c.country || "—"} · {bookings.filter(b => b.contact_id === c.id).length} booking →</span></button>)}{matches.length === 0 && <p>Không có khách phù hợp.</p>}</section>
        <section className="gvl-panel"><h2>Hồ sơ & lịch sử</h2>{!selected ? <p>Chọn một hồ sơ bên trái để xem dữ liệu thật.</p> : <><h3>{selected.full_name || "Khách hàng"}</h3><p>{selected.country || "—"} · {selected.preferred_language || "—"}</p><p><b>Liên hệ:</b> {selected.whatsapp || selected.phone || "Chưa có số"}{selected.email ? ` · ${selected.email}` : ""}</p><p><b>Ghi chú hiện có:</b> {selected.notes || "Chưa có"}</p><h3>Lịch sử booking</h3>{history.map(b => <div className="gvl-history" key={b.id}><b>{tourName(b)}</b><span>{b.booking_code || "—"} · {shortDate(b.tour_date)} · {people(b)} khách · {labelStatus(b.status)}</span></div>)}{history.length === 0 && <p>Chưa có booking liên kết với hồ sơ này.</p>}<div className="gvl-notice">Chưa có hồ sơ đồng ý tiếp thị trong hệ thống hiện tại. Chức năng nhắc chăm sóc sau một năm chưa được kích hoạt; không nhắn quảng cáo từ danh sách này.</div></>}</section></div>
    </>}
  </main></div>;
}
