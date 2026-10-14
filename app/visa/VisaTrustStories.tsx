import Link from "next/link";

const travelerMessages = [
  {
    label: "A moment of relief",
    context: "Traveler after receiving confirmation",
    quote: "Sir i will write the best review in my life",
    followUp: "You are really the best",
    time: "10:02",
  },
  {
    label: "A visa delivered",
    context: "Traveler after receiving an e-visa PDF",
    quote: "Incredible!",
    followUp: "Thank you so so much",
    time: "15:20",
  },
  {
    label: "An application accepted",
    context: "Traveler checking official application status",
    quote: "Your service means a lot",
    followUp: "Thank you so much!",
    time: "15:30",
  },
];

export default function VisaTrustStories() {
  return (
    <section
      id="real-visa-stories"
      aria-labelledby="visa-stories-heading"
      className="relative border-b border-[#0b6b4f]/10 bg-[#fffdf6] py-14 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[.23em] text-[#0b6b4f]">
              Real Messages · Real Relief
            </p>
            <h2
              id="visa-stories-heading"
              className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight text-[#06251b] sm:text-4xl md:text-5xl"
            >
              When every minute matters, you need more than an answer. You need someone by your side.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-[#06251b]/75 md:text-lg">
            We have supported travelers from the United States, Europe, Türkiye and many other places — including people facing the frightening possibility of missing a flight because their Vietnam visa is not ready.
          </p>
        </div>

        <div className="mt-8 rounded-[1.6rem] border border-[#0b6b4f]/15 bg-[#eef6ed] p-6 md:p-8">
          <p className="text-lg font-black leading-8 text-[#0b6b4f] md:text-xl">
            Help first. Explain clearly. Stay close when every minute matters.
          </p>
          <p className="mt-3 max-w-5xl text-base leading-8 text-[#06251b]/75">
            This is how we approach urgent cases at GoVietStay. We listen first, check what is realistically possible, explain the next steps, and keep following up while our guest waits. Sometimes that means staying in touch through the uncertainty of an airport check-in counter. We know the stress is real, and we never want anyone to feel left alone.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {travelerMessages.map((message) => (
            <article
              key={message.label}
              className="flex h-full flex-col rounded-[1.6rem] border border-[#0b6b4f]/10 bg-white p-6 shadow-[0_12px_35px_rgba(6,37,27,0.06)] md:p-7"
            >
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f3e7] text-xl text-[#0b6b4f]">
                  “
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[.12em] text-[#0b6b4f]">{message.label}</p>
                  <p className="mt-1 text-xs text-[#06251b]/55">{message.context}</p>
                </div>
              </div>
              <blockquote className="mt-7 text-2xl font-bold leading-snug tracking-tight text-[#06251b]">
                “{message.quote}”
              </blockquote>
              <p className="mt-4 rounded-2xl bg-[#e8f8e6] px-4 py-3 text-base font-medium leading-relaxed text-[#174829]">
                “{message.followUp}”
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-xs font-semibold text-[#06251b]/50">
                <span>Customer WhatsApp message</span>
                <span>{message.time}</span>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 text-sm leading-6 text-[#06251b]/55">
          Messages excerpted from actual customer conversations. Names, passport numbers, visa numbers and application details are withheld to protect travelers&apos; privacy.
        </p>

        <div className="mt-8 flex flex-col gap-4 rounded-[1.7rem] bg-[#052e22] p-6 text-white sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div>
            <p className="text-lg font-black">Stuck at the airport or worried about a pending e-visa?</p>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-white/70">
              Tell us your nationality, application status and exact flight time. We will check the options before you commit to a service.
            </p>
          </div>
          <Link
            href="https://wa.me/84937762607?text=Hello%20GoVietStay%2C%20I%20need%20urgent%20Vietnam%20visa%20help.%20My%20nationality%20is%3A%20____.%20My%20application%20status%20is%3A%20____.%20My%20flight%20date%20and%20time%20are%3A%20____."
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 justify-center rounded-full bg-[#d9ad3d] px-7 py-4 text-center text-sm font-black text-[#06251b] transition hover:bg-[#f1ca5f]"
          >
            Ask for Urgent Visa Help
          </Link>
        </div>
        <p className="mt-4 text-xs leading-5 text-[#06251b]/55">
          GoVietStay is an independent support service, not a government agency. Approval decisions and processing times depend on the Vietnamese authorities; no outcome or timeframe is guaranteed.
        </p>
      </div>
    </section>
  );
}
