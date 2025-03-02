import { Suspense } from "react";

import { Metadata } from "next";

import { Knowledge } from "@/app/lib/definition";

import { CreateKnowledge } from "@/app/components/(manager)/knowledges/CreateKnowledge";
import { SkeletonAnimalInput } from "@/app/components/skeletons/SkeletonAnimalInput";

export const metadata: Metadata = {
    title: "Dashboard Knowledge Create"
}

export default async function KnowledgeCreate() {
    const knowledge: Knowledge = {
        _id: "",
        content: "",
        createdAt: "",
        describe: "",
        image: "",
        title: ""
    }

    return (
        <section className="w-full">
            <div className="flex flex-col gap-3 w-full place-items-center py-8">

                {/* Knowledge Information */}
                <div className="grid gap-3 p-3 xl:min-w-[1000px] max-w-[1000px] w-full sm:mx-16 mx-8">

                    {/* Data */}
                    <Suspense fallback={<SkeletonAnimalInput/>}>
                        <CreateKnowledge knowledge={knowledge} />
                    </Suspense>

                </div>

            </div>
        </section>
    )
}