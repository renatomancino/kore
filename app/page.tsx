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
import { Freccia } from "./freccia";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";


const clientSlots = [
  { name: "Centro Revisioni TRIM", project: "Centro Revisioni TRIM", image: "/clients/trim.webp", tone: "light" },
  { name: "L’isola che non c’è", project: "L’isola che non c’è", image: "/clients/isola-che-non-ce.webp", tone: "dark" },
  { name: "Panariello", project: "Panariello · Social Media Marketing", image: "/clients/panariello.webp", tone: "light" },
  { name: "Pastry & Coffee", project: "Pastry & Coffee Laboratory", image: "/clients/pastry-coffee.webp", tone: "light" },
  { name: "Primobanco", project: "Primobanco", image: "/clients/primobanco.webp", tone: "light" },
  { name: "Osteria Annunziata", project: "Osteria Annunziata", image: "/clients/osteria-annunziata.webp", tone: "dark" },
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
            <div className="hero-arco" />
            <div className="hero-halo hero-halo-one" />
            <div className="hero-halo hero-halo-two" />
            {/* Al posto delle perle, i simboli di casa: tre cornetti e il
                telefono. */}
            <img className="hero-cornetto hero-cornetto-one" src="/images/cornetto.webp" alt="" />
            <img className="hero-cornetto hero-cornetto-two" src="/images/cornetto.webp" alt="" />
            <img className="hero-cornetto hero-cornetto-three" src="/images/cornetto.webp" alt="" />
            <img className="hero-telefono" src="/images/telefono.webp" alt="" />
            <img className="hero-cameo hero-cameo-one" src="/images/cammeo-kore.webp" alt="" />
            <img className="hero-cameo hero-cameo-two" src="/images/cammeo-kore.webp" alt="" />
            <img className="hero-cameo hero-cameo-three" src="/images/cammeo-kore.webp" alt="" />
            {/* Il quarto sta dove prima c'era il medaglione: piu' grande degli
                altri tre, cosi' regge il lato destro da solo. */}
            <img className="hero-cameo hero-cameo-quattro" src="/images/cammeo-kore.webp" alt="" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Agenzia di comunicazione – Torre del Greco / Casoria / Ovunque</p>
          <h1 id="hero-title">
            <span>Marketing,</span>
            <span>comunicazione</span>
            <span>e pubblicità</span>
            <span className="hero-title-accent">(creatività).</span>
          </h1>
          <div className="hero-actions">
            <p>
              Kore affianca brand, professionisti, piccole, medie e grandi imprese nella costruzione di una
              comunicazione coerente, riconoscibile e funzionale agli obiettivi da raggiungere.
            </p>
            <InteractiveHoverButton href="/idea" text="Raccontaci di cosa ti occupi." data-transizione="" />
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">Scorri ↓</div>
      </section>


      <nav className="service-index-bar" aria-label="Indice dei servizi Kore">
        {services.map((service, index) => (
          /* Ognuno al suo servizio: prima erano sei nomi diversi che portavano
             tutti in testa alla sezione, cioe' sei volte lo stesso posto. */
          <a href={`#${service.id}`} key={service.id}>
            <span>0{index + 1}</span>{service.name}
          </a>
        ))}
      </nav>

      <section className="clients section-pad" id="clienti" data-titolo="Clienti">
        <div className="section-heading">
          <p className="kicker">Al fianco di chi fa impresa</p>
          <h2>Facciamo cose<br />con loro.</h2>
          <p className="content-note">Brand e realtà che hanno scelto la consulenza di Kore.</p>
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

      <ServiziInSequenza title="Le competenze giuste, insieme." />

      <ProjectStream>
        <Link className="project-stream-link" href="/progetti" data-transizione="">
          <span>Archivio completo</span>
          <strong>Vedi tutti i progetti</strong>
          <i aria-hidden="true"><Freccia /></i>
        </Link>
      </ProjectStream>

      <VideoShowcase />

      {/* Il metodo non ha piu' una sezione sua: sta dentro alla storia, come
          il modo in cui quella storia diventa lavoro. */}
      <section className="story" id="mondo" data-titolo="Il brand">
        <div className="story-title">
          <p className="kicker">Kore / Il brand</p>
          <h2>Kore, dal cuore<br />alla trasformazione.</h2>
        </div>
        <div className="story-copy">
          <p>
            <TestoRivelato>
              Kore nasce a Torre del Greco, ma parte da un’idea che va oltre un luogo: arrivare al cuore di ciò che
              un’attività è, prima di decidere come raccontarla. Il nome racchiude due significati che sentiamo nostri.
              Kore richiama il cuore, il centro da cui partire: conoscere un’attività, comprenderne gli obiettivi e
              costruire una comunicazione che abbia una direzione precisa.
            </TestoRivelato>
          </p>
          <p>
            <TestoRivelato>
              Ma Kore guarda al mito greco. Kore è il nome con cui viene indicata Persefone, la fanciulla che
              attraversa il mondo sotterraneo per poi tornare sulla terra. Il suo ritorno coincide con il rifiorire
              della natura e l’inizio di un nuovo ciclo: per questo Persefone è legata alla rinascita, alla
              trasformazione e alla capacità di ripartire. Un significato che, per Kore, incontra inevitabilmente anche
              Torre del Greco. La città porta con sé da secoli il motto “Post fata resurgo”, espressione della capacità
              di rialzarsi e rinascere dopo le avversità. Lo stesso concetto di ripartenza che ritroviamo nel mito di
              Persefone diventa così un altro punto di contatto tra il nome Kore e il nostro modo di lavorare. A volte
              serve riavvolgere il nastro per ripartire e allinearsi con gli obiettivi. E questo vale anche nella
              comunicazione. Soprattutto quando si fa impresa.
            </TestoRivelato>
          </p>
          <p className="name-origin">
            <TestoRivelato>
              Oggi Kore è un’agenzia di comunicazione a Torre del Greco costruita intorno a competenze diverse:
              consulenza, strategia, social media, design, fotografia, video, web, advertising e intelligenza
              artificiale. Il nostro modo di lavorare parte sempre dallo stesso punto: capire prima di produrre. Da lì
              scegliamo strumenti, linguaggi e professionalità utili a ogni attività, coordinandoli attraverso
              un’unica direzione. Perché per noi comunicare significa questo: partire dal centro, trovare una forma,
              trasformarsi e ripartire. Mettici il Kore.
            </TestoRivelato>
          </p>
        </div>
        <div className="story-metodo" id="metodo">
          <p className="story-metodo-titolo">Come lavoriamo</p>
          <ol>
            {process.map(([number, title, text]) => (
              <li key={number}>
                <span aria-hidden="true">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="partners section-pad" id="partner" data-titolo="Partner">
        <div className="partner-intro">
          <p className="kicker">Network & partner</p>
          <h2>Un ecosistema di<br />collaborazioni.</h2>
          <p className="content-note">
            Attraverso il nostro media network possiamo integrare alla strategia di comunicazione anche campagne e
            spazi pubblicitari sulle testate con cui collaboriamo, coordinandone pianificazione, creatività e
            pubblicazione.
          </p>
        </div>
        <div className="partner-rail" aria-label="Partner Kore">
          <div>
            <img src="/partners/il-meridiano-sport.webp" alt="Il Meridiano Sport" />
            <span>Partner editoriale</span>
          </div>
          <div>
            <img src="/partners/metropolis.webp" alt="Metropolis" />
            <span>Media partner</span>
          </div>
        </div>
      </section>

      <ClosingCta id="contatti" />

      <SiteFooter />
    </main>
  );
}
