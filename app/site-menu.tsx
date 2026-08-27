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
 * Le ancore sono assolute (`/#servizi`): dalle altre pagine quelle sezioni non
 * esistono, quindi portano prima alla home e poi al punto giusto.
 */
export function SiteMenu() {
  const [aperto, setAperto] = useState(false);
  const tasto = useRef<HTMLButtonElement>(null);

  /* Un pannello che copre lo schermo si chiude con Esc: e' la scorciatoia che
     tutti provano per prima. E il fuoco torna al tasto che l'ha aperto,
     altrimenti resta appeso a un pannello che non c'e' piu'. */
  useEffect(() => {
    if (!aperto) return;
    const suTasto = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setAperto(false);
      tasto.current?.focus();
    };
    addEventListener("keydown", suTasto);
    /* Con il pannello aperto la pagina sotto non deve scorrere, altrimenti si
       torna indietro e ci si ritrova altrove senza averlo chiesto. */
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", suTasto);
      document.body.style.overflow = "";
    };
  }, [aperto]);

  const chiudi = () => setAperto(false);

  return (
    <>
      <button
        ref={tasto}
        className="menu-toggle"
        type="button"
        aria-expanded={aperto}
        aria-controls="site-menu"
        onClick={() => setAperto((v) => !v)}
      >
        <span>{aperto ? "Chiudi" : "Menu"}</span>
        <span className="menu-dot" aria-hidden="true" />
      </button>

      <nav className={`menu-panel ${aperto ? "is-open" : ""}`} id="site-menu" aria-hidden={!aperto}>
        <div className="menu-column">
          <p>Cosa facciamo</p>
          {services.map((voce) => (
            <Link href="/#servizi" key={voce.name} onClick={chiudi}>{voce.name}</Link>
          ))}
        </div>
        <div className="menu-column">
          <p>Kore</p>
          <Link href="/" onClick={chiudi}>Home</Link>
          <Link href="/progetti" onClick={chiudi}>Progetti</Link>
          <Link href="/#mondo" onClick={chiudi}>Il nostro mondo</Link>
          <Link href="/#numeri" onClick={chiudi}>Numeri</Link>
          <Link href="/#partner" onClick={chiudi}>Partner</Link>
          <Link className="menu-contact" href="/idea" onClick={chiudi}>Raccontaci la tua idea ↗</Link>
        </div>
      </nav>
    </>
  );
}
