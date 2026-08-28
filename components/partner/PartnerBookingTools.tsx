"use client";

import { useEffect, useMemo, useState } from "react";

function money(v:any){return new Intl.NumberFormat("ru-RU").format(Number(v||0))+" ₫";}
function dateRu(v:any){
  if(!v)return "—";
  try{return new Date(v+"T00:00:00").toLocaleDateString("ru-RU")}catch{return String(v)}
}

export default function PartnerBookingTools({supabase,token,partner,onCreated}:any){
  const [catalog,setCatalog]=useState<any[]>([]);
  const [recent,setRecent]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState("");
  const [msg,setMsg]=useState("");
  const [last,setLast]=useState<any>(null);
  const [tourId,setTourId]=useState("");
  const [adults,setAdults]=useState(1);
  const [children,setChildren]=useState(0);
  const [total,setTotal]=useState("");
  const [copied,setCopied]=useState("");

  const selected=useMemo(()=>catalog.find(x=>x.id===tourId)||null,[catalog,tourId]);

  useEffect(()=>{
    if(!selected)return;
    const a=Number(selected.adult_price_vnd||0);
    const c=Number(selected.child_price_vnd ?? selected.adult_price_vnd ?? 0);
    if(a||c)setTotal(String(a*adults+c*children));
  },[selected,adults,children]);

  async function load(){
    if(!token)return;
    setLoading(true);setError("");
    try{
      const [a,b]=await Promise.all([
        supabase.rpc("partner_booking_catalog",{p_token:token}),
        supabase.rpc("partner_recent_bookings",{p_token:token,p_limit:20})
      ]);
      if(a.error)throw a.error;
      if(b.error)throw b.error;
      const tours=Array.isArray(a.data)?a.data:[];
      setCatalog(tours);
      setRecent(Array.isArray(b.data)?b.data:[]);
      if(!tourId&&tours[0]?.id)setTourId(tours[0].id);
    }catch(e:any){setError(e?.message||"Не удалось загрузить бронирования.")}
    finally{setLoading(false)}
  }
  useEffect(()=>{load()},[token]);

  async function copy(text:string,key:string){
    try{
      await navigator.clipboard.writeText(text);
      setCopied(key);setTimeout(()=>setCopied(""),1800);
    }catch{setError("Не удалось скопировать текст.")}
  }

  function customerText(b:any){
    const balance=Math.max(0,Number(b.total_vnd||b.gross_revenue_vnd||0)-Number(b.deposit_vnd||b.deposit_required_vnd||0));
    return `✅ GoVietStay — подтверждение бронирования

Номер бронирования: ${b.booking_code||"—"}
Тур: ${b.tour_name||"—"}
Дата: ${dateRu(b.tour_date)}
Гости: ${Number(b.adults||0)} взрослых${Number(b.children||0)>0?` + ${Number(b.children)} детей`:""} (${Number(b.pax||0)} PAX)
Гид: ${String(b.guide_language||"—").toUpperCase()}
Отель: ${b.hotel||"—"}${b.room?` · комната ${b.room}`:""}
Время встречи: ${b.pickup_time||"будет подтверждено"}
Стоимость: ${money(b.total_vnd||b.gross_revenue_vnd)}
Депозит: ${money(b.deposit_vnd||b.deposit_required_vnd)}
Остаток: ${money(balance)}

Ваше бронирование зарегистрировано в системе GoVietStay.
Информация о турах и поддержка:
${b.customer_website||"https://www.govietstay.com/ru"}

GoVietStay — Trusted Local Support`;
  }

  function supplierText(b:any){
    return `GVS ${b.booking_code||""}
Tour: ${b.tour_name||"—"}
Date: ${b.tour_date||"—"}
Guest: ${b.customer_name||"—"}
Phone/WA: ${b.customer_phone||"—"}
Pax: ${Number(b.adults||0)} ADL${Number(b.children||0)>0?` + ${Number(b.children)} CHD`:""} (${Number(b.pax||0)} pax)
Hotel: ${b.hotel||"—"}
Room: ${b.room||"—"}
Pickup: ${b.pickup_time||"TBC"}
Guide: ${String(b.guide_language||"—").toUpperCase()}
Note: ${b.notes||"—"}`;
  }

  function normalizeRecent(b:any){
    return {
      ...b,
      total_vnd:b.gross_revenue_vnd,
      deposit_vnd:b.deposit_required_vnd,
      customer_website:b.customer_website||"https://www.govietstay.com/ru"
    };
  }

  async function submit(e:any){
    e.preventDefault();setSaving(true);setError("");setMsg("");setLast(null);
    const f=new FormData(e.currentTarget);
    try{
      const payload={
        p_token:token,
        p_tour_id:String(f.get("tour_id")||tourId),
        p_tour_date:String(f.get("tour_date")||""),
        p_customer_name:String(f.get("customer_name")||"").trim(),
        p_customer_phone:String(f.get("customer_phone")||"").trim(),
        p_adults:Math.max(0,Number(f.get("adults")||0)),
        p_children:Math.max(0,Number(f.get("children")||0)),
        p_guide_language:String(f.get("guide_language")||"ru"),
        p_hotel:String(f.get("hotel")||"").trim()||null,
        p_room:String(f.get("room")||"").trim()||null,
        p_pickup_time:String(f.get("pickup_time")||"").trim()||null,
        p_total_vnd:Math.max(0,Number(String(f.get("total_vnd")||"0").replace(/[^0-9]/g,""))),
        p_deposit_vnd:Math.max(0,Number(String(f.get("deposit_vnd")||"0").replace(/[^0-9]/g,""))),
        p_payment_status:String(f.get("payment_status")||"unpaid"),
        p_notes:String(f.get("notes")||"").trim()||null
      };
      const {data,error}=await supabase.rpc("partner_create_booking",payload);
      if(error)throw error;
      setLast(data);
      setMsg(`Бронирование ${data.booking_code} создано. PAX и комиссия уже записаны в систему.`);
      e.currentTarget.reset();
      setAdults(1);setChildren(0);setTotal("");
      await load();
      if(onCreated)await onCreated();
    }catch(e:any){setError(e?.message||"Не удалось создать бронирование.")}
    finally{setSaving(false)}
  }

  return <>
    <section style={box}>
      <div style={{display:"flex",justifyContent:"space-between",gap:12,flexWrap:"wrap",alignItems:"center"}}>
        <div>
          <h2 style={h2}>Создать бронирование</h2>
          <div style={muted}>Используйте эту форму для прямой продажи у стойки. Ваш код <b>{partner?.ref_code}</b> добавляется автоматически.</div>
        </div>
        <span style={pill}>Partner Booking V1</span>
      </div>

      {error&&<div style={errBox}>{error}</div>}
      {msg&&<div style={okBox}>{msg}</div>}

      <form onSubmit={submit}>
        <div style={grid}>
          <Field label="Тур">
            <select name="tour_id" value={tourId} onChange={e=>setTourId(e.target.value)} style={input} required>
              {catalog.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </Field>
          <Field label="Дата тура"><input name="tour_date" type="date" style={input} required/></Field>
          <Field label="Имя клиента"><input name="customer_name" style={input} placeholder="Ivan Petrov" required/></Field>
          <Field label="WhatsApp / телефон"><input name="customer_phone" style={input} placeholder="+7 / +84..." required/></Field>
          <Field label="Взрослые"><input name="adults" type="number" min="0" max="100" value={adults} onChange={e=>setAdults(Number(e.target.value))} style={input} required/></Field>
          <Field label="Дети"><input name="children" type="number" min="0" max="100" value={children} onChange={e=>setChildren(Number(e.target.value))} style={input}/></Field>
          <Field label="Язык гида">
            <select name="guide_language" style={input} defaultValue="ru"><option value="ru">Русский (RU)</option><option value="en">Английский (EN)</option></select>
          </Field>
          <Field label="Отель"><input name="hotel" style={input} placeholder="Hotel name"/></Field>
          <Field label="Комната"><input name="room" style={input} placeholder="Room 1205"/></Field>
          <Field label="Время встречи"><input name="pickup_time" style={input} placeholder="07:30"/></Field>
          <Field label="Итоговая сумма (VND)"><input name="total_vnd" inputMode="numeric" value={total} onChange={e=>setTotal(e.target.value.replace(/[^0-9]/g,""))} style={input} required/></Field>
          <Field label="Депозит (VND)"><input name="deposit_vnd" inputMode="numeric" defaultValue="0" style={input}/></Field>
          <Field label="Оплата">
            <select name="payment_status" style={input} defaultValue="unpaid">
              <option value="unpaid">Не оплачено</option><option value="deposit">Депозит</option><option value="partial">Частично</option><option value="paid">Оплачено</option>
            </select>
          </Field>
          <Field label="Примечание"><input name="notes" style={input} placeholder="Special request..."/></Field>
        </div>

        {selected&&<div style={{...muted,marginTop:10}}>
          Рекомендованная цена в каталоге: взрослый {money(selected.adult_price_vnd)}{selected.child_price_vnd?` · ребёнок ${money(selected.child_price_vnd)}`:""}.
          Итог можно изменить, если цена была отдельно согласована.
        </div>}

        <button type="submit" disabled={saving||loading} style={primaryBtn}>{saving?"Сохраняем…":"Подтвердить и записать бронирование"}</button>
      </form>
    </section>

    {last&&<section style={box}>
      <h2 style={h2}>Готово: {last.booking_code}</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12}}>
        <ActionCard title="Клиенту" desc="Русское подтверждение + сайт GoVietStay" button={copied==="customer-last"?"Скопировано ✓":"Copy confirmation"} onClick={()=>copy(customerText(last),"customer-last")}/>
        <ActionCard title="Поставщику" desc="Короткая операционная версия без комиссии" button={copied==="supplier-last"?"Скопировано ✓":"Copy supplier"} onClick={()=>copy(supplierText(last),"supplier-last")}/>
      </div>
    </section>}

    <section style={box}>
      <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"center",flexWrap:"wrap"}}>
        <div><h2 style={h2}>Последние бронирования</h2><div style={muted}>Все эти записи уже связаны с вашим Partner Code.</div></div>
        <button type="button" style={secondaryBtn} onClick={load}>{loading?"Загрузка…":"Обновить"}</button>
      </div>
      <div style={{overflowX:"auto",marginTop:12}}>
        <table style={{width:"100%",borderCollapse:"collapse",minWidth:900}}>
          <thead><tr><Th>Booking</Th><Th>Тур / дата</Th><Th>Клиент</Th><Th>PAX</Th><Th>Сумма</Th><Th>Статус</Th><Th>Действия</Th></tr></thead>
          <tbody>
          {recent.map((raw:any)=>{
            const b=normalizeRecent(raw);
            return <tr key={b.id}>
              <Td><b>{b.booking_code}</b></Td>
              <Td>{b.tour_name}<br/><span style={small}>{dateRu(b.tour_date)}</span></Td>
              <Td>{b.customer_name||"—"}<br/><span style={small}>{b.customer_phone||"—"}</span></Td>
              <Td>{b.pax||0}</Td>
              <Td>{money(b.gross_revenue_vnd)}</Td>
              <Td>{b.status}<br/><span style={small}>{b.payment_status}</span></Td>
              <Td>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  <button type="button" style={secondaryBtn} onClick={()=>copy(customerText(b),"c"+b.id)}>{copied==="c"+b.id?"✓":"Клиенту"}</button>
                  <button type="button" style={secondaryBtn} onClick={()=>copy(supplierText(b),"s"+b.id)}>{copied==="s"+b.id?"✓":"Поставщику"}</button>
                </div>
              </Td>
            </tr>
          })}
          {!recent.length&&!loading&&<tr><Td colSpan={7}>Пока нет бронирований.</Td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  </>;
}

