import type { Metadata } from "next";
import Image from "next/image";
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
        <Image
          className="archive-hero-media"
          src="/projects/gender-event/gender-01.jpg"
          alt="Reportage di un evento curato da Kore"
          fill
          priority
          sizes="100vw"
        />
        <div className="archive-hero-shade" aria-hidden="true" />
        <div className="archive-hero-topline">
          <p className="kicker">Archivio / lavori selezionati</p>
          <p>Portfolio · 2024—2025</p>
        </div>
        <h1><span>Progetti con</span><em>qualcosa da dire.</em></h1>
        <div className="archive-hero-bottom">
          <Link href="/idea">Inizia un progetto <span aria-hidden="true">→</span></Link>
          <p>Identità, contenuti, immagini ed esperienze costruite intorno alle persone e agli obiettivi reali.</p>
        </div>
      </section>

      <section className="work-catalogue">
        <header className="work-catalogue-heading">
          <div>
            <p className="kicker">Case study</p>
            <h2>Progetti<br />selezionati.</h2>
          </div>
          <p>Ogni progetto parte da un obiettivo concreto e diventa un sistema visivo capace di farsi riconoscere, usare e ricordare.</p>
        </header>

        <div className="work-grid">
          {projects.map((project, index) => {
            const visual = project.gallery?.find((item) => item.kind !== "video");
            const visualSrc = visual?.src ?? project.cover;
            const visualFit = visual?.fit ?? (visualSrc.endsWith(".png") ? "contain" : "cover");

            return (
              <article className="work-card" key={project.slug}>
                <div className="work-card-media" data-fit={visualFit}>
                  <Image
                    src={visualSrc}
                    alt={visual?.alt ?? `Identità di ${project.client}`}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="work-card-copy">
                  <p>{project.category}</p>
                  <h3>{project.client}</h3>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="archive-cta">
        <p>Il prossimo progetto potrebbe essere il tuo.</p>
        <Link href="/idea">Parliamone <span aria-hidden="true">↗</span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
