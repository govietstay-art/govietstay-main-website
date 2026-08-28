import QRCode from "qrcode";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const data = (url.searchParams.get("data") || "").trim();
    if (!data || data.length > 1800) return new Response("Invalid QR data", {status:400});

    const svg = await QRCode.toString(data, {
      type:"svg",
      errorCorrectionLevel:"M",
      margin:2,
      width:512
    });

    const download = url.searchParams.get("download")==="1";
    return new Response(svg,{
      status:200,
      headers:{
        "Content-Type":"image/svg+xml; charset=utf-8",
        "Cache-Control":"public, max-age=300",
        ...(download?{"Content-Disposition":'attachment; filename="govietstay-partner-qr.svg"'}:{})
      }
    });
  } catch {
    return new Response("Unable to create QR",{status:500});
  }
}
