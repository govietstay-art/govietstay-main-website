"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

type PosterLang = "ru" | "en" | "vi";
type FormatKey = "a3" | "a4" | "a5" | "carSeat" | "sticker" | "table" | "digital";

type PartnerRow = {
  partner_id:string; partner_name:string; ref_code:string; partner_type:string; contact_name:string|null; contact:string|null;
  landing_url:string|null; dashboard_token:string; guest_discount_rate:number; market:string|null; onboarding_language:string|null;
  start_date:string|null; onboarding_status:string|null; terms_version:string|null; terms_accepted_at:string|null; terms_accepted_name:string|null;
  visits:number; visitors:number; whatsapp_clicks:number; leads:number; bookings:number; pax:number; revenue_vnd:number;
  month_pax:number; base_salary_vnd:number; tour_commission_vnd:number; total_earning_vnd:number;
};

const BRAND = {
  navy:"#071a33",
  navy2:"#0d3158",
  navy3:"#123e6a",
  gold:"#f5c24f",
  white:"#ffffff",
  ink:"#10233d",
  muted:"#d7e2ef"
};

const FONT = "Inter, 'Noto Sans', 'Segoe UI', Arial, sans-serif";

const FORMATS:Record<FormatKey,{
  label:string; short:string; family:"portrait"|"landscape"|"digital"; outW:number; outH:number; note:string;
}> = {
  a3:{label:"A3 Poster",short:"A3",family:"portrait",outW:2480,outH:3508,note:"Poster lớn / cửa kính / quầy. SVG nên dùng khi in khổ lớn."},
  a4:{label:"A4 Poster",short:"A4",family:"portrait",outW:2480,outH:3508,note:"Chuẩn A4 300dpi."},
  a5:{label:"A5 Mini",short:"A5",family:"portrait",outW:1748,outH:2480,note:"Mini poster / kệ / quầy."},
  carSeat:{label:"Car Seat Card",short:"Ghế xe",family:"portrait",outW:1748,outH:2480,note:"Dán sau ghế trước hoặc bảng mica trong xe."},
  sticker:{label:"Car / Window Sticker",short:"Sticker xe",family:"landscape",outW:2400,outH:800,note:"Dán kính xe, quầy thu ngân, cửa hoặc bề mặt ngang."},
  table:{label:"Table Stand",short:"Để bàn",family:"portrait",outW:1500,outH:2121,note:"Bàn lễ tân, nhà hàng, spa, café."},
  digital:{label:"Digital Share",short:"Digital",family:"digital",outW:1080,outH:1350,note:"WhatsApp / Telegram / Zalo / social."}
};

const COPY = {
  ru:{
    network:"GOVIETSTAY PARTNER NETWORK",
    special:"СПЕЦИАЛЬНЫЙ ДОСТУП ДЛЯ ГОСТЕЙ",
    hero1:"ВАША ПОДДЕРЖКА",
    hero2:"ВО ВЬЕТНАМЕ",
    offer:"ТУРЫ • ТРАНСФЕРЫ • БИЛЕТЫ • ПОМОЩЬ",
    promise:"Один QR — прямая связь с местной командой GoVietStay",
    why:"ЗАЧЕМ СКАНИРОВАТЬ?",
    bullets:[
      "Помощь на русском языке",
      "Проверенные местные услуги",
      "Поддержка во время поездки",
      "Быстрый прямой контакт"
    ],
    scan:"СКАНИРУЙТЕ",
    scanSub:"для прямой помощи во Вьетнаме",
    noApp:"Без приложения",
    verified:"ПРОВЕРЕННЫЙ ПАРТНЁР",
    code:"КОД",
    benefit:"ПРИВИЛЕГИЯ ДЛЯ ГОСТЕЙ",
    auto:"Партнёрский код распознаётся автоматически",
    footer:"Da Nang • Hoi An • Hue • Phu Quoc",
    compact:"ПОМОЩЬ ВО ВЬЕТНАМЕ",
    compactSub:"Туры • Трансферы • Местная поддержка",
    compactCta:"СКАНИРУЙТЕ ДЛЯ СВЯЗИ"
  },
  en:{
    network:"GOVIETSTAY PARTNER NETWORK",
    special:"SPECIAL ACCESS FOR GUESTS OF",
    hero1:"LOCAL SUPPORT",
    hero2:"IN VIETNAM",
    offer:"PRIVATE TRIPS • TRANSFERS • TICKETS • LOCAL HELP",
    promise:"One QR for direct access to GoVietStay's local team",
    why:"WHY SCAN?",
    bullets:[
      "Support in your language",
      "Trusted local services",
      "Help during your trip",
      "Fast direct contact"
    ],
    scan:"SCAN TO START",
    scanSub:"Get direct local help in Vietnam",
    noApp:"No app needed",
    verified:"VERIFIED PARTNER",
    code:"CODE",
    benefit:"GUEST BENEFIT",
    auto:"Partner access is recognized automatically",
    footer:"Da Nang • Hoi An • Hue • Phu Quoc",
    compact:"LOCAL HELP IN VIETNAM",
    compactSub:"Private trips • Transfers • Local support",
    compactCta:"SCAN FOR DIRECT HELP"
  },
  vi:{
    network:"GOVIETSTAY PARTNER NETWORK",
    special:"QUYỀN TRUY CẬP DÀNH CHO KHÁCH CỦA",
    hero1:"HỖ TRỢ ĐỊA PHƯƠNG",
    hero2:"TẠI VIỆT NAM",
    offer:"TOUR RIÊNG • XE • VÉ • HỖ TRỢ",
    promise:"Một QR để kết nối trực tiếp với đội ngũ GoVietStay",
    why:"VÌ SAO NÊN QUÉT?",
    bullets:[
      "Hỗ trợ bằng ngôn ngữ của khách",
      "Dịch vụ địa phương đáng tin cậy",
      "Đồng hành trong chuyến đi",
      "Liên hệ trực tiếp nhanh chóng"
    ],
    scan:"QUÉT QR NGAY",
    scanSub:"Kết nối hỗ trợ địa phương tại Việt Nam",
    noApp:"Không cần ứng dụng",
    verified:"ĐỐI TÁC XÁC THỰC",
    code:"MÃ",
    benefit:"ƯU ĐÃI DÀNH CHO KHÁCH",
    auto:"Mã đối tác được nhận diện tự động",
    footer:"Đà Nẵng • Hội An • Huế • Phú Quốc",
    compact:"HỖ TRỢ DU LỊCH TẠI VIỆT NAM",
    compactSub:"Tour riêng • Xe • Hỗ trợ địa phương",
    compactCta:"QUÉT QR ĐỂ ĐƯỢC HỖ TRỢ"
  }
} as const;

