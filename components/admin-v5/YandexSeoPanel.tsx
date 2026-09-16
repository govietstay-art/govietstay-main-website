"use client";

import { useEffect, useMemo, useState } from "react";

function n(v: any) { return Number(v || 0); }
function fmt(v: any) { return new Intl.NumberFormat("vi-VN").format(Number(v || 0)); }
function pct(v: number) { return `${v.toFixed(2)}%`; }
function isoDate(d: Date) { return d.toISOString().slice(0, 10); }
function isCyrillic(value: any) { return /[\u0400-\u04FF]/.test(String(value || "")); }
function shortUrl(value: any) {
  try {
    const u = new URL(String(value || ""));
    return `${u.pathname}${u.search}` || "/";
  } catch {
    return String(value || "");
  }
}

type TabKey = "overview" | "russia" | "queries" | "daily" | "pages";

export default function YandexSeoPanel({ supabase, days }: any) {
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [testing, setTesting] = useState(false);
  const [coverageLoading, setCoverageLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [run, setRun] = useState<any>(null);
  const [daily, setDaily] = useState<any[]>([]);
  const [queries, setQueries] = useState<any[]>([]);
  const [coverage, setCoverage] = useState<any>(null);
  const [tab, setTab] = useState<TabKey>("overview");
  const [qFilter, setQFilter] = useState("");

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
      const [runRes, dailyRes, queryRes] = await Promise.all([
        supabase.from("yandex_sync_runs")
          .select("id,started_at,completed_at,date_from,date_to,webmaster_rows,query_rows,status,error_message")
          .eq("date_from", range.startDate).eq("date_to", range.endDate)
          .order("started_at", { ascending: false }).limit(1).maybeSingle(),
        supabase.from("yandex_webmaster_daily")
          .select("date,impressions,clicks,avg_show_position,avg_click_position")
          .gte("date", range.startDate).lte("date", range.endDate)
          .eq("device", "ALL").order("date", { ascending: false }),
        supabase.from("yandex_query_snapshots")
          .select("date_from,date_to,query_text,impressions,clicks,avg_show_position,avg_click_position")
          .order("date_to", { ascending: false }).order("impressions", { ascending: false }).limit(500),
      ]);

      for (const r of [runRes, dailyRes, queryRes]) if (r.error) throw r.error;

      setRun(runRes.data || null);
      setDaily(dailyRes.data || []);

      const qRows = queryRes.data || [];
      const exact = qRows.filter((q: any) => q.date_from === range.startDate && q.date_to === range.endDate);
      setQueries(exact.length ? exact : qRows.filter((q: any) => q.date_to === qRows?.[0]?.date_to).slice(0, 500));
    } catch (e: any) {
      setError(e?.message || "Không tải được dữ liệu Yandex Webmaster từ Supabase.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [range.startDate, range.endDate]);

  async function adminToken() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) throw new Error("Phiên Admin đã hết hạn. Hãy đăng nhập lại.");
    return session.access_token;
  }

  async function callYandex(mode: "test" | "sync") {
    mode === "test" ? setTesting(true) : setSyncing(true);
    setError("");
    setMessage("");

    try {
      const token = await adminToken();
      const res = await fetch("/api/admin/yandex/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ mode, days: Math.max(7, Number(days || 28)) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `Yandex API lỗi ${res.status}`);

      if (mode === "test") {
        setMessage(
          `Kết nối Webmaster OK · ${data?.webmaster?.host_url || "govietstay.com"}` +
          `${data?.webmaster?.host_data_status ? ` · ${data.webmaster.host_data_status}` : ""}`,
        );
      } else {
        if (data?.waiting) {
          setMessage(data?.warning || "Yandex Webmaster đã kết nối nhưng dữ liệu Search Queries chưa sẵn sàng.");
        } else {
          setMessage(
            `Đã đồng bộ Yandex ${data.date_from} → ${data.date_to}: ` +
            `${data.webmaster_rows || 0} ngày, ${data.query_rows || 0} queries.`,
          );
        }
        await load();
      }
    } catch (e: any) {
      setError(e?.message || "Không kết nối được Yandex Webmaster.");
    } finally {
      setTesting(false);
      setSyncing(false);
    }
  }

  async function loadCoverage() {
    setCoverageLoading(true);
    setError("");
    setMessage("");
    try {
      const token = await adminToken();
      const res = await fetch("/api/admin/yandex/coverage", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({}),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `Yandex coverage lỗi ${res.status}`);
      setCoverage(data);
      setTab("pages");
      if (data?.waiting) {
        setMessage(data?.warning || "Yandex coverage chưa sẵn sàng.");
      } else {
        setMessage(
          `Coverage mới nhất: ${fmt(data?.crawled)} / ${fmt(data?.total_sitemap)} URL đã crawl · ` +
          `${fmt(data?.in_search)} đang trong search · ${fmt(data?.missing)} URL chưa thấy Yandex crawl.`,
        );
      }
    } catch (e: any) {
      setError(e?.message || "Không kiểm tra được Yandex Index Coverage.");
    } finally {
      setCoverageLoading(false);
    }
  }

  const overview = useMemo(() => {
    const impressions = daily.reduce((s, r) => s + n(r.impressions), 0);
    const clicks = daily.reduce((s, r) => s + n(r.clicks), 0);
    const weighted = daily.reduce((s, r) => s + n(r.avg_show_position) * Math.max(1, n(r.impressions)), 0);
    const denom = daily.reduce((s, r) => s + Math.max(1, n(r.impressions)), 0);
    return {
      impressions,
      clicks,
      ctr: impressions ? clicks * 100 / impressions : 0,
      position: denom ? weighted / denom : 0,
    };
  }, [daily]);

  const russianQueries = useMemo(() => queries.filter((q: any) => isCyrillic(q.query_text)), [queries]);

  const ruStats = useMemo(() => {
    const impressions = russianQueries.reduce((s, r) => s + n(r.impressions), 0);
    const clicks = russianQueries.reduce((s, r) => s + n(r.clicks), 0);
    return {
      impressions,
      clicks,
      ctr: impressions ? clicks * 100 / impressions : 0,
      share: overview.impressions ? impressions * 100 / overview.impressions : 0,
    };
  }, [russianQueries, overview.impressions]);

  const opportunities = useMemo(() => {
    const quickWins = [...russianQueries]
      .filter((r: any) => n(r.impressions) > 0 && n(r.avg_show_position) >= 4 && n(r.avg_show_position) <= 20)
      .sort((a: any, b: any) => n(b.impressions) - n(a.impressions)).slice(0, 10);
    const ctrWins = [...russianQueries]
      .filter((r: any) => n(r.impressions) >= 5 && n(r.avg_show_position) > 0 && n(r.avg_show_position) <= 10)
      .filter((r: any) => (n(r.clicks) * 100 / Math.max(1, n(r.impressions))) < 3)
      .sort((a: any, b: any) => n(b.impressions) - n(a.impressions)).slice(0, 10);
    return { quickWins, ctrWins };
  }, [russianQueries]);

  const filteredQueries = useMemo(() => {
    const term = qFilter.trim().toLowerCase();
    if (!term) return queries;
    return queries.filter((r: any) => String(r.query_text || "").toLowerCase().includes(term));
  }, [queries, qFilter]);

  const statusLabel = useMemo(() => {
    if (error) return { text: "Lỗi kết nối", tone: "#b42318", bg: "#fef3f2" };
    if (overview.impressions || queries.length) return { text: "Đang có dữ liệu", tone: "#067647", bg: "#ecfdf3" };
    if (run?.status === "failed") return { text: "Chờ dữ liệu Yandex", tone: "#b54708", bg: "#fffaeb" };
    return { text: "Đã kết nối · chờ dữ liệu", tone: "#175cd3", bg: "#eff8ff" };
  }, [error, overview.impressions, queries.length, run?.status]);

  function QueryTable({ rows, empty, limit = 40 }: any) {
    return <div className="gva-table-wrap"><table className="gva-table">
      <thead><tr><th>Query</th><th>Imp.</th><th>Clicks</th><th>CTR</th><th>Pos.</th></tr></thead>
      <tbody>
        {rows.slice(0, limit).map((r: any, i: number) => {
          const ctr = n(r.impressions) ? n(r.clicks) * 100 / n(r.impressions) : 0;
          return <tr key={`${r.query_text}|${i}`}>
            <td><b>{r.query_text}</b></td><td>{fmt(r.impressions)}</td><td>{fmt(r.clicks)}</td>
            <td>{pct(ctr)}</td><td>{n(r.avg_show_position) ? n(r.avg_show_position).toFixed(1) : "—"}</td>
          </tr>;
        })}
        {!rows.length && <tr><td colSpan={5}><div className="gva-empty">{empty}</div></td></tr>}
      </tbody>
    </table></div>;
  }

  const tabs: { key: TabKey; label: string }[] = [
    { key: "overview", label: "Tổng quan" },
    { key: "russia", label: "Thị trường Nga" },
    { key: "queries", label: "Từ khóa" },
    { key: "daily", label: "Xu hướng ngày" },
    { key: "pages", label: "Landing pages" },
  ];

  const languageRows = coverage?.by_language
    ? Object.entries(coverage.by_language).map(([language, stats]: any) => ({ language, ...stats }))
        .sort((a: any, b: any) => n(b.total) - n(a.total))
    : [];

  return <>
    <div className="gva-section-head">
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0 }}>Yandex Russia SEO Command Center</h2>
          <span style={{ display: "inline-flex", alignItems: "center", borderRadius: 999, padding: "6px 10px", background: statusLabel.bg, color: statusLabel.tone, fontSize: 12, fontWeight: 800 }}>{statusLabel.text}</span>
        </div>
        <div className="gva-mini" style={{ marginTop: 6 }}>
          Webmaster → Supabase → Admin · {range.startDate} → {range.endDate}
          {run?.completed_at ? <> · Đồng bộ gần nhất: <b>{new Date(run.completed_at).toLocaleString("vi-VN")}</b></> : null}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="gva-btn secondary" onClick={() => callYandex("test")} disabled={testing || syncing || coverageLoading}>{testing ? "Đang test…" : "Test kết nối"}</button>
        <button className="gva-btn secondary" onClick={loadCoverage} disabled={coverageLoading || syncing || testing}>{coverageLoading ? "Đang kiểm tra…" : "Kiểm tra Index Coverage"}</button>
        <button className="gva-btn" onClick={() => callYandex("sync")} disabled={syncing || testing || coverageLoading}>{syncing ? "Đang đồng bộ…" : "Đồng bộ Yandex"}</button>
      </div>
    </div>

    {error && <div className="gva-msg err">{error}</div>}
    {message && <div className="gva-msg">{message}</div>}

    <div className="gva-analytics-note">
      <b>Mục tiêu:</b> dùng Yandex như “Google Search Console cho thị trường Nga”.
      Query metrics đo nhu cầu tìm kiếm; Index Coverage đối chiếu trực tiếp sitemap production với URL Yandex đã tải và URL đang trong search.
    </div>

    <div className="gva-kpis">
      <K label="Yandex Clicks" value={fmt(overview.clicks)} hint="Organic search" />
      <K label="Impressions" value={fmt(overview.impressions)} hint="Yandex Search" />
      <K label="CTR" value={pct(overview.ctr)} hint="Clicks / Impressions" />
      <K label="Avg Position" value={overview.position ? overview.position.toFixed(1) : "—"} hint="Average show position" />
      <K label="RU Queries" value={fmt(russianQueries.length)} hint={`${pct(ruStats.share)} impression share`} />
    </div>

    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "14px 0 16px", padding: 6, borderRadius: 12, background: "#f3f6fa" }}>
      {tabs.map(t => <button key={t.key} onClick={() => setTab(t.key)} style={{ border: 0, cursor: "pointer", borderRadius: 9, padding: "10px 14px", fontWeight: 800, fontSize: 13, background: tab === t.key ? "#163f76" : "transparent", color: tab === t.key ? "#fff" : "#344054" }}>{t.label}</button>)}
    </div>

    {tab === "overview" && <>
      <div className="gva-grid2 gva-seo-grid">
        <div className="gva-card">
          <div className="gva-section-head"><div><h3>Russian Market Pulse</h3><div className="gva-mini">Chỉ các query Cyrillic</div></div></div>
          <div className="gva-kpis" style={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}>
            <K label="RU Impressions" value={fmt(ruStats.impressions)} hint="Cyrillic queries" />
            <K label="RU Clicks" value={fmt(ruStats.clicks)} hint="Yandex organic" />
            <K label="RU CTR" value={pct(ruStats.ctr)} hint="Russian demand response" />
            <K label="RU Share" value={pct(ruStats.share)} hint="Share of all impressions" />
          </div>
        </div>
        <div className="gva-card">
          <div className="gva-section-head"><div><h3>SEO Action Queue</h3><div className="gva-mini">Việc nên ưu tiên trước</div></div></div>
          <div style={{ display: "grid", gap: 10 }}>
            <Action title="Quick wins" value={opportunities.quickWins.length} text="Query Nga vị trí 4–20 có impressions: tối ưu content/internal links." />
            <Action title="CTR opportunities" value={opportunities.ctrWins.length} text="Query top 10 nhưng CTR thấp: sửa title/meta/snippet." />
            <Action title="Index coverage" value={coverage ? `${coverage.crawled}/${coverage.total_sitemap}` : "CHECK"} text={coverage ? `${coverage.missing} URL trong sitemap chưa thấy Yandex crawl.` : "Bấm Kiểm tra Index Coverage để đối chiếu toàn sitemap."} />
          </div>
        </div>
      </div>
      <div className="gva-card" style={{ marginTop: 15 }}>
        <div className="gva-section-head"><h3>Top Russian / Cyrillic Queries</h3><div className="gva-mini">{russianQueries.length} queries</div></div>
        <QueryTable rows={russianQueries} empty="Chưa có Russian query trong snapshot." limit={20} />
      </div>
    </>}

    {tab === "russia" && <>
      <div className="gva-grid2 gva-seo-grid">
        <div className="gva-card"><div className="gva-section-head"><div><h3>Quick Wins — Russia</h3><div className="gva-mini">Vị trí 4–20, ưu tiên theo impressions</div></div></div><QueryTable rows={opportunities.quickWins} empty="Chưa có quick win để ưu tiên." /></div>
        <div className="gva-card"><div className="gva-section-head"><div><h3>CTR Opportunities — Russia</h3><div className="gva-mini">Top 10 nhưng CTR &lt; 3%</div></div></div><QueryTable rows={opportunities.ctrWins} empty="Chưa có query CTR thấp trong top 10." /></div>
      </div>
      <div className="gva-card" style={{ marginTop: 15 }}><div className="gva-section-head"><h3>All Russian / Cyrillic Queries</h3><div className="gva-mini">{russianQueries.length} queries</div></div><QueryTable rows={russianQueries} empty="Yandex chưa trả dữ liệu query Cyrillic." limit={100} /></div>
    </>}

    {tab === "queries" && <div className="gva-card">
      <div className="gva-section-head">
        <div><h3>Query Explorer</h3><div className="gva-mini">Tất cả từ khóa Yandex đã ghi nhận</div></div>
        <input value={qFilter} onChange={(e) => setQFilter(e.target.value)} placeholder="Lọc từ khóa…" style={{ minWidth: 220, border: "1px solid #d0d5dd", borderRadius: 10, padding: "9px 11px", outline: "none", background: "#fff" }} />
      </div>
      <QueryTable rows={filteredQueries} empty="Chưa có query trong snapshot." limit={200} />
    </div>}

    {tab === "daily" && <div className="gva-card">
      <div className="gva-section-head"><h3>Daily Yandex Search</h3><div className="gva-mini">{range.startDate} → {range.endDate}</div></div>
      <div className="gva-table-wrap"><table className="gva-table">
        <thead><tr><th>Date</th><th>Impressions</th><th>Clicks</th><th>CTR</th><th>Position</th></tr></thead>
        <tbody>
          {daily.slice(0, 180).map((r: any) => {
            const ctr = n(r.impressions) ? n(r.clicks) * 100 / n(r.impressions) : 0;
            return <tr key={r.date}><td><b>{r.date}</b></td><td>{fmt(r.impressions)}</td><td>{fmt(r.clicks)}</td><td>{pct(ctr)}</td><td>{n(r.avg_show_position) ? n(r.avg_show_position).toFixed(1) : "—"}</td></tr>;
          })}
          {!daily.length && <tr><td colSpan={5}><div className="gva-empty">{loading ? "Đang tải…" : "Chưa có dữ liệu Webmaster trong kỳ."}</div></td></tr>}
        </tbody>
      </table></div>
    </div>}

    {tab === "pages" && <>
      <div className="gva-card">
        <div className="gva-section-head">
          <div><h3>Yandex Index Coverage</h3><div className="gva-mini">Sitemap production ↔ Yandex downloaded pages ↔ pages in search</div></div>
          <button className="gva-btn" onClick={loadCoverage} disabled={coverageLoading}>{coverageLoading ? "Đang kiểm tra…" : coverage ? "Kiểm tra lại" : "Kiểm tra ngay"}</button>
        </div>

        {!coverage && <div className="gva-empty">Bấm “Kiểm tra ngay” để lấy coverage trực tiếp từ Yandex Webmaster. Không submit hay sửa URL nào tự động.</div>}
        {coverage?.waiting && <div className="gva-msg">{coverage.warning || "Yandex coverage chưa sẵn sàng."}</div>}

        {coverage && !coverage.waiting && <>
          <div className="gva-kpis" style={{ marginTop: 12 }}>
            <K label="Sitemap URLs" value={fmt(coverage.total_sitemap)} hint="Production sitemap" />
            <K label="Crawled" value={fmt(coverage.crawled)} hint={`${fmt(coverage.healthy)} URL HTTP 2xx`} />
            <K label="In Search" value={fmt(coverage.in_search)} hint="Yandex search results" />
            <K label="Missing" value={fmt(coverage.missing)} hint="Chưa thấy trong downloaded samples" />
            <K label="Crawled, not search" value={fmt(coverage.crawled_not_in_search)} hint="Đã tải nhưng chưa vào search" />
          </div>

          <div className="gva-analytics-note" style={{ marginTop: 14 }}>
            Yandex báo tổng <b>{fmt(coverage.yandex_reported_downloaded)}</b> downloaded URLs và <b>{fmt(coverage.yandex_reported_in_search)}</b> URLs in search trên host.
            Panel đối chiếu theo URL chuẩn hóa với <b>{fmt(coverage.total_sitemap)}</b> URL trong sitemap hiện tại.
            {coverage.generated_at ? <> · Kiểm tra: <b>{new Date(coverage.generated_at).toLocaleString("vi-VN")}</b></> : null}
          </div>

          <div className="gva-card" style={{ marginTop: 15, boxShadow: "none" }}>
            <div className="gva-section-head"><h3>Coverage theo cụm ngôn ngữ</h3><div className="gva-mini">Ưu tiên tìm cụm còn thiếu</div></div>
            <div className="gva-table-wrap"><table className="gva-table">
              <thead><tr><th>Cluster</th><th>Total</th><th>Crawled</th><th>2xx</th><th>In Search</th><th>Missing</th></tr></thead>
              <tbody>
                {languageRows.map((r: any) => <tr key={r.language}><td><b>/{r.language === "root" ? "" : r.language}</b></td><td>{fmt(r.total)}</td><td>{fmt(r.crawled)}</td><td>{fmt(r.healthy)}</td><td>{fmt(r.in_search)}</td><td><b>{fmt(r.missing)}</b></td></tr>)}
              </tbody>
            </table></div>
          </div>

          <div className="gva-grid2 gva-seo-grid" style={{ marginTop: 15 }}>
            <div className="gva-card">
              <div className="gva-section-head"><div><h3>Missing from Yandex crawl</h3><div className="gva-mini">{fmt(coverage.missing)} URL · chỉ đọc, không auto-submit</div></div></div>
              <CoverageUrlTable rows={coverage.missing_urls || []} empty="Tuyệt vời: không có URL sitemap nào bị thiếu trong downloaded samples." mode="missing" />
            </div>
            <div className="gva-card">
              <div className="gva-section-head"><div><h3>Crawled but not in search</h3><div className="gva-mini">{fmt(coverage.crawled_not_in_search)} URL</div></div></div>
              <CoverageUrlTable rows={coverage.crawled_not_in_search_urls || []} empty="Không có URL nào ở trạng thái crawled nhưng chưa vào search." mode="search" />
            </div>
          </div>

          {n(coverage.crawl_errors) > 0 && <div className="gva-card" style={{ marginTop: 15 }}>
            <div className="gva-section-head"><div><h3>Crawl errors / non-2xx</h3><div className="gva-mini">{fmt(coverage.crawl_errors)} URL cần kiểm tra kỹ thuật</div></div></div>
            <CoverageUrlTable rows={coverage.crawl_error_urls || []} empty="Không có lỗi crawl." mode="error" />
          </div>}
        </>}
      </div>
    </>}
  </>;
}

