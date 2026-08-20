import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AktualnoFooter, AktualnoHeader } from "../../../../components/AktualnoPage";
import { aktualnoArticles, getAktualnoArticle } from "../../../../lib/aktualnoArticles";

type Props = { params: Promise<{ slug: string }> };
const BASE = "https://www.govietstay.com/ru/aktualno";

export function generateStaticParams() {
  return aktualnoArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getAktualnoArticle(slug);
  if (!article) return {};
  const canonical = `${BASE}/${article.slug}`;

  return {
    title: `${article.title} | GoVietStay`,
    description: article.excerpt,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: "ru_RU",
      url: canonical,
      siteName: "GoVietStay",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.published,
      modifiedTime: article.modified,
      images: [{ url: article.image, alt: article.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: [article.image] },
  };
}

export default async function AktualnoArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getAktualnoArticle(slug);
  if (!article) notFound();

  const related = aktualnoArticles.filter((item) => item.slug !== article.slug).slice(0, 3);
  const whatsapp = `https://wa.me/84937762607?text=${encodeURIComponent(`Здравствуйте, у меня вопрос по материалу: ${article.title} [${article.slug}]`)}`;
  const canonical = `${BASE}/${article.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": article.category === "today" ? "NewsArticle" : "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: [article.image],
    datePublished: article.published,
    dateModified: article.modified,
    mainEntityOfPage: canonical,
    inLanguage: "ru",
    author: { "@type": "Person", name: "David Tran", url: "https://www.govietstay.com/#founder" },
    publisher: { "@type": "Organization", name: "GoVietStay", url: "https://www.govietstay.com/ru", logo: { "@type": "ImageObject", url: "https://www.govietstay.com/logo.png" } },
  };
  const faqSchema = article.faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  } : null;

  return (
    <div className="aktualno-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <AktualnoHeader />
      <main>
        <article>
          <header className="akt-article-hero">
            <img src={article.image} alt={article.imageAlt} />
            <div className="akt-article-shade" />
            <div className="akt-shell akt-article-hero-content">
              <Link href="/ru/aktualno" className="akt-back">← Все материалы</Link>
              <div className="akt-tag-row"><span className={`akt-badge ${article.category}`}>{article.categoryLabel}</span><span>{article.location}</span></div>
              <h1>{article.title}</h1>
              <p>{article.excerpt}</p>
              <div className="akt-byline"><img src="https://www.govietstay.com/founder/david-founder.png" alt="David Tran" /><div><strong>David Tran · GoVietStay Local Team</strong><span>{article.displayDate} · {article.readingTime}</span></div></div>
            </div>
          </header>

          <div className="akt-shell akt-article-layout">
            <aside className="akt-aside">
              <span className="akt-aside-label">В ЭТОМ МАТЕРИАЛЕ</span>
              {article.sections.map((section, index) => <a key={section.heading} href={`#section-${index + 1}`}>{section.heading}</a>)}
              {article.faq && <a href="#faq">Частые вопросы</a>}
              <div className="akt-aside-help"><strong>Нужна помощь сейчас?</strong><p>Местная команда ответит на русском.</p><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
            </aside>

            <div className="akt-article-content">
              <div className="akt-summary"><span>Короткий ответ</span><p>{article.summary}</p></div>
              {article.sections.map((section, index) => (
                <section key={section.heading} id={`section-${index + 1}`}>
                  <span className="akt-section-number">0{index + 1}</span>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                </section>
              ))}
              {article.faq && <section className="akt-faq" id="faq"><span className="akt-section-number">FAQ</span><h2>Частые вопросы</h2>{article.faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</section>}
              <div className="akt-article-cta"><h2>Получите точное подтверждение перед поездкой</h2><p>Дата, отель, количество взрослых и детей — этого достаточно, чтобы начать.</p><div><a className="akt-primary-button" href={whatsapp} target="_blank" rel="noreferrer">Написать в WhatsApp ↗</a><a className="akt-text-button" href={article.relatedTourUrl}>{article.relatedTourLabel} →</a></div></div>
            </div>
          </div>
        </article>

        <section className="akt-related"><div className="akt-shell"><div className="akt-related-heading"><div><span className="section-index">ЧИТАТЬ ДАЛЬШЕ</span><h2>Полезно перед поездкой</h2></div><Link href="/ru/aktualno">Все материалы →</Link></div><div className="akt-related-grid">{related.map((item) => <Link href={`/ru/aktualno/${item.slug}`} key={item.slug} className="akt-related-card"><img src={item.image} alt={item.imageAlt} /><div><span>{item.categoryLabel}</span><h3>{item.title}</h3><b>Читать →</b></div></Link>)}</div></div></section>
      </main>
      <AktualnoFooter />
    </div>
  );
}
