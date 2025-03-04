import { Metadata } from "next"
import Link from "next/link"

import { ShowAnimals } from "@/app/components/(manager)/animals/ShowAnimals"
import { ShowKnowledges } from "@/app/components/(manager)/knowledges/ShowKnowledges"

import { ShowAnimalRequests } from "@/app/components/(manager)/requests/ShowAnimalRequests"

import { InboxIcon, BookmarkSquareIcon, ArrowRightIcon, PlusIcon } from "@heroicons/react/24/outline"
import { ClockIcon, DocumentIcon, HomeIcon, HomeModernIcon } from "@heroicons/react/24/solid"

import { fetchAnimalCount, fetchKnowledgeCount, fetchAnimals, fetchKnowledges, fetchAnimalFindHouseCount, fetchAnimalFoundHouseCount, fetchRequestCount, fetchRequestPendingCount, fetchAnimalRequests } from "@/app/lib/data"

export const metadata: Metadata = {
    title: "Dashboard"
}

export default async function DashBoard() {
    const [countAnimal, countKnowledge, countAnimalsFindHouse, countAnimalsFoundHouse, countRequests, countRequestsPending] = await Promise.all([fetchAnimalCount(), fetchKnowledgeCount(), fetchAnimalFindHouseCount(), fetchAnimalFoundHouseCount(), fetchRequestCount(), fetchRequestPendingCount()])
    const animals = Promise.all([fetchAnimals(0, 3)]);
    const knowledges = Promise.all([fetchKnowledges(0, 3)]);
    const animalRequests = Promise.all([fetchAnimalRequests(0, 3)]); // have totalPending, totalRejected

    return (
        <>
            <div className="flex flex-col w-full py-8">
                {/* Title */}
                <p className="md:text-5xl sm:text-4xl text-3xl font-bold text-center my-3">แดชบอร์ด</p>

                <div className="grid lg:grid-cols-4 grid-cols-2 sm:gap-6 gap-4 p-3 mb-6">
                    <div className="grid justify-items-center gap-2 bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:py-6 sm:px-8 py-3 px-4 border border-black2/5 dark:border-white/5 shadow-lg dark:shadow-white/3">
                        <ClockIcon className="max-w-[144px] max-h-[144px] w-[10vw] h-[10vw] min-w-[50px] min-h-[50px]" />
                        <p className="text-center lg:text-3xl md:text-2xl text-lg font-semibold">คำร้องขอที่ยังไม่ตอบ</p>
                        <p className="lg:text-6xl md:text-5xl text-3xl text-theme-500 dark:text-theme-400 ">{countRequestsPending}</p>
                    </div>

                    <div className="grid justify-items-center gap-2 bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:py-6 sm:px-8 py-3 px-4 border border-black2/5 dark:border-white/5 shadow-lg dark:shadow-white/3">
                        <DocumentIcon className="max-w-[144px] max-h-[144px] w-[10vw] h-[10vw] min-w-[50px] min-h-[50px]" />
                        <p className="text-center lg:text-3xl md:text-2xl text-lg font-semibold">คำร้องขอทั้งหมด</p>
                        <p className="lg:text-6xl md:text-5xl text-3xl">{countRequests}</p>
                    </div>

                    <div className="grid justify-items-center gap-2 bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:py-6 sm:px-8 py-3 px-4 border border-black2/5 dark:border-white/5 shadow-lg dark:shadow-white/3">
                        <HomeIcon className="max-w-[144px] max-h-[144px] w-[10vw] h-[10vw] min-w-[50px] min-h-[50px]" />
                        <p className="text-center lg:text-3xl md:text-2xl text-lg font-semibold">สัตว์ที่ต้องการบ้าน</p>
                        <p className="lg:text-6xl md:text-5xl text-3xl">{countAnimalsFindHouse}</p>
                    </div>

                    <div className="grid justify-items-center gap-2 bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:py-6 sm:px-8 py-3 px-4 border border-black2/5 dark:border-white/5 shadow-lg dark:shadow-white/3">
                        <HomeModernIcon className="max-w-[144px] max-h-[144px] w-[10vw] h-[10vw] min-w-[50px] min-h-[50px]" />
                        <p className="text-center lg:text-3xl md:text-2xl text-lg font-semibold">สัตว์ที่ได้รับบ้าน</p>
                        <p className="lg:text-6xl md:text-5xl text-3xl">{countAnimalsFoundHouse}</p>
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:gap-8 gap-6 p-3">
                    {/* Requests */}
                    <div className="bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:p-5 p-3 hover:shadow-md dark:shadow-theme-50/10">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                            <div className="flex items-center space-x-1">
                                <InboxIcon className="size-8" />
                                <p className="md:text-3xl sm:text-xl text-lg">คำร้องขอ ({countRequestsPending})</p>
                                
                            </div>
                            <Link href={"/dashboard/requests"} className="px-3 hover:opacity-60 active:opacity-80 flex items-center space-x-1">
                                <p>ดูเพิ่มเติม</p>
                                <ArrowRightIcon className="size-4" />
                            </Link>
                        </div>

                        {/* Table */}
                        <div className="grid gap-8 py-3 max-sm:gap-y-8 w-full max-w-[1500px] mx-auto mt-3">
                            <ShowAnimalRequests animals={animalRequests}/>
                        </div>
                        
                    </div>
                    {/* Animals */}
                    <div className="bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:p-5 p-3 hover:shadow-md dark:shadow-theme-50/10">
                        {/* Head Title */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                            <div className="flex flex-wrap items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                    <BookmarkSquareIcon className="size-8" />
                                    <p className="md:text-3xl sm:text-xl text-lg">สัตว์ ({countAnimal})</p>
                                </div>
                                {/* Create Knowledge */}
                                <Link role="button" href={"/dashboard/animals/create"} className="button-secondary w-fit flex flex-row px-4 py-3 rounded-full cursor-pointer space-x-1">
                                    <PlusIcon className="size-6" /><span>เพิ่มสัตว์</span>
                                </Link>
                            </div>

                            <Link href={"/dashboard/animals"} className="px-3 hover:opacity-60 active:opacity-80 flex items-center space-x-1">
                                <p>ดูเพิ่มเติม</p>
                                <ArrowRightIcon className="size-4" />
                            </Link>
                        </div>

                        {/* Table */}
                        <div className="grid sm:gap-8 gap-6 py-3 w-full max-w-[1500px] mx-auto mt-3">
                            <ShowAnimals animals={animals} />
                        </div>
                    </div>

                    {/* Knowledges */}
                    <div className="bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:p-5 p-3 hover:shadow-md dark:shadow-theme-50/10">
                        {/* Head Title */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                            <div className="flex flex-wrap items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                    <BookmarkSquareIcon className="size-8" />
                                    <p className="md:text-3xl sm:text-xl text-lg">เกร็ดความรู้ ({countKnowledge})</p>
                                </div>
                                {/* Create Knowledge */}
                                <Link role="button" href={"/dashboard/knowledges/create"} className="button-secondary w-fit flex flex-row px-4 py-3 rounded-full cursor-pointer space-x-1">
                                    <PlusIcon className="size-6" /><span>เพิ่มเกร็ดความรู้</span>
                                </Link>
                            </div>

                            <Link href={"/dashboard/knowledges"} className="px-3 hover:opacity-60 active:opacity-80 flex items-center space-x-1">
                                <p>ดูเพิ่มเติม</p>
                                <ArrowRightIcon className="size-4" />
                            </Link>
                        </div>

                        {/* Table */}
                        <div className="grid gap-8 py-3 max-sm:gap-y-8 w-full max-w-[1500px] mx-auto mt-3">
                            <ShowKnowledges knowledges={knowledges} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}