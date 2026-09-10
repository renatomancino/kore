"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Freccia } from "./freccia";

/**
 * Il menu del sito: il tasto e il pannello, insieme.
 *
 * Stavano dentro alla home, quindi da /progetti e dalle pagine di progetto non
 * c'era menu: si navigava solo col tasto indietro. Ora sono un pezzo solo,
 * usato ovunque.
 *
 * Le ancore sono assolute (`/#mondo`): dalle altre pagine quelle sezioni non
 * esistono, quindi portano prima alla home e poi al punto giusto.
 *
 * C'era una seconda colonna, "Cosa facciamo", coi sei servizi. Portavano tutti
 * a `/servizi` secco, senza ancora: sei nomi diversi che lasciavano nello
 * stesso identico punto, cioe' dove porta gia' la voce "Servizi" qui sotto.
 * Sette link su dodici finivano nella stessa pagina. Tolta: chi cerca un
 * servizio preciso lo trova nell'indice in cima a /servizi, che le ancore le
 * usa davvero.
 */
export function SiteMenu() {
  const [aperto, setAperto] = useState(false);
  const pannello = useRef<HTMLElement>(null);

  /* Il pannello e' un `popover`: apertura e chiusura le governa il browser
     tramite `popovertarget`, e con lui arrivano gratis tre cose che prima
     erano codice mio — o non c'erano affatto.
     · il top layer, quindi niente piu' duello di z-index fra il tasto e il
       pannello, che avevo dovuto risolvere a mano con un 41 contro 40;
     · Esc, nativo;
     · il clic fuori che chiude, che semplicemente NON funzionava.
     Resta a noi solo cio' che il popover non fa: sapere se e' aperto, per
     scrivere "Chiudi" sul tasto, e bloccare lo scorrimento sotto. */
  useEffect(() => {
    const p = pannello.current;
    if (!p) return;
    const suCambio = (e: Event) => setAperto((e as ToggleEvent).newState === "open");
    p.addEventListener("toggle", suCambio);
    return () => p.removeEventListener("toggle", suCambio);
  }, []);

  useEffect(() => {
    if (!aperto) return;
    /* Con il pannello aperto la pagina sotto non deve scorrere, altrimenti si
       torna indietro e ci si ritrova altrove senza averlo chiesto. */
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [aperto]);

  const chiudi = () => pannello.current?.hidePopover();

  return (
    <>
      <button className="menu-toggle" type="button" popoverTarget="site-menu" aria-expanded={aperto}>
        <span>{aperto ? "Chiudi" : "Menu"}</span>
        <span className="menu-dot" aria-hidden="true" />
      </button>

      <nav className="menu-panel" id="site-menu" popover="auto" ref={pannello}>
        {/* Il pannello sta nel top layer, quindi copre il tasto della testata:
            la chiusura vive qui dentro, nello stesso punto dello schermo. */}
        <button className="menu-toggle menu-chiudi" type="button" popoverTarget="site-menu" aria-expanded>
          <span>Chiudi</span>
          <span className="menu-dot" aria-hidden="true" />
        </button>
        <div className="menu-column">
          <p>Kore</p>
          <Link href="/" onClick={chiudi}>Home</Link>
          <Link href="/servizi" onClick={chiudi}>Servizi</Link>
          <Link href="/progetti" onClick={chiudi}>Progetti</Link>
          <Link href="/#mondo" onClick={chiudi}>Il nostro mondo</Link>
          <Link href="/#partner" onClick={chiudi}>Partner</Link>
        </div>

        {/* Il recapito non e' l'ultima voce dell'elenco: e' l'altra meta' del
            pannello. Sta fuori dalla colonna perche' deve occupare una cella
            sua nella griglia — un campo corallo a tutta altezza, che e' anche
            cio' che riempie il vuoto lasciato dalla colonna dei servizi. */}
        <Link className="menu-contact" href="/idea" onClick={chiudi}>
          <span className="menu-contact-testo">Raccontaci la tua idea</span>
          <span className="menu-contact-freccia" aria-hidden="true"><Freccia /></span>
        </Link>
      </nav>
    </>
  );
}
