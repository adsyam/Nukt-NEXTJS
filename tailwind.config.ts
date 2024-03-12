import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        "16": "repeat(16, minmax(0, 1fr))",
      },
      maxWidth: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontSize: {
        xs: "clamp(0.625rem, 0.548rem + 0.34vw, 0.875rem)", // 12 - 14
        sm: "clamp(0.75rem, 0.673rem + 0.34vw, 1rem)", // 14 - 16
        base: "clamp(0.875rem, 0.798rem + 0.34vw, 1.125rem)", // 16 - 18
        lg: "clamp(1rem, 0.923rem + 0.34vw, 1.25rem)", // 18 - 20
        xl: "clamp(1.125rem, 1.01rem + 0.51vw, 1.5rem)", // 20 - 24
        "2xl": "clamp(1.375rem, 1.222rem + 0.68vw, 1.875rem)", // 24 - 30
        "3xl": "clamp(1.75rem, 1.597rem + 0.68vw, 2.25rem)", // 30 - 36
        "4xl": "clamp(2.125rem, 1.857rem + 1.19vw, 3rem)", // 36 - 48
        "5xl": "clamp(2.875rem, 2.607rem + 1.19vw, 3.75rem)", // 48 - 60
        "6xl": "clamp(3.625rem, 3.357rem + 1.19vw, 4.5rem)", // 60 - 72
        "7xl": "clamp(4.375rem, 3.878rem + 2.211vw, 6rem)", // 72 - 96
        "8xl": "clamp(5.875rem, 5.224rem + 2.891vw, 8rem)", // 96 - 128
        "9xl": "clamp(7.875rem, 7.033rem + 3.741vw, 10.625rem)", // 128 - 170
      },
      fontFamily: {
        "madimi-One": "'Madimi One', sans-serif",
        poppins: "'Poppins', sans-serif",
        figtree: "'Figtree', sans-serif",
      },
    },
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    plugins: [],
  },
}
export default config
