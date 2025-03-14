"use client"

import { use, useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import type { AnimalRequest } from "@/app/lib/definition"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

export function ShowAnimalRequests({ animals }: { animals: Promise<AnimalRequest[][]> }) {

    const searchParams = useSearchParams()

    const [, setIsLoading] = useState(false)

    const [indexAnimalRequests, setindexAnimalRequests] = useState<number>(0)
    const showAnimals = use(animals) // Solved Promise

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (params.get("pages")) {
            const pages = Number(params.get("pages")) - 1
            if (pages < showAnimals.length && pages >= 0) {
                setindexAnimalRequests(pages)
            }
        }
    }, [searchParams, setindexAnimalRequests, showAnimals])

    return (
        <>
            {showAnimals[indexAnimalRequests] && showAnimals[indexAnimalRequests].map((animal, i) => (
                <div key={i} className="relative grid rounded-3xl dark:shadow-theme-50/10 card-theme md:text-xl sm:text-lg text-base p-3 hover:shadow-md">

                    {/* Display Animals that have request */}
                    <div className="flex flex-row sm:gap-x-3 gap-x-3 w-full">
                        <div className="grid space-y-1 flex-none md:pl-3">
                            {/* Main Image */}
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
                        </div>

                        {/* Description */}
                        <div className="relative flex flex-col pr-6 pt-2">
                            <div className="ml-2 mr-2">
                                <p className="line-clamp-1 mb-1">{animal.name}</p>
                                <div className="sm:line-clamp-2 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p>รอ: {animal.totalPending} คำขอ</p>
                                </div>
                                <div className="sm:line-clamp-2 line-clamp-3 opacity-50 sm:text-base text-sm">
                                    <p>ปฏิเสธ: {animal.totalRejected} คำขอ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link href={`/dashboard/requests/detail/${animal._id}`} onClick={() => setIsLoading(true)} className="absolute hover:opacity-60 active:opacity-80 flex items-center space-x-1 rounded-full z-10 bottom-0 right-0 mr-2 mb-2 md:text-lg sm:text-base text-sm" role="button" tabIndex={-1}>
                        <p>ดูคำร้องขอทั้งหมด</p>
                        <ArrowRightIcon className="size-4 mr-2" />
                    </Link>
                </div>
            ))}
        </>
    )
}