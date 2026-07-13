import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vietnam Visa Assistance | GoVietStay",
  description:
    "Vietnam e-Visa assistance, urgent visa processing and airport fast-track support with GoVietStay.",
  alternates: { canonical: "https://govietstay.com/visa" },
  openGraph: {
    title: "Vietnam Visa Assistance | GoVietStay",
    description:
      "Trusted local support for Vietnam e-Visas, urgent processing and airport fast track.",
    url: "https://govietstay.com/visa",
    siteName: "GoVietStay",
    type: "website",
  },
};

const WA_GENERAL =
  "https://wa.me/84937762607?text=Hello%20GoVietStay%2C%20I%20need%20support%20with%20a%20Vietnam%20visa.%20My%20nationality%20is%3A%20____.%20My%20expected%20arrival%20date%20is%3A%20____.";
const WA_URGENT =
  "https://wa.me/84937762607?text=Hello%20GoVietStay%2C%20I%20need%20urgent%20Vietnam%20visa%20support.%20My%20nationality%20is%3A%20____.%20My%20departure%20airport%20is%3A%20HAN%20/%20SGN.%20I%20need%20the%20result%20within%3A%20____.";
const WA_FAST_TRACK =
  "https://wa.me/84937762607?text=Hello%20GoVietStay%2C%20I%20would%20like%20to%20book%20Airport%20Fast%20Track%20%28US%2414%29.%20My%20airport%2C%20flight%20number%2C%20arrival%20date%20and%20time%20are%3A%20____.";

const standardVisas = [
  {
    title: "3-Month Single Entry",
    price: "US$37",
    description: "For one entry into Vietnam within the approved visa period.",
    href: "https://wa.me/84937762607?text=Hello%20GoVietStay%2C%20I%20would%20like%20to%20apply%20for%20a%203-month%20single-entry%20Vietnam%20e-Visa%20%28US%2437%29.%20My%20nationality%20is%3A%20____.%20My%20expected%20arrival%20date%20is%3A%20____.",
  },
  {
    title: "3-Month Multiple Entry",
    price: "US$62",
    description: "For travelers who need to enter Vietnam more than once.",
    href: "https://wa.me/84937762607?text=Hello%20GoVietStay%2C%20I%20would%20like%20to%20apply%20for%20a%203-month%20multiple-entry%20Vietnam%20e-Visa%20%28US%2462%29.%20My%20nationality%20is%3A%20____.%20My%20expected%20arrival%20date%20is%3A%20____.",
  },
];

const urgentHan = [
  ["1 hour", "US$87"],
  ["2 hours", "US$57"],
  ["4 hours", "US$30"],
  ["1 day", "US$20"],
  ["2 days", "US$14"],
  ["3 days", "US$11"],
  ["4 days", "US$9"],
];

const urgentSgn = [
  ["4 hours", "US$44"],
  ["1 day", "US$32"],
  ["2 days", "US$22"],
  ["3 days", "US$15"],
  ["4 days", "US$13"],
];

function Logo({ className = "" }: { className?: string }) {
  return <img src="/logo.png" alt="GoVietStay" className={className} />;
}

