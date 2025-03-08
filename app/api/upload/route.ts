import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("images") as File[]; // Get multiple files

    // CKEditor sends a single file with the key "upload"
    const ckFile = formData.get("upload") as File | null;

    if (!files.length && !ckFile) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    // Function to save a file
    const saveFile = async (file: File, folder: string) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(process.cwd(), `images_dynamic/${folder}`, fileName);

      await writeFile(filePath, buffer);

      return `/${folder}/${fileName}`;
    };

    // If CKEditor is uploading
    if (ckFile) {
      const ckUrl = await saveFile(ckFile, "uploads");
      return NextResponse.json({ url: ckUrl }); // CKEditor expects `{ url: "..." }`
    }

    // If it's a regular form upload
    const uploadedUrls = await Promise.all(
      files.map((v) => saveFile(v, "temp"))
    );
    return NextResponse.json({
      message: "Upload successful",
      urls: uploadedUrls,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
