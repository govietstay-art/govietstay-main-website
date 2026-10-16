# Travel Kit go-live checklist

The kit stays `noindex` and out of the production sitemap until the owner approves a public release. Do not merge this branch to `main` as that release.

## Before indexing

1. Owner confirms the pages are good enough to recommend, including the four city guides. Hue still has only the Ngo Mon photograph, and Phu Quoc only the beach photograph.
2. Owner confirms the eSIM wording. Compatibility, activation and the start of the 10 days are still “ask on WhatsApp”, because those conditions were not verified. Do not add a charge or the name of the company behind the gift.
3. Owner confirms permission for the Hoi An covered-bridge photograph (a person is visible from behind). See `CREDITS.md`.
4. Re-read the three GOV.UK Vietnam pages in `SOURCES.md` on the day of release. Update numbers and rules if they changed, and change the date in the copy.
5. Confirm Open-Meteo and Exchange Rate API attribution links are still on the weather and money screens.
6. Remove `noindex`, `nofollow` and `noimageindex` from `travelKitMetadata` in `lib/travel-kit/metadata.ts`.
7. Import `travelKitSitemapDraft()` from `lib/travel-kit/sitemap-draft.ts` into `app/sitemap.ts`. The draft already lists the four city guides.
8. Decide whether `app/robots.ts` should allow `/en/travel-kit`, `/ru/travel-kit` and `/it/travel-kit`. Until step 6, leave robots unchanged.
9. Check canonical and hreflang (`en`, `ru`, `it-IT`, `x-default`) on each tool URL. Canonicals stay free of `?city=`. JSON-LD must match the visible FAQ. TouristDestination is only on the four city guides, with the city name and the guide lede, and no rating.
10. Run a mobile Lighthouse pass on the home page and one tool page after the production deploy. Fix contrast, tap targets or LCP regressions before calling it live.
11. Phone-check WhatsApp: the draft opens to +84 937 762 607 and nothing sends until the traveler presses send.
12. Phone-check a tick on the packing list, leave the page, and come back. It should still be ticked on that phone.

## Analytics

The dispatcher is `lib/travel-kit/analytics.ts`. It is off until someone sets `localStorage.setItem("gvs-tk-analytics", "on")` on that browser. No banner, no cookie, no network call, no third-party script.

| Event | When |
| --- | --- |
| `travel_kit_open` | Once per page load, for the page the traveler opened |
| `city_change` | After a real city pick. Payload city is the new city |
| `tool_open` | Once per tool per page load |
| `esim_request_click` | The eSIM WhatsApp button only |
| `whatsapp_click` | The support bar and the home support block |

Payload: `{ language, city, tool }` where `tool` is a kit slug or `"home"`. Repeats of the two open events are dropped for that page load. Clicks closer than 1.2 seconds with the same payload are dropped. A listener can use `window.addEventListener("gvs-travel-kit-event", ...)`.

## Offline

`public/kit-sw.js` is registered as `navigator.serviceWorker.register("/kit-sw.js", { scope: "/{lang}/travel-kit/" })`. The fetch handler ignores every other path, so the main site is not controlled. It caches successful kit HTML for a later offline load. It cannot cache `/_next/static` or `/_next/image`, because those URLs are outside that scope. Checklist ticks, the saved address, the last weather reading and the last rate already live in localStorage.

## Still not part of go-live

- A translation feature. The phrasebook is a fixed list.
- Accounts. Lists stay in localStorage.
- Production DNS or a change to the main website chrome.
- Extra Hue and Phu Quoc photographs for rain and evening. The current files stay on the correct place rather than a stand-in.
