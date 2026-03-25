import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Exvion Global";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div style={{
          width: 80, height: 80,
          background: "linear-gradient(135deg, #FB4E00, #FF8C42)",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 40,
          fontWeight: 700,
          color: "white",
          marginBottom: 32,
        }}>
          E
        </div>

        <h1 style={{
          fontSize: 64,
          fontWeight: 800,
          color: "white",
          margin: 0,
          textAlign: "center",
          lineHeight: 1.1,
        }}>
          Exvion Global
        </h1>

        <p style={{
          fontSize: 28,
          color: "#A0A0B0",
          marginTop: 16,
          textAlign: "center",
        }}>
          Software · AI Systems · Digital Platforms
        </p>

        <div style={{
          marginTop: 40,
          padding: "12px 32px",
          background: "rgba(251,78,0,0.15)",
          border: "1px solid rgba(251,78,0,0.3)",
          borderRadius: 50,
          color: "#FB4E00",
          fontSize: 18,
          fontWeight: 600,
        }}>
          exvionglobal.com
        </div>
      </div>
    ),
    { ...size }
  );
}
