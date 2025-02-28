import { notFound } from "next/navigation";
import { Suspense } from "react";

import { fetchAnimalId, fetchRequest} from "@/app/lib/data";

import { EditingKnowledge } from "@/app/components/(manager)/knowledges/EditingKnowledge";
import { SkeletonAnimalInput } from "@/app/components/skeletons/SkeletonAnimalInput";
import { DetailRequests } from "@/app/components/(manager)/requests/DetailRequest";

export default async function AnimalRequestDetail({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const animal = await fetchAnimalId(id)
    const requests = (await fetchRequest()).filter(request => request.animal === id);

    if (!requests) notFound();

    return (
        <section className="w-full">
            <div className="flex flex-col gap-3 w-full place-items-center py-8">

                {/* Knowledge Information */}
                <div className="grid gap-3 p-3 xl:min-w-[1000px] max-w-[1000px] w-full sm:mx-16 mx-8">

                    {/* Data */}
                    <Suspense fallback={<SkeletonAnimalInput/>}>
                        <DetailRequests requests={requests} />
                    </Suspense>

                </div>

            </div>
        </section>
    )
}