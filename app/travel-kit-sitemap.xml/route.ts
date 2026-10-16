import { INDEXABLE_TRAVEL_KIT_SLUGS } from "@/lib/travel-kit/metadata";

export function GET() {
  const base = "https://www.govietstay.com";
  const locales = ["en", "ru", "it"] as const;
  const slugs: (string | undefined)[] = [undefined, ...INDEXABLE_TRAVEL_KIT_SLUGS];
  const escapeXml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const items = slugs.flatMap(slug => locales.map(lang => {
    const suffix = slug ? `/${slug}` : "";
    const alternate = locales.map(l => `<xhtml:link rel="alternate" hreflang="${l === "it" ? "it-IT" : l}" href="${escapeXml(base + "/" + l + "/travel-kit" + suffix)}"/>`).join("") +
      `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(base + "/en/travel-kit" + suffix)}"/>`;
    return `<url><loc>${escapeXml(base + "/" + lang + "/travel-kit" + suffix)}</loc><lastmod>2026-10-16</lastmod>${alternate}</url>`;
  })).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${items}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" }
  });
}
