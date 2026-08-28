import Link from "next/link";
import { projects } from "./project-data";

/**
 * I progetti come indice: numero, nome, categoria, marchio.
 *
 * Prima erano tre riquadri alti in tutto 2026px — due schermate e mezza per
 * tre loghi — sotto un titolo che dice "Il lavoro parla".
 *
 * Il marchio sta nella riga e non in un pannello che insegue il puntatore:
 * cosi' si vede senza doverlo cercare, si vede tutto insieme invece che uno
 * per volta, e si vede anche da telefono, dove un puntatore non c'e'.
 *
 * La targhetta sotto ogni marchio segue il `tone` gia' dichiarato nei dati.
 * Non e' un vezzo: quattro di questi loghi sono a inchiostro scuro e due
 * (Isola, Osteria) sono testo bianco. Su un fondo solo, meta' sparirebbero.
 *
 * Nessuno stato, quindi nessun "use client": e' una lista.
 */
export function IndiceProgetti() {
  return (
    <ol className="indice">
      {projects.map((progetto, i) => (
        <li key={progetto.slug}>
          <Link href={`/progetti/${progetto.slug}`} data-transizione>
            <span className="indice-numero">{String(i + 1).padStart(2, "0")}</span>
            <span className="indice-cliente">{progetto.client}</span>
            <span className="indice-categoria">{progetto.category}</span>
            <span className={`indice-marchio indice-marchio-${progetto.tone}`}>
              <img src={progetto.cover} alt="" loading="lazy" />
            </span>
            <span className="indice-freccia" aria-hidden="true">↗</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
