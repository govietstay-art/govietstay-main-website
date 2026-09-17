import type { Metadata } from 'next';
import Image from 'next/image';
import styles from './page.module.css';

const canonical = 'https://www.govietstay.com/partners/wink-spa-tuyet-massage-da-nang';
// Business-provided Maps URL only. Do not substitute a similar-looking spa listing.
const mapUrl = 'https://www.google.com/maps?q=16.0604247,108.2309542&entry=gps&shh=CAE&lucs=,94297699,100826479,94231188,94280568,47071704,100809209,94218641,94282134,100835694,94286869,100820247,100822504&g_ep=CAISEjI2LjM3LjIuOTc3MTgxMTk2MBgAIIgnKnEsOTQyOTc2OTksMTAwODI2NDc5LDk0MjMxMTg4LDk0MjgwNTY4LDQ3MDcxNzA0LDEwMDgwOTIwOSw5NDIxODY0MSw5NDI4MjEzNCwxMDA4MzU2OTQsOTQyODY4NjksMTAwODIwMjQ3LDEwMDgyMjUwNEICVk4%3D&skid=aaaab13f-c96e-4bf1-a309-44e6313f6651&g_st=ic';
const bookText = encodeURIComponent('Hello GoVietStay, I would like to book Wink Spa – Tuyết Massage near Son Tra Night Market with the 10% GoVietStay discount on all spa services. My preferred date, time, service and number of guests are: ');
const whatsapp = `https://wa.me/84937762607?text=${bookText}`;
// Wikimedia Commons: Dragon Bridge Da Nang 1.jpg by Christophe95, CC BY-SA 4.0.
const bridgePhoto = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dragon_Bridge_Da_Nang_1.jpg?width=960';

export const metadata: Metadata = {
  title: 'Wink Spa – Tuyết Massage | Near Son Tra Night Market & Dragon Bridge',
  description: 'Explore Son Tra Night Market and the Dragon Bridge weekend fire-and-water show, then unwind at Wink Spa – Tuyết Massage. Book spa services via GoVietStay for 10% off.',
  alternates: { canonical },
  openGraph: { title: 'Wink Spa – Tuyết Massage | Son Tra Night Market, Da Nang', description: 'A relaxing stop near the Dragon Bridge weekend show. Book spa services via GoVietStay and save 10%.', url: canonical, type: 'website', siteName: 'GoVietStay' },
};

const offerings = [
  ['Foot massage', 'Give your feet a rest after shopping and walking around the market.'],
  ['Body massage', 'Ask the spa about available treatments and session lengths.'],
  ['Foot scrub & care', 'Explore foot-care services shown on the business menu.'],
  ['Nail & other services', 'Contact the spa for the current complete service list.'],
];

