import { Metadata } from "next"
import { Suspense } from "react"

import { Animal } from "@/app/lib/definition"
import { fetchFoundHouseAnimals } from "@/app/lib/data"

import { AnimalsElement } from "@/app/components/animals/AnimalsElement"
import { FilterAnimals } from "@/app/components/animals/FilterAnimals"

export const metadata: Metadata = {
    title: "Found House"
}

export default async function FoundHouse() {
    const animals: Animal[] = await fetchFoundHouseAnimals()
    return (
        <>
            {/* Title Content */}
            <div className="flex flex-col gap-3 w-full place-items-center">
                <p className="grid md:text-5xl sm:text-4xl xs:text-3xl text-2xl text-center my-3 md:space-y-3"><span>มูลนิธิอาสาช่วยเหลือหมาและแมว</span><span>(🐶DC Station🐱)</span></p>

                {/* Filter animal (Species, Age, Gender) */}
                <Suspense fallback={<p>Loading...</p>}>
                    <FilterAnimals />
                </Suspense>
            </div>

            {/* Animals */}
            <div className="flex flex-col w-screen px-3">
                <Suspense fallback={<p>Loading...</p>}>
                    {animals && <AnimalsElement animals={animals} />}
                </Suspense>
            </div>
        </>
    )
}