import styles from "./KoreanChamIslandLandingPage.module.css";

const WHATSAPP_NUMBER = "84937762607";
const WHATSAPP_TEXT = encodeURIComponent(
  "안녕하세요. GoVietStay 다낭 참섬 투어와 한국인 전용 무료 30분 마사지 혜택을 문의하고 싶어요."
);

// KakaoTalk 링크를 받으면 아래 빈 문자열만 실제 링크로 교체하면 됩니다.
// 예: https://open.kakao.com/o/xxxxxxx 또는 https://pf.kakao.com/_xxxx/chat
const KAKAO_URL = "https://invite.kakao.com/tc/dr58xzejiG";
const kakaoReady = KAKAO_URL.startsWith("http");

const realGuestPhotos = [
  "/happy-travelers/02462467f09771c928865.jpg",
  "/happy-travelers/02e412c4c634476a1e258.jpg",
  "/happy-travelers/069ebea8-ccc5-4d79-9db3-9f9f8d52e490.jpg",
  "/happy-travelers/18245dc712389366ca296.jpg",
  "/happy-travelers/2aOboQdyC7qu1jqWmUYWAj5mtfXgsCc0yJpIzbv6.jpg",
  "/happy-travelers/2aOboQdyDmGiI6D5nUtB6GtbAErALMJqnGPZgyeW.jpg",
];

