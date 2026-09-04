import { ImageResponse } from "next/og";

export const alt = "Filmar — Direção e produção audiovisual";
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
          background: "#0a0a0a",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 150,
            fontWeight: 500,
            color: "#f2f1ef",
            letterSpacing: -4,
          }}
        >
          Filmar
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 28,
            color: "#9a9a96",
          }}
        >
          Direção e produção audiovisual
        </div>
      </div>
    ),
    { ...size },
  );
}
