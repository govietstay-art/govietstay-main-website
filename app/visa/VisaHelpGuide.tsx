import Link from "next/link";
import { getVisaPrice } from "./prices";

const officialPortal = "https://evisa.gov.vn";
const urgent2Single = getVisaPrice("single", "HAN", "2 hours");
const urgent2Multiple = getVisaPrice("multiple", "HAN", "2 hours");

const questions = [
  {
    question: "How much does a Vietnam e-visa cost in 2026?",
    answer: "The official Vietnamese government e-visa fee is US$25 for one entry or US$50 for multiple entries, for an e-visa valid up to 90 days. The government fee is non-refundable even if an application is refused. GoVietStay's optional assistance starts at US$47 for single-entry or US$66 for multiple-entry, including the government fee.",
  },
  {
    question: "Can I apply for a Vietnam e-visa myself without GoVietStay?",
    answer: "Yes. You can apply directly at evisa.gov.vn, Vietnam's official immigration e-visa portal, and pay only the government fee. GoVietStay is an independent paid assistance service, not a government agency.",
  },
  {
    question: "How much does a 2-hour urgent Vietnam e-visa service cost?",
    answer: `GoVietStay's current two-hour Hanoi handling option is US$${urgent2Single} for single-entry or US$${urgent2Multiple} for multiple-entry, including the government fee and assistance. This is an urgent service request, not a guarantee of approval or a fixed delivery deadline. Our team must check working hours and your existing application before accepting a case.`,
  },
  {
    question: "What is included in GoVietStay visa assistance?",
    answer: "We check visa-free eligibility first, review passport and portrait image suitability, check application details and travel dates, advise on entry type and ports, assist with submission where agreed, track the application, share status updates and deliver an approved e-visa PDF when available. For urgent cases, we also review flight/check-in timing and explain realistic next steps. The extent of assistance is confirmed before payment.",
  },
  {
    question: "What mistakes commonly delay a self-submitted Vietnam e-visa?",
    answer: "Examples include mismatched names, incorrect passport numbers, dates of birth or nationality, an unsuitable portrait or unreadable passport photo, incorrect entry dates, the wrong entry type, an ineligible border crossing, or losing the registration code and email needed to check the result. Such mistakes can require correction or a new application; approval is solely up to the authorities.",
  },
  {
    question: "What if my flight is soon and the visa is still pending?",
    answer: "Tell us your passport nationality, flight date and departure time, application status and registration details privately via WhatsApp. We will check whether assistance is realistically available within official processing hours. Do not assume that choosing a same-day option guarantees airline check-in.",
  },
  {
    question: "Do all travelers need an e-visa for Vietnam?",
    answer: "No. Some passport holders qualify for visa-free entry for a specified period or tourism purpose. Requirements depend on nationality, entry conditions, travel dates and purpose. We offer an eligibility check before recommending a paid e-visa service.",
  },
  {
    question: "Is a Vietnam e-visa valid for 30 or 90 days?",
    answer: "Vietnam's e-visa can be issued for up to 90 days, with single or multiple entries. The actual validity dates and entry conditions are shown on the visa issued by the immigration authority. Always check the approved document before traveling.",
  },
] as const;

const faqsJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": questions.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer },
  })),
};