function CoverageUrlTable({ rows, empty, mode }: any) {
  return <div className="gva-table-wrap" style={{ maxHeight: 520, overflow: "auto" }}><table className="gva-table">
    <thead><tr><th>URL</th><th>Cluster</th><th>Status</th></tr></thead>
    <tbody>
      {rows.slice(0, 300).map((r: any, i: number) => <tr key={`${r.url}|${i}`}>
        <td><a href={r.url} target="_blank" rel="noreferrer" style={{ color: "#175cd3", fontWeight: 700 }}>{shortUrl(r.url)}</a></td>
        <td>/{r.language === "root" ? "" : r.language}</td>
        <td>{mode === "missing" ? "Chưa crawl" : mode === "error" ? `${r.http_code || r.crawl_status || "Error"}` : "Chưa vào search"}</td>
      </tr>)}
      {!rows.length && <tr><td colSpan={3}><div className="gva-empty">{empty}</div></td></tr>}
    </tbody>
  </table></div>;
}

function K({ label, value, hint }: any) {
  return <div className="gva-card gva-kpi"><div className="label">{label}</div><div className="value">{value}</div><div className="hint">{hint}</div></div>;
}

function Action({ title, value, text }: any) {
  return <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 12, alignItems: "center", border: "1px solid #e4e7ec", borderRadius: 12, padding: 12, background: "#fff" }}>
    <div style={{ minHeight: 54, borderRadius: 10, display: "grid", placeItems: "center", background: "#f2f4f7", fontWeight: 900, fontSize: 18, color: "#163f76" }}>{value}</div>
    <div><div style={{ fontWeight: 900, color: "#101828", marginBottom: 3 }}>{title}</div><div style={{ fontSize: 12, color: "#667085", lineHeight: 1.45 }}>{text}</div></div>
  </div>;
}
