import type { Metadata } from "next";
import { AdaptiveBrand } from "../adaptive-brand";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { BriefForm } from "./brief-form";
import { RECAPITI, vociRecapito } from "../recapiti";

const TITOLO = "Da dove iniziamo? — Kore Studio";
const DESCRIZIONE =
  "Raccontaci il progetto: un brief guidato in quattro passi, con budget e tempi, per arrivare alla prima chiamata già sapendo di cosa parlare.";

export const metadata: Metadata = {
  title: TITOLO,
  description: DESCRIZIONE,
  /* Ripetuti anche qui: `openGraph` non si fonde con quello del layout, o lo
     si dichiara o si eredita il suo per intero — e l'anteprima del brief
     diceva "Kore — Diamo forma alle idee". */
  openGraph: { title: TITOLO, description: DESCRIZIONE, url: "/idea" },
  twitter: { card: "summary_large_image", title: TITOLO, description: DESCRIZIONE },
};

export default function IdeaPage() {
  return (
    <main className="brief-pagina">
      <AdaptiveBrand />
      <SiteHeader />

      <section className="brief-apertura">
        <p className="kicker">Il prossimo progetto</p>
        <h1>Da dove iniziamo?<br /><em>Raccontacelo bene.</em></h1>
        <div className="brief-apertura-sotto">
          <p>Il brief da cui partiamo: ci serve per capire subito come aiutarti.</p>
          <span>Quattro passi · 5 minuti</span>
        </div>
      </section>

      <section className="brief-corpo" aria-label="Il brief">
        <BriefForm />
      </section>

      {/* Qui c'era un rimando a "/#contatti": una sezione della home che di
          recapiti non ne conteneva nessuno e rimandava a sua volta a questo
          modulo. Chi non voleva compilare girava in tondo. Ora i recapiti
          stanno qui, accanto al brief e non dentro: c'e' chi vuole essere
          guidato e chi vuole solo un indirizzo, e perdere i secondi per non
          aver scritto una mail sarebbe un peccato. */}
      <section className="recapiti" aria-labelledby="recapiti-titolo">
        <div className="recapiti-intro">
          <p className="kicker">Vuoi andare dritto al punto?</p>
          <h2 id="recapiti-titolo">Scrivici e basta.</h2>
        </div>

        <dl className="recapiti-elenco">
          {vociRecapito().map((voce) => (
            <div key={voce.chiave}>
              <dt>{voce.etichetta}</dt>
              <dd>
                {voce.href ? (
                  <a href={voce.href} {...(voce.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                    {voce.valore}
                  </a>
                ) : (
                  /* Il buco si dichiara invece di riempirlo con un recapito
                     verosimile: un indirizzo inventato perde le richieste
                     senza che nessuno se ne accorga. */
                  <span className="recapito-mancante">Da inserire</span>
                )}
              </dd>
            </div>
          ))}
          <div>
            <dt>Dove siamo</dt>
            <dd>{RECAPITI.luogo}</dd>
          </div>
        </dl>
      </section>

      <SiteFooter />
    </main>
  );
}
