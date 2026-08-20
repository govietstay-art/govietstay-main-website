import type { MetadataRoute } from "next";
import { aktualnoArticles } from "../../../lib/aktualnoArticles";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://www.govietstay.com/ru/aktualno";
  return [
    { url: origin, lastModified: new Date("2026-08-20T16:00:00+07:00"), changeFrequency: "daily", priority: 1 },
    ...aktualnoArticles.map((article) => ({
      url: `${origin}/${article.slug}`,
      lastModified: new Date(article.modified),
      changeFrequency: article.category === "today" ? ("daily" as const) : ("monthly" as const),
      priority: article.featured ? 0.9 : 0.7,
    })),
  ];
}
