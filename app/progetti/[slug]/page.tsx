import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../project-data";
import { SiteFooter } from "../../site-footer";
import { SiteMenu } from "../../site-menu";

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
    openGraph: { title: `${project.client} — Progetti Kore`, description: project.summary, images: [] },
    twitter: { card: "summary", title: `${project.client} — Progetti Kore`, description: project.summary, images: [] },
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
      <header className="archive-header project-detail-header">
        <Link className="archive-brand" href="/" aria-label="Kore Studio, torna alla home">
          <img src="/brand/kore-logo-coral.png" alt="Kore Studio" />
        </Link>
        <div className="testata-comandi">
          <Link className="archive-home-link" href="/progetti">Tutti i progetti <span aria-hidden="true">↖</span></Link>
          <SiteMenu />
        </div>
      </header>

      <article>
        <section className="project-detail-hero">
          <div className="project-detail-heading">
            <p className="kicker">Progetto / {String(projectIndex + 1).padStart(3, "0")}</p>
            <h1>{project.client}</h1>
            <p>{project.title}</p>
          </div>
          <div className={`project-detail-cover project-detail-cover-${project.tone}`}>
            <img src={project.cover} alt={`Identità di ${project.client}`} />
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

        <section className="project-detail-note">
          <span>Case study in evoluzione</span>
          <p>Questa struttura è pronta per accogliere immagini, video, obiettivi, processo e risultati documentati del progetto.</p>
        </section>
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
