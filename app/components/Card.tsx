import Image from "next/image"
export interface CardType {
    src: string;
    title: string;
    desc?: string;
}
export function Card({ src, title, desc }: CardType) {
    return (
        <div className=" select-none card bg-theme-50 dark:bg-theme-950 rounded shadow-sm cursor-pointer transition-transform hover:opacity-70 hover:scale-95 active:opacity-50 active:scale-90 2xl:max-h-[400px] md:max-h-[300px] max-h-[400px]">
            <figure>
                <Image
                    src={src}
                    alt={title}
                    sizes="100%"
                    width={100}
                    height={1000}
                    style={{ width: " auto", height: "auto" }}
                    placeholder="blur"
                    blurDataURL={src}
                    quality={74}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-theme-950 dark:text-theme-50">{title}</h2>
                <p className="text-theme-800 dark:text-theme-100">{desc}</p>
            </div>
        </div>
    )
}