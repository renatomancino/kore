import type { ReactNode } from "react";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";

const projectImages = [
  { src: "/images/designer.jpg", alt: "Backstage di una produzione creativa Kore" },
  { src: "/images/event.jpg", alt: "Reportage fotografico di un evento" },
  { src: "/images/stage.jpg", alt: "Fotografia di palco e spettacolo" },
  { src: "/images/camera.jpg", alt: "Regia e produzione sul campo" },
];

export function ProjectStream({ children }: { children: ReactNode }) {
  return (
    <section className="project-stream" id="progetti" aria-labelledby="project-stream-title">
      <ImageStreamHero
        images={projectImages}
        cards={10}
        speed={23}
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
