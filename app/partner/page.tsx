"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vscffgnxaexestnayvae.supabase.co";
const SUPABASE_KEY = "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function money(v:any){ return new Intl.NumberFormat("ru-RU").format(Number(v||0))+" ₫"; }

export default function PartnerDashboard(){
  const [token,setToken]=useState("");
  const [days,setDays]=useState(30);
  const [data,setData]=useState<any>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  useEffect(()=>{
    try{ setToken(new URLSearchParams(window.location.search).get("token")||""); }
    catch{ setToken(""); }
  },[]);

  useEffect(()=>{
    if(!token){setLoading(false);return;}
    let alive=true;
    (async()=>{
      setLoading(true); setError("");
      const {data,error}=await supabase.rpc("partner_dashboard",{p_token:token,p_days:days});
      if(!alive)return;
      if(error){setError(error.message);setData(null);}
      else if(!data){setError("Ссылка недействительна или партнёр неактивен.");setData(null);}
      else setData(data);
      setLoading(false);
    })();
    return()=>{alive=false;};
  },[token,days]);

  const m=data?.metrics||{};
  const p=data?.partner||{};
  const breakdown=Array.isArray(m.commission_breakdown)?m.commission_breakdown:[];

  return <main style={{minHeight:"100vh",background:"#f4f7fb",padding:"28px 16px",fontFamily:"Arial, sans-serif",color:"#172033"}}>
    <div style={{maxWidth:1080,margin:"0 auto"}}>
      <div style={{background:"#0f2747",color:"#fff",borderRadius:20,padding:"26px 28px"}}>
        <div style={{fontSize:13,opacity:.78,letterSpacing:1}}>GOVIETSTAY</div>
        <h1 style={{margin:"6px 0 4px",fontSize:30}}>Партнёрский кабинет</h1>
        <div style={{opacity:.85}}>QR → заявки → бронирования → PAX → доход</div>
      </div>

      {!token&&!loading&&<Box><b>Ссылка на кабинет не найдена.</b></Box>}
      {loading&&<Box>Загрузка статистики…</Box>}
      {error&&<Box><span style={{color:"#8f2525"}}>{error}</span></Box>}

      {data&&<>
        <Box>
          <div style={{display:"flex",justifyContent:"space-between",gap:18,flexWrap:"wrap",alignItems:"center"}}>
            <div>
              <div style={{fontSize:24,fontWeight:800}}>{p.name}</div>
              <div style={{marginTop:6,color:"#607086"}}>Код партнёра: <b>{p.ref_code}</b></div>
            </div>
            <select value={days} onChange={e=>setDays(Number(e.target.value))} style={btn}>
              <option value={7}>7 дней</option>
              <option value={30}>30 дней</option>
              <option value={90}>90 дней</option>
              <option value={365}>365 дней</option>
            </select>
          </div>
        </Box>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12,marginTop:14}}>
          <Metric label="Переходы по QR" value={m.visits||0}/>
          <Metric label="WhatsApp" value={m.whatsapp_clicks||0}/>
          <Metric label="Заявки" value={m.leads||0}/>
          <Metric label="Бронирования" value={m.bookings||0}/>
          <Metric label="PAX за период" value={m.pax||0}/>
          <Metric label="Выручка" value={money(m.revenue_vnd)}/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12,marginTop:14}}>
          <Metric label="PAX в этом месяце" value={m.month_pax||0}/>
          <Metric label="Базовая зарплата" value={money(m.base_salary_vnd)}/>
          <Metric label="Комиссия за туры" value={money(m.tour_commission_vnd)}/>
          <Metric label="Итого доход" value={money(m.total_earning_vnd)}/>
        </div>

        <Box>
          <div style={{fontWeight:800,fontSize:18,marginBottom:12}}>Расчёт комиссии за текущий месяц</div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
              <thead><tr>
                <Th>Тур</Th><Th>Гид</Th><Th>PAX</Th><Th>Комиссия / PAX</Th><Th>Итого</Th>
              </tr></thead>
              <tbody>
                {breakdown.map((r:any,i:number)=><tr key={i}>
                  <Td><b>{r.tour_name||r.tour_code||"—"}</b></Td>
                  <Td>{String(r.guide_language||"—").toUpperCase()}</Td>
                  <Td>{r.pax||0}</Td>
                  <Td>{money(r.commission_per_pax_vnd)}</Td>
                  <Td><b>{money(r.commission_vnd)}</b></Td>
                </tr>)}
                {!breakdown.length&&<tr><Td colSpan={5}>Пока нет бронирований с рассчитанной комиссией.</Td></tr>}
              </tbody>
            </table>
          </div>
        </Box>

        <div style={{margin:"18px 4px",fontSize:13,color:"#738196"}}>
          В системе 1 тур = 1 PAX. Уровень базовой зарплаты и ставка комиссии зависят от общего количества PAX за календарный месяц. Комиссия рассчитывается отдельно по каждому туру и языку гида EN/RU.
        </div>
      </>}
    </div>
  </main>;
}

const btn:React.CSSProperties={border:"1px solid #d7dfeb",background:"#fff",borderRadius:10,padding:"10px 13px",fontWeight:700};
function Box({children}:{children:React.ReactNode}){return <div style={{marginTop:14,background:"#fff",borderRadius:16,padding:"20px 22px",boxShadow:"0 5px 20px rgba(22,40,65,.06)"}}>{children}</div>}
function Metric({label,value}:{label:string;value:any}){return <div style={{background:"#fff",borderRadius:16,padding:"18px 20px",boxShadow:"0 5px 20px rgba(22,40,65,.06)"}}><div style={{fontSize:13,color:"#718096"}}>{label}</div><div style={{fontSize:25,fontWeight:850,marginTop:7}}>{value}</div></div>}
function Th({children}:{children:React.ReactNode}){return <th style={{textAlign:"left",padding:"10px 8px",borderBottom:"1px solid #dfe6ef",fontSize:13,color:"#607086"}}>{children}</th>}
function Td({children,colSpan}:{children:React.ReactNode,colSpan?:number}){return <td colSpan={colSpan} style={{padding:"11px 8px",borderBottom:"1px solid #eef2f6"}}>{children}</td>}
