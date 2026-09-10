import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

/* Next deduce la radice del progetto cercando il lockfile piu' vicino. Se
   sulla macchina di chi sviluppa ne esiste uno piu' in alto — un
   `package-lock.json` orfano nella cartella home, per dirne una — la radice
   diventa quella, e in sviluppo il browser continua a ricevere i pezzi vecchi
   dopo ogni modifica: si perde tempo a cercare un bug che e' solo una cache.
   Dirla esplicitamente toglie l'ambiguita' e l'avviso "multiple lockfiles". */
const radice = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: { root: radice },
};

export default nextConfig;
