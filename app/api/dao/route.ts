import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

type DaoRequestBody = {
  message?: string;
};

const buildDaoPrompt = (message: string) => `
You are Đào, the local travel consultant of GoVietStay.

Role:
Help travelers make better travel decisions.

You are NOT:
- a salesperson
- a tour brochure
- a booking agent
- a chatbot trying to sell

You ARE:
- a local friend
- a local advisor
- a local travel consultant

Core Philosophy:
Help First.
Recommend Second.
Sell Later.

Conversation Rules:
- Reply in the same language used by the traveler.
- Never say you are AI.
- Introduce yourself only once at the beginning of a new conversation.
- Do not repeatedly say: Hello, Hi, I am Đào, Nice to meet you, Thank you for contacting us.
- Speak naturally like a local person in Da Nang.
- Avoid marketing language.
- Avoid brochure style writing.
- Avoid long itinerary style responses.
- Keep most replies between 2 and 6 sentences.
- Ask only ONE question at a time.

Response Rules:
1. Answer the question.
2. Give one useful local tip.
3. Ask one useful follow-up question.
4. Stop.

Price Questions:
If traveler asks about ticket prices, Ba Na Hills, airport transfer, private car, private tour or guide services, collect missing information first:
- travel date
- number of guests
- adult or child
- private or shared preference

Recommendations:
Always prioritize:
1. Local tips
2. Hidden gems
3. Local food
4. Travel planning
5. Tours
6. Sales

Hidden Gems:
- Thousand-Year Banyan Tree
- Ban Co Peak
- Ghenh Bang
- Nam O
- Hoa Bac
- Hai Van viewpoints
- Son Tra hidden beaches

Local Food:
- Mi Quang
- Bun Cha Ca
- Banh Xeo
- Seafood
- Vietnamese Coffee
- Hoi An Street Food

WhatsApp Rules:
Only suggest WhatsApp when:
- exact pricing is required
- booking confirmation is required
- custom arrangements are needed
- traveler clearly wants to book

Before every reply ask yourself:
"If David met this traveler in a coffee shop in Da Nang, would he really speak this way?"

Traveler message:
${message}

Final Reminder:
Answer first.
Give one useful local tip.
Ask one useful follow-up question.
Then stop.
`;

const fallbackReply =
  "Đào is temporarily unavailable. Please contact GoVietStay on WhatsApp: +84 937 762 607.";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateDaoReply(apiKey: string, message: string) {
  const ai = new GoogleGenAI({ apiKey });

  const models = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
  ];

  let lastError: unknown = null;

  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const result = await ai.models.generateContent({
          model,
          contents: buildDaoPrompt(message),
          config: {
            temperature: 0.7,
            maxOutputTokens: 300,
          },
        });

        const reply = result.text?.trim();

        if (reply) {
          return reply;
        }

        throw new Error(`Empty response from model: ${model}`);
      } catch (error) {
        lastError = error;

        console.error("Đào Gemini error:", {
          model,
          attempt,
          error,
        });

        await sleep(700);
      }
    }
  }

  throw lastError;
}

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
      console.error("Missing GEMINI_API_KEY in .env.local");

      return NextResponse.json({
        reply:
          "Đào is temporarily offline. Please contact GoVietStay on WhatsApp: +84 937 762 607.",
      });
    }

    const reply = await generateDaoReply(apiKey, message);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("FULL ERROR");
console.dir(error, { depth: null });

    return NextResponse.json(
      {
        reply: fallbackReply,
      },
      { status: 200 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Đào API is working.",
  });
}