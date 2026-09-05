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
 * Le frecce sono `::scroll-button()`, l'indice numerato `::scroll-marker`:
 * primitive del browser, quindi tastiera, fuoco, ruolo di gruppo e frecce
 * spente a fondo corsa arrivano gia' fatte, e non c'e' JavaScript da caricare.
 *
 * Le immagini sono pigre di default (`next/image`), e in una pista
 * orizzontale quelle fuori schermo restano fuori: l'archivio intero conta
 * novantadue materiali, e caricarli tutti all'apertura sarebbe una pagina da
 * decine di megabyte.
 */
export function CaroselloProgetto({ progetto, numero }: { progetto: Project; numero: number }) {
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
      </header>

      {/* Sopra la dozzina i numerini diventano una parete: l'indice passa a
          pallini, che dicono "quanti" e "dove sei" senza pretendere di essere
          letti uno per uno. Gender ne ha quarantotto. */}
      <ol className={`pellicola${pezzi.length > 12 ? " pellicola-lunga" : ""}`}>
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
    </section>
  );
}
