"use client";

import { useEffect, useRef, useState } from "react";

type Reel = { client: string; title: string; category: string; poster: string; src: string | null };

const reels: Reel[] = [
  { client: "Kore Production", title: "Dietro le quinte", category: "Backstage", poster: "/images/camera.jpg", src: null },
  { client: "Eventi", title: "Quando lo spazio prende vita", category: "Live experience", poster: "/images/event.jpg", src: null },
  { client: "Creative direction", title: "Dal concept alla scena", category: "Campaign", poster: "/images/stage.jpg", src: null },
  { client: "Brand stories", title: "Le persone dentro il progetto", category: "Content", poster: "/images/designer.jpg", src: null },
];

export function VideoShowcase() {
  const [activeReel, setActiveReel] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);
  const reelRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.reelIndex);
        setActiveReel(index);
      },
      { root: feed, threshold: [0.55, 0.75] },
    );

    reelRefs.current.forEach((reel) => reel && observer.observe(reel));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    reelRefs.current.forEach((reel, index) => {
      const video = reel?.querySelector("video");
      if (!video) return;
      if (index === activeReel) void video.play().catch(() => undefined);
      else video.pause();
    });
  }, [activeReel]);

  const selectReel = (index: number) => {
    const feed = feedRef.current;
    if (feed) feed.scrollTo({ top: index * feed.clientHeight, behavior: "smooth" });
    setActiveReel(index);
  };

  return (
    <section className="video-showcase section-pad" id="showreel">
      <div className="video-showcase-intro">
        <p className="kicker">Video / Showreel</p>
        <h2>Il lavoro,<br /><em>in movimento.</em></h2>
        <p>Scorri nel telefono: ogni progetto occupa la scena, uno alla volta.</p>
      </div>

      <div className="reel-phone" aria-label="Showreel verticale Kore">
        <div className="reel-speaker" aria-hidden="true" />
        <div className="reel-feed" ref={feedRef}>
          {reels.map((reel, index) => (
            <article
              className="reel-card"
              data-reel-index={index}
              key={reel.title}
              ref={(node) => { reelRefs.current[index] = node; }}
            >
              <div className="reel-media">
                {reel.src ? (
                  <video src={reel.src} poster={reel.poster} muted loop playsInline preload="metadata" />
                ) : (
                  <img src={reel.poster} alt="" />
                )}
              </div>
              <div className="reel-shade" />
              <div className="reel-card-copy">
                <p>{reel.category}</p>
                <h3>{reel.title}</h3>
                <span>{reel.client}</span>
              </div>
              {!reel.src && <span className="reel-media-status">Slot video pronto</span>}
            </article>
          ))}
        </div>
        <div className="reel-progress" aria-hidden="true">
          <span style={{ transform: `scaleY(${(activeReel + 1) / reels.length})` }} />
        </div>
      </div>

      <div className="reel-navigation">
        <p><strong>{String(activeReel + 1).padStart(2, "0")}</strong> / {String(reels.length).padStart(2, "0")}</p>
        <div role="group" aria-label="Scegli un video">
          {reels.map((reel, index) => (
            <button type="button" aria-pressed={activeReel === index} onClick={() => selectReel(index)} key={reel.title}>
              <span>0{index + 1}</span>{reel.client}
            </button>
          ))}
        </div>
        <small>Rotella su desktop · swipe su mobile</small>
      </div>
    </section>
  );
}
