"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { defineLocations, presentationTool } from "sanity/presentation";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schema";

const locations = defineLocations({
  select: { title: "title", slug: "slug.current" },
  resolve: (doc) => ({ locations: [
    ...(doc?.slug ? [{ title: doc.title || "Resource", href: `/library/${doc.slug}` }] : []),
    { title: "Library", href: "/library" },
  ] }),
});

export default defineConfig({
  name: "library", title: "Dayrent’s Library", basePath: "/studio",
  projectId: projectId || "unconfigured", dataset,
  plugins: [
    structureTool({ structure: (S) => S.list().title("Library").items([
      S.documentTypeListItem("article").title("Articles"),
      S.documentTypeListItem("prompt").title("Prompts"),
      S.documentTypeListItem("skill").title("Skills"),
    ]) }),
    presentationTool({
      previewUrl: { initial: "/library", previewMode: { enable: "/api/draft-mode/enable", disable: "/api/draft-mode/disable" } },
      resolve: { locations: { article: locations, prompt: locations, skill: locations } },
    }),
  ],
  schema: { types: schemaTypes },
});
