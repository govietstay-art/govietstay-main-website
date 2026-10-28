"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

const WA_NUMBER = "84937762607";
const destinations = [
  { name: "Da Nang", caption: "Coastal stays & easy airport access", image: "/tour/hoian.jpg" },
  { name: "Hoi An", caption: "Lantern-lit streets & charming retreats", image: "/hero-hoian-new.png" },
  { name: "Phu Quoc", caption: "Island resorts & beach escapes", image: "/tour/phuquoc/tour-01-1.jpg" },
  { name: "Hue", caption: "Heritage, gardens & quiet stays", image: "/tour/hue.jpg" },
];

function makeWhatsappUrl(message: string) {
  return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(message);
}

export default function HotelsClient() {
  const [destination, setDestination] = useState("Da Nang");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adults, setAdults] = useState("2");
  const [rooms, setRooms] = useState("1");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [dateError, setDateError] = useState("");
  const today = new Date().toLocaleDateString("en-CA");

  function sendInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!checkin || !checkout || checkout <= checkin) {
      setDateError("Please choose a check-out date later than your check-in date.");
      return;
    }
    setDateError("");
    const message = [
      "Hello GoVietStay! I would like help finding a hotel in Vietnam.",
      "",
      "Destination: " + destination,
      "Check-in: " + checkin,
      "Check-out: " + checkout,
      "Adults: " + adults,
      "Rooms: " + rooms,
      "Budget per night: " + (budget || "Please advise"),
      "Guest name: " + (name.trim() || "Not provided"),
      "Preferences: " + (notes.trim() || "No special requests"),
      "",
      "Please let me know suitable hotel options and availability. Thank you!",
    ].join("\n");
    window.open(makeWhatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen bg-[#f4f8f7] text-[#153b3b]">
      <header className="relative z-10 border-b border-white/10 bg-[#083b42] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="GoVietStay homepage">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-lg sm:h-14 sm:w-14 sm:rounded-2xl sm:p-1.5">
              <Image src="/brand/govietstay-official-logo.jpg" alt="GoVietStay official logo" width={100} height={100} className="h-full w-full object-contain" priority />
            </span>
            <span className="flex flex-col">
              <span className="text-lg font-black tracking-tight sm:text-2xl">GoVietStay</span>
              <span className="hidden text-[10px] font-bold uppercase tracking-[0.16em] text-[#b6ede5] sm:inline">Trusted local support</span>
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm font-bold sm:gap-6" aria-label="Hotel page navigation">
            <Link href="/flights" className="hidden hover:text-[#ffe095] sm:inline">✈ Flights</Link>
            <Link href="/hotel-alliance" className="hidden hover:text-[#ffe095] sm:inline">Hotel partners</Link>
            <Link href="/#experiences" className="hidden hover:text-[#ffe095] sm:inline">Tours</Link>
            <a href={makeWhatsappUrl("Hello GoVietStay, I have a question about hotels in Vietnam.")} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#23b973] px-3 py-2 text-xs shadow-lg transition hover:bg-[#189c60] sm:px-4 sm:py-2.5 sm:text-sm">WhatsApp ↗</a>
          </nav>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-[#084c4b] text-white">
        <Image src="/hotels-boutique-stay.webp" alt="Illustrative boutique hotel suite opening onto a lush tropical pool courtyard" fill priority sizes="100vw" className="-z-20 object-cover object-[58%_center]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#15352beb] via-[#1e5141cb] to-[#173a3140]" />
        <div className="mx-auto max-w-7xl px-5 pb-28 pt-12 sm:px-8 sm:pb-36 sm:pt-20">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] backdrop-blur-sm">🏨 Stay well · Explore more</span>
          <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.9rem]">
            Stay somewhere special. <span className="text-[#c3f3dd]">Feel at home in Vietnam.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/90 sm:text-lg">
            From a peaceful Hoi An hideaway to a beachfront stay in Phu Quoc, tell us what matters to you. Our local team can help you explore accommodation options.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#hotel-inquiry" className="rounded-full bg-[#f9c85c] px-6 py-3.5 text-sm font-black text-[#153b3b] shadow-xl transition hover:bg-[#ffe49b]">Find my stay ↗</a>
            <Link href="/flights" className="rounded-full border border-white/60 bg-white/15 px-6 py-3.5 text-sm font-black text-white backdrop-blur-sm hover:bg-white/25">✈ Need flights too?</Link>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-20 max-w-7xl px-4 pb-12 sm:px-8">
        <section id="hotel-inquiry" className="scroll-mt-5 overflow-hidden rounded-[1.8rem] border border-white bg-white shadow-[0_28px_90px_-25px_rgba(7,63,71,0.29)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2efeb] bg-gradient-to-r from-white to-[#effbf6] px-5 py-6 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e2f7ed] text-2xl" aria-hidden>🛎️</span>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#168b70]">Personal hotel assistance</p>
                <h2 className="mt-1 text-xl font-black text-[#123f41] sm:text-2xl">Tell us about your perfect stay</h2>
              </div>
            </div>
            <span className="rounded-full border border-[#c4e9dd] bg-white px-3 py-2 text-xs font-bold text-[#176c5d]">✓ No payment required to enquire</span>
          </div>
          <form onSubmit={sendInquiry} className="p-5 sm:p-8">
            <div className="grid gap-5 md:grid-cols-3">
              <label className="block text-sm font-bold text-[#20525a]">Destination
                <select value={destination} onChange={(e) => setDestination(e.target.value)} className="mt-2 w-full rounded-xl border border-[#c8dcd9] bg-white px-4 py-3.5 text-base text-[#183e43] outline-offset-2 focus:border-[#1b9d85]">
                  <option>Da Nang</option><option>Hoi An</option><option>Hue</option><option>Phu Quoc</option><option>Ho Chi Minh City</option><option>Hanoi</option><option>Other Vietnam destination</option>
                </select>
              </label>
              <label className="block text-sm font-bold text-[#20525a]">Check-in
                <input required type="date" min={today} value={checkin} onChange={(e) => { setCheckin(e.target.value); setDateError(""); }} className="mt-2 w-full rounded-xl border border-[#c8dcd9] bg-white px-4 py-3.5 text-base text-[#183e43] focus:border-[#1b9d85]" />
              </label>
              <label className="block text-sm font-bold text-[#20525a]">Check-out
                <input required type="date" min={checkin || today} value={checkout} onChange={(e) => { setCheckout(e.target.value); setDateError(""); }} className="mt-2 w-full rounded-xl border border-[#c8dcd9] bg-white px-4 py-3.5 text-base text-[#183e43] focus:border-[#1b9d85]" />
              </label>
              <label className="block text-sm font-bold text-[#20525a]">Adults
                <select value={adults} onChange={(e) => setAdults(e.target.value)} className="mt-2 w-full rounded-xl border border-[#c8dcd9] bg-white px-4 py-3.5 text-base text-[#183e43]"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6+</option></select>
              </label>
              <label className="block text-sm font-bold text-[#20525a]">Rooms
                <select value={rooms} onChange={(e) => setRooms(e.target.value)} className="mt-2 w-full rounded-xl border border-[#c8dcd9] bg-white px-4 py-3.5 text-base text-[#183e43]"><option>1</option><option>2</option><option>3</option><option>4+</option></select>
              </label>
              <label className="block text-sm font-bold text-[#20525a]">Approx. nightly budget (optional)
                <input value={budget} onChange={(e) => setBudget(e.target.value)} maxLength={80} placeholder="e.g. 60–100 USD" className="mt-2 w-full rounded-xl border border-[#c8dcd9] bg-white px-4 py-3.5 text-base text-[#183e43] placeholder:text-slate-400" />
              </label>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-bold text-[#20525a]">Your name (optional)
                <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} placeholder="How should we address you?" className="mt-2 w-full rounded-xl border border-[#c8dcd9] bg-white px-4 py-3.5 text-base text-[#183e43] placeholder:text-slate-400" />
              </label>
              <label className="block text-sm font-bold text-[#20525a]">Stay preferences (optional)
                <input value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={300} placeholder="Beachfront, family room, breakfast…" className="mt-2 w-full rounded-xl border border-[#c8dcd9] bg-white px-4 py-3.5 text-base text-[#183e43] placeholder:text-slate-400" />
              </label>
            </div>
            {dateError ? <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">{dateError}</p> : null}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#eff8f5] p-4 sm:p-5">
              <p className="max-w-xl text-sm leading-6 text-[#38656a]">Your request opens WhatsApp with the details pre-filled. This is an enquiry, not a confirmed room reservation. Our team will reply with options subject to availability and rates.</p>
              <button type="submit" className="w-full rounded-full bg-[#119d76] px-7 py-4 text-base font-black text-white shadow-lg shadow-emerald-900/15 transition hover:bg-[#087c60] sm:w-auto">Send hotel request ↗</button>
            </div>
          </form>
        </section>
      </div>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-labelledby="featured-naraco">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#128769]">GoVietStay Hotel Collection</p><h2 className="mt-2 text-3xl font-black text-[#123f41] sm:text-4xl">Handpicked places to stay</h2></div><p className="max-w-lg text-sm leading-6 text-[#507373]">Our founding hotel collection starts in Hoi An and will grow as more independent hotel partners in Da Nang join GoVietStay. Each property will have its own room types, photos and direct booking offer.</p></div>
        <div className="rounded-[2rem] border border-[#cce5d7] bg-white p-6 shadow-lg sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#128769]">Our first featured hotel · Hoi An</p><h2 id="featured-naraco" className="mt-2 text-3xl font-black text-[#123f41]">Discover Naraco Hoi An</h2><p className="mt-3 max-w-2xl leading-7 text-[#557571]">Explore five room categories, from Superior Double to Family Room, with breakfast and a welcome drink included.</p></div>
            <div className="rounded-2xl bg-[#e6f8e9] px-6 py-4 text-center"><p className="text-xs font-black uppercase text-[#147451]">Book directly with us</p><p className="mt-1 text-4xl font-black text-[#0f7f5f]">Save 10%</p></div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#e4efea] pt-6"><p className="text-sm text-[#567772]">Rooms from <span className="text-xl font-black text-[#0c8469]">585.000 ₫ / night</span> after the 10% offer. Rates and availability subject to confirmation.</p><Link href="/hotels/naraco" className="rounded-full bg-[#0e8e70] px-6 py-3.5 text-sm font-black text-white hover:bg-[#087359]">Explore Naraco rooms & prices ↗</Link></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#128769]">Explore Vietnam</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#123f41] sm:text-4xl">Where will you stay?</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#507373]">Tell us your preferred destination. We will help you look for accommodation that fits your plans.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((place) => (
            <button key={place.name} type="button" onClick={() => { setDestination(place.name); document.getElementById("hotel-inquiry")?.scrollIntoView({ behavior: "smooth" }); }} className="group overflow-hidden rounded-3xl bg-white text-left shadow-md ring-1 ring-[#e1edeb] transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-44 overflow-hidden">
                <Image src={place.image} alt={place.name + " in Vietnam"} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#146f60]">Explore ↗</span>
              </div>
              <div className="p-5"><h3 className="text-xl font-black text-[#16484b]">{place.name}</h3><p className="mt-2 text-sm leading-6 text-[#5e7777]">{place.caption}</p></div>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-[#093d43] px-5 py-14 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#9be7d0]">One trip. More possibilities.</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Your stay is just the beginning.</h2>
            <p className="mt-4 max-w-xl leading-8 text-white/80">Need flights, airport transfers or a special day out? GoVietStay can help you connect the pieces of your Vietnam journey.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/flights" className="rounded-full bg-[#f9c85c] px-6 py-3.5 text-sm font-black text-[#153b3b] hover:bg-[#ffe49b]">✈ Search flights</Link>
            <Link href="/#experiences" className="rounded-full border border-white/50 px-6 py-3.5 text-sm font-black hover:bg-white/10">Explore tours</Link>
            <a href={makeWhatsappUrl("Hello GoVietStay! Could you help me plan flights, hotels and tours in Vietnam?")} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/50 px-6 py-3.5 text-sm font-black hover:bg-white/10">Talk to our team</a>
          </div>
        </div>
      </section>
      <section className="border-t border-[#cfe4db] bg-[#e7f3ed] px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <div><p className="text-xs font-black uppercase tracking-[0.18em] text-[#16856b]">For independent hotels</p><h2 className="mt-2 text-2xl font-black text-[#154e45]">Own or manage a small hotel in Vietnam?</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#4f756a]">Apply to our founding Hotel Alliance: a quality-focused, two-way collaboration for independent properties.</p></div>
          <Link href="/hotel-alliance" className="rounded-full bg-[#0d9471] px-6 py-3.5 text-sm font-black text-white shadow-lg hover:bg-[#0b765b]">Join the Hotel Alliance ↗</Link>
        </div>
      </section>
      <footer className="bg-[#062c32] px-5 py-6 text-center text-xs leading-6 text-[#bdd8d8]">© 2026 GoVietStay. Hotel assistance is by enquiry; availability, final rates, payment and cancellation terms are confirmed before any booking.</footer>
    </main>
  );
}
