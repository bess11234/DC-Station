import { Metadata } from "next"
import Link from "next/link"

import { PlusIcon } from "@heroicons/react/24/outline"

import { PageNavigation } from "@/app/components/(manager)/PageNavigation"
import { ShowKnowledges } from "@/app/components/(manager)/knowledges/ShowKnowledges"

import { fetchKnowledgeCount, fetchKnowledges } from "@/app/lib/data"
import { Suspense } from "react"

export const metadata: Metadata = {
    title: "Dashboard Knowledges"
}

export default async function KnowledgesManagerPage() {
    const countKnowledge: number = await fetchKnowledgeCount()
    const pageNumber = Math.ceil(countKnowledge / 6)
    const fetchListKnowledges = []
    for (let i = 0; i < pageNumber; i++) {
        fetchListKnowledges.push(fetchKnowledges(i * 6, 6))
    }
    const listKnowledges = Promise.all(fetchListKnowledges)
    return (
        <>
            <div className="flex flex-col w-full py-8">
                {/* Title */}
                <p className="md:text-5xl sm:text-4xl text-3xl font-semibold text-center my-3">เกร็ดความรู้</p>

                <div className="grid space-x-3 p-3">
                    {/* Knowledges */}
                    <div className="bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:p-5 p-3 hover:shadow-md dark:shadow-theme-50/10">

                        {/* Create Knowledge */}
                        <Link role="button" href={"/dashboard/knowledges/create"} className="button-secondary w-fit flex flex-row px-4 py-3 rounded-full mb-3 cursor-pointer space-x-1">
                            <PlusIcon className="size-6" /><span>เพิ่มเกร็ดความรู้</span>
                        </Link>

                        {/* Show Knowledge */}
                        <div className="grid lg:grid-cols-2 gap-6 max-sm:gap-y-8 w-full max-w-[1500px] mx-auto">
                            <Suspense fallback={<p>Loading...</p>}>
                                <ShowKnowledges knowledges={listKnowledges} />
                            </Suspense>
                        </div>

                        {/* Page Navigation */}
                        <Suspense fallback={<p>Loading...</p>}>
                            <PageNavigation totalPage={pageNumber} />
                        </Suspense>

                    </div>
                </div>
            </div>
        </>
    )
}