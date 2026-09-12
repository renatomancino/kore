/**
 * Chi è Kore Studio davanti alla legge.
 *
 * Sta qui e non dentro alla pagina privacy perché gli stessi dati servono
 * anche al footer, che la partita IVA la stampa in fondo a ogni pagina: due
 * copie dello stesso numero sono due numeri che prima o poi divergono.
 *
 * I dati arrivano dal cliente il 12 settembre 2026. La partita IVA è stata
 * verificata con l'algoritmo di controllo (l'ultima cifra si ricava dalle
 * altre dieci e corrisponde).
 */
export const AZIENDA = {
  /** Come si chiama sui documenti, non come si presenta al pubblico. */
  ragioneSociale: "Kore Studio di Izzo Alfredo",
  partitaIva: "11148821215",
  indirizzo: "Via Nazionale 389",
  cap: "80059",
  citta: "Torre del Greco",
  provincia: "NA",
} as const;

/** La sede su una riga sola, come si scrive su una busta. */
export function sedePerEsteso() {
  const { indirizzo, cap, citta, provincia } = AZIENDA;
  return `${indirizzo}, ${cap} ${citta} (${provincia})`;
}

/**
 * Quanto restano le richieste arrivate dal modulo, deciso dal cliente.
 * In mesi, perché la pagina privacy deve dire un numero e non "il tempo
 * necessario", che non vuol dire niente.
 */
export const MESI_CONSERVAZIONE = 24;

/** L'ultima volta che il testo dell'informativa è cambiato. */
export const AGGIORNATA_IL = "12 settembre 2026";
