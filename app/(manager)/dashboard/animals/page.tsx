import Link from "next/link"

import { PlusIcon } from "@heroicons/react/24/outline"

import { PageNavigation } from "@/app/components/(manager)/PageNavigation"
import { ShowAnimals } from "@/app/components/(manager)/animals/ShowAnimals"

import { fetchAnimals, fetchAnimalCount } from "@/app/lib/data"

export default async function Animals() {
    const countAnimal: number = await fetchAnimalCount()
    const pageNumber = Math.ceil(countAnimal / 6)
    const fetchListAnimals = []
    for (let i = 0; i < pageNumber; i++) {
        fetchListAnimals.push(fetchAnimals(i*6, 6))
    }
    const listAnimals = Promise.all(fetchListAnimals)
    return (
        <>
            <div className="flex flex-col w-full py-8">
                {/* Title */}
                <p className="md:text-5xl sm:text-4xl text-3xl font-semibold text-center my-3">สัตว์</p>

                <div className="grid space-x-3 p-3">
                    {/* Animals */}
                    <div className="bg-theme-50 dark:bg-white/5 rounded-3xl sm:p-5 p-3 overflow-x-auto">

                        {/* Create Animal */}
                        <Link role="button" href={"/dashboard/animals/create"} className="button-secondary w-fit flex flex-row px-4 py-3 rounded-full mb-3 cursor-pointer space-x-1">
                            <PlusIcon className="size-6" /><span>เพิ่มสัตว์</span>
                        </Link>

                        {/* Show Animal */}
                        <div className="grid lg:grid-cols-2 gap-6 max-sm:gap-y-8 w-full max-w-[1500px] mx-auto">
                            <ShowAnimals animals={listAnimals} />
                        </div>

                        {/* Page Navigation */}
                        <PageNavigation totalPage={pageNumber} />

                    </div>
                </div>
            </div>
        </>
    )
}