import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "components", "admin-v5", "AdminV5.tsx");
let source = fs.readFileSync(file, "utf8");

function replaceOnce(find, replacement, label) {
  if (source.includes(replacement)) return;
  const first = source.indexOf(find);
  if (first < 0) throw new Error(`Admin partner platform anchor not found: ${label}`);
  if (source.indexOf(find, first + find.length) >= 0) throw new Error(`Admin partner platform anchor ambiguous: ${label}`);
  source = source.slice(0, first) + replacement + source.slice(first + find.length);
}

replaceOnce(
  'import PartnerTools from "./PartnerTools";',
  'import PartnerTools from "./PartnerTools";\nimport PiPartnerTools from "./PiPartnerTools";\nimport MerchantNetworkTools from "./MerchantNetworkTools";',
  "partner platform imports"
);

replaceOnce(
  'const [tab,setTab]=useState<"dashboard"|"analytics"|"marketing"|"partners"|"seo"|"leads"|"bookings"|"reviews"|"finance"|"team"|"operator_payables"|"yandex"|"phuquoc">("dashboard");',
  'const [tab,setTab]=useState<"dashboard"|"analytics"|"marketing"|"partners"|"pi_partners"|"merchant_network"|"seo"|"leads"|"bookings"|"reviews"|"finance"|"team"|"operator_payables"|"yandex"|"phuquoc">("dashboard");',
  "tab union"
);

replaceOnce(
  '<button className={tab==="partners"?"active":""} onClick={()=>setTab("partners")}>Partners / QR</button>',
  '<button className={tab==="partners"?"active":""} onClick={()=>setTab("partners")}>Partners thường / QR</button>\n        <button className={tab==="pi_partners"?"active":""} onClick={()=>setTab("pi_partners")}>Pi Community</button>\n        <button className={tab==="merchant_network"?"active":""} onClick={()=>setTab("merchant_network")}>Merchant Network</button>',
  "partner navigation"
);

replaceOnce(
  '{tab==="partners"&&<PartnerTools supabase={supabase} days={days}/>}',
  '{tab==="partners"&&<PartnerTools supabase={supabase} days={days}/>}\n      {tab==="pi_partners"&&<PiPartnerTools supabase={supabase} days={days}/>}\n      {tab==="merchant_network"&&<MerchantNetworkTools supabase={supabase} days={days}/>} ',
  "partner renders"
);

replaceOnce(
  'tab==="partners"?"Partners / QR":tab==="seo"?',
  'tab==="partners"?"Partners thường / QR":tab==="pi_partners"?"Pi Community Partners":tab==="merchant_network"?"Merchant Network Lab":tab==="seo"?',
  "admin title"
);

fs.writeFileSync(file, source, "utf8");
console.log("[partner-platform] Regular Partners, Pi Community and Merchant Network tabs prepared.");
