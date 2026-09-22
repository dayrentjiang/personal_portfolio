import Image from "next/image";
import HeroScene from "./HeroScene";

// A small pixel alphabet keeps the display lettering independent of fonts.
const glyphs: Record<string, string[]> = {
  A: ["00100", "01110", "11011", "11011", "11111", "11011", "11011"],
  D: ["11110", "11011", "11011", "11011", "11011", "11011", "11110"],
  E: ["11111", "11000", "11000", "11110", "11000", "11000", "11111"],
  G: ["01111", "11000", "11000", "11011", "11011", "11011", "01111"],
  I: ["111", "010", "010", "010", "010", "010", "111"],
  J: ["00111", "00011", "00011", "00011", "11011", "11011", "01110"],
  N: ["11001", "11101", "11101", "11111", "11011", "11011", "11001"],
  R: ["11110", "11011", "11011", "11110", "11100", "11010", "11011"],
  T: ["11111", "11111", "00100", "00100", "00100", "00100", "00100"],
  Y: ["11011", "11011", "11011", "01110", "00100", "00100", "00100"],
};

function PixelWord({ word, className }: { word: string; className: string }) {
  let offset = 0;
  const paths = [...word].map((letter) => {
    const rows = glyphs[letter];
    const path = rows.flatMap((row, y) =>
      [...row].map((pixel, x) =>
        pixel === "1" ? `M${offset + x} ${y}h1v1h-1z` : "",
      ),
    ).join("");
    offset += rows[0].length + 1;
    return <path key={`${letter}-${offset}`} d={path} />;
  });

  return (
    <svg className={className} viewBox={`0 0 ${offset - 1} 7`} preserveAspectRatio="none" fill="currentColor" aria-hidden="true">
      {paths}
    </svg>
  );
}

export default function Hero() {
  return (
    <HeroScene>
      <h1 id="hero-title" className="sr-only">Dayrent Tjiang — Full Stack Developer</h1>
      <div className="hero-ambient" aria-hidden="true" />
      <PixelWord word="DAYRENT" className="hero-name hero-name-first" />
      <div className="hero-portrait" aria-hidden="true">
        <Image
          src="/dayrent-original.webp"
          alt=""
          width={3024}
          height={4032}
          className="hero-portrait-image"
          unoptimized
          priority
        />
      </div>
      <PixelWord word="TJIANG" className="hero-name hero-name-last" />
      <div className="hero-color-wash" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-introduction">
        <p className="hero-greeting">I&apos;m Dayrent Tjiang!</p>
        <p className="hero-description">
          Turning ideas into thoughtful<br className="hero-desktop-break" /> digital experiences.<br />
          Clean code, intuitive design, and<br className="hero-desktop-break" /> products that feel good to use.
        </p>
        <div className="hero-chevron" aria-hidden="true"><span /><span /></div>
      </div>
      <ol className="hero-roles" aria-label="What I do">
        <li><span>(01)</span> Full Stack Developer</li>
        <li><span>(02)</span> Creative Thinker</li>
        <li><span>(03)</span> Product Builder</li>
      </ol>
    </HeroScene>
  );
}
