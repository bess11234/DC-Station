import Link from "next/link"

import { PlusIcon } from "@heroicons/react/24/outline"

import { PageNavigation } from "@/app/components/(manager)/PageNavigation"
import { ShowKnowledges } from "@/app/components/(manager)/knowledges/ShowKnowledges"

import { fetchfetchKnowledgeCount, fetchKnowledges } from "@/app/lib/data"

export default async function KnowledgesManagerPage() {
    const countKnowledge: number = await fetchfetchKnowledgeCount()
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
                <p className="md:text-5xl sm:text-4xl text-3xl font-semibold text-center my-3">สัตว์</p>

                <div className="grid space-x-3 p-3">
                    {/* Knowledges */}
                    <div className="bg-theme-100/50 dark:bg-white/5 rounded-3xl sm:p-5 p-3 overflow-x-auto">

                        {/* Create Knowledge */}
                        <Link href={"/dashboard/knowledges/create"} className="button-secondary w-fit flex flex-row px-4 py-3 rounded-full mb-3 cursor-pointer space-x-1">
                            <PlusIcon className="size-6" /><span>เพิ่มเกร็ดความรู้</span>
                        </Link>

                        {/* Show Knowledge */}
                        <div className="grid lg:grid-cols-2 gap-6 max-sm:gap-y-8 w-full max-w-[1500px] mx-auto">
                            <ShowKnowledges knowledges={listKnowledges} />
                        </div>

                        {/* Page Navigation */}
                        <PageNavigation totalPage={pageNumber} />

                    </div>
                </div>
            </div>
        </>
    )
}