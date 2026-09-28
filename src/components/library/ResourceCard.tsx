import Image from "next/image";
import Link from "next/link";
import { formatDate, kindLabels, type ResourceKind, type ResourceSummary } from "@/lib/library";
import styles from "./ResourceCard.module.css";

const actions = { article: "Read article", prompt: "Get the prompt", skill: "Explore skill" };
const artwork = {
  article: { label: "READ & EXPLORE", title: "A closer look.", detail: "Notes from the work." },
  prompt: { label: "COPY & TRY", title: "Start a conversation.", detail: "A better place to begin." },
  skill: { label: "DOWNLOAD & BUILD", title: "Make it repeatable.", detail: "Tools for your next idea." },
};

function Artwork({ kind }: { kind: ResourceKind }) {
  return <div className={`${styles.artwork} ${styles[kind]}`} aria-hidden="true">
    <span className={styles.artLabel}>{artwork[kind].label}</span>
    <span className={styles.artSymbol}>{kind === "article" ? "Aa" : kind === "prompt" ? ">_" : "{ }"}</span>
    <span className={styles.artTitle}>{artwork[kind].title}</span>
    <span className={styles.artDetail}>{artwork[kind].detail}</span>
  </div>;
}

export default function ResourceCard({ resource, headingLevel = 2 }: { resource: ResourceSummary; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return <article className={styles.card}>
    <Link href={`/library/${resource.slug}`} className={styles.link}>
      <div className={styles.thumbnail}>
        {resource.cover?.url ? <Image src={`${resource.cover.url}?w=1000&fit=max&auto=format`} alt={resource.cover.alt || ""} fill sizes="(max-width: 650px) 90vw, (max-width: 1000px) 44vw, 28vw" unoptimized /> : <Artwork kind={resource._type} />}
      </div>
      <div className={styles.content}>
        <p className={styles.category}>{resource.tags?.[0] || kindLabels[resource._type]}</p>
        <Heading>{resource.title}</Heading>
        <p className={styles.excerpt}>{resource.excerpt}</p>
        <div className={styles.bottom}><time dateTime={resource.publishedAt}>{formatDate(resource.publishedAt)}</time><span>{actions[resource._type]} <span aria-hidden="true">↗</span></span></div>
      </div>
    </Link>
  </article>;
}

export function LibraryCategoryCard({ kind }: { kind: ResourceKind }) {
  const descriptions = {
    article: "Lessons, experiments, and practical guides from the things I’m building.",
    prompt: "Reusable starting points for working with AI. Find one, copy it, and make it yours.",
    skill: "Downloadable skills with the instructions you need to put them to work.",
  };
  return <article className={styles.card}>
    <Link href={`/library?type=${kind}`} className={styles.link}>
      <div className={styles.thumbnail}><Artwork kind={kind} /></div>
      <div className={styles.content}><p className={styles.category}>COMING SOON</p><h3>{kindLabels[kind]}s</h3><p className={styles.excerpt}>{descriptions[kind]}</p><div className={styles.bottom}><span>Freely accessible</span><span>Explore <span aria-hidden="true">↗</span></span></div></div>
    </Link>
  </article>;
}
