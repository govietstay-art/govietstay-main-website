"use client";
import { useState,type FormEvent } from "react";

import {sendPublicInquiry} from "../lib/publicInquiryClient";
type Locale="en"|"ru"|"it";
type Props={productCode:string;productName:string;sourcePage:string;locale?:Locale;compact?:boolean};
export default function PublicInquiryForm({productCode,productName,sourcePage,locale="en",compact=false}:Props){
 const ru=locale==="ru";
 const it=locale==="it";
 const [name,setName]=useState("");
 const [phone,setPhone]=useState("");
 const [email,setEmail]=useState("");
 const [date,setDate]=useState("");
 const [adults,setAdults]=useState("2");
 const [children,setChildren]=useState("0");
 const [hotel,setHotel]=useState("");
 const [details,setDetails]=useState("");
 const [website,setWebsite]=useState("");
 const [saving,setSaving]=useState(false);
 const [code,setCode]=useState("");
 const [error,setError]=useState("");
 async function send(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(saving)return;
  setSaving(true);setError("");
  try{
   const result=await sendPublicInquiry({
     product_code:productCode,product_name:productName,source_page:sourcePage,
     full_name:name.trim(),whatsapp:phone.trim(),email:email.trim(),tour_date:date,
     adults:Number(adults),children:Number(children),hotel:hotel.trim(),details:details.trim(),
     language:locale,website
   });
   setCode(result.inquiry_code);
  }catch(e:any){setError(e?.message||"Unable to send request.");}
  finally{setSaving(false);}
 }
 const wa="https://wa.me/84937762607?text="+encodeURIComponent(
  (ru?"Здравствуйте! Мой запрос GoVietStay: ":it?"Buongiorno! La mia richiesta GoVietStay è ":"Hello, my GoVietStay request is ")+code+
  ". "+productName
 );
 const input="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-950";
 if(code)return <div className="rounded-2xl border border-green-300 bg-green-50 p-5 text-green-950" role="status">
  <p className="font-bold">{ru?"Запрос получен":it?"Richiesta ricevuta":"Request received"}: {code}</p>
  <p className="mt-2 text-sm">{ru?"Мы проверим доступность и свяжемся с вами. Экскурсия ещё не подтверждена.":it?"Verificheremo la disponibilità e ti contatteremo. Questa non è una prenotazione confermata.":"We will check availability and contact you. This is not a confirmed booking."}</p>
  <a className="mt-4 inline-block rounded-xl bg-green-700 px-4 py-3 font-semibold text-white" href={wa} target="_blank" rel="noreferrer">{ru?"Написать в WhatsApp":it?"Continua su WhatsApp":"Continue in WhatsApp"}</a>
 </div>;
 return <form onSubmit={send} className={"rounded-2xl border border-green-200 bg-white p-5 text-slate-900 "+(compact?"":"shadow-md")}>
  <h3 className="text-xl font-bold">{ru?"Отправить запрос":it?"Richiedi disponibilità":"Request availability"}</h3>
  <p className="mb-4 mt-2 text-sm text-slate-600">{ru?"Бесплатный запрос. Мы подтвердим наличие мест, дату и стоимость до оплаты.":it?"Richiesta gratuita. Confermeremo disponibilità, orari e prezzo prima di qualsiasi pagamento.":"Free inquiry. We will confirm availability, timing and price before any payment."}</p>
  <div className="grid gap-3 sm:grid-cols-2">
   <label className="text-sm font-medium">{ru?"Имя":it?"Nome completo":"Full name"} *
    <input className={input} value={name} maxLength={160} onChange={e=>setName(e.target.value)} required autoComplete="name"/>
   </label>
   <label className="text-sm font-medium">WhatsApp *
    <input className={input} type="tel" value={phone} maxLength={80} onChange={e=>setPhone(e.target.value)} required autoComplete="tel"/>
   </label>
   <label className="text-sm font-medium">{ru?"Дата":it?"Data del viaggio":"Travel date"}
    <input className={input} type="date" value={date} onChange={e=>setDate(e.target.value)}/>
   </label>
   <div className="grid grid-cols-2 gap-2">
    <label className="text-sm font-medium">{ru?"Взрослые":it?"Adulti":"Adults"}
     <input className={input} type="number" min="0" max="40" value={adults} onChange={e=>setAdults(e.target.value)} required/>
    </label>
    <label className="text-sm font-medium">{ru?"Дети":it?"Bambini":"Children"}
     <input className={input} type="number" min="0" max="40" value={children} onChange={e=>setChildren(e.target.value)} required/>
    </label>
   </div>
   <label className="text-sm font-medium">Email
    <input className={input} type="email" value={email} maxLength={160} onChange={e=>setEmail(e.target.value)} autoComplete="email"/>
   </label>
   <label className="text-sm font-medium">{ru?"Отель / район":it?"Hotel / zona":"Hotel / area"}
    <input className={input} value={hotel} maxLength={200} onChange={e=>setHotel(e.target.value)}/>
   </label>
  </div>
  <label className="mt-3 block text-sm font-medium">{ru?"Пожелания":it?"Richieste particolari":"Special requests"}
   <textarea className={input} rows={2} maxLength={2000} value={details} onChange={e=>setDetails(e.target.value)}/>
  </label>
  <label className="absolute -left-[9999px]" aria-hidden="true">Leave blank
   <input tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)}/>
  </label>
  {error&&<div role="alert" className="mt-3 text-sm text-red-700">{error} <a href="https://wa.me/84937762607" target="_blank" rel="noreferrer" className="underline">WhatsApp</a></div>}
  <button type="submit" disabled={saving} className="mt-4 w-full rounded-xl bg-green-800 px-5 py-3 font-bold text-white disabled:opacity-50">{saving?(ru?"Отправляем…":it?"Invio in corso…":"Sending…"):(ru?"Отправить запрос":it?"Invia richiesta":"Send inquiry")}</button>
  <p className="mt-2 text-xs text-slate-500">{ru?"Отправка запроса не подтверждает бронирование.":it?"La richiesta non conferma la prenotazione.":"Submitting does not confirm a booking."}</p>
 </form>;
}
