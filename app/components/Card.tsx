import Image from "next/image"
export interface CardType {
    src: string;
    title: string;
    desc?: string;
}
export function Card({ src, title, desc }: CardType) {
    return (
        <div className="select-none card shadow-lg bg-theme-50 dark:bg-theme-950 rounded-xl cursor-pointer transition-transform hover:opacity-70 hover:scale-95 active:opacity-50 active:scale-90 2xl:max-h-[400px] md:max-h-[300px] max-h-[250px] max-w-full">
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
            <div className="card-body max-sm:p-6">
                <p className="card-title text-theme-950 dark:text-theme-50 lg:text-3xl text-xl text-nowrap">{title}</p>
                <p className="text-theme-800 dark:text-theme-100 text-xs truncate">{desc}</p>
            </div>
        </div>
    )
}