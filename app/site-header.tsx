import { SiteBrand } from "./site-brand";
import { SiteMenu } from "./site-menu";

/**
 * La testata del sito: marchio a sinistra, menu a destra, e nient'altro.
 *
 * Ce n'erano quattro versioni — fissa sulla home, assoluta sull'archivio, nel
 * flusso sul dettaglio e sul brief — con imbottiture diverse, quindi i due
 * comandi cambiavano posto da una pagina all'altra. Ora e' una sola, fissa
 * ovunque: il menu resta raggiungibile anche a meta' pagina, e il marchio si
 * allinea al margine del contenuto che ha sotto.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <SiteBrand />
      <SiteMenu />
    </header>
  );
}
