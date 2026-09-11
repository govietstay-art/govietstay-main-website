import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vscffgnxaexestnayvae.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV";
const YANDEX_COUNTER_ID = process.env.YANDEX_METRIKA_COUNTER_ID || "112457261";
const YANDEX_HOSTNAME = (process.env.YANDEX_WEBMASTER_HOST || "govietstay.com").replace(/^www\./i, "").toLowerCase();

function isoDate(d: Date) { return d.toISOString().slice(0, 10); }

async function verifyAdmin(token: string) {
  const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!userRes.ok) return { ok: false, userId: null as string | null };
  const user = await userRes.json();
  const staffRes = await fetch(
    `${SUPABASE_URL}/rest/v1/staff_profiles?select=role,active&auth_user_id=eq.${encodeURIComponent(user.id)}&active=eq.true&limit=1`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` }, cache: "no-store" }
  );
  if (!staffRes.ok) return { ok: false, userId: user.id as string };
  const staff = await staffRes.json();
  const role = staff?.[0]?.role;
  return { ok: role === "owner" || role === "admin", userId: user.id as string };
}

async function getJson(url: string, yandexToken: string) {
  const res = await fetch(url, {
    headers: { Authorization: `OAuth ${yandexToken}`, Accept: "application/json" },
    cache: "no-store",
  });
  const text = await res.text();
  let data: any = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!res.ok) {
    const msg = data?.error_message || data?.message || data?.error?.message || `${res.status} ${res.statusText}`;
    throw new Error(`Yandex API: ${msg}`);
  }
  return data;
}

async function getWebmasterIdentity(yandexToken: string) {
  const user = await getJson("https://api.webmaster.yandex.net/v4/user", yandexToken);
  const userId = String(user?.user_id ?? "");
  if (!userId) throw new Error("Yandex Webmaster không trả về user_id.");

  const data = await getJson(
    `https://api.webmaster.yandex.net/v4/user/${encodeURIComponent(userId)}/hosts`,
    yandexToken
  );
  const hosts = Array.isArray(data?.hosts) ? data.hosts : [];
  const host = hosts.find((h: any) => {
    try {
      const hostname = new URL(String(h?.ascii_host_url || h?.unicode_host_url || "")).hostname
        .replace(/^www\./i, "").toLowerCase();
      return hostname === YANDEX_HOSTNAME;
    } catch { return false; }
  });
  if (!host?.host_id) throw new Error(`Không tìm thấy ${YANDEX_HOSTNAME} trong Yandex Webmaster của token này.`);
  if (host.verified === false) throw new Error(`${YANDEX_HOSTNAME} có trong Webmaster nhưng chưa verified.`);
  return {
    userId,
    hostId: String(host.host_id),
    hostUrl: String(host.ascii_host_url || host.unicode_host_url || YANDEX_HOSTNAME),
  };
}

function wmParams(startDate: string, endDate: string) {
  const p = new URLSearchParams();
  for (const indicator of ["TOTAL_SHOWS", "TOTAL_CLICKS", "AVG_SHOW_POSITION", "AVG_CLICK_POSITION"]) {
    p.append("query_indicator", indicator);
  }
  p.set("device_type_indicator", "ALL");
  p.set("date_from", startDate);
  p.set("date_to", endDate);
  return p;
}

async function getWebmasterDaily(yandexToken: string, userId: string, hostId: string, startDate: string, endDate: string) {
  const p = wmParams(startDate, endDate);
  const data = await getJson(
    `https://api.webmaster.yandex.net/v4/user/${encodeURIComponent(userId)}/hosts/${encodeURIComponent(hostId)}/search-queries/all/history?${p.toString()}`,
    yandexToken
  );
  const indicators = data?.indicators || {};
  const byDate = new Map<string, any>();
  for (const key of ["TOTAL_SHOWS", "TOTAL_CLICKS", "AVG_SHOW_POSITION", "AVG_CLICK_POSITION"]) {
    const rows = Array.isArray(indicators?.[key]) ? indicators[key] : [];
    for (const item of rows) {
      const date = String(item?.date || "").slice(0, 10);
      if (!date) continue;
      if (!byDate.has(date)) byDate.set(date, { date, device: "ALL" });
      byDate.get(date)[key] = Number(item?.value || 0);
    }
  }
  const syncedAt = new Date().toISOString();
  return [...byDate.values()].map((r: any) => ({
    date: r.date,
    device: "ALL",
    impressions: Math.max(0, Math.round(Number(r.TOTAL_SHOWS || 0))),
    clicks: Math.max(0, Math.round(Number(r.TOTAL_CLICKS || 0))),
    avg_show_position: Math.max(0, Number(r.AVG_SHOW_POSITION || 0)),
    avg_click_position: Math.max(0, Number(r.AVG_CLICK_POSITION || 0)),
    synced_at: syncedAt,
  }));
}

