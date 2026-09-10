const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const home = process.env.USERPROFILE || process.env.HOME;
let repo = path.join(home, "Documents", "GitHub", "govietstay-main-website");
if (!fs.existsSync(path.join(repo, "package.json"))) {
  if (fs.existsSync(path.join(process.cwd(), "package.json"))) repo = process.cwd();
  else throw new Error("Cannot find govietstay-main-website repository.");
}

const component = path.join(repo, "components", "PhuQuocJohnsCatalog.tsx");
const payloadFile = path.join(__dirname, "payload", "lib", "phuQuocTourDetails.ts");
const targetData = path.join(repo, "lib", "phuQuocTourDetails.ts");

if (!fs.existsSync(component)) throw new Error("Missing components/PhuQuocJohnsCatalog.tsx");
if (!fs.existsSync(payloadFile)) throw new Error("Missing payload/lib/phuQuocTourDetails.ts");

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
fs.copyFileSync(component, component + ".before-v3.3-" + stamp + ".bak");
fs.copyFileSync(payloadFile, targetData);

let s = fs.readFileSync(component, "utf8");

const importLine = 'import { PHU_QUOC_PUBLISHED_RATES } from "../lib/phuQuocPublishedRates";';
const newImport = importLine + '\nimport { PHU_QUOC_TOUR_DETAILS } from "../lib/phuQuocTourDetails";';
if (!s.includes('PHU_QUOC_TOUR_DETAILS')) {
  if (!s.includes(importLine)) throw new Error("Could not find published rates import.");
  s = s.replace(importLine, newImport);
}

const anchor = '</strong></div></div><button type="button" onClick={()=>openBooking(tour)} className="mt-5 w-full rounded-2xl bg-[#1fa85b] px-5 py-3.5 text-center font-black text-white">{t.book}</button>';

const detailBlock = `</strong></div></div>{PHU_QUOC_TOUR_DETAILS[tour.code] && <details className="mt-4 overflow-hidden rounded-2xl border border-[#dce9e3] bg-[#f8fbf9]">
  <summary className="cursor-pointer list-none px-4 py-3 text-sm font-black text-[#0b5c55]">
    <span className="flex items-center justify-between gap-3">
      <span>{language === "ru" ? "Подробнее о туре" : "View tour details"}</span>
      <span aria-hidden="true">＋</span>
    </span>
  </summary>
  <div className="border-t border-[#dce9e3] px-4 py-4">
    <div className="grid grid-cols-2 gap-2 text-xs">
      <div className="rounded-xl bg-white p-3"><span className="block font-black uppercase tracking-wide text-[#6e8d88]">{language === "ru" ? "Время" : "Time"}</span><strong className="mt-1 block text-[#0b5c55]">{PHU_QUOC_TOUR_DETAILS[tour.code].time}</strong></div>
      <div className="rounded-xl bg-white p-3"><span className="block font-black uppercase tracking-wide text-[#6e8d88]">{language === "ru" ? "Транспорт" : "Transport"}</span><strong className="mt-1 block text-[#0b5c55]">{language === "ru" ? PHU_QUOC_TOUR_DETAILS[tour.code].transportRu : PHU_QUOC_TOUR_DETAILS[tour.code].transportEn}</strong></div>
    </div>
    <h4 className="mt-4 text-sm font-black text-[#082f2b]">{language === "ru" ? "Программа" : "Itinerary"}</h4>
    <ol className="mt-2 space-y-2 text-sm leading-6 text-[#496b67]">
      {(language === "ru" ? PHU_QUOC_TOUR_DETAILS[tour.code].itineraryRu : PHU_QUOC_TOUR_DETAILS[tour.code].itineraryEn).map((step,index)=><li key={index} className="flex gap-2"><span className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e3f4ec] text-[10px] font-black text-emerald-800">{index+1}</span><span>{step}</span></li>)}
    </ol>
    <h4 className="mt-4 text-sm font-black text-[#082f2b]">{language === "ru" ? "Включено" : "Included"}</h4>
    <ul className="mt-2 space-y-1.5 text-sm leading-6 text-[#496b67]">
      {(language === "ru" ? PHU_QUOC_TOUR_DETAILS[tour.code].includesRu : PHU_QUOC_TOUR_DETAILS[tour.code].includesEn).map(item=><li key={item}>✓ {item}</li>)}
    </ul>
    {(language === "ru" ? PHU_QUOC_TOUR_DETAILS[tour.code].noteRu : PHU_QUOC_TOUR_DETAILS[tour.code].noteEn) && <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs font-semibold leading-5 text-[#6c5830]"><strong>{language === "ru" ? "Важно: " : "Important: "}</strong>{language === "ru" ? PHU_QUOC_TOUR_DETAILS[tour.code].noteRu : PHU_QUOC_TOUR_DETAILS[tour.code].noteEn}</p>}
  </div>
</details>}<button type="button" onClick={()=>openBooking(tour)} className="mt-5 w-full rounded-2xl bg-[#1fa85b] px-5 py-3.5 text-center font-black text-white">{t.book}</button>`;

if (!s.includes('View tour details') && !s.includes('Подробнее о туре')) {
  if (!s.includes(anchor)) throw new Error("Could not find joint-tour card booking anchor.");
  s = s.replace(anchor, detailBlock);
}

fs.writeFileSync(component, s, "utf8");

console.log("[OK] Added bilingual detailed accordion data for 13 join-in tours.");
console.log("[OK] Existing EN/RU URLs unchanged.");
console.log("[OK] No new public routes created.");
console.log("[OK] Booking/deposit flow unchanged.");

const nextDir = path.join(repo, ".next");
if (fs.existsSync(nextDir)) fs.rmSync(nextDir, { recursive: true, force: true });

console.log("\nRunning npm run build...\n");
const build = spawnSync("npm", ["run", "build"], { cwd: repo, stdio: "inherit", shell: true });
if (build.status !== 0) {
  console.error("\n[FAIL] Build failed. Nothing committed or pushed.");
  process.exit(build.status || 1);
}

console.log("\n============================================================");
console.log(" SUCCESS - PHU QUOC V3.3 TOUR DETAILS BUILD PASSED");
console.log(" NOTHING COMMITTED / NOTHING PUSHED");
console.log("============================================================");
console.log("Added:");
console.log(" - View tour details / Подробнее accordion on all 13 join-in cards");
console.log(" - Time + transport");
console.log(" - Step-by-step itinerary");
console.log(" - Included services");
console.log(" - Important notes");
console.log(" - Shared EN/RU data, no duplicate SEO routes");
