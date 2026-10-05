import type { MetadataRoute } from "next";
import { LAST_REVIEWED, localeConfig, publicUrl, tours, type HotramLocale } from "../../lib/hotram/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(`${LAST_REVIEWED}T00:00:00.000Z`);
  const indexableLocales = (Object.keys(localeConfig) as HotramLocale[]).filter(
    (locale) => localeConfig[locale].indexable,
  );
  const languageAlternates = (slug?: string) => {
    const languages: Record<string, string> = {
      "x-default": publicUrl("en", slug),
    };
    indexableLocales.forEach((locale) => {
      languages[localeConfig[locale].html] = publicUrl(locale, slug);
    });
    return { languages };
  };

  return indexableLocales.flatMap((locale) => [
    {
      url: publicUrl(locale),
      lastModified: updated,
      changeFrequency: "weekly" as const,
      priority: 1,
      alternates: languageAlternates(),
    },
    ...tours.map((tour) => ({
      url: publicUrl(locale, tour.slug),
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: languageAlternates(tour.slug),
    })),
  ]);
}
