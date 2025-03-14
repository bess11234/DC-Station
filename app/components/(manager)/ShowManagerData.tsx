import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { JSX, Suspense } from "react";
import { PageNavigation } from "./PageNavigation";

import { SkeletonManagerDataItem } from "../skeletons/SkeletonManagerDataItem";
import { SkeletonPageNavigation } from "../skeletons/SkeletonPageNavigation";

interface Props {
    title: string;
    addItem: boolean;
    addItemLink?: string;
    showData: JSX.Element;
    pageNumber: number;
}

export function ShowManagerData({ title, showData, pageNumber, addItem, addItemLink }: Props) {
    return (
        <>
            {/* Title */}
            <p className="md:text-5xl sm:text-4xl text-3xl font-semibold text-center my-3">{title}</p>

            <div className="grid space-x-3 p-3">
                {/* Data */}
                <div className="bg-theme-200/40 dark:bg-theme-700/20 rounded-3xl sm:p-5 p-3 hover:shadow-md dark:shadow-theme-50/10">

                    {/* Create Button */}
                    {addItem ?
                        <Link role="button" href={addItemLink ?? ""} className="button-secondary w-fit flex flex-row px-4 py-3 rounded-full mb-3 cursor-pointer space-x-1">
                            <PlusIcon className="size-6" /><span>เพิ่ม{title}</span>
                        </Link>
                        : <br />}

                    {/* Show Data */}
                    <div className="grid lg:grid-cols-2 gap-6 max-sm:gap-y-8 w-full max-w-[1500px] mx-auto">
                        <Suspense fallback={<SkeletonManagerDataItem number={6} />}>
                            {showData}
                        </Suspense>
                    </div>

                    {/* Page Navigation */}
                    <Suspense fallback={<SkeletonPageNavigation/>}>
                        <PageNavigation totalPage={pageNumber} />
                    </Suspense>

                </div>
            </div>
        </>
    )
}