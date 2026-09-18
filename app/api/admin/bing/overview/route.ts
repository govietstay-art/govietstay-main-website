import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vscffgnxaexestnayvae.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV";

function response(data: object, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "private, no-store" } });
}

async function authorized(request: NextRequest): Promise<boolean> {
  const token = /^Bearer (.+)$/i.exec(request.headers.get("authorization") || "")?.[1];
  if (!token) return false;
  const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` }, cache: "no-store",
  });
  if (!userRes.ok) return false;
  const user = await userRes.json();
  if (!user?.id) return false;
  const staffRes = await fetch(
    `${SUPABASE_URL}/rest/v1/staff_profiles?select=role,active&auth_user_id=eq.${encodeURIComponent(user.id)}&active=eq.true&limit=1`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` }, cache: "no-store" },
  );
  if (!staffRes.ok) return false;
  const staff = await staffRes.json();
  return staff?.[0]?.active === true && ["owner", "admin"].includes(staff[0].role);
}

function dateValue(value: unknown): string {
  const raw = String(value || "");
  const bingTime = /\/Date\((-?\d+)/.exec(raw);
  const date = bingTime ? new Date(Number(bingTime[1])) : new Date(raw);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function number(value: unknown): number {
  const n = Number(value || 0);
  return Number.isFinite(n) ? n : 0;
}

function aggregate(rows: any[], field: "Query" | "Page") {
  const results = new Map<string, { label: string; clicks: number; impressions: number; weight: number }>();
  for (const row of rows) {
    const label = String(row?.[field] || row?.Url || "").trim();
    if (!label) continue;
    const existing = results.get(label) || { label, clicks: 0, impressions: 0, weight: 0 };
    const imp = number(row.Impressions);
    existing.clicks += number(row.Clicks);
    existing.impressions += imp;
    existing.weight += number(row.AvgImpressionPosition) * imp;
    results.set(label, existing);
  }
  return [...results.values()].map(({ label, clicks, impressions, weight }) => ({
    label, clicks, impressions, ctr: impressions ? 100 * clicks / impressions : 0,
    position: impressions ? weight / impressions : null,
  })).sort((a, b) => b.impressions - a.impressions).slice(0, 100);
}

async function bingGet(method: string, siteUrl: string, apiKey: string): Promise<any[]> {
  const url = new URL(`https://ssl.bing.com/webmaster/api.svc/json/${method}`);
  url.searchParams.set("siteUrl", siteUrl);
  url.searchParams.set("apikey", apiKey);
  const result = await fetch(url.toString(), {
    headers: { Accept: "application/json" }, cache: "no-store", signal: AbortSignal.timeout(15000),
  });
  if (!result.ok) throw new Error(`Bing ${method} HTTP ${result.status}`);
  const json = await result.json();
  const rows = json?.d;
  if (!Array.isArray(rows)) throw new Error(`Bing ${method} trả về dữ liệu không hợp lệ`);
  return rows;
}

export async function GET(request: NextRequest) {
  try {
    if (!(await authorized(request))) return response({ error: "Không có quyền xem dữ liệu SEO." }, 403);
    const apiKey = process.env.BING_WEBMASTER_API_KEY;
    if (!apiKey) return response({ status: "not_configured", message: "Cần cấu hình BING_WEBMASTER_API_KEY trong Vercel Environment Variables." }, 503);
    const siteUrl = process.env.BING_WEBMASTER_SITE_URL || "https://www.govietstay.com";
    const days = Math.min(90, Math.max(1, Number(request.nextUrl.searchParams.get("days") || 28)));
    const end = new Date(); end.setUTCDate(end.getUTCDate() - 1);
    const start = new Date(end); start.setUTCDate(start.getUTCDate() - days + 1);
    const from = start.toISOString().slice(0, 10);
    const to = end.toISOString().slice(0, 10);

    const [trafficResult, queriesResult, pagesResult] = await Promise.allSettled([
      bingGet("GetRankAndTrafficStats", siteUrl, apiKey),
      bingGet("GetQueryStats", siteUrl, apiKey),
      bingGet("GetPageStats", siteUrl, apiKey),
    ]);
    if (trafficResult.status === "rejected") throw trafficResult.reason;
    const daily = trafficResult.value.filter(row => {
      const day = dateValue(row.Date);
      return day >= from && day <= to;
    });
    const clicks = daily.reduce((sum, row) => sum + number(row.Clicks), 0);
    const impressions = daily.reduce((sum, row) => sum + number(row.Impressions), 0);
    const filterPeriod = (result: PromiseSettledResult<any[]>) => result.status === "fulfilled"
      ? result.value.filter(row => { const day = dateValue(row.Date); return day >= from && day <= to; }) : [];
    return response({
      status: "connected", source: "Bing Webmaster Tools", siteUrl,
      from, to, fetchedAt: new Date().toISOString(), clicks, impressions,
      ctr: impressions ? 100 * clicks / impressions : 0,
      queries: aggregate(filterPeriod(queriesResult), "Query"),
      pages: aggregate(filterPeriod(pagesResult), "Page"),
      warnings: [
        queriesResult.status === "rejected" ? "Không tải được từ khóa Bing." : "",
        pagesResult.status === "rejected" ? "Không tải được landing pages Bing." : "",
      ].filter(Boolean),
    });
  } catch (error) {
    // Never return upstream request URLs or secrets (Bing API key is in its query string).
    console.error("Bing SEO overview failed", error instanceof Error ? error.name : "unknown");
    return response({ status: "error", error: "Không lấy được dữ liệu Bing. Kiểm tra API Key, site URL và quyền Webmaster." }, 502);
  }
}
