type HealthHistories = {
    spayingStatus: string;
    illeness?: []
}

export type Animal = {
    id: string;
    name: string;
    specie: "Dog" | "Cat"; // Eng
    breed: string; // Eng
    gender: "M" | "F"; // Eng
    dob: string;
    history: string;
    personalities: string[];
    healthHistories: HealthHistories
    images: string[];
    adoptionDate?: string
}

export type Knowledge = {
    id: string,
    title: string,
    image: string,
    content: string,
}