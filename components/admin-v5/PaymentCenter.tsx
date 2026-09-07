"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";
import "./payment-v4.css";

const SUPABASE_URL = "https://vscffgnxaexestnayvae.supabase.co";
const SUPABASE_KEY = "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV";
const ADMIN_FN = `${SUPABASE_URL}/functions/v1/booking-payment-admin`;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

type Staff = { id: string; display_name: string; role: string };
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
  deposit_required_vnd: number;
  deposit_policy: "required" | "waived" | "not_required";
  deposit_waived_reason: string | null;
  status: string;
  payment_status: string;
  booking_mode: "catalog" | "custom";
  custom_tour_name: string | null;
  custom_destination: string | null;
};
type Contact = { id: string; full_name: string | null; whatsapp: string | null };
type Tour = { id: string; name: string; destination: string | null };
type Financial = { booking_id: string; amount_received_vnd: number };
type Payment = {
  id: string;
  booking_id: string;
  payment_link_id: string | null;
  amount_vnd: number;
  payment_type: string;
  method: string;
  external_reference: string | null;
  status: string;
  paid_at: string | null;
  created_at: string;
};
type PaymentLink = {
  id: string;
  booking_id: string;
  token: string;
  purpose: "deposit" | "balance";
  amount_vnd: number;
  status: string;
  expires_at: string | null;
  paid_at: string | null;
  created_at: string;
};
type LoadData = {
  staff: Staff | null;
  bookings: Booking[];
  contacts: Contact[];
  tours: Tour[];
  financials: Financial[];
  payments: Payment[];
  links: PaymentLink[];
};

function money(value: any) {
  return new Intl.NumberFormat("vi-VN").format(Number(value || 0)) + " VND";
}
function dateOnly(value: string | null) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(`${value}T12:00:00`));
  } catch {
    return value;
  }
}
function dateTime(value: string | null) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
}
function numberOnly(value: string | null) {
  return Math.max(0, Number(String(value || "").replace(/\D/g, "")));
}

