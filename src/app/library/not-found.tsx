import Link from "next/link";

export default function ResourceNotFound() {
  return <main className="library-page"><div className="library-wrap library-empty"><p className="library-eyebrow">NOT FOUND</p><h1>This page isn’t in the library.</h1><p>It may have moved or may not be published yet.</p><Link className="library-text-link" href="/library">Back to the library ↗</Link></div></main>;
}
