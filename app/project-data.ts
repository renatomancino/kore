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
  gallery?: { src: string; alt: string; kind?: "image" | "video"; poster?: string; group?: string }[];
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
    gallery: Array.from({ length: 9 }, (_, index) => ({
      src: `/projects/trim/trim-${String(index + 1).padStart(2, "0")}.jpg`, group: index < 3 ? "Rebranding" : "Applicazioni",
      alt: `Applicazione del rebranding TRIM ${index + 1}`,
    })),
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
    gallery: [
      { src: "/projects/panariello/logo-social.jpg", alt: "Logo Panariello nel formato social" },
      { src: "/projects/panariello/panariello-color.png", alt: "Logo Panariello a colori" },
      { src: "/projects/panariello/panariello-symbol.png", alt: "Pittogramma Panariello a colori" },
      { src: "/projects/panariello/panariello-black.png", alt: "Logo Panariello nero" },
      { src: "/projects/panariello/panariello-white.png", alt: "Logo Panariello bianco" },
      { src: "/projects/panariello/panariello-symbol-black.png", alt: "Pittogramma Panariello nero" },
      { src: "/projects/panariello/panariello-symbol-white.png", alt: "Pittogramma Panariello bianco" },
      { src: "/projects/panariello/panariello-application.png", alt: "Applicazione del sistema visivo Panariello" },
    ],
  },
  {
    slug: "pastry-coffee-experience",
    client: "Pastry & Coffee",
    title: "Un’esperienza da raccontare",
    category: "Photo · Social",
    year: "2024",
    cover: "/clients/pastry-coffee.png",
    tone: "light",
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
    cover: "/clients/osteria-annunziata.png",
    tone: "dark",
    summary: "Un racconto visivo che mette insieme cucina, luogo e carattere senza perdere autenticità.",
    services: ["Identità", "Fotografia", "Contenuti"],
    gallery: [
      { src: "/projects/osteria-annunziata/osteria-1.jpg", alt: "Atmosfera e piatti di Osteria Annunziata", group: "Fotografie" },
      { src: "/projects/osteria-annunziata/e-tu-lo-sapevi.mp4", alt: "Reel E tu lo sapevi di Osteria Annunziata", kind: "video", poster: "/projects/osteria-annunziata/osteria-1.jpg", group: "Video" },
      { src: "/projects/osteria-annunziata/osteria-2.jpg", alt: "Dettaglio fotografico di Osteria Annunziata" },
      { src: "/projects/osteria-annunziata/miracolo.mp4", alt: "Reel Miracolo di Osteria Annunziata", kind: "video", poster: "/projects/osteria-annunziata/osteria-2.jpg" },
      { src: "/projects/osteria-annunziata/osteria-3.jpg", alt: "Racconto visivo di Osteria Annunziata" },
      { src: "/projects/osteria-annunziata/scarpariello.mp4", alt: "Reel Scarpariello di Osteria Annunziata", kind: "video", poster: "/projects/osteria-annunziata/osteria-3.jpg" },
      { src: "/projects/osteria-annunziata/osteria-4.jpg", alt: "Una portata di Osteria Annunziata" },
      { src: "/projects/osteria-annunziata/tataki.mp4", alt: "Reel Tataki di Osteria Annunziata", kind: "video", poster: "/projects/osteria-annunziata/osteria-4.jpg" },
    ],
  },
  {
    slug: "gender-evento-live",
    client: "Gender",
    title: "L’energia dell’evento, fotogramma per fotogramma",
    category: "Eventi · Photo",
    year: "2025",
    cover: "/projects/gender-event/gender-01.jpg",
    tone: "photo",
    summary: "Un racconto fotografico dal vivo che restituisce persone, atmosfera e dettagli dell’esperienza.",
    services: ["Produzione eventi", "Reportage fotografico", "Content selection"],
    gallery: Array.from({ length: 48 }, (_, index) => ({
      src: `/projects/gender-event/gender-${String(index + 1).padStart(2, "0")}.jpg`,
      alt: `Reportage dell’evento Gender ${index + 1}`,
    })),
  },
  {
    slug: "copa-servizi-grafiche",
    client: "C.O.P.A.",
    title: "Un segno per i servizi",
    category: "Branding · Graphic",
    year: "2025",
    cover: "/projects/additional/copa-servizi-grafiche.png",
    tone: "dark",
    summary: "Una grafica istituzionale pronta a vivere nei materiali di comunicazione del progetto.",
    services: ["Graphic design", "Identità visiva", "Materiali di comunicazione"],
    gallery: [{ src: "/projects/additional/copa-servizi-grafiche.png", alt: "Grafica COPA Servizi" }],
  },
  {
    slug: "disconnection-2-pomigliano",
    client: "Disconnection 2.0",
    title: "Un’identità che accende la notte",
    category: "Branding · Eventi",
    year: "2025",
    cover: "/projects/additional/disconnection-pomigliano.png",
    tone: "dark",
    summary: "Sistema grafico e varianti del marchio per un’esperienza live riconoscibile.",
    services: ["Naming", "Logo design", "Visual identity"],
    gallery: [
      { src: "/projects/additional/disconnection-pomigliano.png", alt: "Logo Disconnection 2.0 Pomigliano" },
      { src: "/projects/additional/disconnection-2.png", alt: "Logo Disconnection 2.0" },
    ],
  },
];
