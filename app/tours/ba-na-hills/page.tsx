"use client";

import { useMemo, useState } from "react";
import "./ba-na-hills.css";

const PHONE = "84937762607";

const morning = [
  ["07:30–08:00", "Hotel pickup", "Pickup from selected hotels in Da Nang."],
  ["09:00", "Cable car", "Arrive at Sun World Ba Na Hills and begin the ascent."],
  ["09:30–11:30", "Golden Bridge & gardens", "Golden Bridge, Le Jardin D’Amour and Linh Ung Pagoda."],
  ["11:30–12:45", "Buffet lunch", "Buffet lunch according to the confirmed tour package."],
  ["13:00–15:30", "French Village & Fantasy Park", "Free time to explore attractions included in the standard program."],
  ["15:30–17:00", "Descent & hotel return", "Cable car down and transfer back to Da Nang."],
];

const evening = [
  ["13:00 / 13:30–14:00", "Hotel pickup", "Hoi An pickup around 13:00; Da Nang pickup around 13:30–14:00."],
  ["15:00", "Cable car", "Arrive at the cable-car station and begin the afternoon experience."],
  ["15:30–16:30", "Golden Bridge", "Visit the Golden Bridge, Linh Ung Pagoda and flower gardens."],
  ["16:30–17:15", "French Village", "Explore the mountain village and enjoy free time at 1,487 metres."],
  ["17:15–18:45", "Buffet dinner", "Dinner at Beer Plaza, followed by evening photos and a relaxed walk."],
  ["18:45–19:20", "Cable car down", "Meet at the station, descend and board the return vehicle."],
  ["20:30 / 21:15", "Hotel drop-off", "Approximate arrival in Da Nang / Hoi An."],
];

const included = [
  "Round-trip hotel transfer in the confirmed pickup area",
  "English-speaking guide",
  "Round-trip cable-car ticket",
  "Ba Na Hills and Golden Bridge admission",
  "Buffet lunch or dinner according to your selected option",
  "Bottled water",
  "VAT",
];

const excluded = [
  "Wax Museum and Wine Cellar",
  "Queue-skip or priority access",
  "Prize games and paid attractions",
  "Alpine Coaster and other separately charged activities",
  "Personal expenses and services not listed above",
  "Tips for the guide",
];

const faqs = [
  ["Which option is less crowded?", "The afternoon and evening option may feel calmer during some periods, but this cannot be guaranteed. Ba Na Hills is a major attraction and visitor levels can change quickly."],
  ["Can GoVietStay guarantee time on the Golden Bridge?", "No. The guide follows the operating schedule and real conditions. Queues, weather, cable-car operations and group movement may affect the time available at each attraction."],
  ["What language does the guide speak?", "The standard joined tour includes an English-speaking guide. A Russian-speaking guide or support must be requested and confirmed separately."],
  ["Is the tour suitable for children?", "Yes. Please send every child’s age and height before booking because the operator’s current height-based policy determines the applicable ticket price."],
  ["What happens if the weather changes?", "Mountain weather can change rapidly. The itinerary may be adjusted for safety, visibility, cable-car operation or official instructions. Weather and visibility are not guaranteed."],
];

const reviews = [
  {
    name: "Mehak Khanna",
    quote: "10/10 service. David and Terry are very professional and super supportive. Our trip to Ba Na Hills Da Nang was amazing because of GoVietStay.",
    detail: "Private tour · private car service · responsive support throughout the trip",
    image: "/tour/ba-na-hills/reviews/mehak-google.png",
  },
  {
    name: "Ryan",
    quote: "An amazing trip! Our first visit to Da Nang with GoVietStay. Great service and very helpful support. Highly recommended!",
    detail: "Google review with real Ba Na Hills guest photos",
    image: "/tour/ba-na-hills/reviews/ryan-google.png",
  },
  {
    name: "GoVietStay guest",
    quote: "A sincere thank you to the travel company, especially Anna and David, who explained everything very clearly. They gave us their time wholeheartedly, like family.",
    detail: "Translated from the guest’s original Russian-language Google review",
    image: "/tour/ba-na-hills/reviews/russian-family-google.png",
  },
  {
    name: "Dariga Baitleuova",
    quote: "A wonderful, unforgettable holiday. Thank you, Anna and David! The delicious dinner was an unexpected surprise—this was wow! I recommend it to everyone.",
    detail: "Translated from the guest’s original Russian-language Google review",
    image: "/tour/ba-na-hills/reviews/dariga-google.png",
  },
];

