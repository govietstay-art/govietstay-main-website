"use client";
import {useMemo,useState,type FormEvent} from "react";
import {BW_JOIN,BW_PRIVATE,BW_CHARTER,blueWavesPrice,bwMoney,type TourFormat,type PickupZone} from "../lib/blueWavesRetail";
type Props={code:string;title:string};
const zones=[["center","Дуонг Донг / центр"],["north","Север острова"],["south","Юг острова"]] as const;
const blank={fullName:"",whatsapp:"",email:"",tourDate:"",adults:2,children:0,infants:0,childDetails:"",hotel:"",pickup:"",request:"",website:""};
export default function BlueWavesBookingForm({code,title}:Props){
 const types=(["join","private","charter"] as TourFormat[]).filter(t=>t==="join"?!!BW_JOIN[code]:t==="private"?!!BW_PRIVATE[code]:!!BW_CHARTER[code]);
 const [format,setFormat]=useState<TourFormat>(types[0]||"join");
 const [zone,setZone]=useState<PickupZone>("center");
 const [session,setSession]=useState("morning");
 const [skyLoungeGuests,setSkyLoungeGuests]=useState(0);
 const [form,setForm]=useState(blank);
 const [saving,setSaving]=useState(false);
 const [error,setError]=useState("");
 const [success,setSuccess]=useState<string|null>(null);
 const totalGuests=form.adults+form.children+form.infants;
 const price=useMemo(()=>blueWavesPrice({code,format,zone,adults:form.adults,children:form.children,infants:form.infants,session,skyLoungeGuests}),[code,format,zone,form.adults,form.children,form.infants,session,skyLoungeGuests]);
 const set=(key:keyof typeof blank,value:string|number)=>setForm(v=>({...v,[key]:value}));
 async function submit(e:FormEvent){
  e.preventDefault();setError("");setSuccess(null);
  if(!price){setError("Для такого состава гостей необходимо уточнить стоимость у менеджера.");return;}
  setSaving(true);
  try{
   const r=await fetch("/api/blue-waves-booking-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,tourCode:code,format,pickupZone:zone,session,skyLoungeGuests})});
   const data=await r.json();
   if(!r.ok)throw new Error(data?.error||"Booking request failed");
   setSuccess(data.booking_code||"Pending");
  }catch(e){setError(e instanceof Error?e.message:"Не удалось отправить заявку.");}
  finally{setSaving(false);}
 }
 const visible=(format==="join"&&code==="PQ-09");
 return <section id="bluewaves-booking-form" className="mt-6 rounded-3xl border border-emerald-900/15 bg-[#f0f7f3] p-4 text-[#06251b] md:p-6">
  <h3 className="text-xl font-extrabold">Заявка GoVietStay</h3>
  <p className="mt-2 text-sm">Выбран тур {code}: {title}. Заявка поступит в Booking Master на проверку. Оплата и депозит — только после подтверждения мест.</p>
  {success?<div className="mt-5 rounded-xl bg-white p-4"><p className="font-extrabold text-green-900">Заявка принята: {success}</p><p className="mt-2 text-sm">Статус: Pending. GoVietStay свяжется с вами, проверит наличие мест и пришлёт ссылку для депозита после подтверждения.</p></div>:
  <form onSubmit={submit} className="mt-5 grid gap-3 sm:grid-cols-2">
   <label className="text-sm font-bold">Формат
    <select value={format} onChange={e=>{setFormat(e.target.value as TourFormat);setError("");}} className="mt-1 min-h-11 w-full rounded-xl border bg-white px-3">
     {types.map(t=><option key={t} value={t}>{t==="join"?"Групповой":t==="private"?"Индивидуальный":"Чартер"}</option>)}
    </select>
   </label>
   <label className="text-sm font-bold">Район отеля / трансфера
    <select value={zone} onChange={e=>setZone(e.target.value as PickupZone)} className="mt-1 min-h-11 w-full rounded-xl border bg-white px-3">{zones.map(([k,v])=><option key={k} value={k}>{v}</option>)}</select>
   </label>
   {visible&&<label className="text-sm font-bold">Время круиза
    <select value={session} onChange={e=>setSession(e.target.value)} className="mt-1 min-h-11 w-full rounded-xl border bg-white px-3"><option value="morning">Утренний</option><option value="sunset">Закатный</option></select>
   </label>}
   <label className="text-sm font-bold">Дата тура
    <input required type="date" value={form.tourDate} onChange={e=>set("tourDate",e.target.value)} className="mt-1 min-h-11 w-full rounded-xl border bg-white px-3"/>
   </label>
   {([["adults","Взрослые"],["children","Дети 100–139 см"],["infants","Дети до 100 см"]] as const).map(([k,v])=><label key={k} className="text-sm font-bold">{v}
    <input type="number" min={0} max={100} required value={form[k]} onChange={e=>set(k,Math.max(0,Math.floor(Number(e.target.value)||0)))} className="mt-1 min-h-11 w-full rounded-xl border bg-white px-3"/>
   </label>)}
   {(code==="PQ-14"||code==="PQ-15")&&<label className="text-sm font-bold">Sky Lounge — количество доплат (+500 000 VND/чел.)
    <input type="number" min={0} max={totalGuests} value={skyLoungeGuests} onChange={e=>setSkyLoungeGuests(Math.max(0,Math.min(totalGuests,Math.floor(Number(e.target.value)||0))))} className="mt-1 min-h-11 w-full rounded-xl border bg-white px-3"/>
   </label>}
   <label className="text-sm font-bold">Имя и фамилия
    <input required autoComplete="name" value={form.fullName} onChange={e=>set("fullName",e.target.value)} className="mt-1 min-h-11 w-full rounded-xl border bg-white px-3"/>
   </label>
   <label className="text-sm font-bold">WhatsApp / телефон
    <input required type="tel" autoComplete="tel" value={form.whatsapp} onChange={e=>set("whatsapp",e.target.value)} className="mt-1 min-h-11 w-full rounded-xl border bg-white px-3"/>
   </label>
   <label className="text-sm font-bold">Email
    <input type="email" autoComplete="email" value={form.email} onChange={e=>set("email",e.target.value)} className="mt-1 min-h-11 w-full rounded-xl border bg-white px-3"/>
   </label>
   <label className="text-sm font-bold">Отель
    <input value={form.hotel} onChange={e=>set("hotel",e.target.value)} className="mt-1 min-h-11 w-full rounded-xl border bg-white px-3"/>
   </label>
   <label className="text-sm font-bold sm:col-span-2">Возраст и рост каждого ребёнка
    <input value={form.childDetails} onChange={e=>set("childDetails",e.target.value)} placeholder="Например: 7 лет, 121 см" className="mt-1 min-h-11 w-full rounded-xl border bg-white px-3"/>
   </label>
   <label className="text-sm font-bold sm:col-span-2">Адрес посадки / пожелания
    <textarea rows={2} value={form.request} onChange={e=>set("request",e.target.value)} className="mt-1 w-full rounded-xl border bg-white p-3"/>
   </label>
   <div className="sm:col-span-2 rounded-xl bg-white p-4">
    <p className="text-sm">Предварительная стоимость · публичный тариф GoVietStay</p>
    <p className="mt-1 text-2xl font-extrabold">{price?bwMoney(price.gross):"Уточните состав группы"}</p>
    {price&&<p className="mt-1 text-xs">≈ US${Math.round(price.gross/26000).toLocaleString("en-US")} · 1 USD ≈ 26 000 VND</p>}
    <p className="mt-2 text-xs text-gray-700">Детские тарифы зависят от роста и условий тура. Итоговая стоимость, трансфер, погода и наличие мест подтверждаются до оплаты. Заполнение формы не списывает деньги.</p>
   </div>
   {error&&<p role="alert" className="sm:col-span-2 text-sm font-bold text-red-700">{error}</p>}
   <input name="website" value={form.website} onChange={e=>set("website",e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
   <button type="submit" disabled={saving||!price} className="min-h-12 rounded-full bg-[#ff5a16] px-6 font-extrabold text-white disabled:opacity-60 sm:col-span-2">{saving?"Отправка...":"Отправить заявку GoVietStay"}</button>
  </form>}
 </section>;
}
