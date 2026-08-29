import type { Metadata } from "next";
import { turkeyMarketConfig } from "../../lib/turkeyMarketConfig";
import { turkeySeoPages } from "../../lib/turkeySeoPages";
import { turkeyHubVisuals, turkeyGuestPhotos } from "../../lib/turkeyVisuals";

export const metadata: Metadata = {
  title: { absolute: "Vietnam Gezi Rehberi ve Yerel Destek 2026 | GoVietStay Türkiye" },
  description:
    "Türk gezginler için Vietnam: vize, mevsim, Da Nang mı Phu Quoc mu, fiyatlar, aile seyahati, yemek tercihleri ve gerçek yerel destek.",
  alternates: {
    canonical: "https://www.govietstay.com/tr",
    languages: {
      "tr-TR": "https://www.govietstay.com/tr",
      en: "https://www.govietstay.com/travel",
      "x-default": "https://www.govietstay.com",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.govietstay.com/tr",
    title: "GoVietStay Türkiye | Vietnam’da yerel destek",
    description:
      "Önce doğru karar, sonra doğru hizmet: vize, rota, fiyat ve GoVietStay local support.",
    locale: "tr_TR",
    siteName: "GoVietStay",
  },
};

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ color: "#0b5d3b", fontWeight: 800, fontSize: 12, letterSpacing: 0.5 }}>{eyebrow}</div>
      <h2 style={{ margin: "7px 0 10px", fontSize: 38, lineHeight: 1.15, color: "#10231a" }}>{title}</h2>
      {text ? <p style={{ margin: 0, lineHeight: 1.8, color: "#31443b", fontSize: 18 }}>{text}</p> : null}
    </div>
  );
}

function LinkCard({
  href,
  eyebrow,
  title,
  text,
}: {
  href: string;
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <a
      href={href}
      style={{
        textDecoration: "none",
        background: "#fff",
        border: "1px solid #ebe3cf",
        borderRadius: 20,
        padding: 22,
        color: "#10231a",
        display: "block",
      }}
    >
      <div style={{ color: "#0b5d3b", fontWeight: 800, fontSize: 12 }}>{eyebrow}</div>
      <div style={{ fontWeight: 800, fontSize: 28, lineHeight: 1.16, margin: "10px 0 10px" }}>{title}</div>
      <div style={{ lineHeight: 1.75, color: "#31443b" }}>{text}</div>
    </a>
  );
}

function PriceCard({
  title,
  price,
  note,
  href,
}: {
  title: string;
  price: string;
  note: string;
  href: string;
}) {
  return (
    <a
      href={href}
      style={{
        textDecoration: "none",
        background: "#fff",
        border: "1px solid #ebe3cf",
        borderRadius: 20,
        padding: 22,
        color: "#10231a",
        display: "block",
      }}
    >
      <div style={{ fontWeight: 800, fontSize: 24, lineHeight: 1.2 }}>{title}</div>
      <div style={{ color: "#0b5d3b", fontWeight: 900, fontSize: 34, marginTop: 10 }}>{price}</div>
      <div style={{ lineHeight: 1.75, color: "#31443b", marginTop: 10 }}>{note}</div>
    </a>
  );
}

