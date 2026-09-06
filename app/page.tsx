"use client";

import { useState } from "react";
import Link from "next/link";
import { TestoRivelato } from "./testo-rivelato";
import { AdaptiveBrand } from "./adaptive-brand";
import { ClosingCta } from "./closing-cta";
import { ScrollEffects } from "./scroll-effects";
import { ServiziInSequenza } from "./servizi-in-sequenza";
import { services } from "./services-data";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { ProjectStream } from "./project-stream";
import { VideoShowcase } from "./video-showcase";


const clientSlots = [
  { name: "Centro Revisioni TRIM", project: "Centro Revisioni TRIM", image: "/clients/trim.png", tone: "light" },
  { name: "L’isola che non c’è", project: "L’isola che non c’è", image: "/clients/isola-che-non-ce.png", tone: "dark" },
  { name: "Panariello", project: "Panariello · Falegnameria sartoriale", image: "/clients/panariello.png", tone: "light" },
  { name: "Pastry & Coffee", project: "Pastry & Coffee Laboratory", image: "/clients/pastry-coffee.png", tone: "light" },
  { name: "Primobanco", project: "Primobanco", image: "/clients/primobanco.png", tone: "light" },
  { name: "Osteria Annunziata", project: "Osteria Annunziata", image: "/clients/osteria-annunziata.png", tone: "dark" },
];

const process = [
  ["01", "Parliamo", "Ci racconti cosa vuoi fare."],
  ["02", "Costruiamo", "Definiamo strategia e progetto."],
  ["03", "Creiamo", "Entrano in gioco le competenze giuste."],
  ["04", "Facciamo crescere", "Misuriamo, miglioriamo, sviluppiamo."],
];

