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

const OPT_NAME: Record<string, string> = {
  "/travel-kit/da-nang-golden-bridge.webp": "da-nang-golden-bridge",
  "/travel-kit/da-nang-marble-caves.webp": "da-nang-marble-caves",
  "/travel-kit/da-nang-lady-buddha.webp": "da-nang-lady-buddha",
  "/travel-kit/hoi-an-covered-bridge.webp": "hoi-an-covered-bridge",
  "/travel-kit/hoi-an-tailor.webp": "hoi-an-tailor",
  "/travel-kit/hoi-an-lantern-boats.webp": "hoi-an-lantern-boats",
  "/travel-kit/hue-ngo-mon.webp": "hue-ngo-mon",
  "/tour/phuquoc/partner-2026/pq-15.webp": "phu-quoc-beach",
};

/**
 * Focal point when a frame is shorter than the still.
 * Portrait stills are 3:4. The Phu Quoc beach is 4:3, so it keeps a wide frame.
 */
const PHOTO_CROP: Record<string, { position: string; frame: "tall" | "wide" }> = {
  "da-nang-golden-bridge": { position: "center 34%", frame: "tall" },
  "da-nang-marble-caves": { position: "center 40%", frame: "tall" },
  "da-nang-lady-buddha": { position: "center 18%", frame: "tall" },
  "hoi-an-covered-bridge": { position: "center 42%", frame: "tall" },
  "hoi-an-tailor": { position: "center 36%", frame: "tall" },
  "hoi-an-lantern-boats": { position: "center 66%", frame: "tall" },
  "hue-ngo-mon": { position: "center 62%", frame: "tall" },
  "phu-quoc-beach": { position: "center 46%", frame: "wide" },
};

/** Pre-sized WebP files. The page does not ask the image optimizer for these. */
export function photoSet(city: CityId, scenario: ScenarioId) {
  const name = OPT_NAME[PHOTOS[city][scenario]];
  const crop = PHOTO_CROP[name];
  const wide = crop.frame === "wide";
  return {
    src: `/travel-kit/opt/${name}-960.webp`,
    srcSet: `/travel-kit/opt/${name}-480.webp 480w, /travel-kit/opt/${name}-640.webp 640w, /travel-kit/opt/${name}-960.webp 960w`,
    position: crop.position,
    frame: crop.frame,
    width: wide ? 1280 : 960,
    height: wide ? 960 : 1280,
  };
}
