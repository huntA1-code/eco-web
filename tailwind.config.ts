import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#FFFFFF",
        foreground: "#333333",
        primary: {
          DEFAULT: "#0EA5E9",
          foreground: "white",
        },
        secondary: {
          DEFAULT: "#F1F1F1",
          foreground: "#333333",
        },
        destructive: {
          DEFAULT: "#FF6B6B",
          foreground: "white",
        },
        muted: {
          DEFAULT: "#F1F1F1",
          foreground: "#666666",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          foreground: "white",
          new: "#D946EF",
          best: "#F97316",
          trending: "#0EA5E9",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;