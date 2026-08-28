"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./PartnerLandingPage.module.css";

const WHATSAPP_NUMBER = "84937762607";
const TOUR_URL = "https://www.govietstay.com/ru/tours/cham-island";
const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic";
const COMMISSION = 150_000;
const PARTNER_CODE_KEY = "gvsPartnerCode";

const benefits = [
  ["01", "Вы находите туриста", "Приводите гостя в GoVietStay любым удобным способом: онлайн или лично."],
  ["02", "Все туры считаются вместе", "Онлайн- и офлайн-бронирования фиксируются по одному партнёрскому коду."],
  ["03", "Базовая зарплата за месяц", "Количество завершённых туров за месяц определяет уровень базовой зарплаты."],
  ["04", "Комиссия за каждого гостя", "Дополнительно начисляется комиссия за каждого гостя по туру и языку гида."],
];

const commissionRows = [
  ["Ba Na Hills", "30 000 / 40 000 / 50 000", "80 000 / 100 000 / 120 000"],
  ["Cham Island", "60 000 / 80 000 / 100 000", "60 000 / 80 000 / 100 000"],
  ["Rừng Dừa — Hội An", "80 000 / 100 000 / 120 000", "80 000 / 100 000 / 120 000"],
  ["Hoi An Memory", "120 000 / 150 000 / 170 000", "60 000 / 80 000 / 100 000"],
  ["Huế City Tour", "120 000 / 150 000 / 170 000", "120 000 / 150 000 / 170 000"],
  ["Linh Ứng — Marble — Hội An", "120 000 / 150 000 / 170 000", "40 000 / 50 000 / 60 000"],
];

const salaryRows = [
  ["1–9 туров", "0 VND"], ["10–19 туров", "0 VND"], ["20–29 туров", "2 000 000 VND"],
  ["30–39 туров", "3 000 000 VND"], ["40–50 туров", "4 000 000 VND"], ["Более 50 туров", "5 000 000 VND"],
];

const steps = [
  ["01", "Оставьте заявку", "Расскажите, где вы живёте и с какой аудиторией общаетесь."],
  ["02", "Получите материалы", "Мы отправим актуальные цены, маршруты, FAQ и правила работы."],
  ["03", "Консультируйте туриста", "Вы самостоятельно находите и консультируете гостя онлайн или лично."],
  ["04", "Передайте booking", "Каждый подтверждённый тур фиксируется по вашему партнёрскому коду."],
  ["05", "Получите доход", "В конце месяца считаются туры, гости, базовая зарплата и комиссия."],
];

const reviews = [
  { name: "Наталья", quote: "Добрый вечер, всё прошло замечательно 💯 Отдельное спасибо Анне 🌸", image: "/partner/reviews/natalia-whatsapp.jpg" },
  { name: "Екатерина", quote: "Здравствуйте, да, всё прошло хорошо.", image: "/partner/reviews/ekaterina-whatsapp.jpg" },
  { name: "Гость GoVietStay", quote: "Всё было отлично. Спасибо вам большое за такую хорошую экскурсию.", image: "/partner/reviews/guest-whatsapp.jpg" },
];

function money(value: number) { return new Intl.NumberFormat("ru-RU").format(value); }
function safeCode(value: string) { return value.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 28); }

