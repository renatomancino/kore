"use client";

import { useMemo, useState } from "react";
import { CaroselloProgetto } from "./carosello-progetto";
import type { Project } from "./project-data";

/* Una categoria e' scritta "Branding · Web": due competenze in una stringa. */
const competenzeDi = (progetto: Project) =>
  progetto.category.split("·").map((voce) => voce.trim()).filter(Boolean);

/**
 * L'archivio, con i filtri che filtrano davvero.
 *
 * Erano sei `<span>` dentro a un `<nav>`, disegnati come pastiglie premibili:
 * bordo, angoli tondi, il primo evidenziato come se fosse selezionato. Non
 * facevano niente. Un comando che ha l'aspetto di un comando e non risponde
 * e' peggio di un comando assente, perche' chi lo preme conclude che il sito
 * e' rotto.
 *
 * Le voci nascono dai dati e non da un elenco scritto a mano: quello fermo
 * nel markup diceva Tutti, Branding, Content, Social, Photo, Web e si era
 * gia' perso per strada Advertising, Eventi e Graphic, che nei progetti ci
 * sono. Un elenco copiato e' un elenco che diverge.
 *
 * Il numero del progetto resta quello dell'archivio intero: filtrando,
 * "07" resta "07" e non diventa "02". La numerazione dice dove sta una cosa
 * fra tutte, non dentro alla selezione del momento.
 */
export function ArchivioProgetti({ progetti }: { progetti: Project[] }) {
  const [scelta, setScelta] = useState("Tutti");

  const conteggio = useMemo(() => {
    const mappa = new Map<string, number>();
    for (const progetto of progetti) {
      for (const competenza of competenzeDi(progetto)) {
        mappa.set(competenza, (mappa.get(competenza) ?? 0) + 1);
      }
    }
    return mappa;
  }, [progetti]);

  /* Prima le competenze piu' rappresentate: l'ordine dice anche cosa fa
     davvero lo studio, non solo cosa sa fare. */
  const voci = useMemo(
    () => [...conteggio.keys()].sort((a, b) => (conteggio.get(b)! - conteggio.get(a)!) || a.localeCompare(b)),
    [conteggio],
  );

  const visibili = progetti
    .map((progetto, indice) => ({ progetto, numero: indice + 1 }))
    .filter(({ progetto }) => scelta === "Tutti" || competenzeDi(progetto).includes(scelta));

  return (
    <>
      <nav className="archive-index" aria-label="Filtra i progetti per competenza">
        <button type="button" aria-pressed={scelta === "Tutti"} onClick={() => setScelta("Tutti")}>
          Tutti<small>{progetti.length}</small>
        </button>
        {voci.map((voce) => (
          <button type="button" key={voce} aria-pressed={scelta === voce} onClick={() => setScelta(voce)}>
            {voce}<small>{conteggio.get(voce)}</small>
          </button>
        ))}
      </nav>

      <div className="archivio-pellicole">
        {visibili.map(({ progetto, numero }) => (
          <CaroselloProgetto progetto={progetto} numero={numero} key={progetto.slug} />
        ))}
      </div>
    </>
  );
}
