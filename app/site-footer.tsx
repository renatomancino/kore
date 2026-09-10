import Link from "next/link";
import { vociRecapito } from "./recapiti";

/**
 * Il footer del sito, uno solo per tutte le pagine.
 *
 * Prima ce n'erano tre situazioni diverse: la home aveva questo, l'archivio
 * progetti una versione ridotta col solo logo, e la pagina di dettaglio di un
 * progetto non ne aveva nessuno — quindi da lì non si tornava da nessuna parte.
 *
 * Le ancore sono assolute (`/#mondo`) perche' devono funzionare anche dalle
 * pagine dell'archivio, dove quelle sezioni non esistono: da lì portano alla
 * home e poi al punto giusto. E sono <Link>, non <a>: per Next una navigazione
 * interna con un <a> e' un errore, non un avviso.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-particles" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span className={`footer-particle footer-particle-${index + 1}`} key={index} />
        ))}
        {/* Il corallo sta qui e non nell'hero: ritagliato dall'angolo, dietro
            a tutto e con le perle che gli passano davanti, da' profondita' al
            fondo pagina invece di occupare spazio in apertura. */}
        <img className="footer-coral" src="/images/corallo.webp" alt="" />
        <img className="footer-coral footer-coral-alto" src="/images/corallo.webp" alt="" />
      </div>

      <div className="footer-topline">
        <div className="footer-positioning">
          <div className="footer-official-logo">
            <img src="/brand/kore-logo-cream.png" alt="Kore Studio - marketing e comunicazione" />
          </div>
          <p>Strategia, immagine<br />e idee vive.</p>
          <span>Creative agency · Torre del Greco / ovunque</span>
        </div>

        <div className="footer-directory">
          <div>
            <p>Studio</p>
            <span>Torre del Greco — Napoli</span>
            <span>Campania — Italia</span>
          </div>
          <nav aria-label="Navigazione footer">
            <p>Esplora</p>
            <Link href="/servizi">Servizi</Link>
            <Link href="/progetti">Progetti</Link>
            <Link href="/#metodo">Metodo</Link>
            <Link href="/#mondo">Agenzia</Link>
          </nav>
          {/* Le tre voci portavano tutte a "/#contatti", una sezione che di
              recapiti non ne aveva. Ora o sono il recapito vero, o dicono che
              manca — e restano testo, come nel blocco su /idea: un link
              "Telefono · da inserire" che porta al modulo del brief promette
              un numero e consegna un questionario. */}
          <div>
            <p>Contatti</p>
            {vociRecapito().map((voce) =>
              voce.href ? (
                <a href={voce.href} key={voce.chiave}>{voce.etichetta} · {voce.valore}</a>
              ) : (
                <span className="footer-mancante" key={voce.chiave}>{voce.etichetta} · da inserire</span>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="footer-legal">
        <span>Privacy · Cookie · P.IVA</span>
        <span>© {new Date().getFullYear()} Kore Studio</span>
      </div>
    </footer>
  );
}
