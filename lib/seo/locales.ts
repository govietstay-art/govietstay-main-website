/** Shared server and client locale mapping. */
export const HTML_LOCALE_BY_PREFIX:Record<string,string>={
 go:"ru",ru:"ru",kz:"ru-KZ",be:"be-BY",pl:"pl-PL",fi:"fi-FI",ja:"ja-JP",it:"it",vi:"vi",cn:"zh-CN",tw:"zh-TW",
 th:"th-TH",ko:"ko-KR",fr:"fr-FR",de:"de-DE",il:"he-IL",ar:"ar",
 tr:"tr-TR",ph:"en-PH",in:"en-IN",id:"id-ID",my:"ms-MY",mn:"mn",en:"en",
};
export function getPageLocale(pathname:string):string {
 const prefix=pathname.split("/").filter(Boolean)[0]?.toLowerCase()??"";
 return HTML_LOCALE_BY_PREFIX[prefix]??"en";
}
export function isKnownLocale(locale:string|null):boolean {
 return !!locale&&(locale==="en"||Object.values(HTML_LOCALE_BY_PREFIX).includes(locale));
}
export function isRtlLocale(locale:string):boolean {
 return locale==="ar"||locale==="he-IL";
}
