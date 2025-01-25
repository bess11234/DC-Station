'use client'
import Image from "next/image"
import { GalleryImage } from "../page"

interface Props {
    images: GalleryImage[]
}

function Carousel({ images }: Props) {
    function slide_smooth(e_id: string) {
        const e = document.getElementById(e_id)
        e?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }

    return (
        <div className="flex min-h-[8rem] min-w-[20rem] max-w-4xl m-auto mt-1">
            <div className="carousel carousel-center rounded-box w-full shadow-lg px-5 bg-black2">
                {images.map((v, i) => (
                    <div key={i} id={"slide" + i} className="carousel-item relative w-full">
                        
                        <Image className="size-full max-w-4xl" alt={v.alt}
                            src={"/gallery/" + v.src}
                            sizes="100%"
                            width={i != 0 ? 0 : 100}
                            height={i != 0 ? 0 : 100}
                            fill={i != 0}
                            />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a onClick={() => slide_smooth("slide" + (i == 0 ? images.length - 1 : i - 1))} className="button button-yellow rounded-full md:px-5 md:py-3 px-2.5 py-1.5">❮</a>
                            <a onClick={() => slide_smooth("slide" + (i == 0 ? i + 1 : (i + 1) == images.length ? 0 : i+1 ))} className="button button-yellow rounded-full md:px-5 md:py-3 px-2.5 py-1.5">❯</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Carousel