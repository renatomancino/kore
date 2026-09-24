/**
 * L'indirizzo a cui il sito risponde.
 *
 * Serve alle anteprime dei link: i tag Open Graph vogliono indirizzi assoluti,
 * perche' chi costruisce l'anteprima (WhatsApp, LinkedIn) legge la pagina da
 * fuori e un percorso relativo non gli dice a quale dominio appartiene.
 *
 * Il dominio ora c'e': il sito vive su Aruba a www.korestudioadv.it, e il
 * build (statico, fatto su una macchina qualsiasi) non ha una piattaforma che
 * glielo passi. Quindi e' scritto qui. NEXT_PUBLIC_SITE_URL, se impostata,
 * vince ancora — serve anche a dire che il sito e' pubblicato (vedi sotto).
 */
const DOMINIO = "https://www.korestudioadv.it";

function deduci() {
  return process.env.NEXT_PUBLIC_SITE_URL || DOMINIO;
}

export const indirizzoSito = deduci();

/**
 * Se il sito e' pubblicato per davvero.
 *
 * Il segnale non e' "sto girando in produzione" — anche un'anteprima su un
 * sottodominio .netlify.app gira in produzione — ma "qualcuno ha dichiarato
 * a quale indirizzo questo sito vive". Finche' quella variabile non c'e',
 * quello che e' online e' un cantiere, e va tenuto fuori dai motori di
 * ricerca: un sito incompleto indicizzato col nome del cliente si toglie
 * dalle ricerche molto piu' lentamente di quanto ci sia finito.
 *
 * Il giorno che si imposta NEXT_PUBLIC_SITE_URL col dominio vero,
 * l'indicizzazione si riaccende da sola. Nessuno deve ricordarsene.
 */
export const sitoPubblicato = Boolean(process.env.NEXT_PUBLIC_SITE_URL);
