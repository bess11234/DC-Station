'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ReactElement } from "react"

import { ChevronLeftIcon } from "@heroicons/react/24/outline"

import type { Animal } from "../lib/definition"
import { animals } from "../lib/data"

export function Breadcrumbs() {
    const pathName = usePathname()
    let pathLink: string[] | ReactElement[] = pathName.split("/")
    let lastLink: ReactElement = <span></span>

    let isAnimal = false

    pathLink = pathLink.map((v, i, before) => {
        let text: string | Animal = v
        // ถ้าเป็นสัตว์จะไปค้นหา ID
        if (isAnimal) { text = animals.filter((animal) => animal.id == text)[0].name; isAnimal = false }

        // Normal Case
        if (v == "") text = "หน้าหลัก"
        if (v == "find-house") { text = "หาบ้านให้น้อง"; isAnimal = true }
        if (v == "contact") { text = "ติดต่อสอบถาม";}

        // Generate Link
        if (i == pathLink.length - 1) {
            lastLink = <Link className="flex sm:hidden items-center" href={pathName.slice(0, pathName.indexOf(v))}><ChevronLeftIcon className="size-5" />{text}</Link>
            return <span key={i}>{text}</span>
        } return (<div key={i}><Link className="hover:underline underline-offset-1" href={pathName.slice(0, pathName.indexOf(before[i + 1]))} >{text}</Link><span>&nbsp;/&nbsp;</span></div>)
    })
    return (
        <div className="py-4 lg:px-8 lg:mx-0 mx-4 w-full place-self-start justify-self-start">
            <div className="hidden sm:flex">{pathLink}</div>
            {lastLink}
        </div>
    )
}