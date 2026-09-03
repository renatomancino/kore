"use client";

import { useMemo, useState } from "react";

export type GalleryItem = { src: string; alt: string; kind?: "image" | "video"; poster?: string; group?: string };

function label(item: GalleryItem) {
  if (item.kind === "video") return "Video";
  const group = item.group?.toLowerCase() ?? "";
  if (group.includes("logo") || group.includes("brand") || group.includes("rebrand")) return "Branding";
  return "Foto";
}

export function ProjectGallery({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState("Tutti");
  const filters = useMemo(() => ["Tutti", ...Array.from(new Set(items.map(label)))], [items]);
  const visible = filter === "Tutti" ? items : items.filter((item) => label(item) === filter);

  return (
    <div className="project-gallery-browser">
      <nav className="project-gallery-filters" aria-label="Filtra i materiali del progetto">
        {filters.map((name) => (
          <button type="button" key={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}<span>{name === "Tutti" ? items.length : items.filter((item) => label(item) === name).length}</span></button>
        ))}
      </nav>
      <div className="project-detail-gallery-groups">
        {visible.map((image, index) => (
          <figure key={image.src} className={index % 5 === 0 ? "project-gallery-wide" : undefined}>
            {image.kind === "video" ? <video src={image.src} poster={image.poster} controls preload="metadata" playsInline aria-label={image.alt} /> : <img src={image.src} alt={image.alt} loading={index > 1 ? "lazy" : "eager"} />}
            <figcaption><span>{label(image)}</span>{image.group && image.group !== label(image) ? image.group : image.alt}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
