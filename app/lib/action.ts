"use server"
import { redirect } from "next/navigation";
import { revalidateCustom } from "./revalidate";

import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// <--------------------ANIMALS----------------------->

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
//// CREATE REQUEST

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

//// DELETE REQUEST

export async function deleteRequest(id: string) {
  try {
    fetch(`http://localhost:5000/api/reques/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }

  revalidateCustom("requests");
  redirect(`/dashboard/requests/`);
}

// User Authenticate
export async function authenticate(prevState: string | undefined, formData: FormData){
  try {
    await signIn("credentials", formData)
  }catch(error){
    if (error instanceof AuthError){
      switch(error.type){
        case "CredentialsSignin":
          return "Invalid credentials."
        default:
          return "Something went wrong."
      }
    }
    throw error
  }
}