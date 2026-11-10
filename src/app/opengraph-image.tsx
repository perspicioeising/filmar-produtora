import { ImageResponse } from "next/og";

export const alt = "Filmar — Produtora audiovisual";
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
          background: "#050506",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 160,
            fontWeight: 600,
            color: "#f5f5f4",
            letterSpacing: -4,
          }}
        >
          film
          <span style={{ color: "#7db8e8" }}>ar</span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#9c9ca4",
            letterSpacing: 14,
            textTransform: "uppercase",
          }}
        >
          Produtora
        </div>
      </div>
    ),
    { ...size },
  );
}
