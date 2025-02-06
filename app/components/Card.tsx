import Image from "next/image"
import Link from "next/link";

import { DisplayDateCard } from "./DisplayDateCard";

export interface CardType {
    src: string;
    title: string;
    hrefLink: string;
    desc?: string;
    date?: number;
}
export function Card({ src, title, desc, hrefLink, date }: CardType) {
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
                />
            </figure>
            <div className="relative card-body max-sm:p-6 pb-4">
                {/* Date */}
                {date && <DisplayDateCard date={date} />}
                {/* Title */}
                <p className="card-title text-theme-950 dark:text-theme-50 lg:text-3xl text-xl text-nowrap">{title}</p>
                {/* Description */}
                <p className="text-theme-800 dark:text-theme-100 text-xs truncate">{desc}</p>
                {/* Button */}
                <Link href={hrefLink} className="button-theme w-fit lg:px-6 lg:py-3 px-3 py-1.5 mt-3 rounded-full cursor-pointer max-lg:text-xs">ดูรายละเอียด</Link>
            </div>
        </div>
    )
}