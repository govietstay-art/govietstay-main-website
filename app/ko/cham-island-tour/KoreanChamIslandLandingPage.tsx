import styles from "./KoreanChamIslandLandingPage.module.css";

const WHATSAPP_NUMBER = "84937762607";
const WHATSAPP_TEXT = encodeURIComponent(
  "안녕하세요. GoVietStay 다낭 참섬 투어와 무료 30분 마사지 혜택을 문의하고 싶어요."
);

// KakaoTalk 링크를 받으면 아래 빈 문자열만 실제 링크로 교체하면 됩니다.
// 예: https://open.kakao.com/o/xxxxxxx 또는 https://pf.kakao.com/_xxxx/chat
const KAKAO_URL = "";
const kakaoReady = KAKAO_URL.startsWith("http");

const faqItems = [
  {
    question: "참섬 투어는 다낭에서 출발하나요?",
    answer:
      "네. 다낭 호텔 위치와 예약 조건에 따라 픽업 가능 여부와 시간을 확인해 드립니다. 예약 전에 호텔 이름을 보내 주세요.",
  },
  {
    question: "마사지 바우처는 어떻게 받을 수 있나요?",
    answer:
      "이 한국어 프로모션 페이지를 통해 참섬 투어 예약이 확정된 고객에게 1인 1장의 30분 마사지 바우처를 제공합니다. 발 마사지 또는 바디 마사지 중 선택할 수 있으며, 다낭 선짜 야시장에서 이용합니다.",
  },
  {
    question: "한국어로 문의해도 되나요?",
    answer:
      "네. 한국어 메시지를 보내셔도 됩니다. GoVietStay 현지 팀이 번역 도구를 활용해 일정, 픽업, 날씨와 예약 정보를 최대한 명확하게 안내합니다.",
  },
  {
    question: "날씨가 좋지 않으면 어떻게 되나요?",
    answer:
      "참섬은 해상 상황에 영향을 받습니다. 출항 가능 여부는 당일 기상과 관계 당국의 운영 승인에 따라 최종 확인되며, 변경이 필요하면 가능한 대안을 안내해 드립니다.",
  },
];

const touristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "다낭 출발 참섬 스노클링 투어",
  description:
    "다낭에서 출발하는 참섬 스피드보트 여행. 스노클링, 섬 체험과 점심을 즐기고 한국어 프로모션 예약 고객은 30분 마사지 바우처 혜택을 받을 수 있습니다.",
  touristType: ["한국인 여행객", "스노클링 여행객", "다낭 자유여행객"],
  provider: {
    "@type": "TravelAgency",
    name: "GoVietStay",
    url: "https://www.govietstay.com/",
    telephone: "+84 937 762 607",
    areaServed: ["Da Nang", "Hoi An", "Hue", "Phu Quoc"],
  },
  itinerary: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "다낭 픽업 및 항구 이동" },
      { "@type": "ListItem", position: 2, name: "스피드보트로 참섬 이동" },
      { "@type": "ListItem", position: 3, name: "스노클링 및 바다 체험" },
      { "@type": "ListItem", position: 4, name: "섬에서 점심 및 휴식" },
      { "@type": "ListItem", position: 5, name: "다낭 복귀" },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function KoreanChamIslandLandingPage() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;

  return (
    <main className={styles.page} lang="ko">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.brandRow}>
              <span className={styles.brandDot}>G</span>
              <span>GoVietStay · Trusted Local Support</span>
            </div>

            <p className={styles.eyebrow}>🇰🇷 한국인 여행객을 위한 다낭 특별 혜택</p>
            <h1>
              참섬에서 <span>스노클링</span>하고
              <br />
              다낭에서 <span>마사지 30분 무료</span>
            </h1>
            <p className={styles.heroLead}>
              다낭 참섬 스노클링·호핑투어를 예약하고 꾸라오참의 아름다운 바다와 산호를 즐겨보세요.
              예약 확정 고객에게 30분 마사지 바우처를 제공합니다.
            </p>

            <div className={styles.heroBadges}>
              <span>🚤 스피드보트</span>
              <span>🤿 스노클링</span>
              <span>🍽️ 점심</span>
              <span>💆 30분 마사지</span>
            </div>

            <div className={styles.ctaRow}>
              <a className={styles.primaryButton} href={whatsappHref} target="_blank" rel="noreferrer">
                WhatsApp으로 예약 문의
              </a>
              {kakaoReady ? (
                <a className={styles.kakaoButton} href={KAKAO_URL} target="_blank" rel="noreferrer">
                  KakaoTalk 상담
                </a>
              ) : (
                <span className={`${styles.kakaoButton} ${styles.disabledButton}`} title="KakaoTalk 링크 준비 중">
                  KakaoTalk 링크 준비 중
                </span>
              )}
            </div>
            <p className={styles.microCopy}>한국어 메시지 가능 · 현지 운영팀이 번역 지원 · 예약 전 최종 일정 확인</p>
          </div>

          <div className={styles.heroVisual}>
            <img
              src="/ko/cham-island-tour/cham-island-hero.svg"
              alt="다낭 참섬 스노클링과 무료 마사지 혜택"
              width="1200"
              height="630"
            />
          </div>
        </div>
      </section>

      <section className={styles.promoStrip} aria-label="마사지 프로모션">
        <div className={styles.sectionInner}>
          <div className={styles.promoGrid}>
            <div>
              <p className={styles.sectionKicker}>SPECIAL BENEFIT</p>
              <h2>참섬 투어 예약 → 마사지 바우처 1인 1장</h2>
              <p>
                여행 후 피로까지 편하게 마무리하세요. 발 마사지 30분 또는 바디 마사지 30분 중 원하는 옵션을 선택할 수 있습니다.
              </p>
            </div>
            <img
              className={styles.voucherImage}
              src="/ko/cham-island-tour/massage-voucher.svg"
              alt="GoVietStay 30분 무료 마사지 바우처"
              width="760"
              height="480"
            />
          </div>
          <div className={styles.promoNotes}>
            <span>✓ 예약이 확정된 고객 대상</span>
            <span>✓ 고객 1인당 바우처 1장</span>
            <span>✓ 발 또는 바디 마사지 30분</span>
            <span>✓ 다낭 선짜 야시장 이용</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionKicker}>WHY THIS TOUR</p>
          <h2 className={styles.sectionTitle}>다낭에서 하루, 바다를 제대로 즐기는 방법</h2>
          <div className={styles.cards}>
            <article className={styles.card}>
              <div className={styles.cardIcon}>🤿</div>
              <h3>산호 스노클링</h3>
              <p>맑은 바다에서 마스크와 스노클을 착용하고 참섬의 수중 풍경을 가까이에서 즐겨보세요.</p>
            </article>
            <article className={styles.card}>
              <div className={styles.cardIcon}>🚤</div>
              <h3>스피드보트 이동</h3>
              <p>다낭에서 항구로 이동한 뒤 스피드보트로 섬까지 빠르게 이동해 여행 시간을 효율적으로 사용합니다.</p>
            </article>
            <article className={styles.card}>
              <div className={styles.cardIcon}>💬</div>
              <h3>언어 걱정 줄이기</h3>
              <p>한국어로 메시지를 보내면 번역 도구를 활용해 픽업, 준비물, 날씨, 예약 정보를 명확하게 안내합니다.</p>
            </article>
            <article className={styles.card}>
              <div className={styles.cardIcon}>💆</div>
              <h3>여행 후 무료 마사지</h3>
              <p>섬 여행을 마친 뒤 다낭 선짜 야시장에서 30분 마사지 바우처로 하루를 편안하게 마무리하세요.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.softSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.split}>
            <div>
              <p className={styles.sectionKicker}>SIMPLE PLAN</p>
              <h2 className={styles.sectionTitle}>참섬 투어 기본 흐름</h2>
              <ol className={styles.timeline}>
                <li><strong>01</strong><div><h3>다낭 픽업</h3><p>호텔 이름과 인원 정보를 보내면 픽업 가능 여부와 시간을 확인합니다.</p></div></li>
                <li><strong>02</strong><div><h3>항구 & 스피드보트</h3><p>항구에서 참섬으로 이동합니다. 해상 상황에 따라 운영 시간이 조정될 수 있습니다.</p></div></li>
                <li><strong>03</strong><div><h3>스노클링 & 섬 체험</h3><p>바다에서 스노클링을 즐기고 섬의 자연을 경험합니다.</p></div></li>
                <li><strong>04</strong><div><h3>점심 & 휴식</h3><p>섬에서 식사와 휴식 시간을 가진 뒤 다낭으로 돌아옵니다.</p></div></li>
                <li><strong>05</strong><div><h3>마사지 바우처 사용</h3><p>선짜 야시장에서 30분 발 또는 바디 마사지로 여행의 피로를 풀어보세요.</p></div></li>
              </ol>
            </div>

            <aside className={styles.bookingCard}>
              <span className={styles.bookingTag}>한국어 프로모션</span>
              <h3>Cham Island Tour</h3>
              <p className={styles.priceLabel}>성인 기준</p>
              <div className={styles.price}>950,000 VND<span>부터</span></div>
              <p className={styles.priceNote}>정확한 요금은 날짜, 인원, 픽업 위치에 따라 예약 전 확인합니다.</p>
              <ul>
                <li>스피드보트 이동</li>
                <li>스노클링 체험</li>
                <li>섬에서 점심</li>
                <li>현지 운영 지원</li>
                <li><strong>30분 마사지 바우처</strong></li>
              </ul>
              <a className={styles.primaryButton} href={whatsappHref} target="_blank" rel="noreferrer">
                날짜와 인원 보내기
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionKicker}>BEFORE YOU GO</p>
          <h2 className={styles.sectionTitle}>예약 전에 꼭 확인하세요</h2>
          <div className={styles.infoGrid}>
            <div><strong>🌊 바다 상태</strong><p>참섬 투어는 기상과 해상 상태에 따라 운항 여부가 달라질 수 있습니다.</p></div>
            <div><strong>🏨 호텔 정보</strong><p>다낭 호텔 이름을 보내주시면 픽업 가능 여부와 예상 시간을 확인합니다.</p></div>
            <div><strong>👶 어린이</strong><p>어린이가 있다면 나이와 키를 함께 보내주세요. 정확한 요금 확인에 필요합니다.</p></div>
            <div><strong>🗣️ 한국어 메시지</strong><p>한국어 문의가 가능합니다. 다만 한국인 전용 가이드가 포함된다는 의미는 아니며, 예약 및 일정 안내를 번역 지원합니다.</p></div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.faqSection}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionKicker}>FAQ</p>
          <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>
          <div className={styles.faqList}>
            {faqItems.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.sectionInner}>
          <div className={styles.finalCtaBox}>
            <div>
              <p className={styles.sectionKicker}>GOVIETSTAY · DA NANG</p>
              <h2>참섬 + 스노클링 + 마사지, 한 번에 편하게 준비하세요.</h2>
              <p>여행 날짜, 인원, 다낭 호텔 이름만 보내주시면 확인을 시작할 수 있습니다.</p>
            </div>
            <div className={styles.finalButtons}>
              <a className={styles.primaryButton} href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp 문의</a>
              {kakaoReady ? (
                <a className={styles.kakaoButton} href={KAKAO_URL} target="_blank" rel="noreferrer">KakaoTalk 문의</a>
              ) : (
                <span className={`${styles.kakaoButton} ${styles.disabledButton}`}>KakaoTalk 링크 준비 중</span>
              )}
            </div>
          </div>
          <p className={styles.footerLine}>GoVietStay · Trusted Local Support · Da Nang • Hoi An • Hue • Phu Quoc</p>
        </div>
      </section>

      <div className={styles.mobileBar}>
        <a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp 예약</a>
        {kakaoReady ? (
          <a className={styles.mobileKakao} href={KAKAO_URL} target="_blank" rel="noreferrer">KakaoTalk</a>
        ) : (
          <span className={`${styles.mobileKakao} ${styles.mobileDisabled}`}>Kakao 준비 중</span>
        )}
      </div>
    </main>
  );
}
