import { ImageResponse } from "next/og";

export const alt = "Filmar Produtora — Audiovisual & Cinematografia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          backgroundImage:
            "radial-gradient(circle at 50% 40%, rgba(125,184,232,0.18), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 130, fontWeight: 700 }}>
          <span style={{ color: "#f5f5f4" }}>film</span>
          <span style={{ color: "#7db8e8" }}>ar</span>
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 26,
            letterSpacing: 18,
            color: "#d4d4d2",
            textTransform: "uppercase",
          }}
        >
          Produtora
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            color: "#a8a8a4",
          }}
        >
          Histórias em movimento
        </div>
      </div>
    ),
    { ...size },
  );
}
