# GoVietStay Unified SEO Center

Preview route: `/admin/seo-center`. Access: an authenticated **active Owner or Admin** only. This is an additive route; existing booking, finance, partners, Google SEO, and Yandex screens are unchanged. The existing admin quick-access menu links to the new screen.

## Provider setup

- Google: reuse existing `admin_seo_*` Supabase RPCs and `/api/admin/search-console/sync`. Use the Google button in SEO Center to sync. Search Console data may lag.
- Yandex: reuse `yandex_webmaster_daily`, `yandex_sync_runs`, and the existing `YandexSeoPanel` (test, sync, and index coverage). Existing Yandex OAuth configuration is not changed.
- Bing: in **Vercel project `govietstay-main-website`**, configure server-only `BING_WEBMASTER_API_KEY` and `BING_WEBMASTER_SITE_URL` (exact verified site property, for example `https://www.govietstay.com`). Apply to Preview and Production as appropriate, redeploy after changing environment variables. Generate the key in Bing Webmaster Tools → Settings → API Access. Do **not** prefix the key with `NEXT_PUBLIC_`, commit it, send it in browser requests, or put it in an issue.

The role-guarded endpoint `/api/admin/bing/overview` calls Bing REST JSON APIs server-side. It returns 503 with `not_configured` when the secret is absent, and reports provider errors without revealing the key. It queries `GetRankAndTrafficStats`, `GetQueryStats`, and `GetPageStats`; keyword/page failures don't hide traffic stats. The Bing page/query APIs may be updated weekly; source totals can include additional Bing search surfaces beyond web.

## Data integrity

- One common panel and tabs for provider detail. Google/Yandex existing stored data is reused; Bing is fetched on demand and is not yet persisted.
- Combined clicks and impressions use **only successfully loaded providers** and are labeled with the count of included sources. Never treat a disconnected provider as zero or combine average positions or indexed URL counts across search engines.
- Google and Yandex have their own historical sync dates; Bing shows its API fetch time. These are not a perfectly synchronized three-engine data set.
- The landing-page table lists Google and Bing as distinct source rows. Yandex index coverage remains available through its detailed panel rather than claiming that search traffic implies indexing.
- Locale filter checks the language segment of a URL, not the visitor's nationality.

## Release validation

1. Preview build passes. Visit `/admin/seo-center` signed out and as non-admin: no metrics visible; Bing API responds 403 without a valid active Owner/Admin token.
2. Owner/Admin can access the dashboard; Google and Yandex continue to work if Bing is not configured, with an explicit Bing configuration message.
3. With Bing secrets set, verify URL property matches Bing's verified site and observe real timestamps/metrics. Use failed-key test to ensure no token leaks in UI/logs.
4. Verify `Google → Đồng bộ` still uses existing protected endpoint; Yandex test/sync/index coverage remain unchanged.
5. Check mobile layout and old `/admin` booking/finance/partners regression before production merge.

No production deployment, credential provisioning or successful preview test is implied by merging this code alone.
