import { Metadata } from "next"
import { notFound } from "next/navigation"

import { Knowledge } from "@/app/lib/definition"
import { fetchAnimalId } from "@/app/lib/data"

import { AnimalDetail } from "@/app/components/AnimalDetail"

export const metadata: Metadata = {
    title: "Find House"
}

export default async function FindHouseID({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const animal = await fetchAnimalId(id)
    if (!animal) notFound();
    if (animal && !!animal.adoptionDate) notFound();

    const animalKnowledges: Knowledge[] = animal.knowledges

    return (
        <AnimalDetail animal={animal} purpose="find-house" animalKnowledges={animalKnowledges} />
    )
}