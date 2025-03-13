import { Metadata } from "next";

import { Card } from "@/app/components/Card"

import { fetchKnowledges } from '@/app/lib/data';
import type { Knowledge } from '@/app/lib/definition';

import { SearchAnimals } from "@/app/components/SearchBox";

export const metadata: Metadata = {
    title: "Knowledges"
}

export default async function KnowledgesPage(props : {
    searchParams?: Promise<{
        title?: string
    }>;
    }) {

    const searchParams = await props.searchParams;
    const query = searchParams?.title || '';

    const knowledges: Knowledge[] = await fetchKnowledges();
    return (
        <>
        <div className="flex flex-col gap-3 w-full sm:px-6 py-3">
            <p className="md:text-5xl sm:text-4xl text-3xl text-center py-3 w-full">สร้างเสริมเกร็ดความรู้</p>
            <SearchAnimals/>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-6 gap-3 sm:m-3">
                {knowledges
                .filter((knowledge) => knowledge.title.includes(query))
                .map((knowledge, index) => (
                    <Card key={index} hrefLink={`/knowledges/${knowledge._id}`} src={knowledge.image} title={knowledge.title} desc={knowledge.describe} date={new Date(knowledge.createdAt).getTime()} />
                ))}
            </div>
        </div>
        </>
    )
}