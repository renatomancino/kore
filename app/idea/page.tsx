import type { Metadata } from "next";
import { AdaptiveBrand } from "../adaptive-brand";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { BriefForm } from "./brief-form";
import { RECAPITI, vociRecapito } from "../recapiti";

const TITOLO = "Hai un’idea? — Kore Studio";
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

/* Cosa succede dopo: sta scritto sulla pagina perche' la domanda vera di chi
   compila un modulo e' sempre la stessa — quanto aspetto, e poi? */
const DOPO = [
  { quando: "Entro due giorni", cosa: "Ti rispondiamo", nota: "Una persona, non un messaggio automatico. Anche solo per dire che non siamo noi." },
  { quando: "La settimana dopo", cosa: "Ci sentiamo mezz’ora", nota: "In chiamata o di persona, se sei a Torre del Greco o dintorni." },
  { quando: "Se ha senso", cosa: "Ti mandiamo una proposta", nota: "Con perimetro, tempi e costi. Nessun impegno prima di quel momento." },
];

export default function IdeaPage() {
  return (
    <main className="brief-pagina">
      <AdaptiveBrand />
      <SiteHeader />

      <section className="brief-apertura">
        <p className="kicker">Il prossimo progetto</p>
        <h1>Hai un’idea?<br /><em>Raccontacela bene.</em></h1>
        <div className="brief-apertura-sotto">
          <p>
            Non è un modulo di contatto: è il brief da cui partiamo davvero. Cinque minuti adesso
            valgono due chiamate risparmiate dopo.
          </p>
          <span>Quattro passi · 5 minuti</span>
        </div>
      </section>

      <section className="brief-corpo" aria-label="Il brief">
        <BriefForm />
      </section>

      <section className="brief-dopo" aria-labelledby="brief-dopo-titolo">
        <p className="kicker">Cosa succede dopo</p>
        <h2 id="brief-dopo-titolo">Nessuna sorpresa.</h2>
        <ol>
          {DOPO.map((tappa, i) => (
            <li key={tappa.cosa}>
              <span className="brief-dopo-numero">{String(i + 1).padStart(2, "0")}</span>
              <span className="brief-dopo-quando">{tappa.quando}</span>
              <h3>{tappa.cosa}</h3>
              <p>{tappa.nota}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Qui c'era un rimando a "/#contatti": una sezione della home che di
          recapiti non ne conteneva nessuno e rimandava a sua volta a questo
          modulo. Chi non voleva compilare girava in tondo. Ora i recapiti
          stanno qui, accanto al brief e non dentro: c'e' chi vuole essere
          guidato e chi vuole solo un indirizzo, e perdere i secondi per non
          aver scritto una mail sarebbe un peccato. */}
      <section className="recapiti" aria-labelledby="recapiti-titolo">
        <div className="recapiti-intro">
          <p className="kicker">Preferisci scrivere di tuo pugno?</p>
          <h2 id="recapiti-titolo">Scrivici e basta.</h2>
          <p>
            Il brief serve a noi per capire in fretta, non è un pedaggio. Se hai due righe da
            dire, dille come preferisci.
          </p>
        </div>

        <dl className="recapiti-elenco">
          {vociRecapito().map((voce) => (
            <div key={voce.chiave}>
              <dt>{voce.etichetta}</dt>
              <dd>
                {voce.href ? (
                  <a href={voce.href}>{voce.valore}</a>
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
