import type {Metadata} from "next";
import {turkeySeoPages} from "../../lib/turkeySeoPages";
import {turkeyMarketConfig} from "../../lib/turkeyMarketConfig";
import {turkeyHubVisuals,turkeyGuestPhotos,getTurkeyVisual} from "../../lib/turkeyVisuals";
import styles from "../it/ItalyHub.module.css";

export const metadata:Metadata={
  title:{absolute:"Vietnam Gezi Rehberi ve Turlar 2026 | Türk Gezginler | GoVietStay"},
  description:"Türk gezginler için Vietnam: doğru e-vize bilgisi, Da Nang mı Phu Quoc mu, ne zaman gidilir, havalimanı transferi, yemek tercihleri, aile seyahati, şeffaf VND fiyatları ve özel tur.",
  alternates:{canonical:"https://www.govietstay.com/tr",languages:{"tr-TR":"https://www.govietstay.com/tr",en:"https://www.govietstay.com/travel","x-default":"https://www.govietstay.com"}},
  robots:{index:true,follow:true},
  openGraph:{type:"website",url:"https://www.govietstay.com/tr",title:"GoVietStay Türkiye | Vietnam'ı kendi ritminizde keşfedin",description:"Hazır paket satmak yerine önce doğru kararı kolaylaştırıyoruz: vize, mevsim, rota, transfer, yemek, tur ve yerel destek.",locale:"tr_TR",siteName:"GoVietStay"}
};

const bySlug=(slug:string)=>turkeySeoPages.find(x=>x.slug===slug);
const keyPages=["ba-na-hills-altin-kopru","hoi-an-hindistan-cevizi-ormani","vietnam-ozel-tur"];

