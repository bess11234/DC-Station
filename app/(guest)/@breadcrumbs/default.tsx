'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ReactElement, useState } from "react"

import { ChevronLeftIcon } from "@heroicons/react/24/outline"

import { fetchAnimalId, fetchKnowledgeId } from "@/app/lib/data"

export default function Default() {
    const pathName = usePathname()

    // Animal State
    const [fetchName, setFetchName] = useState<string>("")

    async function getFetchName(id: string, fetch: "animal" | "knowledge") {
        if (fetch == "animal") {
            const animal = await fetchAnimalId(id)
            if (pathName.indexOf("find-house") !== -1) {
                if (animal && !animal.adoptionDate) {
                    setFetchName(animal.name)
                    return
                }
            }
            if (pathName.indexOf("found-house") !== -1) {
                if (animal && !!animal.adoptionDate) {
                    setFetchName(animal.name)
                    return
                }
            }
        }
        if (fetch == "knowledge") {
            const knowledge = await fetchKnowledgeId(id)
            if (knowledge) {
                setFetchName(knowledge.title)
                return
            }
        }
        setFetchName("")
    }

    let pathLink: string[] | ReactElement[] = pathName.split("/")
    let lastLink: ReactElement = <span></span>

    let keyFetch: "animal" | "knowledge" | ""

    let isGenerated = true

    pathLink = pathLink.map((v, i, before) => {
        let text: string = v

        // ถ้าเป็นสัตว์จะไปค้นหา ID
        if (keyFetch) {
            getFetchName(text, keyFetch)
            text = fetchName
            if (!fetchName) isGenerated = false // ไม่ทำการ Generate หาก FetchName ไม่มี
            keyFetch = ""
        }

        // Normal Case
        if (v == "") text = "หน้าหลัก"
        if (v == "find-house") { text = "น้องหาบ้าน"; keyFetch = "animal" }
        if (v == "found-house") { text = "น้องมีบ้านแล้ว"; keyFetch = "animal" }
        if (v == "contact") { text = "ติดต่อสอบถาม"; }
        if (v == "knowledges") { text = "เกร็ดความรู้"; keyFetch = "knowledge" }

        // Generate Link
        if (i == pathLink.length - 1) {
            lastLink = <Link className="flex sm:hidden items-center" href={pathName.slice(0, pathName.indexOf(v))}><ChevronLeftIcon className="size-5" />{text}</Link>
            return <span key={i}>{text}</span>
        } return (<div key={i}><Link className="hover:underline underline-offset-1" href={pathName.slice(0, pathName.indexOf(before[i + 1]))} >{text}</Link><span>&nbsp;/&nbsp;</span></div>)
    })
    return (
        <>
            {isGenerated && <div className="py-4 lg:px-8 lg:ml-0 ml-4 w-full place-self-start justify-self-start">
                <div className="hidden sm:flex">{pathLink}</div>
                {lastLink}
            </div>}
        </>
    )
}