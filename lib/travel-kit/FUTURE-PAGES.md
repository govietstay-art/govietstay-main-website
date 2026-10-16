# Travel Kit — future pages

The Home screen is the only screen in this prototype. Each utility should later become one page, in the same three languages, still isolated from the tour site.

## Routes

| Utility | English | Russian | Italian |
| --- | --- | --- | --- |
| Home (built) | `/en/travel-kit` | `/ru/travel-kit` | `/it/travel-kit` |
| eSIM request | `/en/travel-kit/esim` | `/ru/travel-kit/esim` | `/it/travel-kit/esim` |
| Airport arrival | `/en/travel-kit/arrival` | `/ru/travel-kit/arrival` | `/it/travel-kit/arrival` |
| Currency | `/en/travel-kit/currency` | `/ru/travel-kit/currency` | `/it/travel-kit/currency` |
| Translator | `/en/travel-kit/translator` | `/ru/travel-kit/translator` | `/it/travel-kit/translator` |
| Weather and alternatives | `/en/travel-kit/weather` | `/ru/travel-kit/weather` | `/it/travel-kit/weather` |
| Safety | `/en/travel-kit/safety` | `/ru/travel-kit/safety` | `/it/travel-kit/safety` |

Keep these under `app/(travel-kit)/` so they do not inherit the Russian link block or the Italian marketing layout. Do not add them to `app/sitemap.ts` until the owner lifts `noindex`.

## What each page should do

- **eSIM.** The same WhatsApp request as Home. Do not add a charge, a vendor name, or a request for a public review. One question block: what the allowance is, and that the traveler sends the message.
- **Arrival.** The checklist, plus the airport name in Vietnamese for the selected city. No invented transfer times or taxi fares.
- **Currency.** The sample converter, with the rate table still in `lib/travel-kit/config.ts`. Say plainly that it is not live.
- **Translator.** The phrase list and the full-screen “show this” view. Add phrases only when a native speaker has checked them.
- **Weather.** Sample conditions and the rain-day list for the city. A live forecast is a later decision, not a silent network call.
- **Safety.** The verified numbers 113, 114, 115 and 112, the driver card, and a short note that operators may answer in Vietnamese.

## Shared rules for those pages

- Copy stays in `lib/travel-kit/dictionaries/{en,ru,it}.ts`. Do not hard-code a second set of strings.
- Each page exports `noindex, nofollow` until the owner approves indexing.
- Each page sets a canonical URL and `hreflang` for `en`, `ru`, `it-IT`, and `x-default`.
- Add a short question-and-answer block and matching `FAQPage` JSON-LD, plus the existing `WebApplication` node pointed at Home.
- The WhatsApp number remains the single constant `TRAVEL_KIT_WHATSAPP_E164`.
- No third-party runtime calls. No tracking.
- City and sample-day query parameters (`?city=danang&day=rain`) should carry over from Home so the page opens in the same context.

## Indexing later

When the owner approves a public release: remove `noindex`, add the six URLs per language to the sitemap with hreflang, and decide whether `app/robots.ts` should keep disallowing `/en/travel-kit`, `/ru/travel-kit` and `/it/travel-kit`. Until then, leave the sitemap and robots file unchanged.
