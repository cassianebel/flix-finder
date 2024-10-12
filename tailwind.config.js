/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      zinc: {
        50: "#fafafa",
        100: "#f4f4f5",
        200: "#e4e4e7",
        300: "#d4d4d8",
        400: "#a1a1aa",
        500: "#71717a",
        600: "#52525b",
        700: "#3f3f46",
        800: "#27272a",
        900: "#18181b",
        950: "#09090b",
      },
      chartreuse: {
        50: "#f4ffe5",
        100: "#e5ffc7",
        200: "#ccff96",
        300: "#a9fd59",
        400: "#97f541",
        500: "#69da08",
        600: "#4eaf01",
        700: "#3c8407",
        800: "#33680c",
        900: "#2c580f",
        950: "#133102",
      },
    },
    fontFamily: {
      display: ["Limelight", "sans-serif"],
      body: ['"Barlow Condensed"', "sans-serif"],
    },
    boxShadow: {
      glow: "0 0 7px 3px rgba(0, 0, 0, 0.25)",
    },
    dropShadow: {
      glow: "0 0 7px 3px rgba(0, 0, 0, 0.25)",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
    },
    animation: {
      fadeIn: "fadeIn 0.3s ease-out forwards",
    },
  },
  plugins: [],
};
