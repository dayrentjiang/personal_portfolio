import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import GlobeBackground from "./GlobeBackground";
import styles from "./Projects.module.css";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Projects({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const hasProjects = projects.length > 0;

  return (
    <section id="portfolio" className={`${styles.section} ${standalone ? styles.standalone : ""}`} aria-labelledby="portfolio-title">
      <GlobeBackground />
      <div className={styles.content}>
        <header className={styles.header}>
          <div>
            <Heading id="portfolio-title" className={styles.heading}>My Portfolio<span>.</span></Heading>
            <p className={styles.intro}>{hasProjects ? "Real businesses. Thoughtful software. Built from the ground up." : "Selected projects, coming soon."}</p>
          </div>
          <Link className={styles.allProjects} href={standalone ? "/contact" : "/projects"}>
            {standalone ? "Let’s build something" : "View All Projects"}<Arrow />
          </Link>
        </header>

        <div className={styles.grid}>
          {!hasProjects && Array.from({ length: 5 }, (_, index) => (
            <article key={index} className={styles.placeholder}>
              <svg className={styles.placeholderGraphic} viewBox="0 0 80 80" fill="none" aria-hidden="true">
                <rect x="21" y="13" width="46" height="46" rx="9" stroke="currentColor" strokeWidth="1" />
                <rect x="13" y="21" width="46" height="46" rx="9" fill="var(--page-surface)" stroke="currentColor" strokeWidth="1" />
                <path d="M28 44h16M36 36v16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <div className={styles.placeholderContent}>
                <h3>Project {String(index + 1).padStart(2, "0")}</h3>
                <p>Coming soon</p>
              </div>
            </article>
          ))}
          {projects.map((project, index) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.card} aria-label={`Explore ${project.title}`}>
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                sizes="(max-width: 600px) 88vw, (max-width: 1000px) 43vw, (max-width: 1400px) 28vw, 390px"
                className={styles.image}
                style={{ objectPosition: project.thumbnailPosition ?? "center" }}
              />
              <div className={styles.shade} />
              <span className={styles.projectNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.cardArrow}><Arrow /></span>
              <div className={styles.cardContent}>
                <p className={styles.category}>{project.category}</p>
                <h3>{project.title}</h3>
                <p className={styles.summary}>{project.summary}</p>
                <ul className={styles.tags} aria-label="Technologies">
                  {project.tags.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
            </Link>
          ))}

          <Link href="/contact" className={styles.contactCard}>
            <span className={styles.contactSymbol} aria-hidden="true">✳</span>
            <div>
              <h3>Your idea.<br />Our next build.</h3>
              <p>Have a challenge worth solving?<br />Let&apos;s make something that matters.</p>
              <span className={styles.contactLink}>Let&apos;s talk <Arrow /></span>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
