"use client";

import { useState, type FormEvent } from "react";
import { sendPublicInquiry } from "../lib/publicInquiryClient";

type Props = { productCode: string; productName: string; sourcePage: string };

export default function FinnishTravelInquiry({productCode,productName,sourcePage}:Props) {
  const [name,setName]=useState("");
  const [contact,setContact]=useState("");
  const [email,setEmail]=useState("");
  const [date,setDate]=useState("");
  const [adults,setAdults]=useState("2");
  const [children,setChildren]=useState("0");
  const [hotel,setHotel]=useState("");
  const [details,setDetails]=useState("");
  const [website,setWebsite]=useState("");
  const [sending,setSending]=useState(false);
  const [error,setError]=useState("");
  const [confirmation,setConfirmation]=useState("");
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(sending) return;
    setSending(true); setError("");
    try {
      const response=await sendPublicInquiry({
        product_code:productCode,
        product_name:productName,
        source_page:sourcePage,
        full_name:name.trim(),
        whatsapp:contact.trim(),
        email:email.trim(),
        tour_date:date,
        adults:Number(adults),
        children:Number(children),
        hotel:hotel.trim(),
        details:details.trim(),
        language:"fi",
        website,
      });
      setConfirmation(response.inquiry_code);
    } catch {
      setError("Lomakkeen lähettäminen epäonnistui. Ota yhteyttä WhatsAppilla.");
    } finally {
      setSending(false);
    }
  }
  const wa="https://wa.me/84937762607?text="+encodeURIComponent("Hello GoVietStay, my inquiry reference is "+confirmation+" ("+productName+"). I am visiting Vietnam from Finland.");
  const input="mt-1 block min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-950 outline-offset-2 focus:border-emerald-700 focus:outline-emerald-700";
  if(confirmation) return (
    <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950">
      <h3 className="text-xl font-bold">Kiitos! Saimme kyselysi.</h3>
      <p className="mt-3 text-base leading-7">Viite: <strong>{confirmation}</strong>. Tarkistamme saatavuuden ja otamme yhteyttä. Tämä ei vielä ole vahvistettu varaus.</p>
      <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block rounded-xl bg-emerald-900 px-5 py-3 font-bold text-white hover:bg-emerald-800">Jatka WhatsAppissa →</a>
    </div>
  );
  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm sm:p-7">
      <h3 className="text-2xl font-bold">Kysy matkastasi</h3>
      <p className="mt-2 mb-5 text-base leading-7 text-slate-600">Kysely on maksuton. Vahvistamme päivämäärän, palvelun sisällön ja hinnan ennen maksua. Palvelemme tavallisesti englanniksi tai venäjäksi.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">Nimi *<input className={input} autoComplete="name" maxLength={160} required value={name} onChange={e=>setName(e.target.value)} /></label>
        <label className="text-sm font-semibold">WhatsApp (maakoodin kanssa) *<input className={input} autoComplete="tel" type="tel" maxLength={80} required value={contact} onChange={e=>setContact(e.target.value)} placeholder="+358..." /></label>
        <label className="text-sm font-semibold">Retkipäivä / aloituspäivä<input className={input} type="date" value={date} onChange={e=>setDate(e.target.value)} /></label>
        <label className="text-sm font-semibold">Sähköposti<input className={input} type="email" autoComplete="email" maxLength={160} value={email} onChange={e=>setEmail(e.target.value)} /></label>
        <label className="text-sm font-semibold">Aikuiset<input className={input} type="number" min="0" max="40" required value={adults} onChange={e=>setAdults(e.target.value)} /></label>
        <label className="text-sm font-semibold">Lapset<input className={input} type="number" min="0" max="40" required value={children} onChange={e=>setChildren(e.target.value)} /></label>
        <label className="text-sm font-semibold sm:col-span-2">Hotelli / alue<input className={input} maxLength={200} value={hotel} onChange={e=>setHotel(e.target.value)} placeholder="Hotellin nimi tai alue" /></label>
      </div>
      <label className="mt-4 block text-sm font-semibold">Mistä olet kiinnostunut? Lasten iät ja erityistoiveet<textarea className={input} maxLength={2000} rows={4} value={details} onChange={e=>setDetails(e.target.value)} placeholder="Matkapäivät, reitti, yksityisauto tai vene, opaskieli..." /></label>
      <label className="absolute -left-[9999px]" aria-hidden="true">Älä täytä<input tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)}/></label>
      {error&&<p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-base text-red-800">{error} <a className="underline" href="https://wa.me/84937762607">WhatsApp</a></p>}
      <button type="submit" disabled={sending} className="mt-5 min-h-12 w-full rounded-xl bg-emerald-900 px-6 py-3 text-lg font-bold text-white hover:bg-emerald-800 disabled:opacity-60">{sending?"Lähetetään...":"Lähetä kysely"}</button>
      <p className="mt-3 text-sm leading-6 text-slate-500">Kysely ei ole varaus eikä maksua veloiteta. Käytämme tietoja kyselyysi vastaamiseen.</p>
    </form>
  );
}
