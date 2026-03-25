/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#FB4E00",
        "brand-secondary": "#FF8C42",
        "brand-dark": "#0A0A0F",
        "brand-navy": "#1A1A2E",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A0A0B0",
        "text-muted": "#6B6B80",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #FB4E00, #FF8C42)",
        "gradient-dark": "linear-gradient(135deg, #0A0A0F, #1A1A2E)",
        "gradient-glass": "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
        "gradient-hero": "radial-gradient(ellipse at top left, rgba(251,78,0,0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom right, rgba(26,26,46,0.8) 0%, transparent 60%)",
      },
      backdropBlur: {
        glass: "12px",
        heavy: "24px",
      },
      boxShadow: {
        glass: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
        glow: "0 0 20px rgba(251,78,0,0.3)",
        "glow-lg": "0 0 40px rgba(251,78,0,0.4)",
        card: "0 8px 32px rgba(0,0,0,0.4)",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(251,78,0,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(251,78,0,0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
