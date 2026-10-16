"use client";

import { useId } from "react";
import {
  AIRPORT_VI,
  convertSample,
  EMERGENCY_NUMBERS,
  fillCity,
  LANDMARKS,
  parseAmount,
  PHRASES_VI,
  whatsAppHref,
} from "@/lib/travel-kit/config";
import { CURRENCIES, type CityId, type Currency, type Dictionary, type Lang, type UtilityId } from "@/lib/travel-kit/types";
import styles from "./travel-kit.module.css";

export type Enlarged = { vi: string; meaning: string };

type Props = {
  lang: Lang;
  copy: Dictionary;
  city: CityId;
  utility: UtilityId;
  enlarged: Enlarged | null;
  onEnlarge: (value: Enlarged | null) => void;
  onClose: () => void;
  amount: string;
  onAmount: (value: string) => void;
  from: Currency;
  to: Currency;
  onFrom: (value: Currency) => void;
  onTo: (value: Currency) => void;
  onSwap: () => void;
  checks: boolean[];
  onToggle: (index: number) => void;
  copied: "idle" | "done" | "failed";
  onCopy: () => void;
};

function localeFor(lang: Lang) {
  if (lang === "ru") return "ru-RU";
  if (lang === "it") return "it-IT";
  return "en-GB";
}

