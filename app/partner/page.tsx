"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import PartnerBookingTools from "../../components/partner/PartnerBookingTools";

const SUPABASE_URL="https://vscffgnxaexestnayvae.supabase.co";
const SUPABASE_KEY="sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV";
const supabase=createClient(SUPABASE_URL,SUPABASE_KEY);
const TERMS_VERSION="2.0";

function money(v:any){return new Intl.NumberFormat("ru-RU").format(Number(v||0))+" ₫";}

const terms = [
  ["1. Статус сотрудничества","Партнёр действует как независимый партнёр по привлечению клиентов и не является сотрудником или лицом, имеющим право создавать обязательства от имени GoVietStay, если иное не согласовано письменно."],
  ["2. Атрибуция клиентов","Клиент закрепляется за Партнёром, если первое подтверждаемое обращение зафиксировано через персональную ссылку, QR-код, партнёрский код либо вручную подтверждено GoVietStay до бронирования. Данные системы GoVietStay являются основной записью для расчёта."],
  ["3. Запрет обхода и «увода» клиента","После передачи клиента GoVietStay запрещено обходить систему, переводить клиента на прямую оплату себе или третьему лицу, перенаправлять его к конкуренту по тому же запросу, скрывать бронирование или искажать код атрибуции. При подтверждённом нарушении GoVietStay вправе приостановить доступ, исключить спорные операции из расчёта и требовать возмещения фактически причинённого ущерба в пределах закона."],
  ["4. Обязанности GoVietStay","GoVietStay консультирует переданных клиентов, подтверждает цену и доступность, организует бронирование, транспорт, гидов и согласованные услуги, ведёт учёт заказов и PAX и предоставляет статистику в кабинете."],
  ["5. Обязанности Партнёра","Партнёр использует только свой персональный код/ссылку/QR, предоставляет достоверную информацию, не вводит клиента в заблуждение, соблюдает законы и правила платформ и не выдаёт себя за сотрудника GoVietStay без письменного разрешения."],
  ["6. PAX","Один оплачиваемый пассажир/гость в подтверждённом бронировании = 1 PAX. Отменённые, возвращённые, тестовые, фиктивные, дублирующие или оспоренные бронирования могут быть исключены из расчёта."],
  ["7. Без базовой выплаты","В этой партнёрской программе нет базовой выплаты или оклада. Вознаграждение за новые заказы определяется только комиссией 12% от фактической продажной стоимости оплаченных услуг для каждого PAX."],
  ["8. Комиссия 12%","С 16 октября 2026 года комиссия по новым бронированиям составляет 12% от фактической цены продажи тура за каждого платного гостя (PAX). Например: Cham Island 950 000 ₫ за гостя → 114 000 ₫ комиссии за гостя. Для детей применяется их фактическая цена, если она отличается. Комиссия не зависит от языка гида или объёма продаж в месяц; ранее согласованные условия по старым бронированиям сохраняются."],
  ["9. Начисление и выплаты","Комиссия подлежит выплате только после завершения тура, полной оплаты и финансового подтверждения GoVietStay. Неподтверждённые заказы не считаются заработанной комиссией. Возвраты, chargeback, отмены, ошибки, мошенничество и дубли могут корректироваться при сверке."],
  ["10. Конфиденциальность","Контакты клиентов, внутренние цены, операционные процессы, партнёрские условия, доступ к кабинету и иная непубличная информация являются конфиденциальными и не должны передаваться третьим лицам."],
  ["11. Бренд GoVietStay","Логотип и материалы GoVietStay можно использовать только для добросовестного продвижения в рамках сотрудничества. Нельзя создавать аккаунты, домены или рекламу, вводящие людей в заблуждение относительно собственности или официального представительства."],
  ["12. Проверка и приостановление","При разумном подозрении на мошенничество, обход системы, жалобы клиентов, нарушение закона или бренда GoVietStay вправе временно приостановить доступ и начисления на период проверки."],
  ["13. Прекращение сотрудничества","Каждая сторона может прекратить сотрудничество на будущее. GoVietStay вправе прекратить его немедленно при существенном нарушении, мошенничестве, обходе системы, злоупотреблении данными клиентов или незаконной деятельности."],
  ["14. Ограничение полномочий","Партнёр не вправе принимать деньги от имени GoVietStay, заключать договоры, давать гарантии или создавать обязательства для GoVietStay без отдельного письменного разрешения."],
  ["15. Споры","Стороны сначала пытаются урегулировать спор переговорами и сверкой данных системы. Для повышенной юридической определённости рекомендуется отдельный двуязычный договор с полными реквизитами сторон."],
  ["16. Электронное согласие","Принятие новой версии условий с указанием имени фиксируется в системе с датой и временем; прежнее согласие не считается согласием с изменённой версией. Новые условия применяются к новым заказам после 16 октября 2026 года."],
];

