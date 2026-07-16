"use client";

import { useMemo, useState, type FormEvent } from "react";
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


type SignaturePackage = {
  id: string;
  title: string;
  image: string;
  route: string;
  duration: string;
  badge: string;
  intro: string;
  bestFor: string[];
  days: { title: string; items: string[] }[];
  includes: string[];
  priceVnd: string;
  priceUsd: string;
  saving: string;
};

type BookingForm = {
  fullName: string;
  whatsapp: string;
  email: string;
  hotel: string;
  travelDate: string;
  adults: number;
  children: number;
  russianGuide: "Да" | "Нет" | "Нужна консультация";
  request: string;
};

const signaturePackages: SignaturePackage[] = [
  {
    id: "combo-1-classic-danang",
    title: "Классический Дананг",
    image: "/tour/combo-1-ru.png",
    route: "Ba Na Hills • Золотой мост • Кокосовый лес • Хойан",
    duration: "2 дня / 1 ночь",
    badge: "BEST SELLER",
    intro: "Классический маршрут для первого знакомства с Данангом и Хойаном: знаменитый Золотой мост, лодки-корзины и вечерняя атмосфера древнего города.",
    bestFor: ["Первый визит", "Семьи", "Пары", "Небольшие группы"],
    days: [
      { title: "День 1 — Ba Na Hills и Золотой мост", items: ["Канатная дорога", "Золотой мост", "Французская деревня", "Панорамные виды и свободное время"] },
      { title: "День 2 — Кокосовый лес и древний город Хойан", items: ["Прогулка на лодке-корзине", "Древний город Хойан", "Японский крытый мост", "Улица фонарей и рекомендации по ужину"] },
    ],
    includes: ["Индивидуальный трансфер", "Встреча и высадка у отеля", "Все входные билеты по программе", "Англоговорящий гид", "Локальные рекомендации GoVietStay"],
    priceVnd: "2,660,000 VND / человек",
    priceUsd: "≈ 102.31 USD / человек",
    saving: "Экономия 140,000 VND",
  },
  {
    id: "combo-2-sea-heritage",
    title: "Море и наследие",
    image: "/tour/combo-2-ru.png",
    route: "Остров Чам • Снорклинг • Кокосовый лес • Хойан",
    duration: "2 дня / 1 ночь",
    badge: "ЛЕТНИЙ ХИТ",
    intro: "Два совершенно разных впечатления за два дня: море и снорклинг на острове Чам, затем местная культура, лодки-корзины и вечерний Хойан.",
    bestFor: ["Летний отдых", "Молодёжь", "Семьи", "Пары"],
    days: [
      { title: "День 1 — Остров Чам и снорклинг", items: ["Скоростной катер", "Снорклинг", "Морской отдых", "Обед и поддержка по погоде"] },
      { title: "День 2 — Кокосовый лес и Хойан", items: ["Лодки-корзины", "Кокосовый лес", "Древний город Хойан", "Вечерняя прогулка среди фонарей"] },
    ],
    includes: ["Трансфер по программе", "Входные билеты и активности", "Обед в течение 2 дней", "Билет на лодку-корзину", "Минеральная вода", "Поддержка 24/7"],
    priceVnd: "2,090,000 VND / человек",
    priceUsd: "≈ 80.38 USD / человек",
    saving: "Экономия 110,000 VND",
  },
  {
    id: "combo-3-top-central-vietnam",
    title: "ТОП-3 Центрального Вьетнама",
    image: "/tour/combo-3-ru.png",
    route: "Ba Na Hills • Остров Чам • Кокосовый лес • Хойан",
    duration: "3 дня / 2 ночи",
    badge: "САМЫЙ ПОПУЛЯРНЫЙ",
    intro: "Три главных впечатления Центрального Вьетнама в одном маршруте: горы, море, древний город и настоящая местная атмосфера.",
    bestFor: ["Первый визит", "Семьи", "Пары", "Гости на 4–6 дней"],
    days: [
      { title: "День 1 — Ba Na Hills и Золотой мост", items: ["Канатная дорога", "Золотой мост", "Панорамные виды", "Французская деревня"] },
      { title: "День 2 — Остров Чам и снорклинг", items: ["Скоростной катер", "Снорклинг", "Островной отдых", "Обед"] },
      { title: "День 3 — Кокосовый лес и Хойан", items: ["Лодка-корзина", "Кокосовый лес", "Древний город", "Улица фонарей"] },
    ],
    includes: ["Индивидуальный трансфер", "Все входные билеты и активности", "Обед в течение 3 дней", "Билет на лодку-корзину", "Минеральная вода", "Поддержка WhatsApp / Telegram"],
    priceVnd: "3,500,000 VND / человек",
    priceUsd: "≈ 134.62 USD / человек",
    saving: "Экономия 250,000 VND",
  },
  {
    id: "combo-4-cultural-journey",
    title: "Культурное путешествие по Центральному Вьетнаму",
    image: "/tour/combo-4-ru.png",
    route: "Ba Na Hills • Хойан • Кокосовый лес • Императорский город Хюэ",
    duration: "3 дня / 2 ночи",
    badge: "BEST CULTURAL JOURNEY",
    intro: "Три дня для гостей, которые хотят увидеть природу, древний город и императорское наследие Центрального Вьетнама без самостоятельного планирования.",
    bestFor: ["Любители истории", "Пожилые путешественники", "Семьи", "Гости на 4–6 дней"],
    days: [
      { title: "День 1 — Ba Na Hills и Золотой мост", items: ["Канатная дорога", "Золотой мост", "Французская деревня", "Панорамные виды"] },
      { title: "День 2 — Кокосовый лес и древний Хойан", items: ["Лодка-корзина", "Кокосовый лес", "Древний город", "Вечерняя атмосфера Хойана"] },
      { title: "День 3 — Императорский город Хюэ", items: ["Императорская цитадель", "Исторические памятники", "Культура династии Нгуен", "Локальные рекомендации"] },
    ],
    includes: ["Индивидуальный трансфер", "Все входные билеты и активности", "Обед в течение 3 дней", "Билет на лодку-корзину", "Минеральная вода", "Поддержка 24/7"],
    priceVnd: "3,995,000 VND / человек",
    priceUsd: "≈ 153.65 USD / человек",
    saving: "Экономия 255,000 VND",
  },
];

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
    groupPriceAdult: "от 1,550,000 VND (~$60)",
    groupPriceChild: "от 1,450,000 VND (~$56)",
    ruPriceAdult: "от 2,200,000 VND (~$85)",
    ruPriceChild: "от 2,000,000 VND (~$77)",
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
    groupPriceAdult: "от 950,000 VND (~$37) / чел.",
    groupPriceChild: "уточняется",
    ruPriceAdult: "от 1,800,000 VND (~$69) / чел.",
    ruPriceChild: "от 1,500,000 VND (~$58) / чел.",
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
    groupPriceAdult: "от 1,250,000 VND (~$48)",
    groupPriceChild: "от 1,000,000 VND (~$38)",
    ruPriceAdult: "от 1,800,000 VND (~$69)",
    ruPriceChild: "от 1,600,000 VND (~$62)",
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
    groupPriceAdult: "от 2,400,000 VND (~$92)",
    groupPriceChild: "от 1,900,000 VND (~$73)",
    ruPriceAdult: "от 3,000,000 VND (~$115)",
    ruPriceChild: "от 2,800,000 VND (~$108)",
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
    groupPriceAdult: "от 2,700,000 VND (~$104)",
    groupPriceChild: "от 2,400,000 VND (~$92)",
    ruPriceAdult: "от 3,200,000 VND (~$123)",
    ruPriceChild: "от 2,800,000 VND (~$108)",
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
    groupPriceAdult: "от 1,350,000 VND (~$52)",
    groupPriceChild: "от 1,150,000 VND (~$44)",
    ruPriceAdult: "от 1,900,000 VND (~$73)",
    ruPriceChild: "от 1,600,000 VND (~$62)",
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
            <p className="mt-2 text-xs text-[#06251b]/60 leading-relaxed">
              Ориентир в USD рассчитан по курсу 1 USD ≈ 26,000 VND. Финальная цена подтверждается перед бронированием.
            </p>
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
              Русскоязычная поддержка
            </div>
            <h4 className="mt-3 text-2xl font-extrabold">Нужна консультация на русском?</h4>
            <p className="mt-3 text-white/80 text-sm leading-relaxed">
              Напишите Ms. Anna — она поможет понять, какой тур лучше, нужен ли русскоговорящий гид и стоит ли вам делать private формат.
            </p>

            <div className="mt-5 text-lg font-extrabold">{ANNA_PHONE_DISPLAY}</div>

            <div className="mt-5 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white/80">
              Для уточнения деталей используйте единую WhatsApp-панель внизу страницы.
            </div>
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


