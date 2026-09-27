# GoVietStay Weekly Group Deals — operations / thử nghiệm

## Scope and calendar
- 3 separate weekly products: Ba Na Hills on Tuesdays, Hoi An + Coconut on Thursdays, Cham Island on Saturdays.
- Dates generated in the landing page from the next occurrence of each weekday through **31 December 2027**; show a month selector. Dates are tentative, not guaranteed departure commitments.
- Language is part of trip identity: `tour_id + YYYY-MM-DD + guide_language`. Keep Russian and English cohorts separate.
- Minimum **5 verified adult booking commitments** and maximum **10 actual guests per cohort**. Do not count a casual WhatsApp page open or a duplicate inquiry. Children must have a costed tariff and count toward vehicle/boat capacity; they do not automatically satisfy the adult minimum.

## Public pricing trial — adult VND per guest (pilot proposal, NOT supplier-approved)
The following pilot prices are derived from existing GoVietStay tour references with a modest discount. RU guide prices for Hoi An and Cham are proposed, not current published RU guide prices.

| Tour | Language | Baseline | 5 adults | 6–7 adults | 8–9 adults | 10 adults |
|---|---|---:|---:|---:|---:|---:|
| Ba Na | EN | 1,550,000 | 1,490,000 | 1,450,000 | 1,390,000 | 1,350,000 |
| Ba Na | RU | 2,200,000 | 2,100,000 | 2,000,000 | 1,900,000 | 1,800,000 |
| Hoi An + Coconut | EN | 1,250,000 | 1,190,000 | 1,150,000 | 1,100,000 | 1,050,000 |
| Hoi An + Coconut | RU* | 1,800,000 | 1,700,000 | 1,650,000 | 1,550,000 | 1,490,000 |
| Cham Island | EN | 950,000 | 930,000 | 910,000 | 890,000 | 870,000 |
| Cham Island | RU* | 1,350,000 | 1,300,000 | 1,250,000 | 1,200,000 | 1,150,000 |

*RU Hoi An and RU Cham rows are launch proposals to be cost-checked, not published guaranteed selling rates. All tier rows require confirmation of actual tickets, guide, transfer, VAT, partner commissions, weather contingency, support, refund exposure and a small positive contribution margin **for every cohort size**. Approval must precede payment and marketing of guaranteed discounts. Verify published English baselines before extending pilot beyond 30 days.*

## Minimal operations — keep one master table
Store each real cohort by unique key. Suggested columns:
`tour_id`, `date`, `guide_language`, `minimum_adults=5`, `max_people=10`, `requests_valid`, `adults_committed`, `kids_committed`, `seats_reserved`, `adults_paid`, `supplier_cost_checked`, `guide_available`, `weather_clearance`, `tier_approved`, `status`, `cutoff`, `guide_id`, `vehicle_or_boat`, `net_margin`.

Statuses:
1. `OPEN`: self-serve inquiry; deduplicate by WhatsApp+date+tour+language.
2. `MINIMUM_REACHED`: **five verified adult commitments**. Hold further commitments up to safe capacity. Operations checks guide/supplier and the full tour budget.
3. `CONFIRMED`: guide, vehicle/boat/tickets, price tiers and cancellation terms signed off. Only now request payment; send confirmed itinerary and payment deadline.
4. `FULL`: tenth safe seat assigned. Waitlist separately; never overbook.
5. `CLOSED`: finalize paid manifest and agreed final tier, reconcile early payments if discounted final price falls, message guests. No further group price changes after published cutoff.
6. `DEPARTED`, `CANCELLED` or `WEATHER_HOLD`: clear responsibility and refund/transfer procedures.

Only the operator needs to intervene at `MINIMUM_REACHED` and for safety/exception handling, plus supplier coordination before departure. During this first trial, the frontend submits a prefilled WhatsApp request (not a real backend reservation). Manually log **received** requests in one master record before making any live seat or discount claims.

## Guest-visible explanation
- "Choose a tour + date + Russian/English guide. A request is free. At five verified adults in the same language/date, GoVietStay checks and confirms the departure; customers accept the final written package, then pay. Six, eight or ten verified paid adults qualify the entire cohort for its approved lower tier. At the cutoff, all adult guests pay the same final tier; if necessary, adjust early payment balances/refund the difference under the stated terms. With fewer than five confirmed adult commitments, offer another date or decline with no charge."
- Show no fictional occupancy or fake countdown. Publish actual counts only after authenticated storage and a deduplication/payment flow exist.
- Clarify child prices based on age/height and supplier policy before booking.
- Cham Island is conditional on the authorities permitting sailing, with a customer-visible transfer/refund alternative. A recurring date is not a promise of sea safety.
- Free request does not guarantee departure or a place.

## First-month metrics
Visitors → real received requests → unique verified adult commitments → groups reaching five → paid adult seats → departed tours → refunds and gross margin, broken out by RU/EN and each tour. The calendar is prepared through 2027, but this does **not** mean approving 2027 supplier rates today. Reapprove costs and availability periodically and before each departure. Continue the pilot after day 30 only if economics and guest feedback justify it.

## Development gates for automatic booking
- Server-side persistent cohort / reservation tables with capacity-checked transactions.
- Admin-only price tables + audit log; public only sees approved, dated rates.
- Verified checkout events and signed provider callbacks; automatic time-limited holds and refunds.
- Rules for five-commitment alert, six/eight/ten paid thresholds, written final price, cutoff, weather/supplier exceptions.
- Role-based operations screen: one row per cohort, human-readable status, upcoming cutoff, contacts and action queue. Public never sees customer personal data.
