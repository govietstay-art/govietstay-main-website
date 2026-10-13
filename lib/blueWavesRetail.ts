// Selling prices from Blue-Waves_Tour-Book_FINAL(2).docx (2026).
// These are PUBLIC RETAIL prices, NOT supplier costs.
// All amounts are VND. USD displays in the source are rounded at 26,000 VND/USD.
export type PickupZone = "center" | "north" | "south";
export type TourFormat = "join" | "private" | "charter";
type ZoneRates = Record<PickupZone,[number,number]>;
const z=(center:[number,number],north:[number,number],south:[number,number]):ZoneRates=>({center,north,south});
export const BW_JOIN:Record<string,{rates:ZoneRates; sunset?:ZoneRates; minGuests?:number; weekdays?:number[]; confirmation?:boolean}> = {
 "PQ-01":{rates:z([950000,800000],[1050000,900000],[950000,800000])},
 "PQ-02":{rates:z([1100000,950000],[1050000,900000],[1150000,1000000]),minGuests:7},
 "PQ-03":{rates:z([1250000,1050000],[1250000,1050000],[1350000,1150000]),weekdays:[2,5]},
 "PQ-04":{rates:z([1000000,850000],[1000000,850000],[1100000,950000])},
 "PQ-05":{rates:z([1350000,1150000],[1350000,1150000],[1350000,1150000])},
 "PQ-06":{rates:z([2150000,1800000],[2150000,1800000],[2150000,1800000])},
 "PQ-07":{rates:z([2100000,1800000],[2250000,1900000],[2100000,1800000])},
 "PQ-08":{rates:z([2750000,2350000],[2700000,2300000],[2850000,2400000])},
 "PQ-09":{rates:z([2050000,1500000],[2250000,1700000],[2050000,1500000]),sunset:z([2150000,1600000],[2350000,1800000],[2150000,1600000]),confirmation:true},
 "PQ-11":{rates:z([2150000,1850000],[2300000,1950000],[2050000,1750000])},
 "PQ-12":{rates:z([950000,800000],[1100000,950000],[950000,800000])},
 "PQ-14":{rates:z([2700000,2300000],[2700000,2300000],[2700000,2300000]),confirmation:true},
 "PQ-15":{rates:z([2700000,2300000],[2700000,2300000],[2700000,2300000]),confirmation:true},
 "PQ-17":{rates:z([950000,800000],[1000000,850000],[950000,800000]),weekdays:[1,5]},
};
// Private prices are PER GUEST according to total booking guests.
// For unlisted group sizes apply the immediately LOWER listed bracket.
export const BW_PRIVATE:Record<string,Record<number,number>> = {
 "PQ-01":{1:5450000,2:2900000,3:2000000,4:1600000,5:1450000},
 "PQ-03":{4:1250000,5:1200000,6:1000000,7:1050000,8:1050000,9:1000000,10:1000000},
 "PQ-04":{1:8500000,2:4450000,3:3100000,4:2550000,5:2300000},
 "PQ-07":{1:6950000,2:4250000,3:3300000,4:2850000,5:2700000},
 "PQ-08":{2:4650000,3:3700000,4:3400000,5:3200000,6:3100000,7:3050000,8:3000000,9:2950000,10:2900000},
 "PQ-10":{1:3900000,2:2100000,3:1500000,4:1200000,5:1150000},
 "PQ-11":{1:4300000,2:3000000,3:2600000,4:2400000,5:2350000},
 "PQ-12":{1:4050000,2:2250000,3:1650000,4:1500000,5:1450000},
 "PQ-13":{1:5850000,2:3350000,3:2500000,4:2700000,5:2450000},
 "PQ-16":{4:2950000,5:2600000,6:2350000,8:2100000,10:1900000,12:1800000,15:1750000,20:1600000,25:1500000},
 "PQ-17":{5:1450000,6:1250000,7:1150000,8:1100000,9:1050000,10:1000000},
};
export const BW_CHARTER:Record<string,Record<number,number>> = {
 "PQ-09":{10:33000000},
 "PQ-14":{5:44000000,10:50000000,20:65000000,30:75000000},
 "PQ-15":{5:44000000,10:50000000,20:65000000,30:75000000},
};
const groupAdult=(code:string,zone:PickupZone,guests:number,session:string,original:number)=>{
 if(guests<11)return original;
 if(code==="PQ-04"&&zone==="north"&&guests<=20)return 950000;
 if(code==="PQ-07"&&zone==="north")return guests>=21?2150000:2200000;
 if(code==="PQ-07"&&zone==="south")return guests>=21?2000000:2050000;
 if(code==="PQ-08"&&zone==="north")return guests>=21?2600000:2650000;
 if(code==="PQ-08"&&zone==="south"&&guests<=20)return 2800000;
 if(code==="PQ-09"){
  const sunset=session==="sunset";
  if(zone==="center"||zone==="south")return (sunset?2150000:2050000)-(guests>=21?100000:50000);
  if(zone==="north"&&guests<=20)return sunset?2300000:2200000;
 }
 return original;
};
export function blueWavesPrice(input:{code:string;format:TourFormat;zone:PickupZone;adults:number;children:number;infants:number;session?:string;skyLoungeGuests?:number}):{gross:number;adultUnit:number;childUnit:number;requiresConfirmation:boolean}|null{
 const {code,format,zone}=input;
 const adults=Math.floor(input.adults),children=Math.floor(input.children),infants=Math.floor(input.infants);
 if(![adults,children,infants].every(n=>Number.isFinite(n)&&n>=0&&n<=100))return null;
 const guests=adults+children+infants;if(guests<1)return null;
 const session=input.session||"morning";
 if(format==="join"){
  const t=BW_JOIN[code];if(!t||!t.rates[zone])return null;
  const tariff=(session==="sunset"&&t.sunset?t.sunset:t.rates)[zone];
  const adultUnit=groupAdult(code,zone,adults,session,tariff[0]);
  return {gross:adultUnit*adults+tariff[1]*children+((code==="PQ-14"||code==="PQ-15")?500000*Math.min(guests,Math.max(0,Math.floor(input.skyLoungeGuests||0))):0),adultUnit,childUnit:tariff[1],requiresConfirmation:!!t.confirmation};
 }
 if(format==="private"){
  const tiers=BW_PRIVATE[code];if(!tiers)return null;
  const allowed=Object.keys(tiers).map(Number).filter(n=>n<=guests).sort((a,b)=>b-a);
  if(!allowed.length)return null;
  // PQ-13 has max 3 guests per Jeep, not max 3 per booking. Operator confirmation required for larger groups.
  const unit=tiers[allowed[0]];
  return {gross:unit*guests,adultUnit:unit,childUnit:unit,requiresConfirmation:true};
 }
 if(format==="charter"){
  const tiers=BW_CHARTER[code];if(!tiers)return null;
  const cap=Object.keys(tiers).map(Number).sort((a,b)=>a-b).find(n=>n>=guests);if(!cap)return null;
  return {gross:tiers[cap],adultUnit:tiers[cap],childUnit:0,requiresConfirmation:true};
 }
 return null;
}
export const bwMoney=(n:number)=>new Intl.NumberFormat("vi-VN").format(n)+" VND";
