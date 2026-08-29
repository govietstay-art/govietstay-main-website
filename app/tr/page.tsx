import type { Metadata } from "next";
import { turkeyMarketConfig } from "../../lib/turkeyMarketConfig";
import { turkeySeoPages } from "../../lib/turkeySeoPages";
import { turkeyGuestPhotos, turkeyHubVisuals } from "../../lib/turkeyVisuals";
import styles from "./TurkeyFinal.module.css";

export const metadata: Metadata = {
  title: { absolute: "Vietnam Gezi Rehberi ve Turlar 2026 | Türk Gezginler | GoVietStay" },
  description: "Türk gezginler için Vietnam: e-vize, Da Nang, Hoi An, Hue, Phu Quoc, tur fiyatları, özel tur ve gerçek yerel WhatsApp desteği.",
  alternates: { canonical: "https://www.govietstay.com/tr", languages: { "tr-TR": "https://www.govietstay.com/tr", en: "https://www.govietstay.com/travel", "x-default": "https://www.govietstay.com" } },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: "https://www.govietstay.com/tr", title: "GoVietStay Türkiye | Vietnam’da yerel destek", description: "Vize, rota, fiyat ve yerel destek: Vietnam seyahatinizi daha az yanlış seçimle planlayın.", locale: "tr_TR", siteName: "GoVietStay" },
};

const priceCards = [
  { href: "/tr/ba-na-hills-altin-kopru", label: "DA NANG", title: "Bà Nà Hills + Altın Köprü", price: "1.550.000 VND", text: "Transfer, rehber, giriş/teleferik ve öğle büfesi." },
  { href: "/tr/hoi-an-hindistan-cevizi-ormani", label: "HOI AN", title: "Hoi An + Hindistan Cevizi Ormanı", price: "1.250.000 VND", text: "Sepet tekne, Eski Şehir, akşam yemeği, nehir teknesi ve fener." },
  { href: "/tr/vietnam-ozel-tur", label: "HUE", title: "Hue günlük turu", price: "1.450.000 VND", text: "Da Nang’dan tam günlük tarih ve kültür rotası." },
  { href: "/tr/vietnam-ozel-tur", label: "CHAM ADALARI", title: "Cham Adaları", price: "950.000 VND", text: "Sürat teknesi, snorkeling ve öğle yemeği. Deniz koşullarına bağlıdır." },
];

