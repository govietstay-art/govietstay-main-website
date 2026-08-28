"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

type PosterLang = "ru" | "en" | "vi";

type PartnerRow = {
  partner_id:string; partner_name:string; ref_code:string; partner_type:string; contact_name:string|null; contact:string|null;
  landing_url:string|null; dashboard_token:string; guest_discount_rate:number; market:string|null; onboarding_language:string|null;
  start_date:string|null; onboarding_status:string|null; terms_version:string|null; terms_accepted_at:string|null; terms_accepted_name:string|null;
  visits:number; visitors:number; whatsapp_clicks:number; leads:number; bookings:number; pax:number; revenue_vnd:number;
  month_pax:number; base_salary_vnd:number; tour_commission_vnd:number; total_earning_vnd:number;
};

const POSTER_COPY = {
  ru: {
    headline1:"БОЛЬШЕ ВПЕЧАТЛЕНИЙ.",
    headline2:"МЕНЬШЕ ЗАБОТ.",
    special:"СПЕЦИАЛЬНО ДЛЯ ГОСТЕЙ",
    supportLine:"РУССКОЯЗЫЧНАЯ ПОДДЕРЖКА • ДАНАНГ • ХОЙАН • ФУКУОК",
    offer:"ТУРЫ • ТРАНСФЕРЫ • ПОДДЕРЖКА",
    desc:"Помощь на русском языке для путешественников во Вьетнаме",
    why:"ПОЧЕМУ GOVIETSTAY",
    bullets:[
      "Поддержка на русском языке 24/7",
      "Помощь во время поездки",
      "Проверенные местные советы",
      "Туры и трансферы без лишних хлопот",
      "Быстрая связь с GoVietStay"
    ],
    cta1:"СВЯЖИТЕСЬ С НАМИ",
    cta2:"СКАНИРУЙТЕ СЕЙЧАС",
    cta3:"Просто напишите нам по-русски",
    code:"КОД ПАРТНЁРА",
    discount:"СКИДКА",
    guest:"ДЛЯ ГОСТЕЙ",
    access1:"ПАРТНЁРСКИЙ",
    access2:"ДОСТУП",
    venue:{
      wellness:"WELLNESS • MASSAGE PARTNER",
      bar:"ROOFTOP • NIGHTLIFE PARTNER",
      hotel:"HOTEL PARTNER",
      restaurant:"RESTAURANT PARTNER",
      creator:"ONLINE TRAVEL PARTNER",
      desk:"TOUR DESK PARTNER",
      agent:"LOCAL TRAVEL PARTNER",
      other:"GOVIETSTAY PARTNER"
    }
  },
  en: {
    headline1:"MORE EXPERIENCES.",
    headline2:"LESS WORRIES.",
    special:"EXCLUSIVELY FOR GUESTS OF",
    supportLine:"LOCAL TRAVEL SUPPORT • DA NANG • HOI AN • PHU QUOC",
    offer:"TOURS • TRANSFERS • SUPPORT",
    desc:"Local travel support for visitors exploring Vietnam",
    why:"WHY GOVIETSTAY",
    bullets:[
      "24/7 local travel support",
      "Help during your trip",
      "Trusted local recommendations",
      "Hassle-free tours & transfers",
      "Quick contact with GoVietStay"
    ],
    cta1:"CONTACT GOVIETSTAY",
    cta2:"SCAN NOW",
    cta3:"Message us and we will help",
    code:"PARTNER CODE",
    discount:"SPECIAL",
    guest:"GUEST BENEFIT",
    access1:"PARTNER",
    access2:"ACCESS",
    venue:{
      wellness:"WELLNESS • MASSAGE PARTNER",
      bar:"ROOFTOP • NIGHTLIFE PARTNER",
      hotel:"HOTEL PARTNER",
      restaurant:"RESTAURANT PARTNER",
      creator:"ONLINE TRAVEL PARTNER",
      desk:"TOUR DESK PARTNER",
      agent:"LOCAL TRAVEL PARTNER",
      other:"GOVIETSTAY PARTNER"
    }
  },
  vi: {
    headline1:"NHIỀU TRẢI NGHIỆM HƠN.",
    headline2:"ÍT LO LẮNG HƠN.",
    special:"DÀNH RIÊNG CHO KHÁCH CỦA",
    supportLine:"HỖ TRỢ DU LỊCH • ĐÀ NẴNG • HỘI AN • PHÚ QUỐC",
    offer:"TOUR • XE • HỖ TRỢ DU LỊCH",
    desc:"Hỗ trợ địa phương đáng tin cậy cho chuyến đi tại Việt Nam",
    why:"VÌ SAO CHỌN GOVIETSTAY",
    bullets:[
      "Hỗ trợ du lịch 24/7",
      "Đồng hành trong suốt chuyến đi",
      "Gợi ý địa phương đáng tin cậy",
      "Tour & xe đưa đón không lo lắng",
      "Liên hệ nhanh với GoVietStay"
    ],
    cta1:"LIÊN HỆ GOVIETSTAY",
    cta2:"QUÉT QR NGAY",
    cta3:"Nhắn tin cho chúng tôi để được hỗ trợ",
    code:"MÃ ĐỐI TÁC",
    discount:"ƯU ĐÃI",
    guest:"DÀNH CHO KHÁCH",
    access1:"ĐỐI TÁC",
    access2:"CHÍNH THỨC",
    venue:{
      wellness:"ĐỐI TÁC WELLNESS • MASSAGE",
      bar:"ĐỐI TÁC ROOFTOP • NIGHTLIFE",
      hotel:"ĐỐI TÁC KHÁCH SẠN",
      restaurant:"ĐỐI TÁC NHÀ HÀNG",
      creator:"ĐỐI TÁC ONLINE • CREATOR",
      desk:"ĐỐI TÁC QUẦY TOUR",
      agent:"ĐỐI TÁC DU LỊCH ĐỊA PHƯƠNG",
      other:"ĐỐI TÁC GOVIETSTAY"
    }
  }
} as const;

