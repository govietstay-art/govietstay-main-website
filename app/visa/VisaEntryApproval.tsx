const REQUIRED = [
  ["01", "Passport", "Clear color scan of the personal-data page, with at least 6 months' validity and 2 blank pages."],
  ["02", "Passport photo", "Recent 4 × 6 cm photograph on a white background, without sunglasses or a hat."],
  ["03", "Return-flight reservation", "Proposed flights showing dates, flight numbers, and Vietnam arrival/departure airports."],
  ["04", "Hotel reservation", "Accommodation confirmation with your name and full address in Vietnam."],
];

const SUPPORTING = [
  "Employment confirmation, employee card, or business registration",
  "Previous visas and passport entry/exit stamps",
  "Residence permit or long-term visa in another country, if relevant",
  "Detailed Vietnam travel itinerary",
  "Business invitation and company documents (business trips only)",
];

const STEPS = [
  ["1", "Free eligibility check", "Tell us your nationality, country of residence, travel dates, and arrival airport. We check whether an individual assessment makes sense."],
  ["2", "Document review & quotation", "If potentially eligible, our specialist partner reviews your documents. We confirm the proposed service, cost, and conditions before proceeding."],
  ["3", "Application & official decision", "If accepted for submission, the request goes to the competent Vietnamese authority. If approved, we provide the official result and explain the next steps."],
];

const CHECK_URL = "https://wa.me/84937762607?text=" + encodeURIComponent(
  "Hello GoVietStay, please check if an official Vietnam entry-approval application may be an option for me.\nNationality: ____\nCountry of residence: ____\nExpected arrival date: ____\nArrival airport: ____\nCurrent visa status: ____"
);

export default function VisaEntryApproval() {
  return (
    <section id="complex-entry-approval" className="scroll-mt-24 bg-[#f0f5ee] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
          <div>
            <p className="inline-flex rounded-full border border-[#0b6b4f]/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0b6b4f]">
              Complex visa cases · Individual assessment
            </p>
            <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-[#06251b] md:text-5xl">
              Could official entry approval be an option for you?
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#06251b]/70">
              Some passport holders need additional checks beyond a standard e-Visa application. GoVietStay can
              ask a specialized visa partner to assess whether an <strong>official entry-approval request</strong>
              {" "}might be possible in your case. This is a separate process, not a guaranteed visa or a shortcut around immigration rules.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={CHECK_URL} target="_blank" rel="noreferrer" className="rounded-full bg-[#0b6b4f] px-7 py-4 text-center font-black text-white shadow-lg shadow-[#0b6b4f]/15 transition hover:bg-[#06432f]">
                Check My Case on WhatsApp
              </a>
              <a href="#entry-approval-documents" className="rounded-full border border-[#0b6b4f]/25 bg-white px-7 py-4 text-center font-bold text-[#0b6b4f] transition hover:border-[#0b6b4f]">
                View Document Checklist
              </a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-[#d9ad3d]/40 bg-[#fff9e8] p-6 shadow-[0_20px_60px_rgba(6,37,27,0.07)] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b6b4f]">Start here — no documents yet</p>
            <h3 className="mt-3 text-2xl font-black">We first need just four details</h3>
            <ul className="mt-5 grid gap-3 text-sm font-semibold text-[#06251b]/80 sm:grid-cols-2">
              {["Passport nationality", "Country of residence", "Expected arrival date", "Arrival airport in Vietnam"].map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-xl bg-white/80 p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0b6b4f] text-xs text-white">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-6 text-[#06251b]/65">
              The initial check is free. If your case can proceed, we will explain a private way to send passport scans and supporting documents.
            </p>
          </div>
        </div>

        <div id="entry-approval-documents" className="mt-12 scroll-mt-24 rounded-[2rem] border border-[#0b6b4f]/10 bg-white p-6 shadow-[0_24px_65px_rgba(6,37,27,0.05)] md:p-9">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b6b4f]">Document checklist</p>
          <h3 className="mt-3 text-2xl font-black md:text-3xl">Four basic documents to prepare</h3>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-[#06251b]/65">
            These are the initial requirements of our visa-processing partner, not a universal government checklist. Clear, complete color scans are important.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {REQUIRED.map(([number, title, detail]) => (
              <div key={number} className="flex gap-4 rounded-2xl border border-[#0b6b4f]/10 bg-[#f5f8f2] p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0b6b4f] text-sm font-black text-[#f4d77a]">{number}</span>
                <div>
                  <h4 className="text-lg font-black text-[#06251b]">{title}</h4>
                  <p className="mt-2 text-sm leading-6 text-[#06251b]/65">{detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-7 rounded-2xl border border-[#d9ad3d]/25 bg-[#fff9e8] p-5 md:p-7">
            <h4 className="text-lg font-black">Helpful additional documents — if available</h4>
            <p className="mt-2 text-sm leading-6 text-[#06251b]/65">These may help explain your circumstances but do not guarantee approval.</p>
            <ul className="mt-4 grid gap-x-7 gap-y-3 md:grid-cols-2">
              {SUPPORTING.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-[#06251b]/75">
                  <span className="font-black text-[#0b6b4f]">✓</span><span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b6b4f]">How it works</p>
          <h3 className="mt-3 text-3xl font-black md:text-4xl">Three clear steps</h3>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {STEPS.map(([number, title, detail]) => (
              <div key={number} className="rounded-[1.7rem] bg-[#06251b] p-6 text-white md:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d9ad3d] text-xl font-black text-[#06251b]">{number}</span>
                <h4 className="mt-5 text-xl font-black">{title}</h4>
                <p className="mt-3 text-sm leading-7 text-white/70">{detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-2xl bg-white px-5 py-4 text-sm leading-6 text-[#06251b]/75">
            <strong>Estimated time:</strong> Our partner indicates around 3–5 working days after receiving a complete, acceptable file. This is not an official deadline; weekends, holidays, and additional checks can extend processing.
          </p>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#d9ad3d]/40 bg-[#fff2ca] p-6 md:p-9">
          <h3 className="text-xl font-black text-[#6c4806]">Important: before you book a flight</h3>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-[#422f0d] md:text-base">
            <li><strong>A company invitation letter alone is not a visa or boarding permission.</strong> Any entry approval must be issued by the competent Vietnamese authority.</li>
            <li><strong>Do not travel to Vietnam to wait for an e-Visa.</strong> A pending e-Visa does not authorize entry; an officially approved visa-at-border route is a different procedure.</li>
            <li><strong>Do not buy non-refundable flights before receiving the required official approval.</strong> Check the documents with your airline before departure.</li>
            <li><strong>No approval can be guaranteed.</strong> Vietnam&apos;s competent authorities make the final decision. Travelers must follow their approved stay dates.</li>
          </ul>
        </div>

        <div className="mt-9 flex flex-col gap-5 rounded-[2rem] bg-[#0b6b4f] px-6 py-8 text-white md:flex-row md:items-center md:justify-between md:px-9">
          <div>
            <h3 className="text-2xl font-black">Not sure if your passport qualifies?</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">Ask for a free initial assessment. We explain the process and any fees before you commit.</p>
          </div>
          <a href={CHECK_URL} target="_blank" rel="noreferrer" className="shrink-0 rounded-full bg-[#d9ad3d] px-7 py-4 text-center font-black text-[#06251b] transition hover:bg-[#f1ca5f]">
            Request a Free Case Check
          </a>
        </div>
      </div>
    </section>
  );
}
