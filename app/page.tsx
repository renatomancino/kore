"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const services = [
  { name: "Branding", note: "Diamo un’identità alle idee.", detail: "Strategia · Naming · Visual identity", image: "/images/designer.jpg" },
  { name: "Social", note: "Trasformiamo attenzione in relazione.", detail: "Strategy · Community · Campaign", image: "/images/event.jpg" },
  { name: "Video", note: "Mettiamo il racconto in movimento.", detail: "Concept · Production · Post", image: "/images/camera.jpg" },
  { name: "Photo", note: "Troviamo l’inquadratura giusta.", detail: "Art direction · Shooting · Edit", image: "/images/designer.jpg" },
  { name: "Web", note: "Costruiamo esperienze che funzionano.", detail: "UX · UI · Development", image: "/kore-brand.png" },
  { name: "Advertising", note: "Portiamo le idee dove devono arrivare.", detail: "Creative · Media · Performance", image: "/images/stage.jpg" },
  { name: "Eventi", note: "Creiamo momenti che restano.", detail: "Format · Production · Experience", image: "/images/event.jpg" },
  { name: "Content", note: "Diamo ritmo, voce e consistenza.", detail: "Editorial · Copy · Motion", image: "/images/camera.jpg" },
];

const clientSlots = [
  { code: "K/01", project: "Preview progetto · Branding", image: "/images/designer.jpg" },
  { code: "K/02", project: "Preview progetto · Social", image: "/images/event.jpg" },
  { code: "K/03", project: "Preview progetto · Web", image: "/kore-brand.png" },
  { code: "K/04", project: "Preview progetto · Eventi", image: "/images/stage.jpg" },
  { code: "K/05", project: "Preview progetto · Content", image: "/images/camera.jpg" },
  { code: "K/06", project: "Preview progetto · Advertising", image: "/images/event.jpg" },
];

