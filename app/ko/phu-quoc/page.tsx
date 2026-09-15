import type { Metadata } from "next";
import { koreanPhuQuocGuides } from "../../../lib/koreanPhuQuocGuides";
import styles from "../_seo/KoreanSeoGuidePage.module.css";

const canonical = "https://www.govietstay.com/ko/phu-quoc";
const image = "https://www.govietstay.com/phu-quoc/ru-cluster/hero-islands.png";
const KAKAO = "https://invite.kakao.com/tc/dr58xzejiG";
const WA =
  "https://wa.me/84937762607?text=" +
  encodeURIComponent(
    "안녕하세요. GoVietStay 푸꾸옥 여행 상담을 받고 싶어요. 여행 날짜 / 인원 / 호텔을 알려드릴게요.",
  );

export const metadata: Metadata = {
  title: "푸꾸옥 여행 2027 | 자유여행·날씨·숙소·가족여행 가이드",
  description:
    "2027 푸꾸옥 여행을 준비하는 한국인을 위한 GoVietStay 현지 가이드. 자유여행 동선, 날씨, 숙소 위치, 가족여행, 3박4일 일정, 3섬·4섬 투어 비교를 한곳에서 확인하세요.",
  keywords: [
    "푸꾸옥 여행",
    "푸꾸옥 자유여행",
    "푸꾸옥 날씨",
    "푸꾸옥 숙소",
    "푸꾸옥 가족여행",
    "푸꾸옥 3박4일",
    "푸꾸옥 투어",
    "푸꾸옥 3섬 투어",
    "푸꾸옥 4섬 투어",
  ],
  alternates: {
    canonical,
    languages: {
      "ko-KR": canonical,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: canonical,
    siteName: "GoVietStay",
    title: "푸꾸옥 여행 2027 | GoVietStay 한국어 가이드",
    description:
      "날씨·숙소·동선부터 가족여행과 섬 투어까지. 푸꾸옥을 처음 준비하는 한국 여행객을 위한 정보 허브.",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "푸꾸옥 여행 2027 GoVietStay 한국어 가이드",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "푸꾸옥 여행 2027 | GoVietStay",
    description: "푸꾸옥 자유여행·날씨·숙소·가족여행·섬 투어 한국어 가이드.",
    images: [image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const faq = [
  {
    q: "푸꾸옥 첫 여행은 며칠이 적당한가요?",
    a: "3박4일이면 북부와 남부 핵심 일정을 볼 수 있고, 리조트 휴식까지 여유 있게 즐기려면 4박5일 이상이 편합니다.",
  },
  {
    q: "푸꾸옥은 어느 지역에 숙소를 잡는 게 좋나요?",
    a: "처음 방문해 여러 지역을 볼 계획이면 롱비치권이 무난합니다. 빈원더스·사파리 중심이면 북부, 혼똔·남부 바다 일정이 핵심이면 남부 숙소가 이동을 줄일 수 있습니다.",
  },
  {
    q: "푸꾸옥 여행은 몇 월이 좋은가요?",
    a: "바다와 야외활동을 중요하게 보는 여행자는 일반적으로 11월~4월 전후를 많이 선택합니다. 실제 해상상태와 단기 예보는 출발이 가까워졌을 때 다시 확인하세요.",
  },
  {
    q: "한국어로 투어와 일정 문의가 가능한가요?",
    a: "네. 여행 날짜, 인원, 호텔과 원하는 체험을 보내면 현재 운영 정보와 포함사항을 한국어 메시지로 확인할 수 있습니다.",
  },
];

export default function PhuQuocKoreanHub() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "푸꾸옥 여행 2027 한국어 가이드",
    description:
      "GoVietStay의 푸꾸옥 자유여행·날씨·숙소·가족여행·일정·섬 투어 한국어 가이드 모음.",
    url: canonical,
    inLanguage: "ko-KR",
    isPartOf: {
      "@type": "WebSite",
      name: "GoVietStay",
      url: "https://www.govietstay.com/ko",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: koreanPhuQuocGuides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.h1,
        url: `${canonical}/${guide.slug}`,
      })),
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
        item: canonical,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className={styles.page} lang="ko">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
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
          <a href="/ko">한국어 홈</a>
          <a href="/ko/phu-quoc/free-travel">푸꾸옥 자유여행</a>
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
            <p className={styles.eyebrow}>PHU QUOC · KOREAN TRAVEL HUB · 2027</p>
            <h1>푸꾸옥 여행 2027, 예약보다 먼저 동선부터 정리하세요</h1>
            <p className={styles.lead}>
              날씨·숙소 위치·북부와 남부 동선·가족여행·3박4일 일정·섬 투어까지.
              처음 가는 푸꾸옥을 한국 여행객이 실제로 준비하는 순서대로 정리했습니다.
            </p>
            <div className={styles.meta}>
              <span>업데이트 2026-09-15</span>
              <span>GoVietStay 베트남 현지팀</span>
              <span>한국어 메시지 가능</span>
            </div>
          </div>
          <aside className={styles.answerCard}>
            <small>START HERE</small>
            <p>
              처음이라면 ① 여행 날짜와 날씨 ② 숙소 지역 ③ 북부·남부 우선순위 ④ 바다 일정 순서로 정하세요.
              상품을 먼저 사는 것보다 이 네 가지를 정하면 일정이 훨씬 단순해집니다.
            </p>
          </aside>
        </div>
      </section>

      <section className={styles.quickWrap}>
        <div><span>01</span><b>날씨와 여행 시기</b></div>
        <div><span>02</span><b>숙소 지역 선택</b></div>
        <div><span>03</span><b>북부·남부 동선</b></div>
        <div><span>04</span><b>섬 투어 비교</b></div>
      </section>

      <div className={styles.layout}>
        <article className={styles.article}>
          <div className={styles.intro}>
            <p>
              이 허브는 투어를 바로 판매하기보다 푸꾸옥 여행을 스스로 판단할 수 있는 정보를 먼저 제공합니다.
              가격·운영시간·날씨·포함사항은 변할 수 있으므로 이용 날짜에 다시 확인하세요.
            </p>
          </div>

          <section className={styles.section}>
            <p className={styles.kicker}>STEP 1</p>
            <h2>푸꾸옥은 북부·중부·남부로 나누면 이해가 쉽습니다</h2>
            <p>
              북부는 빈원더스·사파리·그랜드월드, 중부는 즈엉동·야시장·롱비치,
              남부는 혼똔·선셋타운·안터이와 섬 투어가 중심입니다. 섬이 길기 때문에 서로 먼 지역을 같은 날 반복해서 오가면 실제 여행시간보다 차량 이동이 커질 수 있습니다.
            </p>
            <p>
              그래서 숙소 위치와 꼭 하고 싶은 큰 일정 두 가지를 먼저 정한 뒤 나머지를 채우는 방식이 가장 실용적입니다.
            </p>
          </section>

          <section className={styles.section}>
            <p className={styles.kicker}>STEP 2</p>
            <h2>내 여행에 필요한 가이드부터 고르세요</h2>
            <p>
              아래 가이드는 검색량만 따라 만든 페이지가 아니라 실제 여행 준비 순서에 맞춰 서로 연결했습니다.
              처음 방문한다면 자유여행 → 숙소 → 3박4일 일정 순서가 좋고, 바다 일정이 중요하면 날씨와 3섬·4섬 비교를 먼저 읽어보세요.
            </p>
          </section>

          <section className={styles.section}>
            <div className={styles.relatedGrid}>
              {koreanPhuQuocGuides.map((guide) => (
                <a key={guide.slug} href={`/ko/phu-quoc/${guide.slug}`}>
                  <small>{guide.eyebrow}</small>
                  <strong>{guide.h1}</strong>
                  <span>가이드 보기 →</span>
                </a>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <p className={styles.kicker}>FAQ</p>
            <h2>푸꾸옥 여행 시작 전에 많이 묻는 질문</h2>
            <div className={styles.faqList}>
              {faq.map((item) => (
                <details key={item.q}>
                  <summary>
                    {item.q}
                    <span>＋</span>
                  </summary>
                  <p>{item.a}</p>
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
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp 문의
            </a>
          </div>
        </aside>
      </div>

      <section className={styles.finalCta}>
        <p>GOVIETSTAY · TRUSTED LOCAL SUPPORT</p>
        <h2>
          푸꾸옥을 많이 보는 것보다
          <br />내 여행에 맞게 보는 것이 중요합니다.
        </h2>
        <div>
          <a href={KAKAO} target="_blank" rel="noopener noreferrer">
            KakaoTalk
          </a>
          <a href={WA} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <a href="/ko">GoVietStay 한국어 홈</a>
        <span>Phu Quoc · Vietnam</span>
        <span>Updated 2026-09-15</span>
      </footer>
    </main>
  );
}