export default function WinkSpaPage() {
  return <main className={styles.page}>
    <header className={styles.header}>
      <a href="/" className={styles.publisher}><Image src="/govietstay-logo.jpg" width={100} height={48} alt="GoVietStay logo" unoptimized /><span>LOCAL PARTNER</span></a>
      <a className={styles.brand} href="#top">WINK SPA <small>× TUYẾT MASSAGE</small></a>
      <nav><a href="#night-market">Night market</a><a href="#services">Services</a><a href="#location">Map</a></nav>
      <a className={styles.headerCta} href="#booking">Book & save 10% ↗</a>
    </header>

    <section className={styles.hero} id="top">
      <div className={styles.heroCopy}><p className={styles.eyebrow}>WINK SPA · TUYẾT MASSAGE · DA NANG</p><h1>Wink Spa<br /><em>Tuyết Massage</em></h1><p className={styles.lead}>Your relaxing stop after Son Tra Night Market and the Dragon Bridge weekend show.</p><p>After street food, shopping and an evening of exploring Da Nang, take a break and ask about a foot or body massage in the Son Tra Night Market area.</p><div className={styles.buttons}><a className={styles.primary} href="#booking">Book with 10% off ↗</a><a className={styles.outline} href={mapUrl} target="_blank" rel="noopener noreferrer">Get directions ↗</a></div><p className={styles.subtle}>An independent local spa · Published with GoVietStay</p></div>
      <div className={styles.heroMedia}><Image src="/partners/wink-spa-tuyet-massage-da-nang/storefront.svg" alt="Actual Wink Spa – Tuyết Massage storefront photographed in Da Nang" width={640} height={480} unoptimized className={styles.storePhoto}/><div className={styles.mediaTag}>LOOK FOR THE WINK SPA SIGN · REAL SHOP PHOTO</div></div>
    </section>

    <aside className={styles.offer}><div><span>EXCLUSIVE GOVIETSTAY BOOKING OFFER</span><strong>10% OFF</strong><p>All spa services when you book through GoVietStay. We confirm your treatment, availability and final discounted price before the visit.</p></div><a href="#booking">Claim the offer ↗</a></aside>

    <section className={styles.market} id="night-market"><div><p className={styles.eyebrow}>DISCOVER DA NANG BY NIGHT</p><h2>Son Tra Night Market <em>& Dragon Bridge</em></h2><p>Visit Son Tra Night Market for street food, souvenir stalls, local shopping and an energetic evening near the Han River. The market sits in the Dragon Bridge area, making it easy to combine a night out with the famous fire-and-water performance.</p><p><strong>Weekend Dragon Show:</strong> Da Nang's tourism portal lists performances at 9:00 PM on Friday, Saturday and Sunday, subject to schedule changes. Check the current show time before planning your evening.</p><p>After walking around the market or watching the show, visit Wink Spa – Tuyết Massage in the same area to rest your feet and unwind. This is a nearby-area recommendation, not a promise of a particular viewing angle or walking distance.</p><a className={styles.primary} href="#booking">Explore, then relax · Save 10% ↗</a></div><figure className={styles.bridge}><Image src={bridgePhoto} width={960} height={720} alt="Real photograph of Da Nang's Dragon Bridge, near Son Tra Night Market" unoptimized /><figcaption>Dragon Bridge, Da Nang · Photo: Christophe95 / <a href="https://commons.wikimedia.org/wiki/File:Dragon_Bridge_Da_Nang_1.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>. The photo depicts the bridge, not the spa or night market.</figcaption></figure></section>

    <section className={styles.services} id="services"><p className={styles.eyebrow}>SPA SERVICES</p><h2>Make time to <em>unwind.</em></h2><div className={styles.grid}>{offerings.map(([name, detail], i) => <article key={name}><span>0{i+1} / TREATMENT</span><h3>{name}</h3><p>{detail}</p><a href="#booking">Ask about this service ↗</a></article>)}</div><p className={styles.priceNotice}>The shop's photographed boards show different body-massage prices. GoVietStay will confirm current service prices, duration and the exact 10% discounted amount with the spa before confirming any appointment.</p></section>

    <section className={styles.find} id="location"><div><p className={styles.eyebrow}>FIND THE REAL BUSINESS</p><h2>Visit Tuyết Massage <em>near Son Tra Night Market.</em></h2><p>Use only the original Google Maps pin supplied by the business. Look for the Wink Spa signage shown in the real storefront photo. We do not redirect you to another spa listing.</p><p className={styles.coords}>Business-provided coordinates: 16.0604247, 108.2309542</p><a className={styles.primary} target="_blank" rel="noopener noreferrer" href={mapUrl}>Open original Tuyết Massage map ↗</a></div><iframe title="Business-provided Google Maps location" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=16.0604247,108.2309542&output=embed" /></section>

    <section className={styles.booking} id="booking"><p className={styles.eyebrow}>BOOK YOUR VISIT</p><h2>Relax more. <em>Save 10%.</em></h2><p>Choose how to get in touch. An enquiry is not a confirmed appointment; please wait for availability and the final price before travelling.</p><div className={styles.bookGrid}><article><span>OPTION 01 · EXCLUSIVE DISCOUNT</span><h3>Book via GoVietStay</h3><p>10% off all spa services when booked through GoVietStay. Tell us your date, time, number of guests and preferred treatment; we will confirm the booking and discounted total.</p><a href={whatsapp} target="_blank" rel="noopener noreferrer" className={styles.primary}>WhatsApp · Book with 10% off ↗</a></article><article><span>OPTION 02 · DIRECT CONTACT</span><h3>Contact Tuyết Massage</h3><p>Contact the spa directly through the number printed on the Tuyết Massage menu, or use the original map. The GoVietStay 10% benefit applies only to bookings arranged through GoVietStay.</p><a href="tel:+84935436646" className={styles.outline}>Call Tuyết Massage ↗</a></article></div><p className={styles.small}>Offer valid for spa services booked through GoVietStay; confirm treatment, date, final amount and availability before travelling.</p></section>
    <footer className={styles.footer}><strong>WINK SPA × TUYẾT MASSAGE</strong><span>Independent business in Da Nang · Published by <a href="/">GoVietStay</a></span><a href={mapUrl} target="_blank" rel="noopener noreferrer">Original business map ↗</a></footer>
  </main>;
}
