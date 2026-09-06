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
  gallery?: { src: string; alt: string; kind?: "image" | "video"; poster?: string; group?: string; fit?: "contain" | "cover" }[];
};

export const projects: Project[] = [
  {
    slug: "trim-identita-digitale",
    client: "Centro Revisioni TRIM",
    title: "Identità e presenza digitale",
    category: "Branding · Web",
    year: "2025",
    cover: "/clients/trim.webp",
    tone: "light",
    summary: "Un sistema riconoscibile per rendere più chiari servizi, contatti e presenza sul territorio.",
    services: ["Direzione creativa", "Identità visiva", "Presenza digitale"],
    /* Erano nove immagini con la stessa didascalia — "Applicazione del
       rebranding TRIM 1..9" — e un raggruppamento che divideva le prime tre
       dalle altre senza che nulla, nelle immagini, lo giustificasse: sono
       tutte e nove applicazioni del marchio. Scritte una per una perche' la
       didascalia e' cio' che legge chi non vede la figura, e "applicazione
       numero 4" non e' una descrizione. */
    gallery: [
      { src: "/projects/trim/trim-01.jpg", alt: "Biglietti da visita TRIM", group: "Stampa" },
      { src: "/projects/trim/trim-09.jpg", alt: "Carta intestata con il timbro dell’officina", group: "Stampa" },
      { src: "/projects/trim/trim-03.jpg", alt: "Insegna a bandiera sopra l’ingresso", group: "Insegne" },
      { src: "/projects/trim/trim-05.jpg", alt: "Totem del marchio contro il cielo", group: "Insegne" },
      { src: "/projects/trim/trim-02.jpg", alt: "Cartellone del marchio sulla facciata di un edificio", group: "Insegne" },
      { src: "/projects/trim/trim-04.jpg", alt: "Il furgone dell’officina con la livrea TRIM", group: "Mezzi e divise" },
      { src: "/projects/trim/trim-08.jpg", alt: "Polo da lavoro col marchio ricamato", group: "Mezzi e divise" },
      { src: "/projects/trim/trim-07.jpg", alt: "Spille col pittogramma TRIM", group: "Gadget" },
      { src: "/projects/trim/trim-06.jpg", alt: "Penna personalizzata TRIM", group: "Gadget" },
    ],
  },
  {
    slug: "isola-che-non-ce-racconto",
    client: "L’isola che non c’è",
    title: "Un racconto che prende spazio",
    category: "Content · Social",
    year: "2025",
    cover: "/clients/isola-che-non-ce.webp",
    tone: "dark",
    summary: "Contenuti e linguaggio visivo costruiti per dare continuità al racconto del brand.",
    services: ["Strategia editoriale", "Content design", "Social media"],
    gallery: [
      { src: "/clients/isola-che-non-ce.webp", alt: "Identità visiva de L’isola che non c’è", group: "Identità", fit: "contain" },
    ],
  },
  {
    slug: "panariello-falegnameria-sartoriale",
    client: "Panariello",
    title: "Falegnameria sartoriale",
    category: "Branding · Content",
    year: "2025",
    cover: "/clients/panariello.webp",
    tone: "light",
    summary: "Un’identità capace di comunicare precisione artigianale, materia e progetto su misura.",
    services: ["Posizionamento", "Sistema visivo", "Contenuti"],
    gallery: [
      { src: "/projects/panariello/logo-social.jpg", alt: "Logo Panariello nel formato social", group: "Identità" },
      { src: "/projects/panariello/panariello-color.png", alt: "Logo Panariello a colori", group: "Identità" },
      { src: "/projects/panariello/panariello-symbol.png", alt: "Pittogramma Panariello a colori", group: "Identità" },
      { src: "/projects/panariello/panariello-black.png", alt: "Logo Panariello nero", group: "Varianti" },
      { src: "/projects/panariello/panariello-white.png", alt: "Logo Panariello bianco", group: "Varianti" },
      { src: "/projects/panariello/panariello-symbol-black.png", alt: "Pittogramma Panariello nero", group: "Varianti" },
      { src: "/projects/panariello/panariello-symbol-white.png", alt: "Pittogramma Panariello bianco", group: "Varianti" },
      { src: "/projects/panariello/panariello-application.png", alt: "Applicazione del sistema visivo Panariello", group: "Applicazioni" },
    ],
  },
  {
    slug: "pastry-coffee-experience",
    client: "Pastry & Coffee",
    title: "Un’esperienza da raccontare",
    category: "Photo · Social",
    year: "2024",
    cover: "/clients/pastry-coffee.webp",
    tone: "light",
    summary: "Immagini e contenuti pensati per trasformare prodotto, atmosfera e gesti in una storia coerente.",
    services: ["Art direction", "Produzione fotografica", "Social content"],
    gallery: [
      { src: "/clients/pastry-coffee.jpg", alt: "Atmosfera fotografica di Pastry & Coffee", group: "Fotografie" },
      { src: "/clients/pastry-coffee.webp", alt: "Identità visiva di Pastry & Coffee", group: "Identità", fit: "contain" },
    ],
  },
  {
    slug: "primobanco-comunicazione",
    client: "Primobanco",
    title: "Comunicazione in primo piano",
    category: "Content · Advertising",
    year: "2024",
    cover: "/clients/primobanco.webp",
    tone: "light",
    summary: "Una presenza visiva più ordinata e immediata, progettata per accompagnare campagne e contenuti.",
    services: ["Creative direction", "Campagne", "Content design"],
    gallery: [
      { src: "/projects/primobanco/logo-esteso.webp", alt: "Il logo esteso di Primobanco", group: "Identità", fit: "contain" },
      { src: "/projects/primobanco/marchio.webp", alt: "Il marchio: la saetta dentro al parallelogramma", group: "Identità", fit: "contain" },
      { src: "/projects/primobanco/palette.webp", alt: "La cartella colori del marchio, con i riferimenti Pantone", group: "Identità", fit: "contain" },
      { src: "/projects/primobanco/icona-arancio.webp", alt: "L’icona su fondo arancio", group: "Varianti" },
      { src: "/projects/primobanco/icona-blu.webp", alt: "L’icona su fondo blu", group: "Varianti" },
      { src: "/projects/primobanco/mockup-cartellone.webp", alt: "Il marchio su un cartellone stradale", group: "Applicazioni" },
      { src: "/projects/primobanco/mockup-scrivania.webp", alt: "Il sistema applicato alla cancelleria: carta intestata, biglietti, cartellina", group: "Applicazioni" },
      { src: "/projects/primobanco/mockup-tshirt.webp", alt: "Il marchio su una t-shirt", group: "Applicazioni" },
      { src: "/projects/primobanco/mockup-penne.webp", alt: "Penne personalizzate col marchio", group: "Applicazioni" },
      { src: "/projects/primobanco/post-selezioni.webp", alt: "Il post che annuncia le selezioni partner per Centro e Nord Italia", group: "Social", fit: "contain" },
      { src: "/projects/primobanco/carosello-consulenza.webp", alt: "Apertura del carosello “Quanto vale la tua consulenza?”", group: "Social", fit: "contain" },
      { src: "/projects/primobanco/carosello-rete.webp", alt: "Apertura del carosello “Come entrare nella rete Primobanco?”", group: "Social", fit: "contain" },
      { src: "/projects/primobanco/carosello-sistema.webp", alt: "Apertura del carosello “Primobanco non è una scuola di formazione”", group: "Social", fit: "contain" },
      { src: "/projects/primobanco/carosello-horeca.webp", alt: "Apertura del carosello sui ritardi nelle aperture HoReCa", group: "Social", fit: "contain" },
    ],
  },
  {
    slug: "osteria-annunziata-territorio",
    client: "Osteria Annunziata",
    title: "Il territorio a tavola",
    category: "Branding · Photo",
    year: "2024",
    cover: "/clients/osteria-annunziata.webp",
    tone: "dark",
    summary: "Un racconto visivo che mette insieme cucina, luogo e carattere senza perdere autenticità.",
    services: ["Identità", "Fotografia", "Contenuti"],
    gallery: [
      { src: "/projects/osteria-annunziata/osteria-1.jpg", alt: "Atmosfera e piatti di Osteria Annunziata", group: "Fotografie" },
      { src: "/projects/osteria-annunziata/e-tu-lo-sapevi.mp4", alt: "Reel E tu lo sapevi di Osteria Annunziata", kind: "video", poster: "/projects/osteria-annunziata/osteria-1.jpg", group: "Video" },
      { src: "/projects/osteria-annunziata/osteria-2.jpg", alt: "Dettaglio fotografico di Osteria Annunziata", group: "Fotografie" },
      { src: "/projects/osteria-annunziata/miracolo.mp4", alt: "Reel Miracolo di Osteria Annunziata", kind: "video", poster: "/projects/osteria-annunziata/osteria-2.jpg", group: "Video" },
      { src: "/projects/osteria-annunziata/osteria-3.jpg", alt: "Racconto visivo di Osteria Annunziata", group: "Fotografie" },
      { src: "/projects/osteria-annunziata/osteria-4.jpg", alt: "Una portata di Osteria Annunziata", group: "Fotografie" },
      { src: "/projects/osteria-annunziata/tataki.mp4", alt: "Reel Tataki di Osteria Annunziata", kind: "video", poster: "/projects/osteria-annunziata/osteria-4.jpg", group: "Video" },
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
