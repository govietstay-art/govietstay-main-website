"use client";

import { useState } from "react";
import { fastTrackPrices, urgentPrices } from "./prices";

const field = "w-full rounded-xl border border-[#0b6b4f]/20 bg-white px-4 py-3 text-base text-[#06251b] outline-none focus:border-[#0b6b4f] focus:ring-2 focus:ring-[#0b6b4f]/15";
const label = "mb-2 block text-sm font-bold text-[#06251b]";

export default function VisaPlanner() {
  const [entryDate, setEntryDate] = useState("");
  const [entryTime, setEntryTime] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [flightTime, setFlightTime] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [entryPort, setEntryPort] = useState("");
  const [exitPort, setExitPort] = useState("");
  const [hotel, setHotel] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("new");
  const [entryType, setEntryType] = useState<"single" | "multiple">("single");
  const [location, setLocation] = useState<"HAN" | "SGN">("HAN");
  const [speed, setSpeed] = useState("standard");
  const [travelers, setTravelers] = useState(1);
  const [fastTrack, setFastTrack] = useState(false);
  const [fastTrackAirport, setFastTrackAirport] = useState<"" | keyof typeof fastTrackPrices>("");

  const options = urgentPrices[location];
  const urgent = options.find((option) => option.label === speed);
  const visaPrice = entryType === "single" ? 37 : 62;
  const fastTrackPrice = fastTrack && fastTrackAirport ? fastTrackPrices[fastTrackAirport] : 0;
  const perPerson = visaPrice + (urgent?.price ?? 0) + fastTrackPrice;
  const total = perPerson * travelers;
  const entry = entryDate && entryTime ? new Date(`${entryDate}T${entryTime}:00+07:00`) : null;
  const hoursToEntry = entry && !Number.isNaN(entry.getTime()) ? Math.ceil((entry.getTime() - Date.now()) / 3600000) : null;
  const closeToTravel = hoursToEntry !== null && hoursToEntry < 120;
  const invalidDates = Boolean(entryDate && exitDate && exitDate < entryDate);
  const requestedDays = entryDate && exitDate ? Math.round((Date.parse(`${exitDate}T00:00:00Z`) - Date.parse(`${entryDate}T00:00:00Z`)) / 86400000) + 1 : null;
  const exceedsVisaPeriod = requestedDays !== null && requestedDays > 90;
  const needFlight = closeToTravel && (!flightDate || !flightTime || !departureAirport.trim() || !flightNumber.trim());
  const canSend = Boolean(nationality.trim() && entryDate && entryTime && exitDate && entryPort.trim() && contact.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !invalidDates && !exceedsVisaPeriod && !needFlight && (!fastTrack || fastTrackAirport) && (hoursToEntry === null || hoursToEntry > 0));
  const todayParts = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date()).map(({ type, value }) => [type, value]));
  const vietnamToday = `${todayParts.year}-${todayParts.month}-${todayParts.day}`;
  let weekdaysRemaining = 0;
  if (entryDate && entryDate > vietnamToday) {
    const cursor = new Date(`${vietnamToday}T00:00:00Z`);
    cursor.setUTCDate(cursor.getUTCDate() + 1);
    while (cursor.toISOString().slice(0, 10) < entryDate && weekdaysRemaining <= 365) {
      if (cursor.getUTCDay() !== 0 && cursor.getUTCDay() !== 6) weekdaysRemaining++;
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
  }

  const message = [
    "Hello GoVietStay, please check my Vietnam e-Visa request before payment.",
    `Nationality / passport country: ${nationality}`,
    `Travelers: ${travelers}`,
    `Entry type: ${entryType === "single" ? "Single" : "Multiple"} (up to 90 days requested)`,
    `Expected Vietnam entry: ${entryDate} ${entryTime} (Vietnam time)`,
    `Expected exit: ${exitDate}`,
    `Entry port: ${entryPort}`,
    `Exit port: ${exitPort || "To confirm"}`,
    `Flight to Vietnam: ${flightDate || "To confirm"} ${flightTime || ""}; ${flightNumber || "flight number to confirm"}`,
    `Departure airport: ${departureAirport || "To confirm"}`,
    `Vietnam accommodation: ${hotel || "To confirm"}`,
    `Application: ${applicationStatus === "new" ? "New application" : applicationStatus === "pending" ? "Already submitted; awaiting result" : "Existing application has an issue"}`,
    `Processing requested: ${speed === "standard" ? "Standard (approximately 4–5 working days)" : `${speed} via ${location}`}`,
    `Airport fast track: ${fastTrack ? `${fastTrackAirport} (US$${fastTrackPrice} per person)` : "No"}`,
    applicationStatus === "new" ? `Estimated total: US$${total} (${travelers} × US$${perPerson}), subject to case review` : "Price: please quote after reviewing the existing application",
    `Contact / WhatsApp: ${contact}`,
    `Email: ${email}`,
    "I will attach for EACH traveler: a clear full passport data page and a recent front-facing portrait against a light background. Please confirm eligibility, timing, total cost and any additional information needed.",
  ].join("\n");

  return (
    <section id="plan-visa" className="bg-[#f7f1df] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#0b6b4f]">Plan your application</p>
        <h2 className="mt-3 text-3xl font-black md:text-5xl">Your travel details & estimated cost</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#06251b]/70">Complete this once, then send your request and photos together via WhatsApp. We check eligibility, processing availability and the final amount before payment.</p>

        <div className="mt-9 grid gap-7 lg:grid-cols-[1.4fr_.8fr] lg:items-start">
          <div className="rounded-[2rem] bg-white p-5 shadow-[0_18px_60px_rgba(6,37,27,.08)] md:p-8">
            <h3 className="text-xl font-black">1. Travel and contact details</h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div><label className={label} htmlFor="visa-nationality">Nationality / passport country *</label><input id="visa-nationality" className={field} value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="As shown on passport" /></div>
              <div><label className={label} htmlFor="visa-travelers">Number of applicants *</label><input id="visa-travelers" className={field} type="number" min="1" max="20" value={travelers} onChange={(e) => setTravelers(Math.min(20, Math.max(1, Number(e.target.value) || 1)))} /></div>
              <div><label className={label} htmlFor="visa-entry">Vietnam arrival date *</label><input id="visa-entry" className={field} type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} /></div>
              <div><label className={label} htmlFor="visa-entry-time">Arrival time (Vietnam time) *</label><input id="visa-entry-time" className={field} type="time" value={entryTime} onChange={(e) => setEntryTime(e.target.value)} /></div>
              <div><label className={label} htmlFor="visa-exit">Expected exit date *</label><input id="visa-exit" className={field} type="date" value={exitDate} onChange={(e) => setExitDate(e.target.value)} /></div>
              <div><label className={label} htmlFor="visa-port">Vietnam entry port *</label><input id="visa-port" className={field} value={entryPort} onChange={(e) => setEntryPort(e.target.value)} placeholder="E.g. Da Nang airport" /></div>
              <div><label className={label} htmlFor="visa-exit-port">Expected exit port</label><input id="visa-exit-port" className={field} value={exitPort} onChange={(e) => setExitPort(e.target.value)} placeholder="Airport or border crossing" /></div>
              <div><label className={label} htmlFor="visa-hotel">Accommodation in Vietnam</label><input id="visa-hotel" className={field} value={hotel} onChange={(e) => setHotel(e.target.value)} placeholder="Hotel name, address, city" /></div>
              <div><label className={label} htmlFor="visa-flight-date">Flight departure date</label><input id="visa-flight-date" className={field} type="date" value={flightDate} onChange={(e) => setFlightDate(e.target.value)} /></div>
              <div><label className={label} htmlFor="visa-flight-time">Flight departure time (local)</label><input id="visa-flight-time" className={field} type="time" value={flightTime} onChange={(e) => setFlightTime(e.target.value)} /></div>
              <div><label className={label} htmlFor="visa-airport">Departure airport</label><input id="visa-airport" className={field} value={departureAirport} onChange={(e) => setDepartureAirport(e.target.value)} placeholder="City / airport code" /></div>
              <div><label className={label} htmlFor="visa-flight">Flight number</label><input id="visa-flight" className={field} value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} placeholder="E.g. QR 970" /></div>
              <div><label className={label} htmlFor="visa-contact">WhatsApp / phone *</label><input id="visa-contact" className={field} type="tel" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Include country code" /></div>
              <div><label className={label} htmlFor="visa-email">Email *</label><input id="visa-email" className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="For visa updates" /></div>
            </div>

            <h3 className="mt-9 text-xl font-black">2. Choose the service</h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div><label className={label} htmlFor="visa-type">Entry type</label><select id="visa-type" className={field} value={entryType} onChange={(e) => setEntryType(e.target.value as "single" | "multiple")}><option value="single">Single entry · US$37</option><option value="multiple">Multiple entry · US$62</option></select></div>
              <div><label className={label} htmlFor="visa-status">Current application status</label><select id="visa-status" className={field} value={applicationStatus} onChange={(e) => setApplicationStatus(e.target.value)}><option value="new">New application</option><option value="pending">Already submitted, pending</option><option value="issue">Submitted, correction / issue</option></select></div>
              <div><label className={label} htmlFor="visa-location">Urgent processing location</label><select id="visa-location" className={field} value={location} onChange={(e) => { setLocation(e.target.value as "HAN" | "SGN"); setSpeed("standard"); }}><option value="HAN">Hanoi (HAN)</option><option value="SGN">Ho Chi Minh City (SGN)</option></select></div>
              <div><label className={label} htmlFor="visa-speed">Processing request</label><select id="visa-speed" className={field} value={speed} onChange={(e) => setSpeed(e.target.value)}><option value="standard">Standard · no urgent surcharge</option>{options.map((option) => <option key={option.label} value={option.label}>{option.label} · +US${option.price} per person</option>)}</select></div>
            </div>
            <label className="mt-6 flex cursor-pointer items-center gap-3 text-base font-semibold"><input type="checkbox" className="h-5 w-5 accent-[#0b6b4f]" checked={fastTrack} onChange={(e) => setFastTrack(e.target.checked)} /> Add airport fast track (HAN/DAD US$18 · SGN US$22 per person)</label>
            {fastTrack && <div className="mt-4 max-w-sm"><label className={label} htmlFor="fast-track-airport">Fast track arrival airport *</label><select id="fast-track-airport" className={field} value={fastTrackAirport} onChange={(e) => setFastTrackAirport(e.target.value as "" | keyof typeof fastTrackPrices)}><option value="">Choose an airport</option><option value="HAN">Hanoi (HAN) · US$18</option><option value="DAD">Da Nang (DAD) · US$18</option><option value="SGN">Ho Chi Minh City (SGN) · US$22</option></select></div>}
            <p className="mt-4 text-sm leading-6 text-[#06251b]/65">These prices assume a new e-Visa application. Existing or problematic applications require a separate review. Visa validity is up to 90 days; requested dates and entry points must be checked before submission.</p>
          </div>

          <aside className="rounded-[2rem] bg-[#062f23] p-6 text-white shadow-xl lg:sticky lg:top-28 md:p-8">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-[#f4d77a]">Estimated total</p>
            <p className="mt-3 text-5xl font-black">{applicationStatus === "new" ? `US$${total}` : "Case review"}</p>
            <p className="mt-2 text-sm text-white/65">{applicationStatus === "new" ? `US$${perPerson} per applicant × ${travelers}` : "An existing application needs an individual quote."}</p>
            <div className="mt-6 space-y-3 border-t border-white/20 pt-5 text-sm">
              <div className="flex justify-between gap-3"><span>e-Visa assistance</span><strong>US${visaPrice * travelers}</strong></div>
              {urgent && <div className="flex justify-between gap-3"><span>Urgent request ({location}, {speed})</span><strong>US${urgent.price * travelers}</strong></div>}
              {fastTrack && <div className="flex justify-between gap-3"><span>Airport fast track {fastTrackAirport ? `(${fastTrackAirport})` : "(select airport)"}</span><strong>{fastTrackAirport ? `US$${fastTrackPrice * travelers}` : "—"}</strong></div>}
            </div>
            {hoursToEntry !== null && <p className={`mt-6 rounded-xl p-4 text-sm leading-6 ${closeToTravel ? "bg-[#f4d77a] text-[#06251b]" : "bg-white/10 text-white"}`}>{hoursToEntry <= 0 ? "The selected arrival time has passed. Please update it." : `About ${hoursToEntry} hours until your expected arrival in Vietnam.`} {closeToTravel && hoursToEntry > 0 ? "Your trip is close. Send your flight departure details now so we can check what is still possible." : "Processing is counted during applicable working hours; this is not a visa delivery estimate."}</p>}
            {entryDate && entryDate > vietnamToday && <p className="mt-3 text-sm leading-6 text-white/75">About {weekdaysRemaining} weekdays before arrival, excluding today and arrival day. Public holidays, submission cutoffs and application corrections may reduce the time available. {weekdaysRemaining < 5 ? "Ask us to review urgent options before paying." : "Standard processing may fit; we will confirm after checking your documents."}</p>}
            {invalidDates && <p className="mt-4 text-sm font-bold text-[#f4d77a]">Exit date must be on or after entry date.</p>}
            {exceedsVisaPeriod && <p className="mt-4 text-sm font-bold text-[#f4d77a]">The selected trip is longer than 90 days. Adjust the dates or contact us for a different option.</p>}
            {needFlight && <p className="mt-4 text-sm font-bold text-[#f4d77a]">For travel within five days, add your flight date, time, number and departure airport so we can check the check-in deadline.</p>}
            {fastTrack && !fastTrackAirport && <p className="mt-4 text-sm font-bold text-[#f4d77a]">Choose the airport to include fast track in the estimate.</p>}
            <p className="mt-6 text-sm leading-6 text-white/70">We confirm nationality, documents, available processing time and final price before requesting payment. Approval and a specific delivery hour cannot be guaranteed.</p>
            <a className={`mt-6 block rounded-full px-5 py-4 text-center font-black ${canSend ? "bg-[#d9ad3d] text-[#06251b] hover:bg-[#f1ca5f]" : "pointer-events-none bg-white/30 text-white/70"}`} aria-disabled={!canSend} href={canSend ? `https://wa.me/84937762607?text=${encodeURIComponent(message)}` : undefined} target="_blank" rel="noreferrer">Send complete request on WhatsApp</a>
            <p className="mt-3 text-center text-xs text-white/60">Attach passport and portrait photos in the WhatsApp chat. No documents are uploaded or stored on this page.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
