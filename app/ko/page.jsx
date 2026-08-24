export const metadata = {
  title: '다낭 자유여행 & 현지투어 | 참섬·바나힐·호이안 | GoVietStay',
  description:
    '다낭 자유여행을 더 편하게. 참섬 스노클링, 바나힐·골든브릿지, 호이안·바구니배, 후에, 공항픽업, 티켓, eSIM까지 GoVietStay 다낭 현지팀이 한국어 메시지로 도와드립니다.',
  keywords: [
    '다낭 자유여행',
    '다낭 투어',
    '다낭 현지투어',
    '다낭 가족여행',
    '다낭 커플여행',
    '참섬 투어',
    '꾸라오참',
    '다낭 스노클링',
    '바나힐 투어',
    '골든브릿지',
    '호이안 투어',
    '호이안 바구니배',
    '후에 투어',
    '다낭 공항픽업',
    '다낭 한강 크루즈',
    '다낭 마사지',
    '다낭 한국어 상담',
    '베트남 자유여행',
    'GoVietStay',
  ],
  alternates: {
    canonical: 'https://www.govietstay.com/ko',
    languages: {
      'ko-KR': 'https://www.govietstay.com/ko',
      ru: 'https://www.govietstay.com/ru',
      'x-default': 'https://www.govietstay.com/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.govietstay.com/ko',
    siteName: 'GoVietStay',
    title: '다낭 자유여행 & 현지투어 | GoVietStay',
    description:
      '참섬, 바나힐, 호이안, 후에부터 공항픽업과 현지 여행지원까지. 한국 여행객을 위한 GoVietStay 다낭 현지 허브.',
    images: [
      {
        url: 'https://www.govietstay.com/tour/cham-island/guest-on-island.jpg',
        width: 1200,
        height: 630,
        alt: 'GoVietStay 다낭 참섬 실제 여행객',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '다낭 자유여행 & 현지투어 | GoVietStay',
    description: '다낭에서 믿고 연락할 수 있는 현지 여행지원팀.',
    images: ['https://www.govietstay.com/tour/cham-island/guest-on-island.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const WA =
  'https://wa.me/84937762607?text=' +
  encodeURIComponent('안녕하세요. GoVietStay 다낭 여행 상담을 받고 싶어요. 여행 날짜 / 인원 / 호텔을 안내드릴게요.');
const KAKAO = 'https://invite.kakao.com/tc/dr58xzejiG';

const services = [
  {
    icon: '🏝️',
    eyebrow: 'BEST FOR SEA',
    title: '참섬 · 꾸라오참 스노클링',
    desc: '스피드보트로 참섬에 들어가 바다, 스노클링, 섬 점심을 하루에 즐기는 다낭 대표 해양 일정.',
    price: '950,000 VND부터',
    gift: '30분 마사지 + 한강 크루즈 혜택 대상',
    details: {
      duration: '오전 출발 · 오후 복귀 (호텔 위치와 당일 운항에 따라 확정)',
      route: '다낭 호텔 픽업 상담 → 호이안 인근 선착장 → 스피드보트 → 참섬 → 스노클링 2회 → 섬에서 점심 → 다낭 복귀',
      included: '스피드보트 이동 · 스노클링 체험 · 섬 점심 · 현지 일정 지원',
      note: '해상 상태와 관계 당국의 운항 승인에 따라 일정이 변경될 수 있습니다. 식사는 배 위가 아니라 섬에서 진행합니다.',
    },
    href: '/ko/cham-island-tour',
    cta: '참섬 전체 정보 보기',
  },
  {
    icon: '🌉',
    eyebrow: 'ICONIC DA NANG',
    title: '바나힐 · 골든브릿지',
    desc: '케이블카, 골든브릿지, 프랑스마을까지. 다낭에 처음 온 가족과 커플이 가장 많이 찾는 하루 코스.',
    price: '1,550,000 VND부터',
    gift: '마사지 혜택 확인 · 한강 크루즈 증정 제외',
    details: {
      duration: '다낭 출발 기준 하루 일정',
      route: '다낭 출발 → 케이블카 → 골든브릿지 → 프랑스마을 및 주요 구역 → 자유시간 → 다낭 복귀',
      included: '차량·가이드·입장권·뷔페 포함 여부는 선택한 패키지에 따라 달라지므로 예약 전에 정확히 안내합니다.',
      note: '바나힐 투어는 한강 크루즈 티켓 증정 대상에서 제외됩니다. 혼잡도에 따라 출발 시간이 조정될 수 있습니다.',
    },
    href: WA,
    cta: '바나힐 예약 문의',
    external: true,
  },
  {
    icon: '🏮',
    eyebrow: 'EVENING FAVORITE',
    title: '호이안 · 코코넛숲 · 바구니배',
    desc: '낮에는 바구니배, 저녁에는 호이안 올드타운과 등불 거리. 한 번에 분위기가 완전히 바뀌는 일정.',
    price: '1,250,000 VND부터',
    gift: '한강 크루즈 티켓 1매 혜택 대상',
    details: {
      duration: '예시 14:00경 출발 · 20:00경 복귀',
      route: '다낭 픽업 → 코코넛숲 바구니배 45–60분 → 호이안 올드타운 → 일본교 주변 산책 → 저녁식사 → 등불 보트 → 다낭 복귀',
      included: '바구니배 · 올드타운 산책 · 저녁식사 · 등불 보트를 한 번에 즐기는 오후/저녁 일정입니다.',
      note: '호텔 위치와 당일 교통 상황에 따라 픽업·귀환 시간이 달라질 수 있으며 최종 시간은 예약 후 안내합니다.',
    },
    href: WA,
    cta: '호이안 예약 문의',
    external: true,
  },
  {
    icon: '🏯',
    eyebrow: 'CULTURE DAY',
    title: '후에 왕궁 · 역사투어',
    desc: '응우옌 왕조의 유산과 중부 베트남의 역사를 하루에 만나는 문화 여행. 부모님과 함께라면 특히 추천.',
    price: '1,450,000 VND부터',
    gift: '한강 크루즈 티켓 1매 혜택 대상',
    details: {
      duration: '다낭 출발 기준 하루 일정',
      route: '다낭 출발 → 후에 이동 → 응우옌 왕조 왕궁과 주요 역사 유산 중심 탐방 → 다낭 복귀',
      included: '문화·역사 중심 일정이며 방문지, 식사, 가이드 구성은 선택 패키지별로 예약 전에 확인합니다.',
      note: '부모님 동반이나 소그룹은 이동 강도에 맞춰 단독 일정 상담도 가능합니다.',
    },
    href: WA,
    cta: '후에 예약 문의',
    external: true,
  },
  {
    icon: '🚐',
    eyebrow: 'EASY ARRIVAL',
    title: '다낭 공항픽업 · 단독차량',
    desc: '도착 시간과 호텔만 알려주세요. 공항에서 호텔까지 이동을 미리 준비해 여행 첫날의 변수를 줄입니다.',
    price: '차량 · 구간별 확인',
    gift: '투어와 함께 예약 시 동선 상담',
    details: {
      duration: '항공편 도착/출발 시간 기준',
      route: '다낭 국제공항 ↔ 다낭·호이안 호텔 및 요청 구간',
      included: '인원, 짐, 목적지에 맞는 차량을 확인하고 예약 전에 구간별 비용을 안내합니다.',
      note: '항공편명 · 도착시간 · 인원 · 호텔명을 보내주시면 픽업 가능 여부를 빠르게 확인할 수 있습니다.',
    },
    href: WA,
    cta: '공항픽업 문의',
    external: true,
  },
  {
    icon: '🎟️',
    eyebrow: 'LOCAL SUPPORT',
    title: '티켓 · SIM/eSIM · 맞춤 일정',
    desc: '관광지 티켓, SIM/eSIM, 가족·커플·소그룹 일정까지. 필요한 것만 골라 현지팀에 한 번에 문의하세요.',
    price: '필요한 서비스만 선택',
    gift: '예약 전 조건과 비용 먼저 안내',
    details: {
      duration: '필요한 서비스만 선택',
      route: '관광지 티켓 · SIM/eSIM · 가족/커플 일정 상담 · 현지 여행 지원',
      included: '필요 없는 상품을 묶지 않고 여행자에게 필요한 항목만 골라 안내합니다.',
      note: '티켓과 통신 상품은 이용일, 기종, 운영 조건에 따라 가격과 이용 조건이 달라질 수 있습니다.',
    },
    href: WA,
    cta: '맞춤 상담',
    external: true,
  },
];

const faq = [
  ['한국어로 문의해도 되나요?', '네. 한국어 메시지로 문의하실 수 있습니다. GoVietStay 현지팀이 일정, 픽업, 준비물과 예약 정보를 최대한 명확하게 안내합니다. 한국인 가이드 포함 여부는 각 투어별로 별도 확인합니다.'],
  ['다낭에서 어떤 투어를 가장 많이 선택하나요?', '처음 방문이라면 바나힐·골든브릿지, 호이안·코코넛숲, 참섬 스노클링을 많이 비교합니다. 여행 날짜와 동행 유형을 알려주시면 무리하지 않는 순서로 추천드립니다.'],
  ['30분 마사지 혜택은 어떻게 받나요?', '한국인 대상 프로모션이 적용되는 예약은 확정 후 이용 방법을 안내합니다. 참섬 한국어 페이지의 마사지 혜택은 별도 쿠폰 코드 없이 예약 조건에 따라 적용됩니다.'],
  ['한강 크루즈 티켓 증정은 어떤 투어에 적용되나요?', '프로모션 대상 투어 예약 확정 시 1인 기준 한강 크루즈 티켓 1매 혜택을 제공합니다. 바나힐 투어는 크루즈 증정 대상에서 제외됩니다. 최종 적용 조건은 예약 전 안내드립니다.'],
  ['참섬은 날씨가 안 좋으면 어떻게 되나요?', '참섬은 해상 상태와 관계 당국의 운항 승인에 영향을 받습니다. 출항 여부가 변경되면 가능한 일정 변경이나 대안을 안내드립니다.'],
  ['아이와 부모님이 함께 가도 괜찮나요?', '가능합니다. 다만 아이의 나이와 키, 부모님의 이동 편의, 원하는 일정 강도를 알려주시면 바나힐·호이안·후에 등에서 더 편한 동선을 제안할 수 있습니다.'],
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TravelAgency',
      '@id': 'https://www.govietstay.com/#travelagency',
      name: 'GoVietStay',
      url: 'https://www.govietstay.com/ko',
      logo: 'https://www.govietstay.com/logo.png',
      image: 'https://www.govietstay.com/tour/cham-island/guest-on-island.jpg',
      telephone: '+84 937 762 607',
      description: '다낭, 호이안, 후에, 푸꾸옥 여행을 지원하는 베트남 현지 여행팀. 투어, 공항픽업, 티켓, SIM/eSIM 및 여행 지원.',
      areaServed: ['Da Nang', 'Hoi An', 'Hue', 'Phu Quoc'],
      availableLanguage: ['Korean', 'English', 'Russian'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'GoVietStay Korea Travel Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '다낭 참섬 스노클링 투어' }, priceCurrency: 'VND', price: '950000' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '다낭 바나힐 골든브릿지 투어' }, priceCurrency: 'VND', price: '1550000' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '호이안 코코넛숲 바구니배 투어' }, priceCurrency: 'VND', price: '1250000' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '후에 왕궁 데이투어' }, priceCurrency: 'VND', price: '1450000' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '다낭 공항픽업' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '베트남 관광지 티켓 및 SIM/eSIM 지원' } },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'GoVietStay', item: 'https://www.govietstay.com/' },
        { '@type': 'ListItem', position: 2, name: '한국어 여행', item: 'https://www.govietstay.com/ko' },
      ],
    },
  ],
};

export default function KoreanTravelHub() {
  return (
    <main className="koHub" lang="ko">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="topStrip">
        <span>🇰🇷 한국인 여행객 혜택</span>
        <span className="dot">•</span>
        <span>30분 마사지 프로모션</span>
        <span className="dot">•</span>
        <span>대상 투어 한강 크루즈 티켓</span>
      </div>

      <header className="navWrap">
        <a className="brand" href="/" aria-label="GoVietStay 메인 홈페이지로 돌아가기">
          <img src="/logo.png" alt="GoVietStay" />
          <span>
            <b>GoVietStay</b>
            <small>DA NANG LOCAL TEAM</small>
          </span>
        </a>
        <nav className="desktopNav" aria-label="주요 메뉴">
          <a href="/ko">한국어 홈</a>
          <a href="#tours">인기 투어</a>
          <a href="#benefits">혜택</a>
          <a href="#support">현지지원</a>
          <a href="#guide">여행가이드</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="languageSwitch" aria-label="언어 선택">
          <a href="/">Main</a>
          <a href="/ru">Русский</a>
          <span aria-current="page">한국어</span>
        </div>
        <a className="navCta" href={KAKAO} target="_blank" rel="noopener noreferrer">KakaoTalk 상담</a>
      </header>

      <section className="hero">
        <div className="heroMedia" aria-hidden="true">
          <img src="/tour/cham-island/guest-on-island.jpg" alt="" />
          <div className="heroShade" />
        </div>
        <div className="heroInner">
          <div className="heroCopy">
            <p className="eyebrow">DA NANG · HOI AN · HUE · PHU QUOC</p>
            <h1>
              다낭 자유여행,<br />
              <span>현지에서 더 쉽게.</span>
            </h1>
            <p className="heroLead">
              투어를 고르기 전에 먼저 여행을 이해합니다. 날짜, 인원, 호텔만 알려주시면
              참섬·바나힐·호이안부터 공항픽업까지 필요한 것만 정리해 드립니다.
            </p>
            <div className="heroButtons">
              <a className="primaryBtn" href={KAKAO} target="_blank" rel="noopener noreferrer">카카오톡으로 문의</a>
              <a className="ghostBtn" href="#tours">인기 투어 보기 ↓</a>
            </div>
            <div className="trustLine">
              <span>✓ 한국어 메시지</span><span>✓ 현지 운영팀</span><span>✓ 예약 전 가격 확인</span><span>✓ 여행 중 지원</span>
            </div>
          </div>

          <aside className="heroDeal" id="benefits">
            <p className="dealLabel">KOREAN TRAVELER BENEFITS</p>
            <h2>예약하면 여행 뒤까지 챙겨드려요.</h2>
            <div className="dealRow">
              <div className="dealIcon">💆</div>
              <div><b>30분 마사지 혜택</b><p>프로모션 적용 예약 고객 대상</p></div>
              <strong>FREE*</strong>
            </div>
            <div className="dealRow">
              <div className="dealIcon">🚢</div>
              <div><b>다낭 한강 크루즈 티켓</b><p>대상 투어 예약 시 1인 1매</p></div>
              <strong>GIFT*</strong>
            </div>
            <p className="dealNote">* 바나힐 투어는 한강 크루즈 증정 제외. 혜택은 예약 조건과 운영 상황에 따라 최종 확인됩니다.</p>
          </aside>
        </div>
      </section>

      <section className="quickAnswers" aria-label="빠른 여행 선택">
        <div><small>바다가 좋다면</small><b>참섬 · 스노클링</b></div>
        <div><small>첫 다낭이라면</small><b>바나힐 · 골든브릿지</b></div>
        <div><small>저녁 감성이라면</small><b>호이안 · 등불거리</b></div>
        <div><small>부모님과 함께라면</small><b>후에 · 단독 일정</b></div>
      </section>

      <section className="section" id="tours">
        <div className="sectionHead">
          <div>
            <p className="eyebrow dark">POPULAR EXPERIENCES</p>
            <h2>한국 여행객이 찾는 다낭 핵심 여행</h2>
          </div>
          <p>가격만 보여주는 목록보다, 누구에게 맞는 여행인지 먼저 보여드립니다. 최종 가격과 픽업은 예약 전에 확인합니다.</p>
        </div>

        <div className="serviceGrid">
          {services.map((item, i) => (
            <article className={`serviceCard ${i === 0 ? 'featured' : ''}`} key={item.title}>
              <div className="serviceTop">
                <span className="serviceIcon">{item.icon}</span>
                <span className="serviceEyebrow">{item.eyebrow}</span>
              </div>
              <h3>{item.title}</h3>
              <p className="serviceDesc">{item.desc}</p>
              <div className="priceLine"><b>{item.price}</b></div>
              <div className="giftLine">🎁 {item.gift}</div>
              <details className="tourDetails">
                <summary>상세 일정 먼저 보기 <span>＋</span></summary>
                <div className="tourDetailsBody">
                  <div className="detailItem"><b>소요시간</b><p>{item.details.duration}</p></div>
                  <div className="detailItem"><b>예상 일정</b><p>{item.details.route}</p></div>
                  <div className="detailItem"><b>구성 안내</b><p>{item.details.included}</p></div>
                  <div className="detailItem note"><b>예약 전 확인</b><p>{item.details.note}</p></div>
                </div>
              </details>
              <a
                className="cardLink"
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {item.cta} <span>→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="realSection" id="support">
        <div className="realGrid">
          <div className="realCopy">
            <p className="eyebrow">REAL PEOPLE · REAL SUPPORT</p>
            <h2>광고 이미지보다<br />누가 현지에서 돕는지가 중요합니다.</h2>
            <p>
              GoVietStay는 다낭 현지에서 여행을 연결합니다. 호텔 픽업, 참섬 출항 여부,
              준비물, 일정 변경처럼 여행 당일 생기는 질문까지 예약 뒤에도 이어서 확인합니다.
            </p>
            <div className="supportPills">
              <span>현지 운영</span><span>한국어 메시지</span><span>24/7 여행 지원</span><span>투명한 조건 안내</span>
            </div>
            <a className="lightBtn" href={WA} target="_blank" rel="noopener noreferrer">현지팀에 바로 문의 →</a>
          </div>
          <div className="photoMosaic">
            <figure className="photoLarge"><img src="/tour/cham-island/guest-pickup.jpg" alt="GoVietStay 실제 여행객 픽업" /></figure>
            <figure><img src="/tour/cham.jpg" alt="GoVietStay 참섬 실제 여행" /></figure>
            <figure><img src="/founder/david-founder.png" alt="GoVietStay 다낭 현지 운영팀" /></figure>
          </div>
        </div>
      </section>

      <section className="section seoSection" id="guide">
        <div className="sectionHead">
          <div>
            <p className="eyebrow dark">PLAN BEFORE YOU BOOK</p>
            <h2>다낭 자유여행, 검색부터 예약까지 한곳에서</h2>
          </div>
          <p>네이버에서 많이 찾는 질문을 실제 여행 결정에 도움이 되도록 정리합니다.</p>
        </div>

        <div className="guideGrid">
          <article>
            <span>01</span><h3>다낭 3박4일 · 4박5일 일정</h3><p>바나힐, 호이안, 참섬을 모두 넣기보다 휴식 시간을 포함한 동선으로 조정하세요.</p>
          </article>
          <article>
            <span>02</span><h3>아이와 가는 다낭 가족여행</h3><p>아이의 나이·키와 호텔 위치를 먼저 알려주시면 이동시간과 투어 강도를 함께 봅니다.</p>
          </article>
          <article>
            <span>03</span><h3>커플 · 부모님 · 친구여행</h3><p>같은 다낭이라도 여행 스타일에 따라 바다, 야경, 문화 코스의 우선순위가 달라집니다.</p>
          </article>
          <article>
            <span>04</span><h3>공항픽업부터 마지막 날까지</h3><p>공항 이동, 투어, 티켓, SIM/eSIM을 따로 찾지 않고 필요한 부분만 묶어서 문의할 수 있습니다.</p>
          </article>
        </div>

        <div className="keywordBox">
          <b>많이 찾는 여행 키워드</b>
          <div className="keywordCloud">
            {['다낭 자유여행','다낭 투어','다낭 가족여행','참섬 투어','꾸라오참','다낭 스노클링','바나힐 투어','골든브릿지','호이안 투어','호이안 바구니배','후에 투어','다낭 공항픽업','다낭 한강 크루즈','다낭 마사지','다낭 한국어 상담'].map((k) => <span key={k}>{k}</span>)}
          </div>
        </div>

        <div className="blogCta">
          <div><small>NAVER BLOG · EVERYDAY LOCAL GUIDE</small><h3>오늘 다낭에서 필요한 정보부터 읽어보세요.</h3><p>참섬 준비물, 다낭 일정, 가족여행 팁 등 한국 여행객을 위한 현지 가이드를 계속 업데이트합니다.</p></div>
          <a href="https://blog.naver.com/govietstay" target="_blank" rel="noopener noreferrer">네이버 블로그 보기 ↗</a>
        </div>
      </section>

      <section className="stepsSection">
        <div className="stepsInner">
          <p className="eyebrow">3 THINGS ARE ENOUGH</p>
          <h2>날짜 · 인원 · 호텔.<br />세 가지만 보내주세요.</h2>
          <div className="steps">
            <div><span>01</span><b>여행 날짜</b><p>원하는 투어 날짜 또는 다낭 체류 기간</p></div>
            <div><span>02</span><b>인원</b><p>성인 · 어린이, 아이가 있다면 나이와 키</p></div>
            <div><span>03</span><b>호텔</b><p>픽업 가능 여부와 예상 이동시간 확인</p></div>
          </div>
          <div className="centerButtons">
            <a className="whiteBtn" href={KAKAO} target="_blank" rel="noopener noreferrer">KakaoTalk 상담</a>
            <a className="outlineWhiteBtn" href={WA} target="_blank" rel="noopener noreferrer">WhatsApp 상담</a>
          </div>
        </div>
      </section>

      <section className="section faqSection" id="faq">
        <div className="sectionHead">
          <div><p className="eyebrow dark">FAQ</p><h2>다낭 여행 전 많이 묻는 질문</h2></div>
          <p>예약 전에 궁금한 내용을 먼저 확인하세요. 더 구체적인 내용은 한국어 메시지로 문의하셔도 됩니다.</p>
        </div>
        <div className="faqGrid">
          {faq.map(([q, a]) => (
            <details key={q}>
              <summary>{q}<span>＋</span></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div>
          <a className="brand footerBrand" href="/"><img src="/logo.png" alt="GoVietStay" /><span><b>GoVietStay</b><small>Trusted Local Support</small></span></a>
          <p>다낭 · 호이안 · 후에 · 푸꾸옥에서 여행객이 필요할 때 연락할 수 있는 현지 여행지원팀.</p>
        </div>
        <div className="footerLinks">
          <a href="/">GoVietStay Main</a>
          <a href="/ko">한국어 홈</a>
          <a href="/ru">Русский</a>
          <a href="/ko/cham-island-tour">참섬 투어</a>
          <a href="https://blog.naver.com/govietstay" target="_blank" rel="noopener noreferrer">Naver Blog</a>
          <a href={KAKAO} target="_blank" rel="noopener noreferrer">KakaoTalk</a>
          <a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
        <div className="footerNote">가격·일정·프로모션은 날짜, 인원, 운영 상황에 따라 변경될 수 있으며 예약 확정 전에 최종 안내합니다.</div>
      </footer>

      <div className="mobileBar">
        <a href={KAKAO} target="_blank" rel="noopener noreferrer">카카오톡 문의</a>
        <a href="#tours">투어 보기</a>
      </div>

      <style>{`
        .koHub{--ink:#101311;--muted:#66706a;--green:#0b6f52;--mint:#dff5e9;--lime:#d7ff5b;--cream:#f7f5ef;--line:#e5e8e5;--dark:#0b1813;background:#fff;color:var(--ink);font-family:Pretendard,"Noto Sans KR","Apple SD Gothic Neo",Arial,sans-serif;line-height:1.6;overflow:hidden}
        .koHub *{box-sizing:border-box}.koHub a{text-decoration:none;color:inherit}.koHub img{display:block;max-width:100%}
        .topStrip{height:34px;background:#0b1813;color:#e8f8ef;display:flex;align-items:center;justify-content:center;gap:10px;font-size:12px;font-weight:800;letter-spacing:.04em;white-space:nowrap}.topStrip .dot{color:#77d9a9}
        .navWrap{height:78px;max-width:1180px;margin:auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;background:#fff}.brand{display:flex;align-items:center;gap:10px;min-width:max-content}.brand img{width:42px;height:42px;object-fit:contain}.brand span{display:flex;flex-direction:column;line-height:1.12}.brand b{font-size:18px;letter-spacing:-.02em}.brand small{font-size:9px;letter-spacing:.14em;color:#6d746f;margin-top:5px}.desktopNav{display:flex;align-items:center;gap:20px;font-size:13px;font-weight:700;color:#3b433e}.desktopNav a:hover{color:var(--green)}.languageSwitch{display:flex;align-items:center;gap:5px;padding:5px;border:1px solid var(--line);border-radius:999px;background:#f7f9f8;white-space:nowrap}.languageSwitch a,.languageSwitch span{padding:5px 7px;border-radius:999px;font-size:9px;font-weight:900}.languageSwitch a:hover{background:#fff;color:var(--green)}.languageSwitch span{background:var(--green);color:#fff}.navCta{background:var(--ink);color:#fff!important;padding:12px 18px;border-radius:999px;font-size:13px;font-weight:800}
        .hero{position:relative;min-height:690px;background:var(--dark);color:#fff}.heroMedia{position:absolute;inset:0}.heroMedia img{width:100%;height:100%;object-fit:cover;object-position:center 42%;filter:saturate(.9)}.heroShade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,15,11,.94) 0%,rgba(5,15,11,.77) 44%,rgba(5,15,11,.2) 76%,rgba(5,15,11,.36) 100%)}
        .heroInner{position:relative;z-index:2;max-width:1180px;margin:auto;padding:108px 24px 90px;display:grid;grid-template-columns:minmax(0,1.25fr) minmax(330px,.75fr);gap:70px;align-items:end}.eyebrow{font-size:12px;font-weight:900;letter-spacing:.18em;color:#9ce4bd;margin:0 0 16px}.eyebrow.dark{color:var(--green)}.hero h1{font-size:68px;line-height:1.03;letter-spacing:-.055em;margin:0 0 24px;max-width:680px}.hero h1 span{color:var(--lime)}.heroLead{font-size:18px;line-height:1.75;color:#e2ebe6;max-width:650px;margin:0 0 30px}.heroButtons{display:flex;gap:12px;flex-wrap:wrap}.primaryBtn,.ghostBtn,.lightBtn,.whiteBtn,.outlineWhiteBtn{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:15px 22px;font-weight:900;font-size:14px;transition:.2s transform,.2s opacity}.primaryBtn{background:var(--lime);color:#142015!important}.ghostBtn{border:1px solid rgba(255,255,255,.45);color:#fff!important;background:rgba(255,255,255,.07)}.primaryBtn:hover,.ghostBtn:hover,.lightBtn:hover,.whiteBtn:hover,.outlineWhiteBtn:hover{transform:translateY(-2px)}.trustLine{display:flex;gap:18px;flex-wrap:wrap;margin-top:28px;font-size:12px;font-weight:750;color:#d4dfd9}
        .heroDeal{background:rgba(255,255,255,.95);color:var(--ink);border-radius:24px;padding:28px;box-shadow:0 25px 80px rgba(0,0,0,.28);backdrop-filter:blur(10px)}.dealLabel{font-size:10px;font-weight:950;letter-spacing:.16em;color:var(--green);margin:0 0 6px}.heroDeal h2{font-size:24px;line-height:1.3;letter-spacing:-.035em;margin:0 0 22px}.dealRow{display:grid;grid-template-columns:46px 1fr auto;gap:12px;align-items:center;padding:16px 0;border-top:1px solid var(--line)}.dealIcon{width:46px;height:46px;border-radius:14px;background:var(--mint);display:flex;align-items:center;justify-content:center;font-size:22px}.dealRow b{font-size:14px}.dealRow p{font-size:11px;color:var(--muted);margin:3px 0 0}.dealRow strong{font-size:12px;background:#102019;color:#cfff65;border-radius:999px;padding:6px 9px}.dealNote{font-size:10px;color:#778079;line-height:1.55;margin:14px 0 0}
        .quickAnswers{max-width:1180px;margin:-36px auto 0;position:relative;z-index:4;padding:0 24px;display:grid;grid-template-columns:repeat(4,1fr)}.quickAnswers div{background:#fff;padding:22px 22px;border:1px solid var(--line);border-right:0;box-shadow:0 12px 35px rgba(18,34,26,.07)}.quickAnswers div:first-child{border-radius:18px 0 0 18px}.quickAnswers div:last-child{border-right:1px solid var(--line);border-radius:0 18px 18px 0}.quickAnswers small{display:block;color:#78817c;font-size:11px;margin-bottom:4px}.quickAnswers b{font-size:14px;letter-spacing:-.02em}
        .section{max-width:1180px;margin:auto;padding:110px 24px}.sectionHead{display:grid;grid-template-columns:1fr 380px;gap:40px;align-items:end;margin-bottom:38px}.sectionHead h2{font-size:42px;line-height:1.15;letter-spacing:-.045em;margin:0}.sectionHead>p{color:var(--muted);font-size:14px;margin:0;line-height:1.75}
        .serviceGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.serviceCard{border:1px solid var(--line);border-radius:24px;padding:26px;min-height:340px;display:flex;flex-direction:column;background:#fff;transition:.25s transform,.25s box-shadow}.serviceCard:hover{transform:translateY(-5px);box-shadow:0 22px 60px rgba(13,40,27,.09)}.serviceCard.featured{background:linear-gradient(145deg,#e8f8ef 0%,#f6fff8 100%);border-color:#cbe8d8}.serviceTop{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}.serviceIcon{font-size:30px}.serviceEyebrow{font-size:9px;font-weight:950;letter-spacing:.13em;color:var(--green)}.serviceCard h3{font-size:23px;line-height:1.28;letter-spacing:-.035em;margin:0 0 12px}.serviceDesc{font-size:13px;color:var(--muted);margin:0 0 18px}.priceLine{font-size:17px;margin-top:auto;padding-top:12px}.giftLine{margin-top:10px;background:var(--cream);border-radius:12px;padding:9px 11px;font-size:11px;font-weight:750;color:#39423c}.tourDetails{margin-top:12px;border:1px solid #e3e9e5;border-radius:14px;background:rgba(255,255,255,.76);overflow:hidden}.tourDetails summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 13px;font-size:12px;font-weight:900;color:#245c48}.tourDetails summary::-webkit-details-marker{display:none}.tourDetails summary span{font-size:17px;transition:.2s transform}.tourDetails[open] summary span{transform:rotate(45deg)}.tourDetailsBody{padding:0 13px 7px}.detailItem{border-top:1px dashed #dfe5e1;padding:10px 0}.detailItem b{display:block;font-size:10px;letter-spacing:.04em;color:#77817b;margin-bottom:3px}.detailItem p{margin:0;font-size:11px;line-height:1.65;color:#39423d}.detailItem.note p{color:#6a5140}.cardLink{margin-top:16px;display:flex;justify-content:space-between;align-items:center;padding-top:16px;border-top:1px solid var(--line);font-size:13px;font-weight:900;color:var(--green)!important}.cardLink span{font-size:19px}
        .realSection{background:var(--dark);color:#fff;padding:110px 24px}.realGrid{max-width:1180px;margin:auto;display:grid;grid-template-columns:.86fr 1.14fr;gap:70px;align-items:center}.realCopy h2{font-size:44px;line-height:1.15;letter-spacing:-.05em;margin:0 0 24px}.realCopy>p:not(.eyebrow){color:#c9d6cf;font-size:16px;line-height:1.8}.supportPills{display:flex;gap:8px;flex-wrap:wrap;margin:28px 0}.supportPills span{font-size:11px;font-weight:800;border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:8px 11px;color:#e8f2ed}.lightBtn{background:#fff;color:#102019!important}.photoMosaic{display:grid;grid-template-columns:1.2fr .8fr;grid-template-rows:220px 220px;gap:12px}.photoMosaic figure{margin:0;border-radius:22px;overflow:hidden;background:#203329}.photoMosaic figure img{width:100%;height:100%;object-fit:cover}.photoLarge{grid-row:1/3}.photoMosaic figure:last-child img{object-position:center top}
        .seoSection{padding-bottom:100px}.guideGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.guideGrid article{padding:24px 22px;border-radius:20px;background:var(--cream);min-height:230px}.guideGrid article span{font-size:11px;color:var(--green);font-weight:950}.guideGrid h3{font-size:18px;line-height:1.35;margin:30px 0 10px;letter-spacing:-.03em}.guideGrid p{font-size:12px;color:var(--muted);margin:0}.keywordBox{margin-top:30px;padding:26px;border:1px solid var(--line);border-radius:20px}.keywordBox>b{font-size:13px}.keywordCloud{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.keywordCloud span{font-size:11px;padding:8px 10px;border-radius:999px;background:#f3f6f4;color:#53605a}.blogCta{margin-top:30px;padding:34px;background:#eaf8ef;border-radius:24px;display:flex;justify-content:space-between;gap:30px;align-items:center}.blogCta small{font-size:9px;font-weight:950;letter-spacing:.15em;color:var(--green)}.blogCta h3{font-size:24px;letter-spacing:-.035em;margin:5px 0}.blogCta p{font-size:12px;color:var(--muted);margin:0}.blogCta a{min-width:max-content;background:var(--green);color:#fff!important;border-radius:999px;padding:13px 18px;font-weight:900;font-size:12px}
        .stepsSection{background:#0b6f52;color:#fff;padding:90px 24px}.stepsInner{max-width:1050px;margin:auto;text-align:center}.stepsInner>.eyebrow{color:#cfff65}.stepsInner h2{font-size:46px;line-height:1.15;letter-spacing:-.05em;margin:0 0 46px}.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;text-align:left}.steps div{border:1px solid rgba(255,255,255,.2);border-radius:20px;padding:24px;background:rgba(255,255,255,.06)}.steps span{font-size:10px;color:#cfff65;font-weight:950}.steps b{display:block;font-size:18px;margin:25px 0 5px}.steps p{font-size:12px;color:#d8eee3;margin:0}.centerButtons{display:flex;justify-content:center;gap:10px;margin-top:34px}.whiteBtn{background:#fff;color:#0b6f52!important}.outlineWhiteBtn{color:#fff!important;border:1px solid rgba(255,255,255,.5)}
        .faqSection{padding-bottom:120px}.faqGrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.faqGrid details{border:1px solid var(--line);border-radius:16px;padding:0 18px;background:#fff}.faqGrid summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;gap:20px;align-items:center;padding:18px 0;font-size:14px;font-weight:850}.faqGrid summary::-webkit-details-marker{display:none}.faqGrid summary span{font-size:18px;color:var(--green)}.faqGrid details[open] summary span{transform:rotate(45deg)}.faqGrid details p{margin:-2px 0 18px;color:var(--muted);font-size:12px;line-height:1.75;padding-right:25px}
        .footer{background:#0c100e;color:#fff;padding:54px max(24px,calc((100vw - 1132px)/2));display:grid;grid-template-columns:1fr auto;gap:28px 60px}.footerBrand img{filter:none}.footerBrand small{color:#849089}.footer>div>p{font-size:12px;color:#939f98;max-width:480px}.footerLinks{display:flex;gap:18px;align-items:center;font-size:12px;font-weight:800;color:#d7e1dc;flex-wrap:wrap}.footerNote{grid-column:1/-1;border-top:1px solid #28302c;padding-top:20px;color:#78837d;font-size:10px}.mobileBar{display:none}
        @media(max-width:980px){.desktopNav,.languageSwitch{display:none}.heroInner{grid-template-columns:1fr;gap:35px;padding-top:80px}.hero{min-height:780px}.hero h1{font-size:58px}.heroDeal{max-width:520px}.quickAnswers{grid-template-columns:1fr 1fr;margin-top:0}.quickAnswers div{border-right:1px solid var(--line);border-radius:0!important}.sectionHead{grid-template-columns:1fr}.serviceGrid{grid-template-columns:1fr 1fr}.realGrid{grid-template-columns:1fr}.guideGrid{grid-template-columns:1fr 1fr}.steps{grid-template-columns:1fr}.faqGrid{grid-template-columns:1fr}}
        @media(max-width:640px){.topStrip{justify-content:flex-start;overflow:auto;padding:0 14px}.navWrap{height:66px;padding:0 16px}.brand img{width:36px;height:36px}.brand b{font-size:16px}.navCta{font-size:11px;padding:10px 13px}.hero{min-height:auto}.heroMedia img{object-position:63% center}.heroShade{background:linear-gradient(180deg,rgba(5,15,11,.65) 0%,rgba(5,15,11,.88) 58%,rgba(5,15,11,.98) 100%)}.heroInner{padding:72px 18px 46px;display:block}.hero h1{font-size:46px;margin-bottom:18px}.heroLead{font-size:15px}.heroButtons{flex-direction:column}.heroButtons a{width:100%}.trustLine{gap:8px 14px;margin-bottom:32px}.heroDeal{padding:22px;border-radius:20px}.quickAnswers{padding:0;grid-template-columns:1fr 1fr}.quickAnswers div{padding:16px 14px}.quickAnswers small{font-size:9px}.quickAnswers b{font-size:12px}.section{padding:78px 18px}.sectionHead h2{font-size:34px}.sectionHead{gap:18px;margin-bottom:28px}.serviceGrid{grid-template-columns:1fr}.serviceCard{min-height:310px}.realSection{padding:78px 18px}.realCopy h2{font-size:35px}.photoMosaic{grid-template-rows:150px 150px}.guideGrid{grid-template-columns:1fr}.guideGrid article{min-height:180px}.blogCta{align-items:flex-start;flex-direction:column;padding:24px}.blogCta a{width:100%;text-align:center}.stepsSection{padding:72px 18px}.stepsInner h2{font-size:36px}.centerButtons{flex-direction:column}.centerButtons a{width:100%}.faqGrid summary{font-size:13px}.footer{grid-template-columns:1fr;padding:48px 18px 92px}.footerLinks{gap:12px}.mobileBar{position:fixed;z-index:50;left:10px;right:10px;bottom:10px;display:grid;grid-template-columns:1.25fr .75fr;background:#111814;border:1px solid rgba(255,255,255,.1);box-shadow:0 12px 40px rgba(0,0,0,.35);padding:7px;border-radius:16px}.mobileBar a{padding:13px 10px;text-align:center;border-radius:11px;font-size:12px;font-weight:900;color:#fff!important}.mobileBar a:first-child{background:#f7e34d;color:#161616!important}.mobileBar a:last-child{background:#27332d}}
      `}</style>
    </main>
  );
}
