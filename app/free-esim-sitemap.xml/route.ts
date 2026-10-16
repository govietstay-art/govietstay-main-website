export function GET() {
 const base="https://www.govietstay.com";
 const locales=["en","ru","it"];
 const alt=locales.map(l=>`<xhtml:link rel="alternate" hreflang="${l}" href="${base}/${l}/free-vietnam-esim"/>`).join("")+`<xhtml:link rel="alternate" hreflang="x-default" href="${base}/en/free-vietnam-esim"/>`;
 const urls=locales.map(l=>`<url><loc>${base}/${l}/free-vietnam-esim</loc><lastmod>2026-10-16</lastmod>${alt}</url>`).join("");
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,{headers:{"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, max-age=3600"}});
}
