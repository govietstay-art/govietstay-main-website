# Russian Da Nang landing — query evidence and content scope (28 September 2026)

## Source and coverage

These are actual synced GoVietStay admin records, not estimates from keyword planners. Google: `public.search_console_daily`, settled dates 2026-08-27 through 2026-09-23, pages `/ru/danang` or `/ru/tours/ba-na-hills`. Yandex: **one** `public.yandex_query_snapshots` period 2026-08-25 through 2026-09-20. Yandex queries are sitewide; they **cannot be attributed** to `/ru/danang`. Never sum overlapping Yandex snapshot periods, infer stable CTR from tiny samples or invent search volume.

| Observed query/cluster | Data | User question / page treatment |
|---|---:|---|
| `экскурсии в дананге на русском языке` | Google: 9 impressions, 0 clicks | H1/meta and direct guide-language answer; distinguish an actual RU guide from RU support with an English-speaking join-in guide. |
| `экскурсии из дананга на русском языке` | Google: 1 impression, 1 click | Show Ba Na, Hoi An, Hue, Cham trip choices and request date/hotel/party details. |
| `дананг экскурсии на русском языке` | Google: 1 impression, 0 clicks | Same intent: consolidate on existing `/ru/danang`, no new duplicate landing. |
| Queries containing Da Nang and rain/forecast | Yandex: 35 query rows; 54 impressions, 3 clicks | Practical rain-day scenario section. Exact example: `что делать в дананге в дождь` 8 impressions; `куда съездить в дананге когда льет дождь` 3 impressions / 1 click. |
| Ba Na + weather-related queries | Yandex: 29 query rows; 37 impressions, 2 clicks | Answer whether to travel in rain, visibility vs weather, cable-car operator status; link to existing `/ru/aktualno/bana-hills-in-rain` and booking page. |
| `работает ли канатная дорога ба на хиллс в дождь` | Yandex: 2 impressions, 0 clicks | Explain ordinary rain does not itself guarantee closure; official status/wind/thunderstorms determine operations. |

These are small samples; numbers show what has been seen, not total audience demand, precise rankings, or guaranteed future conversions.

## Editing boundary and GEO design

Change the existing `/ru/danang` listing, not `/ru/tours/ba-na-hills` and not a second generic rain article. Preserve a tour-first page: compare appropriate routes, be clear about guide language and booking terms, answer rainy-day concerns through a prominent three-scenario card block and direct FAQs, link to the existing deeper rainy Ba Na article. Avoid false claims about live weather, attraction hours, open cable cars, or safe road travel in flood/storm conditions.

Google and Yandex SEO: exact-intent Russian metadata, helpful first-hand-style local decision guidance, visible questions whose text matches the existing single-source FAQ JSON-LD, correct hero photo of Da Nang, canonical preserved, sitemap `lastModified` updated **for this URL only** and real contextual internal links. Google does not guarantee FAQ rich results merely because FAQ schema exists.

## After deployment

- Google: export the same `/ru/danang` query/page metrics for subsequent settled 28-day windows; segment Russian-speaking geography and branded/nonbranded separately. Respect query anonymization.
- Yandex: compare **nonoverlapping** snapshots for rain and Ba Na query theme, without assigning sitewide query counts to `/ru/danang`.
- Cross-check mobile usability, indexation and GA4 WhatsApp key events; confirmed bookings require a separate booking source of truth. Do not assume ranking uplift on launch day.
