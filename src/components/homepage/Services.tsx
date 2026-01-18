"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Custom Web Development",
    number: "01",
    description:
      "Build complete web applications from scratch — frontend to backend — optimized for speed, security, and scalability.",
    hasLink: true,
  },
  {
    title: "Frontend Engineering",
    number: "02",
  },
  {
    title: "Server logic & API Development",
    number: "03",
  },
  {
    title: "Full Stack Application Development",
    number: "04",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far we've scrolled into this section
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        setScrollY(progress * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#0a0a0a] px-4 md:px-8 py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-12">
          <p className="text-[#4ade80] text-sm">// Service</p>
          <h2 className="text-3xl md:text-4xl font-bold md:text-right max-w-lg leading-tight">
            End-to-End Web Development Services
          </h2>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center gap-2 mb-16">
          <span className="text-[#4ade80]">&lt;/</span>
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-[#4ade80]">&gt;</span>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image with Parallax */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#1a1a1a]">
            <div
              className="absolute inset-0 scale-125"
              style={{
                transform: `translateY(${scrollY * 0.3 - 15}px) scale(1.25)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <Image
                src="/services.png"
                alt="Web Development"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right - Services List */}
          <div
            className="space-y-0"
            style={{
              transform: `translateY(${scrollY * -0.15 + 10}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="border-b border-white/10 py-6 first:pt-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{service.title}</h3>
                  <span className="text-white/40">({service.number})</span>
                </div>

                {service.description && (
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                )}

                {service.hasLink && (
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-white text-sm border-b border-white/50 pb-1 hover:border-white transition-colors"
                  >
                    Hire Me
                    <span className="text-xs">↗</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
