"use client";

import { FormEvent, MouseEvent, PointerEvent as ReactPointerEvent, useEffect, useMemo, useRef, useState } from "react";
import vietnamMap from "./vietnam-map";

type ServiceKey = "tour" | "transfer" | "essentials" | "support";

const services: Array<{key: ServiceKey; no: string; icon: string; title: string; subtitle: string; accent: string}> = [
  { key: "tour", no: "01", icon: "✦", title: "Экскурсии", subtitle: "Лучшие места без лишних хлопот", accent: "#ffad29" },
  { key: "transfer", no: "02", icon: "↗", title: "Трансфер", subtitle: "Встретим и доставим с комфортом", accent: "#4fd0a5" },
  { key: "essentials", no: "03", icon: "◎", title: "SIM и валюта", subtitle: "Будьте на связи с первого дня", accent: "#6f9cff" },
  { key: "support", no: "04", icon: "◌", title: "Помощь 24/7", subtitle: "Местная команда говорит по-русски", accent: "#ff7b72" },
];

const serviceLabels: Record<ServiceKey, string> = {
  tour: "экскурсия",
  transfer: "трансфер",
  essentials: "SIM-карта или обмен валюты",
  support: "помощь во Вьетнаме",
};

const gifts = [
  { icon: "e", short: "eSIM", title: "Бесплатная туристическая eSIM", value: "1 eSIM для одной группы", code: "ESIM" },
  { icon: "₫", short: "150K", title: "Ваучер 150 000 VND", value: "на экскурсию GoVietStay", code: "V150" },
  { icon: "AI", short: "AI-план", title: "Персональный AI-маршрут", value: "план поездки под ваши даты", code: "AIP" },
  { icon: "★", short: "Priority", title: "Приоритетная поддержка 24/7", value: "быстрый ответ местной команды", code: "VIP" },
  { icon: "↗", short: "Transfer", title: "Скидка 10% на трансфер", value: "встреча в аэропорту", code: "TR10" },
  { icon: "⌖", short: "Hidden", title: "Карта секретных мест", value: "локальная подборка GoVietStay", code: "MAP" },
];

const assistantChoices = [
  { id: "plan", label: "План на 3 дня", icon: "✦" },
  { id: "tour", label: "Подобрать экскурсию", icon: "⌖" },
  { id: "gift", label: "Активировать подарок", icon: "₫" },
  { id: "human", label: "Нужен человек", icon: "◌" },
] as const;

type AssistantChoice = typeof assistantChoices[number]["id"];
type ChatMessage = { from: "ai" | "guest"; text: string };

const KAKA_AI_URL = "https://aistudio.instagram.com/ai/1057504343330006/?utm_source=mshare";
const RUSSIAN_MUSIC_VIDEO_ID = "4wKXhKwuqrQ";
const RUSSIAN_MUSIC_URL = `https://www.youtube.com/watch?v=${RUSSIAN_MUSIC_VIDEO_ID}`;

const mapLocations = vietnamMap.locations.filter((location) => !["hoangsa", "truongsa"].includes(location.id));
const featuredMapRegions = new Set(["danang", "quangnam", "tthue", "kiengiang", "baria"]);
const hoangSa = vietnamMap.locations.find((location) => location.id === "hoangsa")!;
const truongSa = vietnamMap.locations.find((location) => location.id === "truongsa")!;

