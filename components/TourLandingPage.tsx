"use client";

import { useState, type ReactNode } from "react";
import type { Locale, TourLanding } from "../lib/tour-landing-data";

const PHONE = "84937762607";
const money = (value: number) => new Intl.NumberFormat("en-US").format(value) + " VND";

export default function TourLandingPage({ tour, locale }: { tour: TourLanding; locale: Locale }) {
  const isRu = locale === "ru";
  const isRuCham = isRu && tour.slug === "cham-island";
  const [booking, setBooking] = useState({ date: "", adults: "2", children: "0", childDetails: "", hotel: "", language: isRu ? "Русский" : "English" });
  const message = isRu
    ? `Здравствуйте, GoVietStay! Я хочу проверить места на экскурсию «${tour.title}».\n\nДата: ${booking.date || "не указана"}\nВзрослые: ${booking.adults || "не указано"}\nДети: ${booking.children || "0"}\nВозраст/рост детей: ${booking.childDetails || "нет"}\nОтель: ${booking.hotel || "не указан"}\nЯзык поддержки: ${booking.language}\nИсточник: TikTok / страница GoVietStay\n\nПожалуйста, подтвердите наличие мест, трансфер, погоду и точную стоимость до оплаты.`
    : `Hello GoVietStay, I would like to check ${tour.title}.\n\nDate: ${booking.date || "not provided"}\nAdults: ${booking.adults || "not provided"}\nChildren: ${booking.children || "0"}\nChild age/height: ${booking.childDetails || "none"}\nHotel: ${booking.hotel || "not provided"}\nSupport language: ${booking.language}\n\nPlease confirm availability, pickup, weather and the exact total before payment.`;
  const whatsapp = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  const labels = isRu ? {
    price: "Цена от", adult: "Взрослый", child: "Ребёнок", availability: "Проверить места в WhatsApp", highlights: "Главное", itinerary: "Программа", included: "Включено", excluded: "Не включено", policies: "Важные условия", trust: "Местная поддержка GoVietStay", trustText: "Мы проверяем наличие мест, погоду, трансфер и точную стоимость до оплаты. Это запрос на бронирование, а не автоматическое подтверждение.", back: "Все туры",
  } : {
    price: "From", adult: "Adult", child: "Child", availability: "Check availability on WhatsApp", highlights: "Highlights", itinerary: "Itinerary", included: "Included", excluded: "Not included", policies: "Important booking terms", trust: "GoVietStay local support", trustText: "We check availability, weather, pickup and the exact total before payment. Sending a request does not automatically confirm a booking.", back: "All tours",
  };

  return (
    <main className="min-h-screen bg-[#f7f1df] text-[#06251b] pb-28">
      <section className="relative min-h-[78svh] overflow-hidden bg-[#06251b]">
        <img src={tour.image} alt={tour.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041d16] via-black/35 to-black/20" />
        <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-between px-5 py-6 md:px-10 md:py-10">
          <div className="flex items-center justify-between text-white">
            <a href={isRu ? "/ru" : "/"} className="font-bold tracking-tight">GoVietStay</a>
            <a href={isRu ? "/ru/tours" : "/tours"} className="rounded-full border border-white/40 px-4 py-2 text-sm backdrop-blur">← {labels.back}</a>
          </div>
          <div className="max-w-4xl pb-5 text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[.22em] text-amber-300">{tour.eyebrow}</p>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">{tour.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">{tour.promise}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
              <span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">⏱ {tour.duration}</span>
              <span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">📍 {tour.location}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1fr_360px] md:px-10 md:py-16">
        <div className="space-y-8">
          <Card title={labels.highlights}><CheckList items={tour.highlights} /></Card>
          <Card title={labels.itinerary}><ol className="space-y-4">{tour.itinerary.map((item, i) => <li key={item} className="flex gap-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-green-800 text-sm font-bold text-white">{i + 1}</span><span className="pt-1 leading-relaxed text-[#06251b]/75">{item}</span></li>)}</ol></Card>
          <div className="grid gap-6 sm:grid-cols-2"><Card title={labels.included}><CheckList items={tour.included} /></Card><Card title={labels.excluded}><DotList items={tour.excluded} /></Card></div>
          <Card title={labels.policies}><DotList items={tour.policies} /></Card>
        </div>

        <aside className="md:sticky md:top-6 md:self-start">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-[#06251b]/10">
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-green-800">{labels.price}</p>
            <p className="mt-3 text-lg">{labels.adult}: <strong className="text-2xl text-green-800">{money(tour.adultPrice)}</strong></p>
            <p className="mt-2">{labels.child}: <strong>{money(tour.childPrice)}</strong></p>
            <p className="mt-4 text-sm leading-relaxed text-[#06251b]/60">{tour.priceNote}</p>
            {!isRuCham && <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-6 block rounded-full bg-[#20a65a] px-5 py-4 text-center font-bold text-white shadow-lg transition hover:bg-[#168849]">{labels.availability}</a>}
            {isRuCham && <BookingFields booking={booking} setBooking={setBooking} />}
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-6 block rounded-full bg-[#20a65a] px-5 py-4 text-center font-bold text-white shadow-lg transition hover:bg-[#168849]">{labels.availability}</a>
            <p className="mt-3 text-center text-xs text-[#06251b]/55">{isRu ? "Проверка мест бесплатна. Бронирование подтверждается только после ответа GoVietStay." : "Availability check is free. Booking is confirmed only after GoVietStay replies."}</p>
            <div className="mt-6 border-t border-[#06251b]/10 pt-5"><h2 className="font-bold">{labels.trust}</h2><p className="mt-2 text-sm leading-relaxed text-[#06251b]/65">{labels.trustText}</p><p className="mt-4 text-sm font-semibold">GoVietStay.com<br />WhatsApp: +84 937 762 607</p></div>
          </div>
        </aside>
      </div>

      {isRuCham && <RuChamConversionSections tour={tour} />}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-[#f7f1df]/95 p-3 backdrop-blur md:hidden"><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="block rounded-full bg-[#20a65a] px-5 py-4 text-center font-bold text-white">{labels.availability}</a></div>
    </main>
  );
}

type BookingState = { date: string; adults: string; children: string; childDetails: string; hotel: string; language: string };

function BookingFields({ booking, setBooking }: { booking: BookingState; setBooking: (value: BookingState) => void }) {
  const field = (name: keyof BookingState, value: string) => setBooking({ ...booking, [name]: value });
  return <div className="mt-6 space-y-3 border-t border-[#06251b]/10 pt-5">
    <h2 className="font-bold">Проверьте вашу дату</h2>
    <label className="block text-sm font-semibold">Дата поездки<input type="date" value={booking.date} onChange={e => field("date", e.target.value)} className="mt-1 w-full rounded-xl border border-[#06251b]/15 bg-[#f7f1df]/50 px-3 py-3 font-normal" /></label>
    <div className="grid grid-cols-2 gap-3">
      <label className="block text-sm font-semibold">Взрослые<input inputMode="numeric" value={booking.adults} onChange={e => field("adults", e.target.value)} className="mt-1 w-full rounded-xl border border-[#06251b]/15 bg-[#f7f1df]/50 px-3 py-3 font-normal" /></label>
      <label className="block text-sm font-semibold">Дети<input inputMode="numeric" value={booking.children} onChange={e => field("children", e.target.value)} className="mt-1 w-full rounded-xl border border-[#06251b]/15 bg-[#f7f1df]/50 px-3 py-3 font-normal" /></label>
    </div>
    <label className="block text-sm font-semibold">Возраст и рост детей<input value={booking.childDetails} onChange={e => field("childDetails", e.target.value)} placeholder="Например: 6 лет, 118 см" className="mt-1 w-full rounded-xl border border-[#06251b]/15 bg-[#f7f1df]/50 px-3 py-3 font-normal" /></label>
    <label className="block text-sm font-semibold">Название отеля<input value={booking.hotel} onChange={e => field("hotel", e.target.value)} placeholder="Отель в Дананге или Хойане" className="mt-1 w-full rounded-xl border border-[#06251b]/15 bg-[#f7f1df]/50 px-3 py-3 font-normal" /></label>
  </div>;
}

function RuChamConversionSections({ tour }: { tour: TourLanding }) {
  return <div className="mx-auto max-w-6xl space-y-8 px-5 pb-16 md:px-10">
    <section className="rounded-[2rem] border border-[#06251b]/10 bg-white/70 p-6 md:p-8">
      <p className="text-sm font-semibold uppercase tracking-[.2em] text-green-800">Реальные гости GoVietStay</p>
      <h2 className="mt-3 text-3xl font-bold">От трансфера из отеля до отдыха на острове</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-[#06251b]/65">Настоящие моменты поездки: встреча гостей перед отправлением и отдых у моря на острове Чам.</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <figure className="overflow-hidden rounded-3xl bg-[#06251b] text-white"><img src="/tour/cham-island/guest-pickup.jpg" alt="Гости GoVietStay перед трансфером на остров Чам" className="aspect-[4/3] w-full object-cover object-center" /><figcaption className="p-4 font-semibold">Встреча гостей и трансфер</figcaption></figure>
        <figure className="overflow-hidden rounded-3xl bg-[#06251b] text-white"><img src="/tour/cham-island/guest-on-island.jpg" alt="Гости GoVietStay на пляже острова Чам" className="aspect-[4/3] w-full object-cover object-center" /><figcaption className="p-4 font-semibold">Настоящий день на острове Чам</figcaption></figure>
      </div>
    </section>
    <section className="rounded-[2rem] border border-[#06251b]/10 bg-white/70 p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-semibold uppercase tracking-[.2em] text-green-800">Проверенные сообщения</p><h2 className="mt-3 text-3xl font-bold">Что гости говорят после поездки</h2><p className="mt-3 text-[#06251b]/60">Реальные ответы гостей в WhatsApp. Текст сохранён без изменения смысла.</p></div>
        <a href="https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic" target="_blank" rel="noopener noreferrer" className="rounded-full border border-green-800 px-5 py-3 font-bold text-green-800 transition hover:bg-green-800 hover:text-white">Отзывы GoVietStay в Google ↗</a>
      </div>
      <div className="mt-7 grid gap-5 md:grid-cols-3">{(tour.reviews || []).map(review => <article key={review.image} className="flex flex-col rounded-3xl border border-[#06251b]/10 bg-white p-5 shadow-sm"><div className="text-sm font-bold uppercase tracking-[.12em] text-green-700">Положительный отзыв</div><blockquote className="mt-4 flex-1 text-lg font-semibold leading-relaxed">“{review.quote}”</blockquote>{review.context && <p className="mt-4 text-sm leading-relaxed text-[#06251b]/60">{review.context}</p>}<div className="mt-5 border-t border-[#06251b]/10 pt-4"><p className="font-bold">{review.name}</p><p className="text-sm text-[#06251b]/55">Отзыв в WhatsApp · остров Чам</p><a href={review.image} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-green-800 underline">Посмотреть оригинал</a></div></article>)}</div>
    </section>
    <section className="overflow-hidden rounded-[2rem] bg-[#06251b] text-white md:grid md:grid-cols-2">
      <div className="relative min-h-72"><img src={tour.image} alt="Остров Чам" className="absolute inset-0 h-full w-full object-cover opacity-80" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6"><p className="font-bold">Остров Чам · снорклинг · морской день</p></div></div>
      <div className="p-7 md:p-10"><p className="text-sm font-semibold uppercase tracking-[.2em] text-amber-300">Почему GoVietStay</p><h2 className="mt-3 text-3xl font-bold">Не просто билет — местная поддержка на каждом этапе</h2><ul className="mt-6 space-y-3">{(tour.whyBook || []).map(item => <li key={item} className="flex gap-3 text-white/85"><span className="text-green-300">✓</span>{item}</li>)}</ul></div>
    </section>
    <Card title="Что взять с собой"><CheckList items={tour.packing || []} /></Card>
    <Card title="Частые вопросы"><div className="divide-y divide-[#06251b]/10">{(tour.faqs || []).map(item => <details key={item.question} className="group py-4"><summary className="cursor-pointer list-none pr-6 font-bold">{item.question}<span className="float-right text-green-700 group-open:rotate-45">＋</span></summary><p className="mt-3 max-w-3xl leading-relaxed text-[#06251b]/65">{item.answer}</p></details>)}</div></Card>
    <section className="rounded-[2rem] bg-green-800 p-7 text-center text-white md:p-12"><p className="text-sm font-semibold uppercase tracking-[.2em] text-green-200">GoVietStay · Дананг · Хойан</p><h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold md:text-4xl">Проверьте погоду и наличие мест до оплаты</h2><p className="mx-auto mt-4 max-w-2xl text-white/80">Отправьте дату, количество гостей и название отеля. Мы ответим в WhatsApp и подтвердим все детали.</p></section>
  </div>;
}

function Card({ title, children }: { title: string; children: ReactNode }) { return <section className="rounded-[2rem] border border-[#06251b]/10 bg-white/70 p-6 md:p-8"><h2 className="mb-5 text-2xl font-bold">{title}</h2>{children}</section>; }
function CheckList({ items }: { items: string[] }) { return <ul className="grid gap-3 sm:grid-cols-2">{items.map(item => <li key={item} className="flex gap-3 leading-relaxed text-[#06251b]/75"><span className="text-green-700">✓</span>{item}</li>)}</ul>; }
function DotList({ items }: { items: string[] }) { return <ul className="space-y-3">{items.map(item => <li key={item} className="flex gap-3 leading-relaxed text-[#06251b]/75"><span>•</span>{item}</li>)}</ul>; }
