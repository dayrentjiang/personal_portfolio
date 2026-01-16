import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-8 py-24">
      <div className="max-w-6xl mx-auto pt-16">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <p className="text-[#4ade80] text-sm">// About Me</p>
          <h1 className="text-4xl md:text-5xl font-bold text-right max-w-md leading-tight">
            Get to Know Me Better
          </h1>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center gap-2 mb-16">
          <span className="text-[#4ade80]">&lt;/</span>
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-[#4ade80]">&gt;</span>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Image */}
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-[#1a1a1a]">
            <Image
              src="/dayrent.png"
              alt="Dayrent Tjiang"
              fill
              className="object-cover"
            />
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Who I Am</h2>
              <p className="text-white/70 leading-relaxed">
                I&apos;m a passionate Full Stack Developer with a love for creating
                beautiful, functional, and user-friendly web applications. With
                years of experience in both frontend and backend development, I
                bring ideas to life through clean code and innovative solutions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">My Journey</h2>
              <p className="text-white/70 leading-relaxed">
                My journey in web development started with curiosity and has
                evolved into a career filled with exciting projects and
                continuous learning. I thrive on solving complex problems and
                turning challenges into opportunities for growth.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">What Drives Me</h2>
              <p className="text-white/70 leading-relaxed">
                I believe in the power of technology to make a positive impact.
                Whether it&apos;s building a startup&apos;s MVP or optimizing an
                enterprise application, I&apos;m committed to delivering
                excellence in every project I undertake.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-block bg-[#4ade80] text-black font-medium px-8 py-3 rounded-full hover:bg-[#3fcf70] transition-colors"
            >
              Let&apos;s Connect
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
