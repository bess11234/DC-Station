import { Metadata } from "next"
import { Suspense } from "react"

import { animals } from "@/app/lib/data"

import { AnimalsElement } from "@/app/components/animals/AnimalsElement"
import { FilterAnimals } from "@/app/components/animals/FilterAnimals"

export const metadata: Metadata = {
    title: "Find House"
}

export default function FindHouse() {

    return (
        <>
            {/* Title Content */}
            <div className="flex flex-col gap-3 w-full place-items-center">
                <p className="md:text-5xl sm:text-4xl xs:text-3xl text-xl text-center py-3">สร้างครอบครัวที่อบอุ่นให้น้อง <span><br />(DC Station 🐶 & 🐱)</span></p>

                {/* Filter animal (Species, Age, Gender) */}
                <FilterAnimals />
            </div>

            {/* Animals */}
            <div className="flex flex-col w-screen px-3">
                <Suspense fallback={<p>Loading</p>}>
                    <AnimalsElement animals={animals} />
                </Suspense>
            </div>
        </>
    )
}