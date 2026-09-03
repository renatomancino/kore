import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../project-data";
import { AdaptiveBrand } from "../../adaptive-brand";
import { SiteFooter } from "../../site-footer";
import { SiteHeader } from "../../site-header";

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
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="project-detail">
      <AdaptiveBrand />
      <SiteHeader />

      <article>
        <section className="project-detail-hero">
          <div className="project-detail-heading">
            <p className="kicker">Progetto / {String(projectIndex + 1).padStart(3, "0")}</p>
            <h1>{project.client}</h1>
            <p>{project.title}</p>
          </div>
          <div className={`project-detail-cover project-detail-cover-${project.tone}`}>
            {/* Lo stesso nome della scheda da cui si e' arrivati: e' cio' che
                dice al browser "questo e' quell'elemento, spostatelo" invece
                di dissolvere una pagina nell'altra. */}
            <img
              src={project.cover}
              alt={`Identità di ${project.client}`}
              style={{ viewTransitionName: `copertina-${project.slug}` }}
            />
          </div>
        </section>

        <section className="project-detail-story">
          <div>
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
            <header>
              <p className="kicker">Dentro il progetto</p>
              <h2>Segni, materia<br />e applicazioni.</h2>
            </header>
            <div className="project-detail-gallery-groups">
              {Array.from(new Set(project.gallery.map((item) => item.group ?? "Materiali"))).map((group) => (
                <section className="project-gallery-group" key={group}>
                  <h3>{group}</h3>
                  <div>
                    {project.gallery?.filter((image) => (image.group ?? "Materiali") === group).map((image, index) => (
                      <figure key={image.src} className={index % 5 === 0 ? "project-gallery-wide" : undefined}>
                        {image.kind === "video" ? <video src={image.src} poster={image.poster} controls preload="metadata" playsInline aria-label={image.alt} /> : <img src={image.src} alt={image.alt} loading={index > 1 ? "lazy" : "eager"} />}
                      </figure>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        ) : (
          <section className="project-detail-note">
            <span>Case study in evoluzione</span>
            <p>Nuovi materiali, immagini e risultati saranno aggiunti progressivamente.</p>
          </section>
        )}
      </article>

      <Link className="next-project" href={`/progetti/${nextProject.slug}`}>
        <span>Progetto successivo</span>
        <strong>{nextProject.client}</strong>
        <i aria-hidden="true">→</i>
      </Link>

      <SiteFooter />
    </main>
  );
}
