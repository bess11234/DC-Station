import { notFound } from "next/navigation";
import type { Animal, Knowledge, Request } from "./definition";

type Response<T> = {
  status: string;
  message: T;
};

// <---------------------------- Animal ---------------------------->
// Show Animals Data
export async function fetchAnimals(
  skip: number = 0,
  limit: number = 0
): Promise<Animal[]> {
  const response = await fetch(
    `http://localhost:5000/api/animals?skip=${skip}&limit=${limit}`,
    {
      next: { tags: ["animals"] },
    }
  );
  if (!response.ok) {
    const data = await response.json();
    if (response.status == 404) return data.message;
    throw new Error(`${response.status} ${data.message}`);
  }
  const data: Response<Animal[]> = await response.json();
  return data.message;
}

// Show Animal Data from ID
export async function fetchAnimalId(id: string): Promise<Animal> {
  const response = await fetch(`http://localhost:5000/api/animals/${id}`, {
    next: { tags: ["animals"] },
  });
  // หากไม่ Status: ok จะทำการส่งตัวเปล่า
  if (!response.ok) {
    const data = await response.json();
    if (response.status == 404) return data.message;
    throw new Error(`${response.status} ${data.message}`);
  }
  const data: Response<Animal> = await response.json();
  return data.message;
}

// Show number of animals
export async function fetchAnimalCount(): Promise<number> {
  const response = await fetch(`http://localhost:5000/api/counts/animals`, {
    next: { tags: ["animals"] },
  })
  .catch((error) => {
    throw new Error(error)
  })

  const count = (await response.json()).message
  return count
}

// <---------------------------- Knowledge ---------------------------->

export const knowledge: Knowledge[] = [
  {
    _id: "1",
    title: "เหตุผลที่เราต้องมีสัตว์เลี้ยง บท:ความเห็นอกเห็นใจ",
    image: "/knowledges/empathy",
    content: "",
    describe:
      "การเลี้ยงสัตว์เลี้ยงเป็นการฝึกอะไรหลาย ๆ อย่างในตัวของมนุษย์ ไม่ว่าจะเป็นเรื่องของความรับผิดชอบ การจัดสรรเวลา ระเบียบวินัย และความใส่ใจ แต่อีกสิ่งหนึ่งที่สำคัญซึ่งจะพัฒนาขึ้นมาในจิตใจของคุณโดยที่ไม่รู้ตัว นั่นคือความเห็นอกเห็นใจและความอ่อนโยนต่อสิ่งมีชีวิต ซึ่งเป็นสิ่งที่ยากจะเรียนรู้และโลกใบนี้ต้องการจากมนุษย์เป็นอย่างมาก",
    createdAt: "12/15/2024",
  },
];

export async function fetchKnowledges(skip: number = 0, limit: number = 0): Promise<Knowledge[]> {
  const response = await fetch(`http://localhost:5000/api/knowledges?skip=${skip}&limit=${limit}`, {
    next: { tags: ["knowledges"] },
  });
  if (!response.ok) {
    if (response.status == 404) notFound();

    const data = await response.json();
    throw new Error(`${response.status} ${data.message}`);
  }
  const data: Response<Knowledge[]> = await response.json();
  return data.message;
}

export async function fetchKnowledgeId(id: string): Promise<Knowledge> {
  const response = await fetch(`http://localhost:5000/api/knowledges/${id}`, {
    next: { tags: ["knowledges"] },
  });
  if (!response.ok) {
    if (response.status == 404) notFound();

    const data = await response.json();
    throw new Error(`${response.status} ${data.message}`);
  }
  const data: Response<Knowledge> = await response.json();
  return data.message;
}

// Show number of knowledges
export async function fetchfetchKnowledgeCount(): Promise<number> {
  const response = await fetch(`http://localhost:5000/api/counts/knowledges`, {
    next: { tags: ["knowledges"] },
  })
  .catch((error) => {
    throw new Error(error)
  })

  const count = (await response.json()).message
  return count
}

// <---------------------------- Request ---------------------------->

export async function fetchRequest(): Promise<Knowledge[]> {
  const response = await fetch(`http://localhost:5000/api/requests`, {
    next: { tags: ["requests"] },
  });
  if (!response.ok) {
    if (response.status == 404) notFound();

    const data = await response.json();
    throw new Error(`${response.status} ${data.message}`);
  }
  const data: Response<Knowledge[]> = await response.json();
  return data.message;
}

// <---------------------------- Manager ---------------------------->
// <---------------------------- Animal
//// Animal request
export async function fetchAnimalRequest(id: string): Promise<Request[]> {
  const response = await fetch(
    `http://localhost:5000/api/requests/animalId/${id}`,
    {
      next: { tags: ["knowledges"] },
    }
  );
  if (!response.ok) {
    if (response.status == 404) notFound();

    const data = await response.json();
    throw new Error(`${response.status} ${data.message}`);
  }
  const data: Response<Request[]> = await response.json();
  return data.message;
}

export const animals: Animal[] = [
  {
    _id: "60a9ee09c52da790cd36f01698d44028ee8b8a34d60caa95eec1c7294535bc96e8e50298ac5e1c03",
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
      illnesses: [{ name: "มะเร็ง", status: "Under treatment" }],
    },
    history: "เกือบเป็นซอยจุ๊ให้คนจีน",
    specie: "Dog",
    createdAt: "12/15/2024",
    knowledges: [],
  },
  {
    _id: "3c1a5dfb810778868dcad0571c54f3352c2aa01166ae568ad4f3281909329415044ae4e2c7897012",
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
      illnesses: [{ name: "มะเร็ง", status: "Under treatment" }],
    },
    history: "เกือบเป็นซอยจุ๊ให้คนจีน",
    specie: "Cat",
    createdAt: "12/15/2024",
    knowledges: [],
  },
  {
    _id: "2d39fe18927d4ab7b9fcbd1e872a67dc58fa293a882886357915757db2e7588aa333569e10ba915f",
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
      illnesses: [{ name: "มะเร็ง", status: "Under treatment" }],
    },
    history: "เกือบเป็นซอยจุ๊ให้คนจีน",
    specie: "Cat",
    createdAt: "12/15/2024",
    knowledges: [],
  },
  {
    _id: "2d39fe18927d4ab7b9fcbd1e872a67dc58fa293a882886357915757db2e7588aa333569e10ba915f",
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
      illnesses: [{ name: "มะเร็ง", status: "Under treatment" }],
    },
    history: "เกือบเป็นซอยจุ๊ให้คนจีน",
    specie: "Cat",
    createdAt: "12/15/2024",
    knowledges: [],
  },
  {
    _id: "2d39fe18927d4ab7b9fcbd1e872a67dc58fa293a882886357915757db2e7588aa333569e10ba915f",
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
      illnesses: [{ name: "มะเร็ง", status: "Under treatment" }],
    },
    history: "เกือบเป็นซอยจุ๊ให้คนจีน",
    specie: "Cat",
    createdAt: "12/15/2024",
    knowledges: [],
  },
];

export const gallery = [
  { src: "image0.webp", alt: "Clarity for pets." },
  { src: "image1.webp", alt: "Stray cats needed for housing." },
  { src: "image2.webp", alt: "Stray dogs needed for housing." },
];
