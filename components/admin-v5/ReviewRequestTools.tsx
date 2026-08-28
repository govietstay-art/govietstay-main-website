"use client";

import { useEffect, useMemo, useState } from "react";

const GOOGLE_REVIEW_URL = "https://maps.app.goo.gl/5zPeJfqF7kodjQxn6?g_st=ic";
const STORAGE_KEY = "gvs_review_whatsapp_v1_opened";

type Props = {
  bookings: any[];
  contactMap: Record<string, any>;
  tourMap: Record<string, any>;
};

type LangCode = "ru" | "en" | "ko" | "zh-TW" | "vi";

const LANGUAGES: { value: LangCode; label: string }[] = [
  { value: "ru", label: "Русский" },
  { value: "en", label: "English" },
  { value: "ko", label: "한국어" },
  { value: "zh-TW", label: "繁體中文" },
  { value: "vi", label: "Tiếng Việt" },
];

function normalizePhone(value: string) {
  let digits = String(value || "").replace(/\D/g, "");
  if (/^0\d{8,10}$/.test(digits)) digits = "84" + digits.slice(1);
  return digits;
}

function normalizeLanguage(value: any): LangCode {
  const raw = String(value || "").trim().toLowerCase().replace("_", "-");
  if (raw.startsWith("ru") || raw.startsWith("kk") || raw.includes("russian")) return "ru";
  if (raw.startsWith("ko") || raw.includes("korean")) return "ko";
  if (raw === "zh-tw" || raw.startsWith("zh-hant") || raw.includes("traditional") || raw.includes("taiwan")) return "zh-TW";
  if (raw.startsWith("vi") || raw.includes("vietnam")) return "vi";
  return "en";
}

function greetingName(name: string, fallback: string) {
  return name.trim() || fallback;
}

function buildMessage(language: LangCode, nameRaw: string, tourRaw: string) {
  const name = nameRaw.trim();
  const tour = tourRaw.trim();

  if (language === "ru") {
    const who = greetingName(name, "друзья");
    const trip = tour ? ` во время поездки «${tour}»` : " во время вашей поездки";
    return `Здравствуйте, ${who} 😊

Спасибо, что выбрали GoVietStay${trip}. Для нас важно не просто организовать тур, а чтобы вы действительно чувствовали заботу и поддержку на протяжении всей поездки.

Если у вас будет одна свободная минута, будем очень благодарны за ваш честный отзыв в Google:
⭐ ${GOOGLE_REVIEW_URL}

Нам важны любые впечатления. Если что-то можно было сделать лучше, пожалуйста, скажите нам об этом. Мы готовы выслушать, взять ответственность и улучшить наш сервис.

Спасибо за ваше доверие ❤️
GoVietStay`;
  }

  if (language === "ko") {
    const who = name ? `${name}님` : "고객님";
    const trip = tour ? ` ${tour} 여행을` : " 여행을";
    return `안녕하세요, ${who} 😊

오늘 GoVietStay와 함께${trip} 해주셔서 진심으로 감사합니다. 저희에게 가장 중요한 것은 단순히 투어를 진행하는 것이 아니라, 여행하는 동안 편안하고 세심하게 케어받고 있다고 느끼시는 것입니다.

잠시 시간이 괜찮으시다면 이번 여행에 대한 솔직한 Google 후기를 남겨주시면 정말 감사하겠습니다:
⭐ ${GOOGLE_REVIEW_URL}

좋았던 점뿐만 아니라 아쉬웠던 점도 편하게 말씀해주세요. 부족한 부분이 있었다면 책임감을 가지고 확인하고 더 나은 서비스로 개선하겠습니다.

소중한 믿음에 감사드립니다 ❤️
GoVietStay`;
  }

  if (language === "zh-TW") {
    const who = name || "您好";
    const hello = name ? `您好，${who} 😊` : "您好 😊";
    const trip = tour ? `參加 ${tour}` : "與我們一起旅行";
    return `${hello}

謝謝您今天選擇 GoVietStay，${trip}。對我們來說，最重要的不只是完成一趟行程，而是希望您在旅途中真正感受到安心、被照顧，也留下美好的回憶。

如果您有一分鐘的時間，我們會非常感謝您分享這次旅程的真實 Google 評價：
⭐ ${GOOGLE_REVIEW_URL}

無論是滿意的地方，或是我們還可以做得更好的地方，都歡迎您誠實告訴我們。如果有任何服務沒有做好，我們願意認真傾聽、負起責任並持續改善。

謝謝您的信任 ❤️
GoVietStay`;
  }

  if (language === "vi") {
    const who = name || "bạn";
    const trip = tour ? ` trong hành trình ${tour}` : " trong chuyến đi vừa rồi";
    return `Xin chào ${who} 😊

Cảm ơn bạn đã tin tưởng lựa chọn GoVietStay${trip}. Điều quan trọng với chúng tôi không chỉ là hoàn thành một chuyến tour, mà là để bạn thật sự cảm thấy được quan tâm và hỗ trợ trong suốt hành trình.

Nếu bạn có một phút, chúng tôi rất trân trọng một đánh giá Google trung thực về trải nghiệm của bạn:
⭐ ${GOOGLE_REVIEW_URL}

Dù là điều bạn hài lòng hay điểm chúng tôi cần làm tốt hơn, hãy chia sẻ thẳng với chúng tôi. Nếu có điều gì chưa tốt, GoVietStay sẵn sàng lắng nghe, nhận trách nhiệm và cải thiện.

Cảm ơn bạn rất nhiều ❤️
GoVietStay`;
  }

  const who = name || "there";
  const trip = tour ? ` for your ${tour} experience` : " for your trip";
  return `Hi ${who} 😊

Thank you for choosing GoVietStay${trip}. What matters to us is not simply completing a tour, but making sure you genuinely feel cared for and supported throughout your journey.

If you have a minute, we'd truly appreciate your honest Google review:
⭐ ${GOOGLE_REVIEW_URL}

Your feedback matters to us — both what went well and what we could do better. If anything was not as it should have been, please tell us. We are always willing to listen, take responsibility, and improve.

Thank you for your trust ❤️
GoVietStay`;
}

