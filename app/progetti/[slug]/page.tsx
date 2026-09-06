import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../project-data";
import { AdaptiveBrand } from "../../adaptive-brand";
import { SiteFooter } from "../../site-footer";
import { SiteHeader } from "../../site-header";
import { ProjectGallery } from "../../project-gallery";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: `${project.client} — Progetti Kore`,
    description: project.summary,
    /* NIENTE `images: []` qui: azzerava l'elenco e l'immagine generata da
       opengraph-image.tsx non si agganciava piu'. Lasciandolo fuori, Next ci
       mette da sola quella del progetto. */
    openGraph: { title: `${project.client} — Progetti Kore`, description: project.summary, url: `/progetti/${slug}` },
    twitter: { card: "summary_large_image", title: `${project.client} — Progetti Kore`, description: project.summary },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  if (projectIndex === -1) notFound();

  const project = projects[projectIndex];

  return (
    <main className="project-detail">
      <AdaptiveBrand />
      <SiteHeader />

      <article>
        <section className="project-detail-hero">
          <div className="project-detail-heading">
            <p className="kicker">Progetto / {String(projectIndex + 1).padStart(3, "0")}</p>
            <h1>{project.client}</h1>
            <p className="project-detail-subtitle">{project.title}</p>
            <div className="project-detail-meta" aria-label="Informazioni principali del progetto">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
          </div>
          <div className={`project-detail-cover project-detail-cover-${project.tone}`}>
            {/* Lo stesso nome della scheda da cui si e' arrivati: e' cio' che
                dice al browser "questo e' quell'elemento, spostatelo" invece
                di dissolvere una pagina nell'altra. */}
            <Image
              src={project.cover}
              alt={`Identità di ${project.client}`}
              width={1200}
              height={900}
              priority
              style={{ viewTransitionName: `copertina-${project.slug}` }}
            />
          </div>
        </section>

        <section className="project-detail-story">
          <div className="project-detail-story-copy">
            <p className="kicker">Il progetto</p>
            <h2>{project.summary}</h2>
          </div>
          <dl>
            <div><dt>Ambito</dt><dd>{project.category}</dd></div>
            <div><dt>Anno</dt><dd>{project.year}</dd></div>
            <div><dt>Competenze</dt><dd>{project.services.join(" · ")}</dd></div>
          </dl>
        </section>

        {project.gallery?.length ? (
          <section className="project-detail-gallery" aria-label={`Galleria del progetto ${project.client}`}>
            <ProjectGallery items={project.gallery} />
          </section>
        ) : (
          <section className="project-detail-note">
            <span>Case study in evoluzione</span>
            <p>Nuovi materiali, immagini e risultati saranno aggiunti progressivamente.</p>
          </section>
        )}
      </article>

      {/* Prima qui c'era "Progetto successivo" col nome del progetto che
          veniva dopo nell'elenco: dopo Centro Revisioni TRIM arrivava
          "L'isola che non c'e'" solo perche' e' il secondo dell'array, senza
          nessun legame di categoria, servizio o tono. Ora che l'archivio
          mostra ogni progetto con la sua pellicola, la destinazione utile e'
          quella — e non e' piu' un accostamento casuale. */}
      <Link className="next-project" href="/progetti">
        <span>Continua a guardare</span>
        <strong>Tutti i progetti</strong>
        <i aria-hidden="true">→</i>
      </Link>

      <SiteFooter />
    </main>
  );
}
