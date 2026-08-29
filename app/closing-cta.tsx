"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ClosingCta({ id }: { id: string }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.from(".closing-cta-title > span", {
        yPercent: 115,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });
      gsap.from(".closing-cta-lead, .closing-cta-button", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 62%", once: true },
      });
      gsap.to(".closing-cta-rings", {
        rotate: 24,
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section className="closing-cta" id={id} ref={sectionRef}>
      <div className="closing-cta-rings" aria-hidden="true"><span /><span /><span /></div>
      <div className="closing-cta-main">
        <p className="kicker">Il prossimo progetto</p>
        <h2 className="closing-cta-title">
          <span>Progettiamo</span>
          <span><em>il tuo prossimo</em></span>
          <span>successo.</span>
        </h2>
        <p className="closing-cta-lead">Una regia creativa, le competenze giuste e un progetto costruito intorno a ciò che vuoi far crescere.</p>
        <Link className="closing-cta-button" href="/idea">Raccontaci la tua idea <span aria-hidden="true">↗</span></Link>
      </div>

      <div className="closing-cta-bottom">
        <span>01 / Pronti quando lo sei</span>
        <Link href="/idea">Iniziamo il progetto <i aria-hidden="true">→</i></Link>
        <span>Torre del Greco — ovunque</span>
      </div>
    </section>
  );
}
