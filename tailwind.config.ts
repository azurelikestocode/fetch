import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        zinc: {
          750: "#303036",
          850: "#1f1f23",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          border: "var(--border)",
        },
      },
      borderRadius: {
        xs: "2px",
        custom: "var(--radius)",
      },
    },
  },
  plugins: [],
};

export default config;

