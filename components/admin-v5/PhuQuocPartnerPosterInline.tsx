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

function normalizeCode(value: string) {
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
  const ref = useRef<HTMLDivElement | null>(null);
  const [busy, setBusy] = useState(false);

  const code = normalizeCode(partnerCode);
  const ready = Boolean(code);
  const isRu = language === "ru";

  const c = isRu
    ? {
        title: "Экскурсии на Фукуоке",
        subtitle: "Индивидуальные и групповые туры",
        support: "Поддержка на русском языке",
        island: "Островные туры",
        snorkel: "Снорклинг и рыбалка",
        whatsapp: "Быстрое бронирование в WhatsApp",
        trusted: "Надёжная местная поддержка",
        scan: "Сканируйте QR, чтобы посмотреть все туры и цены",
        partner: "Код партнёра",
        cta: "Бронируйте здесь",
        footer: "ФУКУОК • ВЬЕТНАМ • GOVIETSTAY",
      }
    : {
        title: "Phu Quoc Tours",
        subtitle: "Private & join-in experiences",
        support: "English support",
        island: "Island tours",
        snorkel: "Snorkeling & fishing",
        whatsapp: "Fast WhatsApp booking",
        trusted: "Trusted local support",
        scan: "Scan to view all tours & prices",
        partner: "Partner code",
        cta: "Book here",
        footer: "PHU QUOC • VIETNAM • GOVIETSTAY",
      };

  async function makePng() {
    if (!ref.current || !ready) return null;
    return toPng(ref.current, {
      pixelRatio: 2.5,
      cacheBust: true,
      backgroundColor: "#ffffff",
    });
  }

  async function downloadPng() {
    if (!ready) return;
    setBusy(true);
    try {
      const data = await makePng();
      if (!data) return;
      const a = document.createElement("a");
      a.href = data;
      a.download = `GoVietStay-PhuQuoc-${code}-${language.toUpperCase()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error(e);
      window.alert("Không tạo được PNG. Hãy thử lại.");
    } finally {
      setBusy(false);
    }
  }

  async function printA4() {
    if (!ready) return;
    setBusy(true);
    try {
      const data = await makePng();
      if (!data) return;
      const w = window.open("", "_blank", "width=900,height=1200");
      if (!w) {
        window.alert("Hãy cho phép pop-up để in poster.");
        return;
      }
      w.document.write(`<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<title>GoVietStay Partner Poster</title>
<style>
@page{size:A4 portrait;margin:0}
html,body{margin:0;padding:0;background:#fff}
body{display:grid;place-items:center}
img{width:210mm;height:297mm;object-fit:contain;display:block}
</style>
</head>
<body>
<img src="${data}" onload="setTimeout(()=>window.print(),350)"/>
</body>
</html>`);
      w.document.close();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid #e4e7ec" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontWeight: 900, fontSize: 18, color: "#101828" }}>
            Partner Poster · Phú Quốc
          </div>
          <div className="gva-mini">
            1 mẫu Russian hoặc 1 mẫu English theo lựa chọn Landing language.
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

      {!ready ? (
        <div
          style={{
            padding: 18,
            border: "1px dashed #98a2b3",
            borderRadius: 14,
            textAlign: "center",
            background: "#fcfcfd",
            color: "#667085",
          }}
        >
          Nhập Partner code ở phía trên để poster tự xuất hiện.
        </div>
      ) : (
        <div style={{ overflowX: "auto", paddingBottom: 4 }}>
          <div
            ref={ref}
            style={{
              width: 620,
              height: 877,
              maxWidth: "100%",
              margin: "0 auto",
              position: "relative",
              overflow: "hidden",
              background:
                "linear-gradient(180deg,#ffffff 0%,#ffffff 51%,#e6f8fb 51%,#93dfea 75%,#fff7e2 75%,#ffffff 100%)",
              borderRadius: 18,
              border: "1px solid #d0d5dd",
              boxShadow: "0 10px 30px rgba(8,47,73,.15)",
              color: "#0b2f49",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {/* decorative tropical blocks, based on the approved poster sample */}
            <div style={{ position: "absolute", left: -65, top: 505, width: 235, height: 145, borderRadius: "50%", background: "#147d6e", transform: "rotate(-12deg)", opacity: .94 }} />
            <div style={{ position: "absolute", right: -80, top: 520, width: 275, height: 155, borderRadius: "50%", background: "#1a8c72", transform: "rotate(10deg)", opacity: .94 }} />
            <div style={{ position: "absolute", left: 6, top: 485, fontSize: 78 }}>🌴</div>
            <div style={{ position: "absolute", right: 4, top: 490, fontSize: 78 }}>🌴</div>

            <div style={{ position: "relative", padding: "26px 30px 0", textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 11 }}>
                <div
                  style={{
                    width: 66,
                    height: 66,
                    borderRadius: "50%",
                    border: "4px solid #0b2f49",
                    display: "grid",
                    placeItems: "center",
                    background: "linear-gradient(145deg,#f5a623 0 43%,#0f8b77 43% 72%,#0b2f49 72%)",
                    color: "#fff",
                    fontWeight: 950,
                    fontSize: 15,
                  }}
                >
                  GVS
                </div>

                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 44, fontWeight: 950, lineHeight: .95, letterSpacing: -2 }}>
                    <span>Go</span>
                    <span style={{ color: "#f59e0b" }}>Viet</span>
                    <span>Stay</span>
                  </div>
                  <div style={{ marginTop: 6, fontWeight: 850, fontSize: 15 }}>
                    Trusted Local Support
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 22, fontSize: isRu ? 43 : 55, lineHeight: 1.02, fontWeight: 950 }}>
                {c.title}
              </div>

              <div style={{ marginTop: 7, color: "#0f766e", fontSize: 25, fontWeight: 950 }}>
                {c.subtitle}
              </div>

              <div style={{ marginTop: 6, fontSize: 18, fontWeight: 850 }}>{c.support}</div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 21 }}>
                {[
                  ["🏝️", c.island],
                  ["🤿", c.snorkel],
                  ["💬", c.whatsapp],
                  ["🤝", c.trusted],
                ].map(([icon, label]) => (
                  <div
                    key={label}
                    style={{
                      minHeight: 92,
                      borderRadius: 14,
                      background: "rgba(248,253,253,.96)",
                      display: "grid",
                      alignContent: "center",
                      gap: 4,
                      padding: "9px 5px",
                    }}
                  >
                    <div style={{ fontSize: 31 }}>{icon}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.1, fontWeight: 900 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                position: "relative",
                width: 375,
                minHeight: 334,
                margin: "15px auto 0",
                background: "#fff",
                border: "7px solid #0b2f49",
                borderRadius: 23,
                textAlign: "center",
                padding: "15px 18px 13px",
                boxShadow: "0 8px 20px rgba(8,47,73,.18)",
              }}
            >
              <div style={{ fontSize: 17, fontWeight: 950, lineHeight: 1.12, marginBottom: 10 }}>
                {c.scan}
              </div>

              <div style={{ display: "inline-grid", placeItems: "center", padding: 8, background: "#fff", borderRadius: 10 }}>
                <QRCodeSVG value={partnerLink} size={205} level="H" includeMargin={false} />
              </div>

              <div style={{ marginTop: 9, background: "#edf5fa", borderRadius: 999, padding: "8px 12px", fontSize: 15 }}>
                {c.partner}: <b style={{ fontSize: 19 }}>{code}</b>
              </div>

              <div style={{ marginTop: 6, fontSize: 10, color: "#667085", wordBreak: "break-all" }}>
                {partnerLink}
              </div>
            </div>

            <div
              style={{
                position: "relative",
                width: 385,
                margin: "14px auto 0",
                borderRadius: 999,
                padding: "13px 18px",
                background: "#0b2f49",
                color: "#fff",
                textAlign: "center",
                fontSize: 24,
                fontWeight: 950,
              }}
            >
              📅 &nbsp; {c.cta} &nbsp; ›
            </div>

            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                padding: "15px 24px 13px",
                background: "rgba(255,255,255,.96)",
                borderTop: "1px solid #d8e7ee",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", gap: 22, alignItems: "center", fontSize: 15, fontWeight: 900 }}>
                <span>💚 WhatsApp: {PHONE}</span>
                <span>🌐 GoVietStay.com</span>
              </div>
              <div style={{ textAlign: "center", marginTop: 7, fontSize: 10, fontWeight: 850, letterSpacing: 1.7, color: "#667085" }}>
                {c.footer}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
