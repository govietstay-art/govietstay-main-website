const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const home = process.env.USERPROFILE || process.env.HOME;
let repo = path.join(home, "Documents", "GitHub", "govietstay-main-website");
if (!fs.existsSync(path.join(repo, "package.json"))) {
  if (fs.existsSync(path.join(process.cwd(), "package.json"))) repo = process.cwd();
  else throw new Error("Cannot find govietstay-main-website repository.");
}

const file = path.join(repo, "components", "PhuQuocJohnsCatalog.tsx");
if (!fs.existsSync(file)) throw new Error("Missing components/PhuQuocJohnsCatalog.tsx");

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
fs.copyFileSync(file, file + ".before-v3.4.1-" + stamp + ".bak");

let s = fs.readFileSync(file, "utf8");

function replaceIfPresent(oldText, newText, label) {
  if (s.includes(newText)) {
    console.log("[SKIP] " + label + " already applied");
    return;
  }
  if (!s.includes(oldText)) {
    console.log("[SKIP] " + label + " anchor not found; leaving unchanged");
    return;
  }
  s = s.replace(oldText, newText);
  console.log("[OK] " + label);
}

// ---------- V3.4 responsive/logo/WhatsApp (idempotent) ----------

replaceIfPresent(
  '<main className="min-h-screen bg-[#f7f1e5] text-[#082f2b]">',
  '<main className="min-h-screen bg-[#f7f1e5] pb-24 text-[#082f2b] md:pb-0">',
  "Bottom safe space"
);

replaceIfPresent(
  '<div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:py-24">',
  '<div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-5 sm:py-14 md:px-8 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-10 lg:py-20">',
  "Mobile hero spacing"
);

replaceIfPresent(
  '<div><p className="text-xs font-black uppercase tracking-[.22em] text-amber-300">{t.eyebrow}</p>',
  '<div><div className="mb-5 inline-flex max-w-[170px] overflow-hidden rounded-2xl bg-white p-2 shadow-lg sm:max-w-[190px]"><img src="/brand/govietstay-official-logo.jpg" alt="GoVietStay" className="h-auto w-full object-contain" /></div><p className="text-[11px] font-black uppercase tracking-[.2em] text-amber-300 sm:text-xs sm:tracking-[.22em]">{t.eyebrow}</p>',
  "Official logo in hero"
);

replaceIfPresent(
  '<h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">{t.title}</h1>',
  '<h1 className="mt-4 max-w-4xl text-[2.45rem] font-black leading-[1.02] tracking-tight sm:mt-5 sm:text-5xl md:text-6xl lg:text-7xl">{t.title}</h1>',
  "Responsive headline"
);

replaceIfPresent(
  '<p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">{t.lead}</p><div className="mt-8 flex flex-wrap gap-3">',
  '<p className="mt-5 max-w-3xl text-base leading-7 text-white/80 sm:mt-6 sm:text-lg sm:leading-8">{t.lead}</p><div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">',
  "Responsive lead and CTA"
);

s = s.replace(
  'className="rounded-full bg-amber-300 px-6 py-3.5 font-black text-[#07322f]"',
  'className="w-full rounded-full bg-amber-300 px-6 py-3.5 text-center font-black text-[#07322f] sm:w-auto"'
);
s = s.replace(
  'className="rounded-full border border-white/35 px-6 py-3.5 font-black text-white"',
  'className="w-full rounded-full border border-white/35 px-6 py-3.5 text-center font-black text-white sm:w-auto"'
);

replaceIfPresent(
  'className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl md:min-h-[480px]"',
  'className="relative min-h-[300px] overflow-hidden rounded-[1.6rem] border border-white/15 shadow-2xl sm:min-h-[360px] sm:rounded-[2rem] md:min-h-[480px]"',
  "Responsive hero image"
);

replaceIfPresent(
  '<p className="text-xs font-black uppercase tracking-[.16em] text-amber-300">{language === "ru" ? "Фукуок · местная поддержка" : "Phu Quoc · local support"}</p><p className="mt-2 text-2xl font-black">GoVietStay</p>',
  '<p className="text-[10px] font-black uppercase tracking-[.15em] text-amber-300 sm:text-xs">{language === "ru" ? "Фукуок · местная поддержка" : "Phu Quoc · local support"}</p><div className="mt-2 inline-flex max-w-[150px] overflow-hidden rounded-xl bg-white p-1.5 shadow-lg sm:max-w-[170px]"><img src="/brand/govietstay-official-logo.jpg" alt="GoVietStay" className="h-auto w-full object-contain" /></div>',
  "Logo badge over hero photo"
);

