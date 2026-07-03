"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type RuTour = {
  id: string;
  title: string;
  shortTitle: string;
  image: string;
  badge: string;
  duration: string;
  intro: string;
  groupPriceAdult?: string;
  groupPriceChild?: string;
  ruPriceAdult?: string;
  ruPriceChild?: string;
  upgradeNote?: string;
  highlights: string[];
  includes: string[];
  perfectFor: string[];
  details: string[];
};

const ANNA_PHONE_DISPLAY = "+84 78 706 2460";
const ANNA_PHONE_LINK = "84787062460";

const annaWa = (text: string) =>
  `https://wa.me/${ANNA_PHONE_LINK}?text=${encodeURIComponent(text)}`;

const ruTours: RuTour[] = [
  {
    id: "bana",
    title: "БА НА ХИЛЛЗ • ЗОЛОТОЙ МОСТ • КАНАТНАЯ ДОРОГА",
    shortTitle: "Ba Na Hills",
    image: "/tour/bana.jpg",
    badge: "ТОП-ХИТ ДАНАНГА",
    duration: "На весь день",
    intro:
      "Золотой мост, французская деревня, канатная дорога и один из самых известных видов Центрального Вьетнама.",
    groupPriceAdult: "от 1,550,000 VND",
    groupPriceChild: "от 1,450,000 VND",
    ruPriceAdult: "от 2,200,000 VND",
    ruPriceChild: "от 2,000,000 VND",
    upgradeNote:
      "Для групп от 4 гостей GoVietStay может помочь перевести тур в более комфортный private формат.",
    highlights: [
      "Golden Bridge / Золотой мост",
      "Канатная дорога Ba Na Hills",
      "French Village",
      "Фото-стопы и помощь по маршруту",
    ],
    includes: [
      "Поддержка GoVietStay",
      "Русскоговорящий гид по запросу",
      "Трансфер по выбранному пакету",
      "Сопровождение по WhatsApp",
    ],
    perfectFor: ["Семьи", "Пары", "Первый визит в Дананг", "Гости, любящие красивые фото"],
    details: [
      "Это один из самых популярных туров для гостей Дананга.",
      "Подходит тем, кто хочет увидеть Золотой мост без лишней суеты и с понятной логистикой.",
      "Если вы едете семьёй или компанией, мы можем подсказать, какой формат лучше: стандартный, с русским гидом или private.",
    ],
  },
  {
    id: "cham",
    title: "ОСТРОВ ЧАМ • СКОРОСТНОЙ КАТЕР • МОРЕ И СНОРКЛИНГ",
    shortTitle: "Cham Island",
    image: "/tour/cham.jpg",
    badge: "МОРЕ • ОСТРОВ • ЛЕТО",
    duration: "На полдня / день",
    intro:
      "Быстрый катер, пляж, островная атмосфера и отдых на море недалеко от Хойана.",
    groupPriceAdult: "от 950,000 VND / чел.",
    groupPriceChild: "уточняется",
    ruPriceAdult: "от 1,800,000 VND / чел.",
    ruPriceChild: "от 1,500,000 VND / чел.",
    upgradeNote:
      "Если вас 4 и больше, можно обсудить более удобный private формат с лучшей гибкостью по времени.",
    highlights: [
      "Скоростной катер",
      "Пляжный отдых",
      "Снорклинг / морская прогулка",
      "Удобно сочетать с Хойаном",
    ],
    includes: [
      "Помощь с выбором формата тура",
      "Русский гид по доступности",
      "Поддержка до и во время поездки",
      "Консультация по погоде и морю",
    ],
    perfectFor: ["Пары", "Семьи", "Компании друзей", "Летний отдых"],
    details: [
      "Тур сильно зависит от погоды и состояния моря, поэтому мы заранее подскажем, стоит ли ехать в выбранный день.",
      "Подходит тем, кто хочет добавить к Данангу или Хойану морской день.",
      "Если важен комфорт, можно обсудить private вариант.",
    ],
  },
  {
    id: "coconut",
    title: "ХОЙАН • КОРЗИННАЯ ЛОДКА • КОКОСОВЫЙ ЛЕС",
    shortTitle: "Hoi An Basket Boat",
    image: "/tour/coconut.jpg",
    badge: "ХОЙАН • ЛОКАЛЬНЫЙ ОПЫТ",
    duration: "Полдня",
    intro:
      "Знаменитая корзинная лодка, кокосовый лес и лёгкая программа, которую удобно сочетать с древним городом Хойан.",
    groupPriceAdult: "от 1,250,000 VND",
    groupPriceChild: "от 1,000,000 VND",
    ruPriceAdult: "от 1,800,000 VND",
    ruPriceChild: "от 1,600,000 VND",
    upgradeNote:
      "Для группы от 4 человек можно сделать более удобный private маршрут с гибким временем.",
    highlights: [
      "Basket Boat / корзинная лодка",
      "Кокосовый лес Cam Thanh",
      "Хорошо сочетается с вечерним Хойаном",
      "Подходит для семей и детей",
    ],
    includes: [
      "Консультация по маршруту",
      "Помощь с трансфером",
      "Русскоязычная поддержка по запросу",
      "Подсказка, как совместить с Ancient Town",
    ],
    perfectFor: ["Семьи", "Гости с детьми", "Те, кто хочет мягкий формат экскурсии"],
    details: [
      "Очень удобный тур для семейного отдыха и первого знакомства с Хойаном.",
      "Можно комбинировать с древним городом, ужином и шоу Hoi An Memories.",
      "Если вам не нравится формат больших групп, лучше сразу обсуждать более приватный вариант.",
    ],
  },
  {
    id: "memories",
    title: "HOI AN MEMORIES SHOW • ВЕЧЕРНЕЕ ШОУ В ХОЙАНЕ",
    shortTitle: "Hoi An Memories Show",
    image: "/tour/hoianmemories.jpg",
    badge: "ВЕЧЕР • КУЛЬТУРА • ШОУ",
    duration: "Вечер",
    intro:
      "Один из самых известных вечерних культурных проектов Хойана. Удобно сочетать с прогулкой по древнему городу.",
    groupPriceAdult: "от 2,400,000 VND",
    groupPriceChild: "от 1,900,000 VND",
    ruPriceAdult: "от 3,000,000 VND",
    ruPriceChild: "от 2,800,000 VND",
    upgradeNote:
      "Для 4+ гостей можно организовать более комфортный private трансфер и вечерний маршрут.",
    highlights: [
      "Hoi An Memories Show",
      "Вечерняя атмосфера Хойана",
      "Подходит для пар и семей",
      "Можно совместить с лодкой и ужином",
    ],
    includes: [
      "Помощь с выбором билетов / маршрута",
      "Поддержка по логистике",
      "Русский гид по запросу",
      "WhatsApp-сопровождение",
    ],
    perfectFor: ["Пары", "Семьи", "Гости, которые любят вечерние шоу и атмосферу"],
    details: [
      "Хороший выбор для гостей, которые хотят красивый вечер в Хойане, а не только дневную прогулку.",
      "Можно выстроить мягкий маршрут: кокосовый лес → старый город → ужин → шоу.",
      "Если едут родители или дети, private трансфер обычно удобнее.",
    ],
  },
  {
    id: "hue",
    title: "ХЮЭ • ИМПЕРАТОРСКИЙ ГОРОД • ГРОБНИЦЫ",
    shortTitle: "Hue Imperial City",
    image: "/tour/hue.jpg",
    badge: "ИСТОРИЯ • НАСЛЕДИЕ • ХЮЭ",
    duration: "На весь день",
    intro:
      "Классический маршрут в Хюэ: цитадель, история императорской династии и одна из самых культурных экскурсий Центрального Вьетнама.",
    groupPriceAdult: "от 2,700,000 VND",
    groupPriceChild: "от 2,400,000 VND",
    ruPriceAdult: "от 3,200,000 VND",
    ruPriceChild: "от 2,800,000 VND",
    upgradeNote:
      "Для 4 гостей и больше стоит рассматривать более комфортный private формат из-за длинной дороги и насыщенного дня.",
    highlights: [
      "Imperial City / Цитадель Хюэ",
      "Императорские гробницы",
      "Культурный и исторический маршрут",
      "Удобно как 1-day trip из Дананга",
    ],
    includes: [
      "Помощь с планированием длинного дня",
      "Поддержка GoVietStay",
      "Русский гид по запросу",
      "Консультация по темпу маршрута",
    ],
    perfectFor: ["Любители истории", "Семьи", "Пары", "Гости, которым интересен культурный Вьетнам"],
    details: [
      "Хюэ лучше подходит тем, кто хочет не пляж, а историю, архитектуру и императорское наследие.",
      "Из Дананга это уже более длинный день, поэтому комфорт логистики очень важен.",
      "Если с вами родители, дети или вы не любите спешку, private формат часто лучший выбор.",
    ],
  },
  {
    id: "marble",
    title: "ПАГОДА ЛИНЬ УНГ • МРАМОРНЫЕ ГОРЫ",
    shortTitle: "Linh Ung & Marble Mountains",
    image: "/tour/marble.jpg",
    badge: "ДАНАНГ • ПАНОРАМЫ • ПОЛДНЯ",
    duration: "Полдня",
    intro:
      "Красивый и лёгкий маршрут по Данангу: статуя Lady Buddha, виды с Son Tra и Мраморные горы.",
    groupPriceAdult: "от 1,350,000 VND",
    groupPriceChild: "от 1,150,000 VND",
    ruPriceAdult: "от 1,900,000 VND",
    ruPriceChild: "от 1,600,000 VND",
    upgradeNote:
      "Если вас 4+, можно собрать более удобный private маршрут с гибким темпом и остановками.",
    highlights: [
      "Linh Ung Pagoda / Lady Buddha",
      "Marble Mountains",
      "Красивые фото-точки Дананга",
      "Удобный маршрут на полдня",
    ],
    includes: [
      "Подсказка по лучшему времени поездки",
      "Помощь с трансфером",
      "Русский гид по запросу",
      "Поддержка в WhatsApp",
    ],
    perfectFor: ["Первый день в Дананге", "Семьи", "Пары", "Гости с ограниченным временем"],
    details: [
      "Хороший вариант, если вы хотите не уезжать далеко и посмотреть Дананг спокойно.",
      "Маршрут удобно сочетать с пляжем, ужином или вечерним круизом по Хану.",
      "Подходит тем, кто хочет красивый, но не слишком тяжёлый экскурсионный день.",
    ],
  },
];


function DetailSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-3xl border border-[#06251b]/10 bg-white p-5">
      <h4 className="text-lg font-extrabold">{title}</h4>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed">
            <span className="mt-1 text-green-700">✓</span>
            <span className="text-[#06251b]/78">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TourDetailCard({ tour }: { tour: RuTour }) {
  return (
    <div className="rounded-[2rem] bg-white border border-[#06251b]/10 overflow-hidden shadow-xl">
      <div className="relative h-[230px] md:h-[360px]">
        <Image src={tour.image} alt={tour.shortTitle} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute left-4 right-4 bottom-4 text-white">
          <div className="inline-flex rounded-full bg-yellow-300 text-[#06251b] px-3 py-1 text-[11px] font-extrabold">
            {tour.badge}
          </div>
          <h3 className="mt-3 text-2xl md:text-4xl font-extrabold leading-tight">
            {tour.title}
          </h3>
          <p className="mt-2 text-sm md:text-base text-white/85 max-w-3xl leading-relaxed">
            {tour.intro}
          </p>
        </div>
      </div>

      <div className="p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-3xl bg-[#f7f1df] border border-[#06251b]/10 p-5">
            <div className="text-xs uppercase tracking-[3px] text-green-800 font-extrabold">
              Формат / цены
            </div>
            <div className="mt-4 space-y-3 text-sm md:text-base">
              {tour.groupPriceAdult && (
                <div className="flex justify-between gap-4">
                  <span className="text-[#06251b]/70">Стандарт / взрослый</span>
                  <span className="font-extrabold text-right">{tour.groupPriceAdult}</span>
                </div>
              )}
              {tour.groupPriceChild && (
                <div className="flex justify-between gap-4">
                  <span className="text-[#06251b]/70">Стандарт / ребёнок</span>
                  <span className="font-extrabold text-right">{tour.groupPriceChild}</span>
                </div>
              )}
              {tour.ruPriceAdult && (
                <div className="flex justify-between gap-4">
                  <span className="text-[#06251b]/70">С русским гидом / взрослый</span>
                  <span className="font-extrabold text-[#b42318] text-right">{tour.ruPriceAdult}</span>
                </div>
              )}
              {tour.ruPriceChild && (
                <div className="flex justify-between gap-4">
                  <span className="text-[#06251b]/70">С русским гидом / ребёнок</span>
                  <span className="font-extrabold text-[#b42318] text-right">{tour.ruPriceChild}</span>
                </div>
              )}
            </div>

            {tour.upgradeNote && (
              <div className="mt-5 rounded-2xl bg-[#0b6b4f] text-white p-4 text-sm leading-relaxed">
                <span className="font-extrabold text-yellow-300">4+ гости:</span>{" "}
                {tour.upgradeNote}
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-[#06251b] text-white p-5">
            <div className="text-xs uppercase tracking-[3px] text-yellow-300 font-extrabold">
              Связаться с Ms. Anna
            </div>
            <h4 className="mt-3 text-2xl font-extrabold">Нужна консультация на русском?</h4>
            <p className="mt-3 text-white/80 text-sm leading-relaxed">
              Напишите Ms. Anna — она поможет понять, какой тур лучше, нужен ли русскоговорящий гид и стоит ли вам делать private формат.
            </p>

            <div className="mt-5 text-lg font-extrabold">{ANNA_PHONE_DISPLAY}</div>

            <a
              href={annaWa(
                `Здравствуйте, Ms. Anna. Меня интересует тур "${tour.shortTitle}". Подскажите, пожалуйста, детали и возможен ли русский гид?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full justify-center rounded-full bg-green-500 px-5 py-3 font-extrabold text-white hover:bg-green-600 transition md:w-auto"
            >
              Написать по этому туру
            </a>
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-4 md:gap-6">
          <DetailSection title="Что особенно важно в этом туре" items={tour.highlights} />
          <DetailSection title="Что может включать поддержка" items={tour.includes} />

          <div className="rounded-3xl border border-[#06251b]/10 bg-white p-5">
            <h4 className="text-lg font-extrabold">Кому особенно подойдёт</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {tour.perfectFor.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-[#f3ead4] px-3 py-2 text-xs md:text-sm font-bold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#06251b]/10 bg-white p-5">
            <h4 className="text-lg font-extrabold">Комментарий GoVietStay</h4>
            <div className="mt-4 space-y-3 text-sm text-[#06251b]/78 leading-relaxed">
              {tour.details.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RussianPage() {
  const [activeTourId, setActiveTourId] = useState<string>(ruTours[0].id);

  const activeTour = useMemo(
    () => ruTours.find((tour) => tour.id === activeTourId) ?? ruTours[0],
    [activeTourId]
  );

  return (
    <main className="bg-[#f7f1df] text-[#06251b] pb-24 md:pb-0">
      {/* HERO - MOBILE FIRST */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 min-h-[820px] md:min-h-screen">
          <Image
            src="/hero-hoian-new.png"
            alt="GoVietStay Russian Page"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#04140f]/92 via-[#04140f]/76 to-[#04140f]/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-4 md:pt-6 pb-10 md:pb-16 min-h-[820px] md:min-h-screen flex flex-col">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full bg-black/35 backdrop-blur px-2.5 py-2 border border-white/10"
            >
              <Image src="/logo.png" alt="GoVietStay" width={46} height={46} className="rounded-full" />
              <div className="text-white">
                <div className="font-extrabold text-base leading-tight">GoVietStay</div>
                <div className="text-[11px] text-white/70">Trusted Local Support</div>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold text-white hover:bg-white hover:text-[#06251b] transition"
              >
                EN
              </Link>
              <div className="rounded-full bg-yellow-400 px-3 py-2 text-xs font-extrabold text-[#06251b] shadow">
                🇷🇺 RU
              </div>
            </div>
          </div>

          <div className="mt-7 md:mt-14 grid lg:grid-cols-[1.05fr_0.95fr] gap-6 md:gap-8 items-center">
            <div className="text-white max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/40 bg-yellow-300/10 px-3 py-2 text-[11px] md:text-sm font-extrabold text-yellow-300">
                🇷🇺 СТРАНИЦА ДЛЯ РУССКОГОВОРЯЩИХ ГОСТЕЙ
              </div>

              <h1 className="mt-5 text-3xl md:text-6xl font-extrabold leading-tight">
                Вьетнам без языкового стресса
                <br />
                <span className="text-yellow-300">туры в Дананге, Хойане и Хюэ на русском</span>
              </h1>

              <p className="mt-5 text-base md:text-xl text-white/82 leading-relaxed">
                Не нужно разбираться во всём самому. Ms. Anna поможет на русском: какой тур выбрать, какой формат удобнее для семьи или компании, когда лучше ехать и стоит ли брать private upgrade.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm md:text-base">
                {[
                  "Русскоговорящий гид по запросу",
                  "Туры Дананг • Хойан • Хюэ",
                  "От 4 гостей — private upgrade по запросу",
                  "Получить подборку туров у Ms. Anna до и во время поездки",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur px-3 py-3 text-white"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={annaWa(
                    "Здравствуйте, Ms. Anna. Я хочу узнать о русскоязычных турах GoVietStay в Дананге / Хойане / Хюэ."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-green-500 hover:bg-green-600 px-6 py-4 text-center text-base font-extrabold text-white transition shadow-lg"
                >
                  Получить подборку туров у Ms. Anna
                </a>

                <a
                  href="#ru-tours"
                  className="rounded-full border border-white/30 bg-white/10 px-6 py-4 text-center text-base font-bold text-white hover:bg-white hover:text-[#06251b] transition"
                >
                  Посмотреть туры
                </a>
              </div>

              <div className="mt-5 rounded-3xl bg-[#0b6b4f]/92 p-4 text-white shadow-xl lg:hidden">
                <div className="text-xs uppercase tracking-[3px] text-yellow-300 font-extrabold">
                  Русский консультант
                </div>
                <div className="mt-2 text-2xl font-extrabold">Ms. Anna</div>
                <div className="mt-1 text-white/85">WhatsApp: {ANNA_PHONE_DISPLAY}</div>
              </div>
            </div>

            <div className="hidden lg:block rounded-[2rem] bg-[#f7f1df] text-[#06251b] shadow-2xl overflow-hidden border border-[#06251b]/10">
              <div className="bg-[#06251b] text-white px-6 py-4">
                <div className="text-sm uppercase tracking-[3px] text-yellow-300 font-extrabold">
                  Russian Support
                </div>
                <h2 className="mt-2 text-3xl font-extrabold leading-tight">
                  GoVietStay • Russian Friendly Travel Support
                </h2>
                <p className="mt-2 text-white/75 text-sm leading-relaxed">
                  Если вам важно общаться понятнее, заранее понимать маршрут и не разбираться во всём самостоятельно — эта страница для вас.
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  {["Ba Na Hills", "Cham Island", "Hoi An", "Hue", "Airport Transfer", "Private Support"].map((item) => (
                    <div key={item} className="rounded-2xl bg-[#f3ead4] border border-[#06251b]/10 px-4 py-4 text-center font-bold">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-3xl bg-[#0b6b4f] text-white p-5">
                  <div className="text-sm uppercase tracking-[3px] text-yellow-300 font-extrabold">
                    Контакт для RU page
                  </div>
                  <div className="mt-2 text-2xl font-extrabold">Ms. Anna</div>
                  <div className="mt-1 text-white/80">WhatsApp: {ANNA_PHONE_DISPLAY}</div>

                  <a
                    href={annaWa("Здравствуйте, Ms. Anna. Нужна помощь с туром / трансфером в Дананге, Хойане или Хюэ.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex rounded-full bg-white px-5 py-3 font-extrabold text-[#06251b] hover:bg-yellow-300 transition"
                  >
                    Написать Ms. Anna
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY THIS PAGE */}
      <section className="px-4 md:px-8 lg:px-12 py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <p className="text-green-800 uppercase tracking-[4px] text-xs md:text-sm font-extrabold">
              Russian Page by GoVietStay
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
              Русскоговорящим гостям важно понимать всё заранее
            </h2>
            <p className="mt-5 text-base md:text-lg text-[#06251b]/75 leading-relaxed">
              Что входит в тур, сколько времени занимает дорога, нужен ли русский гид, подходит ли маршрут детям или родителям — всё это лучше уточнить до оплаты. Поэтому у GoVietStay есть отдельная RU-страница и русскоязычный контакт Ms. Anna.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
            {[
              {
                title: "Русскоязычная поддержка",
                text: "Можно заранее задать вопросы о туре, погоде, трансфере и темпе маршрута.",
              },
              {
                title: "4+ гостей — private upgrade",
                text: "Если вас 4 и больше, обсудим более комфортный формат вместо обычной группы.",
              },
              {
                title: "Help first",
                text: "Сначала помогаем понять маршрут, цену, логистику и риски — а не просто продаём тур.",
              },
              {
                title: "Удобно для семьи",
                text: "Маршрут можно сделать мягче для детей, родителей и небольших групп.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[2rem] border border-[#06251b]/10 bg-[#f7f1df] p-5 md:p-6 shadow-sm">
                <h3 className="text-lg md:text-xl font-extrabold">{item.title}</h3>
                <p className="mt-3 text-sm md:text-base text-[#06251b]/70 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* RUSSIAN NATIVE TOUR GROUPS */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[#f7f1df]">
        <div className="max-w-7xl mx-auto">
          <p className="text-green-800 uppercase tracking-[4px] text-xs md:text-sm font-extrabold">
            Выберите свой стиль поездки
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
            Не все гости хотят один и тот же тур
          </h2>
          <p className="mt-5 text-base md:text-lg text-[#06251b]/75 leading-relaxed max-w-4xl">
            Кто-то хочет классические места без риска. Кто-то ищет приключения и скрытые локации.
            А кому-то нужен спокойный private / premium маршрут для семьи, пары или небольшой компании.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Classic Vietnam",
                text: "Ba Na Hills, Golden Bridge, Hoi An, Hue — понятные маршруты для первого визита.",
              },
              {
                title: "Adventure & Discovery",
                text: "Cham Island, Hai Van Pass, hidden gems, локальная еда и маршруты не как у всех.",
              },
              {
                title: "Private & Premium",
                text: "Гибкий темп, private car, русский гид по запросу, комфорт для семьи и 4+ гостей.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] bg-white border border-[#06251b]/10 p-6 shadow-sm"
              >
                <h3 className="text-2xl font-extrabold">{item.title}</h3>
                <p className="mt-4 text-[#06251b]/72 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOUR SELECTOR - MOBILE FIRST */}
      <section id="ru-tours" className="px-4 md:px-8 lg:px-12 py-12 md:py-16 bg-[#f7f1df]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <p className="text-green-800 uppercase tracking-[4px] text-xs md:text-sm font-extrabold">
              Russian-Friendly Tours
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
              Основные туры GoVietStay для русскоговорящих гостей
            </h2>
            <p className="mt-5 text-base md:text-lg text-[#06251b]/75 leading-relaxed">
              На телефоне нажмите на тур — подробная карточка откроется сразу под ним. На компьютере детали отображаются справа.
            </p>
          </div>

          <div className="mt-8 md:mt-10 grid lg:grid-cols-[0.92fr_1.08fr] gap-8 items-start">
            <div className="space-y-4">
              {ruTours.map((tour) => {
                const active = activeTourId === tour.id;
                return (
                  <div key={tour.id} className="space-y-4">
                    <button
                      onClick={() => setActiveTourId(tour.id)}
                      className={`w-full text-left rounded-[1.6rem] md:rounded-[2rem] overflow-hidden border transition shadow-sm ${
                        active
                          ? "border-[#0b6b4f] bg-white shadow-xl"
                          : "border-[#06251b]/10 bg-white hover:border-[#0b6b4f]/40"
                      }`}
                    >
                      <div className="grid grid-cols-[92px_1fr] md:grid-cols-[140px_1fr]">
                        <div className="relative min-h-[112px] md:min-h-[132px]">
                          <Image src={tour.image} alt={tour.shortTitle} fill className="object-cover" />
                        </div>

                        <div className="p-3.5 md:p-5">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="inline-flex rounded-full bg-yellow-100 text-[#8a5a00] px-2.5 py-1 text-[10px] md:text-xs font-extrabold">
                              {tour.badge}
                            </div>
                            {active && (
                              <div className="inline-flex rounded-full bg-[#0b6b4f] text-white px-2.5 py-1 text-[10px] md:text-xs font-extrabold">
                                Выбрано
                              </div>
                            )}
                          </div>
                          <h3 className="mt-2 text-sm md:text-xl font-extrabold leading-snug">
                            {tour.title}
                          </h3>
                          <p className="mt-1.5 text-xs md:text-sm text-[#06251b]/70 line-clamp-2">
                            {tour.intro}
                          </p>

                          <div className="mt-2.5 flex flex-wrap gap-2 text-[11px] md:text-sm">
                            <span className="rounded-full bg-[#f3ead4] px-2.5 py-1 font-bold">
                              {tour.duration}
                            </span>
                            {tour.groupPriceAdult && (
                              <span className="rounded-full bg-[#ecf8f3] px-2.5 py-1 font-bold text-[#0b6b4f]">
                                от {tour.groupPriceAdult.replace("от ", "")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>

                    {active && (
                      <div className="lg:hidden">
                        <TourDetailCard tour={tour} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="hidden lg:block sticky top-6">
              <TourDetailCard tour={activeTour} />
            </div>
          </div>
        </div>
      </section>


      {/* MORE EXPERIENCES - RUSSIAN MARKET PSYCHOLOGY */}
      <section className="px-4 md:px-8 lg:px-12 py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto rounded-[2rem] overflow-hidden bg-[#06251b] text-white shadow-2xl border border-yellow-300/20">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[260px] lg:min-h-full">
              <Image
                src="/tour/haivan.jpg"
                alt="GoVietStay adventure luxury hidden gems"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06251b]/85 via-[#06251b]/35 to-transparent" />
              <div className="absolute left-5 right-5 bottom-5">
                <div className="inline-flex rounded-full bg-yellow-300 px-4 py-2 text-xs font-extrabold text-[#06251b]">
                  НЕ ТОЛЬКО КЛАССИЧЕСКИЕ ТУРЫ
                </div>
                <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
                  Хотите что-то более особенное?
                </h2>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <p className="text-yellow-300 uppercase tracking-[4px] text-xs md:text-sm font-extrabold">
                Adventure • Discovery • Luxury
              </p>
              <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
                У GoVietStay есть больше маршрутов, чем показано на этой странице
              </h2>
              <p className="mt-5 text-white/82 text-base md:text-lg leading-relaxed">
                Если вы хотите не только стандартные экскурсии, а более сильные впечатления — приключения,
                hidden gems, морские прогулки, food experience, премиальные и luxury experiences —
                напишите нашему русскоязычному менеджеру Ms. Anna.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {[
                  "Приключенческие туры и Hai Van Pass",
                  "Hidden gems и локальные места",
                  "Luxury / premium experiences",
                  "Food tour и вечерние маршруты",
                  "Private car + гибкий маршрут",
                  "Индивидуальный Omakase Experience",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/7 px-4 py-3 text-sm md:text-base font-bold text-white/90"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-3xl bg-white/10 border border-white/10 p-5">
                <h3 className="text-xl md:text-2xl font-extrabold text-yellow-300">
                  Для русскоговорящих гостей важно понимать детали заранее
                </h3>
                <p className="mt-3 text-white/78 leading-relaxed">
                  Поэтому Ms. Anna поможет уточнить маршрут, язык гида, темп поездки, наличие private upgrade,
                  комфорт для семьи, детей или родителей, а также подскажет, какой вариант лучше именно для вашей компании.
                </p>
              </div>

              <a
                href={annaWa("Здравствуйте, Ms. Anna. Хочу узнать больше о других турах GoVietStay: приключения, hidden gems, luxury experiences, private routes.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-full justify-center rounded-full bg-green-500 px-7 py-4 font-extrabold text-white hover:bg-green-600 transition sm:w-auto"
              >
                Получить подборку у Ms. Anna
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY + HOW V2 */}
      <section className="px-4 md:px-8 lg:px-12 py-16 md:py-20 bg-[#f7f1df]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 md:gap-8">
          <div className="rounded-[2rem] bg-white border-2 border-[#0b6b4f]/20 p-6 md:p-7 shadow-xl">
            <div className="inline-flex rounded-full bg-yellow-300 px-4 py-2 text-xs md:text-sm font-extrabold text-[#06251b]">
              🇷🇺 RUSSIAN SUPPORT
            </div>
            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold">
              Почему выбирают GoVietStay?
            </h2>

            <div className="mt-6 space-y-3 md:space-y-4 text-[#06251b]/80">
              {[
                "Поддержка на русском языке через Ms. Anna",
                "Русскоговорящий гид по запросу",
                "Туры, трансфер и билеты в одном месте",
                "От 4 гостей — можно обсудить upgrade в private tour",
                "Проверенные партнёры и надёжная организация",
                "WhatsApp-поддержка до и во время поездки",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-[#f7f1df] px-4 py-3">
                  <span className="font-extrabold text-green-700">✓</span>
                  <span className="text-sm md:text-base font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#06251b] text-white p-6 md:p-7 shadow-xl">
            <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs md:text-sm font-extrabold text-yellow-300">
              BOOKING GUIDE
            </div>
            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold">
              Как забронировать?
            </h2>

            <div className="mt-6 space-y-3 md:space-y-4">
              {[
                "Напишите Ms. Anna в WhatsApp.",
                "Укажите дату, отель, количество взрослых и детей.",
                "Мы предложим подходящий тур, трансфер или билеты.",
                "Если вас 4+ гостей, обсудим private upgrade.",
                "Вы подтверждаете — мы организуем поездку.",
              ].map((item, index) => (
                <div key={item} className="flex gap-4 rounded-2xl bg-white/10 px-4 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-300 text-[#06251b] font-extrabold">
                    {index + 1}
                  </div>
                  <p className="text-sm md:text-base font-bold text-white/90">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA V2 */}
      <section className="relative bg-[#04140f] text-white px-4 md:px-8 lg:px-12 py-12 md:py-14 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,196,0,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(0,180,90,0.25),transparent_42%)]" />

        <div className="relative max-w-7xl mx-auto rounded-[2rem] border border-yellow-300/30 bg-white/5 p-6 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <p className="text-yellow-300 uppercase tracking-[4px] text-xs md:text-sm font-extrabold">
              Russian Consultant
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold">
              Готовы к путешествию?
            </h2>
            <p className="mt-4 text-white/75 max-w-2xl text-base md:text-lg leading-relaxed">
              Напишите Ms. Anna на русском — она поможет выбрать тур, проверить формат, трансфер, билеты и private upgrade для группы от 4 гостей.
            </p>
          </div>

          <div className="w-full lg:w-auto rounded-[2rem] bg-[#0b6b4f] p-5 text-center shadow-2xl">
            <div className="text-sm text-yellow-300 font-extrabold">Ms. Anna WhatsApp</div>
            <div className="mt-2 text-2xl font-extrabold">{ANNA_PHONE_DISPLAY}</div>
            <a
              href={annaWa("Здравствуйте, Ms. Anna. Меня интересует тур GoVietStay с русской поддержкой.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full justify-center rounded-full bg-green-500 px-7 py-4 font-extrabold text-white hover:bg-green-600 transition lg:w-auto"
            >
              Написать Ms. Anna
            </a>
            <div className="mt-4 text-white/70">GoVietStay.com</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#02140f] text-white px-4 md:px-8 lg:px-12 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 md:gap-10">
          <div>
            <h3 className="text-2xl font-extrabold">GoVietStay • Russian Page</h3>
            <p className="mt-4 text-white/65 leading-relaxed">
              Дананг • Хойан • Хюэ
              <br />
              туры, трансфер, билеты и локальная поддержка для русскоговорящих гостей.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-lg">Русский контакт</h4>
            <p className="mt-4 text-white/75 leading-relaxed">
              Ms. Anna
              <br />
              WhatsApp: {ANNA_PHONE_DISPLAY}
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-lg">GoVietStay</h4>
            <p className="mt-4 text-white/75 leading-relaxed">
              Trusted Local Support
              <br />
              Da Nang • Hoi An • Hue
              <br />
              Website: GoVietStay.com
            </p>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY RU WHATSAPP */}
      <a
        href={annaWa("Здравствуйте, Ms. Anna. Нужна помощь с туром в Дананге, Хойане или Хюэ.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-center rounded-full bg-green-500 px-5 py-4 text-white font-extrabold shadow-2xl hover:bg-green-600 transition md:left-auto md:right-5 md:w-auto"
      >
        🇷🇺 WhatsApp Ms. Anna
      </a>
    </main>
  );
}