export default function TurkeyHubPage() {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
    { "@type": "Question", name: "Türk vatandaşları Vietnam’a vizesiz girebilir mi?", acceptedAnswer: { "@type": "Answer", text: "Umuma mahsus pasaport sahipleri için güncel resmi bilgiye göre vize gerekir." } },
    { "@type": "Question", name: "Da Nang mı Phu Quoc mu?", acceptedAnswer: { "@type": "Answer", text: "Da Nang şehir, plaj ve kültür çeşitliliği için; Phu Quoc ise ada, resort ve daha yavaş bir tatil ritmi için güçlüdür." } },
    { "@type": "Question", name: "GoVietStay’de ödeme nasıl yapılır?", acceptedAnswer: { "@type": "Answer", text: "Resmi fiyatlandırma VND ile yapılır. Önceden bilet gerektiren turlarda standart depozito yüzde 20’dir." } },
  ]};

  return <main className={styles.page} lang="tr-TR">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <div className={styles.topbar}><div className={styles.topbarInner}><span>TÜRKİYE → VİETNAM</span><span>Da Nang · Hoi An · Hue · Phu Quoc</span></div></div>
    <div className={styles.shell}>
      <header className={styles.nav}>
        <a className={styles.brand} href="/tr"><img src="/govietstay-logo.jpg" alt="GoVietStay"/><span><strong>GoVietStay</strong><small>TÜRK GEZGİNLER</small></span></a>
        <nav className={styles.desktopNav}><a href="#start">Nereden başlamalı?</a><a href="#compare">Da Nang mı Phu Quoc mu?</a><a href="#prices">Fiyatlar</a><a href="/tr/vietnam-e-vize-turk-vatandaslari">E-vize</a><a className={styles.whatsappBtn} href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroVisual}>
          <img className={styles.heroSupport} src={turkeyHubVisuals.heroSupport} alt="GoVietStay local support in Vietnam"/>
          <img className={styles.heroSea} src={turkeyHubVisuals.heroSea} alt="Phu Quoc sea"/>
          <div className={styles.heroShade}/>
          <div className={styles.heroBrand}><img src="/govietstay-logo.jpg" alt=""/><div><strong>GoVietStay Local Support</strong><span>govietstay.com · Vietnam</span></div></div>
        </div>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>GO VIETSTAY · VIETNAM’DA YEREL DESTEK</div>
          <h1>Vietnam’ı planlamak zor değil. <em>Doğru rota ve doğru destek fark yaratır.</em></h1>
          <p>Vietnam’a gelmeden önce vizeyi, doğru bölgeyi, tur seçeneklerini ve yerel desteği tek yerde netleştirin. Da Nang, Hoi An, Hue ve Phu Quoc’ta yalnızca gerçekten ihtiyacınız olan hizmeti seçin.</p>
          <div className={styles.heroActions}><a className={styles.primaryBtn} href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp’tan bize yazın</a><a className={styles.secondaryBtn} href="#prices">Fiyatları görün</a></div>
          <div className={styles.microTrust}><span>✓ Doğru vize bilgisi</span><span>✓ Şeffaf VND fiyatları</span><span>✓ Gerçek yerel destek</span></div>
        </div>
      </section>

      <section className={styles.section} id="start">
        <div className={styles.sectionHead}><div className={styles.eyebrow}>NEREDEN BAŞLAMALI?</div><h2>Vietnam seyahatinizi üç adımda sadeleştirin.</h2><p>Her şeyi bir anda planlamak zorunda değilsiniz. Önce giriş şartlarını, sonra bölgeyi, en son hangi desteğe gerçekten ihtiyacınız olduğunu belirleyin.</p></div>
        <div className={styles.startGrid}>
          <a className={styles.startCard} href="/tr/vietnam-e-vize-turk-vatandaslari"><small>1 · VİZE</small><h3>Vietnam e-vizesi</h3><p>Türk umuma mahsus pasaportuyla Vietnam’a seyahat ederken vize gerekir. Resmi başvuru yolunu görün.</p><b>E-vize rehberini aç →</b></a>
          <a className={styles.startCard} href="/tr/da-nang-gezi-rehberi"><small>2 · ROTA</small><h3>Da Nang gezi rehberi</h3><p>Kaç gün kalmalı, Hoi An ve Bà Nà Hills’i nasıl birleştirmeli, nerede konaklamalı?</p><b>Da Nang planını görün →</b></a>
          <a className={styles.startCard} href="/tr/vietnam-ozel-tur"><small>3 · DESTEK</small><h3>Size özel Vietnam planı</h3><p>Aile, çift veya küçük grup olarak araç, rehber ve programı yalnızca ihtiyacınıza göre kurun.</p><b>Özel turu inceleyin →</b></a>
        </div>
      </section>

      <section className={styles.section} id="compare">
        <div className={styles.sectionHead}><div className={styles.eyebrow}>DA NANG MI, PHU QUOC MU?</div><h2>“Hangisi daha iyi?” değil. “Hangisi sizin tatilinize daha uygun?”</h2><p>İlk Vietnam seyahatiniz, seyahat ayınız ve ne kadar hareket etmek istediğiniz kararı değiştirir.</p></div>
        <div className={styles.compareGrid}>
          <article className={styles.compareCard}><img src={turkeyHubVisuals.daNang} alt="Da Nang"/><div className={styles.compareBody}><small>DA NANG</small><h3>Şehir + plaj + kültür + günübirlik keşif</h3><p>İlk Vietnam seyahatinde daha fazla çeşitlilik isteyenler için güçlü bir üs.</p><div className={styles.compareList}><span>✓ İlk kez gelenler</span><span>✓ 3–5 gece</span><span>✓ Aileler ve çiftler</span><span>✓ Hoi An · Hue · Bà Nà bağlantısı</span></div></div></article>
          <article className={styles.compareCard}><img src={turkeyHubVisuals.phuQuoc} alt="Phu Quoc"/><div className={styles.compareBody}><small>PHU QUOC</small><h3>Ada + resort + deniz + daha yavaş tempo</h3><p>Programdan çok tatilin kendisine zaman ayırmak isteyenler için daha rahat bir ritim.</p><div className={styles.compareList}><span>✓ Resort tatili</span><span>✓ Deniz ve snorkeling</span><span>✓ Daha yavaş tempo</span><span>✓ Kış dönemi için güçlü seçenek</span></div></div></article>
        </div>
      </section>

      <section className={styles.section} id="prices">
        <div className={styles.sectionHead}><div className={styles.eyebrow}>EN ÇOK SORULAN TURLAR</div><h2>Fiyatı değil, toplam kapsamı karşılaştırın.</h2><p>Sadece giriş bileti, sadece transfer ve tam günlük tur aynı ürün değildir.</p></div>
        <div className={styles.priceGrid}>{priceCards.map(item=><a className={styles.priceCard} href={item.href} key={item.title}><small>{item.label}</small><h3>{item.title}</h3><strong>{item.price}</strong><p>{item.text}</p></a>)}</div>
        <p className={styles.disclaimer}>{turkeyMarketConfig.priceDisclaimer}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><div className={styles.eyebrow}>NEDEN GOVIETSTAY?</div><h2>Daha büyük vaatler değil, daha az sürpriz.</h2></div>
        <div className={styles.trustGrid}>
          <article className={styles.trustCard}><small>01</small><h3>Yanlış vize bilgisi vermiyoruz</h3><p>Türk pasaportu için geçerli olmayan kolay ama yanlış mesajları kullanmıyoruz.</p></article>
          <article className={styles.trustCard}><small>02</small><h3>Fiyatı açık anlatıyoruz</h3><p>Bilet-only fiyatını tam turla aynı şey gibi göstermiyoruz.</p></article>
          <article className={styles.trustCard}><small>03</small><h3>Türkçe rehber yalnızca teyitle</h3><p>Müsaitlik teyit edilmeden “kesin var” demiyoruz.</p></article>
          <article className={styles.trustCard}><small>04</small><h3>Vietnam’da gerçek temas noktası</h3><p>Plan değiştiğinde WhatsApp üzerinden yerel bir ekibe ulaşabilirsiniz.</p></article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><div className={styles.eyebrow}>PRATİK BİLGİLER</div><h2>Küçük detaylar tatilin konforunu değiştirir.</h2></div>
        <div className={styles.accordionWrap}>
          <details className={styles.accordion}><summary>Havalimanından otele nasıl giderim?</summary><p>Tek kişi veya hafif bagajla Grab/taksi çoğu zaman yeterlidir. Aile, çok bagaj, geç saat veya doğrudan Hoi An transferinde önceden ayarlanmış özel araç daha rahat olabilir.</p></details>
          <details className={styles.accordion}><summary>Helal yemek bulabilir miyim?</summary><p>{turkeyMarketConfig.halalRule}</p></details>
          <details className={styles.accordion}><summary>Çocuklarla seyahat için ne değişir?</summary><p>{turkeyMarketConfig.familyRule} Programı da çocukların temposuna göre sadeleştirebiliriz.</p></details>
          <details className={styles.accordion}><summary>Ödeme nasıl yapılır?</summary><p>{turkeyMarketConfig.payment.currency} {turkeyMarketConfig.payment.ticketDeposit} {turkeyMarketConfig.payment.transfer}</p></details>
          <details className={styles.accordion}><summary>Hava nedeniyle tur iptal olursa?</summary><p>{turkeyMarketConfig.payment.refund}</p></details>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><div className={styles.eyebrow}>GERÇEK MİSAFİRLER</div><h2>Bir reklamdan önce gerçek deneyime bakın.</h2><p>GoVietStay’i yalnızca anlattıklarımızla değil, daha önce bizimle seyahat etmiş misafirlerin deneyimleriyle değerlendirin.</p></div>
        <div className={styles.guests}>{turkeyGuestPhotos.slice(0,3).map((src,index)=><img key={src} src={src} alt={`GoVietStay gerçek misafir ${index+1}`}/>)}</div>
        <div className={styles.reviewCta}><a className={styles.secondaryBtn} href={turkeyMarketConfig.googleMaps} target="_blank" rel="noreferrer">Google Maps yorumlarını görün →</a></div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><div className={styles.eyebrow}>DAHA FAZLA BİLGİ</div><h2>İhtiyacınız olduğunda daha derine inin.</h2></div>
        <div className={styles.deepGrid}>{turkeySeoPages.map(page=><a key={page.slug} href={`/tr/${page.slug}`}><small>{page.destination}</small><strong>{page.h1}</strong></a>)}</div>
      </section>

      <section className={styles.finalCta}>
        <img src={turkeyHubVisuals.heroSea} alt="Phu Quoc Vietnam"/>
        <div className={styles.finalCopy}><div className={styles.eyebrow}>VİETNAM’DA YEREL EKİBİNİZ</div><h2>Tarihinizi ve kaç kişi olduğunuzu yazın. Gerisini birlikte sadeleştirelim.</h2><p>İsterseniz yalnızca hangi bölgenin size uygun olduğunu sorun. İsterseniz araç, tur ve günlük programı birlikte planlayalım. İlk mesaj için rezervasyon yapmanız gerekmez.</p><div className={styles.finalActions}><a className={styles.primaryBtn} href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp’tan planınızı gönderin</a><a className={styles.secondaryBtn} href={turkeyMarketConfig.googleMaps} target="_blank" rel="noreferrer">Google Maps yorumları</a></div></div>
      </section>
    </div>
    <div className={styles.mobileSticky}><a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp’tan bize yazın</a></div>
  </main>;
}
