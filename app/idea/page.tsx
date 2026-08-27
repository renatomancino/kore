import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../site-footer";
import { SiteMenu } from "../site-menu";
import { BriefForm } from "./brief-form";

export const metadata: Metadata = {
  title: "Hai un’idea? — Kore Studio",
  description:
    "Raccontaci il progetto: un brief guidato in quattro passi, con budget e tempi, per arrivare alla prima chiamata già sapendo di cosa parlare.",
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
      <header className="brief-testata">
        <Link className="brief-marchio" href="/" aria-label="Kore Studio, torna alla home">
          <img src="/brand/kore-logo-coral.png" alt="Kore Studio" />
        </Link>
        <SiteMenu />
      </header>

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

      <section className="brief-scorciatoia">
        <p>Preferisci scrivere di tuo pugno?</p>
        <Link href="/#contatti">Vai ai contatti <span aria-hidden="true">↗</span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