export default function PaymentCenter() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sessionToken, setSessionToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<LoadData>({
    staff: null,
    bookings: [],
    contacts: [],
    tours: [],
    financials: [],
    payments: [],
    links: [],
  });

  useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(({ data: authData }) => {
      if (!alive) return;
      const token = authData.session?.access_token || "";
      setSessionToken(token);
      const q = new URLSearchParams(window.location.search).get("q") || "";
      if (q) setSearch(q);
      if (token) void load(token);
      else setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      const token = next?.access_token || "";
      setSessionToken(token);
      if (token) void load(token);
      else {
        setData({ staff: null, bookings: [], contacts: [], tours: [], financials: [], payments: [], links: [] });
        setLoading(false);
      }
    });
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function call(action: string, payload: Record<string, any> = {}, tokenOverride?: string) {
    const token = tokenOverride || sessionToken || (await supabase.auth.getSession()).data.session?.access_token || "";
    if (!token) throw new Error("Vui lòng đăng nhập Owner/Admin.");
    const response = await fetch(ADMIN_FN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action, ...payload }),
    });
    const json = await response.json().catch(() => ({ error: "Invalid server response" }));
    if (!response.ok || json.error) throw new Error(json.error || "Payment request failed");
    return json;
  }

  async function load(tokenOverride?: string) {
    setLoading(true);
    setError("");
    try {
      const result = await call("load", {}, tokenOverride);
      setData({
        staff: result.staff || null,
        bookings: result.bookings || [],
        contacts: result.contacts || [],
        tours: result.tours || [],
        financials: result.financials || [],
        payments: result.payments || [],
        links: result.links || [],
      });
    } catch (e: any) {
      setError(e.message || "Không tải được Payment Center.");
    } finally {
      setLoading(false);
    }
  }

  async function login(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError || !authData.session) throw loginError || new Error("Login failed");
      setSessionToken(authData.session.access_token);
      await load(authData.session.access_token);
    } catch (e: any) {
      setError(e.message || "Đăng nhập thất bại.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/admin/operations";
  }

  const contactMap = useMemo(() => Object.fromEntries(data.contacts.map((x) => [x.id, x])), [data.contacts]);
  const tourMap = useMemo(() => Object.fromEntries(data.tours.map((x) => [x.id, x])), [data.tours]);
  const financialMap = useMemo(() => Object.fromEntries(data.financials.map((x) => [x.booking_id, x])), [data.financials]);

  function serviceName(b: Booking) {
    return b.booking_mode === "custom"
      ? b.custom_tour_name || "Custom travel service"
      : tourMap[b.tour_id || ""]?.name || "Travel service";
  }
  function total(b: Booking) {
    return Math.max(0, Number(b.net_revenue_vnd ?? b.gross_revenue_vnd ?? 0));
  }
  function received(b: Booking) {
    return Math.max(0, Number(financialMap[b.id]?.amount_received_vnd || 0));
  }
  function balance(b: Booking) {
    return Math.max(0, total(b) - received(b));
  }
  function depositDue(b: Booking) {
    if (b.deposit_policy !== "required") return 0;
    return Math.max(0, Number(b.deposit_required_vnd || 0) - received(b));
  }
  function activeLink(b: Booking) {
    return data.links.find((x) => x.booking_id === b.id && x.status === "active");
  }
  function paymentHistory(b: Booking) {
    return data.payments.filter((x) => x.booking_id === b.id).slice(0, 5);
  }
  function paymentUrl(link: PaymentLink) {
    if (typeof window === "undefined") return `/pay/${link.token}`;
    return `${window.location.origin}/pay/${link.token}`;
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data.bookings;
    return data.bookings.filter((b) => {
      const contact = contactMap[b.contact_id || ""];
      const tour = tourMap[b.tour_id || ""];
      return [
        b.booking_code,
        serviceName(b),
        contact?.full_name,
        contact?.whatsapp,
        b.custom_destination,
        tour?.destination,
      ]
        .filter(Boolean)
        .some((x) => String(x).toLowerCase().includes(q));
    });
  }, [search, data.bookings, contactMap, tourMap]);

  async function runAction(task: () => Promise<void>) {
    if (saving) return;
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await task();
      await load();
    } catch (e: any) {
      setError(e.message || "Không thực hiện được.");
    } finally {
      setSaving(false);
    }
  }

  function setDeposit(b: Booking) {
    const raw = window.prompt("Deposit required / Cọc yêu cầu (VND). Nhập 0 nếu booking này không cần cọc:", String(b.deposit_required_vnd || 0));
    if (raw === null) return;
    const amount = numberOnly(raw);
    if (amount > total(b)) return setError("Deposit không thể lớn hơn tổng booking.");
    void runAction(async () => {
      await call("set_deposit", { booking_id: b.id, amount_vnd: amount });
      setMessage(amount > 0 ? `Đã đặt cọc yêu cầu ${money(amount)}.` : "Booking đã chuyển sang No deposit required.");
    });
  }

  function waive(b: Booking) {
    const reason = window.prompt("Lý do ngoại lệ (VIP / repeat guest / pay on arrival / company guarantee...):", b.deposit_waived_reason || "Pay on arrival");
    if (!reason?.trim()) return;
    void runAction(async () => {
      await call("waive", { booking_id: b.id, reason: reason.trim() });
      setMessage("Đã duyệt ngoại lệ deposit. Actual received không bị thay đổi.");
    });
  }

  function restoreDeposit(b: Booking) {
    if (!window.confirm("Khôi phục yêu cầu deposit cho booking này?")) return;
    void runAction(async () => {
      await call("restore_deposit", { booking_id: b.id });
      setMessage("Đã khôi phục yêu cầu deposit.");
    });
  }

  function createLink(b: Booking, purpose: "deposit" | "balance") {
    const amount = purpose === "deposit" ? depositDue(b) : balance(b);
    if (amount <= 0) return setError("Không còn số tiền cần thu cho mục này.");
    if (!window.confirm(`Tạo ${purpose === "deposit" ? "deposit" : "balance"} payment link ${money(amount)}? Link active cũ của booking sẽ bị hủy.`)) return;
    void runAction(async () => {
      const result = await call("create_link", { booking_id: b.id, purpose });
      const link: PaymentLink = result.link;
      const url = `${window.location.origin}/pay/${link.token}`;
      await navigator.clipboard?.writeText(url).catch(() => {});
      setMessage(`Đã tạo và copy payment link: ${url}`);
    });
  }

  function cancelLink(b: Booking, link: PaymentLink) {
    if (!window.confirm("Hủy payment link đang active?")) return;
    void runAction(async () => {
      await call("cancel_link", { booking_id: b.id, payment_link_id: link.id });
      setMessage("Payment link đã hủy.");
    });
  }

  async function copyLink(link: PaymentLink) {
    const url = paymentUrl(link);
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Đã copy payment link.");
    } catch {
      setMessage(url);
    }
  }

  function shareWhatsApp(b: Booking, link: PaymentLink) {
    const text = [
      `GoVietStay payment link — ${b.booking_code || ""}`,
      serviceName(b),
      `Amount requested: ${money(link.amount_vnd)}`,
      paymentUrl(link),
      "You can pay by VietQR or PayPal. Please send us the receipt after payment.",
    ].join("\n");
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  function markReceived(b: Booking) {
    const link = activeLink(b);
    const suggested = link?.amount_vnd || (depositDue(b) > 0 ? depositDue(b) : balance(b));
    const raw = window.prompt("ACTUAL amount received / Số tiền THỰC TẾ đã vào tài khoản (VND):", String(suggested || 0));
    if (raw === null) return;
    const amount = numberOnly(raw);
    if (amount <= 0 || amount > balance(b)) return setError("Số tiền nhận không hợp lệ hoặc lớn hơn balance.");
    const methodRaw = (window.prompt("Method: vietqr / paypal / bank_transfer / cash / card / other", "vietqr") || "other").trim().toLowerCase();
    const methods = ["vietqr", "paypal", "bank_transfer", "cash", "card", "other"];
    const method = methods.includes(methodRaw) ? methodRaw : "other";
    const reference = window.prompt("Transaction ID / Reference (không bắt buộc):", "") || "";
    if (!window.confirm(`Xác nhận GoVietStay đã THỰC SỰ nhận ${money(amount)}?`)) return;
    void runAction(async () => {
      await call("mark_received", {
        booking_id: b.id,
        payment_link_id: link?.id || null,
        amount_vnd: amount,
        method,
        external_reference: reference.trim() || null,
      });
      setMessage("Đã ghi nhận tiền thật. Booking Master / payment status / balance đã đồng bộ.");
    });
  }

  const totalReceived = data.financials.reduce((sum, x) => sum + Number(x.amount_received_vnd || 0), 0);
  const activeLinks = data.links.filter((x) => x.status === "active").length;

  if (loading && !sessionToken) {
    return <main className="gpay-center"><div className="gpay-login">Đang tải Payment Center…</div></main>;
  }

  if (!sessionToken) {
    return <main className="gpay-center">
      <form className="gpay-login" onSubmit={login}>
        <div className="gpay-brand">GoVietStay</div>
        <h1>Booking Payment V4</h1>
        <p>Owner/Admin login. Deposit là nguyên tắc mặc định nhưng có thể duyệt ngoại lệ.</p>
        {error && <div className="gpay-alert error">{error}</div>}
        <input className="gpay-input" type="email" autoComplete="username" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="gpay-input" type="password" autoComplete="current-password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="gpay-btn primary full" disabled={saving}>{saving ? "Đang đăng nhập…" : "Đăng nhập"}</button>
        <a className="gpay-back" href="/admin/operations">← Booking Master</a>
      </form>
    </main>;
  }

  return <main className="gpay-center">
    <header className="gpay-top">
      <div>
        <div className="gpay-brand">GoVietStay</div>
        <h1>Booking Payment V4</h1>
        <p>{data.staff?.display_name || "Admin"} · {data.staff?.role || "owner/admin"} · actual payment ledger</p>
      </div>
      <div className="gpay-top-actions">
        <a className="gpay-btn light" href="/admin/operations">← Booking Master</a>
        <button className="gpay-btn light" type="button" onClick={() => void load()} disabled={saving}>↻ Refresh</button>
        <button className="gpay-btn light" type="button" onClick={() => void logout()}>Logout</button>
      </div>
    </header>

    {error && <div className="gpay-alert error">{error}</div>}
    {message && <div className="gpay-alert ok">{message}</div>}

    <section className="gpay-summary">
      <div><span>Bookings</span><b>{data.bookings.length}</b></div>
      <div><span>Actual received</span><b>{money(totalReceived)}</b></div>
      <div><span>Active payment links</span><b>{activeLinks}</b></div>
    </section>

    <input className="gpay-input gpay-search" placeholder="Tìm booking, khách, WhatsApp, tour…" value={search} onChange={(e) => setSearch(e.target.value)} />

    <section className="gpay-grid">
      {filtered.map((b) => {
        const contact = contactMap[b.contact_id || ""];
        const link = activeLink(b);
        const history = paymentHistory(b);
        const rec = received(b);
        const bal = balance(b);
        const depDue = depositDue(b);
        const policy = b.deposit_policy === "waived" ? "EXCEPTION / WAIVED" : b.deposit_policy === "not_required" ? "NO DEPOSIT REQUIRED" : "DEPOSIT REQUIRED";
        return <article className="gpay-card" key={b.id}>
          <div className="gpay-card-head">
            <div>
              <div className="gpay-code">{b.booking_code || "Booking"}</div>
              <h2>{serviceName(b)}</h2>
              <p>{contact?.full_name || "Guest"} · {dateOnly(b.tour_date)} · {b.pax ?? b.adults + b.children} guest(s)</p>
            </div>
            <span className={`gpay-status ${b.payment_status}`}>{String(b.payment_status || "unpaid").toUpperCase()}</span>
          </div>

          <div className="gpay-money">
            <div><span>Total</span><b>{money(total(b))}</b></div>
            <div><span>Deposit required</span><b>{money(b.deposit_required_vnd)}</b></div>
            <div><span>Actually received</span><b>{money(rec)}</b></div>
            <div><span>Balance</span><b>{money(bal)}</b></div>
          </div>

          <div className="gpay-policy">
            <b>{policy}</b>
            <span>{b.deposit_policy === "waived" ? b.deposit_waived_reason || "Admin exception" : depDue > 0 ? `Deposit due: ${money(depDue)}` : ""}</span>
          </div>

          {link && <div className="gpay-linkbox">
            <b>ACTIVE {link.purpose.toUpperCase()} LINK · {money(link.amount_vnd)}</b>
            <span>Expires {dateTime(link.expires_at)}</span>
            <code>{paymentUrl(link)}</code>
            <div className="gpay-actions">
              <button className="gpay-btn light" type="button" onClick={() => void copyLink(link)}>Copy link</button>
              <button className="gpay-btn light" type="button" onClick={() => shareWhatsApp(b, link)}>WhatsApp</button>
              <a className="gpay-btn light" href={paymentUrl(link)} target="_blank" rel="noopener noreferrer">Open ↗</a>
              <button className="gpay-btn danger" type="button" onClick={() => cancelLink(b, link)}>Cancel</button>
            </div>
          </div>}

          <div className="gpay-actions">
            <button className="gpay-btn light" type="button" onClick={() => setDeposit(b)}>Set deposit</button>
            {b.deposit_policy === "waived"
              ? <button className="gpay-btn light" type="button" onClick={() => restoreDeposit(b)}>Restore deposit</button>
              : <button className="gpay-btn light" type="button" onClick={() => waive(b)}>Waive / exception</button>}
            {depDue > 0 && <button className="gpay-btn primary" type="button" onClick={() => createLink(b, "deposit")}>Create deposit link</button>}
            {bal > 0 && <button className="gpay-btn blue" type="button" onClick={() => createLink(b, "balance")}>Collect balance</button>}
            {bal > 0 && <button className="gpay-btn gold" type="button" onClick={() => markReceived(b)}>✓ Mark received</button>}
          </div>

          {history.length > 0 && <details className="gpay-history">
            <summary>Payment history ({data.payments.filter((x) => x.booking_id === b.id).length})</summary>
            {history.map((p) => <div className="gpay-payrow" key={p.id}>
              <div><b>{money(p.amount_vnd)}</b><span>{p.payment_type} · {p.method} · {p.status}</span></div>
              <div><span>{dateTime(p.paid_at || p.created_at)}</span><small>{p.external_reference || "—"}</small></div>
            </div>)}
          </details>}
        </article>;
      })}
      {!filtered.length && <div className="gpay-card">Không tìm thấy booking phù hợp.</div>}
    </section>
  </main>;
}
