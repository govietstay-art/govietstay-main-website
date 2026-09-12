import type { Metadata } from "next";
import JsonLd from "../../../components/JsonLd";

const BASE_URL = "https://www.govietstay.com";
const canonical = `${BASE_URL}/en/cruise-port-shore-excursions`;
const LAST_CHECKED = "12 September 2026";

// Official Chan May Port vessel plan checked on 12 September 2026.
// These are port ETA/ETD values, NOT the passenger's all-aboard time.
const chanMayCalls: string[][] = [
  ["14 Sep 2026", "Adora Magic City", "08:00", "20:00"],
  ["22 Sep 2026", "Dream", "06:00", "15:00"],
  ["13 Oct 2026", "Royal Princess", "07:00", "17:00"],
  ["16 Oct 2026", "Viking Venus", "06:00", "18:00"],
  ["17 Oct 2026", "Dream", "08:00", "21:00"],
  ["26 Oct 2026", "Navigator of the Seas", "07:00", "19:00"],
  ["03 Nov 2026", "Dream", "08:00", "21:00"],
  ["04 Nov 2026", "Viking Orion", "08:00", "18:30"],
  ["17 Nov 2026", "Celebrity Millennium", "07:00", "18:00"],
  ["18 Nov 2026", "Spectrum of the Seas", "07:00", "19:00"],
  ["25 Nov 2026", "Adora Flora City", "08:00", "20:00"],
  ["05 Dec 2026", "Diamond Princess", "07:00", "17:00"],
  ["07 Dec 2026", "Adora Flora City", "07:00", "20:00"],
  ["16 Dec 2026", "Diamond Princess", "07:00", "17:00"],
  ["21 Dec 2026", "Sapphire Princess", "07:00", "19:00"],
  ["25 Dec 2026", "Nautica", "07:00", "18:00"],
  ["26 Dec 2026", "Silver Muse", "08:00", "23:00"],
  ["27 Dec 2026", "Celebrity Solstice", "07:00", "18:00"],
  ["30 Dec 2026", "Norwegian Jade", "07:00", "15:30"],
];

// Advance Da Nang-region cruise planning reference.
// Final berth (Tien Sa / Chan May / other permitted berth) must be reconfirmed.
const daNangRegionalCalls: string[][] = [
  ["04 Nov 2026", "Azamara Pursuit", "08:00", "20:00"],
  ["17 Nov 2026", "Star Seeker", "06:00", "23:00"],
  ["24 Nov 2026", "Seabourn Encore", "07:00", "17:00"],
  ["25 Nov 2026", "Ritz-Carlton Luminara", "08:00", "20:00"],
  ["27 Nov 2026", "Westerdam", "08:00", "18:00"],
  ["15 Dec 2026", "Westerdam", "07:00", "23:00"],
  ["29 Dec 2026", "Star Seeker", "06:00", "23:00"],
  ["31 Dec 2026", "Seabourn Encore", "08:00", "18:00"],
  ["06 Jan 2027", "Celebrity Solstice", "08:00", "20:00"],
  ["08 Jan 2027", "Seabourn Encore", "08:00", "18:00"],
  ["21 Jan 2027", "Celebrity Solstice", "07:00", "19:00"],
  ["24 Jan 2027", "Norwegian Jade", "07:00", "15:30"],
  ["27 Jan 2027", "Silver Muse", "07:00", "23:00"],
  ["30 Jan 2027", "Celebrity Solstice", "08:00", "20:00"],
];

