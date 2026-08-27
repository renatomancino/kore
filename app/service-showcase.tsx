"use client";

import { useState } from "react";
import Image from "next/image";

export type Service = {
  id: "branding" | "social" | "video" | "web" | "advertising" | "eventi";
  name: string;
  note: string;
  image: string;
};

const brandSteps = ["Idea", "Forma", "Sistema"];
const webPages = ["Home", "Projects", "Studio"];

export function ServiceShowcase({ service }: { service: Service }) {
  const [brandStep, setBrandStep] = useState(0);
  const [webPage, setWebPage] = useState(0);

  return (
    <div className={`service-visual service-visual-${service.id}`} aria-live="polite">
      {service.id === "branding" ? (
        <div className="service-scene branding-scene">
          <div className="service-scene-top"><span>Logo lab</span><span>0{brandStep + 1} / 03</span></div>
          <div className={`brand-canvas brand-canvas-step-${brandStep}`}>
            {brandStep === 0 ? (
              <div className="brand-sketch" aria-label="Bozza iniziale del marchio"><i>K</i><span>Idea / Segno / Ritmo</span></div>
            ) : brandStep === 1 ? (
              <div className="brand-form" aria-label="Costruzione della forma"><span>KO</span><i>RE</i></div>
            ) : (
              <Image src="/brand/kore-logo-coral.png" alt="Sistema finale del logo Kore Studio" width={1000} height={460} />
            )}
          </div>
          <div className="service-control-row" role="group" aria-label="Fasi della creazione del logo">
            {brandSteps.map((step, index) => (
              <button type="button" aria-pressed={brandStep === index} onClick={() => setBrandStep(index)} key={step}>
                <span>0{index + 1}</span>{step}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {service.id === "web" ? (
        <div className="service-scene web-scene">
          <div className="web-browser">
            <div className="web-browser-bar"><span /><span /><span /><b>kore.studio/{webPages[webPage].toLowerCase()}</b></div>
            <div className={`web-page web-page-${webPage}`}>
              <nav><b>KORE</b><span>Menu</span></nav>
              <p>0{webPage + 1} / Digital experience</p>
              <h3>{webPages[webPage] === "Home" ? "Idee vive." : webPages[webPage] === "Projects" ? "Lavori scelti." : "Persone giuste."}</h3>
              <div><span /><span /><span /></div>
            </div>
          </div>
          <div className="service-control-row" role="group" aria-label="Pagine del sito di esempio">
            {webPages.map((page, index) => (
              <button type="button" aria-pressed={webPage === index} onClick={() => setWebPage(index)} key={page}>
                <span>0{index + 1}</span>{page}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {service.id === "social" ? (
        <div className="service-scene social-scene">
          <div className="social-photo social-photo-main"><Image src="/images/event.jpg" alt="Produzione di contenuti per un evento" fill sizes="(max-width: 600px) 100vw, 46vw" /></div>
          <div className="social-photo"><Image src="/images/designer.jpg" alt="Dettaglio di una produzione creativa" fill sizes="(max-width: 600px) 50vw, 28vw" /></div>
          <div className="social-photo"><Image src="/images/camera.jpg" alt="Camera durante una produzione" fill sizes="(max-width: 600px) 50vw, 28vw" /></div>
          <div className="social-scene-label"><span>Social system</span><strong>Una storia,<br />più formati.</strong></div>
        </div>
      ) : null}

      {service.id === "video" ? (
        <div className="service-scene service-video-scene">
          <video src="/videos/showreel-demo.mp4" poster="/images/camera.jpg" muted loop autoPlay playsInline controls aria-label="Esempio dimostrativo di contenuto video" />
          <div className="service-video-caption"><span>Motion preview / Demo</span><strong>Il racconto<br />si muove.</strong></div>
        </div>
      ) : null}

      {service.id === "advertising" ? (
        <div className="service-scene advertising-scene">
          <Image src="/images/stage.jpg" alt="Visual di una campagna pubblicitaria" fill sizes="(max-width: 900px) 100vw, 62vw" />
          <div className="advertising-copy"><span>Campaign / KPI dimostrativi</span><strong>Un’idea.<br />Molti punti di contatto.</strong></div>
          <dl>
            <div><dt>Reach</dt><dd>1,2M</dd></div>
            <div><dt>CTR</dt><dd>3,8%</dd></div>
            <div><dt>Formati</dt><dd>12</dd></div>
          </dl>
        </div>
      ) : null}

      {service.id === "eventi" ? (
        <div className="service-scene events-scene">
          <Image src="/images/event.jpg" alt="Allestimento di un evento realizzato" fill sizes="(max-width: 900px) 100vw, 62vw" />
          <div className="events-overlay"><span>Live experience / Torre del Greco</span><strong>Lo spazio<br />prende vita.</strong><p>Concept, produzione e racconto nello stesso luogo.</p></div>
          <span className="events-stamp">03<br /><small>giornate</small></span>
        </div>
      ) : null}
    </div>
  );
}
