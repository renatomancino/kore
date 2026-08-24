import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kore-orpin-one.vercel.app"),
  title: "Kore — Diamo forma alle idee",
  description: "Kore è una creative agency agile: branding, social, content, web, advertising ed eventi.",
  openGraph: {
    title: "Kore — Diamo forma alle idee",
    description: "Strategia, design e movimento. Una creative agency agile, da Napoli ovunque.",
    type: "website",
    locale: "it_IT",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
