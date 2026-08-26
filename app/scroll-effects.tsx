"use client";

import { useEffect } from "react";

/** Titoli che si scoprono entrando in vista. Le immagini NO: erano 15
 * elementi su 19 e ogni foto del sito si assestava entrando — ripetizione,
 * non significato. */
const DA_SCOPRIRE = [
  ".section-heading h2", ".many-things > h2", ".numbers > h2",
  ".process > h2", ".story h2", ".partners h2", ".location h2",
  ".card-copy h2", ".service-visual h3", ".cta-alzati",
].join(",");

/**
 * Due cose che i siti di riferimento fanno con GSAP.
 *
 * Lo scorrimento inerziale: loro usano ScrollSmoother, che e' un plugin a
 * pagamento; Lenis e' l'equivalente MIT. Muove la posizione di scroll reale
 * del documento invece di trasformare un contenitore, quindi le animazioni
 * CSS pilotate dallo scroll altrove continuano a funzionare.
 *
 * Le comparse: si attivano UNA VOLTA quando l'elemento entra e poi si svolgono
 * a tempo. Legarle allo scroll sembrava piu' furbo ma e' peggio — il testo si
 * ri-nasconderebbe risalendo, e su un titolo alto 130px l'intera comparsa si
 * consuma in un centinaio di pixel.
 *
 * Chi ha chiesto meno movimento non riceve ne' l'uno ne' le altre: gli elementi
 * partono gia' al loro posto.
 */
export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elementi = [...document.querySelectorAll<HTMLElement>(DA_SCOPRIRE)];
    elementi.forEach((e) => e.setAttribute("data-scopri", ""));

    /* Si osserva il CONTENITORE, non l'elemento nascosto. Lo stato iniziale e'
       un clip-path che azzera l'area visibile, e l'IntersectionObserver tiene
       conto di quel ritaglio: riporta isIntersecting false anche per un titolo
       in piena vista. Osservando se stesso non scatterebbe mai — si mangia la
       coda. Il contenitore non e' ritagliato, quindi risponde. */
    const guardato = new Map<Element, HTMLElement[]>();
    elementi.forEach((e) => {
      const g = e.parentElement ?? e;
      const lista = guardato.get(g);
      if (lista) lista.push(e);
      else guardato.set(g, [e]);
    });

    const osservatore = new IntersectionObserver(
      (voci) => {
        voci.forEach((v) => {
          if (!v.isIntersecting) return;
          guardato.get(v.target)?.forEach((e) => e.setAttribute("data-scopri", "fatto"));
          osservatore.unobserve(v.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    guardato.forEach((_, g) => osservatore.observe(g));

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let annullato = false;

    import("lenis").then(({ default: Lenis }) => {
      if (annullato) return;
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      const tick = (t: number) => {
        lenis?.raf(t);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });

    return () => {
      annullato = true;
      osservatore.disconnect();
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
