import Image from "next/image";

const awards = [
  {
    title: "Megahack",
    subtitle: "Web3 Hackathon Finalist",
    description:
      "Built a web3 lending solution on Solana using Next.js, Express, and the Anchor Framework with Rust. Made it to the final pitching round.",
    year: "2025",
    image: "/monashblockchain.png",
    hasDot: true,
  },
];

export default function Awards() {
  return (
    <section className="relative bg-[#0a0a0a] px-4 md:px-8 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-12">
          <p className="text-[#4ade80] text-sm">// Hackathons</p>
          <h2 className="text-3xl md:text-5xl font-bold md:text-right max-w-md leading-tight">
            Hackathons
          </h2>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center gap-2 mb-16">
          <span className="text-[#4ade80]">&lt;/</span>
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-[#4ade80]">&gt;</span>
        </div>

        {/* Awards List */}
        <div className="space-y-0">
          {awards.map((award, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-8 border-b border-white/10"
            >
              {/* Award Image */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-[#1a1a1a]">
                <Image
                  src={award.image}
                  alt={award.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title & Subtitle */}
              <div className="flex-1 min-w-0 md:max-w-xs">
                <h3 className="font-semibold text-lg mb-1">{award.title}</h3>
                <p className="text-white/50 text-sm">{award.subtitle}</p>
              </div>

              {/* Description */}
              <p className="flex-1 text-white/60 text-sm leading-relaxed">
                {award.description}
              </p>

              {/* Year */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-[#4ade80] font-medium">{award.year}</span>
                {award.hasDot && (
                  <span className="w-3 h-3 bg-[#4ade80] rounded-full"></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
