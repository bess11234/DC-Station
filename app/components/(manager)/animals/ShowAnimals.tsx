"use client"

import { Suspense, use, useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { PencilSquareIcon } from "@heroicons/react/24/outline"

import type { Animal, Request } from "@/app/lib/definition"
import { fetchAnimalRequest } from "@/app/lib/data"
import { deleteAnimal } from "@/app/lib/action"

import { DeleteItem } from "../DeleteItem"
import { EditItem } from "../EditItem"

export function ShowAnimals({ animals }: { animals: Promise<Animal[][]> }) {
    const [isLoading, setIsLoading] = useState(false)

    const searchParams = useSearchParams()

    const [indexAnimals, setIndexAnimals] = useState<number>(0)
    const showAnimals = use(animals) // Solved Promise

    const [showAnimalRequest, setShowAnimalRequest] = useState<Request[][]>([]); // Fetch Request from animal.id

    useEffect(() => {
        if (showAnimals.length > 0) {
            Promise.all(showAnimals[indexAnimals].map((v) => fetchAnimalRequest(v._id)))
                .then((e) => setShowAnimalRequest(e))
                .catch((error) => console.error("Error fetching:", error));
        }
    }, [showAnimals, indexAnimals]); // ✅ Fetch only when showAnimals changes

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (params.get("pages")) {
            const pages = Number(params.get("pages")) - 1
            if (pages < showAnimals.length && pages > 0) {
                setIndexAnimals(pages)
            }
        }
    }, [searchParams, setIndexAnimals, showAnimals])

    return (
        <>
            {showAnimals[indexAnimals].map((animal, i) => (
                <div key={i} className="relative grid rounded-3xl dark:shadow-theme-50/10 md:text-xl sm:text-lg text-base bg-theme-200/15 dark:bg-white/5 p-3 hover:shadow-md">
                    {/* Display Delete */}
                    <DeleteItem id={animal._id} name={animal.name} index={i} handleDelete={deleteAnimal} />

                    {/* Edit button */}
                    <EditItem href={`/dashboard/animals/editing/${animal._id}`} />

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
                            <Suspense fallback={<p>Loading...</p>}>
                                <span
                                    className={`text-xs px-3 py-1 border rounded-full text-nowrap w-full text-center dark:opacity-75
                                    ${isLoading ? "cursor-wait" : "cursor-pointer"}
                                    ${!animal.adoptionDate ? (showAnimalRequest[i]?.length ? "text-sky-500 dark:text-sky-300" : "text-red-500 dark:text-red-300") : "text-green-500 dark:text-green-300"}`}>
                                    {!animal.adoptionDate ?
                                        (showAnimalRequest[i]?.length ?
                                            <Link href={"#"} onClick={() => setIsLoading(true)} className="flex hover:opacity-40 active:opacity-60 justify-self-center">คำร้องขอ&nbsp;<span className="animate-pulse">({showAnimalRequest[i]?.length})</span></Link>
                                            : "รอรับเลี้ยง")
                                        : "ถูกรับเลี้ยง"}
                                </span>
                            </Suspense>
                        </div>

                        <div className="relative flex flex-col pr-6 pt-2">
                            <div className="ml-2 mr-6">
                                <p className="line-clamp-1 mb-1"><span className="max-sm:hidden">{`${animal.specie == "Dog" ? "🐶" : "🐱"} `}</span> {animal.name}</p>
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