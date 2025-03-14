import { Metadata } from "next"
import { notFound } from "next/navigation"

import { fetchAnimalId } from "@/app/lib/data"

import { Knowledge } from "@/app/lib/definition"

import { AnimalDetail } from "@/app/components/AnimalDetail"

export const metadata: Metadata = {
    title: "Found House"
}

export default async function FoundHouseID({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const animal = await fetchAnimalId(id)

    if (!animal || (!(animal && !!animal.adoptionDate))) notFound();

    const animalKnowledges: Knowledge[] = animal.knowledges

    return (
        <AnimalDetail animal={animal} purpose="found-house" animalKnowledges={animalKnowledges} />
    )
}