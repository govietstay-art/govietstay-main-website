export type TurkeySection = {
  eyebrow: string;
  title: string;
  body: string;
  points?: string[];
};

export type TurkeySeoPage = {
  slug: string;
  type: "product" | "private" | "guide";
  destination: string;
  priceKey: string | null;
  title: string;
  h1: string;
  desc: string;
  wiifm: string;
  bullets: string[];
  sections: TurkeySection[];
  faqs: [string, string][];
  sourceLinks?: [string, string][];
  updated: string;
};

export const turkeySeoPages: TurkeySeoPage[] = [
  {
    slug: "vietnam-e-vize-turk-vatandaslari",
    type: "guide",
    destination: "Türkiye → Vietnam",
    priceKey: null,
    title: "Türk vatandaşları için Vietnam e-vizesi 2026 | GoVietStay",
    h1: "Türk vatandaşları için Vietnam e-vizesi",
    desc: "Umuma mahsus pasaport sahibi Türk vatandaşları için Vietnam seyahatinde vize gerekir. Başvuruyu resmi Vietnam e-vize sistemi üzerinden yapmak en güvenli başlangıçtır.",
    wiifm: "Aracı sitelere gereksiz ödeme yapmadan, resmi başvuru yolunu ve en sık yapılan hataları birkaç dakikada anlayın.",
    bullets: [
      "Türk umuma mahsus pasaportu için Vietnam vizesi gerekir.",
      "Resmi portal: evisa.gov.vn",
      "E-vize en fazla 90 gün; tek veya çok girişli olabilir.",
    ],
    sections: [
      {
        eyebrow: "DOĞRU BİLGİ",
        title: "45 gün vizesiz bilgisi Türk pasaportu için geçerli değildir.",
        body: "Türkiye Cumhuriyeti Dışişleri Bakanlığı’nın yayımladığı güncel bilgiye göre umuma mahsus pasaport sahipleri Vietnam için vizeye tabidir. GoVietStay bu sayfada yanlış kolaylık vaat etmek yerine resmi kaynağı esas alır.",
      },
      {
        eyebrow: "RESMİ YOL",
        title: "Başvuruyu doğrudan resmi e-vize portalından yapın.",
        body: "Vietnam Göç İdaresi portalında pasaport görseli, portre fotoğrafı, giriş kapısı ve tarih bilgileri istenir. Formdaki küçük bir hata, vize sürecinden daha çok sorun çıkarabilir.",
        points: ["Tek giriş: 25 USD", "Çok giriş: 50 USD", "Azami süre: 90 gün", "Portal: evisa.gov.vn"],
      },
      {
        eyebrow: "PHU QUOC NOTU",
        title: "Phu Quoc muafiyetini tüm Vietnam için geçerli sanmayın.",
        body: "Ada için ayrı muafiyet mekanizmaları zaman zaman geçerli olabilir; ancak Vietnam ana karasına geçişte normal giriş kuralları esas alınmalıdır.",
      },
    ],
    faqs: [
      ["Türk vatandaşları Vietnam’a vizesiz girebilir mi?", "Umuma mahsus pasaport sahipleri için hayır; güncel resmi bilgiye göre vize gerekir."],
      ["E-vizeyi nereden almalıyım?", "Öncelikle resmi Vietnam e-vize portalı olan evisa.gov.vn üzerinden başvurun."],
      ["E-vize kaç gün olabilir?", "Resmi portala göre e-vize en fazla 90 gün ve tek/çok girişli olabilir."],
    ],
    sourceLinks: [
      ["T.C. Dışişleri Bakanlığı", "https://www.mfa.gov.tr/vietnam-seyahat-edecek-turk-vatandaslarinin-dikkatine.tr.mfa"],
      ["Vietnam e-vize resmi portalı", "https://evisa.gov.vn/"],
    ],
    updated: "2026-08-29",
  },
  {
    slug: "da-nang-gezi-rehberi",
    type: "guide",
    destination: "Da Nang · Hoi An · Hue",
    priceKey: null,
    title: "Da Nang gezi rehberi 2026 | GoVietStay",
    h1: "Da Nang gezi rehberi",
    desc: "Da Nang, ilk Vietnam seyahatinde şehir, plaj, Hoi An, Bà Nà Hills ve Hue’yi bir araya getirebildiği için çok güçlü bir ana üs olabilir.",
    wiifm: "Her günü gereksiz doldurmadan, 3–5 gecede daha dengeli ve daha az yorucu bir Orta Vietnam planı kurun.",
    bullets: [
      "İlk seyahat için 3–5 gece güçlü aralıktır.",
      "Bà Nà Hills’i ayrı gün yapmak daha mantıklıdır.",
      "Hoi An öğleden sonra ve akşam saatlerinde daha keyiflidir.",
    ],
    sections: [
      {
        eyebrow: "4 GÜNLÜK İSKELET",
        title: "Bir günde bir ana deneyim seçin.",
        body: "1. gün Da Nang şehir ve plaj, 2. gün Bà Nà Hills, 3. gün Hoi An + istenirse Coconut Forest, 4. gün Hue veya hava uygunsa Cham Adaları gibi bir ritim çoğu ilk ziyaretçi için dengelidir.",
      },
      {
        eyebrow: "KONAKLAMA",
        title: "My Khe pratik, Hoi An atmosferik, Han River şehir odaklıdır.",
        body: "Sürekli otel değiştirmek yerine seyahatinizin önceliğini seçin. Şehir + günübirlik turlar için Da Nang çoğu zaman daha verimli üs olur.",
      },
      {
        eyebrow: "NEYİ KENDİN YAP, NEYİ TUR AL?",
        title: "Şehir içi serbest; lojistik zorsa destek alın.",
        body: "Kafeler, plaj ve kısa şehir gezileri için tura ihtiyaç yok. Bilet, uzun mesafe veya tam gün koordinasyon gereken günlerde grup veya özel hizmet zaman kazandırabilir.",
      },
    ],
    faqs: [
      ["Da Nang için kaç gün yeterli?", "İlk ziyaret için 3–5 gece; çoğu gezgin için 4 gece oldukça dengelidir."],
      ["Da Nang mı Hoi An mı?", "Şehir, plaj ve lojistik için Da Nang; akşam atmosferi için Hoi An güçlüdür."],
      ["Türkçe rehber var mı?", "Talep alınır; ancak yalnızca müsaitlik teyidinden sonra garanti edilir."],
    ],
    updated: "2026-08-29",
  },
  {
    slug: "ba-na-hills-altin-kopru",
    type: "product",
    destination: "Da Nang · Bà Nà Hills",
    priceKey: "bana",
    title: "Bà Nà Hills ve Altın Köprü 2026 | GoVietStay",
    h1: "Bà Nà Hills ve Altın Köprü",
    desc: "Bà Nà Hills turunda yalnızca giriş biletine değil, toplam gün paketine bakmak gerekir. Transfer, rehber, giriş ve büfe birlikte değerlendirildiğinde fiyat anlam kazanır.",
    wiifm: "Sadece ucuz etiketi değil, gerçekten neye para ödediğinizi görün.",
    bullets: [
      "GoVietStay standart fiyat: 1.550.000 VND",
      "Resmi referansta yabancı yetişkin temel bilet 1.000.000 VND",
      "Bilet + büfe referansı 1.300.000 VND",
    ],
    sections: [
      {
        eyebrow: "FİYAT MANTIĞI",
        title: "1.550.000 VND yalnızca bilet fiyatı değildir.",
        body: "Resmi park bileti ile tam günlük operasyon aynı ürün değildir. Aradaki fark transfer, rehberlik ve gün organizasyonunu taşır; bu yüzden bilet-only ürünle tam turu birebir kıyaslamayın.",
      },
      {
        eyebrow: "ZAMANLAMA",
        title: "Sabah ve geç başlangıç farklı deneyim üretir.",
        body: "Sabah başlamak daha klasik tam gün deneyimi verir. Daha geç başlamak farklı ritim sunar; ancak kalabalıksızlık veya hava hiçbir şirket tarafından garanti edilemez.",
      },
      {
        eyebrow: "AİLE",
        title: "Çocuklarda yaş kadar boy da önemlidir.",
        body: "Bà Nà Hills çocuk fiyatlamasında boy kriteri önemlidir. Rezervasyonda yaş ve boy bilgisini birlikte gönderin.",
      },
    ],
    faqs: [
      ["Bà Nà Hills turu kaç VND?", "GoVietStay mevcut standart yetişkin fiyatı 1.550.000 VND’dir."],
      ["Teleferik dahil mi?", "Mevcut standart üründe giriş/teleferik ve öğle büfesi yer alır; son kapsam teyitte yazılı verilir."],
      ["Türkçe rehber var mı?", "Talep alınır; teyit edilmeden garanti verilmez."],
    ],
    sourceLinks: [
      ["Sun World Bà Nà Hills resmi fiyat kaynağı", "https://sunworld.vn/en/banahills/sunworld-news/price-list-tickets-services-sun-world-ba-na-hills-year-2026-19796"],
    ],
    updated: "2026-08-29",
  },
  {
    slug: "hoi-an-hindistan-cevizi-ormani",
    type: "product",
    destination: "Da Nang → Hoi An",
    priceKey: "hoian",
    title: "Hoi An + Hindistan Cevizi Ormanı 2026 | GoVietStay",
    h1: "Hoi An + Hindistan Cevizi Ormanı",
    desc: "Hoi An’ın en güzel ritmi çoğu zaman öğleden sonra başlar ve akşam fener atmosferiyle tamamlanır. Coconut Forest ile birleştirilen akış, günü daha dolu ama doğal kılar.",
    wiifm: "Günün en sıcak saatini boşa harcamadan, Hoi An’ın gerçekten parladığı zamana denk gelin.",
    bullets: [
      "GoVietStay standart fiyat: 1.250.000 VND",
      "Transfer + sepet tekne + giriş + yemek + fener akışı",
      "Sadece basket boat fiyatıyla tam turu karşılaştırmayın",
    ],
    sections: [
      {
        eyebrow: "DOĞRU SAAT",
        title: "Hoi An’ı akşama bağlayın.",
        body: "Cam Thanh Coconut Forest’ı önce yapmak, ardından Eski Şehir’e gün batımı ve akşam saatlerinde geçmek hem sıcaklığı azaltır hem de fener atmosferini daha anlamlı kılar.",
      },
      {
        eyebrow: "KAPSAM",
        title: "Düşük fiyat etiketinin neyi dışarıda bıraktığına bakın.",
        body: "Bazı ürünler yalnızca sepet tekne ya da yalnızca transfer içerir. Bizde fiyatı değerlendirirken sepet tekne, giriş, yemek, fener, transfer ve rehberin birlikte okunması gerekir.",
      },
      {
        eyebrow: "KİME UYGUN",
        title: "Çiftler, aileler ve küçük gruplar için esnek bir gün.",
        body: "Standart tur ekonomik olabilir. Fotoğraf, yemek veya tempo açısından daha özgür bir gün istiyorsanız özel seçenek daha mantıklı olabilir.",
      },
    ],
    faqs: [
      ["Hoi An + Coconut Forest turu kaç VND?", "GoVietStay standart yetişkin referans fiyatı 1.250.000 VND’dir."],
      ["Akşam yemeği dahil mi?", "Mevcut standart üründe yerel akşam yemeği dahildir."],
      ["Fener teknesi dahil mi?", "Mevcut standart üründe nehir teknesi ve fener deneyimi yer alır."],
    ],
    updated: "2026-08-29",
  },
  {
    slug: "vietnam-ozel-tur",
    type: "private",
    destination: "Da Nang · Hoi An · Hue · Phu Quoc",
    priceKey: null,
    title: "Vietnam özel tur 2026 | GoVietStay",
    h1: "Vietnam özel tur",
    desc: "Özel tur, daha çok şey sıkıştırmak için değil, grubunuzun ritmine göre daha rahat ve kontrollü bir seyahat kurmak içindir.",
    wiifm: "İstemediğiniz parçalar için ödeme yapmayın; size gerçekten uyan programı kurun.",
    bullets: [
      "Araç, rehber dili, süre ve biletler grup bazında hesaplanır.",
      "4+ kişide özel tur farkı beklenenden daha mantıklı olabilir.",
      "Türkçe rehber ancak teyitli müsaitlik ile eklenir.",
    ],
    sections: [
      {
        eyebrow: "ÖZEL TURUN EKONOMİSİ",
        title: "Grup büyüdükçe matematik değişir.",
        body: "Araç ve rehber gibi sabit maliyetler grubun içinde bölünür. Bu nedenle aile veya arkadaş grubunda özel tur, kişi başı düşündüğünüzden daha mantıklı hale gelebilir.",
      },
      {
        eyebrow: "ORTA VİETNAM",
        title: "Da Nang’ı üs alıp Hoi An, Hue ve Bà Nà’yı düzenli kurun.",
        body: "Gereksiz otel değişimi olmadan güçlü bir akış yaratılabilir. Hava ve enerji düzeyine göre serbest zaman bırakmak çoğu zaman programı daha iyi yapar.",
      },
      {
        eyebrow: "PHU QUOC",
        title: "Ada tatilinde boş zaman da programın parçasıdır.",
        body: "Phu Quoc’ta ada turlarını resort ve serbest zaman ile dengelemek tatilin kalitesini artırır. Özellikle ailelerde bunu sıkça öneririz.",
      },
    ],
    faqs: [
      ["Özel tur için minimum kişi sayısı var mı?", "Hayır. Her talep ayrı hesaplanabilir."],
      ["Sadece araç isteyebilir miyiz?", "Evet. Rehber veya tam tur almak zorunda değilsiniz."],
      ["Da Nang ve Phu Quoc aynı planda olabilir mi?", "Evet. Yerel hizmetleri iki bölgede de planlayabiliriz."],
    ],
    updated: "2026-08-29",
  },
];

export function getTurkeyPage(slug: string) {
  return turkeySeoPages.find((p) => p.slug === slug);
}

export function getTurkeyRelated(page: TurkeySeoPage) {
  return turkeySeoPages.filter((p) => p.slug !== page.slug).slice(0, 3);
}
