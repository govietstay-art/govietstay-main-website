import { snapshotFromRates, snapshotFromWeather, weatherUrl, type RatesSnapshot, type WeatherSnapshot } from "./live-data";
import type { CityId } from "./types";

export async function loadWeather(city: CityId): Promise<WeatherSnapshot | null> {
  try {
    const response = await fetch(weatherUrl(city), { next: { revalidate: 1800 }, signal: AbortSignal.timeout(6000) });
    if (!response.ok) return null;
    return snapshotFromWeather(city, await response.json());
  } catch {
    return null;
  }
}

export async function loadRates(): Promise<RatesSnapshot | null> {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 60 * 60 * 12 },
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) return null;
    return snapshotFromRates(await response.json());
  } catch {
    return null;
  }
}
