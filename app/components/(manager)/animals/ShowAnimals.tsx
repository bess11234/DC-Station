import Link from "next/link"
import Image from "next/image"

import type { Animal } from "@/app/lib/definition"

import { XCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { fetchAnimalRequest } from "@/app/lib/data"

import { DeleteAnimal } from "./DeleteAnimal"

export function ShowAnimals({ animals }: { animals: Animal[] }) {
    animals = animals.sort((c, n) => {
        let valueSort = 0
        if (c.adoptionDate && !n.adoptionDate){
            valueSort += 2
        }
        if (!c.adoptionDate && n.adoptionDate){
            valueSort += -2
        }

        if (c.updatedAt && n.updatedAt){
            if (c.updatedAt > n.updatedAt){
                valueSort += -1
            }else{
                valueSort += 1
            }
        }
        return valueSort
    })
    return (
        <>
            {animals.map((animal, i) => (
                <div key={i} className="relative grid rounded-3xl dark:shadow-theme-50/10 md:text-xl sm:text-lg text-base bg-theme-200/30 dark:bg-white/5 p-3">
                    {/* Delete button */}
                    <div className="absolute z-10 -right-3 -top-3" aria-label="Delete" role="button" tabIndex={-1}>
                        <button popoverTarget={`deleteAnimal_${i}`} title="Delete" className="p-1.5 rounded-full cursor-pointer">
                            <XCircleIcon className={`hover:opacity-40 active:opacity-60 transition-colors size-6`} />
                        </button>
                    </div>

                    {/* Display Delete */}
                    <DeleteAnimal id={animal._id} name={animal.name} index={i} />

                    {/* Edit button */}
                    <Link className="absolute z-10 bottom-0 right-0 mr-2 mb-2" aria-label="Edit" role="button" tabIndex={-1} href={`/dashboard/animals/editing/${animal._id}`}>
                        <button title="Edit" className=" p-1.5 rounded-full cursor-pointer">
                            <PencilSquareIcon className={`hover:opacity-40 active:opacity-60 transition-colors size-6`} />
                        </button>
                    </Link>

                    {/* Display Data */}
                    <div className="flex flex-row sm:gap-x-3 gap-x-3 w-full">
                        <div className="grid space-y-1 flex-none">
                            <Image
                                alt={`Picture of ${animal.name}.`}
                                src={animal.images[0]}
                                width={150}
                                height={150}
                                style={{ objectFit: "cover" }}
                                className="rounded-3xl w-[100px] h-[100px] flex-none"
                            />
                            {/* Status */}
                            <Status animal={animal} />
                        </div>

                        <div className="relative flex flex-col pr-6 pt-2">
                            <div className="ml-2 mr-6">
                                <p className="line-clamp-1 mb-1">{`${animal.specie == "Dog" ? "🐶" : "🐱"} `+animal.name}</p>
                                <div className="sm:line-clamp-3 line-clamp-4 opacity-50 sm:text-base text-sm">
                                    <p>อุปนิสัย: {animal.personalities.join(", ")}</p>
                                    <p>ประวัติ: {animal.history ? animal.history : "-"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

async function Status({ animal }: { animal: Animal }) {
    const requests = await fetchAnimalRequest(animal._id)
    return (
        <span
            className={`text-xs px-3 py-1 border rounded-full text-nowrap w-full text-center dark:opacity-75
                         ${!animal.adoptionDate ? (requests.length ? "text-sky-500 dark:text-sky-300" : "text-red-500 dark:text-red-300") : "text-green-500 dark:text-green-300"}`
            }>
            {!animal.adoptionDate ? (requests.length ? <Link href={"#"} className="flex hover:opacity-40 active:opacity-60">คำร้องขอ&nbsp;<span className="animate-pulse">({requests.length})</span></Link> : "รอรับเลี้ยง") : "ถูกรับเลี้ยง"}
        </span>
    )

}