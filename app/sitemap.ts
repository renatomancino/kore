import type { MetadataRoute } from "next";
import { indirizzoSito } from "./site-url";

/**
 * La mappa del sito per i motori di ricerca.
 *
 * `priority` non e' una classifica di importanza per Google — e' un'indicazione
 * relativa dentro a questo sito soltanto. Qui dice: la home e il brief sono
 * le pagine che vogliamo far trovare, l'archivio viene subito dopo.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const oggi = new Date();

  return [
    { url: `${indirizzoSito}/`, lastModified: oggi, changeFrequency: "monthly", priority: 1 },
    { url: `${indirizzoSito}/idea`, lastModified: oggi, changeFrequency: "yearly", priority: 0.9 },
    { url: `${indirizzoSito}/servizi`, lastModified: oggi, changeFrequency: "monthly", priority: 0.85 },
    { url: `${indirizzoSito}/progetti`, lastModified: oggi, changeFrequency: "monthly", priority: 0.8 },
  ];
}
