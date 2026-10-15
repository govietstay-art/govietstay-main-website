/**
 * GoVietStay publicly quoted prices, per person in USD (all-in).
 * Baseline competitor: evisavietnamexpress.com/fees.html, checked 2026-10-15.
 * Matched packages are priced at least 3% below the published benchmark,
 * rounded down to whole USD. For faster GoVietStay options, the nearest
 * SLOWER competitor package is only an indicative commercial benchmark.
 *
 * 4-day processing lacks a directly comparable competitor tier: retain
 * GoVietStay's previous publicly offered total for that option.
 * All expedited times are subject to individual confirmation and
 * official processing schedules. Approval is never guaranteed.
 */
export type VisaEntryType = "single" | "multiple";
export type VisaProcessingLocation = "HAN" | "SGN";
type Total = { single: number; multiple: number };

export const visaPublicPrices = {
  standard: { single: 47, multiple: 66 },
  HAN: {
    "4 days": { single: 61, multiple: 86 },
    "3 days": { single: 86, multiple: 115 },
    "2 days": { single: 96, multiple: 125 },
    "1 day": { single: 105, multiple: 134 },
    "4 hours": { single: 115, multiple: 144 },
    "2 hours": { single: 144, multiple: 173 },
    "1 hour": { single: 173, multiple: 202 },
  },
  SGN: {
    "4 days": { single: 65, multiple: 90 },
    "3 days": { single: 86, multiple: 115 },
    "2 days": { single: 96, multiple: 125 },
    "1 day": { single: 105, multiple: 134 },
    "4 hours": { single: 115, multiple: 144 },
  },
} as const;

export function getVisaPrice(
  entry: VisaEntryType,
  location: VisaProcessingLocation = "HAN",
  speed: string = "standard",
): number {
  if (speed === "standard") return visaPublicPrices.standard[entry];
  const rows = visaPublicPrices[location] as Record<string, Total>;
  const price = rows[speed];
  if (!price) throw new Error(`Unavailable visa processing speed: ${location} / ${speed}`);
  return price[entry];
}

export const urgentPrices = {
  HAN: (["1 hour", "2 hours", "4 hours", "1 day", "2 days", "3 days", "4 days"] as const)
    .map(label => ({ label, price: getVisaPrice("single", "HAN", label) - visaPublicPrices.standard.single })),
  SGN: (["4 hours", "1 day", "2 days", "3 days", "4 days"] as const)
    .map(label => ({ label, price: getVisaPrice("single", "SGN", label) - visaPublicPrices.standard.single })),
};

export const fastTrackPrices = { HAN: 18, DAD: 18, SGN: 22 } as const;