// ---------- Russian-guide note ----------
if (!s.includes('data-russian-guide-note="true"')) {
  const jointAnchor = '<p className="mt-4 text-lg leading-8 text-[#315b56]">{t.jointText}</p></div>';
  const note = `<p className="mt-4 text-lg leading-8 text-[#315b56]">{t.jointText}</p>
        <div data-russian-guide-note="true" className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm sm:p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-300 text-lg">🇷🇺</div>
            <div className="min-w-0">
              <p className="font-black text-[#6c4d05]">{language === "ru" ? "Нужен русскоговорящий гид?" : "Need a Russian-speaking guide?"}</p>
              <p className="mt-1 text-sm leading-6 text-[#6c5830]">
                {language === "ru"
                  ? "Все групповые туры, указанные на этой странице, проводятся с англоязычным гидом. Если вам нужен русскоговорящий гид или индивидуальное сопровождение на русском языке, свяжитесь с GoVietStay напрямую — мы предложим подходящий формат и лучшую доступную цену."
                  : "All join-in tours listed on this page operate with an English-speaking guide. If you need a Russian-speaking guide or private Russian-language assistance, contact GoVietStay directly for the most suitable option and best available quote."}
              </p>
              <a
                href={\`https://wa.me/\${WHATSAPP_NUMBER}?text=\${encodeURIComponent(language === "ru" ? "Здравствуйте! Мне нужен русскоговорящий гид для тура на Фукуоке. Пожалуйста, сообщите цену." : "Hello! I need a Russian-speaking guide for a Phu Quoc tour. Please send me the best available quote.")}\`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-[#25D366] px-4 py-3 text-sm font-black text-white sm:w-auto"
              >
                {language === "ru" ? "Узнать цену с русским гидом" : "Ask for Russian guide price"}
              </a>
            </div>
          </div>
        </div>
      </div>`;
  if (!s.includes(jointAnchor)) throw new Error("Could not find join-in section anchor for Russian guide note.");
  s = s.replace(jointAnchor, note);
  console.log("[OK] Russian-speaking guide note added");
} else {
  console.log("[SKIP] Russian-speaking guide note already present");
}

// ---------- Floating WhatsApp ----------
if (!s.includes('data-phuquoc-whatsapp-floating="true"')) {
  const floating = `
    <a
      data-phuquoc-whatsapp-floating="true"
      href={\`https://wa.me/\${WHATSAPP_NUMBER}?text=\${encodeURIComponent(language === "ru" ? "Здравствуйте! Мне нужна помощь с туром на Фукуоке." : "Hello! I need help choosing a Phu Quoc tour.")}\`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={language === "ru" ? "Написать GoVietStay в WhatsApp" : "Chat with GoVietStay on WhatsApp"}
      className="fixed bottom-[max(12px,env(safe-area-inset-bottom))] left-3 right-3 z-[70] flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-5 py-3.5 text-center text-sm font-black text-white shadow-[0_12px_35px_rgba(0,0,0,.28)] transition hover:translate-y-[-1px] hover:shadow-[0_16px_40px_rgba(0,0,0,.34)] focus:outline-none focus:ring-4 focus:ring-white/50 sm:left-auto sm:right-5 sm:w-auto sm:min-w-[220px] sm:rounded-full"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-6 w-6 shrink-0 fill-current">
        <path d="M19.11 17.21c-.31-.16-1.83-.9-2.11-1-.28-.1-.49-.16-.69.16-.2.31-.79 1-.97 1.2-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.54-.92-.82-1.54-1.84-1.72-2.15-.18-.31-.02-.48.14-.63.14-.14.31-.36.46-.54.15-.18.2-.31.31-.52.1-.21.05-.39-.03-.54-.08-.16-.69-1.67-.95-2.29-.25-.6-.51-.52-.69-.53h-.59c-.21 0-.54.08-.82.39-.28.31-1.08 1.05-1.08 2.56s1.1 2.97 1.25 3.18c.15.21 2.16 3.3 5.24 4.63.73.31 1.3.5 1.75.64.74.23 1.4.2 1.93.12.59-.09 1.83-.75 2.09-1.47.26-.72.26-1.33.18-1.46-.08-.13-.28-.21-.59-.36z"/>
        <path d="M16.02 3C8.84 3 3 8.72 3 15.75c0 2.25.6 4.45 1.74 6.39L3 29l7.02-1.79a13.2 13.2 0 0 0 6 1.45h.01C23.2 28.66 29 22.95 29 15.91 29 8.88 23.2 3 16.02 3zm0 23.51h-.01a11 11 0 0 1-5.59-1.52l-.4-.24-4.16 1.06 1.11-4.02-.26-.41a10.5 10.5 0 0 1-1.64-5.63c0-5.86 4.91-10.62 10.96-10.62 2.92 0 5.67 1.11 7.73 3.13a10.36 10.36 0 0 1 3.2 7.55c0 5.86-4.91 10.7-10.94 10.7z"/>
      </svg>
      <span>{language === "ru" ? "WhatsApp · Написать GoVietStay" : "WhatsApp · Chat with GoVietStay"}</span>
    </a>
`;
  if (!s.includes("  </main>;")) throw new Error("Could not find closing </main>.");
  s = s.replace("  </main>;", floating + "\n  </main>;");
  console.log("[OK] Floating WhatsApp added");
}

fs.writeFileSync(file, s, "utf8");

console.log("[OK] Join-in prices still represent English-guide shared tours.");
console.log("[OK] Russian-guide request is quoted separately via GoVietStay.");
console.log("[OK] EN + RU URLs and booking/deposit logic unchanged.");

const nextDir = path.join(repo, ".next");
if (fs.existsSync(nextDir)) fs.rmSync(nextDir, { recursive: true, force: true });

console.log("\nRunning npm run build...\n");
const build = spawnSync("npm", ["run", "build"], { cwd: repo, stdio: "inherit", shell: true });
if (build.status !== 0) {
  console.error("\n[FAIL] Build failed. Nothing committed or pushed.");
  process.exit(build.status || 1);
}

console.log("\n============================================================");
console.log(" SUCCESS - PHU QUOC V3.4.1 BUILD PASSED");
console.log(" NOTHING COMMITTED / NOTHING PUSHED");
console.log("============================================================");
console.log(" - Official GoVietStay logo");
console.log(" - Floating mobile-safe WhatsApp");
console.log(" - Russian-guide pricing note");
console.log(" - English guide clarified for listed join-in tours");
