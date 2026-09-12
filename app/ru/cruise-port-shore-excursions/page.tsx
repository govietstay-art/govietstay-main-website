import type { Metadata } from "next";
import JsonLd from "../../../components/JsonLd";

const BASE_URL = "https://www.govietstay.com";
const canonical = `${BASE_URL}/ru/cruise-port-shore-excursions`;
const LAST_CHECKED = "12 сентября 2026";

// Официальный план заходов судов порта Чан Мэй, проверен 12 сентября 2026.
// ETA/ETD — портовое расписание, а НЕ персональное время all aboard.
const chanMayCalls: string[][] = [
  ["14 сен 2026", "Adora Magic City", "08:00", "20:00"],
  ["22 сен 2026", "Dream", "06:00", "15:00"],
  ["13 окт 2026", "Royal Princess", "07:00", "17:00"],
  ["16 окт 2026", "Viking Venus", "06:00", "18:00"],
  ["17 окт 2026", "Dream", "08:00", "21:00"],
  ["26 окт 2026", "Navigator of the Seas", "07:00", "19:00"],
  ["03 ноя 2026", "Dream", "08:00", "21:00"],
  ["04 ноя 2026", "Viking Orion", "08:00", "18:30"],
  ["17 ноя 2026", "Celebrity Millennium", "07:00", "18:00"],
  ["18 ноя 2026", "Spectrum of the Seas", "07:00", "19:00"],
  ["25 ноя 2026", "Adora Flora City", "08:00", "20:00"],
  ["05 дек 2026", "Diamond Princess", "07:00", "17:00"],
  ["07 дек 2026", "Adora Flora City", "07:00", "20:00"],
  ["16 дек 2026", "Diamond Princess", "07:00", "17:00"],
  ["21 дек 2026", "Sapphire Princess", "07:00", "19:00"],
  ["25 дек 2026", "Nautica", "07:00", "18:00"],
  ["26 дек 2026", "Silver Muse", "08:00", "23:00"],
  ["27 дек 2026", "Celebrity Solstice", "07:00", "18:00"],
  ["30 дек 2026", "Norwegian Jade", "07:00", "15:30"],
];

// Предварительный календарь заходов в регионе Дананга.
// Финальный причал (Тьен Са / Чан Мэй / другой разрешённый) нужно перепроверить.
const daNangRegionalCalls: string[][] = [
  ["04 ноя 2026", "Azamara Pursuit", "08:00", "20:00"],
  ["17 ноя 2026", "Star Seeker", "06:00", "23:00"],
  ["24 ноя 2026", "Seabourn Encore", "07:00", "17:00"],
  ["25 ноя 2026", "Ritz-Carlton Luminara", "08:00", "20:00"],
  ["27 ноя 2026", "Westerdam", "08:00", "18:00"],
  ["15 дек 2026", "Westerdam", "07:00", "23:00"],
  ["29 дек 2026", "Star Seeker", "06:00", "23:00"],
  ["31 дек 2026", "Seabourn Encore", "08:00", "18:00"],
  ["06 янв 2027", "Celebrity Solstice", "08:00", "20:00"],
  ["08 янв 2027", "Seabourn Encore", "08:00", "18:00"],
  ["21 янв 2027", "Celebrity Solstice", "07:00", "19:00"],
  ["24 янв 2027", "Norwegian Jade", "07:00", "15:30"],
  ["27 янв 2027", "Silver Muse", "07:00", "23:00"],
  ["30 янв 2027", "Celebrity Solstice", "08:00", "20:00"],
];

