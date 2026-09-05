import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "../project-data";
import { CaroselloProgetto } from "../carosello-progetto";
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

      {/* Un carosello per progetto, invece di una scheda che porta altrove:
          l'archivio si guarda tutto restando qui. Le pagine di dettaglio
          restano al loro posto e raggiungibili — il titolo di ogni progetto
          ci porta — ma non sono piu' l'unico modo di vedere il lavoro. */}
      <div className="archivio-pellicole">
        {projects.map((project, index) => (
          <CaroselloProgetto progetto={project} numero={index + 1} key={project.slug} />
        ))}
      </div>

      <section className="archive-cta">
        <p>Il prossimo progetto potrebbe essere il tuo.</p>
        <Link href="/idea">Parliamone <span aria-hidden="true">↗</span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