function PriceTable({
  title,
  code,
  subtitle,
  rows,
}: {
  title: string;
  code: string;
  subtitle: string;
  rows: string[][];
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#0b6b4f]/12 bg-white shadow-[0_24px_70px_rgba(6,37,27,0.08)]">
      <div className="bg-[linear-gradient(135deg,#0b6b4f_0%,#06432f_65%,#06251b_100%)] px-6 py-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f4d77a]">Processing location</p>
            <h3 className="mt-2 text-2xl font-black">{title}</h3>
          </div>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white/85">
            {code}
          </span>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">{subtitle}</p>
      </div>
      <div className="divide-y divide-[#0b6b4f]/8">
        {rows.map(([time, price]) => (
          <div key={time} className="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-[#f7f1df]/70">
            <span className="font-semibold text-[#06251b]/72">{time}</span>
            <span className="text-lg font-black text-[#0b6b4f]">{price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VisaPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f1df] text-[#06251b]">
      <header className="sticky top-0 z-50 border-b border-[#0b6b4f]/10 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          <Link href="/" className="flex items-center gap-4">
            <Logo className="h-16 w-16 rounded-full object-contain md:h-20 md:w-20" />
            <div className="hidden sm:block">
              <p className="text-2xl font-black tracking-tight text-[#0b6b4f]">GoVietStay</p>
              <p className="text-xs font-semibold text-[#06251b]/55">Trusted Local Support</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/" className="hidden text-sm font-bold text-[#06251b]/65 transition hover:text-[#0b6b4f] md:block">
              Back to Home
            </Link>
            <a href={WA_GENERAL} target="_blank" rel="noreferrer" className="rounded-full bg-[#0b6b4f] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-[#0b6b4f]/15 transition hover:-translate-y-0.5 hover:bg-[#06432f]">
              WhatsApp Support
            </a>
          </div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-[#052e22] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(217,173,61,0.22),transparent_30%),radial-gradient(circle_at_12%_90%,rgba(11,107,79,0.55),transparent_34%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f4d77a]/30 bg-[#f4d77a]/10 px-4 py-2 text-sm font-bold text-[#f4d77a]">
              <span className="h-2 w-2 rounded-full bg-[#f4d77a]" />
              Trusted Local Support Before You Arrive
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.28em] text-white/55">Vietnam Entry Support</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[0.98] tracking-tight md:text-7xl">
              Vietnam Visa
              <span className="block text-[#f4d77a]">Assistance</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
              GoVietStay helps international travelers with Vietnam e-Visas, urgent processing and airport fast-track support — clearly, quickly and personally.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={WA_GENERAL} target="_blank" rel="noreferrer" className="rounded-full bg-[#d9ad3d] px-8 py-4 text-center text-base font-black text-[#06251b] shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#f1ca5f]">
                Check My Visa
              </a>
              <a href="#prices" className="rounded-full border border-white/25 bg-white/5 px-8 py-4 text-center text-base font-bold text-white backdrop-blur transition hover:bg-white/12">
                View Prices
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/65">
              <span>✓ Clear total prices</span>
              <span>✓ WhatsApp assistance</span>
              <span>✓ Support before arrival</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-[#d9ad3d]/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.4rem] border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl md:p-8">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-white p-4 shadow-2xl shadow-black/25">
                  <Logo className="h-36 w-36 rounded-full object-contain md:h-44 md:w-44" />
                </div>
                <h2 className="mt-5 text-3xl font-black">GoVietStay Visa Support</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/62">A trusted local team to help you prepare before your journey to Vietnam.</p>
              </div>

              <div className="mt-7 grid gap-3">
                {[
                  ["Standard e-Visa", "From US$37", "4–5 working days"],
                  ["Urgent Visa Support", "From US$9", "1 hour to 4 days"],
                  ["Airport Fast Track", "US$14", "Arrival assistance"],
                ].map(([label, value, meta]) => (
                  <div key={label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.07] px-5 py-4">
                    <div>
                      <p className="font-bold text-white">{label}</p>
                      <p className="mt-1 text-xs text-white/45">{meta}</p>
                    </div>
                    <p className="shrink-0 text-xl font-black text-[#f4d77a]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="prices" className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#0b6b4f]">Standard Processing</p>
            <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">Vietnam e-Visa</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#06251b]/62">
            Normal processing time is approximately 4–5 working days. The prices below already include GoVietStay assistance.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {standardVisas.map((visa, index) => (
            <div key={visa.title} className="group relative overflow-hidden rounded-[2rem] border border-[#0b6b4f]/12 bg-white p-7 shadow-[0_22px_65px_rgba(6,37,27,0.07)] transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(6,37,27,0.12)] md:p-8">
              <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[5rem] bg-[#d9ad3d]/10" />
              <div className="relative">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0b6b4f]">Vietnam e-Visa</p>
                    <h3 className="mt-3 text-2xl font-black md:text-3xl">{visa.title}</h3>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0b6b4f] text-xl font-black text-[#f4d77a]">{index + 1}</span>
                </div>
                <p className="mt-4 max-w-lg leading-7 text-[#06251b]/62">{visa.description}</p>
                <div className="mt-8 flex items-end justify-between gap-4 border-t border-[#0b6b4f]/10 pt-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#06251b]/42">Total price</p>
                    <p className="mt-2 text-4xl font-black text-[#0b6b4f]">{visa.price}</p>
                  </div>
                  <a href={visa.href} target="_blank" rel="noreferrer" className="rounded-full bg-[#0b6b4f] px-6 py-3 font-black text-white transition group-hover:bg-[#06432f]">
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#0b6b4f]">Urgent Processing</p>
            <h2 className="mt-4 text-4xl font-black md:text-6xl">Need Your Visa Faster?</h2>
            <p className="mt-5 text-lg leading-8 text-[#06251b]/62">
              Contact us before payment so our team can confirm nationality, timing and the correct processing location.
            </p>
          </div>

          <div className="mt-12 grid gap-7 lg:grid-cols-2">
            <PriceTable title="Hanoi" code="HAN" subtitle="1-hour and 2-hour options are available only through Hanoi processing." rows={urgentHan} />
            <PriceTable title="Ho Chi Minh City" code="SGN" subtitle="Available from 4-hour processing." rows={urgentSgn} />
          </div>

          <div className="mt-10 text-center">
            <a href={WA_URGENT} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-[#d9ad3d] px-8 py-4 font-black text-[#06251b] shadow-lg shadow-[#d9ad3d]/20 transition hover:-translate-y-0.5 hover:bg-[#f1ca5f]">
              Request Urgent Visa Support
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="relative overflow-hidden rounded-[2.6rem] bg-[linear-gradient(135deg,#0b6b4f_0%,#06432f_58%,#06251b_100%)] p-7 text-white shadow-[0_30px_100px_rgba(6,37,27,0.18)] md:p-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#d9ad3d]/18 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f4d77a]">Airport Arrival Support</p>
              <h2 className="mt-4 text-4xl font-black md:text-5xl">Airport Fast Track</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                Meet-and-assist support for a smoother immigration arrival experience. Ideal for families, elderly travelers and first-time visitors.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white p-6 text-[#06251b] shadow-xl lg:min-w-72">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#06251b]/45">Total price</p>
              <p className="mt-2 text-5xl font-black text-[#0b6b4f]">US$14</p>
              <a href={WA_FAST_TRACK} target="_blank" rel="noreferrer" className="mt-5 block rounded-full bg-[#d9ad3d] px-6 py-3.5 text-center font-black transition hover:bg-[#f1ca5f]">
                Book Fast Track
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#efe5c8] py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-7 shadow-sm md:p-9">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#0b6b4f]">How It Works</p>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">Simple, Personal Support</h2>
            <div className="mt-8 space-y-4">
              {[
                ["01", "Send your nationality, expected arrival date and passport details."],
                ["02", "GoVietStay checks your case and confirms the suitable service."],
                ["03", "After confirmation, we assist with submission and status updates."],
              ].map(([number, text]) => (
                <div key={number} className="flex gap-4 rounded-2xl border border-[#0b6b4f]/10 bg-[#f7f1df]/60 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0b6b4f] text-sm font-black text-[#f4d77a]">{number}</span>
                  <p className="pt-2 font-semibold leading-6 text-[#06251b]/72">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#06251b] p-7 text-white shadow-sm md:p-9">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f4d77a]">Important Information</p>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">Before You Apply</h2>
            <ul className="mt-7 space-y-4 text-white/68">
              <li>✓ Approval is decided by the competent Vietnamese authority.</li>
              <li>✓ Processing estimates are based on working days and valid application details.</li>
              <li>✓ Some Middle Eastern and African nationalities may not be accepted by the current processing partner.</li>
              <li>✓ South Africa, Algeria, Tunisia and Morocco can be checked individually.</li>
              <li>✓ Contact GoVietStay before payment for final eligibility and timing confirmation.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#052e22] text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-5 py-20 text-center md:px-8 md:py-24">
          <Logo className="h-28 w-28 rounded-full bg-white object-contain p-2 shadow-2xl" />
          <p className="mt-6 text-sm font-black uppercase tracking-[0.28em] text-[#f4d77a]">GoVietStay · Trusted Local Support</p>
          <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">Start Your Vietnam Journey With Confidence</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            Send your nationality and travel date. Our team will check the most suitable option before you make payment.
          </p>
          <a href={WA_GENERAL} target="_blank" rel="noreferrer" className="mt-8 rounded-full bg-[#d9ad3d] px-8 py-4 font-black text-[#06251b] transition hover:bg-[#f1ca5f]">
            WhatsApp +84 937 762 607
          </a>
          <p className="mt-7 text-sm font-semibold text-white/38">GoVietStay.com · Da Nang · Hoi An · Hue</p>
        </div>
      </section>
    </main>
  );
}
