import Image from "next/image";
import Link from "next/link";
import type { GuidePageData } from "./data";
import "./phu-quoc-guide.css";

const PHONE = "84937762607";
const OFFICIAL_LOGO = "/brand/govietstay-official-logo.jpg";

function whatsappLink(subject: string) {
  const message = encodeURIComponent(
    `Hello GoVietStay! I am planning Phu Quoc and I need help with: ${subject}.\n\nTravel date:\nGuests:\nChildren + ages/heights (if any):\nHotel / area:\nWhat I need help with:`
  );
  return `https://wa.me/${PHONE}?text=${message}`;
}

export default function PhuQuocGuidePage({ data }: { data: GuidePageData }) {
  const canonical = `https://www.govietstay.com/travel/${data.slug}`;
  const isPillar = data.slug === "phu-quoc-travel-guide";

  // V2: the pillar page uses two stronger existing Phu Quoc assets.
  // Other guide pages keep their own topic-specific images from data.ts.
  const heroImage = isPillar ? "/tour/phuquoc/tour-07-1.jpg" : data.heroImage;
  const heroImageAlt = isPillar
    ? "Phu Quoc Hon Thom, Sunset Town and south-island experience"
    : data.heroImageAlt;
  const secondaryImage = isPillar ? "/tour/phuquoc/tour-09-1.jpg" : data.secondaryImage;
  const secondaryImageAlt = isPillar
    ? "Premium Phu Quoc sea experience"
    : data.secondaryImageAlt || "Phu Quoc travel";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.metaDescription,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "GoVietStay" },
    publisher: {
      "@type": "Organization",
      name: "GoVietStay",
      url: "https://www.govietstay.com",
    },
    about: ["Phu Quoc", "Vietnam travel", "Phu Quoc travel planning"],
    inLanguage: "en",
  };

  return (
    <main className="pqgPage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className={`pqgHero ${isPillar ? "pqgHeroPillar" : ""}`}>
        <header className="pqgHeader">
          <Link className="pqgBrand" href="/" aria-label="GoVietStay home">
            <Image
              className="pqgBrandLogo"
              src={OFFICIAL_LOGO}
              alt="GoVietStay official logo"
              width={72}
              height={72}
              priority
            />
            <span className="pqgBrandText">
              GoVietStay
              <small>Trusted Local Support</small>
            </span>
          </Link>
          <nav aria-label="Primary">
            <Link href="/travel/phu-quoc-travel-guide">Phu Quoc Guide</Link>
            <Link href="/tours/phu-quoc">Tours</Link>
            <a
              className="pqgNavCta"
              href={whatsappLink(data.title)}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </nav>
        </header>

        <div className="pqgHeroGrid">
          <div className="pqgHeroCopy">
            <p className="pqgEyebrow">{data.eyebrow}</p>
            <h1>
              {data.heroTitle}
              <em>{data.heroAccent}</em>
            </h1>
            <p className="pqgLead">{data.heroText}</p>

            <div className="pqgChips">
              {data.chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>

            <div className="pqgHeroActions">
              <a href={whatsappLink(data.title)} target="_blank" rel="noreferrer">
                Plan my Phu Quoc trip
              </a>
              <Link href="/tours/phu-quoc">Compare Phu Quoc tours</Link>
            </div>

            {isPillar && (
              <div className="pqgHeroProof" aria-label="GoVietStay planning advantages">
                <span><b>01</b> One local contact</span>
                <span><b>02</b> Weather-aware planning</span>
                <span><b>03</b> English & Russian support</span>
              </div>
            )}
          </div>

          <div className="pqgHeroMedia">
            <figure className="pqgHeroMain">
              <Image
                src={heroImage}
                alt={heroImageAlt}
                fill
                priority
                quality={94}
                sizes="(max-width: 860px) 92vw, 56vw"
              />
              <span className="pqgHeroShade" aria-hidden="true" />
              <figcaption>
                <span>PHU QUOC · VIETNAM</span>
                <strong>{isPillar ? "Plan the island around your trip." : data.title}</strong>
              </figcaption>
            </figure>

            {secondaryImage && (
              <figure className="pqgHeroSmall">
                <Image
                  src={secondaryImage}
                  alt={secondaryImageAlt}
                  fill
                  quality={92}
                  sizes="(max-width: 860px) 42vw, 20vw"
                />
              </figure>
            )}

            <div className="pqgHeroFloatCard">
              <span>LOCAL PLANNING NOTE</span>
              <strong>
                {isPillar
                  ? "Keep your most important sea day movable when possible."
                  : "Send your date, hotel and group size before you lock the plan."}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="pqgQuick">
        <div className="pqgQuickLabel">Quick answer</div>
        <p>{data.quickAnswer}</p>
      </section>

      <div className="pqgReadingGrid">
        <aside className="pqgToc" aria-label="On this page">
          <p>On this page</p>
          {data.sections.map((section, index) => (
            <a href={`#section-${index + 1}`} key={section.title}>
              {String(index + 1).padStart(2, "0")} · {section.title}
            </a>
          ))}
          <a href="#faq">FAQ</a>
        </aside>

        <div className="pqgContent">
          {data.sections.map((section, index) => (
            <section className="pqgSection" id={`section-${index + 1}`} key={section.title}>
              {section.eyebrow && <p className="pqgLabel">{section.eyebrow}</p>}
              <h2>{section.title}</h2>
              {section.intro && <p className="pqgIntro">{section.intro}</p>}

              {section.cards && (
                <div className="pqgCards">
                  {section.cards.map((card) => (
                    <article key={card.title}>
                      {card.badge && <span>{card.badge}</span>}
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                    </article>
                  ))}
                </div>
              )}

              {section.bullets && (
                <ul className="pqgBullets">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}

              {section.table && (
                <div className="pqgTableWrap" role="region" aria-label={section.title} tabIndex={0}>
                  <table>
                    <thead>
                      <tr>{section.table.headers.map((header) => <th key={header}>{header}</th>)}</tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rowIndex) => (
                        <tr key={`${section.title}-${rowIndex}`}>
                          {row.map((cell, cellIndex) => (
                            <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.note && (
                <div className="pqgNote">
                  <b>Good to know</b>
                  <p>{section.note}</p>
                </div>
              )}
            </section>
          ))}

          <section className="pqgMidCta">
            <p className="pqgLabel">Need a real plan for your dates?</p>
            <h2>Send the date, hotel and group size. We’ll help you choose what actually fits.</h2>
            <p>
              No need to decide every tour first. Tell GoVietStay what matters to you and we can check the most practical available option.
            </p>
            <a href={whatsappLink(data.title)} target="_blank" rel="noreferrer">
              Chat with GoVietStay on WhatsApp
            </a>
          </section>

          <section className="pqgFaq" id="faq">
            <p className="pqgLabel">Frequently asked questions</p>
            <h2>Before you book</h2>
            <div>
              {data.faq.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="pqgRelated">
            <p className="pqgLabel">Continue planning</p>
            <h2>Build the rest of your Phu Quoc trip</h2>
            <div className="pqgRelatedGrid">
              {data.related.map((item) => (
                <Link href={item.href} key={item.href}>
                  <strong>{item.label}</strong>
                  <span>{item.text}</span>
                  <b>Read guide →</b>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="pqgFinalCta">
        <p className="pqgLabel">GoVietStay · Trusted Local Support</p>
        <h2>Phu Quoc is easier when one local contact can coordinate the moving parts.</h2>
        <p>
          Tour availability, private transport, children’s details, pickup and weather changes can all be handled in the same conversation.
        </p>
        <div>
          <a href={whatsappLink(data.title)} target="_blank" rel="noreferrer">Plan with GoVietStay</a>
          <Link href="/tours/phu-quoc">See all Phu Quoc experiences</Link>
        </div>
      </section>

      <footer className="pqgFooter">
        <Image src={OFFICIAL_LOGO} alt="GoVietStay official logo" width={54} height={54} />
        <strong>GoVietStay</strong>
        <span>Da Nang • Hoi An • Hue • Phu Quoc</span>
        <span>WhatsApp +84 937 762 607</span>
        <Link href="/">GoVietStay.com</Link>
      </footer>
    </main>
  );
}
