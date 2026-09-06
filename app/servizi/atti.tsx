import Link from "next/link";
import { projects, type Project } from "../project-data";
import { ServiceShowcase, type Service } from "../service-showcase";

/**
 * I progetti in cui un servizio e' stato davvero usato.
 *
 * La corrispondenza e' dichiarata qui e non dedotta a naso: la categoria di un
 * progetto e' una stringa scritta a mano ("Branding · Web"), e cercarci dentro
 * il nome del servizio funziona per cinque casi su sei e fallisce sul sesto.
 * Video non compare in nessuna categoria — nessuno ha scritto "Video" li'
 * dentro — ma il materiale video esiste, ed e' quello a dire dove il servizio
 * e' stato fatto: si guardano percio' i filmati in galleria.
 *
 * Meglio una tabella di sei righe che si legge, che una regola furba che un
 * domani mette un progetto sotto il servizio sbagliato senza che nessuno se
 * ne accorga.
 */
const DOVE: Record<Service["id"], (progetto: Project) => boolean> = {
  branding: (p) => p.category.includes("Branding"),
  social: (p) => p.category.includes("Social") || p.services.join(" ").includes("Social"),
  video: (p) => Boolean(p.gallery?.some((pezzo) => pezzo.kind === "video")),
  web: (p) => p.category.includes("Web"),
  advertising: (p) => p.category.includes("Advertising"),
  eventi: (p) => p.category.includes("Eventi") || p.services.join(" ").includes("eventi"),
};

/* Il colore di ogni atto. Sei stanze che si alternano chiaro e scuro, e il
   corallo tenuto per l'ultima: la testata misura cio' che ha sotto e cambia
   tinta a ogni passaggio, quindi la sequenza si sente scorrendo. */
const TONI = ["chiaro", "scuro", "chiaro", "scuro", "chiaro", "corallo"] as const;

export function AttiDeiServizi({ servizi }: { servizi: Service[] }) {
  return (
    <div className="atti">
      {servizi.map((servizio, i) => {
        const lavori = projects.filter(DOVE[servizio.id]);
        return (
          <section className={`atto atto-${TONI[i]}`} id={servizio.id} key={servizio.id} aria-labelledby={`atto-${servizio.id}`}>
            <span className="atto-numero" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>

            <div className="atto-titolo">
              <h2 id={`atto-${servizio.id}`}>{servizio.name}</h2>
              <p>{servizio.note}</p>
              {/* Lo spazio del racconto. Segnato a vista e non riempito con
                  parole di comodo: un testo finto che sembra vero e' peggio
                  di un buco dichiarato, perche' nessuno si accorge che manca
                  e finisce online. */}
              <p className="da-scrivere">
                <b>Da scrivere</b> — il racconto di {servizio.name.toLowerCase()}: da dove parte un
                progetto, cosa cambia per il cliente, come si capisce che ha funzionato.
              </p>
            </div>

            {/* La scheda scavalca il titolo: e' il gesto da catalogo stampato,
                dove l'immagine entra dentro alla parola invece di stargli
                educatamente accanto. */}
            <div className="atto-scheda">
              <ServiceShowcase service={servizio} />
            </div>

            {/* Etichetta ed elenco in un contenitore solo: l'etichetta da
                sola non aveva un'area nella griglia, quindi veniva collocata
                in automatico e finiva in coda all'atto — sotto all'elenco che
                doveva presentare. */}
            <div className="atto-comprende">
              <p className="atto-etichetta">Cosa comprende</p>
              <ol className="atto-voci">
                {servizio.dettagli.map((voce, n) => (
                  <li key={voce}><span aria-hidden="true">{String(n + 1).padStart(2, "0")}</span>{voce}</li>
                ))}
              </ol>
            </div>

            <div className="atto-consegne">
              <p className="atto-etichetta">Cosa si porta a casa</p>
              <p className="da-scrivere"><b>Da scrivere</b> — l’elenco dei materiali consegnati.</p>
            </div>

            {lavori.length > 0 && (
              <div className="atto-lavori">
                <p className="kicker">Dove l’abbiamo fatto</p>
                <ul>
                  {lavori.map((lavoro) => (
                    <li key={lavoro.slug}>
                      <Link href={`/progetti#${lavoro.slug}`}>
                        <img src={lavoro.cover} alt="" loading="lazy" />
                        <strong>{lavoro.client}</strong>
                        <i aria-hidden="true">↗</i>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
