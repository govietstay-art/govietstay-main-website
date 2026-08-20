import Image from "next/image";
import Link from "next/link";
import type { RussianSeoLanding } from "../lib/russian-seo-landings";

const WHATSAPP_NUMBER = "84937762607";

export default function RussianSeoLandingPage({
  landing,
}: {
  landing: RussianSeoLanding;
}) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(landing.whatsappText)}`;

  return (
    <main className="min-h-screen bg-[#f7f1df] text-[#06251b]">
      <section className="relative isolate min-h-[72svh] overflow-hidden bg-[#06251b] text-white">
        <Image
          src={landing.image}
          alt={landing.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 -z-0 bg-gradient-to-t from-[#031b14] via-[#031b14]/65 to-black/25" />

        <div className="relative z-10 mx-auto flex min-h-[72svh] max-w-6xl flex-col px-5 py-6 md:px-10 md:py-9">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/ru" className="text-xl font-black tracking-tight">
              GoVietStay
            </Link>
            <nav aria-label="Основная навигация" className="flex flex-wrap gap-2 text-sm font-semibold">
              <Link className="rounded-full border border-white/30 px-4 py-2 backdrop-blur hover:bg-white/10" href="/ru/danang">
                Дананг
              </Link>
              <Link className="rounded-full border border-white/30 px-4 py-2 backdrop-blur hover:bg-white/10" href="/ru/hoi-an">
                Хойан
              </Link>
              <Link className="rounded-full border border-white/30 px-4 py-2 backdrop-blur hover:bg-white/10" href="/ru/aktualno">
                Актуально
              </Link>
            </nav>
          </header>

          <div className="mt-auto max-w-4xl pb-7 pt-20">
            <nav aria-label="Хлебные крошки" className="mb-5 text-sm text-white/70">
              <Link href="/ru" className="hover:text-white">Главная</Link>
              <span aria-hidden="true" className="mx-2">/</span>
              <span aria-current="page">{landing.shortTitle}</span>
            </nav>
            <p className="text-sm font-bold uppercase tracking-[.22em] text-amber-300">
              {landing.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
              {landing.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
              {landing.lead}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex rounded-full bg-[#20a65a] px-6 py-4 font-bold text-white shadow-lg transition hover:bg-[#168849]"
            >
              Задать вопрос в WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-10 px-5 py-10 md:px-10 md:py-16">
        <section className="grid gap-6 md:grid-cols-[1.35fr_.65fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-9">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-green-800">Короткий ответ</p>
            <p className="mt-4 text-xl font-semibold leading-relaxed md:text-2xl">
              {landing.quickAnswer}
            </p>
          </div>
          <div className="grid gap-3">
            {landing.facts.map((fact) => (
              <div key={fact.label} className="rounded-3xl border border-[#06251b]/10 bg-[#efe5c8] p-5">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-[#06251b]/55">{fact.label}</p>
                <p className="mt-2 text-xl font-black">{fact.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {landing.sections.map((section) => (
            <article key={section.heading} className="rounded-[2rem] border border-[#06251b]/10 bg-white/70 p-6 md:p-8">
              <h2 className="text-2xl font-black md:text-3xl">{section.heading}</h2>
              <div className="mt-5 space-y-4 leading-relaxed text-[#06251b]/72">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.bullets && (
                <ul className="mt-6 space-y-3">
                  {section.bullets.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-[#06251b]/75">
                      <span aria-hidden="true" className="mt-1 font-black text-green-700">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </section>

        <section aria-labelledby="landing-options-title" className="rounded-[2rem] bg-[#06251b] p-6 text-white md:p-10">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-amber-300">Выбор маршрута</p>
          <h2 id="landing-options-title" className="mt-3 text-3xl font-black md:text-4xl">{landing.cardsTitle}</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-white/70">{landing.cardsIntro}</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {landing.cards.map((card) => (
              <article key={card.title} className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/10">
                <h3 className="text-xl font-bold">{card.title}</h3>
                <p className="mt-3 leading-relaxed text-white/72">{card.text}</p>
                {card.href && (
                  card.href.startsWith("http") ? (
                    <a href={card.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex font-bold text-amber-300 hover:text-amber-200">
                      {card.label || "Подробнее"} ↗
                    </a>
                  ) : (
                    <Link href={card.href} className="mt-5 inline-flex font-bold text-amber-300 hover:text-amber-200">
                      {card.label || "Подробнее"} →
                    </Link>
                  )
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-green-800">Понятный процесс</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">{landing.stepsTitle}</h2>
          </div>
          <ol className="space-y-4">
            {landing.steps.map((step, index) => (
              <li key={step} className="flex gap-4 rounded-3xl bg-white p-5 shadow-sm">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green-800 font-black text-white">
                  {index + 1}
                </span>
                <span className="pt-1 leading-relaxed text-[#06251b]/75">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-[2rem] border border-[#06251b]/10 bg-white p-6 md:p-9">
          <h2 className="text-3xl font-black">Частые вопросы</h2>
          <div className="mt-5 divide-y divide-[#06251b]/10">
            {landing.faq.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 text-lg font-bold">
                  {item.question}
                  <span aria-hidden="true" className="float-right text-green-700 transition group-open:rotate-45">＋</span>
                </summary>
                <p className="mt-3 max-w-4xl leading-relaxed text-[#06251b]/68">{item.answer}</p>
              </details>
            ))}
          </div>
          {landing.notice && <p className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">{landing.notice}</p>}
        </section>

        <section>
          <h2 className="text-2xl font-black">Продолжить планирование</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {landing.relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} className="group rounded-3xl border border-[#06251b]/10 bg-white/70 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
                <p className="font-black text-green-800">{link.label} →</p>
                <p className="mt-2 text-sm leading-relaxed text-[#06251b]/65">{link.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-green-800 p-7 text-center text-white md:p-12">
          <p className="text-sm font-bold uppercase tracking-[.2em] text-green-200">GoVietStay · поддержка на русском</p>
          <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-black md:text-5xl">{landing.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/80">{landing.ctaText}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-6 py-4 font-black text-green-900 transition hover:bg-green-50">
              Написать в WhatsApp
            </a>
            <a href="https://t.me/GoVietStay" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/35 px-6 py-4 font-bold transition hover:bg-white/10">
              Открыть Telegram
            </a>
          </div>
          <p className="mt-5 text-sm text-white/65">WhatsApp: +84 937 762 607</p>
        </section>
      </div>

      <footer className="border-t border-[#06251b]/10 px-5 py-8 text-center text-sm text-[#06251b]/60">
        <p>GoVietStay · местные экскурсии, трансферы и поддержка во Вьетнаме</p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 font-semibold">
          <Link href="/ru">Главная</Link>
          <Link href="/ru/danang">Дананг</Link>
          <Link href="/ru/hoi-an">Хойан</Link>
          <Link href="/ru/hue">Хюэ</Link>
          <Link href="/ru/transfer-danang">Трансфер</Link>
          <Link href="/ru/visa-vietnam">Виза</Link>
        </div>
      </footer>
    </main>
  );
}
