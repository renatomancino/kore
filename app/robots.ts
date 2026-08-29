import type { MetadataRoute } from "next";
import { indirizzoSito } from "./site-url";

/**
 * Cosa possono leggere i motori di ricerca.
 *
 * Tutto. Avevo pensato di tenere fuori le immagini delle anteprime — sono
 * PNG per WhatsApp e LinkedIn, non contenuto — ma chi costruisce l'anteprima
 * di un link e' un robot anche lui, e diversi rispettano questo file: si
 * rischia di far sparire proprio le schede che quelle immagini servono a
 * creare. Comparire in una ricerca per immagini e' un fastidio; un link
 * condiviso senza anteprima e' un danno.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${indirizzoSito}/sitemap.xml`,
  };
}
