export type Illness = {
    name: string;
    // enum: ["กำลังรักษา", "รักษาหายแล้ว", "เรื้อรัง", "เฝ้าระวัง"]
    status: "Under treatment" | "Recovered" | "Chronic" | "Under surveillance";
}

type HealthHistories = {
    spayingStatus: boolean
    illeness?: Illness[]
}

export type Animal = {
    id: string
    name: string
    specie: "Dog" | "Cat" // Eng
    breed: string // Eng
    gender: "M" | "F" // Eng
    dob: string
    history: string
    personalities: string[]
    healthHistories: HealthHistories
    images: string[]
    adoptionDate?: string
    createdAt: string
}

export type Knowledge = {
    id: string,
    title: string
    image: string
    content: string
    createdAt: string
}