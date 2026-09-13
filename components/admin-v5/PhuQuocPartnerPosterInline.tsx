"use client";

import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";

type PosterLanguage = "ru" | "en";
type Props = { partnerCode: string; language: PosterLanguage; partnerLink: string };

const PHONE = "+84 937 762 607";
const LOGO = "/brand/govietstay-official-logo.jpg";
const HERO = "/phu-quoc/ru-cluster/hero-islands.png";
const SUNSET = "/phu-quoc/ru-cluster/hero-sunset.png";

function safeCode(value: string) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "-");
}

export default function PhuQuocPartnerPosterInline({ partnerCode, language, partnerLink }: Props) {
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
        cta: "Смотреть туры",
        code: "Код партнёра",
        footer: "Фукуок • Вьетнам • GoVietStay",
      }
    : {
        title: "Phu Quoc Tours",
        subtitle: "Private & join-in experiences",
        support: "Russian / English support",
        f1: "Island tours",
        f2: "Snorkeling & fishing",
        f3: "Fast booking",
        f4: "Trusted local support",
        scan: "Scan the QR to view all tours and prices",
        cta: "View tours",
        code: "Partner code",
        footer: "Phu Quoc • Vietnam • GoVietStay",
      };

  async function renderPng() {
    if (!posterRef.current || !ready) return null;
    return toPng(posterRef.current, {
      pixelRatio: 2.5,
      cacheBust: true,
      backgroundColor: "#ffffff",
      style: { transform: "none" },
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
      window.alert("Không tạo được PNG. Hãy thử lại sau khi ảnh và QR hiển thị đầy đủ.");
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
      w.document.write(`<!doctype html><html><head><meta charset="utf-8"/><title>GoVietStay Phu Quoc Partner Poster</title><style>@page{size:A4 portrait;margin:0}html,body{margin:0;padding:0;background:#fff}body{display:grid;place-items:center}img{display:block;width:210mm;height:297mm;object-fit:contain}</style></head><body><img src="${dataUrl}" onload="setTimeout(()=>window.print(),350)"/></body></html>`);
      w.document.close();
    } catch (e) {
      console.error(e);
      window.alert("Không mở được chế độ in poster.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid #e4e7ec" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 18, color: "#101828" }}>Partner Poster · Phú Quốc</div>
          <div className="gva-mini">Logo thật + ảnh Phú Quốc + QR tự đổi theo partner và ngôn ngữ.</div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" className="gva-btn secondary" disabled={!ready || busy} onClick={downloadPng}>{busy ? "Đang tạo…" : "Tải PNG"}</button>
          <button type="button" className="gva-btn secondary" disabled={!ready || busy} onClick={printA4}>In / PDF A4</button>
        </div>
      </div>

      {!ready && (
        <div style={{ border: "1px dashed #98a2b3", borderRadius: 14, padding: 20, textAlign: "center", color: "#667085", background: "#fcfcfd" }}>
          Nhập Partner code, ví dụ <b>DUYTINH01</b>, để poster được tạo tự động.
        </div>
      )}

      {ready && (
        <div style={{ overflowX: "auto", paddingBottom: 4 }}>
          <div ref={posterRef} style={{ width: 620, height: 877, margin: "0 auto", position: "relative", overflow: "hidden", background: "#fff", color: "#082f49", fontFamily: "Arial, Helvetica, sans-serif", borderRadius: 18, border: "1px solid #d0d5dd", boxShadow: "0 12px 28px rgba(8,47,73,.14)" }}>
            <img src={HERO} alt="Phu Quoc" style={{ position: "absolute", inset: 0, width: "100%", height: 360, objectFit: "cover", objectPosition: "center" }} />
            <div style={{ position: "absolute", inset: "0 0 auto 0", height: 360, background: "linear-gradient(180deg,rgba(4,30,55,.16) 0%,rgba(4,30,55,.35) 58%,rgba(4,30,55,.86) 100%)" }} />

            <div style={{ position: "relative", zIndex: 2, padding: "18px 28px 0", textAlign: "center" }}>
              <div style={{ width: 320, margin: "0 auto", background: "rgba(255,255,255,.97)", borderRadius: 16, padding: "8px 15px", boxShadow: "0 6px 22px rgba(0,0,0,.16)" }}>
                <img src={LOGO} alt="GoVietStay" style={{ display: "block", width: "100%", height: 76, objectFit: "contain" }} />
              </div>
              <div style={{ marginTop: 20, color: "#fff", textShadow: "0 3px 12px rgba(0,0,0,.45)", fontSize: ru ? 43 : 51, lineHeight: 1.02, fontWeight: 950 }}>{t.title}</div>
              <div style={{ marginTop: 8, color: "#f7d36a", textShadow: "0 2px 10px rgba(0,0,0,.45)", fontSize: 24, fontWeight: 950 }}>{t.subtitle}</div>
              <div style={{ marginTop: 8, color: "#fff", fontSize: 17, fontWeight: 850, textShadow: "0 2px 8px rgba(0,0,0,.45)" }}>{t.support}</div>
            </div>

            <div style={{ position: "absolute", left: 0, right: 0, top: 330, bottom: 0, background: "linear-gradient(180deg,#fff 0%,#f7fbfc 68%,#eef8f7 100%)", borderRadius: "28px 28px 0 0" }} />

            <div style={{ position: "relative", zIndex: 3, marginTop: 35, padding: "0 26px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {[["🏝️", t.f1],["🤿", t.f2],["💬", t.f3],["🤝", t.f4]].map(([icon,text]) => (
                  <div key={text} style={{ minHeight: 88, padding: "10px 5px", borderRadius: 14, background: "#fff", border: "1px solid #dcebed", boxShadow: "0 5px 14px rgba(8,47,73,.06)", display: "grid", alignContent: "center", gap: 4, textAlign: "center" }}>
                    <div style={{ fontSize: 29 }}>{icon}</div>
                    <div style={{ fontWeight: 900, fontSize: 12.5, lineHeight: 1.1 }}>{text}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: 18, alignItems: "stretch", marginTop: 16 }}>
                <div style={{ padding: 14, border: "5px solid #0b3655", borderRadius: 20, background: "#fff", textAlign: "center", boxShadow: "0 7px 18px rgba(8,47,73,.12)" }}>
                  <div style={{ fontSize: 14, fontWeight: 950, lineHeight: 1.15, marginBottom: 8 }}>{t.scan}</div>
                  <div style={{ display: "inline-grid", placeItems: "center", background: "#fff", padding: 6, borderRadius: 10 }}>
                    <QRCodeSVG value={partnerLink} size={175} level="H" includeMargin={false} />
                  </div>
                </div>

                <div style={{ position: "relative", overflow: "hidden", borderRadius: 20, minHeight: 245, boxShadow: "0 7px 18px rgba(8,47,73,.12)" }}>
                  <img src={SUNSET} alt="Phu Quoc sunset" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(4,30,55,.12),rgba(4,30,55,.72))" }} />
                  <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, color: "#fff", textAlign: "left" }}>
                    <div style={{ fontSize: 13, opacity: .92 }}>{t.code}</div>
                    <div style={{ fontSize: 25, fontWeight: 950, letterSpacing: 1 }}>{code}</div>
                    <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 999, background: "#f5c24f", color: "#082f49", fontWeight: 950, textAlign: "center", fontSize: 17 }}>{t.cta} ›</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 12, padding: "9px 14px", borderRadius: 12, background: "#edf6f8", color: "#516675", fontSize: 9.5, wordBreak: "break-all", textAlign: "center" }}>{partnerLink}</div>
            </div>

            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 4, background: "#082f49", color: "#fff", padding: "13px 22px 12px" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, fontWeight: 900, fontSize: 14 }}><span>WhatsApp: {PHONE}</span><span>GoVietStay.com</span></div>
              <div style={{ textAlign: "center", marginTop: 5, color: "#c8d9e4", fontSize: 9, fontWeight: 850, letterSpacing: 1.6 }}>{t.footer.toUpperCase()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
