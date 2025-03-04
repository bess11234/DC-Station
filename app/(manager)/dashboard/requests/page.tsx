import { Metadata } from "next"

import { fetchAnimalRequests, fetchAnimalRequestsCount } from "@/app/lib/data"
import { PageNavigation } from "@/app/components/(manager)/PageNavigation"
import { ShowAnimalRequests } from "@/app/components/(manager)/requests/ShowAnimalRequests"

export const metadata: Metadata = {
    title: "Dashboard Requests"
}

export default async function Requests() {
    const countAnimalRequest: number = await fetchAnimalRequestsCount()
    const pageNumber = Math.ceil(countAnimalRequest / 6)
    const fetchListAnimalRequests = []
    for (let i = 0; i < pageNumber; i++) {
        fetchListAnimalRequests.push(fetchAnimalRequests(i * 6, 6))
    }
    const listAnimalRequests = Promise.all(fetchListAnimalRequests)

    return (
        <>
            <div className="flex flex-col w-full py-8">
                {/* Title */}
                <p className="md:text-5xl sm:text-4xl text-3xl font-semibold text-center my-3">คำร้องขอรับเลี้ยง</p>

                <div className="grid space-x-3 p-3">
                    {/* Request */}
                    <div className="bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:p-5 p-3 hover:shadow-md dark:shadow-theme-50/10">
                        <br />

                        {/* Show Animal */}
                        <div className="grid lg:grid-cols-2 gap-6 max-sm:gap-y-8 w-full max-w-[1500px] mx-auto">
                            <ShowAnimalRequests animals={listAnimalRequests} />
                        </div>

                        {/* Page Navigation */}
                        <PageNavigation totalPage={pageNumber} />
                    </div>
                </div>
            </div>
        </>
    )
}