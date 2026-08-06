"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./PartnerLandingPage.module.css";

const WHATSAPP_NUMBER = "84937762607";
const TOUR_URL = "https://www.govietstay.com/ru/tours/cham-island";
const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic";
const COMMISSION = 150_000;
const PARTNER_CODE_KEY = "gvsPartnerCode";

const benefits = [
  { icon: "₫", title: "150 000 VND за взрослого гостя", text: "Комиссия начисляется после завершения экскурсии." },
  { icon: "0", title: "Без вложений", text: "Участие бесплатно. Нужны только телефон, интернет и желание консультировать." },
  { icon: "RU", title: "Готовый продукт на русском", text: "Цена, маршрут, FAQ, фотографии и стандартная форма бронирования уже подготовлены." },
  { icon: "VN", title: "Работа из любой точки Вьетнама", text: "Вы консультируете онлайн, а GoVietStay полностью организует тур." },
];

const steps = [
  ["01", "Оставьте заявку", "Заполните короткую форму за одну минуту."],
  ["02", "Получите код", "После проверки GoVietStay активирует ваш партнёрский код."],
  ["03", "Консультируйте туриста", "Вы отвечаете на вопросы и помогаете выбрать дату."],
  ["04", "Отправьте Booking Form", "Передайте готовое бронирование в стандартном формате."],
  ["05", "Получите комиссию", "После завершения тура комиссия выплачивается в течение 24–48 часов."],
];

const reviews = [
  { name: "Наталья", quote: "Добрый вечер, всё прошло замечательно 💯 Отдельное спасибо Анне 🌸", image: "/partner/reviews/natalia-whatsapp.jpg" },
  { name: "Екатерина", quote: "Здравствуйте, да, всё прошло хорошо.", image: "/partner/reviews/ekaterina-whatsapp.jpg" },
  { name: "Гость GoVietStay", quote: "Всё было отлично. Спасибо вам большое за такую хорошую экскурсию.", image: "/partner/reviews/guest-whatsapp.jpg" },
];

