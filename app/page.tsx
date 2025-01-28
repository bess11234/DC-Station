import Navbar from "./components/Navbar";
import { HeartIcon } from "@heroicons/react/24/solid";

import { Carousel, GalleryImage } from "./components/Carousel";
import { Bank, BankType } from "./components/Bank";
import { Stat } from "./components/Stat";
import { Card, CardType } from "./components/Card";

export default function Home() {
  const gallery: GalleryImage[] = [
    { src: "image0.webp", alt: "Clarity for pets." },
    { src: "image1.webp", alt: "Stray cats needed for housing." },
    { src: "image2.webp", alt: "Stray dogs needed for housing." }
  ]

  const animals: CardType[] = [
    { src: "/animals/bo.webp", title: "น้องโบ", desc: "ซุกซน น่ารัก ชอบวิ่งเล่น และเจ้าเล่ห์" },
    { src: "/animals/nam_tan.webp", title: "น้องน้ำตาล", desc: "สงบเสงี่ยม ชอบให้กอด แต่ให้เฉพาะคนที่ชอบมาจับ" },
    { src: "/animals/num.webp", title: "น้องนุ่น", desc: "น่ารัก ขี้อ้อน ชอบให้ลูบ" }
  ]

  const banks: BankType[] = [
    { src: "/bank/scb.webp", title: "ธนาคารไทยพาณิชย์", alt: "Bank SCB." },
    { src: "/bank/kbank.webp", title: "ธนาคารกสิกรไทย", alt: "Bank KBank." },
    { src: "/bank/krungthai.webp", title: "ธนาคารกรุงไทย", alt: "Bank Krungthai." }
  ]
  return (
    <>
      <Navbar />
      <div className="grid justify-items-center min-h-screen">

        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {/* Carousel */}
          <Carousel images={gallery} />

          {/* Content */}
          <div className="flex flex-col gap-3 w-full place-items-center">
            <p className="md:text-3xl sm:text-2xl text-xl text-center">มูลนิธิอาสาช่วยเหลือหมาและแมว <span><br />(DC Station 🐶 & 🐱)</span></p>

            <div className="grid grid-cols-1 gap-6 sm:*:size-full *:size-fit place-items-center">

              {/* Bank Information */}
              <div className="flex flex-col space-y-3 bg-black2/5 dark:bg-white/5 p-6 rounded-xl shadow-md">
                <p className="md:text-2xl sm:text-xl text-lg text-center">ชื่อบัญชี: xxxxxxx ประเภท: xxxxxxx</p>

                {/* bank */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 justify-items-center">
                  {banks.map((v, i) => (
                    <Bank key={i} src={v.src} title={v.title} alt={v.alt} />
                  ))}

                </div>
              </div>

              {/* Carity Status */}
              <Stat />
            </div>
          </div>

          {/* Animals looking for the house */}
          <div className="flex flex-col gap-3 w-full p-3">
            <p className="md:text-3xl sm:text-2xl text-xl">น้องหาบ้าน ({animals.length})</p>

            <div className="grid lg:grid-cols-4 xs:grid-cols-2 grid-cols-1 gap-3">
              {animals.map((v, i) => (
                <Card key={i} src={v.src} title={v.title} desc={v.desc} />
              ))}

            </div>
          </div>

          <div className="h-0.5 bg-theme-200 w-[90%] self-center rounded-full"></div>

          {/* Animal found their family */}
          <div className="flex flex-col gap-3 w-full p-3">
            <p className="md:text-3xl sm:text-2xl text-xl">น้องมีบ้านแล้ว ({animals.length})</p>

            <div className="grid lg:grid-cols-4 xs:grid-cols-2 grid-cols-1 gap-3">
              {animals.map((v, i) => (
                <Card key={i} src={v.src} title={v.title} desc={v.desc} />
              ))}

            </div>
          </div>

        </main>

      </div>
      <footer className="p-3 row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="font-medium">
          <span className="font-light">Created by <HeartIcon className="inline-block size-6 text-pink-300 dark:text-pink-200" /> </span>
          @<span className="github-user">bess11234</span>, @<span className="github-user">KKMAI</span>.</p>
      </footer>
    </>
  );
}
