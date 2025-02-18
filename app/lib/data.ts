import type { Animal, Knowledge } from "./definition";
export const animals: Animal[] = [
  {
    id: "60a9ee09c52da790cd36f01698d44028ee8b8a34d60caa95eec1c7294535bc96e8e50298ac5e1c03",
    images: [
      "/animals/bo.webp",
      "/animals/bo2.webp",
      "/animals/bo3.webp",
      "/animals/bo4.webp",
      "/animals/bo5.webp",
    ],
    name: "น้องโบ",
    personalities: ["ซุกซน", "น่ารัก", "ชอบวิ่งเล่น", "เจ้าเล่ห์"],
    breed: "โนวา สก๊อตเทีย ดั๊ก โทริ่ง รีทริฟเวอร์",
    dob: "2024/12/30",
    gender: "M",
    healthHistories: {
      spayingStatus: true,
      illeness: [{ name: "มะเร็ง", status: "Under treatment" }],
    },
    history: "เกือบเป็นซอยจุ๊ให้คนจีน",
    specie: "Dog",
    createAt: "12/15/2024",
  },
  {
    id: "3c1a5dfb810778868dcad0571c54f3352c2aa01166ae568ad4f3281909329415044ae4e2c7897012",
    images: [
      "/animals/nam_tan.webp",
      "/animals/bo2.webp",
      "/animals/bo3.webp",
      "/animals/bo4.webp",
      "/animals/bo5.webp",
    ],
    name: "น้องน้ำตาล",
    personalities: ["สงบเสงี่ยม", "ชอบให้กอด", "ให้จับเฉพาะคนที่ชอบมาจับ"],
    breed: "Persian",
    dob: "2021/12/30",
    gender: "M",
    healthHistories: {
      spayingStatus: true,
      illeness: [{ name: "มะเร็ง", status: "Under treatment" }],
    },
    history: "เกือบเป็นซอยจุ๊ให้คนจีน",
    specie: "Cat",
    createAt: "12/15/2024",
  },
  {
    id: "2d39fe18927d4ab7b9fcbd1e872a67dc58fa293a882886357915757db2e7588aa333569e10ba915f",
    images: [
      "/animals/num.webp",
      "/animals/bo2.webp",
      "/animals/bo3.webp",
      "/animals/bo4.webp",
      "/animals/bo5.webp",
    ],
    name: "น้องนุ่น",
    personalities: ["น่ารัก", "ขี้อ้อน", "ชอบให้ลูบ"],
    breed: "Siamese",
    dob: "2021/12/30",
    gender: "F",
    healthHistories: {
      spayingStatus: false,
      illeness: [{ name: "มะเร็ง", status: "Under treatment" }],
    },
    history: "เกือบเป็นซอยจุ๊ให้คนจีน",
    specie: "Cat",
    createAt: "12/15/2024",
  },
  {
    id: "2d39fe18927d4ab7b9fcbd1e872a67dc58fa293a882886357915757db2e7588aa333569e10ba915f",
    images: [
      "/animals/num.webp",
      "/animals/bo2.webp",
      "/animals/bo3.webp",
      "/animals/bo4.webp",
      "/animals/bo5.webp",
    ],
    name: "น้องนุ่น",
    personalities: ["น่ารัก", "ขี้อ้อน", "ชอบให้ลูบ"],
    breed: "Siamese",
    dob: "2021/12/30",
    gender: "F",
    healthHistories: {
      spayingStatus: false,
      illeness: [{ name: "มะเร็ง", status: "Under treatment" }],
    },
    history: "เกือบเป็นซอยจุ๊ให้คนจีน",
    specie: "Cat",
    createAt: "12/15/2024",
  },
  {
    id: "2d39fe18927d4ab7b9fcbd1e872a67dc58fa293a882886357915757db2e7588aa333569e10ba915f",
    images: [
      "/animals/num.webp",
      "/animals/bo2.webp",
      "/animals/bo3.webp",
      "/animals/bo4.webp",
      "/animals/bo5.webp",
    ],
    name: "น้องนุ่น",
    personalities: ["น่ารัก", "ขี้อ้อน", "ชอบให้ลูบ"],
    breed: "Siamese",
    dob: "2021/12/30",
    gender: "F",
    healthHistories: {
      spayingStatus: true,
      illeness: [{ name: "มะเร็ง", status: "Under treatment" }],
    },
    history: "เกือบเป็นซอยจุ๊ให้คนจีน",
    specie: "Cat",
    createAt: "12/15/2024",
  },
];

export const gallery = [
  { src: "image0.webp", alt: "Clarity for pets." },
  { src: "image1.webp", alt: "Stray cats needed for housing." },
  { src: "image2.webp", alt: "Stray dogs needed for housing." },
];


// Show Animals Data
export async function fetchAnimal(): Promise<Animal[]>{
    const response = await fetch('http://localhost:5000/api/animals')
    if (!response.ok){
        throw new Error("Fetch: Failed")
    }
    return await response.json()
}

// ________________________________Knowledge

export const knowledge: Knowledge[] = [
  {
    id: "1",
    title: "เหตุผลที่เราต้องมีสัตว์เลี้ยง บท:ความเห็นอกเห็นใจ",
    image: "/knowledges/empathy",
    content: "การเลี้ยงสัตว์เลี้ยงเป็นการฝึกอะไรหลาย ๆ อย่างในตัวของมนุษย์ ไม่ว่าจะเป็นเรื่องของความรับผิดชอบ การจัดสรรเวลา ระเบียบวินัย และความใส่ใจ แต่อีกสิ่งหนึ่งที่สำคัญซึ่งจะพัฒนาขึ้นมาในจิตใจของคุณโดยที่ไม่รู้ตัว นั่นคือความเห็นอกเห็นใจและความอ่อนโยนต่อสิ่งมีชีวิต ซึ่งเป็นสิ่งที่ยากจะเรียนรู้และโลกใบนี้ต้องการจากมนุษย์เป็นอย่างมาก",
    createAt: "12/15/2024",
  }
];

export async function fetchKnowledge(): Promise<Knowledge[]>{
  const response = await fetch('http://localhost:5000/api/knowledges')
  if (!response.ok){
      throw new Error("Fetch: Failed")
  }
  return await response.json()
}
