"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const WIDGET_URL =
  "https://tpemd.com/content?currency=usd&trs=591296&shmarker=795756&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%2332a8dd&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&plain=false&promo_id=7879&campaign_id=100";
const WHATSAPP_URL = "https://wa.me/84937762607?text=Hello%20GoVietStay%2C%20I%20need%20help%20planning%20my%20Vietnam%20trip.";

function AviasalesSearch() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "blocked">("loading");

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = WIDGET_URL;
    script.charset = "utf-8";
    script.onload = () => setStatus("ready");
    script.onerror = () => setStatus("blocked");
    container.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
      // Script is scoped to this page; no global Travelpayouts Drive code is installed.
      container.replaceChildren();
    };
  }, []);

  return (
    <div className="rounded-3xl border border-sky-100 bg-white p-4 shadow-xl shadow-sky-900/10 sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Flight search</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">Find your next flight</h2>
        </div>
        <span className="rounded-full bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-800">Powered by Aviasales</span>
      </div>
      <div ref={widgetRef} id="govietstay-aviasales-flight-search" className="min-h-[190px] overflow-x-auto" aria-label="Aviasales flight search form" />
      {status === "loading" ? (
        <p className="mt-3 text-sm text-slate-500" role="status">Loading flight search…</p>
      ) : null}
      {status === "blocked" ? (
        <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-950" role="status">
          The flight search could not load. Please try disabling your ad blocker for this page, or ask us for help via WhatsApp.
        </div>
      ) : null}
      <p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-6 text-slate-500">
        Flight searches, availability, prices, booking, payment, ticket changes and refunds are handled by Aviasales and the travel providers you select. GoVietStay may earn an affiliate commission if you complete an eligible booking, at no extra charge from GoVietStay.
      </p>
    </div>
  );
}

export default function FlightsSearch() {
  return (
    <main className="min-h-screen bg-[#f5f9fc] text-slate-900">
      <div className="bg-[#073452] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <Link href="/" className="text-xl font-extrabold tracking-tight hover:text-sky-200" aria-label="Back to GoVietStay homepage">
            GoVietStay <span className="text-sky-300">✈</span>
          </Link>
          <div className="flex flex-wrap items-center gap-5 text-sm font-semibold">
            <Link href="/#experiences" className="hover:text-sky-200">Tours</Link>
            <Link href="/travel" className="hover:text-sky-200">Travel guides</Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600">WhatsApp support</a>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#073452] via-[#075b85] to-[#1c94be] text-white">
        <div className="mx-auto max-w-6xl px-5 pb-32 pt-14 sm:pt-20">
          <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.17em]">Vietnam flights • Local support</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Your flight to Vietnam. <span className="text-[#a5e8fa]">Our local welcome.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-sky-50">
            Search flight options to Vietnam with our trusted flight-search partner, then explore Da Nang, Hoi An, Hue and Phu Quoc with GoVietStay.
          </p>
        </div>
      </div>

      <div className="mx-auto -mt-20 max-w-6xl px-5 pb-20">
        <AviasalesSearch />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: "✈️", title: "Search your route", body: "Choose your departure city, destination, dates and passengers." },
            { icon: "🔎", title: "Compare flight options", body: "Review results and terms on Aviasales and the selected booking provider." },
            { icon: "🌴", title: "Plan your stay", body: "Book your Vietnam tours, transfers and local experiences directly with GoVietStay." },
          ].map((step) => (
            <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="text-3xl" aria-hidden>{step.icon}</span>
              <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{step.body}</p>
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-3xl bg-[#073452] px-7 py-9 text-white sm:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-300">More than just a flight</p>
          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">Arriving in Vietnam? We're here on the ground.</h2>
          <p className="mt-3 max-w-3xl leading-8 text-sky-100">
            GoVietStay arranges local tours, airport transfers and experiences with real WhatsApp support. Your flight booking stays separate from your GoVietStay tour booking.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-600">Ask GoVietStay on WhatsApp</a>
            <Link href="/#experiences" className="rounded-full border border-white/40 px-6 py-3 text-sm font-bold hover:bg-white/10">Explore local tours</Link>
          </div>
        </section>

        <p className="mt-8 text-center text-xs leading-6 text-slate-500">
          GoVietStay provides local travel services. Air tickets are sold and serviced by independent third-party providers. Check baggage, visa, cancellation and refund terms before payment.
        </p>
      </div>
    </main>
  );
}
