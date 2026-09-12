import type { Metadata } from "next";
import Link from "next/link";
import { AdaptiveBrand } from "../adaptive-brand";
import { AGGIORNATA_IL, AZIENDA, MESI_CONSERVAZIONE, sedePerEsteso } from "../azienda";
import { RECAPITI } from "../recapiti";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";

const TITOLO = "Privacy — Kore Studio";
const DESCRIZIONE =
  "Quali dati raccoglie questo sito, perché, per quanto tempo restano e come chiederne la cancellazione.";

export const metadata: Metadata = {
  title: TITOLO,
  description: DESCRIZIONE,
  openGraph: { title: TITOLO, description: DESCRIZIONE, url: "/privacy" },
  twitter: { card: "summary_large_image", title: TITOLO, description: DESCRIZIONE },
};

/**
 * L'informativa privacy.
 *
 * È scritta in italiano corrente e non in legalese, perché il punto di questa
 * pagina è che chi lascia i propri dati capisca dove finiscono: una pagina
 * illeggibile rispetta l'obbligo e tradisce il motivo per cui esiste.
 *
 * Tutto quello che dice è verificato sul codice, non promesso: il modulo apre
 * il client di posta di chi scrive invece di spedire a un server nostro, il
 * sito non ha cookie né statistiche, e l'unica chiamata esterna è quella dei
 * caratteri. Se una di queste cose cambia, questa pagina va cambiata con lei.
 */
