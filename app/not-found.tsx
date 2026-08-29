import type { Metadata } from "next";
import Link from "next/link";
import { AdaptiveBrand } from "./adaptive-brand";
import { projects } from "./project-data";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export const metadata: Metadata = {
  title: "Questa pagina non c’è — Kore Studio",
  /* Un 404 non va indicizzato: e' una pagina che esiste per dire che una
     pagina non esiste. */
  robots: { index: false, follow: true },
};

/**
 * La pagina che risponde quando l'indirizzo non porta da nessuna parte.
 *
 * Next ne ha una di serie: fondo bianco, testo nero, nessuna via d'uscita.
 * Chi ci finisce ha gia' sbagliato qualcosa — un link vecchio, un refuso — e
 * lasciarlo davanti a una schermata muta e' il modo piu' rapido di fargli
 * chiudere la scheda.
 *
 * Qui ci sono la testata, il fondo pagina e soprattutto delle destinazioni
 * vere: le tre pagine del sito e l'ultimo progetto. Non un "torna alla home"
 * generico, che e' il vicolo cieco travestito da uscita.
 */
export default function NonTrovata() {
  const ultimo = projects[0];

  return (
    <main className="assente">
      <AdaptiveBrand />
      <SiteHeader />

      <section className="assente-corpo">
        {/* Il numero e' una filigrana, come le coordinate nel riquadro
            "dove": grande, ma dietro a cio' che conta. */}
        <span className="assente-numero" aria-hidden="true">404</span>

        <p className="kicker">Indirizzo senza pagina</p>
        <h1>
          Questa pagina<br /><em>non c’è.</em>
        </h1>
        <p className="assente-nota">
          Forse il link era vecchio, o c’è un refuso nell’indirizzo. Il resto del sito è al
          suo posto.
        </p>

        <nav className="assente-uscite" aria-label="Dove andare">
          <Link href="/">
            <span>01</span>
            <b>La home</b>
            <i>Chi siamo e cosa facciamo</i>
          </Link>
          <Link href="/progetti">
            <span>02</span>
            <b>I progetti</b>
            <i>{String(projects.length).padStart(2, "0")} lavori, uno per uno</i>
          </Link>
          <Link href="/idea">
            <span>03</span>
            <b>Raccontaci la tua idea</b>
            <i>Il brief, in quattro passi</i>
          </Link>
          <Link href={`/progetti/${ultimo.slug}`}>
            <span>04</span>
            <b>{ultimo.client}</b>
            <i>L’ultimo progetto pubblicato</i>
          </Link>
        </nav>
      </section>

      <SiteFooter />
    </main>
  );
}