function Field({label,children}:{label:string,children:any}){return <label style={{display:"grid",gap:6,fontSize:13,fontWeight:700,color:"#43526a"}}><span>{label}</span>{children}</label>}
function ActionCard({title,desc,button,onClick}:{title:string,desc:string,button:string,onClick:()=>void}){return <div style={{border:"1px solid #e1e8f0",borderRadius:14,padding:16,background:"#fbfcfe"}}><div style={{fontWeight:800,fontSize:18}}>{title}</div><div style={{...muted,minHeight:34}}>{desc}</div><button type="button" onClick={onClick} style={{...primaryBtn,marginTop:12}}>{button}</button></div>}
function Th({children}:{children:any}){return <th style={{textAlign:"left",padding:"10px 8px",borderBottom:"1px solid #dfe6ef",fontSize:12,color:"#66758a"}}>{children}</th>}
function Td({children,colSpan}:{children:any,colSpan?:number}){return <td colSpan={colSpan} style={{padding:"11px 8px",borderBottom:"1px solid #edf1f5",verticalAlign:"top"}}>{children}</td>}

const box:React.CSSProperties={marginTop:14,background:"#fff",borderRadius:16,padding:"20px 22px",boxShadow:"0 5px 20px rgba(22,40,65,.06)"};
const h2:React.CSSProperties={fontSize:20,margin:"0 0 8px"};
const muted:React.CSSProperties={fontSize:13.5,color:"#66758a",lineHeight:1.45};
const small:React.CSSProperties={fontSize:12,color:"#77859a"};
const grid:React.CSSProperties={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:12,marginTop:16};
const input:React.CSSProperties={width:"100%",boxSizing:"border-box",border:"1px solid #ccd7e4",borderRadius:10,padding:"10px 11px",fontSize:14,background:"#fff"};
const primaryBtn:React.CSSProperties={border:"none",background:"#1264bb",color:"#fff",borderRadius:10,padding:"11px 14px",fontWeight:800,cursor:"pointer",marginTop:14};
const secondaryBtn:React.CSSProperties={border:"1px solid #d5deea",background:"#f7f9fc",color:"#19324f",borderRadius:9,padding:"8px 10px",fontWeight:700,cursor:"pointer"};
const pill:React.CSSProperties={padding:"7px 10px",borderRadius:999,background:"#e8f2ff",color:"#145696",fontSize:12,fontWeight:800};
const okBox:React.CSSProperties={marginTop:12,padding:"11px 13px",borderRadius:10,background:"#eef9f1",color:"#23623a",fontWeight:700};
const errBox:React.CSSProperties={marginTop:12,padding:"11px 13px",borderRadius:10,background:"#fff0f0",color:"#922",fontWeight:700};
