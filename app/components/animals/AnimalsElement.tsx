'use client'

import { Suspense } from "react";

import { Card } from "../Card";
import type { Animal } from "../../lib/definition";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { SkeletonCard } from "../skeletons/SkeletonCard";

interface Props {
    animals: Animal[]
}

export function AnimalsElement({ animals }: Props) {
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const [displayAnimal, setAnimals] = useState<Animal[]>(animals)

    useEffect(() => {
        if (pathName == "/find-house" || pathName == "/found-house") {

            const params = new URLSearchParams(searchParams);
            let tempAnimals = animals;

            if (params.get("specie")) tempAnimals = tempAnimals.filter((v) => v.specie.toLowerCase() == params.get("specie"))
            if (params.get("age")) {
                const date = Date.now()
                switch (params.get("age")) {
                    case "1":
                        tempAnimals = tempAnimals.filter((v) => (date - Date.parse(v.dob)) / 1000 / 60 / 60 / 24 / 30 / 12 < 1);
                        break;

                    case "2":
                        tempAnimals = tempAnimals.filter((v) => (date - Date.parse(v.dob)) / 1000 / 60 / 60 / 24 / 30 / 12 >= 1 && (date - Date.parse(v.dob)) / 1000 / 60 / 60 / 24 / 30 / 12 < 5);
                        break;

                    case "3":
                        tempAnimals = tempAnimals.filter((v) => (date - Date.parse(v.dob)) / 1000 / 60 / 60 / 24 / 30 / 12 >= 5 && (date - Date.parse(v.dob)) / 1000 / 60 / 60 / 24 / 30 / 12 < 10);
                        break;

                    case "4":
                        tempAnimals = tempAnimals.filter((v) => (date - Date.parse(v.dob)) / 1000 / 60 / 60 / 24 / 30 / 12 >= 10);
                        break;
                }
            }
            if (params.get("gd")) {
                switch (params.get("gd")) {
                    case "m":
                        tempAnimals = tempAnimals.filter((v) => v.gender == "M")
                        break;
                    case 'f':
                        tempAnimals = tempAnimals.filter((v) => v.gender == "F")
                        break;
                }
            }

            setAnimals(tempAnimals)
        }
    }, [searchParams, animals, pathName])

    return (
        <>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-6 gap-3 sm:m-3">
                <Suspense fallback={<SkeletonCard number={displayAnimal.length} />}>
                    {
                        displayAnimal.map((v, i) => (
                            <Card key={i} src={v.images[0]} title={v.name} desc={v.personalities.join(", ")} hrefLink={`${pathName}/${v._id}`} date={
                                pathName == "found-house" ? Date.parse(v.adoptionDate ? v.adoptionDate : "") : Date.parse(v.createdAt ? v.createdAt : "")
                            } />
                        ))
                    }
                </Suspense>
            </div>
        </>
    )
}