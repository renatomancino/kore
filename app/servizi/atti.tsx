import type { Service } from "../service-showcase";
import { MockupServizio } from "./mockup";

/* Il colore di ogni atto. Sei stanze che si alternano chiaro e scuro, e il
   corallo tenuto per l'ultima: la testata misura cio' che ha sotto e cambia
   tinta a ogni passaggio, quindi la sequenza si sente scorrendo. */
const TONI = ["chiaro", "scuro", "chiaro", "scuro", "chiaro", "corallo"] as const;

/**
 * I sei servizi, un atto per ciascuno.
 *
 * Qui dentro non entra nessun progetto: ne' i marchi dei clienti, ne' le
 * fotografie dei lavori, ne' i loro nomi. C'erano — ogni atto elencava i
 * progetti in cui quel servizio era stato usato, e le schede portavano
 * materiale di C.O.P.A., Osteria, TRIM e Gender con l'attribuzione in
 * chiaro — e il risultato era che questa pagina somigliava all'archivio.
 * Due pagine che mostrano le stesse cose sono una pagina sola vista due
 * volte: i progetti stanno su /progetti, qui si racconta il mestiere.
 *
 * Restano quindi tre spazi dichiarati per servizio — il racconto, cosa si
 * porta a casa il cliente, l'immagine — segnati a vista invece che riempiti
 * di parole di comodo. Un testo finto che sembra vero e' peggio di un buco
 * ammesso, perche' nessuno si accorge che manca e finisce online.
 */
export function AttiDeiServizi({ servizi }: { servizi: Service[] }) {
  return (
    <div className="atti">
      {servizi.map((servizio, i) => (
        <section
          className={`atto atto-${TONI[i]}`}
          id={servizio.id}
          key={servizio.id}
          aria-labelledby={`atto-${servizio.id}`}
        >
          <span className="atto-numero" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>

          <div className="atto-titolo">
            <h2 id={`atto-${servizio.id}`}>{servizio.name}</h2>
            <p>{servizio.note}</p>
            <p className="da-scrivere">
              <b>Da scrivere</b> — il racconto di {servizio.name.toLowerCase()}: da dove parte un
              progetto, cosa cambia per il cliente, come si capisce che ha funzionato.
            </p>
          </div>

          <figure className="atto-figura">
            <MockupServizio servizio={servizio} />
            <figcaption>
              Disegno di costruzione · nessun lavoro di cliente
            </figcaption>
          </figure>

          <div className="atto-comprende">
            <p className="atto-etichetta">Cosa comprende</p>
            <ol className="atto-voci">
              {servizio.dettagli.map((voce, n) => (
                <li key={voce}><span aria-hidden="true">{String(n + 1).padStart(2, "0")}</span>{voce}</li>
              ))}
            </ol>
          </div>

          <div className="atto-consegne">
            <p className="atto-etichetta">Cosa si porta a casa</p>
            <p className="da-scrivere"><b>Da scrivere</b> — l’elenco dei materiali consegnati.</p>
          </div>
        </section>
      ))}
    </div>
  );
}
