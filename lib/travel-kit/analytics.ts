import type { CityId, Lang, ToolSlug } from "./types";

/** localStorage flag. Default off. No cookie, no third-party script. */
export const ANALYTICS_FLAG = "gvs-tk-analytics";

export const KIT_EVENTS = ["travel_kit_open", "city_change", "tool_open", "esim_request_click", "whatsapp_click"] as const;
export type KitEvent = (typeof KIT_EVENTS)[number];

export type KitPayload = {
  language: Lang;
  city: CityId;
  tool: ToolSlug | "home";
};

const once = new Set<string>();
const recent = new Map<string, number>();

function enabled(): boolean {
  try {
    return window.localStorage.getItem(ANALYTICS_FLAG) === "on";
  } catch {
    return false;
  }
}

function keyOf(name: KitEvent, payload: KitPayload) {
  return `${name}|${payload.language}|${payload.city}|${payload.tool}`;
}

/**
 * Hands an event to a first-party listener, if one exists.
 * Nothing is sent on the network. Payload is language, city and tool only.
 * travel_kit_open and tool_open fire once per page load. Clicks ignore a repeat within 1.2s.
 */
export function track(name: KitEvent, payload: KitPayload) {
  if (typeof window === "undefined" || !enabled()) return;
  const key = keyOf(name, payload);
  if (name === "travel_kit_open" || name === "tool_open") {
    if (once.has(key)) return;
    once.add(key);
  } else {
    const now = Date.now();
    if (now - (recent.get(key) ?? 0) < 1200) return;
    recent.set(key, now);
  }
  window.dispatchEvent(new CustomEvent("gvs-travel-kit-event", { detail: { name, ...payload } }));
}
