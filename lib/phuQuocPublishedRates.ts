export type PhuQuocPublishedRate = {
  adult: number;
  child: number;
  slug: string;
  name: string;
};

// John’s Tours published selling rates for travel agents, valid 2026–2027 tariff set.
// These are PUBLIC CUSTOMER SELLING PRICES. Do not add markup to join-in tours.
export const PHU_QUOC_PUBLISHED_RATES: Record<string, PhuQuocPublishedRate> = {
  "TRIP 2": { adult: 650000, child: 450000, slug: "trip-2-fishing-snorkeling", name: "South Island Fishing & Snorkeling" },
  "TRIP 3": { adult: 820000, child: 570000, slug: "trip-3-three-islands", name: "3 Islands by Boat" },
  "TRIP 4": { adult: 1600000, child: 1120000, slug: "trip-4-cable-car-three-islands", name: "3 Islands + Hon Thom Cable Car" },
  "OPTION 2": { adult: 430000, child: 300000, slug: "option-2-sunset-squid", name: "Sunset & Night Squid Fishing" },
  "CANO TRIP": { adult: 850000, child: 590000, slug: "cano-trip-speedboat", name: "South Islands by Speedboat" },
  "CABLE CAR TRIP": { adult: 1700000, child: 1190000, slug: "cable-car-four-islands", name: "4 Islands + Hon Thom Cable Car" },
  "BBQ TRIP": { adult: 1550000, child: 1050000, slug: "bbq-trip-sunset", name: "2 Islands + Snorkeling + Sunset BBQ" },
  "LUXURY TRIP": { adult: 1320000, child: 920000, slug: "luxury-trip-speedboat", name: "Luxury 3 Islands by Speedboat" },
  "ISLAND LIFE": { adult: 1700000, child: 1190000, slug: "island-life", name: "Discover Island Life" },
  "CAMPING": { adult: 1940000, child: 1360000, slug: "camping-2d1n", name: "May Rut Trong Camping 2D1N" },
  "LAND TOUR 1": { adult: 620000, child: 430000, slug: "land-tour-1-south", name: "South Phu Quoc — Top 8 Sightseeing" },
  "LAND TOUR 2": { adult: 990000, child: 690000, slug: "land-tour-2-north", name: "North Phu Quoc + Kayaking + Lunch" },
  "LAND TOUR 4": { adult: 1480000, child: 1250000, slug: "land-tour-4-cable-car-south", name: "Cable Car + South Phu Quoc" },
};
