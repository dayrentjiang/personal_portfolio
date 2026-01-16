const steps = [
  {
    number: "01",
    title: "Plan & Architect",
    description:
      "Before writing a single line of code, I dive deep into understanding the project goals, user needs, and technical constraints.",
  },
  {
    number: "02",
    title: "Build & Develop",
    description:
      "Build pixel-perfect user interfaces and robust backend systems in parallel. I ensure that every component—UI or API—is maintainable.",
    hasDot: true,
  },
  {
    number: "03",
    title: "Launch & Support",
    description:
      "I also provide post-launch monitoring, performance optimization, and ongoing iteration support to keep your product growing.",
  },
];

export default function Process() {
  return (
    <section className="min-h-screen bg-[#0a0a0a] px-8 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <p className="text-[#4ade80] text-sm">// Process</p>
          <h2 className="text-4xl md:text-5xl font-bold text-right max-w-md leading-tight">
            My Development work Process
          </h2>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center gap-2 mb-16">
          <span className="text-[#4ade80]">&lt;/</span>
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-[#4ade80]">&gt;</span>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`py-8 px-6 ${
                index !== steps.length - 1 ? "md:border-r md:border-white/10" : ""
              }`}
            >
              {/* Large Number */}
              <div className="relative mb-8">
                <span
                  className="text-[10rem] font-bold leading-none text-transparent"
                  style={{
                    WebkitTextStroke: "2px #4ade80",
                  }}
                >
                  {step.number}
                </span>
                {step.hasDot && (
                  <span className="absolute top-8 right-1/4 w-3 h-3 bg-[#4ade80] rounded-full"></span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
