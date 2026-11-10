"use client";
// GVS-LANGUAGE-MATRIX-V3
// GVS-BOOKING-DEPOSIT-SHARE-V1
// GVS-BOOKING-PAYMENT-HOTEL-DELETE-V3
// GVS-POST-SAVE-BILINGUAL-SHARE-V4
// GVS-OPERATIONS-FLOW-RBAC-V6
// GVS-BOOKING-PAYMENT-V4-UI

import { useEffect, useMemo, useState, type FormEvent } from "react";
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
  staff_id: string | null;
  tour_date: string | null;
  adults: number;
  children: number;
  pax: number | null;
  gross_revenue_vnd: number;
  net_revenue_vnd: number | null;
  deposit_required_vnd: number;
  status: string;
  payment_status: string;
  pickup_time: string | null;
  start_time: string | null;
  end_time: string | null;
  hotel: string | null;
  hotel_address: string | null;
  room: string | null;
  notes: string | null;
  guide_language: string | null;
  requires_guide: boolean | null;
  requires_transport: boolean | null;
  booking_mode: "catalog" | "custom";
  custom_tour_name: string | null;
  custom_destination: string | null;
  custom_itinerary: string | null;
  internal_itinerary_vi: string | null;
  created_at: string;
};
type Contact = { id: string; full_name: string | null; whatsapp: string | null; country: string | null; preferred_language: string | null };
type Assignment = { id: string; booking_id: string; guide_id: string; status: string; agreed_fee_vnd: number; notes: string | null };
type BookingCost = { id: string; booking_id: string; cost_type: string; description: string | null; amount_vnd: number };
type BookingFinancial = { booking_id: string; amount_received_vnd: number };
type TransportSupplier = { id: string; name: string; contact_name: string | null; phone: string | null; whatsapp: string | null; service_area: string | null; notes: string | null; active: boolean; payment_terms_days: number };
type TransportBooking = { id: string; booking_id: string; supplier_id: string; description: string | null; amount_vnd: number; status: string; notes: string | null };
type Modal = null | "guide" | "availability" | "booking" | "cost" | "quick" | "requirements" | "transport" | "transport_booking" | "transport_edit" | "replace_guide" | "internal_itinerary";

const LANGUAGES = [
  ["en", "🇬🇧 English"],
  ["ru", "🇷🇺 Russian"],
  ["ko", "🇰🇷 Korean"],
  ["it", "🇮🇹 Italian"],
  ["zh", "🇨🇳 Chinese / 中文"],
  ["tr", "🇹🇷 Turkish"],
  ["he", "🇮🇱 Hebrew"],
  ["ar", "🇸🇦 Arabic"],
  ["vi", "🇻🇳 Vietnamese"],
  ["de", "🇩🇪 German"],
  ["fr", "🇫🇷 French"],
  ["pt", "🇵🇹 Portuguese"],
  ["ja", "🇯🇵 Japanese"],
  ["es", "🇪🇸 Spanish"],
] as const;

// Guide records were imported from different sources with inconsistent spelling.
// Normalize for searching/filtering without changing any saved profile data.
function guideKey(value: string) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}
const GUIDE_AREAS: Record<string, string> = {
  "phu quoc": "Phú Quốc", phuquoc: "Phú Quốc", pq: "Phú Quốc", "dao phu quoc": "Phú Quốc",
  "da nang": "Đà Nẵng", danang: "Đà Nẵng", dn: "Đà Nẵng",
  "hoi an": "Hội An", hoian: "Hội An", hue: "Huế",
  "ha noi": "Hà Nội", hanoi: "Hà Nội", hn: "Hà Nội",
  "ho tram": "Hồ Tràm", hotram: "Hồ Tràm",
  "ho chi minh": "TP. Hồ Chí Minh", hcm: "TP. Hồ Chí Minh", "tp hcm": "TP. Hồ Chí Minh", saigon: "TP. Hồ Chí Minh", "sai gon": "TP. Hồ Chí Minh",
  "nha trang": "Nha Trang", "da lat": "Đà Lạt", dalat: "Đà Lạt", "ha long": "Hạ Long", "quy nhon": "Quy Nhơn", "can tho": "Cần Thơ",
};
function guideArea(value: string) {
  const key = guideKey(value);
  const label = GUIDE_AREAS[key] || value.trim();
  return { key: guideKey(label), label };
}
function guideAreaLabels(guide: Guide) {
  return Array.from(new Map((guide.service_areas || [])
    .flatMap((value) => String(value || "").split(/[,;|/]+/))
    .map(guideArea).filter((item) => item.key).map((item) => [item.key, item.label] as const)).values());
}
function guideAreas(guide: Guide) {
  return guideAreaLabels(guide).map(guideKey);
}
function transportAreaLabels(serviceArea: string | null) {
  const raw = String(serviceArea || "").trim();
  const normalized = guideKey(raw);
  if (!normalized) return [];
  const recognized = Array.from(new Set(Object.entries(GUIDE_AREAS)
    .filter(([alias]) => (` ${normalized} `).includes(` ${alias} `))
    .map(([, label]) => label)));
  if (recognized.length) return recognized;
  return Array.from(new Set(raw.split(/[,;|/&+]+/).map((area) => area.trim()).filter(Boolean)));
}
const GUIDE_LANGUAGE_ALIASES: Record<string, string> = {
  en: "en", eng: "en", english: "en", anh: "en", "tieng anh": "en",
  ru: "ru", rus: "ru", russian: "ru", nga: "ru", "tieng nga": "ru",
  zh: "zh", cn: "zh", chinese: "zh", mandarin: "zh", trung: "zh", "tieng trung": "zh", "中文": "zh",
  it: "it", italian: "it", italy: "it", italia: "it", "tieng y": "it",
  de: "de", german: "de", germany: "de", duc: "de", "tieng duc": "de",
  fr: "fr", french: "fr", france: "fr", phap: "fr", "tieng phap": "fr",
  pt: "pt", portuguese: "pt", portugal: "pt", "bo dao nha": "pt",
  vi: "vi", vn: "vi", vietnam: "vi", vietnamese: "vi", "viet nam": "vi",
  ko: "ko", korean: "ko", korea: "ko", "han quoc": "ko", "tieng han": "ko",
  he: "he", hebrew: "he", "do thai": "he",
  ar: "ar", arabic: "ar", tr: "tr", turkish: "tr",
  ja: "ja", jp: "ja", japanese: "ja", nhat: "ja",
  es: "es", spanish: "es", "tay ban nha": "es",
};
function guideLanguageCodes(guide: Guide) {
  return Array.from(new Set((guide.languages || [])
    .flatMap((value) => String(value || "").split(/[,;|/]+/))
    .map((value) => guideKey(value)).filter(Boolean)
    .map((value) => GUIDE_LANGUAGE_ALIASES[value] || value)));
}

