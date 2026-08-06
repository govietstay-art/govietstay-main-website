"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./PartnerChamHub.module.css";

const WHATSAPP_NUMBER = "84937762607";
const TOUR_URL = "https://www.govietstay.com/ru/tours/cham-island";
const PARTNER_CODE_KEY = "gvsPartnerCode";
const COMMISSION = 150_000;

const scripts = {
  intro: `Здравствуйте! Я помогаю с бронированием экскурсии на острова Чам вместе с GoVietStay.\n\nСтоимость для взрослого: 950 000 VND. В программу входят трансфер, скоростной катер, снорклинг, обед и сопровождение.\n\nПодскажите, пожалуйста:\n1. Какую дату вы рассматриваете?\n2. Сколько взрослых и детей?\n3. В каком отеле вы остановились?`,
  price: `Стоимость экскурсии Cham Island для взрослого — 950 000 VND.\n\nПеред подтверждением я уточню наличие мест, адрес трансфера и итоговую стоимость для детей или дополнительных активностей.`,
  followup: `Здравствуйте! Хотела уточнить, актуальна ли для вас экскурсия на острова Чам? Если сообщите дату, количество взрослых и детей, а также отель, я быстро проверю доступность.`,
  confirm: `Спасибо! Я передала данные в GoVietStay. Бронирование считается подтверждённым только после официального ответа GoVietStay с проверкой мест и трансфера.`,
};

const quickAnswers = [
  ["Что входит?", "Трансфер по подтверждённой зоне, скоростной катер, программа на островах, снорклинг, обед и сопровождение согласно официальной странице тура."],
  ["Можно с детьми?", "Да. Обязательно уточните возраст и рост ребёнка. Итоговая детская цена подтверждается по актуальной политике тура."],
  ["Где забирают?", "Нужно указать название отеля и точный адрес. GoVietStay подтвердит возможность и время трансфера."],
  ["Когда подтверждён тур?", "Только после письменного подтверждения GoVietStay. Партнёр не должен обещать место до проверки."],
  ["Можно менять цену?", "Нет. Используйте только актуальную цену на официальной странице или цену, письменно подтверждённую GoVietStay."],
  ["Если плохая погода?", "Решение принимается оператором и местными службами безопасности. Не обещайте отмену или возврат без подтверждения."],
];

type ScriptKey = keyof typeof scripts;
type HistoryItem = { id: string; guestName: string; tourDate: string; adults: string; createdAt: string };

