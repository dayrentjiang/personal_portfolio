import { defineArrayMember, defineField, defineType } from "sanity";

const promptBlock = defineType({
  name: "promptBlock",
  title: "Copyable prompt",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Label", initialValue: "Try this prompt" }),
    defineField({ name: "text", type: "text", title: "Prompt", rows: 10, validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

const download = defineType({
  name: "download",
  title: "Download",
  type: "file",
  options: { accept: ".md,.zip,.txt,.pdf" },
  fields: [defineField({ name: "label", type: "string", title: "Button label", initialValue: "Download file" })],
});

const video = defineType({
  name: "video",
  title: "Video",
  type: "file",
  options: { accept: "video/mp4,video/webm" },
  fields: [
    defineField({ name: "title", title: "Video description", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "poster", title: "Poster image", type: "image" }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
});

const body = defineType({
  name: "resourceBody",
  title: "Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }, { title: "Code", value: "code" }],
        annotations: [{ name: "link", title: "Link", type: "object", fields: [
          defineField({ name: "href", title: "URL", type: "url", validation: (rule) => rule.required().uri({ scheme: ["http", "https", "mailto"], allowRelative: true }) }),
        ] }],
      },
    }),
    defineArrayMember({ type: "image", options: { hotspot: true }, fields: [
      defineField({ name: "alt", title: "Image description", type: "string", validation: (rule) => rule.required() }),
      defineField({ name: "caption", title: "Caption", type: "string" }),
    ] }),
    defineArrayMember({ type: "promptBlock" }),
    defineArrayMember({ type: "download" }),
    defineArrayMember({ type: "video" }),
    defineArrayMember({ name: "codeBlock", title: "Code block", type: "object", fields: [
      defineField({ name: "language", type: "string", title: "Language", initialValue: "text" }),
      defineField({ name: "code", type: "text", rows: 12, validation: (rule) => rule.required() }),
    ], preview: { select: { title: "language", subtitle: "code" } } }),
  ],
});

function resource(name: "article" | "prompt" | "skill", title: string) {
  return defineType({
    name,
    title,
    type: "document",
    groups: [{ name: "content", title: "Content", default: true }, { name: "details", title: "Details" }],
    fields: [
      defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (rule) => rule.required().max(120) }),
      defineField({
        name: "slug", title: "Page address", type: "slug", group: "details",
        description: "Generate once, then keep this address stable so shared links keep working.",
        options: {
          source: "title", maxLength: 96,
          isUnique: async (slug, context) => {
            const id = context.document?._id.replace(/^drafts\./, "");
            return context.getClient({ apiVersion: "2026-02-01" }).fetch<boolean>(
              '!defined(*[_type in ["article", "prompt", "skill"] && slug.current == $slug && !(_id in [$id, $draft])][0]._id)',
              { slug, id: id || "", draft: `drafts.${id}` },
            );
          },
        },
        validation: (rule) => rule.required().custom((value) => !value?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current) || "Use lowercase letters, numbers, and hyphens."),
      }),
      defineField({ name: "excerpt", title: "Short description", type: "text", rows: 3, group: "content", validation: (rule) => rule.required().max(240) }),
      defineField({ name: "cover", title: "Thumbnail / cover image", description: "Shown prominently on the homepage and Library cards. Use a landscape image; keep important text near the centre.", type: "image", group: "details", options: { hotspot: true }, fields: [
        defineField({ name: "alt", title: "Image description", type: "string", validation: (rule) => rule.required() }),
      ] }),
      defineField({ name: "body", title: name === "article" ? "Article" : "Overview, instructions, and examples", type: "resourceBody", group: "content", validation: (rule) => rule.required().min(1) }),
      ...(name === "prompt" ? [defineField({ name: "promptText", title: "Prompt to copy", type: "text", rows: 14, group: "content", description: "Paste the exact prompt here. Whitespace is preserved.", validation: (rule) => rule.required() })] : []),
      ...(name === "skill" ? [
        defineField({ name: "skillFile", title: "Skill file", type: "file", group: "content", options: { accept: ".md,.zip" }, validation: (rule) => rule.required(), description: "Upload SKILL.md or a ZIP containing the skill and its supporting files. Markdown previews come directly from this file." }),
        defineField({ name: "version", title: "Version", type: "string", group: "details", initialValue: "1.0" }),
        defineField({ name: "requirements", title: "Requirements", type: "string", group: "details", description: "For example: the supported app and any required tools." }),
      ] : []),
      defineField({ name: "tags", title: "Topics", type: "array", group: "details", of: [{ type: "string" }], options: { layout: "tags" } }),
      defineField({ name: "publishedAt", title: "Publication date", type: "datetime", group: "details", initialValue: () => new Date().toISOString(), description: "Display date only. Use Publish to make the resource public.", validation: (rule) => rule.required() }),
    ],
    orderings: [{ title: "Newest first", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] }],
    preview: { select: { title: "title", subtitle: "excerpt", media: "cover" } },
  });
}

export const schemaTypes = [body, promptBlock, download, video, resource("article", "Article"), resource("prompt", "Prompt"), resource("skill", "Skill")];
