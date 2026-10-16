# Travel Kit go-live checklist

The kit stays `noindex` and out of the production sitemap until the owner approves a public release. Do not merge this branch to `main` as that release.

## Before indexing

1. Owner confirms the pages are good enough to recommend, including the Da Nang guide and the honest gaps for Hoi An, Hue and Phu Quoc.
2. Owner confirms the eSIM wording. Compatibility, activation and the start of the 10 days are still “ask on WhatsApp”, because those conditions were not verified. Do not add a charge or the name of the company behind the gift.
3. Owner confirms permission for the Hoi An covered-bridge photograph (a person is visible from behind). See `CREDITS.md`.
4. Re-read the three GOV.UK Vietnam pages in `SOURCES.md` on the day of release. Update numbers and rules if they changed, and change the date in the copy.
5. Confirm Open-Meteo and Exchange Rate API attribution links are still on the weather and money screens.
6. Remove `noindex`, `nofollow` and `noimageindex` from `travelKitMetadata` in `lib/travel-kit/metadata.ts`.
7. Import `travelKitSitemapDraft()` from `lib/travel-kit/sitemap-draft.ts` into `app/sitemap.ts`. Do not add URLs for city guides that are not written.
8. Decide whether `app/robots.ts` should allow `/en/travel-kit`, `/ru/travel-kit` and `/it/travel-kit`. Until step 6, leave robots unchanged.
9. Check canonical and hreflang (`en`, `ru`, `it-IT`, `x-default`) on each tool URL. JSON-LD must still match the visible FAQ and the Da Nang page only.
10. Run a mobile Lighthouse pass on the home page and one tool page after the production deploy. Fix contrast, tap targets or LCP regressions before calling it live.
11. Phone-check WhatsApp: the draft opens to +84 937 762 607 and nothing sends until the traveler presses send.
12. Phone-check a tick on the packing list, leave the page, and come back. It should still be ticked on that phone.

## Still not part of go-live

- Full written guides for Hoi An, Hue and Phu Quoc.
- A translation feature. The phrasebook is a fixed list.
- Accounts. Lists stay in localStorage.
- Production DNS or a change to the main website chrome.
