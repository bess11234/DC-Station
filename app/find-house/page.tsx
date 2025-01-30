import { Carousel, GalleryImage } from "../components/Carousel"
import type { Animal } from "../lib/definition"
import { Animals } from "../components/animals/Animals"
import { Metadata } from "next"

import { FilterAnimals } from "../components/animals/FilterAnimals"
import { Suspense } from "react"

export const metadata: Metadata = {
    title: "Find House"
}

const gallery: GalleryImage[] = [
    { src: "image0.webp", alt: "Clarity for pets." },
    { src: "image1.webp", alt: "Stray cats needed for housing." },
    { src: "image2.webp", alt: "Stray dogs needed for housing." }
]

const animals: Animal[] = [
    { images: ["/animals/bo.webp"], name: "น้องโบ", personalities: ["ซุกซน", "น่ารัก", "ชอบวิ่งเล่น", "เจ้าเล่ห์"], breed: "Bulldog", dob: "2024/12/30", gender: "Male", healthHistories: { spayingStatus: "หมันแล้ว" }, history: "เกือบเป็นซอยจุ๊ให้คนจีน", id: "123123012039012", specie: "Dog", weight: 20.30 },
    { images: ["/animals/nam_tan.webp"], name: "น้องน้ำตาล", personalities: ["สงบเสงี่ยม", "ชอบให้กอด", "ให้จับเฉพาะคนที่ชอบมาจับ"], breed: "Persian", dob: "2021/12/30", gender: "Male", healthHistories: { spayingStatus: "หมันแล้ว" }, history: "เกือบเป็นซอยจุ๊ให้คนจีน", id: "123123012039012", specie: "Cat", weight: 20.30 },
    { images: ["/animals/num.webp"], name: "น้องนุ่น", personalities: ["น่ารัก", "ขี้อ้อน", "ชอบให้ลูบ"], breed: "Siamese", dob: "2021/12/30", gender: "Female", healthHistories: { spayingStatus: "หมันแล้ว" }, history: "เกือบเป็นซอยจุ๊ให้คนจีน", id: "123123012039012", specie: "Cat", weight: 20.30 },
]

export default function FindHouse() {

    return (
        <div className="grid justify-items-center min-h-screen overflow-x-hidden">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

                {/* Carousel */}
                <Carousel images={gallery} />

                {/* Title Content */}
                <div className="flex flex-col gap-3 w-full place-items-center">
                    <p className="md:text-3xl sm:text-2xl text-xl text-center">สร้างครอบครัวที่อบอุ่นให้น้อง <span><br />(DC Station 🐶 & 🐱)</span></p>

                    {/* Filter animal (Species, Age, Gender) */}
                    <FilterAnimals />
                </div>

                {/* Animals */}
                <div className="flex flex-col w-screen px-3">
                    <Suspense fallback={<p>Loading</p>}>
                        <Animals animals={animals} />
                    </Suspense>
                </div>

            </main>
        </div>
    )
}