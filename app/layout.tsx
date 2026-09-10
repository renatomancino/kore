import type { Metadata } from "next";
import { Big_Shoulders, Inter } from "next/font/google";
import "./globals.css";
import { indirizzoSito, sitoPubblicato } from "./site-url";
import { TransizioniDiVista } from "./transizioni-di-vista";

/* PROVVISORIO. Il carattere dei titoli del marchio e' Reel (Jamie Clarke
   Type), che arriva da Adobe Fonts e non si puo' ospitare nel sito: aspetta
   un Web Project sull'abbonamento del cliente. Nel frattempo qui c'e' il piu'
   somigliante fra i gratuiti — condensato, minuscole alte quasi quanto le
   maiuscole, aria da manifesto — cosi' il sito ha gia' la stanza giusta e il
   giorno dello scambio si cambia una riga sola.
   Prima c'era Bodoni Moda, un didone: bello ma agli antipodi di Reel, quindi
   tenerlo avrebbe mostrato al cliente un sito che non somiglia al suo marchio.
   E' variabile su tutti i pesi, percio' le novanta regole che gia' dicono 700
   o 900 continuano a valere senza toccarle. `opsz`: alle misure grandi passa
   da sola al taglio da titoli. */
const titoli = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin"],
  /* Nessuna lista di pesi: e' variabile, quindi copre da sola 100-900 — ed e'
     anche la condizione per poter chiedere l'asse `opsz`. */
  axes: ["opsz"],
  display: "swap",
});

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
    /* Le variabili dei font stanno su <html> e non su <body>: --titoli e'
       un token di :root, e :root e' <html>. Definendole piu' in basso,
       var(...) li' sopra non risolveva e ogni titolo tornava al ripiego. */
    <html lang="it" data-scroll-behavior="smooth" className={`${titoli.variable} ${inter.variable}`}>
      <body
        className="antialiased"
      >
        <TransizioniDiVista />
        {children}
      </body>
    </html>
  );
}
