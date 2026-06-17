import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const folderPath = path.join(
      process.cwd(),
      "public",
      "happy-travelers"
    );

    const files = fs
      .readdirSync(folderPath)
      .filter((file) =>
        /\.(jpg|jpeg|png|webp)$/i.test(file)
      );

    return NextResponse.json(files);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Cannot load images" },
      { status: 500 }
    );
  }
}