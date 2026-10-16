const snapshots = new Map<string, { raw: string; value: boolean[] }>();
const empties = new Map<number, boolean[]>();

function empty(count: number): boolean[] {
  let cached = empties.get(count);
  if (!cached) {
    cached = Array.from({ length: count }, () => false);
    empties.set(count, cached);
  }
  return cached;
}

export function readTicks(key: string, count: number): boolean[] {
  if (typeof window === "undefined") return empty(count);
  let raw = "";
  try {
    raw = window.localStorage.getItem(key) ?? "";
  } catch {
    raw = "";
  }
  const cached = snapshots.get(key);
  if (cached && cached.raw === raw && cached.value.length === count) return cached.value;
  if (!raw) return empty(count);
  let value = empty(count);
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      value = empty(count).map((item, index) => Boolean(parsed[index] ?? item));
    }
  } catch {
    value = empty(count);
  }
  snapshots.set(key, { raw, value });
  return value;
}

export function writeTicks(key: string, values: boolean[]) {
  const raw = JSON.stringify(values);
  snapshots.set(key, { raw, value: values });
  try {
    window.localStorage.setItem(key, raw);
  } catch {
    /* Private mode can block storage. The list still works for this visit. */
  }
  window.dispatchEvent(new Event(key));
}

export function subscribeTicks(key: string, onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener(key, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(key, handler);
    window.removeEventListener("storage", handler);
  };
}

const jsonCache = new Map<string, { raw: string; value: unknown }>();

export function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  let raw = "";
  try {
    raw = window.localStorage.getItem(key) ?? "";
  } catch {
    return null;
  }
  if (!raw) return null;
  const cached = jsonCache.get(key);
  if (cached && cached.raw === raw) return cached.value as T;
  try {
    const value = JSON.parse(raw) as T;
    jsonCache.set(key, { raw, value });
    return value;
  } catch {
    return null;
  }
}

export function writeJson(key: string, value: unknown) {
  const raw = JSON.stringify(value);
  jsonCache.set(key, { raw, value });
  try {
    window.localStorage.setItem(key, raw);
  } catch {
    /* Ignore quota or private mode. */
  }
  window.dispatchEvent(new Event(key));
}

const stringCache = new Map<string, string>();

export function readString(key: string): string {
  if (typeof window === "undefined") return "";
  let raw = "";
  try {
    raw = window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
  if (!raw) return "";
  const cached = stringCache.get(key);
  if (cached === raw) return cached;
  stringCache.set(key, raw);
  return raw;
}

export function writeString(key: string, value: string) {
  stringCache.set(key, value);
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* Ignore quota or private mode. */
  }
  window.dispatchEvent(new Event(key));
}
