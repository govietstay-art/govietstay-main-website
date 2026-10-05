import type { MetadataRoute } from "next";
import { HOTRAM_BASE } from "../../lib/hotram/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/ho-tram/"],
    },
    sitemap: `${HOTRAM_BASE}/sitemap.xml`,
    host: HOTRAM_BASE,
  };
}
