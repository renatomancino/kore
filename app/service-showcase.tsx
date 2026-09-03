"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

export type Service = {
  id: "branding" | "social" | "video" | "web" | "advertising" | "eventi";
  name: string;
  note: string;
  image: string;
};

/**
 * Ogni servizio mostra come nasce una cosa, in tre battute uguali per tutti:
 *
 *   01 traccia  — il segno, in rosso su griglia: l'idea prima che sia niente
 *   02 forma    — gli stessi riquadri pieni: la cosa che prende corpo
 *   03 fatto    — l'oggetto vero: un logo, una foto, un video
 *
 * Prima ognuno dei sei aveva una scena a se': branding e web una sequenza,
 * gli altri quattro un'immagine ferma. Il risultato era che quattro servizi su
 * sei sembravano non avere un processo.
 *
 * Le prime due battute si disegnano dallo stesso elenco di riquadri, quindi la
 * differenza fra un servizio e l'altro e' l'impaginazione — non diciotto
 * disegni fatti a mano che dopo un mese nessuno sa piu' aggiornare.
 */

type Riquadro = { x: number; y: number; w: number; h: number; nota?: string };

/* I riquadri sono in percentuale della tela, cosi' la stessa composizione
   regge a qualsiasi misura senza ricalcoli. */
function Traccia({ riquadri }: { riquadri: Riquadro[] }) {
  return (
    <div className="fase-traccia">
      {riquadri.map((r, i) => (
        <span
          key={i}
          style={{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%` }}
        >
          {r.nota && <i>{r.nota}</i>}
        </span>
      ))}
    </div>
  );
}

function Forma({ riquadri }: { riquadri: Riquadro[] }) {
  return (
    <div className="fase-forma">
      {riquadri.map((r, i) => (
        <span
          key={i}
          /* Il primo riquadro e' pieno di rosso, gli altri di panna: senza una
             gerarchia sarebbero sei rettangoli uguali, cioe' niente. */
          data-primo={i === 0 ? "" : undefined}
          style={{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%` }}
        />
      ))}
    </div>
  );
}

type Scena = { etichetta: string; passi: [string, string, string]; riquadri: Riquadro[]; finale: ReactNode };

