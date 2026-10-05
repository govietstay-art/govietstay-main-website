import type { MetadataRoute } from "next";
import { HOTRAM_BASE, LAST_REVIEWED, localeConfig, publicUrl, tours, type HotramLocale } from "../../lib/hotram/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(`${LAST_REVIEWED}T00:00:00.000Z`);
  const indexableLocales = (Object.keys(localeConfig) as HotramLocale[]).filter(
    (locale) => localeConfig[locale].indexable,
  );

  return indexableLocales.flatMap((locale) => [
    {
      url: publicUrl(locale),
      lastModified: updated,
      changeFrequency: "weekly" as const,
      priority: 1,
      alternates: {
        languages: {
          en: publicUrl("en"),
          ru: publicUrl("ru"),
          "it-IT": publicUrl("it"),
          "x-default": publicUrl("en"),
        },
      },
    },
    ...tours.map((tour) => ({
      url: publicUrl(locale, tour.slug),
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: {
        languages: {
          en: publicUrl("en", tour.slug),
          ru: publicUrl("ru", tour.slug),
          "it-IT": publicUrl("it", tour.slug),
          "x-default": publicUrl("en", tour.slug),
        },
      },
    })),
  ]);
}
