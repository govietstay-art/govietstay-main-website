"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { track } from "@/lib/travel-kit/analytics";
import { fillCity, parseAmount, parseCity, photoSet, vietnamDayPeriod, whatsAppHref } from "@/lib/travel-kit/config";
import { dictionaries } from "@/lib/travel-kit/dictionaries";
import {
  convertRate,
  isWet,
  RATES_URL,
  snapshotFromRates,
  snapshotFromWeather,
  weatherUrl,
  type RatesSnapshot,
  type WeatherSnapshot,
} from "@/lib/travel-kit/live-data";
import { MAP_POINTS } from "@/lib/travel-kit/places";
import { readJson, readString, readTicks, subscribeTicks, writeJson, writeString, writeTicks } from "@/lib/travel-kit/ticks";
import { EMPTY_TRIP, TRIP_KEY, kitStorageKeys, type TripData } from "@/lib/travel-kit/trip";
import {
  CITY_IDS,
  CURRENCIES,
  HUB_SLUGS,
  LANGS,
  UTILITY_SLUGS,
  type CityId,
  type Currency,
  type KitCopy,
  type Lang,
  type MomentId,
  type ScenarioId,
  type ToolSlug,
} from "@/lib/travel-kit/types";
import styles from "./travel-kit.module.css";
import { FamilyPlanner } from "./FamilyPlanner";
import { FamilyFoodGuide } from "./FamilyFoodGuide";
import { HybridPremiumIntro } from "./HybridPremiumIntro";

const ARRIVAL_KEY = "gvs-travel-kit-arrival-v2";
const PACKING_KEY = "gvs-travel-kit-packing-v1";
const ADDRESS_KEY = "gvs-tk-address";
const RATES_KEY = "gvs-tk-rates";
const CITY_KEY = "gvs-tk-city";

const GUIDE_FOR: Record<CityId, ToolSlug> = {
  danang: "da-nang",
  hoian: "hoi-an",
  hue: "hue",
  phuquoc: "phu-quoc",
};

const GUIDE_CITY = {
  "da-nang": "danang",
  "hoi-an": "hoian",
  hue: "hue",
  "phu-quoc": "phuquoc",
} as const;

function isGuide(tool?: ToolSlug): tool is keyof typeof GUIDE_CITY {
  return tool === "da-nang" || tool === "hoi-an" || tool === "hue" || tool === "phu-quoc";
}

function guideCopy(copy: KitCopy, tool: keyof typeof GUIDE_CITY) {
  if (tool === "hoi-an") return copy.hoian;
  if (tool === "hue") return copy.hue;
  if (tool === "phu-quoc") return copy.phuquoc;
  return copy.danang;
}

type Props = {
  lang: Lang;
  tool?: ToolSlug;
  initialCity: CityId;
  weather: WeatherSnapshot | null;
  rates: RatesSnapshot | null;
};

function activateOnSpace(event: ReactKeyboardEvent<HTMLAnchorElement>) {
  if (event.key !== " ") return;
  event.preventDefault();
  event.currentTarget.click();
}

function isUtility(tool?: ToolSlug) {
  return !!tool && (UTILITY_SLUGS as readonly string[]).includes(tool);
}

function pathFor(lang: Lang, tool?: ToolSlug, city?: CityId) {
  const path = tool ? `/${lang}/travel-kit/${tool}` : `/${lang}/travel-kit`;
  return city ? `${path}?city=${city}` : path;
}

function useTicks(key: string, count: number) {
  return useSyncExternalStore(
    (onStoreChange) => subscribeTicks(key, onStoreChange),
    () => readTicks(key, count),
    () => readTicks(key, count),
  );
}

function emptySubscribe() {
  return () => {};
}

function subscribeClock(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 10000);
  return () => window.clearInterval(id);
}

function readClock() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date());
}

function DeviceClock({ large = false }: { large?: boolean }) {
  const time = useSyncExternalStore(subscribeClock, readClock, () => "--:--");
  const [hour, minute] = time.split(":");
  return (
    <p className={large ? styles.clock : styles.clockSmall}>
      {hour}
      <span>:</span>
      {minute}
    </p>
  );
}

function clientTrue() {
  return true;
}

function clientFalse() {
  return false;
}

function jsonServerSnapshot() {
  return null;
}

function useSavedJson<T>(key: string): T | null {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const handler = () => onStoreChange();
    window.addEventListener("storage", handler);
    window.addEventListener(key, handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener(key, handler);
    };
  }, [key]);
  const read = useCallback(() => readJson<T>(key), [key]);
  return useSyncExternalStore(subscribe, read, jsonServerSnapshot);
}

function useClient() {
  return useSyncExternalStore(emptySubscribe, clientTrue, clientFalse);
}

