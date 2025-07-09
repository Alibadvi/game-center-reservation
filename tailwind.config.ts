import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["var(--font-vazir)"],
      },
      colors: {
        "neon-blue": "#4fc3f7",
        "neon-pink": "#ff4081",
        "dark-bg": "#0D0F14",
        "neon-orange": "#FFA500",
        "nav-blur": "rgba(13, 15, 20, 0.6)",
        "dark-surface": "#1B263B",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "6px",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-in-out",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 2.5s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      dropShadow: {
        neon: "0 0 6px #4fc3f7",
        "neon-pink": "0 0 6px #f06292",
      },
    },
  },
  plugins: [],
};

export default config;
