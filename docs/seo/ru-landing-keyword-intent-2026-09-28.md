# GoVietStay RU — search intent to landing map, verified admin snapshot 2026-09-28

The data below comes from GoVietStay's synced Supabase admin tables `search_console_daily` and `yandex_query_snapshots`, not Ubersuggest competitor estimates. Treat the time windows separately. Last successful sync: 2026-09-26; newest populated Google/Yandex dates: 2026-09-23. GSC Wizard currently requires a paid subscription but **the admin's own synced tables are readable**.

### Owned Google Search Console — final-date 28-day window 2026-08-27 to 2026-09-23

Filter: canonical page path begins `/ru`, desktop + mobile, all countries. In this window: 200 impressions, 3 clicks across 16 RU landing pages; the sample is **too small to infer stable ranking or expected conversions**. Excluding `govietstay` and an unrelated `get away tour` query, these landing pages have recorded non-branded impressions:

| URL | Non-brand impressions | Clicks | Actual example query with impressions |
| --- | ---: | ---: | --- |
| `/ru/hoi-an` | 30 | 1 | `хойан что посмотреть` (15), `хойан достопримечательности` (6), `хойан что посмотреть за 1 день` (4, 1 click) |
| `/ru/hue` | 14 | 0 | `экскурсия в хюэ из дананга` (5), `экскурсии в хюэ из дананга` (3) |
| `/ru/phu-quoc/from-moscow` | 12 | 0 | `москва фукуок`, `москва фукуок прямой рейс` (small single-query samples) |
| `/ru/danang` | 11 | 1 | `экскурсии в дананге на русском языке` (9) |
| `/ru/phu-quoc/chto-posmotret` | 11 | 0 | `фукуок что посмотреть` (3) |
| `/ru/aktualno/hoi-an-two-experiences` | 10 | 1 | `кокосовый лес хойан` (4, 1 click) |
| `/ru/phu-quoc` | 7 | 0 | `фукуок 2026` (3), `экскурсии фукуок 2026` (3) |
| `/ru/tours/phu-quoc` | 1 | 0 | `сколько стоит` (1). Do not pretend Google demand is established. |

Google totals may omit anonymized queries; position and CTR are unstable at this scale.

### Owned Yandex Webmaster — **one** 28-ish day snapshot 2026-08-25 to 2026-09-20

Yandex's 273 returned query rows contain 361 recorded impressions and 12 clicks. They cover Yandex's returned top queries only, have some low-volume/noisy or inconsistent rows, and **cannot be assigned to a specific GoVietStay URL**. Do not sum this snapshot with overlapping weekly sync snapshots.

| Theme (candidate regular-expression grouping, not keyword volume) | Query variants | Recorded impressions | Clicks | Actual search examples |
| --- | ---: | ---: | ---: | --- |
| Phu Quoc Sunset Town / Hon Thom | 38 | 57 | 0 | `sunset town на фукуоке` (5), a question about water-show start time (5) |
| Da Nang when raining | 36 | 55 | 3 | `что делать в дананге в дождь` (8) |
| Ba Na Hills weather | 13 | 18 | 2 | `погода на бана хиллс` (4) |
| Da Nang fishing | 5 | 13 | 0 | `рыбалка в дананге` (4) |
| Hoi An / coconut forest | 8 | 12 | 2 | `что посмотреть в хойане за 1 день` (2), `кокосовый лес дананг прогулка сколько стоит` (2, 1 click) |
| Phu Quoc booking / WhatsApp | 3 | 4 | 2 | `как быстро подтверждают заявку на тур фукуок` (4 appears in this snapshot; actual WA booking query 2 impressions, 2 clicks; overlapping regex assignment varies) |

**Data caveat:** The thematic grouping is based on keyword strings and overlapping intent; totals represent these chosen patterns, not all market searches. Some Yandex rows have unusually small/inconsistent click counts. More recent 2026-09-19 to 09-23 snapshot: 154 query rows, 191 impressions, 3 clicks; don't merge overlapping periods.

### Page-by-page editing queue (based on recorded intent, not unsupported volume predictions)

1. Finish `/ru/tours/phu-quoc` booking page: one Google price query + Yandex evidence for WhatsApp ordering/confirmation. Add visible source-derived price examples, accurate English group-guide vs RU booking-support explanation, booking-by-WhatsApp CTA, no artificial confirmation SLA. This is a **conversion content improvement**, not a claim of strong Google rankings.
2. `/ru/hoi-an`: address Google query `хойан что посмотреть` explicitly, answer `за 1 день` clearly and link coconut forest + evening itinerary. Keep `/ru/aktualno/hoi-an-two-experiences` as specialized supplementary information, not another identical Hoi An landing.
3. `/ru/danang` and linked rain article: user-visible rainy-day alternatives and an honest Ba Na rain decision guide. Yandex rain-related theme is the clearest reported seasonal topical signal; preserve booking CTAs without saying sunshine is guaranteed.
4. `/ru/phu-quoc/sunset-town`: location, time planning, what to do, where to confirm official show/cable-car schedules. Yandex sitewide theme is visible but no URL attribution, so don't rank it on Yandex impressions alone.
5. `/ru/hue`: actual Google searches around excursions from Da Nang; clarify itinerary choices and Hai Van Pass conditions.

Keep `/ru/phu-quoc/3-ili-4-ostrova`, `/ru/phu-quoc/russkiy-gid`, `/ru/phu-quoc/s-detmi` as narrowly scoped support pages linked from booking catalog. Never duplicate the entire catalog onto hub pages.

**Verification workflow:** Query `search_console_daily` by exact canonical page and country for the same settled range, compare against a previous equal window when adequate data exist. For Yandex use only one nonoverlapping snapshot per comparison and segment by query, not invented URLs; Yandex Metrica landing snapshots currently have zero rows. Validate WhatsApp event / confirmed booking separately before claiming commercial SEO uplift.

Sources: GoVietStay admin sync tables; public platform definitions at https://support.google.com/webmasters/answer/17011165?hl=en and https://www.yandex.ru/support/webmaster/ru/service/statistics .
