"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatedCounter } from "./animated-counter";
import { VesuvioMare } from "./ornaments";
import { projects } from "./project-data";
import { ScrollEffects } from "./scroll-effects";
import { ServiceShowcase, type Service } from "./service-showcase";
import { SiteFooter } from "./site-footer";
import { VideoShowcase } from "./video-showcase";

const services: Service[] = [
  { id: "branding", name: "Branding", note: "Diamo un’identità alle idee.", image: "/images/designer.jpg" },
  { id: "social", name: "Social", note: "Trasformiamo attenzione in relazione.", image: "/images/event.jpg" },
  { id: "video", name: "Video", note: "Mettiamo il racconto in movimento.", image: "/images/camera.jpg" },
  { id: "web", name: "Web", note: "Costruiamo esperienze che funzionano.", image: "/kore-brand.png" },
  { id: "advertising", name: "Advertising", note: "Portiamo le idee dove devono arrivare.", image: "/images/stage.jpg" },
  { id: "eventi", name: "Eventi", note: "Creiamo momenti che restano.", image: "/images/event.jpg" },
];

const exampleMetrics = [
  { value: 1_000_000, suffix: "+", label: "Visualizzazioni potenziali" },
  { value: 250_000, suffix: "+", label: "Interazioni generate" },
  { value: 40, suffix: "+", label: "Progetti attivati" },
];

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeClient, setActiveClient] = useState(0);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", close);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <main>
      <ScrollEffects />
      <a className="salta-al-contenuto" href="#top">Salta al contenuto</a>
      <header className="site-header">
        <a className="header-brand" href="#top" aria-label="Kore Studio, home">
          <img src="/brand/kore-logo-coral.png" alt="Kore Studio" />
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen((open) => !open)}>
          <span>{menuOpen ? "Chiudi" : "Menu"}</span><span className="menu-dot" aria-hidden="true" />
        </button>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true">
          <div className="hero-halo hero-halo-one" />
          <div className="hero-halo hero-halo-two" />
          <figure className="hero-object hero-object-coral">
            <img src="/images/corallo.webp" alt="" />
          </figure>
          <figure className="hero-object hero-object-cameo">
            <img src="/images/cammeo.webp" alt="" />
          </figure>
          <figure className="hero-object hero-object-production">
            <img src="/images/camera.jpg" alt="" />
          </figure>
          <span className="hero-pearl hero-pearl-one" />
          <span className="hero-pearl hero-pearl-two" />
          <span className="hero-pearl hero-pearl-three" />
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
            <a className="hero-cta" href="#contatti">Raccontaci la tua idea <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">Scorri ↓</div>
      </section>

      <nav className={`menu-panel ${menuOpen ? "is-open" : ""}`} id="site-menu" aria-hidden={!menuOpen}>
        <div className="menu-column">
          <p>Cosa facciamo</p>
          {services.map((item) => (
            <a key={item.name} href="#servizi" onClick={() => setMenuOpen(false)}>{item.name}</a>
          ))}
        </div>
        <div className="menu-column">
          <p>Kore</p>
          <Link href="/progetti" onClick={() => setMenuOpen(false)}>Progetti</Link>
          <a href="#mondo" onClick={() => setMenuOpen(false)}>Il nostro mondo</a>
          <a href="#numeri" onClick={() => setMenuOpen(false)}>Numeri</a>
          <a href="#partner" onClick={() => setMenuOpen(false)}>Partner</a>
          <a className="menu-contact" href="#contatti" onClick={() => setMenuOpen(false)}>Contatti ↗</a>
        </div>
      </nav>

      <nav className="service-index-bar" aria-label="Indice dei servizi Kore">
        {services.map((service, index) => (
          <a href="#servizi" key={service.name} onClick={() => setActiveService(index)}>
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

      <section className="many-things section-pad" id="servizi">
        <p className="kicker">Competenze, non compartimenti</p>
        <h2>Non facciamo<br />solo una cosa.</h2>
        <div className="service-explorer">
          <div className="service-list" role="list" aria-label="Servizi Kore">
            {services.map((service, index) => (
              <button key={service.name} className={index === activeService ? "active" : ""} onMouseEnter={() => setActiveService(index)} onFocus={() => setActiveService(index)} onClick={() => setActiveService(index)}>
                <span>{service.name}</span><span aria-hidden="true">0{index + 1}</span>
              </button>
            ))}
          </div>
          <ServiceShowcase service={services[activeService]} key={services[activeService].id} />
        </div>
      </section>

      <section className="numbers section-pad" id="numeri">
        <p className="kicker">Risultati, non decorazioni</p>
        <h2>Non ci piace parlare di numeri.<br /><em>Ma questi dicono qualcosa.</em></h2>
        <div className="numbers-grid" aria-label="Metriche dimostrative animate">
          {exampleMetrics.map((metric, index) => (
            <div className="metric" key={metric.label}>
              <span>0{index + 1}</span>
              <strong><AnimatedCounter value={metric.value} suffix={metric.suffix} /></strong>
              <p>{metric.label}</p>
            </div>
          ))}
        </div>
        <p className="numbers-disclaimer">Valori dimostrativi · da sostituire con dati verificati.</p>
      </section>

      <section className="selected-projects section-pad" id="progetti">
        <div className="selected-projects-heading">
          <div>
            <p className="kicker">Progetti selezionati</p>
            <h2>Il lavoro parla.<br /><em>Noi gli diamo voce.</em></h2>
          </div>
          <p>Una selezione di identità, contenuti e progetti costruiti insieme ai nostri clienti.</p>
        </div>

        <div className="selected-projects-grid">
          {projects.slice(0, 3).map((project, index) => (
            <Link className={`project-teaser project-teaser-${project.tone}`} href={`/progetti/${project.slug}`} key={project.slug}>
              <div className="project-teaser-image">
                <img src={project.cover} alt={`Progetto ${project.client}`} />
                <span>0{index + 1}</span>
              </div>
              <div className="project-teaser-copy">
                <p>{project.category} · {project.year}</p>
                <h3>{project.client}</h3>
                <p className="project-teaser-summary">{project.summary}</p>
                <span>{project.title} ↗</span>
              </div>
            </Link>
          ))}
        </div>

        <Link className="all-projects-link" href="/progetti">
          <span>Archivio completo</span>
          <strong>Vedi tutti i progetti</strong>
          <i aria-hidden="true">↗</i>
        </Link>
      </section>

      <VideoShowcase />

      <section className="process section-pad" id="metodo">
        <p className="kicker">Come lavoriamo</p><h2>Un processo chiaro.<br />Ogni volta diverso.</h2>
        <div className="timeline">
          {process.map(([number, title, text]) => (
            <article key={number}><span>{number}</span><div className="timeline-dot" /><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="story" id="mondo">
        <div className="story-title">
          <p className="kicker">Kore / La storia</p>
          <h2>Le persone giuste.<br />Per il progetto giusto.</h2>
          <img className="story-portrait" src="/images/cammeo.webp" alt="" width={620} height={807} />
        </div>
        <div className="story-copy">
          <p>Kore non è un ufficio pieno di persone che fingono di essere un’agenzia.</p>
          <p>È una struttura agile che mette insieme le competenze giuste per ogni progetto. Una regia unica, un network vivo, nessuna formula prefabbricata.</p>
          <p className="name-origin">Kore significa “fanciulla”: energia che nasce, cambia forma e diventa possibilità.</p>
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

      <section className="location" id="dove">
        <div className="map-art" aria-hidden="true"><span>40.786</span><span>14.369</span><VesuvioMare /><div className="map-pin">K</div><p>Vesuvio<br />Mediterraneo</p></div>
        <div className="location-copy"><p className="kicker">Siamo qui</p><h2>Ma lavoriamo<br />ovunque.</h2><p>Torre del Greco — Napoli<br />Campania — Italia</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Torre+del+Greco" target="_blank" rel="noreferrer">Apri la mappa ↗</a></div>
      </section>

      <section className="final-cta" id="contatti">
        <p className="kicker">Il prossimo progetto</p>
        <h2 className="cta-alzati">
          <span className="riga">Hai un’idea?</span>
          <span className="riga"><em>Parliamone.</em></span>
        </h2>
        <a className="giant-link" href="mailto:">Iniziamo <span>↗</span></a>
        <div className="contact-strip">
          <span>Email · da inserire</span><span>Telefono · da inserire</span><span>Instagram · da collegare</span><span>LinkedIn · da collegare</span>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
