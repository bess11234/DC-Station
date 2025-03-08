import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to handle file uploads
  },
};

export async function POST(req: NextRequest) {
  try {
    const { images, filename, folder } = await req.json();

    if (!images[0].startsWith("data:image/")) {
        return NextResponse.json(
            { error: "Invalid image format" },
            { status: 400 }
        );
    }
    
    // Save all Files Images
    // **Need to create folder location that will be saved.**
    const filePaths = []
    for (let index = 0; index < images.length; index++) {
      const element = await saveFileBase64(images[index], folder, filename[index]);
      filePaths.push(element)
    }

    return NextResponse.json({ url: filePaths });
  } catch (error) {
    return NextResponse.json({ error: `Upload failed: ${error}` }, { status: 500 });
  }
}

async function saveFileBase64(image: string, folder: string, file: string) {
  const base64Data = image.split(",")[1]; // Remove the header
  const buffer = Buffer.from(base64Data, "base64");

  const fileName = `${Date.now()}.${file.replace("jpeg", "jpg")}`;
  const filePath = path.join(process.cwd(), `image_dynamic/${folder}`, fileName);

  await writeFile(filePath, buffer);
  return `/${folder}/${fileName}`;
}
