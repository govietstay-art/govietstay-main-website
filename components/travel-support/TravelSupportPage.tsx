import Image from "next/image";
import Link from "next/link";
import "./travel-support.css";

export type SupportCard = {
  title: string;
  text: string;
  badge?: string;
};

export type SupportTable = {
  headers: string[];
  rows: string[][];
};

export type SupportSection = {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  bullets?: string[];
  cards?: SupportCard[];
  table?: SupportTable;
  note?: string;
};

export type SupportSource = {
  label: string;
  href: string;
  note?: string;
};

export type TravelSupportPageData = {
  slug: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  statusLabel: string;
  statusText: string;
  chips: string[];
  quickTitle: string;
  quickIntro: string;
  quickCards?: SupportCard[];
  quickTable?: SupportTable;
  safetyNote?: string;
  sections: SupportSection[];
  whatsappKeyword: string;
  whatsappIntro: string;
  whatsappFields: string[];
  whatsappLabel: string;
  sourceTitle: string;
  sources: SupportSource[];
  relatedTitle: string;
  related: { label: string; href: string; text: string }[];
};

const PHONE = "84937762607";
const OFFICIAL_LOGO = "/brand/govietstay-official-logo.jpg";

function whatsappLink(data: TravelSupportPageData) {
  const fields = data.whatsappFields.map((item) => `${item}:`).join("\n");
  const message = encodeURIComponent(
    `Hello GoVietStay.\nKeyword: ${data.whatsappKeyword}\n${data.whatsappIntro}\n\n${fields}`
  );
  return `https://wa.me/${PHONE}?text=${message}`;
}

