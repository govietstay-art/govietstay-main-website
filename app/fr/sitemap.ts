import type { MetadataRoute } from "next";
import { frenchSeoGuides } from "../../lib/frenchSeoGuides";

const BASE_URL = "https://www.govietstay.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/fr`,
      lastModified: new Date("2026-09-15T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          "fr-FR": `${BASE_URL}/fr`,
        },
      },
    },
    ...frenchSeoGuides.map((guide) => ({
      url: `${BASE_URL}/fr/${guide.slug}`,
      lastModified: new Date(`${guide.updated}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority:
        guide.slug === "phu-quoc-que-faire" ||
        guide.slug === "voyage-vietnam-sur-mesure" ||
        guide.slug === "centre-vietnam-da-nang-hoi-an-hue"
          ? 0.93
          : 0.87,
      alternates: {
        languages: {
          "fr-FR": `${BASE_URL}/fr/${guide.slug}`,
        },
      },
    })),
  ];
}
