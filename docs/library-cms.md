# Library publishing

The website has a public Library at `/library` and an embedded Sanity Studio at `/studio`.
The Library supports articles, copyable prompts, and downloadable skills. Until a project
is connected, it shows an empty state. No sample posts are published automatically.
The homepage shows the three newest published resources with large thumbnail cards. Before
the first publication, it shows clearly labelled category links marked "Coming soon".

## Connect Sanity

Project: `dt940e6a`, organization: `oq90h5p08`, dataset: `production`.
The organization ID is for account administration and is not needed by the website client.

1. Create a Sanity project at https://www.sanity.io/manage, using a **public** dataset named
   `production`. An existing project and public dataset also work.
2. Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and
   `NEXT_PUBLIC_SANITY_DATASET` to the project's settings.
3. Under the project's API settings, create a **Viewer** token and put it in
   `SANITY_API_READ_TOKEN`. This enables draft previews. Keep it out of Git and chat.
   The preview integration shares this read-only token with authenticated draft-preview
   browser sessions; it is not embedded in the public JavaScript bundle.
4. Under API → CORS origins, add `http://localhost:3000` and the deployed website's
   exact origin, with **Allow credentials** enabled. If using a different local port,
   add that origin too.
5. Run `npm run dev`, visit `/studio`, and sign in to Sanity.
6. Add the same environment variables to your website host, then rebuild/redeploy.
   The Studio is part of this Next.js app and needs no separate hosting.
   Set `NEXT_PUBLIC_SITE_URL` to your website's public origin for canonical and social
   links (Vercel's production domain is used automatically when available).

The free Sanity plan is sufficient for the initial setup, subject to its usage limits.
Files uploaded to this public library are intended to be public; an unpublished document
does not make its uploaded asset URL private. Use a separate storage design if introducing
paid or restricted downloads later.

## Publish

- Choose **Articles**, **Prompts**, or **Skills**, then create a document.
- Write a title and short description. Under Details, generate the page address, choose
  the publication date, and optionally add a cover image and topics.
  The thumbnail appears on the homepage and Library cards; landscape artwork works best.
  The first topic is used as the card category, falling back to Article, Prompt, or Skill.
- Write in the visual content editor. It supports headings, lists, quotes, links, images,
  code blocks, copyable prompt blocks, and file downloads.
- For a Prompt, paste the exact text in **Prompt to copy**.
- For a Skill, upload `.md` or `.zip`, write its setup instructions, and optionally set
  a version and requirements. Markdown files up to 256 KB get a collapsible source preview
  loaded directly from the uploaded file. ZIP files are download-only.
- Open the document's location in **Presentation** to preview the actual page. This
  requires the Viewer token and CORS setup above. An unsaved/missing slug has no detail URL.
- Click **Publish**, then share `/library/your-page-address`.

The publication date is a display date, not a scheduler. Publishing makes a document public.
Sanity Live refreshes readers' pages after content changes without a website deployment.
The public homepage and Library list also fetch published resources on each request,
so new publications appear even when no reader was connected to receive a live event.
The public perspective excludes drafts; the authenticated Presentation handshake enables
draft mode. Exit preview using the on-page control when browsing outside Studio.

## Maintain shared resources

Keep the page address unchanged after sharing. Update the content or replace the skill
attachment, increment its version when useful, and publish again. The visible updated date
comes from Sanity's document modification time. Old direct file URLs may remain available;
share the resource page as the permanent link.

Article, Prompt, and Skill slugs are validated for uniqueness across all three types.
If importing content through an API, enforce the same rule (Studio validation only applies
to editing in Studio).

## Verify the connection

1. Create an unpublished draft and generate its slug. Its public URL should return 404.
2. Open Presentation: the draft should render there, including unsaved changes once synced.
3. Publish: check the Library listing, type filter, and detail page in a private browser.
4. Check exact prompt copying, skill downloads, and social link previews.
5. Edit and republish; verify the shared URL stays the same and readers receive the update.
6. Unpublish and confirm it disappears publicly, while remaining visible in preview.

Configuration: `sanity.config.ts`. Content forms: `src/sanity/schema.ts`.
Queries and resource data: `src/lib/library.ts`. Public pages: `src/app/library`.