export default function Home() {
  const [activeClient, setActiveClient] = useState(0);

  return (
    <main>
      <ScrollEffects />
      <AdaptiveBrand />
      <a className="salta-al-contenuto" href="#top">Salta al contenuto</a>
      <SiteHeader />

      {/* Il contenitore serve a far scollare l'hero: `position: sticky` senza
          un blocco che lo chiuda resterebbe incollato per tutta la pagina, e
          sei sezioni piu' sotto sono `static`, quindi finirebbero coperte.
          Qui il vincolo finisce dove finisce il momento. */}
      <div className="apertura">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true">
            <div className="hero-halo hero-halo-one" />
            <div className="hero-halo hero-halo-two" />
            <span className="hero-pearl hero-pearl-one" />
            <span className="hero-pearl hero-pearl-two" />
            <span className="hero-pearl hero-pearl-three" />
            <img className="hero-cameo hero-cameo-one" src="/images/cammeo-kore.webp" alt="" />
            <img className="hero-cameo hero-cameo-two" src="/images/cammeo-kore.webp" alt="" />
            <img className="hero-cameo hero-cameo-three" src="/images/cammeo-kore.webp" alt="" />
            {/* Il quarto sta dove prima c'era il medaglione: piu' grande degli
                altri tre, cosi' regge il lato destro da solo. */}
            <img className="hero-cameo hero-cameo-quattro" src="/images/cammeo-kore.webp" alt="" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Creative agency · Torre del Greco / Ovunque</p>
          <h1 id="hero-title">
            <span>Strategia,</span>
            <span>immagini</span>
            <span className="hero-title-accent">e idee vive.</span>
          </h1>
          <div className="hero-actions">
            <p>Una regia creativa per brand, contenuti, esperienze e progetti digitali che lasciano il segno.</p>
            <Link className="hero-cta" href="/idea">Raccontaci la tua idea <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">Scorri ↓</div>
      </section>


      <nav className="service-index-bar" aria-label="Indice dei servizi Kore">
        {services.map((service, index) => (
          <a href="#servizi" key={service.name}>
            <span>0{index + 1}</span>{service.name}
          </a>
        ))}
      </nav>

      <section className="clients section-pad" id="clienti">
        <div className="section-heading">
          <p className="kicker">Chi ci ha dato fiducia</p>
          <h2>Facciamo cose<br />con loro.</h2>
          <p className="content-note">Brand e realtà del territorio che hanno scelto la regia creativa di Kore.</p>
        </div>
        <div className="client-stage">
          <div className={`client-preview ${clientSlots[activeClient].tone}`} aria-live="polite">
            <span className="client-preview-status">
              <span aria-hidden="true" /> In evidenza · 0{activeClient + 1}
            </span>
            <img src={clientSlots[activeClient].image} alt={clientSlots[activeClient].name} />
            <p>{clientSlots[activeClient].project}</p>
          </div>
          <div className="logo-wall">
            {clientSlots.map((client, index) => (
              <button
                type="button"
                className={index === activeClient ? "is-active" : ""}
                aria-label={`Mostra ${client.name}`}
                aria-pressed={index === activeClient}
                key={client.name}
                onMouseEnter={() => setActiveClient(index)}
                onFocus={() => setActiveClient(index)}
                onClick={() => setActiveClient(index)}
              >
                <span className="client-choice-index" aria-hidden="true">0{index + 1}</span>
                <img src={client.image} alt="" />
                <small>{client.name}</small>
              </button>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* La fascia dice cosa fa Kore, non con chi l'ha fatto: i clienti hanno
          gia' la parete di loghi sopra e l'indice piu' sotto.
          Quattro copie e non due: il nastro percorre una frazione piccola
          della propria larghezza — e' cosi' che si regola la lentezza — e
          senza abbastanza copie si vedrebbe arrivare il vuoto da destra. */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1, 2, 3].map((giro) => (
            <span key={giro}>{services.map((s) => `${s.name} · `).join("")}</span>
          ))}
        </div>
      </div>

      <ServiziInSequenza title="Non facciamo solo una cosa." />

      <ProjectStream>
        <Link className="project-stream-link" href="/progetti">
          <span>Archivio completo</span>
          <strong>Vedi tutti i progetti</strong>
          <i aria-hidden="true">↗</i>
        </Link>
      </ProjectStream>

      <VideoShowcase />

      <section className="process section-pad" id="metodo">
        <p className="kicker">Come lavoriamo</p><h2>Un processo chiaro.<br />Ogni volta diverso.</h2>
        <div className="timeline">
          {process.map(([number, title, text]) => (
            <article key={number}>
              <span className="tappa-numero" aria-hidden="true">{number}</span>
              <div className="tappa-testo">
                <p className="tappa-passo">Passo {number}</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="story" id="mondo">
        <div className="story-title">
          <p className="kicker">Kore / La storia</p>
          <h2>Le persone giuste.<br />Per il progetto giusto.</h2>
        </div>
        <div className="story-copy">
          <p><TestoRivelato>Kore non è un ufficio pieno di persone che fingono di essere un’agenzia.</TestoRivelato></p>
          <p><TestoRivelato>È una struttura agile che mette insieme le competenze giuste per ogni progetto. Una regia unica, un network vivo, nessuna formula prefabbricata.</TestoRivelato></p>
          <p className="name-origin"><TestoRivelato>Kore significa “fanciulla”: energia che nasce, cambia forma e diventa possibilità.</TestoRivelato></p>
        </div>
      </section>

      <section className="partners section-pad" id="partner">
        <div className="partner-intro">
          <p className="kicker">Network & partner</p>
          <h2>Le connessioni giuste,<br />quando servono.</h2>
        </div>
        <div className="partner-rail" aria-label="Partner Kore">
          <div>
            <img src="/partners/il-meridiano-sport.png" alt="Il Meridiano Sport" />
            <span>Partner editoriale</span>
          </div>
          <div>
            <img src="/partners/metropolis.png" alt="Metropolis" />
            <span>Media partner</span>
          </div>
        </div>
      </section>

      <ClosingCta id="contatti" />

      <SiteFooter />
    </main>
  );
}
