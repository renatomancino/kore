export type Project = {
  slug: string;
  client: string;
  title: string;
  category: string;
  year: string;
  cover: string;
  tone: "light" | "dark" | "photo";
  summary: string;
  services: string[];
};

export const projects: Project[] = [
  {
    slug: "trim-identita-digitale",
    client: "Centro Revisioni TRIM",
    title: "Identità e presenza digitale",
    category: "Branding · Web",
    year: "2025",
    cover: "/clients/trim.png",
    tone: "light",
    summary: "Un sistema riconoscibile per rendere più chiari servizi, contatti e presenza sul territorio.",
    services: ["Direzione creativa", "Identità visiva", "Presenza digitale"],
  },
  {
    slug: "isola-che-non-ce-racconto",
    client: "L’isola che non c’è",
    title: "Un racconto che prende spazio",
    category: "Content · Social",
    year: "2025",
    cover: "/clients/isola-che-non-ce.png",
    tone: "dark",
    summary: "Contenuti e linguaggio visivo costruiti per dare continuità al racconto del brand.",
    services: ["Strategia editoriale", "Content design", "Social media"],
  },
  {
    slug: "panariello-falegnameria-sartoriale",
    client: "Panariello",
    title: "Falegnameria sartoriale",
    category: "Branding · Content",
    year: "2025",
    cover: "/clients/panariello.png",
    tone: "light",
    summary: "Un’identità capace di comunicare precisione artigianale, materia e progetto su misura.",
    services: ["Posizionamento", "Sistema visivo", "Contenuti"],
  },
  {
    slug: "pastry-coffee-experience",
    client: "Pastry & Coffee",
    title: "Un’esperienza da raccontare",
    category: "Photo · Social",
    year: "2024",
    cover: "/clients/pastry-coffee.jpg",
    tone: "photo",
    summary: "Immagini e contenuti pensati per trasformare prodotto, atmosfera e gesti in una storia coerente.",
    services: ["Art direction", "Produzione fotografica", "Social content"],
  },
  {
    slug: "primobanco-comunicazione",
    client: "Primobanco",
    title: "Comunicazione in primo piano",
    category: "Content · Advertising",
    year: "2024",
    cover: "/clients/primobanco.png",
    tone: "light",
    summary: "Una presenza visiva più ordinata e immediata, progettata per accompagnare campagne e contenuti.",
    services: ["Creative direction", "Campagne", "Content design"],
  },
  {
    slug: "osteria-annunziata-territorio",
    client: "Osteria Annunziata",
    title: "Il territorio a tavola",
    category: "Branding · Photo",
    year: "2024",
    cover: "/clients/osteria-annunziata.jpg",
    tone: "photo",
    summary: "Un racconto visivo che mette insieme cucina, luogo e carattere senza perdere autenticità.",
    services: ["Identità", "Fotografia", "Contenuti"],
  },
];