export default function PaginaPrivacy() {
  const email = RECAPITI.email;

  return (
    <main className="pagina-privacy">
      <AdaptiveBrand />
      <SiteHeader />

      <section className="privacy-apertura">
        <p className="kicker">Informativa sul trattamento dei dati</p>
        <h1>Dove finisce<br /><em>quello che ci scrivi.</em></h1>
        <p className="privacy-occhiello">
          Questo sito raccoglie dati personali in un punto solo: il modulo con cui ci
          racconti un progetto. Qui sotto c&rsquo;è che cosa ci arriva, perché, per quanto
          tempo resta e come farlo cancellare. Aggiornata il {AGGIORNATA_IL}.
        </p>
      </section>

      <div className="privacy-testo">
        <section>
          <h2>Chi tratta i tuoi dati</h2>
          <p>
            {AZIENDA.ragioneSociale}, {sedePerEsteso()}, partita IVA {AZIENDA.partitaIva}.
          </p>
          <p>
            Per qualsiasi richiesta sui tuoi dati &mdash; sapere quali abbiamo, correggerli,
            cancellarli &mdash; scrivi a <a href={`mailto:${email}`}>{email}</a>. Risponde una
            persona, non un modulo automatico, e la legge ci dà un mese di tempo per farlo.
          </p>
        </section>

        <section>
          <h2>Quali dati raccogliamo, e quando</h2>
          <p>
            Solo quelli che scrivi tu nel <Link href="/idea">modulo del brief</Link>: nome,
            email, telefono, azienda, il tipo di lavoro che ti serve, l&rsquo;obiettivo, il
            racconto del progetto, eventuali riferimenti, budget e tempi, e come ci hai
            trovati. Niente di più, e niente che tu non abbia digitato.
          </p>
          <p className="privacy-nota">
            Una cosa che vale la pena sapere, perché non è come funziona sulla maggior
            parte dei siti: <b>quel modulo non manda niente a un nostro server</b>. Quando
            premi invio si apre il tuo programma di posta con il brief già scritto dentro, e
            sei tu a spedirlo. I tuoi dati arrivano a noi come una normale email, e prima di
            quel momento non li abbiamo mai avuti.
          </p>
          <p>
            Mentre lo compili, il modulo tiene una copia della bozza <b>sul tuo dispositivo</b>,
            così se chiudi la pagina non perdi quello che avevi scritto. Quella copia resta
            dove sei tu: non la vediamo e non ci arriva. Sparisce quando spedisci il brief, e
            puoi cancellarla svuotando i dati del sito dal tuo browser.
          </p>
          <p>
            Come ogni sito, il server che lo ospita registra per motivi tecnici e di sicurezza
            l&rsquo;indirizzo IP e il tipo di browser di chi visita. Sono registri automatici che
            non usiamo per riconoscere nessuno.
          </p>
        </section>

        <section>
          <h2>Perché li usiamo</h2>
          <p>
            <b>Per risponderti.</b> Se ci chiedi un preventivo dobbiamo poterti ricontattare e
            preparare la proposta: è il motivo per cui ci hai scritto, e senza quei dati non
            possiamo farlo.
          </p>
          <p>
            {/* Lo spazio va scritto cosi': un testo JSX che continua su piu' righe
                perde lo spazio iniziale dopo un tag in linea, e "tu." e "Nel" si
                attaccano. Si vede solo nella pagina costruita, non nel sorgente. */}
            <b>Per mandarti novità, ma solo se ce lo dici tu.</b>{" "}
            Nel modulo c&rsquo;è una seconda
            casella, separata e facoltativa, con scritto <i>&laquo;Voglio ricevere da Kore Studio
            novità, iniziative e proposte commerciali via email&raquo;</i>. Se non la spunti ricevi
            comunque la risposta al tuo progetto e non ti scriviamo per altro. Se la spunti
            puoi cambiare idea quando vuoi, scrivendo all&rsquo;indirizzo qui sopra: basta una riga.
          </p>
        </section>

        <section>
          <h2>Per quanto tempo restano</h2>
          <p>
            Le richieste arrivate dal sito le teniamo <b>{MESI_CONSERVAZIONE}&nbsp;mesi dall&rsquo;ultima
            volta che ci siamo sentiti</b>, poi le cancelliamo. Se nel frattempo diventi cliente,
            i documenti del lavoro seguono i tempi che la legge impone alla contabilità.
          </p>
          <p>
            L&rsquo;indirizzo di chi ha detto sì alle novità resta finché non chiede di uscire: è
            una cosa separata dal brief, e si interrompe quando vuoi tu.
          </p>
        </section>

        <section>
          <h2>Chi altro li vede</h2>
          <p>
            Le richieste che arrivano dal sito <b>le legge solo il titolare</b>. Non vendiamo
            dati, non li scambiamo e non li passiamo a nessuno per farci pubblicità.
          </p>
          <p>
            Ci sono però tre aziende che, facendo funzionare il sito e la posta, toccano
            tecnicamente quei dati. Le nominiamo perché è giusto sapere chi sono:
          </p>
          <ul className="privacy-elenco">
            <li>
              <b>Aruba</b> &mdash; tiene la casella di posta su cui arrivano i brief.
            </li>
            <li>
              <b>Netlify</b> &mdash; ospita il sito e ne conserva i registri tecnici.
            </li>
            <li>
              <b>Adobe</b> &mdash; fornisce i caratteri tipografici del sito, che il tuo browser
              scarica dai suoi server: per farlo Adobe riceve il tuo indirizzo IP, anche negli
              Stati Uniti. Non serve a riconoscerti e non lascia cookie, ma è una connessione
              verso l&rsquo;esterno e preferiamo dirlo.
            </li>
          </ul>
        </section>

        <section>
          <h2>Cookie: non ce ne sono</h2>
          <p>
            Questo sito <b>non usa cookie</b>, non ha statistiche di visita, non ha pixel di
            Facebook o Google e non traccia nessuno. Per questo non trovi il banner che ti
            chiede di accettarli: non ci sarebbe niente da accettare.
          </p>
          <p>
            L&rsquo;unica cosa che il sito lascia sul tuo dispositivo è la bozza del modulo di cui
            sopra, che serve a non farti riscrivere tutto e resta a casa tua.
          </p>
        </section>

        <section>
          <h2>Cosa puoi chiederci</h2>
          <p>
            Sui tuoi dati hai dei diritti, e per esercitarli basta una email a{" "}
            <a href={`mailto:${email}`}>{email}</a>. Puoi chiedere di:
          </p>
          <ul className="privacy-elenco">
            <li>sapere quali dati abbiamo su di te e averne una copia;</li>
            <li>correggerli, se sono sbagliati o incompleti;</li>
            <li>cancellarli;</li>
            <li>limitarne l&rsquo;uso, o opporti al fatto che li usiamo;</li>
            <li>ricevere in un file quelli che ci hai dato tu, per portarli altrove;</li>
            <li>ritirare il consenso alle novità, senza che questo tocchi il resto.</li>
          </ul>
          <p>
            Se pensi che stiamo sbagliando e non riesci a risolverla con noi, puoi rivolgerti al
            Garante per la protezione dei dati personali (<span className="privacy-url">www.garanteprivacy.it</span>).
          </p>
        </section>

        <section>
          <h2>Se questa pagina cambia</h2>
          <p>
            La data in cima dice l&rsquo;ultima volta che è cambiata. Se un domani il sito
            comincerà a raccogliere qualcosa di diverso &mdash; statistiche, un modulo che spedisce
            da solo, un servizio esterno in più &mdash; questa pagina cambierà prima, non dopo.
          </p>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
