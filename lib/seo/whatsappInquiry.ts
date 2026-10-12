/** Shared public enquiry deep link. The sender reviews the prefilled message before sending. */
const WHATSAPP_NUMBER = "84937762607";
const BASE = `https://wa.me/${WHATSAPP_NUMBER}`;
export function buildWhatsappInquiryUrl(message?: string): string {
  const text = message?.trim();
  return text ? `${BASE}?text=${encodeURIComponent(text)}` : BASE;
}
