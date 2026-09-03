import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  Clock3,
  ExternalLink,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

export type TourCard = {
  name: string;
  kicker: string;
  time: string;
  price: string;
  image: string;
  imageAlt: string;
  tags: string[];
  summary: string;
  bestFor: string;
  href?: string;
};

export type TourCatalogProps = {
  path: string;
  eyebrow: string;
  title: string;
  lead: string;
  heroImage: string;
  heroAlt: string;
  facts: string[];
  destination: string;
  catalogTitle: string;
  catalogLead: string;
  tours: TourCard[];
  familyHref: string;
  familyTitle: string;
  familyText: string;
  noteTitle: string;
  noteText: string;
  faq: Array<{ q: string; a: string }>;
};

const maps = "https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic";
const baseWhatsapp = "https://wa.me/84937762607";

// These quotes are already published by GoVietStay as Google-review excerpts.
// Do not label nationality/ethnicity unless the public review itself or profile clearly verifies it.
const reviews = [
  {
    name: "Mehak Khanna",
    quote: "10/10 service. David and Terry are very professional and super supportive. Our trip to Ba Na Hills Da Nang was amazing because of GoVietStay.",
    context: "Ba Na Hills · Google Review",
  },
  {
    name: "Ryan",
    quote: "An amazing trip! Our first visit to Da Nang with GoVietStay. Great service and very helpful support. Highly recommended!",
    context: "Da Nang · Google Review",
  },
  {
    name: "W B",
    quote: "I really enjoyed my trip to Hoi An and took the opportunity to enjoy a short boat ride. Thank you to the agency for recommending it.",
    context: "Hoi An · Google Review",
  },
];

function waForTour(name: string) {
  const text = `مرحبا GoVietStay، أريد التحقق من توفر هذه الجولة: ${name}. تاريخ الرحلة: ____ الفندق: ____ عدد البالغين: ____ الأطفال وأعمارهم: ____`;
  return `${baseWhatsapp}?text=${encodeURIComponent(text)}`;
}

