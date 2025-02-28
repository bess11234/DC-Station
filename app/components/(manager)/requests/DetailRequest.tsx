"use client"

import { Suspense, use, useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import type {Request, Animal } from "@/app/lib/definition"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

export function DetailRequests({ requests}: { requests : Request[]}) {

    // console.log("animals", animals)
    // const searchParams = useSearchParams()

    // const [isLoading, setIsLoading] = useState(false)

    // const [indexAnimalRequests, setindexAnimalRequests] = useState<number>(0)
    // const showAnimals= use(animals) // Solved Promise

    // useEffect(() => {
    //     const params = new URLSearchParams(searchParams);
    //     if (params.get("pages")) {
    //         const pages = Number(params.get("pages")) - 1
    //         if (pages < showAnimals.length && pages > 0) {
    //             setindexAnimalRequests(pages)
    //         }
    //     }
    // }, [searchParams, setindexAnimalRequests, showAnimals])

    return (
        <>
        <p>Detail</p>
            {/* {showAnimals[indexAnimalRequests].map((animal, i) => (
                <div key={i} className="relative grid rounded-3xl dark:shadow-theme-50/10 card-theme md:text-xl sm:text-lg text-base p-3 hover:shadow-md">
                    
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
                        </div>
                        <div className="relative flex flex-col pr-6 pt-2">
                            <div className="ml-2 mr-6">
                                <p className="line-clamp-1 mb-1">{animal.name}</p>
                                <div className="sm:line-clamp-2 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p>กำลังรอดำเนินการ: {pendingCounts[i]} คำขอ</p>
                                </div>
                                <div className="sm:line-clamp-2 line-clamp-3 opacity-50 sm:text-base text-sm">
                                <p>ดำเนินการปฏิเสธ: {rejectCounts[i]} คำขอ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            ))} */}
        </>
    )
}