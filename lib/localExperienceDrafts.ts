// Editorial drafts only. Never advertise these as confirmed tours until the owner
// has verified the supplier, itinerary, inclusions, language and pricing in person.
export type ExperienceLocale = 'en' | 'ru' | 'it';
export type ExperienceSlug = 'da-nang-taste-trails-food-tour' | 'da-nang-city-stories-private-tour' | 'da-nang-after-dark-night-tour' | 'da-nang-local-rider-motorbike-tour';
export type ExperienceCopy = {
  name: string; title: string; description: string; keywords: string[];
  intro: string; audience: string; route: string[]; approach: string[];
  confirm: string[]; questions: { question: string; answer: string }[];
};
export type Experience = { slug: ExperienceSlug; translations: Record<ExperienceLocale, ExperienceCopy> };

export const experienceSlugs: ExperienceSlug[] = [
  'da-nang-taste-trails-food-tour',
  'da-nang-city-stories-private-tour',
  'da-nang-after-dark-night-tour',
  'da-nang-local-rider-motorbike-tour',
];

export const experienceUi: Record<ExperienceLocale, {
  eyebrow: string; status: string; statusDetail: string; suitable: string;
  route: string; approach: string; confirm: string; faq: string;
  next: string; contact: string; contactHint: string; back: string;
  language: string; price: string; duration: string; transport: string;
}> = {
  en: {
    eyebrow: 'GO VIET STAY · LOCAL EXPERIENCES', status: 'Experience in development',
    statusDetail: 'We are checking the real route, supplier, safety and inclusions. This is a planning preview, not a confirmed bookable tour.',
    suitable: 'Who is this experience for?', route: 'Possible experience outline',
    approach: 'How we would tailor it', confirm: 'Details we will verify before accepting bookings',
    faq: 'Questions travellers ask', next: 'Explore the other local experiences',
    contact: 'Ask for a tailored plan', contactHint: 'Share your travel date, group size, hotel, preferred language and interests. Availability and pricing are not yet confirmed.',
    back: 'Da Nang travel guides', language: 'Language', price: 'Price: to be confirmed', duration: 'Duration: to be confirmed', transport: 'Transport: to be confirmed',
  },
  ru: {
    eyebrow: 'GOVIETSTAY · МЕСТНЫЕ ВПЕЧАТЛЕНИЯ', status: 'Маршрут в разработке',
    statusDetail: 'Мы проверяем маршрут, партнёров, безопасность и состав услуг. Это предварительное описание, а не экскурсия с подтверждённым бронированием.',
    suitable: 'Кому подойдёт?', route: 'Возможный план впечатления',
    approach: 'Как мы подстроим маршрут под вас', confirm: 'Что проверим до начала продаж',
    faq: 'Частые вопросы путешественников', next: 'Другие местные впечатления',
    contact: 'Запросить индивидуальный план', contactHint: 'Напишите дату, количество гостей, отель, желаемый язык и интересы. Наличие мест и стоимость пока не подтверждены.',
    back: 'Путеводитель по Данангу', language: 'Язык', price: 'Цена: уточняется', duration: 'Продолжительность: уточняется', transport: 'Транспорт: уточняется',
  },
  it: {
    eyebrow: 'GOVIETSTAY · ESPERIENZE LOCALI', status: 'Esperienza in preparazione',
    statusDetail: 'Stiamo verificando itinerario, fornitori, sicurezza e servizi inclusi. Questa è un’anteprima, non un tour già prenotabile.',
    suitable: 'A chi si rivolge?', route: 'Possibile programma',
    approach: 'Come personalizzeremmo l’esperienza', confirm: 'Cosa verificheremo prima di accettare prenotazioni',
    faq: 'Domande frequenti', next: 'Scopri le altre esperienze locali',
    contact: 'Richiedi un programma su misura', contactHint: 'Indica date, numero di partecipanti, hotel, lingua preferita e interessi. Prezzo e disponibilità non sono ancora confermati.',
    back: 'Guida di Da Nang', language: 'Lingua', price: 'Prezzo: da confermare', duration: 'Durata: da confermare', transport: 'Trasporto: da confermare',
  },
};

