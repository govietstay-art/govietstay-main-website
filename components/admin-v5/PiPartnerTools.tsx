"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";

type PiPartnerRow = {
  partner_id: string;
  partner_name: string;
  ref_code: string;
  username: string | null;
  landing_url: string | null;
  dashboard_token: string;
  active: boolean;
  created_at: string;
  scans: number;
  visitors: number;
  whatsapp_clicks: number;
  leads: number;
  bookings: number;
  completed_bookings: number;
  revenue_vnd: number;
  pending_commission_vnd: number;
  approved_commission_vnd: number;
  paid_commission_vnd: number;
  month_pax: number;
  core_calculated_commission_vnd: number;
  total_earning_vnd: number;
};

function money(value: unknown) {
  return new Intl.NumberFormat("vi-VN").format(Number(value || 0)) + " ₫";
}

function joinedAt(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString("vi-VN");
}

function portalUrl(row: PiPartnerRow) {
  return "https://www.govietstay.com/partner?token=" + encodeURIComponent(row.dashboard_token);
}

function piQrUrl(row: PiPartnerRow) {
  return "https://pi.govietstay.com/p/" + encodeURIComponent(row.ref_code);
}

function MiniQr({ row }: { row: PiPartnerRow }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    let live = true;
    QRCode.toDataURL(piQrUrl(row), {
      width: 360,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#071a33", light: "#ffffff" },
    })
      .then((url) => live && setSrc(url))
      .catch(() => live && setSrc(""));
    return () => {
      live = false;
    };
  }, [row.ref_code]);

  if (!src) return <span className="gva-mini">Đang tạo QR…</span>;
  return (
    <button type="button" onClick={() => window.open(piQrUrl(row), "_blank", "noopener,noreferrer")} style={{ border: "1px solid #dbe5f1", background: "#fff", padding: 4, borderRadius: 10, cursor: "pointer" }}>
      <img src={src} alt={`Pi QR ${row.ref_code}`} width={64} height={64} style={{ display: "block" }} />
    </button>
  );
}

export default function PiPartnerTools({ supabase, days }: any) {
  const [rows, setRows] = useState<PiPartnerRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const totals = useMemo(
    () =>
      rows.reduce(
        (acc, row) => {
          acc.scans += Number(row.scans || 0);
          acc.bookings += Number(row.bookings || 0);
          acc.completed += Number(row.completed_bookings || 0);
          acc.commission += Number(row.core_calculated_commission_vnd || 0);
          return acc;
        },
        { scans: 0, bookings: 0, completed: 0, commission: 0 }
      ),
    [rows]
  );

  async function loadRows() {
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase.rpc("admin_pi_partner_performance", { p_days: days });
      if (error) throw error;
      setRows((data || []) as PiPartnerRow[]);
    } catch (e: any) {
      setRows([]);
      setError(e?.message || "Không tải được Pi Community Partners.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadRows();
  }, [days]);

  async function copy(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(""), 1500);
    } catch {
      setError("Không copy được link.");
    }
  }

  return (
    <>
      {error && <div className="gva-msg err">{error}</div>}

      <div className="gva-analytics-note" style={{ marginBottom: 15 }}>
        <b>Pi Community</b> được tách khỏi Partner thường. Pioneer đã xác minh bằng Pi nên trạng thái là <b>Pi Verified / Active</b>, không dùng luồng Pending acceptance của partner truyền thống.
      </div>

      <div className="gva-kpis">
        <div className="gva-card gva-kpi"><div className="label">Pi Partners</div><div className="value">{rows.length}</div><div className="hint">Server-verified Pioneer</div></div>
        <div className="gva-card gva-kpi"><div className="label">QR scans</div><div className="value">{totals.scans}</div><div className="hint">Trong kỳ đang chọn</div></div>
        <div className="gva-card gva-kpi"><div className="label">Bookings</div><div className="value">{totals.bookings}</div><div className="hint">Attributed to Pi</div></div>
        <div className="gva-card gva-kpi"><div className="label">Completed</div><div className="value">{totals.completed}</div><div className="hint">Tour hoàn thành</div></div>
        <div className="gva-card gva-kpi"><div className="label">Core commission</div><div className="value" style={{ fontSize: 24 }}>{money(totals.commission)}</div><div className="hint">Tháng hiện tại</div></div>
      </div>

      <div className="gva-card">
        <div className="gva-section-head">
          <div>
            <h2>Pi Community Partner Center</h2>
            <div className="gva-mini">Pioneer · Pi Partner ID · scans · bookings · commission · Core status</div>
          </div>
          <button type="button" className="gva-btn secondary" onClick={loadRows}>{loading ? "Đang tải…" : "Cập nhật"}</button>
        </div>

        <div className="gva-table-wrap">
          <table className="gva-table">
            <thead>
              <tr><th>Pioneer</th><th>Status</th><th>Joined</th><th>QR scans</th><th>Visitors</th><th>WA</th><th>Leads</th><th>Bookings</th><th>Completed</th><th>Commission</th><th>QR</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.partner_id}>
                  <td><b>{row.partner_name}</b><br/><span className="gva-mini">{row.ref_code} · pi-community</span></td>
                  <td><span className="gva-pill" style={{ background: "#e8fff3", color: "#087443" }}>✓ Pi Verified</span><div className="gva-mini" style={{ marginTop: 5 }}>{row.active ? "Active" : "Inactive"}</div></td>
                  <td>{joinedAt(row.created_at)}</td>
                  <td><b>{row.scans || 0}</b></td>
                  <td>{row.visitors || 0}</td>
                  <td>{row.whatsapp_clicks || 0}</td>
                  <td>{row.leads || 0}</td>
                  <td><b>{row.bookings || 0}</b></td>
                  <td>{row.completed_bookings || 0}</td>
                  <td><b>{money(row.core_calculated_commission_vnd)}</b><div className="gva-mini">Paid {money(row.paid_commission_vnd)}</div></td>
                  <td><MiniQr row={row} /></td>
                  <td>
                    <button className="gva-btn secondary" type="button" onClick={() => window.open(portalUrl(row), "_blank", "noopener,noreferrer")}>Mở portal</button>
                    <button className="gva-btn secondary" style={{ marginTop: 6 }} type="button" onClick={() => copy(piQrUrl(row), "qr-" + row.partner_id)}>{copied === "qr-" + row.partner_id ? "Đã copy ✓" : "Copy Pi QR link"}</button>
                    <button className="gva-btn secondary" style={{ marginTop: 6 }} type="button" onClick={() => copy(portalUrl(row), "portal-" + row.partner_id)}>{copied === "portal-" + row.partner_id ? "Đã copy ✓" : "Copy portal"}</button>
                  </td>
                </tr>
              ))}
              {!rows.length && !loading && <tr><td colSpan={12}><div className="gva-empty">Chưa có Pioneer nào sync vào GoVietStay Core.</div></td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
