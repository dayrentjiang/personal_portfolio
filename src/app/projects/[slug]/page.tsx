import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import styles from "./project.module.css";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) return { title: "Project not found | Dayrent Tjiang" };
  return {
    title: `${project.title} | Dayrent Tjiang`,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.description, images: [project.image] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();

  return (
    <main className={`portfolio-page ${styles.page}`}>
      <div className={styles.wrap}>
        <Link href="/projects" className={styles.back}>← All projects</Link>
        <div className={styles.hero}>
          <header>
            <p className={styles.eyebrow}>{project.category}</p>
            <h1>{project.title}</h1>
            <p className={styles.description}>{project.description}</p>
            <ul className={styles.tags} aria-label="Technologies">
              {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <div className={styles.links}>
              {project.details.liveUrl && <a href={project.details.liveUrl} target="_blank" rel="noopener noreferrer">Visit website <span aria-hidden="true">↗</span></a>}
              {project.details.githubUrl && <a href={project.details.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
              {project.details.videoUrl && <a href={project.details.videoUrl} target="_blank" rel="noopener noreferrer">Watch demo ↗</a>}
            </div>
          </header>
          <Image className={styles.image} src={project.image} alt={`${project.title} website and mobile replay concept`} width={1122} height={1402} sizes="(max-width: 760px) 88vw, 440px" />
        </div>
        <div className={styles.details}>
          <section>
            <p className={styles.eyebrow}>The project</p>
            <h2>Overview</h2>
            <p>{project.details.overview}</p>
          </section>
          <section>
            <h2>What it does</h2>
            <ul className={styles.features}>{project.details.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <h3>Built with</h3>
            <ul className={styles.tags} aria-label="Tech stack">{project.details.techStack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
          </section>
        </div>
      </div>
    </main>
  );
}
