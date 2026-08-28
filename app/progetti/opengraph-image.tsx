import { ImageResponse } from "next/og";
import { INCHIOSTRO, MISURA, PANNA, ROSSO, TIPO, marchioPanna } from "../og-materiali";
import { projects } from "../project-data";

export const alt = "I progetti di Kore Studio";
export const size = MISURA;
export const contentType = TIPO;

/**
 * L'anteprima dell'archivio.
 *
 * Serve anche per un motivo tecnico, non solo estetico: dichiarando `openGraph`
 * nella pagina per non ereditare il titolo della home, si smette di ereditare
 * anche l'immagine. O ne ha una sua, o la scheda resta senza.
 *
 * Sul fondo scuro dell'archivio, non sul rosso: chi apre il link deve
 * riconoscere la pagina in cui atterra.
 */
export default async function AnteprimaArchivio() {
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
          background: INCHIOSTRO,
          position: "relative",
        }}
      >
        {/* Gli anelli che nell'archivio girano dietro al titolo. */}
        <div
          style={{
            position: "absolute",
            right: -220,
            top: -180,
            width: 820,
            height: 820,
            borderRadius: 410,
            border: "1px solid rgba(254,64,66,.34)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -80,
            width: 620,
            height: 620,
            borderRadius: 310,
            border: "1px solid rgba(254,64,66,.22)",
          }}
        />

        <img src={marchio} width={250} alt="" style={{ position: "relative" }} />

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ display: "flex", color: PANNA, fontSize: 86, fontWeight: 700, letterSpacing: -3 }}>
            Progetti con
          </div>
          <div style={{ display: "flex", color: ROSSO, fontSize: 86, fontWeight: 700, letterSpacing: -3 }}>
            qualcosa da dire.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              color: "rgba(255,236,197,.72)",
              fontSize: 21,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {String(projects.length).padStart(2, "0")} progetti · Kore Studio
          </div>
        </div>
      </div>
    ),
    size,
  );
}