const process = [
  ["01", "Parliamo", "Ci racconti cosa vuoi fare. Noi facciamo le domande giuste."],
  ["02", "Costruiamo", "Definiamo strategia, direzione e una squadra su misura."],
  ["03", "Creiamo", "Le competenze entrano in scena e l’idea prende forma."],
  ["04", "Facciamo crescere", "Misuriamo, miglioriamo e accompagniamo il progetto."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeClient, setActiveClient] = useState(0);
  const [headerTheme, setHeaderTheme] = useState("dark");
  const scrollProgressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", close);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const updateProgress = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.transform = `scaleX(${distance > 0 ? window.scrollY / distance : 0})`;
      }
      const sections = document.querySelectorAll<HTMLElement>("[data-header-theme]");
      const active = Array.from(sections).find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= 67 && bounds.bottom > 67;
      });
      setHeaderTheme(active?.dataset.headerTheme ?? "dark");
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5%" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <header className={`site-header theme-${headerTheme}`}>
        <a className="wordmark wordmark-small" href="#top" aria-label="Kore, home">KORE<span className="wordmark-dot">.</span></a>
        <div className="header-status" aria-hidden="true"><span>Creative studio</span><span>40.786° N&nbsp;&nbsp;14.369° E</span></div>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen((open) => !open)}>
          <span>{menuOpen ? "Chiudi" : "Menu"}</span><span className="menu-icon" aria-hidden="true"><i /><i /></span>
        </button>
        <span ref={scrollProgressRef} className="scroll-progress" aria-hidden="true" />
      </header>

      <nav className={`menu-panel ${menuOpen ? "is-open" : ""}`} id="site-menu" aria-hidden={!menuOpen}>
        <div className="menu-intro"><span>Kore / Menu</span><p>Costruiamo la squadra giusta<br />attorno a ogni idea.</p></div>
        <div className="menu-column">
          <p>Cosa facciamo</p>
          {services.filter((_, index) => ![2, 3].includes(index)).map((item, index) => (
            <a key={item.name} href="#servizi" onClick={() => setMenuOpen(false)}><small>0{index + 1}</small>{item.name}</a>
          ))}
        </div>
        <div className="menu-column menu-secondary">
          <p>Kore</p>
          <a href="#mondo" onClick={() => setMenuOpen(false)}>Il nostro mondo</a>
          <a href="#numeri" onClick={() => setMenuOpen(false)}>Numeri</a>
          <a href="#partner" onClick={() => setMenuOpen(false)}>Partner</a>
          <a className="menu-contact" href="#contatti" onClick={() => setMenuOpen(false)}>Parliamone ↗</a>
        </div>
      </nav>

      <section className="hero" id="top" aria-labelledby="hero-title" data-header-theme="dark">
        <div className="hero-grid" aria-hidden="true">
          <div className="hero-frame hero-frame-main"><Image src="/kore-brand.png" alt="" fill priority sizes="(max-width: 720px) 100vw, 77vw" /></div>
          <div className="hero-frame hero-frame-top"><Image src="/images/camera.jpg" alt="" fill priority sizes="(max-width: 720px) 42vw, 21vw" /><span>Film / 08:24</span></div>
          <div className="hero-frame hero-frame-bottom"><Image src="/images/designer.jpg" alt="" fill priority sizes="(max-width: 720px) 45vw, 25vw" /><span>Ideas in progress</span></div>
        </div>
        <div className="hero-copy">
          <p className="eyebrow"><span>Napoli</span><span>Strategia · Design · Movimento</span></p>
          <h1 id="hero-title"><span>Diamo forma</span><em>alle idee.</em></h1>
          <div className="hero-bottomline">
            <p>Un collettivo creativo costruito attorno<br />alle persone e ai progetti giusti.</p>
            <a className="hero-cta" href="#contatti"><span>Raccontaci la tua idea</span><b aria-hidden="true">↗</b></a>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true"><span>01</span><span>14</span></div>
      </section>

      <div className="marquee" data-header-theme="cream" aria-label="I servizi Kore"><div className="marquee-track"><span>Branding ✦ Social ✦ Video ✦ Web ✦ Adv ✦ Eventi ✦ Content ✦ </span><span aria-hidden="true">Branding ✦ Social ✦ Video ✦ Web ✦ Adv ✦ Eventi ✦ Content ✦ </span></div></div>

      <section className="clients section-pad" id="clienti" data-header-theme="red">
        <div className="section-topline"><span>02 / Clienti</span><span>Hover to discover</span></div>
        <div className="section-heading" data-reveal>
          <h2>Facciamo cose<br /><em>con loro.</em></h2>
          <div className="side-note"><span>Chi ci ha dato fiducia</span><p>Una relazione alla volta. Un lavoro da mostrare, non soltanto un logo.</p></div>
        </div>
        <div className="client-stage" data-reveal>
          <div className="client-preview">
            <Image key={clientSlots[activeClient].image} src={clientSlots[activeClient].image} alt="" fill sizes="(max-width: 900px) 100vw, 46vw" />
            <div className="preview-caption"><span>{clientSlots[activeClient].code}</span><p>{clientSlots[activeClient].project}</p></div>
          </div>
          <div className="logo-wall">
            {clientSlots.map((client, index) => (
              <button key={client.code} aria-pressed={index === activeClient} onMouseEnter={() => setActiveClient(index)} onFocus={() => setActiveClient(index)} onClick={() => setActiveClient(index)}>
                <span>{client.code}</span><small>Logo in arrivo</small><i aria-hidden="true">↗</i>
              </button>
            ))}
            <p className="client-honesty">Nessun cliente inventato.<br />I loghi reali entrano qui.</p>
          </div>
        </div>
      </section>

      <section className="many-things section-pad" id="servizi" data-header-theme="cream">
        <div className="section-topline"><span>03 / Cosa facciamo</span><span>8 discipline · 1 regia</span></div>
        <h2 data-reveal>Non facciamo<br /><em>solo una cosa.</em></h2>
        <div className="service-explorer" data-reveal>
          <div className="service-list" role="list" aria-label="Servizi Kore">
            {services.map((service, index) => (
              <button key={service.name} aria-pressed={index === activeService} className={index === activeService ? "active" : ""} onMouseEnter={() => setActiveService(index)} onFocus={() => setActiveService(index)} onClick={() => setActiveService(index)}>
                <span><small>0{index + 1}</small>{service.name}</span><i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
          <div className="service-visual">
            <Image key={services[activeService].image} src={services[activeService].image} alt="" fill sizes="(max-width: 900px) 100vw, 53vw" />
            <span className="visual-index">0{activeService + 1} / 08</span>
            <div><p>{services[activeService].detail}</p><h3>{services[activeService].note}</h3></div>
          </div>
        </div>
      </section>

      <section className="service-editorial" aria-label="Servizi in evidenza">
        <article className="editorial-card editorial-brand" data-reveal data-header-theme="cream">
          <div className="card-copy"><span>01 / Identità</span><h2>Branding</h2><p>Diamo alle idee un volto, una voce e un sistema capace di crescere.</p><a href="#contatti">Esplora il servizio <b>↗</b></a></div>
          <div className="card-media"><Image src="/images/designer.jpg" alt="Designer al lavoro davanti al computer" fill sizes="(max-width: 800px) 100vw, 52vw" /></div>
        </article>
        <article className="editorial-card editorial-content" data-reveal data-header-theme="dark">
          <div className="card-media"><Image src="/images/camera.jpg" alt="Backstage di una produzione video" fill sizes="(max-width: 800px) 100vw, 52vw" /></div>
          <div className="card-copy"><span>02 / Racconto</span><h2>Content</h2><p>Foto, video e parole che fanno sentire la voce del brand.</p><a href="#contatti">Esplora il servizio <b>↗</b></a></div>
        </article>
        <article className="editorial-card editorial-events" data-reveal data-header-theme="red">
          <div className="card-copy"><span>03 / Esperienze</span><h2>Eventi</h2><p>Dalla strategia al palco: costruiamo momenti da ricordare.</p><a href="#contatti">Esplora il servizio <b>↗</b></a></div>
          <div className="card-media"><Image src="/images/stage.jpg" alt="Allestimento tecnico di un evento" fill sizes="(max-width: 800px) 100vw, 52vw" /></div>
        </article>
      </section>

      <div className="marquee marquee-dark" data-header-theme="dark" aria-hidden="true"><div className="marquee-track reverse"><span>Più curiosità ✦ Meno formule ✦ Più ascolto ✦ Meno rumore ✦ </span><span>Più curiosità ✦ Meno formule ✦ Più ascolto ✦ Meno rumore ✦ </span></div></div>

      <section className="numbers section-pad" id="numeri" data-header-theme="dark">
        <div className="section-topline"><span>04 / Numeri</span><span>Proof, not promises</span></div>
        <div className="numbers-intro" data-reveal><h2>Non ci piace parlare<br />di numeri. <em>Ma questi<br />dicono qualcosa.</em></h2><p>Risultati dei clienti che ci hanno messo il Kore. Pubblicheremo solo dati verificabili e documentati.</p></div>
        <div className="numbers-grid" data-reveal>
          {["Interazioni", "Reach", "Contatti"].map((item, index) => (
            <div className="metric" key={item}><span>0{index + 1}</span><strong>Dato<br />verificato</strong><div><i aria-hidden="true" /><p>{item}<br />In attesa del dato documentabile</p></div></div>
          ))}
        </div>
      </section>

      <section className="case-study" id="progetti" data-header-theme="cream">
        <div className="case-media" data-reveal>
          <Image src="/kore-brand.png" alt="Sistema visivo Kore in rosso corallo e crema" fill sizes="(max-width: 900px) 100vw, 62vw" />
          <div className="case-stamp"><span>Case<br />study</span><b>001</b></div>
          <div className="case-inset"><Image src="/images/stage.jpg" alt="Dettaglio di una produzione Kore" fill sizes="(max-width: 600px) 42vw, 18vw" /></div>
        </div>
        <div className="case-copy" data-reveal>
          <div className="section-topline"><span>05 / Il progetto</span><span>Self initiated</span></div>
          <h2>Kore<br /><em>su Kore.</em></h2>
          <dl>
            <div><dt>Obiettivo</dt><dd>Rendere riconoscibile una struttura agile e multidisciplinare.</dd></div>
            <div><dt>Intervento</dt><dd>Voce, sistema visivo, ritmo e una presenza digitale che si muove.</dd></div>
            <div><dt>Risultato</dt><dd>Un’identità che non ha bisogno di stare ferma per farsi ricordare.</dd></div>
          </dl>
          <a className="text-link" href="#contatti">Vedi il progetto <span>↗</span></a>
        </div>
      </section>

      <section className="process section-pad" id="metodo" data-header-theme="red">
        <div className="section-topline"><span>06 / Come lavoriamo</span><span>Da idea a impatto</span></div>
        <div className="process-intro" data-reveal><h2>Un processo chiaro.<br /><em>Ogni volta diverso.</em></h2><p>Quattro passaggi. La squadra cambia, la cura resta la stessa.</p></div>
        <div className="timeline" data-reveal>
          {process.map(([number, title, itemText]) => (
            <article key={number}><span>{number}</span><div className="timeline-line"><i /></div><h3>{title}</h3><p>{itemText}</p></article>
          ))}
        </div>
      </section>

      <section className="story" id="mondo" data-header-theme="cream">
        <div className="story-visual" data-reveal><Image src="/images/designer.jpg" alt="Professionista Kore al lavoro" fill sizes="(max-width: 900px) 100vw, 43vw" /><span>K / People first</span></div>
        <div className="story-copy" data-reveal>
          <div className="section-topline"><span>07 / Kore</span><span>La storia</span></div>
          <h2>Le persone giuste.<br /><em>Per il progetto giusto.</em></h2>
          <p>Kore non è un ufficio pieno di persone che fingono di essere un’agenzia. È una struttura agile che mette insieme le competenze giuste, con una regia unica e nessuna formula prefabbricata.</p>
          <blockquote>«Kore» significa fanciulla: energia che nasce, cambia forma e diventa possibilità.</blockquote>
        </div>
      </section>

      <section className="partners section-pad" id="partner" data-header-theme="cream">
        <div className="section-topline"><span>08 / Network</span><span>Open by design</span></div>
        <div className="partners-intro" data-reveal><h2>Non dobbiamo sapere<br />fare tutto. <em>Dobbiamo<br />sapere chi chiamare.</em></h2><p>Il network è parte del metodo: più competenze quando servono, meno struttura quando non serve.</p></div>
        <div className="partner-line" data-reveal>{["Strategia", "Produzione", "Tech", "Media", "Territorio", "Talent"].map((item, index) => <span key={item}><small>0{index + 1}</small>{item}<b>+</b></span>)}</div>
      </section>

      <section className="location" id="dove" data-header-theme="dark">
        <div className="map-art" aria-hidden="true"><span className="coord coord-one">40.786</span><span className="coord coord-two">14.369</span><div className="map-orbit"><i /><i /><i /></div><div className="map-pin"><b>K</b></div><p>Vesuvio<br />Mediterraneo</p></div>
        <div className="location-copy" data-reveal><div className="section-topline"><span>09 / Siamo qui</span><span>43° E</span></div><h2>Ma lavoriamo<br /><em>ovunque.</em></h2><p>Torre del Greco — Napoli<br />Campania — Italia</p><a className="text-link light-link" href="https://www.google.com/maps/search/?api=1&query=Torre+del+Greco" target="_blank" rel="noreferrer">Apri la mappa <span>↗</span></a></div>
      </section>

      <section className="final-cta" id="contatti" data-header-theme="red">
        <div className="section-topline"><span>10 / Il prossimo progetto</span><span>Tocca a te</span></div>
        <h2 data-reveal>Hai un’idea?<br /><em>Parliamone.</em></h2>
        <a className="giant-link" href="mailto:"><span>Iniziamo</span><b>↗</b></a>
        <div className="contact-strip"><a href="mailto:"><small>01</small>Email · da inserire</a><span><small>02</small>Telefono · da inserire</span><span><small>03</small>Instagram · da collegare</span><span><small>04</small>LinkedIn · da collegare</span></div>
      </section>

      <footer data-header-theme="cream">
        <div className="footer-head"><span>Kore Studio®</span><a href="#top">Torna su ↑</a></div>
        <div className="wordmark footer-mark">KORE<span>.</span></div>
        <div className="footer-bottom"><div className="footer-links"><span>Marketing</span><span>Web design</span><span>Communication</span><span>AI solutions</span></div><div className="footer-meta"><span>Privacy · Cookie · P.IVA</span><span>© {new Date().getFullYear()} Kore Studio</span></div></div>
      </footer>
    </main>
  );
}
