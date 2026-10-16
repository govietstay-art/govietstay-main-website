import { travelKitPath } from "./metadata";
import { LANGS, TOOL_SLUGS, type ToolSlug } from "./types";

/**
 * Prepared URLs for a later public release.
 * Do not import this file from app/sitemap.ts until the owner removes noindex.
 */
export function travelKitSitemapDraft() {
  const tools: (ToolSlug | undefined)[] = [undefined, ...TOOL_SLUGS];
  return LANGS.flatMap((lang) =>
    tools.map((tool) => ({
      path: travelKitPath(lang, tool),
      languages: {
        en: travelKitPath("en", tool),
        ru: travelKitPath("ru", tool),
        "it-IT": travelKitPath("it", tool),
        "x-default": travelKitPath("en", tool),
      },
    })),
  );
}
