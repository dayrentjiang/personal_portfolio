import type { Metadata } from "next";
import Link from "next/link";
import { getResources, resourceKinds } from "@/lib/library";
import ResourceCard from "@/components/library/ResourceCard";

export const metadata: Metadata = {
  title: "Library | Dayrent Tjiang",
  alternates: { canonical: "/library" },
  description: "Articles, prompts, and skills. Useful things from my work with AI and software, shared freely.",
  openGraph: { title: "Library | Dayrent Tjiang", description: "Read, try, and make it your own. Articles, prompts, and skills, shared freely." },
};

const filters = [{ label: "All", value: "all" }, { label: "Articles", value: "article" }, { label: "Prompts", value: "prompt" }, { label: "Skills", value: "skill" }];

export default async function LibraryPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const active = resourceKinds.some((kind) => kind === type) ? type : "all";
  const resources = await getResources();
  const visible = active === "all" ? resources : resources.filter((resource) => resource._type === active);

  return (
    <main className="library-page">
      <div className="library-wrap">
        <header className="library-hero">
          <p className="library-eyebrow">THE LIBRARY · ARTICLES, PROMPTS & SKILLS</p>
          <h1>Ideas worth putting to work.</h1>
          <div className="library-hero-bottom"><p>What I’m learning, testing, and building with AI and software. Practical reads and reusable resources, shared freely.</p></div>
        </header>
        <section aria-label="Library resources">
          <div className="library-toolbar">
            <nav className="library-filters" aria-label="Filter library">
              {filters.map((filter) => <Link key={filter.value} href={filter.value === "all" ? "/library" : `/library?type=${filter.value}`} aria-current={active === filter.value ? "page" : undefined} scroll={false}>{filter.label}<span>{filter.value === "all" ? resources.length : resources.filter((item) => item._type === filter.value).length}</span></Link>)}
            </nav>
            <span className="library-sort">LATEST FIRST</span>
          </div>
          {visible.length ? <div className="library-grid">
            {visible.map((resource) => <ResourceCard key={resource._id} resource={resource} />)}
          </div> : <div className="library-empty">
            <span className="library-empty-mark" aria-hidden="true">{active === "prompt" ? ">_" : active === "skill" ? "{ }" : "Aa"}</span>
            <p className="library-eyebrow">ROOM FOR WHAT’S NEXT</p>
            <h2>{active === "all" ? "The notebook is opening soon." : `More ${filters.find((filter) => filter.value === active)?.label.toLowerCase()} on the way.`}</h2>
            <p>I’m putting together useful things to share here.<br />Come back for new ideas, practical guides, and tools to try.</p>
            {active !== "all" && <Link className="library-text-link" href="/library">Explore the whole library <span aria-hidden="true">↗</span></Link>}
          </div>}
        </section>
        <aside className="library-note"><span aria-hidden="true">✳</span><p>Good ideas get better when they’re shared.<br /><span>Take what’s useful. Make something of your own.</span></p><Link href="/contact">Let’s exchange ideas <span aria-hidden="true">↗</span></Link></aside>
      </div>
    </main>
  );
}
