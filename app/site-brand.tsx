"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Il marchio in testata, uno solo per tutto il sito.
 *
 * Ce n'erano tre: quello della home, che prende il colore dallo sfondo; quello
 * dell'archivio, appoggiato su una targa color panna con ombra; e quello del
 * brief, di un'altra misura ancora. Tre marchi diversi sono tre marchi.
 *
 * Le due tinte sono sovrapposte e a scoprirle e' AdaptiveBrand: qui c'e' solo
 * la struttura, cosi' la stessa testata funziona su una pagina rossa come su
 * una chiara. Il testo alternativo sta sul link, quindi le immagini non ne
 * hanno bisogno — lo direbbero due volte.
 */
export function SiteBrand() {
  const percorso = usePathname();

  /* Sulla home il link porta a una pagina in cui si e' gia': Next non
     rinaviga, quindi il clic non faceva niente e il marchio sembrava morto.
     Li' il gesto vale "torna in cima", che e' cio' che uno si aspetta.
     Altrove il Link naviga da solo e qui non si tocca nulla — cosi' il tasto
     centrale e "apri in una nuova scheda" continuano a funzionare. */
  const suClic = (evento: React.MouseEvent) => {
    if (percorso !== "/") return;
    evento.preventDefault();
    const fermo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: fermo ? "auto" : "smooth" });
  };

  return (
    <Link className="header-brand" href="/" aria-label="Kore Studio, home" onClick={suClic}>
      <img className="brand-panna" src="/brand/kore-logo-cream.png" alt="" />
      <img className="brand-corallo" src="/brand/kore-logo-coral.png" alt="" />
    </Link>
  );
}
