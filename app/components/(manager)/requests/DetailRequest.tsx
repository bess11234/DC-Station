"use client"

import { Suspense, use, useEffect, useState } from "react"
import { fetchAnimalRequest } from "@/app/lib/data" 
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import type {Request, Animal } from "@/app/lib/definition"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

export function DetailRequests({ requests }: { requests : Request[]}) {

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
        
            {requests.map((v, i) => (
                <div key={i} className="relative grid rounded-3xl dark:shadow-theme-50/10 card-theme md:text-xl sm:text-lg text-base p-3 hover:shadow-md">
                    <div className="flex flex-row sm:gap-x-3 gap-x-3 w-full mb-5">
                        <div className="relative flex flex-col pr-6 pt-2">
                            <div className="ml-2 mr-6">
                                {/* <p className="line-clamp-1 mb-1">{v.requester.name}</p> */}
                                <div className="sm:line-clamp-2 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p>รหัสบัตรประชาชน: {v.requester.idCard}</p>
                                </div>
                                <div className="sm:line-clamp-2 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p>ชื่อ/ลิงค์เฟซบุ๊ค: {v.requester.fb}</p>
                                </div>
                                <div className="sm:line-clamp-2 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p>เบอร์โทร: {v.requester.phone}</p>
                                </div>
                                <div className="sm:line-clamp-2 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p>ประสบการณ์: {v.requester.experience}</p>
                                </div>
                                <div className="sm:line-clamp-2 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p>เหตุผล: {v.requester.reason}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button type="button" className="bg-theme-300 rounded-xl py-1 px-3 text-base cursor-pointer">ปฏิเสธ</button>
                        <button type="button" className="button-theme-primary rounded-xl text-base py-1 px-3 cursor-pointer">ยืนยัน</button>
                    </div>
                </div> 
            ))}
        </>
    )
}