function SignaturePackageCard({
  pkg,
  onBook,
}: {
  pkg: SignaturePackage;
  onBook: (pkg: SignaturePackage) => void;
}) {
  return (
    <article className="overflow-hidden rounded-[1.7rem] border border-[#06251b]/10 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative aspect-[2/3] w-full bg-[#efe7d4]">
        <Image src={pkg.image} alt={pkg.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/65 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full bg-yellow-300 px-3 py-1.5 text-[10px] font-extrabold text-[#06251b] shadow-lg">
          {pkg.badge}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-extrabold">
          <span className="rounded-full bg-[#ecf8f3] px-3 py-1.5 text-[#0b6b4f]">{pkg.duration}</span>
          <span className="rounded-full bg-[#f7f1df] px-3 py-1.5 text-[#06251b]/75">Цена за 1 человека</span>
        </div>
        <h3 className="mt-3 text-xl sm:text-2xl font-extrabold leading-tight">{pkg.title}</h3>
        <p className="mt-2 text-sm font-bold text-[#0b6b4f] leading-relaxed">{pkg.route}</p>
        <p className="mt-3 text-sm text-[#06251b]/72 leading-relaxed">{pkg.intro}</p>

        <details className="mt-4 rounded-2xl border border-[#06251b]/10 bg-[#f7f1df] p-4">
          <summary className="cursor-pointer list-none font-extrabold text-[#0b6b4f]">Посмотреть программу по дням</summary>
          <div className="mt-4 space-y-4">
            {pkg.days.map((day) => (
              <div key={day.title}>
                <h4 className="font-extrabold">{day.title}</h4>
                <ul className="mt-2 space-y-1.5">
                  {day.items.map((item) => <li key={item} className="flex gap-2 text-sm text-[#06251b]/72"><span className="text-green-700">✓</span><span>{item}</span></li>)}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="font-extrabold">Что включено</h4>
              <ul className="mt-2 space-y-1.5">
                {pkg.includes.map((item) => <li key={item} className="flex gap-2 text-sm text-[#06251b]/72"><span className="text-green-700">✓</span><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </details>

        <div className="mt-4 rounded-2xl bg-[#06251b] p-4 text-white">
          <div className="text-[10px] uppercase tracking-[2px] text-yellow-300 font-extrabold">Цена комбо-тура</div>
          <div className="mt-1 text-xl font-extrabold">{pkg.priceVnd}</div>
          <div className="text-sm text-white/75">{pkg.priceUsd}</div>
          <div className="mt-2 text-xs font-bold text-yellow-300">{pkg.saving}</div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button onClick={() => onBook(pkg)} className="rounded-full bg-[#ff5a0a] px-4 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:bg-[#e94f00]">
            Забронировать
          </button>
          <a href={annaWa(`Здравствуйте, Анна. Меня интересует ${pkg.title}. Подскажите, пожалуйста, детали и доступность.`)} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-[#0b6b4f] px-4 py-3.5 text-center text-sm font-extrabold text-[#0b6b4f] transition hover:bg-[#0b6b4f] hover:text-white">
            Спросить Анну
          </a>
        </div>
      </div>
    </article>
  );
}

function BookingModal({
  pkg,
  onClose,
}: {
  pkg: SignaturePackage | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState<BookingForm>({
    fullName: "",
    whatsapp: "",
    email: "",
    hotel: "",
    travelDate: "",
    adults: 1,
    children: 0,
    russianGuide: "Нужна консультация",
    request: "",
  });

  if (!pkg) return null;

  const sendToAnna = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      "Здравствуйте, Анна!",
      "",
      "Хочу забронировать комбо-тур GoVietStay.",
      `Тур: ${pkg.title}`,
      `Дата: ${form.travelDate || "не указана"}`,
      `Взрослые: ${form.adults}`,
      `Дети: ${form.children}`,
      `Русскоговорящий гид: ${form.russianGuide}`,
      `Имя: ${form.fullName}`,
      `WhatsApp гостя: ${form.whatsapp}`,
      `Email: ${form.email || "не указан"}`,
      `Отель: ${form.hotel || "не указан"}`,
      `Пожелания: ${form.request || "нет"}`,
      "",
      "Пожалуйста, подтвердите доступность и финальную стоимость.",
    ].join("\n");
    window.open(annaWa(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Форма бронирования">
      <div className="max-h-[94vh] w-full overflow-y-auto rounded-t-[2rem] bg-[#f7f1df] shadow-2xl sm:max-w-2xl sm:rounded-[2rem]">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-[#06251b] p-5 text-white sm:p-6">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[3px] text-yellow-300">Бронирование через WhatsApp</p>
            <h3 className="mt-2 text-2xl font-extrabold">{pkg.title}</h3>
            <p className="mt-1 text-sm text-white/70">Заполните форму — готовая заявка откроется в WhatsApp Анны.</p>
          </div>
          <button onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-xl" aria-label="Закрыть">×</button>
        </div>

        <form onSubmit={sendToAnna} className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
          <label className="sm:col-span-2"><span className="text-sm font-extrabold">Имя и фамилия *</span><input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="mt-2 w-full rounded-2xl border border-[#06251b]/15 bg-white px-4 py-3.5 outline-none focus:border-[#0b6b4f]" placeholder="Например: Анна Иванова" /></label>
          <label><span className="text-sm font-extrabold">WhatsApp *</span><input required type="tel" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="mt-2 w-full rounded-2xl border border-[#06251b]/15 bg-white px-4 py-3.5 outline-none focus:border-[#0b6b4f]" placeholder="+7..." /></label>
          <label><span className="text-sm font-extrabold">Дата поездки *</span><input required type="date" value={form.travelDate} onChange={(e) => setForm({ ...form, travelDate: e.target.value })} className="mt-2 w-full rounded-2xl border border-[#06251b]/15 bg-white px-4 py-3.5 outline-none focus:border-[#0b6b4f]" /></label>
          <label><span className="text-sm font-extrabold">Взрослые *</span><input required min={1} type="number" value={form.adults} onChange={(e) => setForm({ ...form, adults: Number(e.target.value) })} className="mt-2 w-full rounded-2xl border border-[#06251b]/15 bg-white px-4 py-3.5 outline-none focus:border-[#0b6b4f]" /></label>
          <label><span className="text-sm font-extrabold">Дети</span><input min={0} type="number" value={form.children} onChange={(e) => setForm({ ...form, children: Number(e.target.value) })} className="mt-2 w-full rounded-2xl border border-[#06251b]/15 bg-white px-4 py-3.5 outline-none focus:border-[#0b6b4f]" /></label>
          <label><span className="text-sm font-extrabold">Русскоговорящий гид</span><select value={form.russianGuide} onChange={(e) => setForm({ ...form, russianGuide: e.target.value as BookingForm["russianGuide"] })} className="mt-2 w-full rounded-2xl border border-[#06251b]/15 bg-white px-4 py-3.5 outline-none focus:border-[#0b6b4f]"><option>Нужна консультация</option><option>Да</option><option>Нет</option></select></label>
          <label><span className="text-sm font-extrabold">Отель</span><input value={form.hotel} onChange={(e) => setForm({ ...form, hotel: e.target.value })} className="mt-2 w-full rounded-2xl border border-[#06251b]/15 bg-white px-4 py-3.5 outline-none focus:border-[#0b6b4f]" placeholder="Название отеля" /></label>
          <label className="sm:col-span-2"><span className="text-sm font-extrabold">Email</span><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-2xl border border-[#06251b]/15 bg-white px-4 py-3.5 outline-none focus:border-[#0b6b4f]" placeholder="email@example.com" /></label>
          <label className="sm:col-span-2"><span className="text-sm font-extrabold">Особые пожелания</span><textarea rows={3} value={form.request} onChange={(e) => setForm({ ...form, request: e.target.value })} className="mt-2 w-full rounded-2xl border border-[#06251b]/15 bg-white px-4 py-3.5 outline-none focus:border-[#0b6b4f]" placeholder="Детское кресло, питание, темп поездки..." /></label>
          <div className="sm:col-span-2 rounded-2xl bg-white p-4 text-xs leading-relaxed text-[#06251b]/65">Нажимая кнопку, вы переходите в WhatsApp. Проверьте сообщение и нажмите «Отправить», чтобы Анна получила заявку.</div>
          <button type="submit" className="sm:col-span-2 rounded-full bg-green-500 px-6 py-4 text-base font-extrabold text-white shadow-xl transition hover:bg-green-600">Отправить заявку Анне в WhatsApp</button>
        </form>
      </div>
    </div>
  );
}

function RussianAudienceAnnaPartnerSection() {
  return (
    <section className="px-4 md:px-8 lg:px-12 py-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto grid gap-5 lg:grid-cols-[1.05fr_0.95fr] items-stretch">
        <div className="rounded-[2rem] md:rounded-[2.5rem] bg-[#06251b] text-white p-5 sm:p-7 md:p-9 overflow-hidden relative">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-yellow-300/15 blur-2xl" />
          <div className="absolute -left-14 -bottom-14 h-40 w-40 rounded-full bg-green-400/15 blur-2xl" />

          <div className="relative z-10">
            <p className="text-yellow-300 uppercase tracking-[3.5px] text-[11px] md:text-sm font-extrabold">
              Russian-speaking travelers
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
              For Russian-speaking travelers from Russia, Kazakhstan, Uzbekistan, Mongolia…
            </h2>
            <p className="mt-5 text-base md:text-lg text-white/78 leading-relaxed">
              GoVietStay помогает русскоговорящим гостям в Центральном Вьетнаме: Дананг, Хойан и Хюэ. Мы подбираем private-туры, трансферы, билеты и multi-day packages с локальной координацией и поддержкой на русском.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Russia / Казахстан / Uzbekistan / Mongolia",
                "Da Nang • Hoi An • Hue",
                "Private tours & multi-day packages",
                "Russian-speaking support",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-sm md:text-base font-bold text-white/90">
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="rounded-[2rem] md:rounded-[2.5rem] bg-[#f7f1df] border border-[#06251b]/10 p-5 sm:p-7 md:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <div className="h-16 w-16 shrink-0 rounded-full bg-[#0b6b4f] text-white flex items-center justify-center text-2xl font-extrabold shadow-lg">
                A
              </div>
              <div>
                <p className="text-green-800 uppercase tracking-[3px] text-[11px] md:text-xs font-extrabold">
                  Russian-speaking support
                </p>
                <h3 className="mt-2 text-2xl md:text-3xl font-extrabold">Ms. Anna</h3>
                <p className="mt-2 text-[#06251b]/72 leading-relaxed text-sm md:text-base">
                  Anna помогает гостям на русском: консультация до поездки, подбор маршрута, airport transfer, private tours, билеты, рекомендации и поддержка во время пребывания.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-white/70 border border-[#06251b]/10 px-4 py-3 text-sm md:text-base font-bold text-[#06251b]">
              WhatsApp: {ANNA_PHONE_DISPLAY} • Use the fixed contact bar below.
            </div>
          </div>

          <div className="rounded-[2rem] md:rounded-[2.5rem] bg-yellow-300 border border-yellow-500/30 p-5 sm:p-7 md:p-8 shadow-sm">
            <p className="text-[#06251b] uppercase tracking-[3px] text-[11px] md:text-xs font-extrabold">
              For travel partners & agencies
            </p>
            <h3 className="mt-2 text-2xl md:text-3xl font-extrabold leading-tight">
              Нужны B2B rates / net price для партнёров?
            </h3>
            <p className="mt-3 text-[#06251b]/75 leading-relaxed text-sm md:text-base">
              Если вы travel agency, consultant, KOL или partner по рынкам Russia, Kazakhstan, Uzbekistan, Mongolia и CIS — напишите Anna, чтобы получить лучшую цену для агентства и прямую локальную поддержку GoVietStay во Вьетнаме.
            </p>
            <div className="mt-5 rounded-2xl bg-white/45 border border-[#06251b]/10 px-4 py-3 text-sm md:text-base font-extrabold text-[#06251b]">
              Для B2B rates / net price используйте единую WhatsApp-панель внизу страницы.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignaturePackagesSection({ onBook }: { onBook: (pkg: SignaturePackage) => void }) {
  return (
    <section id="signature-packages" className="px-4 md:px-8 lg:px-12 py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <p className="text-green-800 uppercase tracking-[4px] text-xs md:text-sm font-extrabold">
            Signature Central Vietnam Packages
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
            4 готовых комбо-тура для русскоговорящих гостей
          </h2>
          <p className="mt-5 text-base md:text-lg text-[#06251b]/75 leading-relaxed">
            Выберите готовый маршрут на 2 или 3 дня. Все цены указаны за одного человека для тура с англоговорящим гидом. Русскоговорящий гид предоставляется по запросу после консультации с Анной.
          </p>
          <div className="mt-5 rounded-3xl bg-[#f7f1df] border border-[#06251b]/10 p-4 md:p-5 text-sm md:text-base text-[#06251b]/75 leading-relaxed">
            Откройте программу, сравните маршруты и нажмите «Забронировать». На мобильном телефоне форма открывается во весь экран и сразу готовит подробную заявку для WhatsApp Анны.
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:gap-7 items-start">
          {signaturePackages.map((pkg) => (
            <SignaturePackageCard key={pkg.id} pkg={pkg} onBook={onBook} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RussianPage() {
  const [activeTourId, setActiveTourId] = useState<string>(ruTours[0].id);
  const [bookingPackage, setBookingPackage] = useState<SignaturePackage | null>(null);

  const activeTour = useMemo(
    () => ruTours.find((tour) => tour.id === activeTourId) ?? ruTours[0],
    [activeTourId]
  );

  return (
    <main className="bg-[#f7f1df] text-[#06251b] pb-24 md:pb-0">
      {/* HERO - MOBILE V6: IMAGE-FIRST */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 min-h-[760px] md:min-h-screen">
          <Image
            src="/hero-hoian-new.png"
            alt="GoVietStay Russian Page"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04140f]/58 via-[#04140f]/48 to-[#04140f]/78 md:bg-gradient-to-r md:from-[#04140f]/86 md:via-[#04140f]/68 md:to-[#04140f]/38" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#04140f]/95 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-4 md:pt-6 pb-8 md:pb-16 min-h-[760px] md:min-h-screen flex flex-col">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full bg-black/25 backdrop-blur-md px-2.5 py-2 border border-white/10 shadow-lg"
            >
              <Image src="/logo.png" alt="GoVietStay" width={44} height={44} className="rounded-full" />
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
              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/55 bg-black/20 backdrop-blur-md px-3 py-2 text-[11px] md:text-sm font-extrabold text-yellow-300">
                🇷🇺 СТРАНИЦА ДЛЯ РУССКОГОВОРЯЩИХ ГОСТЕЙ
              </div>

              <h1 className="mt-5 text-3xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]">
                Туры в Дананге,
                <br />
                Хойане и Хюэ
                <br />
                <span className="text-yellow-300">с поддержкой на русском</span>
              </h1>

              <p className="mt-4 text-base md:text-xl text-white/88 leading-relaxed max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                Ms. Anna поможет гостям из Russia, Kazakhstan, Uzbekistan, Mongolia и других CIS markets выбрать тур, private формат, трансфер и удобный маршрут.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <a
                  href="#ru-tours"
                  className="rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-6 py-4 text-center text-base font-bold text-white hover:bg-white hover:text-[#06251b] transition"
                >
                  Посмотреть туры
                </a>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5 text-[12px] md:text-base">
                {[
                  "Русский гид по запросу",
                  "Дананг • Хойан • Хюэ",
                  "Private upgrade 4+ гостей",
                  "Поддержка Ms. Anna",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/14 bg-white/12 backdrop-blur-md px-3 py-3 text-white shadow-sm"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-3xl bg-[#0b6b4f]/88 p-4 text-white shadow-xl lg:hidden border border-white/10 backdrop-blur-md">
                <div className="text-xs uppercase tracking-[3px] text-yellow-300 font-extrabold">
                  Русский консультант
                </div>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-2xl font-extrabold">Ms. Anna</div>
                    <div className="mt-1 text-white/85">WhatsApp: {ANNA_PHONE_DISPLAY}</div>
                  </div>
                  <span className="rounded-full bg-white/12 px-3 py-2 text-xs font-bold">
                    24/7 support
                  </span>
                </div>
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

                  <div className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white/85">
                    Для связи используйте одну WhatsApp-панель внизу страницы.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 lg:hidden">
            <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/12 px-4 py-3 text-white/88 text-sm leading-relaxed">
              Для русскоговорящих гостей: туры • трансферы • билеты • private маршруты • поддержка в WhatsApp.
            </div>
          </div>
        </div>
      </section>

      <RussianAudienceAnnaPartnerSection />

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

      <SignaturePackagesSection onBook={setBookingPackage} />

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

              <div className="mt-7 rounded-2xl bg-white/10 border border-white/10 px-5 py-4 text-sm md:text-base font-bold text-white/80">
                Для подборки маршрута и скрытых мест используйте единую WhatsApp-панель внизу страницы.
              </div>
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
            <div className="text-sm text-yellow-300 font-extrabold">Единый контакт RU page</div>
            <div className="mt-2 text-2xl font-extrabold">{ANNA_PHONE_DISPLAY}</div>
            <div className="mt-4 text-white/75 text-sm leading-relaxed">
              Нажмите нижнюю WhatsApp-панель, чтобы написать по турам, package или B2B rates.
            </div>
            <div className="mt-4 text-white/70">GoVietStay.com/ru</div>
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
              <br />
              Цены можно уточнить в VND и USD.
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

      {/* SINGLE FIXED RU CONTACT BAR */}
      <a
        href={annaWa("Здравствуйте, Ms. Anna. Нужна помощь по GoVietStay: private tour / 3D2N или 4D3N package / airport transfer / B2B partner rates.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-center rounded-full bg-green-500 px-5 py-4 text-sm sm:text-base text-white font-extrabold shadow-2xl hover:bg-green-600 transition md:left-1/2 md:right-auto md:w-[min(560px,calc(100%-2rem))] md:-translate-x-1/2"
      >
        🇷🇺 WhatsApp Anna • Tours / Packages / B2B rates
      </a>

      <BookingModal pkg={bookingPackage} onClose={() => setBookingPackage(null)} />
    </main>
  );
}
