import { Metadata } from "next"
import { Suspense } from "react"

import { Animal } from "@/app/lib/definition"
import { fetchAnimal } from "@/app/lib/data"

import { AnimalsElement } from "@/app/components/animals/AnimalsElement"
import { FilterAnimals } from "@/app/components/animals/FilterAnimals"

export const metadata: Metadata = {
    title: "Find House"
}

export default async function FindHouse() {
    const animals: Animal[] = await fetchAnimal();
    const no_home = animals.filter(animal => animal.adoptionDate === null)
    return (
        <>
            {/* Title Content */}
            <div className="flex flex-col gap-3 w-full place-items-center">
            <p className="grid md:text-5xl sm:text-4xl xs:text-3xl text-2xl text-center my-3 md:space-y-3"><span>มูลนิธิอาสาช่วยเหลือหมาและแมว</span><span>(🐶DC Station🐱)</span></p>

                {/* Filter animal (Species, Age, Gender) */}
                <FilterAnimals />
            </div>

            {/* Animals */}
            <div className="flex flex-col w-screen px-3">
                <Suspense fallback={<p>Loading</p>}>
                    <AnimalsElement animals={no_home} />
                </Suspense>
            </div>
        </>
    )
}