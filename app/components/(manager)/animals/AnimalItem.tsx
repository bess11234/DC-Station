import Link from "next/link"
import Image from "next/image"

import type { Animal } from "@/app/lib/definition"

import { XCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline"

export function AnimalItem({ animal }: { animal: Animal}) {
    return (
        <div className="relative grid sm:rounded-3xl rounded-xl dark:shadow-theme-50/10 md:text-xl sm:text-lg text-base bg-theme-100/75 dark:bg-white/5">
            {/* Delete button */}
            <Link className="absolute -right-3 -top-3" aria-label="Delete" role="button" tabIndex={-1} href={`/dashboard/animals/${animal.id}`}>
                <button title="Delete" className="p-1.5 rounded-full cursor-pointer">
                    <XCircleIcon className={`hover:opacity-40 active:opacity-60 transition-colors size-6`} />
                </button>
            </Link>
            {/* Edit button */}
            <Link className="absolute bottom-0 right-0 mr-2 mb-2" aria-label="Edit" role="button" tabIndex={-1} href={`/dashboard/animals/${animal.id}`}>
                <button title="Edit" className="button-theme p-1.5 rounded-full cursor-pointer">
                    <PencilSquareIcon className={`transition-colors size-6`} />
                </button>
            </Link>

            {/* Display Data */}
            <div className="xs:flex grid grid-cols-2 sm:gap-x-3 gap-x-1 max-h-[150px]">
                <Image
                    alt={`Picture of ${animal.name}.`}
                    src={animal.images[0]}
                    width={150}
                    height={150}
                    style={{ objectFit: "cover" }}
                    className="sm:rounded-l-3xl rounded-l-xl xs:w-[150px] w-full h-[150px] flex-none"
                />
                <div className="relative flex flex-col py-3 mx-2 mr-10 overflow-auto">
                    <p>{animal.name}</p>
                    <p className="mt-1 text-black2/50 dark:text-white/50 sm:text-base text-sm">{animal.personalities.join(", ")}</p>
                </div>
            </div>
        </div>
    )
}