function money(v:any){return new Intl.NumberFormat("vi-VN").format(Number(v||0))+" ₫";}
function dashboardUrl(r:PartnerRow){return "https://www.govietstay.com/partner?token="+encodeURIComponent(r.dashboard_token);}
function cleanRef(v:any){return String(v||"").trim().toUpperCase().replace(/[^A-Z0-9_-]/g,"").slice(0,60);}
function suggestRef(name:string){
  const base=String(name||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^A-Za-z0-9]/g,"").toUpperCase().slice(0,10)||"PARTNER";
  return base+"01";
}
function discountPct(r:PartnerRow){return Math.max(0,Number(r.guest_discount_rate||0)*100);}
function xml(v:any){return String(v??"").replace(/[<>&'"]/g,m=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"}[m]||m));}
function defaultPosterLang(r:PartnerRow):PosterLang{
  const market=(r.market||"").toLowerCase();
  if(market.includes("english")||market.includes("canada")||market.includes("australia")||market.includes("international"))return "en";
  if(market.includes("vietnam")||market.includes("việt"))return "vi";
  return "ru";
}
function initials(name:string){
  return name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]?.toUpperCase()||"").join("")||"P";
}
function partnerNameSize(name:string,base=54){
  const n=name.length;
  if(n<=18)return base;
  if(n<=28)return Math.round(base*.86);
  if(n<=40)return Math.round(base*.72);
  return Math.round(base*.6);
}
function normalizeLandingInput(v:string){
  const x=v.trim();
  if(!x)return "/ru";
  if(/^https?:\/\//i.test(x))return x;
  if(/^(www\.)?govietstay\.com/i.test(x))return "https://www.govietstay.com"+x.replace(/^(www\.)?govietstay\.com/i,"");
  return x.startsWith("/")?x:"/"+x;
}
async function makeQr(link:string,width=1000){
  return QRCode.toDataURL(link,{width,margin:4,errorCorrectionLevel:"H",color:{dark:"#071A33",light:"#FFFFFF"}});
}
async function blobToDataUrl(blob:Blob){
  return new Promise<string>((resolve,reject)=>{
    const r=new FileReader();r.onload=()=>resolve(String(r.result||""));r.onerror=reject;r.readAsDataURL(blob);
  });
}
async function fetchAsDataUrl(url:string){
  const res=await fetch(url,{cache:"force-cache"});
  if(!res.ok)throw new Error("Không tải được asset: "+url);
  return blobToDataUrl(await res.blob());
}
async function fileAsDataUrl(file:File){return blobToDataUrl(file);}
function svgDataUrl(svg:string){return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);}
async function svgToPng(svg:string,w:number,h:number){
  return new Promise<string>((resolve,reject)=>{
    const blob=new Blob([svg],{type:"image/svg+xml;charset=utf-8"});
    const url=URL.createObjectURL(blob);const img=new Image();
    img.onload=()=>{
      try{
        const canvas=document.createElement("canvas");canvas.width=w;canvas.height=h;
        const ctx=canvas.getContext("2d");if(!ctx)throw new Error("Canvas unavailable");
        ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high";ctx.drawImage(img,0,0,w,h);
        URL.revokeObjectURL(url);resolve(canvas.toDataURL("image/png"));
      }catch(e){URL.revokeObjectURL(url);reject(e)}
    };
    img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error("Không dựng được artwork."));};
    img.src=url;
  });
}
function downloadData(src:string,name:string){
  const a=document.createElement("a");a.href=src;a.download=name;document.body.appendChild(a);a.click();a.remove();
}
function downloadText(text:string,name:string,type="image/svg+xml"){
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;
  document.body.appendChild(a);a.click();const u=a.href;a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000);
}
async function dataUrlFile(src:string,name:string){
  const blob=await (await fetch(src)).blob();return new File([blob],name,{type:blob.type||"image/png"});
}
async function shareFile(src:string,name:string,text:string){
  const file=await dataUrlFile(src,name);
  if(navigator.share){
    const payload:any={title:"GoVietStay",text,files:[file]};
    if(!navigator.canShare||navigator.canShare({files:[file]})){await navigator.share(payload);return true;}
  }
  return false;
}

