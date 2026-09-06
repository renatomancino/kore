"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { services } from "./services-data";

/**
 * Il menu del sito: il tasto e il pannello, insieme.
 *
 * Stavano dentro alla home, quindi da /progetti e dalle pagine di progetto non
 * c'era menu: si navigava solo col tasto indietro. Ora sono un pezzo solo,
 * usato ovunque.
 *
 * Le ancore sono assolute (`/#mondo`): dalle altre pagine quelle sezioni non
 * esistono, quindi portano prima alla home e poi al punto giusto.
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
      <button className="menu-toggle" type="button" popoverTarget="site-menu">
        <span>{aperto ? "Chiudi" : "Menu"}</span>
        <span className="menu-dot" aria-hidden="true" />
      </button>

      <nav className="menu-panel" id="site-menu" popover="auto" ref={pannello}>
        {/* Il pannello sta nel top layer, quindi copre il tasto della testata:
            la chiusura vive qui dentro, nello stesso punto dello schermo. */}
        <button className="menu-toggle menu-chiudi" type="button" popoverTarget="site-menu">
          <span>Chiudi</span>
          <span className="menu-dot" aria-hidden="true" />
        </button>
        <div className="menu-column">
          <p>Cosa facciamo</p>
          {services.map((voce) => (
            <Link href="/servizi" key={voce.name} onClick={chiudi}>{voce.name}</Link>
          ))}
        </div>
        <div className="menu-column">
          <p>Kore</p>
          <Link href="/" onClick={chiudi}>Home</Link>
          <Link href="/progetti" onClick={chiudi}>Progetti</Link>
          <Link href="/#mondo" onClick={chiudi}>Il nostro mondo</Link>
          <Link href="/#partner" onClick={chiudi}>Partner</Link>
          <Link className="menu-contact" href="/idea" onClick={chiudi}>Raccontaci la tua idea ↗</Link>
        </div>
      </nav>
    </>
  );
}
