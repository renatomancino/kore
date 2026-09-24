import { BUDGET, CANALI, OBIETTIVI, SERVIZI, TEMPI, type Voce } from "./brief-data";

/**
 * Il brief come testo: i campi del modulo e la prosa che ne esce.
 *
 * Sta in un file suo perche' lo stesso testo serve in tre punti — l'anteprima
 * che cresce accanto al modulo, cio' che parte verso api/brief.php e il
 * `mailto:` di riserva se la spedizione non va — e deve essere identico in
 * tutti e tre.
 */
export type Modulo = {
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
  novita: boolean;
};

export const VUOTO: Modulo = {
  nome: "", azienda: "", email: "", telefono: "",
  servizi: [], obiettivo: "", progetto: "", riferimenti: "",
  budget: "", tempi: "", canale: "", consenso: false, novita: false,
};

const nomeDi = (elenco: Voce[], id: string) => elenco.find((v) => v.id === id)?.nome ?? "";

/** Il brief in prosa: quello che il lettore vede crescere e che poi parte. */
export function componiBrief(m: Modulo) {
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
  if (m.canale) righe.push(`(Come vi ho trovati: ${nomeDi(CANALI, m.canale).toLowerCase()}.)`);

  /* Anche il "no" va scritto: e' l'unica traccia di cosa ha scelto chi manda
     il brief, e senza quella nessuno dei due sa piu' cosa era stato detto. */
  righe.push("", m.novita
    ? "Sì, voglio ricevere da Kore Studio novità, iniziative e proposte commerciali via email."
    : "No: scrivetemi solo per questo progetto, niente novità o proposte commerciali.");

  return righe.join("\n").trim();
}

/* Il campo nascosto che una persona non vede e un programma riempie: se
   arriva pieno, api/brief.php risponde "spedito" e non spedisce niente. Lo
   stesso nome sta in TRAPPOLA, dentro api/brief.php. */
export const TRAPPOLA = "kore_controllo";
