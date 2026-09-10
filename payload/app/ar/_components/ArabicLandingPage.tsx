import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  CircleCheckBig,
  Clock3,
  HelpCircle,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export type LandingSection = {
  label: string;
  title: string;
  text: string;
};

export type LandingFaq = {
  q: string;
  a: string;
};

export type DecisionItem = {
  badge: string;
  title: string;
  text: string;
};

export type LandingPageProps = {
  path: string;
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  accent: "emerald" | "ocean" | "gold";
  quickFacts: string[];
  quickAnswerTitle?: string;
  quickAnswer?: string;
  promiseTitle: string;
  promiseText: string;
  promises: LandingSection[];
  decisionTitle?: string;
  decisionLead?: string;
  decisions?: DecisionItem[];
  planTitle: string;
  planLead: string;
  plan: LandingSection[];
  included: string[];
  noteTitle: string;
  noteText: string;
  faq: LandingFaq[];
  related: Array<{ href: string; label: string }>;
  bookingLabel?: string;
};

const whatsapp =
  "https://wa.me/84937762607?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20GoVietStay%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%AE%D8%B7%D8%A9%20%D8%AE%D8%A7%D8%B5%D8%A9%20%D9%84%D8%B1%D8%AD%D9%84%D8%AA%D9%8A%20%D8%A5%D9%84%D9%89%20%D9%81%D9%8A%D8%AA%D9%86%D8%A7%D9%85";

export default function ArabicLandingPage(props: LandingPageProps) {
  const canonical = `https://www.govietstay.com${props.path}`;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: props.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "GoVietStay العربية", item: "https://www.govietstay.com/ar" },
      { "@type": "ListItem", position: 2, name: props.title, item: canonical },
    ],
  };

  return (
    <main className={`subpage subpage-${props.accent}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="site-header subpage-header">
        <Link className="brand" href="/ar" aria-label="GoVietStay العربية">
          <Image src="/ar-assets/logo.webp" alt="شعار GoVietStay الرسمي" width={56} height={56} priority />
          <span><b>GoVietStay</b><small>دعم محلي موثوق في فيتنام</small></span>
        </Link>
        <nav aria-label="التنقل الرئيسي">
          <Link href="/ar">الرئيسية</Link>
          <a href="#details">التفاصيل</a>
          <a href="#plan">الخطة</a>
          <a href="#faq">الأسئلة</a>
        </nav>
        <a className="header-cta" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={19} /> واتساب</a>
      </header>

      <section className="sub-hero">
        <Image src={props.image} alt={props.imageAlt} fill priority sizes="100vw" className="sub-hero-image" />
        <div className="sub-hero-shade" />
        <div className="sub-hero-content">
          <Link className="breadcrumb" href="/ar"><ChevronLeft size={17} /> GoVietStay العربية</Link>
          <p className="eyebrow"><Sparkles size={17} /> {props.eyebrow}</p>
          <h1>{props.title}</h1>
          <p>{props.lead}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer">{props.bookingLabel ?? "اطلب خطة تناسبكم"} <ArrowLeft size={20} /></a>
            <a className="button button-ghost" href="#details">اعرف التفاصيل</a>
          </div>
        </div>
        <div className="sub-facts">
          {props.quickFacts.map((fact) => <span key={fact}><Check size={17} /> {fact}</span>)}
        </div>
      </section>

      {props.quickAnswer && (
        <section className="quick-answer-wrap" aria-label="إجابة سريعة">
          <div className="quick-answer-card">
            <span>إجابة سريعة</span>
            <h2>{props.quickAnswerTitle ?? "ما المهم معرفته أولاً؟"}</h2>
            <p>{props.quickAnswer}</p>
          </div>
        </section>
      )}

      <section className="section sub-intro" id="details">
        <div className="section-heading">
          <p className="eyebrow green">مصمم حول احتياجاتكم</p>
          <h2>{props.promiseTitle}</h2>
          <p>{props.promiseText}</p>
        </div>
        <div className="sub-promise-grid">
          {props.promises.map((item, index) => (
            <article key={item.title}>
              <b>0{index + 1}</b>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {!!props.decisions?.length && (
        <section className="section decision-section">
          <div className="section-heading split-heading">
            <div><p className="eyebrow green">قرار أسهل</p><h2>{props.decisionTitle}</h2></div>
            <p>{props.decisionLead}</p>
          </div>
          <div className="decision-grid">
            {props.decisions.map((item) => (
              <article key={item.title}><span>{item.badge}</span><h3>{item.title}</h3><p>{item.text}</p></article>
            ))}
          </div>
        </section>
      )}

      <section className="section sub-plan" id="plan">
        <div className="sub-plan-heading">
          <p className="eyebrow green">خطة واضحة وقابلة للتعديل</p>
          <h2>{props.planTitle}</h2>
          <p>{props.planLead}</p>
        </div>
        <div className="sub-plan-list">
          {props.plan.map((item, index) => (
            <article key={item.title}>
              <span className="plan-index">{String(index + 1).padStart(2, "0")}</span>
              <div><small>{item.label}</small><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section included-section" id="included">
        <div className="included-card">
          <div>
            <p className="eyebrow"><ShieldCheck size={18} /> فريق واحد مسؤول عن التفاصيل</p>
            <h2>ما الذي يمكن لـ GoVietStay ترتيبه؟</h2>
            <p>نؤكد كل خدمة حسب التاريخ والتوفر، ثم نعرض ما يشمله السعر وما لا يشمله قبل الدفع.</p>
          </div>
          <ul>
            {props.included.map((item) => <li key={item}><CircleCheckBig /> {item}</li>)}
          </ul>
        </div>
        <div className="honest-note">
          <Clock3 />
          <div><h3>{props.noteTitle}</h3><p>{props.noteText}</p></div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="section-heading">
          <p className="eyebrow green"><HelpCircle size={18} /> قبل الحجز</p>
          <h2>أسئلة يطرحها المسافرون قبل اتخاذ القرار</h2>
        </div>
        <div className="faq-list">
          {props.faq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="related-section">
        <div><small>تابع التخطيط</small><h2>أدلة وصفحات قد تساعدكم أيضاً</h2></div>
        <div className="related-links">
          {props.related.map((item) => <Link href={item.href} key={item.href}>{item.label}<ChevronLeft /></Link>)}
        </div>
      </section>

      <section className="final-cta sub-final-cta">
        <div><p className="eyebrow"><MessageCircle /> رسالة واحدة تكفي للبدء</p><h2>أرسلوا التاريخ وعدد الضيوف.<br />ونبني الرحلة من هناك.</h2><p>اذكروا أعمار الأطفال، مستوى الفندق، احتياجات الطعام والمدن التي ترغبون في زيارتها.</p></div>
        <a className="button button-light" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle /> تحدث مع GoVietStay</a>
      </section>

      <footer>
        <Link className="brand footer-brand" href="/ar"><Image src="/ar-assets/logo.webp" alt="GoVietStay" width={56} height={56} /><span><b>GoVietStay</b><small>Trusted Local Support</small></span></Link>
        <p><MapPin size={17} /> دا نانغ · هوي آن · هوي · فو كوك · جميع أنحاء فيتنام</p>
        <p>© 2026 GoVietStay</p>
      </footer>
      <div className="mobile-sticky-bar">
        <a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} /> واتساب</a>
        <a href="#plan">شاهد الخطة</a>
      </div>
      <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="تواصل عبر واتساب"><MessageCircle /></a>
    </main>
  );
}
