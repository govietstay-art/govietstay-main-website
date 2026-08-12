"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./VladPage.module.css";

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
const managerWhatsApp =
  "https://wa.me/84769541635?text=" +
  encodeURIComponent("Здравствуйте, Влад! Я перешёл по вашей официальной ссылке GoVietStay и хочу получить консультацию.");

const formatVnd = (value: number) => `${new Intl.NumberFormat("vi-VN").format(Math.max(0, value))} VND`;

function Logo() {
  return (
    <div className={cx("brand")} aria-label="GoVietStay">
      <span className={cx("brand-mark")}>GVS</span>
      <span><strong>GoVietStay</strong><small>Надёжная местная поддержка</small></span>
    </div>
  );
}

export default function VladOfficialPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingResult, setBookingResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [region, setRegion] = useState(tours[0].region);
  const [tourId, setTourId] = useState(tours[0].id);
  const [variantId, setVariantId] = useState(tours[0].variants[0].id);
  const [priceMode, setPriceMode] = useState<PriceMode>("auto");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [adultRate, setAdultRate] = useState(tours[0].variants[0].adult);
  const [childRate, setChildRate] = useState(tours[0].variants[0].child);
  const [infantRate, setInfantRate] = useState(tours[0].variants[0].infant);
  const [packageFee, setPackageFee] = useState(tours[0].variants[0].fee);
  const [manualTotal, setManualTotal] = useState(0);
  const [extraFee, setExtraFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deposit, setDeposit] = useState(0);

  const currentTour = useMemo(() => tours.find((tour) => tour.id === tourId) ?? tours[0], [tourId]);
  const currentVariant = useMemo(
    () => currentTour.variants.find((variant) => variant.id === variantId) ?? currentTour.variants[0],
    [currentTour, variantId],
  );
  const visibleTours = tours.filter((tour) => tour.region === region);
  const automaticSubtotal = adults * adultRate + children * childRate + infants * infantRate + packageFee;
  const total = Math.max(0, (priceMode === "manual" ? manualTotal : automaticSubtotal) + extraFee - discount);
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
    setManualTotal(0);
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
    setManualTotal(0);
  }

  function openBooking() {
    setBookingResult("");
    setCopied(false);
    setBookingOpen(true);
  }

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      "ЗАПРОС НА БРОНИРОВАНИЕ • ОЖИДАЕТ ПОДТВЕРЖДЕНИЯ",
      "Менеджер: Влад • GVS-RU-VLAD-01",
      `Регион: ${region}`,
      `Тур: ${currentTour.name}`,
      `Пакет: ${currentVariant.label}`,
      `Дата: ${data.get("date") || "не указана"}`,
      `Гость: ${data.get("guest") || "не указан"}`,
      `WhatsApp: ${data.get("phone") || "не указан"}`,
      `Отель: ${data.get("hotel") || "не указан"}`,
      `Группа: ${adults} взрослых • ${children} детей • ${infants} младенцев`,
      `Расчёт: ${priceMode === "auto" ? "автоматически по тарифам" : "итоговая цена вручную"}`,
      `Доплата: ${formatVnd(extraFee)} • Скидка: ${formatVnd(discount)}`,
      `ИТОГО: ${formatVnd(total)}`,
      `Депозит: ${formatVnd(deposit)}`,
      `Остаток: ${formatVnd(balance)}`,
      `Local Point: ${data.get("localPoint") || "нет"}`,
      `Примечание: ${data.get("note") || "—"}`,
      "",
      "David, пожалуйста, проверьте цену и подтвердите booking.",
    ];
    setBookingResult(lines.join("\n"));
  }

  async function copyBooking() {
    await navigator.clipboard.writeText(bookingResult);
    setCopied(true);
  }

  return (
    <main className={styles.page}>
      <section className={cx("hero")} id="top">
        <header className={cx("site-header")}>
          <div className={cx("container header-inner")}>
            <Logo />
            <div className={cx("header-actions")}>
              <a className={cx("local-point-link")} href="https://govietstay.com/ru/local-point" target="_blank" rel="noreferrer">Local Point</a>
              <span className={cx("language muted-language")}>EN</span>
              <span className={cx("language active-language")}>RU</span>
              <button className={cx("staff-entry")} type="button" onClick={openBooking}>🔒 Сотрудник</button>
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
            <span className={cx("consultant-avatar")}>ВЛ</span>
            <span><small>Ваш официальный консультант</small><strong>Влад ✓</strong></span>
            <span className={cx("consultant-code")}>GVS-RU-VLAD-01</span>
            <a href={managerWhatsApp} target="_blank" rel="noreferrer">Продолжить разговор</a>
          </div>

          <div className={cx("hero-benefits")}>
            <div>✓ Поддержка на русском</div>
            <div>✓ Цена до бронирования</div>
            <div>✓ Индивидуальный гид</div>
            <div>✓ Поддержка 24/7</div>
          </div>

          <a className={cx("local-point-offer")} href="https://govietstay.com/ru/local-point" target="_blank" rel="noreferrer">
            <span>🎁</span><strong>Local Point</strong><small>eSIM, подарки и помощь в первый день во Вьетнаме</small><b>Открыть →</b>
          </a>
        </div>
      </section>

      <section className={cx("directions")} id="directions">
        <div className={cx("container directions-inner")}>
          <div>
            <p className={cx("section-kicker")}>ПОПУЛЯРНЫЕ НАПРАВЛЕНИЯ</p>
            <h2>Выберите маршрут, а Влад поможет подобрать подходящий формат</h2>
          </div>
          <div className={cx("direction-cards official-directions")}>
            <a href="https://govietstay.com/ru" target="_blank" rel="noreferrer"><span>01</span><strong>Дананг и Хойан</strong><p>Ba Na Hills, Золотой мост, Хойан, кокосовая деревня и городской гастротур.</p></a>
            <a href="https://govietstay.com/ru/tours/cham-island" target="_blank" rel="noreferrer"><span>02</span><strong>Острова Чам</strong><p>Скоростной катер, снорклинг, пляж и обед с отправлением из Дананга и Хойана.</p></a>
            <a href="https://govietstay.com/ru/tours/phu-quoc" target="_blank" rel="noreferrer"><span>03</span><strong>Фукуок</strong><p>Южный и Северный остров, морские маршруты, VinWonders и Safari.</p></a>
            <a href="https://govietstay.com/ru" target="_blank" rel="noreferrer"><span>04</span><strong>Императорский Хюэ</strong><p>Цитадель, история династии Нгуен и местная кухня.</p></a>
            <a href="https://govietstay.com/ru" target="_blank" rel="noreferrer"><span>05</span><strong>Нячанг и Камрань</strong><p>Городские и островные экскурсии, трансферы и поддержка на русском языке.</p></a>
            <a href={managerWhatsApp} target="_blank" rel="noreferrer"><span>06</span><strong>Индивидуальный маршрут</strong><p>Напишите Владу даты, состав группы и пожелания — он подготовит варианты.</p></a>
          </div>
        </div>
      </section>

      <section className={cx("official-proof")}>
        <div className={cx("container proof-layout")}>
          <div>
            <p className={cx("section-kicker")}>ОФИЦИАЛЬНЫЙ ПРЕДСТАВИТЕЛЬ</p>
            <h2>Вы общаетесь с Владом от имени GoVietStay</h2>
            <p>Код сотрудника <strong>GVS-RU-VLAD-01</strong> подтверждён GoVietStay. Влад консультирует и оформляет запрос, а окончательную цену и booking подтверждает GoVietStay.</p>
          </div>
          <div className={cx("safety-card")}>
            <strong>Защита клиента</strong>
            <p>Не переводите оплату на личный счёт без официального подтверждения GoVietStay и кода booking.</p>
            <a href={managerWhatsApp} target="_blank" rel="noreferrer">Проверить в WhatsApp →</a>
          </div>
        </div>
      </section>

      <a className={cx("floating-whatsapp")} href={managerWhatsApp} target="_blank" rel="noreferrer"><span>WA</span><strong>WhatsApp • Влад ✓</strong></a>

      {bookingOpen && (
        <div className={cx("modal-backdrop")} role="presentation" onMouseDown={() => setBookingOpen(false)}>
          <section className={cx("booking-modal")} role="dialog" aria-modal="true" aria-labelledby="booking-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className={cx("modal-close")} type="button" aria-label="Закрыть" onClick={() => setBookingOpen(false)}>×</button>
            <div className={cx("modal-heading")}>
              <p className={cx("section-kicker")}>🔒 ВНУТРЕННИЙ ИНСТРУМЕНТ СОТРУДНИКА</p>
              <h2 id="booking-title">Новый booking</h2>
              <p>Этот инструмент помогает Владу подготовить единый запрос для проверки и подтверждения GoVietStay.</p>
            </div>

            {!bookingResult ? (
              <form className={cx("booking-layout")} onSubmit={submitBooking}>
                <div className={cx("booking-fields")}>
                  <fieldset>
                    <legend>1. Клиент</legend>
                    <div className={cx("form-grid two")}>
                      <label>Имя гостя<input name="guest" placeholder="Например: Aleksandra" required /></label>
                      <label>WhatsApp<input name="phone" placeholder="+7 ..." required /></label>
                      <label>Дата тура<input name="date" type="date" /></label>
                      <label>Отель / адрес<input name="hotel" placeholder="Название и адрес" /></label>
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
                    </div>
                    {currentVariant.note && <p className={cx("rate-note")}>{currentVariant.note}</p>}
                  </fieldset>

                  <fieldset>
                    <legend>3. Количество гостей и цена</legend>
                    <label className={cx("mode-select")}>Способ расчёта
                      <select value={priceMode} onChange={(event) => setPriceMode(event.target.value as PriceMode)}>
                        <option value="auto">Автоматически: количество × тариф</option>
                        <option value="manual">Ввести общую цену вручную</option>
                      </select>
                    </label>

                    {priceMode === "auto" ? (
                      <div className={cx("rate-grid")}>
                        <div><strong>Взрослые</strong><input aria-label="Количество взрослых" type="number" min="0" value={adults} onChange={(event) => setAdults(Number(event.target.value))} /><input aria-label="Тариф взрослого" type="number" min="0" value={adultRate} onChange={(event) => setAdultRate(Number(event.target.value))} /><small>{formatVnd(adults * adultRate)}</small></div>
                        <div><strong>Дети</strong><input aria-label="Количество детей" type="number" min="0" value={children} onChange={(event) => setChildren(Number(event.target.value))} /><input aria-label="Тариф ребёнка" type="number" min="0" value={childRate} onChange={(event) => setChildRate(Number(event.target.value))} /><small>{formatVnd(children * childRate)}</small></div>
                        <div><strong>Младенцы</strong><input aria-label="Количество младенцев" type="number" min="0" value={infants} onChange={(event) => setInfants(Number(event.target.value))} /><input aria-label="Тариф младенца" type="number" min="0" value={infantRate} onChange={(event) => setInfantRate(Number(event.target.value))} /><small>{formatVnd(infants * infantRate)}</small></div>
                      </div>
                    ) : (
                      <label>Общая цена, VND<input type="number" min="0" value={manualTotal} onChange={(event) => setManualTotal(Number(event.target.value))} /></label>
                    )}

                    <div className={cx("form-grid three compact-grid")}>
                      <label>Доплата<input type="number" min="0" value={extraFee} onChange={(event) => setExtraFee(Number(event.target.value))} /></label>
                      <label>Скидка<input type="number" min="0" value={discount} onChange={(event) => setDiscount(Number(event.target.value))} /></label>
                      <label>Депозит<input type="number" min="0" value={deposit} onChange={(event) => setDeposit(Number(event.target.value))} /></label>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend>4. Дополнительные данные</legend>
                    <div className={cx("form-grid two")}>
                      <label>Local Point
                        <select name="localPoint"><option>Нет</option><option>eSIM 30 дней</option><option>Lucky Wheel</option><option>Подарок партнёра</option></select>
                      </label>
                      <label>Язык поддержки<select name="language"><option>Русский</option><option>English</option><option>Без гида</option></select></label>
                      <label className={cx("wide")}>Примечание<textarea name="note" rows={3} placeholder="Возраст и рост детей, время посадки, особые пожелания" /></label>
                    </div>
                  </fieldset>
                </div>

                <aside className={cx("booking-summary")}>
                  <span className={cx("summary-status")}>Автоматический расчёт</span>
                  <h3>{currentTour.name}</h3>
                  <p>{currentVariant.label}</p>
                  <div className={cx("summary-line")}><span>Гости</span><strong>{adults + children + infants}</strong></div>
                  <div className={cx("summary-line")}><span>Цена / пакет</span><strong>{formatVnd(priceMode === "manual" ? manualTotal : automaticSubtotal)}</strong></div>
                  <div className={cx("summary-line")}><span>Доплата</span><strong>{formatVnd(extraFee)}</strong></div>
                  <div className={cx("summary-line")}><span>Скидка</span><strong>− {formatVnd(discount)}</strong></div>
                  <div className={cx("summary-total")}><span>ИТОГО</span><strong>{formatVnd(total)}</strong></div>
                  <div className={cx("summary-line")}><span>Депозит</span><strong>{formatVnd(deposit)}</strong></div>
                  <div className={cx("summary-balance")}><span>Остаток</span><strong>{formatVnd(balance)}</strong></div>
                  <p className={cx("summary-warning")}>Перед отправкой проверьте тариф, детские условия и дополнительные услуги по актуальному прайсу GoVietStay.</p>
                  <button className={cx("button yellow full")} type="submit">Создать запрос для David</button>
                </aside>
              </form>
            ) : (
              <div className={cx("booking-result")}>
                <span className={cx("pending-status")}>Ожидает подтверждения David</span>
                <pre>{bookingResult}</pre>
                <p>После проверки цены David присвоит официальный код. Только этот код подтверждает booking для клиента.</p>
                <div className={cx("result-actions")}>
                  <button className={cx("button yellow")} type="button" onClick={copyBooking}>{copied ? "Скопировано" : "Скопировать для David"}</button>
                  <button className={cx("button dark-outline")} type="button" onClick={() => setBookingResult("")}>Изменить</button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
