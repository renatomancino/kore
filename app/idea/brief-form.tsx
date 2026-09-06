"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BUDGET, CANALI, MINIMO_PROGETTO, OBIETTIVI, SERVIZI, TEMPI, type Voce } from "./brief-data";
import { RECAPITI } from "../recapiti";

/* L'indirizzo a cui arriva il brief, dalla fonte unica dei recapiti: prima
   stava qui in una costante sua, e sarebbe stato il terzo posto in cui
   scrivere la stessa mail il giorno in cui arriva.
   Finche' e' vuoto il modulo non finge di spedire: mette il brief negli
   appunti e lo dice. Meglio un passaggio in piu' che una richiesta persa in
   un mailto senza destinatario. */
const EMAIL_KORE: string = RECAPITI.email;

const BOZZA = "kore-brief-bozza";

type Modulo = {
  nome: string;
  azienda: string;
  email: string;
  telefono: string;
  servizi: string[];
  obiettivo: string;
  progetto: string;
  riferimenti: string;
  budget: string;
  tempi: string;
  canale: string;
  consenso: boolean;
};

const VUOTO: Modulo = {
  nome: "", azienda: "", email: "", telefono: "",
  servizi: [], obiettivo: "", progetto: "", riferimenti: "",
  budget: "", tempi: "", canale: "", consenso: false,
};

const PASSI = [
  { titolo: "Chi sei", sommario: "Come ti chiamiamo e dove ti rispondiamo" },
  { titolo: "Cosa ti serve", sommario: "Il tipo di lavoro e il risultato che cerchi" },
  { titolo: "Il progetto", sommario: "Il racconto, il budget, i tempi" },
  { titolo: "Rileggi e manda", sommario: "Il brief che ci arriva, scritto per intero" },
];

const nomeDi = (elenco: Voce[], id: string) => elenco.find((v) => v.id === id)?.nome ?? "";

/* Volutamente permissiva: qui non si valida un indirizzo, si intercetta chi ha
   sbagliato a scrivere. Le regex severe bocciano indirizzi validi e rari, che
   e' il modo peggiore di perdere un cliente. */
const emailPlausibile = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/** Il brief in prosa: quello che il lettore vede crescere e che poi parte. */
function componiBrief(m: Modulo) {
  const righe: string[] = [];
  const chi = m.azienda.trim() ? `${m.nome.trim()}, di ${m.azienda.trim()}` : m.nome.trim();
  if (chi) righe.push(`Sono ${chi}.`);

  if (m.servizi.length) {
    const nomi = m.servizi.map((id) => nomeDi(SERVIZI, id).toLowerCase());
    const elenco = nomi.length === 1 ? nomi[0] : `${nomi.slice(0, -1).join(", ")} e ${nomi.at(-1)}`;
    righe.push(`Ci serve: ${elenco}.`);
  }
  if (m.obiettivo) righe.push(`L’obiettivo è ${nomeDi(OBIETTIVI, m.obiettivo).toLowerCase()}.`);
  if (m.progetto.trim()) righe.push("", m.progetto.trim());

  const coda: string[] = [];
  if (m.budget) coda.push(`Budget: ${nomeDi(BUDGET, m.budget).toLowerCase()}`);
  if (m.tempi) coda.push(`Tempi: ${nomeDi(TEMPI, m.tempi).toLowerCase()}`);
  if (coda.length) righe.push("", `${coda.join(". ")}.`);

  if (m.riferimenti.trim()) righe.push("", `Riferimenti: ${m.riferimenti.trim()}`);

  const recapiti = [m.email.trim(), m.telefono.trim()].filter(Boolean);
  if (recapiti.length) righe.push("", `Rispondetemi a ${recapiti.join(" oppure ")}.`);
  if (m.canale) righe.push(`(Vi ho trovati così: ${nomeDi(CANALI, m.canale).toLowerCase()}.)`);

  return righe.join("\n").trim();
}

