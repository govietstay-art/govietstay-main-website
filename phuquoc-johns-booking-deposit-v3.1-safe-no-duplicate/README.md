# GoVietStay Phu Quoc V3.1 — SAFE / NO DUPLICATE

This package fixes the V3 build error caused by extracting the installer inside the Next.js project.

## Public SEO architecture — exactly TWO existing routes

- English: `https://www.govietstay.com/tours/phu-quoc`
- Russian: `https://www.govietstay.com/ru/tours/phu-quoc`

V3.1 **updates those two existing files in place**. It does not create `/phu-quoc`, `/en/phu-quoc`, `/ru/phuquoc`, `/phu-quoc-tours`, or another competing Phu Quoc tour hub.

The existing route guard intentionally stops if either existing page is missing.

## Why V3 failed

V3 included real `.tsx` / `.ts` files under `phuquoc-johns-booking-deposit-v3-published-rates/site-files/...`.
If that folder was extracted inside the Git project, Next.js / TypeScript discovered those installer source files during `npm run build`. Their relative imports were being resolved from the installer folder, not from the real `app/...` destination.

V3.1 stores all installer code as `.txt`. Next.js cannot type-check those package sources. The BAT renames them to `.ts` / `.tsx` only when copying into the correct real destinations.

V3.1 also moves any old `phuquoc-johns-*` folder containing `site-files` out of the project root into `%TEMP%` before building. Nothing is deleted.

## Pricing model

Join-in tours:
- customer price = John’s Tours **Published Rate**
- supplier net = internal only
- GoVietStay commission = Published Rate - supplier net
- no +25% markup

Private tours:
- no public fixed price
- contact / private quote

## Booking & deposit

Customer -> GoVietStay booking form -> Pending request -> availability / final price confirmation -> Payment Center creates `/pay/[token]` -> VietQR or International Payment -> Booking Master / Operations / Finance.

The public form does not collect passport/ID data. Traveller identity details can be requested securely after availability confirmation when required by the operator.

## How to install

1. Extract this V3.1 ZIP. Desktop or Downloads is preferred, but V3.1 is also safe if accidentally extracted inside the repository because its source code uses `.txt` extensions.
2. Double-click `INSTALL-PHUQUOC-V3.1-SAFE-NO-DUPLICATE.bat`.
3. The installer verifies both existing public routes, creates a backup in `%TEMP%`, quarantines old V3 `site-files` packages, copies the V3.1 files, then runs `npm run build`.
4. It **does not commit or push** anything.
5. Only after build succeeds should production be committed/pushed.

The multiple-lockfile message from Next.js is a warning. It is not the V3 TypeScript failure shown in the screenshot.