function money(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

function safeCode(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 28);
}

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
      name: String(form.get("name") || "").trim(),
      country: String(form.get("country") || "").trim(),
      city: String(form.get("city") || "").trim(),
      contact: String(form.get("contact") || "").trim(),
      social: String(form.get("social") || "").trim(),
      experience: String(form.get("experience") || "").trim(),
      audience: String(form.get("audience") || "").trim(),
      source: "ru-partner-recruitment-v2",
    };

    const whatsappWindow = window.open("about:blank", "_blank");

    try {
      const response = await fetch("/api/partner/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result?.ok || !result?.partnerCode) throw new Error("Application failed");

      const partnerCode = safeCode(result.partnerCode);
      window.localStorage.setItem(PARTNER_CODE_KEY, partnerCode);
      setCode(partnerCode);
      setStatus("success");
      formElement.reset();

      const message = [
        "ЗАЯВКА В ПАРТНЁРСКУЮ ПРОГРАММУ GOVIETSTAY",
        "",
        `Предварительный код: ${partnerCode}`,
        `Имя: ${payload.name}`,
        `Страна: ${payload.country}`,
        `Город во Вьетнаме: ${payload.city}`,
        `WhatsApp / Telegram: ${payload.contact}`,
        `Instagram / Facebook: ${payload.social || "не указано"}`,
        `Опыт: ${payload.experience || "не указано"}`,
        `Аудитория: ${payload.audience || "не указано"}`,
        "",
        "Я хочу консультировать туристов и оформлять бронирования для GoVietStay.",
      ].join("\n");
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      if (whatsappWindow) whatsappWindow.location.href = url;
      else window.location.href = url;
    } catch {
      if (whatsappWindow) whatsappWindow.close();
      setStatus("error");
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/ru" aria-label="GoVietStay">
          <img src="/partner/govietstay-logo.jpeg" alt="GoVietStay" />
          <span><strong>GoVietStay</strong><small>Partner Network · Vietnam</small></span>
        </a>
        <nav>
          <a href="#income">Доход</a>
          <a href="#trust">Отзывы</a>
          <a href="#apply" className={styles.headerCta}>Стать партнёром</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>Пилотная программа · Cham Island</span>
          <h1>Зарабатывайте на экскурсиях, <em>работая онлайн</em></h1>
          <p>Вы самостоятельно консультируете русскоязычных туристов и оформляете бронирование. GoVietStay предоставляет готовый продукт и полностью организует поездку.</p>
          <div className={styles.heroIncome}><strong>150 000 VND</strong><span>за каждого взрослого гостя</span></div>
          <div className={styles.heroActions}>
            <a href="#apply" className={styles.primary}>Стать партнёром бесплатно</a>
            <a href={TOUR_URL} target="_blank" rel="noreferrer" className={styles.secondary}>Посмотреть тур ↗</a>
          </div>
          <div className={styles.heroProof}><span>Без вложений</span><span>Работа из любой точки Вьетнама</span><span>Готовые материалы</span></div>
        </div>
        <div className={styles.heroVisual}>
          <img src="/partner/cham.jpg" alt="Cham Island" />
          <div className={styles.floatCard}><small>Пример дохода</small><strong>10 гостей = 1 500 000 VND</strong></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}><span>Почему это удобно</span><h2>Вы продаёте. GoVietStay организует.</h2><p>Участнику не нужно создавать тур, искать поставщиков или заниматься операционной работой в день поездки.</p></div>
        <div className={styles.benefitGrid}>{benefits.map((item) => <article key={item.title}><div>{item.icon}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className={styles.incomeSection} id="income">
        <div><span className={styles.eyebrow}>Калькулятор дохода</span><h2>Проверьте потенциал за 10 секунд</h2><p>Передвигайте ползунок и смотрите ориентировочную комиссию.</p><label>Взрослых гостей в месяц: <strong>{guestCount}</strong></label><input type="range" min="1" max="30" value={guestCount} onChange={(event) => setGuestCount(Number(event.target.value))} /></div>
        <div className={styles.incomeResult}><small>Ваш ориентировочный доход</small><strong>{money(estimatedIncome)} VND</strong><span>{guestCount} × 150 000 VND</span></div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}><span>Как это работает</span><h2>Пять понятных шагов</h2></div>
        <div className={styles.steps}>{steps.map(([number, title, text]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className={styles.trustSection} id="trust">
        <div className={styles.trustIntro}><span className={styles.eyebrow}>Доказательства доверия</span><h2>Вам легче продавать, потому что туристы уже доверяют GoVietStay</h2><p>Реальные отзывы помогают партнёру не убеждать клиента с нуля, а показывать подтверждённый опыт других туристов.</p><a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">Смотреть все отзывы в Google ↗</a></div>
        <div className={styles.reviewGrid}>{reviews.map((review) => <article key={review.name}><img src={review.image} alt={`Отзыв ${review.name}`} /><div><strong>{review.name}</strong><p>“{review.quote}”</p><small>Реальный отзыв клиента GoVietStay</small></div></article>)}</div>
      </section>

      <section className={styles.applySection} id="apply">
        <div className={styles.applyIntro}><span className={styles.eyebrow}>Регистрация</span><h2>Начните с короткой заявки</h2><p>После проверки GoVietStay свяжется с вами, подтвердит условия и активирует партнёрский код.</p><ul><li>Участие бесплатно</li><li>Без фиксированного графика</li><li>Официальная цена и материалы</li><li>Комиссия после завершения тура</li></ul></div>
        <form className={styles.form} onSubmit={submitApplication}>
          <div className={styles.formTitle}><strong>Заявка партнёра</strong><span>≈ 1 минута</span></div>
          <label>Имя и фамилия *<input name="name" required /></label>
          <div className={styles.formRow}><label>Страна *<input name="country" required /></label><label>Город во Вьетнаме *<input name="city" required /></label></div>
          <label>WhatsApp или Telegram *<input name="contact" required /></label>
          <label>Instagram / Facebook<input name="social" /></label>
          <label>Опыт консультаций<textarea name="experience" rows={2} placeholder="Кратко: продажи, туризм, работа с туристами..." /></label>
          <label>С какой аудиторией вы общаетесь?<textarea name="audience" rows={2} placeholder="Туристы, подписчики, гости отеля, знакомые..." /></label>
          <label className={styles.agree}><input type="checkbox" required /> Я буду использовать только официальные цены и информацию GoVietStay.</label>
          <button disabled={status === "sending"}>{status === "sending" ? "Отправляем..." : "Отправить заявку"}</button>
          {status === "success" && <div className={styles.success}><strong>Заявка отправлена.</strong><span>Предварительный код: {code}. Отправьте открывшееся сообщение в WhatsApp.</span></div>}
          {status === "error" && <div className={styles.error}>Не удалось отправить заявку. Проверьте интернет и попробуйте снова.</div>}
        </form>
      </section>

      <footer className={styles.footer}><div><img src="/partner/govietstay-logo.jpeg" alt="GoVietStay" /><span><strong>GoVietStay Partner Network</strong><small>Trusted Local Support in Vietnam</small></span></div><nav><a href="https://www.govietstay.com/ru">Русский сайт</a><a href={`https://wa.me/${WHATSAPP_NUMBER}`}>WhatsApp</a><a href="https://t.me/GoVietStay">Telegram</a></nav></footer>
      <a href="#apply" className={styles.mobileCta}>Стать партнёром бесплатно</a>
    </main>
  );
}
