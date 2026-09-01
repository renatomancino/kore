import { ImageResponse } from "next/og";
import { projects } from "../../project-data";
import { INCHIOSTRO, MISURA, PANNA, ROSSO, TIPO, marchioCorallo, materiale } from "../../og-materiali";

export const alt = "Un progetto Kore Studio";
export const size = MISURA;
export const contentType = TIPO;

/**
 * L'anteprima di un progetto: il marchio del cliente, non quello di Kore.
 *
 * Chi condivide il link a un caso studio lo fa per parlare di quel cliente,
 * quindi la scheda mostra lui. Kore resta in un angolo, piccola: e' la firma,
 * non il soggetto.
 *
 * Il fondo segue il `tone` gia' dichiarato nei dati — lo stesso che decide il
 * fondo della scheda nell'archivio — cosi' un logo chiaro non finisce su
 * chiaro. Sarebbe la stessa svista che era gia' costata la leggibilita' a
 * Osteria Annunziata.
 */
export default async function AnteprimaProgetto({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const progetto = projects.find((p) => p.slug === slug);
  if (!progetto) return new ImageResponse(<div style={{ background: ROSSO, width: "100%", height: "100%" }} />, size);

  const fondoTela = progetto.tone === "dark" ? INCHIOSTRO : "#fff8ea";
  const logoCliente = await materiale(progetto.cover.replace(/^\//, ""));
  const firma = await marchioCorallo();

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: PANNA }}>
        {/* La tela con il marchio del cliente: meta' larghezza, come la scheda
            nell'archivio, cosi' chi arriva dal link ritrova la stessa cosa. */}
        <div
          style={{
            width: 560,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: fondoTela,
          }}
        >
          <img src={logoCliente} width={370} alt="" style={{ objectFit: "contain" }} />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 64,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                color: ROSSO,
                fontSize: 19,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              {progetto.category} · {progetto.year}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 26,
                color: INCHIOSTRO,
                fontSize: 62,
                fontWeight: 700,
                letterSpacing: -2,
                lineHeight: 1.05,
              }}
            >
              {progetto.client}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 20,
                color: "rgba(23,18,13,.72)",
                fontSize: 27,
                lineHeight: 1.35,
              }}
            >
              {progetto.title}
            </div>
          </div>

          <img src={firma} width={190} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
