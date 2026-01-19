import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Main Hero Content */}
      <div className="relative min-h-screen flex flex-col justify-center px-4 md:px-8 pt-20">
        {/* Hero Text Section */}
        <div className="max-w-2xl z-20">
          <p className="text-base md:text-lg mb-2 md:mb-4">
            Hey, I build things
          </p>

          {/* Large Name with Outline Effect */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] font-bold leading-none tracking-tight">
            <span
              className="text-transparent bg-clip-text"
              style={{
                WebkitTextStroke: "1.5px #4ade80",
              }}
            >
              DAYRENT TJIANG
            </span>
            <span className="inline-block w-2 h-2 md:w-3 md:h-3 bg-[#4ade80] rounded-full ml-1 md:ml-2 mb-2 md:mb-4"></span>
          </h1>

          {/* Mobile Description - shown only on mobile */}
          <p className="md:hidden text-sm leading-relaxed text-white/80 mt-6 max-w-sm">
            I&apos;m a full stack developer. I care about writing clean code and
            making things that feel good to use.
          </p>
        </div>

        {/* Center Portrait with Green Glow */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 z-20">
          {/* Green Glow Effect */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-60">
            <div className="w-full h-full bg-linear-to-t from-green-500/40 via-green-400/20 to-transparent rounded-full scale-150"></div>
          </div>
          <Image
            src="/dayrents.png"
            alt="Portrait"
            width={500}
            height={600}
            className="object-cover w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-auto"
            priority
          />
        </div>

        {/* Right Side Description - hidden on mobile */}
        <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 max-w-xs text-right">
          {/* Vertical Line */}
          <div className="absolute right-0 -top-16 w-px h-12 bg-white/30"></div>

          {/* Scroll Indicator */}
          <div className="absolute right-0 -top-32 flex flex-col items-center">
            <span
              className="text-xs tracking-widest"
              style={{ writingMode: "vertical-rl" }}
            >
              SCROLL
            </span>
          </div>

          <p className="text-sm leading-relaxed text-white/80 mt-8">
            I&apos;m a full stack developer. I care about clean code and good
            user experience. I work end to end, from idea to shipped product.
          </p>
        </div>
      </div>

      {/* Bottom Left - Contact Info */}
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 text-xs md:text-sm">
        <p>
          <span className="text-white/50 mr-2">E</span>dayrentjiang@gmail.com
        </p>
      </div>

      {/* Bottom Right - Social Links */}
      <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 flex items-center gap-3 md:gap-6 text-xs md:text-sm">
        <a
          href="https://github.com/dayrentjiang"
          className="hover:text-white/70 transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/dayrent-tjiang"
          className="hover:text-white/70 transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
