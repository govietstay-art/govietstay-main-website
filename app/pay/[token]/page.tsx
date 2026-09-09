import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ token: string }> };

const API = "https://vscffgnxaexestnayvae.supabase.co/functions/v1/booking-payment-public";

function money(value: unknown) {
  return new Intl.NumberFormat("en-US").format(Number(value || 0)) + " VND";
}

function dateText(value?: string | null) {
  if (!value) return "â€”";
  try {
    return new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric" })
      .format(new Date(`${value}T12:00:00Z`));
  } catch { return value; }
}

export default async function BookingPaymentPage({ params }: Props) {
  const { token } = await params;
  if (!/^[a-f0-9]{64}$/i.test(token)) notFound();

  const response = await fetch(`${API}?token=${encodeURIComponent(token)}&format=json`, { cache: "no-store" });
  if (!response.ok) notFound();
  const data = await response.json();
  const active = data.link.status === "active";
  const paid = data.link.status === "paid";
  const title = paid ? "Payment received" : active ? "Secure your booking" : "Payment link unavailable";

  return (
    <main className="gvsPayWrap">
      <style>{`
        :root{--g:#165f3e;--line:#dce7df;--muted:#64766c}*{box-sizing:border-box}
        body{margin:0;background:linear-gradient(180deg,#edf5ef 0,#f7f9f7 34%,#eef3ef 100%);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#173126}
        .gvsPayWrap{width:min(680px,100%);margin:0 auto;padding:20px 16px 48px}.brand{text-align:center;padding:20px 0 14px}.brand b{font-size:24px;color:var(--g)}.brand span{display:block;color:var(--muted);font-size:12px;margin-top:3px}
        .card{background:#fff;border:1px solid var(--line);border-radius:24px;box-shadow:0 18px 50px rgba(23,58,40,.09);overflow:hidden}.hero{padding:26px 22px 20px;background:linear-gradient(135deg,#143f2d,#176946);color:white}.safe{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;opacity:.85}.hero h1{font-size:34px;line-height:1.05;margin:8px 0 9px}.hero p{margin:0;color:#dcebe2;line-height:1.45}.status{display:inline-flex;margin-top:14px;padding:7px 10px;border-radius:999px;background:#fff0bd;color:#6a4b00;font-size:12px;font-weight:900}.status.paid{background:#d8f4e3;color:#155e38}
        .section{padding:20px 22px;border-top:1px solid var(--line)}.bookingCode{font-size:12px;font-weight:900;letter-spacing:.08em;color:var(--g)}.service{font-size:22px;font-weight:900;margin:5px 0 8px}.meta{color:var(--muted);font-size:14px;line-height:1.55}.numbers{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:16px}.num{background:#f6f8f6;border-radius:14px;padding:12px}.num span,.bank span{display:block;color:var(--muted);font-size:11px;text-transform:uppercase;font-weight:700}.num b{display:block;margin-top:4px;font-size:15px}.amount{margin:18px 0 2px;padding:18px;border-radius:18px;background:#fff7df;border:1px solid #f0d997;text-align:center}.amount span{display:block;font-size:12px;color:#785d11;text-transform:uppercase;font-weight:800}.amount b{display:block;font-size:32px;margin-top:4px;color:#5d4607}
        .method{border:1px solid var(--line);border-radius:18px;padding:16px}.methodTop{display:flex;justify-content:space-between;gap:10px}.methodTop b{display:block;font-size:17px}.methodTop span{display:block;font-size:12px;color:var(--muted);margin-top:3px}.pill{background:#e5f4eb;color:#17623e;font-size:11px;font-weight:900;border-radius:999px;padding:6px 8px}.qr{display:block;width:min(100%,430px);height:auto;margin:16px auto;border-radius:14px}.bank{display:grid;gap:8px;background:#f6f8f6;border-radius:13px;padding:12px}.bank b{display:block;margin-top:2px;font-size:14px;word-break:break-word}.hint{font-size:12px;color:var(--muted);line-height:1.5;margin:10px 2px 0}.or{display:flex;align-items:center;gap:10px;color:#87938c;font-size:12px;margin:17px 0}.or:before,.or:after{content:"";height:1px;background:var(--line);flex:1}.paypal,.receipt{display:flex;align-items:center;justify-content:center;text-decoration:none;border-radius:14px;padding:14px 16px;font-weight:900}.paypal{background:#083b78;color:white}.receipt{margin-top:12px;background:#1f9d58;color:white}.lock,.footer{text-align:center;color:#64766c;font-size:12px;line-height:1.55}.lock{margin-top:12px}.footer{padding:18px 16px 0}
        @media(max-width:430px){.gvsPayWrap{padding:8px 8px 32px}.card{border-radius:18px}.hero h1{font-size:30px}.hero,.section{padding-left:17px;padding-right:17px}.numbers{grid-template-columns:1fr}.amount b{font-size:28px}}
      `}</style>
      <div className="brand"><b>GoVietStay</b><span>Trusted Local Support â€¢ Vietnam</span></div>
      <article className="card">
        <header className="hero">
          <div className="safe">ðŸ”’ Secure booking payment</div><h1>{title}</h1>
          <p>{paid ? "This payment request has been marked as received." : active ? "Choose VietQR or PayPal below." : `This payment link is ${data.link.status}. Please contact GoVietStay for a new link.`}</p>
          <div className={`status ${paid ? "paid" : ""}`}>{String(data.link.status).toUpperCase()}</div>
        </header>
        <section className="section">
          <div className="bookingCode">{data.booking.booking_code}</div><div className="service">{data.booking.service_name}</div>
          <div className="meta">{data.booking.guest_name} â€¢ {dateText(data.booking.tour_date)} â€¢ {data.booking.pax} guest(s){data.booking.destination ? ` â€¢ ${data.booking.destination}` : ""}</div>
          <div className="numbers">
            <div className="num"><span>Booking total</span><b>{money(data.booking.total_vnd)}</b></div><div className="num"><span>Already received</span><b>{money(data.booking.received_vnd)}</b></div>
            <div className="num"><span>Remaining balance</span><b>{money(data.booking.remaining_vnd)}</b></div><div className="num"><span>Payment purpose</span><b>{String(data.link.purpose).replace(/_/g," ").toUpperCase()}</b></div>
          </div>
          <div className="amount"><span>Amount requested now</span><b>{money(data.link.amount_vnd)}</b></div>
        </section>
        {active && <section className="section">
          <div className="method"><div className="methodTop"><div><b>VietQR â€¢ MB Bank</b><span>Fastest for Vietnam bank apps</span></div><div className="pill">Recommended</div></div>
            <img className="qr" src={data.payment.vietqr_url} alt="VietQR payment QR" />
            <div className="bank"><div><span>Account</span><b>{data.payment.bank_account_name}</b></div><div><span>Account no.</span><b>{data.payment.bank_account_no}</b></div><div><span>Transfer reference</span><b>{data.payment.transfer_reference}</b></div></div>
            <p className="hint">The QR already contains the requested amount and booking reference. Please do not change the reference.</p>
          </div>
          {data.payment.paypal_url && <><div className="or">OR</div><a className="paypal" href={data.payment.paypal_url} target="_blank" rel="noopener noreferrer">Pay with PayPal</a></>}
          {data.payment.whatsapp_receipt_url && <a className="receipt" href={data.payment.whatsapp_receipt_url} target="_blank" rel="noopener noreferrer">I have paid â€” send receipt on WhatsApp</a>}
          <div className="lock">ðŸ” GoVietStay never asks for passwords, card PINs or OTP codes.</div>
        </section>}
      </article>
      <div className="footer">GoVietStay â€¢ Da Nang â€¢ Hoi An â€¢ Hue â€¢ Phu Quoc<br />Payment status is confirmed only after GoVietStay verifies receipt of funds.</div>
    </main>
  );
}