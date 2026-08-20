"use client";

import { useEffect, useState } from "react";

const services = [
  { name: "Branding", note: "Diamo un’identità alle idee.", image: "/images/designer.jpg" },
  { name: "Social", note: "Trasformiamo attenzione in relazione.", image: "/images/event.jpg" },
  { name: "Video", note: "Mettiamo il racconto in movimento.", image: "/images/camera.jpg" },
  { name: "Photo", note: "Troviamo l’inquadratura giusta.", image: "/images/designer.jpg" },
  { name: "Web", note: "Costruiamo esperienze che funzionano.", image: "/kore-brand.png" },
  { name: "Advertising", note: "Portiamo le idee dove devono arrivare.", image: "/images/stage.jpg" },
  { name: "Eventi", note: "Creiamo momenti che restano.", image: "/images/event.jpg" },
  { name: "Content", note: "Diamo ritmo, voce e consistenza.", image: "/images/camera.jpg" },
];

const clientSlots = [
  { name: "Logo 01", project: "Preview progetto · Branding", image: "/images/designer.jpg" },
  { name: "Logo 02", project: "Preview progetto · Social", image: "/images/event.jpg" },
  { name: "Logo 03", project: "Preview progetto · Web", image: "/kore-brand.png" },
  { name: "Logo 04", project: "Preview progetto · Eventi", image: "/images/stage.jpg" },
  { name: "Logo 05", project: "Preview progetto · Content", image: "/images/camera.jpg" },
  { name: "Logo 06", project: "Preview progetto · Advertising", image: "/images/event.jpg" },
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
      <header className="site-header">
        <a className="wordmark wordmark-small" href="#top" aria-label="Kore, home">KORE</a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen((open) => !open)}>
          <span>{menuOpen ? "Chiudi" : "Menu"}</span><span className="menu-dot" aria-hidden="true" />
        </button>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">Creative agency · Napoli / Ovunque</p>
          <h1 id="hero-title">Diamo forma<br />alle idee.</h1>
          <a className="hero-cta" href="#contatti">Raccontaci la tua idea <span aria-hidden="true">↗</span></a>
        </div>
        <div className="scroll-cue" aria-hidden="true">Scorri ↓</div>
      </section>

      <nav className={`menu-panel ${menuOpen ? "is-open" : ""}`} id="site-menu" aria-hidden={!menuOpen}>
        <div className="menu-column">
          <p>Cosa facciamo</p>
          {services.filter((_, index) => ![2, 3].includes(index)).map((item) => (
            <a key={item.name} href="#servizi" onClick={() => setMenuOpen(false)}>{item.name}</a>
          ))}
        </div>
        <div className="menu-column">
          <p>Kore</p>
          <a href="#mondo" onClick={() => setMenuOpen(false)}>Il nostro mondo</a>
          <a href="#numeri" onClick={() => setMenuOpen(false)}>Numeri</a>
          <a href="#partner" onClick={() => setMenuOpen(false)}>Partner</a>
          <a className="menu-contact" href="#contatti" onClick={() => setMenuOpen(false)}>Contatti ↗</a>
        </div>
      </nav>

      <div className="marquee" aria-label="I servizi Kore">
        <div className="marquee-track">
          <span>Branding ✦ Social ✦ Video ✦ Web ✦ Adv ✦ Eventi ✦ Content ✦ </span>
          <span aria-hidden="true">Branding ✦ Social ✦ Video ✦ Web ✦ Adv ✦ Eventi ✦ Content ✦ </span>
        </div>
      </div>

      <section className="clients section-pad" id="clienti">
        <div className="section-heading">
          <p className="kicker">Chi ci ha dato fiducia</p>
          <h2>Facciamo cose<br />con loro.</h2>
          <p className="content-note">Struttura pronta per i loghi e i progetti reali. Nessun cliente inventato.</p>
        </div>
        <div className="client-stage">
          <div className="client-preview">
            <img src={clientSlots[activeClient].image} alt="" />
            <p>{clientSlots[activeClient].project}</p>
          </div>
          <div className="logo-wall">
            {clientSlots.map((client, index) => (
              <button key={client.name} onMouseEnter={() => setActiveClient(index)} onFocus={() => setActiveClient(index)} onClick={() => setActiveClient(index)}>
                <span>{client.name}</span><small>Da inserire</small>
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
          <div className="service-visual">
            <img src={services[activeService].image} alt="" />
            <div><p>{services[activeService].name}</p><h3>{services[activeService].note}</h3></div>
          </div>
        </div>
      </section>

      <section className="service-editorial" aria-label="Servizi in evidenza">
        <article className="editorial-card cream-card">
          <div className="card-copy"><span>01 / Identità</span><h2>Branding</h2><p>Diamo un’identità alle idee, dal primo segno a ogni punto di contatto.</p><a href="#contatti">Scopri →</a></div>
          <img src="/images/designer.jpg" alt="Designer al lavoro davanti al computer" />
        </article>
        <article className="editorial-card dark-card">
          <img src="/images/camera.jpg" alt="Backstage di una produzione video" />
          <div className="card-copy"><span>02 / Racconto</span><h2>Content</h2><p>Foto, video e parole che fanno sentire la voce del brand.</p><a href="#contatti">Scopri →</a></div>
        </article>
        <article className="editorial-card red-card">
          <div className="card-copy"><span>03 / Esperienze</span><h2>Eventi</h2><p>Dalla strategia al palco: costruiamo momenti da ricordare.</p><a href="#contatti">Scopri →</a></div>
          <img src="/images/stage.jpg" alt="Allestimento tecnico di un evento" />
        </article>
      </section>

      <section className="numbers section-pad" id="numeri">
        <p className="kicker">Risultati, non decorazioni</p>
        <h2>Non ci piace parlare di numeri.<br /><em>Ma questi dicono qualcosa.</em></h2>
        <div className="numbers-grid">
          {["Interazioni", "Reach", "Contatti"].map((item, index) => (
            <div className="metric" key={item}><span>0{index + 1}</span><strong>Dato<br />verificato</strong><p>{item} · In attesa dei numeri documentabili</p></div>
          ))}
        </div>
      </section>

      <section className="case-study" id="progetti">
        <div className="case-image"><img src="/kore-brand.png" alt="Sistema visivo Kore in rosso corallo e crema" /></div>
        <div className="case-copy">
          <p className="kicker">Case study / 001</p><h2>Kore<br />su Kore.</h2>
          <dl>
            <div><dt>Obiettivo</dt><dd>Rendere riconoscibile una struttura agile e multidisciplinare.</dd></div>
            <div><dt>Cosa abbiamo fatto</dt><dd>Voce, sistema visivo, ritmo e una presenza digitale che si muove.</dd></div>
            <div><dt>Risultato</dt><dd>Un’identità che non ha bisogno di stare ferma per farsi ricordare.</dd></div>
          </dl>
          <a className="text-link" href="#contatti">Vedi il progetto →</a>
        </div>
      </section>

      <section className="process section-pad" id="metodo">
        <p className="kicker">Come lavoriamo</p><h2>Un processo chiaro.<br />Ogni volta diverso.</h2>
        <div className="timeline">
          {process.map(([number, title, text]) => (
            <article key={number}><span>{number}</span><div className="timeline-dot" /><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="story" id="mondo">
        <div className="story-title"><p className="kicker">Kore / La storia</p><h2>Le persone giuste.<br />Per il progetto giusto.</h2></div>
        <div className="story-copy">
          <p>Kore non è un ufficio pieno di persone che fingono di essere un’agenzia.</p>
          <p>È una struttura agile che mette insieme le competenze giuste per ogni progetto. Una regia unica, un network vivo, nessuna formula prefabbricata.</p>
          <p className="name-origin">Kore significa “fanciulla”: energia che nasce, cambia forma e diventa possibilità.</p>
        </div>
      </section>

      <section className="partners section-pad" id="partner">
        <p className="kicker">Network & partner</p><h2>Non dobbiamo sapere fare tutto.<br />Dobbiamo sapere chi chiamare.</h2>
        <div className="partner-line"><span>Strategia</span><span>Produzione</span><span>Tech</span><span>Media</span><span>Territorio</span></div>
      </section>

      <section className="location" id="dove">
        <div className="map-art" aria-hidden="true"><span>40.786</span><span>14.369</span><div className="map-pin">K</div><p>Vesuvio<br />Mediterraneo</p></div>
        <div className="location-copy"><p className="kicker">Siamo qui</p><h2>Ma lavoriamo<br />ovunque.</h2><p>Torre del Greco — Napoli<br />Campania — Italia</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Torre+del+Greco" target="_blank" rel="noreferrer">Apri la mappa ↗</a></div>
      </section>

      <section className="final-cta" id="contatti">
        <p className="kicker">Il prossimo progetto</p><h2>Hai un’idea?<br /><em>Parliamone.</em></h2>
        <a className="giant-link" href="mailto:">Iniziamo <span>↗</span></a>
        <div className="contact-strip">
          <span>Email · da inserire</span><span>Telefono · da inserire</span><span>Instagram · da collegare</span><span>LinkedIn · da collegare</span>
        </div>
      </section>

      <footer>
        <div className="wordmark footer-mark">KORE</div>
        <div className="footer-links"><span>Marketing</span><span>Web design</span><span>Communication</span><span>AI solutions</span></div>
        <div className="footer-meta"><span>Privacy · Cookie · P.IVA</span><span>© {new Date().getFullYear()} Kore Studio</span></div>
      </footer>
    </main>
  );
}
