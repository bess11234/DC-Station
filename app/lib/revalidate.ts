"use server";
import { revalidateTag } from "next/cache";

export async function revalidateCustom(tags: string) {
  revalidateTag(tags);
}