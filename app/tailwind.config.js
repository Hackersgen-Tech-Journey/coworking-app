/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-water": {
          400: "#42B0A080",
          500: "#42B0A0",
        },
      },
      height: {
        90: "22.5rem",
      },
      width: {
        90: "22.5rem",
      },
      lineHeight: {
        tighter: 1.185,
      },
      fontFamily: {
        instrument: ["Instrument Sans", "sans-serif"],
      },
      backgroundImage: {
        coworking: "url('@/assets/main-bg.jpeg')",
        pattern: "url('@/assets/new_logo.jpeg')",
      },
    },
  },
  plugins: [],
};
