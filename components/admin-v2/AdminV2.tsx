"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./admin-v2.css";

// The same public project URL and publishable key as the current Admin.
// Never use a service-role key in a browser component.
const supabase = createClient(
  "https://vscffgnxaexestnayvae.supabase.co",
  "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV",
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);

type Staff = { id: string; display_name: string; role: string; active: boolean };
type Overview = {
  from: string; to: string; bookings: number; cancelled: number;
  pending: number; completed: number; pax: number;
  daily: Array<{ date: string; bookings: number; pax: number; completed: number }>;
};
type Customer = {
  id: string; name: string | null; whatsapp: string | null;
  phone: string | null; email: string | null; country: string | null;
  language: string | null; last_tour: string | null;
  booking_count: number; marketing_opt_in: boolean;
};
type CustomerDetail = Customer & {
  notes: string | null; consent_source: string | null; consented_at: string | null;
  history: Array<{ id: string; code: string | null; tour_date: string | null;
    tour_name: string; status: string; pax: number }>;
};
type Followup = { booking_id: string; contact_id: string; name: string | null;
  whatsapp: string | null; language: string | null; tour_date: string;
  tour_name: string; due_on: string };
type Period = "day" | "week" | "month";

function vnDate() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(new Date());
  const value = (kind: string) => parts.find(p => p.type === kind)?.value || "";
  return `${value("year")}-${value("month")}-${value("day")}`;
}
function range(period: Period) {
  const to = vnDate();
  const date = new Date(`${to}T12:00:00Z`);
  if (period === "week") date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
  if (period === "month") date.setUTCDate(1);
  return { p_from: date.toISOString().slice(0, 10), p_to: to };
}
function waUrl(value: string | null) {
  const digits = (value || "").replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 ? `https://wa.me/${digits}` : null;
}
function n(value: number | null | undefined) {
  return new Intl.NumberFormat("vi-VN").format(Number(value || 0));
}

