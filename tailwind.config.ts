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
        background: "#F8F9FC",
        foreground: "#1A1D1F",
        dashboard: {
          card: "#FFFFFF",
          muted: "#6F767E",
          accent: "#FF6B6B",
          success: "#83BF6E",
          blue: "#2A85FF",
        },
        primary: {
          DEFAULT: "#2A85FF",
          foreground: "white",
          muted: "#B1D9FF",
        },
        secondary: {
          DEFAULT: "#1A1D1F",
          foreground: "white",
        },
        destructive: {
          DEFAULT: "#FF6B6B",
          foreground: "white",
        },
        muted: {
          DEFAULT: "#F4F4F4",
          foreground: "#6F767E",
        },
        accent: {
          DEFAULT: "#83BF6E",
          foreground: "white",
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