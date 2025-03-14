import { Metadata } from "next"
import { Suspense } from "react"

import { Animal } from "@/app/lib/definition"
import { fetchFindHouseAnimals } from "@/app/lib/data"

import { AnimalsElement } from "@/app/components/animals/AnimalsElement"
import { FilterAnimals } from "@/app/components/animals/FilterAnimals"
import { GuestComponent } from "@/app/components/GuestComponent"
import { SkeletonFilterAnimal } from "@/app/components/skeletons/SkeletonFilterAnimal"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: "Find House"
}

export default async function FindHouse() {
    const animals: Animal[] = await fetchFindHouseAnimals()
    return (
        <>
            <GuestComponent
                title={<><span>มูลนิธิอาสาช่วยเหลือหมาและแมว</span><span>(🐶DC Station🐱)</span></>}
                OptionComponentOnTitle={
                    <Suspense fallback={<SkeletonFilterAnimal/>}>
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