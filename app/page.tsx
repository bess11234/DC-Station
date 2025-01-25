import Image from "next/image";
import Navbar from "./components/Navbar";
import { HeartIcon } from "@heroicons/react/24/solid";
import Carousel from "./components/Carousel";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Main',
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export default function Home() {
  const gallery: GalleryImage[] = [
    { src: "image0.jpg", alt: "Clarity for pets." },
    { src: "image1.jpg", alt: "Stray cats needed for housing." },
    { src: "image2.jpg", alt: "Stray dogs needed for housing." }
  ]
  return (
    <div className="grid  justify-items-center min-h-screen">
      <Navbar />

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Carousel images={gallery} />

        <div className="w-full justify-items-center">
          <h1 className="text-lg">Project Client (Dogs 🐶 and Cats 🐱)</h1>
          <h1>Project Client (Dogs 🐶 and Cats 🐱)</h1>
          <h1>Project Client (Dogs 🐶 and Cats 🐱)</h1>
          <h1>Project Client (Dogs 🐶 and Cats 🐱)</h1>
          <h1>Project Client (Dogs 🐶 and Cats 🐱)</h1>
          <h1>Project Client (Dogs 🐶 and Cats 🐱)</h1>
          <h1>Project Client (Dogs 🐶 and Cats 🐱)</h1>
          <h1>Project Client (Dogs 🐶 and Cats 🐱)</h1>
          <h1>Project Client (Dogs 🐶 and Cats 🐱)</h1>
          <h1>Project Client (Dogs 🐶 and Cats 🐱)</h1>
          <h1>Project Client (Dogs 🐶 and Cats 🐱)</h1>
          <h1>Project Client (Dogs 🐶 and Cats 🐱)</h1>
          <h1>Project Client (Dogs 🐶 and Cats 🐱)</h1>
        </div>

      </main>

      <footer className="p-3 row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="font-medium">
          <span className="font-light">Created by <HeartIcon className="inline-block size-6 text-pink-300 dark:text-pink-200" /> </span>
          @<span className="github-user">bess11234</span>, @<span className="github-user">KKMAI</span>.</p>
      </footer>
    </div>
  );
}
