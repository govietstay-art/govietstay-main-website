"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

const WHATSAPP = "84937762607";
function waLink(text: string) {
  return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text);
}

const benefits = [
  { icon: "🌍", title: "Reach more international guests", desc: "Work with a local travel platform that introduces independent stays alongside Vietnam itineraries, transfers and experiences." },
  { icon: "🤝", title: "A genuine two-way partnership", desc: "GoVietStay can refer hotel enquiries; your team can introduce guests to GoVietStay tours and local services through the QR Partner programme." },
  { icon: "📣", title: "Grow your identity", desc: "Approved properties can be considered for a dedicated profile, travel content and visibility in relevant GoVietStay destination guides." },
  { icon: "💚", title: "Start small. Grow together.", desc: "No entry fee for the founding pilot. Partnership commissions and operating terms are agreed transparently before activation." },
];

const standards = [
  "Legally operating accommodation with a reachable owner or manager",
  "Clean rooms, essential guest safety and accurate photos and descriptions",
  "Transparent prices, cancellation conditions and payment requirements",
  "Responsive communication and fair handling of guest complaints",
  "Willingness to collaborate and improve the guest experience",
  "An independent hotel, boutique stay or quality small accommodation",
];

const steps = [
  { number: "01", title: "Apply", text: "Tell us about your property, standards and how to contact you." },
  { number: "02", title: "Review together", text: "Our team checks suitability and discusses the way each side can add value." },
  { number: "03", title: "Agree on terms", text: "Confirm rates, referral tracking, cancellation rules and commission conditions in writing." },
  { number: "04", title: "Pilot & improve", text: "Start with a small number of real enquiries, record outcomes and develop the partnership." },
];

