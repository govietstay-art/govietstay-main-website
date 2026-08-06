"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./PartnerChamHub.module.css";

const WHATSAPP_NUMBER = "84937762607";
const TOUR_URL = "https://www.govietstay.com/ru/tours/cham-island";
const PARTNER_CODE_KEY = "gvsPartnerCode";
const COMMISSION = 150_000;

const consultationScript = `Здравствуйте! Я помогаю с бронированием экскурсии на острова Чам вместе с GoVietStay.\n\nСтоимость для взрослого: 950 000 VND. В программу входят трансфер, скоростной катер, снорклинг, обед и сопровождение.\n\nПодскажите, пожалуйста:\n1. Какую дату вы рассматриваете?\n2. Сколько взрослых и детей?\n3. В каком отеле вы остановились?\n4. Нужны ли Sea Walk или дайвинг?`;

function safeCode(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 28);
}

function copyText(value: string, setNotice: (value: string) => void) {
  navigator.clipboard.writeText(value).then(() => {
    setNotice("Скопировано");
    window.setTimeout(() => setNotice(""), 1600);
  }).catch(() => setNotice("Не удалось скопировать"));
}

export default function PartnerChamHub() {
  const params = useSearchParams();
  const [partnerCode, setPartnerCode] = useState("");
  const [notice, setNotice] = useState("");
  const [guests, setGuests] = useState(10);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const income = useMemo(() => guests * COMMISSION, [guests]);

  useEffect(() => {
    const fromQuery = safeCode(params.get("code") || params.get("ref") || "");
    const saved = safeCode(window.localStorage.getItem(PARTNER_CODE_KEY) || "");
    const resolved = fromQuery || saved;
    if (resolved) {
      setPartnerCode(resolved);
      window.localStorage.setItem(PARTNER_CODE_KEY, resolved);
    }
  }, [params]);

  const customerLink = partnerCode ? `${TOUR_URL}?ref=${encodeURIComponent(partnerCode)}` : TOUR_URL;

  function saveCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const code = safeCode(String(form.get("partnerCode") || ""));
    if (!code) return;
    setPartnerCode(code);
    window.localStorage.setItem(PARTNER_CODE_KEY, code);
    setNotice("Код сохранён");
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!partnerCode) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      partnerCode,
      guestName: String(form.get("guestName") || "").trim(),
      guestContact: String(form.get("guestContact") || "").trim(),
      tourDate: String(form.get("tourDate") || "").trim(),
      adults: String(form.get("adults") || "").trim(),
      children: String(form.get("children") || "").trim(),
      hotel: String(form.get("hotel") || "").trim(),
      addon: String(form.get("addon") || "").trim(),
      dietary: String(form.get("dietary") || "").trim(),
      quotedPrice: String(form.get("quotedPrice") || "").trim(),
      paymentStatus: String(form.get("paymentStatus") || "").trim(),
      note: String(form.get("note") || "").trim(),
      source: "partner-cham-hub",
    };

    const whatsappWindow = window.open("about:blank", "_blank");
    try {
      const response = await fetch("/api/partner/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok || !result?.ok) throw new Error(result?.error || "Booking failed");

      const message = [
        "НОВОЕ БРОНИРОВАНИЕ — CHAM ISLAND",
        "",
        `Код партнёра: ${partnerCode}`,
        `Имя основного гостя: ${payload.guestName}`,
        `WhatsApp / Telegram гостя: ${payload.guestContact}`,
        `Дата экскурсии: ${payload.tourDate}`,
        `Взрослые: ${payload.adults}`,
        `Дети (возраст / рост): ${payload.children || "нет"}`,
        `Отель / адрес трансфера: ${payload.hotel}`,
        `Дополнительная активность: ${payload.addon || "нет"}`,
        `Питание / аллергии: ${payload.dietary || "нет"}`,
        `Цена, озвученная гостю: ${payload.quotedPrice}`,
        `Статус оплаты: ${payload.paymentStatus}`,
        `Примечание: ${payload.note || "нет"}`,
      ].join("\n");
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      if (whatsappWindow) whatsappWindow.location.href = url; else window.location.href = url;
      setStatus("success");
      formElement.reset();
    } catch (error) {
      if (whatsappWindow) whatsappWindow.close();
      setStatus("error");
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/ru/partner" className={styles.brand}><img src="/partner/govietstay-logo.jpeg" alt="GoVietStay" /><span><strong>GoVietStay Partner Hub</strong><small>Cham Island · Level 2</small></span></a>
        <a className={styles.publicLink} href="/ru/partner">Публичная страница партнёров</a>
      </header>

      <section className={styles.hero}>
        <div><span className={styles.eyebrow}>Инструменты продаж</span><h1>Cham Island Partner Hub</h1><p>Здесь собраны персональная ссылка, сценарий консультации и стандартная форма бронирования.</p></div>
        <div className={styles.codeCard}><span>Ваш партнёрский код</span><strong>{partnerCode || "НЕ УКАЗАН"}</strong>{partnerCode ? <small>Код сохранён на этом устройстве</small> : <small>Введите код, полученный после заявки</small>}</div>
      </section>

      {!partnerCode && <section className={styles.codeSetup}><div><h2>Введите партнёрский код</h2><p>Без кода бронирование не будет привязано к партнёру.</p></div><form onSubmit={saveCode}><input name="partnerCode" placeholder="GV-RU-20260806-AB12" required /><button>Сохранить код</button></form></section>}
      {notice && <div className={styles.notice}>{notice}</div>}

      <section className={styles.grid}>
        <article className={styles.toolCard}><span className={styles.cardTag}>01 · Ссылка для клиента</span><h2>Отправьте страницу тура с вашим кодом</h2><div className={styles.linkBox}>{customerLink}</div><div className={styles.actions}><button onClick={() => copyText(customerLink, setNotice)}>Копировать ссылку</button><a href={customerLink} target="_blank" rel="noreferrer">Открыть тур ↗</a></div><p>Параметр <b>ref</b> показывает, кто направил клиента. Код также обязательно указывается в Booking Form.</p></article>
        <article className={styles.toolCard}><span className={styles.cardTag}>02 · Готовый текст</span><h2>Начало консультации</h2><pre>{consultationScript}</pre><button onClick={() => copyText(consultationScript, setNotice)}>Копировать текст</button></article>
      </section>

      <section className={styles.salesFacts}>
        <div><span>Цена взрослого</span><strong>950 000 VND</strong></div><div><span>Комиссия партнёра</span><strong>150 000 VND</strong></div><div><span>Выплата</span><strong>24–48 часов</strong></div><div><span>Стартовый продукт</span><strong>Cham Island</strong></div>
      </section>

      <section className={styles.incomeBox}><div><span className={styles.eyebrow}>Мотивация</span><h2>План дохода партнёра</h2><p>Выберите ориентировочное количество взрослых гостей в месяц.</p><input type="range" min="1" max="30" value={guests} onChange={(event) => setGuests(Number(event.target.value))} /><small>{guests} гостей</small></div><div><span>Ориентировочная комиссия</span><strong>{new Intl.NumberFormat("ru-RU").format(income)} VND</strong></div></section>

      <section className={styles.salesGuide}>
        <div className={styles.sectionTitle}><span className={styles.eyebrow}>Мини-обучение</span><h2>Что нужно уточнить до бронирования</h2></div>
        <div className={styles.guideGrid}><article><b>1</b><h3>Дата и состав</h3><p>Дата тура, количество взрослых, возраст и рост детей.</p></article><article><b>2</b><h3>Трансфер</h3><p>Название отеля, точный адрес и район проживания.</p></article><article><b>3</b><h3>Дополнительные услуги</h3><p>Sea Walk, дайвинг, питание, аллергии и ограничения здоровья.</p></article><article><b>4</b><h3>Цена и оплата</h3><p>Озвучивайте только подтверждённую цену и фиксируйте статус оплаты.</p></article></div>
      </section>

      <section className={styles.bookingSection}>
        <div className={styles.bookingIntro}><span className={styles.eyebrow}>Booking Form</span><h2>Передайте готовое бронирование GoVietStay</h2><p>Заполните все обязательные данные. После отправки откроется WhatsApp с готовой структурированной заявкой.</p><div className={styles.rules}><span>✓ Код партнёра обязателен</span><span>✓ Цена должна совпадать с официальной</span><span>✓ Детей указывайте с возрастом и ростом</span><span>✓ GoVietStay подтверждает тур после проверки</span></div></div>
        <form className={styles.form} onSubmit={submitBooking}>
          <div className={styles.formHeader}><strong>Cham Island Booking</strong><span>Partner: {partnerCode || "код не указан"}</span></div>
          <label>Имя основного гостя *<input name="guestName" required /></label>
          <label>WhatsApp / Telegram гостя *<input name="guestContact" required /></label>
          <div className={styles.formRow}><label>Дата экскурсии *<input name="tourDate" type="date" required /></label><label>Взрослые *<input name="adults" type="number" min="1" required /></label></div>
          <label>Дети: возраст и рост<textarea name="children" rows={2} placeholder="Например: 1 ребёнок, 8 лет, 125 см" /></label>
          <label>Отель / точный адрес трансфера *<input name="hotel" required /></label>
          <label>Дополнительная активность<select name="addon" defaultValue="нет"><option value="нет">Нет</option><option value="Sea Walk">Sea Walk</option><option value="Дайвинг">Дайвинг</option><option value="Уточнить">Нужно уточнить</option></select></label>
          <label>Питание, аллергии, здоровье<textarea name="dietary" rows={2} /></label>
          <div className={styles.formRow}><label>Цена, озвученная гостю *<input name="quotedPrice" required placeholder="Например: 1 900 000 VND" /></label><label>Статус оплаты *<select name="paymentStatus" required defaultValue=""><option value="" disabled>Выберите</option><option value="Не оплачено">Не оплачено</option><option value="Депозит">Депозит</option><option value="Оплачено полностью">Оплачено полностью</option></select></label></div>
          <label>Примечание<textarea name="note" rows={3} /></label>
          <button disabled={!partnerCode || status === "sending"}>{status === "sending" ? "Отправляем..." : "Отправить бронирование в GoVietStay"}</button>
          {status === "success" && <div className={styles.success}>Форма подготовлена. Отправьте открывшееся сообщение в WhatsApp.</div>}
          {status === "error" && <div className={styles.error}>{partnerCode ? "Не удалось отправить форму. Попробуйте ещё раз." : "Сначала укажите партнёрский код."}</div>}
        </form>
      </section>

      <section className={styles.resources}><div><h2>Материалы для продажи</h2><p>Используйте только официальные данные и реальные изображения GoVietStay.</p></div><div className={styles.resourceGrid}><a href="/partner/cham.jpg" download>Скачать фото Cham Island</a><a href="/partner/guest-pickup.jpg" download>Скачать фото гостей</a><a href="/partner/guest-on-island.jpg" download>Скачать фото на острове</a><a href="https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic" target="_blank" rel="noreferrer">Открыть Google Reviews</a></div></section>

      <footer className={styles.footer}><span>GoVietStay Partner Hub · Level 2</span><div><a href="https://www.govietstay.com/ru/tours/cham-island">Страница тура</a><a href={`https://wa.me/${WHATSAPP_NUMBER}`}>Операционная поддержка</a><a href="https://t.me/GoVietStay">Telegram</a></div></footer>
    </main>
  );
}
