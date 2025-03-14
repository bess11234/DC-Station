import { Suspense } from "react";

import Link from "next/link";
import Image from "next/image";

import { StarIcon } from "@heroicons/react/24/solid";

import { AnimalKnowledges, Knowledge } from "../lib/definition";
import { displayMonthThai } from "../lib/utils";

import { RequestForm } from "./RequestForm";
import { DisplayDateCard } from "./DisplayDateCard";
import { ShowData } from "./animals/showData";

interface Props {
    animal: AnimalKnowledges;
    animalKnowledges: Knowledge[];
    purpose: "find-house" | "found-house"
}

// Display Animal Adoption Date
export async function AnimalAdoptionDate({ dateAdoption }: { dateAdoption: string }) {
    // Fixed Hydration Failed from using new Date
    const date = new Date(dateAdoption)

    return <p>วันที่ {date && `${date.getDate()} ${displayMonthThai(date.getMonth())} ${date.getFullYear()}`}</p>;
}

export function AnimalDetail({ animal, animalKnowledges, purpose }: Props) {
    return (
        <>
            <section className="w-full">
                <div className="flex flex-col gap-3 w-full place-items-center py-2">
                    {/* Title Content */}
                    <p className="md:text-5xl sm:text-4xl text-3xl text-center font-semibold sm:py-3 py-1">{animal.name}</p>
                    {/* Animal Information */}
                    <div className="flex flex-col sm:gap-6 gap-3 p-3 xl:min-w-[1000px] max-w-[1000px] w-full sm:mx-16 mx-8">

                        {/* Main Image */}
                        <Image
                            src={`/api/image?filename=${animal.images[0]}`}
                            alt={`Picture of ${animal.name} No.0`}
                            width={0}
                            height={0}
                            sizes="100%"
                            style={{ objectFit: "cover" }}
                            placeholder="blur"
                            blurDataURL={"/default_image.webp"}
                            quality={90}
                            className="w-full sm:h-[500px] h-[300px] rounded-xl grow border border-black2/15 dark:border-white/15 shadow-lg dark:shadow-white/10"
                            priority
                        />

                        {/* Data */}
                        <Suspense fallback={<p>Loading...</p>}>
                            {purpose == "found-house" ?
                                <div className="grid justify-items-center border border-black2/5 dark:border-white/30 gap-1 text-center text-white bg-green-500 dark:bg-green-600 p-4 md:text-3xl text-xl rounded-xl shadow-lg font-semibold">
                                    <div className="flex items-center space-x-2">
                                        <StarIcon className="sm:size-8 size-6" />
                                        <p>ถูกรับเลี้ยง</p>
                                    </div>
                                    <AnimalAdoptionDate dateAdoption={animal.adoptionDate ?? ""} />
                                </div>
                                : ""}
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
                                                    src={`/api/image?filename=${src}`}
                                                    width={0}
                                                    height={0}
                                                    sizes="100%"
                                                    quality={74}
                                                    style={{ objectFit: "cover" }}
                                                    alt={`Picture of ${animal.name} No.${i}`}
                                                    className={`size-full rounded-xl shadow ${i % 3 == 0 ? "aspect-3/2" : "aspect-square"}`}
                                                />
                                            ))
                                        }
                                    </div>
                                </>
                            }
                        </div>

                        <div>
                            {/* Other Images */}
                            {
                                animalKnowledges.length ?
                                    <>
                                        <p className="md:text-2xl sm:text-xl text-lg text-center m-3">เกร็ดความรู้เพิ่มเติม</p>

                                        <div className="grid grid-cols-2 sm:gap-6 gap-3 my-2">
                                            {animalKnowledges.map((v, i) => (
                                                <Link key={i} href={`/knowledges/${v._id}`} target="_blank" className="rounded-xl">
                                                    <div className="select-none card bg-theme-100 dark:bg-theme-950/50 rounded-xl md:max-h-[400px] max-h-[350px] max-w-full hover:shadow-lg dark:shadow-white/5 cursor-pointer">
                                                        <figure className="rounded-t-xl">
                                                            <Image
                                                                src={`/api/image?filename=${v.image}`}
                                                                alt={`Picture of ${v.title}.`}
                                                                width={0}
                                                                height={0}
                                                                sizes="100%"
                                                                style={{ objectFit: "cover" }}
                                                                placeholder="blur"
                                                                blurDataURL={"/default_image.webp"}
                                                                quality={74}
                                                                className="w-full sm:h-[300px] h-[150px] transition-transform hover:brightness-50 hover:scale-105"
                                                            />
                                                        </figure>
                                                        <div className="relative card-body max-sm:p-6 pb-4 lg:px-8 md:px-4 sm:px-4 max-sm:mt-1">
                                                            {/* Date */}
                                                            {v.createdAt && <DisplayDateCard date={Date.parse(v.createdAt)} />}
                                                            {/* Title */}
                                                            <p className="card-title text-theme-950 dark:text-theme-50 lg:text-3xl text-xl text-nowrap truncate">{v.title.length <= 31 ? v.title : v.title.slice(0, 31).concat("...")}</p>
                                                            {/* Description */}
                                                            <p className="text-theme-800 dark:text-theme-100 text-xs truncate">{v.describe}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                    : ""}
                        </div>
                    </div>

                    {/* Display Request Form */}
                    {purpose == "find-house" ?
                        <><hr className="w-full my-6 border" />
                            <RequestForm animalId={animal._id} animalName={animal.name} animalSpecie={animal.specie === "Dog" ? "🐶" : "🐱"} />
                        </>
                        : ""}

                </div>
            </section>
        </>
    )
}