async function getWebmasterQueries(yandexToken: string, userId: string, hostId: string, startDate: string, endDate: string) {
  const p = wmParams(startDate, endDate);
  p.set("order_by", "TOTAL_SHOWS");
  p.set("offset", "0");
  p.set("limit", "500");
  const data = await getJson(
    `https://api.webmaster.yandex.net/v4/user/${encodeURIComponent(userId)}/hosts/${encodeURIComponent(hostId)}/search-queries/popular?${p.toString()}`,
    yandexToken
  );
  const queries = Array.isArray(data?.queries) ? data.queries : [];
  const actualFrom = String(data?.date_from || startDate).slice(0, 10);
  const actualTo = String(data?.date_to || endDate).slice(0, 10);
  const syncedAt = new Date().toISOString();
  return queries.map((q: any) => {
    const i = q?.indicators || {};
    return {
      date_from: actualFrom,
      date_to: actualTo,
      query_id: String(q?.query_id || ""),
      query_text: String(q?.query_text || ""),
      impressions: Math.max(0, Math.round(Number(i?.TOTAL_SHOWS || 0))),
      clicks: Math.max(0, Math.round(Number(i?.TOTAL_CLICKS || 0))),
      avg_show_position: Math.max(0, Number(i?.AVG_SHOW_POSITION || 0)),
      avg_click_position: Math.max(0, Number(i?.AVG_CLICK_POSITION || 0)),
      synced_at: syncedAt,
    };
  }).filter((q: any) => q.query_id && q.query_text);
}

function metricaParams(startDate: string, endDate: string, dimensions?: string) {
  const p = new URLSearchParams();
  p.set("id", YANDEX_COUNTER_ID);
  p.set("date1", startDate);
  p.set("date2", endDate);
  p.set("metrics", "ym:s:visits,ym:s:users,ym:s:pageviews");
  if (dimensions) p.set("dimensions", dimensions);
  p.set("filters", "ym:s:trafficSource=='organic' AND ym:s:searchEngine=='yandex' AND ym:s:isRobot=='No'");
  p.set("accuracy", "full");
  p.set("lang", "en");
  p.set("limit", dimensions ? "10000" : "100");
  return p;
}

function metricsFromMetrica(data: any) {
  const totals = Array.isArray(data?.totals)
    ? data.totals
    : (Array.isArray(data?.data?.[0]?.metrics) ? data.data[0].metrics : []);
  return {
    visits: Math.max(0, Math.round(Number(totals?.[0] || 0))),
    users: Math.max(0, Math.round(Number(totals?.[1] || 0))),
    pageviews: Math.max(0, Math.round(Number(totals?.[2] || 0))),
  };
}

async function getMetricaTotals(yandexToken: string, startDate: string, endDate: string) {
  const p = metricaParams(startDate, endDate);
  const data = await getJson(`https://api-metrika.yandex.net/stat/v1/data?${p.toString()}`, yandexToken);
  const m = metricsFromMetrica(data);
  return { date_from: startDate, date_to: endDate, ...m, synced_at: new Date().toISOString() };
}

async function getMetricaLandings(yandexToken: string, startDate: string, endDate: string) {
  const p = metricaParams(startDate, endDate, "ym:s:startURL");
  p.set("sort", "-ym:s:visits");
  const data = await getJson(`https://api-metrika.yandex.net/stat/v1/data?${p.toString()}`, yandexToken);
  const rows = Array.isArray(data?.data) ? data.data : [];
  const syncedAt = new Date().toISOString();
  return rows.map((r: any) => {
    const d = Array.isArray(r?.dimensions) ? r.dimensions : [];
    const m = Array.isArray(r?.metrics) ? r.metrics : [];
    return {
      date_from: startDate,
      date_to: endDate,
      landing_page: String(d?.[0]?.name || d?.[0]?.id || ""),
      visits: Math.max(0, Math.round(Number(m?.[0] || 0))),
      users: Math.max(0, Math.round(Number(m?.[1] || 0))),
      pageviews: Math.max(0, Math.round(Number(m?.[2] || 0))),
      synced_at: syncedAt,
    };
  }).filter((r: any) => r.landing_page);
}

function sbHeaders(userToken: string, prefer = "return=minimal") {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${userToken}`,
    "Content-Type": "application/json",
    Prefer: prefer,
  };
}

async function sbRequest(url: string, options: RequestInit) {
  const res = await fetch(url, { ...options, cache: "no-store" });
  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const msg = data?.message || data?.hint || data?.details || text || `${res.status}`;
    throw new Error(`Supabase: ${String(msg).slice(0, 500)}`);
  }
  return data;
}

async function insertRun(userToken: string, userId: string, startDate: string, endDate: string) {
  const data = await sbRequest(`${SUPABASE_URL}/rest/v1/yandex_sync_runs`, {
    method: "POST",
    headers: sbHeaders(userToken, "return=representation"),
    body: JSON.stringify({ date_from: startDate, date_to: endDate, status: "running", created_by: userId }),
  });
  return String(data?.[0]?.id || "");
}

async function updateRun(userToken: string, id: string, patch: any) {
  if (!id) return;
  await sbRequest(`${SUPABASE_URL}/rest/v1/yandex_sync_runs?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: sbHeaders(userToken),
    body: JSON.stringify(patch),
  });
}

