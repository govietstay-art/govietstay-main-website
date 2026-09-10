import PhuQuocSeoPage, { buildPhuQuocMetadata } from "../../../components/phu-quoc-seo/PhuQuocSeoPage";
import { phuQuocSeoPages } from "../../../lib/phu-quoc-seo-pages";

const data = phuQuocSeoPages["phu-quoc-sunset-town"];

export const metadata = buildPhuQuocMetadata(data);

export default function Page() {
  return <PhuQuocSeoPage data={data} />;
}
