import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#009688", // FastAPI Teal
        secondary: "#00bcd4", // Cyan 500 (Harmonized)
        accent: "#00ccb8", // FastAPI Light Teal/Cyan
        dark: "#23272f", // Lighter FastAPI Slate
        "dark-lighter": "#2d333b", // Shifted Depth Slate
        light: "#f9fafb", // Gray 50
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [
    typography,
  ],
};
export default config;
