import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { indirizzoSito, sitoPubblicato } from "./site-url";
import { TransizioniDiVista } from "./transizioni-di-vista";

/* Il carattere del testo e' Inter perche' e' quello dichiarato dal marchio
   (Kore, 10/09/2026), non una scelta nostra. E' variabile, quindi copre da
   sola tutti i pesi.
   Prima c'era Geist, e accanto Geist Mono: il monospazio era caricato e non
   lo usava nessuna riga del sito. Un carattere in meno da scaricare. */
const inter = Inter({
  variable: "--font-testo",
  subsets: ["latin"],
  display: "swap",
});

const TITOLO = "Kore — Diamo forma alle idee";
const DESCRIZIONE =
  "Kore è una creative agency agile: branding, social, content, web, advertising ed eventi.";

export const metadata: Metadata = {
  /* Senza metadataBase i percorsi delle immagini restano relativi e chi
     costruisce l'anteprima non sa a quale dominio appartengono: la scheda
     resta vuota anche avendo l'immagine. */
  metadataBase: new URL(indirizzoSito),
  /* robots.txt chiede ai motori di non passare; questo lo dice anche a chi
     arriva alla pagina per altre strade — un link condiviso, per esempio.
     Il file si puo' ignorare, il meta tag sulla pagina molto meno. */
  robots: sitoPubblicato ? undefined : { index: false, follow: false },
  title: TITOLO,
  description: DESCRIZIONE,
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  /* L'immagine non e' elencata qui: la genera app/opengraph-image.tsx, e Next
     la aggancia da sola a questa pagina e a tutte quelle che non ne hanno una
     propria. */
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Kore Studio",
    title: TITOLO,
    description: DESCRIZIONE,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: TITOLO,
    description: DESCRIZIONE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" data-scroll-behavior="smooth" className={inter.variable}>
      <head>
        {/* Web Project Adobe Fonts fornito dal cliente: contiene Reel Short,
            Medium e Tall. Il sito usa Medium come taglio principale. */}
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.typekit.net/vqb8iez.css" />
      </head>
      <body
        className="antialiased"
      >
        <TransizioniDiVista />
        {children}
      </body>
    </html>
  );
}
