/** Public SELLING prices transcribed from Blue Waves Tour Book 2026 (pp. 4–7).
 * All amounts VND. Never treat these prices as supplier-net costs.
 * Source-specific confirmation and weather/seat restrictions remain applicable.
 */
export type BWMode = "join" | "private" | "charter";
export type BWZone = "center" | "north" | "south";
type Rates={adult:number[]|null;child:number[]|null;privateRates:Record<number,number>;modes:BWMode[];sunsetAdult?:number[];sunsetChild?:number[];charterRates?:Record<number,number>};
export const BW_RATES:Record<string,Rates> = {
  "PQ-01": {
    "adult": [
      950000,
      1050000,
      950000
    ],
    "child": [
      800000,
      900000,
      800000
    ],
    "privateRates": {
      "1": 5450000,
      "2": 2900000,
      "3": 2000000,
      "4": 1600000,
      "5": 1450000
    },
    "modes": [
      "join",
      "private"
    ]
  },
  "PQ-02": {
    "adult": [
      1100000,
      1050000,
      1150000
    ],
    "child": [
      950000,
      900000,
      1000000
    ],
    "privateRates": {},
    "modes": [
      "join"
    ]
  },
  "PQ-03": {
    "adult": [
      1250000,
      1250000,
      1350000
    ],
    "child": [
      1050000,
      1050000,
      1150000
    ],
    "privateRates": {
      "4": 1250000,
      "5": 1200000,
      "6": 1000000,
      "7": 1050000,
      "8": 1050000,
      "9": 1000000,
      "10": 1000000
    },
    "modes": [
      "join",
      "private"
    ]
  },
  "PQ-04": {
    "adult": [
      1000000,
      1000000,
      1100000
    ],
    "child": [
      850000,
      850000,
      950000
    ],
    "privateRates": {
      "1": 8500000,
      "2": 4450000,
      "3": 3100000,
      "4": 2550000,
      "5": 2300000
    },
    "modes": [
      "join",
      "private"
    ]
  },
  "PQ-05": {
    "adult": [
      1350000,
      1350000,
      1350000
    ],
    "child": [
      1150000,
      1150000,
      1150000
    ],
    "privateRates": {},
    "modes": [
      "join"
    ]
  },
  "PQ-06": {
    "adult": [
      2150000,
      2150000,
      2150000
    ],
    "child": [
      1800000,
      1800000,
      1800000
    ],
    "privateRates": {},
    "modes": [
      "join"
    ]
  },
  "PQ-07": {
    "adult": [
      2100000,
      2250000,
      2100000
    ],
    "child": [
      1800000,
      1900000,
      1800000
    ],
    "privateRates": {
      "1": 6950000,
      "2": 4250000,
      "3": 3300000,
      "4": 2850000,
      "5": 2700000
    },
    "modes": [
      "join",
      "private"
    ]
  },
  "PQ-08": {
    "adult": [
      2750000,
      2700000,
      2850000
    ],
    "child": [
      2350000,
      2300000,
      2400000
    ],
    "privateRates": {
      "2": 4650000,
      "3": 3700000,
      "4": 3400000,
      "5": 3200000,
      "6": 3100000,
      "7": 3050000,
      "8": 3000000,
      "9": 2950000,
      "10": 2900000
    },
    "modes": [
      "join",
      "private"
    ]
  },
  "PQ-09": {
    "adult": [
      2050000,
      2250000,
      2050000
    ],
    "child": [
      1500000,
      1700000,
      1500000
    ],
    "privateRates": {},
    "modes": [
      "join",
      "charter"
    ],
    "sunsetAdult": [
      2150000,
      2350000,
      2150000
    ],
    "sunsetChild": [
      1600000,
      1800000,
      1600000
    ],
    "charterRates": {
      "10": 33000000
    }
  },
  "PQ-10": {
    "adult": null,
    "child": null,
    "privateRates": {
      "1": 3900000,
      "2": 2100000,
      "3": 1500000,
      "4": 1200000,
      "5": 1150000
    },
    "modes": [
      "private"
    ]
  },
  "PQ-11": {
    "adult": [
      2150000,
      2300000,
      2050000
    ],
    "child": [
      1850000,
      1950000,
      1750000
    ],
    "privateRates": {
      "1": 4300000,
      "2": 3000000,
      "3": 2600000,
      "4": 2400000,
      "5": 2350000
    },
    "modes": [
      "join",
      "private"
    ]
  },
  "PQ-12": {
    "adult": [
      950000,
      1100000,
      950000
    ],
    "child": [
      800000,
      950000,
      800000
    ],
    "privateRates": {
      "1": 4050000,
      "2": 2250000,
      "3": 1650000,
      "4": 1500000,
      "5": 1450000
    },
    "modes": [
      "join",
      "private"
    ]
  },
  "PQ-13": {
    "adult": null,
    "child": null,
    "privateRates": {
      "1": 5850000,
      "2": 3350000,
      "3": 2500000,
      "4": 2700000,
      "5": 2450000
    },
    "modes": [
      "private"
    ]
  },
  "PQ-14": {
    "adult": [
      2700000,
      2700000,
      2700000
    ],
    "child": [
      2300000,
      2300000,
      2300000
    ],
    "privateRates": {},
    "modes": [
      "join",
      "charter"
    ],
    "charterRates": {
      "5": 44000000,
      "10": 50000000,
      "20": 65000000,
      "30": 75000000
    }
  },
  "PQ-15": {
    "adult": [
      2700000,
      2700000,
      2700000
    ],
    "child": [
      2300000,
      2300000,
      2300000
    ],
    "privateRates": {},
    "modes": [
      "join",
      "charter"
    ],
    "charterRates": {
      "5": 44000000,
      "10": 50000000,
      "20": 65000000,
      "30": 75000000
    }
  },
  "PQ-16": {
    "adult": null,
    "child": null,
    "privateRates": {
      "4": 2950000,
      "5": 2600000,
      "6": 2350000,
      "8": 2100000,
      "10": 1900000,
      "12": 1800000,
      "15": 1750000,
      "20": 1600000,
      "25": 1500000
    },
    "modes": [
      "private"
    ]
  },
  "PQ-17": {
    "adult": [
      950000,
      1000000,
      950000
    ],
    "child": [
      800000,
      850000,
      800000
    ],
    "privateRates": {
      "5": 1450000,
      "6": 1250000,
      "7": 1150000,
      "8": 1100000,
      "9": 1050000,
      "10": 1000000
    },
    "modes": [
      "join",
      "private"
    ]
  }
};
export const BW_ZONES:BWZone[]=["center","north","south"];
export type BWQuote={total:number;perAdult:number;perChild:number;requiresConfirmation:boolean};
export function bwQuote(input:{code:string;mode:BWMode;zone:BWZone;adults:number;children:number;infants:number;session?:"morning"|"sunset";skyLounge?:boolean}):BWQuote|null{
 const rate=BW_RATES[input.code];
 if(!rate||!rate.modes.includes(input.mode)||!BW_ZONES.includes(input.zone))return null;
 const adults=Math.floor(input.adults),children=Math.floor(input.children),infants=Math.floor(input.infants);
 const count=adults+children+infants;
 if(![adults,children,infants].every(n=>Number.isFinite(n)&&n>=0&&n<=40)||count<1)return null;
 if(input.mode==="join"){
  if((input.code==="PQ-02"&&count<=6)||(input.code==="PQ-03"&&count<1)||(input.code==="PQ-17"&&count<9))return null;
  let a=rate.adult,c=rate.child;
  if(input.code==="PQ-09"&&input.session==="sunset"){a=rate.sunsetAdult||a;c=rate.sunsetChild||c;}
  if(!a||!c)return null;
  const z=BW_ZONES.indexOf(input.zone);let pa=a[z],pc=c[z];
  // Final group prices (adults only) from p. 6; unchanged children's rates.
  if(count>=11){
   const large=count>=21;
   if(input.code==="PQ-04"&&input.zone==="north"&&!large)pa=950000;
   if(input.code==="PQ-07"&&input.zone==="north")pa=large?2150000:2200000;
   if(input.code==="PQ-07"&&input.zone==="south")pa=large?2000000:2050000;
   if(input.code==="PQ-08"&&input.zone==="north")pa=large?2600000:2650000;
   if(input.code==="PQ-08"&&input.zone==="south"&&!large)pa=2800000;
   if(input.code==="PQ-09"){
    const sunset=input.session==="sunset";
    if(input.zone==="center"||input.zone==="south")pa=(sunset?2100000:2000000)-(large?50000:0);
    if(input.zone==="north"&&!large)pa=sunset?2300000:2200000;
   }
  }
  return {total:pa*adults+pc*children,perAdult:pa,perChild:pc,requiresConfirmation:["PQ-09","PQ-14","PQ-15"].includes(input.code)};
 }
 if(input.mode==="private"){
  const entries=Object.entries(rate.privateRates).map(([n,p])=>[Number(n),p] as const).sort((a,b)=>a[0]-b[0]);
  const eligible=entries.filter(([n])=>n<=count);
  if(!eligible.length)return null;
  // Follow lower bracket for in-between sizes; above max must be checked manually.
  if(count>entries[entries.length-1][0])return null;
  const per=eligible[eligible.length-1][1];
  return {total:per*count,perAdult:per,perChild:per,requiresConfirmation:true};
 }
 if(!rate.charterRates)return null;
 const tiers=Object.entries(rate.charterRates).map(([n,p])=>[Number(n),p] as const).sort((a,b)=>a[0]-b[0]);
 const tier=tiers.find(([n])=>count<=n);
 if(!tier)return null;
 const upgrade=(input.skyLounge&&["PQ-14","PQ-15"].includes(input.code)?count*500000:0);
 return {total:tier[1]+upgrade,perAdult:0,perChild:0,requiresConfirmation:true};
}
