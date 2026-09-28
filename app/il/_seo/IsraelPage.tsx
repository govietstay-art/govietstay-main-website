import {israelMarketConfig as C} from "../../../lib/israelMarketConfig";
import {getIsraelVisual} from "../../../lib/israelVisuals";
import {israelSeoPages} from "../../../lib/israelSeoPages";
import s from "../Israel.module.css";
import Link from "next/link";
import {israelSeoEditorial} from "../../../lib/israelSeoEditorial";
export default function IsraelPage({p}:{p:any}){const v=getIsraelVisual(p.slug,p.destination);
const related=israelSeoPages.filter(x=>x.slug!==p.slug && x.destination===p.destination).slice(0,4);
const editorial=israelSeoEditorial[p.slug];
const canonical=`https://www.govietstay.com/il/${p.slug}`;
const webPage={"@context":"https://schema.org","@type":"WebPage","@id":canonical+"#webpage",url:canonical,name:p.h1,description:p.desc,inLanguage:"he-IL",isPartOf:{"@id":"https://www.govietstay.com/#website"},publisher:{"@id":"https://www.govietstay.com/#organization"},...(editorial?{dateModified:editorial.updated}:{})};
const breadcrumb={"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"GoVietStay ישראל","item":"https://www.govietstay.com/il"},{"@type":"ListItem","position":2,"name":p.h1,"item":`https://www.govietstay.com/il/${p.slug}`}]};const std=p.priceKey?C.standard[p.priceKey as keyof typeof C.standard]:null;const pr=p.privateKey?C.private[p.privateKey as keyof typeof C.private]:null;return <main className={s.page} dir="rtl">
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(webPage)}}/>
<header><a href="/il"><img src="/govietstay-logo.jpg" alt="GoVietStay"/></a><nav><a href="/il">בית</a><a href="/il/private-vietnam-trip">פרטי</a><a className={s.wa} href={C.whatsapp}>WhatsApp</a></nav></header>
<section className={s.detailHero}><img src={v.hero} alt={p.h1}/><div><small>{p.destination}</small><h1>{p.h1}</h1><p>{p.desc}</p><blockquote>{p.wiifm}</blockquote></div></section>
<section className={s.gallery}>{v.gallery.map((x:string)=><img key={x} src={x} alt={p.destination}/>)}</section>
<section className={s.detail}><article><small>מה יוצא לכם מזה?</small><h2>{p.wiifm}</h2><p>{p.desc}</p><h2>לפני שמזמינים</h2>{p.bullets.map((x:string)=><p key={x}>✓ {x}</p>)}
{editorial?<section aria-label="עצות מעשיות למטיילים"><p><small>מידע מעשי · עודכן {editorial.updated}</small></p>{editorial.sections.map(s=><section key={s.title}><h2>{s.title}</h2><p>{s.body}</p></section>)}<h2>שאלות נפוצות לפני הזמנה</h2>{editorial.faqs.map(f=><section key={f.q}><h3>{f.q}</h3><p>{f.a}</p></section>)}</section>:null}
<h2 id="price">מחיר</h2>{std?<div className={s.price}><small>מחיר סטנדרטי</small><h3 dir="ltr">≈ ₪{std.ils}</h3><b dir="ltr">{std.vnd.toLocaleString()} VND</b><p>אותו מחיר כמו English/public.</p></div>:null}{pr?<div className={s.price}><small>נקודת פתיחה לפרטי*</small><h3 dir="ltr">≈ ₪{pr.ils} / group</h3><b dir="ltr">{pr.vnd.toLocaleString()} VND</b><p>בסיס לתכנון בלבד; שפה, שעות, כרטיסים וקבוצה משפיעים על המחיר הסופי.</p></div>:null}{!std&&!pr?<div className={s.price}><h3>הצעה לפי הקבוצה</h3><p>שלחו תאריך, אנשים, מלון ושפת מדריך רצויה.</p></div>:null}<p>{C.disclaimer}</p><a className={s.wa} href={C.whatsapp}>אישור מחיר ב-WhatsApp</a>
<h2>מדריך בשפה שאתם צריכים</h2><p>{C.guide}</p>
{related.length>0?<nav aria-label="מידע קשור"><h2>מידע נוסף לפי היעד</h2><ul>{related.map((r)=><li key={r.slug}><Link href={`/il/${r.slug}`}>{r.h1}</Link></li>)}</ul></nav>:null}
</article><aside><img src={v.gallery[1]} alt={p.destination}/><h3>כבר יש טיסה + מלון?</h3><p>תאריך · אנשים · מלון · תחומי עניין · שפת מדריך</p><a className={s.wa} href={C.whatsapp}>WhatsApp</a></aside></section>
</main>}