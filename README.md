# Travel Kit static preview

Throwaway branch. Do not merge.

This branch is only a noindex static snapshot of the Travel Kit from `design/travel-kit-concepts` (PR #81, commit f4a0c0f), plus the design concept pages. It does not contain the production site.

GitHub Pages, if enabled on **this branch** and folder **`/ (root)`**, serves:

https://govietstay-art.github.io/govietstay-main-website/en/travel-kit/

Russian: `/ru/travel-kit/`
Italian: `/it/travel-kit/`
Concepts: `/travel-kit-concepts/`

Do not add a custom domain. Leave the Pages domain on `govietstay-art.github.io` so `govietstay.com` is unchanged.

`robots.txt` disallows all crawlers. Pages send `noindex`.

Weather and exchange rates are frozen at the time this snapshot was crawled (16 October 2026). City changes and phrase, packing, and safety pages work in the browser. The live server build is still the Vercel preview behind Deployment Protection.
