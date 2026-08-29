import type { TurkeySeoPage } from "../../../lib/turkeySeoPages";
import { turkeyMarketConfig } from "../../../lib/turkeyMarketConfig";
import { getTurkeyVisual } from "../../../lib/turkeyVisuals";

function fmt(vnd: number) {
  return new Intl.NumberFormat("tr-TR").format(vnd) + " VND";
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ color: "#0b5d3b", fontWeight: 700, fontSize: 12, letterSpacing: 0.5 }}>{eyebrow}</div>
      <h2 style={{ margin: "6px 0 0", fontSize: 30, lineHeight: 1.2, color: "#10231a" }}>{title}</h2>
    </div>
  );
}

function PriceBox({ page }: { page: TurkeySeoPage }) {
  if (!page.priceKey) {
    return (
      <div style={{ background: "#f7f4eb", border: "1px solid #e5dcc6", borderRadius: 18, padding: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#0b5d3b" }}>ÖZEL PLAN</div>
        <h3 style={{ fontSize: 28, margin: "8px 0 10px", color: "#10231a" }}>Önce ihtiyaç, sonra fiyat.</h3>
        <p style={{ margin: 0, lineHeight: 1.75, color: "#31443b" }}>
          Tarih, kişi sayısı, otel, rehber dili ve görmek istediğiniz iki yeri gönderin. Size
          gereksiz hizmet eklemeden, mantıklı bir ilk plan çıkaralım.
        </p>
      </div>
    );
  }
  const p = turkeyMarketConfig.prices[page.priceKey];
  if (!p) return null;
  return (
    <div style={{ background: "#f7f4eb", border: "1px solid #e5dcc6", borderRadius: 18, padding: 24 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#0b5d3b" }}>{p.label}</div>
      <h3 style={{ fontSize: 34, margin: "8px 0 4px", color: "#10231a" }}>{fmt(p.vnd)}</h3>
      <div style={{ fontWeight: 700, color: "#31443b", marginBottom: 10 }}>Yetişkin referans fiyatı</div>
      <p style={{ margin: 0, lineHeight: 1.75, color: "#31443b" }}>{p.note}</p>
      <p style={{ margin: "12px 0 0", lineHeight: 1.6, color: "#7a6d53", fontSize: 14 }}>
        {turkeyMarketConfig.priceDisclaimer}
      </p>
    </div>
  );
}

export default function TurkeyPage({
  page,
  related,
}: {
  page: TurkeySeoPage;
  related: TurkeySeoPage[];
}) {
  const visual = getTurkeyVisual(page.slug);
  const canonical = `https://www.govietstay.com/tr/${page.slug}`;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <main style={{ fontFamily: "Inter, Arial, sans-serif", color: "#10231a", background: "#fcfbf7" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "18px 20px 70px" }}>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <a href="/tr" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img src="/govietstay-logo.jpg" alt="GoVietStay" style={{ width: 54, height: 54, borderRadius: 999 }} />
            <div>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#10231a" }}>GoVietStay</div>
              <div style={{ color: "#6a786e", letterSpacing: 1, fontSize: 13 }}>TÜRK GEZGİNLER</div>
            </div>
          </a>
          <nav style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
            <a href="/tr" style={{ color: "#10231a", textDecoration: "none", fontWeight: 700 }}>Ana sayfa</a>
            <a href="/tr/da-nang-gezi-rehberi" style={{ color: "#10231a", textDecoration: "none", fontWeight: 700 }}>Da Nang</a>
            <a href="/tr/vietnam-ozel-tur" style={{ color: "#10231a", textDecoration: "none", fontWeight: 700 }}>Özel tur</a>
            <a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: "#13a36b", color: "#fff", padding: "12px 18px", borderRadius: 999, fontWeight: 800 }}>WhatsApp</a>
          </nav>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 24,
            background: "#fff",
            borderRadius: 28,
            overflow: "hidden",
            border: "1px solid #ebe3cf",
            marginBottom: 26,
          }}
        >
          <img src={visual.hero} alt={page.h1} style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 360 }} />
          <div style={{ padding: 30, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ color: "#0b5d3b", fontWeight: 800, fontSize: 13, marginBottom: 10 }}>{page.destination}</div>
            <h1 style={{ margin: 0, fontSize: 46, lineHeight: 1.08, color: "#10231a" }}>{page.h1}</h1>
            <p style={{ fontSize: 20, lineHeight: 1.6, color: "#31443b", margin: "16px 0 14px" }}>{page.desc}</p>
            <div style={{ fontSize: 18, lineHeight: 1.7, color: "#6b5c2d", background: "#faf4d7", padding: 16, borderRadius: 16 }}>
              {page.wiifm}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
              <a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer" style={{ background: "#13a36b", color: "#fff", textDecoration: "none", padding: "14px 18px", borderRadius: 999, fontWeight: 800 }}>WhatsApp</a>
              <a href={canonical} style={{ background: "#f3efe5", color: "#10231a", textDecoration: "none", padding: "14px 18px", borderRadius: 999, fontWeight: 800 }}>Bu sayfayı paylaş</a>
            </div>
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
          {page.bullets.map((item, idx) => (
            <div key={item} style={{ background: "#fff", border: "1px solid #ebe3cf", borderRadius: 18, padding: 20 }}>
              <div style={{ color: "#0b5d3b", fontWeight: 800, fontSize: 13 }}>0{idx + 1}</div>
              <div style={{ marginTop: 8, lineHeight: 1.7, fontWeight: 700 }}>{item}</div>
            </div>
          ))}
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.9fr", gap: 26, alignItems: "start" }}>
          <article style={{ display: "grid", gap: 24 }}>
            {page.sections.map((s) => (
              <section key={s.title} style={{ background: "#fff", border: "1px solid #ebe3cf", borderRadius: 22, padding: 26 }}>
                <SectionTitle eyebrow={s.eyebrow} title={s.title} />
                <p style={{ margin: 0, lineHeight: 1.85, color: "#31443b", fontSize: 18 }}>{s.body}</p>
                {s.points?.length ? (
                  <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
                    {s.points.map((pt) => (
                      <div key={pt} style={{ background: "#f7f4eb", padding: "12px 14px", borderRadius: 14, color: "#31443b", fontWeight: 700 }}>✓ {pt}</div>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}

            <section style={{ background: "#fff", border: "1px solid #ebe3cf", borderRadius: 22, padding: 26 }}>
              <SectionTitle eyebrow="FİYAT / PLAN" title="Karar vermeden önce toplam resmi görün." />
              <PriceBox page={page} />
            </section>

            {page.sourceLinks?.length ? (
              <section style={{ background: "#fff", border: "1px solid #ebe3cf", borderRadius: 22, padding: 26 }}>
                <SectionTitle eyebrow="KAYNAKLAR" title="Değişebilecek bilgiyi resmi kaynaktan doğrulayın." />
                <div style={{ display: "grid", gap: 12 }}>
                  {page.sourceLinks.map(([label, url]) => (
                    <a key={url} href={url} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#0b5d3b", fontWeight: 800 }}>
                      {label} ↗
                    </a>
                  ))}
                </div>
              </section>
            ) : null}

            <section style={{ background: "#fff", border: "1px solid #ebe3cf", borderRadius: 22, padding: 26 }}>
              <SectionTitle eyebrow="SIK SORULAN SORULAR" title="Ödeme yapmadan önce netleştirin." />
              <div style={{ display: "grid", gap: 12 }}>
                {page.faqs.map(([q, a]) => (
                  <details key={q} style={{ background: "#f8f6ef", borderRadius: 16, padding: 16 }}>
                    <summary style={{ cursor: "pointer", fontWeight: 800 }}>{q}</summary>
                    <p style={{ margin: "10px 0 0", lineHeight: 1.75, color: "#31443b" }}>{a}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          <aside style={{ display: "grid", gap: 18, position: "sticky", top: 18 }}>
            <div style={{ background: "#f7f4eb", border: "1px solid #e5dcc6", borderRadius: 22, padding: 22 }}>
              <div style={{ color: "#0b5d3b", fontWeight: 800, fontSize: 13 }}>GO VIETSTAY LOCAL SUPPORT</div>
              <h3 style={{ fontSize: 30, lineHeight: 1.15, margin: "10px 0", color: "#10231a" }}>
                Uçuş ve otelinizi siz seçin. Yerelde yalnız kalmayın.
              </h3>
              <p style={{ lineHeight: 1.8, color: "#31443b", margin: 0 }}>
                Tarih, kişi sayısı, otel, çocuk bilgisi ve görmek istediğiniz iki yeri yazın. Size en çok turu
                değil, en mantıklı planı çıkaralım.
              </p>
              <a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 16, textDecoration: "none", background: "#13a36b", color: "#fff", padding: "13px 18px", borderRadius: 999, fontWeight: 800 }}>WhatsApp’tan yazın</a>
            </div>

            <img src={visual.gallery[1]} alt={visual.label} style={{ width: "100%", borderRadius: 20, border: "1px solid #ebe3cf", objectFit: "cover", minHeight: 220 }} />

            <div style={{ background: "#fff", border: "1px solid #ebe3cf", borderRadius: 22, padding: 22 }}>
              <div style={{ color: "#0b5d3b", fontWeight: 800, fontSize: 13 }}>DÜRÜSTLÜK İLKELERİ</div>
              <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                <div>✓ Yanlış vize iddiası yok</div>
                <div>✓ Türkçe rehber yalnızca teyitle</div>
                <div>✓ Fiyatlar VND ile şeffaf</div>
                <div>✓ Gerçek yerel WhatsApp desteği</div>
              </div>
            </div>
          </aside>
        </div>

        <section style={{ marginTop: 38 }}>
          <SectionTitle eyebrow="BAĞLANTILI SAYFALAR" title="Bunlar da işinize yarayabilir." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {related.map((r) => {
              const vr = getTurkeyVisual(r.slug);
              return (
                <a key={r.slug} href={`/tr/${r.slug}`} style={{ textDecoration: "none", background: "#fff", border: "1px solid #ebe3cf", borderRadius: 20, overflow: "hidden", color: "#10231a" }}>
                  <img src={vr.hero} alt={r.h1} style={{ width: "100%", height: 180, objectFit: "cover" }} />
                  <div style={{ padding: 18 }}>
                    <div style={{ color: "#0b5d3b", fontWeight: 800, fontSize: 12 }}>{r.destination}</div>
                    <div style={{ fontSize: 24, lineHeight: 1.2, fontWeight: 800, margin: "8px 0 10px" }}>{r.h1}</div>
                    <div style={{ color: "#31443b", lineHeight: 1.7 }}>{r.wiifm}</div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