function Vietnam3DMap({ id, compact = false }: { id: string; compact?: boolean }) {
  const shapeId = `${id}-vietnam-shape`;
  const gradientId = `${id}-vietnam-gradient`;
  const glowId = `${id}-vietnam-glow`;

  return (
    <div className={`vietnamMap3d ${compact ? "isCompact" : ""}`} aria-label="3D map of Vietnam with GoVietStay locations and the Hoang Sa and Truong Sa archipelagos">
      <div className="mapNameplate"><small>GO VIET STAY • 2027</small><b>VIETNAM LOCAL NETWORK</b><span><i/> 3 РЕГИОНА ONLINE</span></div>
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
      <div className="mapLocation centralLocation"><span/><b>MIỀN TRUNG</b><small>ĐÀ NẴNG • HỘI AN • HUẾ</small></div>
      <div className="mapLocation phuQuocLocation"><span/><b>PHÚ QUỐC</b><small>ISLAND LOCAL POINT</small></div>
      <div className="mapLocation hoTramLocation"><span/><b>HỒ TRÀM</b><small>COAST LOCAL POINT</small></div>
      <div className="islandSovereignty" aria-label="Hoang Sa and Truong Sa archipelagos of Vietnam">
        <div className="islandHeading"><span>VN</span><div><small>ОСТРОВА ВЬЕТНАМА</small><b>ХОАНГША • ЧЫОНГША</b></div></div>
        <div className="islandMaps">
          <div className="islandUnit">
            <svg viewBox="515 360 120 100" role="img" aria-label="Архипелаг Хоангша"><path d={hoangSa.path}/></svg>
            <span><b>ХОАНГША</b><small>HOÀNG SA</small></span>
          </div>
          <div className="islandUnit">
            <svg viewBox="360 625 470 265" role="img" aria-label="Архипелаг Чыонгша"><path d={truongSa.path}/></svg>
            <span><b>ЧЫОНГША</b><small>TRƯỜNG SA</small></span>
          </div>
        </div>
        <p>ХОАНГША И ЧЫОНГША — <b>НЕОТЪЕМЛЕМАЯ ЧАСТЬ ТЕРРИТОРИИ ВЬЕТНАМА</b></p>
      </div>
      <a className="mapCredit" href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/vietnam" target="_blank" rel="noreferrer">MAP • SVG MAPS VIETNAM • CC BY 4.0</a>
    </div>
  );
}

const contactLinks = [
  { icon: "AI", name: "Kaka AI", detail: "Ваш AI-проводник", href: KAKA_AI_URL, featured: true },
  { icon: "WA", name: "WhatsApp", detail: "+84 937 762 607", href: "https://wa.me/84937762607", featured: true },
  { icon: "IG", name: "Instagram", detail: "@govietstay", href: "https://www.instagram.com/govietstay/" },
  { icon: "TG", name: "Telegram", detail: "@GoVietStay", href: "https://t.me/GoVietStay" },
  { icon: "FB", name: "Facebook", detail: "GoVietStay", href: "https://www.facebook.com/share/19XQiocsh3/?mibextid=wwXIfr" },
  { icon: "TT", name: "TikTok", detail: "@trongthang.tran2607", href: "https://www.tiktok.com/@trongthang.tran2607?_r=1&_t=ZS-98higNIgkC4" },
  { icon: "YT", name: "YouTube", detail: "@govietstay", href: "https://www.youtube.com/@govietstay" },
  { icon: "X", name: "X / Twitter", detail: "@Thangtran267", href: "https://x.com/Thangtran267" },
  { icon: "IN", name: "LinkedIn", detail: "GoVietStay", href: "https://www.linkedin.com/company/govietstay/" },
  { icon: "TR", name: "Truth Social", detail: "@GoVietStay", href: "https://truthsocial.com/@GoVietStay" },
  { icon: "Z", name: "Zalo", detail: "+84 937 762 607", href: "https://zalo.me/84937762607" },
  { icon: "G", name: "Google Reviews", detail: "Отзывы гостей", href: "https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic" },
  { icon: "WEB", name: "GoVietStay.com", detail: "Русская версия", href: "https://GoVietStay.com/ru" },
  { icon: "π", name: "Pi Community", detail: "Travel ecosystem", href: "https://govietstay.base44.app/" },
];

