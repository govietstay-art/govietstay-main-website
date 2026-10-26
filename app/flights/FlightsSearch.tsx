"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
      container.replaceChildren();
    };
  }, []);

  return (
    <section id="flight-search" className="scroll-mt-6 overflow-hidden rounded-[1.8rem] border border-white/80 bg-white shadow-[0_28px_90px_-25px_rgba(10,55,88,0.32)]">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-[#fff] to-[#f1fbff] px-5 py-5 sm:px-8 sm:py-7">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eaf8fc] text-2xl" aria-hidden="true">✈️</div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1681a7]">Start your journey</p>
            <h2 className="mt-1 text-xl font-black tracking-tight text-[#0a3047] sm:text-2xl">Find your perfect flight</h2>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#b4e9f7] bg-white px-3 py-2 text-xs font-bold text-[#166484]">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" /> Search by Aviasales
        </span>
      </div>

      <div className="p-4 sm:p-7">
        <div ref={widgetRef} id="govietstay-aviasales-flight-search" className="min-h-[195px] overflow-x-auto" aria-label="Aviasales flight search form" />
        {status === "loading" ? <p className="mt-2 text-sm text-slate-500" role="status">Loading flight search…</p> : null}
        {status === "blocked" ? (
          <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-950" role="status">
            Flight search could not load. Please try again with your ad blocker disabled for this page or contact us on WhatsApp.
          </div>
        ) : null}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#f3fafc] px-4 py-3 text-sm">
          <span className="font-semibold text-[#164b64]">✓ Compare flight options &nbsp; ✓ Secure partner checkout</span>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-[#117e91] underline decoration-[#7cd6df] underline-offset-4 hover:text-[#06485b]">Need local help? Chat with us</a>
        </div>
        <p className="mt-4 text-xs leading-6 text-slate-500">
          Flight search and booking are provided by Aviasales and the selected ticket provider. Prices, payments, changes and refunds are handled by the booking provider. GoVietStay may earn a commission from eligible bookings at no extra cost from GoVietStay.
        </p>
      </div>
    </section>
  );
}

const highlights = [
  { icon: "🧭", title: "Travel with a plan", text: "Compare flight choices, then get genuine local guidance for your Vietnam itinerary." },
  { icon: "💬", title: "A real person in Vietnam", text: "Questions about airport pickup, destinations or tours? Message GoVietStay directly." },
  { icon: "🌿", title: "Experiences beyond arrival", text: "Explore private tours and authentic local experiences in Central Vietnam and Phu Quoc." },
];

const destinations = [
  { name: "Da Nang & Hoi An", caption: "Beaches, lanterns & local discoveries", image: "/tour/hoian.jpg", href: "/travel/da-nang-travel-guide" },
  { name: "Phu Quoc", caption: "Island days, snorkeling & sunsets", image: "/tour/phuquoc/tour-01-1.jpg", href: "/tours/phu-quoc" },
  { name: "Hue", caption: "Heritage, royal history & cuisine", image: "/tour/hoianmemories.jpg", href: "/travel/hue-day-trip-from-da-nang" },
];

export default function FlightsSearch() {
  return (
    <main className="min-h-screen bg-[#f1f8fb] text-slate-900">
      <header className="relative z-10 border-b border-[#ffffff35] bg-[#07364e] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <Link href="/" className="flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label="GoVietStay homepage">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-md shadow-black/20">
              <Image src="/brand/govietstay-official-logo.jpg" alt="GoVietStay official logo" width={100} height={100} className="h-full w-full object-contain" priority />
            </span>
            <span className="flex flex-col">
              <span className="text-xl font-black tracking-tight sm:text-2xl">GoVietStay</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#b6e8f1]">Trusted local support</span>
            </span>
          </Link>
          <nav className="flex flex-wrap items-center gap-3 text-sm font-bold sm:gap-6" aria-label="Flights page navigation">
            <Link href="/#experiences" className="text-sky-50 hover:text-[#a9ebfa]">Our tours</Link>
            <Link href="/travel" className="hidden text-sky-50 hover:text-[#a9ebfa] sm:inline">Travel guides</Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#23b973] px-4 py-2.5 text-white shadow-lg shadow-black/10 transition hover:bg-[#159861]">✆ Talk to a local</a>
          </nav>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-[#07415d] text-white">
        <Image src="/hero-hoian-new.png" alt="Hoi An Vietnam at dusk" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#03283feF] via-[#064565dc] to-[#063f5c70]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#06435e] to-transparent -z-10" />
        <div className="mx-auto grid max-w-7xl gap-6 px-5 pb-32 pt-14 sm:px-8 sm:pb-36 sm:pt-20 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] backdrop-blur-sm">
              <span className="text-lg" aria-hidden>✈</span> Flights to Vietnam • Local experiences
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.12] tracking-tight drop-shadow-sm sm:text-5xl lg:text-[3.8rem]">
              Your journey begins in the sky. <span className="text-[#c1f5ed]">The best stories begin here.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/90 sm:text-lg">
              Find flights to Vietnam and discover the country with a real local team beside you. From the first search to your first unforgettable day.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#flight-search" className="inline-flex items-center gap-2 rounded-full bg-[#f8c65a] px-6 py-3.5 text-sm font-black text-[#123c4b] shadow-xl shadow-black/15 transition hover:bg-[#ffe29b]">
                Search flights <span aria-hidden>↗</span>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/70 bg-white/15 px-6 py-3.5 text-sm font-black text-white backdrop-blur-sm transition hover:bg-white/25">
                Ask GoVietStay
              </a>
            </div>
          </div>
          <div className="hidden justify-self-end rounded-[1.7rem] border border-white/30 bg-white/15 p-5 backdrop-blur-lg lg:block">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/20 text-2xl" aria-hidden>🌏</span>
              <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#c2f0ff]">Fly in, explore more</p><p className="text-lg font-black">Da Nang · Hoi An · Hue · Phu Quoc</p></div>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-7 text-white/90">One place to search flights. A local friend to help plan everything after landing.</p>
          </div>
        </div>
      </section>

      <div className="relative mx-auto -mt-24 max-w-7xl px-4 pb-20 sm:px-8">
        <AviasalesSearch />

        <section className="mt-12">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#158b9c]">GoVietStay difference</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#08384f] sm:text-4xl">More than a plane ticket.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600">Find your flight through our search partner, then plan your Vietnam holiday with trusted local expertise.</p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <article key={item.title} className="rounded-[1.6rem] border border-[#ddebf1] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-900/10">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#e5f8fc] text-3xl" aria-hidden>{item.icon}</span>
                <h3 className="mt-5 text-lg font-black text-[#093c53]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#158b9c]">Discover Vietnam</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-[#08384f] sm:text-4xl">Land somewhere extraordinary.</h2>
            </div>
            <Link href="/#experiences" className="text-sm font-bold text-[#08769a] underline decoration-2 underline-offset-4 hover:text-[#05506b]">Explore all GoVietStay tours →</Link>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {destinations.map((destination) => (
              <Link key={destination.name} href={destination.href} className="group relative flex min-h-64 flex-col justify-end overflow-hidden rounded-[1.6rem] bg-[#0a4357] p-6 text-white shadow-lg">
                <Image src={destination.image} alt={destination.name + " travel destination"} fill sizes="(max-width: 768px) 100vw, 33vw" className="-z-0 object-cover transition duration-500 group-hover:scale-110" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#002739ed] via-[#003c5480] to-transparent" />
                <span className="relative z-10 text-2xl font-black">{destination.name} <span aria-hidden>↗</span></span>
                <span className="relative z-10 mt-1 text-sm font-medium text-white/90">{destination.caption}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative mt-14 overflow-hidden rounded-[2rem] bg-[#07394e] p-7 text-white sm:p-11">
          <div className="absolute -right-16 -top-20 h-60 w-60 rounded-full bg-[#2d9ab5]/30 blur-3xl" />
          <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9fe5ee]">Real people. Real Vietnam.</p>
              <h2 className="mt-3 max-w-2xl text-2xl font-black leading-tight sm:text-4xl">Got your flight? Let&apos;s make the trip unforgettable.</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#d3ebf4] sm:text-base">Private tours, airport pickup, local food and genuine travel support in Da Nang, Hoi An, Hue and Phu Quoc. Message David and the GoVietStay team directly.</p>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded-full bg-[#22bd75] px-7 py-4 text-sm font-black text-white shadow-lg transition hover:bg-[#159c60]">
              Chat on WhatsApp ↗
            </a>
          </div>
        </section>

        <p className="mx-auto mt-9 max-w-4xl text-center text-xs leading-6 text-slate-500">
          GoVietStay provides independent Vietnam tours and local travel support. Air tickets are offered and serviced by third-party travel providers through Aviasales; review fares, baggage allowances, visas, payment, changes and cancellation terms with the provider before booking.
        </p>
      </div>
    </main>
  );
}
