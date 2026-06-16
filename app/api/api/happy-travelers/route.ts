import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
]);

export const dynamic = "force-dynamic";

export async function GET() {
  const folder = path.join(process.cwd(), "public", "happy-travelers");

  try {
    if (!fs.existsSync(folder)) {
      return NextResponse.json({ photos: [] });
    }

    const photos = fs
      .readdirSync(folder)
      .filter((file) => {
        const extension = path.extname(file).toLowerCase();
        return ALLOWED_EXTENSIONS.has(extension);
      })
      .sort((a, b) => {
        const fileA = path.join(folder, a);
        const fileB = path.join(folder, b);
        return fs.statSync(fileB).mtimeMs - fs.statSync(fileA).mtimeMs;
      })
      .map((file) => `/happy-travelers/${encodeURIComponent(file)}`);

    return NextResponse.json({ photos });
  } catch (error) {
    console.error("Happy travelers gallery error:", error);
    return NextResponse.json({ photos: [] });
  }
}
