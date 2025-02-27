'use client'

import { useDebouncedCallback } from "use-debounce"

import { useSearchParams, usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { NoSymbolIcon } from "@heroicons/react/24/outline"

export function FilterAnimals() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()

    const filterSpecie = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        if (params.get("specie") == term) {
            params.delete("specie")
        }
        else if (term) {
            params.set("specie", term)
        } else params.delete("specie")
        router.replace(`${pathName}?${params.toString()}`, { scroll: false })
    }, 100)

    const filterAge = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set("age", term)
        } else params.delete("age")
        router.replace(`${pathName}?${params.toString()}`, { scroll: false })
    }, 300)

    const filterGender = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        if (params.get("gd") == term) {
            params.delete("gd")
        }
        else if (term) {
            params.set("gd", term)
        } else params.delete("gd")
        router.replace(`${pathName}?${params.toString()}`, { scroll: false })
    } , 100)

    return (
        <>
            <div className="flex flex-col sm:p-6 p-3 py-6 card-theme rounded-lg gap-3 sm:w-[500px] w-[300px] shadow-lg fonsemibold">

                {/* Filter Specie */}
                <div className="flex flex-row place-items-center justify-center">
                    <button onClick={() => filterSpecie("dog")} className={`sm:w-fit rounded-l-lg sm:px-6 sm:py-3 px-3 py-1.5 cursor-pointer sm:text-2xl text-xl transition hover:shadow dark:shadow-white/15 ${searchParams.get("specie") == "dog" ? "button-theme-primary" : " hover:opacity-75 active:opacity-90 bg-black2/5 dark:bg-white/10"}`}>🐶 <span className="max-sm:hidden">น้อง</span>หมา</button>
                    <button onClick={() => filterSpecie("cat")} className={`sm:w-fit rounded-r-lg sm:px-6 sm:py-3 px-3 py-1.5 cursor-pointer sm:text-2xl text-xl transition hover:shadow dark:shadow-white/15 ${searchParams.get("specie") == "cat" ? "button-theme-primary" : "hover:opacity-75 active:opacity-90 bg-black2/5 dark:bg-white/10"}`}>🐱 <span className="max-sm:hidden">น้อง</span>แมว</button>
                </div>

                {/* Filter Gender */}
                <div className="grid w-full text-center">
                    <p className="sm:text-xl">เพศ</p>
                    <div className="flex justify-center">
                        <button  onClick={() => filterGender("m")} className={`sm:w-fit rounded-l-lg sm:px-6 sm:py-3 px-3 py-1.5 cursor-pointer sm:text-2xl text-xl transition hover:opacity-75 active:opacity-90 hover:shadow dark:shadow-white/15 ${searchParams.get("gd") == "m" ? "bg-sky-600 text-white dark:bg-sky-700" : "bg-black2/5 dark:bg-white/10"}`}>♂ <span className="max-sm:hidden">ชาย</span><span className="sm:hidden">ช.</span></button>
                        <button  onClick={() => filterGender("f")} className={`sm:w-fit rounded-r-lg sm:px-6 sm:py-3 px-3 py-1.5 cursor-pointer sm:text-2xl text-xl transition hover:opacity-75 active:opacity-90 hover:shadow dark:shadow-white/15 ${searchParams.get("gd") == "f" ? "bg-rose-600 text-white dark:bg-rose-700" : "bg-black2/5 dark:bg-white/10"}`}>♀ <span className="max-sm:hidden">หญิง</span><span className="sm:hidden">ญ.</span></button>
                    </div>
                </div>

                {/* Filter Age */}
                <div className="grid w-full text-center">
                    <p className="sm:text-xl">เริ่มช่วงอายุ (ปี)</p>
                    <input onChange={(e) => filterAge(e.target.value)} type="range" className="range range-theme w-full" min={0} max="4" defaultValue="0" step="1" />
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