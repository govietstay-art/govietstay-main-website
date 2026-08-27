export type ItalySeoPage = {
  slug:string;
  type:"product"|"private"|"transfer"|"guide";
  destination:string;
  priceKey:string|null;
  title:string;
  h1:string;
  desc:string;
  wiifm:string;
  bullets:string[];
  faqs:[string,string][];
  officialUrl?:string|null;
  updated:string;
};

export const italySeoPages:ItalySeoPage[] = [
  {
    "slug": "vietnam-senza-visto-45-giorni",
    "type": "guide",
    "destination": "Italia → Vietnam",
    "priceKey": null,
    "title": "Vietnam senza visto per italiani 2026 | 45 giorni | GoVietStay",
    "h1": "Vietnam senza visto per italiani: fino a 45 giorni per viaggiare con più libertà",
    "desc": "Per il passaporto italiano ordinario, la politica attuale prevede l'esenzione dal visto fino a 45 giorni. È un vantaggio enorme per chi vuole costruire il viaggio con calma, senza un pacchetto organizzato.",
    "wiifm": "Meno burocrazia prima della partenza, più libertà per decidere cosa fare una volta arrivati.",
    "bullets": [
      "Controlla sempre la regola ufficiale prima del volo.",
      "Per soggiorni più lunghi serve verificare la soluzione di visto appropriata.",
      "La regola del visto non sostituisce gli altri requisiti di ingresso."
    ],
    "faqs": [
      [
        "Gli italiani hanno bisogno del visto per 2 settimane in Vietnam?",
        "Con la politica attuale, un passaporto italiano ordinario può entrare senza visto fino a 45 giorni, rispettando le condizioni d'ingresso."
      ],
      [
        "La regola vale anche per Da Nang e Hoi An?",
        "Sì, l'esenzione riguarda l'ingresso in Vietnam secondo la politica in vigore."
      ],
      [
        "Posso restare più di 45 giorni senza visto?",
        "No. Per un soggiorno più lungo occorre verificare la soluzione di visto corretta prima del viaggio."
      ],
      [
        "Dove controllo la regola?",
        "Sul sito ufficiale del Ministero degli Affari Esteri vietnamita o dell'ambasciata vietnamita."
      ]
    ],
    "officialUrl": "https://vnembassy-roma.mofa.gov.vn/vi/web/guest/tin-chi-tiet/chi-tiet/viet-nam-39-s-visa-exemption-list-57163-172.html",
    "updated": "2026-08-27"
  },
  {
    "slug": "viaggio-vietnam-fai-da-te",
    "type": "guide",
    "destination": "Vietnam",
    "priceKey": null,
    "title": "Vietnam fai da te 2026 | Da Nang, Hoi An, Hue e Phu Quoc | GoVietStay",
    "h1": "Vietnam fai da te: prenota da solo ciò che è semplice, usa un team locale quando serve davvero",
    "desc": "Volo e hotel puoi comprarli dove preferisci. GoVietStay entra in gioco dopo l'arrivo: transfer, auto privata, escursioni, guida nella lingua richiesta e cambi dell'ultimo minuto.",
    "wiifm": "Paghi solo il supporto locale che ti serve, senza comprare un pacchetto completo che non vuoi.",
    "bullets": [
      "Costruisci il viaggio intorno ai tuoi ritmi, non intorno a un pullman.",
      "Usa tour standard solo quando conviene davvero.",
      "Per famiglia, coppia o piccoli gruppi, il privato può valere molto più della differenza di prezzo."
    ],
    "faqs": [
      [
        "GoVietStay vende anche voli dall'Italia?",
        "Il focus è sul servizio locale in Vietnam, non sul pacchetto volo+hotel dall'Italia."
      ],
      [
        "Posso prenotare solo un transfer?",
        "Sì."
      ],
      [
        "Posso chiedere una guida in italiano?",
        "Sì, la lingua richiesta viene verificata in base a data e disponibilità."
      ],
      [
        "Devo pagare subito?",
        "No: prima vengono confermati prezzo, inclusioni e disponibilità."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "da-nang-fai-da-te",
    "type": "guide",
    "destination": "Da Nang",
    "priceKey": null,
    "title": "Da Nang fai da te 2026 | Guida completa per italiani | GoVietStay",
    "h1": "Da Nang fai da te: una base comoda per mare, Hoi An, Bà Nà Hills e Hue",
    "desc": "Da Nang funziona bene per chi non vuole cambiare hotel ogni due giorni. Resti vicino al mare e scegli giorno per giorno quanto muoverti.",
    "wiifm": "Una sola base, meno valigie, più tempo per vivere davvero il Vietnam centrale.",
    "bullets": [
      "My Khe è comoda per chi vuole mare e resort.",
      "Hoi An è più bella dal tardo pomeriggio alla sera.",
      "Bà Nà Hills e Hue meritano giornate separate se non vuoi correre."
    ],
    "faqs": [
      [
        "Quanti giorni servono a Da Nang?",
        "Per un primo viaggio, 4–5 giorni sono molto comodi."
      ],
      [
        "È meglio dormire a Da Nang o Hoi An?",
        "Dipende dal ritmo: Da Nang è pratica come base, Hoi An è più romantica la sera."
      ],
      [
        "Serve un'auto privata?",
        "Non sempre, ma è molto utile per famiglia, bagagli e giornate fuori città."
      ],
      [
        "Posso organizzare tutto via WhatsApp?",
        "Sì."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "quanti-giorni-a-da-nang",
    "type": "guide",
    "destination": "Da Nang",
    "priceKey": null,
    "title": "Quanti giorni a Da Nang? 3, 4 o 5 giorni | GoVietStay",
    "h1": "Quanti giorni a Da Nang? Il numero giusto dipende da quanto vuoi correre",
    "desc": "Tre giorni bastano per vedere gli highlights. Quattro o cinque giorni permettono di aggiungere Hoi An, Bà Nà Hills e tempo libero senza trasformare la vacanza in una lista.",
    "wiifm": "Scegli una durata che lasci spazio anche alle cose che scoprirai sul posto.",
    "bullets": [
      "3 giorni: essenziale e veloce.",
      "4 giorni: equilibrio molto buono.",
      "5 giorni: più facile aggiungere mare, Hue o una giornata flessibile."
    ],
    "faqs": [
      [
        "3 giorni sono troppo pochi?",
        "Non necessariamente, ma devi scegliere bene le priorità."
      ],
      [
        "Con 4 giorni posso vedere Hoi An e Bà Nà Hills?",
        "Sì, dedicando una giornata a ciascuna esperienza."
      ],
      [
        "Con 5 giorni vale la pena Hue?",
        "Sì, soprattutto se ti interessa la storia."
      ],
      [
        "Meglio avere un giorno vuoto?",
        "Spesso sì: meteo e stanchezza cambiano i programmi."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "itinerario-da-nang-4-giorni",
    "type": "guide",
    "destination": "Da Nang · Hoi An",
    "priceKey": null,
    "title": "Itinerario Da Nang 4 giorni 2026 | Hoi An + Bà Nà Hills | GoVietStay",
    "h1": "Da Nang in 4 giorni: vedere molto senza sacrificare il ritmo",
    "desc": "Arrivo leggero, una giornata Bà Nà Hills, un pomeriggio-sera a Hoi An e una giornata flessibile per mare, città o tour privato.",
    "wiifm": "Un itinerario che protegge il tempo della vacanza invece di riempirlo a forza.",
    "bullets": [
      "Non mettere Bà Nà Hills il giorno dell'arrivo.",
      "Hoi An rende meglio nel pomeriggio e la sera.",
      "Tieni l'ultimo giorno flessibile in base al volo."
    ],
    "faqs": [
      [
        "Posso aggiungere Hue?",
        "Sì, ma il viaggio diventa più intenso."
      ],
      [
        "Bà Nà Hills e Hoi An nello stesso giorno?",
        "Possibile, ma poco consigliato se cerchi una vacanza rilassata."
      ],
      [
        "Posso trasformare un giorno in tour privato?",
        "Sì."
      ],
      [
        "L'itinerario è adatto ai bambini?",
        "Sì, con ritmi e orari adattati."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "ba-na-hills-ponte-dorato",
    "type": "product",
    "destination": "Da Nang",
    "priceKey": "bana",
    "title": "Bà Nà Hills e Ponte Dorato 2026 | Tour standard o privato | GoVietStay",
    "h1": "Bà Nà Hills e Ponte Dorato: standard se vuoi risparmiare, privato se vuoi controllare il tempo",
    "desc": "Il prezzo standard resta uguale al tour English di GoVietStay. Il vero upgrade è il privato: orario più flessibile, meno attese e una giornata costruita sul tuo gruppo.",
    "wiifm": "Non paghi di più perché sei italiano; paghi di più solo se scegli più libertà.",
    "bullets": [
      "Prezzo standard: identico al prodotto English/pubblico.",
      "Tour privato quotato per gruppo e configurazione.",
      "Guida nella lingua richiesta disponibile su conferma, in base alla data."
    ],
    "faqs": [
      [
        "Il prezzo italiano è più alto del tour English?",
        "No. Il prezzo standard pubblicato è lo stesso."
      ],
      [
        "La guida italiana è inclusa?",
        "Solo se confermata; la lingua della guida viene verificata in base alla disponibilità."
      ],
      [
        "Posso partire più tardi?",
        "Con un setup privato c'è più flessibilità, sempre rispettando gli orari del parco."
      ],
      [
        "Il buffet è incluso?",
        "Solo se scritto nella conferma finale."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "hoi-an-in-un-giorno",
    "type": "guide",
    "destination": "Hoi An",
    "priceKey": null,
    "title": "Hoi An in un giorno 2026 | Da Nang → Hoi An senza fretta | GoVietStay",
    "h1": "Hoi An in un giorno: non arrivare troppo presto, resta abbastanza per vedere le lanterne",
    "desc": "Una giornata ben fatta parte dopo pranzo, può includere la foresta di cocco e arriva nella città antica quando la luce diventa più bella.",
    "wiifm": "Meno caldo, più atmosfera, più tempo utile proprio quando Hoi An dà il meglio.",
    "bullets": [
      "Pomeriggio: foresta di cocco se ti interessa.",
      "Tardo pomeriggio: centro storico.",
      "Sera: lanterne, cena e passeggiata senza fretta."
    ],
    "faqs": [
      [
        "Vale la pena dormire a Hoi An?",
        "Sì se vuoi più tempo serale; per un viaggio breve anche un'escursione da Da Nang funziona bene."
      ],
      [
        "Serve una guida?",
        "Dipende da quanto ti interessa la storia; può essere utile ma non obbligatoria."
      ],
      [
        "Si può fare in auto privata?",
        "Sì."
      ],
      [
        "La barca con le lanterne è obbligatoria?",
        "No."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "tour-privato-hoi-an",
    "type": "private",
    "destination": "Hoi An",
    "priceKey": null,
    "title": "Tour privato Hoi An 2026 | Coppie e famiglie | GoVietStay",
    "h1": "Hoi An privata: il vero lusso è non guardare l'orologio del gruppo",
    "desc": "Auto privata, guida nella lingua richiesta se disponibile, soste scelte dal tuo gruppo e libertà di mangiare dove preferisci.",
    "wiifm": "Resti di più dove ti piace e salti ciò che non ti interessa.",
    "bullets": [
      "Nessun estraneo nel componente privato confermato.",
      "Orari e soste più flessibili.",
      "La guida può essere richiesta in italiano o altra lingua, soggetta a disponibilità."
    ],
    "faqs": [
      [
        "Il tour è solo per noi?",
        "Sì, per le componenti confermate come private."
      ],
      [
        "Posso saltare la foresta di cocco?",
        "Sì."
      ],
      [
        "Posso scegliere il ristorante?",
        "Sì, nel limite dell'itinerario e del tempo concordato."
      ],
      [
        "Quanto costa?",
        "Il privato viene quotato in base a numero di persone, auto, guida e durata."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "foresta-di-cocco-hoi-an",
    "type": "product",
    "destination": "Hoi An",
    "priceKey": "hoian",
    "title": "Hoi An + foresta di cocco 2026 | Tour standard o privato | GoVietStay",
    "h1": "Foresta di cocco + Hoi An: un pomeriggio che migliora man mano che arriva la sera",
    "desc": "Il tour standard mantiene il prezzo pubblico English. Se vuoi più tempo in città antica o viaggi con famiglia, il privato è l'opzione più comoda.",
    "wiifm": "Un'unica giornata con natura, foto, città antica e lanterne senza partire all'alba.",
    "bullets": [
      "Il giro in basket boat può essere tranquillo: non devi fare la rotazione spettacolare.",
      "Prezzo standard uguale al prodotto English.",
      "Privato disponibile per coppie, famiglie e piccoli gruppi."
    ],
    "faqs": [
      [
        "Devo fare il giro veloce con la barca?",
        "No, puoi chiedere una navigazione normale."
      ],
      [
        "La cena è inclusa?",
        "Solo se specificata nella conferma."
      ],
      [
        "La guida può parlare italiano?",
        "Può essere richiesta e confermata in base alla disponibilità."
      ],
      [
        "Quanto dura?",
        "Dipende dalla versione standard o privata."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "isole-cham-snorkeling",
    "type": "product",
    "destination": "Da Nang · Hoi An",
    "priceKey": "cham",
    "title": "Isole Cham e snorkeling 2026 | Da Nang/Hoi An | GoVietStay",
    "h1": "Isole Cham: una giornata di mare vera, ma il mare decide se si parte",
    "desc": "Motoscafo, snorkeling e pranzo: il prezzo standard resta quello del tour English. Per gruppi o famiglie si può verificare una soluzione privata.",
    "wiifm": "Sai prima quando il mare non è adatto, invece di scoprire problemi all'ultimo minuto.",
    "bullets": [
      "Operatività legata alle condizioni reali del mare.",
      "Età dei bambini da comunicare prima della prenotazione.",
      "Opzioni private su richiesta."
    ],
    "faqs": [
      [
        "Se piove il tour viene cancellato?",
        "Non automaticamente: contano soprattutto mare e decisioni operative/sicurezza."
      ],
      [
        "Adatto a bambini piccoli?",
        "Va valutato in base a età, salute e condizioni del mare."
      ],
      [
        "Il prezzo standard è uguale all'English tour?",
        "Sì."
      ],
      [
        "Posso partire da Hoi An?",
        "Il pickup dipende dalla posizione dell'hotel."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "hue-da-da-nang",
    "type": "product",
    "destination": "Hue",
    "priceKey": "hue",
    "title": "Hue da Da Nang 2026 | Tour standard o privato | GoVietStay",
    "h1": "Hue da Da Nang: se la storia ti interessa davvero, vale una giornata intera",
    "desc": "Il prezzo standard è uguale al tour English. Il privato ha più senso per coppie, famiglie e viaggiatori che vogliono meno fermate inutili.",
    "wiifm": "Più tempo nei luoghi che ti interessano, meno energie spese per seguire il ritmo di altri.",
    "bullets": [
      "È una giornata più lunga di Hoi An.",
      "Famiglie e senior beneficiano molto dell'auto privata.",
      "Guida nella lingua richiesta soggetta a disponibilità."
    ],
    "faqs": [
      [
        "È una giornata molto lunga?",
        "Sì, è una vera escursione full-day."
      ],
      [
        "Posso prenotare solo auto privata?",
        "Sì."
      ],
      [
        "Il prezzo standard è lo stesso dell'English tour?",
        "Sì."
      ],
      [
        "Posso chiedere guida italiana?",
        "Sì, soggetta a disponibilità e conferma."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "my-son-da-hoi-an",
    "type": "guide",
    "destination": "Hoi An · My Son",
    "priceKey": null,
    "title": "My Son da Hoi An 2026 | Tempio Cham e tour privato | GoVietStay",
    "h1": "My Son: se vuoi capire un po' di Vietnam, non solo fotografarlo",
    "desc": "Un sito Cham UNESCO che funziona bene come mezza giornata o come parte di un itinerario privato da Hoi An.",
    "wiifm": "Una visita culturale con abbastanza contesto per ricordare qualcosa oltre alle foto.",
    "bullets": [
      "Meglio con guida se vuoi comprendere la storia.",
      "Mattina più fresca nelle giornate calde.",
      "Facile da integrare in un tour privato."
    ],
    "faqs": [
      [
        "Serve una guida?",
        "Non è obbligatoria, ma rende molto più interessante il sito."
      ],
      [
        "Posso combinare My Son e Hoi An?",
        "Sì, soprattutto con un itinerario privato ben organizzato."
      ],
      [
        "È adatto ai bambini?",
        "Dipende da età, caldo e interesse."
      ],
      [
        "Posso chiedere guida in italiano?",
        "Sì, da verificare per la data."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "transfer-aeroporto-da-nang",
    "type": "transfer",
    "destination": "Da Nang",
    "priceKey": null,
    "title": "Transfer aeroporto Da Nang 2026 | Auto privata | GoVietStay",
    "h1": "Aeroporto di Da Nang → hotel: la parte più semplice del viaggio deve restare semplice",
    "desc": "Invia numero del volo, hotel, persone e bagagli. GoVietStay sceglie il veicolo adatto e conferma il prezzo prima dell'arrivo.",
    "wiifm": "Niente contrattazioni appena atterrato e niente auto troppo piccola per le valigie.",
    "bullets": [
      "Veicolo privato per la prenotazione confermata.",
      "Prezzo per tratta/veicolo in base alla destinazione.",
      "Supporto WhatsApp se volo o incontro cambiano."
    ],
    "faqs": [
      [
        "Posso andare direttamente a Hoi An?",
        "Sì."
      ],
      [
        "L'autista parla italiano?",
        "Non è garantito; il supporto e l'eventuale guida si gestiscono separatamente."
      ],
      [
        "Cosa succede se il volo è in ritardo?",
        "Comunica il numero del volo e resta raggiungibile."
      ],
      [
        "Quando pago?",
        "Le condizioni vengono confermate nella prenotazione."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "auto-privata-da-nang-hoi-an",
    "type": "private",
    "destination": "Da Nang · Hoi An",
    "priceKey": null,
    "title": "Auto privata Da Nang Hoi An 2026 | GoVietStay",
    "h1": "Auto privata Da Nang–Hoi An: compra tempo, non lusso",
    "desc": "Per coppie, famiglie e piccoli gruppi, un'auto privata significa partire quando vuoi, fermarti dove serve e non aspettare passeggeri sconosciuti.",
    "wiifm": "Più tempo utile nel posto che sei venuto a vedere.",
    "bullets": [
      "Quotazione per veicolo/tragitto.",
      "Fermate extra concordate prima.",
      "Guida nella lingua richiesta separata dall'autista, se necessaria."
    ],
    "faqs": [
      [
        "Il prezzo è per persona?",
        "Normalmente il trasferimento/auto privata viene quotato per veicolo e percorso."
      ],
      [
        "Posso fermarmi a Marble Mountains?",
        "Sì, se concordato nel percorso."
      ],
      [
        "L'autista fa anche da guida?",
        "Non automaticamente."
      ],
      [
        "Posso prenotare un van?",
        "Sì, in base a persone e bagagli."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "tour-privato-da-nang",
    "type": "private",
    "destination": "Da Nang · Hoi An · Hue",
    "priceKey": null,
    "title": "Tour privato Da Nang 2026 | Su misura per coppie e famiglie | GoVietStay",
    "h1": "Tour privato a Da Nang: non paghi per vedere più cose, paghi per decidere come vederle",
    "desc": "Scegli il ritmo, le soste, la lingua della guida e ciò che vuoi evitare. GoVietStay costruisce il giorno intorno al tuo gruppo.",
    "wiifm": "Niente attese per estranei, niente shopping inutile, più controllo sul tempo della tua vacanza.",
    "bullets": [
      "Itinerario costruito sul gruppo.",
      "Guida in italiano o altra lingua su richiesta e disponibilità.",
      "Auto, guida, biglietti e pasti vengono confermati chiaramente."
    ],
    "faqs": [
      [
        "Posso scegliere l'orario di partenza?",
        "Nel privato c'è maggiore flessibilità, rispettando gli orari dei luoghi visitati."
      ],
      [
        "Posso eliminare tappe commerciali?",
        "Sì, basta concordarlo."
      ],
      [
        "Posso chiedere guida italiana?",
        "Sì, da verificare sulla data."
      ],
      [
        "Come viene calcolato il prezzo?",
        "In base a gruppo, veicolo, guida, biglietti e durata."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "vietnam-con-bambini",
    "type": "guide",
    "destination": "Vietnam centrale",
    "priceKey": null,
    "title": "Vietnam con bambini 2026 | Da Nang, Hoi An e Phu Quoc | GoVietStay",
    "h1": "Vietnam con bambini: meno tappe, più margine per sonno, caldo e cambi di programma",
    "desc": "Il viaggio di famiglia funziona meglio quando non provi a trasformare ogni giorno in un'escursione completa.",
    "wiifm": "Genitori meno stressati e bambini con ancora energia per godersi davvero il viaggio.",
    "bullets": [
      "Un'attività principale al giorno è spesso sufficiente.",
      "Il privato protegge sonnellini, pasti e orari.",
      "Mare e motoscafo vanno valutati in base all'età."
    ],
    "faqs": [
      [
        "Da Nang è adatta ai bambini?",
        "Sì, soprattutto alternando spiaggia, Hoi An e attività selezionate."
      ],
      [
        "Phu Quoc è più facile con bambini?",
        "Può esserlo per resort, Safari e VinWonders."
      ],
      [
        "Serve un tour privato?",
        "Non sempre, ma per famiglie spesso migliora molto il comfort."
      ],
      [
        "Potete fornire seggiolino?",
        "Va richiesto e confermato in anticipo."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "vietnam-in-coppia",
    "type": "guide",
    "destination": "Da Nang · Hoi An · Phu Quoc",
    "priceKey": null,
    "title": "Vietnam in coppia 2026 | Da Nang, Hoi An o Phu Quoc | GoVietStay",
    "h1": "Vietnam in coppia: non riempire ogni ora — scegli i momenti giusti",
    "desc": "Hoi An al tramonto, mattine lente al mare, una giornata importante a Bà Nà Hills e qualche spostamento privato quando fa davvero la differenza.",
    "wiifm": "Più tempo insieme, meno tempo a seguire il ritmo di un gruppo.",
    "bullets": [
      "Hoi An è il momento serale più forte del Vietnam centrale.",
      "Phu Quoc è ideale se il resort conta quanto le escursioni.",
      "Privato utile nei giorni romantici o fotografici, non necessariamente tutti i giorni."
    ],
    "faqs": [
      [
        "Da Nang o Phu Quoc per una coppia?",
        "Da Nang offre più varietà culturale; Phu Quoc è più resort/isola."
      ],
      [
        "Serve un tour privato ogni giorno?",
        "No."
      ],
      [
        "Hoi An vale una notte?",
        "Sì, ma anche una buona serata da Da Nang funziona molto bene."
      ],
      [
        "Potete organizzare una giornata su misura?",
        "Sì."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "vietnam-centrale-fai-da-te",
    "type": "guide",
    "destination": "Vietnam centrale",
    "priceKey": null,
    "title": "Vietnam centrale fai da te 2026 | Da Nang, Hoi An, Hue | GoVietStay",
    "h1": "Vietnam centrale fai da te: una regione perfetta per viaggiare senza un tour di gruppo",
    "desc": "Le distanze permettono di usare Da Nang o Hoi An come base e aggiungere giornate private solo quando conviene.",
    "wiifm": "Più autenticità senza rinunciare alla comodità nei trasferimenti difficili.",
    "bullets": [
      "Da Nang è la base pratica.",
      "Hoi An è la base più atmosferica.",
      "Hue richiede più strada e beneficia di un'auto privata."
    ],
    "faqs": [
      [
        "Serve cambiare hotel tra Da Nang e Hoi An?",
        "Non necessariamente."
      ],
      [
        "Posso fare tutto con Grab?",
        "Per città e brevi tragitti sì; per giornate lunghe il privato è più pratico."
      ],
      [
        "Quanto tempo dedicare alla regione?",
        "5–7 giorni permettono un ritmo molto buono."
      ],
      [
        "Posso chiedere solo supporto locale senza tour?",
        "Sì."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "itinerario-vietnam-centrale",
    "type": "guide",
    "destination": "Vietnam centrale",
    "priceKey": null,
    "title": "Itinerario Vietnam centrale 7 giorni 2026 | Da Nang, Hoi An, Hue | GoVietStay",
    "h1": "Vietnam centrale in 7 giorni: abbastanza tempo per vedere molto e non vivere in macchina",
    "desc": "Un itinerario equilibrato può combinare Da Nang, Hoi An, Bà Nà Hills, Hue e una giornata libera o di mare.",
    "wiifm": "Un viaggio completo con spazio per recuperare energie e cambiare idea.",
    "bullets": [
      "Prime notti a Da Nang o Hoi An.",
      "Una giornata lunga per Hue.",
      "Almeno una giornata flessibile."
    ],
    "faqs": [
      [
        "7 giorni sono troppi?",
        "No, se vuoi anche tempo libero."
      ],
      [
        "Meglio dormire a Hue?",
        "Dipende dal viaggio complessivo; per una sola visita si può fare day trip."
      ],
      [
        "Posso aggiungere Phu Quoc?",
        "Sì, ma richiede un volo interno e più giorni."
      ],
      [
        "Potete organizzare solo alcuni giorni privati?",
        "Sì."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "miglior-periodo-da-nang",
    "type": "guide",
    "destination": "Da Nang",
    "priceKey": null,
    "title": "Miglior periodo per Da Nang 2026 | Meteo e mare | GoVietStay",
    "h1": "Quando andare a Da Nang? La risposta cambia se vuoi mare, foto o escursioni",
    "desc": "Non esiste un mese perfetto per tutti. Il mare, il caldo e la pioggia cambiano il valore di Cham Island, Bà Nà Hills e giornate all'aperto.",
    "wiifm": "Scegli il periodo in base a ciò che vuoi fare, non in base a una tabella generica.",
    "bullets": [
      "Il mare conta molto per Isole Cham.",
      "Bà Nà Hills può avere meteo diverso dalla costa.",
      "Tieni una giornata flessibile se il mare è una priorità."
    ],
    "faqs": [
      [
        "La pioggia rovina sempre il viaggio?",
        "No, ma può cambiare le attività migliori."
      ],
      [
        "Cham Island parte tutto l'anno?",
        "No, l'operatività dipende anche dalle condizioni del mare."
      ],
      [
        "Bà Nà Hills con pioggia?",
        "È possibile, ma visibilità ed esperienza possono cambiare."
      ],
      [
        "Potete aiutare a spostare un tour?",
        "Quando disponibilità e condizioni lo permettono, sì."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "cosa-mangiare-a-da-nang",
    "type": "guide",
    "destination": "Da Nang",
    "priceKey": null,
    "title": "Cosa mangiare a Da Nang 2026 | Guida per italiani | GoVietStay",
    "h1": "Cosa mangiare a Da Nang: meglio un buon posto vicino che una lista virale dall'altra parte della città",
    "desc": "Mi Quang, banh xeo, seafood, caffè vietnamita e cucina locale: il consiglio più utile dipende dal quartiere dove dormi.",
    "wiifm": "Meno tempo in taxi e più probabilità di trovare un posto davvero adatto ai tuoi gusti.",
    "bullets": [
      "Per il seafood conferma sempre l'unità di prezzo.",
      "Controlla recensioni recenti.",
      "Segnala allergie e preferenze prima di una giornata privata."
    ],
    "faqs": [
      [
        "La cucina è molto piccante?",
        "Spesso il peperoncino è regolabile o servito a parte."
      ],
      [
        "Si trova cucina vegetariana?",
        "Sì, ma conviene verificare il locale specifico."
      ],
      [
        "Potete consigliare ristoranti vicino all'hotel?",
        "Sì."
      ],
      [
        "Il tour privato può includere soste food?",
        "Sì, se concordato."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "massaggi-spa-da-nang",
    "type": "guide",
    "destination": "Da Nang",
    "priceKey": null,
    "title": "Massaggi e spa a Da Nang 2026 | Guida pratica | GoVietStay",
    "h1": "Spa a Da Nang: guarda igiene, durata reale e recensioni prima del prezzo",
    "desc": "A Da Nang il rapporto qualità-prezzo può essere ottimo, ma conviene confrontare minuti reali del trattamento, ambiente e costi extra.",
    "wiifm": "Un'ora che ti fa stare meglio invece di un'offerta economica che ti fa perdere tempo.",
    "bullets": [
      "Controlla la durata netta del trattamento.",
      "Leggi recensioni recenti.",
      "Chiedi se servizio, transfer o mancia sono inclusi."
    ],
    "faqs": [
      [
        "Serve prenotare?",
        "Per orari popolari o piccoli gruppi è consigliato."
      ],
      [
        "Potete consigliare vicino all'hotel?",
        "Sì."
      ],
      [
        "La mancia è obbligatoria?",
        "Dipende dalla struttura e dal servizio; chiedi se non è chiaro."
      ],
      [
        "Potete organizzare il transfer?",
        "Per alcune opzioni, sì."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "phu-quoc-fai-da-te",
    "type": "guide",
    "destination": "Phu Quoc",
    "priceKey": null,
    "title": "Phu Quoc fai da te 2026 | Guida per italiani | GoVietStay",
    "h1": "Phu Quoc fai da te: scegli prima la zona dell'hotel, poi le escursioni",
    "desc": "L'isola è più grande di quanto sembri. Nord, centro e sud cambiano completamente tempi di spostamento e attività comode.",
    "wiifm": "Meno ore in macchina e più tempo nel resort o sul mare.",
    "bullets": [
      "Sud: Hon Thom e Sunset Town più comodi.",
      "Nord: Safari e VinWonders più comodi.",
      "Centro: buona base intermedia per molti viaggiatori."
    ],
    "faqs": [
      [
        "Quanti giorni a Phu Quoc?",
        "4–5 giorni sono molto comodi."
      ],
      [
        "Serve un'auto privata?",
        "Utile quando vuoi attraversare l'isola o viaggi in famiglia."
      ],
      [
        "Meglio nord o sud?",
        "Dipende dalle attività che contano di più per te."
      ],
      [
        "Posso prenotare solo un tour alle isole?",
        "Sì."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "tour-3-isole-phu-quoc",
    "type": "product",
    "destination": "Phu Quoc",
    "priceKey": "pq3",
    "title": "Tour 3 isole Phu Quoc 2026 | Prezzo standard + privato | GoVietStay",
    "h1": "3 isole a Phu Quoc: il tour standard costa come per tutti, il privato compra libertà",
    "desc": "Il prezzo standard è lo stesso del prodotto English. Se vuoi barca privata, meno persone o orari diversi, il prezzo viene costruito sul gruppo.",
    "wiifm": "Scegli il risparmio del tour standard oppure paga solo se la privacy ti porta un vantaggio reale.",
    "bullets": [
      "Prezzo standard identico al prodotto pubblico.",
      "Mare e ordine delle soste possono cambiare.",
      "Opzione privata su richiesta."
    ],
    "faqs": [
      [
        "Il prezzo italiano è più alto?",
        "No."
      ],
      [
        "Hotel pickup incluso?",
        "Dipende dalla zona e dal pacchetto confermato."
      ],
      [
        "Guida in italiano?",
        "Richiedibile, soggetta a disponibilità."
      ],
      [
        "Barca privata disponibile?",
        "Da verificare per data e gruppo."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "tour-4-isole-hon-thom",
    "type": "product",
    "destination": "Phu Quoc",
    "priceKey": "pq4",
    "title": "Tour 4 isole + Hon Thom 2026 | Funivia Phu Quoc | GoVietStay",
    "h1": "4 isole + Hon Thom: una giornata piena, poi concediti una mattina lenta",
    "desc": "Il prezzo standard è uguale al tour English. La versione privata è pensata per chi vuole controllare meglio tempi, barca e spostamenti.",
    "wiifm": "Un'unica giornata completa invece di spezzare mare e funivia in più giorni.",
    "bullets": [
      "Funivia inclusa solo se indicata nella conferma.",
      "Sea Walking e attività opzionali normalmente sono extra.",
      "Famiglie con bambini piccoli devono valutare la durata."
    ],
    "faqs": [
      [
        "La funivia è inclusa?",
        "Solo se scritta nella conferma."
      ],
      [
        "Il prezzo standard è uguale all'English tour?",
        "Sì."
      ],
      [
        "Posso fare privato?",
        "Sì, su richiesta e disponibilità."
      ],
      [
        "Sea Walking incluso?",
        "Normalmente no, salvo conferma esplicita."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "auto-privata-phu-quoc",
    "type": "private",
    "destination": "Phu Quoc",
    "priceKey": null,
    "title": "Auto privata Phu Quoc 2026 | Nord, sud e Sunset Town | GoVietStay",
    "h1": "Auto privata a Phu Quoc: raggruppa le tappe per zona e smetti di attraversare l'isola avanti e indietro",
    "desc": "Invia hotel e wishlist. GoVietStay riordina le tappe in modo logico e quota il veicolo.",
    "wiifm": "Meno chilometri inutili, più tempo nei luoghi che hai scelto.",
    "bullets": [
      "Quotazione per veicolo, durata e percorso.",
      "Biglietti separati salvo conferma.",
      "Rientro dopo il tramonto possibile se concordato."
    ],
    "faqs": [
      [
        "Posso prenotare mezza giornata?",
        "Dipende dal percorso."
      ],
      [
        "I biglietti sono inclusi?",
        "Non automaticamente."
      ],
      [
        "Posso vedere nord e sud nello stesso giorno?",
        "Possibile, ma spesso poco efficiente."
      ],
      [
        "Guida italiana disponibile?",
        "Su richiesta e disponibilità."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "phu-quoc-con-bambini",
    "type": "guide",
    "destination": "Phu Quoc",
    "priceKey": null,
    "title": "Phu Quoc con bambini 2026 | Famiglie italiane | GoVietStay",
    "h1": "Phu Quoc con bambini: anche il resort è parte dell'itinerario",
    "desc": "Safari, VinWonders, Hon Thom e una giornata alle isole sono già abbastanza per un viaggio di famiglia ben fatto.",
    "wiifm": "Più vacanza per tutti e meno bambini stanchi ogni sera.",
    "bullets": [
      "Nord comodo per Safari e VinWonders.",
      "Sud comodo per Hon Thom e Sunset Town.",
      "Motoscafo da valutare in base a età e mare."
    ],
    "faqs": [
      [
        "Quale zona per una famiglia?",
        "Dipende dalle attrazioni preferite."
      ],
      [
        "Il tour 3 isole va bene per bambini?",
        "Serve valutare età e condizioni del mare."
      ],
      [
        "Serve auto privata?",
        "Spesso molto utile con famiglia."
      ],
      [
        "Potete creare un itinerario family?",
        "Sì."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "da-nang-o-phu-quoc",
    "type": "guide",
    "destination": "Da Nang vs Phu Quoc",
    "priceKey": null,
    "title": "Da Nang o Phu Quoc? Quale scegliere nel 2026 | GoVietStay",
    "h1": "Da Nang o Phu Quoc? Due vacanze completamente diverse",
    "desc": "Da Nang è migliore per varietà, cultura, Hoi An e gite. Phu Quoc è più forte per resort, mare e attrazioni family.",
    "wiifm": "Scegli il viaggio adatto al tuo stile invece di inseguire la destinazione più fotografata.",
    "bullets": [
      "Da Nang: più varietà di escursioni.",
      "Phu Quoc: più esperienza resort/isola.",
      "Voli, meteo e hotel possono cambiare la scelta."
    ],
    "faqs": [
      [
        "Per una coppia?",
        "Entrambe: Hoi An dà romanticismo culturale, Phu Quoc dà resort e mare."
      ],
      [
        "Per famiglia?",
        "Phu Quoc è molto forte per resort/Safari/VinWonders; Da Nang offre più varietà."
      ],
      [
        "Quale costa meno?",
        "Dipende soprattutto da volo e hotel."
      ],
      [
        "Posso fare entrambe?",
        "Sì, se hai abbastanza giorni per un volo interno."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "tour-su-misura-vietnam-centrale",
    "type": "private",
    "destination": "Vietnam centrale",
    "priceKey": null,
    "title": "Tour su misura Vietnam centrale 2026 | Privato | GoVietStay",
    "h1": "Vietnam centrale su misura: non comprare un itinerario che devi poi adattare a te",
    "desc": "Partiamo da persone, date, interessi, ritmo e hotel. Poi scegliamo auto, guida nella lingua richiesta e biglietti davvero necessari.",
    "wiifm": "Paghi per un viaggio costruito sul tuo gruppo, non per servizi che non userai.",
    "bullets": [
      "Perfetto per coppie, famiglie e piccoli gruppi.",
      "Guida in italiano o altra lingua su richiesta e disponibilità.",
      "Puoi combinare giorni fai-da-te e giorni privati."
    ],
    "faqs": [
      [
        "Devo fare tutto privato?",
        "No. Puoi usare tour standard dove convengono e privato solo nei giorni importanti."
      ],
      [
        "Potete fornire guida italiana?",
        "Sì, soggetta a disponibilità sulla data."
      ],
      [
        "Come mandate il preventivo?",
        "Con un riepilogo chiaro di auto, guida, biglietti e inclusioni."
      ],
      [
        "Posso cambiare itinerario dopo l'arrivo?",
        "Quando disponibilità e condizioni lo permettono, sì."
      ]
    ],
    "updated": "2026-08-27"
  },
  {
    "slug": "guida-in-italiano-vietnam-centrale",
    "type": "guide",
    "destination": "Vietnam centrale",
    "priceKey": null,
    "title": "Guida in italiano in Vietnam centrale 2026 | Da Nang, Hoi An, Hue | GoVietStay",
    "h1": "Guida in italiano in Vietnam: richiedila quando aggiunge davvero valore",
    "desc": "Per Hoi An, Hue, My Son o itinerari privati possiamo verificare guide nella lingua richiesta, incluso italiano, in base alla data e disponibilità.",
    "wiifm": "Capisci davvero storia e contesto nei giorni culturali, senza pagare una guida ogni giorno per forza.",
    "bullets": [
      "Italiano disponibile su richiesta e conferma.",
      "Altre lingue possono essere richieste allo stesso modo.",
      "Per transfer o giornate semplici può bastare il supporto WhatsApp + autista."
    ],
    "faqs": [
      [
        "Avete sempre una guida italiana?",
        "No: va verificata per la data, come qualsiasi lingua richiesta."
      ],
      [
        "La guida italiana costa più del tour standard?",
        "La guida e il setup privato possono aumentare il costo; il tour standard resta al prezzo pubblico English."
      ],
      [
        "Posso avere guida italiana solo a Hue?",
        "Sì, se disponibile."
      ],
      [
        "Offrite anche altre lingue?",
        "Sì, su richiesta e disponibilità."
      ]
    ],
    "updated": "2026-08-27"
  }
];

export const getItalyPage=(slug:string)=>italySeoPages.find(p=>p.slug===slug);

export const getItalyRelated=(page:ItalySeoPage)=>[
  ...italySeoPages.filter(p=>p.slug!==page.slug && p.destination.split(" · ")[0]===page.destination.split(" · ")[0]),
  ...italySeoPages.filter(p=>p.slug!==page.slug && p.type===page.type),
].filter((p,i,a)=>a.findIndex(x=>x.slug===p.slug)===i).slice(0,4);
