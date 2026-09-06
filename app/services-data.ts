import type { Service } from "./service-showcase";

/* I servizi stanno qui e non nella home perche' ora li legge anche il menu,
   che e' su ogni pagina: due copie della stessa lista sono due liste che
   prima o poi divergono. */
export const services: Service[] = [
  {
    id: "branding",
    name: "Branding",
    note: "Diamo un’identità alle idee.",
    dettagli: ["Identità e posizionamento", "Logo e sistemi visivi", "Linee guida che restano coerenti"],
  },
  {
    id: "social",
    name: "Social",
    note: "Trasformiamo attenzione in relazione.",
    dettagli: ["Strategia editoriale", "Produzione di contenuti", "Community e continuità"],
  },
  {
    id: "video",
    name: "Video",
    note: "Mettiamo il racconto in movimento.",
    dettagli: ["Concept e storyboard", "Riprese e direzione", "Montaggio e formati verticali"],
  },
  {
    id: "web",
    name: "Web",
    note: "Costruiamo esperienze che funzionano.",
    dettagli: ["Esperienza e interfaccia", "Sviluppo su misura", "Performance e accessibilità"],
  },
  {
    id: "advertising",
    name: "Advertising",
    note: "Portiamo le idee dove devono arrivare.",
    dettagli: ["Idea di campagna", "Media e declinazioni", "Ottimizzazione dei risultati"],
  },
  {
    id: "eventi",
    name: "Eventi",
    note: "Creiamo momenti che restano.",
    dettagli: ["Format e progettazione", "Allestimento e regia", "Contenuti prima e dopo"],
  },
];