function partnerMessage(r:PartnerRow,lang:PosterLang){
  const d=discountPct(r);
  if(lang==="en")return `Hello ${r.contact_name||r.partner_name},

Your GoVietStay Partner Kit V4 is ready.

Partner code: ${r.ref_code}
Customer / QR link:
${r.landing_url||"—"}${d>0?`\nGuest benefit: ${d.toFixed(d%1===0?0:1)}%`:""}

The same partner QR can now be used on posters, hotel desks, restaurants, spas, vehicle stickers, car-seat cards and digital sharing.

Private Partner Portal:
${dashboardUrl(r)}

GoVietStay — Trusted Local Support`;
  if(lang==="vi")return `Chào ${r.contact_name||r.partner_name},

Bộ GoVietStay Partner Kit V4 của bạn đã sẵn sàng.

Mã đối tác: ${r.ref_code}
Link / QR dành cho khách:
${r.landing_url||"—"}${d>0?`\nƯu đãi dành cho khách: ${d.toFixed(d%1===0?0:1)}%`:""}

Cùng một QR có thể dùng trên poster, quầy lễ tân, nhà hàng, spa, sticker xe, card sau ghế và nội dung digital.

Partner Portal riêng:
${dashboardUrl(r)}

GoVietStay — Trusted Local Support`;
  return `Здравствуйте, ${r.contact_name||r.partner_name}!

Ваш GoVietStay Partner Kit V4 готов.

Код партнёра: ${r.ref_code}
Ссылка / QR для гостей:
${r.landing_url||"—"}${d>0?`\nПривилегия для гостей: ${d.toFixed(d%1===0?0:1)}%`:""}

Один и тот же QR можно использовать на постерах, стойках отелей, в ресторанах и SPA, в автомобилях и для digital-публикаций.

Личный Partner Portal:
${dashboardUrl(r)}

GoVietStay — Trusted Local Support`;
}
function customerMessage(r:PartnerRow,lang:PosterLang){
  const d=discountPct(r);
  if(lang==="en")return `Traveling in Vietnam? Scan or open this GoVietStay partner link for private trips, transfers, tickets and direct local help.${d>0?`\nGuest benefit: ${d.toFixed(d%1===0?0:1)}%`:""}\n${r.landing_url||"https://www.govietstay.com/"}`;
  if(lang==="vi")return `Cần hỗ trợ khi du lịch Việt Nam? Mở link GoVietStay này để đặt tour riêng, xe, vé và nhận hỗ trợ địa phương trực tiếp.${d>0?`\nƯu đãi dành cho khách: ${d.toFixed(d%1===0?0:1)}%`:""}\n${r.landing_url||"https://www.govietstay.com/"}`;
  return `Путешествуете по Вьетнаму? Откройте партнёрскую ссылку GoVietStay для туров, трансферов, билетов и прямой местной поддержки.${d>0?`\nПривилегия для гостей: ${d.toFixed(d%1===0?0:1)}%`:""}\n${r.landing_url||"https://www.govietstay.com/ru"}`;
}

