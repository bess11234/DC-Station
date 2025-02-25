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

    const [page, setPage] = useState<number>(1)

    const handlePages = useDebouncedCallback((number: number) => {
        const params = new URLSearchParams(searchParams)
        params.set("pages", number + "")
        setPage(number)

        router.replace(`${pathName}?${params.toString()}`, { scroll: false })
    }, 300)
    return (
        <div className="flex justify-end w-full max-w-[1500px] mx-auto mt-3 space-x-3 items-center select-none">
            <ChevronDoubleLeftIcon onClick={() => handlePages(1)} className="size-6 cursor-pointer" />
            <ChevronLeftIcon onClick={() => handlePages(page - 1 > 0 ? page - 1 : page)} className="size-6 cursor-pointer" />
            <p className="w-8 text-center">{page}</p>
            <ChevronRightIcon onClick={() => handlePages(page + 1 <= totalPage ? page + 1 : page)} className="size-6 cursor-pointer" />
            <ChevronDoubleRightIcon onClick={() => handlePages(totalPage)} className="size-6 cursor-pointer" />
        </div>
    )
}