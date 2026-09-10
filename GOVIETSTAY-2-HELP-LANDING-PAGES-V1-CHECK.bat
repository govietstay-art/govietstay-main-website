@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay - 2 Help Landing Pages V1 - CHECK ONLY
set "SELF=%~f0"

echo.
echo ============================================================
echo  GoVietStay - 2 HELP LANDING PAGES V1 - CHECK ONLY
echo  NO GIT PUSH - NO VERCEL DEPLOY
echo ============================================================
echo.

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$raw=[IO.File]::ReadAllText($env:SELF); $m='#'+'__GVS_PS_PAYLOAD__'; $i=$raw.LastIndexOf($m); if($i -lt 0){Write-Error 'Payload marker not found'; exit 2}; $code=$raw.Substring($i+$m.Length); & ([ScriptBlock]::Create($code))"
set "EXIT_CODE=%ERRORLEVEL%"

echo.
if not "%EXIT_CODE%"=="0" (
  echo [ERROR] Installer stopped with code %EXIT_CODE%.
  echo Nothing was deployed or pushed.
) else (
  echo [OK] V1 files are ready for local checking.
  echo Nothing was deployed or pushed.
)
echo.
pause
endlocal
exit /b %EXIT_CODE%

#__GVS_PS_PAYLOAD__

$ErrorActionPreference = "Stop"

function Write-Step([string]$Text) {
  Write-Host ""
  Write-Host ("==> " + $Text) -ForegroundColor Cyan
}

function Find-GoVietStayRoot {
  $candidates = New-Object System.Collections.Generic.List[string]

  $selfDir = Split-Path -Parent $env:SELF
  if ($selfDir) { $candidates.Add($selfDir) }

  try {
    $cwd = (Get-Location).Path
    if ($cwd -and -not $candidates.Contains($cwd)) { $candidates.Add($cwd) }
  } catch {}

  foreach ($candidate in $candidates) {
    $pkg = Join-Path $candidate "package.json"
    $travel = Join-Path $candidate "app\travel"
    if ((Test-Path $pkg) -and (Test-Path $travel)) {
      try {
        $json = Get-Content -LiteralPath $pkg -Raw | ConvertFrom-Json
        if ($json.name -eq "govietstay-main-website") {
          return (Resolve-Path $candidate).Path
        }
      } catch {}
    }
  }

  Write-Host ""
  Write-Host "The BAT is not currently inside the GoVietStay repository." -ForegroundColor Yellow
  $manual = Read-Host "Paste the full path to govietstay-main-website"
  if ([string]::IsNullOrWhiteSpace($manual)) {
    throw "No repository path provided."
  }

  $manual = $manual.Trim('"')
  $pkg = Join-Path $manual "package.json"
  $travel = Join-Path $manual "app\travel"
  if (-not (Test-Path $pkg) -or -not (Test-Path $travel)) {
    throw "That folder does not look like the GoVietStay website repository."
  }

  $json = Get-Content -LiteralPath $pkg -Raw | ConvertFrom-Json
  if ($json.name -ne "govietstay-main-website") {
    throw "package.json does not match govietstay-main-website."
  }
  return (Resolve-Path $manual).Path
}

$root = Find-GoVietStayRoot
Write-Step "Repository found"
Write-Host $root -ForegroundColor Green

$logoPath = Join-Path $root "public\brand\govietstay-official-logo.jpg"
if (-not (Test-Path $logoPath)) {
  throw "Official GoVietStay logo not found: public\brand\govietstay-official-logo.jpg"
}
Write-Host "Official logo confirmed: /brand/govietstay-official-logo.jpg" -ForegroundColor Green
Write-Host "WhatsApp confirmed for V1: +84 937 762 607" -ForegroundColor Green
Write-Host "Keywords: LOCAL HELP / TET 2027 HELP" -ForegroundColor Green

$component = @'
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

'@

$css = @'
:root {
  --gvs-ink: #10212b;
  --gvs-muted: #5d6b73;
  --gvs-line: #dbe5e8;
  --gvs-soft: #f3f7f7;
  --gvs-paper: #ffffff;
  --gvs-accent: #116a68;
  --gvs-accent-dark: #0a4d4c;
  --gvs-warm: #f4b544;
  --gvs-danger-soft: #fff4e7;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

.gvsHelpPage {
  min-height: 100vh;
  background: var(--gvs-paper);
  color: var(--gvs-ink);
  font-family: Arial, Helvetica, sans-serif;
}

.gvsHelpPage a {
  color: inherit;
}

.gvsHelpTopbar {
  padding: 10px 5vw;
  background: var(--gvs-ink);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-align: center;
}

.gvsHelpNav {
  width: min(1180px, 92vw);
  margin: 0 auto;
  min-height: 84px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 26px;
}

.gvsHelpBrand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.gvsHelpBrand img,
.gvsHelpHeroPanel img,
.gvsHelpFooter img {
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 8px 28px rgba(16, 33, 43, 0.12);
}

.gvsHelpBrand span {
  display: grid;
  gap: 2px;
}

.gvsHelpBrand b {
  font-size: 18px;
}

.gvsHelpBrand small {
  color: var(--gvs-muted);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.gvsHelpNav nav {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  font-weight: 700;
}

.gvsHelpNav nav a {
  text-decoration: none;
}

.gvsHelpNavCta {
  padding: 11px 15px;
  border-radius: 999px;
  background: var(--gvs-accent);
  color: #fff !important;
}

.gvsHelpHero {
  width: min(1180px, 92vw);
  margin: 10px auto 0;
  min-height: 620px;
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(300px, 0.7fr);
  gap: 54px;
  align-items: center;
  padding: 72px clamp(28px, 6vw, 82px);
  border-radius: 34px;
  overflow: hidden;
  background:
    radial-gradient(circle at 86% 10%, rgba(244,181,68,.24), transparent 28%),
    radial-gradient(circle at 10% 88%, rgba(17,106,104,.16), transparent 30%),
    linear-gradient(135deg, #f7fbfb, #eef7f6);
  border: 1px solid #e3eeed;
}

.gvsHelpEyebrow,
.gvsHelpLabel,
.gvsHelpSectionHead > p {
  margin: 0 0 12px;
  color: var(--gvs-accent);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.gvsHelpHero h1 {
  margin: 0;
  max-width: 760px;
  font-size: clamp(46px, 6.2vw, 84px);
  line-height: 0.98;
  letter-spacing: -0.055em;
}

.gvsHelpHero h1 em {
  display: block;
  margin-top: 7px;
  color: var(--gvs-accent);
  font-style: normal;
}

.gvsHelpLead {
  max-width: 720px;
  margin: 26px 0 0;
  color: #3d5058;
  font-size: clamp(18px, 2.2vw, 23px);
  line-height: 1.55;
}

.gvsHelpStatus {
  max-width: 760px;
  margin-top: 26px;
  padding: 16px 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  align-items: center;
  border-left: 4px solid var(--gvs-warm);
  background: rgba(255,255,255,.78);
  border-radius: 0 14px 14px 0;
}

.gvsHelpStatus span {
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .14em;
  color: var(--gvs-muted);
}

.gvsHelpStatus b {
  font-size: 14px;
}

.gvsHelpChips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
}

.gvsHelpChips span {
  padding: 8px 11px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--gvs-line);
  font-size: 12px;
  font-weight: 800;
}

.gvsHelpHeroActions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}

.gvsHelpHeroActions a,
.gvsHelpWhatsapp > a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 18px;
  border-radius: 13px;
  text-decoration: none;
  font-weight: 900;
}

