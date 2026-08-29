import type { MetadataRoute } from "next";
import { projects } from "./project-data";
import { indirizzoSito } from "./site-url";

/**
 * La mappa del sito per i motori di ricerca.
 *
 * Non e' un file scritto a mano: si genera dall'elenco dei progetti, quindi
 * un progetto nuovo ci finisce da solo. Una sitemap compilata a mano e' una
 * sitemap che dopo tre mesi mente.
 *
 * `priority` non e' una classifica di importanza per Google — e' un'indicazione
 * relativa dentro a questo sito soltanto. Qui dice: la home e il brief sono
 * le pagine che vogliamo far trovare, i casi studio vengono dopo.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const oggi = new Date();

  return [
    { url: `${indirizzoSito}/`, lastModified: oggi, changeFrequency: "monthly", priority: 1 },
    { url: `${indirizzoSito}/idea`, lastModified: oggi, changeFrequency: "yearly", priority: 0.9 },
    { url: `${indirizzoSito}/progetti`, lastModified: oggi, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((progetto) => ({
      url: `${indirizzoSito}/progetti/${progetto.slug}`,
      lastModified: oggi,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
