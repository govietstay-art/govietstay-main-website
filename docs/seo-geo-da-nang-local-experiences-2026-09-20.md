# GoVietStay — Da Nang Local Experiences: SEO + GEO brief

Research date: 2026-09-20. Status: editorial drafts on a dedicated Git branch; not approved for bookings, indexing or main deployment. Primary languages: EN / RU / IT.

## Actual keyword tool findings (Ubersuggest, Vietnam market, English)

| Search term | Approx. monthly volume | SEO difficulty as returned | Page role |
|---|---:|---:|---|
| da nang city tour | 1,300 | 25 | Primary target: City Stories |
| da nang food tour | 70 | Ubersuggest keyword-ideas overview returned 36; autocomplete row returned 18 (different report types) | Primary target: Taste Trails |
| da nang night tour | 10 | 31 (ideas overview) | Primary target: After Dark |
| da nang motorbike tour | 10 | 36 (ideas overview); related row returned 18 | Primary target: Local Rider |
| da nang private city tour | 0 | 4 (ideas overview) | Conversion-intent secondary phrase, not evidence of no demand |
| da nang city attractions | 2,400 | 35 (keyword ideas) | Informational support / existing Da Nang guide, not a reason to rebrand a paid tour page |
| da nang night market | 320 | 19 (keyword ideas) | Informational support for After Dark, not an inaccurate claim of market inclusion |
| da nang hidden food walking tour | 20 | 9 (keyword ideas) | Relevant long-tail concept, only if an actual walking route is confirmed |
| where to eat da nang | 30 | 12 (keyword ideas) | Relevant FAQ/supporting content for Taste Trails |

These are estimates supplied by Ubersuggest, not Google Search Console measurements. The keyword-ideas report and keyword-overview API can return different difficulty values. Small 0-volume terms are not proven to have no searches. Research was scoped to English in Vietnam: it must NOT be described as worldwide, Russia or Italy volume.

Russian phrase `экскурсии в Дананге` returned volume 0 in the Vietnam/Russian locale; Italian `tour gastronomico Da Nang` likewise 0 in the Vietnam/Italian locale. Both results have narrow geographic scope and cannot justify dismissing pre-arrival demand. An additional Italian-market request hit the Ubersuggest account's 3-report daily quota on 2026-09-20. GSC Wizard site listing returned payment_required: trial ended; cannot claim verified own-site queries until account access is restored.

## Four separate search intents and proposed URLs

1. **Taste Trails** — local food, cuisine, private walk; primary EN `da nang food tour`; secondary `private food tour da nang`, `what to eat in da nang`, `where to eat da nang`. RU `гастрономическая экскурсия по Данангу`, `что попробовать в Дананге`. IT `tour gastronomico Da Nang`, `cosa mangiare a Da Nang`.
2. **City Stories** — city sightseeing/culture, flexible private discovery; primary EN `da nang city tour`; secondary `private da nang city tour`, `da nang city attractions`, `local guide da nang`. RU `обзорная экскурсия по Данангу`, `индивидуальная экскурсия Дананг`. IT `tour privato Da Nang`, `tour della città di Da Nang`.
3. **After Dark** — evening city atmosphere, riverside and food options; primary EN `da nang night tour`; secondary `da nang night market`, `what to do in da nang at night`, `Dragon Bridge night tour` (show never guaranteed). RU `вечерняя экскурсия Дананг`, `что делать в Дананге вечером`. IT `Da Nang di sera`, `cosa fare a Da Nang la sera`.
4. **Local Rider** — passenger experience with an inspected local rider (not self-drive rental); primary EN `da nang motorbike tour`; secondary `da nang scooter tour`, `motorbike tour with driver`. RU `мототур по Данангу`, `мотопрогулка с водителем`. IT `tour in moto Da Nang`, `tour in scooter con conducente Da Nang`.

Each route is `/travel/local-experiences/{slug}` for EN, `/ru/local-experiences/{slug}` for RU and `/it/local-experiences/{slug}` for IT. Do not confuse location variants with separate products. All URLs have reciprocal language alternates and their own canonical.

## GEO: answer-first questions explicitly handled on the draft pages

- Taste Trails: What to eat? Private? Vegetarian/allergens? Actual price?
- City Stories: What is included? Private? Are Ba Na/Hoi An part of it? Guide language actually available?
- After Dark: Things to do at night? Dragon Bridge schedule? Cruise inclusion? Rain alternative?
- Local Rider: Is self-driving required? What risks/safety checks? Children allowed? Heavy-rain policy?

Answer with confirmed evidence, not made-up routes, claims of awards, ratings, prices or promised guide languages. FAQ is human-readable. WebPage and BreadcrumbList JSON-LD are included; Product/Offer/TouristTrip/aggregateRating are deliberately absent until operations confirm them. GEO is not a guarantee of AI citation; citation tracking must use genuine tested outputs and dated evidence.

## Publish gate (not yet met)

- David's actual visit and supplier assessment; distinct GoVietStay itinerary; realistic distance, staffing and guest experience.
- Supplier identity, licensing/insurance where relevant, genuine helmet/vehicle checks for Local Rider, rain alternatives and child eligibility.
- Actual menu, stop count, dietary limitations, ticket/cruise and pickup inclusion; truthful language availability EN/RU/IT.
- Accurate pricing and cancellation, original GoVietStay photos with honest alt text; translation review.
- Full `npm run build`, all 12 responsive pages open with 200, valid structured data, correct canonical/hreflang; check existing routes/admin unaffected.
- Only then remove `noindex`, add to sitemap, attach from the Da Nang hub and relevant live pages, and submit Google/Bing/Yandex indexing. Do not merge automatically.