export default function ArabicTourCatalogPage(props: TourCatalogProps) {
  const canonical = `https://www.govietstay.com${props.path}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "GoVietStay العربية", item: "https://www.govietstay.com/ar" },
      { "@type": "ListItem", position: 2, name: props.destination, item: canonical },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: props.catalogTitle,
    itemListElement: props.tours.map((tour, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tour.name,
      url: canonical,
    })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: props.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="catalog-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="site-header subpage-header">
        <Link className="brand" href="/ar" aria-label="GoVietStay العربية">
          <Image src="/ar-assets/logo.webp" alt="شعار GoVietStay الرسمي" width={56} height={56} priority />
          <span><b>GoVietStay</b><small>دعم محلي موثوق في فيتنام</small></span>
        </Link>
        <nav aria-label="التنقل الرئيسي">
          <Link href="/ar">الرئيسية</Link>
          <a href="#reviews">تقييمات Google</a>
          <a href="#tours">الجولات</a>
          <a href="#faq">الأسئلة</a>
        </nav>
        <a className="header-cta" href={baseWhatsapp} target="_blank" rel="noreferrer"><MessageCircle size={19} /> واتساب</a>
      </header>

      <section className="catalog-hero">
        <Image src={props.heroImage} alt={props.heroAlt} fill priority sizes="100vw" className="catalog-hero-image" />
        <div className="catalog-hero-shade" />
        <div className="catalog-hero-inner">
          <Link className="breadcrumb" href="/ar"><ChevronLeft size={17} /> GoVietStay العربية</Link>
          <p className="eyebrow"><Sparkles size={17} /> {props.eyebrow}</p>
          <h1>{props.title}</h1>
          <p>{props.lead}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#tours">شاهد الجولات <ArrowLeft size={20} /></a>
            <a className="button button-ghost" href={baseWhatsapp} target="_blank" rel="noreferrer">اسأل على واتساب</a>
          </div>
          <div className="catalog-facts">
            {props.facts.map((fact) => <span key={fact}><Check size={16} /> {fact}</span>)}
          </div>
        </div>
      </section>

      {/* SECTION 2 — Google Reviews, intentionally placed before the tour catalogue. */}
      <section className="section google-review-section" id="reviews">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow green"><Star size={17} fill="currentColor" /> تقييمات Google الحقيقية</p>
            <h2>تحققوا من تجارب الضيوف قبل أن تحجزوا</h2>
          </div>
          <div>
            <p>نستخدم مقتطفات منشورة من مراجعات GoVietStay على Google ونترك لكم رابط الملف الأصلي للتحقق بأنفسكم. عندما تتوفر مراجعات عربية موثقة بوضوح، نعطيها الأولوية هنا.</p>
            <a className="text-link" href={maps} target="_blank" rel="noreferrer">افتح جميع مراجعات Google <ExternalLink size={17} /></a>
          </div>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div className="stars" aria-label="5 من 5"><Star/><Star/><Star/><Star/><Star/></div>
              <blockquote>“{review.quote}”</blockquote>
              <div><b>{review.name}</b><span>{review.context}</span></div>
            </article>
          ))}
        </div>
        <div className="review-proof-bar">
          <ShieldCheck />
          <div><b>لا نختلق المراجعات ولا نخمن جنسية العميل.</b><span>المصدر الأساسي هو ملف Google العام لـ GoVietStay.</span></div>
          <a href={maps} target="_blank" rel="noreferrer">تحقق على Google</a>
        </div>
      </section>

      <section className="section tour-catalog-section" id="tours">
        <div className="section-heading split-heading">
          <div><p className="eyebrow green">احجز جولة واحدة أو أكثر</p><h2>{props.catalogTitle}</h2></div>
          <p>{props.catalogLead}</p>
        </div>
        <div className="tour-card-grid">
          {props.tours.map((tour, index) => (
            <article className="tour-card-ar" key={tour.name}>
              <div className="tour-card-image">
                <Image src={tour.image} alt={tour.imageAlt} fill sizes="(max-width: 760px) 100vw, 33vw" />
                <span className="tour-index">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="tour-card-body">
                <small>{tour.kicker}</small>
                <h3>{tour.name}</h3>
                <p>{tour.summary}</p>
                <div className="tour-meta">
                  <span><Clock3 size={16} /> {tour.time}</span>
                  <span><Users size={16} /> {tour.bestFor}</span>
                </div>
                <div className="tour-tags">{tour.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="tour-price-row">
                  <div><small>السعر المرجعي من</small><b>{tour.price}</b></div>
                  <a href={waForTour(tour.name)} target="_blank" rel="noreferrer">تحقق من التوفر <ChevronLeft size={17} /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="catalog-price-note">الأسعار أعلاه مرجعية للمنتجات المنشورة حالياً من GoVietStay وقد تختلف حسب التاريخ، عمر/طول الطفل، نقطة الاستقبال، نوع الجولة، التشغيل والطقس. نؤكد السعر النهائي وما يشمله قبل الدفع.</p>
      </section>

      <section className="section family-cross-sell">
        <div>
          <p className="eyebrow"><ShieldCheck size={17} /> إذا كنتم لا تريدون مجرد جولة يومية</p>
          <h2>{props.familyTitle}</h2>
          <p>{props.familyText}</p>
        </div>
        <Link className="button button-light" href={props.familyHref}>خطط رحلة عائلية خاصة <ArrowLeft size={19} /></Link>
      </section>

      <section className="section catalog-note-section">
        <div className="honest-note catalog-honest-note">
          <Clock3 />
          <div><h3>{props.noteTitle}</h3><p>{props.noteText}</p></div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="section-heading">
          <p className="eyebrow green">قبل الحجز</p>
          <h2>أسئلة سريعة عن حجز الجولات</h2>
        </div>
        <div className="faq-list">
          {props.faq.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}
        </div>
      </section>

      <section className="final-cta sub-final-cta catalog-final-cta">
        <div><p className="eyebrow"><MessageCircle /> أسرع طريقة للتأكد</p><h2>أرسل التاريخ، الفندق وعدد الضيوف.</h2><p>نراجع التوفر والسعر الحقيقي وخيارات الأطفال ثم نرسل لكم التأكيد قبل الدفع.</p></div>
        <a className="button button-light" href={baseWhatsapp} target="_blank" rel="noreferrer"><MessageCircle /> واتساب GoVietStay</a>
      </section>

      <footer>
        <Link className="brand footer-brand" href="/ar"><Image src="/ar-assets/logo.webp" alt="GoVietStay" width={56} height={56} /><span><b>GoVietStay</b><small>Trusted Local Support</small></span></Link>
        <p><MapPin size={17} /> دا نانغ · هوي آن · هوي · فو كوك</p>
        <p>© 2026 GoVietStay</p>
      </footer>

      <div className="mobile-sticky-bar">
        <a href={baseWhatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} /> واتساب</a>
        <a href="#tours">الجولات</a>
      </div>
    </main>
  );
}
