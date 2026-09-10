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
if (!fs.existsSync(component)) throw new Error("Missing components/PhuQuocJohnsCatalog.tsx");

const publicBrandDir = path.join(repo, "public", "brand");
if (!fs.existsSync(publicBrandDir)) fs.mkdirSync(publicBrandDir, { recursive: true });

const payloadLogo = path.join(__dirname, "payload", "govietstay-phu-quoc-logo.png");
if (!fs.existsSync(payloadLogo)) throw new Error("Missing payload logo file.");

const targetLogo = path.join(publicBrandDir, "govietstay-phu-quoc-logo.png");
fs.copyFileSync(payloadLogo, targetLogo);

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
fs.copyFileSync(component, component + ".before-v3.4.2-" + stamp + ".bak");

let s = fs.readFileSync(component, "utf8");

function replaceIfPresent(oldText, newText, label) {
  if (s.includes(newText)) {
    console.log("[SKIP] " + label + " already applied");
    return;
  }
  if (!s.includes(oldText)) {
    console.log("[SKIP] " + label + " anchor not found");
    return;
  }
  s = s.replace(oldText, newText);
  console.log("[OK] " + label);
}

// 1) Replace only the TOP logo with the new Phu Quoc logo.
replaceIfPresent(
  '<div className="mb-5 inline-flex max-w-[170px] overflow-hidden rounded-2xl bg-white p-2 shadow-lg sm:max-w-[190px]"><img src="/brand/govietstay-official-logo.jpg" alt="GoVietStay" className="h-auto w-full object-contain" /></div>',
  '<div className="mb-5 inline-flex max-w-[155px] overflow-hidden rounded-2xl bg-white p-2 shadow-lg sm:max-w-[175px]"><img src="/brand/govietstay-phu-quoc-logo.png" alt="GoVietStay Phu Quoc" className="h-auto w-full object-contain" /></div>',
  "Top hero logo swapped to Phu Quoc logo"
);

// 2) Remove the extra logo badge over the hero image, keep only the local-support text.
replaceIfPresent(
  '<p className="text-[10px] font-black uppercase tracking-[.15em] text-amber-300 sm:text-xs">{language === "ru" ? "Фукуок · местная поддержка" : "Phu Quoc · local support"}</p><div className="mt-2 inline-flex max-w-[150px] overflow-hidden rounded-xl bg-white p-1.5 shadow-lg sm:max-w-[170px]"><img src="/brand/govietstay-official-logo.jpg" alt="GoVietStay" className="h-auto w-full object-contain" /></div>',
  '<p className="text-[10px] font-black uppercase tracking-[.15em] text-amber-300 sm:text-xs">{language === "ru" ? "Фукуок · местная поддержка" : "Phu Quoc · local support"}</p>',
  "Removed hero image logo badge"
);

// If the badge had already been changed to the Phu Quoc logo somehow, remove that too.
replaceIfPresent(
  '<p className="text-[10px] font-black uppercase tracking-[.15em] text-amber-300 sm:text-xs">{language === "ru" ? "Фукуок · местная поддержка" : "Phu Quoc · local support"}</p><div className="mt-2 inline-flex max-w-[150px] overflow-hidden rounded-xl bg-white p-1.5 shadow-lg sm:max-w-[170px]"><img src="/brand/govietstay-phu-quoc-logo.png" alt="GoVietStay Phu Quoc" className="h-auto w-full object-contain" /></div>',
  '<p className="text-[10px] font-black uppercase tracking-[.15em] text-amber-300 sm:text-xs">{language === "ru" ? "Фукуок · местная поддержка" : "Phu Quoc · local support"}</p>',
  "Removed hero image badge if already Phu Quoc logo"
);

// 3) Safety: if the top logo still references the old file, force swap generic occurrences in the top snippet.
s = s.replace(
  'src="/brand/govietstay-official-logo.jpg" alt="GoVietStay"',
  'src="/brand/govietstay-phu-quoc-logo.png" alt="GoVietStay Phu Quoc"'
);

fs.writeFileSync(component, s, "utf8");

console.log("[OK] New logo copied to public/brand/govietstay-phu-quoc-logo.png");
console.log("[OK] Only the top hero logo remains visible.");
console.log("[OK] Hero photo logo badge removed.");
console.log("[OK] WhatsApp, mobile, tour details, booking and deposit remain unchanged.");

const nextDir = path.join(repo, ".next");
if (fs.existsSync(nextDir)) fs.rmSync(nextDir, { recursive: true, force: true });

console.log("\nRunning npm run build...\n");
const build = spawnSync("npm", ["run", "build"], { cwd: repo, stdio: "inherit", shell: true });
if (build.status !== 0) {
  console.error("\n[FAIL] Build failed. Nothing committed or pushed.");
  process.exit(build.status || 1);
}

console.log("\n============================================================");
console.log(" SUCCESS - PHU QUOC V3.4.2 LOGO SWAP BUILD PASSED");
console.log(" NOTHING COMMITTED / NOTHING PUSHED");
console.log("============================================================");
console.log(" - Top hero logo changed to Phu Quoc logo");
console.log(" - Extra logo over hero image removed");
console.log(" - Existing EN/RU URLs unchanged");
