# Weekly Group Deals — 30-day pilot operations (proposal, not live bookings)

## Core promise
Three tours, one tentative weekday departure per tour, four weeks. Each tour/date/guide-language is a SEPARATE group of 5–10 verified **paying adults**. No mixing Russian and English by default. The landing page is RU-first, with EN version. Children are quoted by supplier age/height rules; never count a child as an adult toward the minimum without an approved adult-equivalent policy.

## Pilot price proposal, VND/adult
| Tour / guide | regular reference | 5 | 6–7 | 8–9 | 10 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Ba Na / EN | 1,550,000 | 1,490,000 | 1,450,000 | 1,390,000 | 1,350,000 |
| Ba Na / RU | 2,200,000 | 2,100,000 | 2,000,000 | 1,900,000 | 1,800,000 |
| Hoi An+Coconut / EN | 1,250,000 | 1,190,000 | 1,150,000 | 1,100,000 | 1,050,000 |
| Hoi An+Coconut / RU* | 1,800,000 | 1,700,000 | 1,650,000 | 1,550,000 | 1,490,000 |
| Cham Island / EN | 950,000 | 930,000 | 910,000 | 890,000 | 870,000 |
| Cham Island / RU* | 1,350,000 | 1,300,000 | 1,250,000 | 1,200,000 | 1,150,000 |

**These are proposed TEST rates, not approved prices.** EN public rate references are on current GoVietStay site. Ba Na RU 2,200,000 is advertised on the GoVietStay Kazakhstan page. *Hoi An RU and Cham Island RU baselines are internal planning assumptions and must not be described as website rates. Review supplier and Russian-guide costs before any guest pays.

## How to avoid operational chaos: a single cohort key
One row/group per `tour_id + date_local + guide_language`. The maximum is 10 verified paying adults and minimum is 5. Track one status:
- OPEN: accept free requests (not counted as filled seats).
- PENDING_CONFIRMATION: at 5 adults ready to pay, check ticket/boat allocation, guide and vehicle; apply approved cost floor before collecting funds.
- CONFIRMED: at least 5 payments actually verified, available guide and suppliers confirmed, customer conditions acknowledged.
- CLOSED: at deadline (proposed 48 hours before dry-land departures; set supplier-specific Cham cutoff). Final tier = verified paying-adult group count; same tier for every adult, including earlier payers. Reconcile refunds/credits for earlier higher charges if payments were already collected.
- CANCELLED: below threshold at cutoff or unsafe/unauthorized sea conditions; propose rescheduling or no-charge withdrawal for an interest request, or handle refunds under written confirmed booking terms.

## Minimum back office fields
Cohort: tour, day, language, supplier/guide cost, confirmed inclusions, target profit margin floor, published tiers, hold expiry, cutoff, supplier availability, status. Guests: unique request ID, contact consent, adult/child counts, child ages/heights, verified payment status, amount due/paid and refund difference, assigned cohort. Never show their phone numbers publicly.

## Pilot with existing WhatsApp front end
The current site **only opens a prefilling WhatsApp request**. It does not store request data, check payment, update real occupancy or issue an automatic confirmed booking. During this small test, allocate one operator to copy actual received WhatsApp messages into the Admin booking sheet/table keyed by cohort. Update published live counts only after a secure backend exists; no fake occupancy. Once operations are validated, implement atomic inventory, expiring holds, authenticated Admin, payment callbacks, and automatic customer notices. Do NOT announce these as already built.

## Operator daily routine (10–15 minutes)
Morning: check new received requests, dedupe by phone + trip/date, reply with status and approved tier, offer other dates if needed. Before cutoff: verify paid count per cohort, check weather for Cham, confirm guide and vehicle, send written final price/inclusions and cancellation terms. After trip: compute actual gross receipts, supplier and guide payouts, refunds and contribution margin. Weekly compare group fill rate, booked revenue and acquisition source.

## Customer promise
Clear 5-person minimum, 10-person cap, separate languages; same lowest final group tier for early and late guests; price before payment; free interest request; no obligation to join a different date/language; no fake places or guarantees; child and weather policy confirmed before charge.