export default function TravelSupportPage({
  data,
}: {
  data: TravelSupportPageData;
}) {
  const canonical = `https://www.govietstay.com/travel/${data.slug}`;
  const wa = whatsappLink(data);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${data.title} ${data.titleAccent}`.trim(),
    description: data.lead,
    mainEntityOfPage: canonical,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: "GoVietStay",
      url: "https://www.govietstay.com",
    },
    publisher: {
      "@type": "Organization",
      name: "GoVietStay",
      url: "https://www.govietstay.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.govietstay.com/brand/govietstay-official-logo.jpg",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "GoVietStay",
        item: "https://www.govietstay.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Vietnam Travel Guides",
        item: "https://www.govietstay.com/travel",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${data.title} ${data.titleAccent}`.trim(),
        item: canonical,
      },
    ],
  };

  return (
    <main className="gvsHelpPage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="gvsHelpTopbar">
        GOVIETSTAY · TRUSTED LOCAL SUPPORT · HELP-FIRST TRAVEL INFORMATION
      </div>

      <header className="gvsHelpNav">
        <Link className="gvsHelpBrand" href="/" aria-label="GoVietStay home">
          <Image
            src={OFFICIAL_LOGO}
            alt="GoVietStay official logo"
            width={62}
            height={62}
            priority
          />
          <span>
            <b>GoVietStay</b>
            <small>Trusted Local Support</small>
          </span>
        </Link>
        <nav aria-label="Travel support navigation">
          <Link href="/travel">Travel Guides</Link>
          <Link href="/travel/vietnam-local-help">Local Help</Link>
          <Link href="/travel/vietnam-tet-travel-guide">Tet 2027</Link>
          <a className="gvsHelpNavCta" href={wa} target="_blank" rel="noreferrer">
            WhatsApp Help
          </a>
        </nav>
      </header>

      <section className="gvsHelpHero">
        <div className="gvsHelpHeroCopy">
          <p className="gvsHelpEyebrow">{data.eyebrow}</p>
          <h1>
            {data.title}
            <em>{data.titleAccent}</em>
          </h1>
          <p className="gvsHelpLead">{data.lead}</p>

          <div className="gvsHelpStatus">
            <span>{data.statusLabel}</span>
            <b>{data.statusText}</b>
          </div>

          <div className="gvsHelpChips">
            {data.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>

          <div className="gvsHelpHeroActions">
            <a href="#quick-help">Find the right help</a>
            <a href={wa} target="_blank" rel="noreferrer">
              Ask GoVietStay on WhatsApp
            </a>
          </div>
        </div>

        <aside className="gvsHelpHeroPanel" aria-label="GoVietStay local support">
          <Image
            src={OFFICIAL_LOGO}
            alt="GoVietStay official logo"
            width={104}
            height={104}
            priority
          />
          <p>LOCAL SUPPORT PRINCIPLE</p>
          <h2>Useful first. Clear second. Sales pressure never.</h2>
          <span>
            We built this page to help travelers reach the right service, prepare
            the right information and avoid wasting time when something changes.
          </span>
          <div>
            <small>WHATSAPP KEYWORD</small>
            <strong>{data.whatsappKeyword}</strong>
          </div>
        </aside>
      </section>

      <section className="gvsHelpQuick" id="quick-help">
        <div className="gvsHelpSectionHead">
          <p>START HERE</p>
          <h2>{data.quickTitle}</h2>
          <span>{data.quickIntro}</span>
        </div>

        {data.safetyNote && (
          <div className="gvsHelpSafety">
            <b>Important</b>
            <p>{data.safetyNote}</p>
          </div>
        )}

        {data.quickCards && (
          <div className="gvsHelpQuickCards">
            {data.quickCards.map((card) => (
              <article key={card.title}>
                {card.badge && <span>{card.badge}</span>}
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        )}

        {data.quickTable && (
          <div className="gvsHelpTableWrap" role="region" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  {data.quickTable.headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.quickTable.rows.map((row, rowIndex) => (
                  <tr key={`quick-${rowIndex}`}>
                    {row.map((cell, cellIndex) => (
                      <td key={`quick-${rowIndex}-${cellIndex}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className="gvsHelpReadingGrid">
        <aside className="gvsHelpToc" aria-label="On this page">
          <p>ON THIS PAGE</p>
          {data.sections.map((section, index) => (
            <a href={`#${section.id}`} key={section.id}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <span>{section.title}</span>
            </a>
          ))}
          <a href="#official-sources">
            <b>→</b>
            <span>Official sources</span>
          </a>
        </aside>

        <div className="gvsHelpContent">
          {data.sections.map((section, index) => (
            <section
              className="gvsHelpSection"
              id={section.id}
              key={section.id}
            >
              <p className="gvsHelpSectionNumber">
                {String(index + 1).padStart(2, "0")}
              </p>
              {section.eyebrow && (
                <p className="gvsHelpLabel">{section.eyebrow}</p>
              )}
              <h2>{section.title}</h2>
              {section.intro && <p className="gvsHelpIntro">{section.intro}</p>}

              {section.cards && (
                <div className="gvsHelpCards">
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
                <ul className="gvsHelpBullets">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}

              {section.table && (
                <div
                  className="gvsHelpTableWrap"
                  role="region"
                  aria-label={section.title}
                  tabIndex={0}
                >
                  <table>
                    <thead>
                      <tr>
                        {section.table.headers.map((header) => (
                          <th key={header}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rowIndex) => (
                        <tr key={`${section.id}-${rowIndex}`}>
                          {row.map((cell, cellIndex) => (
                            <td key={`${section.id}-${rowIndex}-${cellIndex}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.note && (
                <div className="gvsHelpNote">
                  <b>Good to know</b>
                  <p>{section.note}</p>
                </div>
              )}
            </section>
          ))}

          <section className="gvsHelpWhatsapp">
            <div>
              <p className="gvsHelpLabel">GOVIETSTAY · LOCAL SUPPORT</p>
              <h2>{data.whatsappLabel}</h2>
              <p>
                The message opens with a tracking keyword so our team can
                immediately understand which help page you came from.
              </p>
              <span>
                Keyword: <b>{data.whatsappKeyword}</b>
              </span>
            </div>
            <a href={wa} target="_blank" rel="noreferrer">
              Message GoVietStay on WhatsApp
            </a>
          </section>

          <section className="gvsHelpSources" id="official-sources">
            <p className="gvsHelpLabel">VERIFICATION</p>
            <h2>{data.sourceTitle}</h2>
            <p>
              Contact details and government schedules can change. GoVietStay
              checks authoritative sources and shows the verification date
              above. In an urgent situation, follow the responsible authority.
            </p>
            <div>
              {data.sources.map((source) => (
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  key={source.href}
                >
                  <strong>{source.label}</strong>
                  {source.note && <span>{source.note}</span>}
                  <b>Open official source ↗</b>
                </a>
              ))}
            </div>
          </section>

          <section className="gvsHelpRelated">
            <p className="gvsHelpLabel">CONTINUE WITH USEFUL INFORMATION</p>
            <h2>{data.relatedTitle}</h2>
            <div>
              {data.related.map((item) => (
                <Link href={item.href} key={item.href}>
                  <strong>{item.label}</strong>
                  <span>{item.text}</span>
                  <b>Open guide →</b>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      <footer className="gvsHelpFooter">
        <Image
          src={OFFICIAL_LOGO}
          alt="GoVietStay official logo"
          width={58}
          height={58}
        />
        <div>
          <strong>GoVietStay</strong>
          <span>Trusted Local Support · Vietnam</span>
        </div>
        <span>WhatsApp +84 937 762 607</span>
        <Link href="/travel">GoVietStay Travel Guides</Link>
      </footer>

      <a
        className="gvsHelpMobileCta"
        href={wa}
        target="_blank"
        rel="noreferrer"
        aria-label="Ask GoVietStay for local help on WhatsApp"
      >
        <span>Need local help?</span>
        <b>WhatsApp GoVietStay</b>
      </a>
    </main>
  );
}