export default function HotelAllianceClient() {
  const [hotel, setHotel] = useState("");
  const [location, setLocation] = useState("Da Nang");
  const [type, setType] = useState("Independent hotel");
  const [rooms, setRooms] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);

  function apply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hotel.trim() || !contact.trim() || !phone.trim() || !consent) return;
    const message = [
      "Hello GoVietStay, I would like to apply to the Independent Hotel Alliance founding pilot.",
      "",
      "Property: " + hotel.trim(),
      "Location: " + location,
      "Type: " + type,
      "Number of rooms: " + (rooms || "Not specified"),
      "Contact person: " + contact.trim(),
      "WhatsApp/phone: " + phone.trim(),
      "Website or listing: " + (website.trim() || "Not provided"),
      "About our property: " + (notes.trim() || "Not provided"),
      "",
      "I understand this is an application for review, not automatic acceptance. Please contact me about eligibility and partnership terms.",
    ].join("\n");
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen bg-[#f5f8f5] text-[#143d35]">
      <header className="border-b border-white/10 bg-[#082e30] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="GoVietStay home">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 sm:h-14 sm:w-14">
              <Image src="/brand/govietstay-official-logo.jpg" alt="GoVietStay official logo" width={100} height={100} priority className="h-full w-full object-contain" />
            </span>
            <span><span className="block text-lg font-black tracking-tight sm:text-2xl">GoVietStay</span><span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#ace5d2]">Independent Hotel Alliance</span></span>
          </Link>
          <nav aria-label="Alliance navigation" className="flex items-center gap-3 text-sm font-bold sm:gap-6">
            <Link href="/hotels" className="hidden hover:text-[#fbd47b] sm:inline">Hotels</Link>
            <Link href="/flights" className="hidden hover:text-[#fbd47b] sm:inline">Flights</Link>
            <a href="#apply" className="rounded-full bg-[#f5bd54] px-3 py-2.5 text-xs font-black text-[#143d35] hover:bg-[#ffda87] sm:px-5 sm:py-3 sm:text-sm">Become a partner ↗</a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#f8f7ef]">
        <div className="pointer-events-none absolute -right-20 -top-36 h-[480px] w-[480px] rounded-full bg-[#e3efe3] blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-[#ecf4e9] to-transparent" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-11 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#bfdccd] bg-white px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-[#15775e] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#28b47c]" aria-hidden="true" />
              Founding partner applications are open
            </div>
            <p className="mt-8 text-xs font-black uppercase tracking-[0.23em] text-[#1a9371]">GoVietStay Independent Hotel Alliance</p>
            <h1 className="mt-4 max-w-2xl text-[2.65rem] font-black leading-[1.07] tracking-[-0.04em] text-[#103c33] sm:text-6xl lg:text-[4.25rem]">
              Small hotels.<br /><span className="text-[#148a69]">Big possibilities.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#49665c] sm:text-lg">
              Your hotel has its own story. Let&apos;s help more travellers discover it — and build a stronger future together with independent hospitality businesses across Vietnam.
            </p>
            <p className="mt-4 max-w-xl text-sm font-bold text-[#206d58]">Independent hotels. Shared growth. Stronger together.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#apply" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f3bd50] px-7 py-4 text-sm font-black text-[#183b30] shadow-[0_12px_28px_rgba(191,131,33,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ffda88]">
                Apply to be a founding partner <span aria-hidden="true">↗</span>
              </a>
              <a href="#how-it-works" className="rounded-full border border-[#98b6a7] bg-white px-6 py-4 text-sm font-black text-[#295f4f] transition hover:bg-[#e6f4e9]">Discover the partnership</a>
            </div>
            <p className="mt-6 text-xs leading-6 text-[#779087]">No application fee · Independent review · No automatic membership</p>
          </div>
          <div className="relative">
            <div className="absolute -right-3 -top-4 z-10 rounded-2xl bg-[#f3c45a] px-5 py-3 text-xs font-black uppercase tracking-[0.1em] text-[#174d3b] shadow-lg sm:-right-5 sm:-top-5">Together we thrive ✦</div>
            <div className="relative aspect-[4/4.25] overflow-hidden rounded-[2.1rem] bg-[#164a3e] shadow-[0_30px_75px_-25px_rgba(14,65,49,0.36)] sm:aspect-[5/4] lg:aspect-[4/4.5]">
              <Image src="/hotel-alliance-partners.webp" alt="Illustrative photograph of independent boutique hotel owners sharing business ideas" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[65%_center]" />
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#082f2ae6] to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#d0e9db]">People first · Partnership always</p>
                <p className="mt-2 max-w-sm text-xl font-black leading-snug sm:text-2xl">A community built by people who care about hospitality.</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-[#d4e6d8] bg-white px-5 py-4 shadow-xl sm:block">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1a9070]">Founding pilot</p>
              <p className="mt-1 text-lg font-black text-[#164c3c]">Da Nang · Hoi An</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-4 px-5 pb-4 pt-8 sm:grid-cols-3 sm:px-8 sm:pt-10">
        {[
          { eyebrow: "Founding cohort target", value: "10 hotels", detail: "Starting in Da Nang & Hoi An" },
          { eyebrow: "Membership application", value: "Free", detail: "No upfront joining fee in the pilot" },
          { eyebrow: "Shared opportunity", value: "Two-way", detail: "Room enquiries + guest experiences" },
        ].map((item) => (
          <div key={item.value} className="rounded-3xl border border-[#d6e9e0] bg-white p-6 shadow-lg shadow-[#0b6156]/10">
            <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#20866c]">{item.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-black text-[#143f3d]">{item.value}</h2>
            <p className="mt-2 text-sm leading-6 text-[#597a75]">{item.detail}</p>
          </div>
        ))}
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#138064]">Not just another booking listing</p>
        <h2 className="mt-2 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">A partnership that creates value in both directions.</h2>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {benefits.map((item) => (
            <article key={item.title} className="rounded-3xl border border-[#deebe5] bg-white p-7 shadow-sm">
              <div className="text-3xl" aria-hidden>{item.icon}</div>
              <h3 className="mt-4 text-xl font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#55716c]">{item.desc}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-3xl bg-[#0b5550] p-7 text-white sm:p-9">
          <h3 className="text-2xl font-black">One guest. More opportunities. Shared success.</h3>
          <div className="mt-5 grid gap-4 text-sm leading-7 text-white/85 md:grid-cols-2">
            <p><strong className="text-[#e3f9e9]">GoVietStay → Hotel:</strong> We can introduce travellers interested in accommodation. Any hotel-booking commission is negotiated and documented with each property before launch.</p>
            <p><strong className="text-[#e3f9e9]">Hotel → GoVietStay:</strong> Approved hotels can join QR Partner to introduce guests to eligible local tours and services. The current tour-referral offer is 12%, subject to QR Partner programme conditions.</p>
          </div>
          <p className="mt-4 border-t border-white/20 pt-4 text-xs leading-6 text-white/75">This is a partner application programme, not a claim that partner hotels are already enrolled. Membership, rates, referral credit and payments begin only after a written agreement.</p>
        </div>
      </section>

      <section className="bg-[#eaf4ed] px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#138064]">Quality before quantity</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Who belongs in our alliance?</h2>
            <p className="mt-5 max-w-xl leading-8 text-[#4c7167]">Boutique hotels, family-run properties, independent hotels and quality small stays that value trustworthy service, collaboration and long-term growth.</p>
            <div className="mt-7 rounded-2xl border border-[#c6dfd0] bg-white p-5 text-sm leading-7 text-[#42685e]">We welcome ambitious businesses of modest size — including newer properties — as long as guest standards and operating requirements can be verified.</div>
          </div>
          <div className="rounded-3xl border border-[#d4e7db] bg-white p-6 shadow-md sm:p-8">
            <h3 className="text-xl font-black">Our initial qualification checklist</h3>
            <ul className="mt-5 space-y-4">
              {standards.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[#395e57]"><span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#dff5e7] text-sm font-black text-[#0e8b69]">✓</span>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#138064]">A practical pilot</p>
        <h2 className="mt-2 text-3xl font-black sm:text-4xl">Four simple steps to start.</h2>
        <div className="mt-9 grid gap-5 md:grid-cols-4">
          {steps.map((step) => <div key={step.number} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#dbe9e0]"><p className="text-3xl font-black text-[#17a483]">{step.number}</p><h3 className="mt-4 text-lg font-black">{step.title}</h3><p className="mt-3 text-sm leading-7 text-[#55766b]">{step.text}</p></div>)}
        </div>
      </section>

      <section id="apply" className="bg-[#083d3b] px-5 py-18 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#98e8ce]">Founding partner applications</p>
            <h2 className="mt-3 text-4xl font-black leading-tight">Let&apos;s grow together.</h2>
            <p className="mt-6 leading-8 text-white/80">Tell us a little about your property. Your application opens as a WhatsApp message to the GoVietStay team so we can speak directly and assess whether this founding cohort is a good fit.</p>
            <p className="mt-5 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm leading-7 text-white/80">Pilot focus: independent hotels in Da Nang and Hoi An. Other Vietnam locations can express interest for later phases.</p>
            <Link href="/hotels" className="mt-6 inline-block font-bold text-[#f3d98b] underline underline-offset-4">See the guest-facing Hotels page ↗</Link>
          </div>
          <form onSubmit={apply} className="rounded-[1.8rem] bg-white p-6 text-[#123f3a] shadow-2xl sm:p-8">
            <h3 className="text-2xl font-black">Apply to join the alliance</h3>
            <p className="mt-2 text-sm leading-6 text-[#60807a]">No fee to apply. Applications are reviewed individually.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-bold">Hotel / property name *
                <input required maxLength={120} value={hotel} onChange={(e)=>setHotel(e.target.value)} placeholder="Your property name" className="mt-2 w-full rounded-xl border border-[#cbded6] px-4 py-3.5 text-base font-normal" />
              </label>
              <label className="text-sm font-bold">City / destination *
                <select value={location} onChange={(e)=>setLocation(e.target.value)} className="mt-2 w-full rounded-xl border border-[#cbded6] bg-white px-4 py-3.5 text-base font-normal"><option>Da Nang</option><option>Hoi An</option><option>Hue</option><option>Phu Quoc</option><option>Other Vietnam city</option></select>
              </label>
              <label className="text-sm font-bold">Property type
                <select value={type} onChange={(e)=>setType(e.target.value)} className="mt-2 w-full rounded-xl border border-[#cbded6] bg-white px-4 py-3.5 text-base font-normal"><option>Independent hotel</option><option>Boutique hotel</option><option>Family-run hotel</option><option>Homestay / guesthouse</option><option>Other accommodation</option></select>
              </label>
              <label className="text-sm font-bold">Number of rooms
                <input type="number" min="1" max="1000" value={rooms} onChange={(e)=>setRooms(e.target.value)} placeholder="e.g. 20" className="mt-2 w-full rounded-xl border border-[#cbded6] px-4 py-3.5 text-base font-normal" />
              </label>
              <label className="text-sm font-bold">Owner / manager name *
                <input required maxLength={100} value={contact} onChange={(e)=>setContact(e.target.value)} placeholder="Contact person" className="mt-2 w-full rounded-xl border border-[#cbded6] px-4 py-3.5 text-base font-normal" />
              </label>
              <label className="text-sm font-bold">WhatsApp / phone *
                <input required type="tel" maxLength={35} value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+84…" className="mt-2 w-full rounded-xl border border-[#cbded6] px-4 py-3.5 text-base font-normal" />
              </label>
            </div>
            <label className="mt-4 block text-sm font-bold">Website / Google Maps listing (optional)
              <input maxLength={250} value={website} onChange={(e)=>setWebsite(e.target.value)} placeholder="Property link" className="mt-2 w-full rounded-xl border border-[#cbded6] px-4 py-3.5 text-base font-normal" />
            </label>
            <label className="mt-4 block text-sm font-bold">Tell us about your hotel (optional)
              <textarea maxLength={500} rows={3} value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="What makes your property special?" className="mt-2 w-full rounded-xl border border-[#cbded6] px-4 py-3.5 text-base font-normal" />
            </label>
            <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-6 text-[#53746b]"><input required type="checkbox" checked={consent} onChange={(e)=>setConsent(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#159773]" />I agree to send these details to GoVietStay via WhatsApp for partnership review. Submitting does not create a membership agreement.</label>
            <button type="submit" className="mt-6 w-full rounded-full bg-[#129b75] px-6 py-4 text-base font-black text-white shadow-lg hover:bg-[#0b775b]">Send partner application via WhatsApp ↗</button>
          </form>
        </div>
      </section>
      <footer className="bg-[#062d2d] px-5 py-6 text-center text-xs leading-6 text-[#bdd9ce]">© 2026 GoVietStay · Independent Hotel Alliance. Pilot membership is subject to verification, acceptance and written partnership terms.</footer>
    </main>
  );
}
