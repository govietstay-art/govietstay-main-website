import type { Metadata } from "next";
import JsonLd from "../../../components/JsonLd";

const BASE_URL = "https://www.govietstay.com";
const canonical = `${BASE_URL}/ru/kruiznye-ekskursii-chan-may-tien-sa`;

export const metadata: Metadata = {
  title: "Экскурсии из портов Чан Май и Тьен Са | GoVietStay",
  description:
    "Индивидуальные экскурсии для пассажиров круизных лайнеров из портов Чан Май и Тьен Са: Хюэ, Дананг, Хойан, Ba Na Hills, Лангко. Встреча в порту, реалистичный тайминг и возврат к лайнеру.",
  keywords: [
    "порт Чан Май экскурсия",
    "порт Тьен Са экскурсия",
    "круиз Дананг экскурсии",
    "Чан Май Хюэ",
    "Тьен Са Хойан",
    "экскурсии для круизных пассажиров Вьетнам",
    "русский гид Дананг круиз",
  ],
  alternates: {
    canonical,
    languages: {
      en: `${BASE_URL}/en/cruise-port-shore-excursions`,
      ru: canonical,
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: canonical,
    siteName: "GoVietStay",
    title: "Экскурсии из портов Чан Май и Тьен Са",
    description:
      "Понимайте заранее, что реально успеть за время стоянки лайнера — с частным транспортом, координацией встречи и безопасным возвратом к судну.",
    images: [`${BASE_URL}/hero-hoian-new.png`],
  },
};

const portCards = [
  {
    title: "Порт Чан Май",
    subtitle: "Лучший выбор для Хюэ, Лангко и перевала Хайван",
    facts: [
      "Лангко: примерно 20–25 мин",
      "Хюэ: примерно 75–90 мин",
      "Дананг: примерно 75–90 мин",
      "Хойан: примерно 105–120 мин",
    ],
  },
  {
    title: "Порт Тьен Са",
    subtitle: "Лучший выбор для Дананга, Мраморных гор и Хойана",
    facts: [
      "Центр Дананга: примерно 20–30 мин",
      "Мраморные горы: примерно 35–45 мин",
      "Хойан: примерно 50–65 мин",
      "Ba Na Hills: примерно 60–75 мин",
    ],
  },
];

const chanMayPlans = [
  {
    time: "Около 5 часов на берегу",
    title: "Лангко + перевал Хайван",
    plan: "Порт → Лангко / лагуна → смотровая площадка перевала Хайван → возвращение в порт Чан Май.",
    note: "Лучший вариант при короткой стоянке. Мы не советуем пытаться включить Хюэ, если реального времени на берегу слишком мало.",
  },
  {
    time: "Около 7 часов на берегу",
    title: "Главные места Хюэ",
    plan: "Порт → Хюэ → Императорская цитадель или выбранная императорская гробница → пагода Тьен Му → местный обед, если позволяет время → порт.",
    note: "Отличный вариант для первого визита. Количество остановок зависит от времени выхода из порта и времени all aboard.",
  },
  {
    time: "Около 9 часов на берегу",
    title: "Полноценный частный день в Хюэ",
    plan: "Порт → Хюэ → Императорская цитадель → пагода Тьен Му → выбранная императорская гробница → местный обед → возвращение к лайнеру.",
    note: "Более глубокое знакомство с Хюэ без отказа от безопасного резерва времени.",
  },
];

const tienSaPlans = [
  {
    time: "Около 5 часов на берегу",
    title: "Главное в Дананге",
    plan: "Порт → Сон Тра / пагода Линь Ынг → побережье Микхе → Мраморные горы, если позволяет время → порт.",
    note: "Компактный маршрут с небольшими переездами и меньшим риском задержки.",
  },
  {
    time: "Около 7 часов на берегу",
    title: "Дананг + Хойан",
    plan: "Порт → Мраморные горы → Старый город Хойан → местный обед или кофе → возвращение в порт Тьен Са.",
    note: "Один из самых сбалансированных маршрутов для круизных пассажиров из Тьен Са.",
  },
  {
    time: "Около 9 часов на берегу",
    title: "Хойан + Кокосовый лес ИЛИ Ba Na Hills",
    plan: "Выберите один основной маршрут: Хойан + деревня Камтхань и лодки-корзины или Ba Na Hills. Мы обычно не соединяем слишком много удалённых мест в один круизный день.",
    note: "Маршрут корректируется по мобильности гостей, очередям и времени all aboard.",
  },
];

const faq = [
  {
    q: "Можно ли встретить нас прямо у лайнера?",
    a: "Если доступ внутрь порта разрешён, мы заранее координируем данные автомобиля и пассажиров для разрешённой зоны встречи. Точная точка встречи зависит от лайнера, причала и правил безопасности порта, поэтому мы подтверждаем её перед прибытием, а не обещаем заранее фиксированное место.",
  },
  {
    q: "Какой запас времени вы оставляете для возвращения к судну?",
    a: "Мы строим программу от времени all aboard, а не только от официального времени отправления лайнера. В маршрут закладывается практический резерв, который может быть увеличен из-за трафика, погоды, большого количества круизных пассажиров или портовых процедур.",
  },
  {
    q: "Можно ли изменить маршрут под нас?",
    a: "Да. Пришлите название лайнера, дату, порт, время прибытия, all aboard, количество гостей, ограничения по ходьбе и желаемый язык гида. Мы предложим только те места, которые реально успеть посетить.",
  },
  {
    q: "Есть ли русскоязычный гид?",
    a: "Да, русскоязычного гида можно запросить заранее при наличии. Также доступны англоязычный гид и вариант только с частным автомобилем и водителем.",
  },
];

export default function Page() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Экскурсии из портов Чан Май и Тьен Са",
        url: canonical,
        inLanguage: "ru",
        provider: { "@id": `${BASE_URL}/#organization` },
        areaServed: ["Hue", "Da Nang", "Hoi An", "Chan May Port", "Tien Sa Port"],
        serviceType: "Индивидуальные береговые экскурсии и координация встречи в порту",
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd data={graph} />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.18),transparent_30%)]" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">GoVietStay • Круизная поддержка в Центральном Вьетнаме</p>
          <h1 className="max-w-5xl text-4xl font-black leading-tight md:text-6xl">Экскурсии из портов Чан Май и Тьен Са</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Мы планируем береговой день вокруг главного вопроса: <strong className="text-white">что вы реально успеете увидеть и при этом безопасно вернуться на лайнер?</strong></p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            {["Частный автомобиль / микроавтобус","Координация встречи в порту","Поддержка на русском и английском","План возврата к лайнеру"].map((x)=><span key={x} className="rounded-full border border-white/15 bg-white/5 px-4 py-2">✓ {x}</span>)}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="https://wa.me/84937762607?text=Здравствуйте%20GoVietStay%21%20Нужна%20экскурсия%20из%20круизного%20порта.%20Лайнер%3A%20__%20Дата%3A%20__%20Порт%3A%20Чан%20Май%20%2F%20Тьен%20Са%20Гостей%3A%20__%20Прибытие%3A%20__%20All%20aboard%3A%20__" className="rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950">Отправить данные лайнера в WhatsApp</a>
            <a href="#itineraries" className="rounded-xl border border-white/20 px-6 py-3 font-semibold">Посмотреть реальные маршруты</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5 text-amber-50">
          <strong>Важно для круизных пассажиров:</strong> мы считаем программу от времени <strong>all aboard</strong>, а не только от времени отправления лайнера. Доступ автомобиля внутрь порта и точная точка встречи зависят от лайнера, причала и разрешения службы безопасности.
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {portCards.map((p)=><article key={p.title} className="rounded-3xl border border-white/10 bg-white/5 p-7"><p className="text-sm font-bold uppercase tracking-wider text-sky-300">Круизный порт</p><h2 className="mt-2 text-3xl font-black">{p.title}</h2><p className="mt-2 text-slate-300">{p.subtitle}</p><ul className="mt-6 space-y-3 text-slate-200">{p.facts.map((x)=><li key={x}>• {x}</li>)}</ul><p className="mt-5 text-xs leading-5 text-slate-500">Время в пути является ориентировочным и может меняться из-за трафика, погоды, дорожных работ и портовых процедур.</p></article>)}
        </div>
      </section>

      <section id="itineraries" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="text-3xl font-black md:text-4xl">Сколько реально можно увидеть за один круизный день?</h2>
          <p className="mt-3 max-w-3xl text-slate-300">Ниже — ориентиры. Реальное время на экскурсию начинается после выхода гостей с лайнера и прохождения портовых процедур. Мы сокращаем или расширяем маршрут под конкретную стоянку.</p>

          <h3 className="mt-10 text-2xl font-extrabold text-sky-300">Из порта Чан Май</h3>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">{chanMayPlans.map((x)=><article key={x.time} className="rounded-2xl border border-white/10 bg-slate-900 p-6"><p className="text-sm font-bold text-emerald-300">{x.time}</p><h4 className="mt-2 text-xl font-black">{x.title}</h4><p className="mt-3 leading-7 text-slate-300">{x.plan}</p><p className="mt-4 text-sm leading-6 text-slate-400">{x.note}</p></article>)}</div>

          <h3 className="mt-12 text-2xl font-extrabold text-sky-300">Из порта Тьен Са</h3>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">{tienSaPlans.map((x)=><article key={x.time} className="rounded-2xl border border-white/10 bg-slate-900 p-6"><p className="text-sm font-bold text-emerald-300">{x.time}</p><h4 className="mt-2 text-xl font-black">{x.title}</h4><p className="mt-3 leading-7 text-slate-300">{x.plan}</p><p className="mt-4 text-sm leading-6 text-slate-400">{x.note}</p></article>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <h2 className="text-3xl font-black">Что прислать нам для точного маршрута</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 text-slate-200">{["Название лайнера","Дата захода","Порт: Чан Май или Тьен Са","Время прибытия","Время all aboard","Количество взрослых / детей","Желаемый язык гида","Ограничения по ходьбе"].map((x)=><div key={x} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">{x}</div>)}</div>
          </div>
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-7">
            <h2 className="text-2xl font-black">Наше правило круизного дня</h2>
            <p className="mt-4 leading-7 text-slate-200">Лучше убрать одну достопримечательность, чем рисковать возвращением. Мы строим маршрут назад от времени all aboard и оставляем практический резерв на дорогу и портовые процедуры.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-900/60">
        <div className="mx-auto max-w-4xl px-5 py-14">
          <h2 className="text-3xl font-black">Частые вопросы круизных пассажиров</h2>
          <div className="mt-6 space-y-4">{faq.map((item)=><details key={item.q} className="rounded-2xl border border-white/10 bg-white/5 p-5"><summary className="cursor-pointer font-bold">{item.q}</summary><p className="mt-3 leading-7 text-slate-300">{item.a}</p></details>)}</div>

          <div className="mt-10 rounded-3xl bg-white p-7 text-slate-950">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Быстрый расчёт</p>
            <h2 className="mt-2 text-3xl font-black">Пришлите расписание лайнера — мы скажем, что действительно можно успеть.</h2>
            <p className="mt-3 text-slate-600">Не обязательно сначала выбирать экскурсию. Отправьте данные захода в порт, и мы предложим безопасный и реалистичный маршрут.</p>
            <a href="https://wa.me/84937762607?text=Здравствуйте%20GoVietStay%21%20Помогите%20составить%20маршрут%20из%20круизного%20порта.%20Лайнер%3A%20__%20Дата%3A%20__%20Порт%3A%20__%20Гостей%3A%20__%20Прибытие%3A%20__%20All%20aboard%3A%20__" className="mt-6 inline-block rounded-xl bg-slate-950 px-6 py-3 font-bold text-white">WhatsApp GoVietStay</a>
          </div>
        </div>
      </section>
    </main>
  );
}
