import { redirect } from "next/navigation";

export interface State {
    message?: string;
    errors?: string;
}

export async function createAnimal(mainImage: File | null, extraImages: File[], prevState: State, formData: FormData){
    // Create Animal

    // Upload images animal
    if (mainImage){
        extraImages = [mainImage, ...extraImages]
    }
    const readers = extraImages.map((file) => {
        return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            });
        });

    const base64Images = await Promise.all(readers)
    
    const response = await fetch("/api/uploadImages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({images: base64Images})
    })

    if (!response.ok){
        return {
            message: "Failed to Upload.",
            errors: ""
        }
    }

    redirect("/dashboard/animals")
}
