export type ItalyPrice={
  vnd:number;
  eur:number;
  label:string;
  note:string;
};

export const italyMarketConfig={
  locale:"it-IT",
  whatsapp:"https://wa.me/84937762607",
  googleMaps:"https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic",
  fx:{
    eurPerVnd:3.28483e-05,
    label:"Cambio indicativo usato per la visualizzazione il 27/08/2026: 1.000.000 VND ≈ €32,85. Il prezzo ufficiale della prenotazione resta in VND."
  },
  prices:{
  "bana": {
    "vnd": 1550000,
    "eur": 50.9,
    "label": "Tour standard Bà Nà Hills",
    "note": "Prezzo standard/pubblico. Il tour privato viene quotato in base al gruppo, all'auto e alla guida richiesta."
  },
  "cham": {
    "vnd": 950000,
    "eur": 31.2,
    "label": "Tour standard Isole Cham",
    "note": "Prezzo standard/pubblico. Operatività soggetta alle condizioni del mare."
  },
  "hoian": {
    "vnd": 1250000,
    "eur": 41.1,
    "label": "Tour standard Hoi An + foresta di cocco",
    "note": "Prezzo standard/pubblico. Per una serata privata il prezzo dipende da auto, guida e durata."
  },
  "hue": {
    "vnd": 1450000,
    "eur": 47.6,
    "label": "Tour standard Hue",
    "note": "Prezzo standard/pubblico. L'opzione privata è consigliata a famiglie e coppie che vogliono più libertà."
  },
  "sontra": {
    "vnd": 850000,
    "eur": 27.9,
    "label": "Tour standard Son Tra + Marble Mountains",
    "note": "Prezzo standard/pubblico. Itinerario privato disponibile su richiesta."
  },
  "pq3": {
    "vnd": 1040000,
    "eur": 34.2,
    "label": "Tour standard 3 isole Phu Quoc",
    "note": "Prezzo standard/pubblico. Hotel pickup, barca e inclusioni vengono confermati prima del pagamento."
  },
  "pq4": {
    "vnd": 1690000,
    "eur": 55.5,
    "label": "Tour standard 4 isole + Hon Thom",
    "note": "Prezzo standard/pubblico. La funivia è inclusa solo se scritta nella conferma finale."
  }
} as Record<string,ItalyPrice>,
  standardPriceRule:"Il prezzo standard per il mercato italiano è lo stesso del tour pubblico/English GoVietStay. Nessun sovrapprezzo perché sei italiano.",
  guideRule:"Guida nella lingua richiesta — italiano o altra lingua — soggetta a disponibilità e conferma per la data.",
  privateRule:"Il privato è quotato sul gruppo: persone, veicolo, guida, durata, biglietti e richieste speciali.",
  priceDisclaimer:"EUR è solo una stima per facilitare il confronto. Il prezzo ufficiale è in VND. Prezzo finale, disponibilità e inclusioni vengono confermati prima del pagamento.",
  positioning:"Volo e hotel li scegli tu. In Vietnam hai un team locale quando serve davvero."
} as const;
