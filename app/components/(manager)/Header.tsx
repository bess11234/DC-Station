'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { HomeIcon, InboxIcon, HeartIcon, BookmarkSquareIcon, ArrowRightStartOnRectangleIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid"

export default function Sidebar() {
    const [hoverMouse, setHoverMouse] = useState<string | null>(null)

    const pathName = usePathname()

    const classIcon = `transition-all size-8 mx-4 p-0.5 `
    const linkPath = [
        { name: "หน้าหลัก", link: "/dashboard", icon: <HomeIcon className={`${classIcon} ${hoverMouse == "Home" && "scale-105 dark:stroke-theme-200"} ${pathName == "/dashboard" ? "stroke-current dark:stroke-theme-200 dark:text-theme-200" : "stroke-current fill-none"}`} strokeWidth={1.8} /> },
        { name: "คำร้องขอ", link: "/dashboard/requests", icon: <InboxIcon className={`${classIcon} ${hoverMouse == "Requests" && "scale-105 dark:stroke-theme-200"} ${pathName == "/dashboard/requests" ? "stroke-current dark:stroke-theme-200 dark:text-theme-200" : "stroke-current fill-none"}`} strokeWidth={1.8} /> },
        { name: "สัตว์", link: "/dashboard/animals", icon: <HeartIcon className={`${classIcon} ${hoverMouse == "Animals" && "scale-105 dark:stroke-theme-200"} ${pathName == "/dashboard/animals" ? "stroke-current dark:stroke-theme-200 dark:text-theme-200" : "stroke-current fill-none"}`} strokeWidth={1.8} /> },
        { name: "เกร็ดความรู้", link: "/dashboard/knowledges", icon: <BookmarkSquareIcon className={`${classIcon} ${hoverMouse == "Knowledges" && "scale-105 dark:stroke-theme-200"} ${pathName == "/dashboard/knowledges" ? "stroke-current dark:stroke-theme-200 dark:text-theme-200" : "stroke-current fill-none"}`} strokeWidth={1.8} /> },
    ]
    return (
        <div className="sticky z-40 top-0 sm:h-screen flex sm:flex-col flex-row place-content-between sm:justify-items-center sm:py-10 sm:px-6 py-4 px-4 sm:border-r max-sm:border-b not-dark:border-black2/20 border-white/20 bg-white dark:bg-black2">
            {/* Sidebar */}
            <div className="sm:block hidden space-y-5">
                {linkPath.map((v, i) => (
                    <Link key={i} href={v.link} className="flex flex-col items-center cursor-pointer outline-offset-2 rounded-2xl pb-0.5" onMouseEnter={() => { setHoverMouse(v.name) }} onMouseLeave={() => setHoverMouse(null)} >
                        <div className="relative">
                            {v.icon}
                            <div className={`transition-all delay-100 duration-300 absolute top-0 size-full scale-0 rounded-full ${v.link == pathName && "scale-100 bg-theme-400/20 dark:bg-theme-300/20"} ${hoverMouse == v.name && v.link != pathName && "scale-100 bg-black2/5 dark:bg-white/10"}`}></div>
                        </div>
                        <p className={`transition-colors text-xs ${v.link == pathName && "dark:text-theme-100"} ${hoverMouse == v.name && "dark:text-theme-100"}`}>{v.name}</p>
                    </Link>
                ))
                }
            </div>
            <form action="" className="sm:flex hidden flex-col items-center" onMouseEnter={() => { setHoverMouse("ล็อคเอาท์") }} onMouseLeave={() => setHoverMouse(null)}>
                <button className="cursor-pointer outline-offset-2 rounded-2xl pb-0.5" type="submit">
                    <div className="relative">
                        <ArrowRightStartOnRectangleIcon className={`${classIcon} ${hoverMouse == "ล็อคเอาท์" && "scale-105 "}`} />
                        <div className={`absolute top-0 size-full rounded-full ${hoverMouse == "ล็อคเอาท์" && "bg-black2/5 dark:bg-white/10"}`}></div>
                    </div>
                    <p className={`transition-colors text-xs ${hoverMouse == "ล็อคเอาท์" && "dark:text-theme-100"}`}>ล็อคเอาท์</p>
                </button>
            </form>

            {/* Navbar */}
            <div className="block sm:hidden space-y-5 align-center">
                <Link
                    href="/dashboard"
                >
                    <div className="relative flex items-center space-x-2">
                        <Image
                            alt="Logo of Dogs and Cats"
                            src="/favicon.ico"
                            style={{ width: "40px", height: "40px" }}
                            width={40}
                            height={40}
                        />
                        <p className="font-semibold text-xl">DC <span className="max-xs:text-base">Station</span></p>
                    </div>
                </Link>
            </div>

            <div className="sm:hidden flex place-self-end self-center">
                {/* Button for Display Navbar */}
                <button type="button" popoverTarget="popoverNavbar">
                    <EllipsisVerticalIcon className="size-6" />
                </button>

                {/* Display Navbar */}
                <div className="fixed transition-all duration-300 transition-discrete open:opacity-100 starting:open:opacity-0 opacity-0 open:top-[4.5rem] starting:open:top-[4.1rem] top-[4.1rem] bg-black2/10 dark:bg-black2/50 h-screen"
                    popover="auto" id="popoverNavbar" aria-label="Navbar popover" aria-description="Show the navbar items." onClick={() => document.getElementById("popoverNavbar")?.hidePopover()}>
                    <div className="w-[100vw] overflow-y-hidden bg-white dark:bg-neutral-950 dark:text-white shadow-inner border-t hover:shadow">
                        <div className="py-4 lg:px-8 lg:mx-0 mx-4">
                            <div className="flex flex-col space-y-1">
                                {linkPath.map((v, i) => (
                                    <Link key={i} href={v.link} onClick={() => document.getElementById("popoverNavbar")?.hidePopover()} className={`flex flex-row items-center cursor-pointer py-1 rounded-full ${v.link == pathName && "scale-100 bg-theme-400/20 dark:bg-theme-300/20"} ${hoverMouse == v.name && v.link != pathName && "scale-100 bg-black2/5 dark:bg-white/10"}`} onMouseEnter={() => { setHoverMouse(v.name) }} onMouseLeave={() => setHoverMouse(null)} >
                                        <div className="relative">
                                            {v.icon}
                                            <div className={`transition-all delay-100 duration-300 absolute top-0 size-full scale-0 rounded-full`}></div>
                                        </div>
                                        <p className={`transition-colors text-xs ${v.link == pathName && "dark:text-theme-100"} ${hoverMouse == v.name && "dark:text-theme-100"}`}>{v.name}</p>
                                    </Link>
                                ))
                                }
                                <form action="" className="flex sm:hidden border-t pt-3" onMouseEnter={() => { setHoverMouse("ล็อคเอาท์") }} onMouseLeave={() => setHoverMouse(null)}>
                                    <button className="flex items-center cursor-pointer" type="submit">
                                        <div className="relative">
                                            <ArrowRightStartOnRectangleIcon className={`${classIcon} ${hoverMouse == "ล็อคเอาท์" && "scale-105 "}`} />
                                            <div className={`absolute top-0 size-full rounded-full ${hoverMouse == "ล็อคเอาท์" && "bg-black2/5 dark:bg-white/10"}`}></div>
                                        </div>
                                        <p className={`transition-colors text-xs ${hoverMouse == "ล็อคเอาท์" && "dark:text-theme-100"}`}>ล็อคเอาท์</p>
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}