"use client";
import { motion } from "framer-motion";

export const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#050508]">
      
      {/* 1. Primary Spotlight / Aurora (Top Center) - Illuminates the headline without mudding the page */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px]">
        {/* Core highlight */}
        <div className="absolute inset-0 bg-[#FB4E00] blur-[150px] opacity-[0.10] mix-blend-screen rounded-full" />
        {/* Wider, cooler ambient rim (Purple/Navy) for depth against the black */}
        <div className="absolute inset-[-100px] bg-[#3A1B5B] blur-[160px] opacity-[0.25] mix-blend-screen rounded-full" />
      </div>

      {/* 2. Abstract Minimalist Concentric Rings (Quantum Tech / Global Scale feel) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center opacity-80 mix-blend-screen">
        
        {/* Outer Ring */}
        <motion.div
          className="absolute w-[1800px] h-[1800px] border border-white/[0.06] rounded-full"
          style={{ willChange: "transform" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        >
          {/* Subtle glowing segment on the ring */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-[1px] bg-gradient-to-r from-transparent via-[#FB4E00]/50 to-transparent blur-[2px]" />
          <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 w-32 h-[2px] bg-[#FB4E00]/70" />
        </motion.div>

        {/* Middle Ring */}
        <motion.div
          className="absolute w-[1200px] h-[1200px] border border-white/[0.08] rounded-full"
          style={{ willChange: "transform" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[3px]" />
        </motion.div>

        {/* Inner Ring */}
        <motion.div
          className="absolute w-[800px] h-[800px] border border-[#FB4E00]/[0.12] rounded-full"
          style={{ willChange: "transform" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        >
           <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-48 bg-gradient-to-b from-transparent via-[#FB4E00]/60 to-transparent blur-[2px]" />
        </motion.div>
      </div>

      {/* 3. Extremely Subtle Grid Background for structural precision */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          backgroundPosition: "center center",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)"
        }}
      />

      {/* 4. Top glowing border (Like Vercel top-edge scanner) */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FB4E00]/40 to-transparent" />
      
      {/* 5. Natural SVG Noise Texture for the "matte" finish (very premium) */}
      <div 
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} 
      />

      {/* Bottom fade out into the next section */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#050508] via-[#050508]/80 to-transparent" />
    </div>
  );
};