function formatAmount(value: number, currency: Currency, lang: Lang) {
  const locale = lang === "ru" ? "ru-RU" : lang === "it" ? "it-IT" : "en-GB";
  const digits = currency === "VND" || Math.abs(value) >= 100 ? 0 : 2;
  return new Intl.NumberFormat(locale, { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value);
}

export function TravelKitApp({ lang, tool, initialCity, weather, rates }: Props) {
  const copy = dictionaries[lang];
  const router = useRouter();
  const city = initialCity;
  const [menu, setMenu] = useState(false);
  const menuId = useId();
  const cityTitleId = useId();
  const cityButtonRef = useRef<HTMLButtonElement>(null);
  const cityWrapRef = useRef<HTMLDivElement>(null);
  const cityDialogRef = useRef<HTMLDivElement>(null);
  const opened = useRef(false);
  const trackedTools = useRef(new Set<string>());
  const savedWeather = useSavedJson<WeatherSnapshot>(`gvs-tk-wx-${city}`);
  const period = vietnamDayPeriod();
  const liveWeather = weather && weather.city === city ? weather : null;
  const cachedWeather = !liveWeather && savedWeather && savedWeather.city === city ? savedWeather : null;
  const headerWeather = liveWeather ?? cachedWeather;
  const moment: MomentId = headerWeather && isWet(headerWeather.kind, headerWeather.precipitationMm) ? "rain" : period === "evening" ? "evening" : "day";
  const scenario: ScenarioId = moment === "day" ? "landed" : moment;
  const supportHref = whatsAppHref(fillCity(copy.supportMessage, copy.cities[city]));

  useEffect(() => {
    if (weather) writeJson(`gvs-tk-wx-${weather.city}`, weather);
  }, [weather]);
  useEffect(() => {
    if (rates) writeJson(RATES_KEY, rates);
  }, [rates]);
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/kit-sw.js", { scope: `/${lang}/travel-kit/` }).catch(() => {});
  }, [lang]);
  useEffect(() => {
    const fromUrl = parseCity(new URLSearchParams(window.location.search).get("city") ?? undefined);
    if (fromUrl) {
      writeString(CITY_KEY, fromUrl);
    } else {
      const saved = parseCity(readString(CITY_KEY) || undefined);
      if (saved && saved !== city) {
        router.replace(pathFor(lang, tool, saved));
        return;
      }
    }
    if (!opened.current) {
      opened.current = true;
      track("travel_kit_open", { language: lang, city, tool: tool ?? "home" });
    }
    if (tool) {
      const id = `${lang}|${tool}`;
      if (!trackedTools.current.has(id)) {
        trackedTools.current.add(id);
        track("tool_open", { language: lang, city, tool });
      }
    }
  }, [city, lang, tool, router]);
  useEffect(() => {
    if (!menu) return;
    const current = cityDialogRef.current?.querySelector<HTMLButtonElement>('[aria-current="true"]');
    (current ?? cityDialogRef.current?.querySelector("button"))?.focus();
    const onPointer = (event: PointerEvent) => {
      if (cityWrapRef.current?.contains(event.target as Node)) return;
      setMenu(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [menu]);

  function closeMenu(restoreFocus = true) {
    setMenu(false);
    if (restoreFocus) cityButtonRef.current?.focus();
  }

  function chooseCity(next: CityId) {
    writeString(CITY_KEY, next);
    track("city_change", { language: lang, city: next, tool: tool ?? "home" });
    const nextTool = isGuide(tool) ? GUIDE_FOR[next] : tool;
    setMenu(false);
    router.push(pathFor(lang, nextTool, next));
  }

  function onCityKey(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    const buttons = Array.from(cityDialogRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? []);
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === "Tab") {
      const focusable = Array.from(cityDialogRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next =
        event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : event.key === "ArrowDown" ? index + 1 : index - 1;
      buttons[(next + buttons.length) % buttons.length]?.focus();
    }
  }

  function onSupportClick() {
    track("whatsapp_click", { language: lang, city, tool: tool ?? "home" });
  }

  return (
    <div className={styles.canvas} lang={lang}>
      <div className={styles.device}>
        <a className={styles.skip} href="#kit-main">
          {copy.skip}
        </a>
        <header className={styles.header}>
          <div className={styles.brandRow}>
            <div className={styles.brandLockup}>
              <a className={styles.logoLink} href="https://govietstay.com" onKeyDown={activateOnSpace}>
                <span className={styles.logoChip}>
                  <Image
                    src="/brand/govietstay-official-logo.jpg"
                    alt={copy.logoAlt}
                    width={144}
                    height={144}
                    sizes="72px"
                    className={styles.logo}
                    quality={75}
                  />
                </span>
                <span className={styles.srOnly}>{copy.mainSiteHint}</span>
              </a>
              <div>
                <Link
                  className={styles.kitHome}
                  href={pathFor(lang, undefined, city)}
                  aria-label={copy.kitHomeLabel}
                  aria-current={tool ? undefined : "page"}
                  onKeyDown={activateOnSpace}
                >
                  {copy.back}
                </Link>
                <p className={styles.trust}>{copy.trust}</p>
              </div>
            </div>
            <nav className={styles.langs} aria-label={copy.langLabel}>
              {LANGS.map((item) => (
                <a
                  key={item}
                  className={item === lang ? `${styles.lang} ${styles.langOn}` : styles.lang}
                  href={pathFor(item, tool, city)}
                  hrefLang={item === "it" ? "it-IT" : item}
                  aria-current={item === lang ? "page" : undefined}
                >
                  {item.toUpperCase()}
                </a>
              ))}
            </nav>
          </div>
          <div className={styles.toolRow}>
            <div className={styles.toolLead}>
              <div className={styles.cityWrap} ref={cityWrapRef}>
                <button
                  ref={cityButtonRef}
                  type="button"
                  className={styles.cityBtn}
                  aria-expanded={menu}
                  aria-haspopup="dialog"
                  aria-controls={menuId}
                  onClick={() => setMenu((open) => !open)}
                >
                  <PinIcon />
                  <span>{copy.cities[city]}</span>
                  <ChevronIcon />
                </button>
                {menu ? (
                  <div
                    ref={cityDialogRef}
                    id={menuId}
                    className={styles.sheet}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={cityTitleId}
                    onKeyDown={onCityKey}
                  >
                    <button type="button" className={styles.sheetBackdrop} aria-label={copy.cityClose} onClick={() => closeMenu()} />
                    <div className={styles.sheetPanel}>
                      <div className={styles.sheetHead}>
                        <h2 id={cityTitleId}>{copy.cityOpen}</h2>
                        <button type="button" className={styles.sheetClose} onClick={() => closeMenu()}>
                          {copy.cityClose}
                        </button>
                      </div>
                      <ul className={styles.menu} role="listbox" aria-label={copy.cityLabel}>
                        {CITY_IDS.map((item) => (
                          <li key={item}>
                            <button type="button" role="option" aria-selected={item === city} aria-current={item === city ? "true" : undefined} onClick={() => chooseCity(item)}>
                              <PinIcon />
                              <span>{copy.cities[item]}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {tool ? <DeviceClock /> : null}
            <p className={styles.sky}>
              {headerWeather ? (
                <>
                  {Math.round(headerWeather.temperatureC)}° · {copy.conditions[headerWeather.kind]}
                  {cachedWeather ? ` · ${copy.weatherSaved}` : null}
                  {" · "}
                  <a href="https://open-meteo.com/">{copy.weatherSource}</a>
                </>
              ) : (
                copy.weatherUnavailable
              )}
            </p>
          </div>
        </header>
        <nav className={styles.rail} aria-label={copy.navLabel}>
          <ul className={styles.railList}>
            <li>
              <Link href={pathFor(lang, undefined, city)} aria-current={tool ? undefined : "page"}>
                {copy.nav.home}
              </Link>
            </li>
            {HUB_SLUGS.map((item) => (
              <li key={item}>
                <Link href={pathFor(lang, item, city)} aria-current={tool === item || (item === "explore" && isGuide(tool)) || (item === "tools" && isUtility(tool)) ? "page" : undefined}>
                  {copy.nav[item]}
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.kicker}>{copy.situationLabel}</p>
          <ul className={styles.railList}>
            {copy.situations.map((item) => (
              <li key={item.tool}>
                <Link href={pathFor(lang, item.tool, city)} aria-current={tool === item.tool ? "page" : undefined}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.kicker}>{copy.destinationLabel}</p>
          <ul className={styles.railList}>
            {CITY_IDS.map((item) => (
              <li key={item}>
                <Link href={pathFor(lang, GUIDE_FOR[item], item)} aria-current={tool === GUIDE_FOR[item] ? "page" : undefined}>
                  {copy.cities[item]}
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.kicker}>{copy.toolsLabel}</p>
          <ul className={styles.railList}>
            {UTILITY_SLUGS.map((item) => (
              <li key={item}>
                <Link href={pathFor(lang, item, city)} aria-current={tool === item ? "page" : undefined}>
                  {copy.tools[item].title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main id="kit-main" className={styles.main}>
          {isUtility(tool) ? <CityGuideLink copy={copy} lang={lang} city={city} /> : null}
          {!tool ? (
            <Home
              copy={copy}
              lang={lang}
              city={city}
              moment={moment}
              scenario={scenario}
              supportHref={supportHref}
              onSupportClick={onSupportClick}
            />
          ) : null}
          {tool === "esim" ? (
            <Esim
              copy={copy}
              city={city}
              onRequest={() => track("esim_request_click", { language: lang, city, tool: "esim" })}
            />
          ) : null}
          {tool === "arrival" ? <Arrival copy={copy} /> : null}
          {tool === "money" ? <Money copy={copy} lang={lang} rates={rates} /> : null}
          {tool === "phrases" ? <Phrases copy={copy} /> : null}
          {tool === "weather" ? <Weather copy={copy} lang={lang} city={city} weather={weather} /> : null}
          {tool === "safety" ? <Safety copy={copy} /> : null}
          {tool === "packing" ? <Packing copy={copy} /> : null}
          {tool === "family-planner" ? <FamilyPlanner lang={lang} city={city} /> : null}
          {tool === "food" ? <FamilyFoodGuide lang={lang} city={city} /> : null}
          {isGuide(tool) ? <Guide copy={copy} tool={tool} /> : null}
          {tool === "explore" ? <Explore copy={copy} lang={lang} city={city} /> : null}
          {tool === "tools" ? <ToolsHub copy={copy} lang={lang} city={city} /> : null}
          {tool === "trip" ? <Trip copy={copy} lang={lang} city={city} supportHref={supportHref} onSupportClick={onSupportClick} /> : null}
          {tool && tool !== "trip" ? (
            <p className={styles.supportLine}>
              <a href={supportHref} target="_blank" rel="noreferrer" onClick={onSupportClick}>
                {copy.supportTitle}
              </a>
            </p>
          ) : null}
        </main>
        <nav className={styles.tabbar} aria-label={copy.navLabel}>
          <Link href={pathFor(lang, undefined, city)} aria-current={tool ? undefined : "page"} onKeyDown={activateOnSpace}>
            <HomeIcon />
            <span>{copy.nav.home}</span>
          </Link>
          <Link href={pathFor(lang, "explore", city)} aria-current={tool === "explore" || isGuide(tool) ? "page" : undefined} onKeyDown={activateOnSpace}>
            <ExploreIcon />
            <span>{copy.nav.explore}</span>
          </Link>
          <Link href={pathFor(lang, "tools", city)} aria-current={tool === "tools" || isUtility(tool) ? "page" : undefined} onKeyDown={activateOnSpace}>
            <ToolsIcon />
            <span>{copy.nav.tools}</span>
          </Link>
          <Link href={pathFor(lang, "trip", city)} aria-current={tool === "trip" ? "page" : undefined} onKeyDown={activateOnSpace}>
            <TripIcon />
            <span>{copy.nav.trip}</span>
          </Link>
        </nav>
        <a className={styles.support} href={supportHref} target="_blank" rel="noreferrer" onClick={onSupportClick}>
          <span>
            {copy.supportTitle}
            <small>{copy.supportHint}</small>
          </span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

function KitPhoto({
  city,
  scenario,
  alt,
  sizes,
  priority = false,
  viewLabel,
  closeLabel,
}: {
  city: CityId;
  scenario: ScenarioId;
  alt: string;
  sizes: string;
  priority?: boolean;
  viewLabel: string;
  closeLabel: string;
}) {
  const picture = photoSet(city, scenario);
  const [open, setOpen] = useState(false);
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const medium = picture.srcSet.split(",")[1]?.trim().split(" ")[0] ?? picture.src;
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const opener = openRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button") ?? []);
      if (items.length < 2) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);
  const dialog = open ? (
    <div ref={dialogRef} className={styles.lightbox} role="dialog" aria-modal="true" aria-label={alt}>
      <button type="button" className={styles.lightboxBackdrop} aria-label={closeLabel} onClick={() => setOpen(false)} />
      <figure className={styles.lightboxFigure}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={picture.src} alt={alt} width={picture.width} height={picture.height} />
        <figcaption>{alt}</figcaption>
        <button ref={closeRef} type="button" className={styles.lightboxClose} onClick={() => setOpen(false)}>
          {closeLabel}
        </button>
      </figure>
    </div>
  ) : null;
  return (
    <>
      <button
        ref={openRef}
        type="button"
        className={styles.photoButton}
        aria-haspopup="dialog"
        aria-label={`${alt}. ${viewLabel}`}
        onClick={() => setOpen(true)}
      >
        {/* Pre-sized WebP. The image optimizer was the slow part of LCP on this page. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={priority ? medium : picture.src}
          srcSet={picture.srcSet}
          sizes={sizes}
          alt=""
          width={picture.width}
          height={picture.height}
          style={{ objectPosition: picture.position }}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
        />
      </button>
      {dialog && typeof document !== "undefined" ? createPortal(dialog, document.body) : null}
    </>
  );
}

function CityGuideLink({ copy, lang, city }: { copy: KitCopy; lang: Lang; city: CityId }) {
  return (
    <p className={styles.note}>
      <Link href={pathFor(lang, GUIDE_FOR[city], city)}>{fillCity(copy.cityGuide, copy.cities[city])}</Link>
    </p>
  );
}

function Explore({ copy, lang, city }: { copy: KitCopy; lang: Lang; city: CityId }) {
  const places = MAP_POINTS.filter((point) => point.city === city);
  return (
    <article>
      <p className={styles.kicker}>{copy.nav.explore}</p>
      <h1 className={`${styles.heroTitle} ${styles.serif}`}>{copy.explorePage.title}</h1>
      <p className={styles.lede}>{copy.explorePage.lede}</p>
      <div className={`${styles.photo} ${styles.guidePhoto}`} data-frame={photoSet(city, "landed").frame}>
        <KitPhoto
          city={city}
          scenario="landed"
          alt={copy.photoAlt[city].landed}
          sizes="(max-width: 1023px) 92vw, 480px"
          viewLabel={copy.viewPhoto}
          closeLabel={copy.closePhoto}
        />
      </div>
      <section className={styles.supportBlock}>
        <h2 className={styles.serif}>{copy.explorePage.mapTitle}</h2>
        <p>{copy.explorePage.mapBody}</p>
        {places.length ? (
          <ul className={styles.list}>
            {places.map((point) => (
              <li key={point.id}>
                <p>
                  <strong>{point.name}</strong>
                </p>
                <p className={styles.note}>
                  {point.source} · {point.verifiedOn}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
      <section>
        <h2 className={styles.kicker}>{copy.situationLabel}</h2>
        <ul className={`${styles.cardGrid} ${styles.situationGrid}`}>
          {copy.situations.map((item) => (
            <li key={item.tool}>
              <Link className={styles.card} href={pathFor(lang, item.tool, city)}>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className={styles.kicker}>{copy.destinationLabel}</h2>
        <ul className={styles.cardGrid}>
          {CITY_IDS.map((item) => (
            <li key={item}>
              <Link className={styles.card} href={pathFor(lang, GUIDE_FOR[item], item)} aria-current={item === city ? "true" : undefined}>
                <strong>{copy.cities[item]}</strong>
                <span>{copy.tools[GUIDE_FOR[item]].glance}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function ToolsHub({ copy, lang, city }: { copy: KitCopy; lang: Lang; city: CityId }) {
  return (
    <article>
      <p className={styles.kicker}>{copy.nav.tools}</p>
      <h1 className={`${styles.heroTitle} ${styles.serif}`}>{copy.toolsPage.title}</h1>
      <p className={styles.lede}>{copy.toolsPage.lede}</p>
      <ul className={`${styles.cardGrid} ${styles.toolGrid}`}>
        {UTILITY_SLUGS.map((item) => (
          <li key={item}>
            <Link className={styles.card} href={pathFor(lang, item, city)}>
              <strong>{copy.tools[item].title}</strong>
              <span>{copy.tools[item].glance}</span>
            </Link>
          </li>
        ))}
      </ul>
      <CityGuideLink copy={copy} lang={lang} city={city} />
    </article>
  );
}

function Trip({
  copy,
  lang,
  city,
  supportHref,
  onSupportClick,
}: {
  copy: KitCopy;
  lang: Lang;
  city: CityId;
  supportHref: string;
  onSupportClick: () => void;
}) {
  const page = copy.trip;
  const saved = useSavedJson<TripData>(TRIP_KEY);
  const trip = saved ?? EMPTY_TRIP;
  const [draft, setDraft] = useState("");
  const address = useSavedString(ADDRESS_KEY);

  function update(next: TripData) {
    writeJson(TRIP_KEY, next);
  }

  function exportData() {
    const dump: Record<string, string> = {};
    for (const key of kitStorageKeys()) {
      const value = window.localStorage.getItem(key);
      if (value !== null) dump[key] = value;
    }
    const file = new Blob([JSON.stringify(dump, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "govietstay-travel-kit.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function clearData() {
    if (!window.confirm(page.clearConfirm)) return;
    for (const key of kitStorageKeys()) {
      window.localStorage.removeItem(key);
      window.dispatchEvent(new Event(key));
    }
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <article>
      <p className={styles.kicker}>{copy.nav.trip}</p>
      <h1 className={`${styles.heroTitle} ${styles.serif}`}>{page.title}</h1>
      <p className={styles.lede}>{page.lede}</p>
      <p className={styles.supportLine}>
        <Link href={pathFor(lang, "family-planner", city)}>{copy.tools["family-planner"].title} →</Link>
      </p>
      <div className={`${styles.photo} ${styles.guidePhoto}`} data-frame={photoSet(city, "landed").frame}>
        <KitPhoto
          city={city}
          scenario="landed"
          alt={copy.photoAlt[city].landed}
          sizes="(max-width: 1023px) 92vw, 480px"
          viewLabel={copy.viewPhoto}
          closeLabel={copy.closePhoto}
        />
      </div>
      <p className={styles.note}>{page.stored}</p>
      <p className={styles.note}>
        {copy.cityLabel}: {copy.cities[city]}
      </p>
      <div className={styles.fields}>
        <label>
          {page.arrive}
          <input type="date" value={trip.arrive} onChange={(event) => update({ ...trip, arrive: event.target.value })} />
        </label>
        <label>
          {page.leave}
          <input type="date" value={trip.leave} onChange={(event) => update({ ...trip, leave: event.target.value })} />
        </label>
      </div>
      <section>
        <h2 className={styles.serif}>{page.notesTitle}</h2>
        <ul className={styles.list}>
          {trip.notes.map((note, index) => (
            <li key={`${note}-${index}`} className={styles.noteRow}>
              <span>{note}</span>
              <button type="button" className={styles.textBtn} onClick={() => update({ ...trip, notes: trip.notes.filter((_, item) => item !== index) })}>
                {page.removeNote}
              </button>
            </li>
          ))}
        </ul>
        <form
          className={styles.fields}
          onSubmit={(event) => {
            event.preventDefault();
            const text = draft.trim();
            if (!text) return;
            update({ ...trip, notes: [...trip.notes, text] });
            setDraft("");
          }}
        >
          <label>
            {page.notesTitle}
            <input value={draft} placeholder={page.notesPlaceholder} onChange={(event) => setDraft(event.target.value)} />
          </label>
          <button type="submit" className={styles.ghost}>
            {page.addNote}
          </button>
        </form>
      </section>
      <section>
        <h2 className={styles.serif}>{page.esimTitle}</h2>
        <p className={styles.note}>{page.esimHint}</p>
        <label className={styles.fields}>
          {page.esimTitle}
          <textarea value={trip.esimNote} placeholder={page.esimPlaceholder} onChange={(event) => update({ ...trip, esimNote: event.target.value })} />
        </label>
      </section>
      <div className={styles.links}>
        <Link href={pathFor(lang, "packing", city)}>{page.packingLink}</Link>
        <Link href={pathFor(lang, "arrival", city)}>{page.addressLink}</Link>
        <Link href={pathFor(lang, "safety", city)}>{page.safetyLink}</Link>
        <Link href={pathFor(lang, GUIDE_FOR[city], city)}>{fillCity(copy.cityGuide, copy.cities[city])}</Link>
      </div>
      {address ? <p className={styles.note}>{address}</p> : null}
      <div className={styles.actions}>
        <button type="button" className={styles.ghost} onClick={exportData}>
          {page.exportData}
        </button>
        <button type="button" className={styles.ghost} onClick={clearData}>
          {page.clearData}
        </button>
      </div>
      <a className={styles.cta} href={supportHref} target="_blank" rel="noreferrer" onClick={onSupportClick}>
        {copy.supportTitle}
      </a>
    </article>
  );
}

function useSavedString(key: string) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const handler = () => onStoreChange();
    window.addEventListener("storage", handler);
    window.addEventListener(key, handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener(key, handler);
    };
  }, [key]);
  const read = useCallback(() => readString(key), [key]);
  return useSyncExternalStore(subscribe, read, () => "");
}

function PinIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.5a7 7 0 0 0-7 7c0 5.1 6.1 11.2 6.4 11.5a.9.9 0 0 0 1.2 0C12.9 20.7 19 14.6 19 9.5a7 7 0 0 0-7-7Zm0 9.6a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2Z"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M6.7 9.2a1 1 0 0 1 1.4 0L12 13.1l3.9-3.9a1 1 0 1 1 1.4 1.4l-4.6 4.6a1 1 0 0 1-1.4 0L6.7 10.6a1 1 0 0 1 0-1.4Z" />
    </svg>
  );
}

function StrokeIcon({ children }: { children: ReactNode }) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function HomeIcon() {
  return (
    <StrokeIcon>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M7 10.5V20h10v-9.5" />
    </StrokeIcon>
  );
}

function ExploreIcon() {
  return (
    <StrokeIcon>
      <circle cx="12" cy="12" r="8" />
      <path d="m14.5 9.5-1.2 4.8-4.8 1.2 1.2-4.8 4.8-1.2Z" />
    </StrokeIcon>
  );
}

function ToolsIcon() {
  return (
    <StrokeIcon>
      <path d="M14.5 5.5a3.5 3.5 0 0 0-4.6 4.6L4 16l4 4 5.9-5.9a3.5 3.5 0 0 0 4.6-4.6l-2.4 2.4-2-2 2.4-2.4Z" />
    </StrokeIcon>
  );
}

function TripIcon() {
  return (
    <StrokeIcon>
      <rect x="6" y="7" width="12" height="13" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M9 12h6" />
    </StrokeIcon>
  );
}

function Home({
  copy,
  lang,
  city,
  moment,
  scenario,
  supportHref,
  onSupportClick,
}: {
  copy: KitCopy;
  lang: Lang;
  city: CityId;
  moment: MomentId;
  scenario: ScenarioId;
  supportHref: string;
  onSupportClick: () => void;
}) {
  const now = copy.now[city][moment];
  return (
    <>
      <HybridPremiumIntro lang={lang} city={city} />
      <div className={styles.homeStage}>
      <figure className={styles.opening}>
        <div className={styles.photo} data-frame={photoSet(city, scenario).frame}>
          <KitPhoto
            city={city}
            scenario={scenario}
            alt={copy.photoAlt[city][scenario]}
            sizes="(max-width: 1023px) 220px, 320px"
            viewLabel={copy.viewPhoto}
            closeLabel={copy.closePhoto}
            priority
          />
        </div>
        <div className={styles.openingShade} aria-hidden="true" />
        <figcaption className={styles.openingCaption}>{copy.cities[city]}</figcaption>
      </figure>
      <div className={styles.homeGrid}>
        <div className={styles.clockBlock}>
          <DeviceClock large />
          <p className={styles.clockNote}>{copy.clockLabel}</p>
        </div>
        <section className={styles.nowCard} aria-live="polite">
          <p className={styles.kicker}>{copy.nowKicker}</p>
          <h2 className={styles.heroTitle}>{now.title}</h2>
          <p className={styles.lede}>{now.body}</p>
          <Link className={styles.cta} href={pathFor(lang, now.tool, city)}>
            {now.cta}
          </Link>
        </section>
        <ul className={styles.keys}>
          {copy.situations.map((item) => (
            <li key={item.tool}>
              <Link href={pathFor(lang, item.tool, city)} aria-current={item.tool === now.tool ? "true" : undefined} data-kind={item.tool === "safety" ? "emergency" : undefined}>
                <strong>{item.title}</strong>
                <small>{item.body}</small>
              </Link>
            </li>
          ))}
        </ul>
        <aside className={styles.why}>
          <h2 className={styles.whyTitle}>{copy.portalTitle}</h2>
          <p>{copy.portalLede}</p>
        </aside>
      </div>
      </div>
      <section>
        <h2 className={styles.kicker}>{copy.destinationLabel}</h2>
        <ul className={styles.chips}>
          {CITY_IDS.map((item) => (
            <li key={item}>
              <Link href={pathFor(lang, GUIDE_FOR[item], item)} aria-current={item === city ? "true" : undefined}>
                {copy.cities[item]}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.gift}>
        <p className={styles.kicker}>{copy.giftKicker}</p>
        <h2 className={styles.serif}>{copy.giftTitle}</h2>
        <p>{copy.giftBody}</p>
        <Link className={styles.cta} href={pathFor(lang, "esim", city)}>
          {copy.giftCta}
        </Link>
      </section>
      <section>
        <h2 className={styles.kicker}>{copy.toolsLabel}</h2>
        <ul className={styles.toolIndex}>
          {UTILITY_SLUGS.map((item) => (
            <li key={item}>
              <Link href={pathFor(lang, item, city)}>
                <strong>{copy.tools[item].title}</strong>
                <span>{copy.tools[item].glance}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className={styles.note}>{copy.guideNote}</p>
      </section>
      <section className={`${styles.supportBlock} ${styles.letter}`}>
        <p className={styles.kicker}>{copy.trust}</p>
        <h2 className={styles.serif}>{copy.supportBlockTitle}</h2>
        <p>{copy.supportBlockBody}</p>
        <p className={styles.note}>{copy.noReply}</p>
        <a className={styles.cta} href={supportHref} target="_blank" rel="noreferrer" onClick={onSupportClick}>
          {copy.supportTitle}
        </a>
      </section>
      <Faq title={copy.homeFaqTitle} items={copy.homeFaq} />
      <p className={styles.note}>{copy.otherCities}</p>
    </>
  );
}

function Esim({ copy, city, onRequest }: { copy: KitCopy; city: CityId; onRequest: () => void }) {
  const page = copy.esim;
  return (
    <article>
      <p className={styles.kicker}>{copy.giftKicker}</p>
      <h1 className={`${styles.heroTitle} ${styles.serif}`}>{copy.giftTitle}</h1>
      <p className={styles.lede}>{page.lead}</p>
      <div className={styles.facts}>
        {page.youGet.map((item) => (
          <p className={styles.factCard} key={item}>
            {item}
          </p>
        ))}
      </div>
      <h2 className={styles.serif}>{page.howTitle}</h2>
      <ol className={styles.steps}>
        {page.how.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className={styles.note}>{page.unknown}</p>
      <a className={styles.cta} href={whatsAppHref(fillCity(page.message, copy.cities[city]))} target="_blank" rel="noreferrer" onClick={onRequest}>
        {page.button}
      </a>
      <p className={styles.note}>{page.foot}</p>
      <Faq title={copy.homeFaqTitle} items={page.faq} />
    </article>
  );
}

function Arrival({ copy }: { copy: KitCopy }) {
  const page = copy.arrival;
  const checks = useTicks(ARRIVAL_KEY, page.checklist.length);
  const done = checks.filter(Boolean).length;
  return (
    <article>
      <h1 className={`${styles.heroTitle} ${styles.serif}`}>{copy.tools.arrival.title}</h1>
      <p className={styles.lede}>{page.lead}</p>
      {page.blocks.map((block) => (
        <section className={styles.block} key={block.title}>
          <h2 className={styles.serif}>{block.title}</h2>
          {block.paragraphs.map((paragraph) => (
            <p className={styles.prose} key={paragraph}>
              {paragraph}
            </p>
          ))}
        </section>
      ))}
      <DriverCard copy={copy} />
      <section>
        <h2 className={styles.serif}>{page.checklistTitle}</h2>
        <p className={styles.note}>{page.progress.replace("{done}", String(done)).replace("{total}", String(page.checklist.length))}</p>
        {page.checklist.map((item, index) => (
          <button
            key={item}
            type="button"
            className={styles.check}
            role="checkbox"
            aria-checked={Boolean(checks[index])}
            onClick={() => {
              const next = checks.map((value, itemIndex) => (itemIndex === index ? !value : value));
              writeTicks(ARRIVAL_KEY, next);
            }}
          >
            <span />
            <strong>{item}</strong>
          </button>
        ))}
        <p className={styles.note}>{page.storageNote}</p>
      </section>
    </article>
  );
}

function DriverCard({ copy }: { copy: KitCopy }) {
  const page = copy.arrival;
  const client = useClient();
  const stored = client ? readString(ADDRESS_KEY) : "";
  const [draft, setDraft] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const value = draft ?? stored;
  const ready = value.trim().length > 0;
  useEffect(() => {
    if (!show) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShow(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show]);
  return (
    <section className={styles.block}>
      <h2 className={styles.serif}>{page.addressTitle}</h2>
      <p className={styles.note}>{page.addressHint}</p>
      <div className={styles.fields}>
        <label>
          {page.addressTitle}
          <textarea
            lang="vi"
            translate="no"
            rows={3}
            value={value}
            placeholder={page.addressPlaceholder}
            onChange={(event) => {
              setDraft(event.target.value);
              writeString(ADDRESS_KEY, event.target.value);
            }}
          />
        </label>
      </div>
      <button type="button" className={styles.cta} disabled={!ready} onClick={() => ready && setShow(true)}>
        {page.addressShow}
      </button>
      {!ready ? <p className={styles.note}>{page.addressEmpty}</p> : null}
      {show && ready ? (
        <div className={styles.stage} role="dialog" aria-modal="true" aria-label={page.addressTitle}>
          <p lang="vi" translate="no">
            {value.trim()}
          </p>
          <button type="button" autoFocus onClick={() => setShow(false)}>
            {page.addressClose}
          </button>
        </div>
      ) : null}
    </section>
  );
}

function Money({ copy, lang, rates }: { copy: KitCopy; lang: Lang; rates: RatesSnapshot | null }) {
  const page = copy.money;
  const saved = useSavedJson<RatesSnapshot>(RATES_KEY);
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState<Currency>("USD");
  const [to, setTo] = useState<Currency>("VND");
  const [fresh, setFresh] = useState<RatesSnapshot | null>(null);
  const [note, setNote] = useState("");
  const cached = saved?.vndPerUsd ? saved : null;
  const live = fresh ?? rates ?? cached;
  const savedOnly = !fresh && !rates && Boolean(cached);
  const parsed = parseAmount(amount);
  const result = live && parsed !== null ? convertRate(parsed, from, to, live) : null;

  async function refresh() {
    setNote("");
    try {
      const response = await fetch(RATES_URL);
      if (!response.ok) throw new Error("status");
      const next = snapshotFromRates(await response.json());
      if (!next) throw new Error("shape");
      writeJson(RATES_KEY, next);
      setFresh(next);
    } catch {
      if (!live) setNote(page.unavailable);
    }
  }

  return (
    <article>
      <h1 className={`${styles.heroTitle} ${styles.serif}`}>{copy.tools.money.title}</h1>
      <p className={styles.lede}>{page.lead}</p>
      <div className={styles.fields}>
        <label>
          {page.amount}
          <input inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} />
        </label>
        <label>
          {page.from}
          <select value={from} onChange={(event) => setFrom(event.target.value as Currency)}>
            {CURRENCIES.map((item) => (
              <option key={item} value={item}>
                {page.currencyName[item]}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className={styles.ghost}
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
        >
          {page.swap}
        </button>
        <label>
          {page.to}
          <select value={to} onChange={(event) => setTo(event.target.value as Currency)}>
            {CURRENCIES.map((item) => (
              <option key={item} value={item}>
                {page.currencyName[item]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className={styles.kicker}>{page.result}</p>
      <p className={`${styles.result} ${styles.serif}`}>{result === null ? page.empty : formatAmount(result, to, lang)}</p>
      <p className={styles.note}>{page.reference}</p>
      {live ? (
        <p className={styles.note}>
          {savedOnly ? page.saved : live.updatedAt}{" "}
          <a href="https://www.exchangerate-api.com">{page.sourceName}</a>
        </p>
      ) : (
        <p className={styles.note}>{page.unavailable}</p>
      )}
      {note ? <p className={styles.note}>{note}</p> : null}
      <button type="button" className={styles.ghost} onClick={refresh}>
        {page.refresh}
      </button>
      {page.blocks.map((block) => (
        <section className={styles.block} key={block.title}>
          <h2 className={styles.serif}>{block.title}</h2>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
    </article>
  );
}

function Phrases({ copy }: { copy: KitCopy }) {
  const [open, setOpen] = useState<number | null>(null);
  const item = open === null ? null : copy.phrases.items[open];
  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <article>
      <h1 className={`${styles.heroTitle} ${styles.serif}`}>{copy.tools.phrases.title}</h1>
      <p className={styles.lede}>{copy.phrases.lead}</p>
      <p className={styles.note}>{copy.phrases.honest}</p>
      {copy.phrases.items.map((phrase, index) => (
        <button key={phrase.vi} type="button" className={styles.phrase} onClick={() => setOpen(index)}>
          <b lang="vi" translate="no">
            {phrase.vi}
          </b>
          <span>{phrase.meaning}</span>
        </button>
      ))}
      {item ? (
        <div className={styles.stage} role="dialog" aria-modal="true" aria-label={item.meaning}>
          <p lang="vi" translate="no">
            {item.vi}
          </p>
          <button type="button" autoFocus onClick={() => setOpen(null)}>
            {copy.phrases.close}
          </button>
        </div>
      ) : null}
    </article>
  );
}

function Weather({
  copy,
  lang,
  city,
  weather,
}: {
  copy: KitCopy;
  lang: Lang;
  city: CityId;
  weather: WeatherSnapshot | null;
}) {
  const router = useRouter();
  const page = copy.weatherPage;
  const saved = useSavedJson<WeatherSnapshot>(`gvs-tk-wx-${city}`);
  const [fresh, setFresh] = useState<WeatherSnapshot | null>(null);
  const [note, setNote] = useState("");
  const server = weather && weather.city === city ? weather : null;
  const freshOk = fresh && fresh.city === city ? fresh : null;
  const savedOk = saved && saved.city === city ? saved : null;
  const shown = freshOk ?? server ?? savedOk;
  const savedOnly = !freshOk && !server && Boolean(savedOk);

  async function refresh(nextCity = city) {
    setNote("");
    try {
      const response = await fetch(weatherUrl(nextCity));
      if (!response.ok) throw new Error("status");
      const next = snapshotFromWeather(nextCity, await response.json());
      if (!next) throw new Error("shape");
      writeJson(`gvs-tk-wx-${nextCity}`, next);
      setFresh(next);
    } catch {
      if (!shown) setNote(page.unavailable);
    }
  }
  return (
    <article>
      <h1 className={`${styles.heroTitle} ${styles.serif}`}>{copy.tools.weather.title}</h1>
      <p className={styles.lede}>{page.lead}</p>
      <div className={styles.actions}>
        {CITY_IDS.map((item) => (
          <button
            key={item}
            type="button"
            className={item === city ? styles.cta : styles.ghost}
            aria-current={item === city}
            onClick={() => router.push(pathFor(lang, "weather", item))}
          >
            {copy.cities[item]}
          </button>
        ))}
      </div>
      {shown ? (
        <>
          <p className={styles.kicker}>{page.today}</p>
          <p className={`${styles.result} ${styles.serif}`}>
            {Math.round(shown.temperatureC)}° · {copy.conditions[shown.kind]}
          </p>
          <p className={styles.note}>
            {savedOnly ? page.saved : shown.observedAt} · <a href="https://open-meteo.com/">{copy.weatherSource}</a>
          </p>
          <h2 className={styles.serif}>{page.ahead}</h2>
          {shown.days.map((day) => (
            <div className={styles.day} key={day.date}>
              <span>{day.date}</span>
              <span>
                {Math.round(day.minC)}–{Math.round(day.maxC)}° · {copy.conditions[day.kind]}
                {day.rainChance !== null ? ` · ${Math.round(day.rainChance)}%` : ""}
              </span>
            </div>
          ))}
        </>
      ) : (
        <p className={styles.note}>{page.unavailable}</p>
      )}
      {note ? <p className={styles.note}>{note}</p> : null}
      <button type="button" className={styles.ghost} onClick={() => void refresh(city)}>
        {page.refresh}
      </button>
      <h2 className={styles.serif}>{page.rainTitle}</h2>
      {page.rain[city].map((item) => (
        <section className={styles.block} key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.detail}</p>
        </section>
      ))}
    </article>
  );
}

function Safety({ copy }: { copy: KitCopy }) {
  return (
    <article>
      <h1 className={`${styles.heroTitle} ${styles.serif}`}>{copy.tools.safety.title}</h1>
      <p className={styles.lede}>{copy.safety.lead}</p>
      {copy.safety.numbers.map((item) => (
        <a key={item.tel} className={styles.emergency} href={`tel:${item.tel}`}>
          <span>
            {item.name}
            <small className={styles.note}>{item.detail}</small>
          </span>
          <b>{item.tel}</b>
        </a>
      ))}
      <p className={styles.note}>{copy.safety.foot}</p>
      {copy.safety.blocks.map((block) => (
        <section className={styles.block} key={block.title}>
          <h2 className={styles.serif}>{block.title}</h2>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
      <Faq title={copy.homeFaqTitle} items={copy.safety.faq} />
    </article>
  );
}

function Packing({ copy }: { copy: KitCopy }) {
  const checks = useTicks(PACKING_KEY, copy.packing.items.length);
  const done = checks.filter(Boolean).length;
  return (
    <article>
      <h1 className={`${styles.heroTitle} ${styles.serif}`}>{copy.tools.packing.title}</h1>
      <p className={styles.lede}>{copy.packing.lead}</p>
      <p className={styles.note}>
        {copy.packing.progress.replace("{done}", String(done)).replace("{total}", String(copy.packing.items.length))}
      </p>
      {copy.packing.items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          className={styles.check}
          role="checkbox"
          aria-checked={Boolean(checks[index])}
          onClick={() => {
            const next = checks.map((value, itemIndex) => (itemIndex === index ? !value : value));
            writeTicks(PACKING_KEY, next);
          }}
        >
          <span />
          <span>
            <strong>{item.label}</strong>
            {item.note ? <small>{item.note}</small> : null}
          </span>
        </button>
      ))}
      <p className={styles.note}>{copy.packing.storageNote}</p>
    </article>
  );
}

function Guide({ copy, tool }: { copy: KitCopy; tool: keyof typeof GUIDE_CITY }) {
  const page = guideCopy(copy, tool);
  const city = GUIDE_CITY[tool];
  return (
    <article>
      <p className={styles.kicker}>{page.kicker}</p>
      <h1 className={`${styles.heroTitle} ${styles.serif}`}>{page.title}</h1>
      <p className={styles.lede}>{page.lede}</p>
      <div className={`${styles.photo} ${styles.guidePhoto}`} data-frame={photoSet(city, "landed").frame}>
        <KitPhoto
          city={city}
          scenario="landed"
          alt={copy.photoAlt[city].landed}
          sizes="(max-width: 1023px) 92vw, 480px"
          viewLabel={copy.viewPhoto}
          closeLabel={copy.closePhoto}
        />
      </div>
      {page.blocks.map((block) => (
        <section className={styles.block} key={block.title}>
          <h2 className={styles.serif}>{block.title}</h2>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
      <Faq title={copy.homeFaqTitle} items={page.faq} />
      <section>
        <h2 className={styles.serif}>{page.elsewhere}</h2>
        <div className={styles.links}>
          {page.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}

function Faq({ title, items }: { title: string; items: { q: string; a: string }[] }) {
  return (
    <section className={styles.faq}>
      <h2 className={styles.serif}>{title}</h2>
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </section>
  );
}
