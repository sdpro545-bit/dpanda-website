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
        green: {
          950: "var(--green-950)",
          900: "var(--green-900)",
          800: "var(--green-800)",
          700: "var(--green-700)",
          500: "var(--green-500)",
          400: "var(--green-400)",
        },
        mint: {
          200: "var(--mint-200)",
          50: "var(--mint-50)",
        },
        yellow: {
          400: "var(--yellow-400)",
        },
        ink: {
          900: "var(--ink-900)",
        },
        glass: {
          bg: "var(--glass-bg)",
          "bg-hover": "var(--glass-bg-hover)",
          bd: "var(--glass-bd)",
          "bd-active": "var(--glass-bd-active)",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        pill: "var(--radius-pill)",
        card: "var(--radius-card)",
        panel: "var(--radius-panel)",
      },
      letterSpacing: {
        tightDisplay: "-0.03em",
      },
    },
  },
  plugins: [],
};

export default config;
