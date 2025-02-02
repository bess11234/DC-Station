'use client'

import { useSearchParams, usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { NoSymbolIcon } from "@heroicons/react/24/outline"

export function FilterAnimals() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()

    const filterSpecie = (term: string) => {
        const params = new URLSearchParams(searchParams)
        if (params.get("specie") == term) {
            params.delete("specie")
        }
        else if (term) {
            params.set("specie", term)
        } else params.delete("specie")
        router.replace(`${pathName}?${params.toString()}`, { scroll: false })
    }

    const filterAge = (term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set("age", term)
        } else params.delete("age")
        router.replace(`${pathName}?${params.toString()}`, { scroll: false })
    }

    const filterGender = (term: string) => {
        const params = new URLSearchParams(searchParams)
        if (params.get("gd") == term) {
            params.delete("gd")
        }
        else if (term) {
            params.set("gd", term)
        } else params.delete("gd")
        router.replace(`${pathName}?${params.toString()}`, { scroll: false })
    }

    return (
        <>
            <div className="flex flex-col sm:p-6 p-3 py-6 bg-black2/5 dark:bg-white/5 rounded-lg gap-3 sm:w-[500px] w-[300px] shadow-lg">

                {/* Filter Specie */}
                <div className="flex flex-row sm:gap-6 gap-3 place-items-center justify-center">
                    <button onClick={() => filterSpecie("dog")} className={`sm:w-fit button-theme px-6 py-3 rounded-lg cursor-pointer sm:text-2xl text-lg text-white shadow-md transition hover:scale-95 active:scale-90 ${searchParams.get("specie") == "dog" && "outline"}`}>🐶 <span className="max-sm:hidden">น้อง</span>หมา</button>
                    <button onClick={() => filterSpecie("cat")} className={`sm:w-fit button-theme px-6 py-3 rounded-lg cursor-pointer sm:text-2xl text-lg text-white shadow-md transition hover:scale-95 active:scale-90 ${searchParams.get("specie") == "cat" && "outline"}`}>🐱 <span className="max-sm:hidden">น้อง</span>แมว</button>
                </div>

                {/* Filter Gender */}
                <div className="grid w-full text-center">
                    <p className="text-xl">เพศ</p>
                    <div className="flex justify-center sm:gap-6 gap-3">
                        <button  onClick={() => filterGender("m")} className={`sm:w-fit button-sky px-6 py-3 rounded-lg cursor-pointer sm:text-2xl text-xl text-white shadow-md transition hover:scale-95 active:scale-90 ${searchParams.get("gd") == "m" && "outline"}`}>♂</button>
                        <button  onClick={() => filterGender("f")} className={`sm:w-fit button-red px-6 py-3 rounded-lg cursor-pointer sm:text-2xl text-xl text-white shadow-md transition hover:scale-95 active:scale-90 ${searchParams.get("gd") == "f" && "outline"}`}>♀</button>
                    </div>
                </div>

                {/* Filter Age */}
                <div className="grid w-full text-center sm:text-xl text-lg">
                    <p>เริ่มช่วงอายุ (ปี)</p>
                    <input onChange={(e) => filterAge(e.target.value)} type="range" className="range w-full" min={0} max="4" defaultValue="0" step="1" />
                    <div className="flex justify-between px-2.5 mt-2 text-xs">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                    </div>
                    <div className="flex justify-between px-1.5 mt-2 text-xs">
                        <span><NoSymbolIcon className="size-3.5" /></span>
                        <span>{"<1"}</span>
                        <span>1-5</span>
                        <span>5-10</span>
                        <span>10+</span>
                    </div>
                </div>
            </div>
        </>
    )
}