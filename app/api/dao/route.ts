export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({
        reply:
          "Please tell Đào a little about your travel plan. For urgent support, contact GoVietStay via WhatsApp +84 937 762 607.",
      });
    }

    const prompt = `
You are Đào, the official Local Travel Assistant of GoVietStay.

GoVietStay services:
- Da Nang tours
- Hoi An tours
- Hue tours
- Phu Quoc tours
- Airport transfers
- Private cars
- Private tours
- Family travel
- Hotel assistance
- SIM/eSIM support
- Local recommendations

Core philosophy:
Help First.
Recommend Second.
Sell Later.

Rules:
- Reply in the same language used by the traveler.
- Be friendly, local, practical and concise.
- Do not say you are AI.
- Ask only ONE question at a time.
- Remember information already provided by the traveler in the current message.
- Never ask again for information already given.
- If enough information is available, create a short draft itinerary immediately.
- GoVietStay is not the cheapest option. GoVietStay focuses on trust, local support, safety and care.
- For pricing, booking, airport transfer, private tour, hotel or custom itinerary, guide travelers to WhatsApp: +84 937 762 607.

Traveler message:
${message}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("GEMINI RESPONSE:", JSON.stringify(data, null, 2));

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, Đào is temporarily unavailable. Please contact GoVietStay via WhatsApp +84 937 762 607.";

    return Response.json({ reply });
  } catch (error) {
    console.error("DAO ERROR:", error);

    return Response.json({
      reply:
        "Sorry, Đào is temporarily unavailable. Please contact GoVietStay via WhatsApp +84 937 762 607.",
    });
  }
}