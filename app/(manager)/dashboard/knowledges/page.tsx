import { Metadata } from "next"

import { ShowKnowledges } from "@/app/components/(manager)/knowledges/ShowKnowledges"
import { ShowManagerData } from "@/app/components/(manager)/ShowManagerData"

import { fetchKnowledgeCount, fetchKnowledges } from "@/app/lib/data"

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
        <ShowManagerData
            title="เกร็ดความรู้"
            addItem={true}
            addItemLink="/dashboard/knowledges/create"
            showData={<ShowKnowledges knowledges={listKnowledges} />}
            pageNumber={pageNumber}
        />
    )
}