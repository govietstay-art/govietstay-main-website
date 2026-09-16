import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "../../../components/JsonLd";

const BASE = "https://www.govietstay.com";
const CANONICAL = `${BASE}/ru/morskaya-rybalka-danang-phu-quoc`;
const WHATSAPP = `https://wa.me/84937762607?text=${encodeURIComponent(
  "Здравствуйте! Интересует морская рыбалка. Локация: Дананг / Фукуок. Дата: ___. Гостей: ___. Опыт рыбалки: ___. Формат: профессиональная / дневная / ночная ловля кальмара. Отель: ___.",
)}`;

export const metadata: Metadata = {
  title: "Морская рыбалка в Дананге и на Фукуоке",
  description:
    "Морская рыбалка в Дананге и на Фукуоке: профессиональные выходы, дневная рыбалка и ночная ловля кальмара. Цена и программа — по запросу.",
  keywords: [
    "морская рыбалка",
    "рыбалка в Дананге",
    "рыбалка в Дананге Вьетнам",
    "морская рыбалка в Дананге",
    "рыбалка на Фукуоке",
    "морская рыбалка на Фукуоке",
    "ночная ловля кальмара",
    "ловля кальмаров Вьетнам",
    "профессиональная рыбалка Вьетнам",
  ],
  alternates: { canonical: CANONICAL, languages: { ru: CANONICAL } },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: CANONICAL,
    siteName: "GoVietStay",
    title: "Морская рыбалка в Дананге и на Фукуоке | GoVietStay",
    description:
      "Профессиональная морская рыбалка, дневные выходы и ночная ловля кальмара. Дананг и Фукуок, поддержка на русском.",
    images: [{
      url: `${BASE}/ru/fishing/night-squid-fishing-guests.webp`,
      width: 600,
      height: 450,
      alt: "Гости GoVietStay после ночной ловли кальмара",
    }],
  },
};

