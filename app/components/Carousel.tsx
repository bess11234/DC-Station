'use client'
import Image from "next/image"
import { useState, useEffect, useRef } from "react";

import { gallery } from "../lib/data";

export function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Make carousel --draggable--
    const carouselRef = useRef<HTMLDivElement>(null);
    let startX = 0;
    let isDragging = false;

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, [currentIndex, isPaused]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % gallery.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + gallery.length) % gallery.length);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging = true;
        startX = e.clientX;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const diff = startX - e.clientX;
        if (diff > 50) {
            nextSlide();
            isDragging = false;
        } else if (diff < -50) {
            prevSlide();
            isDragging = false;
        }
    };

    const handleMouseUp = () => {
        isDragging = false;
    };

    return (
        <div className="relative mx-auto overflow-hidden select-none cursor-grab active:cursor-grabbing"
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >

            {/* Images */}
            <div
                className="w-full sm:max-w-7xl max-w-3xl flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {gallery.map((v, index) => (
                    <Image
                        className="w-full shrink-0 m-auto pointer-events-none"
                        style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "fill"
                        }}
                        width={100}
                        height={100}
                        sizes="100%"
                        key={index}
                        src={`/gallery/${v.src}`}
                        alt={v.alt}
                        placeholder="blur"
                        blurDataURL={`/gallery/${v.src}`}
                    />
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 button button-theme rounded-full md:px-5 md:py-3 px-2.5 py-1.5 font-bold"
            >
                {"<"}
            </button>

            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 button button-theme rounded-full md:px-5 md:py-3 px-2.5 py-1.5"
            >
                {">"}
            </button>

            {/* Dots Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {gallery.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-theme-500" : "bg-theme-200 dark:bg-theme-900"}`}
                    ></button>
                ))}
            </div>
        </div>
    );
}