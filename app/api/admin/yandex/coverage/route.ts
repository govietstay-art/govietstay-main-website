import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vscffgnxaexestnayvae.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.govietstay.com").replace(/\/$/, "");
const WANTED_HOST = new URL(SITE_URL).hostname.replace(/^www\./i, "").toLowerCase();

async function verifyAdmin(token: string) {
  const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!userRes.ok) return false;

  const user = await userRes.json();
  const staffRes = await fetch(
    `${SUPABASE_URL}/rest/v1/staff_profiles?select=role,active&auth_user_id=eq.${encodeURIComponent(user.id)}&active=eq.true&limit=1`,
    {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
  if (!staffRes.ok) return false;

  const staff = await staffRes.json();
  const role = staff?.[0]?.role;
  return role === "owner" || role === "admin";
}

async function yandexJson(url: string, token: string, label: string) {
  const res = await fetch(url, {
    headers: { Authorization: `OAuth ${token}`, Accept: "application/json" },
    cache: "no-store",
  });
  const text = await res.text();
  let data: any = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!res.ok) {
    const message = data?.error_message || data?.message || data?.error || `${res.status} ${res.statusText}`;
    throw new Error(`${label}: ${String(message)}`);
  }
  return data;
}

function normalizedHost(value: any) {
  try {
    const raw = String(value || "").trim();
    if (!raw) return "";
    const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
    return new URL(withScheme).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return "";
  }
}

async function getWebmasterIdentity(token: string) {
  const user = await yandexJson("https://api.webmaster.yandex.net/v4/user", token, "Yandex Webmaster /user");
  const userId = String(user?.user_id || "");
  if (!userId) throw new Error("Yandex Webmaster không trả về user_id.");

  const hostsData = await yandexJson(
    `https://api.webmaster.yandex.net/v4/user/${encodeURIComponent(userId)}/hosts`,
    token,
    "Yandex Webmaster /hosts",
  );
  const hosts = (Array.isArray(hostsData?.hosts) ? hostsData.hosts : []).filter(
    (h: any) => normalizedHost(h?.ascii_host_url || h?.unicode_host_url) === WANTED_HOST,
  );
  if (!hosts.length) throw new Error(`Không tìm thấy ${WANTED_HOST} trong Yandex Webmaster.`);

  const detailed: any[] = [];
  for (const host of hosts) {
    if (!host?.host_id) continue;
    try {
      const info = await yandexJson(
        `https://api.webmaster.yandex.net/v4/user/${encodeURIComponent(userId)}/hosts/${encodeURIComponent(String(host.host_id))}`,
        token,
        "Yandex Webmaster host details",
      );
      detailed.push({ ...host, ...info });
    } catch {
      detailed.push(host);
    }
  }

  detailed.sort((a, b) => {
    const score = (h: any) =>
      (String(h?.host_data_status || "").toUpperCase() === "OK" ? 1000 : 0) +
      (h?.verified === false ? 0 : 100) +
      (String(h?.ascii_host_url || h?.unicode_host_url || "").startsWith("https://") ? 10 : 0);
    return score(b) - score(a);
  });

  const host = detailed[0];
  if (!host?.host_id) throw new Error(`Không xác định được host_id cho ${WANTED_HOST}.`);
  if (host?.verified === false) throw new Error(`${WANTED_HOST} chưa được verified trong Yandex Webmaster.`);

  return {
    userId,
    hostId: String(host.host_id),
    hostUrl: String(host.ascii_host_url || host.unicode_host_url || SITE_URL),
    hostDataStatus: String(host.host_data_status || "UNKNOWN").toUpperCase(),
  };
}

function decodeXml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

