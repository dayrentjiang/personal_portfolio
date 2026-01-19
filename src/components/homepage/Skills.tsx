export default function Skills() {
  return (
    <section className="bg-[#0a0a0a] px-8 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-12">
          <p className="text-[#4ade80] text-sm">// How I Work</p>
          <h2 className="text-3xl md:text-4xl font-bold md:text-right max-w-lg leading-tight">
            End to End Solutions
          </h2>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center gap-2 mb-16">
          <span className="text-[#4ade80]">&lt;/</span>
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-[#4ade80]">&gt;</span>
        </div>

        {/* Content */}
        <div className="max-w-2xl">
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            I work end to end, from understanding your problem to shipping a
            solution that actually works. I integrate AI tools where they make
            sense, not just because they&apos;re trendy.
          </p>
          <p className="text-white/60 leading-relaxed mb-6">
            I can pick up any framework or language when the project needs it.
            What matters is solving the problem, not the stack.
          </p>
          <p className="text-white/60 leading-relaxed">
            My focus is on delivering things that help you grow your business or
            solve problems that actually matter. No fluff, just results.
          </p>
        </div>
      </div>
    </section>
  );
}
