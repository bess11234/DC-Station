export type Illness = {
    name: string;
    // enum: ["กำลังรักษา", "รักษาหายแล้ว", "เรื้อรัง", "เฝ้าระวัง"]
    status: "Under treatment" | "Recovered" | "Chronic" | "Under surveillance";
}

type HealthHistories = {
    spayingStatus: boolean
    illnesses?: Illness[]
}

export type Animal = {
    _id: string
    name: string
    specie: "Dog" | "Cat" // Eng
    breed: string // Eng
    gender: "M" | "F" // Eng
    dob: string
    history?: string
    personalities: string[]
    healthHistories: HealthHistories
    images: string[]
    adoptionDate?: string
    createdAt: string
}

export type Knowledge = {
    _id: string,
    title: string
    image: string
    content: string
    createdAt: string
}

type Requester = {
    idCard: string;
    phone: string;
    fb: string;
    experience: string;
    reason: string;
}

export type Request = {
    _id: string;
    requester: Requester;
    animal: string;
}