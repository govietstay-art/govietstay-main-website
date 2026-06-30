export type DaoLanguage = "vi" | "en" | "ru";

export type DaoMatch = {
  reply: string;
  intent: string;
  score: number;
};

const WHATSAPP = "+84 937 762 607";
const WEBSITE = "https://GoVietStay.com";

function normalize(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9а-яё\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function detectLanguage(message: string): DaoLanguage {
  if (/[а-яё]/i.test(message)) return "ru";

  const raw = message.toLowerCase();
  const viHints = [
    "anh", "chị", "em", "mình", "bao nhiêu", "giá", "đi", "tua", "tour", "vé", "xe", "đón", "sân bay",
    "đà nẵng", "hội an", "bà nà", "huế", "khách", "người", "ngày"
  ];
  if (viHints.some((w) => raw.includes(w))) return "vi";

  return "en";
}

function hasAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(normalize(keyword)));
}

const replies = {
  greeting: {
    vi: `Dạ em đây anh/chị. Em có thể hỗ trợ nhanh về Đà Nẵng, Hội An, Huế, vé Bà Nà, xe sân bay, tour riêng và gợi ý local.\n\nAnh/chị đang cần hỏi về lịch trình, vé hay xe ạ?`,
    en: `I’m here to help with Da Nang, Hoi An, Hue, Ba Na Hills tickets, airport transfer, private tours and local tips.\n\nAre you looking for an itinerary, tickets, or transportation?`,
    ru: `Я могу помочь с Данангом, Хойаном, Хюэ, билетами Ba Na Hills, трансфером, частными турами и местными советами.\n\nВам нужна программа, билеты или транспорт?`,
  },

  price: {
    vi: `Dạ em kiểm tra được. Giá thường phụ thuộc vào ngày đi, số khách, điểm đón và mình cần vé lẻ hay trọn gói có xe/hướng dẫn viên.\n\nNhóm mình có bao nhiêu người ạ?`,
    en: `Yes, I can help check that. The price usually depends on travel date, number of guests, pickup location, and whether you need ticket only or full service.\n\nHow many people are traveling?`,
    ru: `Да, я могу помочь проверить. Цена зависит от даты, количества гостей, места встречи и формата: только билет или полный сервис.\n\nСколько человек едет?`,
  },

  contact: {
    vi: `Dạ anh/chị có thể liên hệ GoVietStay nhanh nhất qua WhatsApp/Zalo: ${WHATSAPP}.\n\nWebsite: ${WEBSITE}`,
    en: `You can contact GoVietStay fastest by WhatsApp/Zalo: ${WHATSAPP}.\n\nWebsite: ${WEBSITE}`,
    ru: `Быстрее всего можно связаться с GoVietStay через WhatsApp/Zalo: ${WHATSAPP}.\n\nСайт: ${WEBSITE}`,
  },

  bana: {
    vi: `Bà Nà Hills hợp với khách lần đầu đến Đà Nẵng, nhất là muốn xem Cầu Vàng và chụp hình.\n\nMẹo nhỏ: nên đi sớm trước 8:00 để đỡ đông và thoải mái hơn. Gia đình có trẻ em nên dành khoảng 6–7 tiếng.\n\nAnh/chị muốn hỏi vé lẻ hay tour có xe đưa đón ạ?`,
    en: `Ba Na Hills is a good choice for first-time visitors, especially for the Golden Bridge and photos.\n\nSmall tip: going before 8:00 AM usually feels more comfortable and less crowded. Families should keep around 6–7 hours.\n\nDo you need ticket only or a tour with pickup?`,
    ru: `Ba Na Hills хорошо подходит для первого визита в Дананг, особенно ради Golden Bridge и фото.\n\nСовет: лучше ехать до 8:00 утра, так обычно комфортнее и меньше людей.\n\nВам нужны только билеты или тур с трансфером?`,
  },

  banaPrice: {
    vi: `Giá vé Bà Nà tham khảo 2026 cho khách du lịch: cáp treo 2 chiều người lớn 1.000.000đ, trẻ em 800.000đ. Combo cáp treo + buffet người lớn 1.300.000đ, trẻ em 1.000.000đ.\n\nGiá cuối nên kiểm tra lại theo ngày đi. Mình đi bao nhiêu người ạ?`,
    en: `Ba Na Hills 2026 reference ticket price for tourists: round-trip cable car adult 1,000,000 VND, child 800,000 VND. Cable car + buffet: adult 1,300,000 VND, child 1,000,000 VND.\n\nFinal availability should be checked by date. How many people are going?`,
    ru: `Ориентировочная цена Ba Na Hills 2026: канатная дорога туда-обратно взрослый 1,000,000 VND, ребенок 800,000 VND. Канатная дорога + buffet: взрослый 1,300,000 VND, ребенок 1,000,000 VND.\n\nТочную цену лучше проверить по дате. Сколько человек едет?`,
  },

  hoian: {
    vi: `Hội An đẹp nhất là đi chiều muộn và ở lại buổi tối để xem đèn lồng.\n\nMẹo nhỏ: nhiều khách đi quá sớm nên bị nắng và mệt. Nếu đi sau 16:00–17:00 sẽ dễ chịu hơn.\n\nAnh/chị đang ở Đà Nẵng hay Hội An ạ?`,
    en: `Hoi An is best in the late afternoon and evening for the lantern atmosphere.\n\nSmall tip: many travelers go too early and feel tired from the heat. After 4–5 PM is usually nicer.\n\nAre you staying in Da Nang or Hoi An?`,
    ru: `Хойан лучше всего посещать ближе к вечеру, когда зажигаются фонарики.\n\nСовет: если ехать слишком рано, может быть жарко и утомительно. После 16:00–17:00 обычно приятнее.\n\nВы остановились в Дананге или Хойане?`,
  },

  hue: {
    vi: `Huế hợp với khách thích lịch sử, văn hóa và ẩm thực địa phương như bún bò Huế.\n\nNếu đi từ Đà Nẵng, nên đi nguyên ngày vì đường khá xa, lịch trình cần vừa đủ để không mệt.\n\nAnh/chị muốn đi Huế trong ngày hay ngủ lại 1 đêm ạ?`,
    en: `Hue is great if you enjoy history, culture and local food like Bun Bo Hue.\n\nFrom Da Nang, it is better as a full-day trip because the drive takes time.\n\nDo you prefer a day trip or staying one night in Hue?`,
    ru: `Хюэ хорошо подходит тем, кто любит историю, культуру и местную кухню.\n\nИз Дананга лучше планировать полный день, потому что дорога занимает время.\n\nВы хотите поехать на один день или остаться на ночь?`,
  },

  airport: {
    vi: `GoVietStay có hỗ trợ xe sân bay Đà Nẵng về khách sạn.\n\nGiá tham khảo: xe 4 chỗ 120.000đ, 7 chỗ 150.000đ, 16 chỗ 300.000đ. Giá có thể thay đổi theo điểm đón/trả và thời gian.\n\nAnh/chị cần đón ở sân bay hay từ khách sạn ra sân bay ạ?`,
    en: `GoVietStay can support Da Nang airport transfer to your hotel.\n\nReference price: 4-seat car 120,000 VND, 7-seat car 150,000 VND, 16-seat van 300,000 VND. Final price may depend on pickup/drop-off and time.\n\nDo you need airport pickup or hotel-to-airport transfer?`,
    ru: `GoVietStay может помочь с трансфером из аэропорта Дананга в отель.\n\nОриентир: 4 места 120,000 VND, 7 мест 150,000 VND, 16 мест 300,000 VND. Цена зависит от адреса и времени.\n\nВам нужен трансфер из аэропорта или из отеля в аэропорт?`,
  },

  car: {
    vi: `Dạ có xe riêng đi Đà Nẵng, Hội An, Huế, Bà Nà hoặc theo lịch trình riêng.\n\nMẹo nhỏ: nếu đi gia đình hoặc có người lớn tuổi, xe riêng sẽ thoải mái hơn tour ghép.\n\nAnh/chị muốn đi từ đâu đến đâu ạ?`,
    en: `Yes, private car is available for Da Nang, Hoi An, Hue, Ba Na Hills or a custom route.\n\nSmall tip: for families or elderly travelers, private car is usually more comfortable than shared tours.\n\nWhere would you like to go from and to?`,
    ru: `Да, есть частный автомобиль для Дананга, Хойана, Хюэ, Ba Na Hills или индивидуального маршрута.\n\nДля семьи или пожилых гостей частная машина обычно комфортнее группового тура.\n\nОткуда и куда вы хотите ехать?`,
  },

  food: {
    vi: `Ở Đà Nẵng nên thử mì Quảng, bún chả cá, bánh xèo, hải sản và cà phê địa phương.\n\nEm khuyên nên chọn quán local sạch, dễ ăn trước; không cần vội đặt food tour.\n\nAnh/chị thích đồ local bình dân, hải sản hay quán sạch phù hợp gia đình ạ?`,
    en: `In Da Nang, you should try Mi Quang, Bun Cha Ca, Banh Xeo, seafood and local Vietnamese coffee.\n\nI suggest starting with clean local places first; no need to rush into a food tour.\n\nDo you prefer street local food, seafood, or clean family-friendly restaurants?`,
    ru: `В Дананге стоит попробовать Mi Quang, Bun Cha Ca, Banh Xeo, морепродукты и местный кофе.\n\nЛучше начать с чистых местных заведений, не обязательно сразу брать food tour.\n\nВам больше интересна уличная еда, морепродукты или чистый ресторан для семьи?`,
  },

  hiddenGems: {
    vi: `Nếu muốn chỗ local hơn ở Đà Nẵng, anh/chị có thể xem Sơn Trà, Cây Đa Ngàn Năm, Đỉnh Bàn Cờ, Ghềnh Bàng, Nam Ô hoặc các điểm ngắm Hải Vân.\n\nMẹo nhỏ: nên đi sáng sớm hoặc chiều mát, tránh nắng gắt.\n\nAnh/chị thích biển, núi hay chỗ chụp hình ạ?`,
    en: `For more local places in Da Nang, you can explore Son Tra, Thousand-Year Banyan Tree, Ban Co Peak, Ghenh Bang, Nam O, or Hai Van viewpoints.\n\nSmall tip: early morning or late afternoon is usually better than midday heat.\n\nDo you prefer beach, mountain, or photo spots?`,
    ru: `Если хотите более местные места в Дананге: Son Tra, Thousand-Year Banyan Tree, Ban Co Peak, Ghenh Bang, Nam O или смотровые точки Hai Van.\n\nСовет: лучше ехать утром или ближе к вечеру, не в сильную жару.\n\nВам больше нравится море, горы или места для фото?`,
  },

  itinerary: {
    vi: `Dạ được. Đà Nẵng nên đi lịch trình vừa đủ, đừng nhồi quá nhiều.\n\nNếu lần đầu đến, thường nên kết hợp Bà Nà, Hội An, Sơn Trà, Ngũ Hành Sơn và một buổi ăn local.\n\nAnh/chị ở Đà Nẵng mấy ngày ạ?`,
    en: `Sure. For Da Nang, it is better not to overload the schedule.\n\nFor a first visit, Ba Na Hills, Hoi An, Son Tra, Marble Mountains and one local food experience usually work well.\n\nHow many days will you stay in Da Nang?`,
    ru: `Конечно. В Дананге лучше не перегружать программу.\n\nДля первого визита хорошо подходят Ba Na Hills, Хойан, Son Tra, Marble Mountains и местная еда.\n\nСколько дней вы будете в Дананге?`,
  },

  family: {
    vi: `Nếu đi gia đình, mình nên ưu tiên lịch trình nhẹ, ít di chuyển và có thời gian nghỉ.\n\nCác điểm hợp gia đình thường là Bà Nà, Hội An buổi tối, Rừng Dừa, du thuyền sông Hàn và Ngũ Hành Sơn.\n\nTrong nhóm mình có trẻ em hoặc người lớn tuổi không ạ?`,
    en: `For families, it is better to keep the schedule comfortable with less rushing.\n\nGood options are Ba Na Hills, Hoi An evening, Coconut Forest, Han River Cruise and Marble Mountains.\n\nAre there children or elderly travelers in your group?`,
    ru: `Для семьи лучше сделать программу спокойной, без спешки и с временем на отдых.\n\nХорошие варианты: Ba Na Hills, вечерний Хойан, Coconut Forest, Han River Cruise и Marble Mountains.\n\nВ группе есть дети или пожилые гости?`,
  },

  russian: {
    vi: `Dạ GoVietStay có hỗ trợ khách nói tiếng Nga. Có thể tư vấn bằng tiếng Nga và sắp xếp hỗ trợ phù hợp khi cần.\n\nAnh/chị muốn hỏi tour nào cho khách Nga ạ?`,
    en: `Yes, GoVietStay has Russian-speaking support. We can assist Russian travelers with advice and suitable travel arrangements.\n\nWhich experience are you asking about?`,
    ru: `Да, у GoVietStay есть поддержка на русском языке. Мы можем помочь с консультацией, трансфером, билетами и турами.\n\nКакой тур или направление вас интересует?`,
  },

  cham: {
    vi: `Cù Lao Chàm hợp với khách thích biển, lặn ngắm san hô và đi trong ngày từ Đà Nẵng/Hội An.\n\nMẹo nhỏ: tour này phụ thuộc thời tiết biển, nên cần kiểm tra trước ngày đi.\n\nAnh/chị muốn đi ngày nào ạ?`,
    en: `Cham Island is good for beach, snorkeling and a day trip from Da Nang or Hoi An.\n\nSmall tip: this trip depends on sea weather, so it is better to check before the travel date.\n\nWhat date are you planning to go?`,
    ru: `Cham Island подходит для моря, снорклинга и однодневной поездки из Дананга или Хойана.\n\nСовет: поездка зависит от погоды на море, дату лучше проверить заранее.\n\nНа какую дату вы планируете?`,
  },

  omakase: {
    vi: `Omakase của GoVietStay không phải tour cố định. Mình thiết kế theo sở thích của khách: food, coffee, chụp hình, văn hóa, thiên nhiên, nghỉ dưỡng hoặc hidden gems.\n\nAnh/chị thích kiểu trải nghiệm nào nhất ạ?`,
    en: `GoVietStay Omakase is not a fixed tour. It is customized by interest: food, coffee, photography, culture, nature, wellness or hidden gems.\n\nWhat kind of experience do you enjoy most?`,
    ru: `Omakase от GoVietStay — это не фиксированный тур. Маршрут делается по интересам: еда, кофе, фото, культура, природа, отдых или скрытые места.\n\nКакой стиль вам больше нравится?`,
  },

  fallback: {
    vi: `Dạ câu này em cần thêm chút thông tin để tư vấn đúng hơn. GoVietStay có thể hỗ trợ lịch trình, vé, xe, tour riêng và local tips ở Đà Nẵng – Hội An – Huế.\n\nAnh/chị đang muốn hỏi về điểm nào ạ?`,
    en: `I may need a little more detail to help correctly. GoVietStay can support itinerary planning, tickets, transport, private tours and local tips in Da Nang – Hoi An – Hue.\n\nWhich place are you asking about?`,
    ru: `Мне нужно немного больше информации, чтобы помочь точнее. GoVietStay помогает с маршрутами, билетами, транспортом, частными турами и местными советами в Дананге – Хойане – Хюэ.\n\nКакое место вас интересует?`,
  },
};

