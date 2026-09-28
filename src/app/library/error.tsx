"use client";

export default function LibraryError({ reset }: { reset: () => void }) {
  return <main className="library-page"><div className="library-wrap library-empty"><h1>The library couldn’t load.</h1><p>Please try again in a moment.</p><button className="library-download" onClick={reset}>Try again ↗</button></div></main>;
}
