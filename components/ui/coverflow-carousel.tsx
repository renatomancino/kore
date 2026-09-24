"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CoverflowSlide = {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  meta?: { label: string; value: string }[];
};

type CoverflowCarouselProps = {
  slides: CoverflowSlide[];
  /** Rotazione massima delle carte laterali, in gradi. */
  rotate?: number;
  /** Quanto arretrano le carte laterali, in larghezze di carta. */
  depth?: number;
  /** La prospettiva, in larghezze di carta. */
  perspective?: number;
  /** Quanto in fretta rotazione e profondita' crescono allontanandosi dal centro. */
  falloff?: number;
  /** Quanta opacita' perde ogni carta per ogni posizione di distanza. */
  fade?: number;
  cardWidth?: string;
  /** Lo spazio fra le carte, in frazioni di larghezza. */
  gap?: number;
  loop?: boolean;
  showCaption?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  label?: string;
  className?: string;
  cardClassName?: string;
};

/**
 * Un carosello a "coverflow": la carta al centro dritta, le altre ruotate e
 * arretrate ai lati. Si trascina col dito o col mouse, con un po' di inerzia,
 * e si comanda con le frecce della tastiera.
 *
 * La posizione e' un numero con la virgola, non un indice: durante il
 * trascinamento le carte stanno fra una posizione e l'altra, e al rilascio
 * scivolano verso quella intera piu' vicina. Le trasformazioni si scrivono
 * direttamente sugli elementi a ogni fotogramma, senza passare dallo stato di
 * React, che si aggiorna solo quando cambia la carta al centro.
 */
