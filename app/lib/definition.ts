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
    knowledges: string[]
    adoptionDate?: string
    createdAt?: string
    updatedAt?: string
}

export type AnimalKnowledges = Omit<Animal, "knowledges"> & {knowledges: Knowledge[]}

export type Knowledge = {
    _id: string,
    title: string
    image: string
    describe: string
    content: string
    createdAt: string
}

type Requester = {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    fb: string;
    experience: string;
    reason: string;
}

export type Request = {
    _id: string;
    requester: Requester;
    status: "Pending" | "Accepted" | "Rejected";
    createdAt: string;
    animal: string;
}

export interface AnimalRequest {
    _id: string;
    name: string;
    images: string[];
    createdAt: string;
    totalPending: number;
    totalRejected: number;
}