async function upsert(userToken: string, table: string, conflict: string, records: any[]) {
  let total = 0;
  for (let i = 0; i < records.length; i += 500) {
    const batch = records.slice(i, i + 500);
    if (!batch.length) continue;
    await sbRequest(`${SUPABASE_URL}/rest/v1/${table}?on_conflict=${encodeURIComponent(conflict)}`, {
      method: "POST",
      headers: sbHeaders(userToken, "resolution=merge-duplicates,return=minimal"),
      body: JSON.stringify(batch),
    });
    total += batch.length;
  }
  return total;
}

async function replaceRange(userToken: string, table: string, startDate: string, endDate: string, rows: any[], conflict: string) {
  await sbRequest(
    `${SUPABASE_URL}/rest/v1/${table}?date_from=eq.${encodeURIComponent(startDate)}&date_to=eq.${encodeURIComponent(endDate)}`,
    { method: "DELETE", headers: sbHeaders(userToken) }
  );
  return upsert(userToken, table, conflict, rows);
}

export async function POST(request: NextRequest) {
  const auth = request.headers.get("authorization") || "";
  const userToken = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!userToken) return NextResponse.json({ error: "Thiếu phiên đăng nhập Admin." }, { status: 401 });

  const admin = await verifyAdmin(userToken);
  if (!admin.ok || !admin.userId) {
    return NextResponse.json({ error: "Chỉ Owner/Admin được dùng Yandex sync." }, { status: 403 });
  }

  const yandexToken = String(process.env.YANDEX_OAUTH_TOKEN || "").trim();
  if (!yandexToken) {
    return NextResponse.json({ error: "Thiếu YANDEX_OAUTH_TOKEN trong Vercel Production." }, { status: 500 });
  }

  let runId = "";
  try {
    const body = await request.json().catch(() => ({}));
    const mode = body?.mode === "test" ? "test" : "sync";
    const requestedDays = Math.max(7, Math.min(Number(body?.days || 28), 180));
    const end = new Date(Date.now() - 86400000);
    const start = new Date(end.getTime() - (requestedDays - 1) * 86400000);
    const startDate = isoDate(start);
    const endDate = isoDate(end);

    const identity = await getWebmasterIdentity(yandexToken);
    const metrica = await getMetricaTotals(yandexToken, startDate, endDate);

    if (mode === "test") {
      return NextResponse.json({
        ok: true,
        mode: "test",
        webmaster: { user_id: identity.userId, host_id: identity.hostId, host_url: identity.hostUrl },
        metrica: { counter_id: YANDEX_COUNTER_ID, visits: metrica.visits, users: metrica.users, pageviews: metrica.pageviews },
        date_from: startDate,
        date_to: endDate,
      });
    }

    runId = await insertRun(userToken, admin.userId, startDate, endDate);
    const [daily, queries, landings] = await Promise.all([
      getWebmasterDaily(yandexToken, identity.userId, identity.hostId, startDate, endDate),
      getWebmasterQueries(yandexToken, identity.userId, identity.hostId, startDate, endDate),
      getMetricaLandings(yandexToken, startDate, endDate),
    ]);

    const webmasterRows = await upsert(userToken, "yandex_webmaster_daily", "date,device", daily);
    const actualQueryFrom = queries?.[0]?.date_from || startDate;
    const actualQueryTo = queries?.[0]?.date_to || endDate;
    const queryRows = await replaceRange(userToken, "yandex_query_snapshots", actualQueryFrom, actualQueryTo, queries, "date_from,date_to,query_id");
    await upsert(userToken, "yandex_metrica_snapshots", "date_from,date_to", [metrica]);
    const landingRows = await replaceRange(userToken, "yandex_metrica_landing_snapshots", startDate, endDate, landings, "date_from,date_to,landing_page");

    await updateRun(userToken, runId, {
      completed_at: new Date().toISOString(),
      webmaster_rows: webmasterRows,
      query_rows: queryRows,
      metrica_rows: landingRows + 1,
      status: "success",
      error_message: null,
    });

    return NextResponse.json({
      ok: true,
      mode: "sync",
      date_from: startDate,
      date_to: endDate,
      webmaster_rows: webmasterRows,
      query_rows: queryRows,
      metrica_rows: landingRows + 1,
      host_url: identity.hostUrl,
      counter_id: YANDEX_COUNTER_ID,
    });
  } catch (error: any) {
    const message = String(error?.message || "Không đồng bộ được Yandex.").slice(0, 1000);
    if (runId) {
      try {
        await updateRun(userToken, runId, { completed_at: new Date().toISOString(), status: "failed", error_message: message });
      } catch {}
    }
    console.error("Yandex sync failed", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
