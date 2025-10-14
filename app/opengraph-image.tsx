import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Praktijk Kim Dreef - Orthomoleculaire therapie en homeopathie";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#899B90",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 300,
              color: "white",
              marginBottom: 24,
              lineHeight: 1.2,
            }}
          >
            Praktijk Kim Dreef
          </h1>
          <p
            style={{
              fontSize: 36,
              color: "rgba(255, 255, 255, 0.9)",
              margin: 0,
            }}
          >
            Orthomoleculaire therapie en homeopathie
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}





