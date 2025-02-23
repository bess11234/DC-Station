import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";

import { Carousel } from "./components/Carousel";
import { Bank, BankType } from "./components/Bank";
import { Stat } from "./components/Stat";
import { Card } from "./components/Card";

import { fetchAnimals } from "./lib/data";
import { Animal } from "./lib/definition";

export default async function Home() {

  const banks: BankType[] = [
    { src: "/bank/scb.webp", title: "ธนาคารไทยพาณิชย์", alt: "Bank SCB." },
    { src: "/bank/kbank.webp", title: "ธนาคารกสิกรไทย", alt: "Bank KBank." },
    { src: "/bank/krungthai.webp", title: "ธนาคารกรุงไทย", alt: "Bank Krungthai." }
  ]

  const animals: Animal[] = await fetchAnimals()

  const no_home = animals.filter(animal => animal.adoptionDate === null);
  const have_home = animals.filter(animal => animal.adoptionDate != null);

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

            <div className="grid grid-cols-1 gap-6 sm:*:size-full *:size-fit place-items-center rounded-xl shadow-xl">

              {/* Bank Information */}
              <div className="flex flex-col space-y-3 p-6 rounded-xl card-theme">
                <p className="md:text-2xl sm:text-xl text-lg text-center">ชื่อบัญชี: xxxxxxx ประเภท: xxxxxxx</p>

                {/* bank */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 justify-items-center">
                  {banks.map((v, i) => (
                    <Bank key={i} src={v.src} title={v.title} alt={v.alt} />
                  ))}

                </div>
                <Stat />
              </div>

              {/* Carity Status */}
            </div>
          </div>

          {/* Animals looking for the house */}
          <div className="flex flex-col gap-3 w-full sm:px-6 px-3 py-3">
            <p className="md:text-3xl sm:text-2xl text-xl">น้องหาบ้าน ({no_home.length})</p>

            {/* If completed will changed to Animals components */}
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
              {no_home.map((v, i) =>
                <Card key={i} src={v.images[0]} title={v.name} desc={v.personalities.join(", ")} hrefLink={`/find-house/${v._id}`} date={Date.parse(v.dob)}/>)
              }
            </div>

          </div>

          {/* Animal found their family */}
          <div className="flex flex-col gap-3 w-full p-3">
            <p className="md:text-3xl sm:text-2xl text-xl">น้องมีบ้านแล้ว ({have_home.length})</p>

            {/* If completed will changed to Animals components */}
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-6 gap-y-3">
              {have_home.map((v, i) => (
                <Card key={i} src={v.images[0]} title={v.name} desc={v.personalities.join(", ")} hrefLink={`/find-house/${v._id}`} date={Date.parse(v.dob)}/>
              ))}


            </div>

          </div>

        </main>

      </div>

      <Footer />
    </>
  );
}
