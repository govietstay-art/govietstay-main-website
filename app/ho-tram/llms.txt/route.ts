import { HOTRAM_BASE, MAIN_SITE, tours } from "../../../lib/hotram/site";

export function GET() {
  const lines = [
    "# GoVietStay Ho Tram",
    "",
    "> Private Ho Tram experiences and trusted local travel support in Vietnam.",
    "",
    "Canonical site: " + HOTRAM_BASE,
    "Parent organization: " + MAIN_SITE,
    "",
    "## What GoVietStay offers",
    "- Six private Ho Tram experiences for couples, families and small groups.",
    "- Pickup options vary by experience and may include Ho Tram resorts, Long Thanh Airport or central Ho Chi Minh City.",
    "- English-speaking support is available; other guide languages are confirmed for the requested date.",
    "- Exact pickup, inclusions and weather-sensitive activities are confirmed before booking.",
    "",
    "## Private experiences",
    ...tours.map((tour, i) => `${i + 1}. ${tour.name} — ${HOTRAM_BASE}/${tour.slug} — ${tour.promise}`),
    "",
    "## Booking",
    "Guests can contact GoVietStay through the website or WhatsApp with travel date, number of guests, hotel or flight details and preferred guide language.",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
