export type TurkeySection={
  eyebrow:string;
  title:string;
  body:string;
  points?:string[];
};

export type TurkeySeoPage={
  slug:string;
  type:"product"|"private"|"guide";
  destination:string;
  priceKey:string|null;
  title:string;
  h1:string;
  desc:string;
  wiifm:string;
  bullets:string[];
  sections:TurkeySection[];
  faqs:[string,string][];
  sourceLinks?:[string,string][];
  updated:string;
};

export const turkeySeoPages:TurkeySeoPage[]=[
  {
    slug:"vietnam-e-vize-turk-vatandaslari",
    type:"guide",
    destination:"Türkiye → Vietnam",
    priceKey:null,
    title:"Türk vatandaşları için Vietnam e-vizesi 2026 | Resmi başvuru rehberi | GoVietStay",
    h1:"Türk vatandaşları için Vietnam e-vizesi: önce doğru bilgiyi alın, sonra biletinizi rahatça planlayın",
    desc:"Türkiye Cumhuriyeti Dışişleri Bakanlığı'nın güncel bilgisinde umuma mahsus pasaport sahipleri Vietnam için vizeye tabidir. E-vize başvurusu Vietnam Göç İdaresi'nin resmi portalından yapılabilir.",
    wiifm:"Aracı sitelere gereksiz servis ücreti ödemeden, resmi başvuru yolunu ve gerçekten kontrol etmeniz gereken alanları 5 dakikada anlayın.",
    bullets:[
      "Umuma mahsus Türk pasaportu için Vietnam vizesi gerekir; diplomatik, hizmet ve hususi pasaportlar için kurallar farklıdır.",
      "Resmi e-vize portalı evisa.gov.vn'dir; e-vize en fazla 90 gün, tek veya çok girişli düzenlenebilir.",
      "Resmi portalda ücret tek giriş için 25 USD, çok giriş için 50 USD olarak belirtilir; başvuru sonucu garanti değildir."
    ],
    sections:[
      {
        eyebrow:"01 · EN ÖNEMLİ DÜZELTME",
        title:"Türk pasaportu için “45 gün vizesiz” bilgisini kullanmayın.",
        body:"45 günlük tek taraflı vize muafiyeti Türkiye'yi kapsamıyor. Türkiye Dışişleri Bakanlığı da umuma mahsus pasaport sahiplerinin Vietnam için vizeye tabi olduğunu açıkça belirtiyor. Bu nedenle GoVietStay Türkçe sayfasında yanlış bir '45 gün vizesiz' vaadi kullanmıyoruz."
      },
      {
        eyebrow:"02 · RESMİ BAŞVURU",
        title:"Başvuruyu doğrudan resmi e-vize portalından yapabilirsiniz.",
        body:"Vietnam Göç İdaresi e-vize sisteminde başvuru formu, pasaport bilgi sayfası görseli ve portre fotoğrafı istenir. Başvuru sırasında giriş kapısı, planlanan tarihler ve pasaporttaki isim bilgileri dikkatle kontrol edilmelidir.",
        points:["Resmi alan adı: evisa.gov.vn","Tek giriş: 25 USD","Çok giriş: 50 USD","Azami e-vize süresi: 90 gün"]
      },
      {
        eyebrow:"03 · EN SIK HATA",
        title:"Vizenin kendisinden çok, formdaki küçük hata yolculuğu zorlaştırır.",
        body:"Pasaporttaki ad-soyad ile formun birebir uyuşması, doğru giriş noktası ve doğru tarih aralığı kritik önemdedir. Son güne bırakmak yerine uçuşunuzdan önce güvenli zaman payı bırakın."
      },
      {
        eyebrow:"04 · PHU QUOC NOTU",
        title:"Phu Quoc için özel muafiyet kuralını tüm Vietnam için geçerli sanmayın.",
        body:"Yabancı pasaport sahipleri için Phu Quoc'a ilişkin ayrı bir 30 günlük muafiyet mekanizması bulunabilir. Ancak Da Nang, Hanoi veya Ho Chi Minh City gibi Vietnam ana karasına geçecekseniz normal giriş şartlarını esas alın."
      }
    ],
    faqs:[
      ["Türk vatandaşları Vietnam'a vizesiz girebilir mi?","Umuma mahsus pasaport sahipleri için hayır; güncel resmi bilgiye göre vize gerekir."],
      ["Vietnam e-vizesi kaç gün geçerli olabilir?","Resmi portal e-vizenin en fazla 90 gün, tek veya çok girişli olabileceğini belirtir."],
      ["E-vizeyi nereden almalıyım?","Öncelikle Vietnam Göç İdaresi'nin resmi evisa.gov.vn portalını kullanın."],
      ["GoVietStay vize garantisi veriyor mu?","Hayır. Resmi başvuru ve karar yetkili Vietnam makamlarındadır; biz yalnızca doğru resmi kaynağa yönlendirme yaparız."]
    ],
    sourceLinks:[
      ["T.C. Dışişleri Bakanlığı — Vietnam'a seyahat bilgisi","https://www.mfa.gov.tr/vietnam-seyahat-edecek-turk-vatandaslarinin-dikkatine.tr.mfa"],
      ["Vietnam Göç İdaresi — resmi e-vize portalı","https://evisa.gov.vn/"]
    ],
    updated:"2026-08-29"
  },
  {
    slug:"da-nang-gezi-rehberi",
    type:"guide",
    destination:"Da Nang · Hoi An · Hue",
    priceKey:null,
    title:"Da Nang gezi rehberi 2026 | Türk gezginler için 4 günlük akıllı plan | GoVietStay",
    h1:"Da Nang gezi rehberi: her günü doldurmak yerine, her güne doğru bir ana deneyim koyun",
    desc:"Da Nang; plaj, havalimanı ve şehir konforunu Hoi An, Bà Nà Hills, Hue ve Cham Adaları gibi güçlü günübirlik rotalarla birleştirdiği için Orta Vietnam'da çok iyi bir üs.",
    wiifm:"Daha az otel değiştirin, daha az yolda kalın ve dört günde “çok şey gördüm ama hiçbir şey yaşamadım” hissine düşmeyin.",
    bullets:[
      "İlk seyahat için 3–5 gece güçlü bir aralıktır; dört gece dengeli bir başlangıçtır.",
      "Bà Nà Hills'i ayrı gün, Hoi An'ı öğleden sonra-akşam, deniz gününü ise hava koşullarına esnek bırakın.",
      "Grab şehir içinde pratiktir; aile, bagaj veya çok duraklı günlerde özel araç zaman kazandırabilir."
    ],
    sections:[
      {
        eyebrow:"01 · 4 GÜNLÜK İSKELET",
        title:"Bir günde bir ana hedef: ritmi koruyan plan budur.",
        body:"1. gün uçuş sonrası My Khe, Han Nehri ve Dragon Bridge çevresi. 2. gün Bà Nà Hills. 3. gün Hoi An ve isterseniz Hindistan Cevizi Ormanı. 4. gün hava durumuna göre Cham Adaları, Hue veya serbest şehir/plaj günü."
      },
      {
        eyebrow:"02 · NEREDE KONAKLAMALI?",
        title:"My Khe rahatlık; Han Nehri şehir erişimi; Hoi An ise akşam atmosferidir.",
        body:"Her iki günde bir otel değiştirmek yerine seyahatinizin önceliğini seçin. Deniz ve modern şehir istiyorsanız Da Nang güçlü üs; gece atmosferini ağır yaşamak istiyorsanız Hoi An'da en az bir gece mantıklı olabilir."
      },
      {
        eyebrow:"03 · NEYİ KENDİN YAP, NEYİ TUR OLARAK AL?",
        title:"Basit olanı kendiniz yapın; lojistiğin zorlaştığı yerde destek alın.",
        body:"Şehir içi kahve, plaj ve restoran için tura ihtiyacınız yok. Bà Nà Hills gibi bilet+transfer+zaman yönetimi olan günlerde grup turu ekonomik olabilir. Aile veya küçük grupta Hoi An/Hue için özel araç ve rehber, toplam zaman değerini artırabilir."
      },
      {
        eyebrow:"04 · YEMEK VE ÖZEL İHTİYAÇ",
        title:"Beslenme tercihini son dakikada değil, rezervasyonda söyleyin.",
        body:"Helal, vejetaryen, alerji veya çocuk menüsü gibi özel ihtiyaçlarınız varsa turdan önce yazın. Her standart grup menüsü her tercihe uygun değildir; mümkün olan seçenek teyit edilmeden söz vermeyiz."
      }
    ],
    faqs:[
      ["Da Nang için kaç gün yeterli?","İlk seyahat için 3–5 gece; çoğu gezgin için 4 gece iyi dengedir."],
      ["Da Nang mı Hoi An mı konaklama için daha iyi?","Plaj, havalimanı ve günübirlik geziler için Da Nang; akşam atmosferi ve daha yavaş tempo için Hoi An."],
      ["Bà Nà Hills ve Hoi An aynı gün yapılır mı?","Teknik olarak yapılabilir fakat ilk seyahatte iki deneyimi de gereksiz sıkıştırır."],
      ["Türkçe rehber var mı?","Talep edilebilir; tarih ve müsaitliğe göre ayrıca teyit edilir."]
    ],
    updated:"2026-08-29"
  },
  {
    slug:"ba-na-hills-altin-kopru",
    type:"product",
    destination:"Da Nang · Bà Nà Hills",
    priceKey:"bana",
    title:"Bà Nà Hills ve Altın Köprü 2026 | Da Nang turu ve gerçek fiyat hesabı | GoVietStay",
    h1:"Bà Nà Hills ve Altın Köprü: sadece bilet fiyatını değil, günün tamamını karşılaştırın",
    desc:"Bà Nà Hills'te 2026 yabancı ziyaretçi temel bileti 1.000.000 VND, bilet + öğle büfesi referansı 1.300.000 VND. GoVietStay standart turu 1.550.000 VND'den başlar ve ulaşım + rehber + paket kapsamını tek günde birleştirir.",
    wiifm:"En ucuz etiketi kovalamak yerine bilet, öğle yemeği, transfer ve rehberi aynı kapsamda karşılaştırarak gerçekten neye para ödediğinizi görün.",
    bullets:[
      "GoVietStay standart yetişkin fiyatı: 1.550.000 VND; mevcut İngilizce ürünle aynı kamu fiyatı.",
      "Sun World 2026 referansında yabancı yetişkin temel bilet 1.000.000 VND, bilet + öğle büfesi 1.300.000 VND.",
      "Sabah daha klasik deneyimdir ama yoğun olabilir; daha geç başlangıç daha farklı bir ritim sunar, kalabalıksızlık garanti edilmez."
    ],
    sections:[
      {
        eyebrow:"01 · FİYATIN MATEMATİĞİ",
        title:"1.550.000 VND'nin tamamı 'tur komisyonu' değildir.",
        body:"Resmi 2026 fiyatında yabancı yetişkin için Bà Nà Hills + öğle büfesi referansı 1.300.000 VND'dir. Standart GoVietStay turu 1.550.000 VND olduğunda aradaki fark; toplu transfer, rehberlik ve operasyon organizasyonunu da taşır. Bu nedenle sadece 'giriş bileti' ile tam günlük turu aynı ürün gibi karşılaştırmak doğru değildir."
      },
      {
        eyebrow:"02 · SABAH MI DAHA GEÇ Mİ?",
        title:"Fotoğraf hedefiniz ile gün ritminiz aynı şey değildir.",
        body:"Sabah programı Golden Bridge'i gündüz görmek ve daha uzun park süresi isteyenler için güçlüdür. Daha geç program ise serin saatleri ve akşam atmosferini sevenlere uygundur. Hava, görüş ve ziyaretçi yoğunluğu hiçbir tur şirketi tarafından garanti edilemez."
      },
      {
        eyebrow:"03 · ÇOCUKLAR",
        title:"Yaş değil, boy politikası fiyatı değiştirebilir.",
        body:"Bà Nà Hills çocuk fiyatlamasında boy kriteri önemlidir. Çocuğun yaşını ve boyunu rezervasyonda gönderin; böylece tahmini değil, doğru güncel fiyat teyit edilebilir."
      },
      {
        eyebrow:"04 · TÜRKÇE REHBER",
        title:"Dil talebi ayrıca teyit edilir; tur fiyatına gizlice eklenmez.",
        body:"Standart ürün İngilizce rehberle çalışır. Türkçe rehber isterseniz tarihi kontrol ederiz ve varsa farkı önceden açıklarız. Müsaitlik teyit edilmeden 'Türkçe rehber kesin' şeklinde satış yapmayız."
      }
    ],
    faqs:[
      ["Bà Nà Hills turu kaç VND?","GoVietStay mevcut standart yetişkin fiyatı 1.550.000 VND'dir; tarih ve kapsam ödeme öncesi teyit edilir."],
      ["1.550.000 VND'ye teleferik dahil mi?","Mevcut standart ürün teleferik/giriş ve öğle büfesini içerir; son kapsam rezervasyon teyidinde yazılı gönderilir."],
      ["Kalabalık olmayan saat garanti edilebilir mi?","Hayır. Daha geç başlangıç farklı bir ritim sunabilir ancak gerçek ziyaretçi sayısı ve hava garanti edilemez."],
      ["Özel Bà Nà Hills turu yapabilir miyiz?","Evet. Grup büyüklüğü, araç, rehber dili ve programınıza göre ayrı fiyatlandırılır."]
    ],
    sourceLinks:[
      ["Sun World Bà Nà Hills — 2026 resmi fiyat rehberi","https://sunworld.vn/en/banahills/sunworld-news/price-list-tickets-services-sun-world-ba-na-hills-year-2026-19796"]
    ],
    updated:"2026-08-29"
  },
  {
    slug:"hoi-an-hindistan-cevizi-ormani",
    type:"product",
    destination:"Da Nang → Hoi An",
    priceKey:"hoian",
    title:"Hoi An + Hindistan Cevizi Ormanı turu 2026 | Akşam, fener ve sepet tekne | GoVietStay",
    h1:"Hoi An + Hindistan Cevizi Ormanı: en iyi bölüm gün batımından sonra başlar",
    desc:"Da Nang'dan öğleden sonra çıkış; Cam Thanh Hindistan Cevizi Ormanı, sepet tekne, Hoi An Eski Şehir, yerel akşam yemeği, Hoai Nehri teknesi ve fener deneyimini tek akışta birleştirir.",
    wiifm:"Öğle sıcağında boş yere Eski Şehir'de dolaşmak yerine, Hoi An'ın ışığının ve atmosferinin güçlendiği saatlere enerjinizi saklayın.",
    bullets:[
      "GoVietStay standart yetişkin fiyatı: 1.250.000 VND; mevcut İngilizce ürünle aynı kamu fiyatı.",
      "Ürün; transfer, İngilizce rehber, sepet tekne, Hoi An girişleri, akşam yemeği, nehir teknesi ve feneri bir araya getirir.",
      "Sadece 'basket boat' fiyatı ile tam akşam turunu karşılaştırmak yanıltıcıdır; kapsamı kalem kalem kontrol edin."
    ],
    sections:[
      {
        eyebrow:"01 · DOĞRU SAAT",
        title:"Hoi An'ı öğleden sonra ve akşam planlamak, aynı şehri daha iyi hissettirir.",
        body:"Cam Thanh'ı önce yapmak, ardından Eski Şehir'e ışığın yumuşadığı saatlerde geçmek hem sıcaklığı azaltır hem de fenerlerin yandığı döneme doğal olarak bağlanır."
      },
      {
        eyebrow:"02 · FİYATI KARŞILAŞTIRIRKEN",
        title:"OTA'daki düşük etiket bazen sadece ürünün bir bölümüdür.",
        body:"Hoi An piyasasında yalnızca sepet tekne, yalnızca transfer veya akşam yemeği olmayan paketler çok daha ucuz görünebilir. GoVietStay fiyatını karşılaştırırken sepet tekne + şehir girişleri + yemek + Hoai Nehri teknesi/fener + transfer + rehber kombinasyonunu aynı kapsamla karşılaştırın."
      },
      {
        eyebrow:"03 · KİME UYGUN?",
        title:"Çiftler ve aileler için akış doğal; küçük çocuklarda tempo kişiselleştirilebilir.",
        body:"Standart grup turu fiyat avantajı sağlar. Bebek, yaşlı misafir veya fotoğraf/yemek için daha uzun durmak isteyen küçük gruplarda özel araç ya da özel tur daha mantıklı olabilir."
      },
      {
        eyebrow:"04 · ZORUNLU OLMAYAN ŞEYLER",
        title:"Sepet tekne spinning gösterisi ve kişisel bahşişler ana tur kapsamı değildir.",
        body:"Tur öncesinde neyin dahil, neyin hariç olduğunu net yazarız. Ekstra gösteri, ekstra yiyecek/içecek, alışveriş ve kişisel harcamalar için sonradan sürpriz yaşamayın."
      }
    ],
    faqs:[
      ["Hoi An + Coconut Forest turu kaç VND?","GoVietStay standart yetişkin referansı 1.250.000 VND'dir."],
      ["Akşam yemeği dahil mi?","Mevcut standart üründe yerel akşam yemeği dahildir."],
      ["Fener teknesi dahil mi?","Mevcut standart üründe Hoai Nehri tekne yolculuğu ve fener deneyimi dahildir."],
      ["Özel tur yapabilir miyiz?","Evet. Özellikle aile ve küçük gruplarda araç, rehber ve süreye göre özel plan hazırlanabilir."]
    ],
    updated:"2026-08-29"
  },
  {
    slug:"vietnam-ozel-tur",
    type:"private",
    destination:"Da Nang · Hoi An · Hue · Phu Quoc",
    priceKey:null,
    title:"Vietnam özel tur 2026 | Aile, çift ve küçük gruplar için yerel plan | GoVietStay",
    h1:"Vietnam özel tur: daha fazla yer görmek için değil, kendi zamanınızın sahibi olmak için",
    desc:"Uçuş ve otelinizi kendiniz seçebilirsiniz. GoVietStay yerelde araç, rehber, transfer, bilet ve günlük programı yalnızca ihtiyaç duyduğunuz ölçüde birleştirir.",
    wiifm:"Hazır paketin istemediğiniz parçalarına para vermeyin; grubunuzun ritmini, çocukları, yemek tercihlerini ve gerçekten görmek istediğiniz yerleri merkeze alın.",
    bullets:[
      "Özel araç, rehber dili, süre ve biletler grup bazında ayrı ayrı hesaplanır.",
      "Türkçe rehber talebi tarih ve müsaitliğe göre teyit edilir; garanti verilmeden fiyat satılmaz.",
      "4+ kişilik aile veya arkadaş grubunda özel model, kişi başı fark açısından beklenenden daha mantıklı olabilir."
    ],
    sections:[
      {
        eyebrow:"01 · ÖZEL TURUN EKONOMİSİ",
        title:"Özel tur kişi sayısı arttıkça farklı bir matematiğe dönüşür.",
        body:"Araç ve rehber gibi sabit maliyetler grup içinde bölünür. Bu nedenle 1–2 kişide grup turu çok ekonomik olabilirken, 4–6 kişilik aile/arkadaş grubunda özel tur farkı küçülebilir. Tek bir 'kişi başı özel tur fiyatı' yayımlamak yerine gerçek grubu hesaplarız."
      },
      {
        eyebrow:"02 · ORTA VİETNAM",
        title:"Da Nang'ı üs yapıp Bà Nà Hills, Hoi An ve Hue'yi gereksiz otel değişimi olmadan bağlayın.",
        body:"Örneğin 4 günlük bir rotada Bà Nà Hills ayrı gün, Hoi An öğleden sonra-akşam, Hue ise tarih odaklı tam gün olarak planlanabilir. Cham Adaları ise deniz koşullarına göre esnek tutulur."
      },
      {
        eyebrow:"03 · PHU QUOC",
        title:"Ada tatilinde programı doldurmak yerine boş zamanı koruyun.",
        body:"Phu Quoc'ta 3 ada / 4 ada günleri ile resort ve serbest günleri dengeleriz. Özel araç, özellikle kuzey-güney arasında çok duraklı aile günlerinde zaman kazandırabilir."
      },
      {
        eyebrow:"04 · BİZE NE GÖNDERİRSİNİZ?",
        title:"İlk teklif için beş bilgi yeterli.",
        body:"Tarih, yetişkin/çocuk sayısı, otel veya konaklama bölgesi, mutlaka görmek istediğiniz iki şey ve rehber dili. Bundan sonra gereksiz hizmet eklemek yerine en sade mantıklı rotayı çıkarırız."
      }
    ],
    faqs:[
      ["Özel tur için minimum kişi sayısı var mı?","Her talep ayrı hesaplanabilir; ekonomik avantaj grup büyüklüğüne göre değişir."],
      ["Türkçe rehber kesin var mı?","Hayır. Talep üzerine müsaitlik kontrol edilir ve yalnızca teyit edilirse teklife eklenir."],
      ["Sadece araç kiralayabilir miyiz?","Evet. Rehber veya tam tur almak zorunda değilsiniz."],
      ["Da Nang ve Phu Quoc'u aynı plan içinde yapabilir misiniz?","Yerel hizmetleri her iki bölgede de planlayabiliriz; iç hat uçuşu ve otel seçiminizi kendi tercihinize göre yapabilirsiniz."]
    ],
    updated:"2026-08-29"
  }
];

export function getTurkeyPage(slug:string){return turkeySeoPages.find(p=>p.slug===slug)}

export function getTurkeyRelated(page:TurkeySeoPage){
  const same=turkeySeoPages.filter(p=>p.slug!==page.slug && (p.destination.split(" · ").some(x=>page.destination.includes(x)) || page.destination.split(" · ").some(x=>p.destination.includes(x))));
  const fallback=turkeySeoPages.filter(p=>p.slug!==page.slug && !same.includes(p));
  return [...same,...fallback].slice(0,3);
}
