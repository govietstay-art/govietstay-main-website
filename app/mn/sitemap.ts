import type { MetadataRoute } from "next";
import { mnPages, mnUrl } from "./content";

const base = "https://www.govietstay.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return mnPages.map((page) => ({
    url: `${base}${mnUrl(page.slug)}`,
    lastModified: new Date("2026-09-17T00:00:00.000Z"),
    changeFrequency: "monthly" as const,
    priority: page.slug === "" || page.slug === "da-nang" || page.slug === "phu-quoc" ? 0.9 : 0.75,
    alternates: { languages: { "mn-MN": `${base}${mnUrl(page.slug)}` } },
  }));
}
