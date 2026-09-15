import type { MetadataRoute } from "next";
import { koreanPhuQuocGuides } from "../../../lib/koreanPhuQuocGuides";

const BASE_URL = "https://www.govietstay.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const hub: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/ko/phu-quoc`,
      lastModified: new Date("2026-09-15T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          "ko-KR": `${BASE_URL}/ko/phu-quoc`,
        },
      },
    },
  ];

  const guides: MetadataRoute.Sitemap = koreanPhuQuocGuides.map((guide) => ({
    url: `${BASE_URL}/ko/phu-quoc/${guide.slug}`,
    lastModified: new Date(`${guide.updated}T00:00:00.000Z`),
    changeFrequency: "weekly" as const,
    priority:
      guide.slug === "weather" ||
      guide.slug === "where-to-stay" ||
      guide.slug === "free-travel" ||
      guide.slug === "3-islands-vs-4-islands"
        ? 0.93
        : 0.9,
    alternates: {
      languages: {
        "ko-KR": `${BASE_URL}/ko/phu-quoc/${guide.slug}`,
      },
    },
  }));

  return [...hub, ...guides];
}
