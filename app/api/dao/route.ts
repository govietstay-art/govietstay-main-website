import { NextRequest, NextResponse } from "next/server";
import { findDaoReply } from "@/lib/dao-patterns";

export const runtime = "nodejs";

type DaoRequestBody = {
  message?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DaoRequestBody;
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        { reply: "Please send me your travel question first.", intent: "empty" },
        { status: 400 },
      );
    }

    const result = findDaoReply(message);

    return NextResponse.json(
      {
        reply: result.reply,
        intent: result.intent,
        mode: "pattern",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Dao pattern API error:", error);

    return NextResponse.json(
      {
        reply:
          "I can help with Da Nang, Hoi An, Hue, tickets, transportation and local tips. For fast support, please contact GoVietStay on WhatsApp/Zalo: +84 937 762 607.",
        intent: "error",
        mode: "pattern",
      },
      { status: 200 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Đào V6 Pattern API is working. No AI API, no quota, no billing.",
  });
}