async function collectSitemap(url: string, seen = new Set<string>(), pages = new Set<string>()) {
  if (seen.has(url) || seen.size > 100) return pages;
  seen.add(url);

  const res = await fetch(url, { cache: "no-store", headers: { Accept: "application/xml,text/xml,*/*" } });
  if (!res.ok) throw new Error(`Sitemap ${url}: HTTP ${res.status}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((m) => decodeXml(m[1]));

  if (/<sitemapindex[\s>]/i.test(xml)) {
    for (const child of locs) await collectSitemap(child, seen, pages);
    return pages;
  }

  for (const loc of locs) {
    try {
      const parsed = new URL(loc);
      if (parsed.hostname.replace(/^www\./i, "").toLowerCase() === WANTED_HOST) pages.add(parsed.toString());
    } catch {}
  }
  return pages;
}

async function getDeclaredSitemaps() {
  const sources = new Set<string>([`${SITE_URL}/sitemap.xml`]);
  try {
    const res = await fetch(`${SITE_URL}/robots.txt`, { cache: "no-store" });
    if (res.ok) {
      const text = await res.text();
      for (const match of text.matchAll(/^\s*Sitemap:\s*(\S+)\s*$/gim)) {
        try {
          const url = new URL(match[1]);
          if (url.hostname.replace(/^www\./i, "").toLowerCase() === WANTED_HOST) sources.add(url.toString());
        } catch {}
      }
    }
  } catch {}
  return [...sources];
}

async function collectAllDeclaredSitemaps() {
  const sources = await getDeclaredSitemaps();
  const pages = new Set<string>();
  const seen = new Set<string>();
  const errors: { url: string; error: string }[] = [];

  for (const source of sources) {
    try {
      await collectSitemap(source, seen, pages);
    } catch (error: any) {
      errors.push({ url: source, error: String(error?.message || error).slice(0, 300) });
    }
  }

  if (!pages.size) {
    const detail = errors.map((e) => `${e.url}: ${e.error}`).join(" | ");
    throw new Error(`Không đọc được URL nào từ sitemap.${detail ? ` ${detail}` : ""}`);
  }

  return { sources, pages, errors };
}

function urlKey(value: string) {
  try {
    const u = new URL(value);
    const host = u.hostname.replace(/^www\./i, "").toLowerCase();
    let path = u.pathname || "/";
    if (path.length > 1) path = path.replace(/\/+$/, "");
    return `${host}${path}${u.search}`;
  } catch {
    return String(value || "").trim();
  }
}

async function getAllSamples(token: string, userId: string, hostId: string, kind: "downloaded" | "search") {
  const endpoint = kind === "downloaded" ? "indexing/samples" : "search-urls/in-search/samples";
  const all: any[] = [];
  let reportedCount = 0;

  for (let offset = 0; offset < 50000; offset += 100) {
    const data = await yandexJson(
      `https://api.webmaster.yandex.net/v4/user/${encodeURIComponent(userId)}/hosts/${encodeURIComponent(hostId)}/${endpoint}?offset=${offset}&limit=100`,
      token,
      kind === "downloaded" ? "Yandex downloaded pages" : "Yandex pages in search",
    );
    const rows = Array.isArray(data?.samples) ? data.samples : [];
    reportedCount = Math.max(reportedCount, Number(data?.count || 0));
    all.push(...rows);
    if (!rows.length || rows.length < 100 || all.length >= reportedCount) break;
  }

  return { reportedCount, samples: all.slice(0, 50000) };
}

function languageOf(url: string) {
  try {
    const first = new URL(url).pathname.split("/").filter(Boolean)[0] || "root";
    return first;
  } catch {
    return "unknown";
  }
}

