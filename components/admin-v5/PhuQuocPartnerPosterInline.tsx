"use client";

import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";

type PosterLanguage = "ru" | "en";

type Props = {
  partnerCode: string;
  language: PosterLanguage;
  partnerLink: string;
};

const PHONE = "+84 937 762 607";

function safeCode(value: string) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_-]/g, "-");
}

export default function PhuQuocPartnerPosterInline({
  partnerCode,
  language,
  partnerLink,
}: Props) {
  const posterRef = useRef<HTMLDivElement | null>(null);
  const [busy, setBusy] = useState(false);

  const code = safeCode(partnerCode);
  const ready = Boolean(code);
  const ru = language === "ru";

  const t = ru
    ? {
        title: "Экскурсии на Фукуоке",
        subtitle: "Индивидуальные и групповые туры",
        support: "Поддержка на русском и английском",
        f1: "Островные туры",
        f2: "Снорклинг и рыбалка",
        f3: "Быстрое бронирование",
        f4: "Надёжная поддержка",
        scan: "Сканируйте QR, чтобы посмотреть все туры и цены",
        cta: "Бронируйте здесь",
        code: "Код партнёра",
        footer: "Фукуок • Вьетнам • GoVietStay",
      }
    : {
        title: "Phu Quoc Tours",
        subtitle: "Private & join-in experiences",
        support: "Russian / English support",
        f1: "Island tours",
        f2: "Snorkeling & fishing",
        f3: "Fast WhatsApp booking",
        f4: "Trusted local support",
        scan: "Scan to view all tours & prices",
        cta: "Book here",
        code: "Partner code",
        footer: "Phu Quoc • Vietnam • GoVietStay",
      };

  async function renderPng() {
    if (!posterRef.current || !ready) return null;
    return await toPng(posterRef.current, {
      pixelRatio: 2.4,
      cacheBust: true,
      backgroundColor: "#ffffff",
      style: {
        transform: "none",
      },
    });
  }

  async function downloadPng() {
    setBusy(true);
    try {
      const dataUrl = await renderPng();
      if (!dataUrl) return;
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `GoVietStay-PhuQuoc-${code}-${language.toUpperCase()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error(e);
      window.alert("Không tạo được PNG. Hãy thử lại sau khi QR hiển thị.");
    } finally {
      setBusy(false);
    }
  }

  async function printA4() {
    setBusy(true);
    try {
      const dataUrl = await renderPng();
      if (!dataUrl) return;
      const w = window.open("", "_blank", "width=900,height=1200");
      if (!w) {
        window.alert("Trình duyệt đang chặn cửa sổ in. Hãy cho phép pop-up cho GoVietStay.");
        return;
      }
      w.document.write(`<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>GoVietStay Phu Quoc Partner Poster</title>
<style>
@page { size: A4 portrait; margin: 0; }
html, body { margin: 0; padding: 0; background: #fff; }
body { display: grid; place-items: center; }
img { display: block; width: 210mm; height: 297mm; object-fit: contain; }
</style>
</head>
<body>
<img src="${dataUrl}" onload="setTimeout(()=>window.print(),350)" />
</body>
</html>`);
      w.document.close();
    } catch (e) {
      console.error(e);
      window.alert("Không mở được chế độ in poster.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      style={{
        marginTop: 18,
        paddingTop: 18,
        borderTop: "1px solid #e4e7ec",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontWeight: 900, fontSize: 18, color: "#101828" }}>
            Partner Poster · Phú Quốc
          </div>
          <div className="gva-mini">
            Nhập Partner code phía trên → poster + QR tự đổi theo partner và ngôn ngữ.
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            type="button"
            className="gva-btn secondary"
            disabled={!ready || busy}
            onClick={downloadPng}
          >
            {busy ? "Đang tạo…" : "Tải PNG"}
          </button>
          <button
            type="button"
            className="gva-btn secondary"
            disabled={!ready || busy}
            onClick={printA4}
          >
            In / PDF A4
          </button>
        </div>
      </div>

      {!ready && (
        <div
          style={{
            border: "1px dashed #98a2b3",
            borderRadius: 14,
            padding: 20,
            textAlign: "center",
            color: "#667085",
            background: "#fcfcfd",
          }}
        >
          Nhập Partner code, ví dụ <b>DUYTINH01</b>, để poster được tạo tự động.
        </div>
      )}

      {ready && (
        <div
          style={{
            overflowX: "auto",
            paddingBottom: 4,
          }}
        >
          <div
            ref={posterRef}
            style={{
              width: 620,
              height: 877,
              margin: "0 auto",
              position: "relative",
              overflow: "hidden",
              background:
                "linear-gradient(180deg,#ffffff 0%,#ffffff 55%,#dff8fb 55%,#7ed6e7 78%,#fff7df 78%,#ffffff 100%)",
              color: "#082f49",
              fontFamily: "Arial, Helvetica, sans-serif",
              borderRadius: 18,
              border: "1px solid #d0d5dd",
              boxShadow: "0 12px 28px rgba(8,47,73,.14)",
            }}
          >
            {/* Tropical background shapes */}
            <div
              style={{
                position: "absolute",
                left: -85,
                top: 495,
                width: 280,
                height: 150,
                borderRadius: "50%",
                background: "#12806f",
                transform: "rotate(-10deg)",
                opacity: 0.92,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: -100,
                top: 515,
                width: 320,
                height: 160,
                borderRadius: "50%",
                background: "#1c8b70",
                transform: "rotate(8deg)",
                opacity: 0.92,
              }}
            />
            <div style={{ position: "absolute", left: 4, top: 465, fontSize: 90 }}>🌴</div>
            <div style={{ position: "absolute", right: 0, top: 475, fontSize: 90 }}>🌴</div>

            <div style={{ position: "relative", padding: "26px 30px 0", textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: "50%",
                    border: "4px solid #082f49",
                    background:
                      "linear-gradient(145deg,#f59e0b 0 43%,#16a085 43% 72%,#082f49 72%)",
                    display: "grid",
                    placeItems: "center",
                    color: "#fff",
                    fontWeight: 950,
                    fontSize: 16,
                  }}
                >
                  GVS
                </div>

                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 950, fontSize: 45, letterSpacing: -2, lineHeight: 0.95 }}>
                    <span>Go</span>
                    <span style={{ color: "#f59e0b" }}>Viet</span>
                    <span>Stay</span>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 16, fontWeight: 850 }}>
                    Trusted Local Support
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 24,
                  fontSize: ru ? 43 : 52,
                  lineHeight: 1.02,
                  fontWeight: 950,
                }}
              >
                {t.title}
              </div>

              <div
                style={{
                  marginTop: 8,
                  color: "#0f766e",
                  fontSize: 25,
                  fontWeight: 950,
                }}
              >
                {t.subtitle}
              </div>

              <div style={{ marginTop: 7, fontSize: 18, fontWeight: 850 }}>{t.support}</div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: 8,
                  marginTop: 22,
                }}
              >
                {[
                  ["🏝️", t.f1],
                  ["🤿", t.f2],
                  ["💬", t.f3],
                  ["🤝", t.f4],
                ].map(([icon, text]) => (
                  <div
                    key={text}
                    style={{
                      minHeight: 92,
                      padding: "10px 5px",
                      borderRadius: 14,
                      background: "rgba(245,252,252,.96)",
                      display: "grid",
                      alignContent: "center",
                      gap: 4,
                    }}
                  >
                    <div style={{ fontSize: 32 }}>{icon}</div>
                    <div style={{ fontWeight: 900, fontSize: 13, lineHeight: 1.1 }}>{text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                position: "relative",
                width: 370,
                minHeight: 330,
                margin: "15px auto 0",
                padding: "16px 18px 14px",
                border: "7px solid #082f49",
                borderRadius: 22,
                background: "#fff",
                textAlign: "center",
                boxShadow: "0 8px 20px rgba(8,47,73,.18)",
              }}
            >
              <div style={{ fontSize: 17, fontWeight: 950, lineHeight: 1.12, marginBottom: 10 }}>
                {t.scan}
              </div>

              <div
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  background: "#fff",
                  padding: 8,
                  borderRadius: 12,
                }}
              >
                <QRCodeSVG value={partnerLink} size={205} level="H" includeMargin={false} />
              </div>

              <div
                style={{
                  marginTop: 10,
                  padding: "8px 12px",
                  borderRadius: 999,
                  background: "#eef6fb",
                  fontSize: 15,
                }}
              >
                {t.code}: <b style={{ fontSize: 19 }}>{code}</b>
              </div>

              <div
                style={{
                  marginTop: 6,
                  fontSize: 10,
                  color: "#667085",
                  wordBreak: "break-all",
                }}
              >
                {partnerLink}
              </div>
            </div>

            <div
              style={{
                position: "relative",
                width: 380,
                margin: "14px auto 0",
                padding: "13px 18px",
                borderRadius: 999,
                background: "#082f49",
                color: "#fff",
                textAlign: "center",
                fontWeight: 950,
                fontSize: 24,
              }}
            >
              📅 &nbsp; {t.cta} &nbsp; ›
            </div>

            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(255,255,255,.96)",
                borderTop: "1px solid #d7e7ee",
                padding: "15px 24px 13px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 22,
                  fontWeight: 900,
                  fontSize: 15,
                }}
              >
                <span>💚 WhatsApp: {PHONE}</span>
                <span>🌐 GoVietStay.com</span>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: 7,
                  color: "#667085",
                  fontSize: 10,
                  fontWeight: 850,
                  letterSpacing: 1.8,
                }}
              >
                {t.footer.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
