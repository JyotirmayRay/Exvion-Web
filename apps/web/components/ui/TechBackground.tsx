"use client";
import React from "react";

export const TechBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <div style={{
        position: "absolute",
        inset: 0,
        background: "#0A0A0F",
      }} />
      <div style={{
        position: "absolute",
        top: "-160px",
        left: "-160px",
        width: "600px",
        height: "600px",
        background: "rgba(251,78,0,0.08)",
        borderRadius: "50%",
        filter: "blur(120px)",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-160px",
        right: "-160px",
        width: "500px",
        height: "500px",
        background: "rgba(26,26,46,0.5)",
        borderRadius: "50%",
        filter: "blur(100px)",
      }} />
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.03,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />
    </div>
  );
};

export default TechBackground;
