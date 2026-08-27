/**
 * Le scelte del brief.
 *
 * Stanno qui e non dentro al componente perche' sono contenuto, non
 * meccanica: sono le domande che Kore fa a un cliente nuovo, e cambieranno
 * piu' spesso del modulo che le mostra.
 *
 * Ogni voce ha una `nota`: una riga che dice cosa vuol dire davvero quella
 * scelta. Su un brief serve — chi scrive non sa cosa intendiamo per
 * "identita'", e senza spiegazione sceglie a caso o si blocca.
 */

export type Voce = { id: string; nome: string; nota: string };

export const SERVIZI: Voce[] = [
  { id: "identita", nome: "Identità", nota: "Marchio, sistema visivo, applicazioni" },
  { id: "campagne", nome: "Campagne", nota: "Concept, adv, pianificazione" },
  { id: "contenuti", nome: "Contenuti", nota: "Social, editoriale, testi" },
  { id: "foto-video", nome: "Foto e video", nota: "Shooting, reel, montaggio" },
  { id: "digitale", nome: "Sito e digitale", nota: "Progettazione, sviluppo, e-commerce" },
  { id: "eventi", nome: "Eventi", nota: "Format, allestimento, regia" },
];

export const OBIETTIVI: Voce[] = [
  { id: "farsi-conoscere", nome: "Farci conoscere", nota: "Esistiamo, ma pochi lo sanno" },
  { id: "vendere", nome: "Vendere di più", nota: "Ci vedono, ma non comprano" },
  { id: "rifare-immagine", nome: "Rifare l’immagine", nota: "Quello che siamo non si vede" },
  { id: "lanciare", nome: "Lanciare qualcosa", nota: "Un prodotto, un locale, un marchio nuovo" },
  { id: "da-capire", nome: "Non lo so ancora", nota: "Serve prima capire il problema" },
];

export const BUDGET: Voce[] = [
  { id: "sotto-5", nome: "Sotto 5.000 €", nota: "Un intervento circoscritto" },
  { id: "5-15", nome: "5.000 – 15.000 €", nota: "Un progetto con più pezzi" },
  { id: "15-40", nome: "15.000 – 40.000 €", nota: "Un percorso completo" },
  { id: "oltre-40", nome: "Oltre 40.000 €", nota: "Un programma continuativo" },
  { id: "riservato", nome: "Preferisco dirlo a voce", nota: "Ne parliamo alla prima chiamata" },
];

export const TEMPI: Voce[] = [
  { id: "subito", nome: "Il prima possibile", nota: "C’è una scadenza che incalza" },
  { id: "1-2-mesi", nome: "Entro uno o due mesi", nota: "Abbiamo un margine stretto" },
  { id: "3-6-mesi", nome: "Entro sei mesi", nota: "C’è tempo per farlo bene" },
  { id: "nessuna-fretta", nome: "Nessuna fretta", nota: "Vogliamo iniziare a ragionarci" },
];

export const CANALI: Voce[] = [
  { id: "passaparola", nome: "Passaparola", nota: "" },
  { id: "instagram", nome: "Instagram", nota: "" },
  { id: "linkedin", nome: "LinkedIn", nota: "" },
  { id: "ricerca", nome: "Ricerca online", nota: "" },
  { id: "gia-noti", nome: "Vi conoscevo già", nota: "" },
  { id: "altro", nome: "Altro", nota: "" },
];

/** Il minimo di caratteri per cui la descrizione e' un brief e non una riga. */
export const MINIMO_PROGETTO = 80;
