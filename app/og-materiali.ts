import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * I materiali con cui sono composte le anteprime dei link.
 *
 * Le immagini Open Graph si generano fuori dalla pagina, in un contesto che
 * non ha ne' il CSS del sito ne' i suoi caratteri: Didot e Anton non esistono
 * la' dentro, e caricarli vorrebbe dire portarsi dietro dei file solo per
 * questo. Quindi il peso lo porta il marchio, che e' gia' lettering disegnato,
 * e il testo attorno resta nel registro che il sito usa davvero per le
 * etichette — maiuscolo, spaziato, piccolo.
 *
 * I file si leggono dal disco e diventano data URI perche' chi compone
 * l'immagine non puo' andare a cercarsi una risorsa via rete: a quel punto
 * l'anteprima dipenderebbe dal fatto che il sito sia gia' online.
 */
async function comeDataUri(percorsoPubblico: string) {
  const dati = await readFile(join(process.cwd(), "public", percorsoPubblico));
  const tipo = percorsoPubblico.endsWith(".webp") ? "image/webp" : "image/png";
  return `data:${tipo};base64,${dati.toString("base64")}`;
}

export const ROSSO = "#fe4042";
export const PANNA = "#ffecc5";
export const INCHIOSTRO = "#17120d";

export const marchioPanna = () => comeDataUri("brand/kore-logo-cream.png");
export const marchioCorallo = () => comeDataUri("brand/kore-logo-coral.png");
export const materiale = comeDataUri;

/** La misura che tutte le anteprime devono avere. */
export const MISURA = { width: 1200, height: 630 };
export const TIPO = "image/png";
