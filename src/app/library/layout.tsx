import { Suspense } from "react";
import { draftMode } from "next/headers";
import { live } from "@/sanity/live";
import PreviewTools from "@/components/library/PreviewTools";
import "./library.css";

async function Preview() {
  return (await draftMode()).isEnabled ? <PreviewTools /> : null;
}

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  const SanityLive = live?.SanityLive;
  return <>
    {children}
    {SanityLive && <Suspense><SanityLive /></Suspense>}
    <Suspense><Preview /></Suspense>
  </>;
}
