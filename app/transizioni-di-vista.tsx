"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Le transizioni fra le pagine, fatte con l'API del browser.
 *
 * Non con `experimental.viewTransition` di Next: quel flag abilita il
 * componente <ViewTransition> di React, che vive solo nel canale
 * sperimentale — qui React e' 19.2 stabile e non lo esporta. Portare React
 * sperimentale su un sito vivo per un'animazione non e' un buon cambio.
 *
 * `document.startViewTransition` vuole una funzione che aggiorni il DOM e
 * finisca: il router di Next invece naviga e basta, senza dire quando ha
 * finito. Quindi la promessa si chiude da fuori, quando il percorso cambia
 * davvero — ed e' per questo che questo componente sta nel layout e non nella
 * pagina: la pagina che ha ricevuto il clic viene smontata durante la
 * navigazione, e con lei sparirebbe chi deve chiudere la promessa.
 */
export function TransizioniDiVista() {
  const router = useRouter();
  const percorso = usePathname();
  const chiudi = useRef<(() => void) | null>(null);

  /* La pagina nuova e' montata: si puo' lasciare che il browser interpoli. */
  useEffect(() => {
    chiudi.current?.();
    chiudi.current = null;
  }, [percorso]);

  useEffect(() => {
    const suClic = (evento: MouseEvent) => {
      /* Tutto cio' che non e' un clic semplice non si tocca: tasto centrale,
         cmd/ctrl per la scheda nuova, shift per la finestra. Rubarli sarebbe
         il modo classico di rompere un sito per un'animazione. */
      if (evento.defaultPrevented || evento.button !== 0) return;
      if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return;

      const link = (evento.target as Element | null)?.closest?.<HTMLAnchorElement>("a[data-transizione]");
      if (!link) return;

      const destinazione = link.getAttribute("href");
      if (!destinazione?.startsWith("/")) return;
      if (!document.startViewTransition) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      evento.preventDefault();
      document.startViewTransition(
        () =>
          new Promise<void>((risolvi) => {
            chiudi.current = risolvi;
            router.push(destinazione);
            /* Rete di sicurezza: finche' la promessa non si chiude il browser
               tiene a schermo l'istantanea della pagina vecchia. Se la
               navigazione non arriva — rete lenta, errore — senza questo si
               resterebbe davanti a un fermo immagine. */
            setTimeout(() => {
              chiudi.current?.();
              chiudi.current = null;
            }, 1500);
          }),
      );
    };

    /* In cattura, non in risalita: <Link> di Next annulla il clic nel proprio
       gestore, e ascoltando dopo si troverebbe sempre un evento gia' annullato
       e non si partirebbe mai. Arrivando prima, si annulla noi — e Link, che
       controlla `defaultPrevented`, si fa da parte. */
    document.addEventListener("click", suClic, true);
    return () => document.removeEventListener("click", suClic, true);
  }, [router]);

  return null;
}
