import { notFound } from "next/navigation"
import Image from "next/image"
import { Suspense } from "react"

import { animals } from "@/app/lib/data"
import { ShowData } from "./showData"

export default async function FindHouseID({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const animal = animals.filter(v => v.id == id)[0]
    if (!animal) notFound();

    return (
        <>
            {/* Title Content */}
            <div className="flex flex-col gap-3 w-full place-items-center">
                <p className="md:text-5xl sm:text-4xl xs:text-3xl text-xl text-center py-3">สร้างครอบครัวที่อบอุ่นให้น้อง <span><br />(DC Station 🐶 & 🐱)</span></p>

                {/* Animal Information */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 p-3 max-w-[1000px]">

                    {/* Main Image */}
                    <Image
                        src={animal.images[0]}
                        alt={`Picture of ${animal.name} No.0`}
                        sizes="100%"
                        width={100}
                        height={1000}
                        style={{ width: "100%", height: "300px", objectFit: "cover" }}
                        placeholder="blur"
                        blurDataURL={animal.images[0]}
                        quality={74}
                        className="rounded-xl grow shadow"
                    />

                    {/* Data */}
                    <Suspense fallback={<p>Loading...</p>}>
                        <ShowData animal={animal} />
                    </Suspense>

                    {/* Button Contact */}
                    <a className="sm:col-span-2 button-theme px-9 py-3 rounded-full cursor-pointer mt-3 w-fit place-self-center sm:text-3xl text-xl outline-theme-800" href="https://mail.google.com/mail/u/1/?fs=1&to=test@hotmail.com&tf=cm" target="_blank">
                        ติดต่อเพื่อขอรับเลี้ยง
                    </a>

                    {/* Other Images */}
                    {
                        animal.images.length > 1 &&
                        <div className="sm:col-span-2 ">
                            <p className="md:text-2xl sm:text-xl text-lg text-center m-3">รูปภาพเพิ่มเติม</p>

                            <div className={`columns-2 gap-4 sm:gap-8 space-y-8 ${animal.images.length - 1 >= 5 && "sm:columns-3"}`}>
                                {
                                    animal.images.filter((v, i) => i != 0).map((src, i) => (
                                        <Image
                                            key={i}
                                            src={src}
                                            height={100}
                                            width={100}
                                            sizes="100vw"
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            alt={`Picture of ${animal.name} No.${i}`}
                                            className={`rounded-xl shadow ${i % 3 == 0 ? "aspect-3/2" : "aspect-square"}`}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    }

                </div>

            </div>

        </>
    )
}