"use client";

import { useMemo, useState } from "react";
import "./admin-v2.css";
import "./admin-demo.css";

type Period = "day" | "week" | "month";
type Tab = "overview" | "customers" | "followups";
type Customer = { id: string; name: string; market: string; language: string; phone: string; preference: string };
type Booking = { id: string; customerId: string; date: string; name: string; pax: number; status: "confirmed" | "pending" | "completed" | "cancelled" };

const CUSTOMERS: Customer[] = [
  { id: "demo-a", name: "Khách mẫu A", market: "Nga", language: "Russian", phone: "+00 ••• ••• 001", preference: "Gia đình · Tour private" },
  { id: "demo-b", name: "Khách mẫu B", market: "Đức", language: "German", phone: "+00 ••• ••• 002", preference: "Đà Nẵng · Hội An" },
  { id: "demo-c", name: "Khách mẫu C", market: "Ý", language: "Italian", phone: "+00 ••• ••• 003", preference: "Lịch trình linh hoạt" },
];

function todayVN() {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const get = (name: string) => parts.find(part => part.type === name)?.value || "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}
function shiftDay(date: string, days: number) {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}
function dateVN(date: string) { return date.split("-").reverse().join("/"); }
function statusVN(status: Booking["status"]) {
  return { confirmed: "Đã xác nhận", pending: "Chờ xác nhận", completed: "Hoàn thành", cancelled: "Đã hủy" }[status];
}
function makeBookings(today: string): Booking[] {
  return [
    { id: "DEMO-001", customerId: "demo-a", date: today, name: "Câu mực Đà Nẵng", pax: 3, status: "confirmed" },
    { id: "DEMO-002", customerId: "demo-b", date: today, name: "Bà Nà Hills", pax: 2, status: "pending" },
    { id: "DEMO-003", customerId: "demo-a", date: shiftDay(today, -1), name: "Hội An private", pax: 3, status: "completed" },
    { id: "DEMO-004", customerId: "demo-c", date: shiftDay(today, -3), name: "Huế private", pax: 2, status: "cancelled" },
    { id: "DEMO-005", customerId: "demo-b", date: shiftDay(today, -8), name: "Ngũ Hành Sơn", pax: 2, status: "completed" },
    { id: "DEMO-006", customerId: "demo-c", date: shiftDay(today, 1), name: "Sơn Trà", pax: 4, status: "confirmed" },
  ];
}

export default function AdminDemo() {
  const today = useMemo(todayVN, []);
  const bookings = useMemo(() => makeBookings(today), [today]);
  const [tab, setTab] = useState<Tab>("overview");
  const [period, setPeriod] = useState<Period>("week");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("demo-a");
  const [consent, setConsent] = useState<Record<string, boolean>>({ "demo-a": true, "demo-b": false, "demo-c": false });
  const [source, setSource] = useState("");
  const [evidence, setEvidence] = useState("");
  const [handled, setHandled] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  const start = useMemo(() => {
    if (period === "day") return today;
    if (period === "month") return `${today.slice(0, 7)}-01`;
    const day = new Date(`${today}T12:00:00Z`).getUTCDay();
    return shiftDay(today, -((day + 6) % 7));
  }, [period, today]);
  const inRange = bookings.filter(b => b.date >= start && b.date <= today);
  const pax = inRange.filter(b => b.status !== "cancelled").reduce((sum, b) => sum + b.pax, 0);
  const selected = CUSTOMERS.find(c => c.id === selectedId) || CUSTOMERS[0];
  const filtered = CUSTOMERS.filter(c => `${c.name} ${c.market} ${c.language}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const reminders = [
    { id: "anniversary-a", customerId: "demo-a", due: today, trip: "Câu mực Đà Nẵng", oldDate: shiftDay(today, -365) },
    { id: "anniversary-b", customerId: "demo-b", due: shiftDay(today, 4), trip: "Hội An private", oldDate: shiftDay(today, -361) },
  ].filter(item => consent[item.customerId] && !handled.includes(item.id));

  function saveConsent(optIn: boolean) {
    if (optIn && (source.trim().length < 2 || evidence.trim().length < 5)) {
      setNotice("Bản demo: nhập nguồn và bằng chứng đồng ý trước khi bật tiếp thị."); return;
    }
    setConsent(old => ({ ...old, [selectedId]: optIn }));
    setSource(""); setEvidence("");
    setNotice(optIn ? "Đã bật sự đồng ý trong bản demo (không lưu database)." : "Đã tắt tiếp thị trong bản demo (không lưu database).");
  }
  function reset() {
    setTab("overview"); setPeriod("week"); setQuery(""); setSelectedId("demo-a");
    setConsent({ "demo-a": true, "demo-b": false, "demo-c": false });
    setSource(""); setEvidence(""); setHandled([]); setNotice("Dữ liệu demo đã được đặt lại.");
  }

  return <div className="gv2-shell gvd-shell">
    <aside className="gv2-side">
      <div className="gv2-logo">GoVietStay<span>Admin V2 · UI Demo</span></div>
      <div className="gvd-sample">DỮ LIỆU GIẢ LẬP<br />KHÔNG KẾT NỐI DATABASE</div>
      <nav aria-label="Chọn chức năng demo">
        <button className={tab === "overview" ? "active" : ""} onClick={() => { setTab("overview"); setNotice(""); }}>▦ Company Overview</button>
        <button className={tab === "customers" ? "active" : ""} onClick={() => { setTab("customers"); setNotice(""); }}>♙ Customers & CRM</button>
        <button className={tab === "followups" ? "active" : ""} onClick={() => { setTab("followups"); setNotice(""); }}>◷ Follow-up Center</button>
      </nav>
      <div className="gv2-divider" />
      <p className="gv2-sidebar-caption">Các module hiện tại vẫn giữ nguyên</p>
      <div className="gvd-legacy">Booking Master · Operations · Payments · Finance · Partners · SEO & Tracking</div>
      <div className="gv2-sidebar-bottom">Không có hành động nào tại đây tạo booking, gửi tin nhắn hoặc thay đổi dữ liệu thật.</div>
    </aside>
    <main className="gv2-main">
      <header className="gv2-header"><div>
        <p className="gvd-eyebrow">GOVIETSTAY · ADMIN EXPERIENCE</p>
        <h1>{tab === "overview" ? "Tình hình booking" : tab === "customers" ? "Khách hàng & CRM" : "Chăm sóc khách cũ"}</h1>
        <p>Trải nghiệm giao diện trước khi kết nối hệ thống thật.</p>
      </div><div className="gvd-header-actions"><span className="gv2-tag">DEMO · KHÔNG PHẢI DỮ LIỆU THẬT</span><button className="gvd-reset" onClick={reset}>↺ Đặt lại demo</button></div></header>
      <div className="gvd-warning" role="note">Toàn bộ tên khách, booking, số liệu và thao tác dưới đây chỉ để thử giao diện. Không sử dụng mật khẩu, PIN, số điện thoại hoặc thông tin khách thật tại trang này.</div>
      {notice && <div className="gv2-notice" role="status">{notice}</div>}
      {tab === "overview" && <>
        <div className="gv2-controls gvd-period" role="group" aria-label="Chọn khoảng thời gian">
          {(["day", "week", "month"] as Period[]).map(value => <button key={value} className={period === value ? "active" : ""} onClick={() => setPeriod(value)}>{value === "day" ? "Hôm nay" : value === "week" ? "Tuần này" : "Tháng này"}</button>)}
          <span className="gv2-muted">Ngày khởi hành: {dateVN(start)} – {dateVN(today)}</span>
        </div>
        <div className="gv2-metrics">
          {[["Booking", inRange.length], ["Số khách (PAX)", pax], ["Hoàn thành", inRange.filter(b => b.status === "completed").length], ["Chờ xác nhận", inRange.filter(b => b.status === "pending").length], ["Đã hủy", inRange.filter(b => b.status === "cancelled").length]].map(([title, number]) => <section className="gv2-panel gvd-stat" key={String(title)}><p>{title}</p><strong>{number}</strong><small>Ví dụ minh họa</small></section>)}
        </div>
        <div className="gvd-overview-grid"><section className="gv2-panel"><div className="gvd-section-header"><h2>Booking theo ngày</h2><span>DEMO</span></div>
          {[...new Set(inRange.map(b => b.date))].sort().map(day => <div className="gvd-bar-line" key={day}><span>{dateVN(day)}</span><div className="gvd-bar-track"><i style={{ width: `${Math.max(8, inRange.filter(b => b.date === day).length * 45)}%` }} /></div><strong>{inRange.filter(b => b.date === day).length}</strong></div>)}
          {inRange.length === 0 && <p className="gv2-muted">Không có booking mẫu trong khoảng này.</p>}
        </section><section className="gv2-panel"><div className="gvd-section-header"><h2>Thao tác nhanh</h2><span>MINH HỌA</span></div>
          <button className="gvd-quick" onClick={() => { setTab("customers"); setNotice(""); }}>Tìm hồ sơ khách hàng <span>→</span></button>
          <button className="gvd-quick" onClick={() => { setTab("followups"); setNotice(""); }}>Xem khách cần chăm sóc <span>→</span></button>
          <div className="gvd-note">Tính năng tạo booking, điều hành và thanh toán đang giữ ở Admin hiện tại; bản demo không mô phỏng ghi dữ liệu thật.</div>
        </section></div>
        <section className="gv2-panel gvd-bookings"><h2>Booking mẫu trong kỳ</h2><div className="gv2-table-scroll"><table><thead><tr><th>Mã</th><th>Ngày khởi hành</th><th>Tour</th><th>PAX</th><th>Trạng thái</th></tr></thead><tbody>
          {inRange.map(b => <tr key={b.id}><td>{b.id}</td><td>{dateVN(b.date)}</td><td>{b.name}</td><td>{b.pax}</td><td><span className={`gvd-status ${b.status}`}>{statusVN(b.status)}</span></td></tr>)}
          {inRange.length === 0 && <tr><td colSpan={5}>Chưa có booking mẫu.</td></tr>}
        </tbody></table></div></section>
      </>}
      {tab === "customers" && <>
        <div className="gv2-search"><input aria-label="Tìm khách mẫu" placeholder="Tìm theo tên, quốc gia, ngôn ngữ…" value={query} onChange={event => setQuery(event.target.value)} /><button type="button" onClick={() => setNotice(`Tìm thấy ${filtered.length} hồ sơ mẫu.`)}>Tìm khách</button></div>
        <div className="gv2-columns"><section className="gv2-panel"><div className="gvd-section-header"><h2>Danh sách khách hàng</h2><span>{filtered.length} KHÁCH MẪU</span></div><p className="gv2-muted">Một khách có thể liên kết nhiều booking. Không tự động gộp trùng số điện thoại.</p>
          {filtered.map(c => <button className={`gv2-customer ${selectedId === c.id ? "gvd-selected" : ""}`} key={c.id} onClick={() => { setSelectedId(c.id); setNotice(""); }}><span><b>{c.name}</b><small>{c.market} · {c.language}</small></span><span>{bookings.filter(b => b.customerId === c.id).length} booking →</span></button>)}
          {filtered.length === 0 && <p className="gv2-muted">Không có khách mẫu phù hợp.</p>}
        </section><section className="gv2-panel"><div className="gvd-section-header"><h2>Hồ sơ khách</h2><span>ID: {selected.id}</span></div><h3>{selected.name}</h3><p className="gv2-muted">{selected.market} · {selected.language} · {selected.phone}</p><div className="gvd-note">Sở thích: {selected.preference}</div><h3>Lịch sử booking</h3>
          {bookings.filter(b => b.customerId === selected.id).map(b => <div className="gv2-history" key={b.id}><b>{b.name}</b><span>{b.id} · {dateVN(b.date)} · {b.pax} khách · {statusVN(b.status)}</span></div>)}
          <h3>Quyền nhận tin tiếp thị</h3><p className="gv2-muted">{consent[selected.id] ? "Đã đồng ý (GIẢ LẬP)" : "Chưa đồng ý / đã từ chối (GIẢ LẬP)"}</p>
          <label className="gv2-field">Nguồn đồng ý<input value={source} onChange={event => setSource(event.target.value)} placeholder="Ví dụ: tin nhắn mẫu" /></label>
          <label className="gv2-field">Bằng chứng đồng ý<input value={evidence} onChange={event => setEvidence(event.target.value)} placeholder="Nội dung xác nhận mẫu" /></label>
          <div className="gv2-controls"><button onClick={() => saveConsent(true)}>Bật đồng ý (demo)</button><button className="gv2-secondary" onClick={() => saveConsent(false)}>Ngừng tiếp thị (demo)</button></div>
        </section></div>
      </>}
      {tab === "followups" && <section className="gv2-panel"><div className="gvd-section-header"><h2>Nhắc chăm sóc sau một năm</h2><span>{reminders.length} VIỆC MẪU</span></div><p className="gv2-muted">Chỉ khách đã đồng ý tiếp thị. Bấm thao tác chỉ cập nhật trạng thái trên màn hình thử nghiệm, không gửi WhatsApp.</p>
        <div className="gv2-table-scroll"><table><thead><tr><th>Khách</th><th>Tour đã đi</th><th>Ngày nhắc</th><th>Thao tác</th></tr></thead><tbody>
          {reminders.map(item => <tr key={item.id}><td>{CUSTOMERS.find(c => c.id === item.customerId)?.name}</td><td>{item.trip}<br /><small>Chuyến trước: {dateVN(item.oldDate)}</small></td><td>{dateVN(item.due)}</td><td><div className="gv2-controls"><button className="gv2-secondary" onClick={() => setNotice("Đây là bản demo: không mở WhatsApp hay gửi tin thật.")}>Thử WhatsApp</button><button disabled={item.due > today} onClick={() => { setHandled(old => [...old, item.id]); setNotice("Đã ghi nhận kết quả trong demo; không lưu dữ liệu thật."); }}>Đã liên hệ</button><button disabled={item.due > today} className="gv2-secondary" onClick={() => { setHandled(old => [...old, item.id]); setNotice("Đã bỏ qua nhắc việc trong demo."); }}>Bỏ qua</button></div></td></tr>)}
          {reminders.length === 0 && <tr><td colSpan={4}>Không còn nhắc việc mẫu. Bấm “Đặt lại demo” để thử lại.</td></tr>}
        </tbody></table></div><div className="gvd-note">Mẹo kiểm tra: vào Customers & CRM → chọn Khách mẫu B → bật đồng ý → trở lại Follow-up Center để thấy thêm một nhắc việc.</div></section>}
    </main>
  </div>;
}
