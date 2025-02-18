'use client'
import { useState } from "react"

import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline"

interface Props {
    totalPage: number
}

export function PageNavigation({ totalPage }: Props) {
    const [page, setPage] = useState<number>(1)

    return (
        <div className="flex justify-end w-full max-w-[1500px] mx-auto mt-3 space-x-3 items-center select-none">
            <ChevronDoubleLeftIcon onClick={() => setPage(1)} className="size-6 cursor-pointer" />
            <ChevronLeftIcon onClick={() => setPage(e => e-1 > 0 ? e-1 : e)} className="size-6 cursor-pointer" />
            <p className="w-8 text-center">{page}</p>
            <ChevronRightIcon onClick={() => setPage(e => e+1 <= totalPage ? e+1 : e)} className="size-6 cursor-pointer" />
            <ChevronDoubleRightIcon onClick={() => setPage(totalPage)} className="size-6 cursor-pointer" />
        </div>
    )
}