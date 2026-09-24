import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "../project-data";
import { AdaptiveBrand } from "../adaptive-brand";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { Freccia } from "../freccia";
import { RigaProgetto } from "../riga-progetto";

const TITOLO = "Progetti — Kore Studio";
const DESCRIZIONE =
  "Una selezione di progetti Kore tra branding, contenuti, fotografia, social e presenza digitale.";

export const metadata: Metadata = {
  title: TITOLO,
  description: DESCRIZIONE,
  /* Come su /idea: `openGraph` non si fonde con quello del layout, quindi
     senza queste righe l'archivio si presentava col titolo della home. */
  openGraph: { title: TITOLO, description: DESCRIZIONE, url: "/progetti" },
  twitter: { card: "summary_large_image", title: TITOLO, description: DESCRIZIONE },
};

export default function ProjectsPage() {
  return (
    <main className="projects-archive">
      <AdaptiveBrand />
      <SiteHeader />

      <section className="archivio-apertura">
        <p className="kicker">Archivio / lavori selezionati</p>
        <h1>Dal pensiero alla<em>forma.</em></h1>
        <p className="archivio-apertura-nota">
          Una selezione dei lavori realizzati da Kore. Apri ogni lavoro per scoprirne materiali e dettagli.
        </p>
      </section>

      {/* Un indice, non una griglia di copertine: una riga per lavoro, che si
          apre sul posto con il racconto e i materiali. */}
      <section className="archivio-indice" aria-label="Elenco dei progetti">
        <ol className="indice-progetti">
          {projects.map((progetto, i) => (
            <li key={progetto.slug}>
              <RigaProgetto progetto={progetto} numero={i + 1} />
            </li>
          ))}
        </ol>
      </section>

      <section className="archive-cta">
        <p>Partiamo da qui.</p>
        <Link href="/idea" data-transizione="">Parliamone <span aria-hidden="true"><Freccia /></span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
