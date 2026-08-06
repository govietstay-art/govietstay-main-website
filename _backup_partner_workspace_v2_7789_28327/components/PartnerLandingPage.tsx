"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./PartnerLandingPage.module.css";

const WHATSAPP_NUMBER = "84937762607";
const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic";
const TOUR_URL = "https://www.govietstay.com/ru/tours/cham-island";
const COMMISSION_PER_ADULT = 150_000;
const PARTNER_CODE_KEY = "gvsPartnerCode";

const benefits = [
  { icon: "₫", title: "150 000 VND за взрослого гостя", text: "Комиссия начисляется после завершения экскурсии и выплачивается в течение 24–48 часов." },
  { icon: "RU", title: "Продажи полностью на русском языке", text: "Вы консультируете туриста, оформляете бронирование и передаёте готовые данные GoVietStay." },
  { icon: "KIT", title: "Готовый комплект для продаж", text: "Маршрут, цены, FAQ, тексты, фотографии, отзывы и стандартная форма бронирования уже подготовлены." },
  { icon: "VN", title: "Работа из любой точки Вьетнама", text: "Без офиса, вступительного взноса и фиксированного графика. Нужны только телефон и интернет." },
];

const steps = [
  { number: "01", title: "Заявка за 1 минуту", text: "Оставьте имя и контакт. Система создаст предварительный партнёрский код." },
  { number: "02", title: "Доступ к Partner Hub", text: "Получите персональную ссылку на материалы и инструменты по туру Cham Island." },
  { number: "03", title: "Консультация туриста", text: "Вы самостоятельно отвечаете на вопросы и собираете точные данные бронирования." },
  { number: "04", title: "Передача бронирования", text: "Заполните стандартную форму. GoVietStay проверит места, трансфер и подтвердит тур." },
  { number: "05", title: "Комиссия", text: "После завершения тура получите 150 000 VND за каждого взрослого гостя." },
];

const reviews = [
  { name: "Наталья", quote: "Добрый вечер, всё прошло замечательно 💯 Отдельное спасибо Анне 🌸", image: "/partner/reviews/natalia-whatsapp.jpg" },
  { name: "Екатерина", quote: "Здравствуйте, да, всё прошло хорошо.", image: "/partner/reviews/ekaterina-whatsapp.jpg" },
  { name: "Гость GoVietStay", quote: "Всё было отлично. Спасибо вам большое за такую хорошую экскурсию.", image: "/partner/reviews/guest-whatsapp.jpg" },
];

const faq = [
  { q: "Нужно ли платить за участие?", a: "Нет. Регистрация и участие в пилотной программе бесплатны." },
  { q: "Что делает партнёр?", a: "Партнёр ищет туристов, консультирует их, собирает полные данные и передаёт готовое бронирование GoVietStay." },
  { q: "Кто организует экскурсию?", a: "GoVietStay подтверждает места, организует трансфер, лодку, питание и сопровождение в день тура." },
  { q: "Как фиксируется мой клиент?", a: "Каждому партнёру присваивается код. Код указывается в форме бронирования и персональной ссылке." },
  { q: "Когда выплачивается комиссия?", a: "После завершения экскурсии. Обычный срок выплаты — 24–48 часов." },
  { q: "Можно ли менять цену?", a: "Нет. Используйте только актуальную цену, опубликованную или письменно подтверждённую GoVietStay." },
];

function money(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

function safeCode(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 28);
}

