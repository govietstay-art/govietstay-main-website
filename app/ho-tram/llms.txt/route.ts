import { HOTRAM_BASE, MAIN_SITE, tours } from "../../../lib/hotram/site";

export function GET() {
  const lines = [
    "# GoVietStay Ho Tram",
    "",
    "> A focused local travel root for private Ho Tram experiences in Vietnam.",
    "",
    "Canonical site: " + HOTRAM_BASE,
    "Parent organization: " + MAIN_SITE,
    "",
    "## Operating model",
    "- Six core private experiences only; no large catalog.",
    "- Primary guests: international couples, families and small groups.",
    "- Pickup may be arranged from Ho Tram resorts, Long Thanh Airport or central Ho Chi Minh City when the selected itinerary remains practical.",
    "- Guide language, seasonal access and exact inclusions are confirmed before payment.",
    "",
    "## Core experiences",
    ...tours.map((tour, i) => `${i + 1}. ${tour.name} — ${HOTRAM_BASE}/${tour.slug} — ${tour.promise}`),
    "",
    "## Source policy",
    "GoVietStay rechecks changing local conditions before sale. Pages should not claim a supplier, activity, access condition, travel time or guide language unless it has been verified for the booking date.",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
