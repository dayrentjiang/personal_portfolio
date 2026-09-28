import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import ResourceBody from "@/components/library/ResourceBody";
import CopyBlock from "@/components/library/CopyBlock";
import { downloadUrl, formatDate, getResource, getSkillPreview, kindLabels } from "@/lib/library";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resource = await getResource((await params).slug);
  if (!resource) return { title: "Resource not found | Dayrent Tjiang" };
  const preview = (await draftMode()).isEnabled;
  return {
    title: `${resource.title} | Dayrent Tjiang`, description: resource.excerpt,
    alternates: { canonical: `/library/${resource.slug}` },
    ...(preview ? { robots: { index: false, follow: false } } : {}),
    openGraph: { title: resource.title, description: resource.excerpt, type: "article", publishedTime: resource.publishedAt, modifiedTime: resource._updatedAt,
      ...(resource.cover?.url ? { images: [{ url: resource.cover.url, alt: resource.cover.alt || resource.title }] } : {}),
    },
    twitter: { card: resource.cover?.url ? "summary_large_image" : "summary", title: resource.title, description: resource.excerpt,
      ...(resource.cover?.url ? { images: [resource.cover.url] } : {}),
    },
  };
}

export default async function ResourcePage({ params }: Props) {
  const resource = await getResource((await params).slug);
  if (!resource) notFound();
  const preview = await getSkillPreview(resource.skillFile);
  return <main className="library-page library-detail">
    <article className="library-article">
      <Link className="library-back" href="/library">← Back to library</Link>
      <header className="library-article-header">
        <p className="library-eyebrow">{kindLabels[resource._type]}{resource.version ? ` · v${resource.version}` : ""}</p>
        <h1>{resource.title}</h1><p className="library-deck">{resource.excerpt}</p>
        <div className="library-byline"><span className="library-avatar">DT</span><span>Dayrent Tjiang<br /><time dateTime={resource.publishedAt}>{formatDate(resource.publishedAt)}</time></span><span className="library-updated">Updated <time dateTime={resource._updatedAt}>{formatDate(resource._updatedAt)}</time></span></div>
        {resource.cover?.url && <Image className="library-cover" src={resource.cover.url} alt={resource.cover.alt || ""} width={1400} height={900} sizes="(max-width: 900px) 90vw, 840px" unoptimized />}
      </header>
      {resource._type === "skill" && resource.skillFile?.url && <aside className="library-skill-download">
        <div><p className="library-eyebrow">READY TO TRY?</p><h2>Make this skill yours.</h2>{resource.requirements && <p>{resource.requirements}</p>}<span>{resource.skillFile.originalFilename} · {Math.max(1, Math.round(resource.skillFile.size / 1024))} KB</span></div>
        <a className="library-download" href={downloadUrl(resource.skillFile)} download={resource.skillFile.originalFilename}>Download skill <span aria-hidden="true">↓</span></a>
      </aside>}
      <ResourceBody body={resource.body} />
      {resource._type === "prompt" && resource.promptText && <CopyBlock text={resource.promptText} title="Copy this prompt" />}
      {preview && <details className="library-file-preview"><summary>Look inside · {resource.skillFile?.originalFilename}</summary><CopyBlock text={preview} title="Skill file contents" /></details>}
      {!!resource.tags?.length && <div className="library-tags library-article-tags">{resource.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
      <footer className="library-article-footer"><p>Something to take into your next build.</p><Link className="library-text-link" href="/library">Explore the library <span aria-hidden="true">↗</span></Link></footer>
    </article>
  </main>;
}