export default function PartnerDashboard(){
  useEffect(()=>{ document.documentElement.lang="ru"; document.body.classList.add("notranslate"); const m=document.createElement("meta"); m.name="google"; m.content="notranslate"; document.head.appendChild(m); return()=>{m.remove()}; },[]);
  const [token,setToken]=useState("");
  const [days,setDays]=useState(30);
  const [data,setData]=useState<any>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [acceptName,setAcceptName]=useState("");
  const [accepting,setAccepting]=useState(false);
  const [acceptMsg,setAcceptMsg]=useState("");

  useEffect(()=>{try{setToken(new URLSearchParams(window.location.search).get("token")||"")}catch{setToken("")}},[]);
  async function load(){
    if(!token){setLoading(false);return}
    setLoading(true);setError("");
    const {data,error}=await supabase.rpc("partner_dashboard",{p_token:token,p_days:days});
    if(error){setError(error.message);setData(null)}
    else if(!data){setError("Ссылка недействительна или партнёр неактивен.");setData(null)}
    else{setData(data); if(!acceptName)setAcceptName(data?.partner?.name||"")}
    setLoading(false);
  }
  useEffect(()=>{load()},[token,days]);

  async function acceptTerms(){
    setAccepting(true);setAcceptMsg("");setError("");
    const {data,error}=await supabase.rpc("partner_accept_terms",{p_token:token,p_terms_version:TERMS_VERSION,p_accepted_name:acceptName.trim()});
    if(error)setError(error.message);
    else{setAcceptMsg("Условия приняты и зафиксированы в системе.");await load()}
    setAccepting(false);
  }

  const m=data?.metrics||{},p=data?.partner||{},t=data?.terms||{},breakdown=Array.isArray(m.commission_breakdown)?m.commission_breakdown:[];

  return <main translate="no" className="notranslate" style={{minHeight:"100vh",background:"#f4f7fb",padding:"24px 14px 50px",fontFamily:"Arial,sans-serif",color:"#172033"}}>
    <div style={{maxWidth:1120,margin:"0 auto"}}>
      <header style={{background:"#0f2747",color:"#fff",borderRadius:22,padding:"24px 28px",display:"flex",gap:18,alignItems:"center",boxShadow:"0 12px 28px rgba(15,39,71,.15)"}}>
        <img src="/govietstay-logo.jpg" alt="GoVietStay" style={{width:72,height:72,borderRadius:16,objectFit:"cover",background:"#fff"}}/>
        <div>
          <div style={{fontSize:13,opacity:.8,letterSpacing:1}}>GOVIETSTAY PARTNER PORTAL</div>
          <h1 style={{margin:"5px 0",fontSize:30}}>Партнёрский кабинет</h1>
          <div style={{opacity:.86}}>Прозрачные правила · прозрачный учёт · прозрачный доход</div>
        </div>
      </header>

      {!token&&!loading&&<Box><b>Ссылка на кабинет не найдена.</b></Box>}
      {loading&&<Box>Загрузка…</Box>}
      {error&&<Box><span style={{color:"#9a2525"}}>{error}</span></Box>}

      {data&&<>
        <Box>
          <div style={{display:"flex",justifyContent:"space-between",gap:16,flexWrap:"wrap",alignItems:"center"}}>
            <div>
              <div style={{fontSize:26,fontWeight:800}}>{p.name}</div>
              <div style={muted}>Код партнёра: <b>{p.ref_code}</b> · Рынок: {p.market||"—"} · Статус: <b>{p.onboarding_status||"active"}</b></div>
              <div style={muted}>Дата начала: {p.start_date||"—"} · Условия: версия <b>{t.version||TERMS_VERSION}</b></div>
            </div>
            <select value={days} onChange={e=>setDays(Number(e.target.value))} style={btn}>
              <option value={7}>7 дней</option><option value={30}>30 дней</option><option value={90}>90 дней</option><option value={365}>365 дней</option>
            </select>
          </div>
        </Box>

        <Box>
          <h2 style={h2}>Как мы работаем</h2>
          <div style={{display:"grid",gap:10,lineHeight:1.55}}>
            <div><b>1.</b> Вы находите клиента и отправляете свою персональную ссылку или QR.</div>
            <div><b>2.</b> GoVietStay принимает клиента и ведёт весь сервис: консультация, подтверждение, транспорт, гид, сопровождение.</div>
            <div><b>3.</b> Система фиксирует переход, обращение, бронирование и PAX за вашим кодом.</div>
            <div><b>4.</b> Ваш доход = 12% от фактической продажной стоимости каждого оплаченного PAX; без базовой выплаты.</div>
            <div><b>5.</b> Все спорные случаи сверяются по данным системы GoVietStay.</div>
          </div>
        </Box>

        <PartnerBookingTools supabase={supabase} token={token} partner={p} onCreated={load}/>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(185px,1fr))",gap:12,marginTop:14}}>
          <Metric label="Переходы" value={m.visits||0}/><Metric label="WhatsApp" value={m.whatsapp_clicks||0}/>
          <Metric label="Заявки" value={m.leads||0}/><Metric label="Бронирования" value={m.bookings||0}/>
          <Metric label="PAX за период" value={m.pax||0}/><Metric label="Выручка" value={money(m.revenue_vnd)}/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12,marginTop:14}}>
          <Metric label="Завершённые оплаченные PAX (месяц)" value={m.month_pax||0}/><Metric label="Ставка комиссии" value="12%"/>
          <Metric label="Комиссия" value={money(m.tour_commission_vnd)}/><Metric label="Итого доход" value={money(m.total_earning_vnd)}/>
        </div>

        <Box>
          <h2 style={h2}>Единая комиссия — 12% от цены продажи</h2>
          <div style={{lineHeight:1.7}}>Никакого базового оклада, уровней PAX или разных ставок по языку гида. Например: <b>Cham Island, 950 000 ₫ × 12% = 114 000 ₫ за одного гостя</b>. За четверых по той же цене — <b>456 000 ₫</b>. Другие туры рассчитываются по фактической цене продажи каждого гостя.</div>
          <div style={{...muted,marginTop:10}}>К выплате учитываются только завершённые, полностью оплаченные и финансово подтверждённые бронирования. Существующие индивидуальные договорённости по старым заказам не изменяются задним числом.</div>
        </Box>

        <Box>
          <h2 style={h2}>Расчёт комиссии за текущий месяц</h2>
          <div style={{overflowX:"auto"}}><table style={table}><thead><tr><Th>Тур</Th><Th>PAX</Th><Th>Выручка по завершённым турам</Th><Th>Ставка</Th><Th>Комиссия</Th></tr></thead><tbody>
            {breakdown.map((r:any,i:number)=><tr key={i}><Td><b>{r.tour_name||r.tour_code||"—"}</b></Td><Td>{r.pax||0}</Td><Td>{money(r.revenue_vnd)}</Td><Td>12%</Td><Td><b>{money(r.commission_vnd)}</b></Td></tr>)}
            {!breakdown.length&&<tr><Td colSpan={5}>Пока нет бронирований с рассчитанной комиссией.</Td></tr>}
          </tbody></table></div>
        </Box>

        <Box>
          <div style={{display:"flex",justifyContent:"space-between",gap:12,flexWrap:"wrap",alignItems:"center"}}>
            <h2 style={{...h2,marginBottom:0}}>Условия сотрудничества</h2>
            <span style={{fontSize:13,fontWeight:700,padding:"7px 10px",borderRadius:999,background:t.accepted?"#e9f8ee":"#fff3d8",color:t.accepted?"#23623a":"#805d12"}}>
              {t.accepted?"Принято":"Требуется подтверждение"} · v{t.version||TERMS_VERSION}
            </span>
          </div>
          <div style={{marginTop:14,display:"grid",gap:14}}>
            {terms.map(([title,body],i)=><div key={i} style={{padding:"14px 16px",border:"1px solid #e6ebf1",borderRadius:12,background:"#fbfcfe"}}>
              <div style={{fontWeight:800,marginBottom:6}}>{title}</div>
              <div style={{lineHeight:1.55,color:"#3d4b60"}}>{body}</div>
            </div>)}
          </div>

          {!t.accepted ? <div style={{marginTop:18,padding:"18px",background:"#f7f9fc",borderRadius:14,border:"1px solid #dfe6ef"}}>
            <div style={{fontWeight:800,marginBottom:8}}>Электронное подтверждение</div>
            <div style={{...muted,marginBottom:10}}>Введите полное имя. Система сохранит версию условий, имя и время подтверждения.</div>
            <input value={acceptName} onChange={e=>setAcceptName(e.target.value)} placeholder="Полное имя" style={{...input,maxWidth:460}}/>
            <div style={{marginTop:10}}>
              <button onClick={acceptTerms} disabled={accepting||acceptName.trim().length<2} style={{...btn,background:"#1264bb",color:"#fff",border:"none",cursor:"pointer"}}>
                {accepting?"Сохраняем…":"Я прочитал(а) и принимаю условия"}
              </button>
            </div>
            {acceptMsg&&<div style={{marginTop:10,color:"#23623a",fontWeight:700}}>{acceptMsg}</div>}
          </div> : <div style={{marginTop:18,padding:"14px 16px",background:"#eef9f1",borderRadius:12,color:"#23623a"}}>
            <b>Условия приняты.</b> Имя: {t.accepted_name||"—"} · Время: {t.accepted_at?new Date(t.accepted_at).toLocaleString("ru-RU"):"—"}
          </div>}
        </Box>

        <div style={{margin:"18px 4px",fontSize:12.5,color:"#738196",lineHeight:1.5}}>
          Настоящий портал фиксирует операционные правила партнёрской программы GoVietStay. Для сложных или крупных партнёрств стороны могут подписать отдельный двуязычный договор с полными юридическими реквизитами.
        </div>
      </>}
    </div>
  </main>
}

