import type { MetadataRoute } from "next";
import { philippinesSeoPages } from "../lib/philippinesSeoPages";
import { chinaSeoPages } from "../lib/chinaSeoPages";
import { kazakhstanSeoPages } from "../lib/kazakhstanSeoPages";
import { vietnamSeoPages } from "../lib/vietnamSeoPages";
import { englishSeoGuides } from "../lib/englishSeoGuides";
import { taiwanSeoGuides } from "../lib/taiwanSeoGuides";
import { indiaSeoGuides } from "../lib/indiaSeoGuides";
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
      url: `${BASE_URL}/ph`,
      lastModified: new Date("2026-08-27T00:00:00.000Z"),
      changeFrequency: "daily",
      priority: 1,
      alternates: { languages: { "en-PH": `${BASE_URL}/ph`, en: `${BASE_URL}/travel` } },
    },
    {
      url: `${BASE_URL}/cn`,
      lastModified: new Date("2026-08-26T00:00:00.000Z"),
      changeFrequency: "daily",
      priority: 1,
      alternates: { languages: { "zh-CN": `${BASE_URL}/cn`, "zh-TW": `${BASE_URL}/tw` } },
    },
    {
      url: `${BASE_URL}/kz`,
      lastModified: new Date("2026-08-26T00:00:00.000Z"),
      changeFrequency: "daily", priority: 1,
      alternates: { languages: { "ru-KZ": `${BASE_URL}/kz` } },
    },
    {
      url: `${BASE_URL}/vi`,
      lastModified: new Date("2026-08-26T00:00:00.000Z"),
      changeFrequency: "daily", priority: 1,
      alternates: { languages: { "vi-VN": `${BASE_URL}/vi` } },
    },
    {
      url: `${BASE_URL}/travel`,
      lastModified: new Date("2026-08-26T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.92,
      alternates: {
        languages: {
          en: `${BASE_URL}/travel`,
        },
      },
    },
    {
      url: `${BASE_URL}/tw`,
      lastModified: new Date("2026-08-26T00:00:00.000Z"),
      changeFrequency: "daily",
      priority: 1,
      alternates: { languages: { "zh-TW": `${BASE_URL}/tw` } },
    },
    {
      url: `${BASE_URL}/in`,
      lastModified: new Date("2026-08-26T00:00:00.000Z"),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: {
          "en-IN": `${BASE_URL}/in`,
          "ko-KR": `${BASE_URL}/ko`,
          ru: `${BASE_URL}/ru`,
          "x-default": BASE_URL,
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

  const indiaGuidePages: MetadataRoute.Sitemap = indiaSeoGuides.map((guide) => ({
    url: `${BASE_URL}/in/${guide.slug}`,
    lastModified: new Date(guide.updated),
    changeFrequency: "monthly",
    priority: 0.84,
    alternates: {
      languages: {
        "en-IN": `${BASE_URL}/in/${guide.slug}`,
      },
    },
  }));

  const taiwanGuidePages: MetadataRoute.Sitemap = taiwanSeoGuides.map((guide) => ({
    url: `${BASE_URL}/tw/${guide.slug}`,
    lastModified: new Date(guide.updated),
    changeFrequency: "monthly",
    priority: 0.84,
    alternates: { languages: { "zh-TW": `${BASE_URL}/tw/${guide.slug}` } },
  }));

  const philippinesPages: MetadataRoute.Sitemap = philippinesSeoPages.map((page) => ({
    url: `${BASE_URL}/ph/${page.slug}`,
    lastModified: new Date(page.updated),
    changeFrequency: page.type === "product" || page.type === "arrival" ? "weekly" : "monthly",
    priority: page.type === "product" || page.type === "arrival" || page.type === "private" ? 0.93 : 0.86,
    alternates: { languages: { "en-PH": `${BASE_URL}/ph/${page.slug}` } },
  }));

  const chinaPages: MetadataRoute.Sitemap = chinaSeoPages.map((page) => ({
    url: `${BASE_URL}/cn/${page.slug}`,
    lastModified: new Date(page.updated),
    changeFrequency: page.type === "product" || page.type === "arrival" ? "weekly" : "monthly",
    priority: page.type === "product" || page.type === "arrival" ? 0.94 : 0.88,
    alternates: { languages: { "zh-CN": `${BASE_URL}/cn/${page.slug}` } },
  }));

  const kazakhstanPages: MetadataRoute.Sitemap = kazakhstanSeoPages.map((page) => ({
    url: `${BASE_URL}/kz/${page.slug}`, lastModified: new Date(page.updated),
    changeFrequency: page.type === "product" || page.type === "arrival" ? "weekly" : "monthly",
    priority: page.type === "product" || page.type === "arrival" ? 0.92 : 0.86,
    alternates: { languages: { "ru-KZ": `${BASE_URL}/kz/${page.slug}` } },
  }));

  const vietnamGuidePages: MetadataRoute.Sitemap = vietnamSeoPages.map((page) => ({
    url: `${BASE_URL}/vi/${page.slug}`, lastModified: new Date(page.updated),
    changeFrequency: page.type === "guide" ? "monthly" : "weekly",
    priority: page.type === "product" || page.type === "combo" ? 0.93 : 0.86,
    alternates: { languages: { "vi-VN": `${BASE_URL}/vi/${page.slug}` } },
  }));

  const englishGuidePages: MetadataRoute.Sitemap = englishSeoGuides.map((guide) => ({
    url: `${BASE_URL}/travel/${guide.slug}`,
    lastModified: new Date(guide.updated),
    changeFrequency: "monthly",
    priority:
      guide.slug === "da-nang-travel-guide" ||
      guide.slug === "things-to-do-in-da-nang"
        ? 0.9
        : 0.84,
    alternates: {
      languages: {
        en: `${BASE_URL}/travel/${guide.slug}`,
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
    ...vietnamGuidePages,
    ...philippinesPages,
    ...chinaPages,
    ...kazakhstanPages,
    ...englishGuidePages,
    ...taiwanGuidePages,
    ...indiaGuidePages,
    ...koreanGuidePages,
    ...russianLandingPages,
    ...aktualnoPages,
    ...secretPages,
  ];
}
