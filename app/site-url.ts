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
 * Senza quella si prova a dedurlo da cio' che espone la piattaforma — Vercel e
 * Netlify lo passano da soli, quindi un'anteprima corretta si ottiene anche
 * senza configurare niente. Se non c'e' nessuno dei due si continua con
 * localhost, ma stampando un avviso: il build non si ferma (romperlo a chi si
 * limita a compilare in locale sarebbe peggio del problema), pero' nessuno
 * scopre fra un mese che ogni link condiviso puntava alla propria macchina.
 */
function deduci() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  /* Vercel e Netlify passano il dominio di produzione con nomi diversi. */
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
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
