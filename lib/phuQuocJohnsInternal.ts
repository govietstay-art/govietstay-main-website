// SERVER-SIDE / INTERNAL ONLY. Never import this module into a client component.
// John’s Tours net rates and agency commission structure for join-in tours.
export const JOHNS_NET_RATES: Record<string, { adult: number; child: number }> = {
  "TRIP 2": { adult: 550000, child: 400000 },
  "TRIP 3": { adult: 670000, child: 495000 },
  "TRIP 4": { adult: 1450000, child: 1045000 },
  "OPTION 2": { adult: 310000, child: 240000 },
  "CANO TRIP": { adult: 700000, child: 515000 },
  "CABLE CAR TRIP": { adult: 1550000, child: 1115000 },
  "BBQ TRIP": { adult: 1350000, child: 950000 },
  "LUXURY TRIP": { adult: 1120000, child: 820000 },
  "ISLAND LIFE": { adult: 1500000, child: 1090000 },
  "CAMPING": { adult: 1740000, child: 1260000 },
  "LAND TOUR 1": { adult: 520000, child: 380000 },
  "LAND TOUR 2": { adult: 890000, child: 640000 },
  "LAND TOUR 4": { adult: 1380000, child: 1200000 },
};

export function johnsInternalForBooking(code: string, adults: number, children: number, sellingTotal: number) {
  const row = JOHNS_NET_RATES[code];
  if (!row) return { supplierNet: 0, commission: 0 };
  const supplierNet = row.adult * adults + row.child * children;
  return { supplierNet, commission: Math.max(0, sellingTotal - supplierNet) };
}
