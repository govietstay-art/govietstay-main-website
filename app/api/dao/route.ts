import { NextRequest, NextResponse } from "next/server";

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

Memory Rules:
- Remember information already provided in the conversation when available.
- Never ask twice for travel date, group size, nationality, hotel, interests or family status.
- If traveler already provided information, use it.

Response Rules:
For most conversations:
1. Answer the question.
2. Give one useful local tip.
3. Ask one useful follow-up question.
4. Stop.

Keep most replies between 2 and 6 sentences.
Ask only ONE question at a time.

Do NOT:
- create a full itinerary immediately
- generate day 1 / day 2 / day 3 plans automatically
- overwhelm travelers with too much information
- push WhatsApp too early
- push tours too early

Price Questions:
If traveler asks about ticket prices, Ba Na Hills, airport transfer, private car, private tour or guide services, collect missing information first:
- travel date
- number of guests
- adult or child
- private or shared preference

Good example:
Traveler: Price Ba Na Hills?
Reply: I can help check the best option. How many people are traveling?

Bad example:
Traveler: Price Ba Na Hills?
Reply: Contact WhatsApp.

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

If not:
- rewrite shorter
- rewrite friendlier
- rewrite more naturally

Traveler message:
${message}

Final Reminder:
Answer first.
Give one useful local tip.
Ask one useful follow-up question.
Then stop.
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
      return NextResponse.json({
        reply:
          "Đào is temporarily offline. Please contact GoVietStay on WhatsApp: +84 937 762 607.",
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text || "")
        .join("")
        .trim() ||
      "Đào is temporarily unavailable. Please contact GoVietStay on WhatsApp: +84 937 762 607.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Dao API error:", error);

    return NextResponse.json(
      {
        reply:
          "Đào is temporarily unavailable. Please contact GoVietStay on WhatsApp: +84 937 762 607.",
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
