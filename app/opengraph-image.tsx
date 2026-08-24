import { ImageResponse } from "next/og";

export const alt = "Kore — Diamo forma alle idee";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "42px 50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ff3b3f",
        color: "#17110d",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Arial, sans-serif", fontSize: 16, letterSpacing: 2 }}>
        <span>CREATIVE STUDIO · NAPOLI</span>
        <span>40.786° N / 14.369° E</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: .73, letterSpacing: -9 }}>
        <span style={{ fontSize: 122, fontWeight: 700 }}>Diamo forma</span>
        <span style={{ marginLeft: 245, color: "#ffe8bd", fontSize: 155, fontWeight: 700, fontStyle: "italic" }}>alle idee.</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "Arial, sans-serif", fontSize: 15, letterSpacing: 2 }}>STRATEGIA · DESIGN · MOVIMENTO</span>
        <span style={{ fontSize: 88, fontWeight: 700, letterSpacing: -8 }}>KORE<span style={{ color: "#ffe8bd" }}>.</span></span>
      </div>
    </div>,
    size,
  );
}
