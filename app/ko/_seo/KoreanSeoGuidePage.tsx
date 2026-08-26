import type { KoreanSeoGuide } from "../../../lib/koreanSeoGuides";
import styles from "./KoreanSeoGuidePage.module.css";

const WA =
  "https://wa.me/84937762607?text=" +
  encodeURIComponent("안녕하세요. GoVietStay 다낭 여행 상담을 받고 싶어요. 여행 날짜 / 인원 / 호텔을 알려드릴게요.");
const KAKAO = "https://invite.kakao.com/tc/dr58xzejiG";

export default function KoreanSeoGuidePage({
  guide,
  related,
}: {
  guide: KoreanSeoGuide;
  related: KoreanSeoGuide[];
}) {
  const canonical = `https://www.govietstay.com/ko/${guide.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.description,
    datePublished: "2026-08-26",
    dateModified: guide.updated,
    inLanguage: "ko-KR",
    mainEntityOfPage: canonical,
    author: {
      "@type": "Organization",
      name: "GoVietStay",
      url: "https://www.govietstay.com/ko",
    },
    publisher: {
      "@type": "Organization",
      name: "GoVietStay",
      logo: {
        "@type": "ImageObject",
        url: "https://www.govietstay.com/logo.png",
      },
    },
    about: guide.keywords,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "GoVietStay", item: "https://www.govietstay.com/" },
      { "@type": "ListItem", position: 2, name: "다낭 한국어 여행", item: "https://www.govietstay.com/ko" },
      { "@type": "ListItem", position: 3, name: guide.h1, item: canonical },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <main className={styles.page} lang="ko">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className={styles.nav}>
        <a href="/ko" className={styles.brand}>
          <img src="/logo.png" alt="GoVietStay" />
          <span><b>GoVietStay</b><small>KOREAN LOCAL GUIDE</small></span>
        </a>
        <nav>
          <a href="/ko">한국어 홈</a>
          <a href="/ko/cham-island-tour">참섬 투어</a>
          <a href="https://blog.naver.com/govietstay" target="_blank" rel="noopener noreferrer">Naver Blog</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>{guide.eyebrow}</p>
            <h1>{guide.h1}</h1>
            <p className={styles.lead}>{guide.description}</p>
            <div className={styles.meta}>
              <span>업데이트 {guide.updated}</span>
              <span>GoVietStay 다낭 현지팀</span>
              <span>한국어 메시지 가능</span>
            </div>
          </div>
          <aside className={styles.answerCard}>
            <small>30초 핵심 답변</small>
            <p>{guide.summary}</p>
          </aside>
        </div>
      </section>

      <section className={styles.quickWrap}>
        {guide.quick.map((item, i) => (
          <div key={item}><span>{String(i + 1).padStart(2, "0")}</span><b>{item}</b></div>
        ))}
      </section>

      <div className={styles.layout}>
        <article className={styles.article}>
          <div className={styles.intro}>
            <p>
              이 가이드는 다낭 여행을 실제로 준비할 때 필요한 판단 기준을 먼저 정리합니다.
              가격·운영시간·프로모션처럼 변할 수 있는 정보는 예약 날짜에 다시 확인하는 것을 권장합니다.
            </p>
          </div>

          {guide.sections.map((section) => (
            <section key={section.title} className={styles.section}>
              <h2>{section.title}</h2>
              {section.body.map((p) => <p key={p}>{p}</p>)}
            </section>
          ))}

          <section className={`${styles.section} ${styles.checkSection}`}>
            <p className={styles.kicker}>SAVE THIS CHECKLIST</p>
            <h2>출발 전에 확인할 체크리스트</h2>
            <div className={styles.checkGrid}>
              {guide.checklist.map((item) => <div key={item}>✓ {item}</div>)}
            </div>
          </section>

          <section className={styles.section}>
            <p className={styles.kicker}>FAQ</p>
            <h2>한국 여행객이 많이 묻는 질문</h2>
            <div className={styles.faqList}>
              {guide.faqs.map((faq) => (
                <details key={faq.q}>
                  <summary>{faq.q}<span>＋</span></summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        </article>

        <aside className={styles.side}>
          <div className={styles.sticky}>
            <p className={styles.kicker}>LOCAL SUPPORT</p>
            <h3>날짜 · 인원 · 호텔<br />세 가지만 보내주세요.</h3>
            <p>현재 운영 여부, 픽업, 포함사항을 한국어 메시지로 문의할 수 있습니다.</p>
            <a className={styles.kakao} href={KAKAO} target="_blank" rel="noopener noreferrer">KakaoTalk 문의</a>
            <a className={styles.whatsapp} href={WA} target="_blank" rel="noopener noreferrer">WhatsApp 문의</a>
            <a className={styles.internal} href={guide.primaryHref}>{guide.primaryLabel} →</a>
          </div>
        </aside>
      </div>

      <section className={styles.related}>
        <div className={styles.relatedHead}>
          <p className={styles.kicker}>NEXT GUIDE</p>
          <h2>같이 읽으면 일정이 더 쉬워집니다</h2>
        </div>
        <div className={styles.relatedGrid}>
          {related.map((item) => (
            <a key={item.slug} href={`/ko/${item.slug}`}>
              <small>2026 DA NANG GUIDE</small>
              <strong>{item.h1}</strong>
              <span>가이드 보기 →</span>
            </a>
          ))}
          <a href="/ko/cham-island-tour" className={styles.featuredRelated}>
            <small>BOOKABLE TOUR</small>
            <strong>다낭 참섬 스노클링 + 한국인 혜택</strong>
            <span>투어 페이지 보기 →</span>
          </a>
        </div>
      </section>

      <section className={styles.finalCta}>
        <p>GOVIETSTAY · TRUSTED LOCAL SUPPORT</p>
        <h2>검색은 여기까지.<br />이제 내 일정에 맞는 답만 확인하세요.</h2>
        <div>
          <a href={KAKAO} target="_blank" rel="noopener noreferrer">KakaoTalk</a>
          <a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </section>

      <footer className={styles.footer}>
        <a href="/ko">GoVietStay 한국어 홈</a>
        <span>Da Nang · Hoi An · Hue · Phu Quoc</span>
        <span>Updated {guide.updated}</span>
      </footer>
    </main>
  );
}
