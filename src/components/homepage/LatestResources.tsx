import Link from "next/link";
import { Suspense } from "react";
import { getResources, resourceKinds } from "@/lib/library";
import { live } from "@/sanity/live";
import ResourceCard, { LibraryCategoryCard } from "@/components/library/ResourceCard";
import styles from "./LatestResources.module.css";

export default async function LatestResources() {
  let resources;
  try {
    resources = (await getResources()).slice(0, 3);
  } catch (error) {
    // A CMS outage must not take down the portfolio homepage.
    console.error("Unable to load latest library resources", error);
    return <section className={styles.section}><div className={styles.wrap}><header className={styles.header}><div><p className={styles.eyebrow}>THE LIBRARY</p><h2>Ideas worth putting to work.</h2><p>Articles, prompts, and skills. Explore the library for the latest.</p></div><Link className={styles.all} href="/library">Visit the library ↗</Link></header></div></section>;
  }
  const SanityLive = live?.SanityLive;
  return <section className={styles.section} aria-labelledby="latest-library-title">
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>ARTICLES, PROMPTS & SKILLS</p><h2 id="latest-library-title">Ideas worth putting to work.</h2><p>What I’m learning, testing, and building with AI and software.<br className={styles.desktopBreak} /> Practical reads and reusable resources, shared freely.</p></div>
        <Link className={styles.all} href="/library">View the library <span aria-hidden="true">↗</span></Link>
      </header>
      <div className={styles.grid}>{resources.length ? resources.map((resource) => <ResourceCard key={resource._id} resource={resource} headingLevel={3} />) : resourceKinds.map((kind) => <LibraryCategoryCard key={kind} kind={kind} />)}</div>
    </div>
    {SanityLive && <Suspense><SanityLive /></Suspense>}
  </section>;
}
