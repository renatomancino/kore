import type { Service } from "./service-showcase";

/* I servizi stanno qui e non nella home perche' ora li legge anche il menu,
   che e' su ogni pagina: due copie della stessa lista sono due liste che
   prima o poi divergono. */
export const services: Service[] = [
  { id: "branding", name: "Branding", note: "Diamo un’identità alle idee." },
  { id: "social", name: "Social", note: "Trasformiamo attenzione in relazione." },
  { id: "video", name: "Video", note: "Mettiamo il racconto in movimento." },
  { id: "web", name: "Web", note: "Costruiamo esperienze che funzionano." },
  { id: "advertising", name: "Advertising", note: "Portiamo le idee dove devono arrivare." },
  { id: "eventi", name: "Eventi", note: "Creiamo momenti che restano." },
];
