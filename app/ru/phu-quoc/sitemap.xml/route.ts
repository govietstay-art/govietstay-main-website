import { russianPhuQuocPages } from "../../../../lib/russian-phu-quoc-cluster";

const BASE_URL = "https://www.govietstay.com";

export async function GET() {
  const urls = [
    ...russianPhuQuocPages.map((page) => ({ url: `${BASE_URL}${page.path}`, lastModified: page.slug === "index" || page.slug === "sunset-town" ? "2026-09-28" : "2026-09-10" })),
    { url: `${BASE_URL}/ru/phu-quoc-help`, lastModified: "2026-09-10" },
    { url: `${BASE_URL}/ru/phu-quoc/hon-thom`, lastModified: "2026-09-28" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({url,lastModified}) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
