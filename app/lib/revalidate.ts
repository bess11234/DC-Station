"use server";
import { revalidateTag } from "next/cache";

export async function revalidateCustom(tags: string) {
  revalidateTag(tags);
}

export async function revalidateAnimals() {
  revalidateTag("animals"); // ✅ Runs on the server
}
