import Link from "next/link"
import Image from "next/image"

import { animals } from "@/app/lib/data"

import { AnimalItem } from "@/app/components/(manager)/animals/AnimalItem"

import { InboxIcon, HeartIcon, BookmarkSquareIcon, PencilSquareIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline"

export default function DashBoard() {
    const animals_data = [...animals]
    return (
        <>
            <div className="flex flex-col w-full py-8">
                {/* Title */}
                <p className="md:text-5xl sm:text-4xl text-3xl font-semibold text-center my-3">Dashboard</p>

                <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 space-x-3 p-3">
                    {/* Requests */}
                    <div className="bg-theme-100/50 dark:bg-white/5 rounded-3xl sm:p-5 p-3 hover:shadow-md">
                        <div className="flex items-center space-x-1">
                            <InboxIcon className="size-8" />
                            <p className="md:text-3xl sm:text-xl text-lg">คำร้องขอ (0)</p>
                        </div>

                        {/* Table */}
                        <div className="flex flex-col mt-3 space-y-3">
                            {animals_data.map((v, i) => (
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
                        </div>
                    </div>
                    {/* Animals */}
                    <div className="bg-theme-100/50 dark:bg-white/5 rounded-3xl sm:p-5 p-3 hover:shadow-md">
                        <div className="flex items-center space-x-1">
                            <HeartIcon className="size-8" />
                            <p className="md:text-3xl sm:text-xl text-lg">สัตว์ ({animals.length})</p>
                        </div>

                        {/* Table */}
                        <div className="grid gap-6 max-sm:gap-y-8 w-full max-w-[1500px] mx-auto mt-3">
                            {animals.map((v, i) => (
                                <AnimalItem key={i} animal={v} />
                            ))}
                        </div>
                    </div>

                    {/* Knowledges */}
                    <div className="bg-theme-100/50 dark:bg-white/5 rounded-3xl sm:p-5 p-3 hover:shadow-md">
                        <div className="flex items-center space-x-1">
                            <BookmarkSquareIcon className="size-8" />
                            <p className="md:text-3xl sm:text-xl text-lg">เกร็ดความรู้ (0)</p>
                        </div>

                        {/* Table */}
                        <div className="flex flex-col mt-3 space-y-3">
                            {animals_data.map((v, i) => (
                                <div key={i} className="w-full">
                                    <div className={`flex mx-auto max-w-[550px] justify-between card-theme sm:rounded-3xl rounded-xl`}>
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
                                            <Link href="#"><button title="Delete"><TrashIcon className="transition-c    olors xs:size-8 size-7 rounded-lg p-0.5 cursor-pointer hover:bg-white/40 dark:hover:bg-black2/50" /></button></Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}