export function BriefForm() {
  const [passo, setPasso] = useState(0);
  const [modulo, setModulo] = useState<Modulo>(VUOTO);
  const [toccati, setToccati] = useState<Record<string, boolean>>({});
  const [bozzaRipresa, setBozzaRipresa] = useState(false);
  const [inviato, setInviato] = useState<"no" | "posta" | "appunti" | "manuale">("no");
  const titoloPasso = useRef<HTMLHeadingElement>(null);
  const primoRender = useRef(true);

  /* La bozza si rilegge dopo il montaggio, mai durante: leggere localStorage
     mentre si costruisce l'HTML fa divergere server e browser. */
  useEffect(() => {
    try {
      const salvata = localStorage.getItem(BOZZA);
      if (!salvata) return;
      /* eslint-disable react-hooks/set-state-in-effect -- localStorage esiste
         solo nel browser: leggerlo durante il render farebbe divergere l'HTML
         del server da quello del client. Qui l'effetto e' il posto giusto. */
      setModulo({ ...VUOTO, ...JSON.parse(salvata) as Partial<Modulo> });
      setBozzaRipresa(true);
      /* eslint-enable react-hooks/set-state-in-effect */
    } catch {
      /* archiviazione negata o bozza illeggibile: si riparte puliti */
    }
  }, []);

  useEffect(() => {
    if (primoRender.current) { primoRender.current = false; return; }
    try { localStorage.setItem(BOZZA, JSON.stringify(modulo)); } catch { /* pazienza */ }
  }, [modulo]);

  const scrivi = <C extends keyof Modulo>(campo: C, valore: Modulo[C]) =>
    setModulo((m) => ({ ...m, [campo]: valore }));

  const interruttoreServizio = (id: string) =>
    setModulo((m) => ({
      ...m,
      servizi: m.servizi.includes(id) ? m.servizi.filter((s) => s !== id) : [...m.servizi, id],
    }));

  /* Un errore per campo, in italiano e con il rimedio dentro. */
  const errori = useMemo(() => {
    const e: Partial<Record<keyof Modulo, string>> = {};
    if (!modulo.nome.trim()) e.nome = "Serve almeno il nome con cui chiamarti.";
    if (!modulo.email.trim()) e.email = "Serve un indirizzo per risponderti.";
    else if (!emailPlausibile(modulo.email)) e.email = "Questo indirizzo non sembra completo: manca la chiocciola o il dominio.";
    if (!modulo.servizi.length) e.servizi = "Scegline almeno uno. Se non sei sicuro, prendi quello che ci somiglia di più.";
    if (!modulo.obiettivo) e.obiettivo = "Anche «non lo so ancora» è una risposta utile.";
    const scritti = modulo.progetto.trim().length;
    if (!scritti) e.progetto = "Questa è la parte che leggiamo per prima.";
    else if (scritti < MINIMO_PROGETTO) e.progetto = `Ancora ${MINIMO_PROGETTO - scritti} caratteri: raccontaci il contesto, non solo la richiesta.`;
    if (!modulo.budget) e.budget = "Serve un ordine di grandezza. «Preferisco dirlo a voce» va benissimo.";
    if (!modulo.tempi) e.tempi = "Anche «nessuna fretta» ci dice qualcosa.";
    if (!modulo.consenso) e.consenso = "Senza consenso non possiamo trattare i tuoi dati.";
    return e;
  }, [modulo]);

  const campiDelPasso: (keyof Modulo)[][] = [
    ["nome", "email"],
    ["servizi", "obiettivo"],
    ["progetto", "budget", "tempi"],
    ["consenso"],
  ];

  const passoValido = (i: number) => campiDelPasso[i].every((c) => !errori[c]);
  const mostra = (campo: keyof Modulo) => (toccati[campo] ? errori[campo] : undefined);

  const completamento = useMemo(() => {
    const richiesti: (keyof Modulo)[] = ["nome", "email", "servizi", "obiettivo", "progetto", "budget", "tempi", "consenso"];
    return Math.round((richiesti.filter((c) => !errori[c]).length / richiesti.length) * 100);
  }, [errori]);

  const brief = useMemo(() => componiBrief(modulo), [modulo]);

  const vaiA = (i: number) => {
    setPasso(i);
    /* Il fuoco va sul titolo del passo: con la tastiera o a voce, altrimenti
       si resta appesi al bottone di un passo che non esiste piu' a schermo. */
    requestAnimationFrame(() => titoloPasso.current?.focus());
  };

  const avanti = () => {
    if (!passoValido(passo)) {
      setToccati((t) => ({ ...t, ...Object.fromEntries(campiDelPasso[passo].map((c) => [c, true])) }));
      return;
    }
    vaiA(Math.min(passo + 1, PASSI.length - 1));
  };

  const invia = async (evento: React.FormEvent) => {
    evento.preventDefault();
    if (Object.keys(errori).length) {
      setToccati(Object.fromEntries(campiDelPasso.flat().map((c) => [c, true])));
      const primoPassoRotto = campiDelPasso.findIndex((campi) => campi.some((c) => errori[c]));
      vaiA(primoPassoRotto);
      return;
    }

    const oggetto = `Nuovo brief — ${modulo.azienda.trim() || modulo.nome.trim()}`;
    if (EMAIL_KORE) {
      window.location.assign(
        `mailto:${EMAIL_KORE}?subject=${encodeURIComponent(oggetto)}&body=${encodeURIComponent(brief)}`,
      );
      setInviato("posta");
    } else {
      try {
        await navigator.clipboard.writeText(`${oggetto}\n\n${brief}`);
        setInviato("appunti");
      } catch {
        setInviato("manuale");
      }
    }
    try { localStorage.removeItem(BOZZA); } catch { /* pazienza */ }
  };

  if (inviato !== "no") {
    return (
      <section className="brief-esito" aria-live="polite">
        <p className="kicker">Brief pronto</p>
        <h2>Ci siamo.</h2>
        {inviato === "posta" && (
          <p>Si è aperto il tuo programma di posta con il brief già scritto dentro. Controlla che ci sia tutto e premi invia.</p>
        )}
        {inviato === "appunti" && (
          <p>Il brief è negli appunti, per intero. Incollalo in una mail e mandacelo.</p>
        )}
        {inviato === "manuale" && (
          <p>Ecco il brief per intero: copialo da qui e mandacelo per mail.</p>
        )}
        <div className="brief-esito-testo">
          <pre>{brief}</pre>
        </div>
        <button type="button" className="brief-bottone brief-bottone-quieto" onClick={() => { setInviato("no"); vaiA(3); }}>
          Torna al brief
        </button>
      </section>
    );
  }

  return (
    <div className="brief-impianto">
      <form className="brief-modulo" onSubmit={invia} noValidate>
        <nav className="brief-passi" aria-label="Passi del brief">
          <ol>
            {PASSI.map((p, i) => (
              <li key={p.titolo}>
                <button
                  type="button"
                  className="brief-passo-tasto"
                  aria-current={i === passo ? "step" : undefined}
                  data-fatto={i < passo && passoValido(i) ? "" : undefined}
                  onClick={() => vaiA(i)}
                >
                  <span className="brief-passo-numero">{String(i + 1).padStart(2, "0")}</span>
                  <span className="brief-passo-nome">{p.titolo}</span>
                </button>
              </li>
            ))}
          </ol>
          <p className="brief-avanzamento">
            <span
              role="progressbar"
              aria-valuenow={completamento}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Completamento del brief"
            >
              <i style={{ width: `${completamento}%` }} />
            </span>
            <b>{completamento}%</b>
          </p>
          {bozzaRipresa && <p className="brief-bozza">Ripreso da dove avevi lasciato.</p>}
        </nav>

        <div className="brief-scena">
          <p className="brief-scena-guida">{PASSI[passo].sommario}</p>
          <h2 className="brief-scena-titolo" tabIndex={-1} ref={titoloPasso}>
            {PASSI[passo].titolo}
          </h2>

          {passo === 0 && (
            <div className="brief-campi">
              <Campo etichetta="Come ti chiami" obbligatorio errore={mostra("nome")} id="nome">
                <input
                  id="nome" name="nome" type="text" autoComplete="name" value={modulo.nome}
                  onChange={(e) => scrivi("nome", e.target.value)}
                  onBlur={() => setToccati((t) => ({ ...t, nome: true }))}
                  aria-invalid={mostra("nome") ? true : undefined}
                  aria-describedby={mostra("nome") ? "nome-errore" : undefined}
                />
              </Campo>
              <Campo etichetta="Azienda o progetto" aiuto="Se ancora non ha un nome, lascia stare." id="azienda">
                <input
                  id="azienda" name="azienda" type="text" autoComplete="organization" value={modulo.azienda}
                  onChange={(e) => scrivi("azienda", e.target.value)}
                />
              </Campo>
              <Campo etichetta="Email" obbligatorio errore={mostra("email")} id="email">
                <input
                  id="email" name="email" type="email" inputMode="email" autoComplete="email" value={modulo.email}
                  onChange={(e) => scrivi("email", e.target.value)}
                  onBlur={() => setToccati((t) => ({ ...t, email: true }))}
                  aria-invalid={mostra("email") ? true : undefined}
                  aria-describedby={mostra("email") ? "email-errore" : undefined}
                />
              </Campo>
              <Campo etichetta="Telefono" aiuto="Solo se preferisci che ti chiamiamo." id="telefono">
                <input
                  id="telefono" name="telefono" type="tel" inputMode="tel" autoComplete="tel" value={modulo.telefono}
                  onChange={(e) => scrivi("telefono", e.target.value)}
                />
              </Campo>
            </div>
          )}

          {passo === 1 && (
            <div className="brief-campi">
              <Gruppo
                legenda="Di cosa hai bisogno"
                aiuto="Puoi sceglierne più di uno."
                obbligatorio
                errore={mostra("servizi")}
                id="servizi"
              >
                <div className="brief-scelte brief-scelte-doppie">
                  {SERVIZI.map((s) => (
                    <label className="brief-scelta" htmlFor={`servizio-${s.id}`} key={s.id}>
                      <input
                        id={`servizio-${s.id}`} type="checkbox" name="servizi" value={s.id}
                        checked={modulo.servizi.includes(s.id)}
                        onChange={() => { interruttoreServizio(s.id); setToccati((t) => ({ ...t, servizi: true })); }}
                      />
                      <b>{s.nome}</b>
                      <i>{s.nota}</i>
                    </label>
                  ))}
                </div>
              </Gruppo>

              <Gruppo legenda="Cosa vuoi ottenere" obbligatorio errore={mostra("obiettivo")} id="obiettivo">
                <div className="brief-scelte">
                  {OBIETTIVI.map((o) => (
                    <label className="brief-scelta" htmlFor={`obiettivo-${o.id}`} key={o.id}>
                      <input
                        id={`obiettivo-${o.id}`} type="radio" name="obiettivo" value={o.id}
                        checked={modulo.obiettivo === o.id}
                        onChange={() => { scrivi("obiettivo", o.id); setToccati((t) => ({ ...t, obiettivo: true })); }}
                      />
                      <b>{o.nome}</b>
                      <i>{o.nota}</i>
                    </label>
                  ))}
                </div>
              </Gruppo>
            </div>
          )}

          {passo === 2 && (
            <div className="brief-campi">
              <Campo
                etichetta="Raccontaci il progetto"
                obbligatorio
                aiuto="Da dove nasce, a chi si rivolge, cosa avete già provato."
                errore={mostra("progetto")}
                id="progetto"
              >
                <textarea
                  id="progetto" name="progetto" rows={7} value={modulo.progetto}
                  onChange={(e) => scrivi("progetto", e.target.value)}
                  onBlur={() => setToccati((t) => ({ ...t, progetto: true }))}
                  aria-invalid={mostra("progetto") ? true : undefined}
                  aria-describedby={mostra("progetto") ? "progetto-errore" : "progetto-conta"}
                />
                <p className="brief-conta" id="progetto-conta">
                  {modulo.progetto.trim().length < MINIMO_PROGETTO
                    ? `${modulo.progetto.trim().length} / ${MINIMO_PROGETTO} caratteri`
                    : `${modulo.progetto.trim().length} caratteri — così va bene`}
                </p>
              </Campo>

              <Campo etichetta="Link utili" aiuto="Sito, profili social, una cartella con materiali." id="riferimenti">
                <input
                  id="riferimenti" name="riferimenti" type="text" value={modulo.riferimenti}
                  onChange={(e) => scrivi("riferimenti", e.target.value)}
                />
              </Campo>

              <Gruppo
                legenda="Budget"
                aiuto="Non è un preventivo: serve a capire che tipo di progetto possiamo costruire."
                obbligatorio
                errore={mostra("budget")}
                id="budget"
              >
                <div className="brief-scelte">
                  {BUDGET.map((b) => (
                    <label className="brief-scelta" htmlFor={`budget-${b.id}`} key={b.id}>
                      <input
                        id={`budget-${b.id}`} type="radio" name="budget" value={b.id}
                        checked={modulo.budget === b.id}
                        onChange={() => { scrivi("budget", b.id); setToccati((t) => ({ ...t, budget: true })); }}
                      />
                      <b>{b.nome}</b>
                      <i>{b.nota}</i>
                    </label>
                  ))}
                </div>
              </Gruppo>

              <Gruppo legenda="Quando" obbligatorio errore={mostra("tempi")} id="tempi">
                <div className="brief-scelte brief-scelte-doppie">
                  {TEMPI.map((t) => (
                    <label className="brief-scelta" htmlFor={`tempi-${t.id}`} key={t.id}>
                      <input
                        id={`tempi-${t.id}`} type="radio" name="tempi" value={t.id}
                        checked={modulo.tempi === t.id}
                        onChange={() => { scrivi("tempi", t.id); setToccati((x) => ({ ...x, tempi: true })); }}
                      />
                      <b>{t.nome}</b>
                      <i>{t.nota}</i>
                    </label>
                  ))}
                </div>
              </Gruppo>
            </div>
          )}

          {passo === 3 && (
            <div className="brief-campi">
              <Gruppo legenda="Come ci hai trovati" aiuto="Facoltativo, ma ci aiuta." id="canale">
                <div className="brief-scelte brief-scelte-fitte">
                  {CANALI.map((c) => (
                    <label className="brief-scelta brief-scelta-piatta" htmlFor={`canale-${c.id}`} key={c.id}>
                      <input
                        id={`canale-${c.id}`} type="radio" name="canale" value={c.id}
                        checked={modulo.canale === c.id}
                        onChange={() => scrivi("canale", c.id)}
                      />
                      <b>{c.nome}</b>
                    </label>
                  ))}
                </div>
              </Gruppo>

              <Campo etichetta="" errore={mostra("consenso")} id="consenso">
                <label className="brief-consenso">
                  <input
                    id="consenso" type="checkbox" checked={modulo.consenso}
                    onChange={(e) => { scrivi("consenso", e.target.checked); setToccati((t) => ({ ...t, consenso: true })); }}
                    aria-invalid={mostra("consenso") ? true : undefined}
                    aria-describedby={mostra("consenso") ? "consenso-errore" : undefined}
                  />
                  <span>
                    Acconsento al trattamento dei dati per essere ricontattato su questo progetto.
                    Non li usiamo per altro e non li diamo a nessuno.
                  </span>
                </label>
              </Campo>

              {Object.keys(errori).length > 0 && (
                <div className="brief-mancanze" role="alert">
                  <p>Manca ancora qualcosa:</p>
                  <ul>
                    {campiDelPasso.map((campi, i) =>
                      campi.filter((c) => errori[c]).map((c) => (
                        <li key={c}>
                          <button type="button" onClick={() => { setToccati((t) => ({ ...t, [c]: true })); vaiA(i); }}>
                            {errori[c]}
                          </button>
                        </li>
                      )),
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="brief-comandi">
            {passo > 0 && (
              <button type="button" className="brief-bottone brief-bottone-quieto" onClick={() => vaiA(passo - 1)}>
                Indietro
              </button>
            )}
            {passo < PASSI.length - 1 ? (
              <button type="button" className="brief-bottone" onClick={avanti}>
                Avanti <span aria-hidden="true">↗</span>
              </button>
            ) : (
              <button type="submit" className="brief-bottone">
                Manda il brief <span aria-hidden="true">↗</span>
              </button>
            )}
          </div>
        </div>
      </form>

      <aside className="brief-riepilogo" aria-label="Il brief che ci arriva">
        <p className="kicker">Quello che ci arriva</p>
        {brief ? (
          <pre aria-live="polite">{brief}</pre>
        ) : (
          <p className="brief-riepilogo-vuoto">
            Man mano che scrivi, qui si compone il brief per intero. È esattamente il testo che riceviamo:
            niente moduli da decifrare, niente campi nascosti.
          </p>
        )}
      </aside>
    </div>
  );
}

/* Un campo con la sua etichetta, il suo aiuto e il suo errore. Tenerli in un
   componente solo e' il modo per non dimenticarsi mai il collegamento fra
   etichetta e controllo, che e' l'errore piu' comune nei moduli. */
function Campo({
  id, etichetta, aiuto, errore, obbligatorio, children,
}: {
  id: string; etichetta: string; aiuto?: string; errore?: string; obbligatorio?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="brief-campo" data-rotto={errore ? "" : undefined}>
      {etichetta && (
        <label htmlFor={id}>
          {etichetta}
          {obbligatorio && <i aria-hidden="true">·</i>}
        </label>
      )}
      {aiuto && <p className="brief-aiuto">{aiuto}</p>}
      {children}
      {errore && <p className="brief-errore" id={`${id}-errore`} role="alert">{errore}</p>}
    </div>
  );
}

/* Come Campo, ma per gruppi di scelte: fieldset e legend, cosi' chi usa un
   lettore di schermo sente la domanda prima delle risposte. */
function Gruppo({
  id, legenda, aiuto, errore, obbligatorio, children,
}: {
  id: string; legenda: string; aiuto?: string; errore?: string; obbligatorio?: boolean; children: React.ReactNode;
}) {
  return (
    <fieldset className="brief-campo brief-gruppo" data-rotto={errore ? "" : undefined}>
      <legend>
        {legenda}
        {obbligatorio && <i aria-hidden="true">·</i>}
      </legend>
      {aiuto && <p className="brief-aiuto">{aiuto}</p>}
      {children}
      {errore && <p className="brief-errore" id={`${id}-errore`} role="alert">{errore}</p>}
    </fieldset>
  );
}