export default function Home() {
  const [ref, setRef] = useState("LOCAL-POINT");
  const [active, setActive] = useState<ServiceKey | null>(null);
  const [name, setName] = useState("");
  const [hotel, setHotel] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [wheelRotation, setWheelRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [draggingWheel, setDraggingWheel] = useState(false);
  const [giftIndex, setGiftIndex] = useState<number | null>(null);
  const [giftCode, setGiftCode] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { from: "ai", text: "Здравствуйте! Я Kaka — цифровой проводник GoVietStay. Помогу выбрать маршрут, активировать подарок или подключить местную команду." },
  ]);
  const wheelRef = useRef<HTMLDivElement | null>(null);
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

  const activeService = useMemo(() => services.find((item) => item.key === active), [active]);

  const moveScene = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
    event.currentTarget.style.setProperty("--mx", `${x}`);
    event.currentTarget.style.setProperty("--my", `${y}`);
    event.currentTarget.style.setProperty("--spot-x", `${Math.max(0, Math.min(100, (x + 1) * 50))}%`);
    event.currentTarget.style.setProperty("--spot-y", `${Math.max(0, Math.min(100, (y + 1) * 50))}%`);
  };

  const sendRequest = (event: FormEvent) => {
    event.preventDefault();
    if (!active) return;
    const message = [
      "Здравствуйте, GoVietStay!",
      `Мне нужна: ${serviceLabels[active]}.`,
      name && `Имя: ${name}`,
      hotel && `Отель / район: ${hotel}`,
      date && `Дата: ${date}`,
      details && `Детали: ${details}`,
      `Код Local Point: ${ref}`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/84937762607?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
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
      { from: "ai", text: `Ваш Local Pass найден: ${gifts[giftIndex].title}. Код ${giftCode} сохранён. Я помогу проверить условия и передать запрос местной команде без повторного ввода данных.` },
    ]);
    setAiOpen(true);
  };

  const askAssistant = (choice: AssistantChoice) => {
    const selected = assistantChoices.find((item) => item.id === choice)!;
    const responses: Record<AssistantChoice, string> = {
      plan: "Соберу маршрут без перегрузки. Напишите в Instagram AI даты, город проживания и кто путешествует — Kaka продолжит с уже понятной задачей.",
      tour: "Начнём с главного: выберите направление ниже, укажите дату и количество гостей. Local Point подготовит заявку для русскоязычной команды.",
      gift: giftIndex === null ? "Сначала запустите Smart Wheel выше. Один смартфон и одна туристическая группа получают один шанс." : `Ваш подарок: ${gifts[giftIndex].title}. Код ${giftCode}. Для финального подтверждения подключу Instagram AI или местную команду.`,
      human: "Живой специалист GoVietStay доступен 24/7. Перейдите в WhatsApp — код Local Point будет добавлен автоматически.",
    };
    setChatMessages((current) => [...current, { from: "guest", text: selected.label }, { from: "ai", text: responses[choice] }]);
    if (choice === "tour") setActive("tour");
  };

  const openHumanSupport = () => {
    const giftLine = giftIndex !== null ? `\nПодарок: ${gifts[giftIndex].title}\nКод: ${giftCode}` : "";
    const message = `Здравствуйте, GoVietStay! Я пришёл из Local Point ${ref}.${giftLine}\nМне нужна помощь специалиста.`;
    window.open(`https://wa.me/84937762607?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="localPointRoot">
      <section className="mobileAdventure" aria-label="GoVietStay adventure">
        <div className="adventureAurora auroraOne" />
        <div className="adventureAurora auroraTwo" />
        <div className="starField"><i/><i/><i/><i/><i/><i/></div>

        <nav className="mobileNav">
          <div className="mobileBrand"><img src="/govietstay-logo.jpg" alt="GoVietStay"/><span>GoVietStay<small>LOCAL POINT · TRAVEL OS</small></span></div>
          <button className="ruPulse" onClick={() => setAiOpen(true)}><i/>AI ON</button>
        </nav>

        <div className="adventureIntro">
          <p><span>✦</span> УМНАЯ ТОЧКА ДЛЯ ПУТЕШЕСТВИЙ</p>
          <h1>Вьетнам<br/><em>под тебя</em></h1>
        </div>

        <div className="mobileWorld">
          <Vietnam3DMap id="mobile-map" compact />
        </div>

        <div className="adventureAction">
          <p>Не витрина экскурсий.<br/><b>Ваш персональный Travel OS.</b></p>
          <button onClick={() => document.getElementById("gift-wheel")?.scrollIntoView({behavior:"smooth"})}>
            <span>ЗАПУСТИТЬ LOCAL PASS</span><b>↗</b>
          </button>
          <div className="swipeHint"><i/>ПРОВЕДИ ВВЕРХ</div>
        </div>
      </section>

      <section className="mobilePaths" id="mobile-paths">
        <div className="pathTop">
          <span>ШАГ 01 / 02</span>
          <img src="/govietstay-logo.jpg" alt="GoVietStay"/>
        </div>
        <p className="pathKicker">ВЫБЕРИ СВОЙ ПУТЬ</p>
        <h2>Куда ведёт твоё<br/><em>приключение?</em></h2>
        <p className="pathLead">Листай карточки и выбери то, что нужно прямо сейчас.</p>

        <div className="adventureRail">
          {services.map((service, index) => (
            <button className={`adventureCard card${index + 1}`} key={`mobile-${service.key}`} onClick={() => setActive(service.key)}>
              <span className="cardIndex">0{index + 1}</span>
              <div className="cardPlanet"><i>{service.icon}</i><span/><b/></div>
              <div className="cardWords"><small>ВЫБРАТЬ</small><strong>{service.title}</strong><p>{service.subtitle}</p></div>
              <span className="cardGo">ОТКРЫТЬ <b>↗</b></span>
            </button>
          ))}
          <div className="railEnd"><img src="/govietstay-logo.jpg" alt="GoVietStay"/><p>Мы рядом.<br/><b>На каждом шаге.</b></p></div>
        </div>
        <div className="dragTip"><span>←</span> ЛИСТАЙ <span>→</span></div>
        <div className="mobilePromise"><span>24/7</span><p>Поддержка на русском<br/>во время путешествия</p><i>✦</i></div>
      </section>

      <section className="heroStage">
        <nav className="topbar">
          <a className="brand" href="#top" aria-label="GoVietStay home">
            <img src="/govietstay-logo.jpg" alt="GoVietStay official logo" />
            <span><b>GoVietStay</b><small>TRUSTED LOCAL SUPPORT</small></span>
          </a>
          <button className="live" onClick={() => setAiOpen(true)}><i /> Kaka AI • Online</button>
        </nav>

        <div className="heroGrid" id="top">
          <div className="heroCopy">
            <p className="kicker"><span>LOCAL POINT</span><i /> TRAVEL OS • 2027</p>
            <h1>Вьетнам.<br/><em>Настроен под вас.</em></h1>
            <p className="lead">AI-маршрут, умные подарки и живая местная поддержка — в одном цифровом Local Pass.</p>
            <button className="discover" onClick={() => document.getElementById("gift-wheel")?.scrollIntoView({behavior:"smooth"})}>
              Запустить Local Pass <span>↓</span>
            </button>
            <div className="microTrust">
              <span><b>Kaka AI</b> умный первый шаг</span><i/><span><b>Smart</b> реальные подарки</span><i/><span><b>24/7</b> живая команда</span>
            </div>
          </div>

          <div className="heroVisual heroNatureOverlay" aria-label="GoVietStay nature and technology experience" onMouseMove={moveScene} onMouseLeave={(e) => {e.currentTarget.style.setProperty("--mx","0");e.currentTarget.style.setProperty("--my","0");e.currentTarget.style.setProperty("--spot-x","52%");e.currentTarget.style.setProperty("--spot-y","42%")}}>
            <Vietnam3DMap id="desktop-map" />
            <div className="floatingCard guideCard"><span className="avatar">K</span><div><small>LOCAL INTELLIGENCE</small><b>Kaka AI уже на связи</b></div><i /></div>
          </div>
        </div>

        <div className="marquee" aria-hidden="true"><span>DA NANG</span><i>✦</i><span>HOI AN</span><i>✦</i><span>HUE</span><i>✦</i><span>PHU QUOC</span><i>✦</i><span>HO TRAM</span></div>
      </section>

      <section className="giftWheelSection" id="gift-wheel">
        <div className="giftDust"><i/><i/><i/><i/><i/></div>
        <div className="giftCopy">
          <p className="giftKicker"><span>01</span> SMART REWARD • LIVE</p>
          <h2>Запустите колесо.<br/><em>Получите реальную пользу.</em></h2>
          <p className="giftLead">eSIM для одной туристической группы, ваучер 150 000 VND, AI-маршрут и другие преимущества внутри вашего Local Pass.</p>
          <div className="giftRules"><span><b>01</b>Один смартфон</span><span><b>02</b>Одна группа</span><span><b>03</b>Реальный код</span></div>
          {giftIndex !== null && (
            <div className="giftResult" aria-live="polite">
              <div className="confetti" aria-hidden="true">{Array.from({length:18}).map((_,i)=><i key={i} style={{"--i":i} as React.CSSProperties}/>)}</div>
              <span>{gifts[giftIndex].icon}</span>
              <div><small>ДОБАВЛЕНО В LOCAL PASS</small><b>{gifts[giftIndex].title}</b><p>{gifts[giftIndex].value}</p><code>{giftCode}</code></div>
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
              <span>{spinning ? "…" : giftIndex !== null ? "✓" : "GO"}</span><small>{spinning ? "ЖДИТЕ" : giftIndex !== null ? "ГОТОВО" : "КРУТИТЬ"}</small>
            </button>
          </div>
          <p className="wheelGesture">↻ ПРОВЕДИТЕ ПО КОЛЕСУ ИЛИ НАЖМИТЕ GO</p>
          <p className="wheelNote">{giftIndex === null ? "ОДИН ШАНС ДЛЯ ОДНОЙ ТУРИСТИЧЕСКОЙ ГРУППЫ" : "ПОДАРОК СОХРАНЁН В ВАШЕМ LOCAL PASS"}</p>
        </div>
      </section>

      <section className="experience" id="choose">
        <div className="sectionHead">
          <div><p className="sectionKicker">03 • ВЫБЕРИТЕ СВОЙ МАРШРУТ</p><h2>Четыре пути.<br/>Одно приключение.</h2></div>
          <p>После подарка выберите следующий шаг. Каждая карточка открывает короткий запрос — WhatsApp понадобится только для отправки готовой заявки.</p>
        </div>

        <div className="serviceDeck">
          {services.map((service) => (
            <button className="serviceTile" key={service.key} onClick={() => setActive(service.key)} style={{"--accent":service.accent} as React.CSSProperties}>
              <span className="tileNo">{service.no}</span>
              <span className="tileIcon">{service.icon}</span>
              <span className="tileCopy"><b>{service.title}</b><small>{service.subtitle}</small></span>
              <span className="tileArrow">↗</span>
            </button>
          ))}
        </div>

        <div className="storyStrip">
          <div className="storyMap"><span className="mapLine"/><b className="dot d1">ĐN</b><b className="dot d2">HA</b><b className="dot d3">HUẾ</b><p>Один контакт.<br/>Весь Центральный Вьетнам.</p></div>
          <div className="storyQuote"><span>“</span><p>Не просто экскурсия.<br/><b>Надёжный друг во Вьетнаме.</b></p></div>
          <div className="storyStats"><b>100%</b><p>живые люди,<br/>местная команда</p><small>GO VIET STAY • 2026</small></div>
        </div>
      </section>

      <section className="socialUniverse" id="contacts">
        <div className="socialUniverseGlow" />
        <div className="socialIntro">
          <p><span>04</span> CONTACT UNIVERSE</p>
          <h2>Все каналы.<br/><em>Один Local Point.</em></h2>
          <div className="socialIntroCopy">
            <p>Выберите привычный способ связи. Kaka AI помогает мгновенно, а местная команда GoVietStay остаётся рядом 24/7.</p>
            <span><i/> ONLINE • VIETNAM</span>
          </div>
        </div>
        <div className="contactGrid">
          {contactLinks.map((link) => (
            <a className={link.featured ? "contactCard isFeatured" : "contactCard"} href={link.href} target="_blank" rel="noreferrer" key={link.name}>
              <span className="contactIcon">{link.icon}</span>
              <span className="contactWords"><b>{link.name}</b><small>{link.detail}</small></span>
              <i>↗</i>
            </a>
          ))}
        </div>
        <div className="socialSignature">
          <img src="/govietstay-logo.jpg" alt="GoVietStay official logo"/>
          <div><b>GoVietStay</b><span>Trusted Local Support • Vietnam</span></div>
          <p>Da Nang • Hoi An • Hue • Phu Quoc • Ho Tram<br/><small>LOCAL POINT • {ref}</small></p>
        </div>
      </section>

      {active && activeService && (
        <div className="modalBackdrop" role="presentation" onMouseDown={(e) => {if(e.target === e.currentTarget) setActive(null)}}>
          <section className="requestPanel" role="dialog" aria-modal="true" aria-labelledby="request-title">
            <button className="close" onClick={() => setActive(null)} aria-label="Закрыть">×</button>
            <div className="panelTop" style={{"--accent":activeService.accent} as React.CSSProperties}>
              <span>{activeService.icon}</span><small>ЗАПРОС • {activeService.no}</small>
              <h2 id="request-title">{activeService.title}</h2><p>{activeService.subtitle}</p>
            </div>
            <form onSubmit={sendRequest}>
              <div className="fieldRow"><label>Ваше имя<input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Например, Анна" /></label><label>Дата<input type="date" value={date} onChange={(e)=>setDate(e.target.value)} /></label></div>
              <label>Отель или район<input value={hotel} onChange={(e)=>setHotel(e.target.value)} placeholder="Где вы остановились?" /></label>
              <label>Что важно учесть?<textarea value={details} onChange={(e)=>setDetails(e.target.value)} placeholder={active === "tour" ? "Количество гостей, дети, желаемое место…" : active === "transfer" ? "Откуда и куда, номер рейса, количество гостей…" : "Напишите ваш вопрос или пожелание…"} /></label>
              <button className="send" type="submit"><span>Отправить готовую заявку</span><b>WhatsApp ↗</b></button>
              <p className="privacy">Без оплаты • Ответим на русском • Код точки {ref}</p>
            </form>
          </section>
        </div>
      )}

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

      {musicOpen && (
        <aside className="musicPlayer" id="russian-music-player" aria-label="Русский музыкальный плеер">
          <header>
            <span className="musicDisc">♫</span>
            <div><small>GO VIET STAY • RUSSIAN MOOD</small><b>А я иду, шагаю по Москве</b><p>Лёгкая классика для начала путешествия</p></div>
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
              <div className="aiIdentity"><span>K</span><div><b id="kaka-ai-title">Kaka AI</b><small><i/> LOCAL INTELLIGENCE • ONLINE</small></div></div>
              <button onClick={() => setAiOpen(false)} aria-label="Закрыть Kaka AI">×</button>
            </header>
            <div className="aiContext"><span>LOCAL POINT</span><b>{ref}</b><i>{giftIndex !== null ? `PASS • ${giftCode}` : "PASS • READY"}</i></div>
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
