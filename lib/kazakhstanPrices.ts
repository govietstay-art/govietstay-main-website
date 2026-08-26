export type KazakhstanPrice=({kind:"dual";standardAdult:string;standardChild:string;russianAdult:string;russianChild:string;note:string}|{kind:"simple";adult:string;child:string;note:string});
export const kazakhstanPrices:Record<string,KazakhstanPrice>={
  "bana": {
    "kind": "dual",
    "standardAdult": "от 1,550,000 VND (~$60)",
    "standardChild": "от 1,450,000 VND (~$56)",
    "russianAdult": "от 2,200,000 VND (~$85)",
    "russianChild": "от 2,000,000 VND (~$77)",
    "note": "Для 4+ гостей можно обсудить private."
  },
  "cham": {
    "kind": "dual",
    "standardAdult": "от 950,000 VND (~$37) / чел.",
    "standardChild": "уточняется",
    "russianAdult": "от 1,800,000 VND (~$69) / чел.",
    "russianChild": "от 1,500,000 VND (~$58) / чел.",
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
    "adult": "1 040 000 VND",
    "child": "По возрасту и росту",
    "note": "Sea Walking отдельно."
  },
  "pq-four-islands": {
    "kind": "simple",
    "adult": "1 690 000 VND",
    "child": "По возрасту и росту",
    "note": "Канатная дорога включена."
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
export const kazakhstanPriceNote="Цены зеркалируют текущую русскую версию GoVietStay. Основная валюта — VND; USD только ориентир. Финальная цена подтверждается перед бронированием.";
