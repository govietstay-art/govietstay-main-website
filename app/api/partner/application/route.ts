import { NextResponse } from "next/server";

export const runtime = "nodejs";

function clean(value: unknown, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function createPartnerCode(name: string) {
  const initials = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, " ").split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() || "X").join("") || "RU";
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `GV-${initials}-${date}-${random}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const record = {
      type: "partner_application",
      createdAt: new Date().toISOString(),
      partnerCode: createPartnerCode(clean(body.name, 100)),
      name: clean(body.name, 120),
      country: clean(body.country, 80),
      city: clean(body.city, 100),
      contact: clean(body.contact, 120),
      social: clean(body.social, 250),
      monthlyTours: clean(body.monthlyTours, 80),
      experience: clean(body.experience, 1200),
      audience: clean(body.audience, 1200),
      source: clean(body.source, 100),
    };
    if (!record.name || !record.country || !record.city || !record.contact) return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });

    const webhook = process.env.GOVIETSTAY_PARTNER_WEBHOOK_URL;
    let synced = false;
    if (webhook) {
      const response = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(record), cache: "no-store" });
      synced = response.ok;
    }
    return NextResponse.json({ ok: true, partnerCode: record.partnerCode, synced });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
