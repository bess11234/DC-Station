import Link from "next/link"

import { PlusIcon } from "@heroicons/react/24/outline"

import { PageNavigation } from "@/app/components/(manager)/PageNavigation"
import { ShowAnimals } from "@/app/components/(manager)/animals/ShowAnimals"

import { fetchAnimals } from "@/app/lib/data"
import type { Animal } from "@/app/lib/definition"


export default async function Animals() {
    const animals: Animal[] = (await fetchAnimals()).sort((c, n) => {
        if (c.updatedAt && n.updatedAt){
            if (c.updatedAt > n.updatedAt){
                return -1
            }else{
                return 1
            }
        }
        return 0
    })
    return (
        <>
            <div className="flex flex-col w-full py-8">
                {/* Title */}
                <p className="md:text-5xl sm:text-4xl text-3xl font-semibold text-center my-3">สัตว์</p>

                <div className="grid space-x-3 p-3">
                    {/* Animals */}
                    <div className="bg-theme-50/50 dark:bg-white/5 rounded-3xl sm:p-5 p-3 overflow-x-auto">

                        {/* Create Animal */}
                        <Link href={"/dashboard/animals/create"} className="button-theme w-fit flex flex-row px-4 py-3 rounded-full mb-3 cursor-pointer space-x-1">
                            <PlusIcon className="size-6" /><span>เพิ่มสัตว์</span>
                        </Link>

                        {/* Show Animal */}
                        <div className="grid lg:grid-cols-2 gap-6 max-sm:gap-y-8 w-full max-w-[1500px] mx-auto">
                            <ShowAnimals animals={animals} />
                        </div>

                        {/* Page Navigation */}
                        <PageNavigation totalPage={100} />

                    </div>
                </div>
            </div>
        </>
    )
}