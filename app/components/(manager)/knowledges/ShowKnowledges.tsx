"use client"

import { use, useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"
import Image from "next/image"

import type { Knowledge } from "@/app/lib/definition"
import { deleteKnowledge } from "@/app/lib/action"

import { DeleteItem } from "../DeleteItem"
import { EditItem } from "../EditItem"

export function ShowKnowledges({ knowledges }: { knowledges: Promise<Knowledge[][]> }) {
    const searchParams = useSearchParams()

    const [indexKnowledges, setIndexKnowledges] = useState<number>(0)
    const showKnowledges = use(knowledges) // Solved Promise

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (params.get("pages")) {
            const pages = Number(params.get("pages")) - 1
            if (pages < showKnowledges.length && pages >= 0) {
                setIndexKnowledges(pages)
            }
        }
    }, [searchParams, setIndexKnowledges, showKnowledges])

    return (
        <>
            {showKnowledges[indexKnowledges] && showKnowledges[indexKnowledges].map((knowledge, i) => (
                <div key={i} className="relative grid rounded-3xl dark:shadow-theme-50/10 md:text-xl sm:text-lg text-base card-theme dark:bg-white/5 sm:py-4 sm:px-6 py-3 px-3 hover:shadow-md">
                    {/* Display Delete */}
                    <DeleteItem id={knowledge._id} name={knowledge.title} index={"knowledge" + i} handleDelete={deleteKnowledge} />

                    {/* Edit button */}
                    <EditItem href={`/dashboard/knowledges/editing/${knowledge._id}`} />

                    {/* Display Data */}
                    <div className="flex flex-row sm:gap-x-3 gap-x-3 w-full">
                        <div className="grid space-y-1 flex-none">
                            {/* Main Image */}
                            <Image
                                src={`/api/image?filename=${knowledge.image}`}
                                alt={`Picture of ${knowledge.title}`}
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
                            <div className="ml-2 mr-6">
                                <p className="line-clamp-1 mb-1">{knowledge.title}</p>
                                <p className="sm:line-clamp-2 line-clamp-3 opacity-50 sm:text-base text-sm">
                                    {knowledge.describe}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}