const SCENE: Record<Service["id"], Scena> = {
  branding: {
    etichetta: "Logo lab",
    passi: ["Idea", "Forma", "Sistema"],
    riquadri: [
      { x: 8, y: 14, w: 40, h: 72, nota: "segno" },
      { x: 54, y: 14, w: 38, h: 33, nota: "peso" },
      { x: 54, y: 53, w: 38, h: 33, nota: "ritmo" },
    ],
    finale: (
      <Image src="/projects/panariello/panariello-color.png" alt="Logo Panariello dopo il restyling" width={1000} height={460} />
    ),
  },
  social: {
    etichetta: "Formati",
    passi: ["Piano", "Scatto", "Uscite"],
    /* Le tre proporzioni vere dei social: quadrato, verticale, storia. */
    riquadri: [
      { x: 6, y: 22, w: 30, h: 56, nota: "1:1" },
      { x: 40, y: 12, w: 26, h: 76, nota: "4:5" },
      { x: 70, y: 8, w: 24, h: 84, nota: "9:16" },
    ],
    finale: (
      <div className="fase-fatto-social">
        <Image src="/projects/gender-event/gender-06.jpg" alt="Contenuto fotografico realizzato durante un evento" fill sizes="30vw" />
        <Image className="fase-fatto-social-secondary" src="/projects/osteria-annunziata/osteria-1.jpg" alt="Contenuto social per Osteria Annunziata" fill sizes="18vw" />
      </div>
    ),
  },
  video: {
    etichetta: "Storyboard",
    passi: ["Tavole", "Riprese", "Montaggio"],
    riquadri: [
      { x: 6, y: 20, w: 26, h: 28, nota: "01" },
      { x: 37, y: 20, w: 26, h: 28, nota: "02" },
      { x: 68, y: 20, w: 26, h: 28, nota: "03" },
      { x: 6, y: 56, w: 26, h: 28, nota: "04" },
      { x: 37, y: 56, w: 26, h: 28, nota: "05" },
      { x: 68, y: 56, w: 26, h: 28, nota: "06" },
    ],
    finale: (
      <video
        className="fase-fatto-video"
        src="/videos/client-work/porta-blindata.mp4"
        poster="/images/camera.jpg"
        muted
        loop
        playsInline
        controls
        aria-label="Reel Porta blindata"
      />
    ),
  },
  web: {
    etichetta: "Struttura",
    passi: ["Wireframe", "Interfaccia", "Pagina"],
    riquadri: [
      { x: 8, y: 10, w: 84, h: 10, nota: "testata" },
      { x: 8, y: 26, w: 50, h: 34, nota: "apertura" },
      { x: 62, y: 26, w: 30, h: 34 },
      { x: 8, y: 66, w: 26, h: 24 },
      { x: 37, y: 66, w: 26, h: 24 },
      { x: 66, y: 66, w: 26, h: 24 },
    ],
    finale: (
      <div className="fase-fatto-web">
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
    etichetta: "Campagna",
    passi: ["Concept", "Formati", "Uscita"],
    riquadri: [
      { x: 6, y: 18, w: 52, h: 40, nota: "6x3" },
      { x: 63, y: 18, w: 31, h: 40, nota: "mupi" },
      { x: 6, y: 64, w: 25, h: 24, nota: "feed" },
      { x: 35, y: 64, w: 23, h: 24, nota: "story" },
      { x: 63, y: 64, w: 31, h: 24, nota: "banner" },
    ],
    finale: (
      <div className="fase-fatto-adv">
        <Image src="/projects/trim/trim-04.jpg" alt="Applicazione della campagna visiva TRIM" fill sizes="60vw" />
        <dl>
          <div><dt>Reach</dt><dd>1,2M</dd></div>
          <div><dt>CTR</dt><dd>3,8%</dd></div>
          <div><dt>Formati</dt><dd>12</dd></div>
        </dl>
      </div>
    ),
  },
  eventi: {
    etichetta: "Allestimento",
    passi: ["Pianta", "Montaggio", "Serata"],
    riquadri: [
      { x: 8, y: 12, w: 84, h: 26, nota: "palco" },
      { x: 8, y: 44, w: 40, h: 44, nota: "platea" },
      { x: 52, y: 44, w: 18, h: 20, nota: "bar" },
      { x: 74, y: 44, w: 18, h: 44, nota: "regia" },
      { x: 52, y: 68, w: 18, h: 20 },
    ],
    finale: (
      <div className="fase-fatto-eventi">
        <Image src="/projects/gender-event/gender-01.jpg" alt="Evento Gender documentato da Kore" fill sizes="60vw" />
        <span>03<small>giornate</small></span>
      </div>
    ),
  },
};

export function ServiceShowcase({ service }: { service: Service }) {
  /* Cambiando servizio si riparte dalla prima battuta — restare al "03" di
     prima mostrerebbe il risultato di un lavoro senza averne visto l'inizio.
     Non serve un effetto: la home passa una `key` per servizio, quindi il
     componente si rimonta e questo stato nasce di nuovo a zero. */
  const [passo, setPasso] = useState(0);
  const scena = SCENE[service.id];

  return (
    <div className={`service-visual service-visual-${service.id}`} aria-live="polite">
      <div className="service-scene">
        <div className="service-scene-top">
          <span>{scena.etichetta}</span>
          <span>0{passo + 1} / 03</span>
        </div>

        <div className="service-canvas" data-passo={passo}>
          {passo === 0 && <Traccia riquadri={scena.riquadri} />}
          {passo === 1 && <Forma riquadri={scena.riquadri} />}
          {passo === 2 && scena.finale}
        </div>

        <div className="service-control-row" role="group" aria-label={`Fasi di ${service.name.toLowerCase()}`}>
          {scena.passi.map((nome, i) => (
            <button type="button" aria-pressed={passo === i} onClick={() => setPasso(i)} key={nome}>
              <span>0{i + 1}</span>{nome}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
