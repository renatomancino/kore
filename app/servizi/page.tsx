import type { Metadata } from "next";
import Link from "next/link";
import { AdaptiveBrand } from "../adaptive-brand";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { AttiDeiServizi } from "./atti";
import { serviziPagina } from "./servizi-pagina";
import { Freccia } from "../freccia";

const TITOLO = "Servizi — Kore Studio";
const DESCRIZIONE =
  "Branding, social, video, web, advertising ed eventi: sei mestieri che Kore tiene sotto una regia sola.";

export const metadata: Metadata = {
  title: TITOLO,
  description: DESCRIZIONE,
  /* Come su /idea e /progetti: `openGraph` non si fonde con quello del
     layout, quindi senza queste righe la pagina si presenterebbe col titolo
     della home. */
  openGraph: { title: TITOLO, description: DESCRIZIONE, url: "/servizi" },
  twitter: { card: "summary_large_image", title: TITOLO, description: DESCRIZIONE },
};

export default function PaginaServizi() {
  return (
    <main className="pagina-servizi">
      <AdaptiveBrand />
      <SiteHeader />

      <section className="servizi-apertura">
        <p className="kicker">Prima analizziamo. Poi comunichiamo.</p>
        <h1>Sei mestieri.<br /><em>Una regia sola.</em></h1>
        <p className="servizi-apertura-nota">
          Non un catalogo di voci separate: le competenze si chiamano fra loro, e quale
          serva davvero lo decide il progetto.
        </p>

        {/* Il sommario e' anche un indice: sei ancore verso i sei atti. */}
        <nav className="servizi-sommario" aria-label="I sei servizi">
          {serviziPagina.map((servizio, i) => (
            <a href={`#${servizio.id}`} key={servizio.id}>
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              {servizio.name}
            </a>
          ))}
        </nav>
      </section>

      <AttiDeiServizi servizi={serviziPagina} />

      <section className="servizi-chiusura">
        <p className="kicker">Il prossimo progetto</p>
        <h2>Non sai da quale<br /><em>cominciare?</em></h2>
        <p>Raccontaci il problema: la competenza giusta la scegliamo noi.</p>
        <Link className="giant-link" href="/idea" data-transizione="">Raccontaci di cosa ti occupi. <span aria-hidden="true"><Freccia /></span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
