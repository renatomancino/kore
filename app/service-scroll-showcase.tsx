"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceShowcase, type Service } from "./service-showcase";
import { services } from "./services-data";

gsap.registerPlugin(ScrollTrigger);

const DETAILS: Record<Service["id"], string[]> = {
  branding: ["Identità e posizionamento", "Logo e sistemi visivi", "Linee guida che restano coerenti"],
  social: ["Strategia editoriale", "Produzione di contenuti", "Community e continuità"],
  video: ["Concept e storyboard", "Riprese e direzione", "Montaggio e formati verticali"],
  web: ["Esperienza e interfaccia", "Sviluppo su misura", "Performance e accessibilità"],
  advertising: ["Idea di campagna", "Media e declinazioni", "Ottimizzazione dei risultati"],
  eventi: ["Format e progettazione", "Allestimento e regia", "Contenuti prima e dopo"],
};

export function ServiceScrollShowcase({ title }: { title: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const media = gsap.matchMedia();
    media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      const movement = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

      const tween = gsap.to(track, {
        x: () => -movement(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${movement()}`,
          pin: viewport,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(services.length - 1, Math.round(self.progress * (services.length - 1)));
            setActive((current) => (current === next ? current : next));
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      return () => tween.scrollTrigger?.kill();
    });

    return () => media.revert();
  }, []);

  return (
    <section className="services-scroll-showcase" id="servizi" ref={sectionRef} aria-labelledby="services-scroll-title">
      <div className="services-scroll-viewport" ref={viewportRef}>
        <div className="services-scroll-watermark" aria-hidden="true">Competenze · Competenze</div>

        <div className="services-scroll-track" ref={trackRef}>
          {services.map((service, index) => (
            <article className="services-scroll-slide" data-active={active === index ? "true" : "false"} key={service.id}>
              {index === 0 && (
                <header className="services-scroll-header">
                  <p className="kicker">Competenze, non compartimenti</p>
                  <h2 id="services-scroll-title">{title}</h2>
                </header>
              )}
              <div className="services-scroll-copy">
                <span className="services-scroll-index" aria-hidden="true">0{index + 1}</span>
                <h3>{service.name}</h3>
                <p>{service.note}</p>
                <ul>
                  {DETAILS[service.id].map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </div>
              <div className="services-scroll-visual">
                <ServiceShowcase service={service} />
              </div>
            </article>
          ))}
        </div>

        <div className="services-scroll-hud" aria-hidden="true">
          <span>0{active + 1} / 0{services.length}</span>
          <span className="services-scroll-progress"><i ref={progressRef} /></span>
          <span>Scorri →</span>
        </div>
      </div>
    </section>
  );
}
