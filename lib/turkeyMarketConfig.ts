export type TurkeyPrice={
  vnd:number;
  label:string;
  note:string;
};

export const turkeyMarketConfig={
  version:"2.0",
  locale:"tr-TR",
  whatsapp:"https://wa.me/84937762607",
  googleMaps:"https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic",
  officialLinks:{
    turkeyMfaVietnam:"https://www.mfa.gov.tr/vietnam-seyahat-edecek-turk-vatandaslarinin-dikkatine.tr.mfa",
    vietnamEvisa:"https://evisa.gov.vn/",
    vietnamWeather:"https://www.vietnam.travel/things-to-do/weather-and-climate-vietnam",
    phuQuoc:"https://vietnam.travel/places-to-go/southern-vietnam/phu-quoc",
    bana2026:"https://sunworld.vn/en/banahills/sunworld-news/price-list-tickets-services-sun-world-ba-na-hills-year-2026-19796"
  },
  prices:{
    bana:{
      vnd:1550000,
      label:"Bà Nà Hills standart grup turu",
      note:"Mevcut GoVietStay İngilizce ürün fiyatı korunur. Transfer, rehber, teleferik/giriş ve öğle büfesi dahil kapsam tarih teyidinde yazılı olarak gönderilir."
    },
    hoian:{
      vnd:1250000,
      label:"Hoi An + Hindistan Cevizi Ormanı standart turu",
      note:"Transfer, İngilizce rehber, sepet tekne, Hoi An girişleri, yerel akşam yemeği, Hoai Nehri teknesi ve fener deneyimini bir araya getiren mevcut ürün."
    },
    cham:{
      vnd:950000,
      label:"Cham Adaları standart deniz turu",
      note:"Sürat teknesi, snorkeling ekipmanı, öğle yemeği ve belirlenen bölgelerden transfer içeren mevcut İngilizce ürün. Deniz koşullarına bağlıdır."
    },
    hue:{
      vnd:1450000,
      label:"Hue standart günlük turu",
      note:"Da Nang çıkışlı mevcut GoVietStay grup ürünü. Son fiyat ve dahil olanlar rezervasyon tarihine göre teyit edilir."
    }
  } as Record<string,TurkeyPrice>,
  payment:{
    currency:"Resmi rezervasyon fiyatı VND'dir.",
    ticketDeposit:"Önceden bilet alınması gereken turlarda standart depozito %20'dir.",
    transfer:"Sadece transfer hizmetinde normalde depozito gerekmez; ödeme sürücüye yapılabilir.",
    refund:"Fırtına/operasyon iptali veya en az 24 saat önceden bildirilen hastalık durumunda alınan depozito için %100 iade politikası uygulanır; son rezervasyon teyidi esas alınır."
  },
  standardPriceRule:"Türkçe sayfadan geldiğiniz için standart grup turuna ekstra ülke ücreti eklemiyoruz. Aynı GoVietStay ürününde aynı kamu fiyatı esastır.",
  guideRule:"Türkçe rehber talebi mümkündür; ancak tarih ve rehber müsaitliği kontrol edilmeden garanti verilmez. Standart grup turlarında rehber dili ürün açıklamasında ayrıca belirtilir.",
  privateRule:"Özel tur fiyatı grup büyüklüğü, araç, rehber dili, süre, biletler ve gerçek ihtiyaç üzerinden hesaplanır.",
  halalRule:"Helal sertifikalı yemek yalnızca açıkça teyit edildiğinde 'helal' olarak sunulur. Teyit yoksa deniz ürünü, vejetaryen veya domuz ürünü içermeyen seçenekler konusunda yardımcı olabiliriz; sertifika varmış gibi söz vermeyiz.",
  familyRule:"Çocuk fiyatı ürüne göre yaş veya boya bağlı olabilir. Rezervasyonda çocuğun yaşını ve boyunu gönderin; tahmini değil, doğru ürün kuralını uygulayalım.",
  priceDisclaimer:"Fiyatlar VND olarak gösterilir. Kampanya, resmi tatil ek ücreti, çocuk politikası, otel bölgesi ve operatör güncellemesi nedeniyle değişiklik olabilir. Ödeme öncesi son kapsam ve fiyat WhatsApp üzerinden yazılı teyit edilir.",
  positioning:"Uçuş ve otelinizi istediğiniz yerden alın. Vietnam’da ihtiyacınız olduğunda gerçek bir yerel ekip yanınızda olsun."
} as const;