function bookingGuideAreaKey(booking: Booking, tour?: Tour) {
  const detect = (value: string) => {
    const text = ` ${guideKey(value)} `;
    const hints: [string, string[]][] = [
      ["phu quoc", ["phu quoc", "ganh dau", "cua can", "rach vem", "grand world", "hon thom", "sao beach", "sunset town"]],
      ["da nang", ["da nang", "son tra", "ba na hills"]],
      ["hoi an", ["hoi an", "cam thanh", "cua dai"]],
      ["hue", ["thua thien hue", "hue"]],
      ["ho tram", ["ho tram", "phuoc buu"]],
      ["ha noi", ["ha noi", "hanoi"]],
    ];
    return hints.find(([, aliases]) => aliases.some((alias) => text.includes(` ${alias} `)))?.[0] || "";
  };
  return detect([booking.custom_destination, tour?.destination].filter(Boolean).join(" ")) ||
    detect([booking.custom_tour_name, booking.internal_itinerary_vi].filter(Boolean).join(" "));
}

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
function moneyVnd(v: any) {
  return new Intl.NumberFormat("vi-VN").format(Number(v || 0)) + " VND";
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
function monthValue(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}
function shiftMonth(value: string, delta: number) {
  const [year, month] = value.split("-").map(Number);
  const d = new Date(year, month - 1 + delta, 1);
  return monthValue(d);
}
function monthTitle(value: string) {
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("vi-VN", { month: "long", year: "numeric" }).format(new Date(year, month - 1, 1));
}
function monthCalendarDates(value: string) {
  const [year, month] = value.split("-").map(Number);
  const first = new Date(year, month - 1, 1, 12);
  const mondayOffset = (first.getDay() + 6) % 7;
  const start = new Date(first);
  start.setDate(first.getDate() - mondayOffset);
  return Array.from({ length: 42 }, (_, index) => {
    const d = new Date(start);
    d.setDate(start.getDate() + index);
    return localISO(d);
  });
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
function customerDate(value: string | null, locale: string) {
  if (!value) return "—";
  return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${value}T12:00:00`));
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
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [selectedTransportId, setSelectedTransportId] = useState<string | null>(null);
  const [duplicateBookingId, setDuplicateBookingId] = useState<string | null>(null);
  const [shareBookingId, setShareBookingId] = useState<string | null>(null);
  const [view, setView] = useState<"calendar" | "dispatch" | "guides" | "bookings" | "transport">("calendar");
  const [focusDate, setFocusDate] = useState(localISO());
  const [calendarMonth, setCalendarMonth] = useState(monthValue());
  const [mobileCalendarFilter, setMobileCalendarFilter] = useState<"today" | "tomorrow" | "7days" | "month">("month");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [guideAreaFilter, setGuideAreaFilter] = useState("all");
  const [guideLanguageFilter, setGuideLanguageFilter] = useState("all");
  const [guideSearch, setGuideSearch] = useState("");
  const [guideActiveFilter, setGuideActiveFilter] = useState("all");
  const [transportAreaFilter, setTransportAreaFilter] = useState("all");
  const [transportActiveFilter, setTransportActiveFilter] = useState("all");
  const [transportSearch, setTransportSearch] = useState("");

  const [tours, setTours] = useState<Tour[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [costs, setCosts] = useState<BookingCost[]>([]);
  const [financials, setFinancials] = useState<BookingFinancial[]>([]);
  const [transportSuppliers, setTransportSuppliers] = useState<TransportSupplier[]>([]);
  const [transportBookings, setTransportBookings] = useState<TransportBooking[]>([]);

  const tourMap = useMemo(() => Object.fromEntries(tours.map((x) => [x.id, x])), [tours]);
  const guideMap = useMemo(() => Object.fromEntries(guides.map((x) => [x.id, x])), [guides]);
  const contactMap = useMemo(() => Object.fromEntries(contacts.map((x) => [x.id, x])), [contacts]);
  const financialMap = useMemo(() => Object.fromEntries(financials.map((x) => [x.booking_id, x])), [financials]);
  const isAdmin = !!staff && (staff.role === "owner" || staff.role === "admin");
  const isDesk = !!staff && staff.role === "desk";
  const isSales = !!staff && staff.role === "sales";
  const canOperate = isAdmin || isDesk;
  const isOpsStaff = !!staff && ["owner", "admin", "sales", "desk"].includes(staff.role);

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
    if (staff && ["owner", "admin", "sales", "desk"].includes(staff.role)) loadAll();
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
    const from = addDays(today, -120);
    const to = addDays(today, 400);
    try {
      const results = await Promise.all([
        supabase.from("tours").select("id,name,destination,adult_price_vnd,active").eq("active", true).order("name"),
        supabase.from("guides").select("*").order("active", { ascending: false }).order("full_name"),
        supabase.from("guide_availability").select("*").gte("work_date", from).lte("work_date", to).order("work_date"),
        supabase.from("bookings")
          .select("id,booking_code,contact_id,tour_id,staff_id,tour_date,adults,children,pax,gross_revenue_vnd,net_revenue_vnd,deposit_required_vnd,status,payment_status,pickup_time,start_time,end_time,hotel,hotel_address,room,notes,guide_language,requires_guide,requires_transport,booking_mode,custom_tour_name,custom_destination,custom_itinerary,internal_itinerary_vi,created_at")
          .gte("tour_date", from).lte("tour_date", to).order("tour_date", { ascending: true }).order("start_time", { ascending: true }),
        supabase.from("contacts").select("id,full_name,whatsapp,country,preferred_language").order("created_at", { ascending: false }).limit(1000),
        supabase.from("booking_guides").select("id,booking_id,guide_id,status,agreed_fee_vnd,notes").limit(2000),
        supabase.from("booking_costs").select("id,booking_id,cost_type,description,amount_vnd").limit(3000),
        supabase.from("booking_financials").select("booking_id,amount_received_vnd").limit(3000),
        supabase.from("suppliers").select("id,name,contact_name,phone,whatsapp,service_area,notes,active,payment_terms_days").eq("supplier_type", "transport").order("name"),
        supabase.from("booking_supplier_payables").select("id,booking_id,supplier_id,description,amount_vnd,status,notes").eq("source", "transport_operations").limit(2000),
      ]);
      for (const r of results) if (r.error) throw r.error;
      setTours((results[0].data || []) as Tour[]);
      setGuides((results[1].data || []) as Guide[]);
      setAvailability((results[2].data || []) as Availability[]);
      setBookings((results[3].data || []) as Booking[]);
      setContacts((results[4].data || []) as Contact[]);
      setAssignments((results[5].data || []) as Assignment[]);
      setCosts((results[6].data || []) as BookingCost[]);
      setFinancials((results[7].data || []) as BookingFinancial[]);
      setTransportSuppliers((results[8].data || []) as TransportSupplier[]);
      setTransportBookings((results[9].data || []) as TransportBooking[]);
    } catch (e: any) {
      setError(e.message || "Không tải được Operations Center.");
    }
  }

  function bookingName(b: Booking) {
    return b.booking_mode === "custom" ? b.custom_tour_name || "Custom Tour" : tourMap[b.tour_id || ""]?.name || "Tour chưa xác định";
  }
  function bookingRevenue(b: Booking) {
    return Number(b.net_revenue_vnd ?? b.gross_revenue_vnd ?? 0);
  }
  function bookingDeposit(b: Booking) {
    return Math.max(0, Number(b.deposit_required_vnd || 0));
  }
  function bookingReceived(b: Booking) {
    return Math.max(0, Number(financialMap[b.id]?.amount_received_vnd || 0));
  }
  function bookingBalance(b: Booking) {
    return Math.max(0, bookingRevenue(b) - bookingReceived(b));
  }
  async function copyText(text: string, label: string) {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
      else {
        const el = document.createElement("textarea");
        el.value = text; el.style.position = "fixed"; el.style.opacity = "0";
        document.body.appendChild(el); el.focus(); el.select(); document.execCommand("copy"); el.remove();
      }
      setMessage(`Đã copy ${label}.`);
    } catch {
      setError("Không copy được tự động. Hãy thử lại trên trình duyệt.");
    }
  }
  function customerCopy(b: Booking, language: "en" | "ru") {
    const contact = contactMap[b.contact_id || ""];
    const pickupTime = timeShort(b.pickup_time || b.start_time);
    const itinerary = b.booking_mode === "custom" && b.custom_itinerary ? b.custom_itinerary.trim() : "";
    const notes = b.notes?.trim() || "";
    if (language === "ru") return [
      "✅ GOVIETSTAY — ПОДТВЕРЖДЕНИЕ БРОНИРОВАНИЯ", "",
      `Номер бронирования: ${b.booking_code || "—"}`,
      `Гость: ${contact?.full_name || "—"}`,
      `Тур: ${bookingName(b)}`,
      `Дата: ${customerDate(b.tour_date, "ru-RU")}`,
      `Взрослые: ${b.adults} · Дети: ${b.children}`,
      `Место встречи: ${b.hotel || "—"}`,
      b.hotel_address ? `Адрес отеля: ${b.hotel_address}` : "",
      `Время встречи: ${pickupTime}`,
      `Язык гида: ${langLabel(b.guide_language)}`,
      itinerary ? `Маршрут: ${itinerary}` : "",
      notes ? `Примечание: ${notes}` : "", "",
      `Стоимость: ${moneyVnd(bookingRevenue(b))}`,
      `Депозит требуется: ${moneyVnd(bookingDeposit(b))}`,
      `Получено: ${moneyVnd(bookingReceived(b))}`,
      `Остаток: ${moneyVnd(bookingBalance(b))}`, "",
      "Спасибо, что выбрали GoVietStay."
    ].filter(Boolean).join("\n");
    return [
      "✅ GOVIETSTAY — BOOKING CONFIRMATION", "",
      `Booking ID: ${b.booking_code || "—"}`,
      `Guest: ${contact?.full_name || "—"}`,
      `Tour: ${bookingName(b)}`,
      `Date: ${customerDate(b.tour_date, "en-GB")}`,
      `Adults: ${b.adults} · Children: ${b.children}`,
      `Pickup: ${b.hotel || "—"}`,
      b.hotel_address ? `Pickup address: ${b.hotel_address}` : "",
      `Pickup time: ${pickupTime}`,
      `Guide language: ${langLabel(b.guide_language)}`,
      itinerary ? `Itinerary: ${itinerary}` : "",
      notes ? `Note: ${notes}` : "", "",
      `Total: ${moneyVnd(bookingRevenue(b))}`,
      `Deposit required: ${moneyVnd(bookingDeposit(b))}`,
      `Received: ${moneyVnd(bookingReceived(b))}`,
      `Balance: ${moneyVnd(bookingBalance(b))}`, "",
      "Thank you for choosing GoVietStay."
    ].filter(Boolean).join("\n");
  }
  function driverCopy(b: Booking, language: "en" | "vi") {
    const contact = contactMap[b.contact_id || ""];
    const pickupTime = timeShort(b.pickup_time || b.start_time);
    const route = b.booking_mode === "custom" && b.custom_itinerary ? b.custom_itinerary.trim() : bookingName(b);
    const notes = b.notes?.trim() || "";
    if (language === "vi") return [
      "🚗 THÔNG TIN TÀI XẾ — GOVIETSTAY", "",
      `Mã booking: ${b.booking_code || "—"}`,
      `Ngày: ${customerDate(b.tour_date, "vi-VN")}`,
      `Khách: ${contact?.full_name || "—"}`,
      `Số khách: ${b.pax ?? b.adults + b.children} (${b.adults} người lớn + ${b.children} trẻ em)`,
      `Điện thoại: ${contact?.whatsapp || "—"}`,
      `Điểm đón: ${b.hotel || "—"}`,
      b.hotel_address ? `Địa chỉ: ${b.hotel_address}` : "",
      `Giờ đón: ${pickupTime}`,
      `Tour: ${bookingName(b)}`,
      b.end_time ? `Giờ kết thúc dự kiến: ${timeShort(b.end_time)}` : "",
      `Lộ trình: ${route}`,
      notes ? `Ghi chú: ${notes}` : ""
    ].filter(Boolean).join("\n");
    return [
      "🚗 DRIVER INFO — GOVIETSTAY", "",
      `Booking ID: ${b.booking_code || "—"}`,
      `Date: ${customerDate(b.tour_date, "en-GB")}`,
      `Guest: ${contact?.full_name || "—"}`,
      `Guests: ${b.pax ?? b.adults + b.children} (${b.adults} adults + ${b.children} children)`,
      `Phone / WhatsApp: ${contact?.whatsapp || "—"}`,
      `Pickup: ${b.hotel || "—"}`,
      b.hotel_address ? `Pickup address: ${b.hotel_address}` : "",
      `Pickup time: ${pickupTime}`,
      `Tour: ${bookingName(b)}`,
      b.end_time ? `Expected finish: ${timeShort(b.end_time)}` : "",
      `Route: ${route}`,
      notes ? `Note: ${notes}` : ""
    ].filter(Boolean).join("\n");
  }
  function customerBilingualCopy(b: Booking) {
    return [
      customerCopy(b, "en"),
      "------------------------------",
      customerCopy(b, "ru"),
      "",
      "🌐 GoVietStay — Tours & Vietnam Travel Information",
      "https://www.govietstay.com",
      "🇷🇺 Русская версия: https://www.govietstay.com/ru"
    ].join("\n\n");
  }
  function driverBilingualCopy(b: Booking) {
    return `${driverCopy(b, "en")}\n\n------------------------------\n\n${driverCopy(b, "vi")}`;
  }
  function shareButtons(b: Booking) {
    const style = { padding: "6px 10px", fontSize: 12, minHeight: 32 } as const;
    return <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginTop: 10 }}>
      <button type="button" className="gva-btn secondary" style={style} onClick={() => copyText(customerBilingualCopy(b), "Booking khách EN + RU")}>Khách EN + RU</button>
      <button type="button" className="gva-btn secondary" style={style} onClick={() => copyText(driverBilingualCopy(b), "Driver EN + VI")}>Driver EN + VI</button>
      {isAdmin && <button type="button" className="gva-btn secondary" style={style} onClick={() => window.open(`/admin/payments?q=${encodeURIComponent(b.booking_code || "")}`, "_blank", "noopener,noreferrer")}>💳 Payment</button>}
    </div>;
  }
  function activeAssignments(bookingId: string) {
    return assignments.filter((x) => x.booking_id === bookingId && x.status !== "cancelled");
  }
  function requiresGuide(b: Booking) { return b.requires_guide ?? Boolean(b.guide_language?.trim()); }
  function requiresTransport(b: Booking) { return b.requires_transport ?? false; }
  function hasConfirmedGuide(bookingId: string) {
    return activeAssignments(bookingId).some((a) => a.status === "confirmed" || a.status === "completed");
  }
  function hasAssignedTransport(bookingId: string) {
    return transportBookings.some((x) => x.booking_id === bookingId && x.status !== "void");
  }
  function missingDispatch(b: Booking) {
    return { guide: requiresGuide(b) && !hasConfirmedGuide(b.id), transport: requiresTransport(b) && !hasAssignedTransport(b.id) };
  }
  function flowStatusLabel(status: string) {
    return status === "pending" ? "DRAFT" : status === "confirmed" ? "CONFIRMED" : status === "ready" ? "READY" : status === "completed" ? "COMPLETED" : status === "closed" ? "CLOSED" : status.toUpperCase();
  }
  function nextAction(b: Booking) {
    const missingHotel = !String(b.hotel || "").trim();
    const missingPickup = !(b.pickup_time || b.start_time);
    const missingGuide = missingDispatch(b).guide;
    const missingTransport = missingDispatch(b).transport;
    if (b.status === "pending") {
      if (missingHotel || missingPickup) return { label: "Hoàn thiện thông tin booking", kind: "edit" };
      return { label: "Xác nhận booking", kind: "confirmed" };
    }
    if (missingHotel) return { label: "Bổ sung khách sạn", kind: "edit" };
    if (missingPickup) return { label: "Bổ sung giờ đón", kind: "edit" };
    if (missingGuide) return { label: canOperate ? "Gán và xác nhận hướng dẫn viên" : "Chờ Operations gán HDV", kind: canOperate ? "guide" : "wait" };
    if (missingTransport) return { label: isAdmin ? "Gán nhà xe & tài xế" : "Chờ Operations gán xe", kind: isAdmin ? "transport" : "wait" };
    if (b.status === "confirmed") return { label: canOperate ? "Đánh dấu READY" : "Chờ Operations READY", kind: canOperate ? "ready" : "wait" };
    if (b.status === "ready") return { label: canOperate ? "Đánh dấu COMPLETED" : "Tour đã READY", kind: canOperate ? "completed" : "wait" };
    if (b.status === "completed") return { label: isAdmin ? "Đóng booking" : "Chờ Finance close", kind: isAdmin ? "closed" : "wait" };
    if (b.status === "closed") return { label: "Hoàn tất", kind: "done" };
    return { label: flowStatusLabel(b.status), kind: "wait" };
  }
  function renderNextAction(b: Booking) {
    const next = nextAction(b);
    const actionable = next.kind !== "wait" && next.kind !== "done" && next.kind !== "guide";
    return <div style={{ marginTop: 10, padding: "9px 10px", borderRadius: 10, background: next.kind === "done" ? "#ecfdf3" : "#fff8e6", display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
      <span style={{ fontSize: 12 }}><b>Next Action:</b> {next.label}</span>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {actionable && <button type="button" className="gva-btn secondary" style={{ minHeight: 30, padding: "5px 9px", fontSize: 12 }} disabled={saving} onClick={() => next.kind === "edit" ? openQuick(b) : next.kind === "transport" ? openTransportBooking(b.id) : advanceBooking(b, next.kind)}>Xử lý</button>}
        {(isAdmin || isDesk || (isSales && b.staff_id === staff?.id)) && <>
          <button type="button" className="gva-btn secondary" style={{ minHeight: 30, padding: "5px 9px", fontSize: 12 }} disabled={saving} onClick={() => openQuick(b)}>Sửa nhanh</button>
          <button type="button" className="gva-btn secondary" style={{ minHeight: 30, padding: "5px 9px", fontSize: 12 }} disabled={saving} onClick={() => openDuplicateBooking(b)}>📋 Nhân bản</button>
        </>}
      </div>
    </div>;
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
  function eligibleGuidesForBooking(b: Booking, excludedGuideId?: string) {
    const date = b.tour_date || focusDate;
    const area = bookingGuideAreaKey(b, tourMap[b.tour_id || ""]);
    return guides.filter((g) =>
      g.active &&
      g.id !== excludedGuideId &&
      (!b.guide_language || guideLanguageCodes(g).includes(b.guide_language)) &&
      !["unavailable", "booked", "pending"].includes(guideStatus(g.id, date))
    ).sort((a, b) =>
      Number(!guideAreas(a).includes(area)) - Number(!guideAreas(b).includes(area))
    );
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
    () => guides.filter((g) => g.active && (languageFilter === "all" || guideLanguageCodes(g).includes(languageFilter))),
    [guides, languageFilter]
  );
  const guideAreaOptions = useMemo(() => {
    const areas = new Map<string, { label: string; count: number }>();
    let missing = 0;
    guides.forEach((guide) => {
      const keys = guideAreas(guide);
      if (!keys.length) missing++;
      guideAreaLabels(guide).forEach((label) => {
        const key = guideKey(label);
        areas.set(key, { label, count: (areas.get(key)?.count || 0) + 1 });
      });
    });
    const preferred = ["Phú Quốc", "Đà Nẵng", "Hội An", "Huế", "Hà Nội", "Hồ Tràm"].map(guideKey);
    const options = [...areas].sort(([a, av], [b, bv]) => {
      const ai = preferred.indexOf(a), bi = preferred.indexOf(b);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi) || av.label.localeCompare(bv.label, "vi");
    }).map(([key, value]) => ({ key, ...value }));
    if (missing) options.push({ key: "__missing__", label: "Chưa có khu vực", count: missing });
    return options;
  }, [guides]);
  const guideLanguageOptions = useMemo(() => {
    const languageCodes = new Set(guides.flatMap(guideLanguageCodes));
    return [...languageCodes].sort((a, b) => langLabel(a).localeCompare(langLabel(b), "vi"));
  }, [guides]);
  const filteredGuides = useMemo(() => {
    const query = guideKey(guideSearch);
    const phoneQuery = guideSearch.replace(/\D/g, "");
    return guides.filter((guide) => {
      const areas = guideAreas(guide);
      const languages = guideLanguageCodes(guide);
      if (guideActiveFilter === "active" && !guide.active) return false;
      if (guideActiveFilter === "inactive" && guide.active) return false;
      if (guideAreaFilter !== "all" && (guideAreaFilter === "__missing__" ? areas.length > 0 : !areas.includes(guideAreaFilter))) return false;
      if (guideLanguageFilter !== "all" && !languages.includes(guideLanguageFilter)) return false;
      if (!query) return true;
      const searchable = guideKey([guide.full_name, guide.phone, guide.whatsapp, guide.zalo,
        ...(guide.service_areas || []), ...languages.map(langLabel), ...(guide.languages || [])].join(" "));
      const contacts = [guide.phone, guide.whatsapp, guide.zalo].join(" ").replace(/\D/g, "");
      return searchable.includes(query) || (!!phoneQuery && contacts.includes(phoneQuery));
    });
  }, [guides, guideAreaFilter, guideLanguageFilter, guideActiveFilter, guideSearch]);
  const transportAreaOptions = useMemo(() => {
    const counts = new Map<string, { label: string; count: number }>();
    let missing = 0;
    transportSuppliers.forEach((supplier) => {
      const labels = transportAreaLabels(supplier.service_area);
      if (!labels.length) missing++;
      labels.forEach((label) => {
        const key = guideKey(label);
        counts.set(key, { label, count: (counts.get(key)?.count || 0) + 1 });
      });
    });
    const preferred = ["Phú Quốc", "Đà Nẵng", "Hội An", "Huế", "Hà Nội", "Hồ Tràm"].map(guideKey);
    const options = [...counts].sort(([a, av], [b, bv]) => {
      const ai = preferred.indexOf(a), bi = preferred.indexOf(b);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi) || av.label.localeCompare(bv.label, "vi");
    }).map(([key, value]) => ({ key, ...value }));
    if (missing) options.push({ key: "__missing__", label: "Chưa có khu vực", count: missing });
    return options;
  }, [transportSuppliers]);
  const filteredTransportSuppliers = useMemo(() => {
    const query = guideKey(transportSearch);
    const phoneQuery = transportSearch.replace(/\D/g, "");
    return transportSuppliers.filter((supplier) => {
      const areas = transportAreaLabels(supplier.service_area).map(guideKey);
      if (transportAreaFilter !== "all" && (transportAreaFilter === "__missing__" ? areas.length > 0 : !areas.includes(transportAreaFilter))) return false;
      if (transportActiveFilter === "active" && !supplier.active) return false;
      if (transportActiveFilter === "inactive" && supplier.active) return false;
      if (!query) return true;
      const searchable = guideKey([supplier.name, supplier.contact_name, supplier.phone, supplier.whatsapp,
        supplier.service_area, supplier.notes].join(" "));
      const phones = [supplier.phone, supplier.whatsapp].join(" ").replace(/\D/g, "");
      return searchable.includes(query) || (!!phoneQuery && phones.includes(phoneQuery));
    });
  }, [transportSuppliers, transportAreaFilter, transportActiveFilter, transportSearch]);
  const sevenDayBookings = useMemo(() => {
    const start = localISO();
    const end = addDays(start, 6);
    return bookings.filter((b) => b.tour_date && b.tour_date >= start && b.tour_date <= end && b.status !== "cancelled");
  }, [bookings]);
  const needGuide = sevenDayBookings.filter((b) => missingDispatch(b).guide).length;
  const sevenDayPax = sevenDayBookings.reduce((sum, b) => sum + Number(b.pax ?? b.adults + b.children), 0);
  const customCount = sevenDayBookings.filter((b) => b.booking_mode === "custom").length;
  const calendarDates = useMemo(() => monthCalendarDates(calendarMonth), [calendarMonth]);
  const monthBookings = useMemo(() => bookings.filter((b) => b.tour_date?.startsWith(calendarMonth)), [bookings, calendarMonth]);
  const activeMonthBookings = useMemo(() => monthBookings.filter((b) => b.status !== "cancelled"), [monthBookings]);
  const monthPax = activeMonthBookings.reduce((sum, b) => sum + Number(b.pax ?? b.adults + b.children), 0);
  const monthRevenue = activeMonthBookings.reduce((sum, b) => sum + Number(b.net_revenue_vnd ?? b.gross_revenue_vnd ?? 0), 0);
  const monthNeedGuide = activeMonthBookings.filter((b) => missingDispatch(b).guide).length;
  const monthByDate = useMemo(() => {
    const result: Record<string, Booking[]> = {};
    for (const b of bookings) {
      if (!b.tour_date) continue;
      (result[b.tour_date] ||= []).push(b);
    }
    return result;
  }, [bookings]);
  const mobileCalendarDates = useMemo(() => {
    const today = localISO();
    const tomorrow = addDays(today, 1);
    const end7 = addDays(today, 6);
    const dates = Array.from(new Set(bookings
      .filter((b) => b.tour_date && b.status !== "cancelled")
      .map((b) => b.tour_date as string)))
      .sort();
    if (mobileCalendarFilter === "today") return dates.filter((d) => d === today);
    if (mobileCalendarFilter === "tomorrow") return dates.filter((d) => d === tomorrow);
    if (mobileCalendarFilter === "7days") return dates.filter((d) => d >= today && d <= end7);
    return dates.filter((d) => d.startsWith(calendarMonth));
  }, [bookings, mobileCalendarFilter, calendarMonth]);

  function calendarBookingState(b: Booking) {
    if (b.status === "cancelled") return "cancelled";
    if (missingDispatch(b).guide || missingDispatch(b).transport) return "need-guide";
    if (b.status === "pending") return "pending";
    if (b.status === "completed") return "completed";
    return "confirmed";
  }

  async function createTransportSupplier(e: any) {
    e.preventDefault(); setSaving(true); setError("");
    const v = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    try {
      const { error: insertError } = await supabase.from("suppliers").insert({
        name: v.name.trim(), contact_name: v.contact_name.trim() || null,
        phone: v.phone.trim() || null, whatsapp: v.whatsapp.trim() || null,
        service_area: v.service_area.trim() || null, supplier_type: "transport",
        notes: [`Loại xe: ${v.vehicle_types || "Chưa cập nhật"}`, `Giá tham khảo: ${v.reference_rates || "Chưa cập nhật"}`, v.notes].filter(Boolean).join("\n"),
        payment_terms_days: Number(v.payment_terms_days || 0), active: true,
      });
      if (insertError) throw insertError;
      setModal(null); setMessage("Đã lưu nhà xe vào danh bạ đối tác."); await loadAll();
    } catch (err: any) { setError(err.message || "Không lưu được nhà xe."); }
    finally { setSaving(false); }
  }

  async function assignTransport(e: any) {
    e.preventDefault(); setSaving(true); setError("");
    const v = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    try {
      if (!v.booking_id || !v.supplier_id) throw new Error("Cần chọn booking và nhà xe.");
      const amount = Number(v.amount_vnd);
      if (!Number.isSafeInteger(amount) || amount < 0) throw new Error("Chi phí nhà xe không hợp lệ.");
      // Read the live database before inserting; multiple staff may work on the same booking.
      const { data: existing, error: existingError } = await supabase.from("booking_supplier_payables")
        .select("id").eq("booking_id", v.booking_id).eq("supplier_id", v.supplier_id)
        .eq("source", "transport_operations").neq("status", "void");
      if (existingError) throw existingError;
      if (existing?.length && v.allow_same_supplier !== "on") {
        throw new Error("Booking đã có nhà xe này. Hãy sửa phân xe hiện tại, hoặc tích xác nhận nếu thực sự cần thêm một xe cùng nhà cung cấp.");
      }
      const { data: saved, error: insertError } = await supabase.from("booking_supplier_payables").insert({
        booking_id: v.booking_id, supplier_id: v.supplier_id,
        description: `Vận chuyển · ${v.vehicle_type || "Xe theo yêu cầu"}`,
        amount_vnd: amount, status: "open",
        notes: [v.pickup_details, v.notes].filter(Boolean).join(" · ") || null,
        source: "transport_operations", auto_managed: false,
      }).select("id").single();
      if (insertError || !saved) throw insertError || new Error("Không xác nhận được bản ghi phân xe.");
      setModal(null); setSelectedBooking(null); setMessage("Đã lưu phân xe và đồng bộ công nợ nhà cung cấp."); await loadAll();
    } catch (err: any) { setError(err.message || "Không gán được nhà xe."); }
    finally { setSaving(false); }
  }

  function openTransportBooking(bookingId: string) {
    setError(""); setSelectedBooking(bookingId); setModal("transport_booking");
  }

  function openTransportEdit(id: string) {
    setError(""); setSelectedTransportId(id); setModal("transport_edit");
  }

  async function saveTransportEdit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedTransportId) return;
    setSaving(true); setError("");
    const v = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    try {
      const amount = Number(v.amount_vnd);
      if (!Number.isSafeInteger(amount) || amount < 0) throw new Error("Chi phí nhà xe không hợp lệ.");
      const { data, error: updateError } = await supabase.from("booking_supplier_payables")
        .update({ description: `Vận chuyển · ${String(v.vehicle_type || "").trim() || "Xe theo yêu cầu"}`,
          amount_vnd: amount, notes: String(v.notes || "").trim() || null })
        .eq("id", selectedTransportId).eq("source", "transport_operations").eq("status", "open")
        .select("id").single();
      if (updateError || !data) throw updateError || new Error("Không cập nhật được phân xe.");
      setModal(null); setSelectedTransportId(null);
      setMessage("Đã cập nhật chi phí xe và đồng bộ công nợ; không tạo thêm dòng.");
      await loadAll();
    } catch (err: any) { setError(err.message || "Không sửa được phân xe."); }
    finally { setSaving(false); }
  }

  async function voidTransport(id: string) {
    const item = transportBookings.find((x) => x.id === id && x.status === "open");
    if (!item || !window.confirm(`Hủy phân xe ${money(item.amount_vnd)}? Công nợ và tổng chi sẽ được trừ lại; lịch sử được giữ.`)) return;
    setSaving(true); setError("");
    try {
      const { data, error: updateError } = await supabase.from("booking_supplier_payables")
        .update({ status: "void" }).eq("id", id).eq("source", "transport_operations")
        .eq("status", "open").select("id").single();
      if (updateError || !data) throw updateError || new Error("Không hủy được phân xe.");
      setMessage("Đã hủy hiệu lực phân xe, công nợ và chi phí đã đồng bộ.");
      await loadAll();
    } catch (err: any) { setError(err.message || "Không hủy được phân xe."); }
    finally { setSaving(false); }
  }

  async function saveRequirements(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedBooking) return;
    setSaving(true); setError("");
    const form = new FormData(e.currentTarget);
    try {
      const { data, error: updateError } = await supabase.from("bookings")
        .update({ requires_guide: form.has("requires_guide"), requires_transport: form.has("requires_transport") })
        .eq("id", selectedBooking).select("id").single();
      if (updateError || !data) throw updateError || new Error("Không thể lưu yêu cầu điều phối.");
      setModal(null); setSelectedBooking(null); setMessage("Đã cập nhật yêu cầu điều phối. Giá bán, tiền cọc và lịch trình giữ nguyên.");
      await loadAll();
    } catch (err: any) { setError(err.message || "Không thể lưu yêu cầu điều phối."); }
    finally { setSaving(false); }
  }

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
      const revenue = numberOnly(v.revenue);
      const deposit = numberOnly(v.deposit);
      if (deposit > revenue) throw new Error("Deposit required / tiền cọc yêu cầu không thể lớn hơn giá bán.");
      const sourceBooking = duplicateBookingId ? bookings.find((b) => b.id === duplicateBookingId) : null;
      if (duplicateBookingId && !sourceBooking) throw new Error("Không tìm thấy booking gốc. Hãy làm mới và thử lại.");
      // A follow-up tour belongs to the existing customer, not a second contact.
      const contactId = sourceBooking?.contact_id || await createContact(v);
      const { data: createdBooking, error: insertError } = await supabase.from("bookings").insert({
        booking_code: code(),
        contact_id: contactId,
        tour_id: mode === "catalog" ? v.tour_id : null,
        staff_id: staff?.id || null,
        tour_date: v.tour_date,
        adults, children,
        gross_revenue_vnd: revenue,
        discount_vnd: 0, deposit_required_vnd: deposit,
        status: v.status || "confirmed", payment_status: "unpaid",
        pickup_time: v.pickup_time || null,
        start_time: v.start_time || null,
        end_time: v.end_time || null,
        hotel: String(v.hotel || "").trim() || null,
        hotel_address: String(v.hotel_address || "").trim() || null,
        room: String(v.room || "").trim() || null,
        notes: String(v.notes || "").trim() || null,
        source: "manual", created_via: "operations_v1",
        guide_language: v.guide_language || null,
        requires_guide: v.requires_guide === "on",
        requires_transport: v.requires_transport === "on",
        booking_mode: mode,
        custom_tour_name: mode === "custom" ? String(v.custom_tour_name || "").trim() : null,
        custom_destination: mode === "custom" ? String(v.custom_destination || "").trim() || null : null,
        custom_itinerary: mode === "custom" ? String(v.custom_itinerary || "").trim() || null : null,
        internal_itinerary_vi: String(v.internal_itinerary_vi || "").trim() || null,
      }).select("id").single();
      if (insertError) throw insertError;
      setFocusDate(v.tour_date || focusDate); setModal(null); setDuplicateBookingId(null); setView("dispatch");
      await loadAll();
      setShareBookingId(createdBooking.id);
      setMessage("Đã lưu booking thành công.");
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
      const { error: assignError } = await supabase.rpc("ops_assign_booking_guide", { p_booking_id: bookingId, p_guide_id: guideId });
      if (assignError) throw assignError;
      setMessage(`Đã gán ${guide.full_name} cho ${booking.booking_code || "booking"}.`); await loadAll();
    } catch (e: any) { setError(e.message); } finally { setSaving(false); }
  }

  function openReplaceGuide(bookingId: string, assignmentId: string) {
    setError("");
    setSelectedBooking(bookingId);
    setSelectedAssignmentId(assignmentId);
    setModal("replace_guide");
  }

  async function replaceGuide(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedAssignmentId || !selectedBooking) return;
    const newGuideId = String(new FormData(e.currentTarget).get("guide_id") || "");
    const oldAssignment = assignments.find((a) => a.id === selectedAssignmentId && a.booking_id === selectedBooking);
    const booking = bookings.find((b) => b.id === selectedBooking);
    const newGuide = guides.find((g) => g.id === newGuideId);
    if (!oldAssignment || !booking || !newGuide || oldAssignment.guide_id === newGuideId) return;
    const oldName = guideMap[oldAssignment.guide_id]?.full_name || "HDV hiện tại";
    if (!window.confirm(`Đổi HDV từ ${oldName} sang ${newGuide.full_name} cho ${booking.booking_code || "booking"}? Phân công cũ sẽ được lưu ở trạng thái huỷ.`)) return;
    setSaving(true); setError("");
    try {
      const { error: replaceError } = await supabase.rpc("ops_replace_booking_guide", {
        p_assignment_id: oldAssignment.id,
        p_new_guide_id: newGuideId,
      });
      if (replaceError) throw replaceError;
      setModal(null); setSelectedBooking(null); setSelectedAssignmentId(null);
      setMessage(`Đã đổi HDV từ ${oldName} sang ${newGuide.full_name} cho ${booking.booking_code || "booking"}.`);
      await loadAll();
    } catch (err: any) { setError(err.message || "Không đổi được HDV. Phân công cũ vẫn được giữ nguyên."); }
    finally { setSaving(false); }
  }

  async function updateAssignment(id: string, status: string) {
    setSaving(true); setError("");
    const { error: updateError } = await supabase.rpc("ops_update_booking_guide_status", { p_assignment_id: id, p_status: status });
    if (updateError) setError(updateError.message); else await loadAll();
    setSaving(false);
  }

  function openInternalItinerary(b: Booking) {
    setSelectedBooking(b.id);
    setModal("internal_itinerary");
  }

  async function saveInternalItinerary(e: any) {
    e.preventDefault();
    if (!selectedBooking || !isAdmin) return;
    setSaving(true); setError("");
    const v = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    try {
      const { data, error: updateError } = await supabase.from("bookings")
        .update({ internal_itinerary_vi: String(v.internal_itinerary_vi || "").trim() || null })
        .eq("id", selectedBooking).select("id").single();
      if (updateError || !data) throw updateError || new Error("Không thể lưu lịch trình.");
      setModal(null); setSelectedBooking(null);
      setMessage("Đã lưu lịch trình tiếng Việt nội bộ, không gửi cho khách.");
      await loadAll();
    } catch (err: any) { setError(err.message || "Không lưu được lịch trình."); }
    finally { setSaving(false); }
  }

  function openQuick(b: Booking) {
    setError(""); setSelectedBooking(b.id);
    setModal("quick");
  }

  function openCreateBooking() {
    setDuplicateBookingId(null);
    setModal("booking");
  }

  function openDuplicateBooking(b: Booking) {
    setDuplicateBookingId(b.id);
    setModal("booking");
  }

  async function saveQuick(e: any) {
    e.preventDefault();
    if (!selectedBooking) return;
    setSaving(true); setError("");
    const v = Object.fromEntries(new FormData(e.currentTarget).entries()) as any;
    try {
      const { error: updateError } = await supabase.rpc("ops_update_booking_basic", {
        p_booking_id: selectedBooking,
        p_hotel: String(v.hotel || "").trim() || null,
        p_hotel_address: String(v.hotel_address || "").trim() || null,
        p_pickup_time: v.pickup_time || null,
        p_deposit_vnd: numberOnly(v.deposit),
        p_payment_status: null,
      });
      if (updateError) throw updateError;
      setModal(null); setSelectedBooking(null); setMessage("Đã cập nhật booking."); await loadAll();
    } catch (e: any) { setError(e.message); } finally { setSaving(false); }
  }

  async function advanceBooking(b: Booking, target: string) {
    if (!["confirmed","ready","completed","closed"].includes(target)) return;
    const labels: Record<string,string> = { confirmed: "CONFIRMED", ready: "READY", completed: "COMPLETED", closed: "CLOSED" };
    if (!window.confirm(`Chuyển ${b.booking_code || "booking"} → ${labels[target]}?`)) return;
    setSaving(true); setError("");
    try {
      const { error: statusError } = await supabase.rpc("ops_set_booking_status", { p_booking_id: b.id, p_status: target });
      if (statusError) throw statusError;
      setMessage(`${b.booking_code || "Booking"} → ${labels[target]}.`); await loadAll();
    } catch (e: any) { setError(e.message); } finally { setSaving(false); }
  }

  async function updateRevenue(bookingId: string, amountValue: number) {
    setSaving(true); setError("");
    try {
      const amount = numberOnly(amountValue);
      const { error: updateError } = await supabase.from("bookings").update({ gross_revenue_vnd: amount }).eq("id", bookingId);
      if (updateError) throw updateError;
      setMessage("Đã điều chỉnh tiền thu của tour. Lãi gộp đã được tính lại.");
      await loadAll();
    } catch (e: any) { setError(e.message); } finally { setSaving(false); }
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

  function canDeleteBooking(b: Booking) {
    if (isAdmin) return true;
    return !!staff && ["sales", "desk"].includes(staff.role) && b.staff_id === staff.id && b.status === "pending" && bookingReceived(b) === 0 && b.payment_status === "unpaid";
  }

  async function deleteBooking(b: Booking) {
    if (!canDeleteBooking(b)) {
      setError("Nhân viên chỉ có thể xóa booking Pending do chính mình tạo và chưa có tiền cọc.");
      return;
    }
    const label = `${b.booking_code || "Booking"} · ${bookingName(b)}`;
    const question = isAdmin
      ? `Xóa vĩnh viễn booking này?\n\n${label}\n\nCác dữ liệu HDV / chi phí / payment liên quan cũng sẽ được xóa.`
      : `Xóa booking nháp này?\n\n${label}`;
    if (!window.confirm(question)) return;
    setSaving(true); setError("");
    try {
      const { error: deleteError } = await supabase.from("bookings").delete().eq("id", b.id);
      if (deleteError) throw deleteError;
      setMessage(`Đã xóa ${b.booking_code || "booking"}.`);
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
    const transportFees = transportBookings.filter((x) => x.booking_id === bookingId && x.status !== "void").reduce((sum, x) => sum + Number(x.amount_vnd || 0), 0);
    return extra + guideFees + transportFees;
  }

  if (loading) return <div className="gvo-login"><div className="gvo-login-card">Đang mở Operations Center…</div></div>;

  if (!session) return <div className="gvo-login"><form className="gvo-login-card" onSubmit={login}>
    <div className="gvo-brand">GoVietStay Operations</div>
    <p>Dùng tài khoản GoVietStay Owner/Admin/Sales/Desk.</p>
    {error && <div className="gva-msg err">{error}</div>}
    <label>Email</label><input className="gva-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    <label>Mật khẩu</label><input className="gva-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    <button className="gva-btn" style={{ width: "100%", marginTop: 12 }}>Đăng nhập</button>
    <a className="gvo-back-link" href="/admin">← Quay lại Admin</a>
  </form></div>;

  if (!staff || !isOpsStaff) {
    return <div className="gvo-login"><div className="gvo-login-card">Tài khoản này chưa có quyền Operations. <a href="/admin">Quay lại Admin</a>.</div></div>;
  }

  return <div className="gvo-shell">
    <header className="gvo-header">
      <div>
        <div className="gvo-eyebrow">GoVietStay · Operations Flow V2.0</div>
        <h1>{isSales ? "Booking của tôi" : "Điều phối tour & hướng dẫn viên"}</h1>
        <p>{staff.display_name} · {staff.role} · 1 Booking ID xuyên suốt Sales → Operations → Finance → Payroll</p>
      </div>
      <div className="gvo-header-actions">
        {isAdmin && <a className="gva-btn secondary" href="/admin">← Admin chính</a>}
        <button className="gva-btn secondary" onClick={loadAll}>Làm mới</button>
      </div>
    </header>

    {error && <div className="gva-msg err">{error}</div>}
    {message && <div className="gva-msg">{message}</div>}

    <section className="gvo-kpis">
      <MiniKPI label="Tours 7 ngày" value={sevenDayBookings.length} hint="Không tính cancelled" />
      <MiniKPI label="Khách 7 ngày" value={sevenDayPax} hint="Tổng pax" />
      <MiniKPI label="Cần HDV" value={needGuide} hint="Ưu tiên xử lý" warn={needGuide > 0} />
      <MiniKPI label={isAdmin ? "Custom tours" : "Ready 7 ngày"} value={isAdmin ? customCount : sevenDayBookings.filter((b) => b.status === "ready").length} hint={isAdmin ? "Tour nhập thủ công" : "Sẵn sàng vận hành"} />
    </section>

    <section className="gvo-card">
      <div className="gvo-card-head"><div><h2>🔔 Booking sắp khởi hành trong 7 ngày</h2><p>Nhắc tự động D-7, D-3, D-1 · 09:00 Việt Nam trên điện thoại và 09:15 email.</p></div><b>{sevenDayBookings.length} booking</b></div>
      <div className="gvo-stack">
        {sevenDayBookings
          .filter((b) => !["completed","closed"].includes(b.status))
          .sort((a,b) => String(a.tour_date).localeCompare(String(b.tour_date)))
          .map((b) => <div className="gvo-booking" key={b.id}>
            <div className="gvo-booking-top">
              <div><b>{b.tour_date} · {bookingName(b)}</b><div className="gvo-small">{b.booking_code || "—"} · {b.pax ?? b.adults+b.children} khách · {langLabel(b.guide_language)}</div></div>
              {b.internal_itinerary_vi?.trim()&&<span className="gvo-pill">✓ Có lịch Việt</span>}
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:9 }}>
              <button type="button" className="gvo-cost-btn" onClick={() => { setFocusDate(b.tour_date!); setView("dispatch"); }}>Xem điều phối</button>
              {isAdmin && <button type="button" className="gvo-cost-btn" onClick={() => openInternalItinerary(b)}>{b.internal_itinerary_vi ? "Sửa lịch trình Việt" : "+ Nhập lịch trình Việt"}</button>}
            </div>
          </div>)}
        {!sevenDayBookings.length && <div className="gvo-empty">Không có booking khởi hành trong 7 ngày tới.</div>}
      </div>
    </section>

    <nav className="gvo-tabs">
      <button className={view === "calendar" ? "active" : ""} onClick={() => setView("calendar")}>Lịch tháng</button>
      <button className={view === "dispatch" ? "active" : ""} onClick={() => setView("dispatch")}>Điều phối ngày</button>
      {isAdmin && <button type="button" onClick={() => window.open("/admin/payments", "_blank", "noopener,noreferrer")}>💳 Payment Center</button>}
      {isAdmin && <button className={view === "bookings" ? "active" : ""} onClick={() => setView("bookings")}>Bookings</button>}
      {isAdmin && <button className={view === "guides" ? "active" : ""} onClick={() => setView("guides")}>Hướng dẫn viên</button>}
      {isAdmin && <button className={view === "transport" ? "active" : ""} onClick={() => setView("transport")}>Nhà xe & tài xế</button>}
    </nav>

    {view === "calendar" && <section className="gvo-card gvo-month-card">
      <div className="gvo-month-head">
        <div>
          <div className="gvo-month-nav">
            <button type="button" onClick={() => setCalendarMonth(shiftMonth(calendarMonth, -1))}>‹</button>
            <h2>{monthTitle(calendarMonth)}</h2>
            <button type="button" onClick={() => setCalendarMonth(shiftMonth(calendarMonth, 1))}>›</button>
            <button type="button" className="today" onClick={() => setCalendarMonth(monthValue())}>Tháng này</button>
          </div>
          <p>Nhìn toàn bộ tour trong tháng. Bấm vào một ngày để mở điều phối chi tiết.</p>
        </div>
        <button className="gva-btn" onClick={openCreateBooking}>+ Booking</button>
      </div>
      <div className="gvo-month-kpis">
        <div><span>Tour trong tháng</span><b>{activeMonthBookings.length}</b></div>
        <div><span>Khách</span><b>{monthPax}</b></div>
        <div className={monthNeedGuide ? "alert" : ""}><span>Cần HDV</span><b>{monthNeedGuide}</b></div>
        {isAdmin ? <div><span>Doanh thu dự kiến</span><b>{money(monthRevenue)}</b></div> : <div><span>Ready</span><b>{activeMonthBookings.filter((b) => b.status === "ready").length}</b></div>}
      </div>
      <div className="gvo-calendar-legend">
        <span className="confirmed">Confirmed / Ready</span><span className="pending">Draft</span><span className="need-guide">Thiếu HDV</span><span className="completed">Completed</span><span className="cancelled">Đã hủy</span>
      </div>
      <div className="gvo-calendar-wrap">
        <div className="gvo-calendar-weekdays">{["T2","T3","T4","T5","T6","T7","CN"].map((d) => <div key={d}>{d}</div>)}</div>
        <div className="gvo-calendar-grid">
          {calendarDates.map((date) => {
            const dayBookings = (monthByDate[date] || []).sort((a,b) => String(a.start_time || a.pickup_time || "99:99").localeCompare(String(b.start_time || b.pickup_time || "99:99")));
            const inMonth = date.startsWith(calendarMonth);
            const isToday = date === localISO();
            return <button type="button" key={date} className={`gvo-cal-day ${inMonth ? "" : "outside"} ${isToday ? "today" : ""}`} onClick={() => { setFocusDate(date); setView("dispatch"); }}>
              <div className="gvo-cal-day-head"><b>{Number(date.slice(8))}</b>{dayBookings.filter((b) => b.status !== "cancelled").length > 0 && <span>{dayBookings.filter((b) => b.status !== "cancelled").length} tour</span>}</div>
              <div className="gvo-cal-items">
                {dayBookings.slice(0, 4).map((b) => <div key={b.id} className={`gvo-cal-chip ${calendarBookingState(b)}`}>
                  <strong>{timeShort(b.start_time || b.pickup_time)}</strong><span>{bookingName(b)}</span>
                </div>)}
                {dayBookings.length > 4 && <div className="gvo-cal-more">+{dayBookings.length - 4} tour khác</div>}
              </div>
            </button>;
          })}
        </div>
      </div>
      <div className="gvo-mobile-ops">
        <div className="gvo-mobile-filters" role="group" aria-label="Lọc lịch điều hành">
          <button type="button" className={mobileCalendarFilter === "today" ? "active" : ""} onClick={() => setMobileCalendarFilter("today")}>Hôm nay</button>
          <button type="button" className={mobileCalendarFilter === "tomorrow" ? "active" : ""} onClick={() => setMobileCalendarFilter("tomorrow")}>Ngày mai</button>
          <button type="button" className={mobileCalendarFilter === "7days" ? "active" : ""} onClick={() => setMobileCalendarFilter("7days")}>7 ngày</button>
          <button type="button" className={mobileCalendarFilter === "month" ? "active" : ""} onClick={() => setMobileCalendarFilter("month")}>Cả tháng</button>
        </div>
        <div className="gvo-mobile-day-list">
          {mobileCalendarDates.map((date) => {
            const dayBookings = (monthByDate[date] || [])
              .filter((b) => b.status !== "cancelled")
              .sort((a,b) => String(a.start_time || a.pickup_time || "99:99").localeCompare(String(b.start_time || b.pickup_time || "99:99")));
            const dayPax = dayBookings.reduce((sum, b) => sum + Number(b.pax ?? b.adults + b.children), 0);
            const dayNeedGuide = dayBookings.filter((b) => missingDispatch(b).guide || missingDispatch(b).transport).length;
            const dateLabel = new Intl.DateTimeFormat("vi-VN", { weekday: "short", day: "2-digit", month: "2-digit" }).format(new Date(`${date}T12:00:00`));
            return <section className={`gvo-mobile-day ${date === localISO() ? "today" : ""}`} key={date}>
              <button type="button" className="gvo-mobile-day-head" onClick={() => { setFocusDate(date); setView("dispatch"); }}>
                <span><b>{dateLabel}</b><small>{dayBookings.length} tour · {dayPax} khách</small></span>
                <span className={dayNeedGuide ? "need-guide" : "ready"}>{dayNeedGuide ? `⚠ ${dayNeedGuide} thiếu điều phối` : "✓ Đủ điều phối"}</span>
              </button>
              <div className="gvo-mobile-tour-list">
                {dayBookings.map((b) => {
                  const state = calendarBookingState(b);
                  const revenue = Number(b.net_revenue_vnd ?? b.gross_revenue_vnd ?? 0);
                  const cost = totalCost(b.id);
                  return <article className={`gvo-mobile-tour ${state}`} key={b.id}>
                    <div className="gvo-mobile-tour-main">
                      <div className="gvo-mobile-tour-time">{timeShort(b.start_time || b.pickup_time)}</div>
                      <div className="gvo-mobile-tour-copy">
                        <b>{bookingName(b)}</b>
                        <span>{contactMap[b.contact_id || ""]?.full_name || "Khách"} · {b.pax ?? b.adults + b.children} khách · {langLabel(b.guide_language)}</span>
                        {isAdmin ? <><small>Thu {money(revenue)} · Chi {money(cost)} · Lãi {money(revenue - cost)}</small><small>Cọc YC {money(bookingDeposit(b))} · Đã nhận {money(bookingReceived(b))} · Còn {money(bookingBalance(b))}</small></> : <small>Cọc YC {money(bookingDeposit(b))} · Đã nhận {money(bookingReceived(b))} · Còn {money(bookingBalance(b))}</small>}
                      </div>
                    </div>
                    {b.internal_itinerary_vi && <div className="gvo-itinerary" style={{ whiteSpace: "pre-wrap" }}><b>🇻🇳 Lịch trình nội bộ</b><div>{b.internal_itinerary_vi}</div></div>}
                    {isAdmin && <button type="button" className="gvo-cost-btn" onClick={() => openInternalItinerary(b)}>✎ {b.internal_itinerary_vi ? "Sửa lịch Việt" : "+ Lịch trình tiếng Việt"}</button>}
                    {renderNextAction(b)}
                    {shareButtons(b)}
                    <div className="gvo-mobile-tour-actions">
                      <button type="button" onClick={() => { setFocusDate(date); setView("dispatch"); }}>Điều phối</button>
                      {isAdmin && <button type="button" className="finance" onClick={() => { setSelectedBooking(b.id); setModal("cost"); }}>Tài chính</button>}
                      {canDeleteBooking(b) && <button type="button" onClick={() => deleteBooking(b)} disabled={saving} style={{ color: "#b42318" }}>{isAdmin ? "Xóa" : "Xóa nháp"}</button>}
                    </div>
                  </article>;
                })}
              </div>
            </section>;
          })}
          {!mobileCalendarDates.length && <div className="gvo-mobile-empty">Không có tour trong khoảng thời gian này.</div>}
        </div>
      </div>
    </section>}

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
        {isAdmin && <button className="gva-btn secondary" onClick={() => setModal("availability")}>+ Lịch HDV</button>}
        <button className="gva-btn" onClick={openCreateBooking}>+ Booking</button>
      </section>

      <div className="gvo-grid2" style={isSales ? { gridTemplateColumns: "1fr" } : undefined}>
        <section className="gvo-card">
          <div className="gvo-card-head"><div><h2>Tour ngày {focusDate}</h2><p>{focusBookings.length} booking</p></div></div>
          <div className="gvo-stack">
            {focusBookings.map((b) => {
              const ass = activeAssignments(b.id);
              const cost = totalCost(b.id);
              const revenue = Number(b.net_revenue_vnd ?? b.gross_revenue_vnd ?? 0);
              const preferredArea = bookingGuideAreaKey(b, tourMap[b.tour_id || ""]);
              const eligibleGuides = eligibleGuidesForBooking(b);
              const missing = missingDispatch(b);
              return <article className="gvo-booking" key={b.id}>
                <div className="gvo-booking-top">
                  <div><b>{b.booking_code || "Booking"}</b><span className={`gvo-mode ${b.booking_mode}`}>{b.booking_mode === "custom" ? "CUSTOM" : "CATALOG"}</span></div>
                  <span className="gvo-pill">{flowStatusLabel(b.status)}</span>
                </div>
                <h3>{bookingName(b)}</h3>
                <div className="gvo-booking-meta">
                  <span>👤 {contactMap[b.contact_id || ""]?.full_name || "—"}</span>
                  <span>👥 {b.pax ?? b.adults + b.children}</span>
                  <span>{langLabel(b.guide_language)}</span>
                  <span>🕘 {timeShort(b.start_time || b.pickup_time)}–{timeShort(b.end_time)}</span>
                  <span>🏨 {b.hotel || "—"}</span>
                  {b.hotel_address && <span>📍 {b.hotel_address}</span>}
                </div>
                {b.internal_itinerary_vi && <div className="gvo-itinerary" style={{ whiteSpace: "pre-wrap", border: "1px solid #bfdbfe", background: "#eff6ff" }}><b>🇻🇳 LỊCH TRÌNH NỘI BỘ</b><div>{b.internal_itinerary_vi}</div></div>}
                {b.booking_mode === "custom" && b.custom_itinerary && <div className="gvo-itinerary"><b>Lịch trình gốc</b><div>{b.custom_itinerary}</div></div>}
                {isAdmin && <button type="button" className="gvo-cost-btn" onClick={() => openInternalItinerary(b)}>✎ {b.internal_itinerary_vi ? "Sửa lịch Việt" : "+ Lịch trình tiếng Việt"}</button>}
                <div className="gvo-assignment">
                  <div className="gvo-dispatch-requirements">
                    <span className={missing.guide || missing.transport ? "gvo-dispatch-pending" : "gvo-dispatch-ready"}>
                      {missing.guide || missing.transport ? "⚠ Điều phối chưa đủ" : "✓ Đã đủ dịch vụ yêu cầu"}
                    </span>
                    <span>HDV: {requiresGuide(b) ? (hasConfirmedGuide(b.id) ? "Đã gán" : "Cần gán") : "Không cần"}</span>
                    <span>Xe: {requiresTransport(b) ? (hasAssignedTransport(b.id) ? "Đã gán" : "Cần gán") : "Không cần"}</span>
                    {isAdmin && <button type="button" className="gvo-cost-btn" onClick={() => { setError(""); setSelectedBooking(b.id); setModal("requirements"); }}>⚙ Yêu cầu điều phối</button>}
                  </div>
                  {transportBookings.filter((x) => x.booking_id === b.id && x.status !== "void").map((x) => {
                    const supplier = transportSuppliers.find((s) => s.id === x.supplier_id);
                    return <div className="gvo-assigned" key={x.id}><span>🚐 Nhà xe: <b>{supplier?.name || "Đối tác vận chuyển"}</b> · {x.description}{isAdmin ? ` · ${money(x.amount_vnd)}` : ""}</span>
                      {supplier?.phone && <a href={`tel:${supplier.phone.replace(/[^\d+]/g, "")}`}>Gọi nhà xe</a>}
                      {isAdmin && x.status === "open" && <>
                        <button type="button" className="gvo-cost-btn" onClick={() => openTransportEdit(x.id)} disabled={saving}>✎ Sửa xe / giá</button>
                        <button type="button" className="gvo-cost-btn" style={{ color: "#b42318" }} onClick={() => voidTransport(x.id)} disabled={saving}>Hủy phân xe</button>
                      </>}
                    </div>;
                  })}
                  {ass.length ? ass.map((a) => <div className="gvo-assigned" key={a.id}>
                    <span>HDV: <b>{guideMap[a.guide_id]?.full_name || "—"}</b>{isAdmin ? ` · ${money(a.agreed_fee_vnd)}` : ""}</span>
                    {canOperate && <select className="gva-select" value={a.status} onChange={(e) => updateAssignment(a.id, e.target.value)} disabled={saving}>
                      <option value="pending">pending</option><option value="confirmed">confirmed</option><option value="completed">completed</option><option value="cancelled">cancelled</option>
                    </select>}
                    {canOperate && (a.status === "pending" || a.status === "confirmed") && <button type="button" className="gvo-cost-btn" onClick={() => openReplaceGuide(b.id, a.id)} disabled={saving}>🔄 Đổi HDV</button>}
                  </div>) : requiresGuide(b) ? <div className="gvo-need-guide">⚠️ Chưa gán hướng dẫn viên</div> : <div className="gvo-assigned">HDV: Không yêu cầu</div>}
                  {!ass.length && requiresGuide(b) && canOperate && <div className="gvo-assign-row">
                    <select className="gva-select" defaultValue="" onChange={(e) => { if (e.target.value) assignGuide(b.id, e.target.value); }} disabled={saving}>
                      <option value="">Chọn HDV phù hợp…</option>
                      {eligibleGuides.map((g) => <option key={g.id} value={g.id}>{preferredArea && guideAreas(g).includes(preferredArea) ? "📍 " : ""}{g.full_name} · {statusText(guideStatus(g.id, focusDate))}{isAdmin ? ` · ${money(suggestedFee(g, b))}` : ""}</option>)}
                    </select>
                    {!eligibleGuides.length && <div className="gvo-need-guide">Không có HDV phù hợp chưa bị gán lịch. Kiểm tra ngôn ngữ hoặc cập nhật lịch HDV.</div>}
                  </div>}
                  {isAdmin && <div className="gvo-assign-row"><button type="button" className="gvo-cost-btn" onClick={() => openTransportBooking(b.id)} disabled={saving}>🚐 {hasAssignedTransport(b.id) ? "+ Gán thêm xe" : "Gán xe"}</button></div>}
                </div>
                {isAdmin ? <>
                  <div className="gvo-finance-row">
                    <span>Thu: <b>{money(revenue)}</b></span><span>Chi: <b>{money(cost)}</b></span><span>Lãi gộp: <b>{money(revenue - cost)}</b></span>
                    <button className="gvo-text-btn" onClick={() => { setSelectedBooking(b.id); setModal("cost"); }}>Quản lý chi phí</button>
                  </div>
                  <div className="gvo-finance-row">
                    <span>💵 Cọc YC: <b>{money(bookingDeposit(b))}</b></span><span>Đã nhận: <b>{money(bookingReceived(b))}</b></span><span>Còn: <b>{money(bookingBalance(b))}</b></span>
                  </div>
                </> : <div className="gvo-finance-row">
                  <span>Tổng: <b>{money(revenue)}</b></span><span>Cọc YC: <b>{money(bookingDeposit(b))}</b></span><span>Đã nhận: <b>{money(bookingReceived(b))}</b></span><span>Còn: <b>{money(bookingBalance(b))}</b></span>
                </div>}
                {renderNextAction(b)}
                {shareButtons(b)}
                {canDeleteBooking(b) && <div style={{ marginTop: 8, textAlign: "right" }}>
                  <button type="button" disabled={saving} onClick={() => deleteBooking(b)} style={{ border: 0, background: "transparent", color: "#b42318", fontWeight: 700, cursor: "pointer" }}>{isAdmin ? "🗑 Xóa booking" : "🗑 Xóa booking nháp"}</button>
                </div>}
              </article>;
            })}
            {!focusBookings.length && <div className="gvo-empty">Không có tour trong ngày này.</div>}
          </div>
        </section>

        {canOperate && <section className="gvo-card">
          <div className="gvo-card-head"><div><h2>HDV ngày {focusDate}</h2><p>Trạng thái = lịch rảnh + booking đã gán</p></div></div>
          <div className="gvo-guide-list">
            {focusGuides.map((g) => {
              const s = guideStatus(g.id, focusDate);
              return <div className={`gvo-guide-row status-${s}`} key={g.id}>
                <div><b>{g.full_name}</b><div className="gvo-small">{(g.languages || []).map(langLabel).join(" · ") || "Chưa có ngôn ngữ"}</div></div>
                <div className="gvo-small">{(g.service_areas || []).join(" · ") || "—"}</div>
                <div><b>{statusText(s)}</b>{isAdmin && <div className="gvo-small">Nửa ngày {money(g.half_day_rate_vnd)} · Cả ngày {money(g.full_day_rate_vnd)}</div>}</div>
              </div>;
            })}
            {!focusGuides.length && <div className="gvo-empty">Chưa có HDV phù hợp bộ lọc.</div>}
          </div>
        </section>}
      </div>
    </>}

    {view === "transport" && isAdmin && <section className="gvo-card">
      <div className="gvo-card-head gvo-transport-head">
        <div><h2>Danh bạ nhà xe & tài xế</h2><p>Đối tác vận chuyển dùng chung với Finance. Mỗi chuyến gắn Booking ID để dễ tra cứu và đối soát.</p></div>
        <div className="gvo-transport-actions">
          <button className="gva-btn secondary" onClick={() => { setSelectedBooking(null); setModal("transport_booking"); }}>+ Gán xe cho booking</button>
          <button className="gva-btn" onClick={() => setModal("transport")}>+ Thêm nhà xe</button>
        </div>
      </div>
      <div className="gvo-transport-filters" role="search" aria-label="Tìm nhà xe và tài xế">
        <label className="gvo-guide-filter-field"><span>Khu vực</span><select className="gva-select" value={transportAreaFilter} onChange={(e) => setTransportAreaFilter(e.target.value)}>
          <option value="all">📍 Tất cả khu vực</option>
          {transportAreaOptions.map((area) => <option key={area.key} value={area.key}>{area.label} ({area.count})</option>)}
        </select></label>
        <label className="gvo-guide-filter-field"><span>Trạng thái</span><select className="gva-select" value={transportActiveFilter} onChange={(e) => setTransportActiveFilter(e.target.value)}>
          <option value="all">Tất cả đối tác</option><option value="active">Đang hợp tác</option><option value="inactive">Ngừng hợp tác</option>
        </select></label>
        <label className="gvo-guide-filter-field"><span>Tìm nhanh</span><input type="search" className="gva-input" value={transportSearch} onChange={(e) => setTransportSearch(e.target.value)} placeholder="Tên, SĐT, xe 7 chỗ, 16 chỗ..." /></label>
      </div>
      <div className="gvo-guide-filter-summary">
        <span>Hiển thị <b>{filteredTransportSuppliers.length}</b> / {transportSuppliers.length} nhà xe & tài xế</span>
        {(transportAreaFilter !== "all" || transportActiveFilter !== "all" || transportSearch) && <button type="button" className="gvo-guide-reset" onClick={() => { setTransportAreaFilter("all"); setTransportActiveFilter("all"); setTransportSearch(""); }}>Xóa bộ lọc</button>}
      </div>
      <div className="gvo-table-wrap gvo-transport-table-wrap"><table className="gvo-table gvo-transport-table"><thead><tr><th>Nhà xe / người phụ trách</th><th>Khu vực</th><th>Liên hệ nhanh</th><th>Loại xe / giá / ghi chú</th><th>Booking liên quan</th></tr></thead><tbody>
        {filteredTransportSuppliers.map((s) => {
          const linked = transportBookings.filter((x) => x.supplier_id === s.id);
          const whatsapp = (s.whatsapp || "").replace(/\D/g, "").replace(/^0/, "84");
          return <tr key={s.id}>
            <td data-label="Nhà xe"><b className="gvo-transport-name">{s.name}</b><div className="gvo-small">{s.contact_name || "Chưa có người phụ trách"}{!s.active ? " · Ngừng hợp tác" : ""}</div></td>
            <td data-label="Khu vực">{transportAreaLabels(s.service_area).join(", ") || "Chưa cập nhật"}</td>
            <td data-label="Liên hệ"><div className="gvo-guide-contacts">
              {s.phone && <a href={`tel:${s.phone.replace(/[^\d+]/g, "")}`}>📞 {s.phone}</a>}
              {s.whatsapp && <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp: {s.whatsapp}</a>}
              {!s.phone && !s.whatsapp && "—"}
            </div></td>
            <td data-label="Loại xe / giá" className="gvo-transport-notes">{s.notes || "—"}</td>
            <td data-label="Booking">{linked.length ? linked.map((a) => <div key={a.id} style={{ marginBottom: 5 }}><b>{bookings.find((b) => b.id === a.booking_id)?.booking_code || "Booking"}</b> · {money(a.amount_vnd)}<div className="gvo-small">{a.description} · {a.status}</div></div>) : "Chưa gán"}</td>
          </tr>;
        })}
        {!filteredTransportSuppliers.length && <tr><td colSpan={5}><div className="gvo-empty">{transportSuppliers.length ? "Không tìm thấy nhà xe phù hợp. Thử đổi khu vực hoặc xóa bộ lọc." : "Chưa có nhà xe. Bấm “+ Thêm nhà xe” để tạo hồ sơ đầu tiên."}</div></td></tr>}
      </tbody></table></div>
    </section>}

    {view === "guides" && isAdmin && <section className="gvo-card">
      <div className="gvo-card-head"><div><h2>Database hướng dẫn viên</h2><p>Mỗi HDV một hồ sơ; lịch rảnh lưu riêng theo ngày/khung giờ.</p></div><button className="gva-btn" onClick={() => setModal("guide")}>+ Thêm HDV</button></div>
      <div className="gvo-guide-filters" role="search" aria-label="Tìm hướng dẫn viên">
        <label className="gvo-guide-filter-field"><span>Khu vực</span><select className="gva-select" value={guideAreaFilter} onChange={(e) => setGuideAreaFilter(e.target.value)}>
          <option value="all">📍 Tất cả khu vực</option>
          {guideAreaOptions.map((area) => <option key={area.key} value={area.key}>{area.label} ({area.count})</option>)}
        </select></label>
        <label className="gvo-guide-filter-field"><span>Ngôn ngữ</span><select className="gva-select" value={guideLanguageFilter} onChange={(e) => setGuideLanguageFilter(e.target.value)}>
          <option value="all">Tất cả ngôn ngữ</option>
          {guideLanguageOptions.map((code) => <option key={code} value={code}>{langLabel(code)}</option>)}
        </select></label>
        <label className="gvo-guide-filter-field"><span>Trạng thái</span><select className="gva-select" value={guideActiveFilter} onChange={(e) => setGuideActiveFilter(e.target.value)}>
          <option value="all">Tất cả hồ sơ</option><option value="active">Đang hợp tác</option><option value="inactive">Ngừng hợp tác</option>
        </select></label>
        <label className="gvo-guide-filter-field gvo-guide-search"><span>Tìm nhanh</span><input type="search" className="gva-input" value={guideSearch} onChange={(e) => setGuideSearch(e.target.value)} placeholder="Tên HDV hoặc số điện thoại..." /></label>
      </div>
      <div className="gvo-guide-filter-summary">
        <span>Hiển thị <b>{filteredGuides.length}</b> / {guides.length} hướng dẫn viên</span>
        {(guideAreaFilter !== "all" || guideLanguageFilter !== "all" || guideActiveFilter !== "all" || guideSearch) && <button type="button" className="gvo-guide-reset" onClick={() => { setGuideAreaFilter("all"); setGuideLanguageFilter("all"); setGuideActiveFilter("all"); setGuideSearch(""); }}>Xóa bộ lọc</button>}
      </div>
      <div className="gvo-table-wrap gvo-guide-table-wrap"><table className="gvo-table gvo-guide-table"><thead><tr><th>HDV</th><th>Ngôn ngữ</th><th>Khu vực</th><th>Liên hệ</th><th>Nửa ngày</th><th>Cả ngày</th><th>License</th></tr></thead><tbody>
        {filteredGuides.map((g) => <tr key={g.id}>
          <td data-label="HDV"><b className="gvo-guide-name">{g.full_name}</b>{!g.active && <div className="gvo-small">Ngừng hợp tác</div>}</td>
          <td data-label="Ngôn ngữ">{guideLanguageCodes(g).map(langLabel).join(", ") || "—"}</td>
          <td data-label="Khu vực">{guideAreaLabels(g).join(", ") || "Chưa cập nhật"}</td>
          <td data-label="Liên hệ"><div className="gvo-guide-contacts">
            {g.phone && <a href={`tel:${g.phone.replace(/[^\d+]/g, "")}`}>📞 {g.phone}</a>}
            {g.whatsapp && <a href={`https://wa.me/${g.whatsapp.replace(/\D/g, "").replace(/^0/, "84")}`} target="_blank" rel="noopener noreferrer">WhatsApp: {g.whatsapp}</a>}
            {g.zalo && <a href={`https://zalo.me/${g.zalo.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">Zalo: {g.zalo}</a>}
            {!g.phone && !g.whatsapp && !g.zalo && "—"}
          </div></td>
          <td data-label="Nửa ngày">{money(g.half_day_rate_vnd)}</td><td data-label="Cả ngày">{money(g.full_day_rate_vnd)}</td><td data-label="License">{g.license_status}</td>
        </tr>)}
        {!filteredGuides.length && <tr><td colSpan={7}><div className="gvo-empty">{guides.length ? "Không tìm thấy HDV phù hợp. Thử đổi khu vực, ngôn ngữ hoặc xóa bộ lọc." : "Chưa có hướng dẫn viên. Hãy thêm hồ sơ đầu tiên."}</div></td></tr>}
      </tbody></table></div>
    </section>}

    {view === "bookings" && isAdmin && <section className="gvo-card">
      <div className="gvo-card-head"><div><h2>Booking vận hành</h2><p>Tiền thu và chi phí đều có thể điều chỉnh khi lịch trình khách thay đổi.</p></div><button className="gva-btn" onClick={openCreateBooking}>+ Booking</button></div>
      <div className="gvo-table-wrap"><table className="gvo-table"><thead><tr><th>Ngày</th><th>Code</th><th>Tour</th><th>Khách</th><th>Ngôn ngữ</th><th>HDV</th><th>Thu</th><th>Chi</th><th>Lãi gộp</th></tr></thead><tbody>
        {bookings.filter((b) => b.status !== "cancelled").map((b) => {
          const cost = totalCost(b.id);
          const revenue = Number(b.net_revenue_vnd ?? b.gross_revenue_vnd ?? 0);
          return <tr key={b.id}>
            <td>{b.tour_date || "—"}<div className="gvo-small">{timeShort(b.start_time)}</div></td>
            <td><b>{b.booking_code || "—"}</b><div><button type="button" className="gvo-cost-btn" disabled={saving} onClick={() => openDuplicateBooking(b)}>📋 Nhân bản</button></div></td>
            <td>{bookingName(b)}{b.booking_mode === "custom" && <div className="gvo-small">Custom</div>}<div><button type="button" className="gvo-cost-btn" onClick={() => openInternalItinerary(b)}>{b.internal_itinerary_vi ? "🇻🇳 Xem / sửa lịch Việt" : "+ Lịch trình tiếng Việt"}</button></div></td>
            <td>{contactMap[b.contact_id || ""]?.full_name || "—"}</td>
            <td>{langLabel(b.guide_language)}</td>
            <td>{activeAssignments(b.id).map((a) => guideMap[a.guide_id]?.full_name).filter(Boolean).join(", ") || "⚠️ Chưa gán"}</td>
            <td><b>{money(revenue)}</b><div><button type="button" className="gvo-revenue-btn" onClick={() => { setSelectedBooking(b.id); setModal("cost"); }}>Sửa thu</button></div></td>
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

    {modal === "transport" && isAdmin && <ModalFrame title="Thêm đối tác nhà xe" onClose={() => setModal(null)}><form onSubmit={createTransportSupplier} className="gvo-form-grid">
      <Field label="Tên nhà xe / công ty"><input name="name" className="gva-input" required /></Field>
      <Field label="Người phụ trách"><input name="contact_name" className="gva-input" /></Field>
      <Field label="Số điện thoại"><input name="phone" className="gva-input" type="tel" /></Field>
      <Field label="WhatsApp"><input name="whatsapp" className="gva-input" type="tel" /></Field>
      <Field label="Khu vực phục vụ"><input name="service_area" className="gva-input" placeholder="Đà Nẵng, Hội An, Huế" /></Field>
      <Field label="Loại xe"><input name="vehicle_types" className="gva-input" placeholder="4, 7, 16, 29, 45 chỗ" /></Field>
      <Field label="Giá tham khảo"><input name="reference_rates" className="gva-input" placeholder="Sân bay 7 chỗ: 300.000đ..." /></Field>
      <Field label="Hạn thanh toán (ngày)"><input name="payment_terms_days" className="gva-input" type="number" min="0" defaultValue="0" /></Field>
      <Field label="Ghi chú / tài xế dự phòng / điều khoản" wide><textarea name="notes" className="gva-input" rows={3} /></Field>
      <ModalActions saving={saving} onClose={() => setModal(null)} label="Lưu nhà xe" />
    </form></ModalFrame>}

    {modal === "requirements" && isAdmin && selectedBooking && (() => {
      const b = bookings.find((x) => x.id === selectedBooking);
      if (!b) return null;
      return <ModalFrame title={`Yêu cầu điều phối · ${b.booking_code || "Booking"}`} onClose={() => { setModal(null); setSelectedBooking(null); }}>
        <form onSubmit={saveRequirements} className="gvo-form-grid">
          <div className="gva-analytics-note" style={{ gridColumn: "1/-1" }}>Chọn dịch vụ thực sự cần bố trí cho ngày tour này. Giá bán, tiền cọc và lịch trình không thay đổi.</div>
          <div className="gvo-field wide"><span>Dịch vụ cần bố trí</span>
            <label className="gvo-service-option"><input type="checkbox" name="requires_guide" defaultChecked={requiresGuide(b)} /> Cần hướng dẫn viên</label>
            <label className="gvo-service-option"><input type="checkbox" name="requires_transport" defaultChecked={requiresTransport(b)} /> Cần xe & tài xế</label>
          </div>
          {error && <div className="gva-msg err" style={{ gridColumn: "1/-1" }} role="alert">{error}</div>}
          <ModalActions saving={saving} onClose={() => { setModal(null); setSelectedBooking(null); }} label="Lưu yêu cầu điều phối" />
        </form>
      </ModalFrame>;
    })()}

    {modal === "transport_booking" && isAdmin && <ModalFrame title="Gán nhà xe cho booking" onClose={() => { setModal(null); setSelectedBooking(null); }}><form onSubmit={assignTransport} className="gvo-form-grid">
      <Field label="Booking"><select name="booking_id" className="gva-select" defaultValue={selectedBooking || ""} required><option value="">Chọn booking</option>{bookings.filter((b) => b.status !== "cancelled").map((b) => <option value={b.id} key={b.id}>{b.booking_code || b.id.slice(0, 8)} · {b.tour_date} · {bookingName(b)}</option>)}</select></Field>
      <Field label="Nhà xe"><select name="supplier_id" className="gva-select" required><option value="">Chọn nhà xe</option>{transportSuppliers.filter((s) => s.active).map((s) => <option value={s.id} key={s.id}>{s.name} · {s.service_area || "Toàn quốc"}</option>)}</select></Field>
      <Field label="Loại xe"><input name="vehicle_type" className="gva-input" placeholder="16 chỗ" /></Field>
      <Field label="Chi phí thỏa thuận (VND)"><input name="amount_vnd" className="gva-input" type="number" min="0" required /></Field>
      <Field label="Điểm đón / giờ đón" wide><input name="pickup_details" className="gva-input" placeholder="08:00 · Khách sạn..." /></Field>
      <Field label="Ghi chú điều phối" wide><textarea name="notes" className="gva-input" rows={3} /></Field>
      <div className="gvo-field wide"><label className="gvo-service-option"><input type="checkbox" name="allow_same_supplier" /> Tôi xác nhận cần thêm một xe khác của cùng nhà xe (nếu booking đã gán nhà xe này).</label></div>
      {error && <div className="gva-msg err" role="alert" style={{ gridColumn: "1/-1" }}>{error}</div>}
      <ModalActions saving={saving} onClose={() => { setModal(null); setSelectedBooking(null); }} label="Lưu phân xe" />
    </form></ModalFrame>}

    {modal === "transport_edit" && isAdmin && selectedTransportId && (() => {
      const x = transportBookings.find((item) => item.id === selectedTransportId && item.status === "open");
      if (!x) return null;
      return <ModalFrame title="Sửa phân xe & chi phí" onClose={() => { setModal(null); setSelectedTransportId(null); }}>
        <form onSubmit={saveTransportEdit} className="gvo-form-grid">
          <div className="gva-analytics-note" style={{ gridColumn: "1/-1" }}>Sửa bản ghi hiện tại; không tạo thêm công nợ. Chỉ cho phép sửa khi chưa thanh toán.</div>
          <Field label="Loại xe"><input name="vehicle_type" className="gva-input" defaultValue={(x.description || "").replace(/^Vận chuyển · /, "")} /></Field>
          <Field label="Chi phí thỏa thuận (VND)"><input name="amount_vnd" type="number" min="0" className="gva-input" defaultValue={x.amount_vnd} required /></Field>
          <Field label="Ghi chú điều phối" wide><textarea name="notes" className="gva-input" defaultValue={x.notes || ""} rows={3} /></Field>
          {error && <div className="gva-msg err" role="alert" style={{ gridColumn: "1/-1" }}>{error}</div>}
          <ModalActions saving={saving} onClose={() => { setModal(null); setSelectedTransportId(null); }} label="Lưu thay đổi" />
        </form>
      </ModalFrame>;
    })()}

    {modal === "replace_guide" && canOperate && selectedBooking && selectedAssignmentId && (() => {
      const b = bookings.find((booking) => booking.id === selectedBooking);
      const current = assignments.find((assignment) => assignment.id === selectedAssignmentId && assignment.booking_id === selectedBooking);
      if (!b || !current) return null;
      const candidates = eligibleGuidesForBooking(b, current.guide_id);
      const area = bookingGuideAreaKey(b, tourMap[b.tour_id || ""]);
      const close = () => { setModal(null); setSelectedBooking(null); setSelectedAssignmentId(null); };
      return <ModalFrame title="🔄 Đổi hướng dẫn viên" onClose={close}>
        <form onSubmit={replaceGuide} className="gvo-form-grid">
          {error && <div className="gva-msg err" style={{ gridColumn: "1/-1" }}>{error}</div>}
          <div className="gva-analytics-note" style={{ gridColumn: "1/-1" }}><b>{b.booking_code}</b> · {b.tour_date} · {bookingName(b)}<div>HDV hiện tại: <b>{guideMap[current.guide_id]?.full_name || "—"}</b> · {money(current.agreed_fee_vnd)}</div></div>
          <Field label="Chọn HDV thay thế" wide><select name="guide_id" className="gva-select" defaultValue="" required><option value="">Chọn HDV mới…</option>{candidates.map((g) => <option value={g.id} key={g.id}>{area && guideAreas(g).includes(area) ? "📍 " : ""}{g.full_name} · {statusText(guideStatus(g.id, b.tour_date || focusDate))}{isAdmin ? ` · ${money(suggestedFee(g, b))}` : ""}</option>)}</select></Field>
          {!candidates.length && <div className="gvo-need-guide" style={{ gridColumn: "1/-1" }}>Chưa có HDV thay thế phù hợp. Vui lòng kiểm tra ngôn ngữ và lịch HDV.</div>}
          <div className="gva-analytics-note" style={{ gridColumn: "1/-1" }}>Phân công cũ chuyển sang trạng thái cancelled và vẫn lưu lịch sử. Nếu HDV mới trùng lịch, thao tác sẽ không thực hiện và HDV cũ vẫn được giữ nguyên. Vui lòng xác nhận HDV mới trước khi đổi.</div>
          <ModalActions saving={saving} disabled={!candidates.length} onClose={close} label="Xác nhận đổi HDV" />
        </form>
      </ModalFrame>;
    })()}

    {modal === "guide" && isAdmin && <ModalFrame title="Thêm hướng dẫn viên" onClose={() => setModal(null)}><form onSubmit={createGuide} className="gvo-form-grid">
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

    {modal === "availability" && isAdmin && <ModalFrame title="Cập nhật lịch HDV" onClose={() => setModal(null)}><form onSubmit={createAvailability} className="gvo-form-grid">
      <Field label="Hướng dẫn viên"><select name="guide_id" className="gva-select" required><option value="">Chọn HDV</option>{guides.filter((g) => g.active).map((g) => <option key={g.id} value={g.id}>{g.full_name} · {(g.languages || []).map(langLabel).join(", ")}</option>)}</select></Field>
      <Field label="Ngày"><input name="work_date" type="date" className="gva-input" defaultValue={focusDate} required /></Field>
      <Field label="Từ giờ"><input name="start_time" type="time" className="gva-input" defaultValue="00:00" required /></Field>
      <Field label="Đến giờ"><input name="end_time" type="time" className="gva-input" defaultValue="23:59" required /></Field>
      <Field label="Trạng thái"><select name="status" className="gva-select"><option value="available">Available</option><option value="unavailable">Unavailable</option></select></Field>
      <Field label="Ghi chú" wide><textarea name="notes" className="gva-input" rows={3} /></Field>
      <ModalActions saving={saving} onClose={() => setModal(null)} label="Lưu lịch" />
    </form></ModalFrame>}

    {modal === "booking" && <BookingModal
      tours={tours}
      sourceBooking={duplicateBookingId ? bookings.find((b) => b.id === duplicateBookingId) : null}
      sourceContact={duplicateBookingId ? contactMap[bookings.find((b) => b.id === duplicateBookingId)?.contact_id || ""] : null}
      saving={saving}
      onClose={() => { setModal(null); setDuplicateBookingId(null); }}
      onSubmit={createBooking}
    />}

    {modal === "internal_itinerary" && isAdmin && selectedBooking && bookings.find((b) => b.id === selectedBooking) && <ModalFrame title="🇻🇳 Lịch trình nội bộ — Tiếng Việt" onClose={() => { setModal(null); setSelectedBooking(null); }}>
      <form onSubmit={saveInternalItinerary} className="gvo-form-grid">
        <div className="gva-analytics-note" style={{ gridColumn: "1/-1" }}>Chỉ dùng nội bộ. Nội dung này không nằm trong xác nhận booking gửi khách và không tự động gửi cho tài xế.</div>
        <Field label="Lịch trình chi tiết bằng tiếng Việt" wide>
          <textarea name="internal_itinerary_vi" className="gva-input" rows={12} defaultValue={bookings.find((b) => b.id === selectedBooking)?.internal_itinerary_vi || ""} placeholder={"08:00 Đón khách tại khách sạn\n09:00 Tham quan...\n12:00 Ăn trưa..."} />
        </Field>
        <ModalActions saving={saving} onClose={() => { setModal(null); setSelectedBooking(null); }} label="Lưu lịch trình nội bộ" />
      </form>
    </ModalFrame>}
    {modal === "quick" && selectedBooking && bookings.find((b) => b.id === selectedBooking) && <QuickBookingModal
      booking={bookings.find((b) => b.id === selectedBooking)!}
      received={bookingReceived(bookings.find((b) => b.id === selectedBooking)!)}
      saving={saving}
      onClose={() => { setModal(null); setSelectedBooking(null); }}
      onSubmit={saveQuick}
      onOpenRequirements={() => setModal("requirements")}
    />}

    {shareBookingId && bookings.find((b) => b.id === shareBookingId) && (() => {
      const b = bookings.find((x) => x.id === shareBookingId)!;
      const contact = contactMap[b.contact_id || ""];
      return <ModalFrame title="Booking đã lưu — Copy ngay" onClose={() => setShareBookingId(null)}>
        <div style={{ padding: "4px 2px 8px" }}>
          <div style={{ background: "#f6f8fb", border: "1px solid #e5e9f0", borderRadius: 12, padding: 14, lineHeight: 1.6 }}>
            <div><b>{b.booking_code || "Booking"}</b></div>
            <div><b>{bookingName(b)}</b></div>
            <div>Khách: {contact?.full_name || "—"} · {b.pax ?? b.adults + b.children} khách</div>
            <div>Ngày: {customerDate(b.tour_date, "vi-VN")} · Pickup: {timeShort(b.pickup_time || b.start_time)}</div>
            <div>Khách sạn: {b.hotel || "—"}</div>
            {b.hotel_address && <div>Địa chỉ: {b.hotel_address}</div>}
            <div style={{ marginTop: 6 }}><b>Tổng: {money(bookingRevenue(b))} · Cọc YC: {money(bookingDeposit(b))} · Đã nhận: {money(bookingReceived(b))} · Còn: {money(bookingBalance(b))}</b></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
            <button type="button" className="gva-btn" onClick={() => copyText(customerBilingualCopy(b), "Booking khách EN + RU + Website")}>Copy khách EN + RU</button>
            <button type="button" className="gva-btn secondary" onClick={() => copyText(driverBilingualCopy(b), "Driver EN + VI")}>Copy Driver EN + VI</button>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button type="button" className="gva-btn secondary" onClick={() => setShareBookingId(null)}>Đóng</button>
          </div>
        </div>
      </ModalFrame>;
    })()}

    {modal === "cost" && selectedBooking && isAdmin && <CostManagerModal
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
      onUpdateRevenue={updateRevenue}
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
function ModalActions({ saving, disabled, onClose, label }: any) {
  return <div className="gvo-modal-actions"><button type="button" className="gva-btn secondary" onClick={onClose}>Hủy</button><button className="gva-btn" disabled={saving || disabled}>{saving ? "Đang lưu…" : label}</button></div>;
}

function CostManagerModal({ booking, bookingName, revenue, total, bookingCosts, guideAssignments, guideMap, saving, onAdd, onUpdateCost, onDeleteCost, onUpdateGuideFee, onUpdateRevenue, onClose }: any) {
  if (!booking) return null;
  const profit = Number(revenue || 0) - Number(total || 0);
  return <ModalFrame title="Tài chính booking" onClose={onClose}>
    <div className="gvo-cost-summary">
      <div><span>Booking</span><b>{booking.booking_code || "—"}</b><small>{bookingName(booking)}</small></div>
      <div><span>Thu</span><b>{money(revenue)}</b></div>
      <div><span>Chi hiện tại</span><b>{money(total)}</b></div>
      <div className={profit < 0 ? "loss" : ""}><span>Lãi gộp</span><b>{money(profit)}</b></div>
    </div>

    <div className="gvo-cost-section revenue">
      <h3>Điều chỉnh tiền thu của tour</h3>
      <p>Khách đổi lịch trình, số khách hoặc dịch vụ thì cập nhật tiền thu tại đây. Hệ thống giữ lịch sử thay đổi trong Activity Log.</p>
      <RevenueEditor bookingId={booking.id} revenue={revenue} saving={saving} onSave={onUpdateRevenue} />
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

function RevenueEditor({ bookingId, revenue, saving, onSave }: any) {
  const [amount, setAmount] = useState(String(revenue || 0));
  useEffect(() => setAmount(String(revenue || 0)), [revenue]);
  return <div className="gvo-revenue-editor">
    <div><span>Tiền thu hiện tại</span><b>{money(revenue)}</b></div>
    <input className="gva-input gvo-money-input" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} />
    <button type="button" className="gvo-save-revenue" disabled={saving} onClick={() => onSave(bookingId, numberOnly(amount))}>Lưu tiền thu</button>
  </div>;
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

function QuickBookingModal({ booking, received, saving, onClose, onSubmit, onOpenRequirements }: any) {
  const [deposit, setDeposit] = useState(String(booking.deposit_required_vnd || 0));
  return <ModalFrame title={`Sửa nhanh · ${booking.booking_code || "Booking"}`} onClose={onClose}><form onSubmit={onSubmit} className="gvo-form-grid">
    <Field label="Khách sạn"><input name="hotel" className="gva-input" defaultValue={booking.hotel || ""} placeholder="Tên khách sạn" /></Field>
    <Field label="Pickup time"><input name="pickup_time" type="time" className="gva-input" defaultValue={timeShort(booking.pickup_time || booking.start_time) === "—" ? "" : timeShort(booking.pickup_time || booking.start_time)} /></Field>
    <Field label="Địa chỉ khách sạn" wide><input name="hotel_address" className="gva-input" defaultValue={booking.hotel_address || ""} placeholder="Địa chỉ / vị trí đón" /></Field>
    <Field label="Deposit required / Cọc yêu cầu"><input name="deposit" className="gva-input" inputMode="numeric" value={deposit} onChange={(e) => setDeposit(e.target.value)} /></Field>
    <Field label="Actual received / Đã nhận"><input className="gva-input" readOnly value={money(received)} /></Field>
    <Field label="Balance / Còn lại" wide><input className="gva-input" readOnly value={money(Math.max(0, Number(booking.net_revenue_vnd ?? booking.gross_revenue_vnd ?? 0) - Number(received || 0)))} /></Field>
    <div className="gvo-field wide"><button type="button" className="gva-btn secondary" onClick={onOpenRequirements}>⚙ Yêu cầu điều phối (HDV / xe)</button></div>
    <ModalActions saving={saving} onClose={onClose} label="Lưu cập nhật" />
  </form></ModalFrame>;
}

function BookingModal({ tours, sourceBooking, sourceContact, saving, onClose, onSubmit }: {
  tours: Tour[];
  sourceBooking?: Booking | null;
  sourceContact?: Contact | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const isDuplicate = !!sourceBooking;
  const reuseContact = !!sourceBooking?.contact_id;
  const [mode, setMode] = useState<"catalog" | "custom">(sourceBooking?.booking_mode === "custom" ? "custom" : "catalog");
  const [revenue, setRevenue] = useState(sourceBooking ? String(sourceBooking.gross_revenue_vnd ?? 0) : "");
  const [deposit, setDeposit] = useState(sourceBooking ? String(sourceBooking.deposit_required_vnd ?? 0) : "0");
  const balance = Math.max(0, numberOnly(revenue) - numberOnly(deposit));
  const nextTourDate = sourceBooking?.tour_date ? addDays(sourceBooking.tour_date, 1) : localISO();
  return <ModalFrame title={isDuplicate ? `Nhân bản · ${sourceBooking?.booking_code || "Booking"}` : "Tạo booking vận hành"} onClose={onClose}><form onSubmit={onSubmit} className="gvo-form-grid">
    {isDuplicate && <div className="gva-analytics-note" style={{ gridColumn: "1/-1" }}>
      <b>Booking mới cho cùng khách.</b> Thông tin khách được liên kết với hồ sơ cũ. Hãy kiểm tra lại <b>ngày, tour, lịch trình, giá và tiền cọc</b> trước khi lưu.
      Mã booking sẽ được tạo mới; trạng thái mặc định là Nháp. Tiền đã nhận, chi phí, HDV và nhà xe <b>không</b> sao chép.
    </div>}
    <Field label="Loại booking" wide><div className="gvo-mode-switch">
      <label><input type="radio" name="booking_mode" value="catalog" checked={mode === "catalog"} onChange={() => setMode("catalog")} /> Tour GoVietStay</label>
      <label><input type="radio" name="booking_mode" value="custom" checked={mode === "custom"} onChange={() => setMode("custom")} /> Tour nhập thủ công</label>
    </div></Field>
    <Field label="Tên khách"><input name="full_name" className="gva-input" defaultValue={sourceContact?.full_name || ""} readOnly={reuseContact} required={!reuseContact} placeholder={reuseContact && !sourceContact ? "Hồ sơ khách đã liên kết" : undefined} /></Field>
    <Field label="WhatsApp / Phone"><input name="whatsapp" className="gva-input" defaultValue={sourceContact?.whatsapp || ""} readOnly={reuseContact} /></Field>
    <Field label="Quốc gia"><input name="country" className="gva-input" defaultValue={sourceContact?.country || ""} readOnly={reuseContact} /></Field>
    <Field label="Ngôn ngữ khách"><select name="preferred_language" className="gva-select" defaultValue={sourceContact?.preferred_language || ""} disabled={reuseContact}><option value="">—</option>{LANGUAGES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></Field>
    {mode === "catalog" ? <Field label="Tour GoVietStay" wide><select name="tour_id" className="gva-select" defaultValue={sourceBooking?.booking_mode === "catalog" ? sourceBooking.tour_id || "" : ""} required><option value="">Chọn tour</option>{tours.map((t: Tour) => <option key={t.id} value={t.id}>{t.name}{t.destination ? ` · ${t.destination}` : ""}</option>)}</select></Field> : <>
      <Field label="Tên tour thủ công" wide><input name="custom_tour_name" className="gva-input" defaultValue={sourceBooking?.booking_mode === "custom" ? sourceBooking.custom_tour_name || "" : ""} placeholder="Private Marble Mountains + Linh Ung" required /></Field>
      <Field label="Điểm đến"><input name="custom_destination" className="gva-input" defaultValue={sourceBooking?.booking_mode === "custom" ? sourceBooking.custom_destination || "" : ""} placeholder="Da Nang" /></Field>
      <Field label="Lịch trình khách / ngôn ngữ gốc" wide><textarea name="custom_itinerary" className="gva-input" rows={4} defaultValue={sourceBooking?.booking_mode === "custom" ? sourceBooking.custom_itinerary || "" : ""} placeholder="Lịch trình đã xác nhận với khách..." /></Field>
    </>}
    <Field label="Ngày tour"><input name="tour_date" type="date" className="gva-input" defaultValue={isDuplicate ? nextTourDate : localISO()} required /></Field>
    <Field label="Trạng thái"><select name="status" className="gva-select" defaultValue="pending"><option value="pending">Draft / nháp</option><option value="confirmed">Confirmed</option></select></Field>
    <Field label="Giờ bắt đầu"><input name="start_time" type="time" className="gva-input" defaultValue={timeShort(sourceBooking?.start_time || null) === "—" ? "" : timeShort(sourceBooking?.start_time || null)} /></Field>
    <Field label="Giờ kết thúc"><input name="end_time" type="time" className="gva-input" defaultValue={timeShort(sourceBooking?.end_time || null) === "—" ? "" : timeShort(sourceBooking?.end_time || null)} /></Field>
    <Field label="Pickup time"><input name="pickup_time" type="time" className="gva-input" defaultValue={timeShort(sourceBooking?.pickup_time || null) === "—" ? "" : timeShort(sourceBooking?.pickup_time || null)} /></Field>
    <Field label="Khách sạn"><input name="hotel" className="gva-input" defaultValue={sourceBooking?.hotel || ""} placeholder="VD: Mandila Beach Hotel" /></Field>
    <Field label="Địa chỉ khách sạn" wide><input name="hotel_address" className="gva-input" defaultValue={sourceBooking?.hotel_address || ""} placeholder="VD: 218 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng" /></Field>
    <Field label="Số phòng"><input name="room" className="gva-input" defaultValue={sourceBooking?.room || ""} placeholder="Nếu có" /></Field>
    <Field label="Adults"><input name="adults" type="number" min="0" defaultValue={sourceBooking?.adults ?? 1} className="gva-input" /></Field>
    <Field label="Children"><input name="children" type="number" min="0" defaultValue={sourceBooking?.children ?? 0} className="gva-input" /></Field>
    <div className="gvo-field wide"><span>Yêu cầu điều phối</span>
      <label className="gvo-service-option"><input type="checkbox" name="requires_guide" defaultChecked={sourceBooking ? (sourceBooking.requires_guide ?? Boolean(sourceBooking.guide_language)) : true} /> Cần HDV</label>
      <label className="gvo-service-option"><input type="checkbox" name="requires_transport" defaultChecked={sourceBooking ? (sourceBooking.requires_transport ?? false) : true} /> Cần xe & tài xế</label>
    </div>
    <Field label="Ngôn ngữ HDV"><select name="guide_language" className="gva-select" defaultValue={sourceBooking?.guide_language || ""}><option value="">Không cần / chưa xác định</option>{LANGUAGES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></Field>
    <Field label="Giá bán VND"><input name="revenue" inputMode="numeric" className="gva-input" placeholder="3200000" value={revenue} onChange={(e) => setRevenue(e.target.value)} required /></Field>
    <Field label="Deposit required / Cọc yêu cầu"><input name="deposit" inputMode="numeric" className="gva-input" placeholder="0" value={deposit} onChange={(e) => setDeposit(e.target.value)} /></Field>
    <Field label="Balance after deposit paid / Còn sau khi cọc" wide><input className="gva-input" value={money(balance)} readOnly /></Field>
    <Field label="Ghi chú" wide><textarea name="notes" className="gva-input" rows={3} defaultValue={sourceBooking?.notes || ""} /></Field>
    <div className="gva-field wide">
      <details style={{ border: "1px solid #cbd5e1", borderRadius: 12, padding: "12px 14px", background: "#f8fafc" }}>
        <summary style={{ cursor: "pointer", fontWeight: 700, color: "#175cd3" }}>🇻🇳 + Thêm lịch trình tiếng Việt (nếu cần)</summary>
        <p className="gva-mini" style={{ margin: "9px 0" }}>Tùy chọn cho tour riêng hoặc lịch trình phức tạp. Tour ghép hằng ngày có thể bỏ qua.</p>
        <textarea name="internal_itinerary_vi" className="gva-input" rows={8} defaultValue={sourceBooking?.internal_itinerary_vi || ""} placeholder={"08:00 Đón khách\n09:00 Tham quan..."} />
      </details>
    </div>
    <ModalActions saving={saving} onClose={onClose} label={isDuplicate ? "Lưu booking mới" : "Lưu booking"} />
  </form></ModalFrame>;
}
