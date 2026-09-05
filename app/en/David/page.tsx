"use client";
// GVS-DAVID-DIRECT-BOOKING-PORTAL-V1

import { FormEvent, useMemo, useState } from "react";
import { submitStaffBookingRequest } from "../../../lib/staffBookingClient";
import styles from "./DavidPage.module.css";

type Variant = {
  id:string;
  label:string;
  adult:number;
  child:number;
  infant:number;
  fee:number;
  manual?:boolean;
  note?:string;
};

type Tour = {
  id:string;
  region:string;
  name:string;
  variants:Variant[];
};

const SALES_CODE = "GVS-EN-DAVID-00";

const tours:Tour[] = [
  {id:"cham-island",region:"Da Nang & Hoi An",name:"Cham Island",variants:[
    {id:"cham-group-en",label:"Group tour · English guide",adult:950000,child:750000,infant:0,fee:0},
    {id:"cham-private-en",label:"Private tour · English guide",adult:1350000,child:1050000,infant:0,fee:0},
    {id:"cham-custom",label:"Custom / manual quote",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"ba-na-hills",region:"Da Nang & Hoi An",name:"Ba Na Hills & Golden Bridge",variants:[
    {id:"bana-standard",label:"Standard group tour",adult:1550000,child:0,infant:0,fee:0,note:"Child price can be entered manually when needed."},
    {id:"bana-custom",label:"Private / custom quote",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"hoi-an-coconut",region:"Da Nang & Hoi An",name:"Hoi An + Coconut Village",variants:[
    {id:"hoian-standard",label:"Standard group tour",adult:1250000,child:0,infant:0,fee:0},
    {id:"hoian-private",label:"Private / custom quote",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"linh-ung-marble-hoi-an",region:"Da Nang & Hoi An",name:"Linh Ung + Marble Mountains + Hoi An",variants:[
    {id:"lmh-custom",label:"Private / custom quote",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"hue-day-tour",region:"Hue",name:"Hue City Tour",variants:[
    {id:"hue-standard",label:"Standard group tour",adult:1450000,child:0,infant:0,fee:0},
    {id:"hue-private",label:"Private / custom quote",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"hoi-an-memory",region:"Da Nang & Hoi An",name:"Hoi An Memory Show",variants:[
    {id:"memory-custom",label:"Ticket / package · manual quote",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"food-tour",region:"Da Nang & Hoi An",name:"Da Nang Food Tour",variants:[
    {id:"food-custom",label:"Private / custom quote",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"han-cruise",region:"Da Nang & Hoi An",name:"Han River Cruise",variants:[
    {id:"cruise-custom",label:"Ticket / custom quote",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"phu-quoc-south",region:"Phu Quoc",name:"South Phu Quoc + Cable Car",variants:[
    {id:"pqs-custom",label:"Manual quote",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"phu-quoc-north",region:"Phu Quoc",name:"North Phu Quoc",variants:[
    {id:"pqn-custom",label:"Manual quote",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"phu-quoc-islands",region:"Phu Quoc",name:"Phu Quoc 3–4 Islands",variants:[
    {id:"pqi-custom",label:"Manual quote",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"phu-quoc-vin",region:"Phu Quoc",name:"VinWonders + Safari Phu Quoc",variants:[
    {id:"pqv-custom",label:"Ticket / package · manual quote",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"nha-trang-city",region:"Nha Trang",name:"Nha Trang City Tour",variants:[
    {id:"ntc-custom",label:"Manual quote",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"nha-trang-islands",region:"Nha Trang",name:"Nha Trang Island Tour",variants:[
    {id:"nti-custom",label:"Manual quote",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"transfer-danang",region:"Transfers",name:"Da Nang Airport ↔ Hotel",variants:[
    {id:"dad-transfer",label:"Price per vehicle · manual",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"transfer-hoian",region:"Transfers",name:"Da Nang ↔ Hoi An Transfer",variants:[
    {id:"hoian-transfer",label:"Price per vehicle · manual",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"transfer-hue",region:"Transfers",name:"Da Nang ↔ Hue Transfer",variants:[
    {id:"hue-transfer",label:"Price per vehicle · manual",adult:0,child:0,infant:0,fee:0,manual:true}
  ]},
  {id:"custom-direct",region:"Custom",name:"Custom / Private Booking",variants:[
    {id:"custom-manual",label:"Manual total",adult:0,child:0,infant:0,fee:0,manual:true}
  ]}
];

function money(v:number){
  return new Intl.NumberFormat("vi-VN").format(Math.max(0,Number(v||0)))+" VND";
}
function num(v:string){
  return Math.max(0,Number(String(v||"").replace(/\D/g,""))||0);
}
function bookingCode(){
  const d=new Date();
  const p=(n:number)=>String(n).padStart(2,"0");
  return `GVS-DAVID-${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}-${Math.random().toString(36).slice(2,5).toUpperCase()}`;
}

export default function DavidBookingPortal(){
  const [guest,setGuest]=useState("");
  const [phone,setPhone]=useState("");
  const [tourDate,setTourDate]=useState("");
  const [pickup,setPickup]=useState("");
  const [hotel,setHotel]=useState("");
  const [region,setRegion]=useState("Da Nang & Hoi An");
  const regionTours=useMemo(()=>tours.filter(t=>t.region===region),[region]);
  const [tourId,setTourId]=useState("cham-island");
  const tour=useMemo(()=>tours.find(t=>t.id===tourId)||regionTours[0]||tours[0],[tourId,regionTours]);
  const [variantId,setVariantId]=useState("cham-group-en");
  const variant=useMemo(()=>tour.variants.find(v=>v.id===variantId)||tour.variants[0],[tour,variantId]);

  const [language,setLanguage]=useState("English");
  const [adults,setAdults]=useState(1);
  const [children,setChildren]=useState(0);
  const [infants,setInfants]=useState(0);
  const [adultRate,setAdultRate]=useState("950000");
  const [childRate,setChildRate]=useState("750000");
  const [infantRate,setInfantRate]=useState("0");
  const [manualTotal,setManualTotal]=useState("");
  const [extraFee,setExtraFee]=useState("0");
  const [discount,setDiscount]=useState("0");
  const [deposit,setDeposit]=useState("0");
  const [notes,setNotes]=useState("");
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState("");
  const [success,setSuccess]=useState<{booking_code:string;status:string}|null>(null);

  function chooseRegion(v:string){
    setRegion(v);
    const first=tours.find(t=>t.region===v)||tours[0];
    setTourId(first.id);
    const vr=first.variants[0];
    setVariantId(vr.id);
    setAdultRate(String(vr.adult||0));setChildRate(String(vr.child||0));setInfantRate(String(vr.infant||0));
    setManualTotal("");
  }
  function chooseTour(v:string){
    setTourId(v);
    const t=tours.find(x=>x.id===v)||tours[0];
    const vr=t.variants[0];
    setVariantId(vr.id);
    setAdultRate(String(vr.adult||0));setChildRate(String(vr.child||0));setInfantRate(String(vr.infant||0));
    setManualTotal("");
  }
  function chooseVariant(v:string){
    setVariantId(v);
    const vr=tour.variants.find(x=>x.id===v)||tour.variants[0];
    setAdultRate(String(vr.adult||0));setChildRate(String(vr.child||0));setInfantRate(String(vr.infant||0));
    setManualTotal("");
  }

  const gross=variant.manual
    ? num(manualTotal)
    : adults*num(adultRate)+children*num(childRate)+infants*num(infantRate)+Number(variant.fee||0)+num(extraFee);
  const discountVnd=num(discount);
  const net=Math.max(0,gross-discountVnd);
  const depositVnd=Math.min(num(deposit),net);
  const balance=Math.max(0,net-depositVnd);

  async function submit(e:FormEvent){
    e.preventDefault();setError("");setSuccess(null);
    if(!guest.trim())return setError("Guest name is required.");
    if(!tourDate)return setError("Tour date is required.");
    if(adults+children+infants<1)return setError("At least one guest is required.");
    if(net<=0)return setError("Selling price is required.");
    if(num(deposit)>net)return setError("Deposit cannot exceed total selling price.");
    setSaving(true);
    try{
      const code=bookingCode();
      const result=await submitStaffBookingRequest({
        sales_code:SALES_CODE,
        booking_code:code,
        guest_name:guest.trim(),
        phone:phone.trim(),
        tour_date:tourDate,
        pickup_time:pickup,
        hotel:hotel.trim(),
        region,
        tour_slug:tour.id,
        tour_name:tour.name,
        variant_id:variant.id,
        variant_name:variant.label,
        language,
        adults,children,infants,
        gross_revenue_vnd:gross,
        discount_vnd:discountVnd,
        deposit_vnd:depositVnd,
        notes:notes.trim()
      });
      setSuccess({booking_code:result?.booking_code||code,status:result?.status||"pending"});
    }catch(err:any){
      setError(err?.message||"Could not save booking request.");
    }finally{setSaving(false)}
  }

  return <main className={styles.page}>
    <header className={styles.header}>
      <div>
        <div className={styles.brand}>GoVietStay</div>
        <div className={styles.sub}>Owner Direct Booking Portal</div>
      </div>
      <div className={styles.identity}><b>David</b><span>{SALES_CODE}</span></div>
    </header>

    <section className={styles.hero}>
      <div>
        <div className={styles.kicker}>DIRECT SALES · SINGLE SOURCE OF TRUTH</div>
        <h1>David Booking Management</h1>
        <p>Enter every direct booking here so the source, Booking ID, Operations, Finance and reporting stay linked and transparent.</p>
      </div>
      <div className={styles.flow}>
        <span>1. Submit</span><b>→</b><span>2. Admin Pending</span><b>→</b><span>3. Approve</span><b>→</b><span>4. Operations</span><b>→</b><span>5. Finance</span>
      </div>
    </section>

    <form className={styles.layout} onSubmit={submit}>
      <div className={styles.form}>
        {error&&<div className={styles.error}>{error}</div>}
        {success&&<div className={styles.success}>
          <b>Saved to Admin as Pending</b>
          <span>{success.booking_code}</span>
          <p>Next: Admin → Sales Team / Payroll → Staff Booking Requests → Approve.</p>
          <a href="/admin">Open Admin</a>
        </div>}

        <section className={styles.card}>
          <h2>1. Customer</h2>
          <div className={styles.grid2}>
            <label>Guest name<input value={guest} onChange={e=>setGuest(e.target.value)} placeholder="Customer name" required/></label>
            <label>WhatsApp / phone<input value={phone} onChange={e=>setPhone(e.target.value)} inputMode="tel" placeholder="+84..."/></label>
            <label>Tour date<input type="date" value={tourDate} onChange={e=>setTourDate(e.target.value)} required/></label>
            <label>Pickup time<input type="time" value={pickup} onChange={e=>setPickup(e.target.value)}/></label>
            <label className={styles.wide}>Hotel / pickup location<input value={hotel} onChange={e=>setHotel(e.target.value)} placeholder="Hotel name + address if needed"/></label>
          </div>
        </section>

        <section className={styles.card}>
          <h2>2. Tour</h2>
          <div className={styles.grid2}>
            <label>Region<select value={region} onChange={e=>chooseRegion(e.target.value)}>
              {[...new Set(tours.map(t=>t.region))].map(x=><option key={x}>{x}</option>)}
            </select></label>
            <label>Tour<select value={tour.id} onChange={e=>chooseTour(e.target.value)}>
              {regionTours.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
            </select></label>
            <label>Package<select value={variant.id} onChange={e=>chooseVariant(e.target.value)}>
              {tour.variants.map(v=><option key={v.id} value={v.id}>{v.label}</option>)}
            </select></label>
            <label>Service language<select value={language} onChange={e=>setLanguage(e.target.value)}>
              <option>English</option><option>Russian</option><option>Vietnamese</option><option>Chinese</option><option>Korean</option><option>Italian</option><option>Other</option>
            </select></label>
          </div>
          {variant.note&&<div className={styles.note}>{variant.note}</div>}
        </section>

        <section className={styles.card}>
          <h2>3. Guests & Selling Price</h2>
          <div className={styles.guestGrid}>
            <Counter label="Adults" value={adults} setValue={setAdults}/>
            <Counter label="Children" value={children} setValue={setChildren}/>
            <Counter label="Infants" value={infants} setValue={setInfants}/>
          </div>

          {variant.manual ? <div className={styles.grid2}>
            <label className={styles.wide}>Manual total selling price<input value={manualTotal} onChange={e=>setManualTotal(e.target.value)} inputMode="numeric" placeholder="Example: 4000000"/></label>
          </div> : <div className={styles.grid3}>
            <label>Adult rate<input value={adultRate} onChange={e=>setAdultRate(e.target.value)} inputMode="numeric"/></label>
            <label>Child rate<input value={childRate} onChange={e=>setChildRate(e.target.value)} inputMode="numeric"/></label>
            <label>Infant rate<input value={infantRate} onChange={e=>setInfantRate(e.target.value)} inputMode="numeric"/></label>
          </div>}

          <div className={styles.grid3}>
            <label>Extra fee<input value={extraFee} onChange={e=>setExtraFee(e.target.value)} inputMode="numeric"/></label>
            <label>Discount<input value={discount} onChange={e=>setDiscount(e.target.value)} inputMode="numeric"/></label>
            <label>Deposit received<input value={deposit} onChange={e=>setDeposit(e.target.value)} inputMode="numeric"/></label>
          </div>
        </section>

        <section className={styles.card}>
          <h2>4. Internal Notes</h2>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={4} placeholder="Customer request, itinerary, guide, driver, special notes..."/>
        </section>
      </div>

      <aside className={styles.summary}>
        <div className={styles.summaryLabel}>Booking Summary</div>
        <h3>{tour.name}</h3>
        <div className={styles.line}><span>Guests</span><b>{adults+children+infants}</b></div>
        <div className={styles.line}><span>Gross</span><b>{money(gross)}</b></div>
        <div className={styles.line}><span>Discount</span><b>- {money(discountVnd)}</b></div>
        <div className={styles.total}><span>TOTAL</span><b>{money(net)}</b></div>
        <div className={styles.line}><span>Deposit</span><b>{money(depositVnd)}</b></div>
        <div className={styles.balance}><span>Balance</span><b>{money(balance)}</b></div>
        <div className={styles.audit}>Source will be locked to <b>David Direct</b> via {SALES_CODE}. Approval creates the real Booking Master record.</div>
        <button disabled={saving}>{saving?"Saving...":"Save Booking Request to Admin"}</button>
      </aside>
    </form>
  </main>
}

function Counter({label,value,setValue}:{label:string;value:number;setValue:(n:number)=>void}){
  return <div className={styles.counter}>
    <b>{label}</b>
    <div><button type="button" onClick={()=>setValue(Math.max(0,value-1))}>−</button><span>{value}</span><button type="button" onClick={()=>setValue(value+1)}>+</button></div>
  </div>
}
