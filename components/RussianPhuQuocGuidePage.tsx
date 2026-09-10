// gvs-ru-pq-cluster-v1
import Image from "next/image";
import Link from "next/link";
import type { RussianPhuQuocPage } from "../lib/russian-phu-quoc-cluster";

const WHATSAPP_NUMBER = "84937762607";

export default function RussianPhuQuocGuidePage({ page }: { page: RussianPhuQuocPage }) {
  const whatsappText = `Здравствуйте! Я читаю страницу «${page.shortTitle}». Подскажите, пожалуйста. Отель: ___. Даты: ___. Нас: ___. Дети: ___.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <main className="min-h-screen bg-[#f7f1df] text-[#08271e]">
      <section className="relative isolate min-h-[72svh] overflow-hidden bg-[#06251b] text-white">
        <Image src={page.image} alt={`${page.shortTitle} — Фукуок, Вьетнам`} fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#031b14]/96 via-[#031b14]/78 to-[#031b14]/32" />
        <div className="mx-auto flex min-h-[72svh] max-w-6xl flex-col px-5 py-6 md:px-10 md:py-9">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/ru" className="inline-flex rounded-2xl bg-white/95 p-2 shadow-lg">
              <Image
                src="/brand/govietstay-official-logo.jpg"
                alt="GoVietStay — Trusted Local Support"
                width={300}
                height={110}
                className="h-12 w-auto object-contain sm:h-14"
              />
            </Link>
            <nav aria-label="Навигация по Фукуоку" className="flex flex-wrap gap-2 text-sm font-bold">
              <Link href="/ru/phu-quoc" className="rounded-full border border-white/35 bg-black/10 px-4 py-2 backdrop-blur hover:bg-white/10">Гид по Фукуоку</Link>
              <Link href="/ru/phu-quoc-help" className="rounded-full border border-white/35 bg-black/10 px-4 py-2 backdrop-blur hover:bg-white/10">Помощь</Link>
              <Link href="/ru/tours/phu-quoc" className="rounded-full border border-white/35 bg-black/10 px-4 py-2 backdrop-blur hover:bg-white/10">Экскурсии</Link>
            </nav>
          </header>

          <div className="mt-auto max-w-4xl pb-9 pt-20">
            <nav aria-label="Хлебные крошки" className="mb-5 text-sm text-white/70">
              <Link href="/ru">Главная</Link><span className="mx-2">/</span>
              {page.slug === "index" ? (
                <span aria-current="page">Фукуок</span>
              ) : (
                <><Link href="/ru/phu-quoc">Фукуок</Link><span className="mx-2">/</span><span aria-current="page">{page.shortTitle}</span></>
              )}
            </nav>
            <p className="text-sm font-black uppercase tracking-[.2em] text-amber-300">{page.eyebrow}</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl md:text-7xl">{page.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/88 md:text-xl">{page.lead}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#20a65a] px-6 py-4 font-black text-white shadow-lg transition hover:bg-[#168849]">Спросить GoVietStay бесплатно</a>
              <Link href="/ru/phu-quoc-help" className="rounded-full border border-white/40 px-6 py-4 font-bold backdrop-blur hover:bg-white/10">Местная помощь на русском</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-5 py-10 md:px-10 md:py-16">
        <section className="grid gap-6 md:grid-cols-[1.35fr_.65fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-9">
            <p className="text-sm font-black uppercase tracking-[.18em] text-green-800">Короткий ответ</p>
            <p className="mt-4 text-xl font-semibold leading-relaxed md:text-2xl">{page.quickAnswer}</p>
          </div>
          <div className="grid gap-3">
            {page.facts.map((fact) => (
              <div key={fact.label} className="rounded-3xl border border-[#06251b]/10 bg-[#efe5c8] p-5">
                <p className="text-xs font-black uppercase tracking-[.16em] text-[#06251b]/55">{fact.label}</p>
                <p className="mt-2 text-xl font-black">{fact.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {page.sections.map((section) => (
            <article key={section.heading} className="rounded-[2rem] border border-[#06251b]/10 bg-white/75 p-6 md:p-8">
              <h2 className="text-2xl font-black md:text-3xl">{section.heading}</h2>
              <div className="mt-5 space-y-4 leading-relaxed text-[#08271e]/72">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.bullets && (
                <ul className="mt-6 space-y-3">
                  {section.bullets.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-[#08271e]/75"><span aria-hidden="true" className="font-black text-green-700">✓</span><span>{item}</span></li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] bg-[#06251b] p-6 text-white md:p-10">
          <p className="text-sm font-black uppercase tracking-[.18em] text-amber-300">Местный взгляд</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">{page.adviceTitle}</h2>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-white/78">{page.advice}</p>
        </section>

        <section className="grid gap-7 md:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-sm font-black uppercase tracking-[.18em] text-green-800">Перед поездкой</p><h2 className="mt-3 text-3xl font-black md:text-4xl">{page.checklistTitle}</h2></div>
          <div className="grid gap-3">
            {page.checklist.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-3xl bg-white p-5 shadow-sm">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green-800 font-black text-white">{index + 1}</span>
                <span className="pt-1 leading-relaxed text-[#08271e]/75">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#06251b]/10 bg-white p-6 md:p-9">
          <h2 className="text-3xl font-black">Частые вопросы</h2>
          <div className="mt-5 divide-y divide-[#06251b]/10">
            {page.faq.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 text-lg font-bold">{item.question}<span aria-hidden="true" className="float-right text-green-700 transition group-open:rotate-45">＋</span></summary>
                <p className="mt-3 max-w-4xl leading-relaxed text-[#08271e]/68">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <p className="text-sm font-black uppercase tracking-[.18em] text-green-800">Дальше по теме</p>
          <h2 className="mt-3 text-3xl font-black">Продолжить планирование Фукуока</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {page.related.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-3xl border border-[#06251b]/10 bg-white/75 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
                <p className="font-black text-green-800">{item.label} →</p><p className="mt-2 text-sm leading-relaxed text-[#08271e]/65">{item.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#06251b]/10 bg-white/70 p-6 md:p-9">
          <p className="text-sm font-black uppercase tracking-[.18em] text-green-800">Источники</p>
          <h2 className="mt-3 text-3xl font-black">Информация проверена по русскоязычным и официальным источникам</h2>
          <p className="mt-4 max-w-4xl leading-relaxed text-[#08271e]/70">Расписания, билеты, погода и условия на острове меняются. Мы используем источники для проверки фактов и пишем рекомендации своими словами. Перед оплатой перепроверяйте актуальные условия на вашу дату.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {page.sources.map((source) => (
              <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-white p-4 font-bold text-green-800 shadow-sm hover:underline">{source.label} ↗</a>
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold text-[#08271e]/55">Обновлено: 10 сентября 2026 года.</p>
        </section>

        <section className="rounded-[2rem] bg-green-800 p-7 text-center text-white md:p-12">
          <p className="text-sm font-black uppercase tracking-[.2em] text-green-200">GoVietStay · Trusted Local Support</p>
          <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-black md:text-5xl">Напишите отель и даты — начнём с полезного совета</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/80">Не нужно сначала выбирать экскурсию. Опишите поездку — мы подскажем по-русски, что логично именно для вашего района и количества дней.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-6 py-4 font-black text-green-900 hover:bg-green-50">WhatsApp</a>
            <a href="https://t.me/GoVietStay" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/35 px-6 py-4 font-bold hover:bg-white/10">Telegram</a>
          </div>
        </section>
      </div>
    </main>
  );
}
