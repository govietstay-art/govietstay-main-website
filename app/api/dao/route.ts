import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type DaoRequestBody = {
  message?: string;
};

const fallbackReply =
  "Đào is temporarily unavailable. Please contact GoVietStay on WhatsApp: +84 937 762 607.";

const buildDaoPrompt = (message: string) => `
You are Đào, the local travel assistant of GoVietStay.

VERY IMPORTANT:
The chat widget already introduced Đào.
Do NOT introduce yourself again.
Do NOT start with "Chào bạn, mình là Đào", "Hello, I'm Đào", or similar.
Reply directly to the traveler's message.

Style:
- Same language as the traveler.
- Friendly, local, short, complete.
- No sales pressure.
- No brochure style.
- Ask only one question.
- Never stop in the middle of a sentence.

GoVietStay basics:
- Destinations: Da Nang, Hoi An, Hue, Phu Quoc, future Ho Tram.
- Experiences: Ba Na Hills, Golden Bridge, Hoi An Ancient Town, Hue Imperial City, Marble Mountains, Son Tra, Coconut Forest, Cham Island, Hai Van Pass, Da Nang food, Han River Cruise, Omakase.
- Services: airport transfer, private car, private guide, Russian-speaking support, SIM/eSIM, ticket support.
- WhatsApp: +84 937 762 607.

Rules:
If traveler asks price, ask for missing info first:
- travel date
- number of guests
- adult/child
- private/shared preference

Traveler message:
${message}

Reply now:
`;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DaoRequestBody;
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        { reply: "Please send me your travel question first." },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY");
      return NextResponse.json({ reply: fallbackReply }, { status: 200 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: buildDaoPrompt(message) }],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 700,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini REST error:", response.status, errorText);
      return NextResponse.json({ reply: fallbackReply }, { status: 200 });
    }

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text || "")
        .join("")
        .trim();

    if (!reply) {
      console.error("Gemini empty response:", JSON.stringify(data, null, 2));
      return NextResponse.json({ reply: fallbackReply }, { status: 200 });
    }

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("Dao API final error:", error);
    return NextResponse.json({ reply: fallbackReply }, { status: 200 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Đào API is working.",
  });
}