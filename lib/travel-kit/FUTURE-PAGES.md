# Travel Kit — what is built

Phase 1 routes, all `noindex`, all under `app/(travel-kit)/`:

| Screen | Path |
| --- | --- |
| Home | `/{en\|ru\|it}/travel-kit` |
| eSIM request | `.../esim` |
| Airport arrival and driver address | `.../arrival` |
| Money | `.../money` |
| Phrasebook | `.../phrases` |
| Weather and rain plan | `.../weather` |
| Safety | `.../safety` |
| Packing list | `.../packing` |
| Da Nang guide | `.../da-nang` |
| Hoi An guide | `.../hoi-an` |
| Hue guide | `.../hue` |
| Phu Quoc guide | `.../phu-quoc` |
| Explore | `.../explore` |
| Tools | `.../tools` |
| My trip | `.../trip` |

City is `?city=danang|hoian|hue|phuquoc` and is also stored as `gvs-tk-city` on the phone. Canonical URLs omit the query. Weather and the city guides follow that city. The header city control is on every kit page.

Do not show a sample exchange rate or a sample forecast. Live sources, attribution and the go-live steps are in `SOURCES.md` and `GO-LIVE.md`. Sitemap URLs are prepared in `sitemap-draft.ts` and are not imported by `app/sitemap.ts`.