.gvsHelpHeroActions a:first-child,
.gvsHelpWhatsapp > a {
  background: var(--gvs-accent);
  color: #fff;
}

.gvsHelpHeroActions a:last-child {
  background: #fff;
  border: 1px solid var(--gvs-line);
}

.gvsHelpHeroPanel {
  padding: 30px;
  border-radius: 26px;
  background: rgba(16,33,43,.96);
  color: #fff;
  box-shadow: 0 28px 64px rgba(16,33,43,.18);
}

.gvsHelpHeroPanel > p {
  margin: 24px 0 10px;
  color: #a9d6d2;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .16em;
}

.gvsHelpHeroPanel h2 {
  margin: 0;
  font-size: 30px;
  line-height: 1.08;
  letter-spacing: -.035em;
}

.gvsHelpHeroPanel > span {
  display: block;
  margin-top: 16px;
  color: #d7e3e4;
  line-height: 1.65;
}

.gvsHelpHeroPanel > div {
  margin-top: 26px;
  padding-top: 22px;
  border-top: 1px solid rgba(255,255,255,.14);
  display: grid;
  gap: 6px;
}

.gvsHelpHeroPanel small {
  color: #a9d6d2;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .14em;
}

.gvsHelpHeroPanel strong {
  font-size: 18px;
}

.gvsHelpQuick {
  width: min(1080px, 90vw);
  margin: 86px auto 0;
}

.gvsHelpSectionHead {
  display: grid;
  gap: 6px;
  max-width: 780px;
}

.gvsHelpSectionHead h2 {
  margin: 0;
  font-size: clamp(34px, 4vw, 54px);
  letter-spacing: -.04em;
}

.gvsHelpSectionHead > span {
  color: var(--gvs-muted);
  font-size: 17px;
  line-height: 1.65;
}

.gvsHelpSafety {
  margin-top: 26px;
  padding: 20px 22px;
  border-radius: 16px;
  background: var(--gvs-danger-soft);
  border: 1px solid #f2d7b5;
}

.gvsHelpSafety b {
  display: block;
  margin-bottom: 6px;
}

.gvsHelpSafety p {
  margin: 0;
  line-height: 1.6;
}

.gvsHelpQuickCards,
.gvsHelpCards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 24px;
}

.gvsHelpQuickCards article,
.gvsHelpCards article {
  padding: 22px;
  border: 1px solid var(--gvs-line);
  border-radius: 18px;
  background: #fff;
}

