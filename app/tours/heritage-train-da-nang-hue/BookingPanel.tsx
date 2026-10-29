"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, Check, MessageCircle } from "lucide-react";
import styles from "./page.module.css";

type Booking = {
  day: string;
  adults: string;
  children: string;
  hotel: string;
  language: string;
  option: string;
  notes: string;
};

export default function BookingPanel() {
  const [booking, setBooking] = useState<Booking>({
    day: "",
    adults: "2",
    children: "0",
    hotel: "",
    language: "English",
    option: "Train to Hue + private car return",
    notes: "",
  });

  const whatsapp = useMemo(() => {
    const message = [
      "Hello GoVietStay! I'd love to plan a Da Nang → Hue Heritage Train day tour.",
      "",
      `Travel date: ${booking.day || "Please suggest availability"}`,
      `Adults: ${booking.adults || "2"}`,
      `Children: ${booking.children || "0"} (ages to confirm)`,
      `Preferred plan: ${booking.option}`,
      `Guide language: ${booking.language}`,
      `Hotel/pickup: ${booking.hotel.trim() || "To confirm"}`,
      `Requests: ${booking.notes.trim() || "Please suggest the best itinerary"}`,
      "",
      "Please confirm current train times and seats, Hue sightseeing, included tickets/meals, private transport and the total quotation before payment. Thank you!",
    ].join("\n");
    return `https://wa.me/84937762607?text=${encodeURIComponent(message)}`;
  }, [booking]);

  function change(field: keyof Booking, value: string) {
    setBooking((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className={styles.bookingPanel}>
      <div className={styles.formHeader}>
        <div><p>YOUR PRIVATE TRIP REQUEST</p><h3>Let&apos;s plan your day.</h3></div>
        <span><CalendarDays size={22} /></span>
      </div>

      <div className={styles.formFields}>
        <label className={styles.formField}>
          <span>Travel date</span>
          <input type="date" value={booking.day} onChange={(event) => change("day", event.target.value)} aria-label="Your preferred travel date" />
        </label>

        <div className={styles.formRow}>
          <label className={styles.formField}>
            <span>Adults</span>
            <select value={booking.adults} onChange={(event) => change("adults", event.target.value)}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((count) => <option key={count} value={count}>{count}</option>)}
            </select>
          </label>
          <label className={styles.formField}>
            <span>Children</span>
            <select value={booking.children} onChange={(event) => change("children", event.target.value)}>
              {[0, 1, 2, 3, 4, 5, 6, 8, 10].map((count) => <option key={count} value={count}>{count}</option>)}
            </select>
          </label>
        </div>

        <label className={styles.formField}>
          <span>Preferred journey</span>
          <select value={booking.option} onChange={(event) => change("option", event.target.value)}>
            <option>Train to Hue + private car return</option>
            <option>Heritage train both ways (shorter visit)</option>
            <option>Help me choose</option>
          </select>
        </label>

        <div className={styles.formRow}>
          <label className={styles.formField}>
            <span>Guide language</span>
            <select value={booking.language} onChange={(event) => change("language", event.target.value)}>
              <option>English</option>
              <option>Russian (on request)</option>
              <option>German (on request)</option>
              <option>Italian (on request)</option>
              <option>Chinese (on request)</option>
              <option>Other / to confirm</option>
            </select>
          </label>
          <label className={styles.formField}>
            <span>Hotel / pickup area</span>
            <input type="text" value={booking.hotel} onChange={(event) => change("hotel", event.target.value)} placeholder="Da Nang hotel" maxLength={130} />
          </label>
        </div>

        <label className={styles.formField}>
          <span>Anything we should know? <small>(optional)</small></span>
          <textarea value={booking.notes} onChange={(event) => change("notes", event.target.value)} rows={3} placeholder="Children's ages, mobility needs, favorite sights…" maxLength={500} />
        </label>
      </div>

      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={styles.sendWhatsapp}>
        <MessageCircle size={21} /> Get my itinerary on WhatsApp <ArrowUpRight size={18} />
      </a>
      <p className={styles.formHint}><Check size={14} /> Opens WhatsApp with your details. No payment is collected here.</p>
    </div>
  );
}
