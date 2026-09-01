import type { Metadata } from "next";
import { Bodoni_Moda, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { indirizzoSito } from "./site-url";
import { TransizioniDiVista } from "./transizioni-di-vista";

/* Il serif del sito era dichiarato come `Didot, "Bodoni MT", Georgia` —
   tutti font di sistema. Didot esiste solo su macOS, Bodoni MT arriva con
   Office: su Windows senza Office e su Android si cadeva su Georgia, che e'
   una transizionale robusta invece di un didone, e rendeva la stessa frase
   l'11% piu' larga. Meta' dei visitatori vedeva un altro sito.
   Bodoni Moda e' un didone vero, variabile, e ha l'asse `opsz`: alle misure
   piccole ispessisce da solo i tratti sottili, che e' il punto debole di
   questa famiglia quando scende sotto i 20px. */
const bodoni = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  /* Nessuna lista di pesi: e' variabile, quindi copre da sola 400-900 — ed e'
     anche la condizione per poter chiedere l'asse `opsz`. */
  axes: ["opsz"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITOLO = "Kore — Diamo forma alle idee";
const DESCRIZIONE =
  "Kore è una creative agency agile: branding, social, content, web, advertising ed eventi.";

export const metadata: Metadata = {
  /* Senza metadataBase i percorsi delle immagini restano relativi e chi
     costruisce l'anteprima non sa a quale dominio appartengono: la scheda
     resta vuota anche avendo l'immagine. */
  metadataBase: new URL(indirizzoSito),
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
    /* Le variabili dei font stanno su <html> e non su <body>: --serif e' un
       token di :root, e :root e' <html>. Definendole piu' in basso, var(...)
       li' sopra non risolveva e ogni titolo tornava al sans. */
    <html lang="it" data-scroll-behavior="smooth" className={`${bodoni.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body
        className="antialiased"
      >
        <TransizioniDiVista />
        {children}
      </body>
    </html>
  );
}
