import assert from "node:assert/strict";

const [origin, slug] = process.argv.slice(2);
assert(origin && slug, "Usage: node scripts/check-library-home.mjs <origin> <published-slug>");
assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug), "Provide a valid published resource slug");

for (const path of ["/library", "/"]) {
  const response = await fetch(new URL(path, origin), { signal: AbortSignal.timeout(30_000) });
  assert.equal(response.status, 200, `${path} must load successfully`);
  const html = await response.text();
  assert(html.includes(`href="/library/${slug}"`), `${path} must link to the published resource`);
  console.log(`PASS: ${path} links to ${slug}`);
}
