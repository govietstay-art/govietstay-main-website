export type PhilippinesPrice={
  fromVnd:number;
  approxPhp:number;
  label:string;
  note:string;
};

export const philippinesMarketConfig={
  locale:"en-PH",
  whatsapp:"https://wa.me/84937762607",
  phone:"+84 937 762 607",
  fx:{
    phpPerVnd:0.00236768,
    label:"FX snapshot used for display estimate: 1,000,000 VND ≈ PHP 2,367.68 (2026-08-27). VND is the booking currency; PHP is only an estimate."
  },
  prices:{
  "bana": {
    "fromVnd": 1490000,
    "approxPhp": 3528,
    "label": "Ba Na flexible trial rate",
    "note": "Selected dates/configurations. Ticket/buffet/guide inclusions must be confirmed."
  },
  "hoian": {
    "fromVnd": 1090000,
    "approxPhp": 2581,
    "label": "Hoi An + Coconut trial rate",
    "note": "Designed below a current major-OTA private Hoi An + Coconut benchmark, but final inclusions must match."
  },
  "cham": {
    "fromVnd": 950000,
    "approxPhp": 2249,
    "label": "Cham Island trial rate",
    "note": "Sea operation, pickup, lunch and equipment depend on the confirmed package."
  },
  "hue": {
    "fromVnd": 1390000,
    "approxPhp": 3291,
    "label": "Hue trial rate",
    "note": "Private/flexible upgrades quoted separately."
  },
  "dadTransfer": {
    "fromVnd": 250000,
    "approxPhp": 592,
    "label": "Central Da Nang airport-transfer traffic rate",
    "note": "Central Da Nang only; Hoi An, late-night, large vehicles and special routes are quoted separately."
  },
  "pq3": {
    "fromVnd": 699000,
    "approxPhp": 1655,
    "label": "Phu Quoc 3-island direct trial rate",
    "note": "Keeps the entry price close to OTA competition; pickup/lunch/operator configuration must be confirmed."
  },
  "pq4": {
    "fromVnd": 1490000,
    "approxPhp": 3528,
    "label": "4 islands + Hon Thom trial rate",
    "note": "Cable-car inclusion must be written into the booking; optional activities are extra unless stated."
  }
} as Record<string,PhilippinesPrice>,
  priceDisclaimer:"Philippines launch 'from' rates apply only to selected dates, group sizes and configurations. VND is the official booking price. PHP is an estimate for easier comparison. GoVietStay confirms the final price and inclusions before payment.",
  positioning:"Book your flight and hotel yourself. We handle the part that gets complicated once you arrive."
} as const;
