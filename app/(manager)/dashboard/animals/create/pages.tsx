import type { Animal } from "@/app/lib/definition"

export function createAnimal() {
    const animal: Animal = {
        breed: "",
        createAt: "",
        dob: "",
        gender: "M",
        healthHistories: {
            spayingStatus: false,
            illeness: []
        },
        history: "",
        images: [],
        name: "",
        personalities: [],
        specie: "Dog",
        adoptionDate: ""
    }
    return (
        <section className="w-full">
            <div className="flex flex-col gap-3 w-full place-items-center py-8">
                {/* Title Content */}
                <p className="md:text-5xl sm:text-4xl text-3xl text-center py-3">เพิ่มสัตว์</p>

                {/* Animal Information */}
                <div className="grid gap-3 p-3 xl:min-w-[1000px] max-w-[1000px] w-full sm:mx-16 mx-8">

                    {/* Data */}
                    <EditingData animal={animal} />

                </div>

            </div>
        </section>
    )
}