"use client";

import { useEffect, useMemo, useState } from "react";

function n(v: any) { return Number(v || 0); }
function fmt(v: any) { return new Intl.NumberFormat("vi-VN").format(Number(v || 0)); }
function pct(v: number) { return `${v.toFixed(2)}%`; }
function isoDate(d: Date) { return d.toISOString().slice(0, 10); }
function isCyrillic(value: any) { return /[\u0400-\u04FF]/.test(String(value || "")); }
function pathOnly(value: any) {
  try {
    const u = new URL(String(value || ""));
    return (u.pathname || "/") + (u.search || "");
  } catch {
    return String(value || "—").replace(/^https?:\/\/[^/]+/, "") || "/";
  }
}

export default function YandexSeoPanel({ supabase, days }: any) {
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [run, setRun] = useState<any>(null);
  const [daily, setDaily] = useState<any[]>([]);
  const [queries, setQueries] = useState<any[]>([]);
  const [landings, setLandings] = useState<any[]>([]);
  const [metrica, setMetrica] = useState<any>(null);

  const range = useMemo(() => {
    const useDays = Math.max(7, Number(days || 28));
    const end = new Date(Date.now() - 86400000);
    const start = new Date(end.getTime() - (useDays - 1) * 86400000);
    return { startDate: isoDate(start), endDate: isoDate(end) };
  }, [days]);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [runRes, dailyRes, queryRes, landingRes, metricaRes] = await Promise.all([
        supabase.from("yandex_sync_runs")
          .select("id,started_at,completed_at,date_from,date_to,webmaster_rows,query_rows,metrica_rows,status,error_message")
          .eq("date_from", range.startDate).eq("date_to", range.endDate)
          .order("started_at", { ascending: false }).limit(1).maybeSingle(),
        supabase.from("yandex_webmaster_daily")
          .select("date,impressions,clicks,avg_show_position,avg_click_position")
          .gte("date", range.startDate).lte("date", range.endDate)
          .eq("device", "ALL").order("date", { ascending: false }),
        supabase.from("yandex_query_snapshots")
          .select("date_from,date_to,query_text,impressions,clicks,avg_show_position,avg_click_position")
          .order("date_to", { ascending: false }).order("impressions", { ascending: false }).limit(500),
        supabase.from("yandex_metrica_landing_snapshots")
          .select("landing_page,visits,users,pageviews")
          .eq("date_from", range.startDate).eq("date_to", range.endDate)
          .order("visits", { ascending: false }).limit(100),
        supabase.from("yandex_metrica_snapshots")
          .select("visits,users,pageviews,synced_at")
          .eq("date_from", range.startDate).eq("date_to", range.endDate).maybeSingle(),
      ]);
      for (const r of [runRes, dailyRes, queryRes, landingRes, metricaRes]) if (r.error) throw r.error;
      setRun(runRes.data || null);
      setDaily(dailyRes.data || []);
      const qRows = queryRes.data || [];
      const exact = qRows.filter((q: any) => q.date_from === range.startDate && q.date_to === range.endDate);
      setQueries(exact.length ? exact : qRows.filter((q: any) => q.date_to === qRows?.[0]?.date_to).slice(0, 500));
      setLandings(landingRes.data || []);
      setMetrica(metricaRes.data || null);
    } catch (e: any) {
      setError(e?.message || "Không tải được dữ liệu Yandex từ Supabase.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [range.startDate, range.endDate]);

  async function callYandex(mode: "test" | "sync") {
    mode === "test" ? setTesting(true) : setSyncing(true);
    setError("");
    setMessage("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Phiên Admin đã hết hạn. Hãy đăng nhập lại.");
      const res = await fetch("/api/admin/yandex/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ mode, days: Math.max(7, Number(days || 28)) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `Yandex API lỗi ${res.status}`);
      if (mode === "test") {
        setMessage(`Kết nối OK · Webmaster: ${data?.webmaster?.host_url || "govietstay.com"} · Metrica #${data?.metrica?.counter_id || "112457261"} · ${fmt(data?.metrica?.users || 0)} users / ${fmt(data?.metrica?.visits || 0)} visits`);
      } else {
        setMessage(`Đã đồng bộ Yandex ${data.date_from} → ${data.date_to}: ${data.webmaster_rows || 0} ngày, ${data.query_rows || 0} queries, ${data.metrica_rows || 0} Metrica rows.`);
        await load();
      }
    } catch (e: any) {
      setError(e?.message || "Không kết nối được Yandex.");
    } finally {
      setTesting(false);
      setSyncing(false);
    }
  }

  const overview = useMemo(() => {
    const impressions = daily.reduce((s, r) => s + n(r.impressions), 0);
    const clicks = daily.reduce((s, r) => s + n(r.clicks), 0);
    const weighted = daily.reduce((s, r) => s + n(r.avg_show_position) * Math.max(1, n(r.impressions)), 0);
    const denom = daily.reduce((s, r) => s + Math.max(1, n(r.impressions)), 0);
    return { impressions, clicks, ctr: impressions ? clicks * 100 / impressions : 0, position: denom ? weighted / denom : 0 };
  }, [daily]);

  const russianQueries = useMemo(() => queries.filter((q: any) => isCyrillic(q.query_text)), [queries]);

  function QueryTable({ rows, empty }: any) {
    return <div className="gva-table-wrap"><table className="gva-table">
      <thead><tr><th>Query</th><th>Imp.</th><th>Clicks</th><th>CTR</th><th>Pos.</th></tr></thead>
      <tbody>
        {rows.slice(0, 40).map((r: any, i: number) => {
          const ctr = n(r.impressions) ? n(r.clicks) * 100 / n(r.impressions) : 0;
          return <tr key={`${r.query_text}|${i}`}><td><b>{r.query_text}</b></td><td>{fmt(r.impressions)}</td><td>{fmt(r.clicks)}</td><td>{pct(ctr)}</td><td>{n(r.avg_show_position) ? n(r.avg_show_position).toFixed(1) : "—"}</td></tr>;
        })}
        {!rows.length && <tr><td colSpan={5}><div className="gva-empty">{empty}</div></td></tr>}
      </tbody>
    </table></div>;
  }

  return <>
    <div className="gva-section-head">
      <div>
        <h2>Yandex Webmaster + Metrica → Supabase</h2>
        <div className="gva-mini">
          {run?.completed_at ? <>Lần đồng bộ: <b>{new Date(run.completed_at).toLocaleString("vi-VN")}</b> · {run.status}</> : <>Chưa có snapshot đúng kỳ {range.startDate} → {range.endDate}.</>}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="gva-btn secondary" onClick={() => callYandex("test")} disabled={testing || syncing}>{testing ? "Đang test…" : "Test Yandex API"}</button>
        <button className="gva-btn" onClick={() => callYandex("sync")} disabled={syncing || testing}>{syncing ? "Đang đồng bộ…" : "Đồng bộ Yandex"}</button>
      </div>
    </div>

    {error && <div className="gva-msg err">{error}</div>}
    {message && <div className="gva-msg">{message}</div>}

    <div className="gva-analytics-note">
      Webmaster: impressions, clicks, CTR, position và queries. Metrica: users, visits, pageviews và landing pages từ Yandex organic, đã lọc robot. Dữ liệu được lưu snapshot trong Supabase; token chỉ nằm ở Vercel Secret.
    </div>

    <div className="gva-kpis">
      <K label="Yandex Clicks" value={fmt(overview.clicks)} hint="Webmaster" />
      <K label="Impressions" value={fmt(overview.impressions)} hint="Yandex Search" />
      <K label="CTR" value={pct(overview.ctr)} hint="Clicks / Impressions" />
      <K label="Avg Position" value={overview.position ? overview.position.toFixed(1) : "—"} hint="Webmaster" />
      <K label="Yandex Users" value={fmt(metrica?.users || 0)} hint="Metrica organic" />
      <K label="Visits" value={fmt(metrica?.visits || 0)} hint="Metrica organic" />
      <K label="Pageviews" value={fmt(metrica?.pageviews || 0)} hint="Metrica organic" />
      <K label="RU Queries" value={fmt(russianQueries.length)} hint="Cyrillic queries" />
    </div>

    <div className="gva-grid2 gva-seo-grid">
      <div className="gva-card"><div className="gva-section-head"><h3>Top Russian / Cyrillic Queries</h3><div className="gva-mini">{russianQueries.length} query</div></div><QueryTable rows={russianQueries} empty="Chưa có Russian query trong snapshot." /></div>
      <div className="gva-card"><div className="gva-section-head"><h3>Top Yandex Queries</h3><div className="gva-mini">Top theo impressions</div></div><QueryTable rows={queries} empty="Bấm Đồng bộ Yandex để lấy queries." /></div>
    </div>

    <div className="gva-card" style={{ marginTop: 15 }}>
      <div className="gva-section-head"><h3>Landing pages từ Yandex Search</h3><div className="gva-mini">Metrica · organic · non-robot</div></div>
      <div className="gva-table-wrap"><table className="gva-table">
        <thead><tr><th>Landing page</th><th>Visits</th><th>Users</th><th>Pageviews</th></tr></thead>
        <tbody>
          {landings.slice(0, 60).map((r: any, i: number) => <tr key={`${r.landing_page}|${i}`}><td title={r.landing_page}><b>{pathOnly(r.landing_page)}</b></td><td>{fmt(r.visits)}</td><td>{fmt(r.users)}</td><td>{fmt(r.pageviews)}</td></tr>)}
          {!landings.length && <tr><td colSpan={4}><div className="gva-empty">{loading ? "Đang tải…" : "Chưa có landing page Yandex trong kỳ."}</div></td></tr>}
        </tbody>
      </table></div>
    </div>

    <div className="gva-card" style={{ marginTop: 15 }}>
      <div className="gva-section-head"><h3>Daily Yandex Search</h3><div className="gva-mini">{range.startDate} → {range.endDate}</div></div>
      <div className="gva-table-wrap"><table className="gva-table">
        <thead><tr><th>Date</th><th>Impressions</th><th>Clicks</th><th>CTR</th><th>Position</th></tr></thead>
        <tbody>
          {daily.slice(0, 180).map((r: any) => { const ctr = n(r.impressions) ? n(r.clicks) * 100 / n(r.impressions) : 0; return <tr key={r.date}><td><b>{r.date}</b></td><td>{fmt(r.impressions)}</td><td>{fmt(r.clicks)}</td><td>{pct(ctr)}</td><td>{n(r.avg_show_position) ? n(r.avg_show_position).toFixed(1) : "—"}</td></tr>; })}
          {!daily.length && <tr><td colSpan={5}><div className="gva-empty">{loading ? "Đang tải…" : "Chưa có dữ liệu Webmaster trong kỳ."}</div></td></tr>}
        </tbody>
      </table></div>
    </div>
  </>;
}

function K({ label, value, hint }: any) {
  return <div className="gva-card gva-kpi"><div className="label">{label}</div><div className="value">{value}</div><div className="hint">{hint}</div></div>;
}
