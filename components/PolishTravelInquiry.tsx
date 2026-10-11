"use client";

import { useState, type FormEvent } from "react";
import { sendPublicInquiry } from "../lib/publicInquiryClient";

type Props = { productCode: string; productName: string; sourcePage: string };

export default function PolishTravelInquiry({productCode,productName,sourcePage}:Props) {
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
        language:"pl",
        website,
      });
      setConfirmation(response.inquiry_code);
    } catch {
      setError("Nie udało się wysłać formularza. Skontaktuj się z nami przez WhatsApp.");
    } finally {
      setSending(false);
    }
  }
  const wa="https://wa.me/84937762607?text="+encodeURIComponent("Hello GoVietStay, my inquiry reference is "+confirmation+" ("+productName+"). I am visiting Vietnam from Poland.");
  const input="mt-1 block min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-950 outline-offset-2 focus:border-emerald-700 focus:outline-emerald-700";
  if(confirmation) return (
    <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950">
      <h3 className="text-xl font-bold">Dziękujemy, otrzymaliśmy zapytanie.</h3>
      <p className="mt-3 text-base leading-7">Numer: <strong>{confirmation}</strong>. Sprawdzimy dostępność i zakres usługi, a potem odezwiemy się do Ciebie. To jeszcze nie jest potwierdzona rezerwacja.</p>
      <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block rounded-xl bg-emerald-900 px-5 py-3 font-bold text-white hover:bg-emerald-800">Kontynuuj na WhatsApp →</a>
    </div>
  );
  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm sm:p-7">
      <h3 className="text-2xl font-bold">Zapytaj o podróż</h3>
      <p className="mt-2 mb-5 text-base leading-7 text-slate-600">Bezpłatne zapytanie. Datę, zakres i cenę usługi potwierdzimy przed ewentualną płatnością. Odpowiadamy głównie po angielsku lub rosyjsku.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">Imię i nazwisko *<input className={input} autoComplete="name" maxLength={160} required value={name} onChange={e=>setName(e.target.value)} /></label>
        <label className="text-sm font-semibold">WhatsApp (z numerem kraju) *<input className={input} autoComplete="tel" type="tel" maxLength={80} required value={contact} onChange={e=>setContact(e.target.value)} placeholder="+48..." /></label>
        <label className="text-sm font-semibold">Data wycieczki / pierwszy dzień<input className={input} type="date" value={date} onChange={e=>setDate(e.target.value)} /></label>
        <label className="text-sm font-semibold">E-mail<input className={input} type="email" autoComplete="email" maxLength={160} value={email} onChange={e=>setEmail(e.target.value)} /></label>
        <label className="text-sm font-semibold">Dorośli<input className={input} type="number" min="0" max="40" required value={adults} onChange={e=>setAdults(e.target.value)} /></label>
        <label className="text-sm font-semibold">Dzieci<input className={input} type="number" min="0" max="40" required value={children} onChange={e=>setChildren(e.target.value)} /></label>
        <label className="text-sm font-semibold sm:col-span-2">Hotel / okolica<input className={input} maxLength={200} value={hotel} onChange={e=>setHotel(e.target.value)} placeholder="Nazwa hotelu albo dzielnica" /></label>
      </div>
      <label className="mt-4 block text-sm font-semibold">Co chcesz zobaczyć? Wiek dzieci, typ wycieczki, dodatkowe potrzeby<textarea className={input} maxLength={2000} rows={4} value={details} onChange={e=>setDetails(e.target.value)} placeholder="Daty pobytu, trasa, prywatny samochód lub łódź, język przewodnika..." /></label>
      <label className="absolute -left-[9999px]" aria-hidden="true">Nie wypełniaj<input tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)}/></label>
      {error&&<p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-base text-red-800">{error} <a className="underline" href="https://wa.me/84937762607">WhatsApp</a></p>}
      <button type="submit" disabled={sending} className="mt-5 min-h-12 w-full rounded-xl bg-emerald-900 px-6 py-3 text-lg font-bold text-white hover:bg-emerald-800 disabled:opacity-60">{sending?"Wysyłanie...":"Wyślij zapytanie"}</button>
      <p className="mt-3 text-sm leading-6 text-slate-500">Wysłanie formularza nie oznacza rezerwacji ani pobrania opłaty. Używamy podanych danych do odpowiedzi na Twoje zapytanie.</p>
    </form>
  );
}
