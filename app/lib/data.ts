import type { Animal } from "./definition";
import type { GalleryImage } from "../components/Carousel";
export const animals: Animal[] = [
  {
    id: "60a9ee09c52da790cd36f01698d44028ee8b8a34d60caa95eec1c7294535bc96e8e50298ac5e1c03",
    images: ["/animals/bo.webp", "/animals/bo2.webp", "/animals/bo3.webp", "/animals/bo4.webp", "/animals/bo5.webp"],
    name: "น้องโบ",
    personalities: ["ซุกซน", "น่ารัก", "ชอบวิ่งเล่น", "เจ้าเล่ห์"],
    breed: "โนวา สก๊อตเทีย ดั๊ก โทริ่ง รีทริฟเวอร์",
    dob: "2024/12/30",
    gender: "M",
    healthHistories: { spayingStatus: "หมันแล้ว" },
    history: "เกือบเป็นซอยจุ๊ให้คนจีน",
    specie: "Dog"
  },
  {
    id: "3c1a5dfb810778868dcad0571c54f3352c2aa01166ae568ad4f3281909329415044ae4e2c7897012",
    images: ["/animals/nam_tan.webp", "/animals/bo2.webp", "/animals/bo3.webp", "/animals/bo4.webp", "/animals/bo5.webp"],
    name: "น้องน้ำตาล",
    personalities: ["สงบเสงี่ยม", "ชอบให้กอด", "ให้จับเฉพาะคนที่ชอบมาจับ"],
    breed: "Persian",
    dob: "2021/12/30",
    gender: "M",
    healthHistories: { spayingStatus: "หมันแล้ว" },
    history: "เกือบเป็นซอยจุ๊ให้คนจีน",
    specie: "Cat"
  },
  {
    id: "2d39fe18927d4ab7b9fcbd1e872a67dc58fa293a882886357915757db2e7588aa333569e10ba915f",
    images: ["/animals/num.webp", "/animals/bo2.webp", "/animals/bo3.webp", "/animals/bo4.webp", "/animals/bo5.webp"],
    name: "น้องนุ่น",
    personalities: ["น่ารัก", "ขี้อ้อน", "ชอบให้ลูบ"],
    breed: "Siamese",
    dob: "2021/12/30",
    gender: "F",
    healthHistories: { spayingStatus: "หมันแล้ว" },
    history: "เกือบเป็นซอยจุ๊ให้คนจีน",
    specie: "Cat"
  },
];

export const gallery: GalleryImage[] = [
  { src: "image0.webp", alt: "Clarity for pets." },
  { src: "image1.webp", alt: "Stray cats needed for housing." },
  { src: "image2.webp", alt: "Stray dogs needed for housing." },
];

export async function fetchAnimal(): Promise<Animal[]>{
    const response = await fetch('http://localhost:5000/api/animals')
    if (!response.ok){
        throw new Error("Fetch: Failed")
    }
    return await response.json()
}