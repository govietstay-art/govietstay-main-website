"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { PILOT_HOTELS, type PilotRoom, type PilotHotel } from "../../lib/hotel-partners/pilot-catalog";
import "./hotel-pilot.css";

const db = createClient(
  "https://vscffgnxaexestnayvae.supabase.co",
  "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV",
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);
type View = "catalog" | "property" | "partner" | "review";
type DraftRoom = { name: string; sizeSqm: number | null; bed: string };
const fmt = (n: number) => new Intl.NumberFormat("vi-VN").format(n);
const labelFor = (room: PilotRoom) => [
  room.sizeSqm ? room.sizeSqm + " m²" : null,
  room.bed || null,
  room.adults ? "Tối đa " + room.adults + " người lớn" : null,
].filter(Boolean).join(" · ");

function PhotoSlot({ label, compact = false }: { label: string; compact?: boolean }) {
  return <div className={"hp-photo" + (compact ? " hp-photo-small" : "")}>
    <div className="hp-photo-art" aria-hidden="true"><span /><span /><span /></div>
    <div className="hp-photo-meta">
      <span className="hp-photo-mark">▧</span>
      <span>{label}</span>
    </div>
    <span className="hp-photo-caption">Chưa xác minh ảnh gốc</span>
  </div>;
}

