"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AktualnoArticle } from "../lib/aktualnoArticles";
import { aktualnoCategories } from "../lib/aktualnoArticles";
import "./AktualnoPage.css";

type Props = { articles: AktualnoArticle[] };
type Days = "2" | "3" | "4+";
type TravelStyle = "first" | "sea" | "culture" | "family";
type Guide = "smart" | "ru";

const BASE = "/ru/aktualno";
const PHONE = "84937762607";

const plans = {
  classic: { label: "Классический Дананг", route: "Бана Хиллс · Кокосовый лес · Хойан", days: "2 экскурсионных дня", price: "2 660 000 VND / гость", note: "Лучший старт для первого знакомства с Центральным Вьетнамом." },
  sea: { label: "Море и наследие", route: "Остров Чам · Снорклинг · Хойан", days: "2 экскурсионных дня", price: "2 090 000 VND / гость", note: "Море и вечерняя культура в одном спокойном ритме." },
  top: { label: "ТОП-3 Центрального Вьетнама", route: "Бана Хиллс · Остров Чам · Хойан", days: "3 экскурсионных дня", price: "3 500 000 VND / гость", note: "Горы, море и древний город — с днями отдыха между поездками." },
  heritage: { label: "Культурное путешествие", route: "Бана Хиллс · Хойан · Императорский Хюэ", days: "3 экскурсионных дня", price: "3 995 000 VND / гость", note: "Маршрут для тех, кому важны история, архитектура и живой рассказ." },
};

export function AktualnoHeader() {
  return (
    <header className="akt-header">
      <div className="akt-shell akt-nav-shell">
        <Link className="akt-brand" href="/ru">
          <img src="https://www.govietstay.com/logo.png" alt="GoVietStay" />
          <span><strong>GoVietStay</strong><small>Vietnam Signal</small></span>
        </Link>
        <nav className="akt-nav" aria-label="Навигация Актуально">
          <Link href={`${BASE}#radar`}>Vietnam Radar</Link>
          <Link href={`${BASE}#planner`}>Маршрут за 30 сек</Link>
          <Link href={`${BASE}#stories`}>Travel Pulse</Link>
          <Link href={`${BASE}#latest`}>Материалы</Link>
        </nav>
        <a className="akt-nav-cta" href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer"><i /> WhatsApp</a>
      </div>
    </header>
  );
}

export function AktualnoFooter() {
  return (
    <footer className="akt-footer">
      <div className="akt-shell akt-footer-grid">
        <div className="akt-footer-brand"><img src="https://www.govietstay.com/logo.png" alt="GoVietStay" /><div><strong>GoVietStay</strong><p>Trusted Local Support · Da Nang · Hoi An · Hue</p></div></div>
        <div><span>РУССКАЯ ВЕРСИЯ</span><a href="https://www.govietstay.com/ru">govietstay.com/ru ↗</a></div>
        <div><span>ПОДДЕРЖКА</span><a href={`https://wa.me/${PHONE}`}>WhatsApp +84 937 762 607 ↗</a></div>
      </div>
      <div className="akt-shell akt-footer-bottom"><span>© 2026 GoVietStay</span><span>We create experiences and build trust.</span></div>
    </footer>
  );
}

