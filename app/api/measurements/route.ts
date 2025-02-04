import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {
      weight,
      chestWidth,
      shoulderWidth,
      waistWidth,
      leftArm,
      rightArm,
      leftWrist,
      rightWrist,
      leftForearm,
      rightForearm,
      leftThigh,
      rightThigh,
      imageUrl,
    } = await req.json();

    if (!weight || !chestWidth || !shoulderWidth || !waistWidth) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newMeasurement = await prisma.measurement.create({
      data: {
        weight,
        chestWidth,
        shoulderWidth,
        waistWidth,
        leftArm,
        rightArm,
        leftWrist,
        rightWrist,
        leftForearm,
        rightForearm,
        leftThigh,
        rightThigh,
        imageUrl,
      },
    });

    return NextResponse.json(newMeasurement, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save data", details: error }, { status: 500 });
  }
}

// Fetch all measurements (for history display)
export async function GET() {
  try {
    const measurements = await prisma.measurement.findMany({
      orderBy: { date: "desc" },
    });

    return NextResponse.json(measurements);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data", details: error }, { status: 500 });
  }
}

// Update a record
export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const jsonData = JSON.parse(formData.get("data") as string);
    const file = formData.get("file") as File | null;

    if (!id) {
      return NextResponse.json({ error: "Missing record ID" }, { status: 400 });
    }

    // Get existing record
    const existingRecord = await prisma.measurement.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    let imageUrl = existingRecord.imageUrl;

    // Handle new image upload
    if (file) {
      // Delete the old image
      if (imageUrl) {
        const oldImagePath = path.join(process.cwd(), "public", imageUrl);
        await unlink(oldImagePath).catch(() => {});
      }

      // Save the new image
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public/assets");
      await mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, file.name);
      await writeFile(filePath, buffer);
      imageUrl = `/assets/${file.name}`;
    }

    // Update the record, including the date
    const updatedMeasurement = await prisma.measurement.update({
      where: { id },
      data: {
        ...jsonData,
        imageUrl,
        date: jsonData.date ? new Date(jsonData.date) : existingRecord.date, // ✅ Ensure date updates
      },
    });

    return NextResponse.json(updatedMeasurement);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update data", details: error.message }, { status: 500 });
  }
}

// Delete a record
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    // Get the record first
    const record = await prisma.measurement.findUnique({
      where: { id },
    });

    if (!record) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    // Delete the image file if it exists
    if (record.imageUrl) {
      const filePath = path.join(process.cwd(), "public", record.imageUrl);
      await unlink(filePath).catch(() => {}); // Ignore errors if the file does not exist
    }

    // Delete the record from DB
    await prisma.measurement.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Record deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete data", details: (error as Error).message }, { status: 500 });
  }
}