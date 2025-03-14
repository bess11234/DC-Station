import { Metadata } from "next"

import { fetchAnimalRequests, fetchAnimalRequestsCount } from "@/app/lib/data"

import { ShowAnimalRequests } from "@/app/components/(manager)/requests/ShowAnimalRequests"
import { ShowManagerData } from "@/app/components/(manager)/ShowManagerData"

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
        <ShowManagerData
            title="คำร้องขอรับเลี้ยง"
            addItem={false}
            showData={<ShowAnimalRequests animals={listAnimalRequests} />}
            pageNumber={pageNumber}
        />
    )
}