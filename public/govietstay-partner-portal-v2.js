/**
 * GoVietStay Partner Portal V2
 * Languages: Russian / Vietnamese / English / Korean
 * Mobile-first enhancement layer.
 * Keeps booking/database logic untouched.
 */
(function () {
  "use strict";

  const LANGS = ["ru", "vi", "en", "ko"];
  const LANG_META = {
    ru: { label: "Русский", short: "RU", flag: "🇷🇺" },
    vi: { label: "Tiếng Việt", short: "VI", flag: "🇻🇳" },
    en: { label: "English", short: "EN", flag: "🇬🇧" },
    ko: { label: "한국어", short: "KO", flag: "🇰🇷" },
  };

  const EXACT = {
    "Партнёрский кабинет": {
      vi: "Cổng thông tin Đối tác",
      en: "Partner Portal",
      ko: "파트너 포털"
    },
    "Прозрачные правила · прозрачный учёт · прозрачный доход": {
      vi: "Quy định minh bạch · Theo dõi minh bạch · Thu nhập rõ ràng",
      en: "Transparent rules · Transparent tracking · Transparent earnings",
      ko: "투명한 운영 · 정확한 실적 관리 · 명확한 파트너 수익"
    },
    "Как мы работаем": {
      vi: "Cách chúng tôi vận hành",
      en: "How it works",
      ko: "운영 방식"
    },
    "Создать бронирование": {
      vi: "Tạo booking",
      en: "Create booking",
      ko: "예약 등록"
    },
    "Используйте эту форму для прямой продажи у стойки.": {
      vi: "Sử dụng biểu mẫu này cho booking trực tiếp tại quầy.",
      en: "Use this form for direct bookings at the counter.",
      ko: "카운터에서 직접 예약을 등록할 때 이 양식을 사용하세요."
    },
    "Тур": { vi: "Tour / Dịch vụ", en: "Tour / Service", ko: "투어 / 서비스" },
    "Дата тура": { vi: "Ngày tour", en: "Tour date", ko: "투어 날짜" },
    "Имя клиента": { vi: "Tên khách", en: "Customer name", ko: "고객명" },
    "WhatsApp / телефон": { vi: "WhatsApp / điện thoại", en: "WhatsApp / phone", ko: "WhatsApp / 전화번호" },
    "Взрослые": { vi: "Người lớn", en: "Adults", ko: "성인" },
    "Дети": { vi: "Trẻ em", en: "Children", ko: "아동" },
    "Язык гида": { vi: "Ngôn ngữ HDV", en: "Guide language", ko: "가이드 언어" },
    "Отель": { vi: "Khách sạn", en: "Hotel", ko: "호텔" },
    "Статус": { vi: "Trạng thái", en: "Status", ko: "상태" },
    "Статус:": { vi: "Trạng thái:", en: "Status:", ko: "상태:" },
    "Код партнёра": { vi: "Mã đối tác", en: "Partner code", ko: "파트너 코드" },
    "Код партнёра:": { vi: "Mã đối tác:", en: "Partner code:", ko: "파트너 코드:" },
    "Рынок": { vi: "Thị trường", en: "Market", ko: "시장" },
    "Рынок:": { vi: "Thị trường:", en: "Market:", ko: "시장:" },
    "Дата начала": { vi: "Ngày bắt đầu", en: "Start date", ko: "시작일" },
    "Дата начала:": { vi: "Ngày bắt đầu:", en: "Start date:", ko: "시작일:" },
    "Условия": { vi: "Điều khoản", en: "Terms", ko: "조건" },
    "Условия:": { vi: "Điều khoản:", en: "Terms:", ko: "조건:" },
    "версия 1.0": { vi: "phiên bản 1.0", en: "version 1.0", ko: "버전 1.0" },
    "30 дней": { vi: "30 ngày", en: "30 days", ko: "30일" },
    "7 дней": { vi: "7 ngày", en: "7 days", ko: "7일" },
    "90 дней": { vi: "90 ngày", en: "90 days", ko: "90일" },
    "ready": { vi: "sẵn sàng", en: "ready", ko: "준비 완료" },
    "pending": { vi: "đang chờ", en: "pending", ko: "대기" },
    "confirmed": { vi: "đã xác nhận", en: "confirmed", ko: "확정" },
    "completed": { vi: "hoàn thành", en: "completed", ko: "완료" },
    "cancelled": { vi: "đã hủy", en: "cancelled", ko: "취소" },
    "Airport Transfer": { vi: "Đón / tiễn sân bay", en: "Airport Transfer", ko: "공항 픽업 / 샌딩" },
    "Russian-speaking travelers": { vi: "Khách du lịch nói tiếng Nga", en: "Russian-speaking travelers", ko: "러시아어권 여행객" },
    "Vietnamese-speaking travelers": { vi: "Khách du lịch Việt Nam", en: "Vietnamese-speaking travelers", ko: "베트남 여행객" },
    "Korean-speaking travelers": { vi: "Khách du lịch Hàn Quốc", en: "Korean-speaking travelers", ko: "한국인 여행객" },
    "English-speaking travelers": { vi: "Khách du lịch nói tiếng Anh", en: "English-speaking travelers", ko: "영어권 여행객" },
    "Русский (RU)": { vi: "Tiếng Nga (RU)", en: "Russian (RU)", ko: "러시아어 (RU)" },
    "Английский (EN)": { vi: "Tiếng Anh (EN)", en: "English (EN)", ko: "영어 (EN)" },
    "Вьетнамский (VI)": { vi: "Tiếng Việt (VI)", en: "Vietnamese (VI)", ko: "베트남어 (VI)" },
    "Корейский (KO)": { vi: "Tiếng Hàn (KO)", en: "Korean (KO)", ko: "한국어 (KO)" },
    "Комиссия": { vi: "Hoa hồng", en: "Commission", ko: "파트너 수수료" },
    "Доход": { vi: "Thu nhập", en: "Earnings", ko: "파트너 수익" },
    "Всего PAX": { vi: "Tổng PAX", en: "Total PAX", ko: "총 이용객 수" },
    "Бронирования": { vi: "Booking", en: "Bookings", ko: "예약" },
    "Сегодня": { vi: "Hôm nay", en: "Today", ko: "오늘" },
    "Клиент": { vi: "Khách hàng", en: "Customer", ko: "고객" },
    "Цена": { vi: "Giá", en: "Price", ko: "가격" },
    "Итого": { vi: "Tổng", en: "Total", ko: "합계" },
    "Примечание": { vi: "Ghi chú", en: "Notes", ko: "메모" },
    "Отправить": { vi: "Gửi booking", en: "Submit booking", ko: "예약 등록" },
    "Сохранить": { vi: "Lưu", en: "Save", ko: "저장" }
  };

  const SENTENCES = [
    {
      ru: "1. Вы находите клиента и отправляете свою персональную ссылку или QR.",
      vi: "1. Bạn giới thiệu khách và gửi link cá nhân hoặc QR của mình.",
      en: "1. You find a customer and send your personal link or QR code.",
      ko: "1. 고객을 찾고 개인 링크 또는 QR 코드를 전달합니다."
    },
    {
      ru: "2. GoVietStay принимает клиента и ведёт весь сервис: консультация, подтверждение, транспорт, гид, сопровождение.",
      vi: "2. GoVietStay tiếp nhận khách và phụ trách toàn bộ dịch vụ: tư vấn, xác nhận, xe, hướng dẫn viên và hỗ trợ trong chuyến đi.",
      en: "2. GoVietStay takes over the customer journey: consultation, confirmation, transport, guide and trip support.",
      ko: "2. GoVietStay가 상담, 예약 확정, 교통, 가이드 및 여행 지원까지 전체 서비스를 담당합니다."
    },
    {
      ru: "3. Система фиксирует переход, обращение, бронирование и PAX за вашим кодом.",
      vi: "3. Hệ thống ghi nhận lượt truy cập, yêu cầu, booking và PAX theo mã đối tác của bạn.",
      en: "3. The system attributes visits, enquiries, bookings and PAX to your partner code.",
      ko: "3. 시스템이 방문, 문의, 예약 및 PAX를 파트너 코드에 자동 기록합니다."
    },
    {
      ru: "4. Ваш доход = базовая выплата по месячному PAX + комиссия за каждый подтверждённый PAX.",
      vi: "4. Thu nhập của bạn = khoản thanh toán cơ bản theo PAX tháng + hoa hồng cho mỗi PAX được xác nhận.",
      en: "4. Your earnings = base payout based on monthly PAX + commission for each confirmed PAX.",
      ko: "4. 파트너 수익 = 월간 PAX 기준 기본 지급액 + 확정된 각 PAX의 수수료입니다."
    },
    {
      ru: "5. Все спорные случаи сверяются по данным системы GoVietStay.",
      vi: "5. Mọi trường hợp cần đối chiếu đều dựa trên dữ liệu được ghi nhận trong hệ thống GoVietStay.",
      en: "5. Any disputed case is reconciled against GoVietStay system records.",
      ko: "5. 모든 확인 또는 이의 사항은 GoVietStay 시스템 기록을 기준으로 검토합니다."
    }
  ];

  const originalText = new WeakMap();
  let observer = null;
  let activeLang = "ru";
  let partnerCode = "";

  function normalize(s) {
    return String(s || "").replace(/\s+/g, " ").trim();
  }

  function detectPortal() {
    const t = document.body ? document.body.innerText : "";
    return t.includes("GOVIETSTAY PARTNER PORTAL") ||
           t.includes("Партнёрский кабинет") ||
           (location.pathname.toLowerCase().includes("partner") && /GoVietStay/i.test(t));
  }

  function getPartnerCode() {
    const text = document.body ? document.body.innerText : "";
    const patterns = [
      /Код партнёра:\s*([A-Z0-9_-]{3,})/i,
      /Partner code:\s*([A-Z0-9_-]{3,})/i,
      /Mã đối tác:\s*([A-Z0-9_-]{3,})/i,
      /파트너 코드:\s*([A-Z0-9_-]{3,})/i
    ];
    for (const p of patterns) {
      const m = text.match(p);
      if (m) return m[1].toUpperCase();
    }
    const el = document.querySelector("[data-partner-code]");
    return el ? String(el.getAttribute("data-partner-code") || "").toUpperCase() : "";
  }

  function storageKey() {
    return "gvs_partner_lang_v2:" + (partnerCode || "default");
  }

  function inferDefaultLang() {
    try {
      const qp = new URLSearchParams(location.search).get("lang");
      if (LANGS.includes(qp)) return qp;
    } catch (_) {}

    try {
      const saved = localStorage.getItem(storageKey());
      if (LANGS.includes(saved)) return saved;
    } catch (_) {}

    const explicit =
      document.body?.getAttribute("data-partner-language") ||
      document.documentElement?.getAttribute("data-partner-language");
    if (explicit && LANGS.includes(explicit.toLowerCase())) return explicit.toLowerCase();

    const text = (document.body?.innerText || "").toLowerCase();
    if (text.includes("korean-speaking") || text.includes("한국인 여행객") || text.includes("한국어권")) return "ko";
    if (text.includes("vietnamese-speaking") || text.includes("khách du lịch việt nam")) return "vi";
    if (text.includes("russian-speaking") || text.includes("русск")) return "ru";

    const path = location.pathname.toLowerCase();
    if (path.startsWith("/ko/") || path === "/ko") return "ko";
    if (path.startsWith("/vi/") || path === "/vi") return "vi";
    if (path.startsWith("/ru/") || path === "/ru") return "ru";
    return "en";
  }

  function targetExact(src, lang) {
    const n = normalize(src);
    const row = EXACT[n];
    if (!row) return null;
    return lang === "ru" ? n : (row[lang] || n);
  }

  function translateOriginal(src, lang) {
    if (lang === "ru") return src;
    const trimmed = normalize(src);
    if (!trimmed) return src;

    const exact = targetExact(trimmed, lang);
    if (exact !== null) {
      const lead = src.match(/^\s*/)?.[0] || "";
      const tail = src.match(/\s*$/)?.[0] || "";
      return lead + exact + tail;
    }

    for (const s of SENTENCES) {
      if (trimmed === s.ru) {
        const lead = src.match(/^\s*/)?.[0] || "";
        const tail = src.match(/\s*$/)?.[0] || "";
        return lead + s[lang] + tail;
      }
    }

    let out = src;

    const labelReplacements = {
      vi: [
        ["Код партнёра:", "Mã đối tác:"],
        ["Рынок:", "Thị trường:"],
        ["Статус:", "Trạng thái:"],
        ["Дата начала:", "Ngày bắt đầu:"],
        ["Условия:", "Điều khoản:"],
        ["версия 1.0", "phiên bản 1.0"]
      ],
      en: [
        ["Код партнёра:", "Partner code:"],
        ["Рынок:", "Market:"],
        ["Статус:", "Status:"],
        ["Дата начала:", "Start date:"],
        ["Условия:", "Terms:"],
        ["версия 1.0", "version 1.0"]
      ],
      ko: [
        ["Код партнёра:", "파트너 코드:"],
        ["Рынок:", "시장:"],
        ["Статус:", "상태:"],
        ["Дата начала:", "시작일:"],
        ["Условия:", "조건:"],
        ["версия 1.0", "버전 1.0"]
      ]
    };

    for (const [a, b] of labelReplacements[lang]) out = out.split(a).join(b);

    const bookingPattern = /Используйте эту форму для прямой продажи у стойки\.\s*Ваш код\s+([A-Z0-9_-]+)\s+добавляется автоматически\./i;
    if (bookingPattern.test(out)) {
      const code = out.match(bookingPattern)?.[1] || partnerCode || "";
      const msg = {
        vi: `Sử dụng biểu mẫu này cho booking trực tiếp tại quầy. Mã ${code} của bạn được thêm tự động.`,
        en: `Use this form for direct bookings at the counter. Your code ${code} is added automatically.`,
        ko: `카운터에서 직접 예약을 등록할 때 이 양식을 사용하세요. 파트너 코드 ${code}는 자동으로 적용됩니다.`
      }[lang];
      out = out.replace(bookingPattern, msg);
    }

    return out;
  }

  function shouldSkip(node) {
    const p = node.parentElement;
    if (!p) return true;
    if (p.closest(".gvs-partner-lang-switch")) return true;
    if (["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE"].includes(p.tagName)) return true;
    return false;
  }

  function applyTextTranslations(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    for (const node of nodes) {
      if (shouldSkip(node)) continue;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue || "");
      const src = originalText.get(node) || "";
      const next = translateOriginal(src, activeLang);
      if (node.nodeValue !== next) node.nodeValue = next;
    }

    document.querySelectorAll("input, textarea").forEach((el) => {
      if (!el.dataset.gvsOriginalPlaceholder && el.getAttribute("placeholder")) {
        el.dataset.gvsOriginalPlaceholder = el.getAttribute("placeholder");
      }
      const ph = el.dataset.gvsOriginalPlaceholder;
      if (!ph) return;

      const dict = {
        "Ivan Petrov": {vi:"Nguyễn Văn A", en:"John Smith", ko:"홍길동"},
        "+7 / +84...": {vi:"+84...", en:"+84 / +7...", ko:"+82 / +84..."},
        "Hotel name": {vi:"Tên khách sạn", en:"Hotel name", ko:"호텔명"}
      };
      const row = dict[ph];
      if (row && activeLang !== "ru") el.setAttribute("placeholder", row[activeLang] || ph);
      else el.setAttribute("placeholder", ph);
    });
  }

  function makeSelector() {
    if (document.querySelector(".gvs-partner-lang-switch")) return;

    const wrap = document.createElement("div");
    wrap.className = "gvs-partner-lang-switch";
    wrap.setAttribute("aria-label", "Partner portal language");

    const globe = document.createElement("span");
    globe.className = "gvs-lang-globe";
    globe.textContent = "🌐";

    const select = document.createElement("select");
    select.className = "gvs-lang-select";
    select.setAttribute("aria-label", "Language");

    LANGS.forEach((code) => {
      const o = document.createElement("option");
      o.value = code;
      o.textContent = `${LANG_META[code].flag} ${LANG_META[code].label}`;
      select.appendChild(o);
    });

    select.value = activeLang;
    select.addEventListener("change", () => setLanguage(select.value));

    wrap.appendChild(globe);
    wrap.appendChild(select);

    const bodyText = document.body.innerText || "";
    let hero = null;
    for (const el of document.querySelectorAll("header, section, div")) {
      const txt = normalize(el.innerText || "");
      if (txt.includes("GOVIETSTAY PARTNER PORTAL") && txt.length < 1000) {
        hero = el;
        break;
      }
    }

    if (hero) {
      hero.classList.add("gvs-partner-hero");
      hero.appendChild(wrap);
    } else {
      wrap.classList.add("gvs-lang-floating");
      document.body.appendChild(wrap);
    }
  }

  function mobileEnhance() {
    document.body.classList.add("gvs-partner-v2");

    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement("meta");
      viewport.name = "viewport";
      viewport.content = "width=device-width, initial-scale=1, viewport-fit=cover";
      document.head.appendChild(viewport);
    }

    document.querySelectorAll("form").forEach((form) => {
      form.classList.add("gvs-partner-booking-form");
      form.querySelectorAll("*").forEach((el) => {
        try {
          const cs = getComputedStyle(el);
          if (cs.display === "grid") el.classList.add("gvs-mobile-grid");
        } catch (_) {}
      });
    });

    document.querySelectorAll("table").forEach((table) => {
      table.classList.add("gvs-partner-table");
      const p = table.parentElement;
      if (p) p.classList.add("gvs-partner-table-wrap");
    });

    document.querySelectorAll("input, select, textarea, button").forEach((el) => {
      el.classList.add("gvs-touch-control");
    });
  }

  function injectStyle() {
    if (document.getElementById("gvs-partner-v2-style")) return;
    const style = document.createElement("style");
    style.id = "gvs-partner-v2-style";
    style.textContent = `
      body.gvs-partner-v2 { overflow-x: hidden; }
      body.gvs-partner-v2 *, body.gvs-partner-v2 *::before, body.gvs-partner-v2 *::after { box-sizing: border-box; }
      body.gvs-partner-v2 img, body.gvs-partner-v2 svg { max-width: 100%; }
      body.gvs-partner-v2 .gvs-partner-hero { position: relative !important; }
      .gvs-partner-lang-switch {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 8px;
        border-radius: 12px;
        background: rgba(255,255,255,.10);
        border: 1px solid rgba(255,255,255,.20);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        z-index: 40;
      }
      .gvs-partner-hero > .gvs-partner-lang-switch {
        position: absolute;
        right: 18px;
        top: 18px;
      }
      .gvs-lang-floating {
        position: fixed;
        right: 16px;
        top: 16px;
        background: #112e52;
        box-shadow: 0 8px 30px rgba(0,0,0,.18);
      }
      .gvs-lang-globe { font-size: 18px; line-height: 1; }
      .gvs-lang-select {
        appearance: auto;
        -webkit-appearance: menulist;
        min-height: 38px;
        border: 0 !important;
        outline: 0;
        border-radius: 9px;
        padding: 6px 30px 6px 10px !important;
        background: #fff !important;
        color: #10294a !important;
        font: inherit;
        font-weight: 700;
        width: auto !important;
        max-width: 190px;
        cursor: pointer;
      }
      body.gvs-partner-v2 .gvs-touch-control {
        min-height: 44px;
      }
      body.gvs-partner-v2 input,
      body.gvs-partner-v2 select,
      body.gvs-partner-v2 textarea {
        font-size: 16px;
      }
      body.gvs-partner-v2 .gvs-partner-table-wrap {
        max-width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }

      @media (max-width: 720px) {
        body.gvs-partner-v2 {
          width: 100%;
          min-width: 0;
        }
        body.gvs-partner-v2 main,
        body.gvs-partner-v2 section,
        body.gvs-partner-v2 form {
          max-width: 100%;
        }
        body.gvs-partner-v2 .gvs-mobile-grid {
          grid-template-columns: minmax(0, 1fr) !important;
        }
        body.gvs-partner-v2 .gvs-partner-booking-form input,
        body.gvs-partner-v2 .gvs-partner-booking-form select,
        body.gvs-partner-v2 .gvs-partner-booking-form textarea,
        body.gvs-partner-v2 .gvs-partner-booking-form button {
          width: 100% !important;
          max-width: 100% !important;
        }
        body.gvs-partner-v2 .gvs-partner-hero {
          padding-top: 76px !important;
        }
        body.gvs-partner-v2 .gvs-partner-hero > .gvs-partner-lang-switch {
          top: 14px;
          right: 14px;
          left: auto;
        }
        .gvs-partner-lang-switch {
          padding: 5px 7px;
          gap: 5px;
        }
        .gvs-lang-select {
          min-height: 40px;
          max-width: 155px;
          font-size: 14px !important;
          padding-left: 8px !important;
        }
        body.gvs-partner-v2 .gvs-partner-table {
          display: block;
          width: 100%;
          min-width: 620px;
        }
        body.gvs-partner-v2 [class*="card"],
        body.gvs-partner-v2 [class*="panel"] {
          max-width: 100%;
        }
      }

      @media (max-width: 390px) {
        .gvs-lang-globe { display: none; }
        .gvs-lang-select { max-width: 142px; }
      }
    `;
    document.head.appendChild(style);
  }

  function setLanguage(lang) {
    if (!LANGS.includes(lang)) lang = "ru";
    activeLang = lang;
    try { localStorage.setItem(storageKey(), lang); } catch (_) {}

    const select = document.querySelector(".gvs-lang-select");
    if (select && select.value !== lang) select.value = lang;

    document.documentElement.setAttribute("lang", lang);
    applyTextTranslations(document.body);
  }

  function rescan() {
    mobileEnhance();
    makeSelector();
    applyTextTranslations(document.body);
  }

  function init() {
    if (!document.body || !detectPortal()) return;
    partnerCode = getPartnerCode();
    activeLang = inferDefaultLang();

    injectStyle();
    mobileEnhance();
    makeSelector();
    setLanguage(activeLang);

    let timer = null;
    observer = new MutationObserver((mutations) => {
      const selfOnly = mutations.every((m) => {
        const target = m.target && m.target.parentElement;
        return target && target.closest && target.closest(".gvs-partner-lang-switch");
      });
      if (selfOnly) return;
      clearTimeout(timer);
      timer = setTimeout(rescan, 80);
    });
    observer.observe(document.body, { subtree: true, childList: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
