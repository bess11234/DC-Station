"use client"

import { Suspense, use, useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import type { Animal, Request } from "@/app/lib/definition"
import { fetchRequestAnimal } from "@/app/lib/data"
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
            Promise.all(showAnimals[indexAnimals].map((v) => fetchRequestAnimal(v._id)))
                .then((e) => setShowAnimalRequest(e))
                .catch((error) => console.error("Error fetching:", error));
        }
    }, [showAnimals, indexAnimals]); // ✅ Fetch only when showAnimals changes

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (params.get("pages")) {
            const pages = Number(params.get("pages")) - 1
            if (pages < showAnimals.length && pages >= 0) {
                setIndexAnimals(pages)
            }
        }
    }, [searchParams, setIndexAnimals, showAnimals])


    function ShowStatus({ animal, request }: { animal: Animal, request: Request[] }) {
        request = request ? request.filter(v => v.status == "Pending") : []
        return (
            <span
                className={`text-xs px-3 py-1 rounded-full text-nowrap w-full text-center text-white font-semibold
                ${!animal.adoptionDate ? (request?.length ? "bg-sky-500 dark:bg-sky-600" : "bg-red-400 dark:bg-red-600") : "bg-green-500 dark:bg-green-600"}`}>
                {!animal.adoptionDate ?
                    (request?.length ?
                        <Link href={`/dashboard/requests/detail/${animal._id}`} onClick={() => setIsLoading(true)} className={`flex hover:opacity-70 active:opacity-80 justify-self-center ${isLoading ? "cursor-wait" : "cursor-pointer"}`}>คำร้องขอ&nbsp;<span className="animate-pulse">({request?.length})</span></Link>
                        : "รอรับเลี้ยง")
                    : "ถูกรับเลี้ยง"}
            </span>
        )
    }

    return (
        <>
            {showAnimals[indexAnimals] && showAnimals[indexAnimals].map((animal, i) => (
                <div key={i} className="relative grid rounded-3xl dark:shadow-theme-50/10 md:text-xl sm:text-lg text-base card-theme dark:bg-white/5 sm:py-4 sm:px-6 py-3 px-3 hover:shadow-md">
                    {/* Display Delete */}
                    <DeleteItem id={animal._id} name={animal.name} index={"animal" + i} handleDelete={deleteAnimal} />

                    {/* Edit button */}
                    <EditItem href={`/dashboard/animals/editing/${animal._id}`} />

                    {/* Display Data */}
                    <div className="flex flex-row sm:gap-x-3 gap-x-3 w-full">
                        <div className="grid space-y-1 flex-none">
                            {/* Main Image */}
                            {animal.images[0] ? (
                                <Image
                                    src={`/api/image?filename=${animal.images[0]}`}
                                    alt={`Picture of ${animal.name}`}
                                    width={0}
                                    height={0}
                                    sizes="100%"
                                    style={{ objectFit: "cover" }}
                                    placeholder="blur"
                                    blurDataURL={"/default_image.webp"}
                                    quality={74}
                                    className="rounded-3xl w-[100px] h-[100px] flex-none"
                                />
                            ) : ""}
                            {/* Status */}
                            <Suspense fallback={<p>Loading...</p>}>
                                <ShowStatus animal={animal} request={showAnimalRequest[i]} />
                            </Suspense>
                        </div>

                        {/* Description */}
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