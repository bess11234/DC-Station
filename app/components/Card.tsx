'use client'
import Image from "next/image"
import Link from "next/link";

import { useRouter } from "next/navigation";

import { DisplayDateCard } from "./DisplayDateCard";

export interface CardType {
    src: string;
    title: string;
    hrefLink: string;
    desc?: string;
    date?: number;
}
export function Card({ src, title, desc, hrefLink, date }: CardType) {
    const { push } = useRouter()
    return (
        <div className="select-none card bg-theme-50 dark:bg-theme-950/50 rounded-xl md:max-h-[400px] max-h-[350px] max-w-full hover:shadow-lg dark:shadow-white/15">
            <figure className="rounded-t-xl">
                <Image
                    src={src}
                    alt={`Picture of ${title}.`}
                    sizes="100%"
                    width={250}
                    height={250}
                    style={{ width: "100%", height: "300px", objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL={src}
                    quality={74}
                    className="transition-transform hover:brightness-50 hover:cursor-pointer hover:scale-105"
                    onClick={() => push(hrefLink)}
                />
            </figure>
            <div className="relative card-body max-sm:p-6 pb-4 lg:px-8 md:px-4 sm:px-4 max-sm:mt-1">
                {/* Date */}
                {date && <DisplayDateCard date={date} />}
                {/* Title */}
                <p className="card-title text-theme-950 dark:text-theme-50 lg:text-3xl text-xl text-nowrap truncate">{title.length <= 31? title:title.slice(0,31).concat("...")}</p>
                {/* Description */}
                <p className="text-theme-800 dark:text-theme-100 text-xs truncate">{desc}</p>
                {/* Button */}
                <Link className="ml-auto mt-4" href={hrefLink} tabIndex={-1}>
                    <button className="button-theme w-fit lg:px-6 lg:py-3 px-3 py-1.5 rounded-full cursor-pointer max-lg:text-xs">ดูรายละเอียด</button>
                </Link>
            </div>
        </div>
    )
}