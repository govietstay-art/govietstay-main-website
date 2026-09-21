import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: [
      "https://www.govietstay.com/sitemap.xml",
      "https://www.govietstay.com/local-experiences/sitemap.xml",
      "https://www.govietstay.com/ru/phu-quoc/sitemap.xml",
      "https://www.govietstay.com/ru/aktualno/sitemap.xml",
      "https://www.govietstay.com/ko/phu-quoc/sitemap.xml",
      "https://www.govietstay.com/fr/sitemap.xml",
      "https://www.govietstay.com/mn/sitemap.xml",
    ],
    host: "https://www.govietstay.com",
  };
}
