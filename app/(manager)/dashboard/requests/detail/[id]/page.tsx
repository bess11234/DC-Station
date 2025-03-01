import { notFound } from "next/navigation";
import { Suspense } from "react";

import { fetchAnimalId, fetchRequest, fetchAnimalRequest } from "@/app/lib/data";

import { EditingKnowledge } from "@/app/components/(manager)/knowledges/EditingKnowledge";
import { SkeletonAnimalInput } from "@/app/components/skeletons/SkeletonAnimalInput";
import { DetailRequests } from "@/app/components/(manager)/requests/DetailRequest";
import { ClockIcon, DocumentIcon, HomeIcon, HomeModernIcon } from "@heroicons/react/24/solid";

export default async function AnimalRequestDetail({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const animal = await fetchAnimalId(id)
    const requests = await fetchAnimalRequest(id)
    console.log("requests", requests)

    if (!requests) notFound();

    return (
        
        <section className="w-full py-8">
            {/* Title */}
            <p className="md:text-5xl sm:text-4xl text-3xl font-semibold text-center my-3">คำร้องขอรับเลี้ยง</p>
            
            {/* Request */}
            <div className="grid space-x-3 p-3">
                <div className="bg-theme-100/50 dark:bg-white/5 rounded-3xl sm:p-5 p-3 overflow-x-auto">

                    <div className="flex items-center text-theme-950 mb-2">
                        <ClockIcon className="size-10"></ClockIcon>
                        <div className="font-semibold md:text-4xl sm:text-3xl text-2xl  m-3"><p>กำลังรอดำเนินการ</p></div>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-6 max-sm:gap-y-8 w-full max-w-[1500px] mx-auto">
                    {/* Data */}
                    <Suspense fallback={<SkeletonAnimalInput/>}>
                        <DetailRequests requests={requests} />
                    </Suspense>
                    </div>
                </div>
            </div>
        </section>
    )
}