const faqs = [
  ["Есть ли морская рыбалка в Дананге?", "Да. Доступны дневные выходы, профессиональная рыбалка по предварительному запросу и ночная ловля кальмара. Формат подтверждается по морю, судну и опыту участников."],
  ["Есть ли рыбалка на Фукуоке?", "Да. На Фукуоке можно запросить дневную рыбалку, профессиональный offshore-формат и вечернюю или ночную ловлю кальмара."],
  ["Нужен ли опыт для профессиональной рыбалки?", "Да. Профессиональный формат рассчитан на гостей с навыками рыбалки. Перед подтверждением мы обязательно уточняем ваш опыт и ожидаемый формат ловли."],
  ["Сколько стоит профессиональная морская рыбалка?", "Публичной фиксированной цены нет. Стоимость зависит от локации, судна, количества участников, длительности, дальности выхода, снастей и условий моря. Свяжитесь с нами заранее для точного расчёта."],
  ["Гарантирован ли улов?", "Нет. Улов зависит от сезона, течения, погоды, места и активности рыбы или кальмара. Мы не обещаем гарантированный результат."],
] as const;

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "GoVietStay на русском", item: `${BASE}/ru` },
        { "@type": "ListItem", position: 2, name: "Морская рыбалка", item: CANONICAL },
      ],
    },
    {
      "@type": "Service",
      "@id": `${CANONICAL}#service`,
      name: "Морская рыбалка в Дананге и на Фукуоке",
      serviceType: "Морская рыбалка и ловля кальмара",
      description: "Профессиональная морская рыбалка, дневные выходы и ночная ловля кальмара в Дананге и на Фукуоке.",
      inLanguage: "ru",
      url: CANONICAL,
      image: `${BASE}/ru/fishing/night-squid-fishing-guests.webp`,
      areaServed: [{ "@type": "City", name: "Da Nang" }, { "@type": "Place", name: "Phu Quoc" }],
      provider: { "@id": `${BASE}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

const formats = [
  {
    tag: "ОПЫТ ОБЯЗАТЕЛЕН",
    title: "Профессиональная морская рыбалка",
    text: "Полноценный выход для гостей, которые уже умеют рыбачить. Это не обычная экскурсия: до бронирования мы уточняем опыт, стиль ловли, длительность и требования к снастям.",
    bullets: ["Цена только по запросу", "Судно и район выхода под задачу", "Навыки рыбалки обязательны", "Решение капитана зависит от моря"],
  },
  {
    tag: "ДАНАНГ · ФУКУОК",
    title: "Дневная морская рыбалка",
    text: "Несколько часов в море именно за рыбалкой. Уровень сложности, снасти и время старта подтверждаются после общения с гостем.",
    bullets: ["Только Дананг и Фукуок", "Опыт уточняем заранее", "Актуальная цена перед оплатой", "Улов не гарантируется"],
  },
  {
    tag: "ВЕЧЕР В МОРЕ",
    title: "Ночная ловля кальмара",
    text: "Живой вечерний формат: выход в море, ловля кальмара и, когда позволяет улов и программа, приготовление свежего кальмара на борту.",
    bullets: ["Подходит друзьям и парам", "Инструктаж по используемой снасти", "Зависит от сезона и активности кальмара", "Программа подтверждается заранее"],
  },
] as const;

export default function Page() {
  return (
    <main className="min-h-screen bg-[#061713] text-[#f7f4ea] pb-24 md:pb-0">
      <JsonLd data={graph} />

      <section className="relative isolate min-h-[84svh] overflow-hidden">
        <Image src="/ru/fishing/night-squid-fishing-guests.webp" alt="Гости GoVietStay на ночной ловле кальмара" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#031511]/55 to-[#061713]" />
        <div className="relative z-10 mx-auto flex min-h-[84svh] max-w-7xl flex-col px-5 py-6 md:px-10 md:py-9">
          <header className="flex items-center justify-between gap-4">
            <Link href="/ru" className="text-xl font-black">GoVietStay</Link>
            <span className="rounded-full border border-white/25 bg-black/20 px-3 py-2 text-xs font-bold backdrop-blur">Дананг · Фукуок</span>
          </header>
          <div className="mt-auto max-w-5xl pb-9 pt-20 md:pb-14">
            <div className="flex flex-wrap gap-2 text-[11px] font-black uppercase tracking-[.15em]">
              <span className="rounded-full bg-amber-300 px-3 py-2 text-[#08251d]">Реальные гости</span>
              <span className="rounded-full border border-white/25 bg-black/20 px-3 py-2">Россия · Казахстан</span>
            </div>
            <p className="mt-6 text-sm font-black uppercase tracking-[.22em] text-teal-200">SEA FISHING · VIETNAM</p>
            <h1 className="mt-3 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl md:text-7xl">Морская рыбалка в Дананге и на Фукуоке</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">Профессиональные выходы, дневная рыбалка и ночная ловля кальмара. Для профессионального формата навыки рыбалки обязательны. Цена и программа подтверждаются только после уточнения деталей.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#20a65a] px-6 py-4 font-black text-white">Узнать программу и цену</a>
              <a href="https://t.me/GoVietStay" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 bg-white/5 px-6 py-4 font-bold">Telegram</a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-10 md:py-12">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Локации", "Только Дананг и Фукуок"],
            ["Профессиональный формат", "Опыт рыбалки обязателен"],
            ["Цена", "После проверки деталей"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/[.05] p-5">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-teal-200">{label}</p>
              <p className="mt-2 text-xl font-black">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[.2em] text-amber-300">Выберите формат</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Это три разные морские активности</h2>
          <p className="mt-4 leading-relaxed text-white/60">Мы не смешиваем профессиональную рыбалку, дневной выход и ловлю кальмара в один универсальный пакет. У них разные требования к участникам, судну, снастям и погоде.</p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {formats.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-white/10 bg-white/[.045] p-6">
              <span className="rounded-full bg-amber-300/10 px-3 py-2 text-[11px] font-black uppercase tracking-[.14em] text-amber-200">{item.tag}</span>
              <h3 className="mt-6 text-2xl font-black">{item.title}</h3>
              <p className="mt-4 leading-relaxed text-white/65">{item.text}</p>
              <ul className="mt-5 space-y-3 text-sm text-white/65">
                {item.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span className="text-teal-300">●</span><span>{bullet}</span></li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f4eee0] text-[#0a2a21]">
        <div className="mx-auto grid max-w-7xl gap-7 px-5 py-12 md:grid-cols-[1.05fr_.95fr] md:px-10 md:py-20">
          <div className="rounded-[2rem] bg-[#0a2a21] p-7 text-white md:p-10">
            <p className="text-sm font-black uppercase tracking-[.18em] text-amber-300">Профессиональная рыбалка</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">Свяжитесь заранее. Мы должны знать ваш реальный опыт.</h2>
            <p className="mt-5 leading-relaxed text-white/70">Фиксированной публичной цены нет. Стоимость зависит от локации, типа судна, количества участников, длительности, дальности выхода и снастей. После короткого разговора мы проверяем подходящий вариант и только затем подтверждаем программу.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Дананг или Фукуок", "Дата и количество гостей", "Опыт и привычный тип ловли", "Желаемая длительность", "Нужны ли снасти", "Название отеля"].map((x) => <div key={x} className="rounded-2xl border border-white/10 bg-white/[.06] p-4 text-sm font-semibold text-white/75">{x}</div>)}
            </div>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full bg-amber-300 px-6 py-4 font-black text-[#0a2a21]">Отправить данные в WhatsApp</a>
          </div>
          <figure className="overflow-hidden rounded-[2rem] bg-black">
            <Image src="/ru/fishing/squid-catch.webp" alt="Гость GoVietStay с пойманным кальмаром во время вечернего выхода" width={600} height={800} sizes="(max-width: 768px) 100vw, 45vw" className="h-full min-h-[420px] w-full object-cover" />
            <figcaption className="bg-black/80 px-4 py-3 text-xs leading-relaxed text-white/55">Фото с реальной ночной ловли кальмара. Профессиональная рыбалка подбирается отдельно под опыт гостя и условия моря.</figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[2rem] border border-white/10 bg-teal-400/5 p-7">
            <p className="text-sm font-black uppercase tracking-[.18em] text-teal-200">ДАНАНГ</p>
            <h2 className="mt-3 text-3xl font-black">Рыбалка в Дананге</h2>
            <p className="mt-4 leading-relaxed text-white/65">Для гостей Центрального Вьетнама: дневные морские выходы, профессиональная рыбалка по запросу и ночная ловля кальмара. Доступность подтверждаем по фактическому состоянию моря.</p>
          </article>
          <article className="rounded-[2rem] border border-white/10 bg-amber-300/5 p-7">
            <p className="text-sm font-black uppercase tracking-[.18em] text-amber-200">ФУКУОК</p>
            <h2 className="mt-3 text-3xl font-black">Рыбалка на Фукуоке</h2>
            <p className="mt-4 leading-relaxed text-white/65">Дневная рыбалка, профессиональный выход по предварительному запросу и вечерняя ловля кальмара. Сообщите район отеля заранее — логистика до точки посадки влияет на программу.</p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 md:px-10 md:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="text-sm font-black uppercase tracking-[.2em] text-amber-300">Реальный опыт</p><h2 className="mt-3 text-3xl font-black md:text-5xl">После ловли — свежий кальмар на борту</h2></div>
          <p className="max-w-xl text-sm leading-relaxed text-white/55">Главное фото на странице — из реального вечернего выхода GoVietStay. Никаких обещаний гарантированного улова: результат всегда зависит от моря и сезона.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-12">
          <figure className="overflow-hidden rounded-[2rem] border border-white/10 md:col-span-7">
            <Image src="/ru/fishing/night-squid-fishing-guests.webp" alt="Гости GoVietStay едят свежий кальмар после ночной рыбалки" width={600} height={450} sizes="(max-width: 768px) 100vw, 58vw" className="aspect-[4/3] w-full object-cover" />
          </figure>
          <div className="grid gap-4 md:col-span-5">
            <figure className="overflow-hidden rounded-[2rem] border border-white/10">
              <Image src="/ru/fishing/squid-catch.webp" alt="Пойманный кальмар во время ночного выхода GoVietStay" width={600} height={800} sizes="(max-width: 768px) 100vw, 42vw" className="aspect-[4/3] w-full object-cover object-[center_35%]" />
            </figure>
            <figure className="overflow-hidden rounded-[2rem] border border-white/10">
              <Image src="/ru/fishing/fresh-squid-noodles.webp" alt="Свежий кальмар, приготовленный после ловли на борту" width={600} height={450} sizes="(max-width: 768px) 100vw, 42vw" className="aspect-[4/3] w-full object-cover" />
            </figure>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12 md:px-10 md:py-20">
        <p className="text-center text-sm font-black uppercase tracking-[.2em] text-amber-300">FAQ</p>
        <h2 className="mt-3 text-center text-3xl font-black md:text-5xl">Частые вопросы</h2>
        <div className="mt-8 divide-y divide-white/10 rounded-[2rem] border border-white/10 bg-white/[.035] px-5 md:px-8">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group py-5">
              <summary className="cursor-pointer list-none pr-8 text-lg font-black">{question}<span className="float-right text-amber-300 transition group-open:rotate-45">＋</span></summary>
              <p className="mt-4 leading-relaxed text-white/62">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-10 md:pb-24">
        <div className="rounded-[2.2rem] bg-gradient-to-br from-[#0d6b52] to-[#082b23] p-8 text-center md:p-12">
          <p className="text-sm font-black uppercase tracking-[.2em] text-teal-100">GoVietStay · Trusted Local Support</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-black md:text-5xl">Хотите настоящую рыбалку, а не просто прогулку на лодке?</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/70">Напишите локацию, дату, количество гостей и ваш опыт. Для профессиональной морской рыбалки навыки обязательны. Мы проверим судно, море, программу и точную цену.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-6 py-4 font-black text-[#0b503f]">WhatsApp</a>
            <a href="https://t.me/GoVietStay" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 px-6 py-4 font-bold">Telegram</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-white/50">
        <div className="flex flex-wrap justify-center gap-5 font-semibold"><Link href="/ru">Главная</Link><Link href="/ru/danang">Дананг</Link><Link href="/ru/phu-quoc">Фукуок</Link><Link href="/ru/tours/phu-quoc">Туры на Фукуоке</Link></div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#061713]/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-lg gap-2"><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-2xl bg-[#20a65a] px-4 py-3 text-center text-sm font-black">WhatsApp · цена</a><a href="https://t.me/GoVietStay" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-bold">Telegram</a></div>
      </div>
    </main>
  );
}