function money(v:any){return new Intl.NumberFormat("vi-VN").format(Number(v||0))+" ₫";}
function dashboardUrl(r:PartnerRow){return "https://www.govietstay.com/partner?token="+encodeURIComponent(r.dashboard_token);}
function cleanRef(v:any){return String(v||"").trim().toUpperCase().replace(/[^A-Z0-9_-]/g,"").slice(0,60);}
function suggestRef(name:string){
  const base=String(name||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^A-Za-z0-9]/g,"").toUpperCase().slice(0,10) || "PARTNER";
  return base+"01";
}
function discountPct(r:PartnerRow){return Math.max(0,Number(r.guest_discount_rate||0)*100);}
function xml(v:any){
  return String(v??"").replace(/[<>&'"]/g,m=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"}[m]||m));
}
function defaultPosterLang(r:PartnerRow):PosterLang{
  const market=(r.market||"").toLowerCase();
  if(market.includes("english")) return "en";
  if(market.includes("vietnam") || market.includes("việt")) return "vi";
  return "ru";
}
function venueKey(r:PartnerRow):keyof typeof POSTER_COPY.ru.venue{
  const n=(r.partner_name||"").toLowerCase();
  const t=(r.partner_type||"").toLowerCase();
  if(/massage|spa|wellness|ruby/.test(n) || t==="spa" || t==="wellness") return "wellness";
  if(t==="bar" || /rooftop|bar|pub|club/.test(n)) return "bar";
  if(t==="hotel" || /hotel|resort|hostel/.test(n)) return "hotel";
  if(t==="restaurant" || /restaurant|cafe|coffee|bistro/.test(n)) return "restaurant";
  if(t==="creator" || /blog|media|creator|vietved/.test(n)) return "creator";
  if(t==="desk") return "desk";
  if(t==="agent" || t==="referral") return "agent";
  return "other";
}
function themeFor(r:PartnerRow){
  const key=venueKey(r);
  if(key==="wellness") return {accent:"#7c1830",accent2:"#b52a4c",gold:"#f5c24f"};
  if(key==="bar") return {accent:"#8b1717",accent2:"#b42b22",gold:"#f5c24f"};
  if(key==="hotel") return {accent:"#0b376a",accent2:"#13518f",gold:"#f5c24f"};
  if(key==="restaurant") return {accent:"#6f1e2b",accent2:"#9a3141",gold:"#f5c24f"};
  if(key==="creator") return {accent:"#8f1717",accent2:"#c02c21",gold:"#f5c24f"};
  return {accent:"#123e6a",accent2:"#1c5d96",gold:"#f5c24f"};
}
function partnerNameSize(name:string){
  const n=name.length;
  if(n<=16)return 58;
  if(n<=24)return 50;
  if(n<=34)return 42;
  return 34;
}
function initials(name:string){
  return name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]?.toUpperCase()||"").join("")||"P";
}
function normalizeLandingInput(v:string){
  const x=v.trim();
  if(!x)return "/ru";
  if(/^https?:\/\//i.test(x))return x;
  if(/^(www\.)?govietstay\.com/i.test(x)){
    return "https://www.govietstay.com"+x.replace(/^(www\.)?govietstay\.com/i,"");
  }
  return x.startsWith("/")?x:"/"+x;
}
async function makeQr(link:string,width=680){
  return QRCode.toDataURL(link,{width,margin:4,errorCorrectionLevel:"H",color:{dark:"#000000",light:"#FFFFFF"}});
}
async function blobToDataUrl(blob:Blob){
  return new Promise<string>((resolve,reject)=>{
    const r=new FileReader();
    r.onload=()=>resolve(String(r.result||""));
    r.onerror=reject;
    r.readAsDataURL(blob);
  });
}
async function fetchAsDataUrl(url:string){
  const res=await fetch(url,{cache:"force-cache"});
  if(!res.ok) throw new Error("Không tải được poster asset: "+url);
  return blobToDataUrl(await res.blob());
}
async function fileAsDataUrl(file:File){
  return blobToDataUrl(file);
}
async function svgToPng(svg:string){
  return new Promise<string>((resolve,reject)=>{
    const blob=new Blob([svg],{type:"image/svg+xml;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const img=new Image();
    img.onload=()=>{
      try{
        const canvas=document.createElement("canvas");
        canvas.width=1240;canvas.height=1754;
        const ctx=canvas.getContext("2d");
        if(!ctx)throw new Error("Canvas unavailable");
        ctx.drawImage(img,0,0,1240,1754);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL("image/png"));
      }catch(e){URL.revokeObjectURL(url);reject(e);}
    };
    img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error("Không dựng được poster."));};
    img.src=url;
  });
}
function messageForPartner(r:PartnerRow,lang:PosterLang){
  const d=discountPct(r);
  if(lang==="en"){
    return `Hello ${r.contact_name||r.partner_name},

Your GoVietStay partner account is ready.

Partner Code: ${r.ref_code}
Private Partner Portal:
${dashboardUrl(r)}

Customer / QR Link:
${r.landing_url||"—"}${d>0?`\nApproved guest benefit: ${d.toFixed(d%1===0?0:1)}%`:""}

You can use the portal to track traffic, leads, bookings, PAX and earnings, and create bookings directly.

Please keep the Partner Portal link private.

GoVietStay — Trusted Local Support`;
  }
  if(lang==="vi"){
    return `Chào ${r.contact_name||r.partner_name},

Tài khoản Partner GoVietStay của bạn đã sẵn sàng.

Mã đối tác: ${r.ref_code}
Partner Portal riêng:
${dashboardUrl(r)}

Link / QR dành cho khách:
${r.landing_url||"—"}${d>0?`\nƯu đãi dành cho khách đã được duyệt: ${d.toFixed(d%1===0?0:1)}%`:""}

Bạn có thể theo dõi traffic, lead, booking, PAX, thu nhập và tạo booking trực tiếp trong portal.

Vui lòng giữ riêng link Partner Portal.

GoVietStay — Trusted Local Support`;
  }
  return `Здравствуйте, ${r.contact_name||r.partner_name}!

Ваш партнёрский аккаунт GoVietStay готов.

Код партнёра: ${r.ref_code}
Личный Partner Portal:
${dashboardUrl(r)}

Ссылка / QR для клиентов:
${r.landing_url||"—"}${d>0?`\nСогласованная привилегия для гостей: ${d.toFixed(d%1===0?0:1)}%`:""}

В кабинете вы можете отслеживать переходы, заявки, бронирования, PAX и доход, а также создавать бронирования напрямую.

Пожалуйста, не публикуйте ссылку на Partner Portal.

GoVietStay — Trusted Local Support`;
}
function messageForCustomer(r:PartnerRow,lang:PosterLang){
  const d=discountPct(r);
  if(lang==="en"){
    return `Need tours, transfers or local travel support in Vietnam?

GoVietStay can help with booking and support during your trip.${d>0?`\nGuests referred by ${r.partner_name} receive an approved ${d.toFixed(d%1===0?0:1)}% benefit.`:""}

Contact us here:
${r.landing_url||"https://www.govietstay.com/"}

GoVietStay — Trusted Local Support`;
  }
  if(lang==="vi"){
    return `Bạn cần tour, xe đưa đón hoặc hỗ trợ du lịch tại Việt Nam?

GoVietStay hỗ trợ đặt dịch vụ và đồng hành trong suốt chuyến đi.${d>0?`\nKhách từ ${r.partner_name} được hưởng ưu đãi ${d.toFixed(d%1===0?0:1)}% đã được GoVietStay phê duyệt.`:""}

Liên hệ tại:
${r.landing_url||"https://www.govietstay.com/"}

GoVietStay — Trusted Local Support`;
  }
  return `Нужны туры, трансфер или помощь во Вьетнаме?

GoVietStay поможет с бронированием и поддержкой во время поездки.${d>0?`\nДля гостей от ${r.partner_name} действует согласованная привилегия ${d.toFixed(d%1===0?0:1)}%.`:""}

Связаться с нами:
${r.landing_url||"https://www.govietstay.com/ru"}

GoVietStay — Trusted Local Support`;
}
function discountBlock(r:PartnerRow,lang:PosterLang,t:any){
  const c=POSTER_COPY[lang];
  const d=discountPct(r);
  if(d>0){
    return `
      <path d="M980 574 l28 18 32-7 20 27 32 5 7 33 28 18-12 31 15 30-26 21-4 33-32 8-18 27-32-11-29 16-24-23-34 3-12-31-31-14 8-33-20-26 21-26-7-33 31-13 13-31 34 4 24-24 29 17 32-10 18 28 33 8z" fill="${t.gold}" stroke="#ffec9a" stroke-width="4"/>
      <text x="1040" y="638" text-anchor="middle" font-family="Arial" font-size="23" font-weight="900" fill="#581111">${xml(c.discount)}</text>
      <text x="1040" y="711" text-anchor="middle" font-family="Arial" font-size="68" font-weight="900" fill="#581111">${xml(d.toFixed(d%1===0?0:1))}%</text>
      <text x="1040" y="747" text-anchor="middle" font-family="Arial" font-size="18" font-weight="800" fill="#581111">${xml(c.guest)}</text>`;
  }
  return `
    <path d="M980 574 l28 18 32-7 20 27 32 5 7 33 28 18-12 31 15 30-26 21-4 33-32 8-18 27-32-11-29 16-24-23-34 3-12-31-31-14 8-33-20-26 21-26-7-33 31-13 13-31 34 4 24-24 29 17 32-10 18 28 33 8z" fill="${t.gold}" stroke="#ffec9a" stroke-width="4"/>
    <text x="1040" y="657" text-anchor="middle" font-family="Arial" font-size="22" font-weight="900" fill="#071a33">${xml(c.access1)}</text>
    <text x="1040" y="699" text-anchor="middle" font-family="Arial" font-size="28" font-weight="900" fill="#071a33">${xml(c.access2)}</text>
    <text x="1040" y="737" text-anchor="middle" font-family="Arial" font-size="17" font-weight="800" fill="#071a33">${xml(r.ref_code)}</text>`;
}
function posterSvg(r:PartnerRow,qrSrc:string,lang:PosterLang,hero:string,gvsLogo:string,partnerLogo:string|null){
  const c=POSTER_COPY[lang];
  const t=themeFor(r);
  const vk=venueKey(r);
  const pName=xml(r.partner_name.toUpperCase());
  const nameSize=partnerNameSize(r.partner_name);
  const heroHeadline1Size=lang==="vi"?62:lang==="en"?74:82;
  const heroHeadline2Size=lang==="vi"?58:lang==="en"?68:74;

  const partnerBadge=partnerLogo
    ? `<circle cx="118" cy="396" r="64" fill="#fff" stroke="${t.gold}" stroke-width="4"/><image href="${partnerLogo}" x="62" y="340" width="112" height="112" preserveAspectRatio="xMidYMid meet"/>`
    : `<circle cx="118" cy="396" r="64" fill="#071a33" stroke="${t.gold}" stroke-width="4"/><text x="118" y="411" text-anchor="middle" font-family="Arial" font-size="40" font-weight="900" fill="${t.gold}">${xml(initials(r.partner_name))}</text>`;

  const bulletSvg=c.bullets.map((b,i)=>{
    const y=1000+i*92;
    return `<circle cx="108" cy="${y-9}" r="12" fill="${t.gold}"/>
      <text x="142" y="${y}" font-family="Arial" font-size="${lang==="vi"?25:26}" font-weight="650" fill="#ffffff">${xml(b)}</text>`;
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="1240" height="1754" viewBox="0 0 1240 1754">
    <defs>
      <linearGradient id="topShade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#020a16" stop-opacity=".97"/>
        <stop offset="48%" stop-color="#041324" stop-opacity=".67"/>
        <stop offset="100%" stop-color="#061225" stop-opacity=".06"/>
      </linearGradient>
      <linearGradient id="mainBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#06192f"/>
        <stop offset="100%" stop-color="#031326"/>
      </linearGradient>
    </defs>

    <rect width="1240" height="1754" fill="#031326"/>
    <image href="${hero}" x="0" y="0" width="1240" height="455" preserveAspectRatio="xMidYMid slice"/>
    <rect x="0" y="0" width="1240" height="455" fill="url(#topShade)"/>
    <rect x="0" y="0" width="1240" height="16" fill="${t.gold}"/>

    <text x="48" y="118" font-family="Arial" font-size="${heroHeadline1Size}" font-weight="900" fill="${t.gold}">${xml(c.headline1)}</text>
    <text x="48" y="205" font-family="Arial" font-size="${heroHeadline2Size}" font-weight="900" fill="#ffffff">${xml(c.headline2)}</text>

    <rect x="38" y="276" width="760" height="210" rx="25" fill="#061a31" fill-opacity=".96" stroke="${t.gold}" stroke-width="4"/>
    ${partnerBadge}
    <text x="205" y="332" font-family="Arial" font-size="28" font-weight="850" fill="${t.gold}">${xml(c.special)}</text>
    <text x="205" y="407" font-family="Arial" font-size="${nameSize}" font-weight="900" fill="#ffffff">${pName}</text>
    <text x="205" y="452" font-family="Arial" font-size="21" font-weight="750" fill="#d9e4f2">${xml(c.venue[vk])}</text>

    <rect x="0" y="455" width="1240" height="378" fill="${t.accent}"/>
    <rect x="24" y="478" width="1192" height="330" rx="26" fill="${t.accent2}" fill-opacity=".48" stroke="${t.gold}" stroke-width="4"/>
    <text x="68" y="565" font-family="Arial" font-size="${lang==="vi"?44:49}" font-weight="900" fill="#ffffff">${xml(c.offer)}</text>
    <text x="68" y="678" font-family="Arial" font-size="92" font-weight="900" fill="${t.gold}">GOVIETSTAY</text>
    <text x="68" y="744" font-family="Arial" font-size="${lang==="vi"?24:26}" font-weight="600" fill="#ffffff">${xml(c.desc)}</text>
    ${discountBlock(r,lang,t)}

    <rect x="0" y="833" width="1240" height="921" fill="url(#mainBg)"/>

    <rect x="36" y="872" width="545" height="650" rx="28" fill="#05172c" stroke="${t.gold}" stroke-width="3"/>
    <text x="76" y="935" font-family="Arial" font-size="${lang==="vi"?34:37}" font-weight="900" fill="${t.gold}">${xml(c.why)}</text>
    ${bulletSvg}

    <circle cx="184" cy="1421" r="91" fill="#ffffff" stroke="${t.gold}" stroke-width="5"/>
    <image href="${gvsLogo}" x="105" y="1342" width="158" height="158" preserveAspectRatio="xMidYMid meet"/>
    <text x="304" y="1399" font-family="Arial" font-size="28" font-weight="900" fill="${t.gold}">GoVietStay</text>
    <text x="304" y="1439" font-family="Arial" font-size="20" font-weight="700" fill="#ffffff">Trusted Local Support</text>
    <text x="304" y="1474" font-family="Arial" font-size="18" font-weight="600" fill="#c9d8ea">Da Nang • Hoi An • Phu Quoc</text>

    <rect x="610" y="872" width="594" height="650" rx="28" fill="#ffffff" stroke="${t.gold}" stroke-width="4"/>
    <text x="907" y="936" text-anchor="middle" font-family="Arial" font-size="30" font-weight="900" fill="${t.accent}">${xml(c.cta1)}</text>
    <text x="907" y="994" text-anchor="middle" font-family="Arial" font-size="${lang==="vi"?38:43}" font-weight="900" fill="#061a31">${xml(c.cta2)}</text>
    <text x="907" y="1033" text-anchor="middle" font-family="Arial" font-size="20" font-weight="650" fill="#52637a">${xml(c.cta3)}</text>

    <rect x="698" y="1062" width="418" height="418" rx="12" fill="#ffffff"/>
    <image href="${qrSrc}" x="718" y="1082" width="378" height="378" preserveAspectRatio="xMidYMid meet"/>

    <rect x="695" y="1444" width="424" height="58" rx="10" fill="${t.accent}"/>
    <text x="907" y="1483" text-anchor="middle" font-family="Arial" font-size="24" font-weight="900" fill="#ffffff">${xml(c.code)}: ${xml(r.ref_code)}</text>

    <rect x="36" y="1555" width="1168" height="105" rx="22" fill="#0a2746" stroke="${t.gold}" stroke-width="3"/>
    <text x="72" y="1619" font-family="Arial" font-size="23" font-weight="750" fill="#ffffff">WhatsApp 24/7</text>
    <text x="350" y="1619" font-family="Arial" font-size="23" font-weight="750" fill="#ffffff">Telegram: @GoVietStay</text>
    <text x="745" y="1619" font-family="Arial" font-size="23" font-weight="750" fill="#ffffff">${lang==="ru"?"www.govietstay.com/ru":"www.govietstay.com"}</text>

    <text x="620" y="1703" text-anchor="middle" font-family="Arial" font-size="20" font-weight="650" fill="#aebfd3">GoVietStay Partner Poster V3 • ${xml(c.venue[vk])}</text>
  </svg>`;
}
async function buildPoster(r:PartnerRow,qr:string,lang:PosterLang,partnerLogo:string|null){
  const [hero,gvsLogo]=await Promise.all([
    fetchAsDataUrl("/partner-assets/hero-danang-pavel-standard.jpg"),
    fetchAsDataUrl("/govietstay-logo.jpg")
  ]);
  return svgToPng(posterSvg(r,qr,lang,hero,gvsLogo,partnerLogo));
}
async function dataUrlFile(src:string,name:string){
  const blob=await (await fetch(src)).blob();
  return new File([blob],name,{type:blob.type||"image/png"});
}
async function shareFile(src:string,name:string,text:string){
  const file=await dataUrlFile(src,name);
  if(navigator.share){
    const payload:any={title:"GoVietStay",text,files:[file]};
    if(!navigator.canShare || navigator.canShare({files:[file]})){
      await navigator.share(payload);return true;
    }
  }
  return false;
}
function downloadData(src:string,name:string){
  const a=document.createElement("a");a.href=src;a.download=name;document.body.appendChild(a);a.click();a.remove();
}

function PartnerQR({row,onQr,onPoster,onMobile}:{row:PartnerRow;onQr:(r:PartnerRow,q:string)=>void;onPoster:(r:PartnerRow,q:string)=>void;onMobile:(r:PartnerRow,q:string)=>void}){
  const [qr,setQr]=useState("");
  useEffect(()=>{
    let live=true;
    if(!row.landing_url){setQr("");return;}
    makeQr(row.landing_url).then(x=>{if(live)setQr(x)}).catch(()=>{if(live)setQr("")});
    return()=>{live=false};
  },[row.landing_url]);
  if(!qr)return <span className="gva-mini">Đang tạo QR…</span>;
  return <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
    <button type="button" onClick={()=>onQr(row,qr)} style={{border:"1px solid #dbe5f1",background:"#fff",padding:4,borderRadius:10,cursor:"pointer"}}>
      <img src={qr} alt={"QR "+row.ref_code} width={62} height={62} style={{display:"block"}}/>
    </button>
    <button type="button" className="gva-btn secondary" style={{padding:"6px 8px",fontSize:12}} onClick={()=>onPoster(row,qr)}>Poster V3</button>
    <button type="button" className="gva-btn secondary" style={{padding:"6px 8px",fontSize:12}} onClick={()=>onMobile(row,qr)}>Mobile</button>
  </div>;
}

export default function PartnerTools({supabase,days}:any){
  const [rows,setRows]=useState<PartnerRow[]>([]);
  const [loading,setLoading]=useState(false);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState("");
  const [msg,setMsg]=useState("");
  const [copied,setCopied]=useState("");
  const [name,setName]=useState("");
  const [ref,setRef]=useState("");
  const [qrModal,setQrModal]=useState<{row:PartnerRow;qr:string}|null>(null);
  const [posterModal,setPosterModal]=useState<{row:PartnerRow;qr:string;lang:PosterLang;src:string;partnerLogo:string|null}|null>(null);
  const [mobileModal,setMobileModal]=useState<{row:PartnerRow;qr:string;lang:PosterLang;poster:string|null}|null>(null);
  const [working,setWorking]=useState("");

  async function loadRows(){
    setLoading(true);setError("");
    try{
      const {data,error}=await supabase.rpc("admin_partner_performance",{p_days:days});
      if(error)throw error;
      setRows((data||[]) as PartnerRow[]);
    }catch(e:any){setError(e?.message||"Không tải được Partner Tracking.");setRows([])}
    finally{setLoading(false)}
  }
  useEffect(()=>{loadRows()},[days]);

  async function copy(v:string,k:string){
    try{await navigator.clipboard.writeText(v);setCopied(k);setTimeout(()=>setCopied(""),1600)}
    catch{setError("Không copy được")}
  }

  async function generatePoster(row:PartnerRow,qr:string,lang:PosterLang,partnerLogo:string|null){
    setWorking("poster");setError("");
    try{
      const src=await buildPoster(row,qr,lang,partnerLogo);
      setPosterModal({row,qr,lang,src,partnerLogo});
      return src;
    }catch(e:any){setError(e?.message||"Không tạo được poster.");return null}
    finally{setWorking("")}
  }
  async function switchPosterLang(lang:PosterLang){
    if(!posterModal)return;
    await generatePoster(posterModal.row,posterModal.qr,lang,posterModal.partnerLogo);
  }
  async function changePartnerLogo(file:File|null){
    if(!posterModal)return;
    const data=file?await fileAsDataUrl(file):null;
    await generatePoster(posterModal.row,posterModal.qr,posterModal.lang,data);
  }
  async function shareQr(){
    if(!mobileModal)return;
    setWorking("shareqr");
    try{
      const ok=await shareFile(mobileModal.qr,`GVS_${mobileModal.row.ref_code}_QR.png`,messageForCustomer(mobileModal.row,mobileModal.lang));
      if(!ok)downloadData(mobileModal.qr,`GVS_${mobileModal.row.ref_code}_QR.png`);
    }catch(e:any){if(e?.name!=="AbortError")setError("Không mở được menu chia sẻ QR.")}
    finally{setWorking("")}
  }
  async function ensureMobilePoster(){
    if(!mobileModal)return null;
    if(mobileModal.poster)return mobileModal.poster;
    setWorking("poster");
    try{
      const src=await buildPoster(mobileModal.row,mobileModal.qr,mobileModal.lang,null);
      setMobileModal({...mobileModal,poster:src});
      return src;
    }finally{setWorking("")}
  }
  async function sharePoster(){
    if(!mobileModal)return;
    setWorking("shareposter");
    try{
      const src=await ensureMobilePoster();
      if(!src)return;
      const ok=await shareFile(src,`GVS_${mobileModal.row.ref_code}_${mobileModal.lang.toUpperCase()}_POSTER_V3.png`,messageForPartner(mobileModal.row,mobileModal.lang));
      if(!ok)downloadData(src,`GVS_${mobileModal.row.ref_code}_${mobileModal.lang.toUpperCase()}_POSTER_V3.png`);
    }catch(e:any){if(e?.name!=="AbortError")setError("Không mở được menu chia sẻ poster.")}
    finally{setWorking("")}
  }

  async function createPartner(e:any){
    e.preventDefault();
    const form=e.currentTarget as HTMLFormElement;
    setSaving(true);setError("");setMsg("");
    const f=new FormData(form);
    try{
      const partnerName=String(f.get("name")||"").trim();
      const code=cleanRef(f.get("ref_code"));
      const discount=Math.max(0,Math.min(100,Number(f.get("discount")||0)));
      const landing=normalizeLandingInput(String(f.get("landing")||"/ru"));
      const market=String(f.get("market")||"Russian-speaking travelers");
      const language:PosterLang=market.toLowerCase().includes("english")?"en":market.toLowerCase().includes("vietnam")?"vi":"ru";
      const {error}=await supabase.rpc("admin_create_partner",{
        p_name:partnerName,p_ref_code:code,
        p_contact_name:String(f.get("contact_name")||"").trim()||null,
        p_contact:String(f.get("contact")||"").trim()||null,
        p_partner_type:String(f.get("partner_type")||"referral"),
        p_landing_path:landing,p_market:market,p_onboarding_language:language,
        p_start_date:String(f.get("start_date")||"")||null,p_guest_discount:discount/100
      });
      if(error)throw error;
      setMsg("Đã tạo đối tác "+code+". Hệ thống đã sinh sales link + QR + portal.");
      form.reset();setName("");setRef("");await loadRows();
    }catch(e:any){setError(e?.message||"Không tạo được partner.")}
    finally{setSaving(false)}
  }

  return <>
    <div className="gva-card" style={{marginBottom:15}}>
      <div className="gva-section-head"><div><h2>+ Tạo đối tác mới</h2><div className="gva-mini">Tạo một lần: Partner Code + Sales Link + QR + Portal + Poster V3.</div></div></div>
      {error&&<div className="gva-msg err">{error}</div>}
      {msg&&<div className="gva-msg">{msg}</div>}
      {working&&<div className="gva-msg">Đang xử lý…</div>}
      <form onSubmit={createPartner}>
        <div className="gva-form-grid">
          <div className="gva-field"><label>Tên đối tác / Website</label><input className="gva-input" name="name" value={name} onChange={e=>{setName(e.target.value);if(!ref)setRef(suggestRef(e.target.value));}} placeholder="Vietved.com Pavel" required/></div>
          <div className="gva-field"><label>Mã đối tác</label><input className="gva-input" name="ref_code" value={ref} onChange={e=>setRef(cleanRef(e.target.value))} placeholder="PAVEL01" required/></div>
          <div className="gva-field"><label>Tên liên hệ</label><input className="gva-input" name="contact_name" placeholder="Pavel"/></div>
          <div className="gva-field"><label>Điện thoại / WhatsApp</label><input className="gva-input" name="contact" placeholder="+84..."/></div>
          <div className="gva-field"><label>Loại đối tác</label><select className="gva-select" name="partner_type" defaultValue="referral"><option value="referral">Referral / Online</option><option value="creator">Website / Creator</option><option value="hotel">Hotel</option><option value="bar">Bar / Rooftop</option><option value="restaurant">Restaurant / Cafe</option><option value="spa">Massage / Spa / Wellness</option><option value="desk">Tour Desk</option><option value="agent">Agent</option><option value="other">Other</option></select></div>
          <div className="gva-field"><label>Thị trường</label><input className="gva-input" name="market" defaultValue="Russian-speaking travelers"/></div>
          <div className="gva-field"><label>Landing page</label><input className="gva-input" name="landing" defaultValue="/ru"/><div className="gva-mini" style={{marginTop:5}}>Có thể nhập /ru, govietstay.com hoặc URL đầy đủ. V3 sẽ tự chuẩn hóa.</div></div>
          <div className="gva-field"><label>Ưu đãi khách (%)</label><input className="gva-input" name="discount" type="number" min="0" max="100" step="0.1" defaultValue="0"/><div className="gva-mini" style={{marginTop:5}}>0% = poster không hiện giảm giá. Chỉ hiện khi anh cài ưu đãi riêng.</div></div>
          <div className="gva-field"><label>Ngày bắt đầu</label><input className="gva-input" name="start_date" type="date"/></div>
        </div>
        <button className="gva-btn" style={{marginTop:12}} disabled={saving}>{saving?"Đang tạo…":"Tạo mã + Portal đối tác"}</button>
      </form>
    </div>

    <div className="gva-card">
      <div className="gva-section-head"><div><h2>Partner Control Center</h2><div className="gva-mini">Pavel-style Poster V3 • tự đổi theme theo loại partner • Nga / Anh / Việt • QR thật.</div></div><button type="button" className="gva-btn secondary" onClick={loadRows}>{loading?"Đang tải…":"Cập nhật"}</button></div>
      <div className="gva-table-wrap"><table className="gva-table">
        <thead><tr><th>Partner</th><th>Terms</th><th>Traffic</th><th>Lead</th><th>Booking</th><th>PAX tháng</th><th>Basic</th><th>Commission</th><th>Total</th><th>QR / Poster</th><th>Portal</th></tr></thead>
        <tbody>
        {rows.map(r=><tr key={r.partner_id}>
          <td><b>{r.partner_name}</b><br/><span className="gva-mini">{r.ref_code} · {r.market||"—"}</span></td>
          <td>{r.terms_accepted_at?<><span className="gva-pill">Accepted v{r.terms_version||"1.0"}</span><div className="gva-mini" style={{marginTop:5}}>{r.terms_accepted_name}<br/>{new Date(r.terms_accepted_at).toLocaleString("vi-VN")}</div></>:<span className="gva-pill" style={{background:"#fff3d8"}}>Pending acceptance</span>}</td>
          <td>{r.visits||0}<div className="gva-mini">{r.whatsapp_clicks||0} WA</div></td><td>{r.leads||0}</td><td><b>{r.bookings||0}</b></td><td><b>{r.month_pax||0}</b></td>
          <td>{money(r.base_salary_vnd)}</td><td>{money(r.tour_commission_vnd)}</td><td><b>{money(r.total_earning_vnd)}</b></td>
          <td><PartnerQR row={r} onQr={(row,qr)=>setQrModal({row,qr})} onPoster={(row,qr)=>generatePoster(row,qr,defaultPosterLang(row),null)} onMobile={(row,qr)=>setMobileModal({row,qr,lang:defaultPosterLang(row),poster:null})}/></td>
          <td><button className="gva-btn secondary" type="button" onClick={()=>window.open(dashboardUrl(r),"_blank","noopener,noreferrer")}>Mở portal</button><button className="gva-btn secondary" style={{marginTop:6}} type="button" onClick={()=>copy(dashboardUrl(r),"d"+r.partner_id)}>{copied==="d"+r.partner_id?"Đã copy ✓":"Copy portal"}</button>{r.landing_url&&<button className="gva-btn secondary" style={{marginTop:6}} type="button" onClick={()=>copy(r.landing_url!,"s"+r.partner_id)}>{copied==="s"+r.partner_id?"Đã copy ✓":"Copy sales link"}</button>}</td>
        </tr>)}
        {!rows.length&&!loading&&<tr><td colSpan={11}><div className="gva-empty">Chưa có partner.</div></td></tr>}
        </tbody>
      </table></div>
    </div>

    {qrModal&&<div onClick={()=>setQrModal(null)} style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(8,23,45,.62)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"min(520px,96vw)",background:"#fff",borderRadius:18,padding:18}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:10}}><div><h2 style={{margin:0}}>{qrModal.row.partner_name}</h2><div className="gva-mini">{qrModal.row.ref_code}</div></div><button className="gva-btn secondary" onClick={()=>setQrModal(null)}>Đóng</button></div>
        <div style={{textAlign:"center",padding:"16px 0"}}><img src={qrModal.qr} alt="QR" style={{width:"min(310px,75vw)",height:"auto"}}/></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><button className="gva-btn" onClick={()=>downloadData(qrModal.qr,`GVS_${qrModal.row.ref_code}_QR.png`)}>Tải QR</button><button className="gva-btn" onClick={()=>generatePoster(qrModal.row,qrModal.qr,defaultPosterLang(qrModal.row),null)}>Poster V3</button><button className="gva-btn secondary" onClick={()=>setMobileModal({row:qrModal.row,qr:qrModal.qr,lang:defaultPosterLang(qrModal.row),poster:null})}>Mobile Share</button></div>
      </div>
    </div>}

    {posterModal&&<div onClick={()=>setPosterModal(null)} style={{position:"fixed",inset:0,zIndex:10000,background:"rgba(4,13,27,.82)",display:"flex",alignItems:"center",justifyContent:"center",padding:12,overflow:"auto"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"min(900px,98vw)",background:"#fff",borderRadius:18,padding:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap"}}>
          <div><h2 style={{margin:0}}>Poster Studio V3 — {posterModal.row.partner_name}</h2><div className="gva-mini">Chuẩn Pavel • QR thật • theme tự động theo partner</div></div><button className="gva-btn secondary" onClick={()=>setPosterModal(null)}>Đóng</button>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}>
          <button className={posterModal.lang==="ru"?"gva-btn":"gva-btn secondary"} onClick={()=>switchPosterLang("ru")}>🇷🇺 Русский</button>
          <button className={posterModal.lang==="en"?"gva-btn":"gva-btn secondary"} onClick={()=>switchPosterLang("en")}>🇬🇧 English</button>
          <button className={posterModal.lang==="vi"?"gva-btn":"gva-btn secondary"} onClick={()=>switchPosterLang("vi")}>🇻🇳 Tiếng Việt</button>
          <label className="gva-btn secondary" style={{cursor:"pointer"}}>Logo partner<input type="file" accept="image/*" style={{display:"none"}} onChange={e=>changePartnerLogo(e.target.files?.[0]||null)}/></label>
          {posterModal.partnerLogo&&<button className="gva-btn secondary" onClick={()=>changePartnerLogo(null)}>Bỏ logo partner</button>}
        </div>
        <div className="gva-mini" style={{marginTop:8}}>Nếu chưa có logo partner, V3 tự dùng badge chữ cái. Logo GoVietStay luôn dùng logo thật của website.</div>
        <div style={{background:"#e9eef5",borderRadius:12,padding:10,marginTop:12,maxHeight:"66vh",overflow:"auto"}}><img src={posterModal.src} alt="Poster V3" style={{display:"block",width:"100%",height:"auto",borderRadius:8}}/></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}>
          <button className="gva-btn" onClick={()=>downloadData(posterModal.src,`GVS_${posterModal.row.ref_code}_${posterModal.lang.toUpperCase()}_POSTER_V3.png`)}>Tải Poster PNG</button>
          <button className="gva-btn secondary" onClick={()=>setMobileModal({row:posterModal.row,qr:posterModal.qr,lang:posterModal.lang,poster:posterModal.src})}>Mobile Share</button>
          <button className="gva-btn secondary" onClick={()=>copy(messageForPartner(posterModal.row,posterModal.lang),"poster-partner")}>{copied==="poster-partner"?"Đã copy ✓":"Copy gửi partner"}</button>
        </div>
      </div>
    </div>}

    {mobileModal&&<div onClick={()=>setMobileModal(null)} style={{position:"fixed",inset:0,zIndex:10001,background:"rgba(4,13,27,.82)",display:"flex",alignItems:"center",justifyContent:"center",padding:14}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"min(540px,96vw)",background:"#fff",borderRadius:18,padding:18}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"center"}}><div><h2 style={{margin:0}}>Mobile Share V3</h2><div className="gva-mini">{mobileModal.row.partner_name} · {mobileModal.row.ref_code}</div></div><button className="gva-btn secondary" onClick={()=>setMobileModal(null)}>Đóng</button></div>
        <div style={{display:"flex",gap:7,marginTop:12}}>
          {(["ru","en","vi"] as PosterLang[]).map(l=><button key={l} className={mobileModal.lang===l?"gva-btn":"gva-btn secondary"} onClick={()=>setMobileModal({...mobileModal,lang:l,poster:null})}>{l==="ru"?"RU":l==="en"?"EN":"VI"}</button>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:14}}>
          <button className="gva-btn" disabled={working==="shareqr"} onClick={shareQr}>Share QR</button>
          <button className="gva-btn" disabled={working==="shareposter"} onClick={sharePoster}>Share Poster</button>
          <button className="gva-btn secondary" onClick={()=>copy(messageForPartner(mobileModal.row,mobileModal.lang),"partner-msg")}>{copied==="partner-msg"?"Đã copy ✓":"Copy nội dung gửi partner"}</button>
          <button className="gva-btn secondary" onClick={()=>copy(messageForCustomer(mobileModal.row,mobileModal.lang),"customer-msg")}>{copied==="customer-msg"?"Đã copy ✓":"Copy nội dung gửi khách"}</button>
        </div>
        <div className="gva-mini" style={{marginTop:12,lineHeight:1.5}}>Trên điện thoại, Share QR / Share Poster mở menu chia sẻ native nếu trình duyệt hỗ trợ. Nếu không hỗ trợ, hệ thống tải PNG để gửi qua WhatsApp, Telegram, Zalo…</div>
      </div>
    </div>}
  </>;
}
