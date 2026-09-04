"use client";

// govietstay-tommy-v1-fast-mobile-booking

import { FormEvent, useMemo, useState } from "react";
import styles from "./TommyPage.module.css";
import { submitStaffBookingRequest } from "../../../lib/staffBookingClient";

const cx = (names: string) => names.split(" ").map((name) => styles[name]).filter(Boolean).join(" ");

type PriceMode = "auto" | "manual";

type Variant = {
  id: string;
  label: string;
  adult: number;
  child: number;
  infant: number;
  fee: number;
  mode?: PriceMode;
  note?: string;
};

type Tour = {
  id: string;
  region: string;
  name: string;
  variants: Variant[];
};

const tours: Tour[] = [
  {
    id: "cham-island",
    region: "Дананг и Хойан",
    name: "Острова Чам",
    variants: [
      { id: "cham-group-en", label: "Групповой тур • English", adult: 950000, child: 750000, infant: 0, fee: 0 },
      { id: "cham-private-en", label: "Частный тур • English", adult: 1350000, child: 1050000, infant: 0, fee: 0 },
      { id: "cham-ru", label: "Групповой тур • русский гид", adult: 950000, child: 750000, infant: 0, fee: 500000, note: "+500 000 VND за русскоязычного гида" },
    ],
  },
  {
    id: "ba-na-hills",
    region: "Дананг и Хойан",
    name: "Ba Na Hills и Золотой мост",
    variants: [
      { id: "bana-standard", label: "Стандартный групповой тур", adult: 1550000, child: 0, infant: 0, fee: 0, note: "Детский тариф вводится по росту и возрасту" },
      { id: "bana-ru", label: "Тур с русскоязычным гидом", adult: 1550000, child: 0, infant: 0, fee: 500000, note: "Детский тариф вводится вручную" },
      { id: "bana-custom", label: "Частный / индивидуальный расчёт", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" },
    ],
  },
  {
    id: "hoi-an-coconut",
    region: "Дананг и Хойан",
    name: "Хойан + кокосовая деревня",
    variants: [
      { id: "hoian-standard", label: "Стандартный групповой тур", adult: 1250000, child: 0, infant: 0, fee: 0, note: "Детский тариф вводится вручную" },
      { id: "hoian-ru", label: "Тур с русскоязычным гидом", adult: 1250000, child: 0, infant: 0, fee: 500000 },
      { id: "hoian-private", label: "Частный / индивидуальный расчёт", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" },
    ],
  },
  {
    id: "marble-sontra",
    region: "Дананг и Хойан",
    name: "Мраморные горы + полуостров Сон Тра",
    variants: [{ id: "marble-custom", label: "Индивидуальный расчёт", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" }],
  },
  {
    id: "hai-van",
    region: "Дананг и Хойан",
    name: "Перевал Хайван + Лангко",
    variants: [{ id: "haivan-custom", label: "Индивидуальный расчёт", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" }],
  },
  {
    id: "food-tour",
    region: "Дананг и Хойан",
    name: "Гастрономический тур по Данангу",
    variants: [{ id: "food-custom", label: "Индивидуальный расчёт", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" }],
  },
  {
    id: "han-cruise",
    region: "Дананг и Хойан",
    name: "Круиз по реке Хан",
    variants: [{ id: "han-custom", label: "Билет / индивидуальный расчёт", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" }],
  },
  {
    id: "hue-city",
    region: "Хюэ",
    name: "Императорский город Хюэ",
    variants: [
      { id: "hue-standard", label: "Стандартный групповой тур", adult: 1450000, child: 0, infant: 0, fee: 0, note: "Детский тариф вводится вручную" },
      { id: "hue-ru", label: "Тур с русскоязычным гидом", adult: 1450000, child: 0, infant: 0, fee: 500000 },
      { id: "hue-private", label: "Частный / индивидуальный расчёт", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" },
    ],
  },
  {
    id: "phu-quoc-south",
    region: "Фукуок",
    name: "Южный Фукуок + канатная дорога",
    variants: [{ id: "pqs-custom", label: "Выбрать цену вручную", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" }],
  },
  {
    id: "phu-quoc-north",
    region: "Фукуок",
    name: "Северный Фукуок",
    variants: [{ id: "pqn-custom", label: "Выбрать цену вручную", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" }],
  },
  {
    id: "phu-quoc-islands",
    region: "Фукуок",
    name: "3–4 острова на скоростном катере",
    variants: [{ id: "pqi-custom", label: "Выбрать цену вручную", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" }],
  },
  {
    id: "phu-quoc-vin",
    region: "Фукуок",
    name: "VinWonders + Safari Фукуок",
    variants: [{ id: "pqv-custom", label: "Билет / пакет — вручную", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" }],
  },
  {
    id: "nha-trang-city",
    region: "Нячанг и Камрань",
    name: "Обзорный тур по Нячангу",
    variants: [{ id: "ntc-custom", label: "Индивидуальный расчёт", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" }],
  },
  {
    id: "nha-trang-islands",
    region: "Нячанг и Камрань",
    name: "Островной тур из Нячанга",
    variants: [{ id: "nti-custom", label: "Индивидуальный расчёт", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" }],
  },
  {
    id: "vinwonders-nha-trang",
    region: "Нячанг и Камрань",
    name: "VinWonders Нячанг",
    variants: [{ id: "ntv-custom", label: "Билет / трансфер — вручную", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" }],
  },
  {
    id: "transfer-danang",
    region: "Трансферы",
    name: "Аэропорт Дананг ↔ отель",
    variants: [{ id: "dad-transfer", label: "Цена за автомобиль", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" }],
  },
  {
    id: "transfer-hoian",
    region: "Трансферы",
    name: "Дананг ↔ Хойан",
    variants: [{ id: "hoian-transfer", label: "Цена за автомобиль", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" }],
  },
  {
    id: "transfer-hue",
    region: "Трансферы",
    name: "Дананг ↔ Хюэ",
    variants: [{ id: "hue-transfer", label: "Цена за автомобиль", adult: 0, child: 0, infant: 0, fee: 0, mode: "manual" }],
  },
];

const regions = Array.from(new Set(tours.map((tour) => tour.region)));
const regionNamesEnglish: Record<string, string> = {
  "Дананг и Хойан": "Da Nang & Hoi An",
  "Хюэ": "Hue",
  "Фукуок": "Phu Quoc",
  "Нячанг и Камрань": "Nha Trang & Cam Ranh",
  "Трансферы": "Transfers",
};

const tourNamesEnglish: Record<string, string> = {
  "cham-island": "Cham Island",
  "ba-na-hills": "Ba Na Hills & Golden Bridge",
  "hoi-an-coconut": "Hoi An & Coconut Village",
  "marble-sontra": "Marble Mountains & Son Tra Peninsula",
  "hai-van": "Hai Van Pass & Lang Co",
  "food-tour": "Da Nang Food Tour",
  "han-cruise": "Han River Cruise",
  "hue-city": "Hue Imperial City",
  "phu-quoc-south": "South Phu Quoc & Cable Car",
  "phu-quoc-north": "North Phu Quoc",
  "phu-quoc-islands": "3–4 Islands by Speedboat",
  "phu-quoc-vin": "VinWonders & Safari Phu Quoc",
  "nha-trang-city": "Nha Trang City Tour",
  "nha-trang-islands": "Nha Trang Island Tour",
  "vinwonders-nha-trang": "VinWonders Nha Trang",
  "transfer-danang": "Da Nang Airport ↔ Hotel",
  "transfer-hoian": "Da Nang ↔ Hoi An Transfer",
  "transfer-hue": "Da Nang ↔ Hue Transfer",
};

const variantNamesEnglish: Record<string, string> = {
  "cham-group-en": "Group tour • English guide",
  "cham-private-en": "Private tour • English guide",
  "cham-ru": "Group tour • Russian-speaking guide",
  "bana-standard": "Standard group tour",
  "bana-ru": "Tour with Russian-speaking guide",
  "bana-custom": "Private/custom quote",
  "hoian-standard": "Standard group tour",
  "hoian-ru": "Tour with Russian-speaking guide",
  "hoian-private": "Private/custom quote",
  "marble-custom": "Custom quote",
  "haivan-custom": "Custom quote",
  "food-custom": "Custom quote",
  "han-custom": "Ticket/custom quote",
  "hue-standard": "Standard group tour",
  "hue-ru": "Tour with Russian-speaking guide",
  "hue-private": "Private/custom quote",
  "pqs-custom": "Manual quote",
  "pqn-custom": "Manual quote",
  "pqi-custom": "Manual quote",
  "pqv-custom": "Ticket/package • manual quote",
  "ntc-custom": "Custom quote",
  "nti-custom": "Custom quote",
  "ntv-custom": "Ticket/transfer • manual quote",
  "dad-transfer": "Price per vehicle",
  "hoian-transfer": "Price per vehicle",
  "hue-transfer": "Price per vehicle",
};

const managerWhatsApp =
  "https://wa.me/79842654169?text=" +
  encodeURIComponent("Здравствуйте, Tommy! Я перешёл по вашей официальной ссылке GoVietStay и хочу получить консультацию.");

const formatVnd = (value: number) => `${new Intl.NumberFormat("vi-VN").format(Math.max(0, value))} VND`;
const formatNumberInput = (value: number) => value > 0 ? new Intl.NumberFormat("vi-VN").format(value) : "";
const parseNumericInput = (value: string) => Number(value.replace(/\D/g, "")) || 0;

function formatTourDate(value: FormDataEntryValue | null) {
  const date = String(value || "");
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  return match ? `${match[3]}.${match[2]}.${match[1]}` : date || "—";
}

function createBookingId() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const read = (type: string) => parts.find((part) => part.type === type)?.value ?? "00";
  return `GVS-TOMMY-${read("year")}${read("month")}${read("day")}-${read("hour")}${read("minute")}-${Math.random().toString(36).slice(2,5).toUpperCase()}`;
}

function GuestCounter({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <div className={cx("guest-counter")}>
      <strong>{label}</strong>
      <div className={cx("counter-controls")}>
        <button type="button" aria-label={`Уменьшить: ${label}`} onClick={() => onChange(Math.max(0, value - 1))}>−</button>
        <input
          aria-label={label}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value > 0 ? String(value) : ""}
          placeholder="0"
          onFocus={(event) => event.currentTarget.select()}
          onChange={(event) => onChange(Math.min(99, parseNumericInput(event.target.value)))}
        />
        <button type="button" aria-label={`Увеличить: ${label}`} onClick={() => onChange(Math.min(99, value + 1))}>+</button>
      </div>
    </div>
  );
}

function MoneyField({ label, value, onChange, className = "" }: { label: string; value: number; onChange: (value: number) => void; className?: string }) {
  return (
    <label className={className}>
      {label}
      <input
        type="text"
        inputMode="numeric"
        value={formatNumberInput(value)}
        placeholder="0"
        onFocus={(event) => event.currentTarget.select()}
        onChange={(event) => onChange(parseNumericInput(event.target.value))}
      />
    </label>
  );
}

function Logo() {
  return (
    <a className={cx("brand")} href="/ru" aria-label="GoVietStay">
      <img className={cx("brand-logo")} src="/tommy/govietstay-logo.jpg" alt="Логотип GoVietStay" />
      <span><strong>GoVietStay</strong><small>Надёжная местная поддержка</small></span>
    </a>
  );
}

export default function TommyOfficialPage() {
  const [pinOpen, setPinOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingResult, setBookingResult] = useState("");
  const [customerConfirmation, setCustomerConfirmation] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [copied, setCopied] = useState(false);
  const [customerCopied, setCustomerCopied] = useState(false);
  const [region, setRegion] = useState(tours[0].region);
  const [tourId, setTourId] = useState(tours[0].id);
  const [variantId, setVariantId] = useState(tours[0].variants[0].id);
  const [priceMode, setPriceMode] = useState<PriceMode>("auto");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [adultRate, setAdultRate] = useState(tours[0].variants[0].adult);
  const [childRate, setChildRate] = useState(tours[0].variants[0].child);
  const [infantRate, setInfantRate] = useState(tours[0].variants[0].infant);
  const [packageFee, setPackageFee] = useState(tours[0].variants[0].fee);
  const [manualPaxRate, setManualPaxRate] = useState(0);
  const [extraFee, setExtraFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deposit, setDeposit] = useState(0);

  const currentTour = useMemo(() => tours.find((tour) => tour.id === tourId) ?? tours[0], [tourId]);
  const currentVariant = useMemo(
    () => currentTour.variants.find((variant) => variant.id === variantId) ?? currentTour.variants[0],
    [currentTour, variantId],
  );
  const visibleTours = tours.filter((tour) => tour.region === region);
  const payingPax = adults + children;
  const automaticSubtotal = adults * adultRate + children * childRate + infants * infantRate + packageFee;
  const manualSubtotal = manualPaxRate * payingPax;
  const total = Math.max(0, (priceMode === "manual" ? manualSubtotal : automaticSubtotal) + extraFee - discount);
  const balance = Math.max(0, total - deposit);

  function applyTour(nextTour: Tour) {
    const variant = nextTour.variants[0];
    setTourId(nextTour.id);
    setVariantId(variant.id);
    setPriceMode(variant.mode ?? "auto");
    setAdultRate(variant.adult);
    setChildRate(variant.child);
    setInfantRate(variant.infant);
    setPackageFee(variant.fee);
    setManualPaxRate(0);
  }

  function changeRegion(nextRegion: string) {
    setRegion(nextRegion);
    const firstTour = tours.find((tour) => tour.region === nextRegion);
    if (firstTour) applyTour(firstTour);
  }

  function changeVariant(nextVariantId: string) {
    const variant = currentTour.variants.find((item) => item.id === nextVariantId) ?? currentTour.variants[0];
    setVariantId(variant.id);
    setPriceMode(variant.mode ?? "auto");
    setAdultRate(variant.adult);
    setChildRate(variant.child);
    setInfantRate(variant.infant);
    setPackageFee(variant.fee);
    setManualPaxRate(0);
  }

  function openBooking() {
    setBookingResult("");
    setCustomerConfirmation("");
    setBookingError("");
    setCopied(false);
    setCustomerCopied(false);
    setBookingOpen(true);
  }

  function openManagerAccess() {
    setPin("");
    setPinError("");
    setPinOpen(true);
  }

  function submitPin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pin === "8888") {
      setPinOpen(false);
      openBooking();
      return;
    }
    setPinError("Неверный PIN. Попробуйте ещё раз.");
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const guestCount = adults + children + infants;
    if (guestCount < 1) {
      setBookingError("Укажите хотя бы одного гостя / Please enter at least 1 guest.");
      return;
    }
    if (total <= 0) {
      setBookingError("Укажите стоимость тура / Please enter the tour price.");
      return;
    }
    if (deposit > total) {
      setBookingError("Депозит не может быть больше общей суммы / Deposit cannot exceed the total price.");
      return;
    }

    const bookingId = createBookingId();
    const regionEnglish = regionNamesEnglish[region] ?? region;
    const tourEnglish = tourNamesEnglish[currentTour.id] ?? currentTour.name;
    const variantEnglish = variantNamesEnglish[currentVariant.id] ?? currentVariant.label;
    const localPoint = String(data.get("localPoint") || "No / Нет");
    const language = String(data.get("language") || "Russian / Русский");
    const note = String(data.get("note") || "").trim() || "—";
    const guestName = String(data.get("guest") || "—");
    const tourDate = formatTourDate(data.get("date"));
    const pickupTime = String(data.get("pickupTime") || "—");
    const hotel = String(data.get("hotel") || "—");
    const customerLanguage = language.startsWith("Russian")
      ? "Русский"
      : language.startsWith("English")
        ? "English"
        : "Без гида";
    const customerGuestSummary = [
      adults > 0 ? `${adults} взр.` : "",
      children > 0 ? `${children} дет.` : "",
      infants > 0 ? `${infants} млад.` : "",
    ].filter(Boolean).join(" • ");
    const lines = [
      "🟢 GOVIETSTAY — BOOKING REQUEST / ЗАПРОС НА БРОНИРОВАНИЕ",
      "Trusted Local Support | Da Nang • Hoi An • Hue",
      "",
      `🔖 Booking ID / Номер бронирования:\n${bookingId}`,
      "",
      `📅 Tour Date / Дата тура:\n${tourDate}`,
      "",
      `🏝️ Tour Name / Название тура:\n${tourEnglish} / ${currentTour.name}`,
      "",
      `📦 Package / Пакет:\n${variantEnglish} / ${currentVariant.label}`,
      "",
      `📍 Region / Регион:\n${regionEnglish} / ${region}`,
      "",
      `👥 Number of Guests / Количество гостей:\nAdults / Взрослые: ${adults} • Children / Дети: ${children} • Infants / Младенцы: ${infants} • Total / Всего: ${guestCount}`,
      "",
      `💳 Price Calculation / Расчёт цены:\n${priceMode === "manual" ? `${formatVnd(manualPaxRate)} × ${payingPax} pax = ${formatVnd(manualSubtotal)}` : "Automatic by guest category / Автоматически по категориям гостей"}`,
      "",
      `💰 Total Tour Price / Полная стоимость тура:\n${formatVnd(total)}`,
      "",
      `💵 Deposit Received / Полученный депозит:\n${formatVnd(deposit)}`,
      "",
      `💵 Remaining Payment to Tour Guide / Остаток оплаты гиду:\n${formatVnd(balance)}`,
      "",
      `➕ Surcharge / Доплата: ${formatVnd(extraFee)}\n➖ Discount / Скидка: ${formatVnd(discount)}`,
      "",
      `⏰ Pick-up Time / Время выезда:\n${pickupTime}`,
      "",
      `👤 Guest Name / Имя гостя:\n${guestName}`,
      "",
      `📞 Contact Number / WhatsApp:\n${data.get("phone") || "—"}`,
      "",
      `🏨 Pick-up Location or Hotel / Место встречи или отель:\n${hotel}`,
      "",
      `🗣️ Service Language / Язык обслуживания:\n${language}`,
      "",
      `🎁 Local Point:\n${localPoint}`,
      "",
      `📝 Notes / Примечания:\n${note}`,
      "",
      "👤 Booking Consultant / Консультант: Tommy • GVS-RU-TOMMY-02",
      "📌 Status / Статус: Pending confirmation from David / Ожидает подтверждения Дэвида",
      "",
      "Thank you for choosing GoVietStay 💚 / Спасибо за выбор GoVietStay!",
      "WhatsApp: +84 93 776 2607",
      "Website: GoVietStay.com",
    ];
    const message = lines.join("\n");
    const customerLines = [
      `Здравствуйте, ${guestName}!`,
      "",
      "✅ ПОДТВЕРЖДЕНИЕ БРОНИРОВАНИЯ GOVIETSTAY",
      `№ ${bookingId}`,
      "",
      `🏝 Тур: ${currentTour.name}`,
      `📦 Пакет: ${currentVariant.label}`,
      `📅 Дата: ${tourDate}`,
      `⏰ Выезд: ${pickupTime}`,
      `🏨 Место встречи: ${hotel}`,
      `👥 Гости: ${customerGuestSummary}`,
      `🗣 Язык: ${customerLanguage}`,
      "",
      `💰 Стоимость: ${formatVnd(total)}`,
      `💵 Депозит: ${formatVnd(deposit)}`,
      `💵 Остаток гиду: ${formatVnd(balance)}`,
      ...(note !== "—" ? ["", `📝 Примечание: ${note}`] : []),
      "",
      "Пожалуйста, проверьте данные. Если всё верно, ответьте: «Подтверждаю».",
      "",
      "Tommy • GoVietStay 💚",
    ];
    try {
      await submitStaffBookingRequest({
        sales_code: "GVS-RU-TOMMY-02",
        booking_code: bookingId,
        guest_name: String(data.get("guest") || ""),
        phone: String(data.get("phone") || ""),
        tour_date: String(data.get("date") || ""),
        pickup_time: String(data.get("pickupTime") || ""),
        hotel: String(data.get("hotel") || ""),
        region,
        tour_slug: currentTour.id,
        tour_name: tourEnglish,
        variant_id: currentVariant.id,
        variant_name: variantEnglish,
        language,
        adults, children, infants,
        gross_revenue_vnd: total + discount,
        discount_vnd: discount,
        deposit_vnd: deposit,
        notes: note + "\nLocal Point: " + localPoint,
      });
    } catch (e: any) {
      setBookingError("Не удалось сохранить booking в Admin. Проверьте интернет и попробуйте ещё раз. " + (e?.message || ""));
      return;
    }
    const whatsAppUrl = `https://wa.me/84937762607?text=${encodeURIComponent(message)}`;
    setBookingError("");
    setCopied(false);
    setCustomerCopied(false);
    setBookingResult(message);
    setCustomerConfirmation(customerLines.join("\n"));

    if (window.matchMedia("(max-width: 920px)").matches) {
      window.location.href = whatsAppUrl;
    } else {
      window.open(whatsAppUrl, "_blank", "noopener,noreferrer");
    }
  }

  async function copyBooking() {
    await navigator.clipboard.writeText(bookingResult);
    setCopied(true);
  }

  async function copyCustomerConfirmation() {
    await navigator.clipboard.writeText(customerConfirmation);
    setCustomerCopied(true);
  }

  return (
    <main className={styles.page}>
      <section className={cx("hero")} id="top">
        <header className={cx("site-header")}>
          <div className={cx("container header-inner")}>
            <Logo />
            <div className={cx("header-actions")}>
              <a className={cx("local-point-link")} href="https://www.govietstay.com/ru/local-point" target="_blank" rel="noreferrer">Local Point</a>
              <span className={cx("language muted-language")}>EN</span>
              <span className={cx("language active-language")}>RU</span>
              <button className={cx("staff-entry")} type="button" onClick={openManagerAccess}>🔒 Менеджер</button>
            </div>
          </div>
        </header>

        <div className={cx("container hero-content")}>
          <p className={cx("hero-kicker")}>ЭКСКУРСИИ И ПОДДЕРЖКА НА РУССКОМ ЯЗЫКЕ</p>
          <h1>Путешествуйте по Вьетнаму комфортно и без лишних забот</h1>
          <p className={cx("hero-lead")}>
            Проверенные экскурсии в Дананге, Хойане, Хюэ и Фукуоке, пакетные
            туры из Нячанга и поддержка GoVietStay до и во время поездки.
          </p>

          <div className={cx("hero-actions")}>
            <a className={cx("button yellow")} href="#directions">Выбрать направление</a>
            <a className={cx("button glass")} href={managerWhatsApp} target="_blank" rel="noreferrer">Написать в WhatsApp</a>
          </div>

          <div className={cx("consultant-proof")}>
            <span className={cx("consultant-avatar consultant-photo")}>
              <img src="/tommy/tommy-whatsapp-profile.png" alt="Tommy" />
            </span>
            <span><small>Ваш официальный консультант</small><strong>Tommy ✓</strong></span>
            <span className={cx("consultant-code")}>GVS-RU-TOMMY-02</span>
            <a href={managerWhatsApp} target="_blank" rel="noreferrer">Продолжить разговор</a>
          </div>

          <div className={cx("hero-benefits")}>
            <div>✓ Поддержка на русском</div>
            <div>✓ Цена до бронирования</div>
            <div>✓ Индивидуальный гид</div>
            <div>✓ Поддержка 24/7</div>
          </div>

          <a className={cx("local-point-offer")} href="https://www.govietstay.com/ru/local-point" target="_blank" rel="noreferrer">
            <span>🎁</span><strong>Local Point</strong><small>eSIM, подарки и помощь в первый день во Вьетнаме</small><b>Открыть →</b>
          </a>
        </div>
      </section>

      <section className={cx("directions")} id="directions">
        <div className={cx("container directions-inner")}>
          <div>
            <p className={cx("section-kicker")}>ПОПУЛЯРНЫЕ НАПРАВЛЕНИЯ</p>
            <h2>Выберите маршрут, а Tommy поможет подобрать подходящий формат</h2>
          </div>
          <div className={cx("direction-cards official-directions")}>
            <a href="https://www.govietstay.com/ru" target="_blank" rel="noreferrer"><span>01</span><strong>Дананг и Хойан</strong><p>Ba Na Hills, Золотой мост, Хойан, кокосовая деревня и городской гастротур.</p></a>
            <a href="https://www.govietstay.com/ru/tours/cham-island" target="_blank" rel="noreferrer"><span>02</span><strong>Острова Чам</strong><p>Скоростной катер, снорклинг, пляж и обед с отправлением из Дананга и Хойана.</p></a>
            <a href="https://www.govietstay.com/ru/tours/phu-quoc" target="_blank" rel="noreferrer"><span>03</span><strong>Фукуок</strong><p>Южный и Северный остров, морские маршруты, VinWonders и Safari.</p></a>
            <a href="https://www.govietstay.com/ru" target="_blank" rel="noreferrer"><span>04</span><strong>Императорский Хюэ</strong><p>Цитадель, история династии Нгуен и местная кухня.</p></a>
            <a href="https://www.govietstay.com/ru" target="_blank" rel="noreferrer"><span>05</span><strong>Нячанг и Камрань</strong><p>Городские и островные экскурсии, трансферы и поддержка на русском языке.</p></a>
            <a href={managerWhatsApp} target="_blank" rel="noreferrer"><span>06</span><strong>Индивидуальный маршрут</strong><p>Напишите Tommy: укажите даты, состав группы и пожелания — он подготовит варианты.</p></a>
          </div>
        </div>
      </section>

      <section className={cx("official-proof")}>
        <div className={cx("container proof-layout")}>
          <div>
            <p className={cx("section-kicker")}>ОФИЦИАЛЬНЫЙ ПРЕДСТАВИТЕЛЬ</p>
            <h2>Вы общаетесь с Tommy от имени GoVietStay</h2>
            <p>Код менеджера <strong>GVS-RU-TOMMY-02</strong> подтверждён GoVietStay. Tommy консультирует и оформляет запрос, а окончательную цену и booking подтверждает GoVietStay.</p>
          </div>
          <div className={cx("safety-card")}>
            <strong>Защита клиента</strong>
            <p>Не переводите оплату на личный счёт без официального подтверждения GoVietStay и кода booking.</p>
            <a href={managerWhatsApp} target="_blank" rel="noreferrer">Проверить в WhatsApp →</a>
          </div>
        </div>
      </section>

      <a className={cx("floating-whatsapp")} href={managerWhatsApp} target="_blank" rel="noreferrer"><span>WA</span><strong>WhatsApp • Tommy ✓</strong></a>

      {pinOpen && (
        <div className={cx("pin-backdrop")} role="presentation" onMouseDown={() => setPinOpen(false)}>
          <section className={cx("pin-modal")} role="dialog" aria-modal="true" aria-labelledby="pin-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className={cx("modal-close")} type="button" aria-label="Закрыть" onClick={() => setPinOpen(false)}>×</button>
            <img className={cx("pin-logo")} src="/tommy/govietstay-logo.jpg" alt="GoVietStay" />
            <p className={cx("section-kicker")}>ДОСТУП ДЛЯ МЕНЕДЖЕРА</p>
            <h2 id="pin-title">Введите PIN</h2>
            <p>Внутренний инструмент бронирования GoVietStay.</p>
            <form onSubmit={submitPin}>
              <label>PIN менеджера
                <input autoFocus type="password" inputMode="numeric" maxLength={4} value={pin} onChange={(event) => { setPin(event.target.value); setPinError(""); }} placeholder="••••" />
              </label>
              {pinError && <span className={cx("pin-error")}>{pinError}</span>}
              <button className={cx("button yellow full")} type="submit">Открыть booking</button>
            </form>
          </section>
        </div>
      )}

      {bookingOpen && (
        <div className={cx("modal-backdrop")} role="presentation" onMouseDown={() => setBookingOpen(false)}>
          <section className={cx("booking-modal")} role="dialog" aria-modal="true" aria-labelledby="booking-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className={cx("modal-close")} type="button" aria-label="Закрыть" onClick={() => setBookingOpen(false)}>×</button>
            <div className={cx("modal-heading")}>
              <p className={cx("section-kicker")}>🔒 ВНУТРЕННИЙ ИНСТРУМЕНТ МЕНЕДЖЕРА</p>
              <h2 id="booking-title">Быстрый booking</h2>
              <p>Заполните основные данные и отправьте готовый запрос David прямо в WhatsApp.</p>
            </div>

            {(
              <form className={cx("booking-layout")} onSubmit={submitBooking}>
                <div className={cx("booking-fields")}>
                  <fieldset>
                    <legend>1. Клиент</legend>
                    <div className={cx("form-grid two")}>
                      <label>Имя гостя<input name="guest" autoComplete="name" placeholder="Например: Aleksandra" required /></label>
                      <label>WhatsApp<input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 ..." required /></label>
                      <label>Дата тура<input name="date" type="date" required /></label>
                      <label>Время выезда<input name="pickupTime" type="time" required /></label>
                      <label className={cx("wide")}>Отель / место встречи<input name="hotel" autoComplete="street-address" placeholder="Название отеля или адрес" required /></label>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend>2. Маршрут и пакет</legend>
                    <div className={cx("form-grid two")}>
                      <label>Регион
                        <select value={region} onChange={(event) => changeRegion(event.target.value)}>{regions.map((item) => <option key={item}>{item}</option>)}</select>
                      </label>
                      <label>Тур / трансфер
                        <select value={tourId} onChange={(event) => applyTour(tours.find((tour) => tour.id === event.target.value) ?? tours[0])}>
                          {visibleTours.map((tour) => <option value={tour.id} key={tour.id}>{tour.name}</option>)}
                        </select>
                      </label>
                      <label className={cx("wide")}>Пакет / язык
                        <select value={variantId} onChange={(event) => changeVariant(event.target.value)}>{currentTour.variants.map((variant) => <option value={variant.id} key={variant.id}>{variant.label}</option>)}</select>
                      </label>
                      <label className={cx("wide")}>Язык обслуживания
                        <select name="language">
                          <option value="Russian / Русский">Русский</option>
                          <option value="English / Английский">English</option>
                          <option value="No guide / Без гида">Без гида</option>
                        </select>
                      </label>
                    </div>
                    {currentVariant.note && <p className={cx("rate-note")}>{currentVariant.note}</p>}
                  </fieldset>

                  <fieldset>
                    <legend>3. Количество гостей и цена</legend>
                    <label className={cx("mode-select")}>Способ расчёта
                      <select value={priceMode} onChange={(event) => setPriceMode(event.target.value as PriceMode)}>
                        <option value="auto">Автоматически: количество × тариф</option>
                        <option value="manual">Ввести цену за 1 pax</option>
                      </select>
                    </label>

                    <div className={cx("guest-grid")}>
                      <GuestCounter label="Взрослые" value={adults} onChange={setAdults} />
                      <GuestCounter label="Дети" value={children} onChange={setChildren} />
                      <GuestCounter label="Младенцы" value={infants} onChange={setInfants} />
                    </div>
                    <p className={cx("guest-total")}>Всего гостей: <strong>{adults + children + infants}</strong></p>

                    {priceMode === "auto" ? (
                      <details className={cx("rate-details")}>
                        <summary>Изменить тарифы (необязательно)</summary>
                        <div className={cx("rate-grid")}>
                          <MoneyField label={`Тариф взрослого • ${formatVnd(adults * adultRate)}`} value={adultRate} onChange={setAdultRate} />
                          <MoneyField label={`Тариф ребёнка • ${formatVnd(children * childRate)}`} value={childRate} onChange={setChildRate} />
                          <MoneyField label={`Тариф младенца • ${formatVnd(infants * infantRate)}`} value={infantRate} onChange={setInfantRate} />
                        </div>
                      </details>
                    ) : (
                      <div className={cx("manual-price-box")}>
                        <MoneyField label="Цена за 1 pax, VND" value={manualPaxRate} onChange={setManualPaxRate} className={cx("manual-total")} />
                        <p>{formatVnd(manualPaxRate)} × {payingPax} pax = <strong>{formatVnd(manualSubtotal)}</strong></p>
                        {infants > 0 && <small>Младенцы не включены в платные pax.</small>}
                      </div>
                    )}

                    <div className={cx("form-grid three compact-grid")}>
                      <MoneyField label="Доплата" value={extraFee} onChange={setExtraFee} />
                      <MoneyField label="Скидка" value={discount} onChange={setDiscount} />
                      <MoneyField label="Депозит" value={deposit} onChange={setDeposit} />
                    </div>
                  </fieldset>

                  <details className={cx("optional-details")}>
                    <summary>＋ Дополнительные данные (необязательно)</summary>
                    <div className={cx("form-grid two")}>
                      <label>Local Point
                        <select name="localPoint">
                          <option value="No / Нет">Нет</option>
                          <option value="30-day eSIM / eSIM на 30 дней">eSIM 30 дней</option>
                          <option value="Lucky Wheel / Колесо подарков">Lucky Wheel</option>
                          <option value="Partner gift / Подарок партнёра">Подарок партнёра</option>
                        </select>
                      </label>
                      <label>Примечание<textarea name="note" rows={3} placeholder="Возраст/рост детей или особые пожелания" /></label>
                    </div>
                  </details>
                </div>

                <aside className={cx("booking-summary")}>
                  <span className={cx("summary-status")}>{priceMode === "manual" ? "Цена 1 pax × количество pax" : "Автоматический расчёт"}</span>
                  <div className={cx("summary-detail")}>
                    <h3>{currentTour.name}</h3>
                    <p>{currentVariant.label}</p>
                    <div className={cx("summary-line")}><span>Гости</span><strong>{adults + children + infants}</strong></div>
                    <div className={cx("summary-line")}><span>{priceMode === "manual" ? "Цена 1 pax" : "Цена / пакет"}</span><strong>{formatVnd(priceMode === "manual" ? manualPaxRate : automaticSubtotal)}</strong></div>
                    <div className={cx("summary-line")}><span>Доплата</span><strong>{formatVnd(extraFee)}</strong></div>
                    <div className={cx("summary-line")}><span>Скидка</span><strong>− {formatVnd(discount)}</strong></div>
                  </div>
                  <div className={cx("summary-total")}><span>ИТОГО</span><strong>{formatVnd(total)}</strong></div>
                  <div className={cx("summary-detail")}><div className={cx("summary-line")}><span>Депозит</span><strong>{formatVnd(deposit)}</strong></div></div>
                  <div className={cx("summary-balance")}><span>Остаток</span><strong>{formatVnd(balance)}</strong></div>
                  <p className={cx("summary-warning")}>Перед отправкой проверьте тариф, детские условия и дополнительные услуги по актуальному прайсу GoVietStay.</p>
                  {bookingError && <p className={cx("booking-error")}>{bookingError}</p>}
                  {bookingResult && <p className={cx("whatsapp-ready")}>✓ Booking сохранён в Admin. WhatsApp открыт — проверьте сообщение и нажмите Send.</p>}
                  <button className={cx("button yellow full whatsapp-submit")} type="submit">Сохранить в Admin + отправить David</button>
                  {bookingResult && <button className={cx("copy-fallback")} type="button" onClick={copyBooking}>{copied ? "✓ Скопировано" : "Скопировать booking"}</button>}
                  {customerConfirmation && <p className={cx("customer-step")}>После подтверждения David:</p>}
                  {customerConfirmation && <button className={cx("customer-copy")} type="button" onClick={copyCustomerConfirmation}>{customerCopied ? "✓ Подтверждение скопировано" : "Копировать подтверждение клиенту"}</button>}
                </aside>
              </form>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
