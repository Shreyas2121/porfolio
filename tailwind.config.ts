import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          "50": "#efeeff",
          "100": "#e2e0ff",
          "200": "#cac7fe",
          "300": "#aaa5fc",
          "400": "#8881f8",
          "500": "#6b63f1",
          "600": "#4f46e5",
          "700": "#4038ca",
          "800": "#3730a3",
          "900": "#332e81",
          "950": "#1e1b4b",
        },
        secondary: {
          "50": "#fefae8",
          "100": "#fef2c3",
          "200": "#fee78a",
          "300": "#fdd847",
          "400": "#facc15",
          "500": "#eabd08",
          "600": "#caa204",
          "700": "#a18207",
          "800": "#856d0e",
          "900": "#715e12",
          "950": "#423606",
        },
        tertiary: {
          "50": "#f0fdfc",
          "100": "#ccfbf6",
          "200": "#99f6ec",
          "300": "#5eeadb",
          "400": "#2dd4c2",
          "500": "#14b8a6",
          "600": "#0d9485",
          "700": "#0f766b",
          "800": "#115e56",
          "900": "#134e48",
          "950": "#042f2a",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
