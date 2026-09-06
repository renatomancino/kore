import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
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

  /* Prima qui c'erano sei file scelti a mano, e uno di quei sei si e' rotto
     nel momento in cui un logo e' passato da PNG a WebP — mentre nessuna
     immagine del sito era sparita davvero. Un elenco copiato controlla se
     stesso, non il sito.
     Adesso si legge il codice, si raccolgono tutti i percorsi di file
     scritti per esteso e si verifica che esistano: cosi' la prossima
     conversione, rinomina o cancellazione la trova il test, e non il
     visitatore davanti a un riquadro vuoto. */
  const cartellaApp = new URL("../app/", import.meta.url);
  const sorgenti = [];
  const raccogli = async (dir) => {
    for (const voce of await readdir(dir, { withFileTypes: true })) {
      const dentro = new URL(voce.name + (voce.isDirectory() ? "/" : ""), dir);
      if (voce.isDirectory()) await raccogli(dentro);
      else if (/\.tsx?$/.test(voce.name)) sorgenti.push(await readFile(dentro, "utf8"));
    }
  };
  await raccogli(cartellaApp);

  const citati = new Set();
  for (const testo of sorgenti) {
    for (const [, percorso] of testo.matchAll(/"(\/[A-Za-z0-9_./-]+\.(?:png|jpe?g|webp|svg|mp4|mov|woff2?))"/g)) {
      citati.add(percorso);
    }
  }
  assert.ok(citati.size > 40, `trovati solo ${citati.size} file citati: la scansione non sta leggendo il codice`);

  const mancanti = [];
  await Promise.all(
    [...citati].map(async (percorso) => {
      try {
        await access(new URL(`../public${percorso}`, import.meta.url));
      } catch {
        mancanti.push(percorso);
      }
    }),
  );
  assert.deepEqual(mancanti, [], `il codice cita file che non esistono in public/: ${mancanti.join(", ")}`);
});

test("provides a projects archive and individual case-study routes", async () => {
  const [home, archive, elenco, detail, data] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/progetti/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/carosello-progetto.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/progetti/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/project-data.ts", import.meta.url), "utf8"),
  ]);

  assert.match(home, /Vedi tutti i progetti/);
  assert.match(home, /href="\/progetti"/);
  assert.match(archive, /Progetti con/);

  /* Il test chiedeva la stringa `projects.map` dentro alla pagina, e si e'
     rotto nel momento in cui l'elenco e' passato a un componente suo — senza
     che l'archivio smettesse un istante di mostrare i progetti. Qui si
     controlla che la pagina passi la lista intera a chi la disegna, e che
     chi la disegna la percorra: la stessa garanzia, senza dipendere da quale
     file contiene il ciclo. */
  assert.match(archive, /projects\.map/);
  assert.match(elenco, /pezzi\.map/);
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
