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
  assert.match(page, /Strategia,/);
  assert.match(page, /e idee vive/);
  assert.match(page, /Non facciamo/);
  assert.match(page, /Come lavoriamo/);
  assert.match(page, /id="contatti"/);
  assert.match(page, /Centro Revisioni TRIM/);
  assert.match(page, /Osteria Annunziata/);
  assert.match(page, /Il Meridiano Sport/);
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
    access(new URL("../public/brand/kore-logo-coral.png", import.meta.url)),
    access(new URL("../public/clients/osteria-annunziata.jpg", import.meta.url)),
    access(new URL("../public/partners/metropolis.png", import.meta.url)),
  ]);
});

test("provides a projects archive and individual case-study routes", async () => {
  const [home, archive, detail, data] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/progetti/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/progetti/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/project-data.ts", import.meta.url), "utf8"),
  ]);

  assert.match(home, /Vedi tutti i progetti/);
  assert.match(home, /href="\/progetti"/);
  assert.match(archive, /Progetti con/);
  assert.match(archive, /projects\.map/);
  assert.match(detail, /generateStaticParams/);
  assert.match(detail, /generateMetadata/);
  assert.match(data, /trim-identita-digitale/);
  assert.match(data, /osteria-annunziata-territorio/);
});

test("includes a scroll-driven spiral video showreel in the home page", async () => {
  const [home, showreel, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/video-showcase.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(home, /<VideoShowcase \/>/);
  assert.match(showreel, /ScrollTrigger\.create/);
  assert.match(showreel, /orbitItems/);
  assert.match(showreel, /playsInline/);

  /* Il test chiedeva un nome di file preciso, e si e' rotto nel momento in cui
     i filmati segnaposto hanno lasciato il posto al lavoro vero dei clienti.
     Il nome dei clip cambiera' ancora; cio' che non deve cambiare e' che ogni
     reel abbia una sorgente e un poster, e che i file citati esistano davvero
     in `public/` — un `src` che punta al nulla e' un riquadro nero in pagina,
     ed e' esattamente quello che un test dovrebbe intercettare. */
  const sorgenti = [...showreel.matchAll(/src:\s*"(\/[^"]+\.mp4)"/g)].map((m) => m[1]);
  const poster = [...showreel.matchAll(/poster:\s*"(\/[^"]+)"/g)].map((m) => m[1]);
  assert.ok(sorgenti.length >= 3, `il carosello ha ${sorgenti.length} video, ne servono almeno 3`);
  assert.equal(poster.length, sorgenti.length, "ogni video deve avere il suo poster");
  await Promise.all(
    [...sorgenti, ...poster].map((f) =>
      access(new URL(`../public${f}`, import.meta.url)).catch(() => {
        throw new Error(`il showreel cita ${f}, che non esiste in public/`);
      }),
    ),
  );

  /* La sorgente resta staccata finche' la sezione non e' vicina: i quattro
     reel pesano decine di megabyte e con l'`autoplay` il browser li scarica
     appena esistono, `preload="metadata"` o no. */
  assert.match(showreel, /src=\{\s*\w+\s*\?\s*reel\.src\s*:\s*undefined\s*\}/);

  assert.match(css, /\.reel-orbit/);
  assert.match(css, /aspect-ratio:\s*9 \/ 16/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});