export default function PartnerLandingPage() {
  const [guestCount, setGuestCount] = useState(10);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [code, setCode] = useState("");
  const estimatedIncome = useMemo(() => guestCount * COMMISSION, [guestCount]);

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") || "").trim(), country: String(form.get("country") || "").trim(),
      city: String(form.get("city") || "").trim(), contact: String(form.get("contact") || "").trim(),
      social: String(form.get("social") || "").trim(), monthlyTours: String(form.get("monthlyTours") || "").trim(),
      experience: String(form.get("experience") || "").trim(), audience: String(form.get("audience") || "").trim(),
      source: "ru-partner-recruitment-v4",
    };
    const whatsappWindow = window.open("about:blank", "_blank");
    try {
      const response = await fetch("/api/partner/application", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok || !result?.ok || !result?.partnerCode) throw new Error("Application failed");
      const partnerCode = safeCode(result.partnerCode);
      window.localStorage.setItem(PARTNER_CODE_KEY, partnerCode);
      setCode(partnerCode); setStatus("success"); formElement.reset();
      const message = [
        "ЗАЯВКА В ПАРТНЁРСКУЮ ПРОГРАММУ GOVIETSTAY", "", "Предварительный код: " + partnerCode,
        "Имя: " + payload.name, "Страна: " + payload.country, "Город во Вьетнаме: " + payload.city,
        "Потенциальные туры в месяц: " + (payload.monthlyTours || "не указано"), "WhatsApp / Telegram: " + payload.contact,
        "Instagram / Facebook: " + (payload.social || "не указано"), "Опыт: " + (payload.experience || "не указано"),
        "Аудитория: " + (payload.audience || "не указано"), "", "Я хочу консультировать туристов и оформлять бронирования для GoVietStay.",
      ].join("\n");
      const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
      if (whatsappWindow) whatsappWindow.location.href = url; else window.location.href = url;
    } catch { if (whatsappWindow) whatsappWindow.close(); setStatus("error"); }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/ru" aria-label="GoVietStay"><img src="/partner/govietstay-logo.jpeg" alt="GoVietStay" /><span><strong>GoVietStay</strong><small>Partner Network · Vietnam</small></span></Link>
        <nav aria-label="Основная навигация"><a href="#model">Модель</a><a href="#commission">Доход</a><a href="#apply" className={styles.headerCta}>Стать партнёром</a></nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>GoVietStay Partner Network · Vietnam</span>
          <h1>Приводите туристов. <em>Доход зависит от результата.</em></h1>
          <p>Не имеет значения, нашли вы гостя онлайн или лично. Все подтверждённые туры суммируются по вашему коду: базовая зарплата зависит от количества туров за месяц, а комиссия — от каждого гостя.</p>
          <div className={styles.heroIncome}><strong>Базовая зарплата + комиссия</strong><span>одна понятная система для всех источников клиентов</span></div>
          <div className={styles.heroActions}><a href="#apply" className={styles.primary}>Подать заявку</a><a href={TOUR_URL} target="_blank" rel="noreferrer" className={styles.secondary}>Посмотреть тур ↗</a></div>
          <div className={styles.heroProof}><span>Online или лично</span><span>Единый партнёрский код</span><span>Đà Nẵng · Hội An · Huế · Phú Quốc</span></div>
        </div>
        <div className={styles.heroVisual}><img src="/partner/cham.jpg" alt="Остров Cham во Вьетнаме" /><div className={styles.floatCard}><small>Пилот Cham Island</small><strong>150 000 VND / взрослый гость</strong><span>пример комиссии за завершённый тур</span></div></div>
      </section>

      <section className={styles.section} id="model"><div className={styles.sectionTitle}><span>Модель сотрудничества</span><h2>Вы находите клиента — GoVietStay организует поездку</h2><p>Вы консультируете и передаёте booking. Мы подтверждаем бронирование, координируем транспорт, гидов и программу. Ваша задача — привести туриста; наша задача — качественно обслужить его.</p></div><div className={styles.benefitGrid}>{benefits.map(([icon, title, text]) => <article key={title}><div>{icon}</div><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className={styles.incomeSection} id="income"><div><span className={styles.eyebrow}>Быстрый ориентир</span><h2>На pilot Cham Island — 150 000 VND за взрослого гостя</h2><p>Это отдельный пример комиссии. Для остальных туров сумма зависит от таблицы ниже, языка гида и общего количества туров за месяц.</p><label>Взрослых гостей в месяц: <strong>{guestCount}</strong></label><input type="range" min="1" max="30" value={guestCount} onChange={(event) => setGuestCount(Number(event.target.value))} aria-label="Количество взрослых гостей в месяц" /></div><div className={styles.incomeResult}><small>Ориентировочная комиссия</small><strong>{money(estimatedIncome)} VND</strong><span>{guestCount} × 150 000 VND</span></div></section>

      <section className={styles.earningsSection} id="commission"><div className={styles.sectionTitle}><span>Главное правило расчёта</span><h2>Не разделяем online и offline</h2><p>В конце месяца складываются все завершённые туры, которые привёл сотрудник или партнёр. По их общему количеству определяется базовая зарплата. Затем добавляется комиссия за каждого гостя каждого тура. В таблице указаны три уровня: 1–9, 10–29 и более 30 туров в месяц.</p></div><div className={styles.earningsGrid}><div className={styles.salaryCard}><h3>Базовая зарплата / месяц</h3><table><thead><tr><th>Туров в месяц</th><th>База</th></tr></thead><tbody>{salaryRows.map(([tour, salary]) => <tr key={tour}><td>{tour}</td><td>{salary}</td></tr>)}</tbody></table></div><div className={styles.commissionCard}><h3>Комиссия / гость / тур</h3><div className={styles.tableScroll}><table><thead><tr><th>Тур</th><th>English guide<br /><small>1–9 / 10–29 / &gt;30</small></th><th>Russian guide<br /><small>1–9 / 10–29 / &gt;30</small></th></tr></thead><tbody>{commissionRows.map(([tour, en, ru]) => <tr key={tour}><td>{tour}</td><td>{en} VND</td><td>{ru} VND</td></tr>)}</tbody></table></div></div></div><div className={styles.example}><strong>Пример:</strong> при 22 завершённых турах базовая зарплата составляет 2 000 000 VND. Если один Hoi An Memory провёл русский гид для 4 гостей, комиссия за этот тур: 4 × 80 000 = 320 000 VND. Итог за месяц = базовая зарплата + сумма комиссий всех гостей и туров.</div></section>

      <section className={styles.section}><div className={styles.sectionTitle}><span>Простой процесс</span><h2>От первого контакта до выплаты</h2></div><div className={styles.steps}>{steps.map(([number, title, text]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className={styles.trustSection} id="trust"><div className={styles.trustIntro}><span className={styles.eyebrow}>Доверие помогает продавать</span><h2>Показывайте туристам реальный опыт гостей</h2><p>Отзывы GoVietStay помогают начать разговор с клиентом и подтвердить качество поддержки на русском языке.</p><a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">Смотреть отзывы в Google ↗</a></div><div className={styles.reviewGrid}>{reviews.map((review) => <article key={review.name}><img src={review.image} alt={"Отзыв " + review.name} /><div><strong>{review.name}</strong><p>“{review.quote}”</p><small>Реальный отзыв клиента GoVietStay</small></div></article>)}</div></section>

      <section className={styles.applySection} id="apply"><div className={styles.applyIntro}><span className={styles.eyebrow}>Регистрация · около 1 минуты</span><h2>Начните с первого туриста</h2><p>После заявки GoVietStay свяжется с вами, подтвердит условия, выдаст код и отправит актуальные материалы для работы.</p><ul><li>Online и offline считаются одинаково</li><li>Все туры суммируются по одному коду</li><li>База зависит от туров за месяц</li><li>Комиссия зависит от гостей и тура</li><li>Выплата после завершения тура</li></ul></div><form className={styles.form} onSubmit={submitApplication}><div className={styles.formTitle}><strong>Заявка партнёра</strong><span>Без обязательств</span></div><label>Имя и фамилия *<input name="name" required autoComplete="name" /></label><div className={styles.formRow}><label>Страна *<input name="country" required autoComplete="country-name" /></label><label>Город во Вьетнаме *<input name="city" required /></label></div><label>WhatsApp или Telegram *<input name="contact" required autoComplete="tel" /></label><label>Instagram / Facebook / ссылка на сообщество<input name="social" /></label><label>Сколько туров вы можете приводить в месяц?<select name="monthlyTours" defaultValue=""><option value="" disabled>Выберите ориентир</option><option>1–9 туров</option><option>10–19 туров</option><option>20–29 туров</option><option>30 туров и больше</option></select></label><label>С какой аудиторией вы общаетесь?<textarea name="audience" rows={2} placeholder="Туристы, подписчики, гости отеля, сообщество, знакомые..." /></label><label>Опыт консультаций или продаж<textarea name="experience" rows={2} placeholder="Туризм, продажи, работа с туристами — кратко..." /></label><label className={styles.agree}><input type="checkbox" required /><span>Я буду использовать только официальные цены и информацию GoVietStay.</span></label><button disabled={status === "sending"}>{status === "sending" ? "Отправляем..." : "Отправить заявку"}</button>{status === "success" && <div className={styles.success}><strong>Заявка отправлена.</strong><span>Предварительный код: {code}. Откройте WhatsApp и отправьте подготовленное сообщение.</span></div>}{status === "error" && <div className={styles.error}>Не удалось отправить заявку. Проверьте интернет и попробуйте ещё раз.</div>}</form></section>

      <footer className={styles.footer}><div><img src="/partner/govietstay-logo.jpeg" alt="GoVietStay" /><span><strong>GoVietStay Partner Network</strong><small>Trusted Local Support in Vietnam</small></span></div><nav><a href="https://www.govietstay.com/ru">Русский сайт</a><a href={"https://wa.me/" + WHATSAPP_NUMBER}>WhatsApp</a><a href="https://t.me/GoVietStay">Telegram</a></nav></footer><a href="#apply" className={styles.mobileCta}>Стать партнёром</a>
    </main>
  );
}