const muted:React.CSSProperties={marginTop:6,color:"#66758a",fontSize:14};
const btn:React.CSSProperties={border:"1px solid #d7dfeb",background:"#fff",borderRadius:10,padding:"10px 13px",fontWeight:700};
const input:React.CSSProperties={width:"100%",border:"1px solid #cfd8e4",borderRadius:10,padding:"11px 12px",fontSize:15};
const h2:React.CSSProperties={fontSize:20,margin:"0 0 12px"};
const table:React.CSSProperties={width:"100%",borderCollapse:"collapse",minWidth:620};
function Box({children}:{children:React.ReactNode}){return <div style={{marginTop:14,background:"#fff",borderRadius:16,padding:"20px 22px",boxShadow:"0 5px 20px rgba(22,40,65,.06)"}}>{children}</div>}
function Metric({label,value}:{label:string;value:any}){return <div style={{background:"#fff",borderRadius:16,padding:"18px 20px",boxShadow:"0 5px 20px rgba(22,40,65,.06)"}}><div style={{fontSize:13,color:"#718096"}}>{label}</div><div style={{fontSize:24,fontWeight:850,marginTop:7}}>{value}</div></div>}
function Th({children}:{children:React.ReactNode}){return <th style={{textAlign:"left",padding:"10px 8px",borderBottom:"1px solid #dfe6ef",fontSize:13,color:"#607086"}}>{children}</th>}
function Td({children,colSpan}:{children:React.ReactNode,colSpan?:number}){return <td colSpan={colSpan} style={{padding:"11px 8px",borderBottom:"1px solid #eef2f6"}}>{children}</td>}


