export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const fallbackReply =
      "Đào đang tạm quá tải một chút ạ. Anh/chị vui lòng thử lại sau ít phút, hoặc liên hệ GoVietStay qua WhatsApp/Zalo +84 937 762 607 để được hỗ trợ nhanh hơn.";

    if (!message) {
      return Response.json({
        reply:
          "Anh/chị cho Đào biết một chút về kế hoạch chuyến đi nhé. Nếu cần hỗ trợ nhanh, vui lòng liên hệ GoVietStay qua WhatsApp/Zalo +84 937 762 607.",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("CONFIG ERROR: GEMINI_API_KEY is missing.");

      return Response.json({
        reply: fallbackReply,
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
- Remember information already provided by the traveler.
- Never ask again for information already given.
- If enough information is available, create a draft itinerary immediately.
- GoVietStay focuses on trust, local support, safety and care.
- For pricing, booking, airport transfer, private tour, hotel or custom itinerary, guide travelers to WhatsApp/Zalo: +84 937 762 607.

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

    if (!response.ok) {
      console.error("GEMINI ERROR:", JSON.stringify(data, null, 2));

      return Response.json({
        reply: fallbackReply,
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || fallbackReply;

    return Response.json({ reply });
  } catch (error: any) {
    console.error("DAO ERROR:", error);

    return Response.json({
      reply:
        "Đào đang tạm quá tải một chút ạ. Anh/chị vui lòng thử lại sau ít phút, hoặc liên hệ GoVietStay qua WhatsApp/Zalo +84 937 762 607 để được hỗ trợ nhanh hơn.",
    });
  }
}