function safeCode(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 28);
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
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
  const [activeScript, setActiveScript] = useState<ScriptKey>("intro");
  const [guests, setGuests] = useState(10);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const income = useMemo(() => guests * COMMISSION, [guests]);

  useEffect(() => {
    const fromQuery = safeCode(params.get("code") || params.get("ref") || "");
    const saved = safeCode(window.localStorage.getItem(PARTNER_CODE_KEY) || "");
    const resolved = fromQuery || saved;
    if (resolved) {
      setPartnerCode(resolved);
      window.localStorage.setItem(PARTNER_CODE_KEY, resolved);
    }
    try {
      const raw = window.localStorage.getItem("gvsPartnerBookingHistory");
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      setHistory([]);
    }
  }, [params]);

  const customerLink = partnerCode ? `${TOUR_URL}?ref=${encodeURIComponent(partnerCode)}` : TOUR_URL;
  const shareMessage = `Здравствуйте! Посмотрите экскурсию на острова Чам от GoVietStay:\n${customerLink}\n\nЕсли хотите, я помогу проверить дату и оформить бронирование.`;

  function saveCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const code = safeCode(String(form.get("partnerCode") || ""));
    if (!code) return;
    setPartnerCode(code);
    window.localStorage.setItem(PARTNER_CODE_KEY, code);
    setNotice("Код сохранён на этом устройстве");
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
      source: "partner-cham-workspace-v2",
    };

    const whatsappWindow = window.open("about:blank", "_blank");
    try {
      const response = await fetch("/api/partner/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result?.ok) throw new Error("Booking failed");

      const bookingId = `CHAM-${Date.now().toString().slice(-8)}`;
      const message = [
        "НОВОЕ БРОНИРОВАНИЕ — CHAM ISLAND",
        "",
        `Booking ID: ${bookingId}`,
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
        "",
        "Ожидаю официального подтверждения GoVietStay.",
      ].join("\n");

      const item: HistoryItem = {
        id: bookingId,
        guestName: payload.guestName,
        tourDate: payload.tourDate,
        adults: payload.adults,
        createdAt: new Date().toISOString(),
      };
      const next = [item, ...history].slice(0, 8);
      setHistory(next);
      window.localStorage.setItem("gvsPartnerBookingHistory", JSON.stringify(next));

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      if (whatsappWindow) whatsappWindow.location.href = url;
      else window.location.href = url;
      setStatus("success");
      formElement.reset();
    } catch {
      if (whatsappWindow) whatsappWindow.close();
      setStatus("error");
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/ru/partner" className={styles.brand}><img src="/partner/govietstay-logo.jpeg" alt="GoVietStay" /><span><strong>Partner Workspace</strong><small>Cham Island · Internal sales tools</small></span></a>
        <div className={styles.headerRight}><span className={partnerCode ? styles.activeStatus : styles.inactiveStatus}>{partnerCode ? "Код активен" : "Нужен код"}</span><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">Поддержка</a></div>
      </header>

      <section className={styles.workspaceHead}>
        <div><span className={styles.eyebrow}>Рабочее место партнёра</span><h1>Продажа Cham Island</h1><p>Не рекламная страница. Здесь находятся только инструменты консультации, оформления и передачи бронирования.</p></div>
        <div className={styles.partnerCard}><small>Партнёрский код</small><strong>{partnerCode || "НЕ УКАЗАН"}</strong><span>{partnerCode ? "Сохранён на этом устройстве" : "Введите код после одобрения заявки"}</span></div>
      </section>

      {!partnerCode && <section className={styles.codeSetup}><div><strong>Активируйте рабочее место</strong><span>Введите код, полученный от GoVietStay. Без него Booking Form не отправляется.</span></div><form onSubmit={saveCode}><input name="partnerCode" placeholder="GV-RU-20260806-AB12" required /><button>Сохранить код</button></form></section>}
      {notice && <div className={styles.notice}>{notice}</div>}

      <nav className={styles.workspaceNav} aria-label="Partner workspace navigation"><a href="#start">Старт</a><a href="#scripts">Скрипты</a><a href="#answers">FAQ</a><a href="#booking">Booking Form</a><a href="#materials">Материалы</a></nav>

      <section className={styles.startGrid} id="start">
        <article className={styles.mainAction}>
          <div className={styles.cardTop}><span>Шаг 1</span><b>Ссылка для клиента</b></div>
          <h2>Отправьте официальную страницу тура</h2>
          <div className={styles.linkBox}>{customerLink}</div>
          <div className={styles.buttonRow}><button onClick={() => copyText(customerLink, setNotice)}>Копировать ссылку</button><a href={customerLink} target="_blank" rel="noreferrer">Открыть тур ↗</a><a href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`} target="_blank" rel="noreferrer">Поделиться в WhatsApp</a></div>
          <p>Параметр <b>ref</b> помогает сохранить источник клиента. Код всё равно обязательно указывается в Booking Form.</p>
        </article>
        <aside className={styles.pricePanel}>
          <span>Официальные рабочие цифры</span>
          <div><small>Цена взрослого</small><strong>950 000 VND</strong></div>
          <div><small>Комиссия партнёра</small><strong>150 000 VND</strong></div>
          <div><small>Выплата</small><strong>24–48 часов</strong></div>
          <p>Не меняйте цену и не обещайте место до подтверждения GoVietStay.</p>
        </aside>
      </section>

      <section className={styles.scriptSection} id="scripts">
        <div className={styles.sectionHead}><div><span className={styles.eyebrow}>Шаг 2 · Консультация</span><h2>Готовые тексты для разных этапов продажи</h2></div><span>Нажмите вкладку → скопируйте → адаптируйте под клиента</span></div>
        <div className={styles.scriptTabs}>{(["intro", "price", "followup", "confirm"] as ScriptKey[]).map((key) => <button key={key} className={activeScript === key ? styles.activeTab : ""} onClick={() => setActiveScript(key)}>{key === "intro" ? "Первое сообщение" : key === "price" ? "Цена" : key === "followup" ? "Follow-up" : "После передачи"}</button>)}</div>
        <div className={styles.scriptBox}><pre>{scripts[activeScript]}</pre><button onClick={() => copyText(scripts[activeScript], setNotice)}>Копировать текст</button></div>
      </section>

      <section className={styles.answersSection} id="answers">
        <div className={styles.sectionHead}><div><span className={styles.eyebrow}>Быстрые ответы</span><h2>Что отвечать на частые вопросы</h2></div><a href={TOUR_URL} target="_blank" rel="noreferrer">Проверить официальную страницу ↗</a></div>
        <div className={styles.answerGrid}>{quickAnswers.map(([q, a]) => <article key={q}><h3>{q}</h3><p>{a}</p><button onClick={() => copyText(a, setNotice)}>Копировать ответ</button></article>)}</div>
      </section>

      <section className={styles.incomeBox}><div><span className={styles.eyebrow}>План продаж</span><h2>Цель партнёра на месяц</h2><p>Выберите количество взрослых гостей.</p><input type="range" min="1" max="30" value={guests} onChange={(event) => setGuests(Number(event.target.value))} /><small>{guests} гостей</small></div><div><small>Ориентировочная комиссия</small><strong>{formatMoney(income)} VND</strong><span>{guests} × 150 000 VND</span></div></section>

      <section className={styles.bookingSection} id="booking">
        <div className={styles.bookingIntro}><span className={styles.eyebrow}>Шаг 3 · Передача заказа</span><h2>Booking Form для GoVietStay</h2><p>Заполняйте только после того, как клиент согласовал дату, состав группы и цену. После отправки откроется WhatsApp с готовой заявкой.</p><div className={styles.checklist}><span>Дата и количество гостей проверены</span><span>Возраст и рост детей указаны</span><span>Отель и точный адрес получены</span><span>Цена озвучена без изменений</span><span>Клиент понимает, что нужно подтверждение</span></div></div>
        <form className={styles.form} onSubmit={submitBooking}>
          <div className={styles.formTitle}><strong>Cham Island Booking</strong><span>Partner: {partnerCode || "код не указан"}</span></div>
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
          {status === "success" && <div className={styles.success}>Заявка сохранена на этом устройстве. Отправьте открывшееся сообщение в WhatsApp.</div>}
          {status === "error" && <div className={styles.error}>{partnerCode ? "Не удалось отправить форму. Попробуйте ещё раз." : "Сначала укажите партнёрский код."}</div>}
        </form>
      </section>

      <section className={styles.bottomGrid} id="materials">
        <article className={styles.resources}><div className={styles.sectionHead}><div><span className={styles.eyebrow}>Материалы</span><h2>Официальный Media Kit</h2></div></div><div className={styles.resourceGrid}><a href="/partner/cham.jpg" download>Фото Cham Island</a><a href="/partner/guest-pickup.jpg" download>Фото трансфера</a><a href="/partner/guest-on-island.jpg" download>Фото гостей</a><a href="https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic" target="_blank" rel="noreferrer">Google Reviews ↗</a></div></article>
        <article className={styles.history}><div className={styles.sectionHead}><div><span className={styles.eyebrow}>На этом устройстве</span><h2>Последние отправки</h2></div></div>{history.length ? <div className={styles.historyList}>{history.map((item) => <div key={item.id}><strong>{item.id}</strong><span>{item.guestName} · {item.adults} взр. · {item.tourDate}</span><small>Отправлено · ожидает подтверждения</small></div>)}</div> : <p>После отправки первой заявки здесь появится краткая локальная история. Контакт гостя не сохраняется.</p>}</article>
      </section>

      <footer className={styles.footer}><span>GoVietStay Partner Workspace · Cham Island</span><div><a href="/ru/partner">Страница регистрации</a><a href={TOUR_URL}>Страница тура</a><a href={`https://wa.me/${WHATSAPP_NUMBER}`}>Операционная поддержка</a><a href="https://t.me/GoVietStay">Telegram</a></div></footer>
      <nav className={styles.mobileNav}><a href="#start">Старт</a><a href="#scripts">Скрипты</a><a href="#booking">Booking</a><a href={`https://wa.me/${WHATSAPP_NUMBER}`}>Помощь</a></nav>
    </main>
  );
}
