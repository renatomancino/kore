import { Fragment, type CSSProperties } from "react";

/**
 * Il testo si accende una parola per volta mentre la frase attraversa lo
 * schermo. Non e' una dissolvenza del blocco: e' la lettura che va alla
 * velocita' di chi scorre.
 *
 * Ogni parola porta il proprio indice in `--parola`, e il CSS lo usa per
 * spostare in avanti il tratto di linea temporale in cui quella parola si
 * accende. Nessun `useEffect`, nessun osservatore, nessun timer: la
 * posizione della frase nella pagina e' l'unico orologio.
 *
 * Fra due parole c'e' uno spazio vero e non un margine: le caselle sono
 * `inline-block`, e senza il nodo di testo in mezzo la riga andrebbe a capo
 * come se fosse una parola sola lunga trenta caratteri.
 */
export function TestoRivelato({ children }: { children: string }) {
  const parole = children.split(" ");

  return (
    <>
      {parole.map((parola, i) => (
        <Fragment key={i}>
          <span className="parola" style={{ "--parola": i } as CSSProperties}>
            {parola}
          </span>
          {i < parole.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