export const metadata: Metadata = {
  title: "Экскурсии из портов Чан Мэй и Тьен Са 2026–2027 | GoVietStay",
  description:
    "Индивидуальные экскурсии из портов Чан Мэй и Тьен Са: актуальный календарь лайнеров, встреча в порту, Хюэ, Дананг, Хойан, Ba Na Hills и безопасный возврат к судну.",
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

function ScheduleTable({ rows }: { rows: string[][] }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-white/10 text-slate-100">
          <tr>
            <th className="px-4 py-3">Дата</th>
            <th className="px-4 py-3">Лайнер</th>
            <th className="px-4 py-3">ETA порта</th>
            <th className="px-4 py-3">ETD порта</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((row) => (
            <tr key={`${row[0]}-${row[1]}`} className="bg-slate-950/40">
              {row.map((cell, index) => (
                <td key={`${cell}-${index}`} className="whitespace-nowrap px-4 py-3 text-slate-300">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
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
          <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
            <a href="/ru" aria-label="GoVietStay на русском" className="inline-flex rounded-2xl bg-white p-2 shadow-2xl">
              <img
                src="/brand/govietstay-official-logo.jpg"
                alt="Официальный логотип GoVietStay"
                className="h-16 w-auto rounded-xl object-contain md:h-20"
              />
            </a>
            <div className="text-right text-xs leading-6 text-slate-400">
              <div className="font-bold text-slate-200">GoVietStay • Trusted Local Support</div>
              <div>Дананг • Хойан • Хюэ • Фукуок</div>
              <div>WhatsApp +84 937 762 607</div>
            </div>
          </div>
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

      <section id="schedule" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Актуальный календарь заходов</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Ближайшие круизные лайнеры, которые мы отслеживаем</h2>
            </div>
            <div className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-400">Проверено: {LAST_CHECKED}</div>
          </div>

          <div className="mt-8 rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-5 md:p-7">
            <h3 className="text-2xl font-black">Чан Мэй — официальный план порта</h3>
            <p className="mt-2 max-w-4xl leading-7 text-slate-300">
              Эти заходы пассажирских лайнеров взяты из опубликованного плана порта Чан Мэй. В таблице указаны портовые ETA/ETD, а не персональное время all aboard. Оперативные изменения возможны.
            </p>
            <ScheduleTable rows={chanMayCalls} />
            <p className="mt-4 text-xs leading-6 text-slate-400">
              Источник проверен 12 сентября 2026: официальный раздел порта Чан Мэй «Kế hoạch tàu vào cảng». Перед выходом с лайнера обязательно сверяйтесь с актуальной информацией круизной компании.
            </p>
            <a className="mt-3 inline-block text-sm font-bold text-sky-300 underline" href="https://www.chanmayport.com.vn/ke-hoach-tau-vao-cang" target="_blank" rel="noreferrer">
              Официальный план судов порта Чан Мэй ↗
            </a>
          </div>

          <div className="mt-6 rounded-3xl border border-sky-400/20 bg-sky-400/5 p-5 md:p-7">
            <h3 className="text-2xl font-black">Дананг / Тьен Са — предварительный календарь</h3>
            <p className="mt-2 max-w-4xl leading-7 text-slate-300">
              Эти опубликованные заходы по региону Дананга помогают заранее готовить транспорт и гидов. <strong className="text-white">Они не гарантируют, что финальный причал будет именно Тьен Са.</strong> В круизных расписаниях направление часто указано как “Da Nang”, тогда как фактический причал может быть Чан Мэй, Тьен Са или другая разрешённая точка.
            </p>
            <ScheduleTable rows={daNangRegionalCalls} />
            <p className="mt-4 text-xs leading-6 text-slate-400">
              Предварительные данные перепроверяются по публичным круизным календарям. Финальный порт, разрешение на въезд и точку встречи GoVietStay уточняет под конкретный лайнер.
            </p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm font-bold">
              <a className="text-sky-300 underline" href="https://danangport.com/dich-vu-khach-hang/?lang=en" target="_blank" rel="noreferrer">Cảng Đà Nẵng / Da Nang Port ↗</a>
              <a className="text-sky-300 underline" href="https://www.cruisetimetables.com/da-nang-vietnam-cruise-ship-schedule.html" target="_blank" rel="noreferrer">Публичный календарь круизов Дананга ↗</a>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5 leading-7 text-amber-50">
            <strong>Нельзя рассчитывать маршрут только по ETD.</strong> Время all aboard обычно раньше отправления. GoVietStay строит программу назад от вашего официального all aboard и оставляет практический запас на возвращение.
          </div>
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

      <section className="border-y border-white/10 bg-slate-900/70">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
            <div className="rounded-3xl bg-white p-5">
              <img src="/brand/govietstay-official-logo.jpg" alt="Официальный логотип GoVietStay" className="mx-auto h-28 w-auto rounded-xl object-contain" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Реальная местная координация</p>
              <h2 className="mt-2 text-3xl font-black">Кто организует ваш день с лайнера?</h2>
              <p className="mt-4 leading-7 text-slate-300">
                GoVietStay — туристическая служба во Вьетнаме, которая координирует индивидуальные экскурсии, трансферы и локальную помощь в Центральном Вьетнаме. Наш координационный офис в Дананге: <strong className="text-white">Room 106, Vicoland Building, 01 Le Thanh Nghi, Hoa Cuong Ward, Da Nang, Vietnam</strong>.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 text-sm">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4"><strong>Офис</strong><br />07:30–22:00 ежедневно</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4"><strong>WhatsApp</strong><br />+84 937 762 607</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4"><strong>Email</strong><br />govietstay@gmail.com</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4"><strong>Сайт</strong><br />www.govietstay.com</div>
              </div>
              <p className="mt-4 text-xs leading-6 text-slate-500">Офис в Дананге — это координационный офис GoVietStay, а не круизный терминал. Точную точку встречи в порту мы подтверждаем отдельно под ваш лайнер.</p>
            </div>
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
