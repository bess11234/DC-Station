type HealthHistories = {
    spayingStatus: string;
    illeness?: []
}

export type Animal = {
    id: string;
    name: string;
    specie: "Dog" | "Cat";
    breed: string;
    gender: "Male" | "Female";
    dob: string;
    weight: number;
    history: string;
    personalities: string[];
    healthHistories: HealthHistories
    images: string[];
    adoptionDate?: string
}