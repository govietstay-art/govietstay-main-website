import type { KoreanPhuQuocGuide } from "../../../../lib/koreanPhuQuocGuides";
import styles from "../../_seo/KoreanSeoGuidePage.module.css";

const KAKAO = "https://invite.kakao.com/tc/dr58xzejiG";

export default function PhuQuocGuidePage({
  guide,
  related,
}: {
  guide: KoreanPhuQuocGuide;
  related: KoreanPhuQuocGuide[];
}) {
  const canonical = `https://www.govietstay.com/ko/phu-quoc/${guide.slug}`;
  const whatsapp =
    "https://wa.me/84937762607?text=" +
    encodeURIComponent(
      `안녕하세요. GoVietStay 푸꾸옥 여행 상담을 받고 싶어요. ${guide.h1} 페이지를 보고 문의드립니다. 여행 날짜 / 인원 / 호텔을 알려드릴게요.`,
    );

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.description,
    image: [`https://www.govietstay.com${guide.image}`],
    datePublished: "2026-09-15",
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
      {
        "@type": "ListItem",
        position: 1,
        name: "GoVietStay",
        item: "https://www.govietstay.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "한국어 여행",
        item: "https://www.govietstay.com/ko",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "푸꾸옥 여행",
        item: "https://www.govietstay.com/ko/phu-quoc",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: guide.h1,
        item: canonical,
      },
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

  const featuredHref =
    guide.slug === "3-islands-vs-4-islands"
      ? "/ko/phu-quoc/free-travel"
      : "/ko/phu-quoc/3-islands-vs-4-islands";
  const featuredTitle =
    guide.slug === "3-islands-vs-4-islands"
      ? "푸꾸옥 자유여행 전체 동선부터 정리하기"
      : "푸꾸옥 3섬 vs 4섬, 내 일정에는 무엇이 맞을까?";

  return (
    <main className={styles.page} lang="ko">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className={styles.nav}>
        <a href="/ko" className={styles.brand}>
          <img src="/logo.png" alt="GoVietStay" />
          <span>
            <b>GoVietStay</b>
            <small>KOREAN LOCAL GUIDE</small>
          </span>
        </a>
        <nav>
          <a href="/ko/phu-quoc">푸꾸옥 허브</a>
          <a href="/ko/phu-quoc/free-travel">자유여행</a>
          <a
            href="https://blog.naver.com/govietstay"
            target="_blank"
            rel="noopener noreferrer"
          >
            Naver Blog
          </a>
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
              <span>GoVietStay 베트남 현지팀</span>
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
          <div key={item}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <b>{item}</b>
          </div>
        ))}
      </section>

      <div className={styles.layout}>
        <article className={styles.article}>
          <div className={styles.intro}>
            <p>
              이 가이드는 푸꾸옥 여행을 실제로 준비할 때 필요한 판단 기준을 먼저 정리합니다.
              날씨·운영시간·포함사항·가격처럼 변할 수 있는 정보는 이용 날짜에 다시 확인하는 것을 권장합니다.
            </p>
          </div>

          {guide.sections.map((section) => (
            <section key={section.title} className={styles.section}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section className={`${styles.section} ${styles.checkSection}`}>
            <p className={styles.kicker}>SAVE THIS CHECKLIST</p>
            <h2>출발 전에 확인할 체크리스트</h2>
            <div className={styles.checkGrid}>
              {guide.checklist.map((item) => (
                <div key={item}>✓ {item}</div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <p className={styles.kicker}>FAQ</p>
            <h2>푸꾸옥 여행 전에 많이 묻는 질문</h2>
            <div className={styles.faqList}>
              {guide.faqs.map((faq) => (
                <details key={faq.q}>
                  <summary>
                    {faq.q}
                    <span>＋</span>
                  </summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        </article>

        <aside className={styles.side}>
          <div className={styles.sticky}>
            <p className={styles.kicker}>PHU QUOC LOCAL SUPPORT</p>
            <h3>
              날짜 · 인원 · 호텔
              <br />세 가지만 보내주세요.
            </h3>
            <p>
              현재 운영 여부, 픽업, 포함사항과 이동 동선을 한국어 메시지로 문의할 수 있습니다.
            </p>
            <a
              className={styles.kakao}
              href={KAKAO}
              target="_blank"
              rel="noopener noreferrer"
            >
              KakaoTalk 문의
            </a>
            <a
              className={styles.whatsapp}
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp 문의
            </a>
            <a className={styles.internal} href={guide.primaryHref}>
              {guide.primaryLabel} →
            </a>
          </div>
        </aside>
      </div>

      <section className={styles.related}>
        <div className={styles.relatedHead}>
          <p className={styles.kicker}>NEXT PHU QUOC GUIDE</p>
          <h2>같이 읽으면 일정이 더 쉬워집니다</h2>
        </div>
        <div className={styles.relatedGrid}>
          {related.slice(0, 3).map((item) => (
            <a key={item.slug} href={`/ko/phu-quoc/${item.slug}`}>
              <small>2027 PHU QUOC GUIDE</small>
              <strong>{item.h1}</strong>
              <span>가이드 보기 →</span>
            </a>
          ))}
          <a href={featuredHref} className={styles.featuredRelated}>
            <small>START HERE</small>
            <strong>{featuredTitle}</strong>
            <span>가이드 보기 →</span>
          </a>
        </div>
      </section>

      <section className={styles.finalCta}>
        <p>GOVIETSTAY · TRUSTED LOCAL SUPPORT</p>
        <h2>
          검색은 여기까지.
          <br />이제 내 푸꾸옥 일정에 맞는 답만 확인하세요.
        </h2>
        <div>
          <a href={KAKAO} target="_blank" rel="noopener noreferrer">
            KakaoTalk
          </a>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <a href="/ko/phu-quoc">GoVietStay 푸꾸옥 한국어 허브</a>
        <span>Phu Quoc · Vietnam</span>
        <span>Updated {guide.updated}</span>
      </footer>
    </main>
  );
}
