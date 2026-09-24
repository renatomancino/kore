import type { Service } from "./service-showcase";

/* I servizi stanno qui e non nella home perche' li leggono in quattro: la
   home, la pagina /servizi, il suo indice e l'immagine di anteprima. Due
   copie della stessa lista sono due liste che prima o poi divergono.
   (Li leggeva anche il menu, finche' aveva la colonna "Cosa facciamo".) */
export const services: Service[] = [
  {
    id: "branding",
    name: "Brand Identity",
    note: "Ti rendiamo riconoscibile:",
    dettagli: [
      "Identità e posizionamento",
      "Logo e sistemi visivi",
      "Palette, tipografia e materiali",
      "Linee guida per una comunicazione coerente",
    ],
  },
  {
    id: "social",
    name: "Social Media Marketing",
    note: "Trasformiamo la presenza online in comunicazione:",
    dettagli: [
      "Content creation",
      "Strategia editoriale e gestione dei contenuti",
      "Produzione di foto, video e grafiche",
      "Generazione di lead e di nuovi clienti",
    ],
  },
  {
    id: "web",
    name: "Web & E-Commerce",
    note: "Strumenti digitali che aumentano la ricercabilità e la presenza:",
    dettagli: [
      "Siti aziendali e landing page",
      "E-commerce",
      "UX, UI, web design e struttura dei contenuti",
      "Gestionali e applicativi",
    ],
  },
  {
    id: "grafica",
    name: "Grafica e Comunicazione",
    note: "Diamo forma a ciò che vuoi raccontare:",
    dettagli: [
      "Grafica pubblicitaria",
      "Campagne online e offline",
      "Biglietti da visita, brochure, cataloghi, adesivi e tanto altro",
      "Progettazione e realizzazione insegne",
    ],
  },
  {
    id: "eventi",
    name: "Foto e video per eventi",
    note: "Raccontiamo il tuo evento:",
    dettagli: [
      "Foto e video",
      "Contenuti verticali per i social",
      "Riprese e montaggio",
      "Allestimento e regia creativa",
    ],
  },
  {
    id: "strategia",
    name: "Consulenza e Strategia",
    note: "Analisi dei dati e sviluppo della strategia di comunicazione:",
    dettagli: [
      "Analisi dell’attività: brand awareness, engagement rate, reach e tasso di conversione",
      "Analisi del posizionamento e degli obiettivi del brand",
      "Analisi dei KPI",
      "Analisi del tasso di conversione",
    ],
  },
  {
    id: "advertising",
    name: "Advertising",
    note: "Portiamo la comunicazione davanti alle persone giuste:",
    dettagli: [
      "Campagne Meta e Google",
      "Targeting e segmentazione",
      "Creatività e copy",
      "Monitoraggio e ottimizzazione",
    ],
  },
  {
    id: "ai",
    name: "AI Solutions",
    note: "Semplifichiamo attività e processi di lavoro con l’AI:",
    dettagli: [
      "Automazioni e workflow",
      "Creazione di strumenti personalizzati",
      "Consulenza e integrazione",
      "Assistenti AI personalizzati",
    ],
  },
];
