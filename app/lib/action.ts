import { redirect } from "next/navigation";
import { Animal } from "./definition";
import { z } from "zod";
import { error } from "console";
import { METHODS } from "http";

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
      body: JSON.stringify({ images: base64Images }),
    });

    if (response.ok) {
      // Update Images
      animal.images.push(...(await response.json()).url);
    }
  }

  const validateData = AnimalFormSchema.safeParse(animal);

  console.log(validateData.data);

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

  redirect("/dashboard/animals");
}


// export
const RequestFormSchema = z.object({
  id: z.string(),
  idCard: z.string({
    invalid_type_error: "กรุรากรอกรหัสบัตรประชาชน"
  }),
  phone: z.string({
    invalid_type_error: "กรุณากรอกหมายเลขโทรศัพท์"
  }),
  fd: z.string({
    invalid_type_error: "กรุณาใส่ชื่อหรือลิงค์เฟซบุ๊ค"
  }),
  experience: z.string(),
  reason: z.string({
    invalid_type_error: "กรุณาระบุเหตุผลการรับเลี้ยง"
  }),
  animal: z.string()
})

const CreateRequest = RequestFormSchema.omit({ id: true, animal: true})

export type RequestState = {
  errors?: {
    idCard?: string[];
    phone?: string[];
    fd?: string[];
    reason?: string[];
  };
  message?: string | null;
}

export async function createInvoice(preState: RequestState, formData: FormData) {
  const validateFields = CreateRequest.safeParse({
    idCard: formData.get(''),
    phone: formData.get(''),
    fb: formData.get(''),
    reason: formData.get(''),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'กรอกข้อมูลไม่ครบถ้วน ไม่สามารถสร้างคำขอรับเลี้ยงได้.'
    }
  }

  // Prepare data for insertion to database
  const {idCard, phone, fd, reason} = validateFields.data;

  try{
    fetch(`http://localhost:5000/api/requests`), {
      method: "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(),
    }
  }catch(error){
    return {
      message: `Error ${error}`
    }
  }
  
}

// } 
// export async function addRequest(formData: FormData){
//   const { requestId, idCard, phone}
// }