export default function AktualnoPage({ articles }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [days, setDays] = useState<Days>("3");
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("first");
  const [guide, setGuide] = useState<Guide>("smart");

  const visibleArticles = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("ru");
    return articles.filter((article) => {
      const categoryMatch = activeCategory === "all" || article.category === activeCategory;
      const textMatch = !normalized || `${article.title} ${article.excerpt} ${article.location}`.toLocaleLowerCase("ru").includes(normalized);
      return categoryMatch && textMatch;
    });
  }, [activeCategory, articles, query]);

  const selectedPlan = useMemo(() => {
    if (travelStyle === "culture") return plans.heritage;
    if (travelStyle === "sea" && days === "2") return plans.sea;
    if (days === "2") return plans.classic;
    return plans.top;
  }, [days, travelStyle]);

  const plannerMessage = encodeURIComponent(`Здравствуйте! Мой выбор на Vietnam Radar: ${days} дня, стиль ${travelStyle}, гид ${guide}. Рекомендация: ${selectedPlan.label}. Помогите проверить даты и цену.`);
  const articleUrl = (slug: string) => `${BASE}/${slug}`;

  return (
    <div className="aktualno-page">
      <AktualnoHeader />
      <main>
        <section className="signal-hero">
          <div className="signal-photo signal-photo-main" aria-hidden="true" />
          <div className="signal-photo signal-photo-secondary" aria-hidden="true" />
          <div className="signal-grid" aria-hidden="true" />
          <div className="signal-glow" aria-hidden="true" />
          <div className="akt-shell signal-hero-inner">
            <div className="signal-copy">
              <div className="signal-kicker"><i /> LOCAL SIGNAL · CENTRAL VIETNAM</div>
              <h1>Вьетнам<br /><span>не по каталогу.</span><br />Вьетнам — сейчас.</h1>
              <p>Живые сигналы из Дананга, Хойана и Хюэ: море, погода, реальные поездки и маршруты, которые подходят именно вам.</p>
              <div className="signal-actions">
                <a className="signal-primary" href="#radar">Открыть Vietnam Radar <span>↘</span></a>
                <a className="signal-secondary" href="#planner">Подобрать маршрут за 30 сек</a>
              </div>
            </div>
            <div className="radar-visual" aria-label="Vietnam Radar">
              <div className="radar-scan" /><div className="radar-ring ring-one" /><div className="radar-ring ring-two" /><div className="radar-ring ring-three" />
              <div className="radar-center"><span>GVS</span><b>LIVE</b></div>
              <div className="radar-node node-sea"><i /> МОРЕ</div><div className="radar-node node-mountain"><i /> ГОРЫ</div><div className="radar-node node-culture"><i /> КУЛЬТУРА</div><div className="radar-node node-evening"><i /> ВЕЧЕР</div>
            </div>
          </div>
          <div className="signal-ticker"><div className="akt-shell ticker-track"><span className="ticker-live">● LIVE</span><span>Остров Чам · ежедневное подтверждение моря</span><span>Бана Хиллс · проверяем погоду на высоте</span><span>Хойан · лучший ритм начинается после 16:00</span><a href={`https://wa.me/${PHONE}`}>Спросить сейчас ↗</a></div></div>
        </section>

        <section className="radar-section" id="radar">
          <div className="akt-shell">
            <div className="radar-heading"><div><span className="section-index">01 / VIETNAM RADAR</span><h2>Не прогноз.<br />Живой контекст поездки.</h2></div><p>Мы не обещаем идеальную погоду. Мы показываем, что важно проверить до оплаты и как сохранить день, если планы меняются.</p></div>
            <div className="radar-bento">
              <Link href={articleUrl("cham-island-status")} className="radar-tile radar-tile-sea"><div className="tile-top"><span>01</span><b className="amber"><i /> ПРОВЕРЯЕМ ЕЖЕДНЕВНО</b></div><div className="tile-wave">≈</div><p>МОРСКОЙ СИГНАЛ</p><h3>Остров Чам</h3><small>Решение о катерах зависит от моря и ответственных служб.</small><div className="tile-link">Как получить подтверждение <span>→</span></div></Link>
              <Link href={articleUrl("bana-hills-in-rain")} className="radar-tile radar-tile-mountain"><div className="tile-photo" /><div className="tile-shade" /><div className="tile-content"><div className="tile-top"><span>02</span><b className="mint"><i /> ВЫСОТА 1 414 М</b></div><p>ГОРНЫЙ СИГНАЛ</p><h3>Бана Хиллс</h3><small>Важен не дождь у отеля, а видимость наверху.</small><div className="tile-link">План на облачный день <span>→</span></div></div></Link>
              <div className="radar-tile radar-tile-culture"><div className="culture-orbit"><span>文化</span></div><div><div className="tile-top"><span>03</span><b><i /> РУССКИЙ РАССКАЗ</b></div><p>КУЛЬТУРНЫЙ СИГНАЛ</p><h3>Хойан + Хюэ</h3><small>Здесь язык гида действительно меняет впечатление.</small><Link href={articleUrl("russian-or-english-guide")} className="tile-link">Выбрать язык гида <span>→</span></Link></div></div>
              <div className="radar-tile radar-tile-community"><div className="community-flags"><span>RU</span><span>KZ</span><span>UZ</span></div><p>COMMUNITY PULSE</p><h3>Гости говорят по-русски.<br />Поддержка — на месте.</h3><div className="community-proof"><div><b>24/7</b><span>WhatsApp во время поездки</span></div><div><b>LOCAL</b><span>Команда в Центральном Вьетнаме</span></div></div></div>
            </div>
          </div>
        </section>

        <section className="planner-section" id="planner">
          <div className="akt-shell planner-shell">
            <div className="planner-intro"><span className="section-index light-index">02 / SMART ROUTE</span><h2>Ваш маршрут.<br /><em>За 30 секунд.</em></h2><p>Три простых выбора — и вы получаете логичный вариант без обязательных экскурсий подряд.</p><div className="planner-progress"><span /><span /><span /></div></div>
            <div className="planner-controls">
              <fieldset><legend><b>01</b> Сколько экскурсионных дней?</legend><div className="choice-row">{(["2", "3", "4+"] as Days[]).map((value) => <button type="button" key={value} className={days === value ? "selected" : ""} onClick={() => setDays(value)}>{value}</button>)}</div></fieldset>
              <fieldset><legend><b>02</b> Что вам ближе?</legend><div className="choice-grid">{[["first", "Первый раз", "Главные места"], ["sea", "Море", "Остров и снорклинг"], ["culture", "Культура", "История и города"], ["family", "Семья", "Спокойный ритм"]].map(([value, label, hint]) => <button type="button" key={value} className={travelStyle === value ? "selected" : ""} onClick={() => setTravelStyle(value as TravelStyle)}><span>{label}</span><small>{hint}</small></button>)}</div></fieldset>
              <fieldset><legend><b>03</b> Как выбрать гида?</legend><div className="guide-row"><button type="button" className={guide === "smart" ? "selected" : ""} onClick={() => setGuide("smart")}><span>Умная экономия</span><small>EN для впечатлений · RU для культуры</small></button><button type="button" className={guide === "ru" ? "selected" : ""} onClick={() => setGuide("ru")}><span>Русский по запросу</span><small>Проверим наличие и цену</small></button></div></fieldset>
            </div>
            <div className="planner-result" aria-live="polite"><div className="result-top"><span>ВАШ SIGNAL MATCH</span><b>96%</b></div><div className="result-mark">GVS<span>+</span></div><small>{selectedPlan.days}</small><h3>{selectedPlan.label}</h3><p className="result-route">{selectedPlan.route}</p><p className="result-note">{selectedPlan.note}</p><div className="result-price"><span>Ориентир</span><b>{selectedPlan.price}</b></div><a href={`https://wa.me/${PHONE}?text=${plannerMessage}`} target="_blank" rel="noreferrer">Проверить даты в WhatsApp <span>↗</span></a><em>Финальная цена и язык гида подтверждаются до бронирования.</em></div>
          </div>
        </section>

        <section className="pulse-section" id="stories">
          <div className="akt-shell"><div className="pulse-heading"><div><span className="section-index">03 / REAL TRAVEL PULSE</span><h2>Не отзывы.<br />Следы настоящих поездок.</h2></div><a href="https://maps.app.goo.gl/bDyntTvDShBos21A9?g_st=ic" target="_blank" rel="noreferrer">Google Reviews ↗</a></div>
            <div className="pulse-track">
              <Link href={articleUrl("support-for-kazakhstan-guests")} className="pulse-card pulse-kz"><div className="pulse-card-image" /><div className="pulse-card-overlay" /><div className="pulse-card-content"><span>KZ · FAMILY</span><h3>6 гостей.<br />Один контакт.<br />Вся поездка.</h3><p>Связь на русском, понятная оплата и помощь в каждом маршруте.</p><b>История поездки →</b></div></Link>
              <Link href={articleUrl("hoi-an-two-experiences")} className="pulse-card pulse-hoian"><div className="pulse-card-image" /><div className="pulse-card-overlay" /><div className="pulse-card-content"><span>HOI AN · 18:20</span><h3>Один день.<br />Два разных<br />Вьетнама.</h3><p>Кокосовый лес днём. История, кухня и фонари вечером.</p><b>Открыть историю →</b></div></Link>
              <Link href={articleUrl("tour-or-combo")} className="pulse-card pulse-combo"><div className="pulse-card-image" /><div className="pulse-card-overlay" /><div className="pulse-card-content"><span>FLEX COMBO</span><h3>Поездка.<br />Отдых.<br />Снова эмоции.</h3><p>Экскурсии не обязаны идти подряд — отпуск остаётся отпуском.</p><b>Почему это работает →</b></div></Link>
            </div>
          </div>
        </section>

        <section className="akt-content-section akt-discovery akt-shell" id="latest">
          <div className="akt-section-heading"><div><span className="section-index">04 / DEEP DIVE</span><h2>Разобраться глубже</h2><p>Практические ответы, которые можно сохранить и открыть перед поездкой.</p></div><div className="akt-search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти тему..." aria-label="Поиск по материалам" /></div></div>
          <div className="akt-categories" role="group" aria-label="Фильтр материалов">{aktualnoCategories.map((category) => <button type="button" key={category.id} className={activeCategory === category.id ? "active" : ""} onClick={() => setActiveCategory(category.id)}>{category.label}</button>)}</div>
          {visibleArticles.length ? <div className="akt-article-grid">{visibleArticles.map((article, index) => <Link href={articleUrl(article.slug)} className={`akt-card ${index === 0 ? "wide" : ""}`} key={article.slug}><div className="akt-card-image"><img src={article.image} alt={article.imageAlt} /><span className={`akt-badge ${article.category}`}>{article.categoryLabel}</span>{article.liveLabel && <span className="akt-live-label">● {article.liveLabel}</span>}</div><div className="akt-card-body"><div className="akt-card-meta"><span>{article.location}</span><span>{article.readingTime}</span></div><h3>{article.title}</h3><p>{article.excerpt}</p><div className="akt-card-footer"><span>{article.displayDate}</span><b>Читать →</b></div></div></Link>)}</div> : <div className="akt-empty"><strong>Ничего не найдено</strong><p>Попробуйте другой запрос.</p><button type="button" onClick={() => { setQuery(""); setActiveCategory("all"); }}>Показать всё</button></div>}
        </section>

        <section className="human-section"><div className="akt-shell human-shell"><div className="human-portrait"><img src="https://www.govietstay.com/founder/david-founder.png" alt="David Tran, основатель GoVietStay" /><span>LOCAL · CENTRAL VIETNAM</span></div><div className="human-quote"><span className="section-index light-index">05 / HUMAN BEHIND THE SIGNAL</span><blockquote>«Алгоритм может найти тур.<br />Но только человек понимает,<br /><em>какой день вам нужен.</em>»</blockquote><div><b>David Tran</b><span>15+ лет в гостеприимстве · Основатель GoVietStay</span></div></div><div className="human-action"><p>Расскажите не только куда хотите поехать — расскажите, как хотите себя чувствовать.</p><a href={`https://wa.me/${PHONE}?text=Здравствуйте%2C%20помогите%20мне%20выбрать%20маршрут%20по%20моему%20стилю%20отдыха.`} target="_blank" rel="noreferrer">Начать разговор <span>↗</span></a></div></div></section>
      </main>
      <AktualnoFooter />
    </div>
  );
}
