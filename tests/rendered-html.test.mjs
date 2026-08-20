import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("keeps the Kore identity and complete editorial structure", async () => {
  const [page, layout, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /Kore — Diamo forma alle idee/);
  assert.match(layout, /lang="it"/);
  assert.match(page, /Diamo forma/);
  assert.match(page, /Non facciamo/);
  assert.match(page, /Come lavoriamo/);
  assert.match(page, /id="contatti"/);
  assert.match(page, /Nessun cliente inventato/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(page + layout, /SkeletonPreview|codex-preview/);
});

test("is configured as a native Vercel Next.js project", async () => {
  const [packageJson, vercelConfig] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../vercel.json", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"build": "next build"/);
  assert.match(packageJson, /"next": "\^16\.2\.6"/);
  assert.doesNotMatch(packageJson, /vinext|wrangler|sites-vite-plugin/);
  assert.match(vercelConfig, /"framework": "nextjs"/);

  await Promise.all([
    access(new URL("../public/kore-brand.png", import.meta.url)),
    access(new URL("../public/favicon.png", import.meta.url)),
    access(new URL("../public/images/designer.jpg", import.meta.url)),
  ]);
});
