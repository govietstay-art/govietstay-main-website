"use client";

import { useEffect, useMemo, useState } from "react";

function n(v: any) { return Number(v || 0); }
function fmt(v: any) { return new Intl.NumberFormat("vi-VN").format(Number(v || 0)); }
function pct(v: number) { return `${v.toFixed(2)}%`; }
function isoDate(d: Date) { return d.toISOString().slice(0, 10); }
function isCyrillic(value: any) { return /[\u0400-\u04FF]/.test(String(value || "")); }

type TabKey = "overview" | "russia" | "queries" | "daily" | "pages";

export default function YandexSeoPanel({ supabase, days }: any) {
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [run, setRun] = useState<any>(null);
  const [daily, setDaily] = useState<any[]>([]);
  const [queries, setQueries] = useState<any[]>([]);
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

  async function callYandex(mode: "test" | "sync") {
    mode === "test" ? setTesting(true) : setSyncing(true);
    setError("");
    setMessage("");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Phiên Admin đã hết hạn. Hãy đăng nhập lại.");

      const res = await fetch("/api/admin/yandex/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ mode, days: Math.max(7, Number(days || 28)) }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `Yandex API lỗi ${res.status}`);

      if (mode === "test") {
        setMessage(
          `Kết nối Webmaster OK · ${data?.webmaster?.host_url || "govietstay.com"}` +
          `${data?.webmaster?.host_data_status ? ` · ${data.webmaster.host_data_status}` : ""}`
        );
      } else {
        if (data?.waiting) {
          setMessage(data?.warning || "Yandex Webmaster đã kết nối nhưng dữ liệu Search Queries chưa sẵn sàng.");
        } else {
          setMessage(
            `Đã đồng bộ Yandex ${data.date_from} → ${data.date_to}: ` +
            `${data.webmaster_rows || 0} ngày, ${data.query_rows || 0} queries.`
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
      .sort((a: any, b: any) => n(b.impressions) - n(a.impressions))
      .slice(0, 10);

    const ctrWins = [...russianQueries]
      .filter((r: any) => n(r.impressions) >= 5 && n(r.avg_show_position) > 0 && n(r.avg_show_position) <= 10)
      .filter((r: any) => (n(r.clicks) * 100 / Math.max(1, n(r.impressions))) < 3)
      .sort((a: any, b: any) => n(b.impressions) - n(a.impressions))
      .slice(0, 10);

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
            <td><b>{r.query_text}</b></td>
            <td>{fmt(r.impressions)}</td>
            <td>{fmt(r.clicks)}</td>
            <td>{pct(ctr)}</td>
            <td>{n(r.avg_show_position) ? n(r.avg_show_position).toFixed(1) : "—"}</td>
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

  return <>
    <div className="gva-section-head">
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0 }}>Yandex Russia SEO Command Center</h2>
          <span style={{
            display: "inline-flex", alignItems: "center", borderRadius: 999, padding: "6px 10px",
            background: statusLabel.bg, color: statusLabel.tone, fontSize: 12, fontWeight: 800
          }}>{statusLabel.text}</span>
        </div>
        <div className="gva-mini" style={{ marginTop: 6 }}>
          Webmaster → Supabase → Admin · {range.startDate} → {range.endDate}
          {run?.completed_at ? <> · Đồng bộ gần nhất: <b>{new Date(run.completed_at).toLocaleString("vi-VN")}</b></> : null}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="gva-btn secondary" onClick={() => callYandex("test")} disabled={testing || syncing}>
          {testing ? "Đang test…" : "Test kết nối"}
        </button>
        <button className="gva-btn" onClick={() => callYandex("sync")} disabled={syncing || testing}>
          {syncing ? "Đang đồng bộ…" : "Đồng bộ Yandex"}
        </button>
      </div>
    </div>

    {error && <div className="gva-msg err">{error}</div>}
    {message && <div className="gva-msg">{message}</div>}

    <div className="gva-analytics-note">
      <b>Mục tiêu:</b> dùng Yandex như “Google Search Console cho thị trường Nga”.
      Tập trung vào impressions, clicks, CTR, vị trí, Cyrillic queries và cơ hội SEO có thể hành động.
      Traffic/WhatsApp/booking vẫn đọc ở Analytics & Marketing để tránh trùng dữ liệu.
    </div>

    <div className="gva-kpis">
      <K label="Yandex Clicks" value={fmt(overview.clicks)} hint="Organic search" />
      <K label="Impressions" value={fmt(overview.impressions)} hint="Yandex Search" />
      <K label="CTR" value={pct(overview.ctr)} hint="Clicks / Impressions" />
      <K label="Avg Position" value={overview.position ? overview.position.toFixed(1) : "—"} hint="Average show position" />
      <K label="RU Queries" value={fmt(russianQueries.length)} hint={`${pct(ruStats.share)} impression share`} />
    </div>

    <div style={{
      display: "flex", gap: 8, flexWrap: "wrap", margin: "14px 0 16px",
      padding: 6, borderRadius: 12, background: "#f3f6fa"
    }}>
      {tabs.map(t => <button
        key={t.key}
        onClick={() => setTab(t.key)}
        style={{
          border: 0, cursor: "pointer", borderRadius: 9, padding: "10px 14px",
          fontWeight: 800, fontSize: 13,
          background: tab === t.key ? "#163f76" : "transparent",
          color: tab === t.key ? "#fff" : "#344054"
        }}
      >{t.label}</button>)}
    </div>

    {tab === "overview" && <>
      <div className="gva-grid2 gva-seo-grid">
        <div className="gva-card">
          <div className="gva-section-head">
            <div>
              <h3>Russian Market Pulse</h3>
              <div className="gva-mini">Chỉ các query Cyrillic</div>
            </div>
          </div>
          <div className="gva-kpis" style={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}>
            <K label="RU Impressions" value={fmt(ruStats.impressions)} hint="Cyrillic queries" />
            <K label="RU Clicks" value={fmt(ruStats.clicks)} hint="Yandex organic" />
            <K label="RU CTR" value={pct(ruStats.ctr)} hint="Russian demand response" />
            <K label="RU Share" value={pct(ruStats.share)} hint="Share of all impressions" />
          </div>
        </div>

        <div className="gva-card">
          <div className="gva-section-head">
            <div>
              <h3>SEO Action Queue</h3>
              <div className="gva-mini">Việc nên ưu tiên trước</div>
            </div>
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            <Action title="Quick wins" value={opportunities.quickWins.length} text="Query Nga vị trí 4–20 có impressions: tối ưu content/internal links." />
            <Action title="CTR opportunities" value={opportunities.ctrWins.length} text="Query top 10 nhưng CTR thấp: sửa title/meta/snippet." />
            <Action title="Data readiness" value={daily.length ? "LIVE" : "WAIT"} text={daily.length ? "Yandex đã có dữ liệu kỳ này." : "Kết nối đã có; chờ Yandex ghi nhận impressions/clicks."} />
          </div>
        </div>
      </div>

      <div className="gva-card" style={{ marginTop: 15 }}>
        <div className="gva-section-head">
          <h3>Top Russian / Cyrillic Queries</h3>
          <div className="gva-mini">{russianQueries.length} queries</div>
        </div>
        <QueryTable rows={russianQueries} empty="Chưa có Russian query trong snapshot." limit={20} />
      </div>
    </>}

    {tab === "russia" && <>
      <div className="gva-grid2 gva-seo-grid">
        <div className="gva-card">
          <div className="gva-section-head">
            <div>
              <h3>Quick Wins — Russia</h3>
              <div className="gva-mini">Vị trí 4–20, ưu tiên theo impressions</div>
            </div>
          </div>
          <QueryTable rows={opportunities.quickWins} empty="Chưa có quick win để ưu tiên." />
        </div>

        <div className="gva-card">
          <div className="gva-section-head">
            <div>
              <h3>CTR Opportunities — Russia</h3>
              <div className="gva-mini">Top 10 nhưng CTR &lt; 3%</div>
            </div>
          </div>
          <QueryTable rows={opportunities.ctrWins} empty="Chưa có query CTR thấp trong top 10." />
        </div>
      </div>

      <div className="gva-card" style={{ marginTop: 15 }}>
        <div className="gva-section-head">
          <h3>All Russian / Cyrillic Queries</h3>
          <div className="gva-mini">{russianQueries.length} queries</div>
        </div>
        <QueryTable rows={russianQueries} empty="Yandex chưa trả dữ liệu query Cyrillic." limit={100} />
      </div>
    </>}

    {tab === "queries" && <div className="gva-card">
      <div className="gva-section-head">
        <div>
          <h3>Query Explorer</h3>
          <div className="gva-mini">Tất cả từ khóa Yandex đã ghi nhận</div>
        </div>
        <input
          value={qFilter}
          onChange={(e) => setQFilter(e.target.value)}
          placeholder="Lọc từ khóa…"
          style={{
            minWidth: 220, border: "1px solid #d0d5dd", borderRadius: 10,
            padding: "9px 11px", outline: "none", background: "#fff"
          }}
        />
      </div>
      <QueryTable rows={filteredQueries} empty="Chưa có query trong snapshot." limit={200} />
    </div>}

    {tab === "daily" && <div className="gva-card">
      <div className="gva-section-head">
        <h3>Daily Yandex Search</h3>
        <div className="gva-mini">{range.startDate} → {range.endDate}</div>
      </div>
      <div className="gva-table-wrap">
        <table className="gva-table">
          <thead><tr><th>Date</th><th>Impressions</th><th>Clicks</th><th>CTR</th><th>Position</th></tr></thead>
          <tbody>
            {daily.slice(0, 180).map((r: any) => {
              const ctr = n(r.impressions) ? n(r.clicks) * 100 / n(r.impressions) : 0;
              return <tr key={r.date}>
                <td><b>{r.date}</b></td>
                <td>{fmt(r.impressions)}</td>
                <td>{fmt(r.clicks)}</td>
                <td>{pct(ctr)}</td>
                <td>{n(r.avg_show_position) ? n(r.avg_show_position).toFixed(1) : "—"}</td>
              </tr>;
            })}
            {!daily.length && <tr><td colSpan={5}>
              <div className="gva-empty">{loading ? "Đang tải…" : "Chưa có dữ liệu Webmaster trong kỳ."}</div>
            </td></tr>}
          </tbody>
        </table>
      </div>
    </div>}

    {tab === "pages" && <div className="gva-card">
      <div className="gva-section-head">
        <div>
          <h3>Landing Page Intelligence</h3>
          <div className="gva-mini">Không hiển thị dữ liệu giả</div>
        </div>
      </div>

      <div style={{
        border: "1px solid #e4e7ec", borderRadius: 14, padding: 16,
        background: "#fcfcfd", lineHeight: 1.6
      }}>
        <b>Yandex Webmaster có Page Statistics theo URL</b> (impressions, clicks, CTR, average position),
        nhưng Webmaster API v4 hiện tại không cung cấp endpoint page-performance tương đương để đồng bộ tự động như query metrics.
        Vì vậy Admin không tự “đoán” landing-page performance.
        <br /><br />
        <b>Cách làm khoa học:</b> query metrics tự sync ở đây; Page Statistics xem trong Yandex Webmaster.
        Khi cần tự động hóa landing pages, bước tiếp theo là import archive/query-by-URL export từ Webmaster vào Supabase.
        <br /><br />
        <button
          className="gva-btn secondary"
          onClick={() => window.open("https://webmaster.yandex.com/", "_blank", "noopener,noreferrer")}
        >
          Mở Yandex Webmaster
        </button>
      </div>
    </div>}
  </>;
}

function K({ label, value, hint }: any) {
  return <div className="gva-card gva-kpi">
    <div className="label">{label}</div>
    <div className="value">{value}</div>
    <div className="hint">{hint}</div>
  </div>;
}

function Action({ title, value, text }: any) {
  return <div style={{
    display: "grid", gridTemplateColumns: "72px 1fr", gap: 12, alignItems: "center",
    border: "1px solid #e4e7ec", borderRadius: 12, padding: 12, background: "#fff"
  }}>
    <div style={{
      minHeight: 54, borderRadius: 10, display: "grid", placeItems: "center",
      background: "#f2f4f7", fontWeight: 900, fontSize: 18, color: "#163f76"
    }}>{value}</div>
    <div>
      <div style={{ fontWeight: 900, color: "#101828", marginBottom: 3 }}>{title}</div>
      <div style={{ fontSize: 12, color: "#667085", lineHeight: 1.45 }}>{text}</div>
    </div>
  </div>;
}
