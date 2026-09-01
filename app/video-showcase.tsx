"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Reel = {
  client: string;
  title: string;
  category: string;
  poster: string;
  src: string;
};

const reels: Reel[] = [
  {
    client: "Panariello",
    title: "Porta blindata",
    category: "Reel / Prodotto",
    poster: "/images/camera.jpg",
    src: "/videos/client-work/porta-blindata.mp4",
  },
  {
    client: "Panariello",
    title: "Lancio finestra",
    category: "Reel / Lancio",
    poster: "/projects/panariello/logo-social.jpg",
    src: "/videos/client-work/lancio-finestra.mp4",
  },
  {
    client: "Creative direction",
    title: "Dal concept alla scena",
    category: "Campaign",
    poster: "/images/stage.jpg",
    src: "/videos/social/fashion-red.mp4",
  },
  {
    client: "Brand stories",
    title: "Le persone dentro il progetto",
    category: "Content",
    poster: "/images/designer.jpg",
    src: "/videos/social/abstract-ink.mp4",
  },
];

const orbitItems = [...reels, ...reels];

export function VideoShowcase() {
  const [activeReel, setActiveReel] = useState(0);
  /* I quattro video pesano 3,5 MB — il 98% di tutta la pagina — e con
     `autoplay` il browser li scarica subito, `preload="metadata"` o no: erano
     gia' bufferizzati mentre la sezione era quattro schermate piu' in basso.
     Finche' non ci si avvicina il `src` non c'e', e si vede il poster. */
  const [vicini, setVicini] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    const sezione = sectionRef.current;
    if (!sezione) return;
    /* Un margine generoso: si attacca il `src` quando la sezione e' ancora a
       una schermata e mezza di distanza, cosi' arrivandoci il video e' gia'
       pronto e non si vede il poster fare da tappo. */
    const osservatore = new IntersectionObserver(
      ([voce]) => {
        if (!voce.isIntersecting) return;
        setVicini(true);
        osservatore.disconnect();
      },
      { rootMargin: "150% 0px" },
    );
    osservatore.observe(sezione);
    return () => osservatore.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = Array.from(section.querySelectorAll<HTMLElement>(".orbit-card"));
    if (!cards.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileLayout = window.matchMedia("(max-width: 600px)").matches;
    if (reducedMotion || mobileLayout) return;

    const context = gsap.context(() => {
      const positionCards = (progress: number) => {
        const radius = Math.min(window.innerWidth * 0.29, 470);
        const rotation = progress * 135;
        const nextActive = Math.min(reels.length - 1, Math.round(progress * (reels.length - 1)));

        if (nextActive !== activeRef.current) {
          activeRef.current = nextActive;
          setActiveReel(nextActive);
        }

        cards.forEach((card, index) => {
          const angle = index * 45 - rotation;
          const radians = (angle * Math.PI) / 180;
          const depth = (Math.cos(radians) + 1) / 2;
          const x = Math.sin(radians) * radius;
          const y = Math.sin(radians * 1.15) * 118 + Math.cos(radians * 0.55) * 34;
          const z = Math.cos(radians) * 430 - 360;
          const scale = 0.68 + depth * 0.34;

          gsap.set(card, {
            x,
            y,
            z,
            scale,
            rotateY: -angle * 0.28,
            opacity: 0.18 + depth * 0.82,
            zIndex: Math.round(depth * 100),
          });

          card.dataset.front = depth > 0.88 ? "true" : "false";
        });
      };

      positionCards(0);

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: ({ progress }) => positionCards(progress),
        onRefresh: ({ progress }) => positionCards(progress),
      });
    }, section);

    return () => context.revert();
  }, []);

  const selectReel = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(max-width: 600px)").matches) {
      const cards = orbitRef.current?.querySelectorAll<HTMLElement>(
        '.orbit-card:not([aria-hidden="true"])',
      );
      cards?.[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      activeRef.current = index;
      setActiveReel(index);
      return;
    }

    const travel = Math.max(0, section.offsetHeight - window.innerHeight);
    const top = section.offsetTop + travel * (index / (reels.length - 1));
    window.scrollTo({ top, behavior: "smooth" });
  };

  const updateMobileReel = () => {
    const orbit = orbitRef.current;
    if (!orbit || !window.matchMedia("(max-width: 600px)").matches) return;

    const center = orbit.scrollLeft + orbit.clientWidth / 2;
    const cards = Array.from(
      orbit.querySelectorAll<HTMLElement>('.orbit-card:not([aria-hidden="true"])'),
    );
    const nextActive = cards.reduce((nearest, card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const nearestCard = cards[nearest];
      const nearestCenter = nearestCard.offsetLeft + nearestCard.offsetWidth / 2;
      return Math.abs(cardCenter - center) < Math.abs(nearestCenter - center) ? index : nearest;
    }, 0);

    if (nextActive !== activeRef.current) {
      activeRef.current = nextActive;
      setActiveReel(nextActive);
    }
  };

  const handleKeys = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    selectReel(Math.max(0, Math.min(reels.length - 1, activeReel + direction)));
  };

  return (
    <section className="video-showcase" id="showreel" ref={sectionRef}>
      <div className="video-showcase-shell">
        <div className="video-showcase-intro">
          <p className="kicker">Video / Showreel</p>
          <h2>Il lavoro,<br /><em>in movimento.</em></h2>
          <p>Ogni progetto occupa la scena, uno alla volta.</p>
        </div>

        <div className="reel-orbit" ref={orbitRef} onScroll={updateMobileReel}>
          <div className="orbit-axis" aria-hidden="true">
            <span />
            <i />
          </div>

          {orbitItems.map((reel, index) => {
            const duplicate = index >= reels.length;
            return (
              <article
                className="orbit-card"
                aria-hidden={duplicate}
                key={`${reel.title}-${index}`}
              >
                <div className="orbit-card-media">
                  {duplicate ? (
                    <Image src={reel.poster} alt="" fill sizes="(max-width: 600px) 45vw, 18vw" />
                  ) : (
                    <video
                      src={vicini ? reel.src : undefined}
                      poster={reel.poster}
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="metadata"
                      aria-label={`${reel.title} — ${reel.client}`}
                    />
                  )}
                </div>
                <div className="orbit-card-shade" />
                <div className="orbit-card-copy">
                  <p><span>0{(index % reels.length) + 1}</span>{reel.category}</p>
                  <h3>{reel.title}</h3>
                  <strong>{reel.client}</strong>
                </div>
              </article>
            );
          })}
        </div>

        <div className="reel-navigation">
          <p><strong>{String(activeReel + 1).padStart(2, "0")}</strong> / {String(reels.length).padStart(2, "0")}</p>
          <div role="group" aria-label="Scegli un video">
            {reels.map((reel, index) => (
              <button
                type="button"
                aria-pressed={activeReel === index}
                onClick={() => selectReel(index)}
                onKeyDown={handleKeys}
                key={reel.title}
              >
                <span>0{index + 1}</span>{reel.client}
              </button>
            ))}
          </div>
          <small>Rotella su desktop · swipe su mobile</small>
        </div>

        <div className="orbit-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${(activeReel + 1) / reels.length})` }} />
        </div>
      </div>
    </section>
  );
}
