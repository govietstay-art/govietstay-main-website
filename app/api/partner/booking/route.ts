import { NextResponse } from "next/server";

export const runtime = "nodejs";

function clean(value: unknown, max = 800) { return String(value ?? "").trim().slice(0, max); }

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const record = {
      type: "partner_booking",
      createdAt: new Date().toISOString(),
      partnerCode: clean(body.partnerCode, 40).toUpperCase(),
      guestName: clean(body.guestName, 120),
      guestContact: clean(body.guestContact, 120),
      tourDate: clean(body.tourDate, 40),
      adults: clean(body.adults, 20),
      children: clean(body.children, 400),
      hotel: clean(body.hotel, 300),
      addon: clean(body.addon, 100),
      dietary: clean(body.dietary, 600),
      quotedPrice: clean(body.quotedPrice, 120),
      paymentStatus: clean(body.paymentStatus, 120),
      note: clean(body.note, 1200),
      source: clean(body.source, 100),
    };
    if (!record.partnerCode || !record.guestName || !record.guestContact || !record.tourDate || !record.adults || !record.hotel || !record.quotedPrice || !record.paymentStatus) return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });

    const webhook = process.env.GOVIETSTAY_PARTNER_WEBHOOK_URL;
    let synced = false;
    if (webhook) {
      const response = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(record), cache: "no-store" });
      synced = response.ok;
    }
    return NextResponse.json({ ok: true, synced });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
