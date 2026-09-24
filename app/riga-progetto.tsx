"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Project } from "./project-data";

/**
 * Un progetto dell'archivio come riga di un indice: chiusa si legge in una
 * linea (numero, cliente, ambito, copertina), aperta mostra il racconto e la
 * pellicola dei materiali.
 *
 * E' un `<details>` con lo stesso `name` di tutte le altre righe, quindi se ne
 * apre una alla volta senza JavaScript. Un indirizzo con l'ancora del
 * progetto (`/progetti#slug`) arriva con la riga gia' aperta.
 *
 * La pellicola funziona come prima: le frecce sono due `<button>` veri, le
 * immagini sono pigre (`next/image`) e quelle fuori schermo restano fuori.
 */
export function RigaProgetto({ progetto, numero }: { progetto: Project; numero: number }) {
  const riga = useRef<HTMLDetailsElement>(null);
  const pista = useRef<HTMLOListElement>(null);
  const [aInizio, setAInizio] = useState(true);
  const [aFine, setAFine] = useState(false);

  /* L'ancora nell'indirizzo apre la riga, anche quando cambia dopo. */
  useEffect(() => {
    const apriSeIndicata = () => {
      if (riga.current && decodeURIComponent(window.location.hash.slice(1)) === progetto.slug) {
        riga.current.open = true;
      }
    };
    apriSeIndicata();
    window.addEventListener("hashchange", apriSeIndicata);
    return () => window.removeEventListener("hashchange", apriSeIndicata);
  }, [progetto.slug]);

  useEffect(() => {
    const p = pista.current;
    if (!p) return;
    const aggiorna = () => {
      /* Un pixel di tolleranza: lo scorrimento con aggancio si ferma su
         valori frazionari, e un confronto esatto lascerebbe la freccia
         accesa a fondo corsa. */
      setAInizio(p.scrollLeft <= 1);
      setAFine(p.scrollLeft >= p.scrollWidth - p.clientWidth - 1);
    };
    aggiorna();
    p.addEventListener("scroll", aggiorna, { passive: true });
    const osservatore = new ResizeObserver(aggiorna);
    osservatore.observe(p);
    return () => {
      p.removeEventListener("scroll", aggiorna);
      osservatore.disconnect();
    };
  }, []);

  const muovi = (verso: 1 | -1) => {
    const p = pista.current;
    if (!p) return;
    /* Poco meno di una schermata: cosi' resta in vista un fotogramma di
       quelli appena visti, e non si perde il filo. */
    p.scrollBy({ left: verso * p.clientWidth * 0.82, behavior: "smooth" });
  };

  /* Aprendo una riga si chiude quella prima, che puo' essere piu' alta: se la
     testata di questa finisce sotto la barra in alto, la si riporta in vista. */
  const suApertura = () => {
    const r = riga.current;
    if (!r?.open) return;
    requestAnimationFrame(() => {
      if (r.getBoundingClientRect().top < 76) r.scrollIntoView({ block: "start" });
    });
  };

  /* Un progetto senza galleria mostra almeno la propria copertina: una
     pellicola vuota sarebbe una riga che non dice niente. */
  const pezzi = progetto.gallery?.length
    ? progetto.gallery
    : [{ src: progetto.cover, alt: `Identità di ${progetto.client}`, fit: "contain" as const, group: undefined, kind: undefined, poster: undefined }];

  return (
    <details
      className="riga-progetto"
      name="progetti"
      id={progetto.slug}
      data-tone={progetto.tone}
      ref={riga}
      onToggle={suApertura}
    >
      <summary>
        <span className="riga-numero" aria-hidden="true">{String(numero).padStart(2, "0")}</span>
        <h2 className="riga-cliente">{progetto.client}</h2>
        <span className="riga-ambito">{progetto.category}</span>
        <span className="riga-segno" aria-hidden="true" />
        <span className="riga-copertina" aria-hidden="true">
          <Image src={progetto.cover} alt="" fill sizes="260px" />
        </span>
      </summary>

      <div className="riga-corpo">
        <div className="riga-corpo-testo">
          <p className="riga-titolo">{progetto.title}</p>
          <p className="riga-sommario">{progetto.summary}</p>
        </div>

        <div className={`progetto-galleria${pezzi.length === 1 ? " progetto-galleria-singola" : ""}`}>
          <div className="progetto-galleria-intro">
            <span aria-hidden="true">Materiali selezionati</span>
            <span className="progetto-galleria-conta" aria-hidden="true">
              {String(pezzi.length).padStart(2, "0")}{" "}
              {pezzi.length === 1 ? "fotogramma" : "fotogrammi · trascina per esplorare"}
            </span>
            {/* Le frecce restano visibili anche quando sono disabilitate: la
                posizione dei comandi non cambia passando da un caso all'altro. */}
            {pezzi.length > 1 && (
              <div className="progetto-frecce">
                <button type="button" onClick={() => muovi(-1)} disabled={aInizio} aria-label={`Materiali precedenti di ${progetto.client}`}>
                  <span aria-hidden="true">←</span>
                </button>
                <button type="button" onClick={() => muovi(1)} disabled={aFine} aria-label={`Altri materiali di ${progetto.client}`}>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </div>
          <div className="pista">
            <ol className="pellicola" ref={pista}>
              {pezzi.map((pezzo, i) => (
                <li className={`fotogramma${pezzo.kind === "video" ? " fotogramma-video" : ""}`} key={`${pezzo.src}-${i}`}>
                  <figure data-fit={pezzo.fit ?? (pezzo.src.endsWith(".png") ? "contain" : "cover")}>
                    {pezzo.kind === "video" ? (
                      <video
                        src={pezzo.src}
                        poster={pezzo.poster}
                        controls
                        muted
                        playsInline
                        preload="none"
                        aria-label={pezzo.alt}
                      />
                    ) : (
                      <Image src={pezzo.src} alt={pezzo.alt} fill sizes="(max-width: 900px) 84vw, 46vw" />
                    )}
                    <figcaption>
                      {pezzo.group && <span>{pezzo.group}</span>}
                      <strong>{pezzo.alt}</strong>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </details>
  );
}
