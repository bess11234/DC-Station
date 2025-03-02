import { Suspense } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchKnowledgeId } from "@/app/lib/data";

import { EditingKnowledge } from "@/app/components/(manager)/knowledges/EditingKnowledge";
import { SkeletonAnimalInput } from "@/app/components/skeletons/SkeletonAnimalInput";

export const metadata: Metadata = {
    title: "Dashboard Knowledge Editing"
}

export default async function KnowledgeEditing({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const knowledge = await fetchKnowledgeId(id)
    if (!knowledge) notFound();

    return (
        <section className="w-full">
            <div className="flex flex-col gap-3 w-full place-items-center py-8">

                {/* Knowledge Information */}
                <div className="grid gap-3 p-3 xl:min-w-[1000px] max-w-[1000px] w-full sm:mx-16 mx-8">

                    {/* Data */}
                    <Suspense fallback={<SkeletonAnimalInput/>}>
                        <EditingKnowledge knowledge={knowledge} />
                    </Suspense>

                </div>

            </div>
        </section>
    )
}