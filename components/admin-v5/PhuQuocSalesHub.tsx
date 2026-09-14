"use client";

import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import PhuQuocPartnerPosterInline from "./PhuQuocPartnerPosterInline";
import {
  PHU_QUOC_SALES_COMMISSION_RATE,
  PHU_QUOC_SALES_TOURS,
  phuQuocCommissionVnd,
  phuQuocPartnerUrl,
  type PhuQuocSalesTour,
} from "../../lib/phuQuocSalesCatalog";

type Props = { supabase: any; adminStaff?: any };
type Staff = { id: string; display_name: string; sales_code: string };
type PartnerMasterRow = { id: string; name: string; ref_code: string; active: boolean };
type QuickPartnerForm = {
  name: string;
  ref_code: string;
  contact_name: string;
  contact: string;
  partner_type: string;
  market: string;
  landing: string;
  discount: number;
  start_date: string;
};
// GVS_PQ_PARTNER_MASTER_V3

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
function cleanPartnerRef(v: any) {
  return String(v || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 60);
}

function normalizePartnerLanding(v: string) {
  const x = String(v || "").trim();
  if (!x) return "/ru/tours/phu-quoc";
  if (/^https?:\/\//i.test(x)) return x;
  if (/^(www\.)?govietstay\.com/i.test(x)) {
    return "https://www.govietstay.com" + x.replace(/^(www\.)?govietstay\.com/i, "");
  }
  return x.startsWith("/") ? x : "/" + x;
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
  const [partnerRows, setPartnerRows] = useState<PartnerMasterRow[]>([]);
  const [partnerLoading, setPartnerLoading] = useState(false);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [partnerSaving, setPartnerSaving] = useState(false);
  const [newPartner, setNewPartner] = useState<QuickPartnerForm>({
    name: "",
    ref_code: "",
    contact_name: "",
    contact: "",
    partner_type: "referral",
    market: "Russian-speaking travelers",
    landing: "/ru/tours/phu-quoc",
    discount: 0,
    start_date: "",
  });
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

  async function loadPartnerMaster() {
    setPartnerLoading(true);
    try {
      const { data, error } = await supabase
        .from("partners")
        .select("id,name,ref_code,active")
        .eq("active", true)
        .order("name");
      if (error) throw error;
      setPartnerRows((data || []) as PartnerMasterRow[]);
    } catch (e: any) {
      setError(e?.message || "KhÃ´ng táº£i Ä‘Æ°á»£c Partner Master.");
    } finally {
      setPartnerLoading(false);
    }
  }

  async function createPartnerQuick(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    const name = newPartner.name.trim();
    const refCode = cleanPartnerRef(newPartner.ref_code);
    if (!name || !refCode) {
      setError("Cáº§n tÃªn partner vÃ  mÃ£ partner.");
      return;
    }

    const duplicate = partnerRows.find((p) => p.ref_code.toUpperCase() === refCode);
    if (duplicate) {
      setPartnerCode(duplicate.ref_code);
      setShowPartnerForm(false);
      setMessage(`Partner ${duplicate.ref_code} Ä‘Ã£ cÃ³ trong Partner Master. ÄÃ£ chá»n partner hiá»‡n cÃ³, khÃ´ng táº¡o trÃ¹ng.`);
      return;
    }

    setPartnerSaving(true);
    try {
      const market = newPartner.market.trim() || "Russian-speaking travelers";
      const marketLower = market.toLowerCase();
      const onboardingLanguage =
        marketLower.includes("english") || marketLower.includes("canada") || marketLower.includes("international")
          ? "en"
          : marketLower.includes("vietnam") || marketLower.includes("viá»‡t")
            ? "vi"
            : "ru";

      const { error } = await supabase.rpc("admin_create_partner", {
        p_name: name,
        p_ref_code: refCode,
        p_contact_name: newPartner.contact_name.trim() || null,
        p_contact: newPartner.contact.trim() || null,
        p_partner_type: newPartner.partner_type || "referral",
        p_landing_path: normalizePartnerLanding(newPartner.landing),
        p_market: market,
        p_onboarding_language: onboardingLanguage,
        p_start_date: newPartner.start_date || null,
        p_guest_discount: Math.max(0, Math.min(100, Number(newPartner.discount || 0))) / 100,
      });
      if (error) throw error;

      await loadPartnerMaster();
      setPartnerCode(refCode);
      setShowPartnerForm(false);
      setNewPartner({
        name: "",
        ref_code: "",
        contact_name: "",
        contact: "",
        partner_type: "referral",
        market: "Russian-speaking travelers",
        landing: partnerLang === "ru" ? "/ru/tours/phu-quoc" : "/travel/phu-quoc-private-tour",
        discount: 0,
        start_date: "",
      });
      setMessage(`ÄÃ£ táº¡o ${refCode} vÃ o Partner Master chung vÃ  chá»n cho PhÃº Quá»‘c Sales.`);
    } catch (e: any) {
      setError(e?.message || "KhÃ´ng táº¡o Ä‘Æ°á»£c partner trong Partner Master.");
    } finally {
      setPartnerSaving(false);
    }
  }

  useEffect(() => {
    loadPartnerMaster();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);
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
            <div>
              <div className="gva-mini">Partner Â· Partner Master chung</div>
              <div style={{ display: "flex", gap: 8, alignItems: "stretch", flexWrap: "wrap" }}>
                <select
                  className="gva-select"
                  style={{ flex: "1 1 260px" }}
                  value={partnerCode}
                  onChange={(e) => setPartnerCode(e.target.value)}
                  disabled={partnerLoading}
                >
                  <option value="">{partnerLoading ? "Äang táº£i Partner Masterâ€¦" : "â€” Chá»n partner â€”"}</option>
                  {partnerRows.map((p) => (
                    <option key={p.id} value={p.ref_code}>{p.name} Â· {p.ref_code}</option>
                  ))}
                </select>
                <button
                  className="gva-btn"
                  type="button"
                  onClick={() => {
                    setShowPartnerForm((v) => !v);
                    setNewPartner((p) => ({
                      ...p,
                      landing: partnerLang === "ru" ? "/ru/tours/phu-quoc" : "/travel/phu-quoc-private-tour",
                    }));
                  }}
                >
                  {showPartnerForm ? "ÄÃ³ng" : "+ ThÃªm Partner"}
                </button>
                <button className="gva-btn secondary" type="button" onClick={loadPartnerMaster}>
                  Cáº­p nháº­t
                </button>
              </div>
              <div className="gva-mini" style={{ marginTop: 6 }}>
                Giao diá»‡n PhÃº Quá»‘c tÃ¡ch riÃªng, nhÆ°ng dá»¯ liá»‡u partner váº«n ghi vÃ o má»™t Partner Master duy nháº¥t.
              </div>
            </div>

            {showPartnerForm && (
              <form onSubmit={createPartnerQuick} style={{ border: "1px solid #d0d5dd", borderRadius: 14, padding: 12, background: "#f9fafb", display: "grid", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <div>
                    <b>ThÃªm Partner má»›i Â· PhÃº Quá»‘c</b>
                    <div className="gva-mini">LÆ°u trá»±c tiáº¿p vÃ o Partners thÆ°á»ng / QR â†’ Partner Deployment Center.</div>
                  </div>
                  <span className="gva-pill">Single Partner Master</span>
                </div>

                <div className="gva-grid2">
                  <label>
                    <div className="gva-mini">TÃªn Ä‘á»‘i tÃ¡c / Website *</div>
                    <input
                      className="gva-input"
                      required
                      value={newPartner.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        setNewPartner((p) => ({
                          ...p,
                          name,
                          ref_code: p.ref_code || cleanPartnerRef(name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9]/g, "").slice(0, 10) + "01"),
                        }));
                      }}
                      placeholder="Hotel / Driver / Creator / Agency"
                    />
                  </label>
                  <label>
                    <div className="gva-mini">MÃ£ Ä‘á»‘i tÃ¡c *</div>
                    <input className="gva-input" required value={newPartner.ref_code} onChange={(e) => setNewPartner((p) => ({ ...p, ref_code: cleanPartnerRef(e.target.value) }))} placeholder="VD: PQHOTEL01" />
                  </label>
                  <label>
                    <div className="gva-mini">TÃªn liÃªn há»‡</div>
                    <input className="gva-input" value={newPartner.contact_name} onChange={(e) => setNewPartner((p) => ({ ...p, contact_name: e.target.value }))} placeholder="TÃªn ngÆ°á»i phá»¥ trÃ¡ch" />
                  </label>
                  <label>
                    <div className="gva-mini">Äiá»‡n thoáº¡i / WhatsApp</div>
                    <input className="gva-input" value={newPartner.contact} onChange={(e) => setNewPartner((p) => ({ ...p, contact: e.target.value }))} placeholder="+84â€¦" />
                  </label>
                  <label>
                    <div className="gva-mini">Loáº¡i Ä‘á»‘i tÃ¡c</div>
                    <select className="gva-select" value={newPartner.partner_type} onChange={(e) => setNewPartner((p) => ({ ...p, partner_type: e.target.value }))}>
                      <option value="driver">Driver / Vehicle</option>
                      <option value="hotel">Hotel / Homestay</option>
                      <option value="restaurant">Restaurant / Cafe</option>
                      <option value="spa">Massage / Spa</option>
                      <option value="creator">Creator / Website</option>
                      <option value="agent">Travel Agent</option>
                      <option value="international">International Partner</option>
                      <option value="referral">Referral / Online</option>
                      <option value="desk">Tour Desk</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                  <label>
                    <div className="gva-mini">Thá»‹ trÆ°á»ng</div>
                    <input className="gva-input" value={newPartner.market} onChange={(e) => setNewPartner((p) => ({ ...p, market: e.target.value }))} />
                  </label>
                  <label>
                    <div className="gva-mini">Landing page</div>
                    <input className="gva-input" value={newPartner.landing} onChange={(e) => setNewPartner((p) => ({ ...p, landing: e.target.value }))} />
                  </label>
                  <label>
                    <div className="gva-mini">Æ¯u Ä‘Ã£i khÃ¡ch (%)</div>
                    <input className="gva-input" type="number" min="0" max="100" step="0.1" value={newPartner.discount} onChange={(e) => setNewPartner((p) => ({ ...p, discount: Number(e.target.value || 0) }))} />
                  </label>
                  <label>
                    <div className="gva-mini">NgÃ y báº¯t Ä‘áº§u</div>
                    <input className="gva-input" type="date" value={newPartner.start_date} onChange={(e) => setNewPartner((p) => ({ ...p, start_date: e.target.value }))} />
                  </label>
                </div>

                <button className="gva-btn" type="submit" disabled={partnerSaving}>
                  {partnerSaving ? "Äang táº¡oâ€¦" : "Táº¡o Partner vÃ o Partner Master"}
                </button>
              </form>
            )}
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
        
          <PhuQuocPartnerPosterInline
            partnerCode={partnerCode}
            language={partnerLang}
            partnerLink={partnerLink}
          />
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
