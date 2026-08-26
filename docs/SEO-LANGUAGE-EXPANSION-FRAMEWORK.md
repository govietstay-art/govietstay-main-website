# GoVietStay Language SEO Expansion Framework

This file is the reusable blueprint for adding a new language market (Korean, Kazakh, Mongolian, Uzbek, etc.) without rebuilding the SEO system from zero.

## Trigger phrase
When the owner asks for a new language market, reuse this framework and replace language/market-specific research, keywords, hreflang and channels.

## Required architecture
1. Language hub: /{language-code}
2. One commercial flagship page.
3. 8-15 informational/search-intent pages around the hub.
4. One shared data-driven guide component to avoid duplicated code.
5. Sitemap inclusion for every indexable page.
6. Canonical URL on every page.
7. Hreflang only when an actual equivalent page exists.
8. Schema: Organization/TravelAgency + WebSite at language hub; Article + BreadcrumbList + FAQ on guides; Product/TouristTrip/Service only when the page truly represents that entity.
9. Internal links: hub -> all guides; every guide -> 3 related guides + commercial page + hub.
10. Build must pass before Git commit/push. Backup must stay OUTSIDE the Next.js repository.

## Search strategy
- Research real current SERPs in the target language.
- Separate head terms, commercial terms, itinerary terms, family terms, problem-solving terms and local-support terms.
- Answer the query in the first screen before promotional copy.
- Include practical local details that generic aggregators do not provide.
- Show an explicit updated date.
- Avoid keyword stuffing and copied competitor text.
- Do not create thin pages just to increase URL count.

## Content template
- SEO title
- Meta description
- H1
- 30-second answer box
- 4 quick decisions
- 5 unique practical sections
- checklist
- 4+ FAQs
- related-guide cluster
- local-support CTA
- updated date and market language

## Market channel layer
Korean: Google + Naver Blog/Search Advisor + Kakao.
Russian: Google/Yandex + Telegram/VK/Dzen + WhatsApp.
Kazakh: research current Google/Yandex/local social usage before launch; use kk-KZ hreflang.
Uzbek: research current Google/local social usage; use uz-UZ hreflang.
Mongolian: research current Google/local social usage; use mn-MN hreflang.

Never assume one country's channel mix applies to another country.

## Measurement
Track impressions, clicks, CTR, average position, leads and bookings by landing page. Expand the pages that start earning impressions instead of publishing blindly.