export default function VisaHelpGuide() {
  return (
    <>
      <section id="visa-help-included" className="bg-white px-5 py-16 md:px-8 md:py-20" aria-labelledby="included-title">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[.23em] text-[#0b6b4f]">What you get · Real support</p>
          <h2 id="included-title" className="mt-3 max-w-4xl text-3xl font-black leading-tight text-[#06251b] md:text-5xl">
            More than a visa form: help before and after you apply
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[#06251b]/75 md:text-lg">
            Our promise is to explain what is possible and stay in contact when waiting becomes stressful — not to promise an official approval we cannot control. We confirm the assistance appropriate to each case before payment.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["01","Free visa eligibility review","We first check whether your passport may qualify for visa-free entry."],
              ["02","Document and photo review","We check readability and common mismatches in passport and portrait images before submission."],
              ["03","Application guidance","We check names, dates, entry type, travel details and permitted entry points with you."],
              ["04","Submission assistance","Where you authorize it, we help you complete and submit the application on the official portal."],
              ["05","Tracking and updates","We follow the status and keep you informed, including the e-visa PDF if approved."],
              ["06","Urgent, human support","For tight connections, we review available handling windows, flight times and next steps."],
            ].map(([num,title,text]) => (
              <article key={num} className="rounded-[1.4rem] border border-[#0b6b4f]/12 bg-[#f8f9f5] p-6">
                <p className="text-sm font-black tracking-[.18em] text-[#0b6b4f]">{num}</p>
                <h3 className="mt-2 text-lg font-black text-[#06251b]">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#06251b]/70">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="apply-yourself" className="bg-[#f7f1df] px-5 py-16 md:px-8 md:py-20" aria-labelledby="self-apply-title">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-[.23em] text-[#0b6b4f]">You can apply yourself</p>
            <h2 id="self-apply-title" className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              Vietnam e-visa: official self-application vs. optional assistance
            </h2>
            <p className="mt-5 leading-8 text-[#06251b]/75">
              Applying yourself is a valid option. Go directly to the official Vietnam immigration website, complete the form with accurate details, pay the government fee and use your registration code to check the result. You do not need an agent for a straightforward application.
            </p>
            <p className="mt-4 font-semibold leading-8 text-[#06251b]">
              Government fee: US$25 single-entry / US$50 multiple-entry. E-visas may be granted for up to 90 days.
            </p>
            <Link href={officialPortal} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-[#0b6b4f] px-7 py-4 text-center font-black text-white hover:bg-[#06432f]">
              Visit official evisa.gov.vn
            </Link>
            <p className="mt-4 text-sm leading-6 text-[#06251b]/60">GoVietStay is an independent visa assistance business; our prices are optional service prices, not official government fees.</p>
          </div>
          <div className="rounded-[1.6rem] bg-white p-6 shadow-sm md:p-8">
            <h3 className="text-2xl font-black">Before you submit it yourself, double-check:</h3>
            <ul className="mt-6 list-disc space-y-4 pl-5 text-base leading-7 text-[#06251b]/75">
              <li>Full name, nationality, passport number and birth date exactly match your passport.</li>
              <li>Your portrait and full passport data page are clear, current and meet the portal requirements.</li>
              <li>Your requested entry and exit dates, visa validity and single/multiple entry type fit your plans.</li>
              <li>Your intended airport or border crossing accepts the approved e-visa.</li>
              <li>You use the official portal and keep your registration code, email and payment confirmation.</li>
              <li>You leave enough working days for processing and possible corrections before your flight.</li>
            </ul>
            <p className="mt-6 rounded-xl bg-[#eef5ed] px-5 py-4 text-sm leading-7 text-[#06432f]">
              Small errors can result in delays or another application. The government fee is not refundable if the visa is refused; choosing a paid service does not guarantee approval.
            </p>
          </div>
        </div>
      </section>
      <section id="visa-faq" className="bg-white px-5 py-16 md:px-8 md:py-20" aria-labelledby="visa-faq-title">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[.23em] text-[#0b6b4f]">Straight answers · Updated October 2026</p>
          <h2 id="visa-faq-title" className="mt-3 text-3xl font-black leading-tight md:text-5xl">
            Vietnam e-visa questions travelers ask most
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#06251b]/70">
            Clear answers based on Vietnam&apos;s official immigration portal and the current GoVietStay service list. Every urgent request must be reviewed before payment.
          </p>
          <div className="mt-8 divide-y divide-[#0b6b4f]/10 rounded-[1.6rem] border border-[#0b6b4f]/15 bg-[#fffdf8]">
            {questions.map((faq) => (
              <details key={faq.question} className="group px-5 py-5 md:px-7">
                <summary className="cursor-pointer list-item pr-2 text-base font-black text-[#06251b] marker:text-[#0b6b4f] md:text-lg">{faq.question}</summary>
                <p className="mt-3 max-w-4xl leading-7 text-[#06251b]/75">{faq.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-[#06251b]/65">
            Official guidance: <Link href={officialPortal} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2">Vietnam Immigration e-visa portal</Link>. Source regulations and processing availability can change; final decisions remain with Vietnamese authorities.
          </p>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqsJsonLd) }} />
    </>
  );
}
