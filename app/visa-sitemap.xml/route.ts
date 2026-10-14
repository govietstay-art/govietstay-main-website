const ROOT = "https://www.govietstay.com";
const entries = ["visa","tr/visa","pl/visa","nl/visa","ro/visa","uk/visa"];
export async function GET() {
  const rows = entries.map(path => '<url><loc>'+ROOT+'/'+path+'</loc><lastmod>2026-10-14</lastmod><changefreq>weekly</changefreq></url>').join('');
  return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+rows+'</urlset>', {headers:{"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, max-age=3600"}});
}