export const metadata: Metadata = {
  title: "Chan May & Tien Sa Cruise Port Shore Excursions 2026–2027 | GoVietStay",
  description:
    "Private shore excursions from Chan May and Tien Sa ports with current cruise-call planning, port pickup coordination, Hue, Da Nang, Hoi An, Ba Na Hills and safe return-to-ship timing.",
  keywords: [
    "Chan May Port shore excursion",
    "Tien Sa Port shore excursion",
    "Da Nang cruise port tour",
    "Hue cruise port tour",
    "private shore excursion Vietnam",
    "Chan May to Hue",
    "Tien Sa to Hoi An",
  ],
  alternates: {
    canonical,
    languages: {
      en: canonical,
      ru: `${BASE_URL}/ru/cruise-port-shore-excursions`,
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonical,
    siteName: "GoVietStay",
    title: "Private Shore Excursions from Chan May & Tien Sa Ports",
    description:
      "Know exactly what you can realistically visit during your time ashore — with private transport, port pickup coordination and a safe return-to-ship plan.",
    images: [`${BASE_URL}/hero-hoian-new.png`],
  },
};

const portCards = [
  {
    title: "Chan May Port",
    subtitle: "Best for Hue, Lang Co and Hai Van Pass",
    facts: [
      "Lang Co: approx. 20–25 min",
      "Hue: approx. 75–90 min",
      "Da Nang: approx. 75–90 min",
      "Hoi An: approx. 105–120 min",
    ],
  },
  {
    title: "Tien Sa Port",
    subtitle: "Best for Da Nang, Marble Mountains and Hoi An",
    facts: [
      "Da Nang center: approx. 20–30 min",
      "Marble Mountains: approx. 35–45 min",
      "Hoi An: approx. 50–65 min",
      "Ba Na Hills: approx. 60–75 min",
    ],
  },
];

const chanMayPlans = [
  {
    time: "About 5 hours ashore",
    title: "Lang Co + Hai Van Pass",
    plan: "Port → Lang Co viewpoint / lagoon → Hai Van Pass photo stop → return to Chan May Port.",
    note: "Best when the ship has a short call. We do not recommend forcing Hue into a very short window.",
  },
  {
    time: "About 7 hours ashore",
    title: "Hue Highlights",
    plan: "Port → Hue → Imperial City or selected royal tomb → Thien Mu Pagoda → local lunch if time allows → port.",
    note: "A strong first-time option. The exact number of stops depends on ship arrival, port exit time and all-aboard time.",
  },
  {
    time: "About 9 hours ashore",
    title: "Fuller Hue Private Day",
    plan: "Port → Hue → Imperial City → Thien Mu Pagoda → selected royal tomb → local lunch → return to ship.",
    note: "This gives a more complete Hue experience while preserving a return buffer.",
  },
];

const tienSaPlans = [
  {
    time: "About 5 hours ashore",
    title: "Da Nang Essentials",
    plan: "Port → Son Tra / Linh Ung Pagoda → My Khe viewpoint → Marble Mountains if time allows → port.",
    note: "A compact route with minimal road risk and more sightseeing time.",
  },
  {
    time: "About 7 hours ashore",
    title: "Da Nang + Hoi An",
    plan: "Port → Marble Mountains → Hoi An Ancient Town → local lunch or coffee → return to Tien Sa Port.",
    note: "One of the best-balanced cruise routes from Tien Sa.",
  },
  {
    time: "About 9 hours ashore",
    title: "Hoi An + Coconut Forest OR Ba Na Hills",
    plan: "Choose Hoi An + Cam Thanh Coconut Forest, or Ba Na Hills as the main destination. We normally avoid combining too many distant attractions in one port day.",
    note: "Private routing is adjusted to mobility, queue conditions and all-aboard time.",
  },
];

const faq = [
  {
    q: "Can you pick us up directly at the ship?",
    a: "When port access is authorized, we coordinate the required vehicle and passenger information for the permitted pickup area. The exact meeting point can vary by ship, berth and port security rules, so we confirm it before arrival rather than promising a fixed point in advance.",
  },
  {
    q: "How much time do you keep for the return to the ship?",
    a: "We plan backward from the ship's all-aboard time, not only from the published departure time. A practical safety buffer is normally built in and may be increased for traffic, weather, large-ship days or port procedures.",
  },
  {
    q: "Can you customize the itinerary?",
    a: "Yes. Send the ship name, date, docking time, all-aboard time, number of guests, mobility needs and preferred guide language. We will suggest only the stops that are realistic for that call.",
  },
  {
    q: "Do you provide Russian-speaking guides?",
    a: "Yes, Russian-speaking guidance can be requested in advance, subject to availability. English-speaking guides and private driver-only options can also be arranged.",
  },
];

function ScheduleTable({ rows }: { rows: string[][] }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-white/10 text-slate-100">
          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Ship</th>
            <th className="px-4 py-3">Port ETA</th>
            <th className="px-4 py-3">Port ETD</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((row) => (
            <tr key={`${row[0]}-${row[1]}`} className="bg-slate-950/40">
              {row.map((cell, index) => (
                <td key={`${cell}-${index}`} className="whitespace-nowrap px-4 py-3 text-slate-300">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default function Page() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Chan May & Tien Sa Cruise Port Shore Excursions",
        url: canonical,
        provider: { "@id": `${BASE_URL}/#organization` },
        areaServed: ["Hue", "Da Nang", "Hoi An", "Chan May Port", "Tien Sa Port"],
        serviceType: "Private cruise shore excursions and port pickup coordination",
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd data={graph} />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.18),transparent_30%)]" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
            <a href="/" aria-label="GoVietStay home" className="inline-flex rounded-2xl bg-white p-2 shadow-2xl">
              <img
                src="/brand/govietstay-official-logo.jpg"
                alt="GoVietStay official logo"
                className="h-16 w-auto rounded-xl object-contain md:h-20"
              />
            </a>
            <div className="text-right text-xs leading-6 text-slate-400">
              <div className="font-bold text-slate-200">Trusted Local Support</div>
              <div>Da Nang • Hoi An • Hue • Phu Quoc</div>
              <div>WhatsApp +84 937 762 607</div>
            </div>
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">GoVietStay • Central Vietnam Cruise Support</p>
          <h1 className="max-w-5xl text-4xl font-black leading-tight md:text-6xl">Chan May & Tien Sa Port Shore Excursions</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Private shore days built around one question: <strong className="text-white">what can you realistically see and still return to your ship safely?</strong></p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            {["Private car / van","Port pickup coordination","English & Russian support","Return-to-ship planning"].map((x)=><span key={x} className="rounded-full border border-white/15 bg-white/5 px-4 py-2">✓ {x}</span>)}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="https://wa.me/84937762607?text=Hello%20GoVietStay%2C%20I%20need%20a%20private%20shore%20excursion.%20Ship%3A%20__%20Date%3A%20__%20Port%3A%20Chan%20May%20%2F%20Tien%20Sa%20Guests%3A%20__%20Arrival%3A%20__%20All%20aboard%3A%20__" className="rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950">Send ship details on WhatsApp</a>
            <a href="#itineraries" className="rounded-xl border border-white/20 px-6 py-3 font-semibold">See realistic day plans</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5 text-amber-50">
          <strong>Important for cruise guests:</strong> we calculate the day from your <strong>all-aboard time</strong>, not just the ship departure time. Port access and the exact pickup point are subject to ship, berth and security approval.
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {portCards.map((p)=><article key={p.title} className="rounded-3xl border border-white/10 bg-white/5 p-7"><p className="text-sm font-bold uppercase tracking-wider text-sky-300">Cruise port</p><h2 className="mt-2 text-3xl font-black">{p.title}</h2><p className="mt-2 text-slate-300">{p.subtitle}</p><ul className="mt-6 space-y-3 text-slate-200">{p.facts.map((x)=><li key={x}>• {x}</li>)}</ul><p className="mt-5 text-xs leading-5 text-slate-500">Driving times are planning estimates and can change with traffic, weather, road works and port exit procedures.</p></article>)}
        </div>
      </section>

      <section id="schedule" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Cruise schedule watch</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Upcoming cruise calls we are tracking</h2>
            </div>
            <div className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-400">Last checked: {LAST_CHECKED}</div>
          </div>

          <div className="mt-8 rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-5 md:p-7">
            <h3 className="text-2xl font-black">Chan May — official port plan</h3>
            <p className="mt-2 max-w-4xl leading-7 text-slate-300">
              These passenger-cruise calls are taken from the published Chan May Port vessel plan. Times are port ETA/ETD, not your personal all-aboard deadline. Operational changes are possible.
            </p>
            <ScheduleTable rows={chanMayCalls} />
            <p className="mt-4 text-xs leading-6 text-slate-400">
              Source checked 12 Sep 2026: Chan May Port official “Kế hoạch tàu vào cảng”. Always reconfirm with your cruise line before leaving the ship.
            </p>
            <a className="mt-3 inline-block text-sm font-bold text-sky-300 underline" href="https://www.chanmayport.com.vn/ke-hoach-tau-vao-cang" target="_blank" rel="noreferrer">
              Official Chan May Port vessel plan ↗
            </a>
          </div>

          <div className="mt-6 rounded-3xl border border-sky-400/20 bg-sky-400/5 p-5 md:p-7">
            <h3 className="text-2xl font-black">Da Nang / Tien Sa — advance planning reference</h3>
            <p className="mt-2 max-w-4xl leading-7 text-slate-300">
              These published Da Nang-region calls help us prepare drivers and guides early. <strong className="text-white">They do not prove the final berth is Tien Sa.</strong> Some cruise listings use “Da Nang” for the wider destination while the actual berth may be Chan May, Tien Sa or another permitted berth.
            </p>
            <ScheduleTable rows={daNangRegionalCalls} />
            <p className="mt-4 text-xs leading-6 text-slate-400">
              Planning reference cross-checked against public cruise calendars. Final berth, pickup permission and meeting point are reconfirmed for the specific ship call.
            </p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm font-bold">
              <a className="text-sky-300 underline" href="https://danangport.com/dich-vu-khach-hang/?lang=en" target="_blank" rel="noreferrer">Da Nang Port customer services ↗</a>
              <a className="text-sky-300 underline" href="https://www.cruisetimetables.com/da-nang-vietnam-cruise-ship-schedule.html" target="_blank" rel="noreferrer">Public Da Nang cruise calendar ↗</a>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5 leading-7 text-amber-50">
            <strong>Do not plan from ETD alone.</strong> Your ship’s all-aboard time is normally earlier. GoVietStay plans the route backward from the all-aboard time supplied by the passenger and keeps a practical return buffer.
          </div>
        </div>
      </section>

      <section id="itineraries" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="text-3xl font-black md:text-4xl">How much can you really see in one port day?</h2>
          <p className="mt-3 max-w-3xl text-slate-300">These examples assume the usable time ashore starts after guests clear the ship and port procedures. We shorten or expand the route based on your exact call.</p>

          <h3 className="mt-10 text-2xl font-extrabold text-sky-300">From Chan May Port</h3>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">{chanMayPlans.map((x)=><article key={x.time} className="rounded-2xl border border-white/10 bg-slate-900 p-6"><p className="text-sm font-bold text-emerald-300">{x.time}</p><h4 className="mt-2 text-xl font-black">{x.title}</h4><p className="mt-3 leading-7 text-slate-300">{x.plan}</p><p className="mt-4 text-sm leading-6 text-slate-400">{x.note}</p></article>)}</div>

          <h3 className="mt-12 text-2xl font-extrabold text-sky-300">From Tien Sa Port</h3>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">{tienSaPlans.map((x)=><article key={x.time} className="rounded-2xl border border-white/10 bg-slate-900 p-6"><p className="text-sm font-bold text-emerald-300">{x.time}</p><h4 className="mt-2 text-xl font-black">{x.title}</h4><p className="mt-3 leading-7 text-slate-300">{x.plan}</p><p className="mt-4 text-sm leading-6 text-slate-400">{x.note}</p></article>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <h2 className="text-3xl font-black">What we need from you</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 text-slate-200">{["Ship name","Cruise date","Port: Chan May or Tien Sa","Scheduled docking time","All-aboard time","Number of adults / children","Preferred guide language","Mobility or walking limits"].map((x)=><div key={x} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">{x}</div>)}</div>
          </div>
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-7">
            <h2 className="text-2xl font-black">Our cruise-day rule</h2>
            <p className="mt-4 leading-7 text-slate-200">We would rather remove one attraction than create an unsafe return. Your itinerary is planned backward from all aboard, with a practical buffer for road and port conditions.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/70">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
            <div className="rounded-3xl bg-white p-5">
              <img src="/brand/govietstay-official-logo.jpg" alt="GoVietStay official logo" className="mx-auto h-28 w-auto rounded-xl object-contain" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Real local coordination</p>
              <h2 className="mt-2 text-3xl font-black">Who is coordinating your cruise day?</h2>
              <p className="mt-4 leading-7 text-slate-300">
                GoVietStay is a Vietnam travel support company coordinating private tours, transfers and local assistance in Central Vietnam. Our Da Nang coordination office is <strong className="text-white">Room 106, Vicoland Building, 01 Le Thanh Nghi, Hoa Cuong Ward, Da Nang, Vietnam</strong>.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 text-sm">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4"><strong>Office hours</strong><br />07:30–22:00 daily</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4"><strong>WhatsApp</strong><br />+84 937 762 607</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4"><strong>Email</strong><br />govietstay@gmail.com</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4"><strong>Website</strong><br />www.govietstay.com</div>
              </div>
              <p className="mt-4 text-xs leading-6 text-slate-500">The Da Nang office is our coordination office, not a cruise terminal. The exact port meeting point is confirmed separately for your ship call.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-900/60">
        <div className="mx-auto max-w-4xl px-5 py-14">
          <h2 className="text-3xl font-black">FAQ for cruise passengers</h2>
          <div className="mt-6 space-y-4">{faq.map((item)=><details key={item.q} className="rounded-2xl border border-white/10 bg-white/5 p-5"><summary className="cursor-pointer font-bold">{item.q}</summary><p className="mt-3 leading-7 text-slate-300">{item.a}</p></details>)}</div>

          <div className="mt-10 rounded-3xl bg-white p-7 text-slate-950">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Fast quote</p>
            <h2 className="mt-2 text-3xl font-black">Send your ship schedule — we will tell you what is actually possible.</h2>
            <p className="mt-3 text-slate-600">No need to choose a tour first. Send the port call details and we will build the safest realistic route for your time ashore.</p>
            <a href="https://wa.me/84937762607?text=Hello%20GoVietStay%2C%20I%20need%20a%20shore%20excursion%20plan.%20Ship%3A%20__%20Date%3A%20__%20Port%3A%20__%20Guests%3A%20__%20Arrival%3A%20__%20All%20aboard%3A%20__" className="mt-6 inline-block rounded-xl bg-slate-950 px-6 py-3 font-bold text-white">WhatsApp GoVietStay</a>
          </div>
        </div>
      </section>
    </main>
  );
}
