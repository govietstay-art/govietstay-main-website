import type { MetadataRoute } from 'next';
import { NIGHT_SLUG } from '../../lib/nightBitesCityLights';
import { signatureSlugs } from '../../lib/daNangSignatureExperiences';

const SITE = 'https://www.govietstay.com';
const languages = ['en', 'ru', 'it'] as const;
const slugs = [NIGHT_SLUG, ...signatureSlugs];

function pagePath(language: typeof languages[number], slug: string) {
  return language === 'en'
    ? `/travel/local-experiences/${slug}`
    : `/${language}/local-experiences/${slug}`;
}

// A dedicated sitemap makes all twelve recently launched landing pages
// discoverable without modifying the existing comprehensive sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return slugs.flatMap((slug) => {
    const alternates = {
      languages: {
        en: `${SITE}${pagePath('en', slug)}`,
        ru: `${SITE}${pagePath('ru', slug)}`,
        'it-IT': `${SITE}${pagePath('it', slug)}`,
        'x-default': `${SITE}${pagePath('en', slug)}`,
      },
    };
    return languages.map((language) => ({
      url: `${SITE}${pagePath(language, slug)}`,
      lastModified: new Date('2026-09-21T00:00:00.000Z'),
      changeFrequency: 'weekly' as const,
      priority: 0.87,
      alternates,
    }));
  });
}
