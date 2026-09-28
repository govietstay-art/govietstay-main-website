import { PHU_QUOC_PUBLISHED_RATES } from "./phuQuocPublishedRates";
import { getTour } from "./tour-landing-data";

const fmt = (value: number) => `${new Intl.NumberFormat("ru-RU").format(value)} VND`;
const baNa = getTour("ba-na-hills", "ru")!;
const cham = getTour("cham-island", "ru")!;
export type KazakhstanPrice=({kind:"dual";standardAdult:string;standardChild:string;russianAdult:string;russianChild:string;note:string}|{kind:"simple";adult:string;child:string;note:string});
export const kazakhstanPrices:Record<string,KazakhstanPrice>={
  "bana": {
    "kind": "dual",
    "standardAdult": `от ${fmt(baNa.adultPrice)}`,
    "standardChild": `от ${fmt(baNa.childPrice)}`,
    "russianAdult": "По запросу",
    "russianChild": "По запросу",
    "note": "Для 4+ гостей можно обсудить private."
  },
  "cham": {
    "kind": "dual",
    "standardAdult": `от ${fmt(cham.adultPrice)} / чел.`,
    "standardChild": `от ${fmt(cham.childPrice)} / чел.`,
    "russianAdult": "По запросу",
    "russianChild": "По запросу",
    "note": "Море и private подтверждаются по дате."
  },
  "coconut": {
    "kind": "dual",
    "standardAdult": "от 1,250,000 VND (~$48)",
    "standardChild": "от 1,000,000 VND (~$38)",
    "russianAdult": "от 1,800,000 VND (~$69)",
    "russianChild": "от 1,600,000 VND (~$62)",
    "note": "Для 4+ гостей можно сделать private."
  },
  "memories": {
    "kind": "dual",
    "standardAdult": "от 2,400,000 VND (~$92)",
    "standardChild": "от 1,900,000 VND (~$73)",
    "russianAdult": "от 3,000,000 VND (~$115)",
    "russianChild": "от 2,800,000 VND (~$108)",
    "note": "Private-трансфер доступен по запросу."
  },
  "hue": {
    "kind": "dual",
    "standardAdult": "от 1,450,000 VND (~$56)",
    "standardChild": "от 1,250,000 VND (~$48)",
    "russianAdult": "от 1,950,000 VND (~$75)",
    "russianChild": "от 1,750,000 VND (~$67)",
    "note": "Private удобен для семьи."
  },
  "marble": {
    "kind": "dual",
    "standardAdult": "от 850,000 VND (~$33)",
    "standardChild": "от 650,000 VND (~$25)",
    "russianAdult": "от 1,350,000 VND (~$52)",
    "russianChild": "от 1,150,000 VND (~$44)",
    "note": "Гибкие остановки в private."
  },
  "pq-island-discovery": {
    "kind": "simple",
    "adult": "520 000 VND",
    "child": "260 000 VND",
    "note": "Ориентир 20/10 USD."
  },
  "pq-north-snorkeling": {
    "kind": "simple",
    "adult": "1 300 000 VND",
    "child": "910 000 VND",
    "note": "Русский гид отдельно."
  },
  "pq-north-sunset": {
    "kind": "simple",
    "adult": "650 000 VND",
    "child": "390 000 VND",
    "note": "Закат зависит от погоды."
  },
  "pq-squid-fishing": {
    "kind": "simple",
    "adult": "1 040 000 VND",
    "child": "650 000 VND",
    "note": "Улов не гарантируется."
  },
  "pq-three-islands": {
    "kind": "simple",
    "adult": fmt(PHU_QUOC_PUBLISHED_RATES["TRIP 3"].adult),
    "child": fmt(PHU_QUOC_PUBLISHED_RATES["TRIP 3"].child),
    "note": "John’s Tours TRIP 3: 3 острова на лодке, английский гид. Дрон и русский гид не входят в подтверждённый пакет."
  },
  "pq-four-islands": {
    "kind": "simple",
    "adult": fmt(PHU_QUOC_PUBLISHED_RATES["CABLE CAR TRIP"].adult),
    "child": fmt(PHU_QUOC_PUBLISHED_RATES["CABLE CAR TRIP"].child),
    "note": "John’s Tours CABLE CAR TRIP: 4 острова + Хон Тхом. Детский тариф и состав билетов подтверждаем по возрасту/росту."
  },
  "pq-hon-thom-kiss": {
    "kind": "simple",
    "adult": "2 470 000 VND",
    "child": "2 080 000 VND",
    "note": "Ужин отдельно; шоу по дате."
  },
  "pq-private-sailing": {
    "kind": "simple",
    "adult": "3 250 000 VND",
    "child": "Уточняется",
    "note": "Русский гид отдельно."
  },
  "pq-nemo-yacht": {
    "kind": "simple",
    "adult": "2 340 000 VND",
    "child": "Уточняется",
    "note": "Детский тариф по дате."
  }
};
export const kazakhstanPriceNote="Основная валюта — VND. Проверенные тарифы на Бана Хиллс, Чам и указанные пакеты Johns Tours берутся напрямую из соответствующих тарифов сайта; остальные предложения — предварительные ориентиры до сверки с поставщиком. Русскоговорящий гид оплачивается отдельно, если иное не указано. Детские условия, комплект билетов, трансфер и полную стоимость подтверждаем письменно до оплаты.";
