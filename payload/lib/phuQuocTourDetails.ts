export type PhuQuocTourDetail = {
  time: string;
  transportEn: string;
  transportRu: string;
  itineraryEn: string[];
  itineraryRu: string[];
  includesEn: string[];
  includesRu: string[];
  noteEn?: string;
  noteRu?: string;
};

export const PHU_QUOC_TOUR_DETAILS: Record<string, PhuQuocTourDetail> = {
  "TRIP 2": {
    time: "09:30–16:30",
    transportEn: "Tour boat",
    transportRu: "Туристическая лодка",
    itineraryEn: [
      "Hotel pickup in the confirmed pickup zone and transfer toward An Thoi Harbor.",
      "Board the boat and stop for about 30 minutes of traditional fishing with crew guidance.",
      "Continue to Xuong Island or Gam Ghi Island for snorkeling over natural coral reefs.",
      "Lunch is served on board.",
      "Relax at May Rut Trong Island: swim, walk the beach, take photos or enjoy free time by the lagoon.",
      "Return transfer to the hotel around 16:30."
    ],
    itineraryRu: [
      "Трансфер из отеля в подтверждённой зоне посадки и переезд к порту Ан Тхой.",
      "Посадка на лодку и около 30 минут традиционной рыбалки с помощью экипажа.",
      "Хон Сыонг или Гам Ги: снорклинг у природного кораллового рифа.",
      "Обед подаётся на борту.",
      "Мэй Рут Trong: купание, прогулка по пляжу, фотографии и свободное время у лагуны.",
      "Возвращение в отель примерно к 16:30."
    ],
    includesEn: ["Round-trip transfer in the confirmed standard pickup zone", "Tour boat", "English-speaking tour guide", "Lunch and drinking water", "Snorkeling and fishing equipment", "Life jackets"],
    includesRu: ["Трансфер туда/обратно в подтверждённой стандартной зоне", "Туристическая лодка", "Англоязычный гид по программе", "Обед и питьевая вода", "Снаряжение для снорклинга и рыбалки", "Спасательные жилеты"],
    noteEn: "Island choice and sequence can change with sea and weather conditions.",
    noteRu: "Острова и порядок посещения могут меняться из-за погоды и состояния моря."
  },

  "TRIP 3": {
    time: "08:30–17:00",
    transportEn: "Tour boat",
    transportRu: "Туристическая лодка",
    itineraryEn: [
      "Pickup and transfer to An Thoi Harbor.",
      "Xuong Island or Buom Island: first snorkeling stop in clear water.",
      "Gam Ghi Island: second snorkeling stop at one of Phu Quoc's larger coral areas.",
      "Lunch on board.",
      "May Rut Trong Island: beach time, swimming, photos and free time.",
      "Return to the hotel around 17:00."
    ],
    itineraryRu: [
      "Трансфер и переезд в порт Ан Тхой.",
      "Хон Сыонг или Хон Бом: первая остановка для снорклинга.",
      "Гам Ги: второй снорклинг у одного из крупных коралловых рифов Фукуока.",
      "Обед на борту.",
      "Мэй Рут Trong: пляж, купание, фотографии и свободное время.",
      "Возвращение в отель примерно к 17:00."
    ],
    includesEn: ["Round-trip transfer in the confirmed standard pickup zone", "Boat", "English-speaking tour guide", "Lunch and 1 bottle of water", "Mask, snorkel and fins subject to size availability", "Life jackets"],
    includesRu: ["Трансфер туда/обратно в подтверждённой стандартной зоне", "Лодка", "Англоязычный гид", "Обед и 1 бутылка воды", "Маска, трубка и ласты при наличии подходящего размера", "Спасательные жилеты"],
    noteEn: "The captain may substitute islands depending on actual sea conditions.",
    noteRu: "Капитан может заменить остров в зависимости от фактических условий на море."
  },

  "TRIP 4": {
    time: "08:30–17:30",
    transportEn: "Boat + cable car",
    transportRu: "Лодка + канатная дорога",
    itineraryEn: [
      "Pickup and transfer to An Thoi area.",
      "Snorkeling at Xuong Island or another suitable reef stop according to conditions.",
      "May Rut Trong Island: relax, swim and enjoy the island atmosphere.",
      "Continue to Hon Thom for Aquatopia Water Park.",
      "Ride the Hon Thom cable car for panoramic views over the southern archipelago.",
      "Return to the hotel around 17:30."
    ],
    itineraryRu: [
      "Трансфер в район Ан Тхой.",
      "Снорклинг у Хон Сыонг или другого подходящего рифа по погодным условиям.",
      "Мэй Рут Trong: отдых, купание и свободное время на острове.",
      "Переезд на Хон Тхом и посещение Aquatopia.",
      "Поездка по канатной дороге Хон Тхом с панорамным видом на южный архипелаг.",
      "Возвращение в отель примерно к 17:30."
    ],
    includesEn: ["Round-trip transfer", "Boat", "Cable car and Aquatopia admission under the confirmed program", "English-speaking guide", "Lunch and drinking water", "Snorkeling equipment and life jackets"],
    includesRu: ["Трансфер туда/обратно", "Лодка", "Билет на канатную дорогу и Aquatopia по подтверждённой программе", "Англоязычный гид", "Обед и питьевая вода", "Снаряжение для снорклинга и спасательные жилеты"],
    noteEn: "The cable-car/island sequence may be reversed without notice for operational or weather reasons.",
    noteRu: "Порядок островов и канатной дороги может быть изменён по погодным или операционным причинам."
  },

  "OPTION 2": {
    time: "17:00–21:00",
    transportEn: "Boat",
    transportRu: "Лодка",
    itineraryEn: [
      "Pickup before departure and transfer to Duong Dong Harbor or the confirmed seasonal departure point.",
      "Cruise out while enjoying the evening scenery; sunset viewing is weather and season dependent.",
      "Stop at the fishing area and learn the basic technique for traditional night squid fishing.",
      "The crew can cook the catch when conditions allow.",
      "Enjoy a light dinner on board while cruising back.",
      "Return to the hotel around 21:00."
    ],
    itineraryRu: [
      "Трансфер перед отправлением к порту Зыонг Донг или к подтверждённой сезонной точке отправления.",
      "Морская прогулка; наблюдение заката зависит от сезона и погоды.",
      "Остановка для ночной ловли кальмара и объяснение техники рыбалки.",
      "При возможности экипаж приготовит ваш улов.",
      "Лёгкий ужин на борту по пути обратно.",
      "Возвращение в отель примерно к 21:00."
    ],
    includesEn: ["Round-trip transfer in the confirmed pickup zone", "Boat", "English-speaking guide", "Light dinner and water", "Local squid-fishing equipment", "Life jackets"],
    includesRu: ["Трансфер туда/обратно в подтверждённой зоне", "Лодка", "Англоязычный гид", "Лёгкий ужин и вода", "Снаряжение для ловли кальмара", "Спасательные жилеты"],
    noteEn: "During the rainy season the departure point can move to Sao Beach or An Thoi and sunset viewing may not be available.",
    noteRu: "В сезон дождей отправление может быть перенесено на Бãi Sao или Ан Тхой; наблюдение заката не гарантируется."
  },

  "CANO TRIP": {
    time: "08:30–16:00",
    transportEn: "Speedboat",
    transportRu: "Скоростной катер",
    itineraryEn: [
      "Pickup and transfer to An Thoi Harbor.",
      "Board the speedboat for the southern islands.",
      "Xuong Island or Buom Island: snorkeling in clear water.",
      "Gam Ghi Island: second snorkeling stop among coral and rock formations.",
      "May Rut Trong Island: lunch, swimming, beach relaxation and photo time.",
      "Optional Seawalker is available at extra cost when operating.",
      "Return to the hotel around 16:00."
    ],
    itineraryRu: [
      "Трансфер в порт Ан Тхой.",
      "Посадка на скоростной катер и выход к южным островам.",
      "Хон Сыонг или Хон Бом: снорклинг в прозрачной воде.",
      "Гам Ги: второй снорклинг среди кораллов и скальных образований.",
      "Мэй Рут Trong: обед, купание, пляжный отдых и фотографии.",
      "Seawalker возможен за дополнительную плату, если услуга доступна.",
      "Возвращение в отель примерно к 16:00."
    ],
    includesEn: ["Round-trip transfer in the confirmed standard pickup zone", "Speedboat", "English-speaking guide", "Lunch and water", "Snorkeling equipment and life jackets", "Drone photo/video benefit when the service is operating"],
    includesRu: ["Трансфер туда/обратно в подтверждённой стандартной зоне", "Скоростной катер", "Англоязычный гид", "Обед и вода", "Снаряжение для снорклинга и спасательные жилеты", "Съёмка дроном, когда услуга доступна"],
    noteEn: "Seawalker and other optional island activities are not included.",
    noteRu: "Seawalker и другие дополнительные активности на островах не включены."
  },

  "CABLE CAR TRIP": {
    time: "08:30–17:30",
    transportEn: "Speedboat + cable car",
    transportRu: "Скоростной катер + канатная дорога",
    itineraryEn: [
      "Pickup and transfer to An Thoi Harbor.",
      "Speedboat to Xuong or Buom Island for snorkeling.",
      "Gam Ghi Island: additional snorkeling at a major coral area.",
      "May Rut Trong Island: lunch and beach relaxation.",
      "Hon Thom: Aquatopia Water Park.",
      "Hon Thom cable car, approximately 25 minutes, with panoramic views over the islands and fishing villages.",
      "Return to the hotel around 17:30."
    ],
    itineraryRu: [
      "Трансфер в порт Ан Тхой.",
      "Скоростной катер к Хон Сыонг или Хон Бом для снорклинга.",
      "Гам Ги: дополнительный снорклинг у крупного кораллового рифа.",
      "Мэй Рут Trong: обед и пляжный отдых.",
      "Хон Тхом: аквапарк Aquatopia.",
      "Канатная дорога Хон Тхом, около 25 минут, с панорамным видом на острова и рыбацкие деревни.",
      "Возвращение в отель примерно к 17:30."
    ],
    includesEn: ["Round-trip transfer", "Speedboat", "Cable car and Aquatopia ticket", "English-speaking guide", "Lunch according to the confirmed program and drinking water", "Snorkeling equipment and life jackets", "Drone photo/video benefit when operating"],
    includesRu: ["Трансфер туда/обратно", "Скоростной катер", "Канатная дорога и билет Aquatopia", "Англоязычный гид", "Обед по подтверждённой программе и вода", "Снаряжение для снорклинга и спасательные жилеты", "Съёмка дроном, когда услуга доступна"],
    noteEn: "The operator may reverse the cable-car and island sequence. Optional island services are extra.",
    noteRu: "Оператор может изменить порядок канатной дороги и островов. Дополнительные услуги оплачиваются отдельно."
  },

  "BBQ TRIP": {
    time: "13:00–19:00",
    transportEn: "Speedboat",
    transportRu: "Скоростной катер",
    itineraryEn: [
      "Afternoon departure toward the southern An Thoi archipelago.",
      "Snorkeling at Xuong Island or another suitable coral stop.",
      "Continue to May Rut Trong Island for swimming, photos and beach time.",
      "Relax into the late afternoon and enjoy the sunset atmosphere.",
      "Seafood BBQ dinner on the island.",
      "Return after sunset, around 19:00."
    ],
    itineraryRu: [
      "Дневное отправление к южному архипелагу Ан Тхой.",
      "Снорклинг у Хон Сыонг или другого подходящего кораллового места.",
      "Мэй Рут Trong: купание, фотографии и пляжный отдых.",
      "Свободное время до заката.",
      "BBQ-ужин с морепродуктами на острове.",
      "Возвращение после заката, примерно к 19:00."
    ],
    includesEn: ["Round-trip transfer in the confirmed pickup zone", "Speedboat", "English-speaking guide", "Snorkeling equipment and life jackets", "BBQ dinner", "Drinking water", "Drone benefit when operating"],
    includesRu: ["Трансфер туда/обратно в подтверждённой зоне", "Скоростной катер", "Англоязычный гид", "Снаряжение для снорклинга и спасательные жилеты", "BBQ-ужин", "Питьевая вода", "Съёмка дроном, когда услуга доступна"],
    noteEn: "Sunset visibility and snorkeling locations depend on weather and sea conditions.",
    noteRu: "Видимость заката и место снорклинга зависят от погоды и состояния моря."
  },

  "LUXURY TRIP": {
    time: "08:30–16:00",
    transportEn: "Speedboat · maximum 15 guests",
    transportRu: "Скоростной катер · максимум 15 гостей",
    itineraryEn: [
      "Pickup and transfer to An Thoi Harbor.",
      "Speedboat departure with a small-group format of up to 15 guests.",
      "Xuong Island: snorkeling.",
      "Buom Island: additional coral exploration.",
      "Gam Ghi Island: more snorkeling in clear shallow water.",
      "May Rut Trong Island: welcome drink, lunch and free time for swimming, photos, kayaking or SUP when available.",
      "Return to the hotel around 16:00."
    ],
    itineraryRu: [
      "Трансфер в порт Ан Тхой.",
      "Отправление на скоростном катере в малой группе до 15 гостей.",
      "Хон Сыонг: снорклинг.",
      "Хон Бом: ещё одна коралловая локация.",
      "Гам Ги: дополнительный снорклинг в прозрачной мелкой воде.",
      "Мэй Рут Trong: welcome drink, обед и свободное время для купания, фото, каяка или SUP при доступности.",
      "Возвращение в отель примерно к 16:00."
    ],
    includesEn: ["Round-trip transfer", "Small-group speedboat", "English-speaking guide", "Welcome drink", "Lunch and water", "Snorkeling equipment and life jackets", "Drone benefit when operating"],
    includesRu: ["Трансфер туда/обратно", "Скоростной катер для небольшой группы", "Англоязычный гид", "Welcome drink", "Обед и вода", "Снаряжение для снорклинга и спасательные жилеты", "Съёмка дроном, когда услуга доступна"],
    noteEn: "The exact island sequence can change with sea conditions.",
    noteRu: "Точный порядок островов может меняться в зависимости от состояния моря."
  },

  "ISLAND LIFE": {
    time: "09:00–16:30",
    transportEn: "Speedboat · maximum 12 guests",
    transportRu: "Скоростной катер · максимум 12 гостей",
    itineraryEn: [
      "08:45–09:00 pickup; depart around 09:00.",
      "09:30 arrive at An Thoi Harbor and board the speedboat.",
      "10:00 traditional handline fishing with crew support.",
      "11:00 snorkeling at an unspoiled reef.",
      "12:30 relax on the island while lunch is prepared.",
      "13:00 island-style private BBQ lunch with free beer under the program.",
      "15:30 swimming, snorkeling, coastline walk and sunbathing.",
      "16:00 return to harbor; around 16:30 back at the hotel."
    ],
    itineraryRu: [
      "08:45–09:00 трансфер; отправление около 09:00.",
      "09:30 прибытие в порт Ан Тхой и посадка на скоростной катер.",
      "10:00 традиционная рыбалка с помощью экипажа.",
      "11:00 снорклинг у малолюдного природного рифа.",
      "12:30 отдых на острове, пока готовится обед.",
      "13:00 островной BBQ-обед с бесплатным пивом по программе.",
      "15:30 купание, снорклинг, прогулка вдоль берега и солнечные ванны.",
      "16:00 возвращение в порт; около 16:30 — в отель."
    ],
    includesEn: ["Round-trip transfer", "Speedboat", "Guide", "Fishing and snorkeling activities", "Island BBQ lunch under the confirmed program", "Drinking water and life jackets"],
    includesRu: ["Трансфер туда/обратно", "Скоростной катер", "Гид", "Рыбалка и снорклинг", "Островной BBQ-обед по подтверждённой программе", "Питьевая вода и спасательные жилеты"],
    noteEn: "Designed as a small-group island experience; availability should be reconfirmed before payment.",
    noteRu: "Формат рассчитан на небольшую группу; наличие мест подтверждается до оплаты."
  },

  "CAMPING": {
    time: "2 days / 1 night · Day 1 08:30 to Day 2 17:00",
    transportEn: "Boat",
    transportRu: "Лодка",
    itineraryEn: [
      "Day 1: pickup and transfer to An Thoi Harbor.",
      "Xuong or Buom Island: snorkeling.",
      "Gam Ghi Island: second snorkeling stop.",
      "Lunch on board.",
      "May Rut Trong Island: check in to the campsite, relax and enjoy optional island activities.",
      "Sunset BBQ dinner, campfire atmosphere and overnight in a private tent.",
      "Day 2: breakfast and free time on the island.",
      "Lunch at the island restaurant around 12:00–13:00.",
      "Around 15:00 board the boat; return to the hotel around 17:00."
    ],
    itineraryRu: [
      "День 1: трансфер и переезд в порт Ан Тхой.",
      "Хон Сыонг или Хон Бом: снорклинг.",
      "Гам Ги: вторая остановка для снорклинга.",
      "Обед на борту.",
      "Мэй Рут Trong: размещение в кемпинге, отдых и дополнительные островные активности.",
      "BBQ на закате, атмосфера у костра и ночь в отдельной палатке.",
      "День 2: завтрак и свободное время на острове.",
      "Обед в островном ресторане примерно 12:00–13:00.",
      "Около 15:00 посадка на лодку; возвращение в отель примерно к 17:00."
    ],
    includesEn: ["Round-trip transfer and tourism boat", "English-speaking guide", "Tent for 2 people", "1 breakfast + 2 lunches + 1 BBQ dinner", "Water", "Snorkeling equipment", "Life jackets"],
    includesRu: ["Трансфер туда/обратно и туристическая лодка", "Англоязычный гид", "Палатка на 2 человека", "1 завтрак + 2 обеда + 1 BBQ-ужин", "Вода", "Снаряжение для снорклинга", "Спасательные жилеты"],
    noteEn: "Advance booking is required. The island plan can change in poor weather.",
    noteRu: "Требуется предварительное бронирование. При плохой погоде островная программа может измениться."
  },

  "LAND TOUR 1": {
    time: "09:00–16:30",
    transportEn: "Car",
    transportRu: "Автомобиль",
    itineraryEn: [
      "Pearl Farm: learn how pearls are cultivated and extracted.",
      "Sim Wine Factory: learn about Phu Quoc rose-myrtle products and taste selected products.",
      "Pepper Farm: see local pepper cultivation.",
      "Fish Sauce Factory: visit a traditional barrel house and learn the production process.",
      "Ho Quoc Pagoda: panoramic ocean and mountain views.",
      "Sao Beach: lunch, swimming and beach time.",
      "Coconut Prison historical site.",
      "Sunset Town: walk through the Mediterranean-style area, Clock Tower and Kiss Bridge viewpoint.",
      "Return to the hotel around 16:30."
    ],
    itineraryRu: [
      "Жемчужная ферма: как выращивают и извлекают жемчуг.",
      "Фабрика сим-вина: знакомство с местными продуктами из мирта и дегустация отдельных продуктов.",
      "Перечная ферма: традиционное выращивание перца Фукуока.",
      "Фабрика рыбного соуса: посещение традиционного производства в деревянных бочках.",
      "Пагода Хо Куок: панорамный вид на море и горы.",
      "Пляж Бай Сао: обед, купание и отдых.",
      "Исторический объект Coconut Prison.",
      "Sunset Town: прогулка по средиземноморскому кварталу, Clock Tower и смотровая у Kiss Bridge.",
      "Возвращение в отель примерно к 16:30."
    ],
    includesEn: ["Round-trip car", "English-speaking guide", "Lunch", "1 bottle of water"],
    includesRu: ["Автомобиль туда/обратно", "Англоязычный гид", "Обед", "1 бутылка воды"],
    noteEn: "Guests who choose to remain at Sunset Town after the tour arrange their own later return and any extra tickets.",
    noteRu: "Если вы решите остаться в Sunset Town после программы, обратный трансфер и дополнительные билеты организуются самостоятельно."
  },

  "LAND TOUR 2": {
    time: "08:30–16:00",
    transportEn: "Car + kayak + seasonal motorboat",
    transportRu: "Автомобиль + каяк + сезонная моторная лодка",
    itineraryEn: [
      "Cua Can River: kayaking and observing local river life.",
      "Bee Farm: learn about honey production and taste local honey.",
      "Light forest walk.",
      "Rach Vem fishing village and lunch.",
      "Motorboat to Ham Rong Cape and Starfish Beach during the dry season, generally November to April.",
      "Swimming at Starfish Beach when conditions allow.",
      "Silk House.",
      "Return to the hotel around 16:00; optional drop at Grand World can be requested."
    ],
    itineraryRu: [
      "Река Кыа Кан: прогулка на каяке и знакомство с местной речной жизнью.",
      "Пчелиная ферма: производство мёда и дегустация.",
      "Лёгкая прогулка по лесу.",
      "Рыбацкая деревня Рạch Vẹm и обед.",
      "В сухой сезон, обычно с ноября по апрель, моторная лодка к мысу Hàm Rồng и Starfish Beach.",
      "Купание на Starfish Beach, если позволяют условия.",
      "Silk House.",
      "Возвращение в отель примерно к 16:00; по запросу возможна высадка у Grand World."
    ],
    includesEn: ["Round-trip car", "English-speaking guide", "Lunch", "1 bottle of water", "Kayaking activity under the confirmed program"],
    includesRu: ["Автомобиль туда/обратно", "Англоязычный гид", "Обед", "1 бутылка воды", "Каякинг по подтверждённой программе"],
    noteEn: "Ham Rong / Starfish Beach access is seasonal. Paid attractions inside Grand World are not included.",
    noteRu: "Посещение Hàm Rồng / Starfish Beach сезонное. Платные аттракционы Grand World не включены."
  },

  "LAND TOUR 4": {
    time: "09:00–16:30",
    transportEn: "Car + cable car",
    transportRu: "Автомобиль + канатная дорога",
    itineraryEn: [
      "Pearl Farm.",
      "Ho Quoc Pagoda with panoramic sea views.",
      "Coconut Prison historical site.",
      "Sao Beach.",
      "Check in at An Thoi Cable Car Station.",
      "Ride the Hon Thom cable car for about 25 minutes.",
      "Aquatopia Water Park with multiple themed zones and rides.",
      "Return to the hotel around 16:30."
    ],
    itineraryRu: [
      "Жемчужная ферма.",
      "Пагода Хо Куок с панорамным видом на море.",
      "Исторический объект Coconut Prison.",
      "Пляж Бай Сао.",
      "Станция канатной дороги Ан Тхой.",
      "Поездка по канатной дороге Хон Тхом около 25 минут.",
      "Аквапарк Aquatopia с тематическими зонами и аттракционами.",
      "Возвращение в отель примерно к 16:30."
    ],
    includesEn: ["Round-trip car", "Cable car and Aquatopia entrance ticket", "English-speaking guide", "Lunch", "1 bottle of water"],
    includesRu: ["Автомобиль туда/обратно", "Билет на канатную дорогу и Aquatopia", "Англоязычный гид", "Обед", "1 бутылка воды"],
    noteEn: "Water-park operations can change for maintenance; the final sequence is reconfirmed before departure.",
    noteRu: "Работа аквапарка может меняться из-за технического обслуживания; окончательный порядок подтверждается перед выездом."
  }
};
