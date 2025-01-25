import Image from "next/image";
import Navbar from "./components/Navbar";
import { HeartIcon } from "@heroicons/react/24/solid";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Main',
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px]  justify-items-center min-h-screen gap-16">

      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start py-3">
        <div className="w-[100px]">
          <Image alt="Dog and Cat going through the door." src="/dog_cat_heaven.jpg" width={300} height={300} />
        </div>
        <h1>Project Client (Dogs 🐶 and Cats 🐱)</h1>


      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>Created by <HeartIcon className="inline-block size-6 text-pink-300 dark:text-pink-200" /></p>
      </footer>
    </div>
  );
}
