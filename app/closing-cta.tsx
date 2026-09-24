"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

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
    <section className="closing-cta" id={id} ref={sectionRef} data-titolo="Contatti">
      <div className="closing-cta-rings" aria-hidden="true"><span /><span /><span /></div>
      <div className="closing-cta-main">
        <p className="kicker">Il prossimo progetto</p>
        <h2 className="closing-cta-title">
          <span>Partiamo da ciò che fai.</span>
          <span><em>Costruiamo come</em></span>
          <span>raccontarlo.</span>
        </h2>
        <p className="closing-cta-lead">Consulenza, strategia e competenze coordinate intorno agli obiettivi della tua attività.</p>
        <InteractiveHoverButton href="/idea" text="Raccontaci di cosa ti occupi." data-transizione="" />
      </div>
    </section>
  );
}
