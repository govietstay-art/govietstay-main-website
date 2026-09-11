export const PHU_QUOC_SALES_COMMISSION_RATE = 0.07;

export type PhuQuocSalesTour = {
  code: string;
  slug: string;
  nameEn: string;
  nameRu: string;
  adultVnd: number | null;
  childVnd: number | null;
  quoteOnly?: boolean;
  category: "sea" | "land" | "private";
  partnerVisible: boolean;
  staffVisible: boolean;
};

export const PHU_QUOC_SALES_TOURS: PhuQuocSalesTour[] = [
  {
    code: "PQ-TRIP2",
    slug: "trip-2-fishing-snorkeling-south",
    nameEn: "TRIP 2 — Fishing & snorkeling south",
    nameRu: "TRIP 2 — Рыбалка и снорклинг на юге",
    adultVnd: 650000,
    childVnd: 450000,
    category: "sea",
    partnerVisible: true,
    staffVisible: true,
  },
  {
    code: "PQ-TRIP3",
    slug: "trip-3-3-islands-by-boat",
    nameEn: "TRIP 3 — 3 islands by boat",
    nameRu: "TRIP 3 — 3 острова на лодке",
    adultVnd: 820000,
    childVnd: 570000,
    category: "sea",
    partnerVisible: true,
    staffVisible: true,
  },
  {
    code: "PQ-TRIP4",
    slug: "trip-4-3-islands-hon-thom-cable-car",
    nameEn: "TRIP 4 — 3 islands + Hon Thom cable car",
    nameRu: "TRIP 4 — 3 острова + канатная дорога Хон Тхом",
    adultVnd: 1600000,
    childVnd: 1120000,
    category: "sea",
    partnerVisible: true,
    staffVisible: true,
  },
  {
    code: "PQ-OPTION2",
    slug: "option-2-sunset-squid-fishing",
    nameEn: "OPTION 2 — Sunset + night squid fishing",
    nameRu: "OPTION 2 — Закат + ночная ловля кальмаров",
    adultVnd: 430000,
    childVnd: 300000,
    category: "sea",
    partnerVisible: true,
    staffVisible: true,
  },
  {
    code: "PQ-CANO",
    slug: "cano-trip-south-islands-speedboat",
    nameEn: "CANO TRIP — South islands speedboat",
    nameRu: "CANO TRIP — Южные острова на скоростном катере",
    adultVnd: 850000,
    childVnd: 590000,
    category: "sea",
    partnerVisible: true,
    staffVisible: true,
  },
  {
    code: "PQ-CABLE",
    slug: "cable-car-trip-4-islands-hon-thom",
    nameEn: "CABLE CAR TRIP — 4 islands + Hon Thom cable car",
    nameRu: "CABLE CAR TRIP — 4 острова + канатная дорога Хон Тхом",
    adultVnd: 1700000,
    childVnd: 1190000,
    category: "sea",
    partnerVisible: true,
    staffVisible: true,
  },
  {
    code: "PQ-BBQ",
    slug: "bbq-trip-2-islands-sunset-bbq",
    nameEn: "BBQ TRIP — 2 islands + snorkeling + sunset BBQ",
    nameRu: "BBQ TRIP — 2 острова + снорклинг + BBQ на закате",
    adultVnd: 1550000,
    childVnd: 1050000,
    category: "sea",
    partnerVisible: true,
    staffVisible: true,
  },
  {
    code: "PQ-LUXURY",
    slug: "luxury-trip-3-islands-speedboat",
    nameEn: "LUXURY TRIP — Luxury 3 islands speedboat",
    nameRu: "LUXURY TRIP — Премиум 3 острова на скоростном катере",
    adultVnd: 1320000,
    childVnd: 920000,
    category: "sea",
    partnerVisible: true,
    staffVisible: true,
  },
  {
    code: "PQ-ISLAND-LIFE",
    slug: "island-life-day",
    nameEn: "ISLAND LIFE — Island life day",
    nameRu: "ISLAND LIFE — День островной жизни",
    adultVnd: 1700000,
    childVnd: 1190000,
    category: "sea",
    partnerVisible: true,
    staffVisible: true,
  },
  {
    code: "PQ-CAMPING",
    slug: "may-rut-trong-2d1n-camping",
    nameEn: "CAMPING — May Rut Trong 2D1N camping",
    nameRu: "CAMPING — Кемпинг Май Рут Чонг 2 дня / 1 ночь",
    adultVnd: 1940000,
    childVnd: 1360000,
    category: "sea",
    partnerVisible: true,
    staffVisible: true,
  },
  {
    code: "PQ-LAND1",
    slug: "land-tour-1-south-top-8",
    nameEn: "LAND TOUR 1 — South Phu Quoc Top 8",
    nameRu: "LAND TOUR 1 — Юг Фукуока: Top 8",
    adultVnd: 620000,
    childVnd: 430000,
    category: "land",
    partnerVisible: true,
    staffVisible: true,
  },
  {
    code: "PQ-LAND2",
    slug: "land-tour-2-north-kayak",
    nameEn: "LAND TOUR 2 — North Phu Quoc + kayak",
    nameRu: "LAND TOUR 2 — Север Фукуока + каяк",
    adultVnd: 990000,
    childVnd: 690000,
    category: "land",
    partnerVisible: true,
    staffVisible: true,
  },
  {
    code: "PQ-LAND4",
    slug: "land-tour-4-cable-car-south",
    nameEn: "LAND TOUR 4 — Cable car + south Phu Quoc",
    nameRu: "LAND TOUR 4 — Канатная дорога + юг Фукуока",
    adultVnd: 1480000,
    childVnd: 1250000,
    category: "land",
    partnerVisible: true,
    staffVisible: true,
  },

  {
    code: "PQ-PRIVATE2",
    slug: "private-trip-2-fishing-2-islands",
    nameEn: "PRIVATE TRIP 2 — Fishing + 2 islands",
    nameRu: "PRIVATE TRIP 2 — Рыбалка + 2 острова",
    adultVnd: null,
    childVnd: null,
    quoteOnly: true,
    category: "private",
    partnerVisible: true,
    staffVisible: true,
  },
  {
    code: "PQ-PRIVATE3",
    slug: "private-trip-3-3-islands",
    nameEn: "PRIVATE TRIP 3 — Private 3 islands",
    nameRu: "PRIVATE TRIP 3 — Индивидуально: 3 острова",
    adultVnd: null,
    childVnd: null,
    quoteOnly: true,
    category: "private",
    partnerVisible: true,
    staffVisible: true,
  },
  {
    code: "PQ-PRIVATE4",
    slug: "private-trip-4-3-islands-hon-thom",
    nameEn: "PRIVATE TRIP 4 — 3 islands + Hon Thom",
    nameRu: "PRIVATE TRIP 4 — Индивидуально: 3 острова + Хон Тхом",
    adultVnd: null,
    childVnd: null,
    quoteOnly: true,
    category: "private",
    partnerVisible: true,
    staffVisible: true,
  },
  {
    code: "PQ-PRIVATE-CUSTOM",
    slug: "private-custom-2d1n-3d2n",
    nameEn: "PRIVATE CUSTOM — 2D1N / 3D2N",
    nameRu: "PRIVATE CUSTOM — Индивидуальная программа 2D1N / 3D2N",
    adultVnd: null,
    childVnd: null,
    quoteOnly: true,
    category: "private",
    partnerVisible: true,
    staffVisible: true,
  },
];

export function phuQuocCommissionVnd(netSellingVnd: number) {
  return Math.round(Math.max(0, Number(netSellingVnd || 0)) * PHU_QUOC_SALES_COMMISSION_RATE);
}

export function phuQuocPartnerUrl(partnerCode: string, language: "ru" | "en" = "ru") {
  const code = String(partnerCode || "").trim().toUpperCase();
  const path = language === "ru" ? "/ru/tours/phu-quoc" : "/tours/phu-quoc";
  return `https://www.govietstay.com${path}${code ? `?ref=${encodeURIComponent(code)}` : ""}`;
}
