import type { KitCopy, Lang } from "../types";
import { en } from "./en";
import { it } from "./it";
import { ru } from "./ru";

export const dictionaries: Record<Lang, KitCopy> = { en, ru, it };

export function isLang(value: string): value is Lang {
  return value === "en" || value === "ru" || value === "it";
}
