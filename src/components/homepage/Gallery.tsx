"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const photos = [
  { src: "/IMG_2749.jpg", alt: "Photo 1", rotate: "-6deg" },
  { src: "/IMG_2749.jpg", alt: "Photo 2", rotate: "3deg" },
  { src: "/IMG_2749.jpg", alt: "Photo 3", rotate: "-4deg" },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress within this section
      if (sectionTop <= 0 && sectionTop > -sectionHeight + viewportHeight) {
        const scrollProgress =
          Math.abs(sectionTop) / (sectionHeight - viewportHeight);
        const newIndex = Math.min(
          Math.floor(scrollProgress * photos.length),
          photos.length - 1,
        );
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#1a1a1a]"
      style={{ height: `${photos.length * 100}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Marquee Text Background */}
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {[...Array(10)].map((_, i) => (
              <span
                key={i}
                className="text-[12rem] font-bold text-white/10 mx-4 flex items-center"
              >
                DAYRENT TJIANG
                <span className="text-green-500/30 mx-8">*</span>
              </span>
            ))}
          </div>
        </div>
        {/* Photos Stack */}
        <div className="relative z-10 w-[400px] h-[500px]">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-all duration-700 ease-out"
              style={{
                opacity: index === activeIndex ? 1 : 0,
                transform: `rotate(${photo.rotate}) scale(${
                  index === activeIndex ? 1 : 0.9
                })`,
                zIndex: index === activeIndex ? 10 : 0,
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover rounded-lg shadow-2xl"
              />
            </div>
          ))}
        </div>
        {/* Photo Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-white w-8" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
