"use client";

import { CSSProperties, MouseEvent, PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import vietnamMap from "@svg-maps/vietnam";
import {
  AudioLines,
  BriefcaseBusiness,
  Camera,
  Globe2,
  MessageCircleMore,
  Navigation,
  Orbit,
  PhoneCall,
  Play,
  RadioTower,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

type ServiceKey = "tour" | "transfer" | "essentials" | "support";

type ExchangeRatesState = {
  values: Record<"USD" | "EUR" | "RUB", number>;
  updatedAt: string;
  checkedAt: string;
  source: string;
  sourceUrl: string;
  sourceCadence: string;
  status: "loading" | "live" | "cached";
};

const GOVIETSTAY_RU = "https://GoVietStay.com/ru";
const EXPERIENCE_URL = `${GOVIETSTAY_RU}#experiences`;

const services: Array<{key: ServiceKey; no: string; title: string; subtitle: string; accent: string; guideLabel: string; tags: string[]}> = [
  { key: "tour", no: "01", title: "Экскурсии", subtitle: "Проверенные экскурсии и готовые маршруты по Вьетнаму.", accent: "#ffad29", guideLabel: "ГИД ПО ЭКСКУРСИЯМ", tags: ["ПОГОДА", "ТЕМП", "МАРШРУТ"] },
  { key: "transfer", no: "02", title: "Трансфер", subtitle: "Аэропорт, отель и поездки между городами без лишних хлопот.", accent: "#4fd0a5", guideLabel: "КАК ВЫБРАТЬ ТРАНСФЕР", tags: ["РЕЙС", "БАГАЖ", "ЦЕНА"] },
  { key: "essentials", no: "03", title: "SIM, eSIM и валюта", subtitle: "Подключим связь и порекомендуем проверенный пункт обмена с хорошим курсом.", accent: "#6f9cff", guideLabel: "SIM И БЕЗОПАСНЫЙ ОБМЕН", tags: ["5G", "КУРС", "ПРОВЕРКА"] },
  { key: "support", no: "04", title: "Помощь 24/7", subtitle: "Русскоязычная помощь до, во время и после поездки.", accent: "#ff7b72", guideLabel: "КАК МЫ ПОМОГАЕМ", tags: ["ДО", "В ПУТИ", "ПОСЛЕ"] },
];

const serviceGuides: Record<ServiceKey, {
  eyebrow: string;
  title: string;
  lead: string;
  principle: string;
  facts: Array<{ no: string; title: string; text: string }>;
  mistakes: string[];
  note: string;
  ctaLabel: string;
  ctaHref: string;
}> = {
  tour: {
    eyebrow: "УМНЫЙ ВЫБОР ЭКСКУРСИИ",
    title: "Хороший день начинается не с цены, а с правильного маршрута.",
    lead: "Сначала учитываем погоду, темп группы, время в дороге и интересы гостей — только потом выбираем программу.",
    principle: "Меньше лишних точек. Больше настоящих впечатлений.",
    facts: [
      { no: "01", title: "Погода и время", text: "Для гор, островов и старого города нужны разные часы старта. Один график не подходит всем." },
      { no: "02", title: "Темп группы", text: "Семья с детьми, старшие гости и активные путешественники — это три разных ритма поездки." },
      { no: "03", title: "Язык и смысл", text: "Русский гид особенно полезен там, где важны история и объяснения. Не везде за него нужно переплачивать." },
    ],
    mistakes: [
      "Выбирать экскурсию только по самой низкой цене.",
      "Пытаться посетить слишком много мест за один день.",
      "Не проверять реальное время переездов и возвращения в отель.",
    ],
    note: "GoVietStay помогает подобрать маршрут под конкретную группу, а не продаёт одну программу всем.",
    ctaLabel: "СМОТРЕТЬ ПРОГРАММЫ",
    ctaHref: EXPERIENCE_URL,
  },
  transfer: {
    eyebrow: "ТРАНСФЕР БЕЗ СЮРПРИЗОВ",
    title: "Правильный трансфер — это точная машина, багаж и понятная цена.",
    lead: "Количество пассажиров — только половина расчёта. Важно заранее учесть чемоданы, детское кресло, адрес и время прилёта.",
    principle: "Сначала детали. Потом автомобиль и окончательная стоимость.",
    facts: [
      { no: "01", title: "Рейс и терминал", text: "Отправьте номер рейса и время прилёта: команда сможет следить за изменениями и правильно встретить вас." },
      { no: "02", title: "Люди и багаж", text: "Автомобиль выбирают по количеству гостей и чемоданов. Слишком маленькая машина испортит начало поездки." },
      { no: "03", title: "Финальная цена", text: "До подтверждения уточните, входят ли ожидание, платные дороги и подача к нужному адресу." },
    ],
    mistakes: [
      "Сообщать только название города без точного адреса.",
      "Считать места в машине, но забывать о крупных чемоданах.",
      "Соглашаться на цену без понятного перечня включённых услуг.",
    ],
    note: "Мы подтверждаем маршрут и детали заранее, чтобы после прилёта не пришлось снова всё объяснять.",
    ctaLabel: "ЗАПРОСИТЬ ТРАНСФЕР",
    ctaHref: "https://wa.me/84937762607?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20GoVietStay!%20%D0%9C%D0%BD%D0%B5%20%D0%BD%D1%83%D0%B6%D0%B5%D0%BD%20%D1%82%D1%80%D0%B0%D0%BD%D1%81%D1%84%D0%B5%D1%80.",
  },
  essentials: {
    eyebrow: "СВЯЗЬ И ДЕНЬГИ БЕЗ РИСКА",
    title: "Связь — с первого дня. Обмен — только после проверки курса и места.",
    lead: "Мы помогаем проверить совместимость eSIM и показываем рыночный ориентир, а затем рекомендуем надёжный пункт обмена.",
    principle: "Проверить устройство, курс и итоговую сумму до оплаты.",
    facts: [
      { no: "01", title: "Совместимость", text: "Перед покупкой eSIM проверьте поддержку технологии и отсутствие операторской блокировки телефона." },
      { no: "02", title: "Ориентир курса", text: "Сравните предложение с live-таблицей на этой странице. Это ориентир, а не обещание кассового курса." },
      { no: "03", title: "Проверенное место", text: "Уточните итоговую сумму заранее и пересчитайте деньги до ухода из пункта обмена." },
    ],
    mistakes: [
      "Покупать eSIM до проверки совместимости телефона.",
      "Менять всю сумму в первом попавшемся месте.",
      "Смотреть только на вывеску курса и не уточнять, сколько VND получите на руки.",
    ],
    note: "GoVietStay не меняет валюту напрямую — мы рекомендуем проверенное место и помогаем сравнить условия.",
    ctaLabel: "ПОЛУЧИТЬ РЕКОМЕНДАЦИЮ",
    ctaHref: "https://wa.me/84937762607?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20GoVietStay!%20%D0%9C%D0%BD%D0%B5%20%D0%BD%D1%83%D0%B6%D0%BD%D0%B0%20%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%20%D1%81%20eSIM%20%D0%B8%D0%BB%D0%B8%20%D0%BE%D0%B1%D0%BC%D0%B5%D0%BD%D0%BE%D0%BC%20%D0%B2%D0%B0%D0%BB%D1%8E%D1%82%D1%8B.",
  },
  support: {
    eyebrow: "ПОНЯТНАЯ ПОМОЩЬ 24/7",
    title: "24/7 — это не просто обещание, а понятный алгоритм помощи.",
    lead: "Чем точнее первое сообщение, тем быстрее местная команда поймёт ситуацию и предложит следующий безопасный шаг.",
    principle: "Где вы, что произошло и какая помощь нужна сейчас.",
    facts: [
      { no: "01", title: "До поездки", text: "Сохраните контакт, адрес отеля и основные бронирования в одном месте до вылета." },
      { no: "02", title: "Во время поездки", text: "Отправьте геолокацию, фото или номер бронирования — это быстрее длинного объяснения." },
      { no: "03", title: "После поездки", text: "Мы поможем уточнить забытые вещи, обратный трансфер и другие вопросы, связанные с вашей поездкой." },
    ],
    mistakes: [
      "Писать только «Помогите» без адреса и описания ситуации.",
      "Отправлять одну проблему сразу в несколько каналов.",
      "Ждать до последней минуты, когда вопрос уже стал срочным.",
    ],
    note: "В экстренной ситуации сначала обращайтесь в официальные службы. Мы поможем объяснить ситуацию и сориентироваться.",
    ctaLabel: "СВЯЗАТЬСЯ С КОМАНДОЙ",
    ctaHref: "https://wa.me/84937762607?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20GoVietStay!%20%D0%9C%D0%BD%D0%B5%20%D0%BD%D1%83%D0%B6%D0%BD%D0%B0%20%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C.",
  },
};

const fallbackExchangeRates: ExchangeRatesState = {
  values: { USD: 26204.5, EUR: 30292.4, RUB: 318.5 },
  updatedAt: "2026-08-08T12:00:02.000Z",
  checkedAt: "2026-08-08T12:00:02.000Z",
  source: "ExchangeRate.fun",
  sourceUrl: "https://www.exchangerate.fun/",
  sourceCadence: "источник обновляется каждый час",
  status: "loading",
};

const formatRate = (value: number) => new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(value);

function ServiceVisual({ serviceKey, rates }: { serviceKey: ServiceKey; rates: ExchangeRatesState }) {
  if (serviceKey === "tour") {
    return (
      <span className="productVisual tourProduct" aria-hidden="true">
        <span className="visualTopline"><b>ГОТОВЫЕ МАРШРУТЫ</b><i>03</i></span>
        <span className="tourSun"/><span className="tourMountain mountainBack"/><span className="tourMountain mountainFront"/>
        <span className="tourRoute"><b>ДН</b><i/><b>ХА</b><i/><b>ХЮЭ</b></span>
      </span>
    );
  }

  if (serviceKey === "transfer") {
    return (
      <span className="productVisual transferProduct" aria-hidden="true">
        <span className="visualTopline"><b>ВСТРЕЧА В АЭРОПОРТУ</b><i>ВОВРЕМЯ</i></span>
        <span className="transferRoute"><b>АЭРОПОРТ</b><i/><b>ОТЕЛЬ</b></span>
        <span className="carVisual"><i className="carWindow"/><i className="wheelOne"/><i className="wheelTwo"/></span>
      </span>
    );
  }

  if (serviceKey === "essentials") {
    return (
      <span className="productVisual essentialsProduct" aria-hidden="true">
        <span className="phoneVisual"><i>5G</i><b>eSIM</b><small>ПОДКЛЮЧЕНО</small></span>
        <span className="verifiedPin"><i>✓</i><b>ПРОВЕРЕНО</b></span>
        <span className="miniRates">
          <span><b>USD</b><i>→</i><strong>{formatRate(rates.values.USD)} ₫</strong></span>
          <span><b>EUR</b><i>→</i><strong>{formatRate(rates.values.EUR)} ₫</strong></span>
          <span><b>RUB</b><i>→</i><strong>{formatRate(rates.values.RUB)} ₫</strong></span>
        </span>
      </span>
    );
  }

  return (
    <span className="productVisual supportProduct" aria-hidden="true">
      <span className="supportStatus"><i/><b>НА СВЯЗИ</b><strong>24/7</strong></span>
      <span className="supportAvatar">RU</span>
      <span className="chatBubble bubbleOne">Мы рядом <b>✓✓</b></span>
      <span className="chatBubble bubbleTwo">Чем помочь?</span>
    </span>
  );
}

function ExchangeRatePanel({ rates, compact = false }: { rates: ExchangeRatesState; compact?: boolean }) {
  const updated = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(rates.updatedAt));

  return (
    <section className={`exchangePanel ${compact ? "isCompact" : ""}`} aria-label="Ориентировочный курс валют к вьетнамскому донгу">
      <header>
        <span className="ratePulse"><i/><b>{rates.status === "loading" ? "СИНХРОНИЗАЦИЯ" : rates.status === "live" ? "АВТО • ОНЛАЙН" : "ПОСЛЕДНИЕ ДАННЫЕ"}</b></span>
        <span><small>ОРИЕНТИРОВОЧНЫЙ КУРС К VND</small><strong>Проверяем каждые 5 минут</strong></span>
        <time dateTime={rates.updatedAt}>Обновлено {updated} • ВЬЕТНАМ</time>
      </header>
      <span className="exchangeGrid" aria-live="polite">
        {(["USD", "EUR", "RUB"] as const).map((currency) => (
          <span className="exchangeCell" key={currency}><b>1 {currency}</b><i>≈</i><strong>{formatRate(rates.values[currency])} ₫</strong></span>
        ))}
        <span className="exchangePromise"><i>✓</i><span><b>Надёжный обмен</b><small>Порекомендуем проверенный пункт с хорошим курсом</small></span></span>
      </span>
      <footer>
        <span>Рыночный ориентир, не кассовый курс. Фактическая сумма на месте может отличаться.</span>
        <a href={rates.sourceUrl} target="_blank" rel="noreferrer">Данные: {rates.source} ↗</a>
        <span>{rates.sourceCadence}</span>
      </footer>
    </section>
  );
}

const destinations: Array<{label: string; href: string}> = [
  { label: "ДАНАНГ", href: EXPERIENCE_URL },
  { label: "ХОЙАН", href: EXPERIENCE_URL },
  { label: "ХЮЭ", href: EXPERIENCE_URL },
  { label: "ФУКУОК", href: EXPERIENCE_URL },
  { label: "ХО ТРАМ", href: EXPERIENCE_URL },
];

const nhaTrangCombo = {
  href: `${GOVIETSTAY_RU}#nha-trang-packages`,
};

const gifts = [
  { icon: "e", short: "eSIM", title: "Бесплатная туристическая eSIM", value: "1 eSIM для одной группы", code: "ESIM" },
  { icon: "₫", short: "150K", title: "Ваучер 150 000 VND", value: "на экскурсию GoVietStay", code: "V150" },
  { icon: "ИИ", short: "ИИ-план", title: "Персональный ИИ-маршрут", value: "план поездки под ваши даты", code: "AIP" },
  { icon: "★", short: "Приоритет", title: "Приоритетная поддержка 24/7", value: "быстрый ответ местной команды", code: "VIP" },
  { icon: "↗", short: "Трансфер", title: "Скидка 10% на трансфер", value: "встреча в аэропорту", code: "TR10" },
  { icon: "⌖", short: "Секреты", title: "Карта секретных мест", value: "локальная подборка GoVietStay", code: "MAP" },
];

const assistantChoices = [
  { id: "plan", label: "План на 3 дня", icon: "✦" },
  { id: "tour", label: "Подобрать экскурсию", icon: "⌖" },
  { id: "gift", label: "Активировать подарок", icon: "₫" },
  { id: "human", label: "Нужен человек", icon: "◌" },
] as const;

type AssistantChoice = typeof assistantChoices[number]["id"];
type ChatMessage = { from: "ai" | "guest"; text: string };
type VietnamMapLocation = { id: string; path: string; name?: string };

const KAKA_AI_URL = "https://aistudio.instagram.com/ai/1057504343330006/?utm_source=mshare";
const RUSSIAN_MUSIC_VIDEO_ID = "4wKXhKwuqrQ";
const RUSSIAN_MUSIC_URL = `https://www.youtube.com/watch?v=${RUSSIAN_MUSIC_VIDEO_ID}`;

const vietnamMapLocations = vietnamMap.locations as VietnamMapLocation[];
const mapLocations = vietnamMapLocations.filter((location) => !["hoangsa", "truongsa"].includes(location.id));
const featuredMapRegions = new Set(["danang", "quangnam", "tthue", "kiengiang", "baria"]);
const hoangSa = vietnamMapLocations.find((location) => location.id === "hoangsa")!;
const truongSa = vietnamMapLocations.find((location) => location.id === "truongsa")!;

function Vietnam3DMap({ id, compact = false }: { id: string; compact?: boolean }) {
  const shapeId = `${id}-vietnam-shape`;
  const gradientId = `${id}-vietnam-gradient`;
  const glowId = `${id}-vietnam-glow`;

  return (
    <div className={`vietnamMap3d ${compact ? "isCompact" : ""}`} aria-label="Трёхмерная карта Вьетнама с точками GoVietStay и архипелагами Хоангша и Чыонгша">
      <div className="mapNameplate"><small>GO VIET STAY • 2027</small><b>СЕТЬ GOVIETSTAY</b><span><i/> 3 РЕГИОНА НА СВЯЗИ</span></div>
      <div className="mapHalo" />
      <svg className="vietnamMapSvg" viewBox="70 0 310 873" role="img" aria-label="Карта Вьетнама">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d9fff7" />
            <stop offset=".36" stopColor="#63e6d1" />
            <stop offset=".72" stopColor="#079b93" />
            <stop offset="1" stopColor="#03555c" />
          </linearGradient>
          <filter id={glowId} x="-40%" y="-30%" width="180%" height="170%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#001e29" floodOpacity=".88" />
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#54f6dc" floodOpacity=".45" />
          </filter>
          <g id={shapeId}>
            {mapLocations.map((location) => <path d={location.path} key={`${id}-shape-${location.id}`} />)}
          </g>
        </defs>
        <use href={`#${shapeId}`} className="mapDepth mapDepthThree" />
        <use href={`#${shapeId}`} className="mapDepth mapDepthTwo" />
        <use href={`#${shapeId}`} className="mapDepth mapDepthOne" />
        <g className="mapSurface" filter={`url(#${glowId})`}>
          {mapLocations.map((location) => (
            <path
              className={featuredMapRegions.has(location.id) ? "isFeaturedRegion" : ""}
              d={location.path}
              fill={`url(#${gradientId})`}
              key={`${id}-surface-${location.id}`}
            />
          ))}
        </g>
      </svg>
      <div className="mapLocation centralLocation"><span/><b>ЦЕНТРАЛЬНЫЙ ВЬЕТНАМ</b><small>ДАНАНГ • ХОЙАН • ХЮЭ</small></div>
      <div className="mapLocation phuQuocLocation"><span/><b>ФУКУОК</b><small>LOCAL POINT • ОСТРОВ</small></div>
      <div className="mapLocation hoTramLocation"><span/><b>ХО ТРАМ</b><small>LOCAL POINT • ПОБЕРЕЖЬЕ</small></div>
      <div className="islandSovereignty" aria-label="Архипелаги Хоангша и Чыонгша во Вьетнаме">
        <div className="islandHeading"><span>VN</span><div><small>ОСТРОВА ВЬЕТНАМА</small><b>ХОАНГША • ЧЫОНГША</b></div></div>
        <div className="islandMaps">
          <div className="islandUnit">
            <svg viewBox="515 360 120 100" role="img" aria-label="Архипелаг Хоангша"><path d={hoangSa.path}/></svg>
            <span><b>ХОАНГША</b><small>АРХИПЕЛАГ ВЬЕТНАМА</small></span>
          </div>
          <div className="islandUnit">
            <svg viewBox="360 625 470 265" role="img" aria-label="Архипелаг Чыонгша"><path d={truongSa.path}/></svg>
            <span><b>ЧЫОНГША</b><small>АРХИПЕЛАГ ВЬЕТНАМА</small></span>
          </div>
        </div>
        <p>ХОАНГША И ЧЫОНГША — <b>НЕОТЪЕМЛЕМАЯ ЧАСТЬ ТЕРРИТОРИИ ВЬЕТНАМА</b></p>
      </div>
      <a className="mapCredit" href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/vietnam" target="_blank" rel="noreferrer">КАРТА • SVG MAPS ВЬЕТНАМ • CC BY 4.0</a>
    </div>
  );
}

type ContactIconKey = "guide" | "chat" | "camera" | "send" | "community" | "shorts" | "video" | "signal" | "business" | "trusted" | "phone" | "reviews" | "web" | "ecosystem";

const contactIconMap: Record<ContactIconKey, LucideIcon> = {
  guide: Sparkles,
  chat: MessageCircleMore,
  camera: Camera,
  send: Send,
  community: UsersRound,
  shorts: AudioLines,
  video: Play,
  signal: RadioTower,
  business: BriefcaseBusiness,
  trusted: ShieldCheck,
  phone: PhoneCall,
  reviews: Star,
  web: Globe2,
  ecosystem: Orbit,
};

const contactLinks: Array<{
  icon: ContactIconKey;
  badge: string;
  name: string;
  detail: string;
  href: string;
  accent: string;
  featured?: boolean;
}> = [
  { icon: "guide", badge: "AI", name: "Kaka AI", detail: "Ваш AI-проводник", href: KAKA_AI_URL, accent: "#ffc85b", featured: true },
  { icon: "chat", badge: "WA", name: "WhatsApp", detail: "+84 937 762 607", href: "https://wa.me/84937762607", accent: "#58e5aa", featured: true },
  { icon: "camera", badge: "IG", name: "Instagram", detail: "@govietstay", href: "https://www.instagram.com/govietstay/", accent: "#ff85ad" },
  { icon: "send", badge: "TG", name: "Telegram", detail: "@GoVietStay", href: "https://t.me/GoVietStay", accent: "#70cfff" },
  { icon: "community", badge: "FB", name: "Facebook", detail: "GoVietStay", href: "https://www.facebook.com/share/19XQiocsh3/?mibextid=wwXIfr", accent: "#7aa9ff" },
  { icon: "shorts", badge: "TT", name: "TikTok", detail: "@trongthang.tran2607", href: "https://www.tiktok.com/@trongthang.tran2607?_r=1&_t=ZS-98higNIgkC4", accent: "#70f0df" },
  { icon: "video", badge: "YT", name: "YouTube", detail: "@govietstay", href: "https://www.youtube.com/@govietstay", accent: "#ff716d" },
  { icon: "signal", badge: "X", name: "X / Twitter", detail: "@Thangtran267", href: "https://x.com/Thangtran267", accent: "#e9f4f1" },
  { icon: "business", badge: "IN", name: "LinkedIn", detail: "GoVietStay", href: "https://www.linkedin.com/company/govietstay/", accent: "#72baff" },
  { icon: "trusted", badge: "TR", name: "Truth Social", detail: "@GoVietStay", href: "https://truthsocial.com/@GoVietStay", accent: "#e7d68c" },
  { icon: "phone", badge: "Z", name: "Zalo", detail: "+84 937 762 607", href: "https://zalo.me/84937762607", accent: "#5aa9ff" },
  { icon: "reviews", badge: "G", name: "Google Reviews", detail: "Отзывы гостей", href: "https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic", accent: "#ffc85b" },
  { icon: "web", badge: "WEB", name: "GoVietStay.com", detail: "Русская версия", href: "https://GoVietStay.com/ru", accent: "#58e0c4" },
  { icon: "ecosystem", badge: "π", name: "Pi Community", detail: "Туристическая экосистема", href: "https://govietstay.base44.app/", accent: "#b9a1ff" },
];

export default function LocalPointLandingPage() {
  const [ref, setRef] = useState("LOCAL-POINT");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRatesState>(fallbackExchangeRates);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [draggingWheel, setDraggingWheel] = useState(false);
  const [giftIndex, setGiftIndex] = useState<number | null>(null);
  const [giftCode, setGiftCode] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState<ServiceKey | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { from: "ai", text: "Здравствуйте! Я Kaka — цифровой проводник GoVietStay. Помогу выбрать маршрут, активировать подарок или подключить местную команду." },
  ]);
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const guidePanelRef = useRef<HTMLElement | null>(null);
  const dragRef = useRef<{ startAngle: number; startRotation: number; lastRotation: number } | null>(null);

  useEffect(() => {
    const source = new URLSearchParams(window.location.search).get("ref");
    // Hydrate the point code and the device-local pass after the browser is ready.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (source) setRef(source.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 32));
    const savedGift = window.localStorage.getItem("gvs-local-pass-v2");
    if (savedGift) {
      try {
        const parsed = JSON.parse(savedGift) as { index: number; code: string };
        if (parsed.index >= 0 && parsed.index < gifts.length) {
          setGiftIndex(parsed.index);
          setGiftCode(parsed.code);
          setWheelRotation(2160 + (360 - (parsed.index * 60 + 30)));
        }
      } catch { /* ignore an invalid local value */ }
    }
  }, []);

  useEffect(() => {
    if (!guideOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGuideOpen(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.setTimeout(() => guidePanelRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [guideOpen]);

  useEffect(() => {
    let active = true;

    const loadExchangeRates = async () => {
      const feeds = [
        {
          url: "https://api.exchangerate.fun/latest?base=USD",
          source: "ExchangeRate.fun",
          sourceUrl: "https://www.exchangerate.fun/",
          sourceCadence: "источник обновляется каждый час",
          parse: (data: { timestamp?: number; rates?: Record<string, number> }) => ({
            rates: data.rates,
            updatedAt: new Date((data.timestamp ?? Date.now() / 1000) * 1000).toISOString(),
          }),
        },
        {
          url: "https://open.er-api.com/v6/latest/USD",
          source: "ExchangeRate-API",
          sourceUrl: "https://www.exchangerate-api.com",
          sourceCadence: "резервный источник обновляется ежедневно",
          parse: (data: { time_last_update_unix?: number; rates?: Record<string, number> }) => ({
            rates: data.rates,
            updatedAt: new Date((data.time_last_update_unix ?? Date.now() / 1000) * 1000).toISOString(),
          }),
        },
      ] as const;

      for (const feed of feeds) {
        try {
          const response = await fetch(feed.url, { cache: "no-store" });
          if (!response.ok) continue;
          const parsed = feed.parse(await response.json() as never);
          if (!parsed.rates?.VND || !parsed.rates.EUR || !parsed.rates.RUB) continue;
          const vnd = parsed.rates.VND;
          if (!active) return;
          setExchangeRates({
            values: {
              USD: vnd,
              EUR: vnd / parsed.rates.EUR,
              RUB: vnd / parsed.rates.RUB,
            },
            updatedAt: parsed.updatedAt,
            checkedAt: new Date().toISOString(),
            source: feed.source,
            sourceUrl: feed.sourceUrl,
            sourceCadence: feed.sourceCadence,
            status: "live",
          });
          return;
        } catch {
          // Try the reserve feed below.
        }
      }

      if (active) setExchangeRates((current) => ({ ...current, status: "cached", checkedAt: new Date().toISOString() }));
    };

    void loadExchangeRates();
    const refreshTimer = window.setInterval(loadExchangeRates, 5 * 60 * 1000);
    return () => {
      active = false;
      window.clearInterval(refreshTimer);
    };
  }, []);

  const moveScene = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
    event.currentTarget.style.setProperty("--mx", `${x}`);
    event.currentTarget.style.setProperty("--my", `${y}`);
    event.currentTarget.style.setProperty("--spot-x", `${Math.max(0, Math.min(100, (x + 1) * 50))}%`);
    event.currentTarget.style.setProperty("--spot-y", `${Math.max(0, Math.min(100, (y + 1) * 50))}%`);
  };

  const getPointerAngle = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = wheelRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    return Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2)) * 180 / Math.PI;
  };

  const spinWheel = (gestureBoost = 0) => {
    if (spinning || giftIndex !== null) return;
    const random = new Uint32Array(1);
    window.crypto.getRandomValues(random);
    const selected = random[0] % gifts.length;
    const current = wheelRotation;
    const normalized = ((current % 360) + 360) % 360;
    const landingAngle = (360 - (selected * 60 + 30)) % 360;
    const correction = (landingAngle - normalized + 360) % 360;
    const rotation = current + (6 + Math.min(3, Math.floor(Math.abs(gestureBoost) / 55))) * 360 + correction;
    setSpinning(true);
    setDraggingWheel(false);
    setWheelRotation(rotation);
    if ("vibrate" in navigator) navigator.vibrate(18);
    window.setTimeout(() => {
      const code = `LP27-${gifts[selected].code}-${String(random[0]).slice(-4).padStart(4, "0")}`;
      setGiftIndex(selected);
      setGiftCode(code);
      setSpinning(false);
      if ("vibrate" in navigator) navigator.vibrate([35, 35, 90]);
      window.localStorage.setItem("gvs-local-pass-v2", JSON.stringify({ index: selected, code }));
    }, 4300);
  };

  const startWheelDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (spinning || giftIndex !== null) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { startAngle: getPointerAngle(event), startRotation: wheelRotation, lastRotation: wheelRotation };
    setDraggingWheel(true);
  };

  const moveWheelDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || spinning || giftIndex !== null) return;
    const delta = getPointerAngle(event) - dragRef.current.startAngle;
    const next = dragRef.current.startRotation + delta;
    dragRef.current.lastRotation = next;
    setWheelRotation(next);
  };

  const endWheelDrag = () => {
    if (!dragRef.current) return;
    const boost = dragRef.current.lastRotation - dragRef.current.startRotation;
    dragRef.current = null;
    setDraggingWheel(false);
    if (Math.abs(boost) > 8) spinWheel(boost);
  };

  const claimGift = () => {
    if (giftIndex === null) return;
    setChatMessages((current) => [
      ...current,
      { from: "guest", text: `Активировать подарок ${giftCode}` },
      { from: "ai", text: `Ваш цифровой паспорт найден: ${gifts[giftIndex].title}. Код ${giftCode} сохранён. Я помогу проверить условия и передать запрос местной команде без повторного ввода данных.` },
    ]);
    setAiOpen(true);
  };

  const askAssistant = (choice: AssistantChoice) => {
    const selected = assistantChoices.find((item) => item.id === choice)!;
    const responses: Record<AssistantChoice, string> = {
      plan: "Соберу маршрут без перегрузки. Напишите в Instagram AI даты, город проживания и кто путешествует — Kaka продолжит с уже понятной задачей.",
      tour: "Начнём с главного: выберите карточку ниже. Каждая открывает отдельный практический гид — с советами, проверками и ошибками, которых лучше избежать.",
      gift: giftIndex === null ? "Сначала запустите колесо подарков выше. Один смартфон и одна туристическая группа получают один шанс." : `Ваш подарок: ${gifts[giftIndex].title}. Код ${giftCode}. Для финального подтверждения подключу Kaka AI или местную команду.`,
      human: "Живой специалист GoVietStay доступен 24/7. Перейдите в WhatsApp — код Local Point будет добавлен автоматически.",
    };
    setChatMessages((current) => [...current, { from: "guest", text: selected.label }, { from: "ai", text: responses[choice] }]);
    if (choice === "tour") {
      setAiOpen(false);
      window.setTimeout(() => document.getElementById(window.innerWidth <= 600 ? "mobile-paths" : "choose")?.scrollIntoView({ behavior: "smooth" }), 120);
    }
  };

  const openHumanSupport = () => {
    const giftLine = giftIndex !== null ? `\nПодарок: ${gifts[giftIndex].title}\nКод: ${giftCode}` : "";
    const message = `Здравствуйте, GoVietStay! Я пришёл из Local Point ${ref}.${giftLine}\nМне нужна помощь специалиста.`;
    window.open(`https://wa.me/84937762607?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const activeGuide = guideOpen ? serviceGuides[guideOpen] : null;
  const activeService = guideOpen ? services.find((service) => service.key === guideOpen) ?? null : null;

  return (
    <main className="localPointRoot" data-release="local-point-v24">
      <section className="mobileAdventure" aria-label="Путешествие с GoVietStay">
        <div className="adventureAurora auroraOne" />
        <div className="adventureAurora auroraTwo" />
        <div className="starField"><i/><i/><i/><i/><i/><i/></div>

        <nav className="mobileNav">
          <div className="mobileBrand"><img src="/local-point/govietstay-logo.jpg" alt="GoVietStay"/><span>GoVietStay<small>LOCAL POINT · ДЛЯ ПУТЕШЕСТВИЙ</small></span></div>
          <button className="ruPulse" onClick={() => setAiOpen(true)}><i/>ИИ НА СВЯЗИ</button>
        </nav>

        <div className="adventureIntro">
          <p><span>✦</span> УМНАЯ ТОЧКА ДЛЯ ПУТЕШЕСТВИЙ</p>
          <h1>Вьетнам<br/><em>под тебя</em></h1>
        </div>

        <div className="mobileWorld">
          <Vietnam3DMap id="mobile-map" compact />
        </div>

        <div className="adventureAction">
          <p>Не витрина экскурсий.<br/><b>Ваш персональный помощник во Вьетнаме.</b></p>
          <button onClick={() => document.getElementById("gift-wheel")?.scrollIntoView({behavior:"smooth"})}>
            <span>ОТКРЫТЬ МОЙ ПАСПОРТ</span><b>↗</b>
          </button>
          <div className="swipeHint"><i/>ПРОВЕДИ ВВЕРХ</div>
        </div>
      </section>

      <section className="mobilePaths" id="mobile-paths">
        <div className="pathTop">
          <span>ШАГ 01 / 02</span>
          <img src="/local-point/govietstay-logo.jpg" alt="GoVietStay"/>
        </div>
        <p className="pathKicker">ВЫБЕРИ СВОЙ ПУТЬ</p>
        <h2>Куда ведёт твоё<br/><em>приключение?</em></h2>
        <p className="pathLead">Нажмите карточку: внутри — отдельный практический гид, полезные советы и ошибки, которых лучше избежать.</p>

        <div className="mobileDestinationRail" aria-label="Направления GoVietStay">
          {destinations.map((destination) => <a key={destination.label} href={destination.href}>{destination.label}<b>↗</b></a>)}
        </div>

        <div className="adventureRail">
          {services.map((service, index) => (
            <button className={`adventureCard card${index + 1}`} key={`mobile-${service.key}`} type="button" onClick={() => setGuideOpen(service.key)} aria-haspopup="dialog" aria-controls="service-knowledge-guide">
              <span className="cardIndex">0{index + 1}</span>
              <ServiceVisual serviceKey={service.key} rates={exchangeRates}/>
              <div className="cardWords"><small>ПРАКТИЧЕСКИЙ ГИД</small><strong>{service.title}</strong><p>{service.subtitle}</p></div>
              <span className="cardTopics">{service.tags.map((tag) => <i key={tag}>{tag}</i>)}</span>
              <span className="cardGo">{service.guideLabel} <b>↗</b></span>
            </button>
          ))}
          <a className="adventureCard comboAdventureCard" href={nhaTrangCombo.href}>
            <span className="cardIndex">КОМБО 05</span>
            <div className="cardPlanet"><i>НТ</i><span/><b/></div>
            <div className="cardWords"><small>СПЕЦИАЛЬНЫЙ МАРШРУТ</small><strong>Из Нячанга<br/>в Дананг</strong><p>Готовые поездки на 2–5 дней: транспорт, отель и экскурсии.</p></div>
            <span className="cardGo">СМОТРЕТЬ ПРОГРАММУ <b>↗</b></span>
          </a>
          <div className="railEnd"><img src="/local-point/govietstay-logo.jpg" alt="GoVietStay"/><p>Мы рядом.<br/><b>На каждом шаге.</b></p></div>
        </div>
        <ExchangeRatePanel rates={exchangeRates} compact/>
        <div className="dragTip"><span>←</span> ЛИСТАЙ <span>→</span></div>
        <div className="mobilePromise"><span>24/7</span><p>Поддержка на русском<br/>во время путешествия</p><i>✦</i></div>
      </section>

      <section className="heroStage">
        <nav className="topbar">
          <a className="brand" href="#top" aria-label="Главная GoVietStay">
            <img src="/local-point/govietstay-logo.jpg" alt="Официальный логотип GoVietStay" />
            <span><b>GoVietStay</b><small>НАДЁЖНАЯ МЕСТНАЯ ПОДДЕРЖКА</small></span>
          </a>
          <button className="live" onClick={() => setAiOpen(true)}><i /> Kaka AI • НА СВЯЗИ</button>
        </nav>

        <div className="heroGrid" id="top">
          <div className="heroCopy">
            <p className="kicker"><span>LOCAL POINT</span><i /> ВЬЕТНАМ • 2027</p>
            <h1>Вьетнам.<br/><em>Настроен под вас.</em></h1>
            <p className="lead">ИИ-маршрут, умные подарки и живая местная поддержка — в одном цифровом паспорте путешествия.</p>
            <button className="discover" onClick={() => document.getElementById("gift-wheel")?.scrollIntoView({behavior:"smooth"})}>
              Открыть мой паспорт <span>↓</span>
            </button>
            <div className="microTrust">
              <span><b>Kaka AI</b> умный первый шаг</span><i/><span><b>Подарки</b> реальная польза</span><i/><span><b>24/7</b> живая команда</span>
            </div>
          </div>

          <div className="heroVisual heroNatureOverlay" aria-label="Путешествия, технологии и природа GoVietStay" onMouseMove={moveScene} onMouseLeave={(e) => {e.currentTarget.style.setProperty("--mx","0");e.currentTarget.style.setProperty("--my","0");e.currentTarget.style.setProperty("--spot-x","52%");e.currentTarget.style.setProperty("--spot-y","42%")}}>
            <Vietnam3DMap id="desktop-map" />
            <div className="floatingCard guideCard"><span className="avatar">K</span><div><small>МЕСТНЫЕ ЗНАНИЯ</small><b>Kaka AI уже на связи</b></div><i /></div>
          </div>
        </div>

        <div className="marquee" aria-label="Направления GoVietStay">
          {destinations.map((destination, index) => (
            <span className="marqueeItem" key={destination.label}>
              <a href={destination.href}>{destination.label}<b>↗</b></a>
              {index < destinations.length - 1 && <i aria-hidden="true">✦</i>}
            </span>
          ))}
        </div>
      </section>

      <section className="giftWheelSection" id="gift-wheel">
        <div className="giftDust"><i/><i/><i/><i/><i/></div>
        <div className="giftCopy">
          <p className="giftKicker"><span>01</span> ПОДАРКИ • ОНЛАЙН</p>
          <h2>Запустите колесо.<br/><em>Получите реальную пользу.</em></h2>
          <p className="giftLead">eSIM для одной туристической группы, ваучер 150 000 VND, ИИ-маршрут и другие преимущества внутри вашего цифрового паспорта.</p>
          <div className="giftRules"><span><b>01</b>Один смартфон</span><span><b>02</b>Одна группа</span><span><b>03</b>Реальный код</span></div>
          {giftIndex !== null && (
            <div className="giftResult" aria-live="polite">
              <div className="confetti" aria-hidden="true">{Array.from({length:18}).map((_,i)=><i key={i} style={{"--i":i} as React.CSSProperties}/>)}</div>
              <span>{gifts[giftIndex].icon}</span>
              <div><small>ДОБАВЛЕНО В ВАШ ПАСПОРТ</small><b>{gifts[giftIndex].title}</b><p>{gifts[giftIndex].value}</p><code>{giftCode}</code></div>
              <button onClick={claimGift}>АКТИВИРОВАТЬ С KAKA AI ↗</button>
            </div>
          )}
        </div>

        <div className="wheelStage">
          <div className="floatingGift giftBoxOne">✦</div>
          <div className="floatingGift giftBoxTwo">?</div>
          <div className="wheelPointer"><i/></div>
          <div className={`wheelOuter ${draggingWheel ? "isDragging" : ""}`} ref={wheelRef} onPointerDown={startWheelDrag} onPointerMove={moveWheelDrag} onPointerUp={endWheelDrag} onPointerCancel={endWheelDrag}>
            <div className="wheelLights">{Array.from({length:18}).map((_,i)=><i key={i} style={{"--i":i} as React.CSSProperties}/>)}</div>
            <div className={`prizeWheel ${spinning ? "isSpinning" : ""} ${draggingWheel ? "isDragging" : ""}`} style={{transform:`rotate(${wheelRotation}deg)`}}>
              {gifts.map((gift,index)=>(
                <div className={`wheelLabel wheelLabel${index + 1}`} key={gift.short}><span>{gift.icon}</span><b>{gift.short}</b></div>
              ))}
            </div>
            <button className="spinButton" onPointerDown={(event)=>event.stopPropagation()} onClick={() => spinWheel()} disabled={spinning || giftIndex !== null} aria-label="Вращать колесо подарков">
              <span>{spinning ? "…" : giftIndex !== null ? "✓" : "СТАРТ"}</span><small>{spinning ? "ЖДИТЕ" : giftIndex !== null ? "ГОТОВО" : "КРУТИТЬ"}</small>
            </button>
          </div>
          <p className="wheelGesture">↻ ПРОВЕДИТЕ ПО КОЛЕСУ ИЛИ НАЖМИТЕ «СТАРТ»</p>
          <p className="wheelNote">{giftIndex === null ? "ОДИН ШАНС ДЛЯ ОДНОЙ ТУРИСТИЧЕСКОЙ ГРУППЫ" : "ПОДАРОК СОХРАНЁН В ВАШЕМ ПАСПОРТЕ"}</p>
        </div>
      </section>

      <section className="experience" id="choose">
        <div className="sectionHead">
          <div><p className="sectionKicker">03 • МЕСТНЫЕ ЗНАНИЯ GOVIETSTAY</p><h2>Коротко. Полезно.<br/>Без туристических ошибок.</h2></div>
          <p>Каждая карточка открывает свой практический гид: что проверить, какой совет действительно важен и каких ошибок лучше избежать.</p>
        </div>

        <div className="serviceDeck">
          {services.map((service) => (
            <button className="serviceTile" key={service.key} type="button" onClick={() => setGuideOpen(service.key)} style={{"--accent":service.accent} as React.CSSProperties} aria-haspopup="dialog" aria-controls="service-knowledge-guide">
              <span className="tileNo">{service.no}</span>
              <ServiceVisual serviceKey={service.key} rates={exchangeRates}/>
              <span className="tileCopy"><b>{service.title}</b><small>{service.subtitle}</small></span>
              <span className="tileTopics">{service.tags.map((tag) => <i key={tag}>{tag}</i>)}</span>
              <span className="tileArrow"><small>{service.guideLabel}</small> ↗</span>
            </button>
          ))}
        </div>

        <ExchangeRatePanel rates={exchangeRates}/>

        <a className="nhaTrangCombo" href={nhaTrangCombo.href}>
          <span className="comboRoute" aria-hidden="true"><i>НЯЧАНГ</i><b>→</b><i>ДАНАНГ</i></span>
          <span className="comboCopy"><small>СПЕЦИАЛЬНЫЙ КОМБО • 2–5 ДНЕЙ</small><b>Из Нячанга в Дананг</b><p>Транспорт, отель и лучшие маршруты Центрального Вьетнама — в одной готовой поездке.</p></span>
          <span className="comboGo">Смотреть программу <b>↗</b></span>
        </a>

        <div className="storyStrip">
          <div className="storyMap"><span className="mapLine"/><b className="dot d1">ДН</b><b className="dot d2">ХА</b><b className="dot d3">ХЮЭ</b><p>Один контакт.<br/>Весь Центральный Вьетнам.</p></div>
          <div className="storyQuote"><span>“</span><p>Не просто экскурсия.<br/><b>Надёжный друг во Вьетнаме.</b></p></div>
          <div className="storyStats"><b>100%</b><p>живые люди,<br/>местная команда</p><small>GO VIET STAY • 2026</small></div>
        </div>
      </section>

      <section className="socialUniverse" id="contacts">
        <div className="socialUniverseGlow" />
        <div className="socialIntro">
          <p><span>04</span> ВСЕ КАНАЛЫ СВЯЗИ</p>
          <h2>Все каналы.<br/><em>Один Local Point.</em></h2>
          <div className="socialIntroCopy">
            <p>Выберите привычный способ связи. Kaka AI помогает мгновенно, а местная команда GoVietStay остаётся рядом 24/7.</p>
            <span><i/> НА СВЯЗИ • ВЬЕТНАМ</span>
          </div>
        </div>
        <div className="contactGrid">
          {contactLinks.map((link) => {
            const ContactIcon = contactIconMap[link.icon];
            return (
              <a
                className={link.featured ? "contactCard isFeatured" : "contactCard"}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                key={link.name}
                style={{ "--contact-accent": link.accent } as CSSProperties}
              >
                <span className="contactIcon" aria-hidden="true">
                  <span className="contactOrbit" />
                  <ContactIcon strokeWidth={1.8} />
                  <small>{link.badge}</small>
                </span>
                <span className="contactWords"><b>{link.name}</b><small>{link.detail}</small></span>
                <span className="contactArrow" aria-hidden="true"><Navigation strokeWidth={1.8} /></span>
              </a>
            );
          })}
        </div>
        <div className="socialSignature">
          <img src="/local-point/govietstay-logo.jpg" alt="Официальный логотип GoVietStay"/>
          <div><b>GoVietStay</b><span>Надёжная местная поддержка • Вьетнам</span></div>
          <p>Дананг • Хойан • Хюэ • Фукуок • Хо Трам<br/><small>LOCAL POINT V24 • {ref}</small></p>
        </div>
      </section>

      <button className="aiLauncher" onClick={() => setAiOpen(true)} aria-label="Открыть Kaka AI">
        <span className="aiLauncherOrb">K</span><span><b>Kaka AI</b><small>цифровой проводник</small></span><i>↗</i>
      </button>

      <button
        className={`musicLauncher ${musicOpen ? "isPlaying" : ""}`}
        onClick={() => setMusicOpen((current) => !current)}
        aria-expanded={musicOpen}
        aria-controls="russian-music-player"
        aria-label={musicOpen ? "Остановить русскую музыку" : "Включить русскую музыку"}
      >
        <span className="musicLauncherOrb">♫</span>
        <span><b>{musicOpen ? "МУЗЫКА ИГРАЕТ" : "РУССКАЯ МУЗЫКА"}</b><small>настроение путешествия</small></span>
        <i>{musicOpen ? "■" : "▶"}</i>
      </button>

      {activeGuide && activeService && (
        <div className="guideBackdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setGuideOpen(null); }}>
          <section
            className="knowledgeGuide"
            id="service-knowledge-guide"
            role="dialog"
            aria-modal="true"
            aria-labelledby="knowledge-guide-title"
            tabIndex={-1}
            ref={guidePanelRef}
            style={{"--guide-accent":activeService.accent} as React.CSSProperties}
          >
            <header className="knowledgeTopbar">
              <span><i/>{activeService.no} • МЕСТНЫЕ ЗНАНИЯ</span>
              <b>ПРАКТИЧЕСКИЙ ГИД GOVIETSTAY</b>
              <button type="button" onClick={() => setGuideOpen(null)} aria-label="Закрыть практический гид">×</button>
            </header>

            <div className="knowledgeLayout">
              <aside className="knowledgeIntro">
                <ServiceVisual serviceKey={activeService.key} rates={exchangeRates}/>
                <small>{activeGuide.eyebrow}</small>
                <h2 id="knowledge-guide-title">{activeGuide.title}</h2>
                <p>{activeGuide.lead}</p>
                <div className="knowledgePrinciple"><span>✦</span><div><small>ГЛАВНЫЙ ПРИНЦИП</small><b>{activeGuide.principle}</b></div></div>
              </aside>

              <div className="knowledgeBody">
                <section className="checkSection">
                  <header><span>01</span><div><small>ПРОВЕРЬТЕ ПЕРЕД РЕШЕНИЕМ</small><h3>Три вещи, которые действительно важны</h3></div></header>
                  <div className="knowledgeFacts">
                    {activeGuide.facts.map((fact) => (
                      <article key={fact.no}><span>{fact.no}</span><b>{fact.title}</b><p>{fact.text}</p></article>
                    ))}
                  </div>
                </section>

                <section className="mistakeSection">
                  <header><span>!</span><div><small>НЕ ПОВТОРЯЙТЕ</small><h3>Частые ошибки путешественников</h3></div></header>
                  <ul>{activeGuide.mistakes.map((mistake) => <li key={mistake}><i>×</i>{mistake}</li>)}</ul>
                  <p className="fieldNote"><b>МЕСТНЫЙ СОВЕТ</b>{activeGuide.note}</p>
                </section>

                <footer className="knowledgeActions">
                  <a href={activeGuide.ctaHref} target="_blank" rel="noreferrer">{activeGuide.ctaLabel}<b>↗</b></a>
                  <button type="button" onClick={() => setGuideOpen(null)}>Вернуться к карточкам</button>
                </footer>
              </div>
            </div>
          </section>
        </div>
      )}

      {musicOpen && (
        <aside className="musicPlayer" id="russian-music-player" aria-label="Русский музыкальный плеер">
          <header>
            <span className="musicDisc">♫</span>
            <div><small>GO VIET STAY • РУССКОЕ НАСТРОЕНИЕ</small><b>А я иду, шагаю по Москве</b><p>Лёгкая классика для начала путешествия</p></div>
            <button onClick={() => setMusicOpen(false)} aria-label="Закрыть музыкальный плеер">×</button>
          </header>
          <div className="musicFrame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${RUSSIAN_MUSIC_VIDEO_ID}?autoplay=1&loop=1&playlist=${RUSSIAN_MUSIC_VIDEO_ID}&rel=0&modestbranding=1`}
              title="А я иду, шагаю по Москве — Киноконцерн Мосфильм"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          <a href={RUSSIAN_MUSIC_URL} target="_blank" rel="noreferrer">Официальное видео • Мосфильм ↗</a>
        </aside>
      )}

      {aiOpen && (
        <div className="aiBackdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setAiOpen(false); }}>
          <section className="aiPanel" role="dialog" aria-modal="true" aria-labelledby="kaka-ai-title">
            <header>
              <div className="aiIdentity"><span>K</span><div><b id="kaka-ai-title">Kaka AI</b><small><i/> МЕСТНЫЙ ПОМОЩНИК • НА СВЯЗИ</small></div></div>
              <button onClick={() => setAiOpen(false)} aria-label="Закрыть Kaka AI">×</button>
            </header>
            <div className="aiContext"><span>LOCAL POINT</span><b>{ref}</b><i>{giftIndex !== null ? `ПАСПОРТ • ${giftCode}` : "ПАСПОРТ • ГОТОВ"}</i></div>
            <div className="aiMessages" aria-live="polite">
              {chatMessages.map((message,index)=><p className={message.from} key={`${message.from}-${index}`}>{message.text}</p>)}
            </div>
            <div className="aiChoices">
              {assistantChoices.map((choice)=><button key={choice.id} onClick={() => askAssistant(choice.id)}><span>{choice.icon}</span>{choice.label}</button>)}
            </div>
            <div className="aiHandoff">
              <a href={KAKA_AI_URL} target="_blank" rel="noreferrer"><span>◎</span><b>Продолжить с Kaka AI</b><i>↗</i></a>
              <button onClick={openHumanSupport}><span>◌</span><b>Живой специалист 24/7</b><i>↗</i></button>
            </div>
            <p className="aiDisclosure">Kaka AI помогает с первым шагом. Бронирования и подарки подтверждает команда GoVietStay.</p>
          </section>
        </div>
      )}
    </main>
  );
}
