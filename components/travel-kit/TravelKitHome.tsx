"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { KitSheet, type Enlarged } from "./KitSheet";
import {
  fillCity,
  LANDMARKS,
  parseCity,
  parseScenario,
  periodToScenario,
  photoFor,
  readChecklist,
  SAMPLE_WEATHER,
  SCENARIO_OPENS,
  subscribeChecklist,
  vietnamDayPeriod,
  whatsAppHref,
  writeChecklist,
} from "@/lib/travel-kit/config";
import { dictionaries } from "@/lib/travel-kit/dictionaries";
import {
  CITY_IDS,
  LANGS,
  SCENARIO_IDS,
  UTILITY_IDS,
  type CityId,
  type Currency,
  type Lang,
  type ScenarioId,
  type UtilityId,
} from "@/lib/travel-kit/types";
import styles from "./travel-kit.module.css";

type Props = {
  lang: Lang;
  initialCity?: string;
  initialDay?: string;
};

export function TravelKitHome({ lang, initialCity, initialDay }: Props) {
  const copy = dictionaries[lang];
  const cityMenuId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cityWrapRef = useRef<HTMLDivElement>(null);
  const [city, setCity] = useState<CityId>(parseCity(initialCity) ?? "danang");
  const [day, setDay] = useState<ScenarioId>(parseScenario(initialDay) ?? periodToScenario(vietnamDayPeriod()));
  const [cityOpen, setCityOpen] = useState(false);
  const [utility, setUtility] = useState<UtilityId | null>(null);
  const [enlarged, setEnlarged] = useState<Enlarged | null>(null);
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState<Currency>("USD");
  const [to, setTo] = useState<Currency>("VND");
  const checks = useSyncExternalStore(subscribeChecklist, readChecklistClient, emptyChecklist);
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  const weather = SAMPLE_WEATHER[city][day];
  const today = copy.today[city][day];
  const photo = photoFor(city, day);
  const photoAlt = city === "hoian" && day === "evening" ? copy.photoAltHoiAnEvening : copy.photoAlt[city];
  const greeting = copy.greeting[vietnamDayPeriod()];

  useEffect(() => {
    const next = `/${lang}/travel-kit?city=${city}&day=${day}`;
    const current = `${window.location.pathname}${window.location.search}`;
    if (current !== next) window.history.replaceState(null, "", next);
  }, [lang, city, day]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (utility && !dialog.open) dialog.showModal();
    if (!utility && dialog.open) dialog.close();
  }, [utility]);

  useEffect(() => {
    dialogRef.current?.scrollTo(0, 0);
  }, [utility, enlarged]);

  useEffect(() => {
    if (!cityOpen) return;
    function onPointer(event: PointerEvent) {
      if (!cityWrapRef.current?.contains(event.target as Node)) setCityOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setCityOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [cityOpen]);

  function openUtility(next: UtilityId) {
    setEnlarged(null);
    setCopied("idle");
    setUtility(next);
  }

  function toggleCheck(index: number) {
    const next = copy.checklist.map((_, item) => (item === index ? !checks[item] : Boolean(checks[item])));
    writeChecklist(next);
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(LANDMARKS[city]);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
  }

  return (
    <div className={styles.canvas} lang={lang}>
      <div className={styles.device}>
        <a className={styles.skip} href="#kit-utilities">
          {copy.skip}
        </a>
        <h1 className={styles.srOnly}>{copy.productName}</h1>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <p className={`${styles.greet} ${styles.serif}`} suppressHydrationWarning>
              {greeting}
            </p>
            <nav className={styles.langs} aria-label={copy.langLabel}>
              {LANGS.map((code) => {
                const current = code === lang;
                return (
                  <a
                    key={code}
                    className={current ? `${styles.lang} ${styles.langOn}` : styles.lang}
                    href={`/${code}/travel-kit?city=${city}&day=${day}`}
                    hrefLang={code === "it" ? "it-IT" : code}
                    aria-current={current ? "page" : undefined}
                    lang={code}
                  >
                    <span aria-hidden="true">{code.toUpperCase()}</span>
                    <span className={styles.srOnly}>{copy.languageName[code]}</span>
                  </a>
                );
              })}
            </nav>
          </div>
          <div className={styles.headerBottom}>
            <div className={styles.cityWrap} ref={cityWrapRef}>
              <button
                type="button"
                className={styles.cityBtn}
                aria-expanded={cityOpen}
                aria-controls={cityMenuId}
                onClick={() => setCityOpen((open) => !open)}
              >
                <span>{copy.cities[city]}</span>
                <span className={styles.chev} aria-hidden="true" />
                <span className={styles.srOnly}>{copy.cityLabel}</span>
              </button>
              {cityOpen ? (
                <ul id={cityMenuId} className={styles.cityMenu}>
                  {CITY_IDS.map((id) => (
                    <li key={id}>
                      <button
                        type="button"
                        className={styles.cityOption}
                        aria-current={id === city ? "true" : undefined}
                        onClick={() => {
                          setCity(id);
                          setCityOpen(false);
                        }}
                      >
                        {copy.cities[id]}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <p className={styles.weather}>
              <span className={styles.sampleTag}>{copy.sample}</span>
              <span>
                {weather.tempC}° · {copy.sky[weather.sky]}
              </span>
            </p>
          </div>
        </header>
        <div className={styles.main}>
          <section className={styles.pass} aria-labelledby="today-title">
            <div className={styles.passMedia}>
              <Image
                key={photo}
                src={photo}
                alt={photoAlt}
                fill
                priority
                sizes="(min-width: 840px) 390px, 100vw"
                quality={70}
                className={styles.passImg}
              />
              <div className={styles.passShade} />
              <div className={styles.passTop}>
                <span>GoVietStay</span>
                <span>{copy.sample}</span>
              </div>
            </div>
            <div className={styles.passBody}>
              <p className={styles.kicker}>{copy.todayLabel}</p>
              <h2 id="today-title" className={`${styles.passTitle} ${styles.serif}`}>
                {today.title}
              </h2>
              <p className={styles.passText}>{today.body}</p>
              <button type="button" className={styles.cta} onClick={() => openUtility(SCENARIO_OPENS[city][day])}>
                {today.cta}
              </button>
            </div>
            <div className={styles.days} role="group" aria-label={copy.scenarioHint}>
              {SCENARIO_IDS.map((id) => {
                const selected = id === day;
                return (
                  <button
                    key={id}
                    type="button"
                    className={selected ? `${styles.day} ${styles.dayOn}` : styles.day}
                    aria-pressed={selected}
                    onClick={() => setDay(id)}
                  >
                    {copy.scenarios[id]}
                  </button>
                );
              })}
            </div>
          </section>

          <section id="kit-utilities" aria-labelledby="utilities-title">
            <h2 id="utilities-title" className={styles.sectionLabel}>
              {copy.utilitiesLabel}
            </h2>
            <ul className={styles.grid}>
              {UTILITY_IDS.map((id, index) => (
                <li key={id}>
                  <button type="button" className={styles.tile} onClick={() => openUtility(id)}>
                    <span className={styles.tileIndex}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.tileTitle}>{copy.utilities[id].title}</span>
                    <span className={styles.tileGlance}>{copy.utilities[id].glance}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.faq} aria-labelledby="kit-faq">
            <h2 id="kit-faq">{copy.faqTitle}</h2>
            {copy.faq.map((item) => (
              <article key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </section>
        </div>
        <a
          className={styles.support}
          href={whatsAppHref(fillCity(copy.supportMessage, copy.cities[city]))}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.supportTitle}>{copy.supportTitle}</span>
          <span className={styles.supportHint}>{copy.supportHint}</span>
        </a>
        <dialog
          ref={dialogRef}
          className={enlarged ? `${styles.dialog} ${styles.dialogFull}` : styles.dialog}
          aria-labelledby={enlarged ? "phrase-vi" : "sheet-title"}
          onClose={() => {
            setUtility(null);
            setEnlarged(null);
            setCopied("idle");
          }}
          onClick={(event) => {
            if (event.target === dialogRef.current) dialogRef.current?.close();
          }}
        >
          {utility ? (
            <KitSheet
              lang={lang}
              copy={copy}
              city={city}
              utility={utility}
              enlarged={enlarged}
              onEnlarge={setEnlarged}
              onClose={() => dialogRef.current?.close()}
              amount={amount}
              onAmount={setAmount}
              from={from}
              to={to}
              onFrom={setFrom}
              onTo={setTo}
              onSwap={() => {
                setFrom(to);
                setTo(from);
              }}
              checks={checks}
              onToggle={toggleCheck}
              copied={copied}
              onCopy={copyAddress}
            />
          ) : null}
        </dialog>
      </div>
    </div>
  );
}

const SERVER_CHECKS: boolean[] = [];

function emptyChecklist() {
  return SERVER_CHECKS;
}

function readChecklistClient() {
  return readChecklist();
}