export default function AdminV2() {
  const [staff, setStaff] = useState<Staff | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("week");
  const [tab, setTab] = useState<"overview" | "customers" | "followups">("overview");
  const [overview, setOverview] = useState<Overview | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selected, setSelected] = useState<CustomerDetail | null>(null);
  const [followups, setFollowups] = useState<Followup[]>([]);
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("");
  const [evidence, setEvidence] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const canUseCrm = !!staff && ["owner", "admin", "sales"].includes(staff.role);

  useEffect(() => {
    let mounted = true;
    const resolve = async (userId?: string) => {
      if (!userId) { if (mounted) { setStaff(null); setLoading(false); } return; }
      const { data, error: staffError } = await supabase.from("staff_profiles")
        .select("id,display_name,role,active").eq("auth_user_id", userId)
        .eq("active", true).maybeSingle();
      if (mounted) {
        setStaff(staffError ? null : data);
        setError(staffError?.message || "");
        setLoading(false);
      }
    };
    void supabase.auth.getSession().then(({ data }) => resolve(data.session?.user?.id));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      void resolve(session?.user?.id);
    });
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, []);

  const loadOverview = useCallback(async () => {
    if (!staff) return;
    const { data, error: queryError } = await supabase.rpc("company_booking_overview", range(period));
    if (queryError) setError(queryError.message);
    else { setOverview(data as Overview); setError(""); }
  }, [staff, period]);
  const loadCrm = useCallback(async (term = "") => {
    if (!canUseCrm) return;
    const [directory, reminders] = await Promise.all([
      supabase.rpc("crm_customer_directory", { p_search: term, p_limit: 50 }),
      supabase.rpc("crm_anniversary_queue", { p_days: 30 })
    ]);
    if (directory.error || reminders.error) setError(directory.error?.message || reminders.error?.message || "CRM unavailable");
    else { setCustomers((directory.data || []) as Customer[]); setFollowups((reminders.data || []) as Followup[]); setError(""); }
  }, [canUseCrm]);
  const openCustomer = async (id: string) => {
    if (!canUseCrm) return;
    const { data, error: queryError } = await supabase.rpc("crm_customer_history", { p_contact_id: id });
    if (queryError) setError(queryError.message);
    else { setSelected(data as CustomerDetail); setSource(""); setEvidence(""); setError(""); }
  };

  useEffect(() => { if (staff) void loadOverview(); }, [staff, loadOverview]);
  useEffect(() => { if (canUseCrm) void loadCrm(); }, [canUseCrm, loadCrm]);

  const saveConsent = async (optIn: boolean) => {
    if (!canUseCrm || !selected || busy) return;
    if (optIn && (source.trim().length < 2 || evidence.trim().length < 5)) {
      setError("Cần nguồn và bằng chứng đồng ý cụ thể của khách."); return;
    }
    setBusy(true); setError(""); setMessage("");
    const { error: saveError } = await supabase.rpc("crm_save_consent", {
      p_contact_id: selected.id, p_opt_in: optIn,
      p_source: optIn ? source.trim() : null, p_evidence: optIn ? evidence.trim() : null
    });
    if (saveError) setError(saveError.message);
    else { setMessage(optIn ? "Đã ghi nhận sự đồng ý của khách." : "Đã ghi nhận ngừng tiếp thị.");
      await Promise.all([openCustomer(selected.id), loadCrm(search)]); }
    setBusy(false);
  };
  const finishFollowup = async (bookingId: string, outcome: "contacted" | "skipped") => {
    if (!canUseCrm || busy) return;
    setBusy(true); setError(""); setMessage("");
    const { error: saveError } = await supabase.rpc("crm_record_followup", {
      p_booking_id: bookingId, p_outcome: outcome, p_notes: note.trim() || null
    });
    if (saveError) setError(saveError.message);
    else { setMessage(outcome === "contacted" ? "Đã ghi nhận liên hệ." : "Đã bỏ qua lời nhắc.");
      setNote(""); await loadCrm(search); }
    setBusy(false);
  };

  if (loading) return <div className="gv2-gate">Đang kiểm tra tài khoản GoVietStay…</div>;
  if (!staff) return <div className="gv2-gate"><section className="gv2-panel">
    <h1>Company Overview & CRM</h1>
    <p>Vui lòng đăng nhập bằng tài khoản nhân viên đã được cấp quyền tại Admin hiện tại.</p>
    <a className="gv2-action" href="/admin">Đến trang đăng nhập Admin</a>
  </section></div>;

  return <div className="gv2-shell">
    <aside className="gv2-side">
      <div className="gv2-logo">GoVietStay<span>Admin V2 · Preview</span></div>
      <nav aria-label="Quản trị">
        <button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}>▦ Tổng quan công ty</button>
        {canUseCrm && <button className={tab === "customers" ? "active" : ""} onClick={() => setTab("customers")}>♙ Khách hàng & CRM</button>}
        {canUseCrm && <button className={tab === "followups" ? "active" : ""} onClick={() => setTab("followups")}>◷ Chăm sóc khách cũ</button>}
      </nav>
      <div className="gv2-divider" />
      <p className="gv2-sidebar-caption">Chức năng hiện có · giữ nguyên</p>
      <a href="/admin">Admin hiện tại ↗</a>
      <a href="/admin/operations">Operations ↗</a>
      <a href="/admin/payments">Payments ↗</a>
      <div className="gv2-sidebar-bottom">Đối tác cũ: mã & link không thay đổi.</div>
    </aside>
    <main className="gv2-main">
      <header className="gv2-header"><div>
        <h1>{tab === "overview" ? "Tình hình booking" : tab === "customers" ? "Khách hàng & CRM" : "Chăm sóc sau chuyến đi"}</h1>
        <p>Xin chào {staff.display_name} · {staff.role} · Múi giờ Việt Nam</p>
      </div><span className="gv2-tag">Bản kiểm thử · dữ liệu thật sau migration</span></header>
      {error && <p className="gv2-alert" role="alert">{error}</p>}
      {message && <p className="gv2-notice" role="status">{message}</p>}
      {tab === "overview" && <>
        <div className="gv2-controls" role="group" aria-label="Khoảng thời gian">
          {(["day", "week", "month"] as Period[]).map(value =>
            <button key={value} className={period === value ? "active" : ""} onClick={() => setPeriod(value)}>
              {value === "day" ? "Hôm nay" : value === "week" ? "Tuần này" : "Tháng này"}
            </button>)}
          <button className="gv2-refresh" onClick={() => void loadOverview()}>Làm mới</button>
        </div>
        <p className="gv2-muted">Theo ngày khởi hành · {overview?.from || "—"} → {overview?.to || "—"}. Không hiển thị tên khách, số điện thoại hoặc tài chính.</p>
        <div className="gv2-metrics">
          {[
            ["Tổng booking", overview?.bookings], ["Số khách (PAX)", overview?.pax],
            ["Đã hoàn thành", overview?.completed], ["Chờ xác nhận", overview?.pending],
            ["Đã hủy", overview?.cancelled]
          ].map(([label, value]) => <section className="gv2-panel" key={String(label)}><p>{label}</p><strong>{overview ? n(Number(value)) : "—"}</strong></section>)}
        </div>
        <section className="gv2-panel"><h2>Booking theo ngày</h2>
          <div className="gv2-table-scroll"><table><thead><tr><th>Ngày khởi hành</th><th>Booking</th><th>PAX</th><th>Hoàn thành</th></tr></thead><tbody>
            {(overview?.daily || []).map(row => <tr key={row.date}><td>{row.date}</td><td>{n(row.bookings)}</td><td>{n(row.pax)}</td><td>{n(row.completed)}</td></tr>)}
            {overview && overview.daily.length === 0 && <tr><td colSpan={4}>Chưa có booking trong khoảng này.</td></tr>}
          </tbody></table></div>
        </section>
      </>}
      {tab === "customers" && canUseCrm && <>
        <form className="gv2-search" onSubmit={event => { event.preventDefault(); void loadCrm(search); }}>
          <input aria-label="Tìm khách hàng" placeholder="Tên, số điện thoại hoặc WhatsApp" value={search} onChange={event => setSearch(event.target.value)} />
          <button type="submit">Tìm khách</button>
        </form>
        <div className="gv2-columns"><section className="gv2-panel"><h2>Hồ sơ khách hàng</h2>
          <p className="gv2-muted">Chỉ hiển thị khách trong phạm vi được cấp quyền. Không tự gộp hồ sơ trùng số điện thoại.</p>
          {customers.map(customer => <button className="gv2-customer" key={customer.id} onClick={() => void openCustomer(customer.id)}>
            <span><b>{customer.name || "Chưa có tên"}</b><small>{customer.country || "—"} · {customer.language || "—"}</small></span>
            <span>{n(customer.booking_count)} booking →</span>
          </button>)}
          {customers.length === 0 && <p className="gv2-muted">Không có hồ sơ phù hợp.</p>}
        </section><section className="gv2-panel"><h2>Chi tiết & lịch sử</h2>
          {!selected ? <p className="gv2-muted">Chọn một khách để xem lịch sử booking và trạng thái đồng ý tiếp thị.</p> : <>
            <h3>{selected.name || "Chưa có tên"}</h3>
            <p>{selected.country || "—"} · {selected.language || "—"}</p>
            {waUrl(selected.whatsapp || selected.phone) && <a className="gv2-action" href={waUrl(selected.whatsapp || selected.phone) || "#"} target="_blank" rel="noopener noreferrer">Mở WhatsApp</a>}
            <p className="gv2-muted">{selected.email || "Chưa có email"} · {selected.whatsapp || selected.phone || "Chưa có số liên hệ"}</p>
            <h3>Lịch sử booking</h3>
            {selected.history.map(booking => <div className="gv2-history" key={booking.id}>
              <b>{booking.tour_name}</b><span>{booking.tour_date || "—"} · {booking.status} · {n(booking.pax)} khách</span>
            </div>)}
            {selected.history.length === 0 && <p className="gv2-muted">Chưa có booking trong phạm vi tài khoản này.</p>}
            <h3>Cho phép liên hệ tiếp thị</h3>
            <p className="gv2-muted">{selected.marketing_opt_in ? `Đã đồng ý · ${selected.consented_at || ""}` : "Chưa có sự đồng ý / đã từ chối. Không gửi tin quảng cáo."}</p>
            <label className="gv2-field">Nguồn đồng ý<input value={source} onChange={event => setSource(event.target.value)} placeholder="Ví dụ: khách xác nhận qua WhatsApp" /></label>
            <label className="gv2-field">Bằng chứng đồng ý<input value={evidence} onChange={event => setEvidence(event.target.value)} placeholder="Ghi thời điểm và nội dung khách xác nhận" /></label>
            <div className="gv2-controls"><button disabled={busy} onClick={() => void saveConsent(true)}>Ghi nhận khách đồng ý</button><button className="gv2-secondary" disabled={busy} onClick={() => void saveConsent(false)}>Ngừng tiếp thị</button></div>
          </>}
        </section></div>
      </>}
      {tab === "followups" && canUseCrm && <section className="gv2-panel"><h2>Danh sách kỷ niệm chuyến đi · 30 ngày tới</h2>
        <p className="gv2-muted">Chỉ hiện booking đã hoàn thành sau một năm và khách đã đồng ý tiếp thị. Nhân viên chủ động nhắn tin, không có chức năng gửi tự động.</p>
        <label className="gv2-field">Ghi chú kết quả liên hệ<input value={note} onChange={event => setNote(event.target.value)} placeholder="Ghi lại phản hồi (tùy chọn)" /></label>
        <div className="gv2-table-scroll"><table><thead><tr><th>Khách</th><th>Tour trước đây</th><th>Ngày hỏi thăm</th><th>Thao tác</th></tr></thead><tbody>
          {followups.map(item => <tr key={item.booking_id}><td>{item.name || "Khách hàng"}<br /><small>{item.language || "—"}</small></td>
            <td>{item.tour_name}<br /><small>{item.tour_date}</small></td><td>{item.due_on}</td>
            <td><div className="gv2-controls">
              {waUrl(item.whatsapp) && <a className="gv2-action" href={waUrl(item.whatsapp) || "#"} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>}
              <button disabled={busy || item.due_on > vnDate()} onClick={() => void finishFollowup(item.booking_id,"contacted")}>Đã liên hệ</button>
              <button className="gv2-secondary" disabled={busy || item.due_on > vnDate()} onClick={() => void finishFollowup(item.booking_id,"skipped")}>Bỏ qua</button>
            </div></td></tr>)}
          {followups.length === 0 && <tr><td colSpan={4}>Chưa có khách đủ điều kiện trong 30 ngày tới.</td></tr>}
        </tbody></table></div>
      </section>}
    </main>
  </div>;
}
