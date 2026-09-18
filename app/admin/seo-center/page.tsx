import { redirect } from "next/navigation";

/** Keep older preview bookmarks working while showing SEO inside the main
 * /admin sidebar and its existing authenticated session. */
export default function SeoCenterPage() {
  redirect("/admin?seo=center");
}
