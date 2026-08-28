"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

type PartnerRow = {
  partner_id:string; partner_name:string; ref_code:string; partner_type:string; contact_name:string|null; contact:string|null;
  landing_url:string|null; dashboard_token:string; guest_discount_rate:number; market:string|null; onboarding_language:string|null;
  start_date:string|null; onboarding_status:string|null; terms_version:string|null; terms_accepted_at:string|null; terms_accepted_name:string|null;
  visits:number; visitors:number; whatsapp_clicks:number; leads:number; bookings:number; pax:number; revenue_vnd:number;
  month_pax:number; base_salary_vnd:number; tour_commission_vnd:number; total_earning_vnd:number;
};

function money(v:any){return new Intl.NumberFormat("vi-VN").format(Number(v||0))+" ₫";}
function dashboardUrl(r:PartnerRow){return "https://www.govietstay.com/partner?token="+encodeURIComponent(r.dashboard_token);}
function cleanRef(v:any){return String(v||"").trim().toUpperCase().replace(/[^A-Z0-9_-]/g,"").slice(0,60);}
function suggestRef(name:string){
  const base=String(name||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^A-Za-z0-9]/g,"").toUpperCase().slice(0,10) || "PARTNER";
  return base+"01";
}
function discountPct(r:PartnerRow){
  return Math.max(0,Number(r.guest_discount_rate||0)*100);
}
function xml(v:any){
  return String(v??"").replace(/[<>&'"]/g,m=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"}[m]||m));
}
function partnerMessage(r:PartnerRow){
  const discount=discountPct(r);
  const benefit=discount>0
    ? `\nДля ваших клиентов согласована специальная скидка ${discount.toFixed(discount%1===0?0:1)}%.`
    : "";
  return `Здравствуйте, ${r.contact_name||r.partner_name}!

Ваш партнёрский аккаунт GoVietStay готов.

Код партнёра: ${r.ref_code}
Личный кабинет:
${dashboardUrl(r)}

Ваша ссылка для клиентов:
${r.landing_url||"—"}${benefit}

В личном кабинете вы можете отслеживать переходы, заявки, бронирования, PAX и доход, а также создавать бронирования напрямую.

Пожалуйста, сохраните ссылку на личный кабинет — она предназначена только для вас.

GoVietStay — Trusted Local Support`;
}
function customerMessage(r:PartnerRow){
  const discount=discountPct(r);
  const benefit=discount>0
    ? `\nДля гостей этого партнёра действует специальная скидка ${discount.toFixed(discount%1===0?0:1)}%.`
    : "";
  return `Здравствуйте!

Нужны туры, трансфер или помощь во Вьетнаме на русском языке? GoVietStay поможет с бронированием и поддержкой во время поездки.${benefit}

Подробнее и связь:
${r.landing_url||"https://www.govietstay.com/ru"}

GoVietStay — Trusted Local Support`;
}

async function makeQr(link:string,width=640){
  return QRCode.toDataURL(link,{
    width,
    margin:4,
    errorCorrectionLevel:"H",
    color:{dark:"#000000",light:"#FFFFFF"}
  });
}

function posterSvg(r:PartnerRow,qrSrc:string){
  const d=discountPct(r);
  const partnerName=xml(r.partner_name.toUpperCase());
  const code=xml(r.ref_code);
  const discountBlock=d>0 ? `
    <rect x="890" y="580" width="245" height="175" rx="26" fill="#f4c642" stroke="#ffe99a" stroke-width="4"/>
    <text x="1012" y="628" text-anchor="middle" font-family="Arial" font-size="28" font-weight="900" fill="#5c1111">СКИДКА</text>
    <text x="1012" y="700" text-anchor="middle" font-family="Arial" font-size="70" font-weight="900" fill="#5c1111">${xml(d.toFixed(d%1===0?0:1))}%</text>
    <text x="1012" y="736" text-anchor="middle" font-family="Arial" font-size="20" font-weight="700" fill="#5c1111">ДЛЯ ГОСТЕЙ</text>`
  : `
    <circle cx="1012" cy="667" r="94" fill="#f4c642" stroke="#ffe99a" stroke-width="4"/>
    <text x="1012" y="642" text-anchor="middle" font-family="Arial" font-size="24" font-weight="900" fill="#071a33">ПАРТНЁРСКИЙ</text>
    <text x="1012" y="682" text-anchor="middle" font-family="Arial" font-size="28" font-weight="900" fill="#071a33">ДОСТУП</text>
    <text x="1012" y="718" text-anchor="middle" font-family="Arial" font-size="18" font-weight="700" fill="#071a33">${code}</text>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1240" height="1754" viewBox="0 0 1240 1754">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#031122"/>
      <stop offset="52%" stop-color="#071a33"/>
      <stop offset="100%" stop-color="#06172d"/>
    </linearGradient>
    <radialGradient id="glow" cx="82%" cy="7%" r="46%">
      <stop offset="0%" stop-color="#f3bd39" stop-opacity=".30"/>
      <stop offset="100%" stop-color="#f3bd39" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1240" height="1754" fill="url(#bg)"/>
  <rect width="1240" height="1754" fill="url(#glow)"/>
  <rect y="0" width="1240" height="18" fill="#f3bd39"/>
  <rect y="1736" width="1240" height="18" fill="#f3bd39"/>

  <text x="58" y="125" font-family="Arial" font-size="86" font-weight="900" fill="#ffdf73">БОЛЬШЕ ВПЕЧАТЛЕНИЙ.</text>
  <text x="58" y="215" font-family="Arial" font-size="76" font-weight="900" fill="#ffffff">МЕНЬШЕ ЗАБОТ.</text>
  <line x1="58" y1="255" x2="1182" y2="255" stroke="#f3bd39" stroke-width="3" opacity=".8"/>

  <rect x="58" y="292" width="1124" height="225" rx="28" fill="#071a33" stroke="#f3bd39" stroke-width="4"/>
  <text x="94" y="348" font-family="Arial" font-size="34" font-weight="800" fill="#ffdf73">СПЕЦИАЛЬНО ДЛЯ ГОСТЕЙ</text>
  <text x="94" y="425" font-family="Arial" font-size="58" font-weight="900" fill="#ffffff">${partnerName}</text>
  <text x="94" y="477" font-family="Arial" font-size="27" font-weight="700" fill="#d9e4f2">РУССКОЯЗЫЧНАЯ ПОДДЕРЖКА • ДАНАНГ • ХОЙАН • ФУКУОК</text>

  <rect x="58" y="550" width="1124" height="290" rx="28" fill="${d>0?"#8f1717":"#102c51"}" stroke="#f3bd39" stroke-width="4"/>
  <text x="94" y="628" font-family="Arial" font-size="52" font-weight="900" fill="#ffffff">ТУРЫ • ТРАНСФЕРЫ • ПОДДЕРЖКА</text>
  <text x="94" y="725" font-family="Arial" font-size="84" font-weight="900" fill="#ffdf73">GOVIETSTAY</text>
  <text x="94" y="786" font-family="Arial" font-size="27" font-weight="500" fill="#d9e4f2">Помощь на русском языке для путешественников во Вьетнаме</text>
  ${discountBlock}

  <rect x="58" y="875" width="535" height="690" rx="28" fill="#05152a" stroke="#f3bd39" stroke-width="3"/>
  <text x="92" y="936" font-family="Arial" font-size="38" font-weight="900" fill="#ffdf73">ПОЧЕМУ GOVIETSTAY</text>

  <circle cx="112" cy="1000" r="12" fill="#f3bd39"/><text x="145" y="1010" font-family="Arial" font-size="28" font-weight="600" fill="#fff">Поддержка на русском языке 24/7</text>
  <circle cx="112" cy="1088" r="12" fill="#f3bd39"/><text x="145" y="1098" font-family="Arial" font-size="28" font-weight="600" fill="#fff">Помощь во время поездки</text>
  <circle cx="112" cy="1176" r="12" fill="#f3bd39"/><text x="145" y="1186" font-family="Arial" font-size="28" font-weight="600" fill="#fff">Проверенные местные советы</text>
  <circle cx="112" cy="1264" r="12" fill="#f3bd39"/><text x="145" y="1274" font-family="Arial" font-size="28" font-weight="600" fill="#fff">Туры и трансферы без хлопот</text>
  <circle cx="112" cy="1352" r="12" fill="#f3bd39"/><text x="145" y="1362" font-family="Arial" font-size="28" font-weight="600" fill="#fff">Быстрая связь с GoVietStay</text>

  <rect x="92" y="1420" width="440" height="100" rx="24" fill="#ffffff" opacity=".97"/>
  <text x="312" y="1462" text-anchor="middle" font-family="Arial" font-size="36" font-weight="900" fill="#0a6b42">GoVietStay</text>
  <text x="312" y="1495" text-anchor="middle" font-family="Arial" font-size="19" font-weight="700" fill="#27384e">Trusted Local Support</text>

  <rect x="620" y="875" width="562" height="690" rx="28" fill="#ffffff" stroke="#f3bd39" stroke-width="4"/>
  <text x="901" y="936" text-anchor="middle" font-family="Arial" font-size="34" font-weight="900" fill="#8f1717">СВЯЖИТЕСЬ С НАМИ</text>
  <text x="901" y="995" text-anchor="middle" font-family="Arial" font-size="44" font-weight="900" fill="#071a33">СКАНИРУЙТЕ СЕЙЧАС</text>
  <text x="901" y="1038" text-anchor="middle" font-family="Arial" font-size="24" font-weight="600" fill="#40536d">Просто напишите нам по-русски</text>

  <rect x="691" y="1060" width="420" height="420" rx="16" fill="#ffffff"/>
  <image href="${qrSrc}" x="711" y="1080" width="380" height="380" preserveAspectRatio="xMidYMid meet"/>

  <rect x="696" y="1482" width="410" height="58" rx="10" fill="#8f1717"/>
  <text x="901" y="1521" text-anchor="middle" font-family="Arial" font-size="25" font-weight="900" fill="#ffffff">КОД ПАРТНЁРА: ${code}</text>

  <rect x="58" y="1595" width="1124" height="92" rx="20" fill="#0c2749" stroke="#f3bd39" stroke-width="3"/>
  <text x="88" y="1652" font-family="Arial" font-size="25" font-weight="700" fill="#ffffff">WhatsApp 24/7</text>
  <text x="385" y="1652" font-family="Arial" font-size="25" font-weight="700" fill="#ffffff">Telegram: @GoVietStay</text>
  <text x="790" y="1652" font-family="Arial" font-size="25" font-weight="700" fill="#ffffff">www.govietstay.com/ru</text>
</svg>`;
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
        if(!ctx) throw new Error("Canvas unavailable");
        ctx.drawImage(img,0,0,1240,1754);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL("image/png"));
      }catch(e){URL.revokeObjectURL(url);reject(e);}
    };
    img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error("Không dựng được poster."));};
    img.src=url;
  });
}
async function buildPoster(r:PartnerRow,qrSrc:string){
  return svgToPng(posterSvg(r,qrSrc));
}
async function dataUrlFile(src:string,name:string){
  const blob=await (await fetch(src)).blob();
  return new File([blob],name,{type:blob.type||"image/png"});
}
async function nativeShareFile(src:string,name:string,text:string){
  const file=await dataUrlFile(src,name);
  if(typeof navigator!=="undefined" && navigator.share){
    const payload:any={title:"GoVietStay",text,files:[file]};
    if(!navigator.canShare || navigator.canShare({files:[file]})){
      await navigator.share(payload);
      return true;
    }
  }
  return false;
}
function downloadData(src:string,name:string){
  const a=document.createElement("a");
  a.href=src;a.download=name;document.body.appendChild(a);a.click();a.remove();
}

