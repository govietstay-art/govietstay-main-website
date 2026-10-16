export const TRIP_KEY = "gvs-tk-trip";

export type TripData = {
  arrive: string;
  leave: string;
  notes: string[];
  esimNote: string;
};

export const EMPTY_TRIP: TripData = { arrive: "", leave: "", notes: [], esimNote: "" };

export function kitStorageKeys(): string[] {
  if (typeof window === "undefined") return [];
  const keys: string[] = [];
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (key && (key.startsWith("gvs-tk") || key.startsWith("gvs-travel-kit"))) keys.push(key);
  }
  return keys;
}