export function CoverflowCarousel({
  slides,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = "clamp(148px, 22vw, 260px)",
  gap = 0.05,
  loop = true,
  showCaption = false,
  showPagination = false,
  showNavigation = false,
  label = "Carosello di immagini",
  className,
  cardClassName,
}: CoverflowCarouselProps) {
  const totale = slides.length;
  const scena = React.useRef<HTMLDivElement>(null);
  const carte = React.useRef<(HTMLDivElement | null)[]>([]);
  const posizione = React.useRef(0);
  const obiettivo = React.useRef(0);
  const larghezza = React.useRef(0);
  const animazione = React.useRef<number | null>(null);
  const trascinamento = React.useRef<{ id: number; x: number; pos: number; v: number; t: number } | null>(null);
  const [attiva, setAttiva] = React.useState(0);

  const indice = React.useCallback((p: number) => ((Math.round(p) % totale) + totale) % totale, [totale]);

  const disegna = React.useCallback(() => {
    const w = larghezza.current;
    if (!w) return;
    const passo = w * (1 + gap);
    const p = posizione.current;
    carte.current.forEach((carta, i) => {
      if (!carta) return;
      let distanza = i - p;
      if (loop) {
        distanza = ((distanza % totale) + totale) % totale;
        if (distanza > totale / 2) distanza -= totale;
      }
      const assoluta = Math.abs(distanza);
      const curva = Math.pow(assoluta, falloff);
      const angolo = Math.min(rotate * curva, 82) * Math.sign(distanza);
      carta.style.transform = `translateX(calc(-50% + ${distanza * passo}px)) translateZ(${-depth * w * curva}px) rotateY(${-angolo}deg)`;
      /* In loop le carte a meta' giro dall'altra parte spariscono, invece di
         attraversare la scena per ricomparire dal lato opposto. */
      const visibile = loop ? Math.min(1, Math.max(0, totale / 2 - assoluta)) : 1;
      carta.style.opacity = String(Math.max(0, 1 - fade * assoluta) * visibile);
      carta.style.zIndex = String(100 - Math.round(assoluta));
    });
  }, [totale, depth, fade, falloff, gap, loop, rotate]);

  const animaVerso = React.useCallback(
    (destinazione: number) => {
      if (animazione.current !== null) cancelAnimationFrame(animazione.current);
      obiettivo.current = destinazione;
      setAttiva(indice(destinazione));
      const passo = () => {
        const resto = destinazione - posizione.current;
        if (Math.abs(resto) < 4e-4) {
          posizione.current = destinazione;
          disegna();
          animazione.current = null;
          return;
        }
        posizione.current += resto * 0.16;
        disegna();
        animazione.current = requestAnimationFrame(passo);
      };
      animazione.current = requestAnimationFrame(passo);
    },
    [indice, disegna],
  );

  const limita = React.useCallback((p: number) => (loop ? p : Math.max(0, Math.min(totale - 1, p))), [totale, loop]);

  /* Al pallino "i" per la via piu' corta: in loop si sceglie il giro di
     carosello piu' vicino alla posizione attuale. */
  const vaiA = React.useCallback(
    (i: number) => {
      const destinazione = loop ? i + Math.round((obiettivo.current - i) / totale) * totale : i;
      animaVerso(limita(destinazione));
    },
    [limita, totale, loop, animaVerso],
  );

  const sposta = React.useCallback((verso: number) => animaVerso(limita(Math.round(obiettivo.current) + verso)), [limita, animaVerso]);

  const suTasto = (evento: React.KeyboardEvent) => {
    if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      sposta(-1);
    } else if (evento.key === "ArrowRight") {
      evento.preventDefault();
      sposta(1);
    }
  };

  const suPremuto = (evento: React.PointerEvent<HTMLDivElement>) => {
    if (animazione.current !== null) {
      cancelAnimationFrame(animazione.current);
      animazione.current = null;
    }
    evento.currentTarget.setPointerCapture(evento.pointerId);
    obiettivo.current = posizione.current;
    trascinamento.current = { id: evento.pointerId, x: evento.clientX, pos: posizione.current, v: 0, t: performance.now() };
  };

  const suMovimento = (evento: React.PointerEvent<HTMLDivElement>) => {
    const t = trascinamento.current;
    if (!t || t.id !== evento.pointerId) return;
    const passo = larghezza.current * (1 + gap);
    if (!passo) return;
    const adesso = performance.now();
    const prima = posizione.current;
    posizione.current = limita(t.pos - (evento.clientX - t.x) / passo);
    t.v = ((posizione.current - prima) / Math.max(adesso - t.t, 1)) * 1000;
    t.t = adesso;
    const centro = indice(posizione.current);
    if (centro !== attiva) setAttiva(centro);
    disegna();
  };

  const suRilascio = (evento: React.PointerEvent<HTMLDivElement>) => {
    const t = trascinamento.current;
    if (!t || t.id !== evento.pointerId) return;
    trascinamento.current = null;
    /* Un lancio veloce porta avanti fino a due carte, non di piu'. */
    const slancio = Math.max(-2, Math.min(2, t.v * 0.18));
    animaVerso(limita(Math.round(posizione.current + slancio)));
  };

  React.useLayoutEffect(() => {
    const s = scena.current;
    if (!s) return;
    const misura = () => {
      const prima = carte.current[0];
      if (!prima) return;
      larghezza.current = prima.offsetWidth;
      disegna();
    };
    misura();
    const osservatore = new ResizeObserver(misura);
    osservatore.observe(s);
    return () => osservatore.disconnect();
  }, [disegna]);

  React.useEffect(
    () => () => {
      if (animazione.current !== null) cancelAnimationFrame(animazione.current);
    },
    [],
  );

  const corrente = slides[attiva];

  return (
    <div
      className={cn("w-full", className)}
      style={{ "--cf-card": cardWidth } as React.CSSProperties}
      role="region"
      aria-roledescription="carosello"
      aria-label={label}
    >
      <div className="relative">
        <div
          ref={scena}
          onPointerDown={suPremuto}
          onPointerMove={suMovimento}
          onPointerUp={suRilascio}
          onPointerCancel={suRilascio}
          className="cursor-grab overflow-hidden py-10 active:cursor-grabbing"
          style={{ perspective: `calc(var(--cf-card) * ${perspective})`, touchAction: "pan-y" }}
        >
          <div className="relative select-none" style={{ height: "var(--cf-card)", transformStyle: "preserve-3d" }}>
            {slides.map((slide, i) => (
              <div
                key={i}
                ref={(el) => {
                  carte.current[i] = el;
                }}
                role="group"
                aria-roledescription="immagine"
                aria-label={`${i + 1} di ${totale}`}
                className={cn(
                  "absolute left-1/2 top-0 aspect-square overflow-hidden rounded-2xl bg-muted shadow-xl will-change-transform",
                  cardClassName,
                )}
                style={{ width: "var(--cf-card)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- trascinabile e trasformata a ogni fotogramma */}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full select-none object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Immagine precedente"
              onClick={() => sposta(-1)}
              onKeyDown={suTasto}
              className="absolute left-3 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground outline-none ring-ring backdrop-blur transition hover:bg-background focus-visible:ring-2"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Immagine successiva"
              onClick={() => sposta(1)}
              onKeyDown={suTasto}
              className="absolute right-3 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground outline-none ring-ring backdrop-blur transition hover:bg-background focus-visible:ring-2"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {showCaption && corrente?.title && (
        <div key={attiva} className="mt-2 flex flex-col items-center px-6 duration-300 animate-in fade-in">
          <p className="text-[15px] font-semibold tracking-tight text-foreground">{corrente.title}</p>
          {corrente.subtitle && <p className="mt-1 text-[13px] text-muted-foreground">{corrente.subtitle}</p>}
          {corrente.meta && corrente.meta.length > 0 && (
            <dl className="mt-10 w-full max-w-[230px] text-[12px]">
              {corrente.meta.map((voce) => (
                <div key={voce.label} className="flex justify-between py-[5px]">
                  <dt className="text-muted-foreground">{voce.label}</dt>
                  <dd className="font-medium text-foreground">{voce.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}

      {showPagination && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Vai all'immagine ${i + 1}`}
              aria-current={i === attiva}
              onClick={() => vaiA(i)}
              className={cn("size-2 rounded-full bg-foreground transition-opacity", i === attiva ? "opacity-100" : "opacity-30")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
