import { Metadata } from "next"
import { Suspense } from "react"

import { Animal } from "@/app/lib/definition"
import { fetchFoundHouseAnimals } from "@/app/lib/data"

import { AnimalsElement } from "@/app/components/animals/AnimalsElement"
import { FilterAnimals } from "@/app/components/animals/FilterAnimals"
import { GuestComponent } from "@/app/components/GuestComponent";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: "Found House"
}

export default async function FoundHouse() {
    const animals: Animal[] = await fetchFoundHouseAnimals()
    return (
        <>
            <GuestComponent
                title={<><span>มูลนิธิอาสาช่วยเหลือหมาและแมว</span><span>(🐶DC Station🐱)</span></>}
                OptionComponentOnTitle={
                    <Suspense fallback={<p>Loading...</p>}>
                        <FilterAnimals />
                    </Suspense>}
            >
                {/* Animals */}
                <div className="flex flex-col w-screen px-3">
                    {animals && <AnimalsElement animals={animals} />}
                </div>
            </GuestComponent>
        </>
    )
}