"use client";

import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  PHU_QUOC_SALES_COMMISSION_RATE,
  PHU_QUOC_SALES_TOURS,
  phuQuocCommissionVnd,
  phuQuocPartnerUrl,
  type PhuQuocSalesTour,
} from "../../lib/phuQuocSalesCatalog";

type Props = { supabase: any; adminStaff?: any };
type Staff = { id: string; display_name: string; sales_code: string };

function money(v: any) {
  return new Intl.NumberFormat("vi-VN").format(Number(v || 0)) + " ₫";
}

function bookingCode() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const tail = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `GVS-${y}${m}${day}-PQC-${tail}`;
}

export default function PhuQuocSalesHub({ supabase, adminStaff }: Props) {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [staffId, setStaffId] = useState("");
  const [tourCode, setTourCode] = useState(PHU_QUOC_SALES_TOURS[0].code);
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [tourDate, setTourDate] = useState("");
  const [hotel, setHotel] = useState("");
  const [pickup, setPickup] = useState("");
  const [language, setLanguage] = useState("Russian support");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [manualGross, setManualGross] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [partnerCode, setPartnerCode] = useState("");
  const [partnerLang, setPartnerLang] = useState<"ru" | "en">("ru");
  const [partnerSale, setPartnerSale] = useState(0);
  const [filter, setFilter] = useState("");

  const selected = useMemo(
    () => PHU_QUOC_SALES_TOURS.find((t) => t.code === tourCode) || PHU_QUOC_SALES_TOURS[0],
    [tourCode]
  );

  const gross = useMemo(() => {
    if (selected.quoteOnly) return Math.max(0, Number(manualGross || 0));
    return Math.max(
      0,
      Number(selected.adultVnd || 0) * Math.max(0, adults) +
        Number(selected.childVnd || 0) * Math.max(0, children)
    );
  }, [selected, manualGross, adults, children]);

  const netSelling = Math.max(0, gross - Math.max(0, discount));
  const commission = phuQuocCommissionVnd(netSelling);
  const partnerLink = phuQuocPartnerUrl(partnerCode, partnerLang);
  const partnerCommission = phuQuocCommissionVnd(partnerSale);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return PHU_QUOC_SALES_TOURS;
    return PHU_QUOC_SALES_TOURS.filter((t) =>
      `${t.code} ${t.nameEn} ${t.nameRu}`.toLowerCase().includes(q)
    );
  }, [filter]);

  useEffect(() => {
    let live = true;
    (async () => {
      const { data, error } = await supabase
        .from("staff_profiles")
        .select("id,display_name,sales_code")
        .not("sales_code", "is", null)
        .eq("active", true)
        .order("display_name");
      if (!live) return;
      if (error) {
        setError(error.message || "Không tải được staff profiles.");
        return;
      }
      const rows = (data || []) as Staff[];
      setStaff(rows);
      if (rows.length) setStaffId(rows[0].id);
    })();
    return () => { live = false; };
  }, [supabase]);

  async function submitBooking(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!guestName.trim() || !phone.trim() || !tourDate) {
      setError("Cần Guest name, WhatsApp/phone và tour date.");
      return;
    }

    const owner = staff.find((s) => s.id === staffId);
    if (!owner?.sales_code) {
      setError("Chưa chọn sales owner có sales_code.");
      return;
    }

    if (selected.quoteOnly && gross <= 0) {
      setError("Private/quote-only tour cần nhập giá bán đã được duyệt.");
      return;
    }

    setSaving(true);
    try {
      const code = bookingCode();
      const marker = [
        "GVS_PQ_7PCT",
        `PRODUCT=${selected.code}`,
        `COMMISSION_RATE=${PHU_QUOC_SALES_COMMISSION_RATE}`,
        `COMMISSION_BASE_VND=${netSelling}`,
        `COMMISSION_VND=${commission}`,
        "BASE_SALARY_POLICY=UNCHANGED",
        "SOURCE=ADMIN_PHU_QUOC_SALES",
      ].join(" | ");

      const { data, error } = await supabase.rpc("staff_submit_booking_request", {
        p_sales_code: owner.sales_code,
        p_booking_code: code,
        p_guest_name: guestName.trim(),
        p_phone: phone.trim(),
        p_tour_date: tourDate,
        p_pickup_time: "",
        p_hotel: hotel.trim(),
        p_region: "Phu Quoc",
        p_tour_slug: selected.slug,
        p_tour_name: selected.nameEn,
        p_variant_id: selected.code,
        p_variant_name: selected.nameRu,
        p_language: language,
        p_adults: Math.max(0, adults),
        p_children: Math.max(0, children),
        p_infants: Math.max(0, infants),
        p_gross_revenue_vnd: gross,
        p_discount_vnd: Math.max(0, discount),
        p_deposit_vnd: Math.max(0, deposit),
        p_notes: `${marker}\nPickup: ${pickup.trim() || "TBC"}\n${notes.trim()}`.trim(),
      });

      if (error) throw error;

      setMessage(
        `Đã tạo Pending Request ${code}. Hoa hồng Phú Quốc dự kiến ${money(commission)} = 7% giá bán thực thu. ` +
        `Base salary không thay đổi. Owner vẫn duyệt ở Sales Team / Payroll trước khi vào Booking Master.`
      );

      setGuestName("");
      setPhone("");
      setHotel("");
      setPickup("");
      setNotes("");
      setDiscount(0);
      setDeposit(0);
      if (selected.quoteOnly) setManualGross(0);
    } catch (e: any) {
      setError(e?.message || "Không tạo được Phú Quốc booking request.");
    } finally {
      setSaving(false);
    }
  }

  async function copyText(text: string, ok: string) {
    try {
      await navigator.clipboard.writeText(text);
      setMessage(ok);
    } catch {
      setError("Không copy được. Hãy copy thủ công.");
    }
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div className="gva-analytics-note">
        <b>Phú Quốc Sales Master:</b> 13 join-in tours + private quote programs. Commission mặc định
        <b> 7% trên giá bán thực thu</b>. Base salary vẫn dùng khung lương hiện tại; không bị thay đổi bởi module này.
      </div>

      {error && <div className="gva-msg err">{error}</div>}
      {message && <div className="gva-msg">{message}</div>}

      <div className="gva-grid2">
        <section className="gva-card">
          <div className="gva-section-head">
            <div>
              <h2>Staff Booking · Phú Quốc</h2>
              <div className="gva-mini">Pending → Owner approval → Booking Master → Ops → Finance</div>
            </div>
          </div>

          <form onSubmit={submitBooking} style={{ display: "grid", gap: 12 }}>
            <label>
              <div className="gva-mini">Sales owner</div>
              <select className="gva-select" value={staffId} onChange={(e) => setStaffId(e.target.value)}>
                {staff.map((s) => <option key={s.id} value={s.id}>{s.display_name} · {s.sales_code}</option>)}
              </select>
            </label>

            <label>
              <div className="gva-mini">Tour</div>
              <select className="gva-select" value={tourCode} onChange={(e) => setTourCode(e.target.value)}>
                {PHU_QUOC_SALES_TOURS.filter((t) => t.staffVisible).map((t) => (
                  <option key={t.code} value={t.code}>{t.code} · {t.nameEn}</option>
                ))}
              </select>
            </label>

            <div className="gva-grid2">
              <label><div className="gva-mini">Guest name</div><input className="gva-input" value={guestName} onChange={(e) => setGuestName(e.target.value)} /></label>
              <label><div className="gva-mini">WhatsApp / Phone</div><input className="gva-input" value={phone} onChange={(e) => setPhone(e.target.value)} /></label>
              <label><div className="gva-mini">Tour date</div><input className="gva-input" type="date" value={tourDate} onChange={(e) => setTourDate(e.target.value)} /></label>
              <label><div className="gva-mini">Language</div>
                <select className="gva-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option>Russian support</option><option>English</option><option>Russian guide requested</option><option>Vietnamese</option>
                </select>
              </label>
            </div>

            <div className="gva-grid2">
              <label><div className="gva-mini">Adults</div><input className="gva-input" type="number" min="0" value={adults} onChange={(e) => setAdults(Number(e.target.value || 0))} /></label>
              <label><div className="gva-mini">Children</div><input className="gva-input" type="number" min="0" value={children} onChange={(e) => setChildren(Number(e.target.value || 0))} /></label>
              <label><div className="gva-mini">Infants</div><input className="gva-input" type="number" min="0" value={infants} onChange={(e) => setInfants(Number(e.target.value || 0))} /></label>
              {selected.quoteOnly && <label><div className="gva-mini">Approved selling price</div><input className="gva-input" type="number" min="0" value={manualGross} onChange={(e) => setManualGross(Number(e.target.value || 0))} /></label>}
            </div>

            <div className="gva-grid2">
              <label><div className="gva-mini">Hotel</div><input className="gva-input" value={hotel} onChange={(e) => setHotel(e.target.value)} /></label>
              <label><div className="gva-mini">Pickup</div><input className="gva-input" value={pickup} onChange={(e) => setPickup(e.target.value)} /></label>
              <label><div className="gva-mini">Discount</div><input className="gva-input" type="number" min="0" value={discount} onChange={(e) => setDiscount(Number(e.target.value || 0))} /></label>
              <label><div className="gva-mini">Deposit received</div><input className="gva-input" type="number" min="0" value={deposit} onChange={(e) => setDeposit(Number(e.target.value || 0))} /></label>
            </div>

            <label><div className="gva-mini">Notes</div><textarea className="gva-input" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} /></label>

            <div style={{ border: "1px solid #e4e7ec", borderRadius: 12, padding: 12, background: "#fcfcfd" }}>
              <div><b>Gross:</b> {money(gross)}</div>
              <div><b>Net selling after discount:</b> {money(netSelling)}</div>
              <div style={{ marginTop: 5, color: "#067647" }}><b>Phú Quốc commission 7%:</b> {money(commission)}</div>
              <div className="gva-mini">Commission is only earned after the booking is eligible/completed under the existing payroll controls.</div>
            </div>

            <button className="gva-btn" disabled={saving}>{saving ? "Đang tạo…" : "Tạo Pending Booking Request"}</button>
          </form>
        </section>

        <section className="gva-card">
          <div className="gva-section-head">
            <div>
              <h2>Partner QR · Phú Quốc</h2>
              <div className="gva-mini">Một QR → toàn bộ catalog Phú Quốc → giữ partner attribution</div>
            </div>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            <label><div className="gva-mini">Partner code</div><input className="gva-input" value={partnerCode} onChange={(e) => setPartnerCode(e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, ""))} placeholder="VD: DUYTINH01" /></label>
            <label><div className="gva-mini">Landing language</div>
              <select className="gva-select" value={partnerLang} onChange={(e) => setPartnerLang(e.target.value as "ru" | "en")}>
                <option value="ru">Russian</option><option value="en">English</option>
              </select>
            </label>

            <div style={{ display: "grid", placeItems: "center", padding: 14, border: "1px solid #e4e7ec", borderRadius: 14 }}>
              <QRCodeSVG value={partnerLink} size={168} includeMargin />
              <div className="gva-mini" style={{ marginTop: 8, textAlign: "center", wordBreak: "break-all" }}>{partnerLink}</div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button className="gva-btn secondary" type="button" onClick={() => copyText(partnerLink, "Đã copy Phú Quốc Partner link.")}>Copy link</button>
              <button className="gva-btn secondary" type="button" onClick={() => window.open(partnerLink, "_blank", "noopener,noreferrer")}>Open catalog</button>
            </div>

            <label><div className="gva-mini">Booking value để kiểm tra commission</div><input className="gva-input" type="number" min="0" value={partnerSale} onChange={(e) => setPartnerSale(Number(e.target.value || 0))} /></label>
            <div style={{ borderRadius: 12, padding: 12, background: "#eff8ff", color: "#175cd3" }}>
              <b>Partner commission 7%:</b> {money(partnerCommission)}
              <div className="gva-mini">Chỉ ghi nhận khi tour hoàn thành/đủ điều kiện theo Commission Master.</div>
            </div>
          </div>
        </section>
      </div>

      <section className="gva-card">
        <div className="gva-section-head">
          <div>
            <h2>Phú Quốc Tour Catalog</h2>
            <div className="gva-mini">{PHU_QUOC_SALES_TOURS.length} products · Staff + Partner channels</div>
          </div>
          <input className="gva-input" style={{ maxWidth: 300 }} placeholder="Search tour…" value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>

        <div className="gva-table-wrap">
          <table className="gva-table">
            <thead><tr><th>Code</th><th>Tour</th><th>Adult</th><th>Child</th><th>Commission</th><th>Channels</th></tr></thead>
            <tbody>
              {filtered.map((t: PhuQuocSalesTour) => (
                <tr key={t.code}>
                  <td><b>{t.code}</b></td>
                  <td><b>{t.nameEn}</b><div className="gva-mini">{t.nameRu}</div></td>
                  <td>{t.quoteOnly ? "Quote" : money(t.adultVnd)}</td>
                  <td>{t.quoteOnly ? "Quote" : money(t.childVnd)}</td>
                  <td><b>7%</b></td>
                  <td><span className="gva-pill">Staff</span> <span className="gva-pill">Partner QR</span> <span className="gva-pill">RU</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
