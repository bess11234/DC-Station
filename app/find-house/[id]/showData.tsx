'use client'
import { Animal } from "@/app/lib/definition"

export function ShowData({ animal }: {animal: Animal}) {
    const now = new Date(Date.now())
    const animal_dob = new Date(Date.parse(animal.dob))
    const animal_age = new Date(now.getTime() - animal_dob.getTime())

    return (
        <div className="space-y-2 xs:px-12 xs:py-10 p-6 rounded-lg bg-theme-50 text-theme-950 dark:bg-theme-950 dark:text-theme-50 shadow-lg outline outline-theme-300 dark:outline-theme-900">
            <p className="md:text-4xl text-3xl">{animal.name}</p>
            <div className="text-theme-800 dark:text-theme-100 md:text-base text-sm">
                <p>สายพันธุ์: {animal.breed}</p>
                <p>เพศ: {animal.gender}</p>
                <p>น้ำหนัก: {animal.weight} กิโลกรัม</p>
                <p>นิสัย: {animal.personalities.join(", ")}</p>
                <p>อายุ: {`${now.getFullYear() - animal_dob.getFullYear() - 1} ปี ${animal_age.getMonth()} เดือน (${animal.dob})`}</p>
                <p>ประวัติ: {animal.history}</p>
                <p>สุขภาพ: {animal.healthHistories.spayingStatus}</p>
                <p>โรคภัย: {!!animal.healthHistories.illeness ? animal.healthHistories.illeness : "-"}</p>
            </div>
        </div>
    )
}