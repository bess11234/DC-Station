import { redirect } from "next/navigation";
import { revalidateAnimals } from "./revalidate";

import { Animal } from "./definition";

import { z } from "zod";

export interface AnimalState {
  message?: string | null;
  errors?: {
    name?: string[];
    specie?: string[];
    breed?: string[];
    gender?: string[];
    dob?: string[];
    history?: string[];
    personalities?: string[];
    healthHistories?: string[];
    images?: string[];
    createdAt?: string[];
  };
}

const AnimalFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "กรุณากรอกชื่อ",
    })
    .trim(),
  specie: z.enum(["Dog", "Cat"], {
    invalid_type_error: "กรุณาเลือกประเภทสัตว์",
  }),
  breed: z
    .string({
      invalid_type_error: "กรุณาเลือกสายพันธ์ุ",
    })
    .trim(),
  gender: z.enum(["M", "F"], {
    invalid_type_error: "กรุณาเลือกเพศ",
  }),
  dob: z.string().date(),
  history: z.optional(z.string().trim()),
  personalities: z.array(z.string().trim(), {
    invalid_type_error: "กรุณากรอกอย่างน้อย 1 อุปนิสัย",
  }),
  healthHistories: z.object({
    spayingStatus: z.coerce.boolean(),
    illnesses: z.optional(
      z.array(
        z.object({
          name: z.string().trim(),
          status: z.enum([
            "Under treatment",
            "Recovered",
            "Chronic",
            "Under surveillance",
          ]),
        })
      )
    ),
  }),
  images: z.array(z.string()),
  knowledges: z.optional(z.array(z.string())),
});

export async function updateAnimal(
  mainImage: File | null,
  extraImages: File[],
  animal: Animal,
  prevState: AnimalState
) {
  // Upload images animal
  if (mainImage) {
    extraImages = [mainImage, ...extraImages];
  }

  if (extraImages) {
    // หากมีการเพิ่มรูปจะทำการอ่านไฟล์ และแปลงเป็น Base64
    const readers = extraImages.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
      });
    });

    const base64Images = await Promise.all(readers);

    const response = await fetch("/api/uploadImages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        images: base64Images,
        filename: extraImages.map((v) => v.type.replace("image/", "")),
      }),
    });

    if (response.ok) {
      const urls: string[] = (await response.json()).url;
      // Update Images
      if (mainImage) {
        animal.images[0] = urls[0];
        urls.shift();
      }
      animal.images.push(...urls);
    }

    const validateData = AnimalFormSchema.safeParse(animal);

    if (!validateData.success) {
      return {
        errors: validateData.error.flatten().fieldErrors,
        message: "Error: Missing some fields.",
      };
    }

    try {
      fetch(`http://localhost:5000/api/animals/${animal._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(animal),
      });
    } catch (error) {
      return {
        message: `Error: ${error}`,
      };
    }

    revalidateAnimals();
    redirect(`/dashboard/animals/`);
  }
}