export default function TurkeyHub(){
  const schema={"@context":"https://schema.org","@type":"CollectionPage",name:"GoVietStay Türkiye",url:"https://www.govietstay.com/tr",inLanguage:"tr-TR",description:"Türk gezginler için Vietnam karar ve yerel destek merkezi"};
  const faqSchema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:[
    {"@type":"Question",name:"Türk vatandaşları Vietnam'a vizesiz girebilir mi?",acceptedAnswer:{"@type":"Answer",text:"Umuma mahsus pasaport sahipleri için güncel resmi bilgiye göre vize gerekir. E-vize resmi Vietnam Göç İdaresi portalından alınabilir."}},
    {"@type":"Question",name:"Da Nang mı Phu Quoc mu?",acceptedAnswer:{"@type":"Answer",text:"Da Nang kültür, şehir, Hoi An, Hue ve Bà Nà Hills için güçlü bir üs; Phu Quoc ise resort ve ada/plaj odaklı tatil için daha uygundur. Mevsim seçimi iki bölgeyi ciddi biçimde etkiler."}},
    {"@type":"Question",name:"Türkçe rehber var mı?",acceptedAnswer:{"@type":"Answer",text:"Talep edilebilir; yalnızca tarih ve rehber müsaitliği teyit edildikten sonra garanti edilir."}},
    {"@type":"Question",name:"GoVietStay'de ödeme nasıl yapılır?",acceptedAnswer:{"@type":"Answer",text:"Resmi fiyat VND'dir. Önceden bilet gerektiren turlarda standart depozito yüzde 20; yalnız transfer hizmetlerinde genellikle depozito gerekmez. Son rezervasyon teyidi esas alınır."}}
  ]};
  return <main className={styles.page} lang="tr-TR">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
    <div className={styles.top}><span>TÜRKİYE → VİETNAM</span><b>Da Nang · Hoi An · Hue · Phu Quoc</b><a href="/travel">English →</a></div>
    <header className={styles.nav}><a href="/tr" className={styles.brand}><img src="/govietstay-logo.jpg" alt="GoVietStay"/><span><b>GoVietStay</b><small>TÜRK GEZGİNLER</small></span></a><nav><a href="#karar">Nereden başlamalı?</a><a href="#fiyat">Fiyatlar</a><a href="#pratik">Pratik</a><a href="/tr/vietnam-e-vize-turk-vatandaslari">E-vize</a><a className={styles.cta} href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></nav></header>

    <section className={styles.hero}>
      <div className={styles.heroMain}><img src={turkeyHubVisuals.hero} alt="Hoi An ve Orta Vietnam" fetchPriority="high"/><div className={styles.shade}/><div className={styles.heroCopy}>
        <p>VİETNAM'A GELMEDEN ÖNCE 7 KARARI TEK SAYFADA ÇÖZ</p>
        <h1>Vietnam’ı görmek kolay. <em>Yanlış mevsim, yanlış rota ve yanlış paket seçmemek daha değerlidir.</em></h1>
        <h2>Vize gerekiyor mu? Da Nang mı Phu Quoc mu? Kaç gün? Havalimanından nasıl geçilir? Helal yemek mümkün mü? Grup turu mu özel mi? Önce bunları netleştirelim; sonra sadece gerçekten ihtiyacınız olan hizmeti alın.</h2>
        <div className={styles.actions}><a href="#karar">5 dakikalık karar rehberi</a><a href="#fiyat">Gerçek fiyatları gör</a><a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div>
        <div className={styles.proof}><span>✓ Umuma mahsus pasaport: vize gerekir</span><span>✓ Standart tur = aynı kamu fiyatı</span><span>✓ Türkçe rehber: teyitli müsaitlik</span></div>
      </div></div>
      <aside className={styles.answer}><small>WIIFM · BU SAYFA SİZE NE KAZANDIRIR?</small><h2>Daha az arama. Daha az yanlış seçim.</h2>
        {["Vize bilgisini doğrula","Mevsime göre bölge seç","Gün sayısını gerçekçi kur","Transfer ve yemek sorununu önceden çöz","Tur fiyatını aynı kapsamla karşılaştır"].map((x,i)=><div key={x}><b>0{i+1}</b><span>{x}</span></div>)}
        <a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">Tarihlerinizi gönderin</a>
      </aside>
    </section>

    <section className={styles.quick} id="karar">
      <a href="/tr/vietnam-e-vize-turk-vatandaslari"><small>1 · VİZE</small><b>45 gün vizesiz değil</b><span>Resmi e-vize bilgisini gör →</span></a>
      <a href="#mevsim"><small>2 · MEVSİM</small><b>Da Nang ≠ Phu Quoc</b><span>Ayınıza göre seç →</span></a>
      <a href="/tr/da-nang-gezi-rehberi"><small>3 · SÜRE</small><b>Da Nang için 3–5 gece</b><span>4 günlük iskelet →</span></a>
      <a href="#fiyat"><small>4 · BÜTÇE</small><b>VND ile şeffaf fiyat</b><span>Aynı kapsamı karşılaştır →</span></a>
    </section>

    <section className={styles.privateZone}>
      <div className={styles.privatePhoto}><img src="/travelers/germany.jpg" alt="GoVietStay gerçek misafir" loading="lazy"/></div>
      <div className={styles.privateCopy}><p>01 · BİZİM ANA FİKRİMİZ</p><h2>Tur satmak için her günü doldurmayız. Bazen en iyi tavsiye, o günü boş bırakmaktır.</h2><span>Şehir içi kahve, plaj ve restoran için çoğu zaman tura ihtiyacınız yok. Grup turu ekonomik olduğunda onu öneririz; çocuk, senior misafir, yemek tercihi veya küçük grubun ritmi önemli olduğunda özel hizmet daha fazla değer yaratabilir.</span>
        <div>{["Doğru vize","Doğru mevsim","Gerçek fiyat","Yerel WhatsApp","Özel rota","Dil teyidi"].map((x,i)=><b key={x}><i>0{i+1}</i>{x}</b>)}</div>
        <a href="/tr/vietnam-ozel-tur">Özel tur mantığını gör →</a><a href="/tr/da-nang-gezi-rehberi">Da Nang planı →</a>
      </div>
    </section>

    <section className={styles.section} id="mevsim">
      <div className={styles.head}><div><p>02 · NE ZAMAN / NEREYE?</p><h2>Aynı Vietnam, farklı mevsim. Tatilin ana hedefini önce seçin.</h2></div><span>Da Nang'da Şubat–Mayıs genellikle sıcaklık ve yağış dengesi açısından güçlü dönemdir; Haziran–Ağustos daha sıcak, Eylül–Kasım daha yağışlıdır. Phu Quoc ise kuru dönemde, özellikle sonbahar sonu–ilkbahar başında plaj tatili için daha güçlü olabilir; Temmuz–Eylül yağmur ve fırtına riski artar.</span></div>
      <div className={styles.whyGrid}>
        <div><b>DA NANG</b><h3>Şubat–Mayıs</h3><p>Şehir + plaj + Hoi An + Bà Nà Hills için en dengeli dönemlerden biri. İlk kez gelenler için güçlü seçim.</p></div>
        <div><b>DA NANG</b><h3>Haziran–Ağustos</h3><p>Plaj için popüler ama sıcak ve nemli. Gün ortasını hafif planlamak daha mantıklı.</p></div>
        <div><b>PHU QUOC</b><h3>Ekim–Mart</h3><p>Genellikle daha kuru ve rahat ada dönemi. Resort, snorkeling ve deniz tatili isteyenler için güçlü.</p></div>
        <div><b>PHU QUOC</b><h3>Temmuz–Eylül</h3><p>Yağmur ve deniz koşulları daha değişken. Ada turunda esnek gün bırakmak gerekir.</p></div>
      </div>
      <p className={styles.disclaimer}>Hava hiçbir tur şirketi tarafından garanti edilemez. Deniz operasyonları resmi/yerel güvenlik kararlarına göre değişebilir. <a href={turkeyMarketConfig.officialLinks.vietnamWeather} target="_blank" rel="noreferrer">Vietnam Tourism hava rehberi ↗</a> · <a href={turkeyMarketConfig.officialLinks.phuQuoc} target="_blank" rel="noreferrer">Phu Quoc resmi turizm rehberi ↗</a></p>
    </section>

    <section className={styles.section} id="pratik">
      <div className={styles.head}><div><p>03 · VARIŞTAN İLK AKŞAMA</p><h2>Havalimanı, yemek ve aile konusu turdan önce çözülürse tatil daha kolay başlar.</h2></div><span>Buradaki amaç size her şeyi satmak değil; hangi durumda Grab/taksi yeterli, hangi durumda özel transfer veya önceden planlanmış yemek seçeneği gerçekten stres azaltır onu göstermek.</span></div>
      <div className={styles.whyGrid}>
        <div><b>01</b><h3>Havalimanı → otel</h3><p>Tek kişi veya hafif bagajda Grab/taksi pratik olabilir. Aile, çok bagaj, geç saat veya doğrudan Hoi An transferinde önceden ayarlanmış araç daha kontrollüdür.</p></div>
        <div><b>02</b><h3>Şehir içinde ulaşım</h3><p>Da Nang içinde ride-hailing çoğu kısa yolculuk için yeterlidir. Bir günde çok durak, çocuk veya senior misafir varsa özel araç zaman kazandırır.</p></div>
        <div><b>03</b><h3>Helal / yemek tercihi</h3><p>{turkeyMarketConfig.halalRule}</p></div>
        <div><b>04</b><h3>Çocuklu aile</h3><p>{turkeyMarketConfig.familyRule} Uzun günü iki kısa bloğa bölmek çoğu zaman “daha fazla aktivite” eklemekten değerlidir.</p></div>
      </div>
    </section>

    <section className={styles.priceZone} id="fiyat">
      <div className={styles.priceIntro}><p>04 · FİYAT KONTROLÜ · 29.08.2026</p><h2>En ucuz olmak zorunda değiliz. Aynı kapsamda mantıklı olmak zorundayız.</h2><span>“Bilet”, “transfer”, “yarım tur” ve “tam günlük paket” aynı ürün değildir. Mevcut GoVietStay grup fiyatlarını koruduk; çünkü kapsam eşleştirildiğinde fiyatlar hâlâ savunulabilir ve müşteriye ekstra “Türkiye fiyatı” eklemiyoruz.</span></div>
      <div className={styles.priceGrid}>
        <a href="/tr/ba-na-hills-altin-kopru"><small>DA NANG</small><h3>Bà Nà Hills + Golden Bridge</h3><strong>1.550.000 VND</strong><b>transfer + rehber + giriş + büfe</b><span>Fiyat matematiği →</span></a>
        <a href="/tr/hoi-an-hindistan-cevizi-ormani"><small>HOI AN</small><h3>Coconut Forest + Ancient Town</h3><strong>1.250.000 VND</strong><b>tekne + yemek + fener + transfer</b><span>Kapsamı gör →</span></a>
        <a href="/tr/vietnam-ozel-tur"><small>HUE</small><h3>Hue günlük grup turu</h3><strong>1.450.000 VND</strong><b>mevcut kamu fiyatı</b><span>Özel alternatif →</span></a>
        <a href="/tr/vietnam-ozel-tur"><small>CHAM ADALARI</small><h3>Sürat teknesi + snorkeling</h3><strong>950.000 VND</strong><b>deniz koşuluna bağlı</b><span>Rotaya ekle →</span></a>
      </div>
      <p className={styles.disclaimer}>{turkeyMarketConfig.priceDisclaimer}</p>
    </section>

    <section className={styles.section}>
      <div className={styles.head}><div><p>05 · FİYAT NASIL OKUNUR?</p><h2>Bà Nà Hills bize iyi bir örnek veriyor: sadece giriş biletiyle tam günlük tur aynı şey değil.</h2></div><span>Sun World 2026 referansında yabancı yetişkin temel bilet 1.000.000 VND, bilet + öğle büfesi 1.300.000 VND. GoVietStay standart ürün 1.550.000 VND olduğunda aradaki fark transfer, rehberlik ve operasyonu da taşır. Bu yüzden fiyatı “etiket” değil, “toplam kapsam” olarak okuyoruz.</span></div>
      <div className={styles.cards}>{keyPages.map(slug=>{const p=bySlug(slug)!;const v=getTurkeyVisual(p.slug,p.destination);return <a href={`/tr/${slug}`} key={slug}><div className={styles.photo}><img src={v.hero} alt={p.h1} loading="lazy"/><span>{p.destination}</span></div><div className={styles.body}><h3>{p.h1}</h3><p>{p.wiifm}</p><div><strong>Detaylı rehber</strong><b>Aç →</b></div></div></a>})}</div>
      <p className={styles.disclaimer}><a href={turkeyMarketConfig.officialLinks.bana2026} target="_blank" rel="noreferrer">Sun World Bà Nà Hills 2026 resmi fiyat kaynağı ↗</a></p>
    </section>

    <section className={styles.section}>
      <div className={styles.head}><div><p>06 · DA NANG MI PHU QUOC MU?</p><h2>İkisi rakip değil. Tatil amacınıza göre farklı ürünler.</h2></div><span>Google'da “hangisi daha iyi?” sorusunun tek cevabı yok. Kararı plaj, kültür, çocuk, gün sayısı ve seyahat ayına göre verin.</span></div>
      <div className={styles.whyGrid}>
        <div><b>DA NANG</b><h3>İlk Vietnam seyahati</h3><p>Hoi An, Hue, Bà Nà Hills, şehir ve plajı tek merkezden bağlamak isteyenler için daha çeşitli.</p></div>
        <div><b>PHU QUOC</b><h3>Resort + ada tatili</h3><p>Programı azaltıp plaj, resort, snorkeling ve gün batımına daha fazla zaman bırakmak isteyenlere daha uygun.</p></div>
        <div><b>AİLE</b><h3>Da Nang lojistik avantajı</h3><p>Havalimanı-şehir mesafesi kısa ve birçok deneyim günübirlik yapılabilir; ancak her aile için ritim ayrı düşünülmelidir.</p></div>
        <div><b>KIŞ</b><h3>Phu Quoc'u ciddi düşünün</h3><p>Da Nang daha serin/yağışlı olabilirken Phu Quoc çoğu kış döneminde daha güçlü plaj alternatifi sunabilir.</p></div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.head}><div><p>07 · ÖDEME / İPTAL</p><h2>Ödemeden önce dört satırda ne olacağını bilin.</h2></div><span>Fiyat kadar iptal ve depozito mantığı da güvenin parçasıdır. Rezervasyon teyidinde son koşulları yazılı olarak gönderiyoruz.</span></div>
      <div className={styles.whyGrid}>
        <div><b>VND</b><h3>Resmi fiyat para birimi</h3><p>{turkeyMarketConfig.payment.currency}</p></div>
        <div><b>%20</b><h3>Bilet gereken turlar</h3><p>{turkeyMarketConfig.payment.ticketDeposit}</p></div>
        <div><b>0%</b><h3>Sadece transfer</h3><p>{turkeyMarketConfig.payment.transfer}</p></div>
        <div><b>İADE</b><h3>Hava / hastalık</h3><p>{turkeyMarketConfig.payment.refund}</p></div>
      </div>
    </section>

    <section className={styles.why}>
      <div className={styles.head}><div><p>08 · GÜVEN MİMARİSİ</p><h2>Bir sayfanın amacı müşteriyi ikna etmek değil; yanlış kararı zorlaştırmaktır.</h2></div></div>
      <div className={styles.whyGrid}>
        <div><b>01</b><h3>Vizeyi doğru söylüyoruz</h3><p>Türk umuma mahsus pasaportu için 45 günlük muafiyet yok; resmi e-vize yolunu gösteriyoruz.</p></div>
        <div><b>02</b><h3>Helal kelimesini kolay kullanmıyoruz</h3><p>Restoran veya öğün ancak gerçekten teyit edildiğinde helal diye sunulur.</p></div>
        <div><b>03</b><h3>Rehber dilini garanti etmiyoruz</h3><p>Türkçe rehber yalnızca tarih ve müsaitlik teyidinden sonra teklife girer.</p></div>
        <div><b>04</b><h3>VND esas</h3><p>Kur oynaklığıyla yapay ucuzluk yaratmamak için resmi rezervasyon fiyatını VND gösteriyoruz.</p></div>
      </div>
    </section>

    <section className={styles.guests}><div className={styles.head}><div><p>09 · GERÇEK İNSANLAR</p><h2>Bir söz satın almadan önce, gerçekten yapılmış yolculuklara bakın.</h2></div><span>Mevcut GoVietStay misafir görsellerini kullanıyoruz; Türk pazarı için yapay “mükemmel tatil” fotoğrafı üretmiyoruz.</span></div><div className={styles.guestStrip}>{turkeyGuestPhotos.map((src,i)=><figure key={src}><img src={src} alt={`GoVietStay misafir ${i+1}`} loading="lazy"/></figure>)}</div><a className={styles.reviews} href={turkeyMarketConfig.googleMaps} target="_blank" rel="noreferrer">Google Maps yorumlarını gör →</a></section>

    <section className={styles.intent}><div className={styles.head}><div><p>10 · SADECE 5 DESTEK SAYFASI</p><h2>30 ince sayfa değil. Beş derin karar sayfası.</h2></div><span>/tr ana sayfası bütün yolculuğu anlamanıza yardım eder; alt sayfalar yalnızca daha derin karar gerektiğinde devreye girer.</span></div><div className={styles.intentGrid}>{turkeySeoPages.map(p=><a href={`/tr/${p.slug}`} key={p.slug}><small>{p.destination}</small><h3>{p.h1}</h3><p>{p.wiifm}</p><b>Aç →</b></a>)}</div></section>

    <section className={styles.section}>
      <div className={styles.head}><div><p>11 · RESMİ / BİRİNCİL KAYNAKLAR</p><h2>Değişebilecek bilgiyi kaynakla birlikte veriyoruz.</h2></div><span>Vize, hava ve park fiyatı gibi konular değişebilir. Bu yüzden kullanıcıyı yalnızca GoVietStay metnine mahkûm etmiyoruz.</span></div>
      <div className={styles.whyGrid}>
        <div><b>VİZE</b><h3>T.C. Dışişleri</h3><p>Türk pasaportlarının Vietnam vize durumunu resmi kaynaktan kontrol edin.</p><a href={turkeyMarketConfig.officialLinks.turkeyMfaVietnam} target="_blank" rel="noreferrer">Kaynağı aç ↗</a></div>
        <div><b>E-VİZE</b><h3>Vietnam Göç İdaresi</h3><p>Başvuruyu aracı site yerine resmi e-vize portalından başlatabilirsiniz.</p><a href={turkeyMarketConfig.officialLinks.vietnamEvisa} target="_blank" rel="noreferrer">Resmi portal ↗</a></div>
        <div><b>HAVA</b><h3>Vietnam Tourism</h3><p>Da Nang ve Vietnam mevsim yapısını resmi turizm kaynağından karşılaştırın.</p><a href={turkeyMarketConfig.officialLinks.vietnamWeather} target="_blank" rel="noreferrer">Hava rehberi ↗</a></div>
        <div><b>BÀ NÀ</b><h3>Sun World</h3><p>2026 resmi bilet ve hizmet fiyatını tur fiyatıyla aynı kapsamda karşılaştırın.</p><a href={turkeyMarketConfig.officialLinks.bana2026} target="_blank" rel="noreferrer">Fiyat kaynağı ↗</a></div>
      </div>
    </section>

    <section className={styles.final}><img src="/tour/cham.jpg" alt="GoVietStay yerel destek" loading="lazy"/><div><p>VİETNAM'DA YEREL EKİBİNİZ</p><h2>Uçuş ve otel hazırsa tarih, kişi sayısı, çocukların yaşı/boyu ve görmek istediğiniz iki yeri gönderin. Size en fazla turu değil, en mantıklı planı çıkaralım.</h2><a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp'tan yazın</a></div></section>
    <div className={styles.mobile}><a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">💬 WhatsApp</a><a href="/tr/vietnam-ozel-tur">★ Özel tur</a><a href="/tr/vietnam-e-vize-turk-vatandaslari">🛂 E-vize</a></div>
  </main>
}
