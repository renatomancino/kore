import Image from "next/image";
import type { ReactNode } from "react";

export type Service = {
  id: "branding" | "social" | "video" | "web" | "advertising" | "eventi";
  name: string;
  note: string;
  /* Le tre voci che dicono cosa comprende il servizio. Stanno accanto al
     servizio e non in un `Record` dentro alla sezione che le disegna: li'
     dentro, una seconda sezione che volesse elencarle dovrebbe copiarle. */
  dettagli: [string, string, string];
};

type ServiceVisual = {
  eyebrow: string;
  title: string;
  content: ReactNode;
};

const VISUALS: Record<Service["id"], ServiceVisual> = {
  branding: {
    eyebrow: "Identità / C.O.P.A.",
    title: "Un segno riconoscibile.",
    content: (
      <div className="service-single-media service-single-logo">
        <Image
          src="/projects/additional/copa-servizi-grafiche.png"
          alt="Logo C.O.P.A. Servizi"
          fill
          sizes="(max-width: 900px) 100vw, 56vw"
        />
      </div>
    ),
  },
  social: {
    eyebrow: "Social / Osteria Annunziata",
    title: "Contenuti che hanno atmosfera.",
    content: (
      <div className="service-single-media">
        <Image
          src="/projects/osteria-annunziata/osteria-1.jpg"
          alt="Contenuto social realizzato per Osteria Annunziata"
          fill
          sizes="(max-width: 900px) 100vw, 56vw"
        />
      </div>
    ),
  },
  video: {
    eyebrow: "Video / Produzione",
    title: "Ogni storia comincia da un’inquadratura.",
    content: (
      <div className="service-single-media service-single-video">
        <Image
          src="/images/camera.jpg"
          alt="Camera sul set di una produzione Kore"
          fill
          sizes="(max-width: 900px) 100vw, 56vw"
        />
      </div>
    ),
  },
  web: {
    eyebrow: "Web / Digital experience",
    title: "Esperienze costruite su misura.",
    content: (
      <div className="service-single-web" aria-label="Anteprima concettuale di un progetto web Kore">
        <div className="web-browser-bar"><span /><span /><span /><b>kore.studio</b></div>
        <div className="web-page web-page-0">
          <nav><b>KORE</b><span>Menu</span></nav>
          <p>01 / Digital experience</p>
          <h3>Idee vive.</h3>
          <div><span /><span /><span /></div>
        </div>
      </div>
    ),
  },
  advertising: {
    eyebrow: "Advertising / TRIM",
    title: "Il brand entra nel paesaggio.",
    content: (
      <div className="service-single-media service-single-advertising">
        <Image
          src="/projects/trim/trim-05.jpg"
          alt="Insegna pubblicitaria TRIM realizzata da Kore"
          fill
          sizes="(max-width: 900px) 100vw, 56vw"
        />
      </div>
    ),
  },
  eventi: {
    eyebrow: "Eventi / Gender",
    title: "L’energia di una serata, in uno scatto.",
    content: (
      <div className="service-single-media service-single-event">
        <Image
          src="/projects/gender-event/gender-01.jpg"
          alt="Evento Gender raccontato da Kore"
          fill
          sizes="(max-width: 900px) 100vw, 56vw"
        />
      </div>
    ),
  },
};

export function ServiceShowcase({ service }: { service: Service }) {
  const visual = VISUALS[service.id];

  return (
    <div className={`service-visual service-visual-${service.id}`}>
      <div className="service-single">
        {visual.content}
        <div className="service-single-shade" aria-hidden="true" />
        <div className="service-single-copy">
          <span>{visual.eyebrow}</span>
          <strong>{visual.title}</strong>
        </div>
      </div>
    </div>
  );
}