function partnerMark(r:PartnerRow,partnerLogo:string|null,cx:number,cy:number,radius:number){
  if(partnerLogo)return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="#fff" stroke="${BRAND.gold}" stroke-width="4"/>
    <image href="${partnerLogo}" x="${cx-radius+10}" y="${cy-radius+10}" width="${(radius-10)*2}" height="${(radius-10)*2}" preserveAspectRatio="xMidYMid meet"/>`;
  return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${BRAND.navy2}" stroke="${BRAND.gold}" stroke-width="4"/>
    <text x="${cx}" y="${cy+radius*.22}" text-anchor="middle" font-family="${FONT}" font-size="${radius*.68}" font-weight="800" fill="${BRAND.gold}">${xml(initials(r.partner_name))}</text>`;
}
function benefitPill(r:PartnerRow,lang:PosterLang,x:number,y:number,w:number){
  const c=COPY[lang];const d=discountPct(r);
  const text=d>0?`${c.benefit}: ${d.toFixed(d%1===0?0:1)}%`:`${c.verified} • ${c.code} ${r.ref_code}`;
  return `<rect x="${x}" y="${y}" width="${w}" height="48" rx="24" fill="${BRAND.gold}"/>
    <text x="${x+w/2}" y="${y+32}" text-anchor="middle" font-family="${FONT}" font-size="18" font-weight="800" fill="${BRAND.navy}">${xml(text)}</text>`;
}
function portraitSvg(r:PartnerRow,qr:string,lang:PosterLang,hero:string,gvsLogo:string,partnerLogo:string|null){
  const c=COPY[lang];const nameSize=partnerNameSize(r.partner_name,56);
  const bullets=c.bullets.map((b,i)=>{
    const y=1000+i*64;
    return `<circle cx="92" cy="${y-8}" r="8" fill="${BRAND.gold}"/><text x="120" y="${y}" font-family="${FONT}" font-size="${lang==="vi"?25:26}" font-weight="650" fill="#fff">${xml(b)}</text>`;
  }).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="1240" height="1754" viewBox="0 0 1240 1754">
    <defs>
      <linearGradient id="heroShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#071a33" stop-opacity=".12"/><stop offset="76%" stop-color="#071a33" stop-opacity=".94"/><stop offset="100%" stop-color="#071a33"/></linearGradient>
      <linearGradient id="body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0b2d50"/><stop offset="100%" stop-color="#06172c"/></linearGradient>
      <filter id="shadow"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-opacity=".18"/></filter>
    </defs>
    <rect width="1240" height="1754" fill="${BRAND.navy}"/>
    <image href="${hero}" x="0" y="0" width="1240" height="620" preserveAspectRatio="xMidYMid slice"/>
    <rect x="0" y="0" width="1240" height="620" fill="url(#heroShade)"/>
    <rect x="0" y="0" width="1240" height="12" fill="${BRAND.gold}"/>

    <rect x="54" y="52" width="188" height="90" rx="18" fill="#fff" fill-opacity=".96"/>
    <image href="${gvsLogo}" x="66" y="60" width="164" height="74" preserveAspectRatio="xMidYMid meet"/>
    <text x="270" y="94" font-family="${FONT}" font-size="24" font-weight="800" fill="#fff">${xml(c.network)}</text>
    <text x="270" y="126" font-family="${FONT}" font-size="18" font-weight="600" fill="${BRAND.muted}">Trusted Local Support</text>

    <rect x="54" y="184" width="820" height="178" rx="28" fill="${BRAND.navy}" fill-opacity=".92" stroke="${BRAND.gold}" stroke-width="3"/>
    ${partnerMark(r,partnerLogo,138,273,60)}
    <text x="224" y="238" font-family="${FONT}" font-size="22" font-weight="800" fill="${BRAND.gold}">${xml(c.special)}</text>
    <text x="224" y="302" font-family="${FONT}" font-size="${nameSize}" font-weight="800" fill="#fff">${xml(r.partner_name)}</text>
    ${benefitPill(r,lang,224,324,470)}

    <text x="54" y="465" font-family="${FONT}" font-size="${lang==="vi"?58:68}" font-weight="900" fill="#fff">${xml(c.hero1)}</text>
    <text x="54" y="542" font-family="${FONT}" font-size="${lang==="vi"?62:78}" font-weight="900" fill="${BRAND.gold}">${xml(c.hero2)}</text>

    <rect x="0" y="620" width="1240" height="1134" fill="url(#body)"/>
    <text x="54" y="702" font-family="${FONT}" font-size="${lang==="vi"?28:31}" font-weight="800" fill="#fff">${xml(c.offer)}</text>
    <text x="54" y="748" font-family="${FONT}" font-size="22" font-weight="550" fill="${BRAND.muted}">${xml(c.promise)}</text>
    <line x1="54" y1="794" x2="1186" y2="794" stroke="${BRAND.gold}" stroke-opacity=".65" stroke-width="2"/>

    <rect x="54" y="842" width="560" height="432" rx="30" fill="${BRAND.navy}" stroke="#31577d" stroke-width="2"/>
    <text x="88" y="916" font-family="${FONT}" font-size="29" font-weight="850" fill="${BRAND.gold}">${xml(c.why)}</text>
    ${bullets}
    <text x="88" y="1240" font-family="${FONT}" font-size="18" font-weight="600" fill="${BRAND.muted}">${xml(c.auto)}</text>

    <rect x="650" y="842" width="536" height="606" rx="34" fill="#fff" filter="url(#shadow)"/>
    <text x="918" y="916" text-anchor="middle" font-family="${FONT}" font-size="${lang==="vi"?34:39}" font-weight="900" fill="${BRAND.navy}">${xml(c.scan)}</text>
    <text x="918" y="956" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="600" fill="#53657b">${xml(c.scanSub)}</text>
    <rect x="704" y="988" width="428" height="428" rx="20" fill="#fff" stroke="#e6ebf0" stroke-width="2"/>
    <image href="${qr}" x="728" y="1012" width="380" height="380" preserveAspectRatio="xMidYMid meet"/>
    <text x="918" y="1422" text-anchor="middle" font-family="${FONT}" font-size="17" font-weight="700" fill="#53657b">${xml(c.noApp)}</text>

    <rect x="54" y="1316" width="560" height="132" rx="26" fill="${BRAND.navy2}" stroke="${BRAND.gold}" stroke-width="2"/>
    <text x="84" y="1364" font-family="${FONT}" font-size="18" font-weight="700" fill="${BRAND.gold}">${xml(c.verified)}</text>
    <text x="84" y="1410" font-family="${FONT}" font-size="32" font-weight="900" fill="#fff">${xml(c.code)} ${xml(r.ref_code)}</text>

    <rect x="54" y="1490" width="1132" height="150" rx="28" fill="${BRAND.navy2}"/>
    <text x="86" y="1542" font-family="${FONT}" font-size="22" font-weight="800" fill="#fff">${xml(c.footer)}</text>
    <text x="86" y="1582" font-family="${FONT}" font-size="19" font-weight="600" fill="${BRAND.muted}">govietstay.com • WhatsApp • Telegram</text>
    <text x="1150" y="1580" text-anchor="end" font-family="${FONT}" font-size="18" font-weight="700" fill="${BRAND.gold}">PARTNER KIT V4</text>

    <text x="620" y="1702" text-anchor="middle" font-family="${FONT}" font-size="16" font-weight="600" fill="#8fa7c0">QR quiet zone protected • print-safe layout • scalable artwork</text>
  </svg>`;
}
function landscapeSvg(r:PartnerRow,qr:string,lang:PosterLang,gvsLogo:string,partnerLogo:string|null){
  const c=COPY[lang];const nameSize=partnerNameSize(r.partner_name,42);
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="530" viewBox="0 0 1600 530">
    <rect width="1600" height="530" rx="26" fill="${BRAND.navy}"/>
    <rect x="0" y="0" width="1600" height="10" fill="${BRAND.gold}"/>
    <rect x="42" y="38" width="190" height="84" rx="16" fill="#fff"/><image href="${gvsLogo}" x="54" y="46" width="166" height="68" preserveAspectRatio="xMidYMid meet"/>
    <text x="258" y="73" font-family="${FONT}" font-size="20" font-weight="800" fill="${BRAND.gold}">${xml(c.network)}</text>
    <text x="258" y="108" font-family="${FONT}" font-size="17" font-weight="600" fill="${BRAND.muted}">${xml(c.compactSub)}</text>

    ${partnerMark(r,partnerLogo,94,210,44)}
    <text x="156" y="192" font-family="${FONT}" font-size="18" font-weight="750" fill="${BRAND.gold}">${xml(c.special)}</text>
    <text x="156" y="238" font-family="${FONT}" font-size="${nameSize}" font-weight="850" fill="#fff">${xml(r.partner_name)}</text>

    <text x="42" y="336" font-family="${FONT}" font-size="${lang==="vi"?42:50}" font-weight="900" fill="#fff">${xml(c.compact)}</text>
    <text x="42" y="390" font-family="${FONT}" font-size="24" font-weight="650" fill="${BRAND.muted}">${xml(c.compactSub)}</text>
    ${benefitPill(r,lang,42,432,520)}

    <rect x="1260" y="46" width="292" height="438" rx="30" fill="#fff"/>
    <image href="${qr}" x="1291" y="78" width="230" height="230" preserveAspectRatio="xMidYMid meet"/>
    <text x="1406" y="350" text-anchor="middle" font-family="${FONT}" font-size="23" font-weight="900" fill="${BRAND.navy}">${xml(c.compactCta)}</text>
    <text x="1406" y="388" text-anchor="middle" font-family="${FONT}" font-size="16" font-weight="650" fill="#53657b">${xml(c.noApp)}</text>
    <text x="1406" y="445" text-anchor="middle" font-family="${FONT}" font-size="18" font-weight="800" fill="${BRAND.navy3}">${xml(c.code)} ${xml(r.ref_code)}</text>
  </svg>`;
}
function digitalSvg(r:PartnerRow,qr:string,lang:PosterLang,hero:string,gvsLogo:string,partnerLogo:string|null){
  const c=COPY[lang];const nameSize=partnerNameSize(r.partner_name,44);
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
    <defs><linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${BRAND.navy}" stop-opacity=".18"/><stop offset="70%" stop-color="${BRAND.navy}" stop-opacity=".94"/><stop offset="100%" stop-color="${BRAND.navy}"/></linearGradient></defs>
    <image href="${hero}" x="0" y="0" width="1080" height="560" preserveAspectRatio="xMidYMid slice"/><rect width="1080" height="560" fill="url(#d)"/>
    <rect x="42" y="38" width="180" height="82" rx="16" fill="#fff"/><image href="${gvsLogo}" x="54" y="46" width="156" height="66" preserveAspectRatio="xMidYMid meet"/>
    <text x="248" y="78" font-family="${FONT}" font-size="21" font-weight="800" fill="#fff">${xml(c.network)}</text>

    ${partnerMark(r,partnerLogo,96,220,48)}
    <text x="164" y="205" font-family="${FONT}" font-size="18" font-weight="750" fill="${BRAND.gold}">${xml(c.special)}</text>
    <text x="164" y="250" font-family="${FONT}" font-size="${nameSize}" font-weight="850" fill="#fff">${xml(r.partner_name)}</text>
    <text x="42" y="380" font-family="${FONT}" font-size="${lang==="vi"?55:64}" font-weight="900" fill="#fff">${xml(c.hero1)}</text>
    <text x="42" y="454" font-family="${FONT}" font-size="${lang==="vi"?58:72}" font-weight="900" fill="${BRAND.gold}">${xml(c.hero2)}</text>

    <rect x="0" y="560" width="1080" height="790" fill="${BRAND.navy}"/>
    <text x="42" y="632" font-family="${FONT}" font-size="${lang==="vi"?24:27}" font-weight="750" fill="#fff">${xml(c.offer)}</text>
    <text x="42" y="674" font-family="${FONT}" font-size="19" font-weight="550" fill="${BRAND.muted}">${xml(c.promise)}</text>
    <rect x="42" y="720" width="996" height="500" rx="34" fill="#fff"/>
    <image href="${qr}" x="350" y="760" width="380" height="380" preserveAspectRatio="xMidYMid meet"/>
    <text x="540" y="1174" text-anchor="middle" font-family="${FONT}" font-size="38" font-weight="900" fill="${BRAND.navy}">${xml(c.scan)}</text>
    ${benefitPill(r,lang,280,1240,520)}
    <text x="540" y="1320" text-anchor="middle" font-family="${FONT}" font-size="16" font-weight="650" fill="${BRAND.muted}">govietstay.com • ${xml(c.code)} ${xml(r.ref_code)}</text>
  </svg>`;
}
function buildSvg(r:PartnerRow,qr:string,lang:PosterLang,format:FormatKey,hero:string,gvsLogo:string,partnerLogo:string|null){
  const p=FORMATS[format];
  if(p.family==="landscape")return landscapeSvg(r,qr,lang,gvsLogo,partnerLogo);
  if(p.family==="digital")return digitalSvg(r,qr,lang,hero,gvsLogo,partnerLogo);
  return portraitSvg(r,qr,lang,hero,gvsLogo,partnerLogo);
}
async function buildArtwork(r:PartnerRow,qr:string,lang:PosterLang,format:FormatKey,partnerLogo:string|null,heroOverride:string|null,full=false){
  const [defaultHero,gvsLogo]=await Promise.all([
    heroOverride?Promise.resolve(heroOverride):fetchAsDataUrl("/partner-assets/hero-danang-pavel-standard.jpg"),
    fetchAsDataUrl("/govietstay-logo.jpg")
  ]);
  const hero=heroOverride||defaultHero;
  const svg=buildSvg(r,qr,lang,format,hero,gvsLogo,partnerLogo);
  const p=FORMATS[format];
  const scale=full?1:Math.min(1,1400/p.outW);
  const w=Math.max(720,Math.round(p.outW*scale));
  const h=Math.round(w*(p.outH/p.outW));
  const png=await svgToPng(svg,w,h);
  return {svg,png};
}

function PartnerQR({row,onQr,onKit,onMobile}:{row:PartnerRow;onQr:(r:PartnerRow,q:string)=>void;onKit:(r:PartnerRow,q:string)=>void;onMobile:(r:PartnerRow,q:string)=>void}){
  const [qr,setQr]=useState("");
  useEffect(()=>{
    let live=true;if(!row.landing_url){setQr("");return;}
    makeQr(row.landing_url).then(x=>{if(live)setQr(x)}).catch(()=>{if(live)setQr("")});
    return()=>{live=false};
  },[row.landing_url]);
  if(!qr)return <span className="gva-mini">Đang tạo QR…</span>;
  return <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
    <button type="button" onClick={()=>onQr(row,qr)} style={{border:"1px solid #dbe5f1",background:"#fff",padding:4,borderRadius:10,cursor:"pointer"}}>
      <img src={qr} alt={"QR "+row.ref_code} width={62} height={62} style={{display:"block"}}/>
    </button>
    <button type="button" className="gva-btn secondary" style={{padding:"6px 8px",fontSize:12}} onClick={()=>onKit(row,qr)}>Kit V4</button>
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
  const [kitModal,setKitModal]=useState<{row:PartnerRow;qr:string;lang:PosterLang;format:FormatKey;png:string;svg:string;partnerLogo:string|null;heroOverride:string|null}|null>(null);
  const [mobileModal,setMobileModal]=useState<{row:PartnerRow;qr:string;lang:PosterLang;poster:string|null}|null>(null);
  const [working,setWorking]=useState("");

  async function loadRows(){
    setLoading(true);setError("");
    try{
      const {data,error}=await supabase.rpc("admin_partner_performance",{p_days:days});
      if(error)throw error;setRows((data||[]) as PartnerRow[]);
    }catch(e:any){setError(e?.message||"Không tải được Partner Tracking.");setRows([])}
    finally{setLoading(false)}
  }
  useEffect(()=>{loadRows()},[days]);

  async function copy(v:string,k:string){
    try{await navigator.clipboard.writeText(v);setCopied(k);setTimeout(()=>setCopied(""),1600)}
    catch{setError("Không copy được")}
  }

  async function openKit(row:PartnerRow,qr:string,lang:PosterLang,format:FormatKey="a4",partnerLogo:string|null=null,heroOverride:string|null=null){
    setWorking("kit");setError("");
    try{
      const art=await buildArtwork(row,qr,lang,format,partnerLogo,heroOverride,false);
      setKitModal({row,qr,lang,format,png:art.png,svg:art.svg,partnerLogo,heroOverride});
    }catch(e:any){setError(e?.message||"Không tạo được Partner Kit V4.")}
    finally{setWorking("")}
  }
  async function switchKit(next:{lang?:PosterLang;format?:FormatKey;partnerLogo?:string|null;heroOverride?:string|null}){
    if(!kitModal)return;
    const lang=next.lang??kitModal.lang;
    const format=next.format??kitModal.format;
    const logo=Object.prototype.hasOwnProperty.call(next,"partnerLogo")?next.partnerLogo!:kitModal.partnerLogo;
    const hero=Object.prototype.hasOwnProperty.call(next,"heroOverride")?next.heroOverride!:kitModal.heroOverride;
    await openKit(kitModal.row,kitModal.qr,lang,format,logo,hero);
  }
  async function changePartnerLogo(file:File|null){
    if(!kitModal)return;const data=file?await fileAsDataUrl(file):null;await switchKit({partnerLogo:data});
  }
  async function changeHero(file:File|null){
    if(!kitModal)return;const data=file?await fileAsDataUrl(file):null;await switchKit({heroOverride:data});
  }
  async function downloadFullPng(){
    if(!kitModal)return;setWorking("download");
    try{
      const art=await buildArtwork(kitModal.row,kitModal.qr,kitModal.lang,kitModal.format,kitModal.partnerLogo,kitModal.heroOverride,true);
      downloadData(art.png,`GVS_${kitModal.row.ref_code}_${kitModal.lang.toUpperCase()}_${kitModal.format.toUpperCase()}_V4.png`);
    }catch(e:any){setError(e?.message||"Không xuất được PNG.")}finally{setWorking("")}
  }
  function downloadSvg(){
    if(!kitModal)return;
    downloadText(kitModal.svg,`GVS_${kitModal.row.ref_code}_${kitModal.lang.toUpperCase()}_${kitModal.format.toUpperCase()}_V4.svg`);
  }
  async function ensureMobilePoster(){
    if(!mobileModal)return null;if(mobileModal.poster)return mobileModal.poster;
    const art=await buildArtwork(mobileModal.row,mobileModal.qr,mobileModal.lang,"digital",null,null,false);
    setMobileModal({...mobileModal,poster:art.png});return art.png;
  }
  async function shareQr(){
    if(!mobileModal)return;setWorking("shareqr");
    try{
      const ok=await shareFile(mobileModal.qr,`GVS_${mobileModal.row.ref_code}_QR.png`,customerMessage(mobileModal.row,mobileModal.lang));
      if(!ok)downloadData(mobileModal.qr,`GVS_${mobileModal.row.ref_code}_QR.png`);
    }catch(e:any){if(e?.name!=="AbortError")setError("Không mở được menu chia sẻ QR.")}finally{setWorking("")}
  }
  async function sharePoster(){
    if(!mobileModal)return;setWorking("shareposter");
    try{
      const src=await ensureMobilePoster();if(!src)return;
      const ok=await shareFile(src,`GVS_${mobileModal.row.ref_code}_${mobileModal.lang.toUpperCase()}_DIGITAL_V4.png`,partnerMessage(mobileModal.row,mobileModal.lang));
      if(!ok)downloadData(src,`GVS_${mobileModal.row.ref_code}_${mobileModal.lang.toUpperCase()}_DIGITAL_V4.png`);
    }catch(e:any){if(e?.name!=="AbortError")setError("Không mở được menu chia sẻ.")}finally{setWorking("")}
  }

  async function createPartner(e:any){
    e.preventDefault();const form=e.currentTarget as HTMLFormElement;
    setSaving(true);setError("");setMsg("");const f=new FormData(form);
    try{
      const partnerName=String(f.get("name")||"").trim();
      const code=cleanRef(f.get("ref_code"));
      const discount=Math.max(0,Math.min(100,Number(f.get("discount")||0)));
      const landing=normalizeLandingInput(String(f.get("landing")||"/ru"));
      const market=String(f.get("market")||"Russian-speaking travelers");
      const language:PosterLang=market.toLowerCase().includes("english")||market.toLowerCase().includes("canada")||market.toLowerCase().includes("international")?"en":market.toLowerCase().includes("vietnam")?"vi":"ru";
      const {error}=await supabase.rpc("admin_create_partner",{
        p_name:partnerName,p_ref_code:code,
        p_contact_name:String(f.get("contact_name")||"").trim()||null,
        p_contact:String(f.get("contact")||"").trim()||null,
        p_partner_type:String(f.get("partner_type")||"referral"),
        p_landing_path:landing,p_market:market,p_onboarding_language:language,
        p_start_date:String(f.get("start_date")||"")||null,p_guest_discount:discount/100
      });
      if(error)throw error;
      setMsg("Đã tạo đối tác "+code+". Hệ thống đã sinh Partner Code + Sales Link + QR + Portal + Universal Kit V4.");
      form.reset();setName("");setRef("");await loadRows();
    }catch(e:any){setError(e?.message||"Không tạo được partner.")}finally{setSaving(false)}
  }

  return <>
    <div className="gva-card" style={{marginBottom:15}}>
      <div className="gva-section-head"><div><h2>+ Tạo đối tác mới</h2><div className="gva-mini">Một lần tạo: Partner Code + Sales Link + QR + Portal + Universal Display Kit V4.</div></div></div>
      {error&&<div className="gva-msg err">{error}</div>}
      {msg&&<div className="gva-msg">{msg}</div>}
      {working&&<div className="gva-msg">Đang xử lý {working==="download"?"file in chất lượng cao":"Partner Kit V4"}…</div>}
      <form onSubmit={createPartner}>
        <div className="gva-form-grid">
          <div className="gva-field"><label>Tên đối tác / Website</label><input className="gva-input" name="name" value={name} onChange={e=>{setName(e.target.value);if(!ref)setRef(suggestRef(e.target.value));}} placeholder="Hotel / Driver / Creator / Agency" required/></div>
          <div className="gva-field"><label>Mã đối tác</label><input className="gva-input" name="ref_code" value={ref} onChange={e=>setRef(cleanRef(e.target.value))} placeholder="DAD001" required/></div>
          <div className="gva-field"><label>Tên liên hệ</label><input className="gva-input" name="contact_name" placeholder="Tên người phụ trách"/></div>
          <div className="gva-field"><label>Điện thoại / WhatsApp</label><input className="gva-input" name="contact" placeholder="+84..."/></div>
          <div className="gva-field"><label>Loại đối tác</label><select className="gva-select" name="partner_type" defaultValue="referral">
            <option value="driver">Driver / Vehicle</option><option value="hotel">Hotel / Homestay</option><option value="restaurant">Restaurant / Cafe</option><option value="spa">Massage / Spa</option><option value="creator">Creator / Website</option><option value="agent">Travel Agent</option><option value="international">International Partner</option><option value="referral">Referral / Online</option><option value="desk">Tour Desk</option><option value="other">Other</option>
          </select></div>
          <div className="gva-field"><label>Thị trường</label><input className="gva-input" name="market" defaultValue="Russian-speaking travelers"/></div>
          <div className="gva-field"><label>Landing page</label><input className="gva-input" name="landing" defaultValue="/ru"/><div className="gva-mini" style={{marginTop:5}}>QR giữ attribution của partner; artwork có thể dán ở mọi bề mặt.</div></div>
          <div className="gva-field"><label>Ưu đãi khách (%)</label><input className="gva-input" name="discount" type="number" min="0" max="100" step="0.1" defaultValue="0"/><div className="gva-mini" style={{marginTop:5}}>0% = chỉ hiện Verified Partner; có ưu đãi mới hiển thị %.</div></div>
          <div className="gva-field"><label>Ngày bắt đầu</label><input className="gva-input" name="start_date" type="date"/></div>
        </div>
        <button className="gva-btn" style={{marginTop:12}} disabled={saving}>{saving?"Đang tạo…":"Tạo Partner + Universal Kit"}</button>
      </form>
    </div>

    <div className="gva-card">
      <div className="gva-section-head"><div><h2>Partner Deployment Center</h2><div className="gva-mini">V4 • một QR, nhiều bề mặt • A3/A4/A5 • xe • sticker • table stand • digital • SVG vector.</div></div><button type="button" className="gva-btn secondary" onClick={loadRows}>{loading?"Đang tải…":"Cập nhật"}</button></div>
      <div className="gva-table-wrap"><table className="gva-table">
        <thead><tr><th>Partner</th><th>Terms</th><th>Traffic</th><th>Lead</th><th>Booking</th><th>PAX tháng</th><th>Basic</th><th>Commission</th><th>Total</th><th>QR / Kit</th><th>Portal</th></tr></thead>
        <tbody>
        {rows.map(r=><tr key={r.partner_id}>
          <td><b>{r.partner_name}</b><br/><span className="gva-mini">{r.ref_code} · {r.market||"—"}</span></td>
          <td>{r.terms_accepted_at?<><span className="gva-pill">Accepted v{r.terms_version||"1.0"}</span><div className="gva-mini" style={{marginTop:5}}>{r.terms_accepted_name}<br/>{new Date(r.terms_accepted_at).toLocaleString("vi-VN")}</div></>:<span className="gva-pill" style={{background:"#fff3d8"}}>Pending acceptance</span>}</td>
          <td>{r.visits||0}<div className="gva-mini">{r.whatsapp_clicks||0} WA</div></td><td>{r.leads||0}</td><td><b>{r.bookings||0}</b></td><td><b>{r.month_pax||0}</b></td>
          <td>{money(r.base_salary_vnd)}</td><td>{money(r.tour_commission_vnd)}</td><td><b>{money(r.total_earning_vnd)}</b></td>
          <td><PartnerQR row={r} onQr={(row,qr)=>setQrModal({row,qr})} onKit={(row,qr)=>openKit(row,qr,defaultPosterLang(row),"a4",null)} onMobile={(row,qr)=>setMobileModal({row,qr,lang:defaultPosterLang(row),poster:null})}/></td>
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
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><button className="gva-btn" onClick={()=>downloadData(qrModal.qr,`GVS_${qrModal.row.ref_code}_QR.png`)}>Tải QR</button><button className="gva-btn" onClick={()=>openKit(qrModal.row,qrModal.qr,defaultPosterLang(qrModal.row),"a4",null)}>Mở Kit V4</button><button className="gva-btn secondary" onClick={()=>setMobileModal({row:qrModal.row,qr:qrModal.qr,lang:defaultPosterLang(qrModal.row),poster:null})}>Mobile Share</button></div>
      </div>
    </div>}

    {kitModal&&<div onClick={()=>setKitModal(null)} style={{position:"fixed",inset:0,zIndex:10000,background:"rgba(4,13,27,.84)",display:"flex",alignItems:"center",justifyContent:"center",padding:12,overflow:"auto"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"min(980px,98vw)",background:"#fff",borderRadius:18,padding:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap"}}>
          <div><h2 style={{margin:0}}>Universal Partner Kit V4 — {kitModal.row.partner_name}</h2><div className="gva-mini">Một QR • print-safe • typography mới • logo thật • co giãn theo mọi bề mặt</div></div><button className="gva-btn secondary" onClick={()=>setKitModal(null)}>Đóng</button>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}>
          <button className={kitModal.lang==="ru"?"gva-btn":"gva-btn secondary"} onClick={()=>switchKit({lang:"ru"})}>🇷🇺 Русский</button>
          <button className={kitModal.lang==="en"?"gva-btn":"gva-btn secondary"} onClick={()=>switchKit({lang:"en"})}>🇬🇧 English</button>
          <button className={kitModal.lang==="vi"?"gva-btn":"gva-btn secondary"} onClick={()=>switchKit({lang:"vi"})}>🇻🇳 Tiếng Việt</button>
          <label className="gva-btn secondary" style={{cursor:"pointer"}}>Logo partner<input type="file" accept="image/*" style={{display:"none"}} onChange={e=>changePartnerLogo(e.target.files?.[0]||null)}/></label>
          {kitModal.partnerLogo&&<button className="gva-btn secondary" onClick={()=>switchKit({partnerLogo:null})}>Bỏ logo partner</button>}
          <label className="gva-btn secondary" style={{cursor:"pointer"}}>Ảnh nền / Destination<input type="file" accept="image/*" style={{display:"none"}} onChange={e=>changeHero(e.target.files?.[0]||null)}/></label>
          {kitModal.heroOverride&&<button className="gva-btn secondary" onClick={()=>switchKit({heroOverride:null})}>Về ảnh mặc định</button>}
        </div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap",marginTop:10}}>
          {(Object.keys(FORMATS) as FormatKey[]).map(k=><button key={k} className={kitModal.format===k?"gva-btn":"gva-btn secondary"} onClick={()=>switchKit({format:k})}>{FORMATS[k].short}</button>)}
        </div>
        <div className="gva-mini" style={{marginTop:8,lineHeight:1.5}}><b>{FORMATS[kitModal.format].label}:</b> {FORMATS[kitModal.format].note} QR luôn giữ quiet zone và Partner Code.</div>
        <div style={{background:"#e9eef5",borderRadius:12,padding:10,marginTop:12,maxHeight:"64vh",overflow:"auto",textAlign:"center"}}><img src={kitModal.png} alt="Partner Kit V4" style={{display:"block",maxWidth:"100%",width:kitModal.format==="sticker"?"100%":"min(760px,100%)",height:"auto",borderRadius:8,margin:"0 auto"}}/></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}>
          <button className="gva-btn" disabled={working==="download"} onClick={downloadFullPng}>{working==="download"?"Đang xuất…":"Tải PNG chất lượng in"}</button>
          <button className="gva-btn" onClick={downloadSvg}>Tải SVG vector</button>
          <button className="gva-btn secondary" onClick={()=>setMobileModal({row:kitModal.row,qr:kitModal.qr,lang:kitModal.lang,poster:null})}>Mobile Share</button>
          <button className="gva-btn secondary" onClick={()=>copy(partnerMessage(kitModal.row,kitModal.lang),"kit-partner")}>{copied==="kit-partner"?"Đã copy ✓":"Copy gửi partner"}</button>
        </div>
        <div className="gva-mini" style={{marginTop:10}}>Khuyến nghị: nhà in dùng SVG để phóng A3/A2 hoặc decal lớn mà không vỡ chữ; PNG dùng cho in nhanh và chia sẻ.</div>
      </div>
    </div>}

    {mobileModal&&<div onClick={()=>setMobileModal(null)} style={{position:"fixed",inset:0,zIndex:10001,background:"rgba(4,13,27,.82)",display:"flex",alignItems:"center",justifyContent:"center",padding:14}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"min(540px,96vw)",background:"#fff",borderRadius:18,padding:18}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"center"}}><div><h2 style={{margin:0}}>Mobile Share V4</h2><div className="gva-mini">{mobileModal.row.partner_name} · {mobileModal.row.ref_code}</div></div><button className="gva-btn secondary" onClick={()=>setMobileModal(null)}>Đóng</button></div>
        <div style={{display:"flex",gap:7,marginTop:12}}>{(["ru","en","vi"] as PosterLang[]).map(l=><button key={l} className={mobileModal.lang===l?"gva-btn":"gva-btn secondary"} onClick={()=>setMobileModal({...mobileModal,lang:l,poster:null})}>{l==="ru"?"RU":l==="en"?"EN":"VI"}</button>)}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:14}}>
          <button className="gva-btn" disabled={working==="shareqr"} onClick={shareQr}>Share QR</button>
          <button className="gva-btn" disabled={working==="shareposter"} onClick={sharePoster}>Share Digital Card</button>
          <button className="gva-btn secondary" onClick={()=>copy(partnerMessage(mobileModal.row,mobileModal.lang),"partner-msg")}>{copied==="partner-msg"?"Đã copy ✓":"Copy gửi partner"}</button>
          <button className="gva-btn secondary" onClick={()=>copy(customerMessage(mobileModal.row,mobileModal.lang),"customer-msg")}>{copied==="customer-msg"?"Đã copy ✓":"Copy gửi khách"}</button>
        </div>
        <div className="gva-mini" style={{marginTop:12,lineHeight:1.5}}>Digital Card V4 dùng cùng QR với poster/sticker nên attribution không đổi khi partner chia sẻ online hoặc dán offline.</div>
      </div>
    </div>}
  </>;
}
