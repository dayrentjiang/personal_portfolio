const skillCategories = [
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
  },
  {
    title: "Server-side development",
    skills: ["Node.js", "Express.js", "MongoDB", "PHP", "Laravel"],
  },
  {
    title: "Tools",
    skills: ["Git", "Github", "Stack Overflow", "AWS", "Docker"],
  },
];

const stats = [
  { number: "6+", label: "Years in Experience" },
  { number: "16+", label: "Clients Worldwide" },
  { number: "97+", label: "Completed Projects" },
];

export default function Skills() {
  return (
    <section className="min-h-screen bg-[#0a0a0a] px-8 py-48">
      <div className="max-w-6xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Skills */}
          <div>
            <p className="text-[#4ade80] text-sm mb-8">// Skills</p>

            <div className="space-y-6">
              {skillCategories.map((category, index) => (
                <div key={index} className="border-b border-white/10 pb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{category.title}</h3>
                    <span className="text-white/50">&lt;/&gt;</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-white/60">
                    {category.skills.map((skill, i) => (
                      <span key={i}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Description */}
          <div className="lg:pt-16">
            <p className="text-white/80 leading-relaxed mb-8">
              I thrive on solving real-world problems, turning ideas into clean,
              maintainable code, and learning through experimentation.
              You&apos;ll find me building side projects, diving into new tech
              stacks, or simply exploring what&apos;s next in the world of web
              development.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="inline-block bg-[#4ade80] text-black font-medium px-8 py-3 rounded-full hover:bg-[#3fcf70] transition-colors"
              >
                My Resume
              </a>
              <span className="w-3 h-3 bg-[#4ade80] rounded-full"></span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {stats.map((stat, index) => (
            <div key={index} className="border-b border-white/10 pb-6">
              <p className="text-6xl font-bold mb-2">{stat.number}</p>
              <p className="text-[#4ade80]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