export default function PartnerLandingPage() {
  const [guestCount, setGuestCount] = useState(10);
  const [partnerCode, setPartnerCode] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const estimatedIncome = useMemo(() => guestCount * COMMISSION_PER_ADULT, [guestCount]);

  useEffect(() => {
    const saved = safeCode(window.localStorage.getItem(PARTNER_CODE_KEY) || "");
    if (saved) setPartnerCode(saved);
  }, []);

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setStatusMessage("");

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
      source: "ru-partner-landing",
    };

    const whatsappWindow = window.open("about:blank", "_blank");

    try {
      const response = await fetch("/api/partner/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result?.ok || !result?.partnerCode) throw new Error(result?.error || "Application failed");

      const code = safeCode(result.partnerCode);
      window.localStorage.setItem(PARTNER_CODE_KEY, code);
      setPartnerCode(code);
      setStatus("success");
      setStatusMessage("Заявка подготовлена. Сохраните код и отправьте сообщение GoVietStay для активации.");
      formElement.reset();

      const message = [
        "ЗАЯВКА В ПАРТНЁРСКУЮ ПРОГРАММУ GOVIETSTAY",
        "",
        `Предварительный код: ${code}`,
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
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      if (whatsappWindow) whatsappWindow.location.href = whatsappUrl;
      else window.location.href = whatsappUrl;
    } catch (error) {
      if (whatsappWindow) whatsappWindow.close();
      setStatus("error");
      setStatusMessage("Не удалось отправить форму. Проверьте интернет и попробуйте снова.");
    }
  }

  const hubLink = partnerCode ? `/ru/partner/cham-island?code=${encodeURIComponent(partnerCode)}` : "/ru/partner/cham-island";

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="/ru" aria-label="GoVietStay">
          <img src="/partner/govietstay-logo.jpeg" alt="GoVietStay" />
          <span><strong>GoVietStay</strong><small>Partner Network · Vietnam</small></span>
        </a>
        <nav className={styles.nav} aria-label="Навигация">
          <a href="#income">Доход</a><a href="#trust">Отзывы</a><a href="#process">Система</a>
          {partnerCode ? <a href={hubLink} className={styles.navHub}>Partner Hub</a> : <a href="#apply" className={styles.navCta}>Стать партнёром</a>}
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroBackdrop} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.pill}>Level 2 · Пилотная программа Cham Island</div>
          <h1>Создайте дополнительный доход,<span> продавая экскурсии онлайн</span></h1>
          <p className={styles.heroLead}>Вы консультируете русскоязычных туристов и оформляете бронирование. GoVietStay предоставляет готовый продукт и полностью организует поездку.</p>
          <div className={styles.heroIncome}><strong>150 000 VND</strong><span>за каждого взрослого гостя, завершившего тур</span></div>
          <div className={styles.heroActions}>
            {partnerCode ? <a href={hubLink} className={styles.primaryButton}>Открыть мой Partner Hub</a> : <a href="#apply" className={styles.primaryButton}>Стать партнёром бесплатно</a>}
            <a href={TOUR_URL} target="_blank" rel="noreferrer" className={styles.secondaryButton}>Посмотреть тур ↗</a>
          </div>
          <div className={styles.trustStrip}><span>✓ Без вложений</span><span>✓ Готовые материалы</span><span>✓ Реальные отзывы</span><span>✓ Персональный код</span></div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.photoFrame}><img src="/partner/cham.jpg" alt="Острова Чам" /><div className={styles.photoBadge}><span>Стартовый продукт</span><strong>Cham Island</strong></div></div>
          <div className={styles.floatingCard}><span>Пример</span><strong>10 гостей = 1 500 000 VND</strong><small>дополнительного дохода</small></div>
        </div>
      </section>

      {partnerCode && (
        <section className={styles.memberBanner}>
          <div><span>Ваш предварительный партнёрский код</span><strong>{partnerCode}</strong></div>
          <a href={hubLink}>Перейти в Partner Hub →</a>
        </section>
      )}

      <section className={styles.section}>
        <div className={styles.sectionHeading}><span className={styles.eyebrow}>Почему это работает</span><h2>Вам не нужно создавать продукт с нуля</h2><p>GoVietStay даёт готовый тур, доказательства доверия и инструменты. Вы сосредотачиваетесь на консультации и продаже.</p></div>
        <div className={styles.benefitGrid}>{benefits.map((item) => <article className={styles.benefitCard} key={item.title}><div className={styles.benefitIcon}>{item.icon}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.incomeSection}`} id="income">
        <div className={styles.incomePanel}><div><span className={styles.eyebrow}>Калькулятор дохода</span><h2>Сколько вы можете заработать?</h2><p>Расчёт основан на комиссии 150 000 VND за взрослого гостя.</p><label className={styles.rangeLabel} htmlFor="guestCount">Гостей в месяц: <strong>{guestCount}</strong></label><input id="guestCount" type="range" min="1" max="30" value={guestCount} onChange={(event) => setGuestCount(Number(event.target.value))} className={styles.range} /><div className={styles.rangeTicks}><span>1</span><span>10</span><span>20</span><span>30</span></div></div><div className={styles.incomeResult}><span>Ваш ориентировочный доход</span><strong>{money(estimatedIncome)} VND</strong><small>при {guestCount} взрослых гостях</small><a href="#apply">Начать бесплатно</a></div></div>
      </section>

      <section className={styles.section} id="trust">
        <div className={styles.sectionHeading}><span className={styles.eyebrow}>Доверие продаёт</span><h2>Туристы уже выбирают GoVietStay</h2><p>Партнёру легче консультировать, когда продукт подтверждён реальными отзывами и фотографиями гостей.</p></div>
        <div className={styles.reviewGrid}>{reviews.map((review) => <article className={styles.reviewCard} key={review.name}><div className={styles.reviewStars}>★★★★★</div><blockquote>“{review.quote}”</blockquote><div className={styles.reviewFooter}><div><strong>{review.name}</strong><span>Реальный отзыв клиента</span></div><a href={review.image} target="_blank" rel="noreferrer">Открыть оригинал</a></div></article>)}</div>
        <div className={styles.googleBox}><div className={styles.googleMark}>G</div><div><strong>Google Reviews GoVietStay</strong><span>Посмотрите публичные отзывы перед началом продаж.</span></div><a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">Смотреть все отзывы ↗</a></div>
      </section>

      <section className={styles.section} id="process">
        <div className={styles.sectionHeading}><span className={styles.eyebrow}>Level 2 System</span><h2>От заявки до комиссии — один понятный процесс</h2><p>Персональный код, Partner Hub и стандартная форма бронирования уменьшают ошибки и споры.</p></div>
        <div className={styles.timeline}>{steps.map((step) => <article className={styles.timelineItem} key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </section>

      <section className={styles.section}>
        <div className={styles.levelTwoGrid}>
          <article><span>01</span><h3>Персональный код</h3><p>Код фиксируется в каждой заявке и бронировании.</p></article>
          <article><span>02</span><h3>Partner Hub</h3><p>В одном месте: сценарий продаж, ссылки, FAQ и booking form.</p></article>
          <article><span>03</span><h3>Реферальная ссылка</h3><p>Создайте ссылку на Cham Island с вашим кодом и отправьте туристу.</p></article>
          <article><span>04</span><h3>Стандартное бронирование</h3><p>Все данные передаются GoVietStay в одинаковом формате.</p></article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.faqSection}`}>
        <div className={styles.sectionHeading}><span className={styles.eyebrow}>FAQ</span><h2>Ответы перед регистрацией</h2></div>
        <div className={styles.faqList}>{faq.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>
      </section>

      <section className={styles.applySection} id="apply">
        <div className={styles.applyIntro}><span className={styles.eyebrow}>Бесплатная регистрация</span><h2>Получите код и откройте Partner Hub</h2><p>Заполните короткую форму. После отправки система создаст предварительный код, а заявка откроется в WhatsApp для подтверждения GoVietStay.</p><div className={styles.applyPoints}><span>✓ Занимает около 1 минуты</span><span>✓ Не нужны документы на первом этапе</span><span>✓ Без вступительного взноса</span><span>✓ Первый продукт — Cham Island</span></div></div>
        <form className={styles.form} onSubmit={submitApplication}>
          <div className={styles.formHeader}><strong>Заявка партнёра</strong><span>Все обязательные поля отмечены *</span></div>
          <label>Имя и фамилия *<input name="name" required minLength={2} placeholder="Например: Анна Петрова" /></label>
          <div className={styles.formRow}><label>Страна *<input name="country" required placeholder="Россия / Казахстан / Беларусь" /></label><label>Город во Вьетнаме *<input name="city" required placeholder="Дананг / Нячанг / Фукуок" /></label></div>
          <label>WhatsApp или Telegram *<input name="contact" required placeholder="+84... или @username" /></label>
          <label>Instagram / Facebook<input name="social" placeholder="Ссылка или username" /></label>
          <label>Опыт консультации или продаж<textarea name="experience" rows={3} placeholder="Коротко расскажите о себе" /></label>
          <label>С кем вы общаетесь / где можете найти туристов?<textarea name="audience" rows={3} placeholder="Сообщества, знакомые, отель, блог, клиенты..." /></label>
          <label className={styles.checkboxLabel}><input type="checkbox" required /><span>Я согласен использовать официальные цены GoVietStay и не обещать клиенту услуги, которых нет в программе.</span></label>
          <button type="submit" className={`${styles.primaryButton} ${styles.submitButton}`} disabled={status === "sending"}>{status === "sending" ? "Отправляем..." : "Получить партнёрский код"}</button>
          {statusMessage && <div className={status === "success" ? styles.formSuccess : styles.formError}>{statusMessage}{partnerCode && <><strong>{partnerCode}</strong><a href={hubLink}>Открыть Partner Hub</a></>}</div>}
          <small>После отправки WhatsApp откроется с готовой заявкой. Это необходимо для ручного подтверждения партнёра.</small>
        </form>
      </section>

      <footer className={styles.footer}><div className={styles.footerBrand}><img src="/partner/govietstay-logo.jpeg" alt="GoVietStay" /><div><strong>GoVietStay Partner Network</strong><span>Trusted Local Support · Vietnam</span></div></div><div className={styles.footerLinks}><a href="https://www.govietstay.com/ru">GoVietStay.com/ru</a><a href={TOUR_URL}>Cham Island</a><a href={`https://wa.me/${WHATSAPP_NUMBER}`}>WhatsApp</a><a href="https://t.me/GoVietStay">Telegram</a></div></footer>
      {!partnerCode && <a href="#apply" className={styles.mobileCta}>Стать партнёром бесплатно</a>}
      {partnerCode && <a href={hubLink} className={styles.mobileCta}>Открыть Partner Hub · {partnerCode}</a>}
    </main>
  );
}
