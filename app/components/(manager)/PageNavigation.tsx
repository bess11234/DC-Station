'use client'
import { useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline"

interface Props {
    totalPage: number
}

export function PageNavigation({ totalPage }: Props) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()

    // ดึงข้อมูลจาก param pages มาใส่ไว้ หากไม่ใช่ Number ก็กำหนดให้เป็น 1
    const [page, setPage] = useState<number>(searchParams.get("pages") != undefined ? Number(searchParams.get("pages")) <= totalPage ? Number(searchParams.get("pages")) : 1 || 1 : 1)

    const handlePages = useDebouncedCallback((number: number) => {
        const params = new URLSearchParams(searchParams)
        params.set("pages", number + "")
        setPage(number)

        router.replace(`${pathName}?${params.toString()}`, { scroll: false })
    }, 300)

    return (
        <div className="flex justify-end w-full max-w-[1500px] mx-auto mt-3 space-x-3 items-center select-none">
            <ChevronDoubleLeftIcon aria-disabled={page != 1} onClick={() => page == 1 && handlePages(1)} className={`transition-colors duration-300 size-8 p-1 rounded-full hover:bg-black2/5 dark:hover:bg-white/5 ${page == 1 ? "opacity-25" : "cursor-pointer"}`} />
            <ChevronLeftIcon aria-disabled={page != 1} onClick={() => handlePages(page - 1 > 0 ? page - 1 : page)} className={`transition-colors duration-300 size-8 p-1 rounded-full hover:bg-black2/5 dark:hover:bg-white/5 ${page == 1 ? "opacity-25" : "cursor-pointer"}`} />
            <p className="w-8 text-center">{page}</p>
            <ChevronRightIcon aria-disabled={page != totalPage} onClick={() => handlePages(page + 1 <= totalPage ? page + 1 : page)} className={`transition-colors duration-300 size-8 p-1 rounded-full hover:bg-black2/5 dark:hover:bg-white/5 ${page == totalPage ? "opacity-25" : "cursor-pointer"}`} />
            <ChevronDoubleRightIcon aria-disabled={page != totalPage} onClick={() => handlePages(totalPage)} className={`transition-colors duration-300 size-8 p-1 rounded-full hover:bg-black2/5 dark:hover:bg-white/5 ${page == totalPage ? "opacity-25" : "cursor-pointer"}`} />
        </div>
    )
}