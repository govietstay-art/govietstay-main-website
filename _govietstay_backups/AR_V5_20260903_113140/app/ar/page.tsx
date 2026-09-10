// Internal workspace sites can read the authenticated OpenAI user from the
// forwarded request headers:
//
// import { headers } from "next/headers";
//
// export default async function Home() {
//   const requestHeaders = await headers();
//   const email = requestHeaders.get("oai-authenticated-user-email");
//   const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
//   const fullName =
//     encodedFullName &&
//     requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
//       "percent-encoded-utf-8"
//       ? decodeURIComponent(encodedFullName)
//       : null;
//   const displayName = fullName ?? email;
//   // ...
// }

import Image from "next/image";
import {
  ArrowLeft,
  BedDouble,
  CarFront,
  Check,
  ChevronLeft,
  Clock3,
  Compass,
  HeartHandshake,
  Languages,
  MapPin,
  MessageCircle,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Users,
  Utensils,
} from "lucide-react";

const whatsapp =
  "https://wa.me/84937762607?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20GoVietStay%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%AA%D8%AE%D8%B7%D9%8A%D8%B7%20%D8%B1%D8%AD%D9%84%D8%A9%20%D8%AE%D8%A7%D8%B5%D8%A9%20%D8%A5%D9%84%D9%89%20%D9%81%D9%8A%D8%AA%D9%86%D8%A7%D9%85";

const assurances = [
  { icon: Users, title: "خصوصية للعائلة", text: "رحلة خاصة بالكامل، من دون الانضمام إلى مجموعة سياحية." },
  { icon: Utensils, title: "تنسيق الطعام الحلال", text: "نوضح حالة كل مطعم ووجبة قبل التأكيد، بلا وعود مبهمة." },
  { icon: MoonStar, title: "وقت مريح للصلاة", text: "نراعي أوقات الصلاة ونقترح المساجد أو الأماكن المناسبة حسب المسار." },
  { icon: CarFront, title: "سيارة خاصة مناسبة", text: "نختار السيارة بحسب عدد الضيوف والأطفال والحقائب، لا العدد فقط." },
];

const destinations = [
  {
    kicker: "وسط فيتنام",
    title: "دا نانغ · هوي آن · هوي",
    text: "شواطئ، فوانيس وتراث — مع توقيت مرن بعيداً عن أشد ساعات الحر والزحام.",
    image: "/ar-assets/hero-hoian.webp",
    position: "center",
  },
  {
    kicker: "يوم عائلي مميز",
    title: "با نا هيلز · الجسر الذهبي",
    text: "تلفريك وإطلالات وتجربة جبلية كاملة، نضعها في اليوم الأنسب لحالة الطقس والعائلة.",
    image: "/ar-assets/bana.webp",
    position: "center",
  },
  {
    kicker: "الجزيرة",
    title: "فو كوك · الجزر · هون ثوم",
    text: "استرخاء في المنتجع وخيارات بحرية وبرية، مع خطة بديلة إذا لم تكن حالة البحر مناسبة.",
    image: "/ar-assets/phuquoc.webp",
    position: "center",
  },
];

const itinerary = [
  ["1–3", "هانوي ونينه بينه", "استقبال خاص، جولة هادئة في هانوي، ثم الطبيعة والقارب في نينه بينه."],
  ["4–5", "خليج هالونغ", "رحلة بحرية مختارة بعناية مع طلب الوجبات المناسب قبل الحجز."],
  ["6–8", "دا نانغ وهوي آن", "الجسر الذهبي، وقت شاطئ، ومدينة هوي آن القديمة في المساء."],
  ["9–11", "فو كوك", "منتجع عائلي، سيارة خاصة، وجزر أو أنشطة مائية حسب الطقس وراحة الأسرة."],
];

