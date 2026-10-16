import {
  CITY_IDS,
  CURRENCIES,
  SCENARIO_IDS,
  type CityId,
  type Currency,
  type DayPeriod,
  type ScenarioId,
  type SkyId,
  type UtilityId,
} from "./types";

/**
 * Confirm this number before any public release.
 * Used for the support bar and the eSIM request. Nothing is sent automatically.
 */
export const TRAVEL_KIT_WHATSAPP_E164 = "+84937762607";

/** Rounded sample snapshot for the prototype. Not a live rate and not for payments. */
export const SAMPLE_FX = {
  asOf: "2026-10-16",
  /** Vietnamese dong for one unit of the named currency. */
  vndPerUnit: {
    VND: 1,
    USD: 25800,
    EUR: 29000,
    RUB: 320,
  },
} as const satisfies { asOf: string; vndPerUnit: Record<Currency, number> };

/**
 * Illustrative conditions for the day-preview control.
 * Not a forecast.
 */
export const SAMPLE_WEATHER: Record<CityId, Record<ScenarioId, { tempC: number; sky: SkyId }>> = {
  danang: {
    landed: { tempC: 32, sky: "clear" },
    rain: { tempC: 27, sky: "rain" },
    evening: { tempC: 29, sky: "humid" },
  },
  hoian: {
    landed: { tempC: 31, sky: "bright" },
    rain: { tempC: 26, sky: "rain" },
    evening: { tempC: 28, sky: "warm" },
  },
  hue: {
    landed: { tempC: 30, sky: "hazy" },
    rain: { tempC: 25, sky: "rain" },
    evening: { tempC: 27, sky: "still" },
  },
  phuquoc: {
    landed: { tempC: 31, sky: "sunny" },
    rain: { tempC: 27, sky: "showers" },
    evening: { tempC: 28, sky: "warm" },
  },
};

/** National numbers published by GOV.UK and the U.S. Embassy in Vietnam. Order is fixed. */
export const EMERGENCY_NUMBERS = [
  { id: "police", tel: "113" },
  { id: "fire", tel: "114" },
  { id: "ambulance", tel: "115" },
  { id: "rescue", tel: "112" },
] as const;

/** Real landmarks a driver can read. Sample stand-in until the traveler substitutes a hotel. */
export const LANDMARKS: Record<CityId, string> = {
  danang: "Cầu Rồng, Đà Nẵng",
  hoian: "Phố cổ Hội An",
  hue: "Đại Nội, Huế",
  phuquoc: "Chợ Dương Đông, Phú Quốc",
};

export const AIRPORT_VI: Record<CityId, string> = {
  danang: "Sân bay quốc tế Đà Nẵng",
  hoian: "Sân bay quốc tế Đà Nẵng",
  hue: "Sân bay quốc tế Phú Bài",
  phuquoc: "Sân bay quốc tế Phú Quốc",
};

export const PHRASES_VI = [
  "Xin chào.",
  "Cảm ơn.",
  "Bao nhiêu tiền?",
  "Làm ơn đưa tôi đến địa chỉ này.",
  "Tôi cần bác sĩ.",
  "Gọi cấp cứu giúp tôi.",
  "Không cay, làm ơn.",
  "Nhà vệ sinh ở đâu?",
  "Tôi không hiểu.",
  "Một chai nước suối.",
] as const;

export const PHOTOS: Record<CityId, string> & { hoianEvening: string } = {
  danang: "/tour/marble.jpg",
  hoian: "/tour/hoi-an-coconut-forest/gallery/hoi-an-ancient-house.webp",
  hoianEvening: "/tour/hoian.jpg",
  hue: "/tour/hue.jpg",
  phuquoc: "/tour/phuquoc/partner-2026/pq-15.webp",
};

export const SCENARIO_OPENS: Record<CityId, Record<ScenarioId, UtilityId>> = {
  danang: { landed: "arrival", rain: "weather", evening: "phrases" },
  hoian: { landed: "arrival", rain: "weather", evening: "safety" },
  hue: { landed: "arrival", rain: "weather", evening: "safety" },
  phuquoc: { landed: "arrival", rain: "weather", evening: "safety" },
};

const CHECKLIST_KEY = "gvs-travel-kit-arrival-v1";
const CHECKLIST_EVENT = "gvs-travel-kit-checks";
let checklistRaw = "";
let checklistSnapshot: boolean[] = [];

export function whatsAppHref(message: string): string {
  const digits = TRAVEL_KIT_WHATSAPP_E164.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function fillCity(template: string, cityName: string): string {
  return template.replaceAll("{city}", cityName);
}

export function convertSample(amount: number, from: Currency, to: Currency): number {
  const vnd = amount * SAMPLE_FX.vndPerUnit[from];
  return vnd / SAMPLE_FX.vndPerUnit[to];
}

export function parseAmount(raw: string): number | null {
  const cleaned = raw.replace(/\s/g, "").replace(",", ".");
  if (!cleaned || cleaned === ".") return null;
  const value = Number(cleaned);
  if (!Number.isFinite(value) || value < 0) return null;
  return Math.min(value, 1_000_000_000);
}

export function vietnamDayPeriod(date = new Date()): DayPeriod {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "numeric",
      hourCycle: "h23",
    }).format(date),
  );
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

export function periodToScenario(period: DayPeriod): ScenarioId {
  return period === "evening" ? "evening" : "landed";
}

export function parseCity(value: string | undefined): CityId | undefined {
  return CITY_IDS.find((city) => city === value);
}

export function parseScenario(value: string | undefined): ScenarioId | undefined {
  return SCENARIO_IDS.find((scenario) => scenario === value);
}

export function photoFor(city: CityId, scenario: ScenarioId): string {
  if (city === "hoian" && scenario === "evening") return PHOTOS.hoianEvening;
  return PHOTOS[city];
}

export function readChecklist(): boolean[] {
  if (typeof window === "undefined") return checklistSnapshot;
  try {
    const raw = window.localStorage.getItem(CHECKLIST_KEY) ?? "";
    if (raw !== checklistRaw) {
      checklistRaw = raw;
      const parsed = raw ? JSON.parse(raw) : [];
      checklistSnapshot = Array.isArray(parsed) ? parsed.map(Boolean) : [];
    }
  } catch {
    checklistRaw = "";
    checklistSnapshot = [];
  }
  return checklistSnapshot;
}

export function writeChecklist(values: boolean[]) {
  const raw = JSON.stringify(values);
  checklistRaw = raw;
  checklistSnapshot = values;
  try {
    window.localStorage.setItem(CHECKLIST_KEY, raw);
  } catch {
    /* Private mode can block storage. The list still works for this visit. */
  }
  window.dispatchEvent(new Event(CHECKLIST_EVENT));
}

export function subscribeChecklist(onStoreChange: () => void) {
  window.addEventListener(CHECKLIST_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CHECKLIST_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function isCurrency(value: string): value is Currency {
  return (CURRENCIES as readonly string[]).includes(value);
}
