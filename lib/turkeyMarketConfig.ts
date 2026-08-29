export type TurkeyPrice = {
  vnd: number;
  label: string;
  note: string;
};

export const turkeyMarketConfig = {
  version: "FINAL",
  locale: "tr-TR",
  whatsapp: "https://wa.me/84937762607",
  googleMaps: "https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic",
  officialLinks: {
    turkeyMfaVietnam: "https://www.mfa.gov.tr/vietnam-seyahat-edecek-turk-vatandaslarinin-dikkatine.tr.mfa",
    vietnamEvisa: "https://evisa.gov.vn/",
    vietnamWeather: "https://www.vietnam.travel/things-to-do/weather-and-climate-vietnam",
    phuQuoc: "https://vietnam.travel/places-to-go/southern-vietnam/phu-quoc",
    bana2026: "https://sunworld.vn/en/banahills/sunworld-news/price-list-tickets-services-sun-world-ba-na-hills-year-2026-19796",
  },
  prices: {
    bana: {
      vnd: 1550000,
      label: "Bà Nà Hills standart grup turu",
      note: "Mevcut GoVietStay ürünü: transfer, rehberlik, giriş/teleferik ve öğle büfesi. Son kapsam rezervasyon teyidinde yazılı olarak paylaşılır.",
    },
    hoian: {
      vnd: 1250000,
      label: "Hoi An + Hindistan Cevizi Ormanı standart turu",
      note: "Mevcut GoVietStay ürünü: transfer, rehber, sepet tekne, Hoi An girişleri, akşam yemeği, nehir teknesi ve fener deneyimi.",
    },
    cham: {
      vnd: 950000,
      label: "Cham Adaları standart deniz turu",
      note: "Mevcut GoVietStay ürünü: sürat teknesi, snorkeling ekipmanı, öğle yemeği ve belirlenen bölgelerden transfer. Deniz koşullarına bağlıdır.",
    },
    hue: {
      vnd: 1450000,
      label: "Hue standart günlük turu",
      note: "Mevcut GoVietStay grup ürünü. Son kapsam ve fiyat tarih teyidinde yazılı olarak paylaşılır.",
    },
  } as Record<string, TurkeyPrice>,
  payment: {
    currency: "Resmi fiyatlandırma VND ile yapılır.",
    ticketDeposit: "Önceden bilet gerektiren turlarda standart depozito %20’dir.",
    transfer: "Sadece transfer hizmetinde normal şartlarda depozito gerekmez; ödeme sürücüye yapılabilir.",
    refund: "Fırtına, operasyon iptali veya en az 24 saat önceden bildirilen sağlık problemi gibi durumlarda alınan depozito için %100 iade politikası uygulanabilir; son rezervasyon teyidi esastır.",
  },
  guideRule:
    "Türkçe rehber talebi alınabilir; ancak tarih ve müsaitlik teyit edilmeden garanti verilmez.",
  halalRule:
    "Helal sertifikası yalnızca açıkça teyit edildiğinde belirtilir. Aksi durumda deniz ürünü, vejetaryen veya domuz ürünü içermeyen seçenekler konusunda yardımcı olabiliriz; sertifika varmış gibi söz vermeyiz.",
  familyRule:
    "Çocuk fiyatı ürüne göre yaşa veya boya bağlı olabilir. Rezervasyonda yaş ve boy bilgisini gönderin; tahmini değil, doğru ürün kuralını kullanalım.",
  priceDisclaimer:
    "Fiyatlar VND olarak gösterilir. Resmi tatil, otel bölgesi, çocuk politikası, kampanya ve operatör güncellemesine göre değişiklik olabilir. Son fiyat ve kapsam ödeme öncesi WhatsApp üzerinden yazılı olarak teyit edilir.",
} as const;