export const experiences: Experience[] = [
  {
    slug: 'da-nang-taste-trails-food-tour',
    translations: {
      en: {
        name: 'GoVietStay Taste Trails', title: 'Da Nang Private Food Tour | Taste Trails | GoVietStay',
        description: 'Plan a private Da Nang food experience with local dish ideas, dietary questions and flexible pacing. Route, menu, guide and price pending on-site verification.',
        keywords: ['Da Nang food tour', 'private food tour Da Nang', 'Da Nang local food', 'what to eat in Da Nang', 'Da Nang food walking tour'],
        intro: 'Taste Trails is our proposed private introduction to the food of Da Nang. Instead of rushing through a long checklist, we want to match local dishes and a comfortable pace to your appetite, dietary needs and neighbourhood. We are still visiting suppliers before finalising the stops.',
        audience: 'Travellers who would rather understand a few regional dishes than simply follow online restaurant rankings; couples, friends and small private groups looking for a flexible pace.',
        route: ['Discuss your starting point, dietary needs and whether you prefer walking or an arranged transfer.', 'Consider typical regional dishes such as mì Quảng or bánh xèo, subject to verified vendor menus and your preferences.', 'Leave time to hear how the food is prepared and why it matters locally, with optional neighbourhood exploration only after route confirmation.'],
        approach: ['Choose a comfortable food portion and number of stops after the tasting locations are checked.', 'Arrange vegetarian or other dietary requests only where vendors can confirm ingredients and preparation.', 'Keep the experience distinct from our After Dark tour: food and the people behind it are the focus here.'],
        confirm: ['Actual restaurants, hygiene observations and ingredient information.', 'Number of tastings, portion sizes, drinks and whether transfers are included.', 'Verified price, duration, pickup area, guiding language and cancellation terms.'],
        questions: [
          { question: 'What food should I try in Da Nang?', answer: 'Mì Quảng and bánh xèo are two well-known regional ideas. The final dishes on Taste Trails will depend on verified restaurants, the agreed menu and your dietary preferences.' },
          { question: 'Is this a private Da Nang food tour?', answer: 'Private small-group planning is the intended format. A bookable itinerary and supplier availability will be confirmed only after our inspection.' },
          { question: 'Can you arrange vegetarian food or avoid allergens?', answer: 'Tell us your requirements before planning. We will check directly with each vendor; we cannot promise an allergen-free kitchen or a specific menu in advance.' },
          { question: 'How much does the Da Nang food tour cost?', answer: 'There is no confirmed GoVietStay price yet. We will quote after verifying the route, number of tastings, transport, guide and date.' },
        ],
      },
      ru: {
        name: 'GoVietStay Taste Trails', title: 'Гастрономическая экскурсия по Данангу | Taste Trails | GoVietStay',
        description: 'Индивидуальная гастрономическая прогулка по Данангу: местные блюда, гибкий темп и учёт питания. Маршрут, меню, язык гида и цена проходят проверку.',
        keywords: ['гастрономическая экскурсия Дананг', 'еда в Дананге', 'индивидуальная экскурсия Дананг', 'что попробовать в Дананге', 'местная кухня Дананг'],
        intro: 'Taste Trails — проект индивидуального знакомства с кухней Дананга. Вместо гонки по ресторанам мы хотим подобрать несколько характерных блюд с учётом вашего вкуса, темпа и района проживания. Конкретные заведения ещё проверяются на месте.',
        audience: 'Парам, друзьям и небольшим компаниям, которым хочется узнать местную кухню, а не просто посетить популярные точки из интернета.',
        route: ['Сначала уточним ваш отель, ограничения в питании и предпочтительный способ передвижения.', 'Рассмотрим местные блюда, например ми куанг и бань сео, если меню проверенных заведений и ваши пожелания это позволяют.', 'Оставим время на рассказ о продуктах, приготовлении и местных традициях; остановки окончательно утвердим после проверки.'],
        approach: ['Согласуем количество блюд и разумный размер порций после выбора заведений.', 'Запросы на вегетарианское питание и ингредиенты будем подтверждать непосредственно у кухни.', 'В отличие от After Dark здесь главное — блюда и люди, которые их готовят, а не вечерние достопримечательности.'],
        confirm: ['Реальные рестораны, условия приготовления и состав блюд.', 'Число дегустаций, напитки, порции и необходимость трансфера.', 'Окончательная цена, длительность, район встречи, язык сопровождения и условия отмены.'],
        questions: [
          { question: 'Что обязательно попробовать в Дананге?', answer: 'Ми куанг и бань сео — примеры региональных блюд. Точное меню будет зависеть от проверенных кафе, ваших предпочтений и согласованной программы.' },
          { question: 'Это индивидуальная гастрономическая экскурсия?', answer: 'Мы готовим формат для частных небольших групп. Подтвердить готовую программу и свободные места сможем только после проверки партнёров.' },
          { question: 'Можно ли организовать вегетарианское питание или учесть аллергию?', answer: 'Сообщите требования заранее. Мы уточним ингредиенты у каждого заведения, но пока не можем гарантировать кухню без аллергенов.' },
          { question: 'Сколько стоит гастрономическая экскурсия по Данангу?', answer: 'Подтверждённой цены GoVietStay пока нет. Рассчитаем её после проверки маршрута, дегустаций, транспорта, сопровождения и даты.' },
        ],
      },
      it: {
        name: 'GoVietStay Taste Trails', title: 'Tour gastronomico privato a Da Nang | Taste Trails | GoVietStay',
        description: 'Progetto di tour gastronomico privato a Da Nang con piatti locali, ritmo flessibile e attenzione alla dieta. Menù, tappe, guida e prezzo da verificare.',
        keywords: ['tour gastronomico Da Nang', 'street food Da Nang', 'tour privato Da Nang', 'cosa mangiare a Da Nang', 'cucina locale Da Nang'],
        intro: 'Taste Trails è la nostra proposta di scoperta gastronomica privata a Da Nang. Preferiamo conoscere pochi piatti significativi, le persone che li preparano e il quartiere, invece di correre fra locali. Stiamo ancora verificando personalmente ristoranti e percorso.',
        audience: 'Coppie, amici e piccoli gruppi privati che vogliono avvicinarsi alla cucina locale con tempi adattabili e spiegazioni comprensibili.',
        route: ['Partiamo da hotel, esigenze alimentari e preferenze fra passeggiata e trasferimento organizzato.', 'Valutiamo specialità come mì Quảng e bánh xèo soltanto dopo aver verificato menù e disponibilità.', 'Prevediamo tempo per parlare di ingredienti e abitudini locali; le tappe saranno confermate dopo il sopralluogo.'],
        approach: ['Definiremo numero di assaggi e porzioni sulla base dei locali effettivamente selezionati.', 'Verificheremo direttamente con le cucine richieste vegetariane e ingredienti.', 'Questa proposta dà priorità al cibo; After Dark sarà dedicato soprattutto all’atmosfera serale della città.'],
        confirm: ['Ristoranti effettivi, preparazioni e informazioni sugli ingredienti.', 'Numero e quantità degli assaggi, bevande e trasferimenti inclusi.', 'Prezzo definitivo, durata, punto d’incontro, lingua della guida e cancellazione.'],
        questions: [
          { question: 'Che cosa mangiare a Da Nang?', answer: 'Mì Quảng e bánh xèo sono due idee regionali. Il menù reale dipenderà dai locali verificati e dalle vostre preferenze.' },
          { question: 'È un tour gastronomico privato?', answer: 'Stiamo progettando un’esperienza per piccoli gruppi privati. Itinerario e disponibilità saranno confermati dopo il sopralluogo.' },
          { question: 'Potete gestire vegetariani o allergie?', answer: 'Segnalate tutte le esigenze prima di programmare. Chiederemo informazioni alle cucine, senza promettere ambienti privi di allergeni.' },
          { question: 'Quanto costa il tour gastronomico?', answer: 'Non abbiamo ancora un prezzo GoVietStay confermato. Il preventivo dipenderà da tappe, assaggi, trasporto, guida e data verificati.' },
        ],
      },
    },
  },
  {
    slug: 'da-nang-city-stories-private-tour',
    translations: {
      en: {
        name: 'GoVietStay City Stories', title: 'Da Nang Private City Tour | City Stories | GoVietStay',
        description: 'Discover a proposed private Da Nang city experience built around neighbourhoods, culture and flexible stops. Exact route, transport, guide and price to be confirmed.',
        keywords: ['Da Nang city tour', 'private Da Nang city tour', 'Da Nang city attractions', 'Da Nang private sightseeing', 'Da Nang local guide'],
        intro: 'City Stories is a proposed private tour of Da Nang beyond a quick photograph at each landmark. We are designing a route that connects the city’s everyday life, riverside landscape and cultural stops without promising an exhausting full-day checklist.',
        audience: 'First-time visitors, families and small groups who want context, manageable walking and time to ask questions rather than a large fixed-departure bus itinerary.',
        route: ['Choose the theme first: daily life, markets, architecture, riverside or accessible city highlights.', 'Build a geographically sensible shortlist of stops such as the Han River area and an appropriate local market after checking access and opening times.', 'Agree walking, private-car segments and realistic breaks with the guide before confirming any tour.'],
        approach: ['Do not confuse a city tour with Ba Na Hills, Hoi An or Hue day trips; these remain separate products.', 'Offer alternatives for families or guests who prefer less walking only after verifying the vehicle.', 'Use a confirmed local guide to provide context rather than a sequence of photo stops.'],
        confirm: ['Final route, entrance fees, operating hours and realistic travel times.', 'Transport capacity, pickup zone and accessibility limitations.', 'Guide language availability, total price and exactly what is included.'],
        questions: [
          { question: 'What does a Da Nang city tour include?', answer: 'City Stories is still being designed. We are considering a coherent selection of city and local-life stops; tickets, transport and exact locations will be published only after verification.' },
          { question: 'Is Da Nang City Stories a private tour?', answer: 'A tailored private format is the plan, subject to the availability of a suitable guide and transport.' },
          { question: 'Does it include Ba Na Hills or Hoi An?', answer: 'No. Those are different full or half-day experiences. We can help plan them separately without calling them part of an unconfirmed city tour.' },
          { question: 'Can I request a Russian- or Italian-speaking guide?', answer: 'Share your date and language. We will check an actual guide’s availability rather than implying every language is included by default.' },
        ],
      },
      ru: {
        name: 'GoVietStay City Stories', title: 'Индивидуальная обзорная экскурсия по Данангу | City Stories | GoVietStay',
        description: 'Проект индивидуальной экскурсии по Данангу: городские районы, культура и гибкие остановки. Программа, транспорт, гид и цена требуют подтверждения.',
        keywords: ['обзорная экскурсия Дананг', 'индивидуальная экскурсия по Данангу', 'достопримечательности Дананга', 'гид в Дананге', 'экскурсии в Дананге'],
        intro: 'City Stories — будущая индивидуальная экскурсия по Данангу, где важны не только фотографии, но и истории города. Мы готовим маршрут с понятной географией, местной жизнью и комфортными паузами, без обещаний посетить все достопримечательности за один день.',
        audience: 'Тем, кто впервые приехал в город, семьям и небольшим компаниям, предпочитающим гибкий маршрут и объяснения гида большому экскурсионному автобусу.',
        route: ['Выберем интересную вам тему: местные рынки, жизнь районов, архитектура или набережная.', 'Составим логичный список возможных точек, например район реки Хан и подходящий рынок, после проверки режима работы.', 'Согласуем пешеходные участки, возможный автомобиль и перерывы до окончательного подтверждения.'],
        approach: ['Не включаем Бана-Хиллс, Хойан или Хюэ в описание городского тура: это самостоятельные поездки.', 'Для семей и гостей с ограничениями по ходьбе рассмотрим транспорт после проверки автомобиля.', 'Сделаем упор на проверенное сопровождение и понимание города, а не на гонку между остановками.'],
        confirm: ['Точки маршрута, входные билеты, часы работы и время переездов.', 'Вместимость машины, зона встречи и ограничения доступности.', 'Наличие гида на нужном языке, общая стоимость и точный состав услуг.'],
        questions: [
          { question: 'Что входит в обзорную экскурсию по Данангу?', answer: 'City Stories находится в разработке. Мы рассматриваем городские и местные остановки; список, билеты и транспорт опубликуем после проверки.' },
          { question: 'Это индивидуальная экскурсия?', answer: 'Да, индивидуальный формат — наша цель. Реальное бронирование зависит от наличия подходящего гида и транспорта.' },
          { question: 'Входит ли Бана-Хиллс или Хойан?', answer: 'Нет, это отдельные поездки. Мы можем составить программу на несколько дней, но не будем выдавать их за часть неподтверждённого городского тура.' },
          { question: 'Можно ли заказать русскоязычного или италоязычного гида?', answer: 'Сообщите дату и нужный язык. Мы отдельно проверим доступность конкретного гида; наличие языка не предполагается автоматически.' },
        ],
      },
      it: {
        name: 'GoVietStay City Stories', title: 'Tour privato della città di Da Nang | City Stories | GoVietStay',
        description: 'Proposta di visita privata di Da Nang fra quartieri, cultura e soste flessibili. Itinerario, mezzo, guida in italiano e prezzo soggetti a conferma.',
        keywords: ['tour privato Da Nang', 'tour della città Da Nang', 'cosa vedere a Da Nang', 'guida a Da Nang', 'escursioni Da Nang'],
        intro: 'City Stories è un progetto di visita privata a Da Nang che unisce i luoghi alla storia quotidiana della città. Vorremmo costruire un percorso ragionevole, con soste e racconti, senza trasformare la giornata in una corsa fra attrazioni.',
        audience: 'Visitatori alla prima esperienza, famiglie e piccoli gruppi interessati a capire la città, con tempi flessibili e senza un grande gruppo in autobus.',
        route: ['Sceglieremo un tema: vita dei quartieri, mercati, architettura o lungofiume.', 'Organizzeremo una sequenza geografica sensata, per esempio nell’area del fiume Han e di un mercato appropriato, dopo averne controllato gli orari.', 'Concordiamo tratti a piedi, eventuale auto privata e pause prima di confermare il programma.'],
        approach: ['Ba Na Hills, Hoi An e Hue non vengono impropriamente inclusi in un tour cittadino: sono escursioni separate.', 'Per le famiglie o chi cammina poco valuteremo soluzioni di trasporto soltanto dopo la verifica.', 'Le spiegazioni di una guida realmente disponibile avranno più spazio delle sole soste fotografiche.'],
        confirm: ['Tappe reali, biglietti, orari d’apertura e tempi di viaggio.', 'Capienza del veicolo, area di prelievo e accessibilità.', 'Disponibilità della lingua richiesta, prezzo totale e servizi inclusi.'],
        questions: [
          { question: 'Che cosa comprende un tour della città di Da Nang?', answer: 'City Stories è ancora un progetto. Elenco delle tappe, ingressi e trasporti saranno pubblicati solo dopo le verifiche.' },
          { question: 'È un tour privato?', answer: 'Il formato privato personalizzato è il nostro obiettivo, da confermare con guida e mezzo realmente disponibili.' },
          { question: 'Include Ba Na Hills oppure Hoi An?', answer: 'No: sono escursioni differenti, che possiamo organizzare separatamente senza dichiararle incluse in questo programma.' },
          { question: 'È disponibile una guida in italiano o russo?', answer: 'Comunicate data e lingua preferita. Verificheremo la disponibilità reale prima di confermare qualsiasi servizio linguistico.' },
        ],
      },
    },
  },
  {
    slug: 'da-nang-after-dark-night-tour',
    translations: {
      en: {
        name: 'GoVietStay After Dark', title: 'Da Nang Night Tour & Street Food | After Dark | GoVietStay',
        description: 'Plan a private Da Nang evening experience around the Han River, local food and city lights. Show times, stops, transport and optional cruise await verification.',
        keywords: ['Da Nang night tour', 'Da Nang night market', 'what to do in Da Nang at night', 'Da Nang evening food tour', 'Dragon Bridge night tour'],
        intro: 'After Dark is our proposed way to see another side of Da Nang: the river, lit-up streets and a relaxed local meal. The exact sequence must reflect your date, weather, actual opening hours and any event schedule, not a fixed promise copied from another tour.',
        audience: 'Couples, families and private groups seeking an easy evening after the beach or a day trip, especially those who prefer one organised plan to juggling several separate pickups.',
        route: ['Start with a confirmed city pickup and select a comfortable riverside or neighbourhood walk.', 'Consider a locally verified food stop based on your appetite and restaurant opening hours.', 'Add a viewpoint, market or river cruise only if operating on your date and explicitly included in the final quote.'],
        approach: ['Keep evening atmosphere and city views as the main purpose; the Taste Trails food route remains separate.', 'Verify any Dragon Bridge show or river cruise directly; neither is guaranteed or automatically included.', 'Plan weather alternatives and decide on walking versus vehicle transport before accepting bookings.'],
        confirm: ['Date-specific opening hours, events, weather and stop locations.', 'Whether a meal, drinks, tickets, cruise or transport is included or optional.', 'Verified guide language, total price, pickup and return arrangements.'],
        questions: [
          { question: 'What can I do in Da Nang at night?', answer: 'The Han River area, local dining and evening streets are possible ideas. Exact market hours, shows and activities vary and must be checked for your date.' },
          { question: 'Is the Dragon Bridge fire show included?', answer: 'No show is guaranteed in this draft. We will check the current schedule and whether a suitable viewing stop fits the final itinerary.' },
          { question: 'Does the Da Nang night tour include a cruise?', answer: 'A Han River cruise would be an optional element only if available, quoted and confirmed. It is not included by default.' },
          { question: 'What happens if it rains?', answer: 'Before confirming a tour, we will agree suitable covered stops, a transport change or a rescheduling policy. Safety and supplier conditions come first.' },
        ],
      },
      ru: {
        name: 'GoVietStay After Dark', title: 'Вечерняя экскурсия по Данангу и местная кухня | After Dark | GoVietStay',
        description: 'Проект индивидуальной вечерней прогулки по Данангу: река Хан, огни города и местная еда. Шоу, круиз, транспорт и цена уточняются.',
        keywords: ['вечерняя экскурсия Дананг', 'ночной Дананг', 'что делать в Дананге вечером', 'мост Дракона Дананг', 'еда в Дананге вечером'],
        intro: 'After Dark — наш проект спокойного вечера в Дананге: огни города, река Хан и местный ужин. Реальная программа будет зависеть от даты, погоды, часов работы и подтверждённого расписания мероприятий, а не от чужого типового маршрута.',
        audience: 'Парам, семьям и частным компаниям, желающим провести вечер после пляжа или дневной экскурсии без нескольких разрозненных поездок.',
        route: ['Начнём с подтверждённой встречи в городе и выберем удобный район для вечерней прогулки.', 'При желании рассмотрим проверенное место для местной еды с учётом его рабочего времени.', 'Добавим обзорную точку, рынок или речную прогулку только при реальной доступности и отдельном указании в согласованном предложении.'],
        approach: ['Главное здесь — вечерняя атмосфера; Taste Trails отдельно посвящён гастрономии.', 'Проверим расписание шоу на мосту Дракона и речных круизов; они не гарантированы и не включены автоматически.', 'Перед подтверждением тура согласуем альтернативы на случай дождя и способ передвижения.'],
        confirm: ['Часы работы, актуальные события, прогноз и конкретные остановки на вашу дату.', 'Включены ли еда, напитки, билеты, круиз или транспорт, либо это опции.', 'Язык сопровождения, полная цена и место встречи/возвращения.'],
        questions: [
          { question: 'Что делать в Дананге вечером?', answer: 'Возможны прогулка у реки Хан, местный ужин и знакомство с вечерними улицами. Часы рынков и мероприятия следует уточнить для конкретной даты.' },
          { question: 'Шоу огня на мосту Дракона входит в программу?', answer: 'В черновике мы его не гарантируем. Перед продажей проверим актуальное расписание и возможность удобной остановки.' },
          { question: 'Включён ли круиз по реке Хан?', answer: 'Только как возможная дополнительная услуга после подтверждения рейса, тарифа и состава предложения; по умолчанию он не включён.' },
          { question: 'А если пойдёт дождь?', answer: 'До бронирования согласуем крытые остановки, изменение транспорта либо перенос с учётом реальных условий и безопасности.' },
        ],
      },
      it: {
        name: 'GoVietStay After Dark', title: 'Da Nang di sera: tour privato e sapori locali | After Dark | GoVietStay',
        description: 'Proposta serale privata a Da Nang tra fiume Han, street food e luci della città. Eventi, crociera, trasporto e prezzo ancora da confermare.',
        keywords: ['Da Nang di sera', 'tour serale Da Nang', 'cosa fare a Da Nang la sera', 'ponte del Drago Da Nang', 'street food Da Nang sera'],
        intro: 'After Dark è il nostro progetto per vivere Da Nang dopo il tramonto: lungofiume, luci e una cena locale senza fretta. Il programma definitivo dovrà rispettare data, meteo, orari dei luoghi e calendario reale degli eventi.',
        audience: 'Coppie, famiglie e piccoli gruppi che cercano una serata organizzata dopo la spiaggia o un’escursione, evitando trasferimenti improvvisati.',
        route: ['Partiremo da un prelievo cittadino da confermare e da una zona piacevole per passeggiare.', 'Potremo selezionare una sosta gastronomica verificata in base agli orari e ai vostri gusti.', 'Mercato, punto panoramico o crociera saranno aggiunti soltanto se disponibili e chiaramente indicati nel preventivo.'],
        approach: ['Il tema principale è l’atmosfera serale; Taste Trails resta l’esperienza focalizzata sul cibo.', 'Spettacolo del Ponte del Drago e crociera richiedono controllo del calendario e non sono servizi automaticamente compresi.', 'Studieremo alternative per la pioggia e il trasporto prima di aprire le prenotazioni.'],
        confirm: ['Orari, eventi, meteo e tappe riferiti alla data scelta.', 'Quali pasti, bevande, biglietti, crociera e trasferimenti siano compresi o opzionali.', 'Lingua della guida, importo totale e luogo di partenza/rientro.'],
        questions: [
          { question: 'Cosa fare a Da Nang la sera?', answer: 'Il lungofiume Han, i ristoranti locali e le strade illuminate sono idee possibili. Mercati ed eventi devono essere controllati per la vostra data.' },
          { question: 'Lo spettacolo del Ponte del Drago è incluso?', answer: 'Non è garantito in questa bozza. Verificheremo calendario e possibilità di una sosta adatta prima di confermarlo.' },
          { question: 'È compresa una crociera sul fiume Han?', answer: 'Solo come eventuale opzione, se disponibile e inclusa espressamente nel preventivo. Non è compresa automaticamente.' },
          { question: 'Cosa succede in caso di pioggia?', answer: 'Prima di confermare definiremo eventuali soste al coperto, cambi di mezzo o riprogrammazione, nel rispetto della sicurezza.' },
        ],
      },
    },
  },
  {
    slug: 'da-nang-local-rider-motorbike-tour',
    translations: {
      en: {
        name: 'GoVietStay Local Rider', title: 'Da Nang Motorbike Tour with Local Rider | GoVietStay',
        description: 'Explore a proposed Da Nang motorbike passenger experience with a local rider. Safety, licensed operator, insurance, weather policy and itinerary must be verified first.',
        keywords: ['Da Nang motorbike tour', 'Da Nang scooter tour', 'Da Nang motorbike tour with driver', 'local rider Da Nang', 'Da Nang motorbike experience'],
        intro: 'Local Rider is our proposed way to experience the streets of Da Nang as a passenger rather than rent a scooter and drive yourself. We will not launch this experience until we have inspected the operator, vehicles, helmets, driving arrangements and weather policy.',
        audience: 'Adults interested in street-level discovery who are comfortable travelling as motorbike passengers. Suitability for children or guests with mobility needs must be assessed individually; no automatic family-safety promise.',
        route: ['Discuss comfort, passenger experience, pickup area and weather before suggesting any route.', 'Select short, suitable city stretches and local stops only after inspecting roads, riders and time requirements.', 'Agree rest breaks and a non-motorbike alternative where appropriate, rather than improvising in unsafe conditions.'],
        approach: ['Each passenger would have an assigned verified rider; exact group capacity remains unconfirmed.', 'The motorbike experience is distinct from a self-drive rental and from our private-car City Stories product.', 'Vehicle condition, suitable helmets, operator compliance and insurance terms will be checked; no guarantee is offered before that.'],
        confirm: ['Rider credentials, local legal requirements, vehicle condition, suitable helmets and applicable insurance.', 'Passenger eligibility, road selection, rain/wind policy and safe alternative transport.', 'Pickup, duration, guide language, food or ticket inclusions, price and cancellation terms.'],
        questions: [
          { question: 'Do I need to drive on this Da Nang motorbike tour?', answer: 'The proposed format is riding as a passenger with a local rider, not self-driving. We will confirm the exact arrangement and legal conditions before offering bookings.' },
          { question: 'Is a Da Nang motorbike tour safe?', answer: 'Motorbike travel involves risk and cannot be described as risk-free. We will assess rider credentials, equipment, insurance, route and conditions before deciding whether to launch.' },
          { question: 'Can children join the motorbike tour?', answer: 'We have not confirmed age or passenger eligibility. We will check applicable requirements and the specific child’s needs; a private car may be more suitable.' },
          { question: 'What happens during heavy rain?', answer: 'We will not promise riding in unsuitable conditions. Any alternative vehicle, reschedule or cancellation option must be agreed as part of a verified policy.' },
        ],
      },
      ru: {
        name: 'GoVietStay Local Rider', title: 'Мототур по Данангу с местным водителем | Local Rider | GoVietStay',
        description: 'Проект мотопрогулки по Данангу пассажиром с местным водителем. Перед запуском проверим безопасность, документы, страховку, маршрут и погоду.',
        keywords: ['мототур Дананг', 'экскурсия на мотоцикле Дананг', 'мотопрогулка Дананг', 'мототур с водителем Дананг', 'индивидуальные экскурсии Дананг'],
        intro: 'Local Rider — будущая возможность увидеть Дананг пассажиром мотоцикла с местным водителем, без самостоятельной аренды и управления. Мы не запустим маршрут, пока не проверим оператора, транспорт, шлемы, водителей и правила на случай непогоды.',
        audience: 'Взрослым путешественникам, которым интересен город с уровня улиц и комфортен формат пассажира. Возможность участия детей или людей с ограничениями подвижности определяется отдельно.',
        route: ['Обсудим опыт езды пассажиром, комфорт, место встречи и погодные условия.', 'Подберём короткие подходящие городские участки и остановки только после проверки дорог и водителей.', 'Заранее предусмотрим отдых и альтернативный транспорт там, где он будет уместнее.'],
        approach: ['Планируем водителя для каждого пассажира; допустимый размер группы пока не подтверждён.', 'Это не аренда мотоцикла для самостоятельной езды и не автомобильная экскурсия City Stories.', 'Проверим состояние техники, подходящие шлемы, документы оператора и условия страховки. До проверки гарантий не даём.'],
        confirm: ['Документы водителей, действующие требования, состояние техники, шлемы и страховку.', 'Допуск пассажиров, маршрут, правила при дожде и ветре, безопасные альтернативы.', 'Место встречи, время, язык, включённые услуги, стоимость и условия отмены.'],
        questions: [
          { question: 'Нужно ли самому управлять мотоциклом?', answer: 'Нет, мы рассматриваем поездку пассажиром с местным водителем. Конкретный формат и юридические требования будут подтверждены до продаж.' },
          { question: 'Безопасна ли мотопрогулка в Дананге?', answer: 'Поездка на мотоцикле связана с рисками. Сначала проверим документы водителей, шлемы, страховку, маршрут и условия; до этого не заявляем, что тур безопасен.' },
          { question: 'Можно ли участвовать с ребёнком?', answer: 'Возрастные ограничения и возможность участия пока не подтверждены. Проверим требования и особенности ребёнка; автомобиль может быть подходящей альтернативой.' },
          { question: 'Что будет во время сильного дождя?', answer: 'Не будем обещать езду в неподходящих условиях. Правила замены транспорта, переноса или отмены согласуем после проверки поставщика.' },
        ],
      },
      it: {
        name: 'GoVietStay Local Rider', title: 'Tour in moto a Da Nang con conducente locale | GoVietStay',
        description: 'Progetto di escursione a Da Nang come passeggero in moto con conducente locale. Da verificare sicurezza, documenti, assicurazione, meteo e itinerario.',
        keywords: ['tour in moto Da Nang', 'tour in scooter Da Nang', 'Da Nang in moto con conducente', 'escursione privata Da Nang', 'guida locale Da Nang'],
        intro: 'Local Rider è la nostra idea per conoscere le strade di Da Nang da passeggero, accompagnati da un conducente locale, senza noleggiare una moto da guidare da soli. Non lanceremo il servizio prima di controllare operatore, veicoli, caschi e piano per il maltempo.',
        audience: 'Adulti curiosi di esplorare la città su due ruote e a proprio agio come passeggeri. Idoneità di bambini e persone con mobilità ridotta da valutare singolarmente, senza promesse generiche.',
        route: ['Chiederemo esperienza, comfort, zona di partenza e previsioni prima di proporre un itinerario.', 'Sceglieremo brevi tratti cittadini e soste soltanto dopo aver valutato strade, conducenti e tempi.', 'Concordiamo pause e possibili alternative in automobile per evitare improvvisazioni in condizioni inadeguate.'],
        approach: ['L’idea è un conducente verificato per ogni passeggero; capienza del gruppo ancora da definire.', 'Non è un noleggio self-drive né il tour City Stories in auto privata.', 'Controlleremo veicoli, caschi idonei, conformità dell’operatore e assicurazione senza garantire nulla prima delle verifiche.'],
        confirm: ['Titoli dei conducenti, requisiti applicabili, mezzi, caschi e copertura assicurativa.', 'Idoneità dei passeggeri, percorso e regole per pioggia o vento, mezzo alternativo.', 'Prelievo, durata, lingua, eventuali pasti o ingressi, prezzo e cancellazione.'],
        questions: [
          { question: 'Devo guidare personalmente la moto?', answer: 'Il formato previsto è da passeggero con un conducente locale, non a guida autonoma. Condizioni effettive e requisiti saranno confermati prima delle prenotazioni.' },
          { question: 'Il tour in moto a Da Nang è sicuro?', answer: 'Il viaggio in moto comporta rischi. Verificheremo conducenti, attrezzatura, assicurazione, percorso e condizioni prima di decidere se lanciarlo.' },
          { question: 'Possono partecipare bambini?', answer: 'Non abbiamo ancora confermato i requisiti di età. Valuteremo norme e necessità individuali; un’auto privata potrebbe essere più adatta.' },
          { question: 'Cosa succede se piove molto?', answer: 'Non promettiamo di partire in condizioni inadatte. Trasporto alternativo, rinvio e cancellazione saranno precisati dopo il controllo del fornitore.' },
        ],
      },
    },
  },
];

export function getExperience(slug: string): Experience | undefined {
  return experiences.find((experience) => experience.slug === slug);
}

export function experienceUrl(locale: ExperienceLocale, slug: ExperienceSlug): string {
  return `${locale === 'en' ? '/travel' : `/${locale}`}/local-experiences/${slug}`;
}
