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

      {/* Un carosello per progetto. La numerazione e' quella dell'archivio
          intero, non dell'ordine in cui capitano: "07" resta "07". */}
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
