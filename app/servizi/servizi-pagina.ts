/**
 * I mestieri come li presenta la pagina /servizi.
 *
 * Non e' l'elenco della home. La home (services-data.ts) e' passata a otto
 * servizi con nomi nuovi — Brand Identity, Social Media Marketing, Web &
 * E-Commerce, Grafica, Foto e video per eventi, Consulenza e Strategia,
 * Advertising, AI Solutions — mentre il sito online, su /servizi, mostra
 * ancora i sei mestieri di prima, con gli atti e le tavole scritti per
 * quelli. Qui c'e' esattamente quello, perche' il repository produca lo
 * stesso sito che c'e' su Aruba.
 *
 * Quando /servizi verra' riscritta sugli otto servizi, questo file sparisce
 * e la pagina torna a leggere services-data.ts.
 */
export type ServizioPagina = {
  id: "branding" | "social" | "video" | "web" | "advertising" | "eventi";
  name: string;
  note: string;
  dettagli: [string, string, string];
};

export const serviziPagina: ServizioPagina[] = [
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
