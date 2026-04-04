import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#009688", // FastAPI Teal
        secondary: "#00bcd4", // Cyan 500 (Harmonized)
        accent: "#00ccb8", // FastAPI Light Teal/Cyan
        dark: "#1e2127", // FastAPI Slate (Material for MkDocs Slate)
        "dark-lighter": "#1a1c22", // Depth Slate
        light: "#f9fafb", // Gray 50
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 3px rgba(0, 150, 136, 0.3)' },
          '100%': { boxShadow: '0 0 8px rgba(0, 188, 212, 0.4), 0 0 4px rgba(0, 150, 136, 0.2)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
