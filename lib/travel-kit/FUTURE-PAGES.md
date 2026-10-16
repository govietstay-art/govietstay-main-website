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

City is `?city=danang|hoian|hue|phuquoc`. Weather follows that city. Full written guides for Hoi An, Hue and Phu Quoc are not in this version.

Do not show a sample exchange rate or a sample forecast. Live sources, attribution and the go-live steps are in `SOURCES.md` and `GO-LIVE.md`. Sitemap URLs are prepared in `sitemap-draft.ts` and are not imported by `app/sitemap.ts`.
