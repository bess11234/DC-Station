"use client"
import { useState } from "react"

import Link from "next/link"

import { PencilSquareIcon } from "@heroicons/react/24/outline"

export function EditItem({ href }: { href: string }) {

    const [isLoading, setIsLoading] = useState(false)
    
    return (
        <Link onClick={() => setIsLoading(true)} className="absolute button-theme-primary rounded-full z-10 bottom-2 right-2 mr-2 mb-2" aria-label="Edit" role="button" tabIndex={-1} href={href}>
            <button title="Edit" className={`p-1.5 rounded-full ${isLoading ? "cursor-wait" : "cursor-pointer"}`}>
                <PencilSquareIcon className={`transition-colors size-5`} />
            </button>
        </Link>
    )
}