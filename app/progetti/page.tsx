import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "../project-data";
import { SiteFooter } from "../site-footer";

export const metadata: Metadata = {
  title: "Progetti — Kore Studio",
  description: "Una selezione di progetti Kore tra branding, contenuti, fotografia, social e presenza digitale.",
};

export default function ProjectsPage() {
  return (
    <main className="projects-archive">
      <header className="archive-header">
        <Link className="archive-brand" href="/" aria-label="Kore Studio, torna alla home">
          <img src="/brand/kore-logo-coral.png" alt="Kore Studio" />
        </Link>
        <Link className="archive-home-link" href="/">Home <span aria-hidden="true">↖</span></Link>
      </header>

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
          <Link className={`archive-project-card archive-project-card-${project.tone}`} href={`/progetti/${project.slug}`} key={project.slug}>
            <div className="archive-project-visual">
              <img src={project.cover} alt={`Identità di ${project.client}`} />
              <span>0{index + 1}</span>
            </div>
            <div className="archive-project-copy">
              <p>{project.category} · {project.year}</p>
              <h2>{project.client}</h2>
              <span>{project.title}</span>
            </div>
          </Link>
        ))}
      </section>

      <section className="archive-cta">
        <p>Il prossimo progetto potrebbe essere il tuo.</p>
        <Link href="/#contatti">Parliamone <span aria-hidden="true">↗</span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
