import { JSX, Suspense } from "react"

import { Metadata } from "next"
import Link from "next/link"

import { ShowAnimals } from "@/app/components/(manager)/animals/ShowAnimals"
import { ShowKnowledges } from "@/app/components/(manager)/knowledges/ShowKnowledges"

import { ShowAnimalRequests } from "@/app/components/(manager)/requests/ShowAnimalRequests"

import { InboxIcon, BookmarkSquareIcon, HeartIcon, ArrowRightIcon, PlusIcon } from "@heroicons/react/24/outline"
import { ClockIcon, DocumentIcon, HomeIcon, HomeModernIcon } from "@heroicons/react/24/solid"

import { fetchAnimalCount, fetchKnowledgeCount, fetchAnimals, fetchKnowledges, fetchAnimalFindHouseCount, fetchAnimalFoundHouseCount, fetchRequestCount, fetchRequestPendingCount, fetchAnimalRequests } from "@/app/lib/data"
import { SkeletonManagerDataItem } from "@/app/components/skeletons/SkeletonManagerDataItem"

export const metadata: Metadata = {
    title: "Dashboard"
}

function StatItem({ describe, count, icon }: { describe: string, count: number, icon: JSX.Element }) {
    return (
        <div className="grid justify-items-center gap-2 bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:py-6 sm:px-8 py-3 px-4 border border-black2/5 dark:border-white/5 shadow-lg dark:shadow-white/3">
            {icon}
            <p className="text-center lg:text-3xl md:text-2xl text-lg font-semibold">{describe}</p>
            <p className="lg:text-6xl md:text-5xl text-3xl text-theme-500 dark:text-theme-400 ">{count}</p>
        </div>
    )
}

function ShowInfoItem({ icon, title, count, linkMore, data, addItem, addItemLink }: { icon: JSX.Element, title: string, count: number, linkMore: string, data: JSX.Element, addItem: boolean, addItemLink?: string }) {
    return (
        <div className="bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:p-5 p-3 hover:shadow-md dark:shadow-theme-50/10">
            {/* Head Title */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex flex-wrap items-center space-x-3">
                    <div className="flex items-center space-x-1">
                        {icon}
                        <p className="md:text-3xl sm:text-xl text-lg">{title} ({count})</p>
                    </div>
                    {/* Create Link */}
                    {addItem ?
                        <Link role="button" href={addItemLink ?? ""} className="button-secondary w-fit flex flex-row px-4 py-3 rounded-full cursor-pointer space-x-1">
                            <PlusIcon className="size-6" /><span>เพิ่ม{title}</span>
                        </Link>
                        : ""}
                </div>

                <Link href={linkMore} className="px-3 hover:opacity-60 active:opacity-80 flex items-center space-x-1">
                    <p>ดูเพิ่มเติม</p>
                    <ArrowRightIcon className="size-4" />
                </Link>
            </div>

            {/* Display data */}
            <div className="grid sm:gap-8 gap-6 py-3 w-full max-w-[1500px] mx-auto mt-3">
                <Suspense fallback={<SkeletonManagerDataItem number={3}/>}>
                    {data}
                </Suspense>
            </div>
        </div>
    )
}

export default async function DashBoard() {
    const [countAnimal, countKnowledge, countAnimalsFindHouse, countAnimalsFoundHouse, countRequests, countRequestsPending] = await Promise.all([fetchAnimalCount(), fetchKnowledgeCount(), fetchAnimalFindHouseCount(), fetchAnimalFoundHouseCount(), fetchRequestCount(), fetchRequestPendingCount()])
    const animals = Promise.all([fetchAnimals(0, 3)]);
    const knowledges = Promise.all([fetchKnowledges(0, 3)]);
    const animalRequests = Promise.all([fetchAnimalRequests(0, 3)]); // have totalPending, totalRejected

    return (
        <>
            {/* Title */}
            <p className="md:text-5xl sm:text-4xl text-3xl font-bold text-center my-3">แดชบอร์ด</p>

            <div className="grid lg:grid-cols-4 grid-cols-2 sm:gap-6 gap-4 p-3 mb-6">
                <StatItem
                    icon={<ClockIcon className="max-w-[144px] max-h-[144px] w-[10vw] h-[10vw] min-w-[50px] min-h-[50px]" />}
                    describe="คำร้องขอที่ยังไม่ตอบ"
                    count={countRequestsPending}
                />

                <StatItem
                    icon={<DocumentIcon className="max-w-[144px] max-h-[144px] w-[10vw] h-[10vw] min-w-[50px] min-h-[50px]" />}
                    describe="คำร้องขอทั้งหมด"
                    count={countRequests}
                />

                <StatItem
                    icon={<HomeIcon className="max-w-[144px] max-h-[144px] w-[10vw] h-[10vw] min-w-[50px] min-h-[50px]" />}
                    describe="สัตว์ที่ต้องการบ้าน"
                    count={countAnimalsFindHouse}
                />

                <StatItem
                    icon={<HomeModernIcon className="max-w-[144px] max-h-[144px] w-[10vw] h-[10vw] min-w-[50px] min-h-[50px]" />}
                    describe="สัตว์ที่ได้รับบ้าน"
                    count={countAnimalsFoundHouse}
                />

            </div>

            <div className="grid grid-cols-1 sm:gap-8 gap-6 p-3">
                {/* Requests */}
                <ShowInfoItem
                    icon={<InboxIcon className="size-8" />}
                    title="คำร้องขอ"
                    count={countRequestsPending}
                    addItem={false}
                    linkMore="/dashboard/requests"
                    data={<ShowAnimalRequests animals={animalRequests} />}
                />

                {/* Animals */}
                <ShowInfoItem
                    icon={<HeartIcon className="size-8" />}
                    title="สัตว์"
                    count={countAnimal}
                    addItem={true}
                    addItemLink="/dashboard/animals/create"
                    linkMore="/dashboard/animals"
                    data={<ShowAnimals animals={animals} />}
                />

                {/* Knowledges */}
                <ShowInfoItem
                    icon={<BookmarkSquareIcon className="size-8" />}
                    title="เกร็ดความรู้"
                    count={countKnowledge}
                    addItem={true}
                    addItemLink="/dashboard/knowledges/create"
                    linkMore="/dashboard/knowledges"
                    data={<ShowKnowledges knowledges={knowledges} />}
                />

            </div>
        </>
    )
}