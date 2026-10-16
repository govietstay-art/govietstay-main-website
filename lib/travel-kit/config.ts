import { CITY_IDS, type CityId, type DayPeriod, type ScenarioId } from "./types";

/**
 * Confirmed by the owner on 16 Oct 2026: +84 937 762 607.
 * Used for the support bar and the eSIM request. Nothing is sent automatically.
 */
export const TRAVEL_KIT_WHATSAPP_E164 = "+84937762607";

/** Customer stills in public/travel-kit, plus the existing Phu Quoc beach. See CREDITS.md. */
export const PHOTOS: Record<CityId, Record<ScenarioId, string>> = {
  danang: {
    landed: "/travel-kit/da-nang-golden-bridge.webp",
    rain: "/travel-kit/da-nang-marble-caves.webp",
    evening: "/travel-kit/da-nang-lady-buddha.webp",
  },
  hoian: {
    landed: "/travel-kit/hoi-an-covered-bridge.webp",
    rain: "/travel-kit/hoi-an-tailor.webp",
    evening: "/travel-kit/hoi-an-lantern-boats.webp",
  },
  hue: {
    landed: "/travel-kit/hue-ngo-mon.webp",
    rain: "/travel-kit/hue-ngo-mon.webp",
    evening: "/travel-kit/hue-ngo-mon.webp",
  },
  phuquoc: {
    landed: "/tour/phuquoc/partner-2026/pq-15.webp",
    rain: "/tour/phuquoc/partner-2026/pq-15.webp",
    evening: "/tour/phuquoc/partner-2026/pq-15.webp",
  },
};

export function whatsAppHref(message: string): string {
  const digits = TRAVEL_KIT_WHATSAPP_E164.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function fillCity(template: string, cityName: string): string {
  return template.replaceAll("{city}", cityName);
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

export function parseCity(value: string | undefined): CityId | undefined {
  return CITY_IDS.find((city) => city === value);
}

export function photoFor(city: CityId, scenario: ScenarioId): string {
  return PHOTOS[city][scenario];
}
