"use client";

import { useEffect, useState } from "react";

/**
 * Il titolo della sezione che si sta leggendo, nella testata.
 *
 * Ogni sezione che vuole comparire lassu' dichiara il proprio nome con
 * `data-titolo`. Passati i primi 120px di scorrimento, vince l'ultima sezione
 * il cui inizio e' gia' salito sotto la testata (96px dal bordo alto).
 * Il testo resta anche mentre sparisce, cosi' la dissolvenza non lo svuota.
 */
export function TitoloTestata() {
  const [titolo, setTitolo] = useState("");
  const [visibile, setVisibile] = useState(false);

  useEffect(() => {
    let inCoda = 0;
    const aggiorna = () => {
      inCoda = 0;
      let corrente = "";
      if (window.scrollY > 120) {
        for (const sezione of document.querySelectorAll<HTMLElement>("[data-titolo]")) {
          if (sezione.getBoundingClientRect().top > 96) break;
          corrente = sezione.dataset.titolo ?? "";
        }
      }
      setVisibile(corrente !== "");
      if (corrente) setTitolo(corrente);
    };
    const suEvento = () => {
      if (!inCoda) inCoda = requestAnimationFrame(aggiorna);
    };

    aggiorna();
    window.addEventListener("scroll", suEvento, { passive: true });
    window.addEventListener("resize", suEvento);
    window.addEventListener("kore:vista-cambiata", suEvento);
    return () => {
      window.removeEventListener("scroll", suEvento);
      window.removeEventListener("resize", suEvento);
      window.removeEventListener("kore:vista-cambiata", suEvento);
      cancelAnimationFrame(inCoda);
    };
  }, []);

  return (
    <span className="testata-titolo" data-visibile={visibile ? "" : undefined} aria-hidden="true">
      {titolo}
    </span>
  );
}
