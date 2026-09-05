import { ServiceShowcase } from "./service-showcase";
import { services } from "./services-data";

/**
 * I sei servizi, uno sotto l'altro.
 *
 * Prima erano un nastro orizzontale: la sezione si incollava in cima e la
 * pagina smetteva di scorrere mentre il nastro scivolava di lato. Misurato su
 * uno schermo da 900px di altezza, il blocco fermo era alto 8100px — otto
 * schermate in cui lo scorrimento non produceva movimento verticale, cioe' il
 * 46% dell'intera pagina. Da fuori non si legge come un effetto: si legge
 * come un sito che si e' piantato.
 *
 * Qui non c'e' nessun aggancio e nessun GSAP. Le stanze si alternano a
 * zig-zag, e il movimento arriva da dove deve: la filigrana col nome del
 * servizio scivola di lato mentre la stanza attraversa lo schermo. Il senso
 * orizzontale resta, ma e' lo scorrimento a produrlo — la pagina non si ferma
 * mai. Tutto in CSS, sulla linea temporale della stanza stessa.
 */
export function ServiziInSequenza({ title }: { title: string }) {
  return (
    <section className="servizi" id="servizi" aria-labelledby="servizi-titolo">
      <header className="servizi-intro">
        <p className="kicker">Competenze, non compartimenti</p>
        <h2 id="servizi-titolo">{title}</h2>
      </header>

      <ol className="servizi-stanze">
        {services.map((servizio, i) => (
          <li className="stanza" key={servizio.id}>
            {/* Il nome grande dietro e' la stessa filigrana di prima, ma una
                per stanza invece che una per sezione: cosi' ha un motivo per
                muoversi ed e' lei a portare il movimento orizzontale. */}
            <span className="stanza-filigrana" aria-hidden="true">{servizio.name}</span>

            <div className="stanza-testo">
              <span className="stanza-numero" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{servizio.name}</h3>
              <p>{servizio.note}</p>
              <ul>
                {servizio.dettagli.map((voce) => (
                  <li key={voce}>{voce}</li>
                ))}
              </ul>
            </div>

            <div className="stanza-visuale">
              <ServiceShowcase service={servizio} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
