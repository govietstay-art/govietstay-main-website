import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "../../../components/JsonLd";

const BASE_URL = "https://www.govietstay.com";
const canonical = `${BASE_URL}/ru/phu-quoc-help`;
const WHATSAPP_NUMBER = "84937762607";
const whatsappText =
  "Здравствуйте! Я уже на Фукуоке. Отель: ___. Сколько дней на острове / даты: ___. Нас: ___. Дети (возраст): ___. Подскажите, пожалуйста, что удобно посмотреть из нашего района.";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;

export const metadata: Metadata = {
  title: "Фукуок на русском: бесплатная местная помощь и полезный гид",
  description:
    "Уже на Фукуоке? Бесплатный русскоязычный гид GoVietStay: районы острова, погода, транспорт, деньги, отдых с детьми, 3 или 4 острова, экстренные контакты и местная помощь.",
  keywords: [
    "Фукуок на русском",
    "что посмотреть на Фукуоке",
    "куда поехать на Фукуоке",
    "Фукуок с детьми",
    "3 острова Фукуок",
    "4 острова Фукуок",
    "трансфер аэропорт Фукуок",
    "русский гид Фукуок",
    "помощь туристам Фукуок",
    "погода Фукуок",
  ],
  alternates: {
    canonical,
    languages: { ru: canonical },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: canonical,
    siteName: "GoVietStay",
    title: "Фукуок на русском — местная помощь без лишней продажи",
    description:
      "Практический гид для тех, кто уже на Фукуоке: что посмотреть, как передвигаться, чем платить, куда ехать с детьми и что делать в экстренной ситуации.",
    images: [
      {
        url: `${BASE_URL}/tour/phuquoc/tour-01-1.jpg`,
        alt: "Фукуок, Вьетнам — полезный гид GoVietStay на русском языке",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Фукуок на русском — бесплатная местная помощь",
    description:
      "Полезный гид GoVietStay для туристов на Фукуоке: районы, транспорт, деньги, погода, дети и экстренные контакты.",
    images: [`${BASE_URL}/tour/phuquoc/tour-01-1.jpg`],
  },
};

const quickHelp = [
  {
    icon: "📍",
    title: "Что посмотреть рядом с вашим отелем",
    text: "Напишите район или название отеля. Подскажем, что логично объединить в один день, чтобы не ездить через весь остров туда-обратно.",
  },
  {
    icon: "🌦️",
    title: "Куда ехать с учётом погоды",
    text: "На Фукуоке важен не только прогноз дождя, но и ветер и состояние моря. Для морской прогулки лучше перепроверять условия ближе к дате.",
  },
  {
    icon: "🚕",
    title: "Такси, трансфер или машина",
    text: "Поможем понять, когда достаточно Grab, Xanh SM или Maxim, а когда удобнее заранее заказать автомобиль — особенно с детьми и багажом.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Маршрут с детьми",
    text: "Не будем советовать пять локаций за один день. Возраст ребёнка, жара, сон и расстояния на острове важнее количества галочек в программе.",
  },
  {
    icon: "🏝️",
    title: "3 острова или 4 острова",
    text: "Сравним не название тура, а реальный маршрут: сколько времени на воде, где снорклинг, есть ли канатная дорога, обед и трансфер.",
  },
  {
    icon: "💵",
    title: "Деньги и бытовые вопросы",
    text: "Подскажем, где обычно удобнее менять валюту, почему стоит иметь наличные VND и на какие способы оплаты не лучше рассчитывать как на единственные.",
  },
];

const zones = [
  {
    title: "Север острова",
    label: "Grand World · VinWonders · Safari",
    text: "Если вы живёте на севере, логично посвятить день северным локациям. Ехать утром на юг, а вечером возвращаться в Grand World — это много дороги и мало отдыха.",
    tip: "С ребёнком чаще лучше выбрать Safari + спокойный вечер или VinWonders как отдельный насыщенный день, а не пытаться вместить всё сразу.",
  },
  {
    title: "Центр и западное побережье",
    label: "Duong Dong · Long Beach",
    text: "Удобная база для рынка, ресторанов, повседневных поездок и выездов как на север, так и на юг. Вечер можно оставить для Duong Dong или заката, не превращая его в отдельную экскурсию.",
    tip: "Если вы только прилетели, первый день лучше оставить лёгким: заселиться, поменять часть денег, купить SIM/eSIM и спокойно разобраться с островом.",
  },
  {
    title: "Юг острова",
    label: "An Thoi · Sunset Town · Khem · Bai Sao",
    text: "Юг удобно объединять по географии: пляж, Sunset Town, канатная дорога Hon Thom или морская программа из архипелага An Thoi — в зависимости от погоды и вашего темпа.",
    tip: "Не ставьте морскую прогулку и длинную наземную программу в один день только ради экономии времени. После катера большинству людей приятнее оставить вечер свободным.",
  },
];

const sources = [
  {
    label: "КД МИД России — информация по Вьетнаму",
    href: "https://www.kdmid.ru/docs/vietnam/information-about-the-country/",
    text: "Экстренные номера, медицинская страховка, деньги, связь и общая информация для российских граждан.",
  },
  {
    label: "КД МИД России — консульские учреждения во Вьетнаме",
    href: "https://www.kdmid.ru/docs/vietnam/russian-consular-offices/",
    text: "Актуальные контакты Посольства и Генконсульств РФ, включая экстренные телефоны.",
  },
  {
    label: "АТОР — что посмотреть на Фукуоке кроме пляжа",
    href: "https://www.atorus.ru/article/otkryvaem-fukuok-po-novomu-chto-posmotret-za-predelami-plyazha-64401",
    text: "Практический обзор острова: север, юг, парки, канатная дорога и морские маршруты.",
  },
  {
    label: "Фукуок 24 — с чего начать на острове",
    href: "https://phuquoc24.ru/fukuok-s-chego-nachat/",
    text: "Русскоязычная локальная база по районам, пляжам, транспорту, деньгам, медицине и быту.",
  },
  {
    label: "Фукуок 24 — транспорт",
    href: "https://phuquoc24.ru/kak-peredvigatsja-na-fukuoke/",
    text: "Grab, Xanh SM, Maxim, аренда и практические способы передвижения по острову.",
  },
  {
    label: "Фукуок 24 — погода и сезоны",
    href: "https://phuquoc24.ru/info/pogoda-na-fukuoke/",
    text: "Актуальные материалы по дождям, морю и сезонности; раздел регулярно обновляется.",
  },
];

const faq = [
  {
    question: "Можно ли действительно получить совет бесплатно?",
    answer:
      "Да. Напишите название отеля, сколько дней вы будете на Фукуоке, состав семьи и что вам интересно. Мы подскажем логичный план без обязательства покупать экскурсию. Если позже понадобится трансфер, билет, экскурсия или частная поездка, мы также можем это организовать.",
  },
  {
    question: "Что лучше: 3 острова или 4 острова на Фукуоке?",
    answer:
      "Смотрите не на цифру, а на фактическую программу. У разных операторов названия могут означать разные остановки. Для семьи с маленькими детьми или тех, кто не любит долгий день на воде, более короткая программа часто комфортнее. Перед оплатой уточните точки снорклинга, длительность, обед, трансфер, канатную дорогу и правила изменения маршрута из-за моря.",
  },
  {
    question: "Можно ли ездить по Фукуоку без экскурсии?",
    answer:
      "Да. Многие пляжи, Duong Dong, ночной рынок и часть городских локаций удобно посещать самостоятельно. Организованный формат полезнее там, где важны логистика, катер, билеты, длинные переезды, русскоязычное объяснение или поездка большой семьёй.",
  },
  {
    question: "Есть ли на Фукуоке Grab?",
    answer:
      "Да. На острове используют Grab, а также Xanh SM и Maxim. Доступность машины и время ожидания зависят от района и времени суток. Для аэропорта, раннего выезда, большой семьи или большого багажа заранее заказанный трансфер может быть спокойнее.",
  },
  {
    question: "Что делать, если заболел на Фукуоке?",
    answer:
      "Если ситуация не угрожает жизни, сначала свяжитесь со своей страховой и следуйте её инструкции: самостоятельное обращение в клинику иногда влияет на возмещение. При угрозе жизни действуйте сразу. Общий номер скорой помощи во Вьетнаме — 115.",
  },
  {
    question: "Можно ли попросить русскоговорящего гида?",
    answer:
      "Да, но лучше запрашивать заранее. Наличие русскоговорящего гида зависит от даты и маршрута. Если гид не нужен, GoVietStay всё равно может вести переписку и поддержку на русском языке до и во время поездки.",
  },
];

export default function PhuQuocHelpPage() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "GoVietStay на русском",
            item: `${BASE_URL}/ru`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Фукуок — местная помощь",
            item: canonical,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: "Фукуок на русском: бесплатная местная помощь и полезный гид",
        description:
          "Практический русскоязычный гид для туристов, которые уже находятся на Фукуоке.",
        inLanguage: "ru",
        dateModified: "2026-09-09",
        about: { "@type": "Place", name: "Phu Quoc, Vietnam" },
        publisher: { "@id": `${BASE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f7f1df] text-[#08271e]">
      <JsonLd data={graph} />

      <section className="relative isolate overflow-hidden bg-[#06251b] text-white">
        <Image
          src="/tour/phuquoc/tour-01-1.jpg"
          alt="Фукуок во Вьетнаме — местный гид на русском языке"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#031b14]/95 via-[#031b14]/82 to-[#031b14]/48" />
        <div className="mx-auto flex min-h-[76svh] max-w-6xl flex-col px-5 py-6 md:px-10 md:py-9">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/ru" className="text-xl font-black tracking-tight">
              GoVietStay
            </Link>
            <nav aria-label="Навигация по Фукуоку" className="flex flex-wrap gap-2 text-sm font-semibold">
              <a href="#first" className="rounded-full border border-white/30 px-4 py-2 backdrop-blur hover:bg-white/10">
                С чего начать
              </a>
              <a href="#emergency" className="rounded-full border border-white/30 px-4 py-2 backdrop-blur hover:bg-white/10">
                Важно
              </a>
              <Link href="/ru/tours/phu-quoc" className="rounded-full border border-white/30 px-4 py-2 backdrop-blur hover:bg-white/10">
                Экскурсии
              </Link>
            </nav>
          </header>

          <div className="mt-auto max-w-4xl pb-9 pt-20">
            <p className="text-sm font-extrabold uppercase tracking-[.2em] text-amber-300">
              Бесплатная местная помощь · Фукуок
            </p>
            <h1 className="mt-4 text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl md:text-7xl">
              Уже на Фукуоке? Сначала разберёмся, потом решим, нужно ли что-то бронировать.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
              Напишите название отеля, сколько дней вы будете на острове и с кем путешествуете. Мы бесплатно подскажем, что удобно именно из вашего района, где не стоит терять время и что лучше оставить на другой день.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#20a65a] px-6 py-4 font-black text-white shadow-lg transition hover:bg-[#168849]"
              >
                Написать в WhatsApp — бесплатно
              </a>
              <a
                href="https://t.me/GoVietStay"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/35 px-6 py-4 font-bold text-white backdrop-blur transition hover:bg-white/10"
              >
                Telegram
              </a>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Не нужно выбирать тур заранее. Достаточно написать: отель · даты · сколько человек · возраст детей.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-5 py-10 md:px-10 md:py-16">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Быстрая помощь на Фукуоке">
          {quickHelp.map((item) => (
            <article key={item.title} className="rounded-[1.75rem] border border-[#06251b]/10 bg-white p-6 shadow-sm">
              <span className="text-2xl" aria-hidden="true">{item.icon}</span>
              <h2 className="mt-4 text-xl font-black">{item.title}</h2>
              <p className="mt-3 leading-relaxed text-[#08271e]/70">{item.text}</p>
            </article>
          ))}
        </section>

        <section id="first" className="scroll-mt-6 rounded-[2rem] bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-extrabold uppercase tracking-[.18em] text-green-800">Если вы впервые на Фукуоке</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black md:text-5xl">Не пытайтесь посмотреть весь остров за один день</h2>
          <div className="mt-6 max-w-4xl space-y-4 text-lg leading-relaxed text-[#08271e]/72">
            <p>
              Фукуок выглядит компактно на карте, но север, центр и юг — это разные туристические зоны. Самая частая ошибка первого дня — собрать Safari, пляж на юге, канатную дорогу и вечерний Grand World в один маршрут. Технически многое возможно, но отдых превращается в дорогу.
            </p>
            <p>
              Лучше отталкиваться от вашего отеля. Сначала соберите локации в одной части острова, а морской день оставьте отдельным. Такой план обычно дешевле по транспорту и заметно спокойнее.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {zones.map((zone) => (
              <article key={zone.title} className="rounded-3xl bg-[#f3ecd8] p-6">
                <p className="text-xs font-black uppercase tracking-[.16em] text-green-800">{zone.label}</p>
                <h3 className="mt-2 text-2xl font-black">{zone.title}</h3>
                <p className="mt-4 leading-relaxed text-[#08271e]/72">{zone.text}</p>
                <p className="mt-4 rounded-2xl bg-white/70 p-4 text-sm font-semibold leading-relaxed text-[#08271e]/76">
                  Наш совет: {zone.tip}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-[#06251b]/10 bg-white/75 p-6 md:p-8">
            <p className="text-sm font-extrabold uppercase tracking-[.18em] text-green-800">Погода и море</p>
            <h2 className="mt-3 text-3xl font-black">Не планируйте морской день только по значку «дождь»</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-[#08271e]/72">
              <p>
                С июня по сентябрь погода на Фукуоке менее предсказуема; сентябрь всё ещё относится к дождливому периоду. Октябрь — переходный месяц, а в ноябре условия обычно становятся стабильнее. Но даже в высокий сезон состояние моря может меняться.
              </p>
              <p>
                Для катера и снорклинга важны ветер, волна и решение оператора/местных служб, а не только вероятность осадков в приложении. Если море выглядит сомнительно, лучше перепроверить программу ближе к выезду, чем заранее строить весь отпуск вокруг одного дня.
              </p>
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#06251b]/10 bg-white/75 p-6 md:p-8">
            <p className="text-sm font-extrabold uppercase tracking-[.18em] text-green-800">Транспорт</p>
            <h2 className="mt-3 text-3xl font-black">Grab есть, но это не единственный вариант</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-[#08271e]/72">
              <p>
                На Фукуоке используют Grab, Xanh SM и Maxim. Для коротких поездок это часто самый простой вариант. На север также ходят автобусы VinBus, поэтому из некоторых районов можно заметно сэкономить на дороге.
              </p>
              <p>
                С багажом, маленькими детьми, ранним выездом или маршрутом из нескольких точек заранее согласованный автомобиль часто удобнее: вы знаете время подачи и не собираете поездку заново после каждой остановки.
              </p>
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#06251b]/10 bg-white/75 p-6 md:p-8">
            <p className="text-sm font-extrabold uppercase tracking-[.18em] text-green-800">Деньги</p>
            <h2 className="mt-3 text-3xl font-black">Держите часть бюджета в донгах</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-[#08271e]/72">
              <p>
                Официальная валюта — вьетнамский донг (VND). Карты принимают в отелях и многих туристических местах, но небольшие кафе, рынки и локальные услуги по-прежнему удобнее оплачивать наличными.
              </p>
              <p>
                КД МИД России отдельно предупреждает, что оплата картами российских банков и снятие наличных могут быть затруднены. Поэтому не стройте поездку вокруг одной карты: разумнее иметь запас наличных и заранее понимать, чем вы будете платить.
              </p>
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#06251b]/10 bg-white/75 p-6 md:p-8">
            <p className="text-sm font-extrabold uppercase tracking-[.18em] text-green-800">Связь</p>
            <h2 className="mt-3 text-3xl font-black">Интернет лучше решить до первой поездки из аэропорта</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-[#08271e]/72">
              <p>
                Местная SIM или eSIM упрощает всё: такси, карты, переводчик, связь с отелем и страховой. КД МИД России также рекомендует по прибытии приобрести SIM-карту местного оператора.
              </p>
              <p>
                Если прилетаете поздно и не хотите разбираться с приложениями в аэропорту, заранее сохраните адрес отеля и контакт трансфера в телефоне — желательно офлайн.
              </p>
            </div>
          </article>
        </section>

        <section className="rounded-[2rem] bg-[#06251b] p-6 text-white md:p-10">
          <p className="text-sm font-extrabold uppercase tracking-[.18em] text-amber-300">3 острова или 4 острова?</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black md:text-5xl">Цифра в названии тура почти ничего не говорит о качестве дня</h2>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-white/75">
            У разных операторов «3 острова» и «4 острова» могут означать разные остановки и разную длительность. Перед оплатой задайте шесть вопросов — и сравнение станет намного понятнее.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Сколько реального времени мы проведём на катере?",
              "Сколько будет остановок для снорклинга и сколько времени на каждой?",
              "Входит ли канатная дорога Hon Thom или она оплачивается отдельно?",
              "Что именно входит в обед и напитки?",
              "Откуда забирают и есть ли доплата за наш район/отель?",
              "Что происходит с маршрутом, если море или ветер меняются?",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 p-5 font-semibold leading-relaxed ring-1 ring-white/10">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-4xl leading-relaxed text-white/70">
            Если вы едете с маленькими детьми, не любите долгий день на воде или быстро укачивает — более короткая программа часто лучше. Если цель именно снорклинг и острова, наоборот, смотрите на время в море и точки остановок, а не на красивое название пакета.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-[#efe5c8] p-6 md:p-8">
            <p className="text-sm font-extrabold uppercase tracking-[.18em] text-green-800">Фукуок с детьми</p>
            <h2 className="mt-3 text-3xl font-black">Один главный план на день — обычно достаточно</h2>
            <p className="mt-5 leading-relaxed text-[#08271e]/72">
              Safari, VinWonders, пляж, катер и Sunset Town по отдельности могут быть отличными идеями. Проблема начинается, когда их пытаются соединить в один день. С ребёнком полезнее выбрать одну главную активность и оставить запас времени на еду, сон и дорогу.
            </p>
            <p className="mt-4 leading-relaxed text-[#08271e]/72">
              Напишите возраст ребёнка и район отеля — мы предложим спокойную последовательность, а не программу «успеть всё».
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-extrabold uppercase tracking-[.18em] text-green-800">Что можно посмотреть самостоятельно</p>
            <h2 className="mt-3 text-3xl font-black">Не всё на Фукуоке требует экскурсии</h2>
            <ul className="mt-6 space-y-4 text-[#08271e]/72">
              {[
                "Duong Dong и вечерний рынок — удобно оставить на свободный вечер.",
                "Long Beach и многие пляжные точки можно посещать самостоятельно.",
                "Grand World можно совместить с другими северными локациями без отдельной обзорной экскурсии.",
                "Bai Sao или Khem удобно включить в южный день, если погода и дорога подходят.",
                "Организация особенно полезна для морских маршрутов, большого количества билетов, частной машины или русскоязычного сопровождения.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-black text-green-700" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="emergency" className="scroll-mt-6 rounded-[2rem] border-2 border-red-200 bg-red-50 p-6 md:p-9">
          <p className="text-sm font-extrabold uppercase tracking-[.18em] text-red-700">Сохраните в телефон</p>
          <h2 className="mt-3 text-3xl font-black text-red-950">Экстренные номера во Вьетнаме</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5"><p className="text-sm font-bold text-red-700">Полиция</p><p className="mt-1 text-3xl font-black">113</p></div>
            <div className="rounded-2xl bg-white p-5"><p className="text-sm font-bold text-red-700">Пожарная служба</p><p className="mt-1 text-3xl font-black">114</p></div>
            <div className="rounded-2xl bg-white p-5"><p className="text-sm font-bold text-red-700">Скорая помощь</p><p className="mt-1 text-3xl font-black">115</p></div>
          </div>
          <div className="mt-5 space-y-3 leading-relaxed text-red-950/75">
            <p>
              Если ситуация не угрожает жизни, сначала свяжитесь со страховой по номеру в полисе и уточните, в какую клинику ехать. Официальная памятка КД МИД России предупреждает, что самостоятельное обращение иногда может повлиять на оплату расходов страховой компанией.
            </p>
            <p>
              Экстренный телефон Генерального консульства РФ в Хошимине: <strong>+84 903 084 588</strong>. Этот номер предназначен именно для чрезвычайных ситуаций российских граждан, а не для обычных консульских консультаций.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-sm md:p-9">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold uppercase tracking-[.18em] text-green-800">Если всё-таки нужна организация</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">Сначала совет. Бронирование — только если оно действительно упрощает ваш день.</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#08271e]/72">
              GoVietStay может помочь с аэропортовым трансфером, частной машиной, морскими программами, билетами и индивидуальными поездками по Фукуоку. Но если до нужного места проще доехать самостоятельно, мы так и скажем.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-800 px-6 py-4 font-black text-white transition hover:bg-green-900">
              Получить бесплатный совет
            </a>
            <Link href="/ru/tours/phu-quoc" className="rounded-full border border-green-800/25 px-6 py-4 font-bold text-green-900 transition hover:bg-green-50">
              Посмотреть экскурсии на Фукуоке
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#06251b]/10 bg-white/70 p-6 md:p-9">
          <p className="text-sm font-extrabold uppercase tracking-[.18em] text-green-800">Источники и проверка информации</p>
          <h2 className="mt-3 text-3xl font-black">Мы не хотим, чтобы этот гид был «ещё одной SEO-страницей»</h2>
          <p className="mt-4 max-w-4xl leading-relaxed text-[#08271e]/70">
            Практические факты сверены по русскоязычным источникам, которыми пользуются путешественники, и по официальным материалам Консульского департамента МИД России. Информация о погоде, транспорте и локальных условиях меняется — поэтому перед поездкой на катере, дальним трансфером или обращением за медицинской помощью проверяйте актуальную ситуацию на дату поездки.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {sources.map((source) => (
              <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className="rounded-3xl border border-[#06251b]/10 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="font-black text-green-800">{source.label} ↗</p>
                <p className="mt-2 text-sm leading-relaxed text-[#08271e]/65">{source.text}</p>
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm font-semibold text-[#08271e]/55">Обновлено: 9 сентября 2026 года.</p>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-sm md:p-9">
          <h2 className="text-3xl font-black">Частые вопросы о Фукуоке</h2>
          <div className="mt-5 divide-y divide-[#06251b]/10">
            {faq.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 text-lg font-bold">
                  {item.question}
                  <span aria-hidden="true" className="float-right text-green-700 transition group-open:rotate-45">＋</span>
                </summary>
                <p className="mt-3 max-w-4xl leading-relaxed text-[#08271e]/68">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-green-800 p-7 text-center text-white md:p-12">
          <p className="text-sm font-extrabold uppercase tracking-[.2em] text-green-200">GoVietStay · местная поддержка на русском</p>
          <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-black md:text-5xl">Напишите отель и количество дней — начнём с бесплатного плана</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/80">
            Не нужно заранее знать названия экскурсий. Скажите, где вы живёте, кто с вами и что вам нравится — мы поможем собрать нормальный маршрут по Фукуоку на русском языке.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-6 py-4 font-black text-green-900 transition hover:bg-green-50">
              Написать в WhatsApp
            </a>
            <a href="https://t.me/GoVietStay" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/35 px-6 py-4 font-bold transition hover:bg-white/10">
              Telegram
            </a>
          </div>
          <p className="mt-5 text-sm text-white/65">WhatsApp: +84 937 762 607</p>
        </section>
      </div>
    </main>
  );
}
