# Travel Kit sources

Checked on **16 October 2026**. If a fact is not in this file, it is not on the page.

## Entry, customs, safety, internet

UK Foreign, Commonwealth & Development Office, Vietnam travel advice:

- Getting help: https://www.gov.uk/foreign-travel-advice/vietnam/getting-help
  - Police 113 (also traffic accidents), fire 114, ambulance 115, search and rescue 112, child protection 111.
  - Operators answer in Vietnamese only.
- Entry requirements: https://www.gov.uk/foreign-travel-advice/vietnam/entry-requirements
  - British citizen passport: at least six months’ validity, two blank pages, undamaged, same passport in and out, entry stamp required.
  - British citizens: up to 45 days for tourism or business without a visa; check the stamp shows 45 days. An e-visa is a separate document. This is not stated for other passports.
  - From 15 April 2026 a digital arrival card is encouraged for foreign nationals at Tan Son Nhat Airport (Ho Chi Minh City). It is not currently mandatory there, and the advice says the requirement may change or spread with little notice. The page does not say Da Nang requires it.
  - Declare cash over 15 million dong, or over 5,000 US dollars or the equivalent in other currencies.
  - Prescription medicine in hand luggage with the prescription. Declare if the import value is over 100 US dollars.
  - Vapes and related products are banned.
- Safety and security: https://www.gov.uk/foreign-travel-advice/vietnam/safety-and-security
  - Petty crime and motorbike bag-snatching. Hold the bag in front, on the side away from traffic.
  - Do not give a passport as a deposit. Carry printed and digital copies of the photo page. A printed photo page and visa are accepted as photographic ID.
  - Grab and Xanh SM named as licensed ride apps. Book the whole journey in the app. Beware of impostors. Metered taxis from larger firms are described as generally reliable. Unarranged free hotel buses can be scams.
  - Motorbike travel is much riskier. Helmet required for driver and passenger. British licence holders: 1968 international driving permit, UK licence, third-party insurance. Any alcohol is drink-driving.
  - Methanol in drinks, including at licensed places. Buy your own drink. Do not buy street liquor or cigarettes.
  - Severe drug penalties, including for cannabis.
  - Cover shoulders and knees at religious sites. Do not photograph military bases.
  - Central Vietnam rainy season October to December; flooding can block roads. Tropical cyclones on the east coast May to November.
  - Authorities can block websites and review device content.

The kit tells readers with a non-British passport to read their own government’s advice. Russian and Italian entry rules were not copied from those governments in this version.

## Weather

- API: `https://api.open-meteo.com/v1/forecast`
- Licence and attribution: https://open-meteo.com/en/licence
- The page links “Weather data by Open-Meteo.com” to https://open-meteo.com/ next to the reading.
- No API key. Response cache about 30 minutes. Coordinates used: Da Nang 16.0544, 108.2022; Hoi An 15.8801, 108.338; Hue 16.4637, 107.5909; Phu Quoc 10.2899, 103.984. Timezone `Asia/Bangkok`.
- A failed request shows an unavailable state, or the last reading saved on that phone, labelled as saved.

## Exchange rates

- API: `https://open.er-api.com/v6/latest/USD` (ExchangeRate-API open access).
- Docs: https://www.exchangerate-api.com/docs/free
- Attribution required on the page: the link text “Rates By Exchange Rate API” to https://www.exchangerate-api.com
- Frankfurter was checked the same day and does not return VND, so it is not used.
- Cache about 12 hours. The page says the figure is for reference only and is not a bank rate.
- A failed request shows an unavailable state, or the last rate saved on that phone, labelled as saved. No sample rate is shown.

## eSIM

- Allowance on the page: 5 GB a day for 10 days, as the owner described the gift.
- WhatsApp `+84 937 762 607`, confirmed by the owner on 16 October 2026. The button only opens a draft. Nothing is sent or issued by the page.
- Phone compatibility, how activation works, and when the 10 days start were **not** in a source that could be checked. The page says so and sends those questions to the WhatsApp chat.
- No charge is shown, and the company behind the gift is not named. There is no review request.

## Photographs

See `CREDITS.md` in this folder. Places are named only where the photograph is of that place.

## Left out on purpose

Not verified, so not stated as fact:

- That Hoi An has no airport, or that Hue’s airport is Phu Bai, or any IATA code.
- Drive times, taxi fares, ATM fees, opening hours, ticket prices, show times.
- Whether shops “prefer cash”, or that Duong Dong market is covered.
- Full guides for Hoi An, Hue and Phu Quoc. The home screen says those guides are not in this version.
- A machine translator. The phrasebook is a fixed list.

## Pages linked from the Da Nang guide

Confirmed in this repo on 16 October 2026:

- `/travel/local-experiences/da-nang-night-bites-city-lights`
- `/travel/vietnam-local-help`
- `/ru/local-experiences/da-nang-night-bites-city-lights`
- `/ru/tours/ba-na-hills`
- `/it/local-experiences/da-nang-night-bites-city-lights`
- `/it/da-nang-o-phu-quoc`
