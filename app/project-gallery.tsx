"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export type GalleryItem = {
  src: string;
  alt: string;
  kind?: "image" | "video";
  poster?: string;
  group?: string;
};

function label(item: GalleryItem) {
  if (item.group) return item.group;
  if (item.kind === "video") return "Video";

  const description = `${item.src} ${item.alt}`.toLowerCase();
  if (/logo|simbolo|pittogramma|identit|brand/.test(description)) return "Identità";
  if (/applicaz|material/.test(description)) return "Applicazioni";
  return "Fotografie";
}

export function ProjectGallery({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState("Tutti");
  const [activeIndex, setActiveIndex] = useState(0);
  const filters = useMemo(() => ["Tutti", ...Array.from(new Set(items.map(label)))], [items]);
  const visible = useMemo(
    () => (filter === "Tutti" ? items : items.filter((item) => label(item) === filter)),
    [filter, items],
  );
  const safeIndex = Math.min(activeIndex, Math.max(visible.length - 1, 0));
  const active = visible[safeIndex];

  function chooseFilter(name: string) {
    setFilter(name);
    setActiveIndex(0);
  }

  function move(direction: -1 | 1) {
    setActiveIndex((current) => (current + direction + visible.length) % visible.length);
  }

  if (!active) return null;

  return (
    <div className="project-gallery-browser">
      <div className="project-gallery-toolbar">
        <nav className="project-gallery-filters" aria-label="Scegli cosa vedere del progetto">
          {filters.map((name) => (
            <button type="button" key={name} aria-pressed={filter === name} onClick={() => chooseFilter(name)}>
              {name}<span>{name === "Tutti" ? items.length : items.filter((item) => label(item) === name).length}</span>
            </button>
          ))}
        </nav>
        <p><span>{String(safeIndex + 1).padStart(2, "0")}</span> / {String(visible.length).padStart(2, "0")}</p>
      </div>

      <div className="project-viewer">
        <figure className="project-viewer-stage" data-fit={active.src.endsWith(".png") ? "contain" : "cover"}>
          {active.kind === "video" ? (
            <video key={active.src} src={active.src} poster={active.poster} controls muted preload="metadata" playsInline aria-label={active.alt} />
          ) : (
            <Image key={active.src} src={active.src} alt={active.alt} fill sizes="(max-width: 800px) 100vw, 82vw" priority={safeIndex === 0} />
          )}
          <figcaption>
            <span>{label(active)}</span>
            <strong>{active.alt}</strong>
          </figcaption>
        </figure>

        {visible.length > 1 && (
          <div className="project-viewer-controls">
            <button type="button" className="project-viewer-arrow" onClick={() => move(-1)} aria-label="Contenuto precedente">←</button>
            <div className="project-viewer-index" role="group" aria-label={`Seleziona un contenuto: ${visible.length} disponibili`}>
              {visible.map((item, index) => (
                <button
                  type="button"
                  key={`${item.src}-${index}`}
                  aria-label={`Mostra ${item.alt}`}
                  aria-pressed={safeIndex === index}
                  onClick={() => setActiveIndex(index)}
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
            <button type="button" className="project-viewer-arrow" onClick={() => move(1)} aria-label="Contenuto successivo">→</button>
          </div>
        )}
      </div>
    </div>
  );
}