export async function POST(request: NextRequest) {
  const auth = request.headers.get("authorization") || "";
  const userToken = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!userToken) return NextResponse.json({ error: "Thiếu phiên đăng nhập Admin." }, { status: 401 });
  if (!(await verifyAdmin(userToken))) return NextResponse.json({ error: "Chỉ Owner/Admin được kiểm tra Yandex coverage." }, { status: 403 });

  const yandexToken = String(process.env.YANDEX_OAUTH_TOKEN || "").trim();
  if (!yandexToken) return NextResponse.json({ error: "Thiếu YANDEX_OAUTH_TOKEN trong Vercel Production." }, { status: 500 });

  try {
    const identity = await getWebmasterIdentity(yandexToken);
    if (identity.hostDataStatus !== "OK") {
      return NextResponse.json({
        ok: true,
        waiting: true,
        host_url: identity.hostUrl,
        host_data_status: identity.hostDataStatus,
        warning: `Yandex Webmaster đang ở trạng thái ${identity.hostDataStatus}; coverage chưa đáng tin cậy.`,
      });
    }

    const [sitemapData, downloaded, inSearch] = await Promise.all([
      collectAllDeclaredSitemaps(),
      getAllSamples(yandexToken, identity.userId, identity.hostId, "downloaded"),
      getAllSamples(yandexToken, identity.userId, identity.hostId, "search"),
    ]);

    const sitemapUrls = [...sitemapData.pages].sort();
    const downloadedByKey = new Map(downloaded.samples.map((row: any) => [urlKey(String(row?.url || "")), row]));
    const searchByKey = new Map(inSearch.samples.map((row: any) => [urlKey(String(row?.url || "")), row]));

    const rows = sitemapUrls.map((url) => {
      const key = urlKey(url);
      const crawl: any = downloadedByKey.get(key) || null;
      const search: any = searchByKey.get(key) || null;
      const httpCode = Number(crawl?.http_code || 0);
      const healthy = httpCode >= 200 && httpCode < 300;
      return {
        url,
        language: languageOf(url),
        crawled: Boolean(crawl),
        healthy,
        in_search: Boolean(search),
        http_code: httpCode || null,
        crawl_status: crawl?.status || null,
        last_crawled: crawl?.access_date || null,
        search_last_access: search?.last_access || null,
        title: search?.title || null,
      };
    });

    const crawled = rows.filter((r) => r.crawled).length;
    const healthy = rows.filter((r) => r.healthy).length;
    const searchCount = rows.filter((r) => r.in_search).length;
    const missingRows = rows.filter((r) => !r.crawled);
    const crawlErrorRows = rows.filter((r) => r.crawled && !r.healthy);
    const crawledNotSearch = rows.filter((r) => r.crawled && !r.in_search);

    const byLanguage: Record<string, any> = {};
    for (const row of rows) {
      const key = row.language;
      if (!byLanguage[key]) byLanguage[key] = { total: 0, crawled: 0, healthy: 0, in_search: 0, missing: 0 };
      byLanguage[key].total += 1;
      if (row.crawled) byLanguage[key].crawled += 1;
      if (row.healthy) byLanguage[key].healthy += 1;
      if (row.in_search) byLanguage[key].in_search += 1;
      if (!row.crawled) byLanguage[key].missing += 1;
    }

    return NextResponse.json({
      ok: true,
      generated_at: new Date().toISOString(),
      host_url: identity.hostUrl,
      host_data_status: identity.hostDataStatus,
      sitemap_url: `${SITE_URL}/sitemap.xml`,
      sitemap_sources: sitemapData.sources,
      sitemap_source_errors: sitemapData.errors,
      total_sitemap: rows.length,
      crawled,
      healthy,
      in_search: searchCount,
      missing: missingRows.length,
      crawled_not_in_search: crawledNotSearch.length,
      crawl_errors: crawlErrorRows.length,
      yandex_reported_downloaded: downloaded.reportedCount,
      yandex_reported_in_search: inSearch.reportedCount,
      yandex_downloaded_samples: downloaded.samples.length,
      yandex_search_samples: inSearch.samples.length,
      by_language: byLanguage,
      missing_urls: missingRows.slice(0, 1000),
      crawl_error_urls: crawlErrorRows.slice(0, 500),
      crawled_not_in_search_urls: crawledNotSearch.slice(0, 1000),
    });
  } catch (error: any) {
    return NextResponse.json({ error: String(error?.message || "Không kiểm tra được Yandex coverage.").slice(0, 1200) }, { status: 500 });
  }
}
