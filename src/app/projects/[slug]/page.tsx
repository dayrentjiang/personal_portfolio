import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-8 py-24">
      <div className="max-w-4xl mx-auto pt-16">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="text-[#4ade80] text-sm hover:underline mb-8 inline-block"
        >
          &larr; Back to Projects
        </Link>

        {/* Header */}
        <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
        <p className="text-white/60 text-lg mb-8">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="text-sm border border-white/20 rounded-full px-4 py-1 text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative aspect-video mb-12 rounded-lg overflow-hidden bg-[#1a1a1a]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-white/70 leading-relaxed">
            {project.details.overview}
          </p>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="space-y-2">
            {project.details.features.map((feature, i) => (
              <li key={i} className="text-white/70 flex items-center gap-3">
                <span className="text-[#4ade80]">&#10003;</span>
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.details.techStack.map((tech, i) => (
              <span
                key={i}
                className="bg-white/10 px-4 py-2 rounded-lg text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Links */}
        <section className="flex gap-4">
          {project.details.liveUrl && (
            <a
              href={project.details.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#4ade80] text-black font-medium px-6 py-3 rounded-full hover:bg-[#3fcf70] transition-colors"
            >
              View Live
            </a>
          )}
          {project.details.githubUrl && (
            <a
              href={project.details.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/5 transition-colors"
            >
              GitHub
            </a>
          )}
        </section>
      </div>
    </main>
  );
}
