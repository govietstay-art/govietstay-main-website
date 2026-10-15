const ROOT = "https://www.govietstay.com";
const versions = [
  { path: "visa", lang: "en" },
  { path: "tr/visa", lang: "tr-TR" },
  { path: "pl/visa", lang: "pl-PL" },
  { path: "nl/visa", lang: "nl-NL" },
  { path: "ro/visa", lang: "ro-RO" },
  { path: "uk/visa", lang: "uk-UA" },
] as const;

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export async function GET() {
  const links = versions.map(item =>
    `<xhtml:link rel="alternate" hreflang="${item.lang}" href="${escapeXml(ROOT + "/" + item.path)}"/>`
  ).join("") + `<xhtml:link rel="alternate" hreflang="x-default" href="${ROOT}/visa"/>`;

  const rows = versions.map(item =>
    `<url><loc>${escapeXml(ROOT + "/" + item.path)}</loc><lastmod>2026-10-15</lastmod><changefreq>weekly</changefreq>${links}</url>`
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${rows}</urlset>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
