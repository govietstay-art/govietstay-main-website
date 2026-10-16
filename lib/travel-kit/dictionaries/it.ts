import type { KitCopy } from "../types";

export const it: KitCopy = {
  meta: {
    title: "Kit di viaggio per il Vietnam | GoVietStay",
    description:
      "Supporto locale per chi è appena arrivato a Da Nang, Hoi An, Hue o Phu Quoc: meteo, soldi, frasi, sicurezza e richiesta della eSIM gratuita.",
  },
  pageMeta: {
    esim: {
      title: "Richiesta eSIM Vietnam gratuita | Kit GoVietStay",
      description: "5 GB al giorno per 10 giorni. La richiesta parte solo quando premi invio su WhatsApp.",
    },
    arrival: {
      title: "Dall'aeroporto all'hotel | Kit GoVietStay",
      description: "Cosa fare prima di uscire dal terminal. La lista si spunta e resta su questo telefono.",
    },
    money: {
      title: "Soldi in Vietnam | Kit GoVietStay",
      description: "Un cambio di riferimento con fonte e orario, e le regole pubblicate dal Foreign Office britannico.",
    },
    phrases: {
      title: "Frasi vietnamite da mostrare | Kit GoVietStay",
      description: "Un frasario in corpo grande. Non è un'app di traduzione.",
    },
    weather: {
      title: "Meteo e piano per la pioggia | Kit GoVietStay",
      description: "Condizioni Open-Meteo per Da Nang, Hoi An, Hue e Phu Quoc, e cosa fare se piove.",
    },
    safety: {
      title: "Sicurezza e numeri di emergenza | Kit GoVietStay",
      description: "113, 114, 115 e 112, più gli avvisi pratici del Foreign Office britannico sul Vietnam.",
    },
    packing: {
      title: "Lista bagaglio per il Vietnam | Kit GoVietStay",
      description: "Una lista da spuntare. Resta su questo telefono. Nessun account.",
    },
    "da-nang": {
      title: "Guida di Da Nang per chi è appena arrivato | Kit GoVietStay",
      description: "Spostamenti, pioggia, soldi e sicurezza a Da Nang, per il giorno dell'arrivo.",
    },
  },
  brand: "GoVietStay",
  trust: "Supporto locale di cui fidarsi",
  skip: "Vai al passo successivo",
  back: "Kit",
  homeLabel: "Adesso",
  langLabel: "Lingua",
  languageName: { en: "Inglese", ru: "Russo", it: "Italiano" },
  cityLabel: "Città",
  cities: { danang: "Da Nang", hoian: "Hoi An", hue: "Hue", phuquoc: "Phu Quoc" },
  supportTitle: "Scrivi a una persona del posto",
  supportHint: "WhatsApp · invii tu",
  supportMessage: "Buongiorno GoVietStay. Sono a {city} e mi serve un aiuto locale.",
  nowKicker: "Adesso",
  weatherLoading: "Meteo in caricamento",
  weatherUnavailable: "Il meteo non è disponibile adesso",
  weatherSaved: "Ultima lettura salvata su questo telefono. Non è un aggiornamento nuovo.",
  weatherSource: "Dati meteo di Open-Meteo.com",
  conditions: {
    clear: "sereno",
    cloud: "nuvoloso",
    fog: "nebbia",
    drizzle: "pioggerella",
    rain: "pioggia",
    showers: "rovesci",
    thunder: "temporale",
  },
  now: {
    danang: {
      day: {
        title: "Sei a Da Nang. Prima la lista dell'aeroporto, poi l'auto.",
        body: "Controlla il timbro, tieni il passaporto e mostra l'indirizzo in vietnamita. L'ordine che conta è nella schermata dopo.",
        cta: "Apri la lista d'arrivo",
        tool: "arrival",
      },
      evening: {
        title: "Sera a Da Nang. Tieni pronta una frase.",
        body: "La Lady Buddha a Son Tra è il punto di riferimento di quest'ora. Se ti serve un'auto, il ponte del Drago è un indirizzo chiaro. Accordatevi prima che parta.",
        cta: "Mostra una frase",
        tool: "phrases",
      },
      rain: {
        title: "Piove a Da Nang. Resta sotto un tetto.",
        body: "Le grotte delle Marble Mountains sono coperte. Il museo Cham è al chiuso. My Khe può aspettare. Qui non ci sono orari.",
        cta: "Apri il piano pioggia",
        tool: "weather",
      },
    },
    hoian: {
      day: {
        title: "Hoi An può aspettare un'ora fatta bene.",
        body: "La lista d'arrivo di questo kit è scritta per l'aeroporto di Da Nang. Usala se sei atterrato lì, poi metti il tuo hotel nella scheda per l'autista.",
        cta: "Apri la lista d'arrivo",
        tool: "arrival",
      },
      evening: {
        title: "Dopo il tramonto Hoi An si fa a piedi.",
        body: "Tieni la scheda per il ritorno. Mostra l'indirizzo in vietnamita prima di salire.",
        cta: "Mostra una frase",
        tool: "phrases",
      },
      rain: {
        title: "Pioggia a Hoi An. Usa le botteghe coperte.",
        body: "La guida completa di Hoi An non è in questa versione.",
        cta: "Apri il piano pioggia",
        tool: "weather",
      },
    },
    hue: {
      day: {
        title: "Se la meta è Hue, sistema prima la corsa.",
        body: "L'arrivo passo passo di questo kit è per l'aeroporto di Da Nang. Per Hue metti il tuo hotel nella scheda prima che l'auto parta.",
        cta: "Apri la lista d'arrivo",
        tool: "arrival",
      },
      evening: {
        title: "Una sera tranquilla vuole un indirizzo chiaro.",
        body: "Nella foto c'è la porta Ngo Mon. All'autista serve il tuo hotel, non la porta.",
        cta: "Mostra una frase",
        tool: "phrases",
      },
      rain: {
        title: "Pioggia a Hue. I cortili sono scivolosi.",
        body: "Evita la pietra aperta e l'argine. La guida completa di Hue non è in questa versione.",
        cta: "Apri il piano pioggia",
        tool: "weather",
      },
    },
    phuquoc: {
      day: {
        title: "A Phu Quoc chiedi la connessione prima di uscire dal terminal.",
        body: "Apri la eSIM finché la rete dell'aeroporto è comoda, poi la scheda per l'autista. La guida completa dell'isola non è in questa versione.",
        cta: "Vedi la eSIM",
        tool: "esim",
      },
      evening: {
        title: "Sera sull'isola. Prima l'indirizzo.",
        body: "Fuori dai paesi la strada è buia. Mostra l'indirizzo in vietnamita prima che l'auto parta.",
        cta: "Mostra una frase",
        tool: "phrases",
      },
      rain: {
        title: "Pioggia a Phu Quoc. La spiaggia può aspettare.",
        body: "La guida completa dell'isola non è in questa versione.",
        cta: "Apri il piano pioggia",
        tool: "weather",
      },
    },
  },
  giftKicker: "Un regalo, non un negozio",
  giftTitle: "eSIM Vietnam gratuita",
  giftBody: "5 GB al giorno per 10 giorni. La chiedi su WhatsApp e premi invio tu. Da questa pagina non parte nulla.",
  giftCta: "Come richiederla",
  toolsLabel: "Il passo utile",
  tools: {
    esim: { title: "eSIM gratuita", glance: "5 GB al giorno · 10 giorni" },
    arrival: { title: "Aeroporto e hotel", glance: "Una lista da spuntare" },
    money: { title: "Soldi", glance: "Un cambio di riferimento" },
    phrases: { title: "Vietnamita", glance: "Caratteri grandi da mostrare" },
    weather: { title: "Meteo", glance: "Dal vivo, con la pioggia" },
    safety: { title: "Sicurezza", glance: "113 · 114 · 115" },
    packing: { title: "Bagaglio", glance: "Salvato su questo telefono" },
    "da-nang": { title: "Guida di Da Nang", glance: "La pagina completa" },
  },
  guideNote: "La guida scritta per intero, in questa versione, è Da Nang. Meteo, soldi, frasi e sicurezza seguono già la città che scegli.",
  photoAlt: {
    danang: {
      landed: "Il Golden Bridge a Ba Na Hills, sorretto da mani di pietra, nella nebbia vicino a Da Nang",
      rain: "Una grotta delle Marble Mountains vicino a Da Nang, con un Buddha di pietra e la luce da un'apertura in alto",
      evening: "La statua bianca della Lady Buddha su un loto, sulla penisola di Son Tra a Da Nang",
    },
    hoian: {
      landed: "Il ponte coperto giapponese nella città vecchia di Hoi An, visto dal fiume",
      rain: "Un laboratorio di sartoria rivestito di legno a Hoi An, con abiti sulle grucce e nessuno al banco",
      evening: "Barche di legno illuminate da lanterne sul fiume di Hoi An all'ora blu",
    },
    hue: {
      landed: "Ngo Mon, la porta principale della Città Imperiale a Hue, rossa e oro",
      rain: "Ngo Mon, la porta principale della Città Imperiale a Hue, rossa e oro",
      evening: "Ngo Mon, la porta principale della Città Imperiale a Hue, rossa e oro",
    },
    phuquoc: {
      landed: "Sabbia chiara e barche di legno su una spiaggia di Phu Quoc",
      rain: "Sabbia chiara e barche di legno su una spiaggia di Phu Quoc",
      evening: "Sabbia chiara e barche di legno su una spiaggia di Phu Quoc",
    },
  },
  esim: {
    lead: "GoVietStay offre una eSIM per il Vietnam in regalo: 5 GB al giorno per 10 giorni. Questa pagina non la installa e non invia il messaggio al posto tuo.",
    youGet: ["5 GB al giorno", "10 giorni", "Per l'uso in Vietnam", "L'invio lo premi tu"],
    howTitle: "Come richiederla",
    how: [
      "Tocca il pulsante. Si apre WhatsApp con il testo già scritto.",
      "Leggilo. Aggiungi le date se vuoi.",
      "Premi invio tu. Finché non lo fai, non hai richiesto nulla.",
      "Una persona di GoVietStay risponde in quella chat. Lì si conferma se il telefono è compatibile e da quando partono i 10 giorni.",
    ],
    unknown:
      "Qui non c'è l'elenco dei telefoni che accettano una eSIM, né i passi di attivazione, né l'ora esatta in cui iniziano i 10 giorni. Quelle condizioni non erano pubblicate in un modo verificabile. Chiedile nella chat WhatsApp prima di contarci.",
    button: "Richiedi su WhatsApp",
    foot: "Da questo telefono non esce nulla finché non premi invio. Non c'è una recensione da scrivere e non c'è un pagamento su questa pagina.",
    message: "Buongiorno GoVietStay. Vorrei richiedere la eSIM Vietnam: 5 GB al giorno per 10 giorni. Sono a {city}.",
    faq: [
      { q: "Il kit invia la richiesta al posto mio?", a: "No. Il pulsante apre WhatsApp con una bozza. La invii tu." },
      {
        q: "Che cosa comprende il regalo?",
        a: "5 GB al giorno per 10 giorni, per l'uso in Vietnam, come lo descrive GoVietStay. Compatibilità e attivazione si confermano in chat, non su questa pagina.",
      },
    ],
  },
  arrival: {
    lead: "In aeroporto il problema utile è uno: uscire con il timbro giusto, il passaporto ancora in mano e un passaggio che hai scelto tu. I passi seguono i consigli del Foreign Office britannico letti il 16 ottobre 2026. Se il passaporto non è britannico, leggi anche le regole del tuo governo.",
    blocks: [
      {
        title: "Prima del volo, se hai un passaporto di cittadino britannico",
        paragraphs: [
          "Il Foreign Office dice che un passaporto di cittadino britannico serve con scadenza almeno sei mesi dopo l'arrivo, almeno due pagine bianche e senza danni. Si entra e si esce con lo stesso passaporto, e serve il timbro.",
          "Lo stesso testo dice che i cittadini britannici possono restare fino a 45 giorni per turismo o affari senza visto, e devono controllare che il timbro indichi 45 giorni. Un e-visa per un soggiorno più lungo è un altro documento. Non è una promessa per gli altri passaporti.",
          "Dal 15 aprile 2026 una carta d'arrivo digitale è incoraggiata per gli stranieri che usano l'aeroporto Tan Son Nhat a Ho Chi Minh City. Il Foreign Office dice che lì non è ancora obbligatoria e che la regola può cambiare o estendersi ad altri aeroporti con poco preavviso. Non dare per scontato che oggi a Da Nang sia obbligatoria.",
        ],
      },
      {
        title: "Soldi e medicine nel bagaglio a mano",
        paragraphs: [
          "Dichiara il contante oltre 15 milioni di dong, o oltre 5.000 dollari USA o lo stesso valore in un'altra valuta. La soglia viene dal resoconto del Foreign Office sulle regole doganali vietnamite.",
          "Porta le medicine con ricetta nel bagaglio a mano, con una copia della ricetta. Se il valore da importare supera 100 dollari USA, va dichiarato.",
          "Le sigarette elettroniche e i prodotti collegati sono vietati. Non si possono portare in Vietnam.",
        ],
      },
      {
        title: "Nel terminal",
        paragraphs: [
          "Finisci i controlli e guarda il timbro prima di allontanarti. Ritira i bagagli.",
          "Non consegnare il passaporto come deposito per una corsa, una multa o un noleggio.",
          "Diffida di un bus gratuito verso un hotel che non hai prenotato. Il Foreign Office avvisa che i transfer gratuiti non concordati possono essere una truffa.",
          "Per il taxi: un passaggio già organizzato, un taxi con tassametro di una ditta grande, o un'app che il Foreign Office nomina: Grab o Xanh SM. Prenota l'intero tragitto nell'app e diffida di chi dice soltanto di essere della compagnia.",
        ],
      },
      {
        title: "Una connessione",
        paragraphs: [
          "Se vuoi i dati prima di uscire dal terminal, apri la pagina eSIM. Il regalo è 5 GB al giorno per 10 giorni, e invii tu il messaggio. Questa pagina non installa nulla.",
          "In Vietnam le autorità possono bloccare siti e rivedere ciò che c'è sui dispositivi. Non dare per scontato che ogni app di casa si apra.",
        ],
      },
      {
        title: "L'indirizzo",
        paragraphs: [
          "Scrivi il tuo hotel nel campo di questa pagina, in vietnamita, prima di sederti. Il kit non sceglie un indirizzo al posto tuo.",
          "La sequenza sopra vale per chi arriva a Da Nang. Non inventa una tariffa né un tempo di viaggio.",
        ],
      },
    ],
    addressTitle: "Indirizzo per l'autista",
    addressHint: "Lo scrivi tu. Il campo parte vuoto. Il testo resta su questo telefono.",
    addressPlaceholder: "Nome dell'hotel e via, in vietnamita se ce l'hai",
    addressShow: "Mostra all'autista",
    addressEmpty: "Prima scrivi l'indirizzo.",
    addressClose: "Chiudi",
    checklistTitle: "Spunta sul telefono",
    checklist: [
      "Timbro controllato, passaporto di nuovo in borsa.",
      "Bagagli ritirati.",
      "eSIM richiesta solo se hai premuto invio su WhatsApp.",
      "Indirizzo dell'hotel pronto in vietnamita.",
      "La corsa è organizzata da te, un taxi con tassametro, oppure Grab o Xanh SM prenotati nell'app.",
      "113, 114 e 115 aperti nella pagina sicurezza.",
    ],
    progress: "{done} di {total}",
    storageNote: "Le spunte restano su questo telefono. Non c'è un account.",
  },
  money: {
    lead: "Converti per orientarti. Non è un tasso con cui puoi pagare e non promette quello che daranno un bancomat o un negozio.",
    amount: "Importo",
    from: "Da",
    to: "A",
    swap: "Scambia le valute",
    result: "Risultato di riferimento",
    empty: "Inserisci un importo",
    reference: "Solo come riferimento. Non è un tasso di banca e non serve per pagare.",
    unavailable: "Il servizio dei cambi non ha risposto e su questo telefono non c'è un tasso salvato.",
    saved: "Mostro l'ultimo tasso salvato su questo telefono, non un aggiornamento nuovo.",
    refresh: "Riprova il tasso",
    sourceName: "Tassi di Exchange Rate API",
    currencyName: { VND: "Dong vietnamita", USD: "Dollaro USA", EUR: "Euro", RUB: "Rublo russo" },
    blocks: [
      {
        title: "Dove cambiare",
        paragraphs: [
          "Il Foreign Office dice di cambiare solo agli sportelli ufficiali con un'insegna chiara. Cambiare altrove è illegale e rischi di perdere i soldi.",
        ],
      },
      {
        title: "Contante da dichiarare",
        paragraphs: [
          "Dichiara le somme oltre 15 milioni di dong, o oltre 5.000 dollari USA o lo stesso valore in un'altra valuta, quando le porti in entrata o in uscita.",
        ],
      },
    ],
  },
  phrases: {
    lead: "Tocca una riga. Alza il telefono così l'altra persona legge il vietnamita. È un frasario, non un traduttore.",
    show: "Ingrandisci",
    close: "Chiudi",
    honest: "Queste frasi sono scritte per il kit. Non traducono quello che digiti.",
    items: [
      { vi: "Xin chào.", meaning: "Buongiorno." },
      { vi: "Cảm ơn.", meaning: "Grazie." },
      { vi: "Bao nhiêu tiền?", meaning: "Quanto costa?" },
      { vi: "Đắt quá.", meaning: "È troppo caro." },
      { vi: "Làm ơn đưa tôi đến địa chỉ này.", meaning: "Mi porti a questo indirizzo." },
      { vi: "Dừng ở đây, làm ơn.", meaning: "Si fermi qui, per favore." },
      { vi: "Tôi bị lạc.", meaning: "Mi sono perso." },
      { vi: "Giúp tôi với.", meaning: "Mi aiuti, per favore." },
      { vi: "Tôi cần bác sĩ.", meaning: "Mi serve un medico." },
      { vi: "Gọi cấp cứu giúp tôi.", meaning: "Chiami un'ambulanza." },
      { vi: "Không cay, làm ơn.", meaning: "Non piccante, per favore." },
      { vi: "Tôi ăn chay.", meaning: "Mangio vegetariano." },
      { vi: "Nhà vệ sinh ở đâu?", meaning: "Dov'è il bagno?" },
      { vi: "Một chai nước suối.", meaning: "Una bottiglia d'acqua." },
      { vi: "Tôi không hiểu.", meaning: "Non capisco." },
    ],
  },
  weatherPage: {
    lead: "Condizioni nell'area della città che hai scelto. Non è una misura sulla porta del tuo hotel.",
    today: "Adesso",
    ahead: "I prossimi giorni",
    rainTitle: "Se è bagnato",
    rain: {
      danang: [
        { title: "Grotte delle Marble Mountains", detail: "Caverne coperte. Hanno senso quando la spiaggia è sotto la pioggia. Orari e biglietti non sono elencati." },
        { title: "Museo della scultura Cham", detail: "Sale al chiuso. Ha senso se le grotte sono già abbastanza cammino." },
        { title: "Lascia My Khe", detail: "La spiaggia aperta, con la pioggia forte, è il piano sbagliato." },
      ],
      hoian: [
        { title: "Botteghe coperte", detail: "Nella città vecchia i negozi stanno sotto i tetti. È un tipo di posto, non un nome." },
        { title: "Evita l'argine aperto", detail: "La guida completa di Hoi An, con orari verificati, non è in questa versione." },
      ],
      hue: [
        { title: "Fuori dai cortili", detail: "La pietra aperta è scivolosa. La guida completa di Hue non è in questa versione." },
      ],
      phuquoc: [
        { title: "Lontano dalla spiaggia aperta", detail: "Aspetta che la pioggia cali. La guida completa dell'isola non è in questa versione." },
      ],
    },
    unavailable: "Open-Meteo non ha risposto e su questo telefono non c'è una lettura salvata per questa città.",
    saved: "Mostro l'ultima lettura salvata su questo telefono. Non è un aggiornamento nuovo.",
    refresh: "Riprova le previsioni",
  },
  safety: {
    lead: "Numeri nazionali. Rispondono in vietnamita. Si chiamano da qualsiasi telefono in Vietnam.",
    call: "Chiama",
    numbers: [
      { name: "Polizia", tel: "113", detail: "Anche per un incidente stradale." },
      { name: "Vigili del fuoco", tel: "114", detail: "Incendio e soccorso." },
      { name: "Ambulanza", tel: "115", detail: "Emergenza medica." },
      { name: "Ricerca e soccorso", tel: "112", detail: "Servizio nazionale. Non sostituisce 113, 114 o 115." },
      { name: "Tutela dei minori", tel: "111", detail: "Linea indicata dal Foreign Office britannico." },
    ],
    foot: "Numeri e avvisi seguono i consigli del Foreign, Commonwealth & Development Office sul Vietnam, letti il 16 ottobre 2026. Se il passaporto non è britannico, leggi anche i consigli del tuo governo.",
    blocks: [
      {
        title: "Borsa e passaporto",
        paragraphs: [
          "Furti e strappi della borsa dai motorini capitano nei luoghi affollati e turistici. Tieni la borsa davanti, dal lato lontano dal traffico.",
          "Non dare il passaporto in deposito a un noleggio, a un padrone di casa o a un autista. Porta una copia stampata e una digitale della pagina con la foto. Le autorità accettano la stampa di quella pagina e del visto come documento con foto.",
        ],
      },
      {
        title: "Spostamenti",
        paragraphs: [
          "Usa un passaggio già organizzato, un taxi con tassametro di una ditta grande, oppure Grab o Xanh SM prenotati nell'app per l'intero tragitto. Diffida di chi dice soltanto di essere della compagnia.",
          "Il motorino è molto più rischioso che a casa. Non noleggiarlo se non sai già guidarlo. Il casco è obbligatorio per chi guida e per il passeggero. Per guidare auto o motorino, il Foreign Office dice ai titolari di patente britannica di avere il permesso internazionale del 1968, la patente britannica e l'assicurazione di responsabilità civile. Qualsiasi alcol è guida in stato di ebbrezza.",
        ],
      },
      {
        title: "Bevande, droghe, templi, foto",
        paragraphs: [
          "Compra tu da bere e non perdere il bicchiere di vista. Ci sono stati avvelenamenti da metanolo anche in locali autorizzati. Non comprare alcol o sigarette dai venditori di strada.",
          "Le pene per la droga sono severe, anche per la cannabis, e possono includere un lungo carcere. Le sigarette elettroniche sono vietate.",
          "Nei luoghi religiosi copri spalle e ginocchia. Non fotografare vicino a basi militari.",
        ],
      },
      {
        title: "Pioggia e tempeste",
        paragraphs: [
          "Nel Vietnam centrale la stagione delle piogge va da ottobre a dicembre e le inondazioni possono chiudere le strade. Sulla costa orientale i cicloni tropicali possono arrivare da maggio a novembre. Segui le istruzioni locali, anche un ordine di andartene.",
        ],
      },
    ],
    faq: [
      {
        q: "Quale numero chiamo in emergenza?",
        a: "Polizia 113, vigili del fuoco 114, ambulanza 115. Ricerca e soccorso è il 112. Possono rispondere in vietnamita. Mostra una frase del kit se serve.",
      },
      {
        q: "GoVietStay sostituisce la polizia?",
        a: "No. WhatsApp serve per un aiuto locale ordinario. Nel pericolo chiama prima 113, 114 o 115.",
      },
    ],
  },
  packing: {
    lead: "Una lista suggerita per il Vietnam. I punti di legge sono segnati dai consigli del Foreign Office. Spunta mentre prepari. Resta su questo telefono.",
    progress: "{done} di {total}",
    storageNote: "Solo su questo telefono. Se cancelli i dati del browser, spariscono le spunte.",
    items: [
      { id: "passport", label: "Passaporto, con margine di validità e pagine bianche", note: "Per un passaporto di cittadino britannico: sei mesi dopo l'arrivo e due pagine bianche." },
      { id: "copies", label: "Copia stampata e digitale della pagina con la foto", note: "Portale con te. Il passaporto non si lascia in deposito." },
      { id: "stamp", label: "Controllare il timbro prima di lasciare lo sportello" },
      { id: "meds", label: "Medicine con ricetta nel bagaglio a mano, con la ricetta", note: "Da dichiarare se il valore supera 100 dollari USA." },
      { id: "insurance", label: "Dati dell'assicurazione condivisi con qualcuno a casa" },
      { id: "rain", label: "Uno strato leggero per la pioggia", note: "Nel Vietnam centrale la stagione delle piogge è da ottobre a dicembre." },
      { id: "cover", label: "Abiti che coprono spalle e ginocchia per i templi" },
      { id: "cash", label: "Un piano per dichiarare grandi somme in contanti", note: "Oltre 15 milioni di dong, o oltre 5.000 dollari USA." },
      { id: "vape", label: "Niente sigarette elettroniche", note: "Vietato comprarle e vietato portarle." },
      { id: "adapter", label: "Un caricatore che sai già funzionare col telefono" },
    ],
  },
  danang: {
    kicker: "Da Nang",
    title: "Il primo giorno, senza un tour.",
    lede: "Da Nang è una città di mare, con un aeroporto, una spiaggia lunga e una penisola. Questa pagina è l'ordine pratico per chi è appena arrivato. Non vende un tour e non inventa prezzi o orari.",
    blocks: [
      {
        title: "All'arrivo",
        paragraphs: [
          "Usa la lista dell'aeroporto prima di prendere un'auto. Controlla il timbro, tieni il passaporto e rifiuta un transfer gratuito che non hai prenotato.",
          "Metti il tuo hotel nella scheda per l'autista. Il ponte del Drago è solo un indirizzo di riserva se non ne hai ancora uno.",
        ],
      },
      {
        title: "Come muoversi",
        paragraphs: [
          "A piedi si fa lungo la spiaggia e il fiume. Per un tratto più lungo usa un passaggio organizzato, un taxi con tassametro di una ditta grande, oppure Grab o Xanh SM prenotati nell'app.",
          "Noleggiare un motorino il primo giorno è una cattiva idea se non sai già guidarlo. Il casco è obbligatorio e qualsiasi alcol è un'infrazione. Nessuna tariffa: non ne è stata verificata una affidabile.",
        ],
      },
      {
        title: "Soldi e connessione",
        paragraphs: [
          "Cambia il contante solo a uno sportello ufficiale. La pagina soldi ha un tasso di riferimento e il nome della fonte.",
          "Se ti serve la rete, la pagina eSIM spiega il regalo: 5 GB al giorno per 10 giorni, richiesto da te su WhatsApp. Il kit non promette che il tuo telefono possa installarla.",
          "In Vietnam le autorità possono bloccare siti e rivedere ciò che c'è sui dispositivi. Non dare per scontato che ogni app di casa si apra.",
        ],
      },
      {
        title: "Se piove",
        paragraphs: [
          "Da ottobre a dicembre è la stagione delle piogge nel Vietnam centrale e le inondazioni possono chiudere le strade. Il cielo di oggi è nella pagina meteo, da Open-Meteo.",
          "Quando è bagnato, le grotte delle Marble Mountains e il Museo della scultura Cham sono piani al chiuso. My Khe no. Orari e prezzi dei biglietti non ci sono, perché non sono stati verificati per questa pagina.",
        ],
      },
      {
        title: "Un posto con un nome",
        paragraphs: [
          "La Lady Buddha sta sulla penisola di Son Tra. Il Golden Bridge, retto da mani di pietra, è a Ba Na Hills. Ngo Mon è a Hue, non qui. Il ponte giapponese è a Hoi An, non qui.",
          "In questi nomi non c'è un prezzo del biglietto né un orario di spettacolo. Se all'autista serve un indirizzo famoso e l'hotel non c'è ancora, il ponte del Drago si indica facilmente.",
        ],
      },
      {
        title: "Che cosa evitare",
        paragraphs: [
          "Non lasciare il passaporto in deposito. Non fotografare un sito militare. Nei templi copri spalle e ginocchia. Compra tu da bere.",
          "Nel pericolo chiama 113, 114 o 115 prima di scrivere a qualcuno.",
        ],
      },
    ],
    faq: [
      {
        q: "Che cosa faccio nella prima ora a Da Nang?",
        a: "Controlla il timbro, tieni il passaporto e prendi un passaggio organizzato o prenotato su Grab o Xanh SM. Mostra l'indirizzo dell'hotel in vietnamita prima che l'auto parta.",
      },
      {
        q: "Dove vado se piove?",
        a: "Alle grotte delle Marble Mountains o al Museo della scultura Cham. Questa pagina non elenca orari né prezzi.",
      },
      {
        q: "È una pagina per prenotare un tour?",
        a: "No. È una guida per il giorno in cui arrivi. Altre pagine GoVietStay sono in fondo, come altre pagine, non come il passo obbligatorio.",
      },
    ],
    elsewhere: "Altre pagine di GoVietStay",
    links: [
      { href: "/it/local-experiences/da-nang-night-bites-city-lights", label: "Una sera di cibo a Da Nang" },
      { href: "/it/da-nang-o-phu-quoc", label: "Da Nang o Phu Quoc, sul sito principale" },
    ],
  },
  homeFaqTitle: "Le domande subito",
  homeFaq: [
    {
      q: "A che cosa mi serve il kit nella prima ora?",
      a: "Dice il passo utile per la città e per il cielo: la lista dell'aeroporto, una frase da mostrare, o un tetto se piove. Poi tiene sul telefono i numeri, il frasario, la lista bagaglio e un cambio di riferimento.",
    },
    {
      q: "Meteo e cambio sono dal vivo?",
      a: "Sì, quando la fonte risponde. Il meteo viene da Open-Meteo e mostra l'ora dell'osservazione. I tassi vengono da Exchange Rate API, aggiornati da loro circa una volta al giorno, e sono segnati come riferimento. Se una fonte non risponde, la pagina lo dice e non inventa un numero.",
    },
    {
      q: "Come ottengo la eSIM gratuita?",
      a: "Apri la pagina eSIM e tocca WhatsApp. Il messaggio lo invii tu. L'offerta descritta qui è 5 GB al giorno per 10 giorni. La compatibilità del telefono si conferma in chat.",
    },
  ],
  otherCities: "Hoi An, Hue e Phu Quoc hanno già meteo, frasario, soldi e sicurezza. Le guide complete di quelle città non sono scritte in questa versione.",
};
