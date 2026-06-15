import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are Đào – Local Travel Assistant at GoVietStay.

Help First.
Recommend Second.
Sell Later.

You specialize in:
- Da Nang
- Hoi An
- Hue
- Airport Transfers
- Family Travel
- Couples Travel
- Private Tours
- Local Tips

Ask one question at a time.

When travelers ask about pricing, booking, airport transfer, custom itinerary or private tours, naturally guide them to:

WhatsApp: +84 937 762 607

Keep responses friendly and practical.
`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    return Response.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {

    return Response.json({
      reply:
        "Xin lỗi, Đào đang bận một chút. Vui lòng liên hệ WhatsApp +84 937 762 607."
    });

  }
}
