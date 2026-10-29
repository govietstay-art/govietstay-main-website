import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CarFront,
  Check,
  Clock3,
  Globe2,
  Landmark,
  MapPin,
  MessageCircle,
  Mountain,
  Play,
  ShieldCheck,
  TrainFront,
  Waves,
} from "lucide-react";
import BookingPanelRu from "./BookingPanelRu";
import styles from "../../../tours/heritage-train-da-nang-hue/page.module.css";

const ROOT = "https://www.govietstay.com";
const EN = `${ROOT}/tours/heritage-train-da-nang-hue`;
const URL = `${ROOT}/ru/tours/heritage-train-da-nang-hue`;
const MEDIA = "/heritage-train";
const VIDEO = `${MEDIA}/da-nang-hue-heritage-train-journey.mp4`;

export const metadata: Metadata = {
  title: "Поезд наследия Дананг — Хюэ за 1 день | GoVietStay",
  description:
    "Экскурсия из Дананга в Хюэ на туристическом поезде через перевал Хайван: Императорская цитадель, пагода Тхьенму и возвращение на машине в тот же день. GoVietStay.",
  keywords: [
    "поезд наследия Дананг Хюэ",
    "экскурсия в Хюэ из Дананга на поезде",
    "туристический поезд Дананг Хюэ",
    "поезд через перевал Хайван",
    "Хюэ за один день из Дананга",
    "экскурсия в Императорскую цитадель Хюэ",
    "Кет Ной Зи Сан Мьен Чунг",
  ],
  alternates: { canonical: URL, languages: { en: EN, ru: URL, "x-default": EN } },
  openGraph: {
    type: "website",
    siteName: "GoVietStay",
    locale: "ru_RU",
    url: URL,
    title: "Из Дананга в Хюэ на поезде наследия — экскурсия на один день",
    description:
      "Живописная железная дорога через перевал Хайван, императорское наследие Хюэ и комфортное возвращение в Дананг с GoVietStay.",
    images: [
      {
        url: `${MEDIA}/heritage-train-bridge-hai-van.jpeg`,
        width: 1122,
        height: 1402,
        alt: "Иллюстрация поезда на живописном мосту среди зелёных гор у моря",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Поезд наследия Дананг — Хюэ | Экскурсия за день",
    description: "Хайван, Императорская цитадель и возвращение в Дананг в тот же день.",
    images: [`${MEDIA}/heritage-train-bridge-hai-van.jpeg`],
  },
};

const itinerary = [
  {
    time: "06:15–06:35",
    icon: CarFront,
    title: "Утро в Дананге",
    detail:
      "По желанию — встреча в отеле и трансфер на железнодорожный вокзал Дананга. Поможем с организацией посадки, чтобы утро прошло спокойно.",
  },
  {
    time: "Около 07:05",
    icon: TrainFront,
    title: "На поезде вдоль перевала Хайван",
    detail:
      "Отправление туристического поезда в сторону Хюэ. За окном — склоны гор, бухты, море и Лангко. Здесь сама дорога становится важной частью путешествия.",
  },
  {
    time: "Около 11:03",
    icon: MapPin,
    title: "Прибытие в древнюю столицу Хюэ",
    detail:
      "Встреча с местным водителем и гидом по согласованной программе. Обед с блюдами кухни Хюэ: например, бунбо или вегетарианские блюда по вашему выбору.",
  },
  {
    time: "12:20–14:10",
    icon: Landmark,
    title: "Императорская цитадель и Запретный город",
    detail:
      "Знакомство с наследием династии Нгуен в комплексе памятников Хюэ, внесённом в список ЮНЕСКО. Маршрут внутри зависит от режима работы и условий в день экскурсии.",
  },
  {
    time: "14:30–16:40",
    icon: Waves,
    title: "Пагода Тхьенму и королевская гробница",
    detail:
      "Прогулка у Ароматной реки и пагоды Тхьенму. Если позволит время, добавим одну из королевских гробниц — например, Кхайдиня. Темп подстроим под вашу группу.",
  },
  {
    time: "Около 17:00–19:45",
    icon: CarFront,
    title: "Возвращение в Дананг на личном автомобиле",
    detail:
      "Комфортный обратный трансфер с высадкой у отеля. Время прибытия ориентировочное: оно зависит от движения на дорогах и остановок.",
  },
];

const faqs = [
  {
    q: "Можно ли съездить из Дананга в Хюэ на поезде и вернуться за один день?",
    a: "Да. Для полноценной экскурсии советуем утром ехать из Дананга в Хюэ на поезде, осмотреть достопримечательности, а вечером вернуться в Дананг на автомобиле. Поезд в обе стороны тоже возможен, но на прогулку по Хюэ останется гораздо меньше времени.",
  },
  {
    q: "Сколько времени идёт туристический поезд Дананг — Хюэ?",
    a: "Ориентируйтесь примерно на 3–4 часа с учётом остановки в Лангко. В одном из опубликованных расписаний утренний поезд HĐ2 отправляется около 07:05 и прибывает в Хюэ около 11:03. Точное время и наличие мест обязательно проверяем на конкретную дату.",
  },
  {
    q: "Какие достопримечательности Хюэ мы успеем увидеть?",
    a: "Предлагаем обед с местной кухней, Императорскую цитадель, пагоду Тхьенму и, если позволит время, одну королевскую гробницу. Мы составляем маршрут без лишней спешки с учётом интересов группы.",
  },
  {
    q: "Можно ли обратно в Дананг тоже поехать на поезде?",
    a: "Да, при наличии билетов и подходящего расписания. Дневной поезд из Хюэ может отправляться около 14:30. При утреннем прибытии на осмотр города остаётся лишь несколько часов, поэтому такую поездку лучше посвятить одному-двум главным местам.",
  },
  {
    q: "С какой стороны поезда видно море?",
    a: "По направлению Дананг → Хюэ на наиболее живописном прибрежном участке море обычно слева по ходу движения. Но расположение конкретного места, направление кресел и видимость не гарантируются.",
  },
  {
    q: "Билеты на поезд, гид, обед и входные билеты включены в цену?",
    a: "Мы готовим индивидуальный расчёт с понятным перечнем включённых услуг: поезд, автомобиль, гид нужного языка, питание, входные билеты и трансферы. Итоговую стоимость и состав пакета согласуем до оплаты.",
  },
  {
    q: "Подойдёт ли поездка детям и пожилым путешественникам?",
    a: "Да, если подобрать удобный темп. Поездка на поезде длительная, а по территории Императорской цитадели придётся ходить пешком. Сообщите нам возраст детей и особенности передвижения, и мы подстроим программу.",
  },
  {
    q: "Что будет, если изменится расписание поезда или погода?",
    a: "Расписание, свободные места, работа железной дороги, дорожная обстановка и видимость на перевале Хайван не зависят от GoVietStay. Перед бронированием перепроверим детали и предложим корректировку программы при необходимости.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "GoVietStay на русском", item: `${ROOT}/ru` },
      { "@type": "ListItem", position: 2, name: "Экскурсии во Вьетнаме", item: `${ROOT}/ru` },
      { "@type": "ListItem", position: 3, name: "Поезд наследия Дананг — Хюэ", item: URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${URL}#trip`,
    name: "Поездка из Дананга в Хюэ на поезде наследия с экскурсией за один день",
    description:
      "Однодневная экскурсия из Дананга в Хюэ с живописным поездом через перевал Хайван, посещением памятников ЮНЕСКО и возвращением на индивидуальном автомобиле.",
    inLanguage: "ru",
    url: URL,
    image: [
      `${ROOT}${MEDIA}/heritage-train-bridge-hai-van.jpeg`,
      `${ROOT}${MEDIA}/hai-van-heritage-train-coast.jpeg`,
    ],
    provider: { "@id": `${ROOT}/#organization` },
    touristType: ["Русскоязычные туристы", "Семьи", "Любители красивых железнодорожных маршрутов"],
    touristDestination: [
      { "@type": "City", name: "Хюэ", containedInPlace: { "@type": "Country", name: "Вьетнам" } },
      { "@type": "TouristAttraction", name: "Комплекс памятников Хюэ", sameAs: "https://whc.unesco.org/en/list/678/" },
    ],
    itinerary: {
      "@type": "ItemList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Железнодорожный вокзал Дананга" },
        { "@type": "ListItem", position: 2, name: "Живописная железная дорога через перевал Хайван" },
        { "@type": "ListItem", position: 3, name: "Железнодорожный вокзал Хюэ" },
        { "@type": "ListItem", position: 4, name: "Императорская цитадель Хюэ" },
        { "@type": "ListItem", position: 5, name: "Пагода Тхьенму и выбранная королевская гробница" },
        { "@type": "ListItem", position: 6, name: "Возвращение в Дананг на автомобиле" },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "ru",
    mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Дорога из Дананга в Хюэ — виды на море из окна поезда",
    description: "Вертикальное видео с прибрежными пейзажами Центрального Вьетнама, снятое из окна поезда.",
    inLanguage: "ru",
    thumbnailUrl: `${ROOT}${MEDIA}/hai-van-heritage-train-coast.jpeg`,
    contentUrl: `${ROOT}${VIDEO}`,
    uploadDate: "2026-10-29",
    duration: "PT1M16S",
  },
];

function SectionIntro({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className={styles.sectionIntro}>
      <p className={styles.kicker}>{kicker}</p>
      <h2>{title}</h2>
      {children && <div className={styles.sectionLead}>{children}</div>}
    </div>
  );
}

export default function HeritageTrainRussianPage() {
  const directWhatsApp =
    "https://wa.me/84937762607?text=" +
    encodeURIComponent("Здравствуйте! Хочу заказать экскурсию из Дананга в Хюэ на поезде наследия. Помогите проверить билеты, составить маршрут по Хюэ и организовать возвращение в Дананг на машине.");

  return (
    <main className={styles.site} lang="ru">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header className={styles.header}>
        <a href="/ru" className={styles.brand} aria-label="GoVietStay — главная страница на русском">
          <Image src="/brand/govietstay-official-logo.jpg" alt="GoVietStay" width={44} height={44} />
          <span><strong>GoVietStay</strong><small>МЕСТНАЯ ПОДДЕРЖКА</small></span>
        </a>
        <nav className={styles.nav} aria-label="Навигация по странице">
          <a href="#experience">О путешествии</a>
          <a href="#itinerary">Маршрут</a>
          <a href="#faq">Вопросы</a>
        </nav>
        <a href={EN} className={styles.headerLang} lang="en" hrefLang="en" aria-label="English version">EN</a>
        <a className={styles.headerCta} href="#plan">Спланировать <ArrowUpRight size={16} /></a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroText}>
          <div className={styles.heroEyebrow}><span className={styles.eyebrowLine} /> ЦЕНТРАЛЬНЫЙ ВЬЕТНАМ <span className={styles.heroDot} /> ОДИН ДЕНЬ</div>
          <h1>Из Дананга в Хюэ <em>на поезде наследия</em></h1>
          <p className={styles.heroTagline}>Там, где горы встречаются с морем, сама дорога становится частью путешествия.</p>
          <p className={styles.heroDescription}>Проедьте вдоль побережья через перевал Хайван, откройте для себя императорский Хюэ и вернитесь в Дананг в тот же день.</p>
          <div className={styles.heroActions}>
            <a href="#plan" className={styles.primaryButton}>Составить мой маршрут <ArrowUpRight size={18} /></a>
            <a href="#film" className={styles.textButton}><span className={styles.playCircle}><Play size={16} fill="currentColor" /></span> Смотреть видео</a>
          </div>
          <div className={styles.heroFoot}><ShieldCheck size={16} /> Индивидуальный подход <span /> Поддержка 24/7 <span /> Цена до бронирования</div>
        </div>
        <div className={styles.heroVisual}>
          <Image src={`${MEDIA}/heritage-train-bridge-hai-van.jpeg`} alt="Промоизображение синего поезда на мосту среди гор и зелени рядом с морем" fill priority sizes="(max-width: 900px) 100vw, 52vw" className={styles.heroImage} />
          <div className={styles.heroImageTint} />
          <div className={styles.heroVisualNote}><Mountain size={16} /> ПОБЕРЕЖЬЕ ПЕРЕВАЛА ХАЙВАН <span>01 / 03</span></div>
          <a href="#experience" className={styles.scrollCue} aria-label="Смотреть путешествие"><ArrowDownRight size={22} /></a>
        </div>
      </section>

      <section className={styles.factRibbon} aria-label="Главное о поездке">
        <div><TrainFront /><span><strong>Живописный поезд утром</strong><small>Дананг → Хюэ через перевал Хайван</small></span></div>
        <div><Landmark /><span><strong>Императорский Хюэ</strong><small>Объекты Всемирного наследия ЮНЕСКО</small></span></div>
        <div><CarFront /><span><strong>Возвращение в тот же день</strong><small>Индивидуальный автомобиль до отеля</small></span></div>
      </section>

      <section id="experience" className={`${styles.section} ${styles.introSection}`}>
        <div className={styles.introCopy}>
          <SectionIntro kicker="01 / ВПЕЧАТЛЕНИЕ" title="Это не просто переезд. Это история за вашим окном.">
            <p>Есть дороги, которыми стоит наслаждаться не спеша. На туристическом поезде <strong>«Соединяя наследие Центрального Вьетнама»</strong> (<span lang="vi">Kết nối di sản miền Trung</span>) с одной стороны поднимаются горы Чыонгшон, а с другой открывается море.</p>
            <p>После живописной дороги вас ждёт Хюэ: дворцы династии Нгуен, тихие пагоды у реки, местная кухня и величие древней императорской столицы.</p>
          </SectionIntro>
          <a className={styles.inlineLink} href="#itinerary">Посмотреть программу дня <ArrowRight size={17} /></a>
          <div className={styles.introQuote}><span>“</span><p>Самое приятное — вам не придётся выбирать между поездом через Хайван и настоящей экскурсией по Хюэ.</p></div>
        </div>
        <div className={styles.introPhotos}>
          <div className={styles.introPhotoMain}><Image src={`${MEDIA}/hai-van-heritage-train-coast.jpeg`} alt="Промоиллюстрация поезда на фоне зелёных гор и моря" fill sizes="(max-width: 800px) 75vw, 32vw" /></div>
          <div className={styles.introPhotoSmall}><Image src={`${MEDIA}/da-nang-hue-scenic-railway.jpeg`} alt="Иллюстрация железной дороги вдоль зелёного мыса у моря" fill sizes="(max-width: 800px) 48vw, 20vw" /></div>
          <span className={styles.photoCaption}>ПРОМОИЗОБРАЖЕНИЯ <i /> ЦЕНТРАЛЬНЫЙ ВЬЕТНАМ</span>
        </div>
      </section>

      <section id="film" className={styles.filmSection}>
        <div className={styles.filmCopy}>
          <p className={styles.kicker}>02 / ВИД ИЗ ОКНА</p>
          <h2>Устройтесь поудобнее.<br /><em>Пейзаж уже меняется.</em></h2>
          <p>Морские бухты, пляжи, рыбацкие лодки вдали и горы у самой железной дороги. Посмотрите, как выглядит путешествие из окна поезда.</p>
          <div className={styles.filmDetails}><span><Play size={15} /> Видео путешествия</span><span><Clock3 size={15} /> 76 секунд</span></div>
        </div>
        <div className={styles.videoFrame}>
          <video controls playsInline preload="none" poster={`${MEDIA}/hai-van-heritage-train-coast.jpeg`} aria-label="Видео поездки на поезде из Дананга в Хюэ">
            <source src={VIDEO} type="video/mp4" />
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
          <div className={styles.videoNote}>ВИД ИЗ ОКНА ПОЕЗДА <span>ВИДЕО МАРШРУТА</span></div>
        </div>
      </section>

      <section id="itinerary" className={`${styles.section} ${styles.itinerarySection}`}>
        <SectionIntro kicker="03 / ВАШ МАРШРУТ НА ДЕНЬ" title="От морской железной дороги — к императорским дворцам.">
          <p>Пример комфортной программы для тех, кто хочет увидеть <strong>и красивый железнодорожный маршрут, и главные места Хюэ</strong>, не торопясь на обратный дневной поезд.</p>
        </SectionIntro>
        <div className={styles.itineraryGrid}>
          <div className={styles.timeline}>
            {itinerary.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className={styles.timelineItem} key={item.title}>
                  <div className={styles.timelineMarker}><Icon size={20} /></div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineMeta}><time>{item.time}</time><span>0{index + 1}</span></div>
                    <h3>{item.title}</h3><p>{item.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <aside className={styles.routeAside}>
            <div className={styles.routePhoto}><Image src={`${MEDIA}/heritage-train-bridge-hai-van.jpeg`} alt="Промоизображение живописной железной дороги среди зелёных гор" fill sizes="(max-width: 900px) 100vw, 32vw" /></div>
            <div className={styles.routeNote}>
              <p className={styles.kicker}>ПРОДУМАННЫЙ МАРШРУТ</p>
              <h3>Туда — поезд.<br />Хюэ — без спешки.<br /><em>Обратно — авто.</em></h3>
              <p>Благодаря поездке на поезде в одну сторону у вас останется больше времени на Цитадель, пагоды и прогулки, а время возвращения будет гибче.</p>
              <a href="#plan">Получить эту программу <ArrowUpRight size={17} /></a>
            </div>
          </aside>
        </div>
        <div className={styles.disclaimer}><Clock3 size={18} /><p><strong>Все часы в программе ориентировочные и не означают подтверждённое бронирование.</strong> В опубликованных расписаниях железной дороги встречаются разные версии времени поездов. Перед подтверждением мы проверяем рейс, билеты, часы работы памятников и автомобильный трансфер.</p></div>
      </section>

      <section className={styles.choicesSection}>
        <div className={styles.choicesHeader}><p className={styles.kicker}>04 / ВЫБЕРИТЕ СВОЙ РИТМ</p><h2>Два варианта поездки.<br /><em>Одно незабываемое побережье.</em></h2></div>
        <div className={styles.choiceCards}>
          <article className={`${styles.choiceCard} ${styles.choiceRecommended}`}>
            <div className={styles.choiceTop}><span>01 / РЕКОМЕНДУЕМ</span><span className={styles.choiceBadge}>БОЛЬШЕ ВРЕМЕНИ В ХЮЭ</span></div>
            <TrainFront size={32} strokeWidth={1.2} />
            <h3>Поезд в Хюэ +<br />машина обратно</h3>
            <p>Живописная железная дорога утром, полноценная экскурсия по Хюэ и гибкое возвращение в Дананг на индивидуальном автомобиле.</p>
            <ul><li><Check size={16} /> Утренний поезд через Хайван</li><li><Check size={16} /> Больше времени на Цитадель и другие места</li><li><Check size={16} /> Трансфер обратно к отелю</li></ul>
            <a href="#plan">Рассчитать этот вариант <ArrowUpRight size={17} /></a>
          </article>
          <article className={styles.choiceCard}>
            <div className={styles.choiceTop}><span>02 / ДЛЯ ЛЮБИТЕЛЕЙ ПОЕЗДОВ</span><span>КОРОЧЕ ПРОГУЛКА</span></div>
            <TrainFront size={32} strokeWidth={1.2} />
            <h3>Поезд туда<br />и обратно</h3>
            <p>Пусть главным впечатлением станет сама железная дорога. У вас будет время на короткую прогулку по Хюэ перед обратным поездом.</p>
            <ul><li><Check size={16} /> Живописный маршрут в обе стороны</li><li><Check size={16} /> По примерному расписанию — около 3 часов в Хюэ</li><li><Check size={16} /> Зависит от наличия обратных билетов</li></ul>
            <a href="#plan">Узнать о поезде в обе стороны <ArrowUpRight size={17} /></a>
          </article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.practicalSection}`}>
        <div>
          <SectionIntro kicker="05 / ПОЛЕЗНО ЗНАТЬ" title="Местные советы и честные условия.">
            <p>Мы подбираем программу под вашу дату, отель, состав группы и язык гида. Наличие конкретного места в поезде подтверждается только после проверки.</p>
          </SectionIntro>
          <div className={styles.practicalList}>
            <div><CalendarDays /><span><strong>Расписание поездов</strong><small>Утренний HĐ2 и дневной HĐ3 — ориентиры. Проверяем актуальные часы на вашу дату.</small></span></div>
            <div><Globe2 /><span><strong>Язык сопровождения</strong><small>Английский; русскоязычный, немецкоязычный или италоязычный гид — по предварительному запросу и при наличии.</small></span></div>
            <div><ShieldCheck /><span><strong>Понятная стоимость</strong><small>В расчёте отдельно укажем поезд, транспорт, гида, обед, входные билеты и другие согласованные услуги.</small></span></div>
            <div><Mountain /><span><strong>Комфорт и погода</strong><small>Видимость на перевале и место у окна не гарантируются. Возьмите удобную обувь и лёгкую накидку.</small></span></div>
          </div>
        </div>
        <aside className={styles.trustCard}>
          <div className={styles.trustCardIcon}><MessageCircle size={30} /></div>
          <p className={styles.kicker}>GOVIETSTAY • МЕСТНАЯ ПОДДЕРЖКА</p>
          <h3>Пообщайтесь с местной командой до бронирования.</h3>
          <p>Поможем связать расписание поезда, реальное время прибытия и интересную экскурсию по Хюэ для вашей семьи или компании.</p>
          <a href="https://maps.app.goo.gl/znWBmL8zPKEJqnoW6" target="_blank" rel="noopener noreferrer" className={styles.reviewLink}>Отзывы о нас на Google Картах <ArrowUpRight size={16} /></a>
          <a href={directWhatsApp} target="_blank" rel="noopener noreferrer" className={styles.trustWhatsapp}>WhatsApp +84 937 762 607 <ArrowUpRight size={16} /></a>
        </aside>
      </section>

      <section id="faq" className={`${styles.section} ${styles.faqSection}`}>
        <SectionIntro kicker="06 / ОТВЕЧАЕМ ПЕРЕД ПОЕЗДКОЙ" title="Частые вопросы о поезде наследия Дананг — Хюэ.">
          <p>Всё, что стоит знать перед однодневной экскурсией: время в пути, обзорные места, билеты и варианты возвращения.</p>
        </SectionIntro>
        <div className={styles.faqList}>{faqs.map(({ q, a }) => <details key={q} className={styles.faqItem}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
        <div className={styles.sources}>
          <strong>Источники для планирования</strong>
          <a href="https://ketnoidisan.dsvn.vn/" target="_blank" rel="noopener noreferrer">Железные дороги Вьетнама — расписание <ArrowUpRight size={14} /></a>
          <a href="https://whc.unesco.org/en/list/678/" target="_blank" rel="noopener noreferrer">ЮНЕСКО — комплекс памятников Хюэ <ArrowUpRight size={14} /></a>
          <span>Проверено 29 октября 2026 года. Расписание может меняться.</span>
        </div>
      </section>

      <section id="plan" className={styles.bookingSection}>
        <div className={styles.bookingIntro}>
          <p className={styles.kicker}>07 / ВАШЕ ПУТЕШЕСТВИЕ</p>
          <h2>Место у окна.<br />Императорский Хюэ.<br /><em>День, который запомнится.</em></h2>
          <p>Расскажите, когда планируете поездку. Мы составим удобную программу из Дананга в Хюэ с поездом наследия, экскурсиями и возвращением в отель.</p>
          <div className={styles.bookingPromise}><ShieldCheck size={18} /><span>Индивидуальная программа и понятная стоимость до оплаты. Никаких обязательств бронировать.</span></div>
          <div className={styles.bookingContact}><span>GOVIETSTAY • ВСЕГДА НА СВЯЗИ</span><a href="mailto:booking@govietstay.com">booking@govietstay.com</a><a href="tel:+84937762607">+84 937 762 607</a></div>
        </div>
        <BookingPanelRu />
      </section>

      <footer className={styles.footer}>
        <a href="/ru" className={styles.footerBrand}>GoVietStay<span>Trusted Local Support</span></a>
        <p>Дананг · Хойан · Хюэ · Фукуок</p>
        <div><a href="/ru">Главная</a><a href="/ru/tours/phu-quoc">Другие туры</a><a href={EN} hrefLang="en" lang="en">English version</a></div>
        <small>© 2026 GoVietStay. Независимое планирование путешествий; мы не являемся железнодорожным перевозчиком. Расписание и услуги подтверждаются перед бронированием.</small>
      </footer>
      <a className={styles.mobileSticky} href="#plan"><MessageCircle size={18} /> Рассчитать поездку в Хюэ <ArrowUpRight size={17} /></a>
    </main>
  );
}