function PartnerQR({
  row,onOpen,onPoster,onMobile
}:{row:PartnerRow;onOpen:(row:PartnerRow,src:string)=>void;onPoster:(row:PartnerRow,src:string)=>void;onMobile:(row:PartnerRow,src:string)=>void}){
  const [src,setSrc]=useState("");
  const [failed,setFailed]=useState(false);

  useEffect(()=>{
    let alive=true;
    setSrc("");setFailed(false);
    if(!row.landing_url)return()=>{alive=false};
    makeQr(row.landing_url,640).then(v=>{if(alive)setSrc(v)}).catch(()=>{if(alive)setFailed(true)});
    return()=>{alive=false};
  },[row.landing_url]);

  if(!row.landing_url)return <span className="gva-mini">Chưa có link</span>;
  if(failed)return <span className="gva-mini">QR lỗi</span>;
  if(!src)return <span className="gva-mini">Đang tạo…</span>;

  return <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
    <button type="button" onClick={()=>onOpen(row,src)}
      style={{border:"1px solid #dbe5f1",background:"#fff",padding:4,borderRadius:10,cursor:"pointer"}}>
      <img src={src} alt={"QR "+row.ref_code} width={62} height={62} style={{display:"block",width:62,height:62}}/>
    </button>
    <button type="button" className="gva-btn secondary" style={{padding:"6px 8px",fontSize:12}} onClick={()=>onPoster(row,src)}>Poster</button>
    <button type="button" className="gva-btn secondary" style={{padding:"6px 8px",fontSize:12}} onClick={()=>onMobile(row,src)}>Mobile</button>
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
  const [qrModal,setQrModal]=useState<{row:PartnerRow;src:string}|null>(null);
  const [posterModal,setPosterModal]=useState<{row:PartnerRow;src:string}|null>(null);
  const [mobileModal,setMobileModal]=useState<{row:PartnerRow;qr:string;poster?:string}|null>(null);
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

  async function openPoster(row:PartnerRow,qr:string){
    setWorking("poster");setError("");
    try{
      const src=await buildPoster(row,qr);
      setPosterModal({row,src});
    }catch(e:any){setError(e?.message||"Không tạo được poster.");}
    finally{setWorking("");}
  }
  async function openMobile(row:PartnerRow,qr:string){
    setMobileModal({row,qr});
  }
  async function ensureMobilePoster(){
    if(!mobileModal)return null;
    if(mobileModal.poster)return mobileModal.poster;
    setWorking("poster");
    try{
      const poster=await buildPoster(mobileModal.row,mobileModal.qr);
      setMobileModal({...mobileModal,poster});
      return poster;
    }finally{setWorking("");}
  }
  async function shareQr(){
    if(!mobileModal)return;
    setWorking("shareqr");
    try{
      const ok=await nativeShareFile(
        mobileModal.qr,
        `GVS_${mobileModal.row.ref_code}_QR.png`,
        `GoVietStay Partner ${mobileModal.row.ref_code}\n${mobileModal.row.landing_url||""}`
      );
      if(!ok)downloadData(mobileModal.qr,`GVS_${mobileModal.row.ref_code}_QR.png`);
    }catch(e:any){
      if(e?.name!=="AbortError")setError("Không mở được menu chia sẻ. QR đã có thể tải xuống.");
    }finally{setWorking("");}
  }
  async function sharePoster(){
    if(!mobileModal)return;
    setWorking("shareposter");
    try{
      const src=await ensureMobilePoster();
      if(!src)return;
      const ok=await nativeShareFile(src,`GVS_${mobileModal.row.ref_code}_POSTER.png`,`GoVietStay • ${mobileModal.row.partner_name}`);
      if(!ok)downloadData(src,`GVS_${mobileModal.row.ref_code}_POSTER.png`);
    }catch(e:any){
      if(e?.name!=="AbortError")setError("Không mở được menu chia sẻ. Poster đã có thể tải xuống.");
    }finally{setWorking("");}
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
      const {error}=await supabase.rpc("admin_create_partner",{
        p_name:partnerName,
        p_ref_code:code,
        p_contact_name:String(f.get("contact_name")||"").trim()||null,
        p_contact:String(f.get("contact")||"").trim()||null,
        p_partner_type:String(f.get("partner_type")||"referral"),
        p_landing_path:String(f.get("landing")||"/ru"),
        p_market:String(f.get("market")||"Russian-speaking travelers"),
        p_onboarding_language:"ru",
        p_start_date:String(f.get("start_date")||"")||null,
        p_guest_discount:discount/100
      });
      if(error)throw error;
      setMsg("Đã tạo đối tác "+code+". Hệ thống đã sinh link tracking + portal riêng.");
      form.reset();setName("");setRef("");await loadRows();
    }catch(e:any){setError(e?.message||"Không tạo được partner.")}
    finally{setSaving(false)}
  }

  return <>
    <div className="gva-card" style={{marginBottom:15}}>
      <div className="gva-section-head">
        <div>
          <h2>+ Tạo đối tác mới</h2>
          <div className="gva-mini">Mỗi đối tác mới tự có mã, sales link, QR và Partner Portal.</div>
        </div>
      </div>
      {error&&<div className="gva-msg err">{error}</div>}
      {msg&&<div className="gva-msg">{msg}</div>}
      {working&&<div className="gva-msg">Đang xử lý…</div>}
      <form onSubmit={createPartner}>
        <div className="gva-form-grid">
          <div className="gva-field"><label>Tên đối tác / Website</label><input className="gva-input" name="name" value={name} onChange={e=>{setName(e.target.value);if(!ref)setRef(suggestRef(e.target.value));}} placeholder="Vietved.com Pavel" required/></div>
          <div className="gva-field"><label>Mã đối tác</label><input className="gva-input" name="ref_code" value={ref} onChange={e=>setRef(cleanRef(e.target.value))} placeholder="PAVEL01" required/></div>
          <div className="gva-field"><label>Tên liên hệ</label><input className="gva-input" name="contact_name" placeholder="Павел"/></div>
          <div className="gva-field"><label>Điện thoại / WhatsApp</label><input className="gva-input" name="contact" placeholder="+84..."/></div>
          <div className="gva-field"><label>Loại đối tác</label><select className="gva-select" name="partner_type" defaultValue="referral"><option value="referral">Referral / Online</option><option value="creator">Website / Creator</option><option value="hotel">Hotel</option><option value="bar">Bar</option><option value="restaurant">Restaurant</option><option value="desk">Tour Desk</option><option value="agent">Agent</option><option value="other">Other</option></select></div>
          <div className="gva-field"><label>Thị trường</label><input className="gva-input" name="market" defaultValue="Russian-speaking travelers"/></div>
          <div className="gva-field"><label>Landing page</label><input className="gva-input" name="landing" defaultValue="/ru"/></div>
          <div className="gva-field"><label>Ưu đãi khách (%)</label><input className="gva-input" name="discount" type="number" min="0" max="100" step="0.1" defaultValue="0"/><div className="gva-mini" style={{marginTop:5}}>Mặc định 0%. Chỉ nhập khi GoVietStay duyệt ưu đãi riêng.</div></div>
          <div className="gva-field"><label>Ngày bắt đầu</label><input className="gva-input" name="start_date" type="date"/></div>
        </div>
        <button className="gva-btn" style={{marginTop:12}} disabled={saving}>{saving?"Đang tạo…":"Tạo mã + Portal đối tác"}</button>
      </form>
    </div>

    <div className="gva-card">
      <div className="gva-section-head">
        <div><h2>Partner Control Center</h2><div className="gva-mini">QR, poster và Mobile Share được tạo trực tiếp từ sales link của partner.</div></div>
        <button type="button" className="gva-btn secondary" onClick={loadRows}>{loading?"Đang tải…":"Cập nhật"}</button>
      </div>
      <div className="gva-table-wrap">
        <table className="gva-table">
          <thead><tr><th>Partner</th><th>Terms</th><th>Traffic</th><th>Lead</th><th>Booking</th><th>PAX tháng</th><th>Basic</th><th>Commission</th><th>Total</th><th>QR / Share</th><th>Portal</th></tr></thead>
          <tbody>
          {rows.map(r=><tr key={r.partner_id}>
            <td><b>{r.partner_name}</b><br/><span className="gva-mini">{r.ref_code} · {r.market||"—"}</span></td>
            <td>{r.terms_accepted_at?<><span className="gva-pill">Accepted v{r.terms_version||"1.0"}</span><div className="gva-mini" style={{marginTop:5}}>{r.terms_accepted_name}<br/>{new Date(r.terms_accepted_at).toLocaleString("vi-VN")}</div></>:<span className="gva-pill" style={{background:"#fff3d8"}}>Pending acceptance</span>}</td>
            <td>{r.visits||0}<div className="gva-mini">{r.whatsapp_clicks||0} WA</div></td>
            <td>{r.leads||0}</td><td><b>{r.bookings||0}</b></td><td><b>{r.month_pax||0}</b></td>
            <td>{money(r.base_salary_vnd)}</td><td>{money(r.tour_commission_vnd)}</td><td><b>{money(r.total_earning_vnd)}</b></td>
            <td><PartnerQR row={r} onOpen={(row,src)=>setQrModal({row,src})} onPoster={openPoster} onMobile={openMobile}/></td>
            <td>
              <button className="gva-btn secondary" type="button" onClick={()=>window.open(dashboardUrl(r),"_blank","noopener,noreferrer")}>Mở portal</button>
              <button className="gva-btn secondary" style={{marginTop:6}} type="button" onClick={()=>copy(dashboardUrl(r),"d"+r.partner_id)}>{copied==="d"+r.partner_id?"Đã copy ✓":"Copy portal"}</button>
              {r.landing_url&&<button className="gva-btn secondary" style={{marginTop:6}} type="button" onClick={()=>copy(r.landing_url!,"s"+r.partner_id)}>{copied==="s"+r.partner_id?"Đã copy ✓":"Copy sales link"}</button>}
            </td>
          </tr>)}
          {!rows.length&&!loading&&<tr><td colSpan={11}><div className="gva-empty">Chưa có partner.</div></td></tr>}
          </tbody>
        </table>
      </div>
    </div>

    {qrModal&&<div onClick={()=>setQrModal(null)} style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(8,23,45,.58)",display:"flex",alignItems:"center",justifyContent:"center",padding:18}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"min(520px,96vw)",background:"#fff",borderRadius:18,padding:22}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:12}}><div><h2 style={{margin:0}}>{qrModal.row.partner_name}</h2><div className="gva-mini">Partner Code: <b>{qrModal.row.ref_code}</b></div></div><button className="gva-btn secondary" onClick={()=>setQrModal(null)}>Đóng</button></div>
        <div style={{textAlign:"center",padding:"18px 0"}}><img src={qrModal.src} alt="QR" style={{width:"min(300px,72vw)",height:"auto"}}/></div>
        <div className="gva-mini" style={{wordBreak:"break-all",padding:10,background:"#f6f8fb",borderRadius:10}}>{qrModal.row.landing_url}</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}>
          <button className="gva-btn" onClick={()=>downloadData(qrModal.src,`GVS_${qrModal.row.ref_code}_QR.png`)}>Tải QR</button>
          <button className="gva-btn" onClick={()=>openPoster(qrModal.row,qrModal.src)}>Tạo poster</button>
          <button className="gva-btn secondary" onClick={()=>openMobile(qrModal.row,qrModal.src)}>Mobile Share</button>
        </div>
      </div>
    </div>}

    {posterModal&&<div onClick={()=>setPosterModal(null)} style={{position:"fixed",inset:0,zIndex:10000,background:"rgba(4,13,27,.78)",display:"flex",alignItems:"center",justifyContent:"center",padding:18,overflow:"auto"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"min(820px,96vw)",background:"#fff",borderRadius:18,padding:18}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"center",marginBottom:12}}><div><h2 style={{margin:0}}>Poster: {posterModal.row.partner_name}</h2><div className="gva-mini">QR thật • {posterModal.row.ref_code} • PNG 1240×1754</div></div><button className="gva-btn secondary" onClick={()=>setPosterModal(null)}>Đóng</button></div>
        <div style={{background:"#eef3f8",borderRadius:12,padding:10,maxHeight:"70vh",overflow:"auto"}}><img src={posterModal.src} alt="Poster" style={{display:"block",width:"100%",height:"auto",borderRadius:8}}/></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}><button className="gva-btn" onClick={()=>downloadData(posterModal.src,`GVS_${posterModal.row.ref_code}_POSTER.png`)}>Tải poster PNG</button><button className="gva-btn secondary" onClick={()=>{setPosterModal(null);setMobileModal({row:posterModal.row,qr:"",poster:posterModal.src});}}>Mobile Share</button></div>
      </div>
    </div>}

    {mobileModal&&<div onClick={()=>setMobileModal(null)} style={{position:"fixed",inset:0,zIndex:10001,background:"rgba(4,13,27,.78)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"min(520px,96vw)",background:"#fff",borderRadius:18,padding:18}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"center"}}><div><h2 style={{margin:0}}>Mobile Share</h2><div className="gva-mini">{mobileModal.row.partner_name} · {mobileModal.row.ref_code}</div></div><button className="gva-btn secondary" onClick={()=>setMobileModal(null)}>Đóng</button></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:16}}>
          <button className="gva-btn" disabled={working==="shareqr"||!mobileModal.qr} onClick={shareQr}>Share QR</button>
          <button className="gva-btn" disabled={working==="shareposter"} onClick={sharePoster}>Share Poster</button>
          <button className="gva-btn secondary" onClick={()=>copy(partnerMessage(mobileModal.row),"partner-msg")}>{copied==="partner-msg"?"Đã copy ✓":"Copy nội dung gửi partner"}</button>
          <button className="gva-btn secondary" onClick={()=>copy(customerMessage(mobileModal.row),"customer-msg")}>{copied==="customer-msg"?"Đã copy ✓":"Copy nội dung gửi khách"}</button>
        </div>
        <div className="gva-mini" style={{marginTop:12,lineHeight:1.5}}>Trên iPhone/Android, nút Share sẽ mở menu chia sẻ của điện thoại nếu trình duyệt hỗ trợ. Nếu không, hệ thống tự tải file để anh gửi qua WhatsApp/Telegram.</div>
      </div>
    </div>}
  </>;
}