export default function TurkeyHubPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Türk vatandaşları Vietnam’a vizesiz girebilir mi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Umuma mahsus pasaport sahipleri için güncel resmi bilgiye göre vize gerekir.",
        },
      },
      {
        "@type": "Question",
        name: "Da Nang mı Phu Quoc mu?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Da Nang ilk Vietnam seyahati için şehir, plaj ve günübirlik kültür rotalarıyla güçlü bir merkezdir; Phu Quoc ise daha ada ve resort odaklıdır.",
        },
      },
      {
        "@type": "Question",
        name: "GoVietStay’de ödeme nasıl yapılır?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Resmi fiyatlandırma VND ile yapılır. Bilet gerektiren turlarda standart depozito yüzde 20’dir; sadece transferde normal şartlarda depozito gerekmez.",
        },
      },
    ],
  };

  return (
    <main style={{ fontFamily: "Inter, Arial, sans-serif", color: "#10231a", background: "#fcfbf7" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div style={{ background: "#062e22", color: "#f8f0c8", padding: "10px 20px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", fontWeight: 800 }}>
          <span>TÜRKİYE → VİETNAM</span>
          <span>Da Nang · Hoi An · Hue · Phu Quoc</span>
        </div>
      </div>

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "20px 20px 70px" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            marginBottom: 22,
            flexWrap: "wrap",
          }}
        >
          <a href="/tr" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
            <img src="/govietstay-logo.jpg" alt="GoVietStay" style={{ width: 58, height: 58, borderRadius: 999 }} />
            <div>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#10231a" }}>GoVietStay</div>
              <div style={{ color: "#708076", letterSpacing: 1.1, fontSize: 14 }}>TÜRK GEZGİNLER</div>
            </div>
          </a>
          <nav style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <a href="#start" style={{ color: "#10231a", textDecoration: "none", fontWeight: 800 }}>Nereden başlamalı?</a>
            <a href="#compare" style={{ color: "#10231a", textDecoration: "none", fontWeight: 800 }}>Da Nang mı Phu Quoc mu?</a>
            <a href="#prices" style={{ color: "#10231a", textDecoration: "none", fontWeight: 800 }}>Fiyatlar</a>
            <a href="/tr/vietnam-e-vize-turk-vatandaslari" style={{ color: "#10231a", textDecoration: "none", fontWeight: 800 }}>E-vize</a>
            <a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: "#13a36b", color: "#fff", padding: "13px 20px", borderRadius: 999, fontWeight: 900 }}>
              WhatsApp
            </a>
          </nav>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: 24,
            alignItems: "stretch",
            marginBottom: 28,
          }}
        >
          <div style={{ background: "#fff", border: "1px solid #ebe3cf", borderRadius: 28, overflow: "hidden" }}>
            <img
              src={turkeyHubVisuals.heroSupport}
              alt="GoVietStay local support"
              style={{ width: "100%", height: 380, objectFit: "cover" }}
            />
            <div style={{ padding: 28 }}>
              <div style={{ color: "#0b5d3b", fontWeight: 900, fontSize: 13, marginBottom: 10 }}>
                GO VIETSTAY LOCAL SUPPORT
              </div>
              <h1 style={{ margin: 0, fontSize: 56, lineHeight: 1.04, color: "#10231a" }}>
                Vietnam’ı planlamak zor değil.
                <span style={{ color: "#98742a" }}> Doğru mevsim, doğru rota ve doğru destek fark yaratır.</span>
              </h1>
              <p style={{ margin: "18px 0 0", fontSize: 21, lineHeight: 1.7, color: "#31443b" }}>
                Uçuş ve otelinizi siz seçin. Biz Vietnam’da neyi kendiniz yapabileceğinizi, nerede destek almanın
                gerçekten zaman ve stres kazandırdığını açıkça anlatalım.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
                <a href="#start" style={{ textDecoration: "none", background: "#f4c84d", color: "#10231a", padding: "14px 20px", borderRadius: 999, fontWeight: 900 }}>5 dakikalık karar rehberi</a>
                <a href="#prices" style={{ textDecoration: "none", background: "#f3efe5", color: "#10231a", padding: "14px 20px", borderRadius: 999, fontWeight: 900 }}>Gerçek fiyatları gör</a>
                <a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: "#13a36b", color: "#fff", padding: "14px 20px", borderRadius: 999, fontWeight: 900 }}>WhatsApp</a>
              </div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 18, color: "#31443b" }}>
                <span>✓ Vize konusunda dürüst bilgi</span>
                <span>✓ Şeffaf VND fiyatı</span>
                <span>✓ Türkçe rehber yalnızca teyitle</span>
              </div>
            </div>
          </div>

          <div style={{ background: "#f7f4eb", border: "1px solid #e5dcc6", borderRadius: 28, padding: 26, display: "grid", alignContent: "start", gap: 16 }}>
            <div style={{ color: "#0b5d3b", fontWeight: 900, fontSize: 13 }}>NEDEN BU SAYFA?</div>
            <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.1, color: "#10231a" }}>
              Daha az arama. Daha az yanlış seçim.
            </h2>
            {[
              "Vize bilgisini doğrula",
              "Ayınıza göre doğru bölgeyi seç",
              "Kaç gün gerektiğini gerçekçi kur",
              "Grab mı, transfer mi, özel araç mı anlayın",
              "Tur fiyatını aynı kapsamla karşılaştır",
              "Aile, çocuk ve yemek tercihlerini önceden çöz",
            ].map((item, i) => (
              <div key={item} style={{ background: "#fff", borderRadius: 16, padding: "14px 16px", border: "1px solid #ebe3cf", fontWeight: 800, display: "flex", gap: 12 }}>
                <span style={{ color: "#0b5d3b" }}>0{i + 1}</span>
                <span>{item}</span>
              </div>
            ))}
            <a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: "#13a36b", color: "#fff", padding: "15px 22px", borderRadius: 999, fontWeight: 900, textAlign: "center" }}>
              Tarihlerinizi gönderin
            </a>
          </div>
        </section>

        <section id="start" style={{ marginBottom: 36 }}>
          <SectionTitle
            eyebrow="START HERE"
            title="Önce şu üç kararı verin."
            text="Bu üç giriş kapısı, Türk gezginlerin Vietnam öncesi en sık yaşadığı karışıklığı hızlıca sadeleştirir."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            <LinkCard
              href="/tr/vietnam-e-vize-turk-vatandaslari"
              eyebrow="1 · VİZE"
              title="Vietnam’a giriş bilgisini netleştirin."
              text="Türk umuma mahsus pasaportu için doğru resmi vize bilgisini görün; yanlış “45 gün” iddiasına güvenmeyin."
            />
            <LinkCard
              href="/tr/da-nang-gezi-rehberi"
              eyebrow="2 · ROTA"
              title="Da Nang’dan başlayarak akıllı bir plan kurun."
              text="3–5 gecelik dengeli bir Orta Vietnam akışıyla ilk seyahati gereksiz yormadan kurun."
            />
            <LinkCard
              href="/tr/vietnam-ozel-tur"
              eyebrow="3 · DESTEK"
              title="Private trip mi, grup turu mu, sadece araç mı?"
              text="Hazır paketi değil, grubunuza gerçekten uyan modeli seçin. Gereksiz parçalar için ödeme yapmayın."
            />
          </div>
        </section>

        <section id="compare" style={{ marginBottom: 36 }}>
          <SectionTitle
            eyebrow="DA NANG MI PHU QUOC MU?"
            title="İkisi rakip değil. Tatil amacınıza göre farklı cevaplar."
            text="Birinde şehir + kültür + günübirlik çeşitlilik, diğerinde ada + resort + deniz odağı öne çıkar."
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div style={{ background: "#fff", border: "1px solid #ebe3cf", borderRadius: 22, overflow: "hidden" }}>
              <img src={turkeyHubVisuals.daNang} alt="Da Nang" style={{ width: "100%", height: 240, objectFit: "cover" }} />
              <div style={{ padding: 22 }}>
                <div style={{ color: "#0b5d3b", fontWeight: 900, fontSize: 13 }}>DA NANG</div>
                <h3 style={{ margin: "8px 0 10px", fontSize: 34, lineHeight: 1.15 }}>İlk Vietnam seyahati için güçlü üs</h3>
                <div style={{ display: "grid", gap: 10, color: "#31443b", lineHeight: 1.75 }}>
                  <div>✓ Şehir + plaj + Hoi An + Hue + Bà Nà bağlantısı</div>
                  <div>✓ 3–5 gece için dengeli seçenek</div>
                  <div>✓ Aileler ve ilk kez gelenler için lojistik açıdan rahat</div>
                </div>
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #ebe3cf", borderRadius: 22, overflow: "hidden" }}>
              <img src={turkeyHubVisuals.heroSea} alt="Phu Quoc" style={{ width: "100%", height: 240, objectFit: "cover" }} />
              <div style={{ padding: 22 }}>
                <div style={{ color: "#0b5d3b", fontWeight: 900, fontSize: 13 }}>PHU QUOC</div>
                <h3 style={{ margin: "8px 0 10px", fontSize: 34, lineHeight: 1.15 }}>Ada ve resort odaklı daha rahat tempo</h3>
                <div style={{ display: "grid", gap: 10, color: "#31443b", lineHeight: 1.75 }}>
                  <div>✓ Deniz, resort ve ada turları öne çıkar</div>
                  <div>✓ Kış dönemi için çoğu zaman daha güçlü plaj alternatifi</div>
                  <div>✓ Daha yavaş, daha tatil odaklı ritim isteyenlere uygun</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 36 }}>
          <SectionTitle
            eyebrow="PRATİK DESTEK"
            title="Seyahatin en gerçek meseleleri: transfer, yemek, aile, ödeme"
            text="GoVietStay’i değerli yapan şey yalnızca tur satmak değil; yerde karar yorgunluğunu azaltmaktır."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
            <div style={{ background: "#fff", border: "1px solid #ebe3cf", borderRadius: 20, padding: 20 }}>
              <div style={{ color: "#0b5d3b", fontWeight: 900 }}>TRANSFER</div>
              <p style={{ margin: "10px 0 0", lineHeight: 1.75, color: "#31443b" }}>
                Tek kişi ve hafif bagajda Grab yeterli olabilir. Aile, çok bagaj, geç saat veya doğrudan Hoi An geçişinde planlı transfer daha rahat olabilir.
              </p>
            </div>
            <div style={{ background: "#fff", border: "1px solid #ebe3cf", borderRadius: 20, padding: 20 }}>
              <div style={{ color: "#0b5d3b", fontWeight: 900 }}>YEMEK</div>
              <p style={{ margin: "10px 0 0", lineHeight: 1.75, color: "#31443b" }}>
                {turkeyMarketConfig.halalRule}
              </p>
            </div>
            <div style={{ background: "#fff", border: "1px solid #ebe3cf", borderRadius: 20, padding: 20 }}>
              <div style={{ color: "#0b5d3b", fontWeight: 900 }}>AİLE</div>
              <p style={{ margin: "10px 0 0", lineHeight: 1.75, color: "#31443b" }}>
                {turkeyMarketConfig.familyRule}
              </p>
            </div>
            <div style={{ background: "#fff", border: "1px solid #ebe3cf", borderRadius: 20, padding: 20 }}>
              <div style={{ color: "#0b5d3b", fontWeight: 900 }}>ÖDEME</div>
              <p style={{ margin: "10px 0 0", lineHeight: 1.75, color: "#31443b" }}>
                {turkeyMarketConfig.payment.currency} {turkeyMarketConfig.payment.ticketDeposit}
              </p>
            </div>
          </div>
        </section>

        <section id="prices" style={{ marginBottom: 36 }}>
          <SectionTitle
            eyebrow="FİYATLAR"
            title="En ucuz olmak değil; aynı kapsamda mantıklı olmak önemli."
            text="Bilet-only, transfer-only ve tam tur paketini aynı ürün gibi okumayın. Aşağıdaki fiyatlar mevcut GoVietStay ürünleriyle korunmuştur."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
            <PriceCard
              href="/tr/ba-na-hills-altin-kopru"
              title="Bà Nà Hills + Altın Köprü"
              price="1.550.000 VND"
              note="Transfer + rehber + giriş/teleferik + öğle büfesi"
            />
            <PriceCard
              href="/tr/hoi-an-hindistan-cevizi-ormani"
              title="Hoi An + Coconut Forest"
              price="1.250.000 VND"
              note="Sepet tekne + giriş + akşam yemeği + fener + transfer"
            />
            <PriceCard
              href="/tr/vietnam-ozel-tur"
              title="Hue günlük tur"
              price="1.450.000 VND"
              note="Mevcut kamu fiyatı; tarih teyidinde kapsam yazılı gönderilir"
            />
            <PriceCard
              href="/tr/vietnam-ozel-tur"
              title="Cham Adaları"
              price="950.000 VND"
              note="Sürat teknesi + snorkeling + öğle yemeği + transfer"
            />
          </div>
          <p style={{ marginTop: 14, color: "#6f6248", lineHeight: 1.7 }}>{turkeyMarketConfig.priceDisclaimer}</p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <SectionTitle
            eyebrow="GÜVEN MİMARİSİ"
            title="Bizi ikna edici yapan şey büyük vaatler değil, kontrollü dürüstlüktür."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
            {[
              ["Doğru vize bilgisi", "Yanlış kolaylık vaat etmek yerine resmi vize durumunu açıkça söylüyoruz."],
              ["Türkçe rehber yalnızca teyitle", "Müsaitlik ve tarih netleşmeden “kesin” demiyoruz."],
              ["Gerçek VND fiyatı", "Kur oyunlarıyla yapay ucuzluk değil, açık kamu fiyatı kullanıyoruz."],
              ["Yerel WhatsApp desteği", "Plan değiştiğinde veya sorunuz olduğunda gerçek bir temas noktası var."],
            ].map(([title, text]) => (
              <div key={title} style={{ background: "#fff", border: "1px solid #ebe3cf", borderRadius: 20, padding: 20 }}>
                <div style={{ color: "#0b5d3b", fontWeight: 900 }}>{title}</div>
                <p style={{ margin: "10px 0 0", lineHeight: 1.75, color: "#31443b" }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 36 }}>
          <SectionTitle
            eyebrow="GERÇEK GÖRSELLER"
            title="Yapay tatil değil, gerçek misafir hissi."
            text="Hero’da da bu yüzden “GoVietStay local support” duygusunu öne çıkardık: insan, destek ve yer duygusu aynı anda görülmeli."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}>
            {turkeyGuestPhotos.map((src, i) => (
              <img key={src + i} src={src} alt={`GoVietStay guest ${i + 1}`} style={{ width: "100%", height: 170, objectFit: "cover", borderRadius: 18, border: "1px solid #ebe3cf" }} />
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 36 }}>
          <SectionTitle
            eyebrow="6 URL STRATEJİSİ"
            title="Sayı değil, derinlik."
            text="Bu Türkçe bölümde sadece 1 ana hub ve 5 derin sayfa var. Her biri gerçek bir karar problemini çözüyor."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {turkeySeoPages.map((p) => (
              <LinkCard key={p.slug} href={`/tr/${p.slug}`} eyebrow={p.destination} title={p.h1} text={p.wiifm} />
            ))}
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "0.95fr 1.05fr",
            gap: 24,
            background: "#fff",
            border: "1px solid #ebe3cf",
            borderRadius: 28,
            overflow: "hidden",
          }}
        >
          <img src={turkeyHubVisuals.heroSea} alt="Phu Quoc sea" style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 320 }} />
          <div style={{ padding: 28, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ color: "#0b5d3b", fontWeight: 900, fontSize: 13 }}>SON ADIM</div>
            <h2 style={{ margin: "8px 0 10px", fontSize: 46, lineHeight: 1.08 }}>
              Uçuş tarihinizi ve kaç kişi olduğunuzu yazın.
            </h2>
            <p style={{ margin: 0, fontSize: 19, lineHeight: 1.8, color: "#31443b" }}>
              İsterseniz yalnızca bölge seçimini netleştirelim; isterseniz tam günü planlayalım. Size en uygun
              bölgeyi, tur modelini ve mantıklı ilk adımı birlikte çıkaralım.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
              <a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: "#13a36b", color: "#fff", padding: "14px 20px", borderRadius: 999, fontWeight: 900 }}>WhatsApp’tan yazın</a>
              <a href={turkeyMarketConfig.googleMaps} target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: "#f3efe5", color: "#10231a", padding: "14px 20px", borderRadius: 999, fontWeight: 900 }}>Google Maps</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
