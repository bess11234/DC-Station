import { Metadata } from "next"

import { ShowAnimals } from "@/app/components/(manager)/animals/ShowAnimals"
import { ShowManagerData } from "@/app/components/(manager)/ShowManagerData"

import { fetchAnimals, fetchAnimalCount } from "@/app/lib/data"

export const metadata: Metadata = {
    title: "Dashboard Animals"
}

export default async function Animals() {
    const countAnimal: number = await fetchAnimalCount()
    const pageNumber = Math.ceil(countAnimal / 6)
    const fetchListAnimals = []
    for (let i = 0; i < pageNumber; i++) {
        fetchListAnimals.push(fetchAnimals(i * 6, 6))
    }
    const listAnimals = Promise.all(fetchListAnimals)
    return (
        <ShowManagerData
            title="สัตว์"
            addItem={true}
            addItemLink="/dashboard/animals/create"
            showData={<ShowAnimals animals={listAnimals} />}
            pageNumber={pageNumber}
        />
    )
}