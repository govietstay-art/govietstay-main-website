import { russianPhuQuocPages } from "../../../../lib/russian-phu-quoc-cluster";

const BASE_URL = "https://www.govietstay.com";

export async function GET() {
  const urls = [
    ...russianPhuQuocPages.map((page) => `${BASE_URL}${page.path}`),
    `${BASE_URL}/ru/phu-quoc-help`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>2026-09-10</lastmod>
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