function formatMoney(amount: number, currency: Currency, lang: Lang) {
  const digits = currency === "VND" ? 0 : 2;
  return new Intl.NumberFormat(localeFor(lang), {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
}

export function KitSheet(props: Props) {
  const { copy, utility, enlarged, onEnlarge, onClose } = props;
  if (enlarged) {
    return (
      <div className={styles.show}>
        <button type="button" className={styles.textBtn} onClick={() => onEnlarge(null)}>
          {copy.back}
        </button>
        <p className={styles.kicker}>{copy.showThis}</p>
        <p id="phrase-vi" lang="vi" translate="no" className={styles.showVi}>
          {enlarged.vi}
        </p>
        <p className={styles.showMeaning}>{enlarged.meaning}</p>
      </div>
    );
  }

  return (
    <div className={styles.sheet}>
      <div className={styles.sheetHead}>
        <h2 id="sheet-title" className={`${styles.sheetTitle} ${styles.serif}`}>
          {copy.utilities[utility].title}
        </h2>
        <button type="button" className={styles.close} onClick={onClose}>
          {copy.close}
        </button>
      </div>
      {utility === "esim" ? <EsimPanel {...props} /> : null}
      {utility === "arrival" ? <ArrivalPanel {...props} /> : null}
      {utility === "currency" ? <CurrencyPanel {...props} /> : null}
      {utility === "phrases" ? <PhrasePanel {...props} /> : null}
      {utility === "weather" ? <WeatherPanel {...props} /> : null}
      {utility === "safety" ? <SafetyPanel {...props} /> : null}
    </div>
  );
}

function EsimPanel({ copy, city }: Props) {
  const href = whatsAppHref(fillCity(copy.esimMessage, copy.cities[city]));
  return (
    <>
      <p className={styles.lead}>{copy.esimLead}</p>
      <ul className={styles.facts}>
        {copy.esimFacts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
      <a className={styles.primaryLink} href={href} target="_blank" rel="noopener noreferrer">
        {copy.esimButton}
      </a>
      <p className={styles.foot}>{copy.esimFoot}</p>
    </>
  );
}

function ArrivalPanel({ copy, city, checks, onToggle }: Props) {
  const done = copy.checklist.filter((_, index) => checks[index]).length;
  const progress = copy.progress.replace("{done}", String(done)).replace("{total}", String(copy.checklist.length));
  return (
    <>
      <p className={styles.lead}>{copy.arrivalLead}</p>
      <p className={styles.note}>{copy.arrivalNote[city]}</p>
      <p className={styles.progress}>{progress}</p>
      <ul className={styles.checks}>
        {copy.checklist.map((item, index) => {
          const checked = Boolean(checks[index]);
          return (
            <li key={item}>
              <button type="button" className={styles.check} role="checkbox" aria-checked={checked} onClick={() => onToggle(index)}>
                <span className={styles.box} aria-hidden="true" />
                <span>{item}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className={styles.airport}>
        <p className={styles.choiceLabel}>{copy.airportCaption}</p>
        <p lang="vi" translate="no">
          {AIRPORT_VI[city]}
        </p>
      </div>
    </>
  );
}

function CurrencyPanel({ copy, lang, amount, onAmount, from, to, onFrom, onTo, onSwap }: Props) {
  const parsed = parseAmount(amount);
  const result = parsed === null ? null : convertSample(parsed, from, to);
  const unit = convertSample(1, from, to);
  return (
    <>
      <p className={styles.lead}>{copy.currencyLead}</p>
      <div className={styles.amountRow}>
        <label className={styles.choiceLabel} htmlFor="kit-amount">
          {copy.amountLabel}
        </label>
        <input
          id="kit-amount"
          className={`${styles.amount} ${styles.serif}`}
          inputMode="decimal"
          autoComplete="off"
          value={amount}
          onChange={(event) => onAmount(event.target.value)}
        />
      </div>
      <CurrencyChoices label={copy.fromLabel} value={from} onChange={onFrom} copy={copy} />
      <button type="button" className={styles.swap} onClick={onSwap}>
        {copy.swap}
      </button>
      <CurrencyChoices label={copy.toLabel} value={to} onChange={onTo} copy={copy} />
      <div className={styles.resultBlock}>
        <p className={styles.resultLabel}>{copy.resultLabel}</p>
        <p className={`${styles.result} ${styles.serif}`} aria-live="polite">
          {result === null ? copy.emptyAmount : `${formatMoney(result, to, lang)} ${to}`}
        </p>
        <p className={styles.rateLine}>
          {copy.sample} · 1 {from} = {formatMoney(unit, to, lang)} {to}
        </p>
      </div>
      <p className={styles.foot}>{copy.rateFoot}</p>
      <p className={styles.note}>{copy.payNote}</p>
    </>
  );
}

function CurrencyChoices({
  label,
  value,
  onChange,
  copy,
}: {
  label: string;
  value: Currency;
  onChange: (value: Currency) => void;
  copy: Dictionary;
}) {
  const id = useId();
  return (
    <div>
      <p className={styles.choiceLabel} id={id}>
        {label}
      </p>
      <div className={styles.choices} role="group" aria-labelledby={id}>
        {CURRENCIES.map((currency) => {
          const selected = currency === value;
          return (
            <button
              key={currency}
              type="button"
              className={selected ? `${styles.choice} ${styles.choiceOn}` : styles.choice}
              aria-pressed={selected}
              aria-label={`${currency} ${copy.currencyName[currency]}`}
              onClick={() => onChange(currency)}
            >
              {currency}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PhrasePanel({ copy, onEnlarge }: Props) {
  return (
    <>
      <p className={styles.lead}>{copy.phrasesLead}</p>
      <ul className={styles.phrases}>
        {PHRASES_VI.map((vi, index) => (
          <li key={vi}>
            <button
              type="button"
              className={styles.phrase}
              onClick={() => onEnlarge({ vi, meaning: copy.phraseMeaning[index] ?? "" })}
            >
              <span lang="vi" translate="no" className={styles.phraseVi}>
                {vi}
              </span>
              <span className={styles.phraseMean}>{copy.phraseMeaning[index]}</span>
              <span className={styles.srOnly}>{copy.showLarge}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function WeatherPanel({ copy, city }: Props) {
  return (
    <>
      <p className={styles.lead}>{copy.activitiesLead}</p>
      <ul className={styles.activities}>
        {copy.activities[city].map((item) => (
          <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </li>
        ))}
      </ul>
      <p className={styles.foot}>{copy.activitiesFoot}</p>
    </>
  );
}

function SafetyPanel({ copy, city, onEnlarge, copied, onCopy }: Props) {
  const status = copied === "done" ? copy.copied : copied === "failed" ? copy.copyFailed : "";
  return (
    <>
      <p className={styles.lead}>{copy.safetyLead}</p>
      <ul className={styles.emergencyList}>
        {EMERGENCY_NUMBERS.map((item, index) => (
          <li key={item.tel}>
            <a className={styles.emergency} href={`tel:${item.tel}`}>
              <span className={`${styles.emergencyNo} ${styles.serif}`}>{item.tel}</span>
              <span>
                <span className={styles.emergencyName}>{copy.emergencyName[index]}</span>
                <span className={styles.emergencyDetail}>{copy.emergencyDetail[index]}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className={styles.foot}>{copy.safetyFoot}</p>
      <div className={styles.driver}>
        <p className={styles.kicker}>{copy.driverTitle}</p>
        <p lang="vi" translate="no" className={`${styles.driverAddress} ${styles.serif}`}>
          {LANDMARKS[city]}
        </p>
        <p className={styles.driverMeaning}>{copy.driverMeaning[city]}</p>
        <p className={styles.driverHint}>{copy.driverHint}</p>
        <button
          type="button"
          className={styles.textBtn}
          onClick={() => onEnlarge({ vi: LANDMARKS[city], meaning: copy.driverMeaning[city] })}
        >
          {copy.showLarge}
        </button>
      </div>
      <button type="button" className={styles.copyBtn} onClick={onCopy}>
        {copy.copyAddress}
      </button>
      <p className={styles.status} aria-live="polite">
        {status}
      </p>
    </>
  );
}
