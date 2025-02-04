import { Metadata } from "next"
import { Suspense } from "react"

import { animals } from "../lib/data"

import { AnimalsElement } from "../components/animals/AnimalsElement"
import { FilterAnimals } from "../components/animals/FilterAnimals"

export const metadata: Metadata = {
    title: "Find House"
}

export default function FindHouse() {

    return (
        <>
            {/* Title Content */}
            <div className="flex flex-col gap-3 w-full place-items-center">
                <p className="md:text-3xl sm:text-2xl text-xl text-center">สร้างครอบครัวที่อบอุ่นให้น้อง <span><br />(DC Station 🐶 & 🐱)</span></p>

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