const patternGroups = [
  { intent: "banaPrice", keywords: ["ba na price", "bana price", "golden bridge price", "gia ba na", "ve ba na", "gia ve ba na", "cable car price", "buffet ba na", "цена ba na", "билет ba na"], reply: replies.banaPrice, score: 120 },
  { intent: "price", keywords: ["price", "how much", "cost", "fee", "quote", "bao nhieu", "gia", "bao gia", "ve bao nhieu", "цена", "стоимость", "сколько стоит"], reply: replies.price, score: 100 },
  { intent: "contact", keywords: ["whatsapp", "zalo", "phone", "contact", "call", "lien he", "so dien thoai", "hotline", "телефон", "контакт"], reply: replies.contact, score: 95 },
  { intent: "bana", keywords: ["ba na", "bana", "golden bridge", "cau vang", "sun world", "cable car", "банах", "золотой мост", "ba na hills"], reply: replies.bana, score: 90 },
  { intent: "hoian", keywords: ["hoi an", "hoian", "hoi an ancient", "lantern", "pho co", "hoi an night", "хойан", "фонар"], reply: replies.hoian, score: 85 },
  { intent: "hue", keywords: ["hue", "imperial city", "royal tomb", "bun bo hue", "kinh thanh", "хюэ"], reply: replies.hue, score: 80 },
  { intent: "airport", keywords: ["airport", "da nang airport", "pickup", "pick up", "transfer", "san bay", "don san bay", "taxi airport", "аэропорт", "трансфер"], reply: replies.airport, score: 88 },
  { intent: "car", keywords: ["private car", "car", "driver", "transport", "xe rieng", "thue xe", "xe 4 cho", "xe 7 cho", "xe 16 cho", "машина", "водитель"], reply: replies.car, score: 78 },
  { intent: "food", keywords: ["food", "restaurant", "eat", "local food", "seafood", "mi quang", "bun cha ca", "banh xeo", "an gi", "quan an", "hai san", "еда", "ресторан", "морепродукты"], reply: replies.food, score: 78 },
  { intent: "hiddenGems", keywords: ["hidden", "hidden gem", "secret", "local place", "non tourist", "free thing", "photo spot", "son tra", "ban co", "ghenh bang", "nam o", "hai van", "hoa bac", "cay da", "dia diem local", "местные места", "секретные места"], reply: replies.hiddenGems, score: 76 },
  { intent: "itinerary", keywords: ["itinerary", "plan", "schedule", "what to do", "how many days", "lich trinh", "di dau", "choi gi", "nen di dau", "план", "маршрут", "что посмотреть"], reply: replies.itinerary, score: 76 },
  { intent: "family", keywords: ["family", "kids", "children", "elderly", "baby", "gia dinh", "tre em", "nguoi lon tuoi", "con nho", "семья", "дети"], reply: replies.family, score: 74 },
  { intent: "russian", keywords: ["russian", "russian speaking", "russia", "nga", "tieng nga", "русский", "россия"], reply: replies.russian, score: 74 },
  { intent: "cham", keywords: ["cham island", "cu lao cham", "snorkeling", "island", "hon dao", "san ho", "чан", "снорклинг"], reply: replies.cham, score: 82 },
  { intent: "omakase", keywords: ["omakase", "custom", "customized", "private experience", "thiet ke rieng", "tour rieng", "ca nhan hoa", "индивидуальный"], reply: replies.omakase, score: 80 },
  { intent: "greeting", keywords: ["hi", "hello", "hey", "xin chao", "chao", "alo", "привет", "здравствуйте"], reply: replies.greeting, score: 60 },
];

export function findDaoReply(message: string): DaoMatch {
  const lang = detectLanguage(message);
  const text = normalize(message);

  let best: DaoMatch | null = null;

  for (const group of patternGroups) {
    if (hasAny(text, group.keywords)) {
      const keywordHits = group.keywords.filter((keyword) => text.includes(normalize(keyword))).length;
      const score = group.score + keywordHits * 5;
      if (!best || score > best.score) {
        best = {
          intent: group.intent,
          score,
          reply: group.reply[lang],
        };
      }
    }
  }

  if (best) return best;

  return {
    intent: "fallback",
    score: 0,
    reply: replies.fallback[lang],
  };
}
