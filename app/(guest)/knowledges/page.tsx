import { Metadata } from "next"
import { Card } from "@/app/components/Card"
import { fetchKnowledge } from '@/app/lib/data';
import type { Knowledge } from '@/app/lib/definition';

export const metadata: Metadata = {
    title: "Knowledges"
}

export default async function Knowledges() {
    const knowledges: Knowledge[] = await fetchKnowledge();
    const mockDate = Date.now()
    return (
        <>
            <p className="md:text-5xl sm:text-4xl text-3xl text-center py-3 w-full">สร้างเสริมเกร็ดความรู้</p>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-6 gap-3 sm:m-3">
                {knowledges.map((knowledge, index) => (
                    <Card key={index} hrefLink="/knowledges/1" src={knowledge.image} title={knowledge.title} desc={knowledge.content} date={mockDate} />
                ))}
            </div>
        </>
    )
}