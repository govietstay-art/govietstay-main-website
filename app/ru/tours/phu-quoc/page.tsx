import type { Metadata } from "next";
import PhuQuocJohnsCatalog from "../../../../components/PhuQuocJohnsCatalog";
import JsonLd from "../../../../components/JsonLd";
import Link from "next/link";
import { PHU_QUOC_PUBLISHED_RATES } from "../../../../lib/phuQuocPublishedRates";
import { bookingQuestions, priceExamples, vnd } from "../../../../lib/seo/phuQuocRuBookingFaq";

const canonical = "https://www.govietstay.com/ru/tours/phu-quoc";
const english = "https://www.govietstay.com/tours/phu-quoc";
const seoTitle = "Экскурсии на Фукуоке: цены, острова и помощь на русском";
const seoDescription =
  "Цены на туры по 3–4 островам Фукуока, Хон Тхом, снорклинг и частные экскурсии. Детские тарифы, трансфер, условия бронирования и помощь на русском.";

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  alternates: {
    canonical,
    languages: { en: english, ru: canonical, "x-default": english },
  },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: canonical,
    locale: "ru_RU",
    images: [
      {
        url: "/tour/phuquoc/johns/trip3-may-rut-trong.jpg",
        alt: "Экскурсии на Фукуоке: 3 острова, 4 острова и Хон Тхом",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    images: ["/tour/phuquoc/johns/trip3-may-rut-trong.jpg"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "GoVietStay на русском",
                  item: "https://www.govietstay.com/ru",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Экскурсии на Фукуоке",
                  item: canonical,
                },
              ],
            },
            {
              "@type": "CollectionPage",
              name: "Экскурсии на Фукуоке 2026",
              description: seoDescription,
              url: canonical,
              image:
                "https://www.govietstay.com/tour/phuquoc/johns/trip3-may-rut-trong.jpg",
              inLanguage: "ru",
              about: { "@type": "Place", name: "Phu Quoc, Vietnam" },
              provider: { "@id": "https://www.govietstay.com/#organization" },
            },
          ],
        }}
      />
      <PhuQuocJohnsCatalog language="ru" />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: bookingQuestions.map(({question,answer}) => ({
          "@type": "Question", name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }} />
      <section aria-labelledby="ru-pq-prices" className="bg-[#f7f1e5] px-5 py-14 text-[#09342b] md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[.15em] text-emerald-800">Сравнение маршрутов и цен</p>
          <h2 id="ru-pq-prices" className="mt-3 max-w-4xl text-3xl font-black md:text-5xl">Сколько стоят 3 и 4 острова на Фукуоке?</h2>
          <p className="mt-5 max-w-4xl leading-7 text-[#315b56]">Примеры опубликованных тарифов 2026–2027 на групповые программы. Указана цена за человека. Дату, места, состав услуг, возрастные условия и итоговую сумму GoVietStay подтверждает до оплаты.</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {priceExamples.map(({label,code,note,href}) => (
              <article key={code} className="rounded-[1.5rem] border border-emerald-900/10 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black">{label}</h3>
                <p className="mt-3 text-sm text-[#315b56]">{note}</p>
                <p className="mt-5 text-2xl font-black text-emerald-900">{vnd(PHU_QUOC_PUBLISHED_RATES[code].adult)} <span className="text-sm font-medium">/ взрослый</span></p>
                <p className="mt-2 text-base font-semibold">{vnd(PHU_QUOC_PUBLISHED_RATES[code].child)} / ребёнок*</p>
                <Link href={href} className="mt-5 inline-flex min-h-11 items-center font-bold text-emerald-900 underline underline-offset-4">Подробнее о маршруте →</Link>
              </article>
            ))}
          </div>
          <p className="mt-5 max-w-5xl text-sm text-[#315b56]">* Детский тариф зависит от программы, возраста и иногда роста. Для отелей вне стандартной зоны посадки и в праздничные даты возможны доплаты.</p>
          <div className="mt-10 rounded-[1.5rem] bg-white p-6 md:p-9">
            <h2 className="text-2xl font-black md:text-4xl">Частые вопросы перед бронированием</h2>
            <div className="mt-5 divide-y divide-emerald-900/10">
              {bookingQuestions.map(({question,answer}) => (
                <details key={question} className="group py-5">
                  <summary className="cursor-pointer text-lg font-bold">{question}</summary>
                  <p className="mt-3 max-w-4xl leading-7 text-[#315b56]">{answer}</p>
                </details>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/ru/phu-quoc/russkiy-gid" className="inline-flex min-h-11 items-center rounded-full border border-emerald-900/20 px-5 font-bold text-emerald-900">Когда нужен гид на русском →</Link>
              <Link href="/ru/phu-quoc/s-detmi" className="inline-flex min-h-11 items-center rounded-full border border-emerald-900/20 px-5 font-bold text-emerald-900">Фукуок с детьми →</Link>
              <Link href="/ru/phu-quoc" className="inline-flex min-h-11 items-center rounded-full border border-emerald-900/20 px-5 font-bold text-emerald-900">Гид по Фукуоку →</Link>
              <a href="#phuquoc-booking-form" className="inline-flex min-h-11 items-center rounded-full bg-[#20a65a] px-5 font-bold text-white">Запросить точную цену →</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}