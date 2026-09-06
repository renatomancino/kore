"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "./project-data";

/**
 * Un progetto e la sua pellicola di materiali, dentro all'archivio.
 *
 * Prima ogni progetto era una scheda che portava a una pagina sua: per vedere
 * nove immagini di TRIM si cambiava pagina, si tornava indietro, si entrava
 * nel successivo. Qui l'archivio si guarda tutto restando dov'e' — ogni riga
 * scorre di lato per conto suo.
 *
 * L'indice numerato sotto e' ancora `::scroll-marker`, che funziona e non
 * costa niente. Le frecce no: erano `::scroll-button()`, e quei tasti si
 * ancorano a un blocco contenitore che non sono riuscito a prevedere — a una
 * larghezza cadevano al centro dell'immagine, a un'altra finivano tagliati al
 * bordo dello schermo. Un comando che l'utente non trova non e' un comando,
 * quindi qui sono due `<button>` veri in testata: costano poche righe di
 * JavaScript e stanno esattamente dove li metto.
 *
 * Le immagini sono pigre di default (`next/image`), e in una pista
 * orizzontale quelle fuori schermo restano fuori: l'archivio intero conta
 * novantadue materiali, e caricarli tutti all'apertura sarebbe una pagina da
 * decine di megabyte.
 */
export function CaroselloProgetto({ progetto, numero }: { progetto: Project; numero: number }) {
  const pista = useRef<HTMLOListElement>(null);
  const [aInizio, setAInizio] = useState(true);
  const [aFine, setAFine] = useState(false);

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

  /* Un progetto senza galleria mostra almeno la propria copertina: una
     pellicola vuota sarebbe una riga che non dice niente. */
  const pezzi = progetto.gallery?.length
    ? progetto.gallery
    : [{ src: progetto.cover, alt: `Identità di ${progetto.client}`, fit: "contain" as const, group: undefined, kind: undefined, poster: undefined }];

  return (
    <section className="progetto" id={progetto.slug} aria-labelledby={`progetto-${progetto.slug}`}>
      <header className="progetto-testata">
        <span className="progetto-numero" aria-hidden="true">{String(numero).padStart(2, "0")}</span>
        <div className="progetto-nome">
          {/* Il nome porta ancora alla scheda completa: quelle pagine
              esistono, hanno la loro anteprima social e la transizione sulla
              copertina, e toglierne l'unico ingresso le renderebbe orfane. */}
          <h2 id={`progetto-${progetto.slug}`}>
            <Link href={`/progetti/${progetto.slug}`} data-transizione>{progetto.client}</Link>
          </h2>
          <p className="progetto-titolo">{progetto.title}</p>
        </div>
        <p className="progetto-sommario">{progetto.summary}</p>
        <dl className="progetto-dati">
          <div><dt>Ambito</dt><dd>{progetto.category}</dd></div>
          <div><dt>Anno</dt><dd>{progetto.year}</dd></div>
          <div><dt>Competenze</dt><dd>{progetto.services.join(" · ")}</dd></div>
        </dl>

        {/* Le frecce ci sono su tutti e nove, anche dove non c'e' niente da
            scorrere: nascoste, la testata di quei progetti cambiava forma e
            le righe non si somigliavano piu'. Spente dicono la stessa cosa —
            di qua non si va — senza spostare niente. */}
        <div className="progetto-frecce">
          <button type="button" onClick={() => muovi(-1)} disabled={aInizio} aria-label={`Materiali precedenti di ${progetto.client}`}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" onClick={() => muovi(1)} disabled={aFine} aria-label={`Altri materiali di ${progetto.client}`}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </header>

      {/* Sopra la dozzina i numerini diventano una parete: l'indice passa a
          pallini, che dicono "quanti" e "dove sei" senza pretendere di essere
          letti uno per uno. Gender ne ha quarantotto. */}
      <div className="pista">
        <ol className={`pellicola${pezzi.length > 12 ? " pellicola-lunga" : ""}`} ref={pista}>
        {pezzi.map((pezzo, i) => (
            <li className="fotogramma" key={`${pezzo.src}-${i}`}>
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
                <Image src={pezzo.src} alt={pezzo.alt} fill sizes="(max-width: 900px) 78vw, 30vw" />
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
    </section>
  );
}
