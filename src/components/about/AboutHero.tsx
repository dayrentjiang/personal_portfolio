"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const floatingIcons = [
  { icon: "⚛", top: "20%", left: "15%", size: "3rem" },
  { icon: "▲", top: "15%", left: "70%", size: "2.5rem" },
  { icon: "◇", top: "35%", left: "10%", size: "2rem" },
  { icon: "⬡", top: "40%", left: "85%", size: "3rem" },
  { icon: "◈", top: "55%", left: "20%", size: "2rem" },
  { icon: "⬢", top: "60%", left: "75%", size: "2.5rem" },
  { icon: "☰", top: "25%", left: "90%", size: "1.5rem" },
  { icon: "◎", top: "50%", left: "5%", size: "2rem" },
];

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const maxScroll = containerRef.current.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / maxScroll));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate scroll-based values (0 to 1 progress)
  const headerOpacity = Math.max(0, 1 - scrollProgress * 2.5);
  const headerTranslateY = scrollProgress * 150;
  const imageTranslateY = -scrollProgress * 350;
  const descriptionOpacity = Math.min(
    1,
    Math.max(0, (scrollProgress - 0.3) * 3),
  );
  const descriptionTranslateY = Math.max(0, 80 - scrollProgress * 150);

  return (
    <div ref={containerRef} className="relative h-[220vh]">
      {/* Green Glow Effect */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-green-500/20 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className="absolute text-white/20 pointer-events-none transition-transform duration-100"
          style={{
            top: item.top,
            left: item.left,
            fontSize: item.size,
            transform: `translateY(${scrollProgress * (50 + index * 30)}px) rotate(${scrollProgress * 20}deg)`,
          }}
        >
          {item.icon}
        </div>
      ))}

      {/* Hero Section - Sticky */}
      <section className="sticky top-0 h-screen flex flex-col items-center overflow-hidden">
        {/* Text Content */}
        <div
          className="text-center z-10 px-4 pt-28 md:pt-32"
          style={{
            opacity: headerOpacity,
            transform: `translateY(-${headerTranslateY}px)`,
          }}
        >
          <p className="text-[#4ade80] text-sm mb-6">// Hello World</p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
            I AM A
            <br />
            SOFTWARE ENGINEER
          </h1>
        </div>

        {/* Center Image */}
        <div
          className="absolute left-1/2 top-1/2 z-20"
          style={{
            transform: `translate(-50%, -50%) translateY(${100 + imageTranslateY}px)`,
          }}
        >
          <Image
            src="/dayrent.png"
            alt="Developer"
            width={350}
            height={450}
            className="object-cover"
            priority
          />
        </div>

        {/* Description Text */}
        <div
          className="absolute bottom-16 left-0 right-0 flex flex-col items-center text-center max-w-3xl mx-auto px-4 z-30"
          style={{
            opacity: descriptionOpacity,
            transform: `translateY(${descriptionTranslateY}px)`,
          }}
        >
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6">
            <span className="text-[#4ade80]">&lt;p&gt;</span> I BUILD{" "}
            <span className="text-[#4ade80]">WEB APPS</span>, WEBSITES, AND
            MOBILE APPS. LETS TALK AND DISCUSS YOUR NEEDS, I&apos;M COMFORTABLE
            PICKING UP WHATEVER THE PROJECT REQUIRE.{" "}
            <span className="text-[#4ade80]">&lt;/p&gt;</span>
          </p>

          <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            I like turning ideas into real things. I care a lot about clean code
            and making stuff that actually feels good to use. When I&apos;m not
            working, I&apos;m usually tinkering with side projects or trying out
            something new.
          </p>

          <a
            href="/resume.pdf"
            className="inline-block bg-[#4ade80] text-black font-medium px-8 py-3 rounded-full hover:bg-[#3fcf70] transition-colors"
          >
            My Resume
          </a>
        </div>
      </section>
    </div>
  );
}