const faqItems = [
  {
    question: "참섬 투어는 다낭에서 출발하나요?",
    answer:
      "네. 다낭 호텔 위치와 예약 조건에 따라 픽업 가능 여부와 시간을 확인해 드립니다. 예약 전에 호텔 이름을 보내 주세요.",
  },
  {
    question: "무료 마사지 혜택에 쿠폰 코드가 필요한가요?",
    answer:
      "아니요. 이 한국어 프로모션 페이지를 통해 참섬 투어 예약이 확정되면 별도 쿠폰 코드 없이 고객 1인당 30분 마사지 바우처 1장을 제공합니다.",
  },
  {
    question: "마사지 바우처는 어떻게 사용할 수 있나요?",
    answer:
      "발 마사지 30분 또는 바디 마사지 30분 중 선택할 수 있으며, 다낭 선짜 야시장에서 이용합니다. 이용 방법은 예약 확정 후 안내해 드립니다.",
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
  name: "다낭 출발 참섬 스노클링 투어 + 무료 마사지 30분",
  description:
    "다낭에서 출발하는 참섬 스피드보트 여행. 스노클링, 섬 체험과 점심을 즐기고 한국어 프로모션 예약 확정 고객은 30분 마사지 바우처 혜택을 받을 수 있습니다.",
  touristType: ["한국인 여행객", "스노클링 여행객", "다낭 자유여행객"],
  provider: {
    "@type": "TravelAgency",
    name: "GoVietStay",
    url: "https://www.govietstay.com/",
    telephone: "+84 937 762 607",
    areaServed: ["Da Nang", "Hoi An", "Hue", "Phu Quoc"],
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "VND",
    price: "950000",
    url: "https://www.govietstay.com/ko/cham-island-tour",
    availability: "https://schema.org/InStock",
    description: "한국어 프로모션 예약 확정 고객에게 1인당 30분 마사지 바우처 1장 제공",
  },
  itinerary: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "다낭 픽업 및 항구 이동" },
      { "@type": "ListItem", position: 2, name: "스피드보트로 참섬 이동" },
      { "@type": "ListItem", position: 3, name: "스노클링 및 바다 체험" },
      { "@type": "ListItem", position: 4, name: "섬에서 점심 및 휴식" },
      { "@type": "ListItem", position: 5, name: "다낭 복귀 및 마사지 바우처 이용" },
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

      <div className={styles.topTicker} aria-label="한국인 전용 프로모션">
        <div className={styles.tickerTrack}>
          <span>🇰🇷 한국인 전용 혜택</span><b>•</b><span>참섬 스노클링</span><b>•</b><span>마사지 30분 0원</span><b>•</b><span>예약 확정 시 자동 적용</span><b>•</b>
          <span>🇰🇷 한국인 전용 혜택</span><b>•</b><span>참섬 스노클링</span><b>•</b><span>마사지 30분 0원</span><b>•</b><span>예약 확정 시 자동 적용</span><b>•</b>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroGlowOne} />
        <div className={styles.heroGlowTwo} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.brandRow}>
              <span className={styles.brandDot}>G</span>
              <span>GoVietStay · Trusted Local Support</span>
              <span className={styles.livePill}><i /> DA NANG LOCAL TEAM</span>
            </div>

            <p className={styles.eyebrow}>🇰🇷 한국인 여행객을 위한 다낭 특별 혜택</p>
            <h1>
              참섬에서 <span>스노클링</span>하고
              <br />
              다낭에서 <span>마사지 30분 무료</span>
            </h1>
            <p className={styles.heroLead}>
              아름다운 참섬 바다와 산호를 즐기고, 여행 후에는 마사지로 편하게 마무리하세요.
              이 페이지에서 예약이 확정되면 <strong>쿠폰 코드 없이 1인 1장</strong> 혜택을 드립니다.
            </p>

            <div className={styles.valueBar}>
              <div><small>CHAM ISLAND TOUR</small><strong>950,000 VND</strong></div>
              <span className={styles.valuePlus}>+</span>
              <div className={styles.freeValue}><small>KOREAN SPECIAL</small><strong>마사지 30분 <em>0원</em></strong></div>
            </div>

            <div className={styles.heroBadges}>
              <span>🚤 스피드보트</span>
              <span>🤿 스노클링</span>
              <span>🍽️ 점심</span>
              <span className={styles.hotBadge}>🎁 마사지 30분 FREE</span>
            </div>

            <div className={styles.ctaRow}>
              <a className={`${styles.primaryButton} ${styles.pulseButton}`} href={whatsappHref} target="_blank" rel="noreferrer">
                지금 혜택으로 예약 문의
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
            <p className={styles.microCopy}>✓ 쿠폰 코드 불필요 · ✓ 한국어 메시지 가능 · ✓ 예약 전 최종 일정 확인</p>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.photoFrame}>
              <img
                className={styles.heroRealPhoto}
                src={realGuestPhotos[4]}
                alt="GoVietStay와 함께 여행한 실제 여행객"
                width="900"
                height="900"
              />
              <div className={styles.photoShade} />
              <div className={styles.photoCaption}>
                <span className={styles.cameraDot}>●</span>
                <div><strong>REAL GUESTS · REAL VIETNAM</strong><small>GoVietStay 실제 여행 사진</small></div>
              </div>
            </div>
            <div className={styles.floatingPromo}>
              <span>FREE</span>
              <strong>30분</strong>
              <small>MASSAGE</small>
            </div>
            <div className={styles.floatingTrust}>
              <div className={styles.avatarStack}>
                {realGuestPhotos.slice(0, 3).map((src) => (
                  <img key={src} src={src} alt="GoVietStay 실제 여행객" width="56" height="56" />
                ))}
              </div>
              <div><strong>실제 여행객 사진</strong><small>현지에서 직접 운영합니다</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.promoStrip} aria-label="마사지 프로모션">
        <div className={styles.sectionInner}>
          <div className={styles.promoGrid}>
            <div className={styles.promoCopy}>
              <p className={styles.sectionKicker}>KOREAN EXCLUSIVE BENEFIT</p>
              <h2>투어만 예약했는데,<br/><span>마사지까지 무료.</span></h2>
              <p>
                별도 할인 코드를 찾을 필요가 없습니다. 이 한국어 페이지를 통해 참섬 투어 예약이 확정되면
                고객 1인당 30분 마사지 바우처 1장을 자동으로 제공합니다.
              </p>
              <div className={styles.promoChips}>
                <span>코드 입력 ❌</span><span>추가 결제 ❌</span><span>1인 1장 ✅</span>
              </div>
            </div>
            <div className={styles.voucherWrap}>
              <div className={styles.zeroStamp}><b>0원</b><small>30 MIN</small></div>
              <img
                className={styles.voucherImage}
                src="/ko/cham-island-tour/massage-voucher.svg"
                alt="GoVietStay 30분 무료 마사지 바우처"
                width="760"
                height="480"
              />
              <div className={styles.shine} />
            </div>
          </div>
          <div className={styles.promoNotes}>
            <span>✓ 예약이 확정된 고객 대상</span>
            <span>✓ 고객 1인당 바우처 1장</span>
            <span>✓ 발 또는 바디 마사지 30분</span>
            <span>✓ 다낭 선짜 야시장 이용</span>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.realSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeaderRow}>
            <div>
              <p className={styles.sectionKicker}>REAL PEOPLE · REAL SUPPORT</p>
              <h2 className={styles.sectionTitle}>광고 이미지가 아니라,<br/>GoVietStay의 실제 여행입니다.</h2>
            </div>
            <p className={styles.sectionIntro}>러시아어 페이지에서 사용 중인 GoVietStay의 실제 여행객·운영 사진을 함께 보여드립니다. 처음 연락하는 여행객도 누가 현지에서 도와주는지 확인할 수 있습니다.</p>
          </div>

          <div className={styles.peopleLayout}>
            <div className={styles.guestMosaic}>
              {realGuestPhotos.slice(0, 5).map((src, index) => (
                <figure key={src} className={`${styles.guestPhoto} ${index === 0 ? styles.guestPhotoLarge : ""}`}>
                  <img src={src} alt="GoVietStay 실제 여행객" loading="lazy" />
                  {index === 0 && <figcaption>REAL GUEST MOMENTS</figcaption>}
                </figure>
              ))}
            </div>

            <aside className={styles.localTeamCard}>
              <div className={styles.teamPhotoWrap}>
                <img src="/founder/david-founder.png" alt="GoVietStay 현지 운영팀" loading="lazy" />
                <span className={styles.onlineBadge}><i /> LOCAL SUPPORT</span>
              </div>
              <div className={styles.teamBody}>
                <p className={styles.sectionKicker}>GOVIETSTAY · DA NANG</p>
                <h3>예약 뒤에도 현지에서 계속 연결됩니다.</h3>
                <p>호텔 픽업, 날씨, 출항 여부, 준비물처럼 여행 당일 필요한 내용을 현지 운영팀이 확인하고 안내합니다.</p>
                <div className={styles.teamPoints}><span>✓ 현지 운영</span><span>✓ 한국어 메시지</span><span>✓ 일정 확인</span></div>
                <a className={styles.outlineButton} href={whatsappHref} target="_blank" rel="noreferrer">현지 팀에 바로 문의</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionKicker}>WHY THIS TOUR</p>
          <h2 className={styles.sectionTitle}>다낭에서 하루, 바다를 제대로 즐기는 방법</h2>
          <div className={styles.cards}>
            <article className={styles.card}><div className={styles.cardIcon}>🤿</div><h3>산호 스노클링</h3><p>맑은 바다에서 참섬의 수중 풍경을 가까이에서 즐겨보세요.</p></article>
            <article className={styles.card}><div className={styles.cardIcon}>🚤</div><h3>스피드보트 이동</h3><p>항구에서 스피드보트로 섬까지 이동해 여행 시간을 효율적으로 사용합니다.</p></article>
            <article className={styles.card}><div className={styles.cardIcon}>💬</div><h3>언어 걱정 줄이기</h3><p>한국어 메시지를 보내면 번역 도구를 활용해 픽업, 준비물, 날씨와 예약 정보를 안내합니다.</p></article>
            <article className={`${styles.card} ${styles.giftCard}`}><div className={styles.cardIcon}>🎁</div><h3>마사지 30분 0원</h3><p>예약 확정 고객은 선짜 야시장에서 발 또는 바디 마사지 30분을 선택할 수 있습니다.</p></article>
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
              <div className={styles.bookingRibbon}>한국인 전용 혜택</div>
              <span className={styles.bookingTag}>KOREAN SPECIAL</span>
              <h3>Cham Island Tour</h3>
              <p className={styles.priceLabel}>성인 기준</p>
              <div className={styles.price}>950,000 VND<span>부터</span></div>
              <div className={styles.freeLine}><span>+ 30분 마사지</span><strong>0원</strong></div>
              <p className={styles.priceNote}>정확한 요금은 날짜, 인원, 픽업 위치에 따라 예약 전 확인합니다.</p>
              <ul>
                <li>스피드보트 이동</li><li>스노클링 체험</li><li>섬에서 점심</li><li>현지 운영 지원</li><li><strong>30분 마사지 바우처</strong></li>
              </ul>
              <a className={`${styles.primaryButton} ${styles.pulseButton}`} href={whatsappHref} target="_blank" rel="noreferrer">혜택 적용해서 문의하기</a>
              <small className={styles.noCode}>쿠폰 코드 없이 예약 확정 시 적용</small>
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
            <div><strong>🗣️ 한국어 메시지</strong><p>한국어 문의가 가능합니다. 한국인 전용 가이드가 포함된다는 의미는 아니며, 예약 및 일정 안내를 번역 지원합니다.</p></div>
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
                <summary>{item.question}</summary><p>{item.answer}</p>
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
              <h2>참섬 + 스노클링 + <span>무료 마사지</span>,<br/>이번 여행에서 한 번에.</h2>
              <p>여행 날짜, 인원, 다낭 호텔 이름만 보내주세요. 한국어로 메시지하셔도 됩니다.</p>
            </div>
            <div className={styles.finalButtons}>
              <a className={`${styles.primaryButton} ${styles.pulseButton}`} href={whatsappHref} target="_blank" rel="noreferrer">무료 혜택으로 문의</a>
              {kakaoReady ? <a className={styles.kakaoButton} href={KAKAO_URL} target="_blank" rel="noreferrer">KakaoTalk 문의</a> : <span className={`${styles.kakaoButton} ${styles.disabledButton}`}>KakaoTalk 링크 준비 중</span>}
            </div>
          </div>
          <p className={styles.footerLine}>GoVietStay · Trusted Local Support · Da Nang • Hoi An • Hue • Phu Quoc</p>
        </div>
      </section>

      <div className={styles.mobileBar}>
        <a href={whatsappHref} target="_blank" rel="noreferrer">🎁 혜택으로 예약</a>
        {kakaoReady ? <a className={styles.mobileKakao} href={KAKAO_URL} target="_blank" rel="noreferrer">KakaoTalk</a> : <span className={`${styles.mobileKakao} ${styles.mobileDisabled}`}>Kakao 준비 중</span>}
      </div>
    </main>
  );
}
