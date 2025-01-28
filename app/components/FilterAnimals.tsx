'use client'

import { useSearchParams, usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import debounce from "debounce"

export async function FilterAnimals() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()

    const filter = debounce((term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term){
            params.set("query", term)
        }else params.delete("query")
        router.replace(`$`)
    }, 300)

    return (
        <div className="flex flex-row sm:gap-6 gap-3 place-items-center">
            <button className="sm:w-fit button-theme px-6 py-3 rounded-lg cursor-pointer sm:text-2xl text-lg text-white shadow-md transition hover:scale-95 active:scale-90">🐶<span className="max-sm:hidden"> น้องหมา</span></button>
            <button className="sm:w-fit button-theme px-6 py-3 rounded-lg cursor-pointer sm:text-2xl text-lg text-white shadow-md transition hover:scale-95 active:scale-90">🐱<span className="max-sm:hidden"> น้องแมว</span></button>
            <button className="sm:w-fit button-theme px-6 py-3 rounded-lg cursor-pointer sm:text-2xl text-lg text-white shadow-md transition hover:scale-95 active:scale-90">🐶 & 🐱</button>
        </div>
    )
}