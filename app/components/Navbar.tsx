'use client'
import Link from "next/link";
import Image from "next/image";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { usePathname } from 'next/navigation'

import { PiPawPrint, PiPawPrintFill } from "react-icons/pi";
import { BsBook, BsBookFill } from "react-icons/bs";
import { RiContactsBook3Line, RiContactsBook3Fill } from "react-icons/ri";
import { HomeIcon as HomeOutline } from "@heroicons/react/24/outline";
import { HomeIcon as HomeSolid } from "@heroicons/react/24/solid";

export const metadata = {
    icons: {
        icon: '/favicon.ico',
    },
};

// Narbar Component
function Navbar() {
    const path = usePathname()
    const LinkPath = [
        { name: "หน้าหลัก", link: "/", icons: [<HomeOutline className="sm:size-6 size-8 max-sm:mx-4" key="1" />, <HomeSolid className="sm:size-6 size-8 max-sm:mx-4" key="2" />] },
        { name: "น้องหาบ้าน", link: "/find-house", icons: [<PiPawPrint className="sm:size-6 size-8 max-sm:mx-4" key="1" />, <PiPawPrintFill className="sm:size-6 size-8 max-sm:mx-4" key="2" />] },
        { name: "เกร็ดความรู้", link: "/knowledges", icons: [<BsBook className="sm:size-6 size-8 mr-2 max-sm:mx-4" key="1" />, <BsBookFill className="sm:size-6 size-8 mr-2 max-sm:mx-4" key="2" />] },
        { name: "ติดต่อสอบถาม", link: "/contact", icons: [<RiContactsBook3Line className="sm:size-6 size-8 max-sm:mx-4" key="1" />, <RiContactsBook3Fill className="sm:size-6 size-8 max-sm:mx-4" key="2" />] },
    ]

    return (
        <>
            <div className="sticky top-0 z-40 w-full bg-white/80 dark:bg-black2/80 backdrop-blur-sm h-fit">
                <div className="max-w-8xl mx-auto border-b not-dark:border-black2/20 border-white/20">
                    <div className="py-4 lg:px-8 lg:mx-0 mx-4">
                        <div className="relative grid xs:grid-cols-3 grid-cols-2 items-center max-xs:col-span-2">
                            {/* Left side */}
                            <Link
                                className="max-sm:justify-self-start mr-3 overflow-hidden  w-fit"
                                href={"/"}
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

                            {/* Right side */}
                            <div className="flex flex-row justify-self-end xs:col-span-2 md:text-base text-sm">
                                <nav className="hidden sm:flex [&>a]:px-3 [&>a]:py-1 [&>a]:rounded-full space-x-1">
                                    {LinkPath.filter((_, i) => i != 0).map((v, i) => (
                                        <Link
                                            key={i}
                                            href={v.link}
                                            className={"flex space-x-1 items-center transition-colors duration-300 " + (path == v.link && "dark:text-theme-200 bg-theme-400/20 dark:bg-theme-300/20 ") + (path != v.link && " hover:bg-black2/5 dark:hover:bg-white/10 ")}
                                        >
                                            {path == v.link ? v.icons[1] : v.icons[0]}
                                            <span>{v.name}</span>
                                        </Link>
                                    ))}
                                </nav>

                                <div className="sm:hidden flex">
                                    {/* Button for Display Navbar */}
                                    <button type="button" popoverTarget="popoverNavbar">
                                        <EllipsisVerticalIcon className="size-6" />
                                    </button>

                                    {/* Display Navbar */}
                                    <div className="fixed z-50 transition-all duration-300 transition-discrete open:opacity-100 starting:open:opacity-0 opacity-0 open:top-[4.5rem] starting:open:top-[4.1rem] top-[4.1rem] bg-black2/10 dark:bg-black2/50 h-screen"
                                        popover="auto" id="popoverNavbar" aria-label="Navbar popover" aria-description="Show the navbar items." onClick={() => document.getElementById("popoverNavbar")?.hidePopover()} >
                                        <div className="w-[100vw] overflow-y-hidden bg-white dark:bg-neutral-950 dark:text-white shadow-inner border-t hover:shadow">
                                            <div className="py-4 lg:px-8 lg:mx-0 mx-4">
                                                <nav className="flex flex-col space-y-1">
                                                    {LinkPath.map((v, i) => (
                                                        <Link key={i} href={v.link} onClick={() => document.getElementById("popoverNavbar")?.hidePopover()} className={`py-1 flex flex-row items-center cursor-pointer rounded-full ${v.link == path && "scale-100 dark:text-theme-200 bg-theme-400/20 dark:bg-theme-300/20"}`} >
                                                            <div className="relative">
                                                                {path == v.link ? v.icons[1] : v.icons[0]}
                                                                <div className={`transition-all delay-100 duration-300 absolute top-0 size-full scale-0 rounded-full`}></div>
                                                            </div>
                                                            <p className={`transition-colors text-xs ${v.link == path && "dark:text-theme-100"}`}>{v.name}</p>
                                                        </Link>
                                                    ))}
                                                </nav>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Navbar;