export default function HotelPilot() {
  const [access, setAccess] = useState<"checking" | "allowed" | "denied">("checking");
  const [view, setView] = useState<View>("catalog");
  const [selected, setSelected] = useState("KS01");
  const [search, setSearch] = useState("");
  const [hotelFilter, setHotelFilter] = useState("all");
  const [formName, setFormName] = useState("");
  const [formSize, setFormSize] = useState("");
  const [formBed, setFormBed] = useState("");
  const [draftRooms, setDraftRooms] = useState<Record<string, DraftRoom[]>>({});
  const [pending, setPending] = useState<string[]>([]);
  const [approved, setApproved] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let alive = true;
    async function authorize() {
      try {
        const { data: { user }, error } = await db.auth.getUser();
        if (error || !user) { if (alive) setAccess("denied"); return; }
        const { data, error: staffError } = await db.from("staff_profiles")
          .select("role,active").eq("auth_user_id", user.id).maybeSingle();
        if (alive) setAccess(!staffError && data?.active === true &&
          ["owner", "admin"].includes(String(data.role)) ? "allowed" : "denied");
      } catch { if (alive) setAccess("denied"); }
    }
    void authorize();
    const { data: listener } = db.auth.onAuthStateChange(() => { void authorize(); });
    return () => { alive = false; listener.subscription.unsubscribe(); };
  }, []);

  const hotel = PILOT_HOTELS.find(h => h.code === selected) || PILOT_HOTELS[0];
  const hotelCount = PILOT_HOTELS.length;
  const roomCount = PILOT_HOTELS.reduce((sum, h) => sum + h.rooms.length, 0);
  const filtered = useMemo(() => PILOT_HOTELS.filter(h => {
    const matches = (h.name + " " + h.code + " " + h.area).toLowerCase().includes(search.trim().toLowerCase());
    return matches && (hotelFilter === "all" || (hotelFilter === "needs-photo" && h.photoStatus === "pending") ||
      (hotelFilter === "pending" && pending.includes(h.code)));
  }), [search, hotelFilter, pending]);

  function openHotel(code: string) { setSelected(code); setView("property"); setMessage(""); }
  function submitDraft() {
    const name = formName.trim();
    if (!name) { setMessage("Hãy nhập tên hạng phòng trước khi lưu bản nháp."); return; }
    const size = formSize ? Number(formSize) : null;
    if (size !== null && (!Number.isFinite(size) || size <= 0 || size > 2000)) {
      setMessage("Diện tích phòng phải là số hợp lệ."); return;
    }
    setDraftRooms(prev => ({ ...prev, [selected]: [...(prev[selected] || []), { name, sizeSqm: size, bed: formBed.trim() }] }));
    setFormName(""); setFormSize(""); setFormBed("");
    setMessage("Đã thêm vào bản nháp trên màn hình. Chưa ghi vào Supabase.");
  }
  function submitForReview() {
    if (!pending.includes(selected)) setPending(prev => [...prev, selected]);
    setMessage("Đã mô phỏng yêu cầu kiểm duyệt trong phiên xem thử; chưa gửi đến hệ thống thật.");
  }
  function approve(code: string) {
    setPending(p => p.filter(id => id !== code));
    setApproved(p => [...new Set([...p, code])]);
    setMessage("Đã mô phỏng phê duyệt " + code + ". Chưa cập nhật dữ liệu thật.");
  }

  if (access === "checking") return <main className="hp-access"><div className="hp-loading">Đang xác minh quyền quản trị GoVietStay…</div></main>;
  if (access === "denied") return <main className="hp-access">
    <div className="hp-access-card"><span className="hp-logo">G<span>V</span>S</span>
      <h1>Cổng thử nghiệm khách sạn</h1>
      <p>Chỉ tài khoản Owner hoặc Admin đang hoạt động được mở bản thử nghiệm này.</p>
      <a href="/admin" className="hp-primary-link">Đăng nhập tại GoVietStay Admin</a>
    </div>
  </main>;

  return <main className="hp-shell">
    <aside className="hp-sidebar">
      <a className="hp-brand" href="/admin"><span className="hp-logo">G<span>V</span>S</span><span><strong>GoVietStay</strong><small>Hotel Partner Portal</small></span></a>
      <span className="hp-nav-label">Không gian thử nghiệm</span>
      <nav className="hp-nav" aria-label="Điều hướng">
        <button className={view === "catalog" || view === "property" ? "active" : ""} onClick={() => setView("catalog")}><span>▦</span> Danh mục khách sạn</button>
        <button className={view === "partner" ? "active" : ""} onClick={() => { setView("partner"); setMessage(""); }}><span>✎</span> Khách sạn tự nhập</button>
        <button className={view === "review" ? "active" : ""} onClick={() => { setView("review"); setMessage(""); }}><span>✓</span> Trung tâm kiểm duyệt {pending.length > 0 && <em>{pending.length}</em>}</button>
      </nav>
      <div className="hp-sidebar-note"><strong>Chế độ an toàn</strong><p>Giao diện mô phỏng. Không có thao tác ghi cơ sở dữ liệu hoặc gửi booking thật.</p></div>
      <a href="/admin" className="hp-back">← Về Admin Operations</a>
    </aside>

    <section className="hp-main">
      <header className="hp-topbar"><div><span className="hp-eyebrow">GoVietStay / Hotels / Pilot</span><h1>{view === "catalog" ? "Khách sạn đối tác" : view === "property" ? hotel.name : view === "partner" ? "Trung tâm nhập liệu" : "Kiểm duyệt thay đổi"}</h1></div><div className="hp-top-right"><span className="hp-demo-pill">● DEMO · KHÔNG GHI DỮ LIỆU</span><span className="hp-avatar">AD</span></div></header>

      {view === "catalog" && <>
        <section className="hp-hero"><div><span className="hp-hero-kicker">Nền tảng phân phối phòng B2B</span><h2>Một nơi quản lý.<br/><i>Hàng nghìn đối tác.</i></h2><p>Khách sạn tự cập nhật hồ sơ và hạng phòng. GoVietStay giữ quyền kiểm duyệt và bảo vệ giá NET.</p><button onClick={() => { setView("partner"); setMessage(""); }} className="hp-button-primary">Khám phá cổng đối tác <span>→</span></button></div><div className="hp-hero-visual" aria-label="Quy trình vận hành"><span className="hp-visual-top">QUY TRÌNH 3 BƯỚC</span><div><b>01</b><span>Đối tác tự nhập</span></div><div><b>02</b><span>Hệ thống kiểm tra</span></div><div><b>03</b><span>GoVietStay phê duyệt</span></div></div></section>
        <section className="hp-stats" aria-label="Thống kê thử nghiệm">
          <div><span>Khách sạn thử nghiệm</span><strong>{hotelCount.toString().padStart(2,"0")}</strong><small>Đà Nẵng · Naraco chờ cập nhật địa chỉ</small></div>
          <div><span>Hạng phòng đã nhập mẫu</span><strong>{roomCount}</strong><small>Dữ liệu từ 2 bảng tính</small></div>
          <div><span>Hồ sơ cần kiểm tra ảnh</span><strong>{hotelCount.toString().padStart(2,"0")}</strong><small>Chưa liên kết ảnh gốc</small></div>
          <div><span>Quyền xem giá NET</span><strong className="hp-private">Bảo mật</strong><small>Không đưa vào mã nguồn demo</small></div>
        </section>
        <div className="hp-section-heading"><div><h2>Danh mục đối tác</h2><p>Chọn một khách sạn để xem cấu trúc thông tin và các hạng phòng.</p></div><span>{filtered.length} khách sạn</span></div>
        <div className="hp-filters"><label className="hp-search"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm theo tên khách sạn, mã hoặc khu vực…" aria-label="Tìm khách sạn" /></label><select aria-label="Lọc tình trạng" value={hotelFilter} onChange={e => setHotelFilter(e.target.value)}><option value="all">Tất cả khách sạn</option><option value="needs-photo">Thiếu ảnh đã xác minh</option><option value="pending">Đang chờ duyệt mô phỏng</option></select></div>
        <div className="hp-cards">{filtered.map(h => <button className="hp-hotel-card" key={h.code} onClick={() => openHotel(h.code)}><PhotoSlot label={h.code}/><div className="hp-card-body"><span className="hp-card-kicker">{h.code} · {h.stars ? h.stars + " sao" : "Chưa xác nhận hạng sao"}</span><h3>{h.name}</h3><p className="hp-card-location">⌖ {h.address}</p><div className="hp-card-footer"><span>{h.rooms.length} hạng phòng</span><span className="hp-card-open">Xem hồ sơ →</span></div></div></button>)}</div>
        {filtered.length === 0 && <p className="hp-empty">Không tìm thấy khách sạn phù hợp.</p>}
      </>}

      {view === "property" && <>
        <div className="hp-breadcrumb"><button onClick={() => setView("catalog")}>← Danh mục khách sạn</button><span>/ {hotel.code}</span></div>
        <section className="hp-property-hero"><PhotoSlot label={"Ảnh tổng quan · " + hotel.name}/><div className="hp-property-info"><span className="hp-card-kicker">{hotel.code} · HỒ SƠ THỬ NGHIỆM</span><h2>{hotel.name}</h2><p>⌖ {hotel.address}</p><p>{hotel.description}</p><div className="hp-tags"><span>{hotel.rooms.length} hạng phòng</span><span>Ảnh chờ xác minh</span><span>Giá NET được bảo vệ</span></div><button className="hp-button-primary" onClick={() => { setView("partner"); setMessage(""); }}>Chỉnh sửa bản nháp →</button></div></section>
        <div className="hp-section-heading"><div><h2>Hạng phòng</h2><p>Cách trình bày dành cho nhân viên tra cứu và khách sạn nhập liệu.</p></div><span>{hotel.rooms.length} phòng mẫu</span></div>
        <div className="hp-room-list">{hotel.rooms.map(r => <div className="hp-room" key={r.code}><PhotoSlot label={r.code} compact/><div className="hp-room-text"><span className="hp-card-kicker">{r.code}</span><h3>{r.name}</h3><p>{labelFor(r) || "Thông số đang chờ bổ sung"}</p><div className="hp-tags"><span>{r.breakfast ? "Có ăn sáng" : "Ăn sáng chưa xác minh"}</span>{r.view && <span>{r.view}</span>}</div></div><div className="hp-room-rate"><strong>Giá NET</strong><span>Chỉ xem qua dịch vụ được phân quyền</span><small>Ảnh: chờ xác minh</small></div></div>)}</div>
      </>}

      {view === "partner" && <>
        <section className="hp-workflow-header"><div><span className="hp-card-kicker">TRẢI NGHIỆM ĐỐI TÁC</span><h2>Tự cập nhật, không cần gửi Excel</h2><p>Bản mô phỏng thao tác nhập phòng. Dữ liệu chỉ được giữ trong phiên hiện tại.</p></div><span className="hp-step">01 / 03 · Tạo bản nháp</span></section>
        <div className="hp-partner-grid"><div className="hp-form-card">
          <label className="hp-field-label" htmlFor="hp-select-hotel">Khách sạn được cấp quyền (mô phỏng)</label>
          <select id="hp-select-hotel" value={selected} onChange={e => { setSelected(e.target.value); setMessage(""); }}>{PILOT_HOTELS.map(h => <option key={h.code} value={h.code}>{h.code} · {h.name}</option>)}</select>
          <div className="hp-form-divider" />
          <h3>Thêm hạng phòng</h3><p>Điền ba thông tin cơ bản, có thể mở rộng tiện nghi và chính sách sau.</p>
          <label className="hp-field-label" htmlFor="hp-room-name">Tên hạng phòng *</label><input id="hp-room-name" value={formName} onChange={e => setFormName(e.target.value)} placeholder="Ví dụ: Deluxe Ocean View"/>
          <div className="hp-form-row"><div><label className="hp-field-label" htmlFor="hp-room-area">Diện tích (m²)</label><input id="hp-room-area" value={formSize} onChange={e => setFormSize(e.target.value)} inputMode="decimal" placeholder="28"/></div><div><label className="hp-field-label" htmlFor="hp-room-bed">Loại giường</label><input id="hp-room-bed" value={formBed} onChange={e => setFormBed(e.target.value)} placeholder="1 King"/></div></div>
          <div className="hp-image-upload"><strong>▧ Thư viện ảnh</strong><span>Tải ảnh gốc, cắt tỷ lệ và kiểm tra quyền Drive sẽ được kết nối ở bước sau.</span></div>
          <button className="hp-button-primary hp-wide" onClick={submitDraft}>+ Lưu phòng vào bản nháp trên màn hình</button>
          {message && <p className="hp-message" role="status">{message}</p>}
        </div><aside className="hp-preview-card"><span className="hp-card-kicker">XEM TRƯỚC HỒ SƠ</span><h3>{hotel.name}</h3><PhotoSlot label={"Ảnh chính · " + hotel.code} compact/><div className="hp-preview-count"><strong>{hotel.rooms.length + (draftRooms[selected]?.length || 0)}</strong><span>hạng phòng gồm dữ liệu mẫu và bản nháp</span></div>
          <ul>{hotel.rooms.slice(0,3).map(r=><li key={r.code}>{r.name}</li>)}{(draftRooms[selected]||[]).map((r,i)=><li key={i}><b>Nháp:</b> {r.name}{r.sizeSqm?" · "+r.sizeSqm+"m²":""}</li>)}</ul>
          <button className="hp-button-outline hp-wide" onClick={submitForReview}>Mô phỏng gửi phê duyệt →</button><p className="hp-hint">Giá NET, chính sách ngày hiệu lực và tải ảnh thật chưa được ghi trong bản mô phỏng.</p>
        </aside></div>
      </>}

      {view === "review" && <>
        <section className="hp-workflow-header"><div><span className="hp-card-kicker">GO VIETSTAY CONTROL CENTER</span><h2>Mỗi thay đổi đều có người duyệt</h2><p>Phần này mô phỏng hàng chờ phê duyệt. Không thay đổi bản ghi Supabase.</p></div><span className="hp-step">02 / 03 · Kiểm duyệt</span></section>
        <div className="hp-review-summary"><div><strong>{pending.length}</strong><span>Yêu cầu đang chờ trong phiên</span></div><div><strong>{approved.length}</strong><span>Đã duyệt mô phỏng</span></div><div><strong>{fmt(roomCount)}</strong><span>Hạng phòng dữ liệu nguồn</span></div></div>
        <div className="hp-review-list">{pending.length === 0 ? <div className="hp-review-empty"><strong>Chưa có yêu cầu mô phỏng</strong><p>Vào mục “Khách sạn tự nhập”, chọn khách sạn và bấm “Mô phỏng gửi phê duyệt”.</p><button className="hp-button-primary" onClick={() => setView("partner")}>Mở cổng đối tác →</button></div> : pending.map(code => {
          const h = PILOT_HOTELS.find(x=>x.code===code) as PilotHotel;
          return <div className="hp-approval-row" key={code}><div><span className="hp-card-kicker">{code} · CHỜ DUYỆT</span><h3>{h.name}</h3><p>{h.rooms.length} phòng nguồn · {(draftRooms[code]||[]).length} phòng thêm trong phiên</p></div><button className="hp-button-primary" onClick={() => approve(code)}>Duyệt mô phỏng</button></div>;
        })}</div>{message && <p className="hp-message" role="status">{message}</p>}
      </>}
      <footer className="hp-footer">GoVietStay · Hotel Partner Portal / Pilot 6 properties · Read-only seed · NET rates intentionally excluded</footer>
    </section>
  </main>;
}
