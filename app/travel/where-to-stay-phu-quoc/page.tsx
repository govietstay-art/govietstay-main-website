import PhuQuocSeoPage, { buildPhuQuocMetadata } from "../../../components/phu-quoc-seo/PhuQuocSeoPage";
import { phuQuocSeoPages } from "../../../lib/phu-quoc-seo-pages";

const data = phuQuocSeoPages["where-to-stay-phu-quoc"];

const canonical = "https://www.govietstay.com/travel/where-to-stay-phu-quoc";
export const metadata = { ...buildPhuQuocMetadata(data), alternates: { canonical, languages: { en: canonical, "de-DE": "https://www.govietstay.com/de/phu-quoc/wo-uebernachten" } } };

export default function Page() {
  return <PhuQuocSeoPage data={data} />;
}
