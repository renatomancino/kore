import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "../project-data";
import { AdaptiveBrand } from "../adaptive-brand";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";

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

      <section className="archive-hero">
        <p className="kicker">Archivio / lavori selezionati</p>
        <h1>Progetti con<br /><em>qualcosa da dire.</em></h1>
        <div className="archive-hero-bottom">
          <p>Identità, contenuti, immagini ed esperienze costruite intorno alle persone e agli obiettivi reali.</p>
          <span>{String(projects.length).padStart(2, "0")} progetti</span>
        </div>
      </section>

      <nav className="archive-index" aria-label="Categorie presenti nell’archivio">
        <span>Tutti</span><span>Branding</span><span>Content</span><span>Social</span><span>Photo</span><span>Web</span>
      </nav>

      <section className="project-archive-grid" aria-label="Tutti i progetti Kore">
        {projects.map((project, index) => (
          <Link className={`archive-project-card archive-project-card-${project.tone}`} href={`/progetti/${project.slug}`} key={project.slug} data-transizione>
            <div className="archive-project-visual">
              {/* Il nome e' per progetto, non per pagina: nell'archivio ce ne
                  sono sei contemporaneamente, e due elementi con lo stesso
                  nome nella stessa pagina annullano la transizione. */}
              <img
                src={project.cover}
                alt={`Identità di ${project.client}`}
                style={{ viewTransitionName: `copertina-${project.slug}` }}
              />
              <span>0{index + 1}</span>
            </div>
            <div className="archive-project-copy">
              <p>{project.category} · {project.year}</p>
              <h2>{project.client}</h2>
              <p className="archive-project-summary">{project.summary}</p>
              <div className="archive-project-meta">
                <span>{project.title}</span>
                <i aria-hidden="true">↗</i>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="archive-cta">
        <p>Il prossimo progetto potrebbe essere il tuo.</p>
        <Link href="/idea">Parliamone <span aria-hidden="true">↗</span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
