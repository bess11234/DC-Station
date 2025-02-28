import Link from "next/link"
import Image from "next/image"

import { ShowAnimals } from "@/app/components/(manager)/animals/ShowAnimals"
import { ShowKnowledges } from "@/app/components/(manager)/knowledges/ShowKnowledges"

import { InboxIcon, BookmarkSquareIcon, ArrowRightIcon, PlusIcon, ClockIcon, DocumentIcon, HomeIcon, HomeModernIcon } from "@heroicons/react/24/outline"

import { fetchAnimalCount, fetchKnowledgeCount, fetchAnimals, fetchKnowledges } from "@/app/lib/data"

export default async function DashBoard() {
    const [countAnimal, countKnowledge] = await Promise.all([fetchAnimalCount(), fetchKnowledgeCount()])
    const animals = Promise.all([fetchAnimals(0, 3)])
    const knowledges = Promise.all([fetchKnowledges(0, 3)])
    return (
        <>
            <div className="flex flex-col w-full py-8">
                {/* Title */}
                <p className="md:text-5xl sm:text-4xl text-3xl font-semibold text-center my-3">แดชบอร์ด</p>

                <div className="grid lg:grid-cols-4 grid-cols-2 sm:gap-6 gap-4 p-3 mb-6">
                    <div className="grid justify-items-center gap-2 bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:py-6 sm:px-8 py-3 px-4">
                        <ClockIcon className="w-[10vw] h-[10vw] min-w-[50px] min-h-[50px]" />
                        <p className="text-center lg:text-3xl md:text-2xl text-lg">คำร้องขอที่ยังไม่ตอบ</p>
                        <p className="lg:text-6xl md:text-5xl text-3xl">10</p>
                    </div>

                    <div className="grid justify-items-center gap-2 bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:py-6 sm:px-8 py-3 px-4">
                        <DocumentIcon className="w-[10vw] h-[10vw] min-w-[50px] min-h-[50px]" />
                        <p className="text-center lg:text-3xl md:text-2xl text-lg">คำร้องขอทั้งหมด</p>
                        <p className="lg:text-6xl md:text-5xl text-3xl">10</p>
                    </div>

                    <div className="grid justify-items-center gap-2 bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:py-6 sm:px-8 py-3 px-4">
                        <HomeIcon className="w-[10vw] h-[10vw] min-w-[50px] min-h-[50px]" />
                        <p className="text-center lg:text-3xl md:text-2xl text-lg">สัตว์ที่ต้องการบ้าน</p>
                        <p className="lg:text-6xl md:text-5xl text-3xl">10</p>
                    </div>

                    <div className="grid justify-items-center gap-2 bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:py-6 sm:px-8 py-3 px-4">
                        <HomeModernIcon className="w-[10vw] h-[10vw] min-w-[50px] min-h-[50px]" />
                        <p className="text-center lg:text-3xl md:text-2xl text-lg">สัตว์ที่ได้รับบ้าน</p>
                        <p className="lg:text-6xl md:text-5xl text-3xl">10</p>
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:gap-8 gap-6 p-3">
                    {/* Requests */}
                    <div className="bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:p-5 p-3 hover:shadow-md dark:shadow-theme-50/10">
                        <div className="flex items-center space-x-1">
                            <InboxIcon className="size-8" />
                            <p className="md:text-3xl sm:text-xl text-lg">คำร้องขอ (0)</p>
                        </div>

                        {/* Table */}
                        {/* <div className="flex flex-col mt-3 space-y-3">
                            {animals.map((v, i) => (
                                <div key={i} className="w-full">
                                    <div className={`flex mx-auto max-w-[550px] justify-between card-theme sm:rounded-3xl rounded-xl hover:shadow-md dark:shadow-theme-50/10`}>
                                        <div className="flex space-x-5 items-center">
                                            <Image
                                                alt={`Picture of ${v.name}.`}
                                                src={v.images[0]}
                                                width={150}
                                                height={150}
                                                style={{ width: 100, height: 100, objectFit: "cover" }}
                                                className="sm:rounded-l-3xl rounded-l-xl"
                                            />
                                            <p className="md:text-xl sm:text-lg text-base truncate md:max-w-64 xs:max-w-52 min-[400px]:max-w-40 min-[325px]:max-w-20 max-w-16">{v.name}</p>
                                        </div>
                                        <div className="flex space-x-3 items-center mr-2">
                                            <Link href="#"><button title="Edit"><PencilSquareIcon className="transition-colors xs:size-8 size-7 rounded-lg p-0.5 cursor-pointer hover:bg-white/40 dark:hover:bg-black2/50" /></button></Link>
                                            <Link href="#"><button title="Delete"><TrashIcon className="transition-colors xs:size-8 size-7 rounded-lg p-0.5 cursor-pointer hover:bg-white/40 dark:hover:bg-black2/50" /></button></Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div> */}
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