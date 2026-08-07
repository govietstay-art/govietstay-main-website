"use client";

import "./LocalPointLandingPage.css";

import { FormEvent, MouseEvent, useEffect, useMemo, useState } from "react";

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
  { icon: "✦", short: "Маршрут", title: "Персональный план путешествия" },
  { icon: "◌", short: "SIM", title: "Бесплатная доставка SIM" },
  { icon: "⌖", short: "Гид", title: "Мини-гид по секретным местам" },
  { icon: "★", short: "VIP", title: "Приоритетная поддержка 24/7" },
  { icon: "✓", short: "Чек-лист", title: "Чек-лист путешественника" },
  { icon: "?", short: "Сюрприз", title: "Сюрприз от GoVietStay" },
];

export default function LocalPointLandingPage() {
  const [ref, setRef] = useState("LOCAL-POINT");
  const [active, setActive] = useState<ServiceKey | null>(null);
  const [name, setName] = useState("");
  const [hotel, setHotel] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [wheelRotation, setWheelRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [giftIndex, setGiftIndex] = useState<number | null>(null);
  const [giftCode, setGiftCode] = useState("");

  useEffect(() => {
    const source = new URLSearchParams(window.location.search).get("ref");
    if (source) setRef(source.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 32));
    const savedGift = window.localStorage.getItem("gvs-welcome-gift-v1");
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

  const spinWheel = () => {
    if (spinning || giftIndex !== null) return;
    const random = new Uint32Array(1);
    window.crypto.getRandomValues(random);
    const selected = random[0] % gifts.length;
    const rotation = 2160 + (360 - (selected * 60 + 30));
    setSpinning(true);
    setWheelRotation(rotation);
    window.setTimeout(() => {
      const code = `GVS-${String(random[0]).slice(-4).padStart(4, "0")}`;
      setGiftIndex(selected);
      setGiftCode(code);
      setSpinning(false);
      window.localStorage.setItem("gvs-welcome-gift-v1", JSON.stringify({ index: selected, code }));
    }, 4300);
  };

  const claimGift = () => {
    if (giftIndex === null) return;
    const message = [
      "Здравствуйте, GoVietStay!",
      `Я выиграл подарок: ${gifts[giftIndex].title}.`,
      `Код подарка: ${giftCode}.`,
      `Код Local Point: ${ref}.`,
      "Помогите мне активировать подарок, пожалуйста.",
    ].join("\n");
    window.open(`https://wa.me/84937762607?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="gvsLocalPoint">
      <section className="mobileAdventure" aria-label="GoVietStay adventure">
        <div className="adventureAurora auroraOne" />
        <div className="adventureAurora auroraTwo" />
        <div className="starField"><i/><i/><i/><i/><i/><i/></div>

        <nav className="mobileNav">
          <div className="mobileBrand"><img src="/local-point/govietstay-logo.jpg" alt="GoVietStay"/><span>GoVietStay<small>LOCAL ADVENTURE</small></span></div>
          <span className="ruPulse"><i/>RU</span>
        </nav>

        <div className="adventureIntro">
          <p><span>✦</span> ТВОЁ ПРИКЛЮЧЕНИЕ НАЧИНАЕТСЯ ЗДЕСЬ</p>
          <h1>Вьетнам<br/><em>ждёт тебя</em></h1>
        </div>

        <div className="mobileWorld">
          <div className="worldGlow" />
          <div className="worldOrbit worldOrbitOne"><i/></div>
          <div className="worldOrbit worldOrbitTwo"><i/></div>
          <img src="/local-point/hero-3d.png" alt="Floating 3D Vietnam adventure world" />
          <span className="worldPin pinTop"><b>01</b>BÀ NÀ</span>
          <span className="worldPin pinBottom"><b>02</b>HỘI AN</span>
          <div className="adventureTicket"><small>ТВОЙ МАРШРУТ</small><b>Da Nang <span>→</span> Vietnam</b><i>READY</i></div>
        </div>

        <div className="adventureAction">
          <p>Не просто тур.<br/><b>Твоя история во Вьетнаме.</b></p>
          <button onClick={() => document.getElementById("gift-wheel")?.scrollIntoView({behavior:"smooth"})}>
            <span>НАЧАТЬ ПРИКЛЮЧЕНИЕ</span><b>↗</b>
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
          <div className="railEnd"><img src="/local-point/govietstay-logo.jpg" alt="GoVietStay"/><p>Мы рядом.<br/><b>На каждом шаге.</b></p></div>
        </div>
        <div className="dragTip"><span>←</span> ЛИСТАЙ <span>→</span></div>
        <div className="mobilePromise"><span>24/7</span><p>Поддержка на русском<br/>во время путешествия</p><i>✦</i></div>
      </section>

      <section className="heroStage">
        <nav className="topbar">
          <a className="brand" href="#top" aria-label="GoVietStay home">
            <img src="/local-point/govietstay-logo.jpg" alt="GoVietStay official logo" />
            <span><b>GoVietStay</b><small>TRUSTED LOCAL SUPPORT</small></span>
          </a>
          <div className="live"><i /> Русская поддержка</div>
        </nav>

        <div className="heroGrid" id="top">
          <div className="heroCopy">
            <p className="kicker"><span>ВЬЕТНАМ</span><i /> ВАШЕ ПУТЕШЕСТВИЕ, НАША ЗАБОТА</p>
            <h1>Откройте Вьетнам.<br/><em>Чувствуйте себя дома.</em></h1>
            <p className="lead">Экскурсии, трансферы и настоящая местная поддержка на русском языке — в одном месте.</p>
            <button className="discover" onClick={() => document.getElementById("gift-wheel")?.scrollIntoView({behavior:"smooth"})}>
              Получить подарок <span>↓</span>
            </button>
            <div className="microTrust">
              <span><b>Google</b> отзывы гостей</span><i/><span><b>24/7</b> на связи</span><i/><span><b>Local</b> понятные цены</span>
            </div>
          </div>

          <div className="heroVisual" aria-label="GoVietStay 3D Vietnam experience" onMouseMove={moveScene} onMouseLeave={(e) => {e.currentTarget.style.setProperty("--mx","0");e.currentTarget.style.setProperty("--my","0")}}>
            <div className="sunHalo"><span/><i/></div>
            <div className="depthScene">
              <img className="diorama" src="/local-point/hero-3d.png" alt="3D Vietnam travel world" />
              <div className="orbit orbitA"><i/></div>
              <div className="orbit orbitB"><i/></div>
              <div className="brandCoin"><img src="/local-point/govietstay-logo.jpg" alt="GoVietStay"/><span>LOCAL<br/>POINT</span></div>
            </div>
            <div className="floatingCard routeCard"><small>ВАШ МАРШРУТ</small><b>Da Nang <span>→</span> Hoi An</b><p>Сегодня идеальный вечер</p></div>
            <div className="floatingCard guideCard"><span className="avatar">G</span><div><small>ЛИЧНЫЙ ПОМОЩНИК</small><b>Мы уже на связи</b></div><i /></div>
            <div className="placeTag tagOne">BÀ NÀ HILLS <b>01</b></div>
            <div className="placeTag tagTwo">HỘI AN <b>02</b></div>
          </div>
        </div>

        <div className="marquee" aria-hidden="true"><span>DA NANG</span><i>✦</i><span>HOI AN</span><i>✦</i><span>HUE</span><i>✦</i><span>PHU QUOC</span><i>✦</i><span>HO TRAM</span></div>
      </section>

      <section className="giftWheelSection" id="gift-wheel">
        <div className="giftDust"><i/><i/><i/><i/><i/></div>
        <div className="giftCopy">
          <p className="giftKicker"><span>02</span> ПОДАРОК ДЛЯ НОВОГО ГОСТЯ</p>
          <h2>Путешествие начинается<br/><em>с приятного сюрприза.</em></h2>
          <p className="giftLead">GoVietStay дарит каждому новому гостю один бесплатный шанс. Нажмите на центр колеса и откройте свой подарок.</p>
          <div className="giftRules"><span><b>01</b>Бесплатное вращение</span><span><b>02</b>Один подарок</span><span><b>03</b>Без оплаты</span></div>
          {giftIndex !== null && (
            <div className="giftResult" aria-live="polite">
              <span>{gifts[giftIndex].icon}</span>
              <div><small>ВАШ ПОДАРОК</small><b>{gifts[giftIndex].title}</b><code>{giftCode}</code></div>
              <button onClick={claimGift}>ПОЛУЧИТЬ ↗</button>
            </div>
          )}
        </div>

        <div className="wheelStage">
          <div className="floatingGift giftBoxOne">✦</div>
          <div className="floatingGift giftBoxTwo">?</div>
          <div className="wheelPointer"><i/></div>
          <div className="wheelOuter">
            <div className="wheelLights">{Array.from({length:18}).map((_,i)=><i key={i} style={{"--i":i} as React.CSSProperties}/>)}</div>
            <div className={`prizeWheel ${spinning ? "isSpinning" : ""}`} style={{transform:`rotate(${wheelRotation}deg)`}}>
              {gifts.map((gift,index)=>(
                <div className={`wheelLabel wheelLabel${index + 1}`} key={gift.short}><span>{gift.icon}</span><b>{gift.short}</b></div>
              ))}
            </div>
            <button className="spinButton" onClick={spinWheel} disabled={spinning || giftIndex !== null} aria-label="Вращать колесо подарков">
              <span>{spinning ? "…" : giftIndex !== null ? "✓" : "GO"}</span><small>{spinning ? "ЖДИТЕ" : giftIndex !== null ? "ГОТОВО" : "КРУТИТЬ"}</small>
            </button>
          </div>
          <p className="wheelNote">{giftIndex === null ? "ОДНО ВРАЩЕНИЕ НА УСТРОЙСТВО" : "ПОДАРОК СОХРАНЁН НА ЭТОМ УСТРОЙСТВЕ"}</p>
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

      <footer className="footer">
        <img src="/local-point/govietstay-logo.jpg" alt="GoVietStay" />
        <div><b>GoVietStay</b><span>Da Nang • Hoi An • Hue • Phu Quoc • Ho Tram</span></div>
        <a href="https://GoVietStay.com/ru" target="_blank" rel="noreferrer">GoVietStay.com/ru ↗</a>
        <small>Local Point: {ref}</small>
      </footer>

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
    </main>
  );
}
