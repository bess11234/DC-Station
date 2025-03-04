import { Suspense } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchRequestAnimalPending, fetchRequestAnimalResponse, fetchRequestAnimalCount, fetchRequestPendingAnimalCount, fetchRequestResponsedAnimalCount } from "@/app/lib/data";

import { DetailRequests } from "@/app/components/(manager)/requests/DetailRequest";
import { ClockIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";

import { PageNavigation } from "@/app/components/(manager)/PageNavigation";
import { SkeletonAnimalRequest } from "@/app/components/skeletons/SkeletonAnimalRequest";

export const metadata: Metadata = {
    title: "Dashboard Request Details"
}

export default async function AnimalRequestDetail({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const [requestAnimalCount, requestPendingAnimalCount, requestResponsedAnimalCount] = await Promise.all([fetchRequestAnimalCount(id), fetchRequestPendingAnimalCount(id), fetchRequestResponsedAnimalCount(id)])
    if (!requestAnimalCount) notFound();

    // Requests Pending from Animal
    const pagePendingNumber = Math.ceil(requestPendingAnimalCount / 6)
    const fetchListPendingRequestAnimal = []
    for (let i = 0; i < pagePendingNumber; i++) {
        fetchListPendingRequestAnimal.push(fetchRequestAnimalPending(id, i * 6, 6))
    }
    const listPendingRequestAnimal = Promise.all(fetchListPendingRequestAnimal)

    // Requests response to Animal
    const pageResponseNumber = Math.ceil(requestResponsedAnimalCount / 6)
    const fetchListResponseRequestAnimal = []
    for (let i = 0; i < pageResponseNumber; i++) {
        fetchListResponseRequestAnimal.push(fetchRequestAnimalResponse(id, i * 6, 6))
    }
    const listResponseRequestAnimal = Promise.all(fetchListResponseRequestAnimal)

    return (

        <section className="w-full py-8">
            {/* Title */}
            <p className="md:text-5xl sm:text-4xl text-3xl font-semibold text-center my-3">คำร้องขอรับเลี้ยง</p>

            {/* Request */}
            {requestPendingAnimalCount && (<div className="grid space-x-3 p-3">
                <div className="bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:p-5 p-3 hover:shadow-md dark:shadow-theme-50/10">
                    <div className="flex items-center text-theme-950 mb-2">
                        <ClockIcon className="size-10 dark:text-white"></ClockIcon>
                        <div className="font-semibold md:text-4xl sm:text-3xl text-2xl m-3 dark:text-white"><p>คำร้องขอที่ยังไม่ตอบ</p></div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6 max-sm:gap-y-8 w-full max-w-[1500px] mx-auto">
                        {/* Data */}
                        
                        <Suspense fallback={<SkeletonAnimalRequest number={requestPendingAnimalCount} />}>
                            <DetailRequests requests={listPendingRequestAnimal} />
                        </Suspense>
                    </div>
                    {/* Page Navigation */}
                    <PageNavigation totalPage={pagePendingNumber} />
                </div>
            </div>)}

            {/* Responsed */}
            {requestResponsedAnimalCount && (<div className="grid space-x-3 p-3">
                <div className="bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:p-5 p-3 hover:shadow-md dark:shadow-theme-50/10">
                    <div className="flex items-center text-theme-950 mb-2">
                        <CheckBadgeIcon className="size-10 dark:text-white"></CheckBadgeIcon>
                        <div className="font-semibold md:text-4xl sm:text-3xl text-2xl m-3 dark:text-white"><p>ตอบรับคำร้องขอแล้ว</p></div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6 max-sm:gap-y-8 w-full max-w-[1500px] mx-auto">
                        {/* Data */}
                        <Suspense fallback={<SkeletonAnimalRequest number={requestResponsedAnimalCount} />}>
                            <DetailRequests requests={listResponseRequestAnimal} />
                        </Suspense>

                    </div>
                    {/* Page Navigation */}
                    <PageNavigation totalPage={pageResponseNumber} />
                </div>
            </div>)}

        </section>
    )
}