.gvsHelpQuickCards article > span,
.gvsHelpCards article > span {
  display: inline-block;
  margin-bottom: 12px;
  color: var(--gvs-accent);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.gvsHelpQuickCards h3,
.gvsHelpCards h3 {
  margin: 0;
  font-size: 20px;
}

.gvsHelpQuickCards p,
.gvsHelpCards p {
  margin: 10px 0 0;
  color: var(--gvs-muted);
  line-height: 1.6;
}

.gvsHelpTableWrap {
  width: 100%;
  overflow-x: auto;
  margin-top: 24px;
  border: 1px solid var(--gvs-line);
  border-radius: 18px;
}

.gvsHelpTableWrap table {
  width: 100%;
  min-width: 620px;
  border-collapse: collapse;
  background: #fff;
}

.gvsHelpTableWrap th,
.gvsHelpTableWrap td {
  padding: 16px;
  border-bottom: 1px solid var(--gvs-line);
  text-align: left;
  vertical-align: top;
}

.gvsHelpTableWrap th {
  background: var(--gvs-soft);
  font-size: 11px;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.gvsHelpTableWrap tr:last-child td {
  border-bottom: 0;
}

.gvsHelpReadingGrid {
  width: min(1080px, 90vw);
  margin: 92px auto 0;
  display: grid;
  grid-template-columns: 230px minmax(0, 1fr);
  gap: 64px;
  align-items: start;
}

.gvsHelpToc {
  position: sticky;
  top: 24px;
  display: grid;
  gap: 2px;
  padding: 18px 0;
  border-top: 1px solid var(--gvs-line);
  border-bottom: 1px solid var(--gvs-line);
}

.gvsHelpToc > p {
  margin: 0 0 10px;
  color: var(--gvs-muted);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .14em;
}

.gvsHelpToc a {
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 8px;
  padding: 8px 0;
  text-decoration: none;
  color: var(--gvs-muted);
  font-size: 12px;
  line-height: 1.35;
}

.gvsHelpToc a b {
  color: var(--gvs-accent);
}

.gvsHelpContent {
  min-width: 0;
}

.gvsHelpSection {
  position: relative;
  padding: 0 0 72px;
  margin-bottom: 70px;
  border-bottom: 1px solid var(--gvs-line);
  scroll-margin-top: 28px;
}

.gvsHelpSectionNumber {
  margin: 0 0 10px;
  color: #b7c8ca;
  font-size: 13px;
  font-weight: 900;
}

.gvsHelpSection h2,
.gvsHelpWhatsapp h2,
.gvsHelpSources h2,
.gvsHelpRelated h2 {
  margin: 0;
  font-size: clamp(30px, 3.5vw, 46px);
  line-height: 1.05;
  letter-spacing: -.04em;
}

.gvsHelpIntro {
  max-width: 760px;
  margin: 18px 0 0;
  color: #3d5058;
  font-size: 18px;
  line-height: 1.7;
}

.gvsHelpBullets {
  display: grid;
  gap: 12px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
}

.gvsHelpBullets li {
  position: relative;
  padding: 15px 18px 15px 48px;
  background: var(--gvs-soft);
  border-radius: 14px;
  line-height: 1.55;
}

.gvsHelpBullets li::before {
  content: "✓";
  position: absolute;
  left: 18px;
  top: 14px;
  color: var(--gvs-accent);
  font-weight: 900;
}

.gvsHelpNote {
  margin-top: 22px;
  padding: 18px 20px;
  border-left: 4px solid var(--gvs-accent);
  background: var(--gvs-soft);
  border-radius: 0 14px 14px 0;
}

.gvsHelpNote p {
  margin: 6px 0 0;
  color: var(--gvs-muted);
  line-height: 1.6;
}

.gvsHelpWhatsapp {
  margin: 12px 0 80px;
  padding: 34px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 26px;
  align-items: center;
  border-radius: 24px;
  background: var(--gvs-ink);
  color: #fff;
}

.gvsHelpWhatsapp .gvsHelpLabel {
  color: #a9d6d2;
}

.gvsHelpWhatsapp p:not(.gvsHelpLabel) {
  color: #d4e0e1;
  line-height: 1.6;
}

.gvsHelpWhatsapp span {
  display: inline-block;
  padding: 8px 10px;
  border-radius: 9px;
  background: rgba(255,255,255,.08);
}

.gvsHelpSources {
  margin-top: 20px;
  scroll-margin-top: 28px;
}

.gvsHelpSources > p:not(.gvsHelpLabel) {
  color: var(--gvs-muted);
  line-height: 1.7;
}

.gvsHelpSources > div,
.gvsHelpRelated > div {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 24px;
}

.gvsHelpSources a,
.gvsHelpRelated a {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 20px;
  border: 1px solid var(--gvs-line);
  border-radius: 16px;
  text-decoration: none;
  background: #fff;
}

.gvsHelpSources a:hover,
.gvsHelpRelated a:hover {
  border-color: #a8c9c8;
  box-shadow: 0 12px 36px rgba(16,33,43,.08);
}

.gvsHelpSources a span,
.gvsHelpRelated a span {
  color: var(--gvs-muted);
  line-height: 1.5;
}

.gvsHelpSources a b,
.gvsHelpRelated a b {
  margin-top: auto;
  color: var(--gvs-accent);
  font-size: 12px;
}

.gvsHelpRelated {
  margin-top: 80px;
}

.gvsHelpFooter {
  width: min(1180px, 92vw);
  margin: 110px auto 0;
  padding: 30px 0 100px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-top: 1px solid var(--gvs-line);
  color: var(--gvs-muted);
  font-size: 13px;
}

.gvsHelpFooter > div {
  display: grid;
  gap: 3px;
}

.gvsHelpFooter > div strong {
  color: var(--gvs-ink);
}

.gvsHelpFooter > span {
  margin-left: auto;
}

.gvsHelpMobileCta {
  display: none;
}

@media (max-width: 920px) {
  .gvsHelpNav nav a:not(.gvsHelpNavCta) {
    display: none;
  }

  .gvsHelpHero {
    min-height: 0;
    grid-template-columns: 1fr;
    gap: 34px;
    padding: 48px 28px;
  }

  .gvsHelpQuickCards,
  .gvsHelpCards {
    grid-template-columns: 1fr 1fr;
  }

  .gvsHelpReadingGrid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .gvsHelpToc {
    position: static;
    grid-template-columns: 1fr 1fr;
  }

  .gvsHelpToc > p {
    grid-column: 1 / -1;
  }

  .gvsHelpWhatsapp {
    grid-template-columns: 1fr;
  }

  .gvsHelpFooter {
    flex-wrap: wrap;
  }

  .gvsHelpFooter > span {
    margin-left: 0;
  }
}

@media (max-width: 640px) {
  .gvsHelpTopbar {
    padding: 8px 16px;
    font-size: 9px;
    line-height: 1.35;
  }

  .gvsHelpNav {
    min-height: 74px;
  }

  .gvsHelpBrand img {
    width: 48px;
    height: 48px;
  }

  .gvsHelpBrand small {
    display: none;
  }

  .gvsHelpNavCta {
    padding: 10px 12px;
    font-size: 12px;
  }

  .gvsHelpHero {
    width: 94vw;
    margin-top: 0;
    padding: 36px 20px;
    border-radius: 24px;
  }

  .gvsHelpHero h1 {
    font-size: clamp(42px, 14vw, 62px);
  }

  .gvsHelpLead {
    font-size: 17px;
  }

  .gvsHelpHeroPanel {
    padding: 22px;
  }

  .gvsHelpQuick,
  .gvsHelpReadingGrid {
    width: 90vw;
  }

  .gvsHelpQuick {
    margin-top: 62px;
  }

  .gvsHelpReadingGrid {
    margin-top: 68px;
  }

  .gvsHelpQuickCards,
  .gvsHelpCards,
  .gvsHelpSources > div,
  .gvsHelpRelated > div {
    grid-template-columns: 1fr;
  }

  .gvsHelpToc {
    grid-template-columns: 1fr;
  }

  .gvsHelpSection {
    margin-bottom: 50px;
    padding-bottom: 50px;
  }

  .gvsHelpWhatsapp {
    padding: 24px;
    border-radius: 18px;
  }

  .gvsHelpFooter {
    padding-bottom: 120px;
  }

  .gvsHelpFooter > span,
  .gvsHelpFooter > a {
    width: 100%;
  }

  .gvsHelpMobileCta {
    position: fixed;
    z-index: 50;
    left: 12px;
    right: 12px;
    bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 15px;
    background: var(--gvs-accent);
    color: #fff !important;
    text-decoration: none;
    box-shadow: 0 18px 45px rgba(10,77,76,.28);
  }

  .gvsHelpMobileCta span {
    font-size: 11px;
  }

  .gvsHelpMobileCta b {
    font-size: 13px;
  }
}

'@

$localPage = @'
import type { Metadata } from "next";
import TravelSupportPage, {
  type TravelSupportPageData,
} from "../../../components/travel-support/TravelSupportPage";

export const metadata: Metadata = {
  title: {
    absolute: "Vietnam Local Help: Emergency Numbers & Tourist Support | GoVietStay",
  },
  description:
    "Practical help for travelers in Vietnam: emergency numbers, lost passports, lost property, medical help, transport problems and official tourist contacts.",
  keywords: [
    "Vietnam emergency numbers",
    "Vietnam tourist help",
    "lost passport Vietnam",
    "lost phone Vietnam",
    "lost wallet Vietnam",
    "lost item taxi Vietnam",
    "Vietnam tourist hotline",
    "Da Nang tourist support",
    "Phu Quoc tourist hotline",
  ],
  alternates: {
    canonical: "https://www.govietstay.com/travel/vietnam-local-help",
    languages: {
      en: "https://www.govietstay.com/travel/vietnam-local-help",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: "https://www.govietstay.com/travel/vietnam-local-help",
    siteName: "GoVietStay",
    title: "Vietnam Local Help: Emergency Numbers & Tourist Support",
    description:
      "A help-first reference for emergencies, lost property, passports, transport problems and official tourist support in Vietnam.",
    images: [
      {
        url: "/brand/govietstay-official-logo.jpg",
        alt: "GoVietStay Trusted Local Support",
      },
    ],
  },
};

const data: TravelSupportPageData = {
  slug: "vietnam-local-help",
  eyebrow: "VIETNAM LOCAL HELP",
  title: "Need help in Vietnam?",
  titleAccent: "Start with the right contact.",
  lead:
    "Emergency contacts, lost property, passports, medical help, transport problems and official tourist support — organized so a traveler can act quickly without guessing.",
  statusLabel: "LAST VERIFIED",
  statusText: "7 SEPTEMBER 2026 · Official sources checked",
  chips: [
    "Emergency numbers",
    "Lost passport",
    "Lost property",
    "Medical help",
    "Tourist hotlines",
  ],
  quickTitle: "If the situation is urgent, use the official emergency number first.",
  quickIntro:
    "Vietnam has nationwide emergency numbers. Use the service that matches the situation; the national 112 system can also receive urgent requests and route cases to the responsible service.",
  safetyNote:
    "If someone is in immediate danger, call emergency services first. GoVietStay WhatsApp is local travel assistance and coordination, not an emergency dispatch service.",
  quickTable: {
    headers: ["Number", "Service", "Use it for"],
    rows: [
      ["112", "National emergency", "Serious accidents, disasters, urgent situations requiring assistance"],
      ["113", "Police", "Police emergency"],
      ["114", "Fire & rescue", "Fire and rescue"],
      ["115", "Medical emergency", "Ambulance / urgent medical assistance"],
    ],
  },
  sections: [
    {
      id: "who-to-contact",
      eyebrow: "FIRST DECISION",
      title: "Who should you contact first?",
      intro:
        "The fastest solution usually comes from contacting the organization that controls the problem. Start there, then ask local support to help you coordinate if language, location or follow-up becomes difficult.",
      cards: [
        {
          badge: "Immediate danger",
          title: "Emergency service",
          text:
            "Call 112 or the relevant 113 / 114 / 115 service before messaging a travel company or hotel.",
        },
        {
          badge: "Travel property",
          title: "The operator that had the item",
          text:
            "Airline, airport, taxi app, driver, hotel or attraction should be your first operational contact.",
        },
        {
          badge: "Local coordination",
          title: "Tourist support / GoVietStay",
          text:
            "Useful when you need a local contact to help explain the next practical step, find the right office or organize transport.",
        },
      ],
    },
    {
      id: "lost-passport",
      eyebrow: "IDENTITY DOCUMENTS",
      title: "I lost my passport in Vietnam",
      intro:
        "Do not immediately assume the passport is permanently lost. Reconstruct your movements first, then move to formal reporting and consular help if it cannot be found.",
      bullets: [
        "Check your room safe, reception, last vehicle, restaurant, attraction and airport security desk.",
        "Save a photo or digital copy of the passport if you have one; it helps you provide the correct identity details.",
        "If the passport is genuinely lost or stolen, ask the local police what report or confirmation is required for your case.",
        "Contact your own embassy or consulate for the current replacement or emergency-travel-document procedure.",
        "If you have a flight soon, contact the airline as well; a police report does not automatically replace a valid travel document.",
      ],
      note:
        "Embassy procedures differ by nationality. Use the embassy or foreign ministry website of your own country rather than a third-party visa or consular website.",
    },
    {
      id: "lost-wallet-phone",
      eyebrow: "MONEY & DEVICES",
      title: "Phone, wallet or bank card is missing",
      bullets: [
        "Freeze or lock bank cards through the issuing bank if there is a risk of misuse.",
        "Use the phone maker's official find / lock feature when available.",
        "Write down the last confirmed place and time you had the item before calling multiple locations.",
        "Keep transaction alerts, ride receipts and location history; they can narrow the search.",
        "If theft is suspected, ask the local police about the appropriate report.",
      ],
    },
    {
      id: "lost-in-vehicle",
      eyebrow: "TAXI · GRAB · PRIVATE CAR",
      title: "I left something in a vehicle",
      intro:
        "Vehicle details are more useful than a long description of the item. Collect the trip record before you start calling.",
      table: {
        headers: ["Save this", "Why it matters"],
        rows: [
          ["License plate", "The fastest identifier for a vehicle"],
          ["Driver name / phone", "Lets the operator confirm the driver"],
          ["Booking or ride ID", "Connects the case to the app or dispatch record"],
          ["Pickup + drop-off", "Helps confirm the exact trip"],
          ["Approximate time", "Useful for CCTV and dispatch checks"],
          ["Screenshot / receipt", "Creates a clear record to send to support"],
        ],
      },
      note:
        "For an app-booked ride, use the in-app lost-item or support flow first because the platform already has the trip record.",
    },
    {
      id: "airport-lost-found",
      eyebrow: "AIRPORT",
      title: "Lost baggage is not always the same as lost property",
      intro:
        "A checked suitcase that did not arrive and a phone left in the terminal usually go to different teams.",
      cards: [
        {
          title: "Checked baggage did not arrive",
          text:
            "Contact the airline or its ground-handling baggage service and keep the baggage tag / report reference.",
        },
        {
          title: "Item left in the terminal",
          text:
            "Contact airport security or the airport Lost & Found function for property left in public or controlled areas.",
        },
        {
          title: "Item left on the aircraft",
          text:
            "Contact the airline first; the item may be handled through the airline or airport depending on where it was found.",
        },
      ],
    },
    {
      id: "medical-accident",
      eyebrow: "HEALTH & ACCIDENTS",
      title: "Medical problem or traffic accident",
      bullets: [
        "For a medical emergency, call 115; for a broader urgent situation, 112 can receive emergency requests.",
        "Give your location first: hotel name, street, landmark or map pin.",
        "If you are involved in a traffic accident, prioritize safety and medical care before discussing payment or blame.",
        "Keep photos, medical papers, receipts and insurance contact details.",
        "For travel insurance claims, contact the insurer as soon as practical because some policies require early notification.",
      ],
    },
    {
      id: "scams-overcharging",
      eyebrow: "PAYMENT DISPUTES",
      title: "Scams, overcharging or a service dispute",
      intro:
        "A calm evidence trail is more useful than an argument. Save the information needed to show exactly what was offered, charged and delivered.",
      bullets: [
        "Keep the menu, quoted price, booking confirmation, chat and payment receipt.",
        "Ask the business to explain the charge in writing if possible.",
        "Do not hand over your passport as security for a payment dispute.",
        "If there is a threat, coercion or immediate safety concern, contact police / emergency services.",
        "For a tourism-service complaint, the local tourist support center may help direct the case.",
      ],
    },
    {
      id: "atm-card",
      eyebrow: "BANKING",
      title: "An ATM kept my card",
      bullets: [
        "Photograph the ATM, bank name, branch / machine identifier and location.",
        "Note the exact time and amount of the attempted transaction.",
        "Call the bank that owns the ATM using its official contact information.",
        "Contact your card issuer if you need to freeze the card or discuss a replacement.",
        "Never share a PIN or one-time password with someone claiming they can recover the card.",
      ],
    },
    {
      id: "transport-weather",
      eyebrow: "DISRUPTION",
      title: "Flight, train, bus, storm or rough-sea disruption",
      intro:
        "When transport changes, confirm the operating source first. Weather posts on social media can be useful signals, but the airline, carrier, port, attraction or authority makes the operational decision.",
      bullets: [
        "Check the airline / train / bus operator directly for your specific service.",
        "For island or sea activities, wait for the current operating decision rather than relying on yesterday's weather.",
        "Keep hotel and onward transport flexible when a storm or major disruption is developing.",
        "Save cancellation or delay messages for insurance and refund questions.",
      ],
    },
    {
      id: "tourist-hotlines",
      eyebrow: "OFFICIAL LOCAL SUPPORT",
      title: "Tourist assistance contacts for key GoVietStay destinations",
      intro:
        "These contacts are listed from official destination portals and were checked on the verification date shown above.",
      table: {
        headers: ["Destination", "Official support", "Contact"],
        rows: [
          ["Da Nang", "Da Nang Visitor Support Center", "+84 236 3550 111"],
          ["Hue", "Hue Department of Tourism / Visit Hue hotline", "+84 234 382 8288"],
          ["Phu Quoc", "Official Phu Quoc tourism portal hotline", "1900 1011"],
        ],
      },
      note:
        "Contact details can change. Use the official-source links at the end of this page if a number does not connect.",
    },
    {
      id: "embassy-help",
      eyebrow: "CONSULAR HELP",
      title: "How to find the right embassy or consulate",
      bullets: [
        "Search your own government's foreign ministry or embassy website for Vietnam.",
        "Check whether your nationality is served in Hanoi, Ho Chi Minh City or by a non-resident embassy.",
        "Use official domains whenever possible; avoid paying a third party simply to obtain an embassy phone number.",
        "For a lost passport, ask specifically about an emergency passport or emergency travel document and what police paperwork is required.",
      ],
    },
    {
      id: "prepare-information",
      eyebrow: "SAVE TIME",
      title: "Prepare six facts before asking anyone for help",
      table: {
        headers: ["Information", "Example"],
        rows: [
          ["Your exact location", "Hotel name + map pin"],
          ["What happened", "One or two clear sentences"],
          ["When it happened", "Date + approximate time"],
          ["Who was involved", "Driver / airline / business name"],
          ["Reference details", "Booking ID / plate / receipt"],
          ["What result you need", "Recover item / reach police / find transport"],
        ],
      },
    },
  ],
  whatsappKeyword: "LOCAL HELP",
  whatsappIntro:
    "I need local travel help in Vietnam. This is not an emergency-service request.",
  whatsappFields: [
    "My current location",
    "What happened",
    "When it happened",
    "Booking / vehicle / business details (if any)",
    "What help I need",
  ],
  whatsappLabel: "Need a local person to help you find the next practical step?",
  sourceTitle: "Official sources checked for this guide",
  sources: [
    {
      label: "Government of Vietnam — National Emergency 112",
      href:
        "https://xaydungchinhsach.chinhphu.vn/tong-dai-so-112-tiep-nhan-24-7-cac-thong-tin-ve-su-co-thien-tai-tham-hoa-119250902150528929.htm",
      note:
        "112 operates nationwide for urgent incidents; 113 / 114 / 115 cases are routed to the responsible service.",
    },
    {
      label: "Vietnam government gazette — emergency service numbering",
      href:
        "https://congbaocdn.chinhphu.vn/CongBaoCP/VanBan/2022/3/36965/40179-1-2022289-29004-vbhn-btttt.pdf",
      note: "Official numbering for 112, 113, 114 and 115.",
    },
    {
      label: "Da Nang official tourism portal — Visitor Support Center",
      href: "https://danangfantasticity.com/lien-he/",
      note: "Official contact page lists the Da Nang Visitor Support Center.",
    },
    {
      label: "Visit Hue — Support",
      href: "https://visithue.vn/ho-tro/",
      note: "Official Hue tourism support contact.",
    },
    {
      label: "Phu Quoc official tourism portal",
      href: "https://dulich.phuquoc.gov.vn/en/",
      note: "Official portal displays the Phu Quoc tourism hotline.",
    },
  ],
  relatedTitle: "Keep these two practical pages together",
  related: [
    {
      label: "Vietnam Tet Travel Guide 2027",
      href: "/travel/vietnam-tet-travel-guide",
      text:
        "Public-holiday status, transport, banks, restaurants and practical planning during Tet.",
    },
    {
      label: "Vietnam Travel Guides",
      href: "/travel",
      text:
        "GoVietStay's English planning hub for Da Nang, Hoi An, Hue and Phu Quoc.",
    },
  ],
};

export default function Page() {
  return <TravelSupportPage data={data} />;
}

'@

$tetPage = @'
import type { Metadata } from "next";
import TravelSupportPage, {
  type TravelSupportPageData,
} from "../../../components/travel-support/TravelSupportPage";

export const metadata: Metadata = {
  title: {
    absolute: "Vietnam Tet 2027 Travel Guide: Dates, Closures & Transport | GoVietStay",
  },
  description:
    "Planning Vietnam during Tet 2027? Check the current holiday status, transport, banks, restaurants, attractions, etiquette and practical travel advice.",
  keywords: [
    "Vietnam Tet 2027",
    "Tet 2027 dates Vietnam",
    "Vietnam Lunar New Year 2027 travel",
    "Vietnam Tet closures",
    "Vietnam Tet transport",
    "Vietnam Tet restaurants open",
    "Vietnam Tet travel guide",
  ],
  alternates: {
    canonical: "https://www.govietstay.com/travel/vietnam-tet-travel-guide",
    languages: {
      en: "https://www.govietstay.com/travel/vietnam-tet-travel-guide",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: "https://www.govietstay.com/travel/vietnam-tet-travel-guide",
    siteName: "GoVietStay",
    title: "Vietnam Tet Travel Guide 2027",
    description:
      "A help-first guide to Tet 2027 dates, holiday status, transport, banks, restaurants, attractions and etiquette.",
    images: [
      {
        url: "/brand/govietstay-official-logo.jpg",
        alt: "GoVietStay Trusted Local Support",
      },
    ],
  },
};

const data: TravelSupportPageData = {
  slug: "vietnam-tet-travel-guide",
  eyebrow: "VIETNAM TET 2027 · PRACTICAL TRAVEL HELP",
  title: "Traveling in Vietnam during Tet?",
  titleAccent: "Know what changes before you arrive.",
  lead:
    "Tet is a wonderful time to be in Vietnam, but transport demand, family-business opening hours and public-office schedules change. This guide separates confirmed information from proposals so you can plan without guessing.",
  statusLabel: "LAST VERIFIED",
  statusText: "7 SEPTEMBER 2026 · Government holiday schedule still proposed, not final",
  chips: [
    "6 February 2027",
    "Holiday status",
    "Transport",
    "Banks & cash",
    "Restaurants",
    "Tet etiquette",
  ],
  quickTitle: "Tet 2027: what is confirmed, and what is not yet final?",
  quickIntro:
    "Lunar New Year's Day falls on 6 February 2027. As of the verification date, the Ministry of Home Affairs has proposed two civil-service holiday options; the final government schedule has not yet been confirmed.",
  quickCards: [
    {
      badge: "Calendar",
      title: "Tet Day 1 · 6 February 2027",
      text:
        "The proposed government schedules identify 5 February as the 29th day of the final lunar month, making 6 February the first day of the Year of the Goat.",
    },
    {
      badge: "Proposal 1 · preferred",
      title: "4–10 February 2027",
      text:
        "Seven consecutive days for civil servants in the Ministry's preferred proposal: five statutory Tet days plus two compensatory weekly-rest days.",
    },
    {
      badge: "Proposal 2",
      title: "5–14 February 2027",
      text:
        "Ten consecutive days in the alternative proposal, using a workday swap in addition to Tet and weekly-rest days.",
    },
  ],
  safetyNote:
    "Do not treat either proposed holiday option as the final nationwide operating schedule. Airlines, hotels, restaurants, attractions, banks and private employers can follow their own operating plans. Re-check close to your travel date.",
  sections: [
    {
      id: "what-is-tet",
      eyebrow: "CONTEXT",
      title: "What Tet means for a traveler",
      intro:
        "Tet Nguyen Dan is Vietnam's Lunar New Year and the country's most important family holiday. Many Vietnamese travel home, visit relatives and spend the first days of the year with family. Tourism continues, but the rhythm is different from an ordinary week.",
      bullets: [
        "Expect very high domestic travel demand around the days before and after Tet.",
        "Some family-run businesses close for several days, while hotels, airports and major tourist services may continue operating.",
        "Opening hours can change at short notice, so 'normally open' is not the same as 'open during Tet'.",
        "Tet is not a reason to avoid Vietnam; it is a reason to plan the essential parts earlier.",
      ],
    },
    {
      id: "dates-status",
      eyebrow: "DATES & STATUS",
      title: "Read Tet dates with a status label, not as a rumor",
      table: {
        headers: ["Item", "Current status · 7 Sep 2026"],
        rows: [
          ["Lunar New Year's Day", "6 February 2027"],
          ["Civil-service holiday option 1", "PROPOSED · 4–10 February 2027 · Ministry preferred"],
          ["Civil-service holiday option 2", "PROPOSED · 5–14 February 2027"],
          ["Final government holiday schedule", "NOT YET FINAL on this page's verification date"],
        ],
      },
      note:
        "GoVietStay will update the status when the responsible authority publishes a final schedule.",
    },
    {
      id: "is-vietnam-closed",
      eyebrow: "OPENING HOURS",
      title: "Does Vietnam close during Tet?",
      intro:
        "Vietnam does not simply 'shut down'. Different sectors follow different schedules, and the biggest variation is usually among public offices and small family businesses.",
      table: {
        headers: ["Service", "Practical expectation"],
        rows: [
          ["Government offices", "Holiday schedule applies; handle time-sensitive paperwork before the holiday where possible"],
          ["Banks", "Branches may close on official holidays; cards / ATMs continue but cash planning matters"],
          ["Hotels", "Generally operate, but staffing and services can vary"],
          ["Airports", "Operate; passenger volume can be very high"],
          ["Restaurants", "Mixed — large venues may open while family businesses may close"],
          ["Attractions", "Many operate, but special holiday hours / ticket rules can apply"],
          ["Emergency services", "Emergency contacts remain essential; see the Local Help guide"],
        ],
      },
    },
    {
      id: "flights",
      eyebrow: "AIR TRAVEL",
      title: "Flights during Tet",
      bullets: [
        "Book important domestic sectors early when your dates are fixed.",
        "Allow more time for busy airports and ground transport.",
        "Check the airline directly for schedule changes; social posts are not a substitute for your booking status.",
        "If your international flight connects to a domestic sector, avoid an unnecessarily tight connection during a peak travel period.",
      ],
    },
    {
      id: "train-bus",
      eyebrow: "INTERCITY TRANSPORT",
      title: "Trains and intercity buses",
      bullets: [
        "Demand rises sharply because many people travel to their home provinces before Tet and return afterward.",
        "Use official or established booking channels and keep the ticket / booking reference.",
        "Confirm departure station, pickup point and reporting time because holiday traffic can slow local transfers.",
        "Do not build a same-day critical connection around an unverified bus arrival time.",
      ],
    },
    {
      id: "local-transport",
      eyebrow: "TAXI · GRAB · PRIVATE CAR",
      title: "Local transport can still work — but availability and timing can change",
      bullets: [
        "Airport and hotel transport should be confirmed before a critical arrival or departure.",
        "Ride-hailing supply can vary by time and location; do not assume an ordinary weekday wait time.",
        "Confirm any holiday surcharge before the ride when using a private service.",
        "Save the vehicle plate and driver's contact when a transfer is important.",
      ],
    },
    {
      id: "banks-cash",
      eyebrow: "MONEY",
      title: "Banks, ATMs, cards and cash",
      bullets: [
        "Handle branch-dependent banking before the public holiday period when possible.",
        "Carry a reasonable cash backup without carrying more than you can secure safely.",
        "Use ATMs in well-lit, established locations and save the bank / machine details if a card is retained.",
        "Do not rely on one card, one wallet or one payment method for the entire trip.",
      ],
    },
    {
      id: "food-restaurants",
      eyebrow: "FOOD",
      title: "Restaurants: expect a mix of open, closed and holiday schedules",
      intro:
        "The most common planning mistake is assuming a restaurant's normal online opening hours automatically apply during Tet.",
      bullets: [
        "For an important dinner, message or call the venue close to the date.",
        "Hotels can be a useful backup for meals when small local restaurants close.",
        "Ask about Tet menus or surcharges before ordering when a venue is operating on a holiday schedule.",
        "Keep one flexible meal plan rather than locking every meal weeks in advance.",
      ],
    },
    {
      id: "attractions",
      eyebrow: "THINGS TO DO",
      title: "Attractions and tours",
      bullets: [
        "Major attractions may operate during Tet but can use special hours, capacity controls or holiday prices.",
        "For sea tours, weather and authority decisions still matter even when the attraction is scheduled to operate.",
        "A private guide, driver or activity should be reconfirmed because staff availability can differ during the family holiday.",
        "Do not plan every day at maximum intensity; Tet traffic and crowds can make transfers slower.",
      ],
    },
    {
      id: "health-help",
      eyebrow: "HEALTH & SUPPORT",
      title: "Keep emergency and local-help information saved offline",
      intro:
        "Pharmacies, clinics and hospitals do not all follow the same holiday hours. If the situation is urgent, use the official emergency service rather than waiting for a tourism contact to answer.",
      cards: [
        {
          title: "Emergency",
          text:
            "Call 112 for a national emergency request, 113 for police, 114 for fire / rescue or 115 for urgent medical assistance.",
        },
        {
          title: "Local travel problem",
          text:
            "Use the Vietnam Local Help page for lost property, passports, transport problems and official destination hotlines.",
        },
      ],
      note:
        "Open /travel/vietnam-local-help and save the page before a busy holiday travel day.",
    },
    {
      id: "surcharges",
      eyebrow: "PRICES",
      title: "Tet surcharges: ask before you confirm",
      intro:
        "It is inaccurate to say that 'everything doubles' during Tet. Some services may apply a holiday surcharge because of staffing and demand; others keep normal pricing.",
      bullets: [
        "Ask whether the quoted total already includes any Tet / public-holiday surcharge.",
        "Get the amount in writing for a private car, guide or special service.",
        "For metered / app transport, use the platform's displayed fare where applicable.",
        "Do not accept a vague 'holiday fee' after the service if it was never disclosed and you had a confirmed price.",
      ],
    },
    {
      id: "etiquette",
      eyebrow: "CULTURE",
      title: "Simple Tet etiquette for visitors",
      bullets: [
        "Use a friendly 'Chuc Mung Nam Moi' (Happy New Year) greeting.",
        "If invited to a home, follow the host's lead and keep the first visit respectful and relaxed.",
        "Lucky money is a cultural gesture, especially for children; it is not a payment for hospitality.",
        "Dress respectfully at pagodas and religious sites.",
        "Ask before photographing private family moments or ceremonies.",
        "Avoid turning superstitions or first-visitor customs into jokes; practices vary by family.",
      ],
    },
    {
      id: "families",
      eyebrow: "TRAVEL WITH CHILDREN",
      title: "Tet with children: reduce transfer risk, not the experience",
      bullets: [
        "Avoid stacking a long flight, long road transfer and evening activity into the same day.",
        "Keep snacks, water, basic child essentials and one payment backup with you on transport days.",
        "Confirm child ticket rules and heights for attractions before you arrive.",
        "Choose one must-do experience per peak day and leave room for crowds or slower traffic.",
      ],
    },
    {
      id: "book-early",
      eyebrow: "PRIORITY ORDER",
      title: "What should be secured early?",
      table: {
        headers: ["Priority", "What to confirm"],
        rows: [
          ["Highest", "International / domestic flights and critical intercity transport"],
          ["High", "Accommodation for fixed destinations"],
          ["High", "Airport / station transfers for important arrival and departure times"],
          ["Medium", "Must-do attraction or private service with limited holiday staffing"],
          ["Flexible", "Non-essential local activities that can move with weather and opening hours"],
        ],
      },
    },
    {
      id: "destinations",
      eyebrow: "BY DESTINATION",
      title: "How to think about Tet in key Vietnam destinations",
      cards: [
        {
          title: "Hanoi",
          text:
            "Strong Tet atmosphere and family travel. Expect busy pre-Tet movement and check small-business hours carefully.",
        },
        {
          title: "Ho Chi Minh City",
          text:
            "A major transport hub that continues operating, while some local businesses close as residents travel home.",
        },
        {
          title: "Da Nang · Hoi An · Hue",
          text:
            "Tourism continues, but confirm attraction, restaurant, guide and intercity transfer schedules around the core holiday days.",
        },
        {
          title: "Phu Quoc",
          text:
            "Resort and tourism operations remain important; confirm airport transfers, sea activities and holiday dining plans.",
        },
      ],
    },
  ],
  whatsappKeyword: "TET 2027 HELP",
  whatsappIntro:
    "I am planning Vietnam during Tet 2027 and want help checking practical travel arrangements.",
  whatsappFields: [
    "Travel dates",
    "Destinations",
    "Adults + children",
    "Hotel / area",
    "What I need checked (transport / opening hours / itinerary / local help)",
  ],
  whatsappLabel: "Want help checking what is actually practical for your Tet dates?",
  sourceTitle: "Official status source for Tet 2027",
  sources: [
    {
      label: "Government of Vietnam — Ministry proposal for Tet 2027",
      href:
        "https://xaydungchinhsach.chinhphu.vn/de-xuat-2-phuong-an-nghi-tet-nguyen-dan-2027-tet-dinh-mui-11926080513033257.htm",
      note:
        "Published 8 August 2026. It lists the two proposed civil-service holiday options and states the Ministry's preferred option.",
    },
    {
      label: "Vietnam Local Help — GoVietStay",
      href: "https://www.govietstay.com/travel/vietnam-local-help",
      note:
        "Emergency numbers, lost property, passports and official tourist assistance contacts.",
    },
  ],
  relatedTitle: "Useful pages to save before a holiday trip",
  related: [
    {
      label: "Vietnam Local Help",
      href: "/travel/vietnam-local-help",
      text:
        "Emergency numbers, lost passport / property steps and official tourist support contacts.",
    },
    {
      label: "Vietnam Travel Guides",
      href: "/travel",
      text:
        "Practical GoVietStay English guides for Da Nang, Hoi An, Hue and Phu Quoc.",
    },
  ],
};

export default function Page() {
  return <TravelSupportPage data={data} />;
}

'@

$files = [ordered]@{
  "components\travel-support\TravelSupportPage.tsx" = $component
  "components\travel-support\travel-support.css" = $css
  "app\travel\vietnam-local-help\page.tsx" = $localPage
  "app\travel\vietnam-tet-travel-guide\page.tsx" = $tetPage
}

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = Join-Path $root (".govietstay-backups\travel-help-v1-" + $stamp)
$backedUp = $false

Write-Step "Backing up only files that V1 may overwrite"
foreach ($relative in $files.Keys) {
  $dest = Join-Path $root $relative
  if (Test-Path $dest) {
    $backupDest = Join-Path $backupRoot $relative
    $backupParent = Split-Path -Parent $backupDest
    New-Item -ItemType Directory -Path $backupParent -Force | Out-Null
    Copy-Item -LiteralPath $dest -Destination $backupDest -Force
    Write-Host ("Backup: " + $relative) -ForegroundColor Yellow
    $backedUp = $true
  }
}
if (-not $backedUp) {
  Write-Host "No existing V1 target files found. No backup was necessary." -ForegroundColor DarkGray
}

Write-Step "Writing 2 help-first landing pages"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
foreach ($relative in $files.Keys) {
  $dest = Join-Path $root $relative
  $parent = Split-Path -Parent $dest
  New-Item -ItemType Directory -Path $parent -Force | Out-Null
  [System.IO.File]::WriteAllText($dest, $files[$relative], $utf8NoBom)
  Write-Host ("Written: " + $relative) -ForegroundColor Green
}

Write-Step "V1 safety checks"
$localDest = Join-Path $root "app\travel\vietnam-local-help\page.tsx"
$tetDest = Join-Path $root "app\travel\vietnam-tet-travel-guide\page.tsx"
$componentDest = Join-Path $root "components\travel-support\TravelSupportPage.tsx"

$checkText = [IO.File]::ReadAllText($componentDest) + "`n" + [IO.File]::ReadAllText($localDest) + "`n" + [IO.File]::ReadAllText($tetDest)

$checks = @(
  @{ Name = "Official GoVietStay logo"; Pattern = "/brand/govietstay-official-logo.jpg" },
  @{ Name = "WhatsApp phone"; Pattern = "84937762607" },
  @{ Name = "LOCAL HELP keyword"; Pattern = "LOCAL HELP" },
  @{ Name = "TET 2027 HELP keyword"; Pattern = "TET 2027 HELP" },
  @{ Name = "Emergency disclaimer"; Pattern = "not an emergency dispatch service" },
  @{ Name = "Help-first wording"; Pattern = "Trusted Local Support" }
)

foreach ($check in $checks) {
  if ($checkText.Contains($check.Pattern)) {
    Write-Host ("PASS: " + $check.Name) -ForegroundColor Green
  } else {
    throw ("CHECK FAILED: " + $check.Name)
  }
}

if ($checkText -match "(?i)\bBook Now\b") {
  throw "CHECK FAILED: hard-sell 'Book Now' wording found."
}
Write-Host "PASS: no hard-sell 'Book Now' CTA" -ForegroundColor Green

Write-Host ""
Write-Host "V1 intentionally does NOT edit /travel hub, sitemap, Git, or Vercel." -ForegroundColor Yellow
Write-Host "This keeps the first check isolated. After approval, wire the 2 pages into the hub + sitemap." -ForegroundColor Yellow

Write-Step "Optional production build check"
$answer = Read-Host "Run 'npm run build' now? This checks the whole site and does NOT deploy. [y/N]"
if ($answer -match "^[Yy]$") {
  Push-Location $root
  try {
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) {
      throw ("npm run build failed with exit code " + $LASTEXITCODE)
    }
    Write-Host "BUILD PASSED." -ForegroundColor Green
  } finally {
    Pop-Location
  }
} else {
  Write-Host "Build skipped." -ForegroundColor DarkGray
}

Write-Step "Local preview"
Write-Host "Run this from the repository root:" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "Then open:" -ForegroundColor White
Write-Host "  http://localhost:3000/travel/vietnam-local-help" -ForegroundColor Cyan
Write-Host "  http://localhost:3000/travel/vietnam-tet-travel-guide" -ForegroundColor Cyan

if ($backedUp) {
  Write-Host ""
  Write-Host ("Backup folder: " + $backupRoot) -ForegroundColor Yellow
}

Write-Host ""
Write-Host "DONE: 2 help-first landing pages installed for local checking only." -ForegroundColor Green
exit 0
