import { notFound } from "next/navigation";
import { Suspense } from "react";

import { EditingData } from "@/app/components/(manager)/animals/EditingData";
import { animals } from "@/app/lib/data";

export default async function AnimalId({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const animal = animals.filter(v => v.id == id)[0]
    if (!animal) notFound();

    return (
        <section className="w-full">
            <div className="flex flex-col gap-3 w-full place-items-center py-8">
                {/* Title Content */}
                <p className="md:text-5xl sm:text-4xl text-3xl text-center py-3">{animal.name}</p>

                {/* Animal Information */}
                <div className="grid gap-3 p-3 xl:min-w-[1000px] max-w-[1000px] w-full sm:mx-16 mx-8">

                    {/* Data */}
                    <Suspense fallback={<p>Loading...</p>}>
                        <EditingData animal={animal} />
                    </Suspense>

                </div>

            </div>
        </section>
    )
}