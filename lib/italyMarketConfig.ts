import {getTour} from "./tour-landing-data";
import {PHU_QUOC_PUBLISHED_RATES} from "./phuQuocPublishedRates";
const baNa=getTour("ba-na-hills","ru")!;
const cham=getTour("cham-island","ru")!;

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
    "vnd": baNa.adultPrice,
    "eur": 50.9,
    "label": "Tour standard Bà Nà Hills",
    "note": "Tariffa standard derivata dalla pagina russa GoVietStay; buffet, transfer, guida italiana e versione privata da confermare per data e pacchetto."
  },
  "cham": {
    "vnd": cham.adultPrice,
    "eur": 31.2,
    "label": "Tour standard Isole Cham",
    "note": "Tariffa standard derivata dalla pagina russa GoVietStay. Guida italiana e barca privata su richiesta; partenza soggetta al mare."
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
    "vnd": PHU_QUOC_PUBLISHED_RATES["TRIP 3"].adult,
    "eur": 34.2,
    "label": "John’s Tours: 3 isole in barca (TRIP 3)",
    "note": "Tariffa pubblicata per TRIP 3 di John’s Tours con guida in inglese. Non confondere con altri tour in motoscafo o pacchetti con drone; transfer e inclusioni da confermare."
  },
  "pq4": {
    "vnd": PHU_QUOC_PUBLISHED_RATES["CABLE CAR TRIP"].adult,
    "eur": 55.5,
    "label": "John’s Tours: 4 isole + Hon Thom (CABLE CAR TRIP)",
    "note": "Tariffa pubblicata per CABLE CAR TRIP di John’s Tours. Comprende la funivia secondo il programma confermato; condizioni bimbi, transfer e altri biglietti da verificare."
  }
} as Record<string,ItalyPrice>,
  standardPriceRule:"Le tariffe standard condivise sono le stesse per il pacchetto effettivamente indicato, senza maggiorazione in base alla lingua del cliente. La guida italiana e i tour privati si confermano e quotano separatamente.",
  guideRule:"Guida nella lingua richiesta — italiano o altra lingua — soggetta a disponibilità e conferma per la data.",
  privateRule:"Il privato è quotato sul gruppo: persone, veicolo, guida, durata, biglietti e richieste speciali.",
  priceDisclaimer:"Il prezzo esposto è in VND per il pacchetto identificato; gli altri prodotti restano indicativi finché riconfermati. La guida italiana non è inclusa automaticamente. Verifichiamo prezzo finale, tariffa bimbi, disponibilità e inclusioni prima del pagamento.",
  positioning:"Volo e hotel li scegli tu. In Vietnam hai un team locale quando serve davvero."
} as const;
