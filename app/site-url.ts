/**
 * L'indirizzo a cui il sito risponde.
 *
 * Serve alle anteprime dei link: i tag Open Graph vogliono indirizzi assoluti,
 * perche' chi costruisce l'anteprima (WhatsApp, LinkedIn) legge la pagina da
 * fuori e un percorso relativo non gli dice a quale dominio appartiene.
 *
 * Ne' il dominio ne' l'hosting sono decisi, quindi qui non c'e' nessun
 * indirizzo scritto a mano. La variabile da impostare e' UNA, e vale ovunque:
 *
 *     NEXT_PUBLIC_SITE_URL=https://kore.it
 *
 * Senza quella si prova a dedurlo da cio' che espone la piattaforma: Netlify
 * passa il dominio da sola, quindi un'anteprima corretta si ottiene anche
 * senza configurare niente. Se non arriva nemmeno quello si continua con
 * localhost, ma stampando un avviso: il build non si ferma (romperlo a chi si
 * limita a compilare in locale sarebbe peggio del problema), pero' nessuno
 * scopre fra un mese che ogni link condiviso puntava alla propria macchina.
 */
function deduci() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  /* `URL` e' il dominio di produzione che Netlify espone durante il build. */
  if (process.env.URL?.startsWith("http")) return process.env.URL;

  if (process.env.NODE_ENV === "production") {
    console.warn(
      "\n[kore] Nessun indirizzo del sito configurato: le anteprime dei link " +
        "punteranno a localhost e non si vedranno.\n" +
        "        Imposta NEXT_PUBLIC_SITE_URL (per esempio https://kore.it).\n",
    );
  }
  return "http://localhost:3000";
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
