import type { MetadataRoute } from "next";
import { koreanSeoGuides } from "../lib/koreanSeoGuides";
import { aktualnoArticles } from "../lib/aktualnoArticles";
import { russianSeoIndexableLandings } from "../lib/russian-seo-landings";
import { secretGems } from "./secret/data";

const BASE_URL = "https://www.govietstay.com";
const SITE_UPDATED = new Date("2026-08-22T00:00:00.000Z");

const languageAlternates = (englishPath: string, russianPath: string) => ({
  languages: {
    en: `${BASE_URL}${englishPath}`,
    ru: `${BASE_URL}${russianPath}`,
    "x-default": `${BASE_URL}${englishPath}`,
  },
});

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: languageAlternates("", "/ru"),
    },
    {
      url: `${BASE_URL}/ko`,
      lastModified: new Date("2026-08-26T00:00:00.000Z"),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: {
          "ko-KR": `${BASE_URL}/ko`,
          ru: `${BASE_URL}/ru`,
          "x-default": BASE_URL,
        },
      },
    },
    {
      url: `${BASE_URL}/ko/cham-island-tour`,
      lastModified: new Date("2026-08-26T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: {
        languages: {
          "ko-KR": `${BASE_URL}/ko/cham-island-tour`,
          ru: `${BASE_URL}/ru/tours/cham-island`,
          "x-default": `${BASE_URL}/ko/cham-island-tour`,
        },
      },
    },
    {
      url: `${BASE_URL}/ru`,
      lastModified: SITE_UPDATED,
      changeFrequency: "daily",
      priority: 1,
      alternates: languageAlternates("", "/ru"),
    },
    {
      url: `${BASE_URL}/ru/tours/ba-na-hills`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: languageAlternates(
        "/tours/ba-na-hills",
        "/ru/tours/ba-na-hills",
      ),
    },
    {
      url: `${BASE_URL}/ru/tours/cham-island`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/ru/tours/hoi-an-coconut-forest`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: languageAlternates(
        "/tours/hoi-an-coconut-forest",
        "/ru/tours/hoi-an-coconut-forest",
      ),
    },
    {
      url: `${BASE_URL}/ru/tours/phu-quoc`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: languageAlternates(
        "/tours/phu-quoc",
        "/ru/tours/phu-quoc",
      ),
    },
    {
      url: `${BASE_URL}/ru/aktualno`,
      lastModified: SITE_UPDATED,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/ru/local-point`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ru/partner`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.35,
    },
    {
      url: `${BASE_URL}/tours/ba-na-hills`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.75,
      alternates: languageAlternates(
        "/tours/ba-na-hills",
        "/ru/tours/ba-na-hills",
      ),
    },
    {
      url: `${BASE_URL}/tours/hoi-an-coconut-forest`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: languageAlternates(
        "/tours/hoi-an-coconut-forest",
        "/ru/tours/hoi-an-coconut-forest",
      ),
    },
    {
      url: `${BASE_URL}/tours/phu-quoc`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: languageAlternates(
        "/tours/phu-quoc",
        "/ru/tours/phu-quoc",
      ),
    },
    {
      url: `${BASE_URL}/visa`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${BASE_URL}/secret`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.45,
    },
  ];

  const koreanGuidePages: MetadataRoute.Sitemap = koreanSeoGuides.map((guide) => ({
    url: `${BASE_URL}/ko/${guide.slug}`,
    lastModified: new Date(guide.updated),
    changeFrequency: "monthly",
    priority: 0.82,
    alternates: {
      languages: {
        "ko-KR": `${BASE_URL}/ko/${guide.slug}`,
      },
    },
  }));

  const aktualnoPages: MetadataRoute.Sitemap = aktualnoArticles.map(
    (article) => ({
      url: `${BASE_URL}/ru/aktualno/${article.slug}`,
      lastModified: new Date(article.modified),
      changeFrequency: article.category === "today" ? "daily" : "monthly",
      priority: article.featured ? 0.82 : 0.72,
    }),
  );

  const russianLandingPages: MetadataRoute.Sitemap = russianSeoIndexableLandings.map(
    (landing) => ({
      url: `${BASE_URL}/ru/${landing.slug}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: landing.slug === "danang" || landing.slug === "hoi-an" ? 0.9 : 0.82,
    }),
  );

  const secretPages: MetadataRoute.Sitemap = secretGems.map((gem) => ({
    url: `${BASE_URL}/secret/${gem.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly",
    priority: 0.35,
  }));

  return [
    ...corePages,
    ...koreanGuidePages,
    ...russianLandingPages,
    ...aktualnoPages,
    ...secretPages,
  ];
}
