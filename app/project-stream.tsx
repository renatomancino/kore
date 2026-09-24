import type { ReactNode } from "react";
import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { projects } from "./project-data";

/* Ogni foto porta con se' il progetto da cui viene: sotto al carosello si
   leggono il cliente e l'ambito, presi da project-data e non riscritti qui,
   cosi' un nome cambiato la' cambia anche qui. */
function dalProgetto(slug: string, src: string, alt: string): CoverflowSlide {
  const progetto = projects.find((p) => p.slug === slug);
  if (!progetto) throw new Error(`Foto / Produzioni: nessun progetto "${slug}" in project-data`);
  return { src, alt, title: progetto.client, subtitle: progetto.category };
}

/* Le versioni in public/projects/carosello/ sono ritagli leggeri, fatti per
   una carta quadrata di al massimo 330px. */
const imageGroups: CoverflowSlide[][] = [
  [1, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48].map((number) =>
    dalProgetto(
      "gender-evento-live",
      `/projects/carosello/gender-${String(number).padStart(2, "0")}.jpg`,
      `Reportage fotografico dell’evento Gender ${number}`,
    ),
  ),
  [1, 3, 5, 7, 9].map((number) =>
    dalProgetto(
      "trim-identita-digitale",
      `/projects/carosello/trim-${String(number).padStart(2, "0")}.jpg`,
      `Scatto del progetto TRIM ${number}`,
    ),
  ),
  [1, 3].map((number) =>
    dalProgetto(
      "osteria-annunziata-territorio",
      `/projects/carosello/osteria-${number}.jpg`,
      `Scatto per Osteria Annunziata ${number}`,
    ),
  ),
  [
    dalProgetto("panariello-falegnameria-sartoriale", "/projects/carosello/panariello-logo-social.jpg", "Applicazione social del logo Panariello"),
    dalProgetto("panariello-falegnameria-sartoriale", "/projects/carosello/panariello-application.png", "Applicazione del sistema visivo Panariello"),
    dalProgetto("copa-servizi-grafiche", "/projects/carosello/copa-servizi-grafiche.png", "Grafica COPA Servizi"),
    dalProgetto("disconnection-2-pomigliano", "/projects/carosello/disconnection-pomigliano.png", "Grafica Disconnection 2.0 Pomigliano"),
    dalProgetto("disconnection-2-pomigliano", "/projects/carosello/disconnection-2.png", "Logo Disconnection 2.0"),
  ],
];

/* I gruppi si alternano, uno scatto per gruppo a giro: cosi' il carosello non
   mostra tredici foto di Gender di fila prima di arrivare al resto. */
const projectImages = Array.from({ length: Math.max(...imageGroups.map((group) => group.length)) }).flatMap((_, index) =>
  imageGroups.flatMap((group) => (group[index] ? [group[index]] : [])),
);

export function ProjectStream({ children }: { children: ReactNode }) {
  return (
    <section className="project-stream" id="progetti" aria-labelledby="project-stream-title">
      <div className="project-stream-heading">
        <p className="kicker">Foto / Produzioni</p>
        <h2 id="project-stream-title">Ogni scatto<br /><em>racconta.</em></h2>
      </div>
      <CoverflowCarousel
        slides={projectImages}
        cardWidth="clamp(172px, 23vw, 330px)"
        showCaption
        showNavigation
        label="Foto e produzioni di Kore Studio"
        className="project-stream-carosello"
      />
      <div className="project-stream-content">
        <p className="project-stream-note">Immagini pensate per raccontare la tua attività, i tuoi prodotti, il tuo evento.</p>
        {children}
      </div>
    </section>
  );
}
