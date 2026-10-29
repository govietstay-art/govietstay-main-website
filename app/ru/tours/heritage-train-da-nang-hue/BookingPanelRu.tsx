"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, Check, MessageCircle } from "lucide-react";
import styles from "../../../tours/heritage-train-da-nang-hue/page.module.css";

type Request = {
  date: string;
  adults: string;
  children: string;
  hotel: string;
  language: string;
  option: string;
  notes: string;
};

export default function BookingPanelRu() {
  const [request, setRequest] = useState<Request>({
    date: "",
    adults: "2",
    children: "0",
    hotel: "",
    language: "Русский (по запросу)",
    option: "Поезд в Хюэ + обратный трансфер на машине",
    notes: "",
  });

  const whatsapp = useMemo(() => {
    const message = [
      "Здравствуйте, GoVietStay! Хочу узнать о поездке из Дананга в Хюэ на туристическом поезде «Соединяя наследие Центрального Вьетнама».",
      "",
      `Дата поездки: ${request.date || "Подскажите доступные даты"}`,
      `Взрослые: ${request.adults || "2"}`,
      `Дети: ${request.children || "0"} (возраст уточним)`,
      `Маршрут: ${request.option}`,
      `Язык гида: ${request.language}`,
      `Отель / место встречи: ${request.hotel.trim() || "Уточним позже"}`,
      `Пожелания: ${request.notes.trim() || "Помогите составить удобную программу"}`,
      "",
      "Пожалуйста, проверьте актуальное расписание и места в поезде, экскурсию по Хюэ, трансфер, входные билеты, питание и полную стоимость до оплаты. Спасибо!",
    ].join("\n");
    return `https://wa.me/84937762607?text=${encodeURIComponent(message)}`;
  }, [request]);

  function update(field: keyof Request, value: string) {
    setRequest((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className={styles.bookingPanel}>
      <div className={styles.formHeader}>
        <div><p>ВАШ ЗАПРОС НА ЭКСКУРСИЮ</p><h3>Спланируем поездку.</h3></div>
        <span><CalendarDays size={22} /></span>
      </div>
      <div className={styles.formFields}>
        <label className={styles.formField}>
          <span>Желаемая дата</span>
          <input type="date" value={request.date} onChange={(event) => update("date", event.target.value)} aria-label="Желаемая дата поездки" />
        </label>
        <div className={styles.formRow}>
          <label className={styles.formField}>
            <span>Взрослые</span>
            <select value={request.adults} onChange={(event) => update("adults", event.target.value)}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((count) => <option key={count} value={count}>{count}</option>)}
            </select>
          </label>
          <label className={styles.formField}>
            <span>Дети</span>
            <select value={request.children} onChange={(event) => update("children", event.target.value)}>
              {[0, 1, 2, 3, 4, 5, 6, 8, 10].map((count) => <option key={count} value={count}>{count}</option>)}
            </select>
          </label>
        </div>
        <label className={styles.formField}>
          <span>Вариант маршрута</span>
          <select value={request.option} onChange={(event) => update("option", event.target.value)}>
            <option>Поезд в Хюэ + обратный трансфер на машине</option>
            <option>Поезд туда и обратно (меньше времени в Хюэ)</option>
            <option>Помогите выбрать</option>
          </select>
        </label>
        <div className={styles.formRow}>
          <label className={styles.formField}>
            <span>Язык гида</span>
            <select value={request.language} onChange={(event) => update("language", event.target.value)}>
              <option>Русский (по запросу)</option>
              <option>Английский</option>
              <option>Немецкий (по запросу)</option>
              <option>Итальянский (по запросу)</option>
              <option>Другой / уточним</option>
            </select>
          </label>
          <label className={styles.formField}>
            <span>Отель / место встречи</span>
            <input type="text" value={request.hotel} onChange={(event) => update("hotel", event.target.value)} placeholder="Отель в Дананге" maxLength={130} />
          </label>
        </div>
        <label className={styles.formField}>
          <span>Ваши пожелания <small>(необязательно)</small></span>
          <textarea value={request.notes} onChange={(event) => update("notes", event.target.value)} rows={3} placeholder="Возраст детей, удобный темп, интересные места…" maxLength={500} />
        </label>
      </div>
      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={styles.sendWhatsapp}>
        <MessageCircle size={21} /> Получить программу в WhatsApp <ArrowUpRight size={18} />
      </a>
      <p className={styles.formHint}><Check size={14} /> Откроется WhatsApp с вашим запросом. Оплачивать сейчас ничего не нужно.</p>
    </div>
  );
}