export default function Home() {
  const [option, setOption] = useState<"morning" | "evening">("morning");
  const [booking, setBooking] = useState({ date: "", adults: "2", children: "0", childInfo: "", hotel: "" });
  const itinerary = option === "morning" ? morning : evening;
  const optionName = option === "morning" ? "Morning Classic Tour" : "Afternoon & Evening Tour";

  const whatsapp = useMemo(() => {
    const message = `Hello GoVietStay, I would like to check availability for the Ba Na Hills ${optionName}.

Date: ${booking.date || "not provided"}
Adults: ${booking.adults || "not provided"}
Children: ${booking.children || "0"}
Child age/height: ${booking.childInfo || "none"}
Hotel: ${booking.hotel || "not provided"}
Guide language: English

I understand that Ba Na Hills can be very crowded and that visitor numbers, queues, weather, visibility and the actual operating situation cannot be guaranteed. Please confirm availability, pickup, meal option and the exact total before payment.`;
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  }, [booking, optionName]);

  return (
    <main>
      <section className="hero">
        <img src="https://www.govietstay.com/tour/bana.jpg" alt="Ba Na Hills and Golden Bridge" />
        <div className="hero-shade" />
        <div className="hero-inner">
          <header>
            <a className="logo" href="#top"><span>G</span><strong>GoVietStay</strong></a>
            <a className="header-book" href="#booking">Check availability</a>
          </header>
          <div className="hero-copy" id="top">
            <p className="eyebrow">Two ways to experience Ba Na Hills</p>
            <h1>Golden Bridge<br />Morning or Evening</h1>
            <p className="lead">Choose a classic full-day visit or a later start with buffet dinner and the French Village after sunset.</p>
            <div className="chips"><span>English-speaking guide</span><span>From 1,550,000 VND</span><span>Da Nang & Hoi An</span></div>
          </div>
        </div>
      </section>

      <section className="alert">
        <div className="alert-icon">!</div>
        <div>
          <strong>Please understand Ba Na Hills before booking</strong>
          <p>Ba Na Hills is one of Central Vietnam’s busiest attractions, especially in the morning and during weekends, holidays and peak travel periods. GoVietStay cannot guarantee visitor numbers, queue times, visibility, weather, cable-car operations or the actual situation on the mountain.</p>
        </div>
      </section>

      <section className="section intro">
        <div>
          <p className="label">Choose your experience</p>
          <h2>Same mountain.<br />Two different rhythms.</h2>
        </div>
        <p>Morning offers the classic program and more daytime exploration. Afternoon and evening offers a later departure, cooler hours and a night atmosphere—but neither option can be promised as crowd-free.</p>
      </section>

      <section className="options">
        <button className={option === "morning" ? "option active" : "option"} onClick={() => setOption("morning")}>
          <div className="option-top"><span>01</span><em>Classic choice</em></div>
          <h3>Morning Tour</h3>
          <p className="time">07:30–17:00</p>
          <ul><li>Golden Bridge in daylight</li><li>Buffet lunch</li><li>French Village & Fantasy Park</li><li>More daytime exploration</li></ul>
          <strong>Select morning →</strong>
        </button>
        <button className={option === "evening" ? "option active" : "option"} onClick={() => setOption("evening")}>
          <div className="option-top"><span>02</span><em>Later departure</em></div>
          <h3>Afternoon & Evening</h3>
          <p className="time">13:00–20:30/21:15</p>
          <ul><li>Golden Bridge in late afternoon</li><li>Buffet dinner at Beer Plaza</li><li>French Village after sunset</li><li>Cooler evening atmosphere</li></ul>
          <strong>Select afternoon →</strong>
        </button>
      </section>

      <section className="section itinerary">
        <div className="section-head">
          <div><p className="label">Selected program</p><h2>{optionName}</h2></div>
          <span>{option === "morning" ? "07:30–17:00" : "13:00–20:30/21:15"}</span>
        </div>
        <div className="timeline">
          {itinerary.map(([time, title, text], index) => (
            <article key={time}>
              <time>{time}</time><i>{index + 1}</i><div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
        <p className="schedule-note">The itinerary and timing are approximate. The guide may adjust the order and duration according to queues, weather, cable-car operations, official instructions and the group’s actual movement.</p>
      </section>

      <section className="included-grid">
        <div className="included"><p className="label">Included</p><h2>What your tour covers</h2><ul>{included.map(x => <li key={x}><span>✓</span>{x}</li>)}</ul></div>
        <div className="excluded"><p className="label">Not included</p><h2>Please plan separately</h2><ul>{excluded.map(x => <li key={x}><span>—</span>{x}</li>)}</ul></div>
      </section>

      <section className="section price-booking" id="booking">
        <div className="price-copy">
          <p className="label">Joined-tour reference price</p>
          <h2>Clear price.<br />Confirmed before payment.</h2>
          <div className="prices">
            <div><span>Adult</span><strong>1,550,000</strong><small>VND / person</small></div>
            <div><span>Child</span><strong>1,400,000</strong><small>VND / person</small></div>
          </div>
          <p>Final child pricing follows the operator’s current height policy. Private arrangements for groups of four or more can be requested and confirmed separately.</p>
        </div>
        <div className="form-card">
          <p className="form-choice">Selected: <strong>{optionName}</strong></p>
          <label>Travel date<input type="date" value={booking.date} onChange={e => setBooking({...booking, date:e.target.value})} /></label>
          <div className="form-row">
            <label>Adults<input inputMode="numeric" value={booking.adults} onChange={e => setBooking({...booking, adults:e.target.value})} /></label>
            <label>Children<input inputMode="numeric" value={booking.children} onChange={e => setBooking({...booking, children:e.target.value})} /></label>
          </div>
          <label>Child age and height<input placeholder="Example: 7 years, 125 cm" value={booking.childInfo} onChange={e => setBooking({...booking, childInfo:e.target.value})} /></label>
          <label>Hotel name<input placeholder="Hotel in Da Nang or Hoi An" value={booking.hotel} onChange={e => setBooking({...booking, hotel:e.target.value})} /></label>
          <a href={whatsapp} target="_blank" rel="noreferrer">Check availability on WhatsApp</a>
          <small>The availability check is free. Booking is confirmed only after GoVietStay replies.</small>
        </div>
      </section>

      <section className="reviews-section">
        <div className="section reviews-inner">
          <div className="reviews-head">
            <div>
              <p className="label">Verified guest experiences</p>
              <h2>What travelers say about GoVietStay</h2>
              <p>Real Google reviews from guests, with their original screenshots available for verification.</p>
            </div>
            <a href="https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic" target="_blank" rel="noreferrer">See all Google reviews ↗</a>
          </div>
          <div className="review-grid">
            {reviews.map(review => (
              <article className="review-card" key={review.image}>
                <div className="stars" aria-label="Five star review">★★★★★</div>
                <blockquote>“{review.quote}”</blockquote>
                <p>{review.detail}</p>
                <div className="review-footer">
                  <div><strong>{review.name}</strong><span>Google review · GoVietStay</span></div>
                  <a href={review.image} target="_blank" rel="noreferrer">View original</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq">
        <div><p className="label">Good to know</p><h2>Questions before booking</h2></div>
        <div>{faqs.map(([q,a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
      </section>

      <section className="final">
        <p className="label">GoVietStay · Da Nang · Hoi An</p>
        <h2>Choose your time.<br />We confirm the real conditions.</h2>
        <p>English-speaking guide · Local WhatsApp support · Exact details before payment</p>
        <a href={whatsapp} target="_blank" rel="noreferrer">Ask GoVietStay</a>
      </section>

      <footer><strong>GoVietStay</strong><span>Trusted Local Support</span><a href="https://GoVietStay.com">GoVietStay.com</a><span>WhatsApp: +84 937 762 607</span></footer>
      <a className="mobile-book" href={whatsapp} target="_blank" rel="noreferrer"><span>{option === "morning" ? "Morning" : "Afternoon & evening"}</span>Book on WhatsApp</a>
    </main>
  );
}
