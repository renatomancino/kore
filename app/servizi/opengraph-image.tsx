import { ImageResponse } from "next/og";
import { INCHIOSTRO, MISURA, PANNA, ROSSO, TIPO, marchioPanna } from "../og-materiali";
import { services } from "../services-data";

export const alt = "I sei servizi di Kore Studio";
export const size = MISURA;
export const contentType = TIPO;

/**
 * L'anteprima della pagina servizi.
 *
 * Mancava, e non era un dettaglio estetico: dichiarando `openGraph` nella
 * pagina per non ereditare il titolo della home si smette di ereditare anche
 * l'immagine, quindi il link usciva nudo mentre le altre tre pagine avevano
 * la loro scheda. Lo stesso inciampo gia' risolto per /idea e /progetti,
 * ripetuto quando ho aggiunto questa pagina.
 *
 * Sul fondo scuro dell'apertura, come l'archivio: chi apre il link deve
 * riconoscere la pagina in cui atterra.
 */
export default async function AnteprimaServizi() {
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
        }}
      >
        <img src={marchio} width={250} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: PANNA, fontSize: 92, fontWeight: 700, letterSpacing: -3 }}>
            Sei mestieri.
          </div>
          <div style={{ display: "flex", color: ROSSO, fontSize: 92, fontWeight: 700, letterSpacing: -3 }}>
            Una regia sola.
          </div>
        </div>

        {/* I sei nomi in fila: dicono il contenuto della pagina meglio di una
            frase, e sono gli stessi che il visitatore trovera' scorrendo. */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {services.map((servizio) => (
            <div
              key={servizio.id}
              style={{
                display: "flex",
                padding: "10px 18px",
                border: "1px solid rgba(255,236,197,.3)",
                borderRadius: 999,
                color: "rgba(255,236,197,.82)",
                fontSize: 19,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              {servizio.name}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
