"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./admin-v2.css";

// The publishable key is public. Never put a service-role key in a client bundle.
const supabase = createClient(
  "https://vscffgnxaexestnayvae.supabase.co",
  "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV",
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);

type Period = "day" | "week" | "month";
type Overview = {
  from: string; to: string; bookings: number; cancelled: number;
  pending: number; completed: number; pax: number;
  daily: Array<{ date: string; bookings: number; pax: number; completed: number }>;
};
type SalesSession = { token: string; display_name: string; expires_at: string };

function vietnamToday() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(new Date());
  const field = (type: string) => parts.find(part => part.type === type)?.value || "";
  return `${field("year")}-${field("month")}-${field("day")}`;
}
function periodRange(period: Period) {
  const to = vietnamToday();
  const first = new Date(`${to}T12:00:00Z`);
  if (period === "week") first.setUTCDate(first.getUTCDate() - ((first.getUTCDay() + 6) % 7));
  if (period === "month") first.setUTCDate(1);
  return { p_from: first.toISOString().slice(0, 10), p_to: to };
}
function integer(value: number | undefined) {
  return new Intl.NumberFormat("vi-VN").format(Number(value || 0));
}

export default function SalesOverview() {
  // Keep the bearer token only in component memory, never in URL or browser storage.
  // A page refresh requires re-entering the PIN; the legacy sales portal is untouched.
  const [session, setSession] = useState<SalesSession | null>(null);
  const [salesCode, setSalesCode] = useState("");
  const [pin, setPin] = useState("");
  const [period, setPeriod] = useState<Period>("week");
  const [overview, setOverview] = useState<Overview | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load(token: string, selectedPeriod: Period) {
    const { data, error: queryError } = await supabase.rpc("company_booking_overview_sales", {
      p_token: token, ...periodRange(selectedPeriod)
    });
    if (queryError) {
      setOverview(null);
      setError(queryError.message);
      if (/session|required/i.test(queryError.message)) setSession(null);
    } else {
      setOverview(data as Overview);
      setError("");
    }
  }

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !salesCode.trim() || !pin) return;
    setBusy(true); setError("");
    try {
      const { data, error: loginError } = await supabase.rpc("staff_sales_login", {
        p_sales_code: salesCode.trim(), p_pin: pin
      });
      setPin("");
      if (loginError || !data?.token) throw new Error("Mã Sales hoặc PIN không hợp lệ.");
      const next = data as SalesSession;
      setSession(next);
      await load(next.token, period);
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "Không thể đăng nhập.");
    } finally { setBusy(false); }
  }

  async function choosePeriod(nextPeriod: Period) {
    if (!session || busy) return;
    setPeriod(nextPeriod); setBusy(true);
    try { await load(session.token, nextPeriod); }
    finally { setBusy(false); }
  }

  if (!session) return <div className="gv2-gate"><form className="gv2-panel" onSubmit={signIn}>
    <h1>GoVietStay · Company Overview</h1>
    <p>Dành cho nhân viên Sales đang sử dụng mã và PIN hiện tại. Chỉ hiển thị số booking và PAX toàn công ty.</p>
    {error && <p className="gv2-alert" role="alert">{error}</p>}
    <label className="gv2-field">Mã nhân viên
      <input required autoComplete="username" value={salesCode}
        onChange={event => setSalesCode(event.target.value)} />
    </label>
    <label className="gv2-field">PIN
      <input required type="password" autoComplete="current-password" value={pin}
        onChange={event => setPin(event.target.value)} />
    </label>
    <div className="gv2-controls"><button type="submit" disabled={busy}>
      {busy ? "Đang xác thực…" : "Xem tình hình booking"}
    </button></div>
    <p><a href="/admin/v2">Dành cho nhân viên có tài khoản Admin ↗</a></p>
  </form></div>;

  return <div className="gv2-shell">
    <aside className="gv2-side">
      <div className="gv2-logo">GoVietStay<span>Company Overview · Sales</span></div>
      <nav aria-label="Sales dashboard"><button className="active">▦ Tổng quan công ty</button></nav>
      <div className="gv2-divider" />
      <a href="/admin">Admin hiện tại ↗</a>
      <div className="gv2-sidebar-bottom">Giữ nguyên mã và luồng bán hàng hiện tại.</div>
    </aside>
    <main className="gv2-main">
      <header className="gv2-header"><div><h1>Tình hình booking</h1>
        <p>Xin chào {session.display_name} · Chỉ số tổng hợp · Việt Nam</p>
      </div><div className="gv2-controls"><button className="gv2-secondary" onClick={() => {
        setSession(null); setOverview(null); setPin(""); setSalesCode(""); setError("");
      }}>Thoát</button></div></header>
      {error && <p className="gv2-alert" role="alert">{error}</p>}
      <div className="gv2-controls" role="group" aria-label="Khoảng thời gian">
        {(["day", "week", "month"] as Period[]).map(value => <button key={value}
          disabled={busy} className={period === value ? "active" : ""}
          onClick={() => void choosePeriod(value)}>
          {value === "day" ? "Hôm nay" : value === "week" ? "Tuần này" : "Tháng này"}
        </button>)}
        <button className="gv2-refresh" disabled={busy}
          onClick={() => void choosePeriod(period)}>Làm mới</button>
      </div>
      <p className="gv2-muted">Theo ngày khởi hành · {overview?.from || "—"} → {overview?.to || "—"}. Không có tên khách, số điện thoại, doanh thu hoặc tài chính.</p>
      <div className="gv2-metrics">{[
        ["Tổng booking", overview?.bookings], ["Số khách (PAX)", overview?.pax],
        ["Hoàn thành", overview?.completed], ["Chờ xác nhận", overview?.pending],
        ["Đã hủy", overview?.cancelled]
      ].map(([title, value]) => <section className="gv2-panel" key={String(title)}>
        <p>{title}</p><strong>{overview ? integer(Number(value)) : "—"}</strong>
      </section>)}</div>
      <section className="gv2-panel"><h2>Booking theo ngày</h2>
        <div className="gv2-table-scroll"><table><thead><tr>
          <th>Ngày</th><th>Booking</th><th>PAX</th><th>Hoàn thành</th>
        </tr></thead><tbody>{(overview?.daily || []).map(day => <tr key={day.date}>
          <td>{day.date}</td><td>{integer(day.bookings)}</td><td>{integer(day.pax)}</td>
          <td>{integer(day.completed)}</td>
        </tr>)}
        {overview && !overview.daily.length && <tr><td colSpan={4}>Không có booking trong kỳ.</td></tr>}
        </tbody></table></div>
      </section>
    </main>
  </div>;
}
