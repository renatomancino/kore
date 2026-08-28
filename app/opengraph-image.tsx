import { ImageResponse } from "next/og";
import { MISURA, PANNA, ROSSO, TIPO, marchioPanna } from "./og-materiali";

export const alt = "Kore Studio — creative agency a Torre del Greco";
export const size = MISURA;
export const contentType = TIPO;

/**
 * L'anteprima del sito: quella che si vede incollando il link su WhatsApp,
 * LinkedIn o in una chat.
 *
 * La scena e' l'hero ridotto all'osso — il rosso, il cerchio chiaro che sale
 * da sotto, una perla — perche' chi apre il link dopo averla vista deve
 * ritrovare la stessa pagina, non una copertina scollegata.
 */
export default async function Anteprima() {
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
        {/* Il cerchio chiaro che nell'hero sale dal fondo. Tagliato dal bordo:
            e' quello che gli da' scala. */}
        <div
          style={{
            position: "absolute",
            left: 190,
            top: 330,
            width: 900,
            height: 900,
            borderRadius: 450,
            background: "rgba(255,236,197,.13)",
          }}
        />
        {/* Due perle, rese come nel sito: luce in alto a sinistra, fondo cupo. */}
        <div
          style={{
            position: "absolute",
            right: 108,
            top: 96,
            width: 116,
            height: 116,
            borderRadius: 58,
            background:
              "radial-gradient(circle at 30% 24%, #fff8e8 0 7%, #ffecc5 28%, #d69a74 70%, #6e2422 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 250,
            bottom: 104,
            width: 58,
            height: 58,
            borderRadius: 29,
            background:
              "radial-gradient(circle at 30% 24%, #fff8e8 0 7%, #ffecc5 28%, #d69a74 70%, #6e2422 100%)",
          }}
        />

        <img src={marchio} width={470} alt="" style={{ position: "relative" }} />

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              display: "flex",
              color: PANNA,
              fontSize: 54,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            Diamo forma alle idee.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              color: "rgba(255,236,197,.82)",
              fontSize: 21,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Creative agency · Torre del Greco / ovunque
          </div>
        </div>
      </div>
    ),
    size,
  );
}
