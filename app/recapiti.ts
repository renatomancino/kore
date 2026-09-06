/**
 * I recapiti di Kore, in un posto solo.
 *
 * Servivano in tre punti — il blocco su /idea, la colonna del footer e
 * l'indirizzo a cui il modulo spedisce il brief — e finora ognuno se li
 * scriveva per conto suo: il footer diceva "da inserire", il modulo aveva una
 * costante vuota, e la home mandava a una sezione che di recapiti non ne
 * conteneva nessuno. Tre copie della stessa cosa mancante.
 *
 * Da qui in avanti si riempie questo file e si accende tutto: il footer
 * smette di dire "da inserire", il blocco contatti mostra le voci vere, e il
 * brief parte via mail invece di finire negli appunti.
 *
 * Una stringa vuota significa "non ce l'abbiamo ancora", e il sito lo dice
 * apertamente invece di far finta: un recapito inventato o un `mailto:` senza
 * destinatario perdono la richiesta senza che nessuno se ne accorga.
 */
/* Tipizzato a `string` e non lasciato inferire: con `as const` una stringa
   vuota diventa il tipo `""`, e dopo un controllo di verita' TypeScript la
   restringe a `never` — il compilatore rifiutava di trattarla come testo. */
type Recapiti = { email: string; telefono: string; instagram: string; linkedin: string; luogo: string };

export const RECAPITI: Recapiti = {
  /** L'indirizzo a cui arriva il brief. Vuoto: il modulo copia negli appunti. */
  email: "",
  /** Con il prefisso internazionale se si vuole usarlo anche su WhatsApp. */
  telefono: "",
  /** L'indirizzo completo del profilo, non la sola maniglia. */
  instagram: "",
  linkedin: "",
  /* Questo lo sappiamo, ed e' l'unico gia' scritto per esteso nel sito. */
  luogo: "Torre del Greco — Napoli",
};

export type VoceRecapito = { chiave: string; etichetta: string; valore: string; href?: string };

/** Le voci da mostrare, con il collegamento giusto per ciascun mezzo. */
export function vociRecapito(): VoceRecapito[] {
  const { email, telefono, instagram, linkedin } = RECAPITI;
  return [
    { chiave: "email", etichetta: "Email", valore: email, href: email ? `mailto:${email}` : undefined },
    {
      chiave: "telefono",
      etichetta: "Telefono",
      valore: telefono,
      /* Gli spazi in un `tel:` non sono ammessi da tutti i dispositivi. */
      href: telefono ? `tel:${telefono.replace(/\s+/g, "")}` : undefined,
    },
    { chiave: "instagram", etichetta: "Instagram", valore: nomeProfilo(instagram), href: instagram || undefined },
    { chiave: "linkedin", etichetta: "LinkedIn", valore: nomeProfilo(linkedin), href: linkedin || undefined },
  ];
}

/* Di un profilo si mostra la maniglia, non l'indirizzo intero: "@korestudio"
   si legge, "https://www.instagram.com/korestudio/" no. */
function nomeProfilo(indirizzo: string) {
  if (!indirizzo) return "";
  const pezzo = indirizzo.replace(/\/+$/, "").split("/").pop() ?? "";
  return pezzo.startsWith("@") ? pezzo : `@${pezzo}`;
}
