import { notFound } from "next/navigation";
import type { Animal, AnimalKnowledges, AnimalRequest, Knowledge, Request } from "./definition";

type Response<T> = {
  status: string;
  message: T;
};

// <---------------------------- Animal ---------------------------->
// Show All Animals
export async function fetchAnimals(
  skip: number = 0,
  limit: number = 0
): Promise<Animal[]> {
  const response = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/animals?skip=${skip}&limit=${limit}`,
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

// Show All Animals that have requests
export async function fetchAnimalRequests(
  skip: number = 0,
  limit: number = 0
): Promise<AnimalRequest[]> {
  const response = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/animals/have-request?skip=${skip}&limit=${limit}`,
    {
      next: { tags: ["animals", "requests"] },
    }
  );
  if (!response.ok) {
    const data = await response.json();
    if (response.status == 404) return data.message;
    throw new Error(`${response.status} ${data.message}`);
  }
  const data: Response<AnimalRequest[]> = await response.json();
  return data.message;
}

// Show Specific Animal
export async function fetchAnimalId(id: string): Promise<AnimalKnowledges> {
  const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/animals/id/${id}`, {
    next: { tags: ["animals"] },
  });
  // หากไม่ Status: ok จะทำการส่งตัวเปล่า
  if (!response.ok) {
    const data = await response.json();
    if (response.status == 404) return data.message;
    throw new Error(`${response.status} ${data.message}`);
  }
  const data: Response<AnimalKnowledges> = await response.json();
  return data.message;
}

// Show find house Animals
export async function fetchFindHouseAnimals(
  skip: number = 0,
  limit: number = 0
): Promise<Animal[]> {
  const response = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/animals/find-house?skip=${skip}&limit=${limit}`,
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

// Show found house Animals
export async function fetchFoundHouseAnimals(
  skip: number = 0,
  limit: number = 0
): Promise<Animal[]> {
  const response = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/animals/found-house?skip=${skip}&limit=${limit}`,
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

// Show number of animals
export async function fetchAnimalCount(): Promise<number> {
  const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/counts/animals`, {
    next: { tags: ["animals"] },
  }).catch((error) => {
    throw new Error(error);
  });

  const count = (await response.json()).message;
  return count;
}

// Show number of animal finding house
export async function fetchAnimalFindHouseCount(): Promise<number> {
  const response = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/counts/animals/find-house`,
    {
      next: { tags: ["animals"] },
    }
  ).catch((error) => {
    throw new Error(error);
  });

  const count = (await response.json()).message;
  return count;
}

// Show number of animal found house
export async function fetchAnimalFoundHouseCount(): Promise<number> {
  const response = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/counts/animals/found-house`,
    {
      next: { tags: ["animals"] },
    }
  ).catch((error) => {
    throw new Error(error);
  });

  const count = (await response.json()).message;
  return count;
}

// Show number of animal have request
export async function fetchAnimalRequestsCount(): Promise<number> {
  const response = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/counts/animals/have-request`,
    {
      next: { tags: ["animals"] },
    }
  ).catch((error) => {
    throw new Error(error);
  });

  const count = (await response.json()).message;
  return count;
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

// Show All Knowledge
export async function fetchKnowledges(
  skip: number = 0,
  limit: number = 0
): Promise<Knowledge[]> {
  const response = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/knowledges?skip=${skip}&limit=${limit}`,
    {
      next: { tags: ["knowledges"] },
    }
  );
  if (!response.ok) {
    if (response.status == 404) notFound();

    const data = await response.json();
    throw new Error(`${response.status} ${data.message}`);
  }
  const data: Response<Knowledge[]> = await response.json();
  return data.message;
}

// Show Specific Knowledge
export async function fetchKnowledgeId(id: string): Promise<Knowledge> {
  const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/knowledges/${id}`, {
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
export async function fetchKnowledgeCount(): Promise<number> {
  const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/counts/knowledges`, {
    next: { tags: ["knowledges"] },
  }).catch((error) => {
    throw new Error(error);
  });

  const count = (await response.json()).message;
  return count;
}

// <---------------------------- Request ---------------------------->

// Show All Request
export async function fetchRequest(
  skip: number = 0,
  limit: number = 0
): Promise<Request[]> {
  const response = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/requests?skip=${skip}&limit=${limit}`,
    {
      next: { tags: ["requests"] },
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

// Show Specific Request
export async function fetchRequestId(id: string): Promise<Request[]> {
  const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/request/${id}`, {
    next: { tags: ["requests"] },
  });
  if (!response.ok) {
    if (response.status == 404) notFound();

    const data = await response.json();
    throw new Error(`${response.status} ${data.message}`);
  }
  const data: Response<Request[]> = await response.json();
  return data.message;
}

// Show Number Of Requests
export async function fetchRequestCount(): Promise<number> {
  const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/counts/requests`, {
    next: { tags: ["requests"] },
  }).catch((error) => {
    throw new Error(error);
  });

  const count = (await response.json()).message;
  return count;
}

// Show number of pending requests
export async function fetchRequestPendingCount(): Promise<number> {
  const response = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/counts/requests/pending`,
    {
      next: { tags: ["requests"] },
    }
  ).catch((error) => {
    throw new Error(error);
  });

  const count = (await response.json()).message;
  return count;
}

// Show number of requests animal
export async function fetchRequestAnimalCount(id: string): Promise<number> {
  const response = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/counts/requests/animal/${id}`,
    {
      next: { tags: ["requests"] },
    }
  ).catch((error) => {
    throw new Error(error);
  });

  const count = (await response.json()).message;
  return count;
}

// Show number of pending requests animal
export async function fetchRequestPendingAnimalCount(
  id: string
): Promise<number> {
  const response = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/counts/requests/pending/${id}`,
    {
      next: { tags: ["requests"] },
    }
  ).catch((error) => {
    throw new Error(error);
  });

  const count = (await response.json()).message;
  return count;
}

// Show number of responsed requests animal
export async function fetchRequestResponsedAnimalCount(
  id: string
): Promise<number> {
  const response = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/counts/requests/responsed/${id}`,
    {
      next: { tags: ["requests"] },
    }
  ).catch((error) => {
    throw new Error(error);
  });

  const count = (await response.json()).message;
  return count;
}

// <---------------------------- Manager ---------------------------->
// <---------------------------- Request
// Show Request Specific Animal
export async function fetchRequestAnimal(id: string): Promise<Request[]> {
  const response = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/requests/animalId/${id}`,
    {
      next: { tags: ["requests"] },
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

// Show Request Specific Pending Animal
export async function fetchRequestAnimalPending(
  id: string,
  skip: number = 0,
  limit: number = 0
): Promise<Request[]> {
  const response = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/requests/pending/animalId/${id}?skip=${skip}&limit=${limit}`,
    {
      next: { tags: ["requests"] },
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

// Show Request Specific Pending Animal
export async function fetchRequestAnimalResponse(
  id: string,
  skip: number = 0,
  limit: number = 0
): Promise<Request[]> {
  const response = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/requests/responsed/animalId/${id}?skip=${skip}&limit=${limit}`,
    {
      next: { tags: ["requests"] },
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
