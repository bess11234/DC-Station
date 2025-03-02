import { Metadata } from "next"

import type { Animal } from "@/app/lib/definition"

import { CreateAnimal } from "@/app/components/(manager)/animals/CreateAnimal"
import { fetchKnowledges } from "@/app/lib/data"

export const metadata: Metadata = {
    title: "Dashboard Animal Create"
}

export default async function AnimalCreate() {
    const animal: Animal = {
        _id: "",
        breed: "",
        dob: "",
        gender: "M",
        healthHistories: {
            spayingStatus: false,
            illnesses: []
        },
        history: "",
        images: [],
        name: "",
        personalities: [],
        specie: "Dog",
        adoptionDate: "",
        knowledges: [],
    }

    const knowledges = await fetchKnowledges()
    return (
        <section className="w-full">
            <div className="flex flex-col gap-3 w-full place-items-center py-8">
                {/* Title Content */}
                <p className="md:text-5xl sm:text-4xl text-3xl text-center py-3">เพิ่มสัตว์</p>

                {/* Animal Information */}
                <div className="grid gap-3 p-3 xl:min-w-[1000px] max-w-[1000px] w-full sm:mx-16 mx-8">

                    {/* Data */}
                    <CreateAnimal animal={animal} knowledges={knowledges} />

                </div>

            </div>
        </section>
    )
}