import type { ReactNode } from "react";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";

const imageGroups = [
  Array.from({ length: 48 }, (_, index) => ({
    src: `/projects/gender-event/gender-${String(index + 1).padStart(2, "0")}.jpg`,
    alt: `Reportage fotografico dell’evento Gender ${index + 1}`,
  })),
  Array.from({ length: 9 }, (_, index) => ({
    src: `/projects/trim/trim-${String(index + 1).padStart(2, "0")}.jpg`,
    alt: `Scatto del progetto TRIM ${index + 1}`,
  })),
  Array.from({ length: 4 }, (_, index) => ({
    src: `/projects/osteria-annunziata/osteria-${index + 1}.jpg`,
    alt: `Scatto per Osteria Annunziata ${index + 1}`,
  })),
  [
    { src: "/projects/panariello/logo-social.jpg", alt: "Applicazione social del logo Panariello" },
    { src: "/projects/panariello/panariello-application.png", alt: "Applicazione del sistema visivo Panariello" },
    { src: "/projects/additional/copa-servizi-grafiche.png", alt: "Grafica COPA Servizi" },
    { src: "/projects/additional/disconnection-pomigliano.png", alt: "Grafica Disconnection 2.0 Pomigliano" },
    { src: "/projects/additional/disconnection-2.png", alt: "Logo Disconnection 2.0" },
  ],
];

const projectImages = Array.from({ length: Math.max(...imageGroups.map((group) => group.length)) }).flatMap((_, index) => imageGroups.flatMap((group) => group[index] ? [group[index]] : []));

export function ProjectStream({ children }: { children: ReactNode }) {
  return (
    <section className="project-stream" id="progetti" aria-labelledby="project-stream-title">
      <ImageStreamHero
        images={projectImages}
        cards={Math.ceil(projectImages.length / 2)}
        speed={52}
        axis={54}
        className="project-stream-corridor"
        path={{ cardWidth: 17, cardHeight: 23, exitHeight: 43, railExit: 46 }}
      >
        <div className="project-stream-content">
          <div className="project-stream-heading">
            <p className="kicker">Foto / Produzioni</p>
            <h2 id="project-stream-title">Ogni scatto<br /><em>racconta.</em></h2>
          </div>
          <p className="project-stream-note">Shooting, eventi, backstage e campagne: fotografie pensate per dare al lavoro dei nostri clienti una presenza riconoscibile.</p>
          {children}
        </div>
      </ImageStreamHero>
    </section>
  );
}
