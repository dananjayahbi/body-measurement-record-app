import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    // ✅ Correctly retrieve filename
    const { filename } = await params;

    if (!filename) {
      return NextResponse.json({ error: "Missing filename" }, { status: 400 });
    }

    // ✅ Construct full file path
    const filePath = path.join(process.cwd(), "public/assets", filename);

    // ✅ Check if the file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // ✅ Read the file
    const file = await fs.readFile(filePath);
    return new NextResponse(file, {
      headers: {
        "Content-Type": "image/png", // Adjust based on file type
        "Cache-Control": "no-store", // Prevent caching issues
      },
    });
  } catch (error) {
    console.error("Image Fetch Error:", error);
    return NextResponse.json({ error: "Failed to load image" }, { status: 500 });
  }
}
