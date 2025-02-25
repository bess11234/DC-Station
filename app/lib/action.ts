import { redirect } from "next/navigation";
import { revalidateCustom } from "./revalidate";

import { Animal, Knowledge } from "./definition";
import { z } from "zod";

// <--------------------ANIMALS----------------------->
//// <--------------------CREATE & UPDATE ANIMAL----------------------->

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

export async function createAndUpdateAnimal(
  mainImage: File | null,
  extraImages: File[],
  animal: Animal,
  prevState: AnimalState
) {
  // หากเป็นการสร้าง Animal จะต้องใส่รูป MainImage ด้วย
  if (!animal._id && !mainImage) {
    return {
      message: "ต้องใส่รูปภาพหลักของสัตว์ด้วย",
    };
  }

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
        folder: "animals",
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
  }

  const validateData = AnimalFormSchema.safeParse(animal);

  if (!validateData.success) {
    return {
      errors: validateData.error.flatten().fieldErrors,
      message: "Error: Missing some fields.",
    };
  }

  try {
    // Update Animal
    if (animal._id) {
      fetch(`http://localhost:5000/api/animals/${animal._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validateData.data),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
    // Create Animal
    else {
      fetch(`http://localhost:5000/api/animals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validateData.data),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  } catch (error) {
    return {
      message: `Error: ${error}`,
    };
  }

  revalidateCustom("animals");
  redirect(`/dashboard/animals/`);
}

//// <--------------------DELETE ANIMAL----------------------->

export async function deleteAnimal(id: string) {
  try {
    fetch(`http://localhost:5000/api/animals/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }

  revalidateCustom("animals");
  redirect(`/dashboard/animals/`);
}

// <--------------------KNOWLEDGES----------------------->
export interface KnowledgeState {
  message?: string | null;
  errors?: {
    title?: string[];
    image?: string[];
    describe?: string[];
    content?: string[];
  };
}

const KnowledgeFormSchema = z.object({
  title: z.string({ invalid_type_error: "กรุณากรอกชื่อเรื่อง" }),
  image: z.string({ invalid_type_error: "กรุณาใส่รูปให้เกร็ดความรู้" }),
  describe: z.string({ invalid_type_error: "กรุณากรอกคำอธิบาย" }),
  content: z.string({ invalid_type_error: "กรุณาใส่เนื้อหา" }),
});
//// <--------------------CREATE & UPDATE KNOWLEDGE----------------------->
export async function createAndUpdateKnowledge(
  image: File | null,
  knowledge: Knowledge,
  prevState: KnowledgeState
) {
  if (!knowledge._id && !image) {
    return {
      message: "กรุณาใส่รูปให้เกร็ดความรู้",
    };
  }

  if (image) {
    const readers = [image].map((file) => {
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
        filename: [image].map((v) => v.type.replace("image/", "")),
        folder: "knowledges",
      }),
    });

    if (response.ok) {
      const urls: string[] = (await response.json()).url;
      // Update Images
      knowledge.image = urls[0];
    }
  }

  const validateData = KnowledgeFormSchema.safeParse(knowledge);

  if (!validateData.success) {
    return {
      errors: validateData.error.flatten().fieldErrors,
      message: "Error: Missing some fields.",
    };
  }

  try {
    // Update Animal
    if (knowledge._id) {
      fetch(`http://localhost:5000/api/knowledges/${knowledge._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validateData.data),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
    // Create Animal
    else {
      fetch(`http://localhost:5000/api/knowledges/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validateData.data),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  } catch (error) {
    return {
      message: `Error: ${error}`,
    };
  }

  revalidateCustom("knowledges");
  redirect(`/dashboard/knowledges/`);
}

//// <--------------------DELETE KNOWLEDGE----------------------->

export async function deleteKnowledge(id: string) {
  try {
    fetch(`http://localhost:5000/api/knowledges/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }

  revalidateCustom("knowledges");
  redirect(`/dashboard/knowledges/`);
}

// <--------------------REQUEST----------------------->
//// <--------------------CREATE REQUEST----------------------->

const RequestFormSchema = z.object({
  id: z.string(),
  idCard: z
    .string()
    .min(13, "กรุณากรอกรหัสบัตรประชาชนให้ครบถ้วน")
    .max(13, "กรุณากรอกรหัสบัตรประชาชนให้ครบถ้วน")
    .regex(/^\d+$/, "กรุณากรอกเฉพาะตัวเลข"),
  phone: z
    .string()
    .min(10, "กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน")
    .max(10, "กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน")
    .regex(/^\d+$/, "กรุณากรอกเฉพาะตัวเลข"),
  fb: z.string().min(1, "กรุณาใส่ชื่อหรือลิงค์เฟซบุ๊ค"),
  experience: z.string(),
  reason: z.string().min(1, "กรุณาระบุเหตุผลในการรับเลี้ยง"),
  animal: z.string(),
  accept: z.literal(true, {
    errorMap: () => ({ message: "กรุณายอมรับเงื่อนไข" }),
  }),
});

const CreateRequest = RequestFormSchema.omit({ id: true, animal: true });

export type RequestState = {
  errors?: {
    idCard?: string[];
    phone?: string[];
    fb?: string[];
    reason?: string[];
    accept?: string[];
  };
  message?: string | null;
};

export async function createRequest(
  preState: RequestState,
  formData: FormData
) {
  const animalId = formData.get("animalId") as string;

  const validateFields = CreateRequest.safeParse({
    idCard: formData.get("idCard"),
    phone: formData.get("phone"),
    fb: formData.get("fb"),
    experience: formData.get("experience"),
    reason: formData.get("reason"),
    accept: formData.has("accept"),
  });

  console.log(formData.has("accept"));

  if (!validateFields.success) {
    console.log(
      "Validation Errors:",
      validateFields.error.flatten().fieldErrors
    );
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "กรอกข้อมูลไม่ครบถ้วน ไม่สามารถสร้างคำขอรับเลี้ยงได้.",
    };
  }

  // Prepare data for insertion to database
  const { idCard, phone, fb, experience, reason } = validateFields.data;

  try {
    const response = await fetch(`http://localhost:5000/api/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requester: { idCard, phone, fb, experience, reason, animalId },
        animal: animalId,
      }),
    });

    if (!response.ok) throw new Error("Failed to send request");
    return {
      message: "ขอบคุณที่รับเลี้ยงหนู หวังว่าเราจะได้เป็นครอบครัวเดียวกัน",
    };
  } catch (error) {
    return {
      message: `Error ${error}`,
    };
  }
}
