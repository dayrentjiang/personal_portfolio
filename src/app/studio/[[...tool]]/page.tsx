import type { Metadata } from "next";
import Link from "next/link";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";
export const metadata: Metadata = { title: "Library Studio | Dayrent Tjiang", robots: { index: false, follow: false } };

export default function StudioPage() {
  if (!isSanityConfigured) return <main className="studio-setup"><h1>Connect your Library Studio</h1><p>Add your Sanity project ID and dataset to <code>.env.local</code>, then restart the site.</p><p>The setup steps are in <code>docs/library-cms.md</code>.</p><Link href="/library">Visit the library →</Link></main>;
  return <div className="studio-root"><NextStudio config={config} /></div>;
}
