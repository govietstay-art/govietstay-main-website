import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vscffgnxaexestnayvae.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV";
const YANDEX_HOSTNAME = (process.env.YANDEX_WEBMASTER_HOST || "govietstay.com").replace(/^www\./i, "").toLowerCase();

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

async function verifyAdmin(token: string) {
  const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!userRes.ok) return { ok: false, userId: null as string | null };

  const user = await userRes.json();
  const staffRes = await fetch(
    `${SUPABASE_URL}/rest/v1/staff_profiles?select=role,active&auth_user_id=eq.${encodeURIComponent(user.id)}&active=eq.true&limit=1`,
    {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );
  if (!staffRes.ok) return { ok: false, userId: user.id as string };

  const staff = await staffRes.json();
  const role = staff?.[0]?.role;
  return { ok: role === "owner" || role === "admin", userId: user.id as string };
}

async function getYandexJson(url: string, yandexToken: string, label: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: `OAuth ${yandexToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const text = await res.text();
  let data: any = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const msg =
      data?.error_message ||
      data?.message ||
      data?.error?.message ||
      data?.error ||
      `${res.status} ${res.statusText}`;
    throw new Error(`${label}: ${String(msg)}`);
  }

  return data;
}

async function getWebmasterIdentity(yandexToken: string) {
  const user = await getYandexJson(
    "https://api.webmaster.yandex.net/v4/user",
    yandexToken,
    "Yandex Webmaster /user"
  );

  const userId = String(user?.user_id ?? "");
  if (!userId) throw new Error("Yandex Webmaster không trả về user_id.");

  const data = await getYandexJson(
    `https://api.webmaster.yandex.net/v4/user/${encodeURIComponent(userId)}/hosts`,
    yandexToken,
    "Yandex Webmaster /hosts"
  );

  const hosts = Array.isArray(data?.hosts) ? data.hosts : [];

  const normalizeHost = (value: any) => {
    try {
      const raw = String(value || "").trim();
      if (!raw) return "";
      const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
      return new URL(withScheme).hostname.toLowerCase();
    } catch {
      return "";
    }
  };

  const wanted = String(YANDEX_HOSTNAME || "govietstay.com")
    .replace(/^www\./i, "")
    .toLowerCase();

  const matches = hosts.filter((h: any) => {
    const rawHost = normalizeHost(h?.ascii_host_url || h?.unicode_host_url || "");
    return rawHost.replace(/^www\./i, "") === wanted;
  });

  if (!matches.length) {
    throw new Error(`Không tìm thấy ${wanted} trong Yandex Webmaster của OAuth token này.`);
  }

  const detailed: any[] = [];

  for (const h of matches) {
    if (!h?.host_id) continue;

    let info: any = h;
    try {
      info = await getYandexJson(
        `https://api.webmaster.yandex.net/v4/user/${encodeURIComponent(userId)}/hosts/${encodeURIComponent(String(h.host_id))}`,
        yandexToken,
        "Yandex Webmaster host details"
      );
    } catch {
      info = h;
    }

    const rawHost = normalizeHost(info?.ascii_host_url || info?.unicode_host_url || h?.ascii_host_url || h?.unicode_host_url || "");
    const status = String(info?.host_data_status || "").toUpperCase();

    let score = 0;
    if (status === "OK") score += 1000;
    if (info?.verified !== false) score += 100;
    if (rawHost === wanted) score += 50;
    if (!rawHost.startsWith("www.")) score += 25;
    if (String(info?.ascii_host_url || "").startsWith("https://")) score += 10;

    detailed.push({
      ...h,
      ...info,
      _score: score,
      _rawHost: rawHost,
      _status: status || "UNKNOWN",
    });

    const mirror = info?.main_mirror;
    if (mirror?.host_id && String(mirror.host_id) !== String(info?.host_id)) {
      try {
        const mirrorInfo = await getYandexJson(
          `https://api.webmaster.yandex.net/v4/user/${encodeURIComponent(userId)}/hosts/${encodeURIComponent(String(mirror.host_id))}`,
          yandexToken,
          "Yandex Webmaster main mirror details"
        );

        const mirrorHost = normalizeHost(mirrorInfo?.ascii_host_url || mirrorInfo?.unicode_host_url || mirror?.ascii_host_url || mirror?.unicode_host_url || "");
        const mirrorStatus = String(mirrorInfo?.host_data_status || "").toUpperCase();

        let mirrorScore = 5;
        if (mirrorStatus === "OK") mirrorScore += 1200;
        if (mirrorInfo?.verified !== false) mirrorScore += 100;
        if (mirrorHost.replace(/^www\./i, "") === wanted) mirrorScore += 50;
        if (mirrorHost === wanted) mirrorScore += 50;
        if (!mirrorHost.startsWith("www.")) mirrorScore += 25;
        if (String(mirrorInfo?.ascii_host_url || "").startsWith("https://")) mirrorScore += 10;

        detailed.push({
          ...mirror,
          ...mirrorInfo,
          _score: mirrorScore,
          _rawHost: mirrorHost,
          _status: mirrorStatus || "UNKNOWN",
        });
      } catch {}
    }
  }

  detailed.sort((a, b) => Number(b?._score || 0) - Number(a?._score || 0));
  const host = detailed[0];

  if (!host?.host_id) {
    throw new Error(`Không xác định được host_id tốt nhất cho ${wanted}.`);
  }

  if (host.verified === false) {
    throw new Error(`${wanted} có trong Yandex Webmaster nhưng chưa verified.`);
  }

  return {
    userId,
    hostId: String(host.host_id),
    hostUrl: String(host.ascii_host_url || host.unicode_host_url || wanted),
    hostDataStatus: String(host._status || host.host_data_status || "UNKNOWN"),
    candidateCount: detailed.length,
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

async function getWebmasterDaily(
  yandexToken: string,
  userId: string,
  hostId: string,
  startDate: string,
  endDate: string
) {
  const p = wmParams(startDate, endDate);
  const data = await getYandexJson(
    `https://api.webmaster.yandex.net/v4/user/${encodeURIComponent(userId)}/hosts/${encodeURIComponent(hostId)}/search-queries/all/history?${p.toString()}`,
    yandexToken,
    "Yandex Webmaster search history"
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

async function getWebmasterQueries(
  yandexToken: string,
  userId: string,
  hostId: string,
  startDate: string,
  endDate: string
) {
  const p = wmParams(startDate, endDate);
  p.set("order_by", "TOTAL_SHOWS");
  p.set("offset", "0");
  p.set("limit", "500");

  const data = await getYandexJson(
    `https://api.webmaster.yandex.net/v4/user/${encodeURIComponent(userId)}/hosts/${encodeURIComponent(hostId)}/search-queries/popular?${p.toString()}`,
    yandexToken,
    "Yandex Webmaster popular queries"
  );

  const queries = Array.isArray(data?.queries) ? data.queries : [];
  const actualFrom = String(data?.date_from || startDate).slice(0, 10);
  const actualTo = String(data?.date_to || endDate).slice(0, 10);
  const syncedAt = new Date().toISOString();

  return queries
    .map((q: any) => {
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
    })
    .filter((q: any) => q.query_id && q.query_text);
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
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

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
    body: JSON.stringify({
      date_from: startDate,
      date_to: endDate,
      status: "running",
      created_by: userId,
    }),
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

    await sbRequest(
      `${SUPABASE_URL}/rest/v1/${table}?on_conflict=${encodeURIComponent(conflict)}`,
      {
        method: "POST",
        headers: sbHeaders(userToken, "resolution=merge-duplicates,return=minimal"),
        body: JSON.stringify(batch),
      }
    );
    total += batch.length;
  }
  return total;
}

async function replaceQueryRange(
  userToken: string,
  startDate: string,
  endDate: string,
  rows: any[]
) {
  await sbRequest(
    `${SUPABASE_URL}/rest/v1/yandex_query_snapshots?date_from=eq.${encodeURIComponent(startDate)}&date_to=eq.${encodeURIComponent(endDate)}`,
    { method: "DELETE", headers: sbHeaders(userToken) }
  );

  return upsert(
    userToken,
    "yandex_query_snapshots",
    "date_from,date_to,query_id",
    rows
  );
}

export async function POST(request: NextRequest) {
  const auth = request.headers.get("authorization") || "";
  const userToken = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";

  if (!userToken) {
    return NextResponse.json({ error: "Thiếu phiên đăng nhập Admin." }, { status: 401 });
  }

  const admin = await verifyAdmin(userToken);
  if (!admin.ok || !admin.userId) {
    return NextResponse.json({ error: "Chỉ Owner/Admin được dùng Yandex sync." }, { status: 403 });
  }

  const yandexToken = String(process.env.YANDEX_OAUTH_TOKEN || "").trim();
  if (!yandexToken) {
    return NextResponse.json(
      { error: "Thiếu YANDEX_OAUTH_TOKEN trong Vercel Production." },
      { status: 500 }
    );
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

    if (mode === "test") {
      return NextResponse.json({
        ok: true,
        mode: "test",
        source: "yandex_webmaster",
        webmaster: {
          user_id: identity.userId,
          host_id: identity.hostId,
          host_url: identity.hostUrl,
          host_data_status: identity.hostDataStatus,
          candidate_count: identity.candidateCount,
        },
        date_from: startDate,
        date_to: endDate,
      });
    }

    if (identity.hostDataStatus !== "OK") {
      return NextResponse.json({
        ok: true,
        mode: "sync",
        source: "yandex_webmaster",
        waiting: true,
        warning:
          `Yandex Webmaster đang ở trạng thái ${identity.hostDataStatus}. ` +
          `API đã kết nối đúng host ${identity.hostUrl}, nhưng Yandex chưa cấp dữ liệu Search Queries cho host này.`,
        date_from: startDate,
        date_to: endDate,
        webmaster_rows: 0,
        query_rows: 0,
        metrica_rows: 0,
        host_url: identity.hostUrl,
        host_data_status: identity.hostDataStatus,
      });
    }

    runId = await insertRun(userToken, admin.userId, startDate, endDate);

    const [daily, queries] = await Promise.all([
      getWebmasterDaily(yandexToken, identity.userId, identity.hostId, startDate, endDate),
      getWebmasterQueries(yandexToken, identity.userId, identity.hostId, startDate, endDate),
    ]);

    const webmasterRows = await upsert(
      userToken,
      "yandex_webmaster_daily",
      "date,device",
      daily
    );

    const actualQueryFrom = queries?.[0]?.date_from || startDate;
    const actualQueryTo = queries?.[0]?.date_to || endDate;
    const queryRows = await replaceQueryRange(
      userToken,
      actualQueryFrom,
      actualQueryTo,
      queries
    );

    await updateRun(userToken, runId, {
      completed_at: new Date().toISOString(),
      webmaster_rows: webmasterRows,
      query_rows: queryRows,
      metrica_rows: 0,
      status: "success",
      error_message: null,
    });

    return NextResponse.json({
      ok: true,
      mode: "sync",
      source: "yandex_webmaster",
      date_from: startDate,
      date_to: endDate,
      webmaster_rows: webmasterRows,
      query_rows: queryRows,
      metrica_rows: 0,
      host_url: identity.hostUrl,
    });
  } catch (error: any) {
    const message = String(error?.message || "Không đồng bộ được Yandex Webmaster.").slice(0, 1000);

    if (runId) {
      try {
        await updateRun(userToken, runId, {
          completed_at: new Date().toISOString(),
          status: "failed",
          error_message: message,
        });
      } catch {}
    }

    console.error("Yandex Webmaster sync failed", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
