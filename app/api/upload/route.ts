import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

// Ensure uploads directory exists in public
const uploadDir = path.join(process.cwd(), "public/uploads");

// Handle file upload
export async function POST(req: NextRequest) {
  try {
    // Ensure content-type is correct
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get("upload") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, filename);

    // Save file to /public/uploads/
    await writeFile(filePath, buffer);

    // Return URL for CKEditor
    return NextResponse.json({ url: `/uploads/${filename}` }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
