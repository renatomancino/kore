"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_GROUPS = [
  ".section-heading",
  ".many-things > .kicker, .many-things > h2",
  ".service-explorer",
  ".numbers > .kicker, .numbers > h2",
  ".numbers-grid",
  ".selected-projects-heading",
  ".video-showcase-intro",
  ".reel-phone",
  ".process > .kicker, .process > h2",
  ".story-title",
  ".story-copy",
  ".partner-intro",
  ".partner-rail",
  ".location-copy",
  ".final-cta > .kicker, .final-cta > h2, .final-cta > .giant-link",
].join(",");

/**
 * Motion layer only. Layout, palette and content remain owned by the existing
 * Kore design. GSAP is used where timing communicates hierarchy: the hero
 * enters as one composition and each section reveals once when it becomes
 * relevant. Lenis only smooths the native document scroll.
 */
export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero .eyebrow", { y: 18, opacity: 0, duration: 0.55 })
        .from(
          ".hero h1 > span",
          { yPercent: 110, opacity: 0, duration: 0.85, stagger: 0.09 },
          "-=0.24",
        )
        .from(".hero-actions", { y: 24, opacity: 0, duration: 0.65 }, "-=0.38")
        .from(
          ".hero-cameo",
          {
            y: 42,
            scale: 0.9,
            opacity: 0,
            rotate: -3,
            duration: 0.8,
            stagger: 0.07,
            clearProps: "transform",
          },
          "-=0.72",
        );

      gsap.utils.toArray<HTMLElement>(REVEAL_GROUPS).forEach((element) => {
        gsap.from(element, {
          y: 44,
          opacity: 0,
          duration: 0.82,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            once: true,
          },
        });
      });

      ScrollTrigger.batch(".project-teaser", {
        start: "top 88%",
        once: true,
        onEnter: (items) => {
          gsap.from(items, {
            y: 58,
            opacity: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
      });

      /* Le tappe del metodo non entrano piu' in dissolvenza: adesso si
         impilano una sull'altra restando incollate in alto, e una carta che
         parte da `opacity: 0` mentre quella sotto e' gia' ferma lascia
         vedere attraverso la pila. La coreografia ce l'hanno gia' loro. */

      /* La parallasse va su cio' che sta DENTRO al riquadro, non sul riquadro.
         Spostando `.map-art` si spostava il pannello intero: il suo bordo
         inferiore finiva 15px piu' in basso di quello della colonna di testo
         accanto, e nell'angolo si vedeva il rosso della sezione dopo. Muovendo
         il contenuto il movimento resta e i due bordi restano allineati. */
      gsap.to(".map-art > *", {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: ".location",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    });

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      context.revert();
    };
  }, []);

  return null;
}
