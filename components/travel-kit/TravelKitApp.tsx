"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useState, useSyncExternalStore } from "react";
import { fillCity, parseAmount, photoFor, vietnamDayPeriod, whatsAppHref } from "@/lib/travel-kit/config";
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
import { readJson, readString, readTicks, subscribeTicks, writeJson, writeString, writeTicks } from "@/lib/travel-kit/ticks";
import {
  CITY_IDS,
  CURRENCIES,
  LANGS,
  TOOL_SLUGS,
  type CityId,
  type Currency,
  type KitCopy,
  type Lang,
  type MomentId,
  type ScenarioId,
  type ToolSlug,
} from "@/lib/travel-kit/types";
import styles from "./travel-kit.module.css";

const ARRIVAL_KEY = "gvs-travel-kit-arrival-v2";
const PACKING_KEY = "gvs-travel-kit-packing-v1";
const ADDRESS_KEY = "gvs-tk-address";
const RATES_KEY = "gvs-tk-rates";

type Props = {
  lang: Lang;
  tool?: ToolSlug;
  initialCity: CityId;
  weather: WeatherSnapshot | null;
  rates: RatesSnapshot | null;
};

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
  const savedWeather = useSavedJson<WeatherSnapshot>(`gvs-tk-wx-${city}`);
  const period = vietnamDayPeriod();
  const liveWeather = weather && weather.city === city ? weather : null;
  const cachedWeather = !liveWeather && savedWeather && savedWeather.city === city ? savedWeather : null;
  const headerWeather = liveWeather ?? cachedWeather;
  const moment: MomentId = headerWeather && isWet(headerWeather.kind, headerWeather.precipitationMm) ? "rain" : period === "evening" ? "evening" : "day";
  const scenario: ScenarioId = moment === "day" ? "landed" : moment;

  useEffect(() => {
    if (weather) writeJson(`gvs-tk-wx-${weather.city}`, weather);
  }, [weather]);
  useEffect(() => {
    if (rates) writeJson("gvs-tk-rates", rates);
  }, [rates]);

  return (
    <div className={styles.canvas} lang={lang}>
      <div className={styles.device}>
        <a className={styles.skip} href="#kit-main">
          {copy.skip}
        </a>
        <header className={styles.header}>
          <div className={styles.brandRow}>
            <div>
              <p className={styles.brand}>{copy.brand}</p>
              <p className={styles.trust}>{copy.trust}</p>
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
            {tool ? (
              <Link className={styles.back} href={pathFor(lang, undefined, city)}>
                {copy.back}
              </Link>
            ) : (
              <div>
                <button
                  type="button"
                  className={styles.cityBtn}
                  aria-expanded={menu}
                  aria-controls={menuId}
                  onClick={() => setMenu((open) => !open)}
                >
                  {copy.cities[city]}
                </button>
                {menu ? (
                  <ul id={menuId} className={styles.menu}>
                    {CITY_IDS.map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          aria-current={item === city}
                          onClick={() => {
                            setMenu(false);
                            router.push(pathFor(lang, tool, item));
                          }}
                        >
                          {copy.cities[item]}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )}
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
        <main id="kit-main" className={styles.main}>
          {!tool ? <Home copy={copy} lang={lang} city={city} moment={moment} scenario={scenario} /> : null}
          {tool === "esim" ? <Esim copy={copy} city={city} /> : null}
          {tool === "arrival" ? <Arrival copy={copy} /> : null}
          {tool === "money" ? <Money copy={copy} lang={lang} rates={rates} /> : null}
          {tool === "phrases" ? <Phrases copy={copy} /> : null}
          {tool === "weather" ? <Weather copy={copy} lang={lang} city={city} weather={weather} /> : null}
          {tool === "safety" ? <Safety copy={copy} /> : null}
          {tool === "packing" ? <Packing copy={copy} /> : null}
          {tool === "da-nang" ? <Danang copy={copy} /> : null}
        </main>
        <a className={styles.support} href={whatsAppHref(fillCity(copy.supportMessage, copy.cities[city]))} target="_blank" rel="noreferrer">
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

function Home({
  copy,
  lang,
  city,
  moment,
  scenario,
}: {
  copy: KitCopy;
  lang: Lang;
  city: CityId;
  moment: MomentId;
  scenario: ScenarioId;
}) {
  const now = copy.now[city][moment];
  return (
    <>
      <section>
        <p className={styles.kicker}>{copy.nowKicker}</p>
        <h1 className={`${styles.heroTitle} ${styles.serif}`}>{now.title}</h1>
        <p className={styles.lede}>{now.body}</p>
        <Link className={styles.cta} href={pathFor(lang, now.tool, city)}>
          {now.cta}
        </Link>
      </section>
      <div className={styles.photo}>
        <Image src={photoFor(city, scenario)} alt={copy.photoAlt[city][scenario]} fill priority sizes="(min-width: 840px) 440px, 100vw" quality={75} />
      </div>
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
        <ul className={styles.list}>
          {TOOL_SLUGS.map((item) => (
            <li key={item}>
              <Link className={styles.row} href={pathFor(lang, item, city)}>
                <span>
                  <strong>{copy.tools[item].title}</strong>
                  <span>{copy.tools[item].glance}</span>
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className={styles.note}>{copy.guideNote}</p>
      </section>
      <Faq title={copy.homeFaqTitle} items={copy.homeFaq} />
      <p className={styles.note}>{copy.otherCities}</p>
    </>
  );
}

function Esim({ copy, city }: { copy: KitCopy; city: CityId }) {
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
      <a className={styles.cta} href={whatsAppHref(fillCity(page.message, copy.cities[city]))} target="_blank" rel="noreferrer">
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

function Danang({ copy }: { copy: KitCopy }) {
  return (
    <article>
      <p className={styles.kicker}>{copy.danang.kicker}</p>
      <h1 className={`${styles.heroTitle} ${styles.serif}`}>{copy.danang.title}</h1>
      <p className={styles.lede}>{copy.danang.lede}</p>
      <div className={styles.photo}>
        <Image
          src="/travel-kit/da-nang-golden-bridge.webp"
          alt={copy.photoAlt.danang.landed}
          fill
          priority
          sizes="(min-width: 840px) 440px, 100vw"
          quality={75}
        />
      </div>
      {copy.danang.blocks.map((block) => (
        <section className={styles.block} key={block.title}>
          <h2 className={styles.serif}>{block.title}</h2>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
      <Faq title={copy.homeFaqTitle} items={copy.danang.faq} />
      <section>
        <h2 className={styles.serif}>{copy.danang.elsewhere}</h2>
        <div className={styles.links}>
          {copy.danang.links.map((link) => (
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