function openedLabel(value?: string) {
  if (!value) return "Chưa mở";
  try {
    return new Date(value).toLocaleString("vi-VN");
  } catch {
    return "Đã mở";
  }
}

export default function ReviewRequestTools({ bookings, contactMap, tourMap }: Props) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [tour, setTour] = useState("");
  const [language, setLanguage] = useState<LangCode>("en");
  const [notice, setNotice] = useState("");
  const [opened, setOpened] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setOpened(JSON.parse(raw));
    } catch {}
  }, []);

  const preview = useMemo(() => buildMessage(language, name, tour), [language, name, tour]);

  const recentBookings = useMemo(
    () => (bookings || []).filter((b: any) => String(b.status || "").toLowerCase() !== "cancelled").slice(0, 50),
    [bookings]
  );

  function rememberOpened(key: string) {
    const next = { ...opened, [key]: new Date().toISOString() };
    setOpened(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }

  function openWhatsApp(values: {
    phone: string;
    name: string;
    tour: string;
    language: LangCode;
    key: string;
  }) {
    setNotice("");
    const digits = normalizePhone(values.phone);
    if (digits.length < 8) {
      setNotice("Số WhatsApp chưa hợp lệ. Hãy nhập số có mã quốc gia, ví dụ +7..., +82..., +886..., +84...");
      return;
    }
    const message = buildMessage(values.language, values.name, values.tour);
    const url = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    rememberOpened(values.key);
  }

  async function copyPreview() {
    try {
      await navigator.clipboard.writeText(preview);
      setNotice("Đã copy nội dung.");
    } catch {
      setNotice("Không copy tự động được trên trình duyệt này.");
    }
  }

  function loadBooking(b: any) {
    const c = contactMap[b.contact_id || ""] || {};
    const t = tourMap[b.tour_id || ""] || {};
    setPhone(c.whatsapp || "");
    setName(c.full_name || "");
    setTour(t.name || "");
    setLanguage(normalizeLanguage(c.preferred_language));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return <>
    <div className="gva-analytics-note">
      Review V1 dùng WhatsApp thủ công để giữ hệ thống đơn giản và an toàn. Admin tự soạn đúng ngôn ngữ, chèn sẵn link Google Review thật và mở WhatsApp. Hệ thống chỉ ghi “đã mở WhatsApp”, không giả định khách đã gửi hay đã review.
    </div>

    <div className="gva-grid2">
      <div className="gva-card">
        <div className="gva-section-head">
          <div>
            <h2>Gửi lời mời Review</h2>
            <div className="gva-mini">WhatsApp là trường bắt buộc. Tên và tour giúp tin nhắn cá nhân hơn.</div>
          </div>
        </div>

        <div className="gva-field">
          <label>Số WhatsApp</label>
          <input className="gva-input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 912 345 6789" />
        </div>

        <div className="gva-grid2">
          <div className="gva-field">
            <label>Tên khách</label>
            <input className="gva-input" value={name} onChange={e => setName(e.target.value)} placeholder="Anna" />
          </div>
          <div className="gva-field">
            <label>Ngôn ngữ</label>
            <select className="gva-select" value={language} onChange={e => setLanguage(e.target.value as LangCode)}>
              {LANGUAGES.map(x => <option key={x.value} value={x.value}>{x.label}</option>)}
            </select>
          </div>
        </div>

        <div className="gva-field">
          <label>Tour / trải nghiệm</label>
          <input className="gva-input" value={tour} onChange={e => setTour(e.target.value)} placeholder="Cham Island Tour" />
        </div>

        {notice && <div className="gva-msg" style={{ marginTop: 10 }}>{notice}</div>}

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
          <button
            type="button"
            className="gva-btn"
            onClick={() => openWhatsApp({
              phone,
              name,
              tour,
              language,
              key: `manual:${normalizePhone(phone)}`
            })}
          >
            Mở WhatsApp
          </button>
          <button type="button" className="gva-btn secondary" onClick={copyPreview}>Copy nội dung</button>
        </div>
      </div>

      <div className="gva-card">
        <h3>Nội dung khách sẽ nhận</h3>
        <div
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: 1.65,
            border: "1px solid rgba(148,163,184,.25)",
            borderRadius: 12,
            padding: 14,
            minHeight: 280
          }}
        >
          {preview}
        </div>
      </div>
    </div>

    <div className="gva-card" style={{ marginTop: 15 }}>
      <div className="gva-section-head">
        <div>
          <h2>Booking gần đây</h2>
          <div className="gva-mini">Lấy sẵn tên, WhatsApp, ngôn ngữ và tour từ dữ liệu booking hiện có.</div>
        </div>
      </div>

      <div className="gva-table-wrap">
        <table className="gva-table">
          <thead>
            <tr>
              <th>Booking</th>
              <th>Khách</th>
              <th>WhatsApp</th>
              <th>Ngôn ngữ</th>
              <th>Tour</th>
              <th>Review request</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((b: any) => {
              const c = contactMap[b.contact_id || ""] || {};
              const t = tourMap[b.tour_id || ""] || {};
              const lang = normalizeLanguage(c.preferred_language);
              const key = `booking:${b.id}`;
              return <tr key={b.id}>
                <td><b>{b.booking_code || "—"}</b><div className="gva-mini">{b.tour_date || ""}</div></td>
                <td>{c.full_name || "—"}</td>
                <td>{c.whatsapp || "—"}</td>
                <td>{LANGUAGES.find(x => x.value === lang)?.label || "English"}</td>
                <td>{t.name || "—"}</td>
                <td>{openedLabel(opened[key])}</td>
                <td>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button type="button" className="gva-btn secondary" onClick={() => loadBooking(b)}>Nạp</button>
                    <button
                      type="button"
                      className="gva-btn"
                      disabled={!c.whatsapp}
                      onClick={() => openWhatsApp({
                        phone: c.whatsapp || "",
                        name: c.full_name || "",
                        tour: t.name || "",
                        language: lang,
                        key
                      })}
                    >
                      WhatsApp
                    </button>
                  </div>
                </td>
              </tr>;
            })}
            {!recentBookings.length && <tr><td colSpan={7}><div className="gva-empty">Chưa có booking để gửi review.</div></td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  </>;
}
