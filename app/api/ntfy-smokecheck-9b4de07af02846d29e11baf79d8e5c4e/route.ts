import { NextResponse } from "next/server";

/** One-time Preview-only connectivity check. Delete immediately after use. */
export async function GET() {
  if (process.env.VERCEL_ENV !== "preview") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  try {
    const response = await fetch("https://ntfy.sh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: "gvs-inbox-a3fb05701634041bb1f72e25829c20862175b24cde519272",
        title: "GoVietStay - Kiem tra thong bao",
        message: "Day la thong bao THU NGHIEM, khong phai booking that. Neu thay tin nay, dien thoai da ket noi thanh cong.",
        priority: 4,
        tags: ["white_check_mark"],
        click: "https://www.govietstay.com/admin"
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store"
    });
    if (!response.ok) {
      console.warn("ntfy smoke check HTTP", response.status);
      return NextResponse.json({ ok: false, status: response.status }, { status: 502 });
    }
    return NextResponse.json({ ok: true, published: true, note: "No customer data sent" }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ ok: false, error: "notification service unavailable" }, { status: 503 });
  }
}
