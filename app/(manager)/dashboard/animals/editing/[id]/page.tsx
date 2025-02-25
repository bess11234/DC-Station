import { notFound } from "next/navigation";
import { Suspense } from "react";

import { fetchAnimalId, fetchKnowledges } from "@/app/lib/data";

import { EditingAnimal } from "@/app/components/(manager)/animals/EditingAnimal";
import { SkeletonAnimalInput } from "@/app/components/skeletons/SkeletonAnimalInput";
import { Knowledge } from "@/app/lib/definition";

export default async function AnimalEditing({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const animal = await fetchAnimalId(id)
    if (!animal) notFound();

    const knowledges: Knowledge[] = await fetchKnowledges()

    return (
        <section className="w-full">
            <div className="flex flex-col gap-3 w-full place-items-center py-8">
                {/* Title Content */}
                <p className="md:text-5xl sm:text-4xl text-3xl text-center py-3">{animal.name}</p>

                {/* Animal Information */}
                <div className="grid gap-3 p-3 xl:min-w-[1000px] max-w-[1000px] w-full sm:mx-16 mx-8">

                    {/* Data */}
                    <Suspense fallback={<SkeletonAnimalInput/>}>
                        <EditingAnimal animal={animal} knowledges={knowledges} />
                    </Suspense>

                </div>

            </div>
        </section>
    )
}