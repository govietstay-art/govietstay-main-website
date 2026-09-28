/** Curated only when BOTH pages answer the same user intent. Never infer a translation from URL similarity. */
export const VERIFIED_GERMAN_PAIRS: Readonly<Record<string,string>> = {
  "/de/da-nang": "/travel/da-nang-travel-guide",
  "/de/phu-quoc/beste-reisezeit": "/travel/best-time-to-visit-phu-quoc",
  "/de/phu-quoc/3-oder-4-inseln": "/travel/phu-quoc-3-islands-vs-4-islands",
  "/de/phu-quoc/mit-kindern": "/travel/phu-quoc-with-family",
  "/de/phu-quoc/wo-uebernachten": "/travel/where-to-stay-phu-quoc"
};
export function getGermanForEnglish(englishPath:string):string|undefined {
  return Object.entries(VERIFIED_GERMAN_PAIRS).find(([,en])=>en===englishPath)?.[0];
}
export function getEnglishForGerman(germanPath:string):string|undefined {
  return VERIFIED_GERMAN_PAIRS[germanPath];
}
