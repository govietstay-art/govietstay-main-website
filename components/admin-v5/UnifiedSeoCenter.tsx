"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import YandexSeoPanel from "./YandexSeoPanel";
import "./admin-v5.css";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vscffgnxaexestnayvae.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV",
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } },
);

type Engine = "google" | "bing" | "yandex";
type View = "all" | Engine;
type Totals = { clicks: number; impressions: number; ctr: number; position: number | null };
type EngineState = { status: "loading" | "ready" | "empty" | "unavailable"; error: string; totals: Totals | null; updated: string };
const blank = (): EngineState => ({ status: "loading", error: "", totals: null, updated: "" });
const fmt = (value: number) => new Intl.NumberFormat("vi-VN").format(value);
const num = (value: any) => Number.isFinite(Number(value)) ? Number(value) : 0;
const percentage = (value: number) => `${value.toFixed(2)}%`;
const pathOf = (value: any) => { try { const url = new URL(String(value)); return url.pathname + url.search; } catch { return String(value || "/"); } };

export default function UnifiedSeoCenter() {
  const [access, setAccess] = useState<"loading" | "denied" | "granted">("loading");
  const [days, setDays] = useState(28);
  const [view, setView] = useState<View>("all");
  const [language, setLanguage] = useState("all");
  const [search, setSearch] = useState("");
  const [engines, setEngines] = useState<Record<Engine, EngineState>>({ google: blank(), bing: blank(), yandex: blank() });
  const [googlePages, setGooglePages] = useState<any[]>([]);
  const [googleQueries, setGoogleQueries] = useState<any[]>([]);
  const [bingPages, setBingPages] = useState<any[]>([]);
  const [bingQueries, setBingQueries] = useState<any[]>([]);
  const [syncingGoogle, setSyncingGoogle] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let mounted = true;
    async function verify() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (!mounted) return;
      if (error || !user) { setAccess("denied"); return; }
      const result = await supabase.from("staff_profiles").select("role,active")
        .eq("auth_user_id", user.id).eq("active", true).maybeSingle();
      if (mounted) setAccess(!result.error && ["owner", "admin"].includes(result.data?.role || "") ? "granted" : "denied");
    }
    void verify();
    const { data: listener } = supabase.auth.onAuthStateChange(() => { void verify(); });
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, []);

  const load = useCallback(async () => {
    if (access !== "granted") return;
    setEngines({ google: blank(), bing: blank(), yandex: blank() });
    const yesterday = new Date(Date.now() - 86400000);
    const start = new Date(yesterday.getTime() - (days - 1) * 86400000);
    const from = start.toISOString().slice(0, 10);
    const to = yesterday.toISOString().slice(0, 10);

    // Each provider is independent: a disconnected service must not hide the other two.
    const [g, y, b] = await Promise.allSettled([
      Promise.all([
        supabase.rpc("admin_seo_overview", { p_days: days }),
        supabase.rpc("admin_seo_pages", { p_days: days, p_limit: 100 }),
        supabase.rpc("admin_seo_queries", { p_days: days, p_limit: 100 }),
        supabase.from("search_console_sync_runs").select("completed_at,status")
          .order("started_at", { ascending: false }).limit(1).maybeSingle(),
      ]),
      Promise.all([
        supabase.from("yandex_webmaster_daily")
          .select("date,clicks,impressions,avg_show_position")
          .gte("date", from).lte("date", to).eq("device", "ALL"),
        supabase.from("yandex_sync_runs")
          .select("completed_at,status").order("started_at", { ascending: false }).limit(1).maybeSingle(),
      ]),
      (async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) throw new Error("Phiên đăng nhập đã hết hạn.");
        const response = await fetch(`/api/admin/bing/overview?days=${days}`, {
          headers: { Authorization: `Bearer ${session.access_token}` }, cache: "no-store",
        });
        const body = await response.json();
        if (!response.ok) throw new Error(body.message || body.error || "Bing chưa thể kết nối.");
        return body;
      })(),
    ]);

    const next: Record<Engine, EngineState> = { google: blank(), bing: blank(), yandex: blank() };
    if (g.status === "fulfilled") {
      const [overview, pages, queries, run] = g.value;
      if (overview.error || pages.error || queries.error || run.error) {
        next.google = { ...blank(), status: "unavailable", error: String(overview.error?.message || pages.error?.message || queries.error?.message || run.error?.message) };
      } else {
        const result = Array.isArray(overview.data) ? overview.data[0] : overview.data;
        const clicks = num(result?.clicks), impressions = num(result?.impressions);
        next.google = {
          status: clicks || impressions ? "ready" : "empty", error: "",
          totals: { clicks, impressions, ctr: impressions ? clicks * 100 / impressions : 0,
            position: result?.avg_position == null ? null : num(result.avg_position) },
          updated: run.data?.completed_at || "",
        };
        setGooglePages(pages.data || []);
        setGoogleQueries(queries.data || []);
      }
    } else next.google = { ...blank(), status: "unavailable", error: "Không lấy được dữ liệu Google." };

    if (y.status === "fulfilled") {
      const [daily, run] = y.value;
      if (daily.error || run.error) {
        next.yandex = { ...blank(), status: "unavailable", error: String(daily.error?.message || run.error?.message) };
      } else {
        const rows = daily.data || [];
        const clicks = rows.reduce((sum: number, row: any) => sum + num(row.clicks), 0);
        const impressions = rows.reduce((sum: number, row: any) => sum + num(row.impressions), 0);
        const weighted = rows.reduce((sum: number, row: any) => sum + num(row.avg_show_position) * num(row.impressions), 0);
        next.yandex = { status: rows.length ? "ready" : "empty", error: "",
          totals: { clicks, impressions, ctr: impressions ? 100 * clicks / impressions : 0,
            position: impressions ? weighted / impressions : null },
          updated: run.data?.completed_at || "" };
      }
    } else next.yandex = { ...blank(), status: "unavailable", error: "Không lấy được dữ liệu Yandex." };

    if (b.status === "fulfilled") {
      const body = b.value;
      next.bing = { status: body.clicks || body.impressions ? "ready" : "empty", error: "",
        totals: { clicks: num(body.clicks), impressions: num(body.impressions), ctr: num(body.ctr), position: null },
        updated: body.fetchedAt || "" };
      setBingPages(body.pages || []);
      setBingQueries(body.queries || []);
    } else next.bing = { ...blank(), status: "unavailable", error: b.reason instanceof Error ? b.reason.message : "Bing chưa kết nối." };
    setEngines(next);
  }, [access, days]);

  useEffect(() => { void load(); }, [load]);

  async function syncGoogle() {
    setSyncingGoogle(true); setNotice("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Cần đăng nhập lại.");
      const result = await fetch("/api/admin/search-console/sync", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ days }),
      });
      const body = await result.json().catch(() => ({}));
      if (!result.ok) throw new Error(body.error || "Đồng bộ Google thất bại.");
      setNotice(`Đã đồng bộ Google: ${body.rows_upserted || 0} dòng.`);
      await load();
    } catch (error) { setNotice(error instanceof Error ? error.message : "Đồng bộ Google thất bại."); }
    finally { setSyncingGoogle(false); }
  }

  const rows = useMemo(() => {
    const google = googlePages.map(row => ({ engine: "Google", path: pathOf(row.page),
      clicks: num(row.clicks), impressions: num(row.impressions), ctr: num(row.ctr),
      position: row.position == null ? null : num(row.position), whatsapp: row.whatsapp_clicks }));
    const bing = bingPages.map(row => ({ engine: "Bing", path: pathOf(row.label),
      clicks: num(row.clicks), impressions: num(row.impressions), ctr: num(row.ctr),
      position: row.position, whatsapp: null }));
    return [...(view === "bing" ? [] : google), ...(view === "google" ? [] : bing)]
      .filter(row => language === "all" || row.path.toLowerCase().startsWith(`/${language}/`)
        || row.path.toLowerCase() === `/${language}`)
      .filter(row => row.path.toLowerCase().includes(search.trim().toLowerCase()))
      .sort((a, b) => b.impressions - a.impressions);
  }, [googlePages, bingPages, language, search, view]);

  const combined = useMemo(() => {
    const available = Object.values(engines).filter(e => e.totals !== null);
    return available.length ? {
      clicks: available.reduce((sum, row) => sum + (row.totals?.clicks || 0), 0),
      impressions: available.reduce((sum, row) => sum + (row.totals?.impressions || 0), 0),
      count: available.length,
    } : null;
  }, [engines]);

  if (access === "loading") return <div className="gva-login">Đang xác minh quyền truy cập SEO Center…</div>;
  if (access === "denied") return <div className="gva-login"><div className="gva-login-card">
    <h2>SEO Center yêu cầu quyền Owner hoặc Admin</h2><p>Đăng nhập tài khoản được cấp quyền trong Admin chính.</p>
    <Link href="/admin" className="gva-btn">Về trang đăng nhập Admin</Link>
  </div></div>;

  return <div className="gva-shell"><main className="gva-main" style={{ maxWidth: 1440, margin: "0 auto" }}>
    <div className="gva-top"><div className="gva-title"><h1>GoVietStay · SEO Center</h1>
      <p>Google Search Console · Bing Webmaster · Yandex Webmaster</p></div>
      <div className="gva-top-actions"><Link href="/admin" className="gva-btn secondary">← Admin</Link>
        <select className="gva-select" value={days} onChange={event => setDays(Number(event.target.value))} aria-label="Khoảng thời gian">
          <option value={7}>7 ngày</option><option value={28}>28 ngày</option><option value={90}>90 ngày</option>
        </select><button className="gva-btn secondary" onClick={() => void load()}>Làm mới</button>
      </div>
    </div>
    <div className="gva-analytics-note">Số liệu thật từ từng công cụ, không dùng dữ liệu minh họa. Google có thể trễ 2–3 ngày; Bing có thể gồm Web, Images, News và các bề mặt tìm kiếm khác. Tổng click/impression chỉ cộng nguồn có dữ liệu, không cộng vị trí trung bình hoặc số trang index.</div>
    <div className="gva-kpis">
      <div className="gva-card gva-kpi"><div className="label">Clicks · các nguồn có dữ liệu</div><div className="value">{combined ? fmt(combined.clicks) : "—"}</div><div className="hint">{combined ? `${combined.count}/3 nguồn có thể tổng hợp` : "Chưa có dữ liệu"}</div></div>
      <div className="gva-card gva-kpi"><div className="label">Impressions · các nguồn có dữ liệu</div><div className="value">{combined ? fmt(combined.impressions) : "—"}</div><div className="hint">Các nền tảng cập nhật vào thời điểm khác nhau</div></div>
      {(["google", "bing", "yandex"] as Engine[]).map(engine => {
        const row = engines[engine];
        return <div className="gva-card gva-kpi" key={engine}><div className="label">{engine.toUpperCase()}</div>
          <div className="value">{row.totals ? fmt(row.totals.clicks) : "—"} clicks</div>
          <div className="hint">{row.status === "loading" ? "Đang tải…" : row.status === "unavailable" ? row.error :
            `${fmt(row.totals?.impressions || 0)} impressions · ${row.totals ? percentage(row.totals.ctr) : "—"} CTR`}</div>
          <div className="gva-mini">{row.updated ? `Cập nhật ${new Date(row.updated).toLocaleString("vi-VN")}` : row.status === "empty" ? "Đã truy vấn · chưa có lượt tìm kiếm trong kỳ" : ""}</div>
        </div>;
      })}
    </div>
    <div className="gva-section-head" style={{ flexWrap: "wrap", gap: 8 }}><div><h2>Phân tích theo công cụ</h2><div className="gva-mini">Một nơi quản lý ba nguồn dữ liệu</div></div>
      <div className="gva-top-actions">{(["all", "google", "bing", "yandex"] as View[]).map(key =>
        <button key={key} type="button" className={`gva-btn ${view === key ? "" : "secondary"}`} onClick={() => setView(key)}>
          {key === "all" ? "Tổng hợp" : key === "google" ? "Google" : key === "bing" ? "Bing" : "Yandex"}
        </button>)}</div>
    </div>
    {notice && <div className="gva-msg" role="status">{notice}</div>}
    {(view === "all" || view === "google") && <div className="gva-card" style={{ marginBottom: 15 }}>
      <div className="gva-section-head"><h3>Google Search Console</h3><button className="gva-btn secondary" disabled={syncingGoogle} onClick={() => void syncGoogle()}>{syncingGoogle ? "Đang đồng bộ…" : "Đồng bộ Google"}</button></div>
      <div className="gva-mini">{engines.google.error || `Từ khóa: ${googleQueries.length} · Trang: ${googlePages.length} · Dữ liệu Search Console đã lưu trong Supabase.`}</div>
      {view === "google" && <QueryTable rows={googleQueries.map(row => ({ label: row.query, clicks: num(row.clicks), impressions: num(row.impressions), position: row.position }))} />}
    </div>}
    {(view === "all" || view === "bing") && <div className="gva-card" style={{ marginBottom: 15 }}>
      <div className="gva-section-head"><h3>Bing Webmaster Tools</h3><a href="https://www.bing.com/webmasters/" target="_blank" rel="noopener noreferrer">Mở Bing ↗</a></div>
      <div className="gva-mini">{engines.bing.error || `Từ khóa: ${bingQueries.length} · Trang: ${bingPages.length} · Dữ liệu truy vấn trực tiếp từ Bing API.`}</div>
      {view === "bing" && <QueryTable rows={bingQueries} />}
      {engines.bing.status === "unavailable" && <p className="gva-mini">Thiết lập trên Vercel: BING_WEBMASTER_API_KEY và BING_WEBMASTER_SITE_URL (đúng URL tài sản đã xác minh). Không nhập API key trong trình duyệt.</p>}
    </div>}
    {(view === "all" || view === "yandex") && <div className="gva-card" style={{ marginBottom: 15 }}>
      <div className="gva-section-head"><h3>Yandex Webmaster</h3><a href="https://webmaster.yandex.com/" target="_blank" rel="noopener noreferrer">Mở Yandex ↗</a></div>
      <div className="gva-mini">{engines.yandex.error || "Bảng chi tiết từ khóa tiếng Nga, đồng bộ và kiểm tra index được giữ nguyên ở bên dưới."}</div>
      {view === "yandex" && <YandexSeoPanel supabase={supabase} days={days} />}
    </div>}
    {view !== "yandex" && <div className="gva-card">
      <div className="gva-section-head" style={{ flexWrap: "wrap", gap: 8 }}><div><h2>Landing pages</h2><div className="gva-mini">Theo từng Google/Bing; Yandex index coverage ở tab Yandex.</div></div>
        <div className="gva-top-actions"><select className="gva-select" aria-label="Ngôn ngữ URL" value={language} onChange={event => setLanguage(event.target.value)}>
          {["all", "ru", "vi", "en", "ko", "it", "mn", "tr", "ar", "cn"].map(code => <option key={code} value={code}>{code === "all" ? "Mọi ngôn ngữ" : `/${code}/`}</option>)}
        </select><input className="gva-input" style={{ maxWidth: 230 }} value={search} onChange={event => setSearch(event.target.value)} placeholder="Tìm trang Phú Quốc…" aria-label="Tìm URL" /></div>
      </div>
      <p className="gva-mini">Bộ lọc ngôn ngữ dựa trên đường dẫn URL, không suy đoán quốc tịch người tìm kiếm. Một URL có thể xuất hiện ở cả Google và Bing.</p>
      <div className="gva-table-wrap"><table className="gva-table"><thead><tr><th>Công cụ</th><th>Landing page</th><th>Clicks</th><th>Impressions</th><th>CTR</th><th>Position</th><th>WhatsApp</th></tr></thead><tbody>
        {rows.slice(0, 100).map((row, i) => <tr key={`${row.engine}-${row.path}-${i}`}><td>{row.engine}</td><td title={row.path}><b>{row.path}</b></td>
          <td>{fmt(row.clicks)}</td><td>{fmt(row.impressions)}</td><td>{percentage(row.ctr)}</td><td>{row.position === null ? "—" : row.position.toFixed(1)}</td><td>{row.whatsapp == null ? "—" : fmt(num(row.whatsapp))}</td></tr>)}
        {!rows.length && <tr><td colSpan={7}><div className="gva-empty">Không có landing page phù hợp hoặc nguồn chưa đồng bộ.</div></td></tr>}
      </tbody></table></div>
    </div>}
  </main></div>;
}

function QueryTable({ rows }: { rows: any[] }) {
  return <div className="gva-table-wrap"><table className="gva-table"><thead><tr><th>Từ khóa</th><th>Clicks</th><th>Impressions</th><th>CTR</th><th>Position</th></tr></thead><tbody>
    {rows.slice(0, 50).map((row, index) => <tr key={`${row.label}-${index}`}><td><b>{row.label}</b></td><td>{fmt(num(row.clicks))}</td><td>{fmt(num(row.impressions))}</td>
      <td>{percentage(num(row.impressions) ? num(row.clicks) * 100 / num(row.impressions) : 0)}</td><td>{row.position == null ? "—" : num(row.position).toFixed(1)}</td></tr>)}
    {!rows.length && <tr><td colSpan={5}><div className="gva-empty">Chưa có dữ liệu từ khóa.</div></td></tr>}
  </tbody></table></div>;
}
