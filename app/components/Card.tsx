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
        <div className="select-none card shadow-lg bg-theme-50 dark:bg-theme-950 rounded-xl md:max-h-[400px] max-h-[350px] max-w-full">            
            <figure className="rounded-xl">
                <Image
                    src={src}
                    alt={title}
                    sizes="100%"
                    width={100}
                    height={1000}
                    style={{ width: "100%", height: "300px", objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL={src}
                    quality={74}
                    className="transition-transform hover:brightness-50 hover:cursor-pointer hover:scale-110"
                    onClick={() => push(hrefLink)}
                />
            </figure>
            <div className="relative card-body max-sm:p-6 pb-4">
                {/* Date */}
                {date && <DisplayDateCard date={date} />}
                {/* Title */}
                <p className="card-title text-theme-950 dark:text-theme-50 lg:text-3xl text-xl text-nowrap truncate">{title.length <= 31? title:title.slice(0,31).concat("...")}</p>
                {/* Description */}
                <p className="text-theme-800 dark:text-theme-100 text-xs truncate">{desc}</p>
                {/* Button */}
                <Link href={hrefLink} className="button-theme w-fit lg:px-6 lg:py-3 px-3 py-1.5 mt-3 rounded-full cursor-pointer max-lg:text-xs">ดูรายละเอียด</Link>
            </div>
        </div>
    )
}