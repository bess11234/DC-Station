import { notFound } from "next/navigation"
import Image from "next/image"
import { Suspense } from "react"

import { fetchAnimalId } from "@/app/lib/data"
import { displayMonthThai } from "@/app/lib/utils"

import { ShowData } from "../../../components/animals/showData"

import { StarIcon } from "@heroicons/react/24/solid";


export default async function FoundHouseID({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const animal = await fetchAnimalId(id)
    if (!animal) notFound();
    if (animal && !animal.adoptionDate) notFound();

    const animal_adoption = new Date(animal.adoptionDate ? animal.adoptionDate : "")

    return (
        <>
            <section className="w-full">
                <div className="flex flex-col gap-3 w-full place-items-center py-2">
                    {/* Title Content */}
                    <p className="md:text-5xl sm:text-4xl text-3xl text-center font-semibold py-3">{animal.name}</p>
                    {/* Animal Information */}
                    <div className="flex flex-col gap-6 p-3 xl:min-w-[1000px] max-w-[1000px] w-full sm:mx-16 mx-8">

                        {/* Main Image */}
                        <Image
                            src={animal.images[0]}
                            alt={`Picture of ${animal.name} No.0`}
                            sizes="100%"
                            width={500}
                            height={500}
                            style={{ objectFit: "cover" }}
                            placeholder="blur"
                            blurDataURL={animal.images[0]}
                            quality={90}
                            className="w-full sm:h-[500px] h-[300px] rounded-xl grow border border-black2/15 dark:border-white/15 shadow-lg dark:shadow-white/10"
                        />

                        {/* Data */}
                        <Suspense fallback={<p>Loading...</p>}>
                            
                            <div className="grid justify-items-center border border-black2/5 dark:border-white/30 gap-1 text-center text-white bg-green-500 dark:bg-green-600 p-4 md:text-3xl text-xl rounded-xl shadow-lg font-semibold">
                                <div className="flex items-center space-x-2">
                                    <StarIcon className="sm:size-8 size-6" />
                                    <p>ถูกรับเลี้ยง</p>
                                </div>
                                <p>วันที่ {animal_adoption && `${animal_adoption.getDay()} ${displayMonthThai(animal_adoption.getMonth())} ${animal_adoption.getFullYear()}`}</p>
                            </div>

                            <ShowData animal={animal} />
                        </Suspense>

                        <div className="sm:col-span-2 ">
                            {/* Other Images */}
                            {
                                animal.images.length > 1 &&
                                <>
                                    <p className="md:text-2xl sm:text-xl text-lg text-center m-3">รูปภาพเพิ่มเติม</p>

                                    <div className={`columns-2 gap-4 sm:gap-8 space-y-8 ${animal.images.length - 1 >= 5 && "sm:columns-3"}`}>
                                        {
                                            animal.images.filter((v, i) => i != 0).map((src, i) => (
                                                <Image
                                                    key={i}
                                                    src={src}
                                                    height={100}
                                                    width={100}
                                                    quality={74}
                                                    sizes="100vw"
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                    alt={`Picture of ${animal.name} No.${i}`}
                                                    className={`rounded-xl shadow ${i % 3 == 0 ? "aspect-3/2" : "aspect-square"}`}
                                                />
                                            ))
                                        }
                                    </div>
                                </>
                            }
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}