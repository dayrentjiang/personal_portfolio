import "server-only";
import { cache } from "react";
import { draftMode } from "next/headers";
import { defineQuery } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/react";
import { live } from "@/sanity/live";
import { client } from "@/sanity/client";

export const resourceKinds = ["article", "prompt", "skill"] as const;
export type ResourceKind = (typeof resourceKinds)[number];
export const kindLabels: Record<ResourceKind, string> = { article: "Article", prompt: "Prompt", skill: "Skill" };
export type FileAsset = { url: string; originalFilename: string; size: number; mimeType?: string };
export type ResourceSummary = {
  _id: string; _type: ResourceKind; title: string; slug: string; excerpt: string;
  publishedAt: string; _updatedAt: string; tags?: string[];
  cover?: { url: string; alt?: string };
};
export type Resource = ResourceSummary & {
  body?: PortableTextBlock[]; promptText?: string; skillFile?: FileAsset;
  version?: string; requirements?: string;
};

const listingQuery = defineQuery(`*[_type in ["article", "prompt", "skill"] && defined(slug.current)] | order(publishedAt desc) {
  _id, _type, title, "slug": slug.current, excerpt, publishedAt, _updatedAt, tags,
  "cover": cover { "url": asset->url, alt }
}`);
const resourceQuery = defineQuery(`*[_type in ["article", "prompt", "skill"] && slug.current == $slug][0] {
  _id, _type, title, "slug": slug.current, excerpt, publishedAt, _updatedAt, tags,
  "cover": cover { "url": asset->url, alt },
  body[] { ..., _type == "image" => { "url": asset->url },
    _type == "download" => { "file": asset->{url, originalFilename, size, mimeType} }
  },
  promptText, version, requirements,
  "skillFile": skillFile.asset->{url, originalFilename, size, mimeType}
}`);

export const getResources = cache(async (): Promise<ResourceSummary[]> => {
  if (!live || !client) return [];
  // A publication must appear even when no browser was connected to Sanity Live.
  // React cache still deduplicates this request within the current render.
  if (!(await draftMode()).isEnabled) {
    return client.fetch<ResourceSummary[]>(listingQuery, {}, {
      perspective: "published", stega: false, useCdn: false, cache: "no-store",
    });
  }
  const { data } = await live.sanityFetch({ query: listingQuery, stega: false });
  return data as ResourceSummary[];
});

export const getResource = cache(async (slug: string): Promise<Resource | null> => {
  if (!live || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const { data } = await live.sanityFetch({ query: resourceQuery, params: { slug }, stega: false });
  return data as Resource | null;
});

export function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "" : new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}

export function downloadUrl(file: FileAsset) {
  const url = new URL(file.url);
  url.searchParams.set("dl", file.originalFilename || "download");
  return url.toString();
}

export async function getSkillPreview(file?: FileAsset): Promise<string | null> {
  if (!file || !file.originalFilename?.toLowerCase().endsWith(".md") || file.size > 256_000) return null;
  const url = new URL(file.url);
  if (url.protocol !== "https:" || url.hostname !== "cdn.sanity.io" || !url.pathname.startsWith("/files/")) return null;
  try {
    const response = await fetch(url, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) });
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  }
}
