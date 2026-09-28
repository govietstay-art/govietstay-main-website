/** Use small existing destination-specific photos instead of a generic 2.5 MB image. */
export function englishGuideImage(slug: string): string {
 if (slug.includes("phu-quoc")) return "/tour/phuquoc/tour-05-1.jpg";
 if (slug.includes("cham-island")) return "/tour/cham.jpg";
 if (slug.includes("ba-na")) return "/tour/bana.jpg";
 if (slug.includes("hue")) return "/tour/hue.jpg";
 if (slug.includes("visa")) return "/brand/govietstay-official-logo.jpg";
 return "/tour/hoian.jpg";
}