const servicePages = [
  { number: "01", href: "/ar/vietnam-family-private-tour", kicker: "العائلة أولاً", title: "رحلات فيتنام الخاصة للعائلات", text: "سيارة وغرف ووتيرة يومية مبنية حول الأطفال وكبار السن." },
  { number: "02", href: "/ar/halal-travel-vietnam", kicker: "بلا تخمين", title: "السفر الحلال في فيتنام", text: "الفرق واضح بين حلال معتمد وخيار مناسب للمسلمين." },
  { number: "03", href: "/ar/vietnam-11-day-itinerary", kicker: "من الشمال إلى البحر", title: "برنامج فيتنام 11 يوماً", text: "هانوي وهالونغ ودا نانغ وهوي آن وفو كوك بإيقاع متوازن." },
  { number: "04", href: "/ar/da-nang-hoi-an-private-tour", kicker: "وسط فيتنام", title: "دا نانغ وهوي آن بشكل خاص", text: "الجسر الذهبي والشاطئ والفوانيس من قاعدة واحدة مريحة." },
  { number: "05", href: "/ar/phu-quoc-family-tour", kicker: "الجزيرة للعائلة", title: "فو كوك بخطة طقس مرنة", text: "3 أو 4 جزر، هون ثوم، وقت منتجع وخيارات برية." },
  { number: "06", href: "/ar/phu-quoc-tours", kicker: "احجز جولة منفصلة", title: "10 جولات فو كوك الحالية", text: "قارن الجزر وهون ثوم والغروب واليخت وشمال الجزيرة في صفحة واحدة." },
  { number: "07", href: "/ar/da-nang-hoi-an-tours", kicker: "احجز ما تحتاجه فقط", title: "جولات دا نانغ وهوي آن", text: "با نا هيلز وهوي آن وجزيرة تشام وهوي ومغامرات وسط فيتنام." },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="GoVietStay الرئيسية">
          <Image src="/ar-assets/logo.webp" alt="شعار GoVietStay الرسمي" width={58} height={58} priority />
          <span><b>GoVietStay</b><small>دعم محلي موثوق في فيتنام</small></span>
        </a>
        <nav aria-label="التنقل الرئيسي">
          <a href="#guides">خطط الرحلات</a>
          <a href="#care">ما الذي نهتم به؟</a>
          <a href="#route">نموذج الرحلة</a>
        </nav>
        <a className="header-cta" href={whatsapp} target="_blank" rel="noreferrer">
          <MessageCircle size={19} /> واتساب
        </a>
      </header>

      <section className="hero" id="top">
        <Image
          src="/ar-assets/hero-hoian.webp"
          alt="الفوانيس الملونة في مدينة هوي آن القديمة في فيتنام"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow"><Sparkles size={17} /> فيتنام، بطريقتكم</p>
          <h1>رحلة خاصة مصممة<br />لكم ولعائلتكم</h1>
          <p className="hero-copy">
            من لحظة الوصول حتى آخر يوم: مسار مرن، سيارة خاصة، إقامة مناسبة للعائلة، تنسيق واضح للطعام الحلال، ومساعدة محلية حقيقية.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer">
              خطط رحلتك عبر واتساب <ArrowLeft size={20} />
            </a>
            <a className="button button-ghost" href="#route">شاهد رحلة مقترحة</a>
          </div>
          <div className="hero-notes">
            <span><Check size={17} /> رحلات خاصة</span>
            <span><Check size={17} /> للعائلات والأزواج</span>
            <span><Check size={17} /> دعم طوال الرحلة</span>
          </div>
        </div>
        <div className="hero-card">
          <p>قبل أن نقترح أي برنامج، نسألكم عن</p>
          <ul>
            <li><BedDouble /> مستوى الفندق ونوع الغرف</li>
            <li><Users /> أعمار الأطفال وكبار السن</li>
            <li><MoonStar /> احتياجات الصلاة والطعام</li>
            <li><Clock3 /> السرعة المفضلة للرحلة</li>
          </ul>
        </div>
      </section>

      <section className="trust-strip" aria-label="مزايا الخدمة">
        <span><ShieldCheck /> فريق محلي في فيتنام</span>
        <span><Compass /> برامج من 7 إلى 14 يوماً</span>
        <span><Languages /> مرشد إنجليزي، والعربية عند الطلب</span>
        <span><MessageCircle /> دعم واتساب 24/7 أثناء الرحلة</span>
      </section>

      <section className="section guide-hub" id="guides">
        <div className="section-heading split-heading guide-heading">
          <div><p className="eyebrow green">سبع صفحات، قرار أوضح</p><h2>ابدأوا من السؤال الأقرب لرحلتكم</h2></div>
          <p>خمس صفحات للتخطيط الخاص، وصفحتان للجولات اليومية المنفصلة. اختاروا الطريق الأقرب إلى قراركم ثم انتقلوا بين الصفحات ذات الصلة.</p>
        </div>
        <div className="guide-grid">
          {servicePages.map((page, index) => (
            <a className={`guide-card guide-card-${index + 1}`} href={page.href} key={page.href}>
              <span className="guide-number">{page.number}</span>
              <div><small>{page.kicker}</small><h3>{page.title}</h3><p>{page.text}</p></div>
              <ChevronLeft className="guide-arrow" />
            </a>
          ))}
        </div>
      </section>

      <section className="section intro" id="care">
        <div className="section-heading">
          <p className="eyebrow green">راحة حقيقية، لا مجرد قائمة مزارات</p>
          <h2>نفكر في التفاصيل التي تهم عائلتكم</h2>
          <p>البرنامج الجيد ليس الأكثر ازدحاماً. هو البرنامج الذي يمنحكم الخصوصية والوضوح ووقتاً كافياً للاستمتاع معاً.</p>
        </div>
        <div className="assurance-grid">
          {assurances.map(({ icon: Icon, title, text }) => (
            <article className="assurance-card" key={title}>
              <span className="icon-box"><Icon /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="clarity-note">
          <ShieldCheck />
          <div>
            <h3>الوضوح قبل الدفع</h3>
            <p>نذكر بوضوح ما إذا كان المطعم حاصلاً على اعتماد حلال، أو يقدم خيارات مناسبة فقط. كما نؤكد الفنادق والسيارات والوجبات المتاحة قبل تثبيت السعر النهائي.</p>
          </div>
        </div>
      </section>

      <section className="section route-section" id="route">
        <div className="route-copy">
          <p className="eyebrow green">مثال قابل للتعديل</p>
          <h2>11 يوماً بين الطبيعة، التراث والبحر</h2>
          <p>هذا ليس برنامجاً ثابتاً. يمكننا إبطاؤه لكبار السن، إضافة سابا، تمديد الإقامة في فو كوك، أو التركيز على وسط فيتنام.</p>
          <a className="text-link" href={whatsapp} target="_blank" rel="noreferrer">اطلب مساراً يناسب تواريخكم <ChevronLeft /></a>
        </div>
        <div className="timeline">
          {itinerary.map(([days, place, text]) => (
            <article key={days}>
              <span className="day">اليوم {days}</span>
              <div><h3>{place}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section destinations" id="destinations">
        <div className="section-heading split-heading">
          <div><p className="eyebrow green">من الشمال إلى الجنوب</p><h2>اختروا شكل فيتنام الذي تحبونه</h2></div>
          <p>نربط المدن والطبيعة والشواطئ في رحلة واحدة منطقية، مع تقليل التنقل المرهق قدر الإمكان.</p>
        </div>
        <div className="destination-grid">
          {destinations.map((item) => (
            <article className="destination-card" key={item.title}>
              <div className="destination-image">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 800px) 100vw, 33vw" style={{objectPosition: item.position}} />
              </div>
              <div className="destination-content"><span>{item.kicker}</span><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section process">
        <div className="section-heading">
          <p className="eyebrow green">ثلاث خطوات بسيطة</p>
          <h2>ابدأوا بالفكرة، ونحن نرتب التفاصيل</h2>
        </div>
        <div className="process-grid">
          <article><b>01</b><h3>أرسلوا تواريخكم</h3><p>عدد المسافرين، أعمار الأطفال، المدن التي ترغبون فيها والميزانية التقريبية.</p></article>
          <article><b>02</b><h3>نصمم البرنامج</h3><p>نرسل مساراً واضحاً مع الفنادق والتنقلات والوجبات وما يشمله السعر.</p></article>
          <article><b>03</b><h3>نسافر معكم خطوة بخطوة</h3><p>نؤكد الحجوزات، نستقبلكم في المطار ونبقى متاحين أثناء الرحلة.</p></article>
        </div>
      </section>

      <section className="final-cta">
        <div>
          <p className="eyebrow"><HeartHandshake size={18} /> دعم محلي، من إنسان إلى إنسان</p>
          <h2>لا نبيعكم برنامجاً جاهزاً.<br />نصنع رحلة تناسب عائلتكم.</h2>
          <p>أرسلوا لنا موعد السفر وعدد الضيوف. سنبدأ بمحادثة قصيرة ونقترح عليكم المسار الأنسب.</p>
        </div>
        <a className="button button-light" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle /> ابدأ المحادثة على واتساب</a>
      </section>

      <footer>
        <div className="brand footer-brand"><Image src="/ar-assets/logo.webp" alt="GoVietStay" width={56} height={56} /><span><b>GoVietStay</b><small>Trusted Local Support</small></span></div>
        <p><MapPin size={17} /> دا نانغ · هوي آن · هوي · فو كوك · جميع أنحاء فيتنام</p>
        <p>© 2026 GoVietStay. رحلات خاصة ودعم محلي في فيتنام.</p>
      </footer>

      <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="تواصل مع GoVietStay عبر واتساب"><MessageCircle /></a>
    </main>
  );
}
