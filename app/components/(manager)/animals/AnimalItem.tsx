import Link from "next/link"
import Image from "next/image"

import type { Animal } from "@/app/lib/definition"

import { XCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { fetchAnimalRequest } from "@/app/lib/data"

export async function AnimalItem({ animal }: { animal: Animal }) {
    const requests = await fetchAnimalRequest(animal._id)

    return (
        <div className="relative grid sm:rounded-3xl rounded-xl dark:shadow-theme-50/10 md:text-xl sm:text-lg text-base bg-theme-100/80 dark:bg-white/5">
            {/* Delete button */}
            <Link className="absolute z-10 -right-3 -top-3" aria-label="Delete" role="button" tabIndex={-1} href={`/dashboard/animals/${animal._id}`}>
                <button title="Delete" className="text-red-500 p-1.5 rounded-full cursor-pointer">
                    <XCircleIcon className={`hover:opacity-40 active:opacity-60 transition-colors size-6`} />
                </button>
            </Link>
            {/* Edit button */}
            <Link className="absolute z-10 bottom-0 right-0 mr-2 mb-2" aria-label="Edit" role="button" tabIndex={-1} href={`/dashboard/animals/${animal._id}`}>
                <button title="Edit" className=" p-1.5 rounded-full cursor-pointer">
                    <PencilSquareIcon className={`hover:opacity-40 active:opacity-60 transition-colors size-6`} />
                </button>
            </Link>

            {/* Display Data */}
            <div className="flex flex-row sm:gap-x-3 gap-x-3 w-full">
                <Image
                    alt={`Picture of ${animal.name}.`}
                    src={animal.images[0]}
                    width={150}
                    height={150}
                    style={{ objectFit: "cover" }}
                    className="sm:rounded-l-3xl rounded-l-xl w-[150px] h-[150px] flex-none"
                />
                <div className="relative flex flex-col pr-3 pt-2">
                    {/* Status */}
                    <span
                        className={`text-xs px-3 py-1 border rounded-full text-nowrap w-fit mb-1 dark:opacity-75
                             ${!animal.adoptionDate ? (requests.length ? "text-sky-500 dark:text-sky-300" : "text-red-500 dark:text-red-300") : "text-green-500 dark:text-green-300"}`
                        }>
                        {!animal.adoptionDate ? (requests.length ? <Link href={"#"} className="flex hover:opacity-40 active:opacity-60">คำร้องขอ&nbsp;<span className="animate-pulse">({requests.length})</span></Link> : "ไม่มีคำร้อง") : "รับเลี้ยงแล้ว"}
                    </span>
                    <div className="ml-2 mr-3">
                        <p className="line-clamp-1">{animal.name}</p>
                        <p className="text-black2/50 dark:text-white/50 text-sm line-clamp-2">{animal.personalities.join(", ") + animal.personalities.join(", ") + animal.personalities.join(", ") + animal.personalities.join(", ") + animal.personalities.join(", ") + animal.personalities.join(", ")}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}