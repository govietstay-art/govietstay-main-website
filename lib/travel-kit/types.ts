export const LANGS = ["en", "ru", "it"] as const;
export type Lang = (typeof LANGS)[number];

export const CITY_IDS = ["danang", "hoian", "hue", "phuquoc"] as const;
export type CityId = (typeof CITY_IDS)[number];

export const SCENARIO_IDS = ["landed", "rain", "evening"] as const;
export type ScenarioId = (typeof SCENARIO_IDS)[number];

export const UTILITY_IDS = ["esim", "arrival", "currency", "phrases", "weather", "safety"] as const;
export type UtilityId = (typeof UTILITY_IDS)[number];

export const CURRENCIES = ["VND", "USD", "EUR", "RUB"] as const;
export type Currency = (typeof CURRENCIES)[number];

export const SKY_IDS = ["clear", "bright", "hazy", "sunny", "rain", "showers", "humid", "warm", "still"] as const;
export type SkyId = (typeof SKY_IDS)[number];

export type DayPeriod = "morning" | "afternoon" | "evening";

export type Dictionary = {
  meta: { title: string; description: string };
  productName: string;
  skip: string;
  greeting: Record<DayPeriod, string>;
  langLabel: string;
  languageName: Record<Lang, string>;
  cityLabel: string;
  cities: Record<CityId, string>;
  sample: string;
  scenarioHint: string;
  scenarios: Record<ScenarioId, string>;
  todayLabel: string;
  today: Record<CityId, Record<ScenarioId, { title: string; body: string; cta: string }>>;
  sky: Record<SkyId, string>;
  photoAlt: Record<CityId, string>;
  photoAltHoiAnEvening: string;
  utilitiesLabel: string;
  utilities: Record<UtilityId, { title: string; glance: string }>;
  faqTitle: string;
  faq: { q: string; a: string }[];
  supportTitle: string;
  supportHint: string;
  supportMessage: string;
  close: string;
  back: string;
  esimLead: string;
  esimFacts: string[];
  esimButton: string;
  esimFoot: string;
  esimMessage: string;
  arrivalLead: string;
  arrivalNote: Record<CityId, string>;
  airportCaption: string;
  checklist: string[];
  progress: string;
  currencyLead: string;
  amountLabel: string;
  fromLabel: string;
  toLabel: string;
  swap: string;
  resultLabel: string;
  emptyAmount: string;
  currencyName: Record<Currency, string>;
  rateFoot: string;
  payNote: string;
  phrasesLead: string;
  phraseMeaning: string[];
  showLarge: string;
  allPhrases: string;
  showThis: string;
  activitiesLead: string;
  activitiesFoot: string;
  activities: Record<CityId, { title: string; detail: string }[]>;
  safetyLead: string;
  emergencyName: string[];
  emergencyDetail: string[];
  safetyFoot: string;
  driverTitle: string;
  driverHint: string;
  driverMeaning: Record<CityId, string>;
  copyAddress: string;
  copied: string;
  copyFailed: string;
};
