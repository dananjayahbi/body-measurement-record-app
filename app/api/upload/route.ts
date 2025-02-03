import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const jsonData = JSON.parse(formData.get("data") as string); // Extract JSON data

    if (!file || !jsonData) {
      return NextResponse.json({ error: "Missing file or data" }, { status: 400 });
    }

    // Save image
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public/assets");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);
    const imageUrl = `/assets/${file.name}`;

    // ✅ Save measurement data in SQLite
    const newMeasurement = await prisma.measurement.create({
      data: { ...jsonData, imageUrl },
    });

    return NextResponse.json({ message: "Data saved successfully", newMeasurement });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ error: "File upload failed", details: errorMessage }, { status: 500 });
  }
}
