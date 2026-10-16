import type { CityId, WeatherKind } from "./types";

const AREA: Record<CityId, { latitude: number; longitude: number }> = {
  danang: { latitude: 16.0544, longitude: 108.2022 },
  hoian: { latitude: 15.8801, longitude: 108.338 },
  hue: { latitude: 16.4637, longitude: 107.5909 },
  phuquoc: { latitude: 10.2899, longitude: 103.984 },
};

export type DayForecast = {
  date: string;
  kind: WeatherKind;
  maxC: number;
  minC: number;
  rainChance: number | null;
};

export type WeatherSnapshot = {
  city: CityId;
  observedAt: string;
  temperatureC: number;
  precipitationMm: number;
  kind: WeatherKind;
  days: DayForecast[];
};

export type RatesSnapshot = {
  updatedAt: string;
  nextUpdateAt: string;
  vndPerUsd: number;
  eurPerUsd: number;
  rubPerUsd: number;
};

export function weatherKind(code: number): WeatherKind {
  if (code === 0 || code === 1) return "clear";
  if (code === 2 || code === 3) return "cloud";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if (code >= 61 && code <= 67) return "rain";
  if (code >= 80 && code <= 82) return "showers";
  if (code >= 95) return "thunder";
  return "cloud";
}

export function isWet(kind: WeatherKind, precipitationMm: number): boolean {
  if (precipitationMm >= 0.2) return true;
  return kind === "drizzle" || kind === "rain" || kind === "showers" || kind === "thunder";
}

type WeatherJson = {
  current?: { time?: string; temperature_2m?: number; weather_code?: number; precipitation?: number };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: (number | null)[];
  };
};

export function weatherUrl(city: CityId): string {
  const area = AREA[city];
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(area.latitude));
  url.searchParams.set("longitude", String(area.longitude));
  url.searchParams.set("current", "temperature_2m,weather_code,precipitation");
  url.searchParams.set("daily", "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max");
  url.searchParams.set("timezone", "Asia/Bangkok");
  url.searchParams.set("forecast_days", "4");
  return url.toString();
}

export function snapshotFromWeather(city: CityId, data: WeatherJson): WeatherSnapshot | null {
  const current = data.current;
  if (!current || typeof current.temperature_2m !== "number" || typeof current.weather_code !== "number" || !current.time) {
    return null;
  }
  const days: DayForecast[] = [];
  const times = data.daily?.time ?? [];
  for (let i = 0; i < times.length; i += 1) {
    const code = data.daily?.weather_code?.[i];
    const maxC = data.daily?.temperature_2m_max?.[i];
    const minC = data.daily?.temperature_2m_min?.[i];
    if (typeof code !== "number" || typeof maxC !== "number" || typeof minC !== "number") continue;
    const chance = data.daily?.precipitation_probability_max?.[i];
    days.push({
      date: times[i],
      kind: weatherKind(code),
      maxC,
      minC,
      rainChance: typeof chance === "number" ? chance : null,
    });
  }
  return {
    city,
    observedAt: current.time,
    temperatureC: current.temperature_2m,
    precipitationMm: typeof current.precipitation === "number" ? current.precipitation : 0,
    kind: weatherKind(current.weather_code),
    days,
  };
}

export const RATES_URL = "https://open.er-api.com/v6/latest/USD";

export function snapshotFromRates(data: {
  result?: string;
  time_last_update_utc?: string;
  time_next_update_utc?: string;
  rates?: { VND?: number; EUR?: number; RUB?: number };
}): RatesSnapshot | null {
  const vnd = data.rates?.VND;
  const eur = data.rates?.EUR;
  const rub = data.rates?.RUB;
  if (data.result !== "success" || !data.time_last_update_utc || !vnd || !eur || !rub) return null;
  return {
    updatedAt: data.time_last_update_utc,
    nextUpdateAt: data.time_next_update_utc ?? "",
    vndPerUsd: vnd,
    eurPerUsd: eur,
    rubPerUsd: rub,
  };
}

export function convertRate(amount: number, from: "VND" | "USD" | "EUR" | "RUB", to: "VND" | "USD" | "EUR" | "RUB", rates: RatesSnapshot): number {
  const perUsd: Record<"VND" | "USD" | "EUR" | "RUB", number> = {
    USD: 1,
    VND: rates.vndPerUsd,
    EUR: rates.eurPerUsd,
    RUB: rates.rubPerUsd,
  };
  const usd = amount / perUsd[from];
  return usd * perUsd[to];
}
