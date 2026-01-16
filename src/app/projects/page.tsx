import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-8 py-24">
      <div className="max-w-6xl mx-auto pt-16">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <p className="text-[#4ade80] text-sm">// All Projects</p>
          <h1 className="text-4xl md:text-5xl font-bold text-right max-w-md leading-tight">
            My Complete Project Collection
          </h1>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center gap-2 mb-16">
          <span className="text-[#4ade80]">&lt;/</span>
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-[#4ade80]">&gt;</span>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <div className="relative aspect-[7/4] mb-6 overflow-hidden rounded-lg bg-[#1a1a1a]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-[#4ade80] transition-colors">
                {project.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs border border-white/20 rounded-full px-3 py-1 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
