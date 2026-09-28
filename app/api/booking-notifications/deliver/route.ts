import { NextRequest, NextResponse } from "next/server";

// The webhook payload contains only a random event ID and one-time bearer
// capability generated inside the restricted Supabase outbox. Never send PII.
export const runtime = "nodejs";
const SUPABASE_URL = "https://vscffgnxaexestnayvae.supabase.co";
const ANON_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzY2ZmZ254YWV4ZXN0bmF5dmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3MTM1MDcsImV4cCI6MjEwMzI4OTUwN30.FhrxtpFiodP-zxmANjNVh5Ujt_DXvNZNHJdHpZ0LxFk";
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

type BrokerResult = { topic?: string; kind?: string; lease_token?: string } | null;

async function rpc<T>(name: string, payload: object): Promise<{ ok: boolean; value: T | null; status: number }> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
      method: "POST",
      headers: { apikey: ANON_JWT, Authorization: `Bearer ${ANON_JWT}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    return { ok: res.ok, status: res.status, value: res.ok ? await res.json() as T : null };
  } catch {
    return { ok: false, status: 503, value: null };
  }
}

export async function POST(req: NextRequest) {
  // Fail closed for malformed inputs. This public URL is safe to invoke:
  // valid notification records require a random secret absent from GitHub.
  const length = Number(req.headers.get("content-length") || "0");
  if (length > 512) return NextResponse.json({ error: "invalid" }, { status: 413 });
  let event: { event_id?: unknown; event_token?: unknown };
  try {
    const raw = await req.text();
    if (raw.length > 512) throw Error("oversized");
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const id = typeof event?.event_id === "string" ? event.event_id : "";
  const token = typeof event?.event_token === "string" ? event.event_token : "";
  if (!uuid.test(id) || !uuid.test(token)) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const claim = await rpc<BrokerResult>("gvs_booking_push_claim", {
    p_event_id: id, p_event_token: token
  });
  if (!claim.ok) {
    console.warn("GoVietStay booking alert claim failed:", claim.status);
    return NextResponse.json({ error: "temporarily unavailable" }, { status: 503 });
  }
  const lease = claim.value?.lease_token;
  const topic = claim.value?.topic;
  if (typeof lease !== "string" || !uuid.test(lease) ||
      typeof topic !== "string" || !/^gvs-inbox-[a-f0-9]{48}$/.test(topic)) {
    // Already sent, being handled, or invalid random capability.
    return NextResponse.json({ accepted: false }, { status: 202 });
  }

  const kind = claim.value?.kind;
  const message = kind === "staff_intake" ? "Co yeu cau tu nhan vien cho duyet. Mo Admin de xem."
    : kind === "partner_booking" ? "Co booking tu doi tac can kiem tra. Mo Admin de xem."
    : kind === "system_test" ? "THU NGHIEM: ket noi thong bao booking GoVietStay."
    : "Co booking moi can kiem tra. Mo Admin de xem.";
  let delivered = false;
  let httpStatus = 0;
  try {
    const push = await fetch("https://ntfy.sh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic, title: "GoVietStay: booking moi",
        message, priority: 4, tags: ["bell"],
        click: "https://www.govietstay.com/admin",
        actions: [{ action: "view", label: "Mo Admin", url: "https://www.govietstay.com/admin" }]
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(7000)
    });
    delivered = push.ok;
    httpStatus = push.status;
  } catch {
    httpStatus = 503;
  }
  const ack = await rpc<boolean>("gvs_booking_push_ack", {
    p_event_id: id, p_event_token: token, p_lease_token: lease, p_delivered: delivered
  });
  if (!ack.ok || ack.value !== true) {
    console.warn("GoVietStay booking alert acknowledgement failed:", ack.status);
  }
  if (!delivered) {
    console.warn("GoVietStay booking alert delivery failed:", httpStatus);
    return NextResponse.json({ accepted: true, delivered: false }, { status: 503 });
  }
  console.info("GoVietStay generic booking alert delivered");
  return NextResponse.json({ accepted: true, delivered: true }, { headers: { "Cache-Control": "no-store" } });
}
