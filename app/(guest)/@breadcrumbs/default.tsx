'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ReactElement, useState } from "react"

import { ChevronLeftIcon } from "@heroicons/react/24/outline"

import { fetchAnimalId, fetchKnowledgeId } from "@/app/lib/data"

export default function Default() {
    const pathName = usePathname()

    // เพื่อใช้ในการแสดงข้อมูลชื่อของ Item ที่ดึง
    const [fetchName, setFetchName] = useState<string>("")

    // เพื่อดึงข้อมูลจาก ฐานข้อมูล หากเป็น (animal) เอาชื่อมาใส่ หากเป็น (knowledge) เอาชื่อเรื่องมาใส่
    async function getFetchName(id: string, fetch: "animal" | "knowledge") {
        if (fetch == "animal") {
            const animal = await fetchAnimalId(id)

            // หากสัตว์ที่ใส่มาเป็นสัตว์ที่ต้อง หาบ้าน จะตรวจสอบว่าใช้สัตว์ที่ไม่ถูกรับเลี้ยงจริง ๆ ไหม
            if (pathName.indexOf("find-house") !== -1) {
                if (animal && !animal.adoptionDate) {
                    setFetchName(animal.name)
                    return
                }
            }

            // หากสัตว์ที่ใส่มาเป็นสัตว์ที่ต้อง หาบ้าน จะตรวจสอบว่าใช้สัตว์ที่ถูกรับเลี้ยงจริง ๆ ไหม
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

        // หากไม่เข้าเงื่อนไช จะ Reset ค่า
        setFetchName("")
    }

    // ใช้เพื่อนำไปแสดงเป็น Path ให้ผู้ใช้เห็น
    let pathLink: string[] | ReactElement[] = pathName.split("/")

    // Path สุดท้ายจะไม่สามารถกดเป็น Link ได้
    let lastLink: ReactElement = <span></span>

    // ใช้เพื่อจะดึงข้อมูลจากหลังบ้าน จากไหน
    let keyFetch: "animal" | "knowledge" | ""

    // จะทำการแสดง หากเป็น True
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
        } return (<div key={i}><Link className="transition-all underline-offset-1 opacity-60 dark:opacity-50 hover:underline hover:opacity-100 duration-300" href={pathName.slice(0, pathName.indexOf(before[i + 1]))} >{text}</Link><span>&nbsp;/&nbsp;</span></div>)
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