import Image from "next/image";
import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";
import CopyBlock from "./CopyBlock";
import { downloadUrl, type FileAsset } from "@/lib/library";

function safeHref(href: unknown): string | undefined {
  if (typeof href !== "string") return undefined;
  if (/^(https?:\/\/|mailto:)/i.test(href) || /^\/(?!\/)/.test(href) || href.startsWith("#")) return href;
  return undefined;
}

const components: PortableTextComponents = {
  types: {
    promptBlock: ({ value }: { value: { title?: string; text?: string } }) => value.text ? <CopyBlock title={value.title} text={value.text} /> : null,
    codeBlock: ({ value }: { value: { code?: string; language?: string } }) => value.code ? <CopyBlock title={value.language || "Code"} text={value.code} /> : null,
    image: ({ value }: { value: { url?: string; alt?: string; caption?: string } }) => value.url ? (
      <figure><Image src={value.url} alt={value.alt || ""} width={1200} height={800} sizes="(max-width: 800px) 90vw, 760px" unoptimized className="library-body-image" />{value.caption && <figcaption>{value.caption}</figcaption>}</figure>
    ) : null,
    download: ({ value }: { value: { label?: string; file?: FileAsset } }) => value.file?.url ? (
      <a className="library-download" href={downloadUrl(value.file)} download={value.file.originalFilename}>{value.label || "Download file"} <span aria-hidden="true">↓</span></a>
    ) : null,
  },
  marks: {
    link: ({ children, value }) => {
      const href = safeHref(value?.href);
      return href ? <a href={href}>{children}</a> : <>{children}</>;
    },
  },
};

export default function ResourceBody({ body }: { body?: PortableTextBlock[] }) {
  return body?.length ? <div className="library-prose"><PortableText value={body} components={components} /></div> : null;
}
