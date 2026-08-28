import { ImageResponse } from "next/og";
import { MISURA, PANNA, ROSSO, TIPO, marchioPanna } from "../og-materiali";

export const alt = "Hai un'idea? Raccontacela — il brief di Kore Studio";
export const size = MISURA;
export const contentType = TIPO;

/**
 * L'anteprima del brief.
 *
 * Diversa da quella del sito perche' il link a /idea si manda per un motivo
 * preciso: "compilami". La scheda deve dire quanto costa in tempo, non
 * ripetere il nome dell'agenzia.
 */
export default async function AnteprimaBrief() {
  const marchio = await marchioPanna();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: ROSSO,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -140,
            top: -160,
            width: 700,
            height: 700,
            borderRadius: 350,
            background: "rgba(255,236,197,.12)",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <img src={marchio} width={250} alt="" />
          <div
            style={{
              display: "flex",
              padding: "14px 26px",
              borderRadius: 999,
              background: "#17120d",
              color: PANNA,
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Quattro passi · 5 minuti
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ display: "flex", color: PANNA, fontSize: 92, fontWeight: 700, letterSpacing: -3 }}>
            Hai un’idea?
          </div>
          <div style={{ display: "flex", color: "#17120d", fontSize: 92, fontWeight: 700, letterSpacing: -3 }}>
            Raccontacela bene.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              color: "rgba(255,236,197,.82)",
              fontSize: 21,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Non un modulo di contatto: il brief da cui partiamo davvero
          </div>
        </div>
      </div>
    ),
    size,
  );
}
