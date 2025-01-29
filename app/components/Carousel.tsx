'use client'
import Image from "next/image"
import { useRef, WheelEvent } from "react";

export interface GalleryImage {
    src: string;
    alt: string;
}

interface Props {
    images: GalleryImage[]
}

export function Carousel({ images }: Props) {
    const carourel = useRef<HTMLDivElement>(null)

    function slide_smooth(e_id: string) {
        const e = document.getElementById(e_id)
        e?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }

    function handleWheel(e: WheelEvent){
        e.stopPropagation()

        carourel.current?.scrollBy({
            left: e.deltaY < 0 ? -30 : 30,
        })
        window.scrollBy({
            left: e.deltaY < 0 ? -1 : 1
        })
    }

    return (
        // DiasyUI Class
        <div className="flex mt-0.5 self-center">
            {/* Carousel List */}
            <div ref={carourel} onWheel={(e) => {handleWheel(e);}} onMouseEnter={() => document.body.classList.add("overflow-y-hidden")} onMouseLeave={() => document.body.classList.remove("overflow-y-hidden")} className="carousel carousel-center rounded-box w-auto shadow-lg px-5 bg-black2/5 dark:bg-white/5 overflow-y-hidden" >
                {images.map((v, i) => (
                    <div key={i} id={"slide" + i} className="carousel-item relative w-full">

                        <Image className="w-full max-w-4xl min-h-[12rem]" alt={v.alt}
                            style={{
                                width: i == 0 ? '100%' : "",
                                height: i == 0 ? 'auto' : "",
                                objectFit: "fill"
                            }}
                            src={"/gallery/" + v.src}
                            sizes="100%"
                            width={i != 0 ? 0 : 100}
                            height={i != 0 ? 0 : 100}
                            fill={i != 0}
                            placeholder="blur"
                            blurDataURL={v.src}
                        />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a onClick={() => slide_smooth("slide" + (i == 0 ? images.length - 1 : i - 1))} className="button button-theme rounded-full md:px-5 md:py-3 px-2.5 py-1.5">❮</a>
                            <a onClick={() => slide_smooth("slide" + (i == 0 ? i + 1 : (i + 1) == images.length ? 0 : i + 1))} className="button button-theme rounded-full md:px-5 md:py-3 px-2.5 py-1.5">❯</a>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}