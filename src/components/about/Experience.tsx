import Image from "next/image";

const experiences = [
  {
    company: "CodeCraft Inc.",
    date: "Aug 2021 — Jun 2022",
    role: "Sr. Full Stack Developer",
  },
  {
    company: "CodeCraft Inc.",
    date: "Aug 2021 — Jun 2022",
    role: "Jr. Full Stack Developer",
  },
  {
    company: "CodeCraft Inc.",
    date: "Aug 2021 — Jun 2022",
    role: "Full Stack Developer",
  },
  {
    company: "CodeCraft Inc.",
    date: "Aug 2021 — Jun 2022",
    role: "Frontend Developer",
  },
  {
    company: "CodeCraft Inc.",
    date: "Aug 2021 — Jun 2022",
    role: "Intern Frontend Developer",
    hasDot: true,
  },
];

export default function Experience() {
  return (
    <section className="relative bg-[#0a0a0a] px-4 md:px-8 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-12">
          <p className="text-[#4ade80] text-sm">// Experience</p>
          <h2 className="text-3xl md:text-5xl font-bold md:text-right max-w-md leading-tight">
            Professional Working Experience
          </h2>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center gap-2 mb-16">
          <span className="text-[#4ade80]">&lt;/</span>
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-[#4ade80]">&gt;</span>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12">
          {/* Left - Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-[#1a1a1a]">
            <Image
              src="/experience.png"
              alt="Working"
              fill
              className="object-cover"
            />
          </div>

          {/* Right - Experience List */}
          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-5 border-b border-white/10"
              >
                <div>
                  <h3 className="font-semibold mb-1">{exp.company}</h3>
                  <p className="text-[#4ade80] text-sm">{exp.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/60 text-sm">{exp.role}</span>
                  {exp.hasDot && (
                    <span className="w-3 h-3 bg-[#4ade80] rounded-full"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
