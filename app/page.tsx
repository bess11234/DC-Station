import Link from "next/link";

import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Carousel } from "./components/Carousel";
import { Bank, BankType } from "./components/Bank";
import { Card } from "./components/Card";

import { fetchAnimalFindHouseCount, fetchAnimalFoundHouseCount, fetchFindHouseAnimals, fetchFoundHouseAnimals } from "./lib/data";

import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default async function Home() {

  const banks: BankType[] = [
    { src: "/bank/scb.webp", title: "ธนาคารไทยพาณิชย์", alt: "Bank SCB." },
    { src: "/bank/kbank.webp", title: "ธนาคารกสิกรไทย", alt: "Bank KBank." },
    { src: "/bank/krungthai.webp", title: "ธนาคารกรุงไทย", alt: "Bank Krungthai." }
  ]

  const [countAnimalsFindHouse, countAnimalsFoundHouse, animalFindHouse, animalFoundHouse] = await Promise.all([fetchAnimalFindHouseCount(), fetchAnimalFoundHouseCount(), fetchFindHouseAnimals(0, 4), fetchFoundHouseAnimals(0, 4)])

  return (
    <>
      <Navbar />
      <div className="grid justify-items-center min-h-[88vh] overflow-x-hidden pb-3">

        <main className="flex flex-col gap-8 items-center sm:items-start">

          {/* Carousel */}
          <Carousel />

          {/* Content */}
          <div className="flex flex-col gap-3 w-full place-items-center">
            <p className="grid md:text-5xl sm:text-4xl xs:text-3xl text-2xl text-center my-3 md:space-y-3"><span>มูลนิธิอาสาช่วยเหลือหมาและแมว</span><span>(🐶DC Station🐱)</span></p>

            <div className="grid grid-cols-1 gap-6 sm:*:size-full *:size-fit place-items-center rounded-xl">

              {/* Bank Information */}
              <div className="flex flex-col sm:px-8 sm:py-6 px-6 py-4 mx-3 space-y-3 rounded-xl card-theme shadow-lg">
                <p className="md:text-2xl sm:text-xl text-lg text-center dark:text-white font-semibold">ชื่อบัญชี: xxxxxxx ประเภท: xxxxxxx</p>

                {/* bank */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 justify-items-center">
                  {banks.map((v, i) => (
                    <Bank key={i} src={v.src} title={v.title} alt={v.alt} />
                  ))}

                </div>
              </div>

              {/* Carity Status */}
            </div>
          </div>

          {/* Animals looking for the house */}
          <div className="flex flex-col gap-3 w-full sm:px-6 px-3 py-3">
            <div className="flex space-x-3">
              <p className="md:text-3xl sm:text-2xl text-xl">น้องหาบ้าน ({countAnimalsFindHouse})</p>
              {/* View More ... */}
              <Link href={"/find-house"} className="hover:opacity-60 active:opacity-80 flex items-center space-x-1">
                <p>ดูเพิ่มเติม</p>
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>

            {/* If completed will changed to Animals components */}
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
              {animalFindHouse ? animalFindHouse.map((v, i) =>
                <Card key={i} src={v.images[0]} title={v.name} desc={v.personalities.join(", ")} hrefLink={`/find-house/${v._id}`} date={Date.parse(v.createdAt ? v.createdAt : "")} />)
              : ""}
            </div>

          </div>

          {/* Animal found their family */}
          <div className="flex flex-col gap-3 w-full sm:px-6 px-3 py-3">
            <div className="flex space-x-3">
              <p className="md:text-3xl sm:text-2xl text-xl">น้องมีบ้านแล้ว ({countAnimalsFoundHouse})</p>
              {/* View More ... */}
              <Link href={"/found-house"} className="hover:opacity-60 active:opacity-80 flex items-center space-x-1">
                <p>ดูเพิ่มเติม</p>
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>

            {/* If completed will changed to Animals components */}
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-6 gap-y-3">
              {animalFoundHouse ? animalFoundHouse.map((v, i) => (
                <Card key={i} src={v.images[0]} title={v.name} desc={v.personalities.join(", ")} hrefLink={`/found-house/${v._id}`} date={Date.parse(v.adoptionDate ? v.adoptionDate : "")} />
              )): ""}


            </div>

          </div>

        </main>

      </div>

      <Footer />
    </>
  );
}
