import { Carousel, GalleryImage } from "../components/Carousel"
import { CardType, Card } from "../components/Card"

const gallery: GalleryImage[] = [
    { src: "image0.webp", alt: "Clarity for pets." },
    { src: "image1.webp", alt: "Stray cats needed for housing." },
    { src: "image2.webp", alt: "Stray dogs needed for housing." }
]

const animals: CardType[] = [
    { src: "/animals/bo.webp", title: "น้องโบ", desc: "ซุกซน น่ารัก ชอบวิ่งเล่น และเจ้าเล่ห์" },
    { src: "/animals/nam_tan.webp", title: "น้องน้ำตาล", desc: "สงบเสงี่ยม ชอบให้กอด แต่ให้เฉพาะคนที่ชอบมาจับ" },
    { src: "/animals/num.webp", title: "น้องนุ่น", desc: "น่ารัก ขี้อ้อน ชอบให้ลูบ" },
    { src: "/animals/bo.webp", title: "น้องโบ", desc: "ซุกซน น่ารัก ชอบวิ่งเล่น และเจ้าเล่ห์" },
    { src: "/animals/nam_tan.webp", title: "น้องน้ำตาล", desc: "สงบเสงี่ยม ชอบให้กอด แต่ให้เฉพาะคนที่ชอบมาจับ" },
    { src: "/animals/num.webp", title: "น้องนุ่น", desc: "น่ารัก ขี้อ้อน ชอบให้ลูบ" },
    { src: "/animals/bo.webp", title: "น้องโบ", desc: "ซุกซน น่ารัก ชอบวิ่งเล่น และเจ้าเล่ห์" },
    { src: "/animals/nam_tan.webp", title: "น้องน้ำตาล", desc: "สงบเสงี่ยม ชอบให้กอด แต่ให้เฉพาะคนที่ชอบมาจับ" },
    { src: "/animals/num.webp", title: "น้องนุ่น", desc: "น่ารัก ขี้อ้อน ชอบให้ลูบ" },
    { src: "/animals/bo.webp", title: "น้องโบ", desc: "ซุกซน น่ารัก ชอบวิ่งเล่น และเจ้าเล่ห์" },
    { src: "/animals/nam_tan.webp", title: "น้องน้ำตาล", desc: "สงบเสงี่ยม ชอบให้กอด แต่ให้เฉพาะคนที่ชอบมาจับ" },
    { src: "/animals/num.webp", title: "น้องนุ่น", desc: "น่ารัก ขี้อ้อน ชอบให้ลูบ" }
]

export default function FindHouse() {
    return (
        <div className="grid justify-items-center min-h-screen">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Carousel images={gallery} />

                <div className="flex flex-col gap-3 w-full p-3">

                    <div className="grid lg:grid-cols-4 xs:grid-cols-2 grid-cols-1 gap-3">
                        {animals.map((v, i) => (
                            <Card key={i} src={v.src} title={v.title} desc={v.desc} />
                        ))}

                    </div>
                </div>
            </main>
        </div>
    )
}