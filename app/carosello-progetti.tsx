import Link from "next/link";
import { projects } from "./project-data";

/**
 * I progetti come pista scorrevole.
 *
 * Non c'e' JavaScript: le frecce sono `::scroll-button()`, l'indice numerato
 * sotto sono `::scroll-marker`, l'aggancio e' `scroll-snap`. Sono primitive
 * del browser, quindi arrivano gia' con la tastiera, il fuoco, il ruolo di
 * gruppo e il tasto disattivato quando la pista e' a fondo corsa — cose che
 * un carosello scritto a mano sbaglia quasi sempre.
 *
 * Il costo in byte e' zero. Un carosello in libreria, per fare peggio, ne
 * pesa dai 15 ai 40 mila.
 *
 * Dove le primitive non ci sono ancora (Safari, Firefox) resta una pista che
 * si trascina col dito e si aggancia: nessuno vede una pagina rotta, vede una
 * versione senza frecce.
 */
export function CaroselloProgetti() {
  return (
    <div className="pista">
      <ol className="carosello">
        {projects.map((progetto, i) => (
          <li className="carta" key={progetto.slug}>
            <Link href={`/progetti/${progetto.slug}`} data-transizione>
              <div className={`carta-lastra carta-lastra-${progetto.tone}`}>
                <img src={progetto.cover} alt="" loading="lazy" />
                <span className="carta-anno">{progetto.year}</span>
              </div>
              <p className="carta-categoria">
                <b>{String(i + 1).padStart(2, "0")}</b>
                {progetto.category}
              </p>
              <h3>{progetto.client}</h3>
              <p className="carta-sintesi">{progetto.summary}</p>
              <span className="carta-vai">
                Vedi il progetto <i aria-hidden="true">↗</i>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
