# GoVietStay — 6 Russian Phu Quoc landing pages

Ready for Next.js App Router.

## Routes
- /ru/phu-quoc/individualnye-ekskursii
- /ru/phu-quoc/gde-ostanovitsya
- /ru/phu-quoc/pervyy-raz
- /ru/phu-quoc/transport
- /ru/phu-quoc/snorkling
- /ru/phu-quoc/hon-thom

## Install
Copy the `app/ru/phu-quoc/` folders into the same path in the production project.
If your project uses `src/app`, copy into `src/app/ru/phu-quoc/` instead.

The bundle has no third-party UI dependencies and uses one shared CSS module.
It contains:
- Next.js Metadata (title/description/keywords/canonical/OpenGraph)
- FAQ JSON-LD
- mobile sticky WhatsApp CTA
- internal links across the existing Russian Phu Quoc cluster
- CTA: "Напишите даты поездки и название отеля — мы бесплатно поможем составить план отдыха на Фукуоке."
- WhatsApp number: +84 937 762 607

## After deploy
1. Open each route and check HTTP 200.
2. Add these 6 URLs to sitemap.xml if your sitemap is not generated automatically.
3. Submit the 6 URLs in Yandex Webmaster -> Indexing -> Reindex pages.
4. Request indexing in Google Search Console when useful.
5. Check canonical and title in page source.
